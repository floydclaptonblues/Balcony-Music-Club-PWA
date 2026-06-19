# Balcony Music Club PWA

Fresh QR-ready Progressive Web App scaffold for Balcony Music Club.

This project is intentionally separate from prior Expo, AI Studio Android, and prototype app outputs.

## Source policy

Only use verified public-facing Balcony Music Club website content, verified Balcony Music Club GitHub repo content supplied by the owner, native assets supplied by the owner, or explicit booking/store/social/contact values approved by the owner. On 2026-06-05, the site owner approved reuse of public Balcony Music Club website content and art for this PWA, provided each reused item remains source-ledgered.

Do not invent bands, events, dates, ticket links, booking links, phone numbers, emails, merch links, livestreams, testimonials, venue claims, or video features.

Live video, login/accounts, checkout/payment processing, native app-store release, and automated schedule scraping are out of scope for this version. Real push notifications are scaffolded through Cloudflare Workers/KV but require Cloudflare configuration before guests can subscribe.

## Install and run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the app and deploys `dist` to GitHub Pages. Before enabling public deployment, confirm:

1. The repository name is `balcony-music-club-pwa`.
2. GitHub Pages is configured for GitHub Actions.
3. `src/data/appConfig.ts` has the final public URL.
4. Any image/art asset is source-ledgered and imported from approved website art or owner-supplied native assets.

## QR code

After the public URL is known, set `publicUrl` in `src/data/appConfig.ts`, then run:

```bash
npm run qr
```

This writes `public/qr.svg`. For this approved handoff, `public/qr.svg` and `public/qr.png` have already been generated for the planned GitHub Pages URL: `https://floydclaptonblues.github.io/balcony-music-club-pwa/`.

## Content control

Editable content lives in `src/data/`:

- `venueInfo.ts`
- `bookingInfo.ts`
- `bands.ts`
- `schedule.ts`
- `specialEvents.ts`
- `storeLinks.ts`
- `socialLinks.ts`
- `appConfig.ts`

Missing values are expected to fail gracefully with "not configured yet" messaging.

## Push notifications

Cloudflare setup instructions live in:

- `cloudflare-push-worker/README.md`
- `docs/PUSH_NOTIFICATIONS.md`

The first push milestone is one manual Wed-Sun show announcement from a protected Cloudflare Worker endpoint to an installed PWA. Automatic scheduling should wait until manual send is verified across desktop, Android, and installed iPhone/iPad PWA contexts.

## Approval log

See `APPROVAL_LOG.md` for ownership/source approval notes.

## Site asset inventory

Approved website art slots are tracked in `src/data/siteAssets.ts`. Local asset files still need to be imported into `public/assets/` before those images can be rendered in the guest UI.
