# Balcony Music Club Cloudflare Push Worker

This is the optional, KV-backed backend for manual BMC show-alert sends. It does not change the GitHub Pages PWA deployment path.

The Worker is deliberately inactive until Ryan configures Cloudflare, creates a KV namespace, adds the VAPID private key and admin token as secrets, deploys it, and then supplies the Worker URL plus VAPID public key to the PWA.

## Endpoints

- `POST /api/subscribe` â€” saves an installed-PWA push subscription. The legacy `/api/push/subscribe` alias is also accepted.
- `POST /api/unsubscribe` â€” removes a subscription by endpoint.
- `GET /api/latest-announcement` â€” returns the latest alert for the PWA service worker. The legacy `/api/push/latest` alias is also accepted.
- `POST /api/send` â€” protected by `Authorization: Bearer <ADMIN_TOKEN>`; stores a manual alert and sends wake-up pushes.
- `GET /api/health` â€” basic health check.

Public browser endpoints reject origins other than the `ALLOWED_ORIGIN` configured in `wrangler.toml`. Expired subscriptions are removed when the push service returns HTTP 404 or 410; malformed stored subscriptions are removed safely.

## Ryan's Cloudflare setup

From this directory:

```bash
npm install
npm run generate:vapid
npx wrangler login
npx wrangler kv namespace create BMC_PUSH_SUBSCRIPTIONS
```

Paste the namespace id printed by the KV command into `wrangler.toml` at `kv_namespaces[0].id`. Copy only the generated VAPID public key to `VAPID_PUBLIC_KEY` in that same file and to the root PWA `.env.local` file.

Store the generated private JWK and a newly generated long random admin token as Worker secrets. Never put either value in `wrangler.toml`, `.env.example`, `.dev.vars.example`, the Vite environment, or source control.

```bash
npx wrangler secret put VAPID_PRIVATE_JWK
npx wrangler secret put ADMIN_TOKEN
```

After filling the public configuration, deploy only when ready:

```bash
npm run deploy
```

Then put the deployed HTTPS Worker URL and the VAPID public key in the root `.env.local`:

```dotenv
VITE_BMC_PUSH_API_URL=https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev
VITE_BMC_VAPID_PUBLIC_KEY=YOUR_GENERATED_PUBLIC_VAPID_KEY
```

Restart the Vite build after changing `.env.local`.

## Local validation

The checked-in `.dev.vars.example` contains placeholders only. Copy it to `.dev.vars` only for local Worker testing, fill local test values without committing the file, then run:

```bash
npm run typecheck
npx wrangler deploy --dry-run
```

The dry-run command is for validation only; it must not be used as a substitute for reviewing the configuration before an intentional deployment.

## Manual send test

Run this only after an installed PWA has subscribed, after deployment, and with an ADMIN_TOKEN value known only to the sender. The example is a test message, not a real show announcement.

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

For a real send, replace only the title and body with verified, approved show information. The Worker always sends notification clicks to the GitHub Pages schedule URL and does not accept arbitrary click links.