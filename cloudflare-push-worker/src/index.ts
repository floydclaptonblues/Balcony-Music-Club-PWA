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
  url?: string;
  tag?: string;
  sentAt?: string;
};

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

function corsHeaders(env: Env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function json(data: unknown, status: number, env: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...corsHeaders(env),
    },
  });
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
    throw new Response('Unauthorized', { status: 401, headers: corsHeaders(env) });
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

function base64UrlDecode(value: string) {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), '=');
  const normalized = padded.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
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
  const derSignature = new Uint8Array(await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    key,
    new TextEncoder().encode(unsignedToken),
  ));

  return `${unsignedToken}.${base64UrlEncode(derSignature)}`;
}

function pushServiceOrigin(endpoint: string) {
  const url = new URL(endpoint);
  return `${url.protocol}//${url.host}`;
}

async function sendWakePush(subscription: PushSubscriptionJson, env: Env) {
  const audience = pushServiceOrigin(subscription.endpoint);
  const jwt = await signVapidJwt(audience, env);

  const response = await fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      TTL: '86400',
      Urgency: 'normal',
      Authorization: `vapid t=${jwt}, k=${env.VAPID_PUBLIC_KEY}`,
      'Content-Length': '0',
    },
  });

  return response;
}

async function saveSubscription(request: Request, env: Env) {
  const payload = await readJson<{
    subscription?: PushSubscriptionJson;
    preferences?: Partial<StoredSubscription['preferences']>;
  }>(request);

  if (!payload.subscription?.endpoint || !payload.subscription.keys?.p256dh || !payload.subscription.keys?.auth) {
    return json({ ok: false, error: 'Invalid push subscription payload.' }, 400, env);
  }

  const now = new Date().toISOString();
  const key = `sub:${await sha256Base64Url(payload.subscription.endpoint)}`;

  const stored: StoredSubscription = {
    subscription: payload.subscription,
    preferences: {
      shows: payload.preferences?.shows ?? true,
      days: payload.preferences?.days ?? ['wed', 'thu', 'fri', 'sat', 'sun'],
    },
    createdAt: now,
    updatedAt: now,
  };

  await env.PUSH_SUBSCRIPTIONS.put(key, JSON.stringify(stored));
  return json({ ok: true, key }, 200, env);
}

async function latestAnnouncement(_request: Request, env: Env) {
  const stored = await env.PUSH_SUBSCRIPTIONS.get(env.LATEST_ANNOUNCEMENT_KEY);
  if (!stored) {
    return json({
      title: 'Balcony Music Club',
      body: 'Show alerts are enabled.',
      url: 'https://floydclaptonblues.github.io/Balcony-Music-Club-PWA/#schedule',
      tag: 'bmc-show-alerts-enabled',
    }, 200, env);
  }

  return new Response(stored, {
    status: 200,
    headers: {
      ...JSON_HEADERS,
      ...corsHeaders(env),
    },
  });
}

async function sendAnnouncement(request: Request, env: Env) {
  requireAdmin(request, env);

  const announcement = await readJson<Announcement>(request);
  if (!announcement.title || !announcement.body) {
    return json({ ok: false, error: 'Announcement requires title and body.' }, 400, env);
  }

  const cleanAnnouncement: Announcement = {
    title: announcement.title.slice(0, 80),
    body: announcement.body.slice(0, 180),
    url: announcement.url || 'https://floydclaptonblues.github.io/Balcony-Music-Club-PWA/#schedule',
    tag: announcement.tag || `bmc-show-${new Date().toISOString().slice(0, 10)}`,
    sentAt: new Date().toISOString(),
  };

  await env.PUSH_SUBSCRIPTIONS.put(env.LATEST_ANNOUNCEMENT_KEY, JSON.stringify(cleanAnnouncement));

  const list = await env.PUSH_SUBSCRIPTIONS.list({ prefix: 'sub:' });
  const results = await Promise.allSettled(
    list.keys.map(async ({ name }) => {
      const stored = await env.PUSH_SUBSCRIPTIONS.get<StoredSubscription>(name, 'json');
      if (!stored?.subscription) return { key: name, status: 'missing' };

      const response = await sendWakePush(stored.subscription, env);

      if (response.status === 404 || response.status === 410) {
        await env.PUSH_SUBSCRIPTIONS.delete(name);
        return { key: name, status: 'removed-expired', pushStatus: response.status };
      }

      return { key: name, status: response.ok ? 'sent' : 'failed', pushStatus: response.status };
    }),
  );

  return json({ ok: true, announcement: cleanAnnouncement, results }, 200, env);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    const url = new URL(request.url);

    try {
      if (request.method === 'POST' && url.pathname === '/api/push/subscribe') {
        return await saveSubscription(request, env);
      }

      if (request.method === 'GET' && url.pathname === '/api/push/latest') {
        return await latestAnnouncement(request, env);
      }

      if (request.method === 'POST' && url.pathname === '/api/send') {
        return await sendAnnouncement(request, env);
      }

      if (request.method === 'GET' && url.pathname === '/api/health') {
        return json({ ok: true, service: 'bmc-show-alerts' }, 200, env);
      }

      return json({ ok: false, error: 'Not found.' }, 404, env);
    } catch (error) {
      if (error instanceof Response) return error;
      return json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error.' }, 500, env);
    }
  },
};
