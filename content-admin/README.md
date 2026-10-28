# BMC + Sierra content administration (development branch)

This is a **new, isolated administration service**, not a rewrite or replacement for existing public websites. The live BMC Homepage, UpcomingShows, PWA, livestream, SierraGreen site, and existing push-notification Worker are unchanged.

## What exists in this first implementation

- Two distinct admin pages: `/bmc.html` (Culley's BMC workflow) and `/sierra.html` (Sierra's workflow). They use one engine but never share show records, band records, or authorization.
- Create draft/published/cancelled shows; modify existing shows; copy a show to a new date; cancel without destroying the underlying record. Optimistic edit versions avoid silent concurrent overwrites.
- Create reusable band profiles and upload JPEG, PNG or WebP band photos (5 MB maximum). Existing BMC photo links are preserved in legacy seed data; new uploads are held in private R2 storage and served by a controlled read endpoint.
- A read-only public JSON feed for each organization. **Existing websites DO NOT consume it yet**. Publishing here will **not** update the existing live calendars until the migration is reviewed and switched.
- Cloudflare Access JWT signature, issuer, audience and expiry verification, plus a separate per-organization editor-email allowlist. SQL is tenant-scoped. All mutation operations check the same-site Origin and write audit records.
- Local SQL snapshots of the **47 October 2026 BMC performance slots across 19 dates**, including Epic Funk Brass Band on October 31 at 6 PM, and **3 archived Sierra Green performances**. Historical source files, photos and current deployments remain in place.

## Architecture

New Cloudflare Worker + Workers Static Assets + D1 database + R2 image bucket. No credentials or private keys are included in this repository. This Worker is separate from `cloudflare-push-worker`, which must not be modified or redeployed as part of the admin project.

Public read routes:
- `GET /api/public/bmc/shows`
- `GET /api/public/sierra/shows`
- `GET /api/public/:site/photo/:bandId`

Signed-in and site-authorized routes:
- `GET /api/admin/:site/data`
- `GET /api/admin/:site/audit`
- `POST /api/admin/:site/bands`
- `PUT /api/admin/:site/bands/:id/photo`
- `POST /api/admin/:site/shows`
- `PUT /api/admin/:site/shows/:id`
- `DELETE /api/admin/:site/shows/:id` (soft-cancel)

All show times are stored as venue-local **24-hour HH:MM**, with date stored separately as YYYY-MM-DD. BMC assumes America/Chicago; Sierra dates must use the *venue's* local clock time. End times may be blank. BMC's historic 2.5-hour slot end times are inherited calendar conventions, **not separately verified performance durations**. Sierra's original "10:00 PM–Close" is retained verbatim in the imported description.

## Setup (not done yet; Cloudflare account access required)

1. In `content-admin/`, run `npm install`, then `npm run check && npm test`.
2. Create new resources, **not** the existing BMC push-worker resources: `npx wrangler d1 create bmc-sierra-content` and `npx wrangler r2 bucket create bmc-sierra-band-photos`. D1/R2 costs and available plan limits should be reviewed before deployment.
3. Copy `wrangler.example.jsonc` to `wrangler.jsonc` (gitignored), enter the **new D1 database ID**, the Cloudflare Access team issuer, Access application AUD and the intended admin hostname. Set `ADMIN_HOST` to that exact hostname (without scheme).
4. Bind this **new** Worker to two different hostnames: an admin hostname (such as `admin.example.com`) and a public-data hostname (such as `feed.example.com`). Protect the entire admin hostname with a **hostname-scoped Cloudflare Access application**; do **not** use Worker-level protection because it would also block the public feed. Access must require sign-in for authorized personnel. Do not attach the new Worker to existing BMC production routes.
5. Configure secrets using `npx wrangler secret put BMC_EDITORS` and `npx wrangler secret put SIERRA_EDITORS` with comma-separated, approved email addresses. A user must both pass Access and have their **verified email** in the corresponding site's allowlist. Set appropriate Access policies: only designated people can reach the admin domain. **Never enter login passwords, Cloudflare tokens, or private addresses into GitHub source code.**
6. Initialize the new database with `npx wrangler d1 execute bmc-sierra-content --remote --file=./schema.sql`. **Before anyone starts editing**, import the snapshots with `npx wrangler d1 execute bmc-sierra-content --remote --file=./seed-bmc-2026-10.sql` and `npx wrangler d1 execute bmc-sierra-content --remote --file=./seed-sierra-2026.sql`.
7. Deploy with `npx wrangler deploy` only after the security settings and domains are ready. Verify that the admin hostname requires Access login, an unauthorized BMC editor cannot open Sierra's API, and the public feed hostname allows **GET only**. Test on desktop and mobile before connecting public consumers.

`wrangler.jsonc` and local development secrets are gitignored. The example config uses intentionally invalid placeholders; copying it without completing it cannot produce an operational deployment.

## Launch gate — intentionally NOT completed

**Do not point live sites to the new feed yet.** First compare imported show counts, individual titles, photo links, dates, and start/end times against the existing sources. Validate image upload, copy/edit/cancel, same-tenant authorization and cross-tenant denial. Review October 2026 and Sierra historical entries. After verification, connect the existing consumers with **read-through fallback to their original hardcoded data**:

- UpcomingShows `shows.json` consumption;
- BMC Homepage's schedule feed (already reads UpcomingShows);
- BMC Live Stream's schedule feed (already reads UpcomingShows);
- BMC PWA's `src/data/schedule.ts` and `assets/bot/schedule-authority-patch.js`;
- SierraGreen's `shows-data.js` and `home.js`.

Make one independent change at a time, preserve backups, inspect the website before/after and retain the ability to roll back GitHub-side integration. A **published** show in the admin currently appears only in the new read-only public feed. It will not appear on the existing public websites until the integration phase.

## Known phase-one limits

This code has not yet been deployed or tested against a configured Cloudflare account. Site data and photo uploads cannot be exercised end-to-end until D1, R2, Access and hostnames exist. The audit table records changes but there is not yet a one-click history restore feature. Date recurrence, batch uploads, message notifications, image cropping, rich content edits and a production cutover are later enhancements. No account identity, DNS, Cloudflare resources, or existing website hosting has been changed.

For safety, review this feature branch and test the new Worker in a staging configuration before any production merge.
