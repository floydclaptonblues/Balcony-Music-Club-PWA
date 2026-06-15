const CACHE_NAME = 'bmc-guest-pwa-v36';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/assets/venue/photos.js',
  '/assets/venue/venue-gallery-local-patch.js',
  '/assets/bot/jazzycat-bot.js',
  '/assets/bot/bmc-contact-patch.js',
  '/assets/bot/hero-quality-patch.js',
  '/assets/bot/jazzycat-restore-patch.js',
  '/assets/bot/cosmic-restore-patch.js',
  '/assets/bot/management-schedule-patch.js',
  '/assets/bot/schedule-authority-patch.js'
];

const INDEX_NO_CIRCLES_PATCH = `<style id="bmc-index-no-circles">
html,body{background:#05020b!important;background-image:none!important;}
body:before,body:after{display:none!important;content:none!important;background:none!important;}
.bmc-ironwork{display:none!important;}
</style>`;
const HERO_QUALITY_PATCH = `<script src="assets/bot/hero-quality-patch.js?v=hero-quality-1"></script>`;
const JAZZYCAT_RESTORE_PATCH = `<script src="assets/bot/jazzycat-restore-patch.js?v=jazzycat-original-1"></script>`;
const COSMIC_RESTORE_PATCH = `<script src="assets/bot/cosmic-restore-patch.js?v=cosmic-restore-1"></script>`;
const MANAGEMENT_SCHEDULE_PATCH = `<script src="assets/bot/management-schedule-patch.js?v=full-schedule-restore-1"></script>`;
const SCHEDULE_AUTHORITY_PATCH = `<script src="assets/bot/schedule-authority-patch.js?v=upcoming-shows-authority-1"></script>`;
const VENUE_GALLERY_PATCH = `<script src="assets/venue/venue-gallery-local-patch.js?v=local-venue-2"></script>`;

function patchIndexHtml(html) {
  let patched = html;
  if (!patched.includes('bmc-index-no-circles')) patched = patched.replace('</head>', INDEX_NO_CIRCLES_PATCH + '</head>');
  if (!patched.includes('hero-quality-patch.js')) patched = patched.replace('</body>', HERO_QUALITY_PATCH + '</body>');
  if (!patched.includes('jazzycat-restore-patch.js')) patched = patched.replace('</body>', JAZZYCAT_RESTORE_PATCH + '</body>');
  if (!patched.includes('cosmic-restore-patch.js')) patched = patched.replace('</body>', COSMIC_RESTORE_PATCH + '</body>');
  if (!patched.includes('management-schedule-patch.js')) patched = patched.replace('</body>', MANAGEMENT_SCHEDULE_PATCH + '</body>');
  if (!patched.includes('schedule-authority-patch.js')) patched = patched.replace('</body>', SCHEDULE_AUTHORITY_PATCH + '</body>');
  if (!patched.includes('venue-gallery-local-patch.js')) patched = patched.replace('</body>', VENUE_GALLERY_PATCH + '</body>');
  return patched;
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isAppShell = url.pathname === '/' || url.pathname.endsWith('/index.html');
  if (isAppShell) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => response.text())
        .then((body) => new Response(patchIndexHtml(body), { headers: { 'Content-Type': 'text/html; charset=utf-8' } }))
        .catch(() => caches.match(event.request).then((cached) => cached ? cached.text().then((body) => new Response(patchIndexHtml(body), { headers: { 'Content-Type': 'text/html; charset=utf-8' } })) : Response.error()))
    );
    return;
  }

  event.respondWith(fetch(event.request, { cache: 'no-store' }).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); return response; }).catch(() => caches.match(event.request)));
});