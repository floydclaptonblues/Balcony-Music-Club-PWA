# Content TODOs

These are unresolved content or approval items. They are intentionally not guessed in the PWA.

## Blocking before public release

Ownership/permission approval for public website content and art was confirmed by the site owner on 2026-06-05. The remaining items are implementation/publication gates, not permission blockers.


- Provide or approve creation of the fresh GitHub repository named `balcony-music-club-pwa`.
- Approve GitHub Pages configuration before publishing.
- Provide the final public URL after Pages is enabled; then set `publicUrl` in `src/data/appConfig.ts` and run `npm run qr`.
- Select/import the official app icon/logo asset from approved website art or provide a native icon. Current icon is a generated placeholder marked as non-official.
- Import approved public website image bytes into `public/assets/` and wire them into the matching sections. Ownership/permission approval was confirmed on 2026-06-05.
- Confirm whether the app should show the Store product list as external links only, or hide store items until an approved commerce flow exists. This scaffold does not process checkout/payment.

## Current data gaps

- Existing Balcony Music Club GitHub repo content was not inspected because no matching connected repo was found and no repo URL was provided.
- The Shows page exposed a May 2026 schedule. As of the scaffold date, those dates are past, so the live guest schedule page filters them out and displays "not configured yet" until current/future schedule data is approved.
- `Ask JazzyCat` is present in public navigation but the visible parsed page content did not expose a reusable feature/body. It is excluded from the required PWA sections until approved.
- The `Events & Tickets` page visible data was headed "Previous events". It was inventoried, but the PWA does not present those dates as upcoming events.
- `SPECIAL GUEST` entries from the Shows page are preserved only in archived source schedule data; they are not treated as a band profile.
- Ambiguous `(KIM)` display on the May 24 schedule remains unnormalized. Do not infer the full band name without approval.
- General public contact email/phone beyond private-event booking and Paint and Sip numbers needs approval if desired.
- Mailing list signup is visible on the public site, but no safe reusable signup endpoint was extracted. It is not implemented.
- Real push notifications are out of scope. Notification Preferences stores only local, non-sending preferences.
- Live video is excluded for this version.
