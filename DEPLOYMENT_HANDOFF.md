# Deployment Handoff — Balcony Music Club PWA

Date: 2026-06-05
Owner account detected through GitHub connector: `floydclaptonblues`
Target repo name: `balcony-music-club-pwa`
Planned GitHub Pages URL: `https://floydclaptonblues.github.io/balcony-music-club-pwa/`

## Current status

Completed locally:

- Fresh React + Vite + TypeScript PWA project exists.
- Production build passes.
- GitHub Pages workflow exists at `.github/workflows/deploy.yml`.
- Source ledger exists.
- Content TODO list exists.
- Website/public art reuse is owner-approved and logged in `APPROVAL_LOG.md`.
- Live video remains excluded.
- Planned public URL is configured in `src/data/appConfig.ts`.
- QR assets were generated for the planned public URL:
  - `public/qr.svg`
  - `public/qr.png`

Blocked by available ChatGPT GitHub connector actions:

- The connected GitHub tool can list/search repositories and create/update files inside an existing repository.
- The connected GitHub tool exposed here does not provide a repository-creation action.
- The connected GitHub tool exposed here does not provide a GitHub Pages settings action.
- The requested repo `floydclaptonblues/balcony-music-club-pwa` was not found during connector verification.

## Exact manual publish path

Create a new empty public repository on GitHub named:

```text
balcony-music-club-pwa
```

Do not initialize it with README, `.gitignore`, or license if you want the cleanest push from this folder.

Then run this from the project folder:

```bash
git init
git branch -M main
git add .
git commit -m "Initial Balcony Music Club QR-ready PWA"
git remote add origin https://github.com/floydclaptonblues/balcony-music-club-pwa.git
git push -u origin main
```

Then in GitHub:

1. Open the repository settings.
2. Go to **Pages**.
3. Set **Build and deployment** source to **GitHub Actions**.
4. Run the workflow named **Deploy PWA to GitHub Pages**, or push another commit to `main`.
5. Confirm the deployed URL opens:

```text
https://floydclaptonblues.github.io/balcony-music-club-pwa/
```

## Verification checklist after publish

- Desktop loads the public URL.
- Mobile loads the public URL.
- Browser install prompt or add-to-home-screen behavior is available.
- `/manifest.webmanifest` loads.
- `/qr.svg` loads.
- `/qr.png` loads.
- No video feature appears.
- Missing data uses clean “not configured yet” messaging.
- Source ledger and content TODOs remain in repo.

## QR code

The QR code already points to:

```text
https://floydclaptonblues.github.io/balcony-music-club-pwa/
```

Files:

```text
public/qr.svg
public/qr.png
```

These are valid QR assets, but the link will only resolve after the repository exists and GitHub Pages has deployed successfully.
