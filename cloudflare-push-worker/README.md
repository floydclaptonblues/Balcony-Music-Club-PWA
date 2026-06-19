# Balcony Music Club Cloudflare Push Worker

This Worker is the lightweight push-notification backend for the BMC PWA.

The first production goal is manual Wed-Sun show announcements:

1. A guest opens the installed BMC PWA.
2. The guest taps **Enable Show Alerts**.
3. The PWA saves the browser push subscription to Cloudflare KV.
4. An admin sends an announcement to `/api/send`.
5. The Worker sends a lightweight wake push.
6. The PWA service worker fetches `/api/push/latest` and displays the latest show announcement.

## Local setup

```bash
cd cloudflare-push-worker
npm install
npm run generate:vapid
```

Copy the generated public key into:

- `cloudflare-push-worker/wrangler.toml` as `VAPID_PUBLIC_KEY`
- root `.env.local` as `VITE_BMC_VAPID_PUBLIC_KEY`

Store the generated private JWK as a Worker secret:

```bash
npx wrangler secret put VAPID_PRIVATE_JWK
```

Create an admin token and store it as a secret:

```bash
npx wrangler secret put ADMIN_TOKEN
```

## KV setup

```bash
npx wrangler kv namespace create BMC_PUSH_SUBSCRIPTIONS
```

Paste the returned namespace id into `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "PUSH_SUBSCRIPTIONS"
id = "PASTE_ID_HERE"
```

## Deploy

```bash
npm run deploy
```

Copy the deployed Worker URL into root `.env.local`:

```bash
VITE_BMC_PUSH_API_URL=https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev
```

## Manual test announcement

```bash
curl -X POST "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/send" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "Tonight at Balcony Music Club",
    "body": "Live music tonight. No Cover • No Charge.",
    "url": "https://floydclaptonblues.github.io/Balcony-Music-Club-PWA/#schedule",
    "tag": "bmc-show-alert-test"
  }'
```

## Endpoints

- `GET /api/health` — sanity check
- `POST /api/push/subscribe` — public subscription endpoint used by the PWA
- `GET /api/push/latest` — latest announcement fetched by the service worker
- `POST /api/send` — protected announcement sender; requires `Authorization: Bearer <ADMIN_TOKEN>`

## Notes

This phase intentionally avoids automatic scheduling. Once manual send works reliably, add Cloudflare Cron Triggers for Wed-Sun scheduled announcements using verified schedule data only.
