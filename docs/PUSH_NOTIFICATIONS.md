# BMC Push Notifications Rollout

## Purpose and safety

This scaffold adds an optional Cloudflare Worker for manual Wed–Sun show announcements. GitHub Pages continues to host the PWA. The production PWA remains safe to build and use with no Cloudflare account, Worker URL, or VAPID key configured.

Push is inactive unless both Vite values are present and non-placeholder:

```dotenv
VITE_BMC_PUSH_API_URL=
VITE_BMC_VAPID_PUBLIC_KEY=
```

The frontend never requests notification permission automatically. A guest must tap **Enable Show Alerts**. On iPhone, the guest must first choose **Add to Home Screen on iPhone**, open the saved BMC web app, and then tap the button.

## Exact setup for Ryan

1. From `cloudflare-push-worker`, install dependencies and generate a VAPID key pair:

   ```bash
   npm install
   npm run generate:vapid
   ```

2. Keep the generated private JWK off the frontend and out of Git. Log into Cloudflare and create the subscription store:

   ```bash
   npx wrangler login
   npx wrangler kv namespace create BMC_PUSH_SUBSCRIPTIONS
   ```

3. Copy the returned KV namespace id into `cloudflare-push-worker/wrangler.toml`. Copy the generated public VAPID key into its `VAPID_PUBLIC_KEY` variable. Confirm `ALLOWED_ORIGIN` is the exact GitHub Pages origin (`https://floydclaptonblues.github.io`) unless the PWA moves to another origin.

4. Add private values through the Cloudflare secret prompt only:

   ```bash
   npx wrangler secret put VAPID_PRIVATE_JWK
   npx wrangler secret put ADMIN_TOKEN
   ```

5. Validate before deployment:

   ```bash
   npm run typecheck
   npx wrangler deploy --dry-run
   ```

6. Deploy only when Ryan is ready:

   ```bash
   npm run deploy
   ```

7. Create root `.env.local` from `.env.example`, using the deployed Worker HTTPS URL and the public VAPID key. Do not add either private secret to `.env.local`.

   ```dotenv
   VITE_BMC_PUSH_API_URL=https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev
   VITE_BMC_VAPID_PUBLIC_KEY=YOUR_GENERATED_PUBLIC_VAPID_KEY
   ```

8. Build the PWA as usual:

   ```bash
   npm install
   npm run build
   ```

## Manual test send

After one installed PWA has subscribed, send a test wake-up notification. This example deliberately makes no claim about a real BMC event:

```bash
curl -X POST "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/send" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "BMC show-alert test",
    "body": "Test notification only. Check the schedule for verified show details.",
    "tag": "bmc-show-alert-test"
  }'
```

The Worker stores the last alert in KV, sends a no-payload wake-up push, and the PWA service worker fetches `GET /api/latest-announcement`. If that fetch fails, the guest sees a safe fallback and the notification opens the GitHub Pages schedule.

## Endpoint and storage behavior

- `POST /api/subscribe` and `POST /api/unsubscribe` manage KV-backed subscriptions.
- `POST /api/send` requires `ADMIN_TOKEN` and does not accept an arbitrary notification click URL.
- `GET /api/latest-announcement` is the service-worker lookup.
- CORS only grants the configured `ALLOWED_ORIGIN`; other browser origins are rejected.
- HTTP 404 and 410 push responses remove expired subscriptions; malformed records are removed safely.

## Source policy

- Do not invent events, dates, bands, ticket links, or availability.
- Send only verified, approved show details.
- Keep manual sends concise and limited to Wed–Sun show announcements.
- Do not paste VAPID_PRIVATE_JWK or ADMIN_TOKEN into frontend files, browser environment variables, screenshots, tickets, or Git.
