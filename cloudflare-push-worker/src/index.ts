type Env = {
  PUSH_SUBSCRIPTIONS: KVNamespace;
  ALLOWED_ORIGIN: string;
  VAPID_SUBJECT: string;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_JWK: string;
  ADMIN_TOKEN: string;
  LATEST_ANNOUNCEMENT_KEY: string;
};

type PushSubscriptionJson = {
  endpoint: string;
  expirationTime?: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
};

type StoredSubscription = {
  subscription: PushSubscriptionJson;
  preferences: {
    shows: boolean;
    days: string[];
  };
  createdAt: string;
  updatedAt: string;
};

type Announcement = {
  title: string;
  body: string;
  tag?: string;
  sentAt?: string;
};

const APP_SCHEDULE_URL = 'https://floydclaptonblues.github.io/Balcony-Music-Club-PWA/#schedule';
const DEFAULT_ALERT = {
  title: 'Balcony Music Club',
  body: 'Show alerts are enabled. Open the schedule for verified details.',
  tag: 'bmc-show-alerts-enabled',
};
const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

function isAllowedOrigin(request: Request, env: Env) {
  return request.headers.get('Origin') === env.ALLOWED_ORIGIN;
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  if (!isAllowedOrigin(request, env)) {
    return { Vary: 'Origin' };
  }

  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(data: unknown, status: number, request: Request, env: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...corsHeaders(request, env),
    },
  });
}

function requireAllowedOrigin(request: Request, env: Env) {
  if (!isAllowedOrigin(request, env)) {
    throw json({ ok: false, error: 'Origin is not allowed.' }, 403, request, env);
  }
}

async function readJson<T>(request: Request): Promise<T> {
  try {
    return await request.json<T>();
  } catch {
    throw new Error('Request body must be valid JSON.');
  }
}

function requireAdmin(request: Request, env: Env) {
  const expected = `Bearer ${env.ADMIN_TOKEN}`;
  if (request.headers.get('Authorization') !== expected) {
    throw new Response('Unauthorized', { status: 401, headers: corsHeaders(request, env) });
  }
}

async function sha256Base64Url(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function subscriptionKey(endpoint: string) {
  return `sub:${await sha256Base64Url(endpoint)}`;
}

async function importVapidPrivateKey(env: Env) {
  return crypto.subtle.importKey(
    'jwk',
    JSON.parse(env.VAPID_PRIVATE_JWK),
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign'],
  );
}

async function signVapidJwt(audience: string, env: Env) {
  const header = { typ: 'JWT', alg: 'ES256' };
  const payload = {
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
    sub: env.VAPID_SUBJECT,
  };
  const unsignedToken = `${base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)))}.${base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(payload)),
  )}`;
  const key = await importVapidPrivateKey(env);
  const signature = new Uint8Array(await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    key,
    new TextEncoder().encode(unsignedToken),
  ));

  return `${unsignedToken}.${base64UrlEncode(signature)}`;
}

async function sendWakePush(subscription: PushSubscriptionJson, env: Env) {
  const endpoint = new URL(subscription.endpoint);
  const audience = `${endpoint.protocol}//${endpoint.host}`;
  const jwt = await signVapidJwt(audience, env);

  return fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      TTL: '86400',
      Urgency: 'normal',
      Authorization: `vapid t=${jwt}, k=${env.VAPID_PUBLIC_KEY}`,
    },
  });
}

function endpointFromPayload(payload: { endpoint?: unknown; subscription?: { endpoint?: unknown } }) {
  const endpoint = payload.subscription?.endpoint ?? payload.endpoint;
  return typeof endpoint === 'string' && endpoint.length > 0 ? endpoint : undefined;
}

async function saveSubscription(request: Request, env: Env) {
  requireAllowedOrigin(request, env);
  const payload = await readJson<{
    subscription?: PushSubscriptionJson;
    preferences?: Partial<StoredSubscription['preferences']>;
  }>(request);

  if (!payload.subscription?.endpoint || !payload.subscription.keys?.p256dh || !payload.subscription.keys?.auth) {
    return json({ ok: false, error: 'Invalid push subscription payload.' }, 400, request, env);
  }

  const key = await subscriptionKey(payload.subscription.endpoint);
  const existing = await env.PUSH_SUBSCRIPTIONS.get<StoredSubscription>(key, 'json');
  const now = new Date().toISOString();
  const stored: StoredSubscription = {
    subscription: payload.subscription,
    preferences: {
      shows: payload.preferences?.shows ?? true,
      days: payload.preferences?.days ?? ['wed', 'thu', 'fri', 'sat', 'sun'],
    },
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await env.PUSH_SUBSCRIPTIONS.put(key, JSON.stringify(stored));
  return json({ ok: true }, 200, request, env);
}

async function removeSubscription(request: Request, env: Env) {
  requireAllowedOrigin(request, env);
  const payload = await readJson<{ endpoint?: string; subscription?: { endpoint?: string } }>(request);
  const endpoint = endpointFromPayload(payload);
  if (!endpoint) {
    return json({ ok: false, error: 'A subscription endpoint is required.' }, 400, request, env);
  }

  await env.PUSH_SUBSCRIPTIONS.delete(await subscriptionKey(endpoint));
  return json({ ok: true }, 200, request, env);
}

async function latestAnnouncement(request: Request, env: Env) {
  requireAllowedOrigin(request, env);
  const stored = await env.PUSH_SUBSCRIPTIONS.get<Announcement>(env.LATEST_ANNOUNCEMENT_KEY, 'json');
  const announcement = stored
    ? { ...stored, url: APP_SCHEDULE_URL }
    : { ...DEFAULT_ALERT, url: APP_SCHEDULE_URL };

  return json(announcement, 200, request, env);
}

function cleanAnnouncement(value: Announcement): Announcement | undefined {
  const title = value.title?.trim().slice(0, 80);
  const body = value.body?.trim().slice(0, 180);
  if (!title || !body) return undefined;

  return {
    title,
    body,
    tag: value.tag?.trim().slice(0, 80) || 'bmc-show-alert',
    sentAt: new Date().toISOString(),
  };
}

async function deliverToSubscription(name: string, env: Env) {
  const stored = await env.PUSH_SUBSCRIPTIONS.get<StoredSubscription>(name, 'json');
  if (!stored?.subscription?.endpoint) {
    await env.PUSH_SUBSCRIPTIONS.delete(name);
    return { key: name, status: 'removed-invalid' };
  }

  if (stored.preferences.shows === false) {
    return { key: name, status: 'skipped' };
  }

  try {
    const response = await sendWakePush(stored.subscription, env);
    if (response.status === 404 || response.status === 410) {
      await env.PUSH_SUBSCRIPTIONS.delete(name);
      return { key: name, status: 'removed-expired', pushStatus: response.status };
    }
    return { key: name, status: response.ok ? 'sent' : 'failed', pushStatus: response.status };
  } catch {
    return { key: name, status: 'failed' };
  }
}

async function sendAnnouncement(request: Request, env: Env) {
  requireAdmin(request, env);
  const candidate = await readJson<Announcement>(request);
  const announcement = cleanAnnouncement(candidate);
  if (!announcement) {
    return json({ ok: false, error: 'Announcement requires a title and body.' }, 400, request, env);
  }

  await env.PUSH_SUBSCRIPTIONS.put(env.LATEST_ANNOUNCEMENT_KEY, JSON.stringify(announcement));

  const results: Awaited<ReturnType<typeof deliverToSubscription>>[] = [];
  let cursor: string | undefined;
  do {
    const list = await env.PUSH_SUBSCRIPTIONS.list({ prefix: 'sub:', cursor });
    results.push(...await Promise.all(list.keys.map(({ name }) => deliverToSubscription(name, env))));
    cursor = list.list_complete ? undefined : list.cursor;
  } while (cursor);

  return json({
    ok: true,
    announcement: { ...announcement, url: APP_SCHEDULE_URL },
    results,
  }, 200, request, env);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (request.method === 'OPTIONS') {
        requireAllowedOrigin(request, env);
        return new Response(null, { status: 204, headers: corsHeaders(request, env) });
      }

      if (request.method === 'POST' && (path === '/api/subscribe' || path === '/api/push/subscribe')) {
        return await saveSubscription(request, env);
      }

      if (request.method === 'POST' && path === '/api/unsubscribe') {
        return await removeSubscription(request, env);
      }

      if (request.method === 'GET' && (path === '/api/latest-announcement' || path === '/api/push/latest')) {
        return await latestAnnouncement(request, env);
      }

      if (request.method === 'POST' && path === '/api/send') {
        return await sendAnnouncement(request, env);
      }

      if (request.method === 'GET' && path === '/api/health') {
        return json({ ok: true, service: 'bmc-show-alerts' }, 200, request, env);
      }

      return json({ ok: false, error: 'Not found.' }, 404, request, env);
    } catch (error) {
      if (error instanceof Response) return error;
      return json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error.' }, 500, request, env);
    }
  },
};