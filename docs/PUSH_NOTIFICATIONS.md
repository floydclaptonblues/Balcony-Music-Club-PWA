# BMC Push Notifications Rollout

## Phase 1 goal

Get one real manual show alert working from Cloudflare to an installed Balcony Music Club PWA.

Success means:

- The app still builds and loads without Cloudflare values.
- The Notify section explains that iPhone users may need to install the PWA first.
- A guest can tap **Enable Show Alerts**.
- A subscription is stored in Cloudflare KV.
- A protected manual send request displays a notification on the guest device.

## Why Cloudflare first

The BMC PWA is static and GitHub Pages-ready. Static hosting cannot safely store private push credentials or send push messages directly. Cloudflare Workers provide the small trusted backend needed for subscription storage and sending.

## Required Cloudflare pieces

- One Worker: `bmc-show-alerts`
- One KV namespace: `BMC_PUSH_SUBSCRIPTIONS`
- One public VAPID key in `wrangler.toml`
- One private VAPID JWK secret: `VAPID_PRIVATE_JWK`
- One admin token secret: `ADMIN_TOKEN`

## Required PWA pieces

- `public/push-sw.js` receives push wake events and displays the latest announcement.
- `src/lib/push.ts` registers the service worker, requests permission, subscribes the browser, and saves the subscription to Cloudflare.
- `.env.local` stores `VITE_BMC_PUSH_API_URL` and `VITE_BMC_VAPID_PUBLIC_KEY`.

## iPhone/iPad rule

iOS/iPadOS web push requires the website to be installed as a Home Screen web app before notifications work. The permission request also needs to happen after a user gesture, such as tapping **Enable Show Alerts**.

## Do not automate yet

Do not add scheduled Wed-Sun blasts until manual send is proven on:

- Desktop Chrome or Edge
- Android Chrome if available
- iPhone installed Home Screen PWA

## Manual send shape

```json
{
  "title": "Tonight at Balcony Music Club",
  "body": "6 PM and 9 PM live music. No Cover • No Charge.",
  "url": "https://floydclaptonblues.github.io/Balcony-Music-Club-PWA/#schedule",
  "tag": "bmc-show-alert-2026-06-19"
}
```

## Safety / trust rules

- Do not invent show data.
- Do not scrape unverified show data into notifications.
- Keep notifications concise.
- Prefer one daily Wed-Sun show announcement over repeated blasts.
- Remove expired subscriptions when push endpoints return 404 or 410.
