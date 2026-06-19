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
  url: string;
  tag: string;
  sentAt?: string;
};

type AlertPayload = {
  title?: unknown;
  body?: unknown;
  url?: unknown;
  tag?: unknown;
  sendAt?: unknown;
};

type DeliveryResult = {
  key: string;
  status: 'sent' | 'failed' | 'skipped' | 'removed-invalid' | 'removed-expired';
  pushStatus?: number;
};

type SendCounts = {
  subscriberCount: number;
  sentCount: number;
  failedCount: number;
  skippedCount: number;
  removedCount: number;
};

type SendOutcome = {
  announcement: Announcement;
  counts: SendCounts;
  results: DeliveryResult[];
};

type ScheduledAlertStatus = 'pending' | 'sending' | 'sent';

type ScheduledAlert = {
  id: string;
  title: string;
  body: string;
  url: string;
  tag: string;
  sendAt: string;
  createdAt: string;
  status: ScheduledAlertStatus;
  sendingAt?: string;
  sentAt?: string;
  result?: SendCounts;
  lastError?: string;
};

class RequestValidationError extends Error {}

const APP_SCHEDULE_URL = 'https://app.balconymusicclub.com/#schedule';
const SCHEDULED_ALERT_PREFIX = 'scheduled-alert:';
const SENDING_STALE_AFTER_MS = 15 * 60 * 1000;
const DEFAULT_ALERT: Announcement = {
  title: 'Balcony Music Club',
  body: 'Show alerts are enabled. Open the schedule for verified details.',
  url: APP_SCHEDULE_URL,
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
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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

function html(content: string) {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'self'",
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
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
    throw new RequestValidationError('Request body must be valid JSON.');
  }
}

function requireAdmin(request: Request, env: Env) {
  const expected = `Bearer ${env.ADMIN_TOKEN}`;
  if (request.headers.get('Authorization') !== expected) {
    throw json({ ok: false, error: 'Unauthorized.' }, 401, request, env);
  }
}

function requiredText(value: unknown, field: string, maximumLength: number) {
  if (typeof value !== 'string') {
    throw new RequestValidationError(`${field} is required.`);
  }

  const text = value.trim();
  if (!text) {
    throw new RequestValidationError(`${field} is required.`);
  }
  if (text.length > maximumLength) {
    throw new RequestValidationError(`${field} must be ${maximumLength} characters or fewer.`);
  }

  return text;
}

function optionalText(value: unknown, field: string, maximumLength: number, fallback: string) {
  if (value === undefined || value === null || value === '') return fallback;
  return requiredText(value, field, maximumLength);
}

function destinationUrl(value: unknown, required: boolean) {
  if (value === undefined || value === null || value === '') {
    if (!required) return APP_SCHEDULE_URL;
    throw new RequestValidationError('Destination URL is required.');
  }

  if (typeof value !== 'string') {
    throw new RequestValidationError('Destination URL must be a valid HTTPS URL.');
  }

  try {
    const parsed = new URL(value.trim());
    if (parsed.protocol !== 'https:') {
      throw new Error('Only HTTPS destinations are supported.');
    }
    return parsed.toString();
  } catch {
    throw new RequestValidationError('Destination URL must be a valid HTTPS URL.');
  }
}

function cleanAnnouncement(value: AlertPayload, options: { requireUrl: boolean; requireTag: boolean }): Announcement {
  return {
    title: requiredText(value.title, 'Title', 80),
    body: requiredText(value.body, 'Body', 180),
    url: destinationUrl(value.url, options.requireUrl),
    tag: options.requireTag
      ? requiredText(value.tag, 'Tag', 80)
      : optionalText(value.tag, 'Tag', 80, 'bmc-show-alert'),
    sentAt: new Date().toISOString(),
  };
}

function parseScheduledSendAt(value: unknown) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) {
    throw new RequestValidationError('Send time must be an ISO date-time with a timezone.');
  }

  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    throw new RequestValidationError('Send time must be a valid date and time.');
  }
  if (timestamp <= Date.now()) {
    throw new RequestValidationError('Send time must be in the future.');
  }

  return new Date(timestamp).toISOString();
}

function scheduledAlertKey(id: string) {
  return `${SCHEDULED_ALERT_PREFIX}${id}`;
}

function validScheduledId(id: string) {
  return /^[a-zA-Z0-9-]{8,80}$/.test(id);
}

function asScheduledAlert(value: unknown): ScheduledAlert | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const alert = value as Partial<ScheduledAlert>;
  if (
    typeof alert.id !== 'string'
    || typeof alert.title !== 'string'
    || typeof alert.body !== 'string'
    || typeof alert.url !== 'string'
    || typeof alert.tag !== 'string'
    || typeof alert.sendAt !== 'string'
    || typeof alert.createdAt !== 'string'
    || (alert.status !== 'pending' && alert.status !== 'sending' && alert.status !== 'sent')
  ) {
    return undefined;
  }
  return alert as ScheduledAlert;
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
  const stored = await env.PUSH_SUBSCRIPTIONS.get<Partial<Announcement>>(env.LATEST_ANNOUNCEMENT_KEY, 'json');
  const announcement: Announcement = stored?.title && stored.body
    ? {
      ...DEFAULT_ALERT,
      ...stored,
      url: typeof stored.url === 'string' ? stored.url : APP_SCHEDULE_URL,
    }
    : DEFAULT_ALERT;

  return json(announcement, 200, request, env);
}

async function deliverToSubscription(name: string, env: Env): Promise<DeliveryResult> {
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

function countDeliveryResults(results: DeliveryResult[]): SendCounts {
  return results.reduce<SendCounts>((counts, result) => {
    if (result.status === 'sent') counts.sentCount += 1;
    if (result.status === 'failed') counts.failedCount += 1;
    if (result.status === 'skipped') counts.skippedCount += 1;
    if (result.status === 'removed-invalid' || result.status === 'removed-expired') counts.removedCount += 1;
    return counts;
  }, {
    subscriberCount: results.length,
    sentCount: 0,
    failedCount: 0,
    skippedCount: 0,
    removedCount: 0,
  });
}

async function sendPreparedAnnouncement(announcement: Announcement, env: Env): Promise<SendOutcome> {
  await env.PUSH_SUBSCRIPTIONS.put(env.LATEST_ANNOUNCEMENT_KEY, JSON.stringify(announcement));

  const results: DeliveryResult[] = [];
  let cursor: string | undefined;
  do {
    const list = await env.PUSH_SUBSCRIPTIONS.list({ prefix: 'sub:', cursor });
    results.push(...await Promise.all(list.keys.map(({ name }) => deliverToSubscription(name, env))));
    cursor = list.list_complete ? undefined : list.cursor;
  } while (cursor);

  return {
    announcement,
    counts: countDeliveryResults(results),
    results,
  };
}

function sendResponse(outcome: SendOutcome) {
  return {
    ok: true,
    announcement: outcome.announcement,
    counts: outcome.counts,
    results: outcome.results,
  };
}

async function sendAnnouncement(request: Request, env: Env) {
  requireAdmin(request, env);
  const candidate = await readJson<AlertPayload>(request);
  const outcome = await sendPreparedAnnouncement(
    cleanAnnouncement(candidate, { requireUrl: false, requireTag: false }),
    env,
  );

  return json(sendResponse(outcome), 200, request, env);
}

async function sendNow(request: Request, env: Env) {
  requireAdmin(request, env);
  const candidate = await readJson<AlertPayload>(request);
  const outcome = await sendPreparedAnnouncement(
    cleanAnnouncement(candidate, { requireUrl: true, requireTag: true }),
    env,
  );

  return json(sendResponse(outcome), 200, request, env);
}

async function listAllScheduledAlerts(env: Env) {
  const alerts: ScheduledAlert[] = [];
  let cursor: string | undefined;
  do {
    const list = await env.PUSH_SUBSCRIPTIONS.list({ prefix: SCHEDULED_ALERT_PREFIX, cursor });
    const values = await Promise.all(list.keys.map(async ({ name }) => {
      const value = await env.PUSH_SUBSCRIPTIONS.get<unknown>(name, 'json');
      return asScheduledAlert(value);
    }));
    alerts.push(...values.filter((alert): alert is ScheduledAlert => Boolean(alert)));
    cursor = list.list_complete ? undefined : list.cursor;
  } while (cursor);

  return alerts.sort((left, right) => left.sendAt.localeCompare(right.sendAt));
}

async function scheduleAlert(request: Request, env: Env) {
  requireAdmin(request, env);
  const candidate = await readJson<AlertPayload>(request);
  const announcement = cleanAnnouncement(candidate, { requireUrl: true, requireTag: true });
  const now = new Date().toISOString();
  const alert: ScheduledAlert = {
    id: crypto.randomUUID(),
    title: announcement.title,
    body: announcement.body,
    url: announcement.url,
    tag: announcement.tag,
    sendAt: parseScheduledSendAt(candidate.sendAt),
    createdAt: now,
    status: 'pending',
  };

  await env.PUSH_SUBSCRIPTIONS.put(scheduledAlertKey(alert.id), JSON.stringify(alert));
  return json({ ok: true, id: alert.id, alert }, 201, request, env);
}

async function getScheduledAlerts(request: Request, env: Env) {
  requireAdmin(request, env);
  const alerts = (await listAllScheduledAlerts(env)).filter((alert) => alert.status === 'pending');
  return json({ ok: true, alerts }, 200, request, env);
}

async function cancelScheduledAlert(request: Request, env: Env, id: string) {
  requireAdmin(request, env);
  if (!validScheduledId(id)) {
    return json({ ok: false, error: 'Scheduled alert ID is invalid.' }, 400, request, env);
  }

  const key = scheduledAlertKey(id);
  const alert = asScheduledAlert(await env.PUSH_SUBSCRIPTIONS.get<unknown>(key, 'json'));
  if (!alert) {
    return json({ ok: false, error: 'Scheduled alert was not found.' }, 404, request, env);
  }
  if (alert.status !== 'pending') {
    return json({ ok: false, error: 'Only pending alerts can be cancelled.' }, 409, request, env);
  }

  await env.PUSH_SUBSCRIPTIONS.delete(key);
  return json({ ok: true, id }, 200, request, env);
}

function isDue(alert: ScheduledAlert, now: number) {
  return Date.parse(alert.sendAt) <= now;
}

function isStaleSending(alert: ScheduledAlert, now: number) {
  return alert.status === 'sending'
    && Boolean(alert.sendingAt)
    && Date.parse(alert.sendingAt as string) <= now - SENDING_STALE_AFTER_MS;
}

async function claimScheduledAlert(alert: ScheduledAlert, env: Env, now: number) {
  const key = scheduledAlertKey(alert.id);
  const latest = asScheduledAlert(await env.PUSH_SUBSCRIPTIONS.get<unknown>(key, 'json'));
  if (!latest) return undefined;

  const canClaim = (latest.status === 'pending' && isDue(latest, now)) || isStaleSending(latest, now);
  if (!canClaim) return undefined;

  const claimed: ScheduledAlert = {
    ...latest,
    status: 'sending',
    sendingAt: new Date(now).toISOString(),
  };
  await env.PUSH_SUBSCRIPTIONS.put(key, JSON.stringify(claimed));
  return claimed;
}

async function processDueScheduledAlerts(env: Env) {
  const now = Date.now();
  const alerts = await listAllScheduledAlerts(env);

  for (const alert of alerts) {
    if (!(alert.status === 'pending' && isDue(alert, now)) && !isStaleSending(alert, now)) continue;

    const claimed = await claimScheduledAlert(alert, env, now);
    if (!claimed) continue;

    try {
      const outcome = await sendPreparedAnnouncement({
        title: claimed.title,
        body: claimed.body,
        url: claimed.url,
        tag: claimed.tag,
        sentAt: new Date().toISOString(),
      }, env);
      const sent: ScheduledAlert = {
        ...claimed,
        status: 'sent',
        sentAt: new Date().toISOString(),
        result: outcome.counts,
      };
      await env.PUSH_SUBSCRIPTIONS.put(scheduledAlertKey(claimed.id), JSON.stringify(sent));
    } catch (error) {
      const retryable: ScheduledAlert = {
        ...claimed,
        status: 'pending',
        lastError: error instanceof Error ? error.message.slice(0, 200) : 'Scheduled send failed.',
      };
      delete retryable.sendingAt;
      await env.PUSH_SUBSCRIPTIONS.put(scheduledAlertKey(claimed.id), JSON.stringify(retryable));
    }
  }
}

function adminPage() {
  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BMC Show Alerts Admin</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #17120f; color: #f7eee4; }
    * { box-sizing: border-box; }
    body { margin: 0; min-width: 320px; }
    main { width: min(900px, calc(100% - 32px)); margin: 0 auto; padding: 40px 0 64px; }
    h1, h2 { font-family: Georgia, serif; letter-spacing: .02em; }
    h1 { margin: 0 0 8px; font-size: clamp(2rem, 6vw, 3.2rem); }
    h2 { margin: 0 0 16px; font-size: 1.35rem; }
    p { line-height: 1.5; color: #d9c9b9; }
    .eyebrow { color: #e0a23b; font-size: .78rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 20px; }
    .card { margin-top: 24px; padding: 24px; border: 1px solid #5a4436; border-radius: 14px; background: #231a16; box-shadow: 0 12px 32px rgba(0,0,0,.18); }
    label { display: grid; gap: 7px; margin: 0 0 14px; color: #f7eee4; font-weight: 700; font-size: .92rem; }
    input, textarea, button { font: inherit; }
    input, textarea { width: 100%; border: 1px solid #785a45; border-radius: 8px; padding: 10px 12px; color: #fff8f0; background: #140f0d; }
    textarea { min-height: 94px; resize: vertical; }
    input:focus, textarea:focus { outline: 2px solid #e0a23b; outline-offset: 1px; }
    .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    button { cursor: pointer; border: 1px solid #e0a23b; border-radius: 8px; padding: 10px 14px; color: #21150d; background: #e0a23b; font-weight: 800; }
    button.secondary, .scheduled button { color: #f7eee4; background: transparent; border-color: #967158; }
    button:hover { filter: brightness(1.08); }
    button:disabled { opacity: .6; cursor: wait; }
    .notice { min-height: 24px; margin: 18px 0 0; padding: 0; font-weight: 700; }
    .notice.success { color: #8ad5a0; }
    .notice.error { color: #ff9f8c; }
    .quiet { color: #bba896; font-size: .88rem; }
    .scheduled { list-style: none; display: grid; gap: 12px; margin: 0; padding: 0; }
    .scheduled li { display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: start; border-top: 1px solid #4f3b30; padding-top: 14px; }
    .scheduled li:first-child { border-top: 0; padding-top: 0; }
    .scheduled p { margin: 5px 0; }
    .scheduled time { color: #e0a23b; font-size: .9rem; }
    @media (max-width: 520px) { .pair { grid-template-columns: 1fr; } .scheduled li { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <div class="eyebrow">Private operator console</div>
    <h1>BMC Show Alerts</h1>
    <p>Use this Worker-hosted console to send or schedule a show alert. The admin token stays only in this browser tab's session storage.</p>

    <section class="card">
      <label for="admin-token">ADMIN_TOKEN
        <input id="admin-token" type="password" autocomplete="off" spellcheck="false" placeholder="Enter admin token">
      </label>
      <p class="quiet">Never paste this token into the public BMC app or a shared document.</p>
    </section>

    <div class="grid">
      <section class="card">
        <h2>Send now</h2>
        <form id="send-now-form">
          <label>Title <input name="title" maxlength="80" required></label>
          <label>Body <textarea name="body" maxlength="180" required></textarea></label>
          <label>Destination URL <input name="url" type="url" value="https://app.balconymusicclub.com/#schedule" required></label>
          <label>Tag <input name="tag" maxlength="80" value="bmc-show-alert" required></label>
          <button type="submit">Send alert now</button>
        </form>
      </section>

      <section class="card">
        <h2>Schedule alert</h2>
        <form id="schedule-form">
          <label>Title <input name="title" maxlength="80" required></label>
          <label>Body <textarea name="body" maxlength="180" required></textarea></label>
          <label>Destination URL <input name="url" type="url" value="https://app.balconymusicclub.com/#schedule" required></label>
          <label>Tag <input name="tag" maxlength="80" value="bmc-show-alert" required></label>
          <div class="pair">
            <label>Send date <input id="send-date" name="sendDate" type="date" required></label>
            <label>Send time <input id="send-time" name="sendTime" type="time" required></label>
          </div>
          <p class="quiet">All scheduled times are America/Chicago — New Orleans venue time.</p>
          <button type="submit">Schedule alert</button>
        </form>
      </section>
    </div>

    <section class="card">
      <div class="grid" style="align-items:center;grid-template-columns:1fr auto">
        <div><h2>Pending alerts</h2><p class="quiet">Only pending items appear here. Sent items remain in Worker KV as a small audit record.</p></div>
        <button id="refresh-scheduled" class="secondary" type="button">Refresh list</button>
      </div>
      <ul id="scheduled-list" class="scheduled"><li><span class="quiet">Enter the admin token, then refresh this list.</span></li></ul>
    </section>
    <p id="notice" class="notice" role="status" aria-live="polite"></p>
  </main>
  <script>
    const tokenInput = document.getElementById('admin-token');
    const notice = document.getElementById('notice');
    const scheduledList = document.getElementById('scheduled-list');
    const sendForm = document.getElementById('send-now-form');
    const scheduleForm = document.getElementById('schedule-form');
    const refreshButton = document.getElementById('refresh-scheduled');

    tokenInput.value = sessionStorage.getItem('bmc-admin-token') || '';
    tokenInput.addEventListener('input', () => {
      if (tokenInput.value) sessionStorage.setItem('bmc-admin-token', tokenInput.value);
      else sessionStorage.removeItem('bmc-admin-token');
    });

    function setNotice(message, type) {
      notice.textContent = message;
      notice.className = 'notice ' + (type || '');
    }

    function token() {
      const value = tokenInput.value.trim();
      if (!value) throw new Error('Enter ADMIN_TOKEN first.');
      sessionStorage.setItem('bmc-admin-token', value);
      return value;
    }

    async function api(path, options) {
      const response = await fetch(path, {
        method: options && options.method ? options.method : 'GET',
        headers: {
          'Authorization': 'Bearer ' + token(),
          ...(options && options.body ? { 'Content-Type': 'application/json' } : {}),
        },
        body: options && options.body ? JSON.stringify(options.body) : undefined,
        cache: 'no-store',
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) throw new Error('Unauthorized: ADMIN_TOKEN was not accepted.');
      if (!response.ok) throw new Error(data.error || ('Request failed (HTTP ' + response.status + ').'));
      return data;
    }

    function formValues(form) {
      return Object.fromEntries(new FormData(form).entries());
    }

    function chicagoNowParts() {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
      }).formatToParts(new Date());
      return Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
    }

    function timeZoneOffset(instant) {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
      }).formatToParts(new Date(instant));
      const data = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
      return Date.UTC(Number(data.year), Number(data.month) - 1, Number(data.day), Number(data.hour), Number(data.minute), Number(data.second)) - instant;
    }

    function chicagoDateTimeToIso(dateValue, timeValue) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue) || !/^\d{2}:\d{2}$/.test(timeValue)) {
        throw new Error('Choose both a send date and send time.');
      }
      const values = dateValue.split('-').concat(timeValue.split(':')).map(Number);
      const wallClock = Date.UTC(values[0], values[1] - 1, values[2], values[3], values[4], 0);
      let instant = wallClock;
      for (let index = 0; index < 3; index += 1) instant = wallClock - timeZoneOffset(instant);

      const check = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
      }).formatToParts(new Date(instant));
      const data = Object.fromEntries(check.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
      const normalized = data.year + '-' + data.month + '-' + data.day + 'T' + data.hour + ':' + data.minute;
      if (normalized !== dateValue + 'T' + timeValue) {
        throw new Error('That New Orleans time does not exist because of daylight saving time. Choose another time.');
      }
      return new Date(instant).toISOString();
    }

    function formatChicago(iso) {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short',
      }).format(new Date(iso)) + ' New Orleans time';
    }

    async function cancelAlert(id) {
      if (!window.confirm('Cancel this scheduled alert?')) return;
      try {
        await api('/api/admin/scheduled/' + encodeURIComponent(id), { method: 'DELETE' });
        setNotice('Cancelled successfully.', 'success');
        await refreshScheduled();
      } catch (error) {
        setNotice(error.message || 'Could not cancel the alert.', 'error');
      }
    }

    function renderScheduled(alerts) {
      scheduledList.replaceChildren();
      if (!alerts.length) {
        const item = document.createElement('li');
        const text = document.createElement('span');
        text.className = 'quiet';
        text.textContent = 'No pending scheduled alerts.';
        item.append(text);
        scheduledList.append(item);
        return;
      }
      alerts.forEach((alert) => {
        const item = document.createElement('li');
        const detail = document.createElement('div');
        const title = document.createElement('strong');
        title.textContent = alert.title;
        const body = document.createElement('p');
        body.textContent = alert.body;
        const time = document.createElement('time');
        time.dateTime = alert.sendAt;
        time.textContent = formatChicago(alert.sendAt);
        const meta = document.createElement('p');
        meta.className = 'quiet';
        meta.textContent = alert.tag + ' · ' + alert.url;
        detail.append(title, body, time, meta);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'secondary';
        button.textContent = 'Cancel';
        button.addEventListener('click', () => cancelAlert(alert.id));
        item.append(detail, button);
        scheduledList.append(item);
      });
    }

    async function refreshScheduled() {
      try {
        refreshButton.disabled = true;
        const data = await api('/api/admin/scheduled');
        renderScheduled(data.alerts || []);
      } catch (error) {
        setNotice(error.message || 'Could not load scheduled alerts.', 'error');
      } finally {
        refreshButton.disabled = false;
      }
    }

    sendForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = sendForm.querySelector('button[type="submit"]');
      try {
        button.disabled = true;
        const data = await api('/api/admin/send-now', { method: 'POST', body: formValues(sendForm) });
        const counts = data.counts;
        if (counts.subscriberCount === 0) {
          setNotice('No subscribers: alert was saved, but no push notifications were sent.', 'error');
        } else {
          setNotice('Sent ' + counts.sentCount + ' of ' + counts.subscriberCount + ' subscribers; failed: ' + counts.failedCount + '; removed: ' + counts.removedCount + '.', counts.failedCount ? 'error' : 'success');
        }
      } catch (error) {
        setNotice(error.message || 'Could not send the alert.', 'error');
      } finally {
        button.disabled = false;
      }
    });

    scheduleForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = scheduleForm.querySelector('button[type="submit"]');
      try {
        button.disabled = true;
        const values = formValues(scheduleForm);
        values.sendAt = chicagoDateTimeToIso(values.sendDate, values.sendTime);
        delete values.sendDate;
        delete values.sendTime;
        const data = await api('/api/admin/schedule', { method: 'POST', body: values });
        setNotice('Scheduled successfully for ' + formatChicago(data.alert.sendAt) + '.', 'success');
        scheduleForm.reset();
        setChicagoDateDefault();
        await refreshScheduled();
      } catch (error) {
        setNotice(error.message || 'Could not schedule the alert.', 'error');
      } finally {
        button.disabled = false;
      }
    });

    function setChicagoDateDefault() {
      const parts = chicagoNowParts();
      document.getElementById('send-date').value = parts.year + '-' + parts.month + '-' + parts.day;
    }

    refreshButton.addEventListener('click', refreshScheduled);
    setChicagoDateDefault();
    if (tokenInput.value) refreshScheduled();
  </script>
</body>
</html>`;
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

      if (request.method === 'GET' && path === '/admin') {
        return html(adminPage());
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

      if (request.method === 'POST' && path === '/api/admin/send-now') {
        return await sendNow(request, env);
      }

      if (request.method === 'POST' && path === '/api/admin/schedule') {
        return await scheduleAlert(request, env);
      }

      if (request.method === 'GET' && path === '/api/admin/scheduled') {
        return await getScheduledAlerts(request, env);
      }

      if (request.method === 'DELETE' && path.startsWith('/api/admin/scheduled/')) {
        return await cancelScheduledAlert(request, env, path.slice('/api/admin/scheduled/'.length));
      }

      if (request.method === 'GET' && path === '/api/health') {
        return json({ ok: true, service: 'bmc-show-alerts' }, 200, request, env);
      }

      return json({ ok: false, error: 'Not found.' }, 404, request, env);
    } catch (error) {
      if (error instanceof Response) return error;
      if (error instanceof RequestValidationError) {
        return json({ ok: false, error: error.message }, 400, request, env);
      }
      return json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error.' }, 500, request, env);
    }
  },

  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(processDueScheduledAlerts(env));
  },
};
