const CACHE_NAME = 'bmc-guest-pwa-v69-alert-topic-copy';
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
  '/assets/bot/schedule-authority-patch.js',
  '/assets/bands/bmc-band-assets/assets/bands/14FA40D0-F6EC-48BB-9A69-08C469C16B73.PNG',
  '/push-config.js',
  '/bmc-push-override.js',
  '/push-repair.html'
];

const INDEX_NO_CIRCLES_PATCH = `<style id="bmc-index-no-circles">
html,body{background:#05020b!important;background-image:none!important;}
body:before,body:after{display:none!important;content:none!important;background:none!important;}
.bmc-ironwork{display:none!important;}
</style>`;
const MUSIC_NOTE_STARS_PATCH = `<style id="bmc-music-note-stars">
.music-stars{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;opacity:.92;mix-blend-mode:screen;}
.music-stars .note-star{position:absolute;display:block;color:rgba(255,229,122,.7);font-family:Georgia,serif;font-weight:900;text-shadow:0 0 8px rgba(255,216,87,.45),0 0 18px rgba(94,230,255,.18);animation:musicStarDrift 72s linear infinite;}
.music-stars .n1{left:8%;top:14%;font-size:16px;animation-duration:76s;}
.music-stars .n2{left:23%;top:72%;font-size:12px;color:rgba(94,230,255,.55);animation-duration:96s;}
.music-stars .n3{left:39%;top:24%;font-size:18px;color:rgba(255,137,207,.52);animation-duration:88s;}
.music-stars .n4{left:57%;top:82%;font-size:14px;color:rgba(255,229,122,.58);animation-duration:104s;}
.music-stars .n5{left:72%;top:18%;font-size:13px;color:rgba(255,255,255,.52);animation-duration:90s;}
.music-stars .n6{left:88%;top:58%;font-size:20px;color:rgba(94,230,255,.48);animation-duration:112s;}
.music-stars .n7{left:14%;top:44%;font-size:11px;color:rgba(255,255,255,.38);animation-duration:120s;}
.music-stars .n8{left:64%;top:42%;font-size:15px;color:rgba(255,229,122,.50);animation-duration:84s;}
.music-stars .n9{left:81%;top:76%;font-size:12px;color:rgba(255,137,207,.42);animation-duration:108s;}
.music-stars .n10{left:46%;top:61%;font-size:10px;color:rgba(94,230,255,.42);animation-duration:118s;}
.music-stars:before,.music-stars:after{content:"";position:absolute;inset:-12%;background-repeat:repeat;will-change:transform;}
.music-stars:before{background-size:180px 180px,240px 240px;background-image:radial-gradient(circle at 24px 32px,rgba(255,229,122,.82) 0 1.2px,transparent 2px),radial-gradient(circle at 142px 118px,rgba(94,230,255,.58) 0 1px,transparent 2px);animation:musicDustA 96s linear infinite;}
.music-stars:after{background-size:260px 260px,320px 320px;background-image:radial-gradient(circle at 80px 72px,rgba(255,255,255,.46) 0 1px,transparent 2px),radial-gradient(circle at 218px 210px,rgba(255,137,207,.34) 0 1px,transparent 2px);animation:musicDustB 130s linear infinite;}
@keyframes musicStarDrift{from{transform:translate3d(0,0,0) rotate(0deg)}to{transform:translate3d(-42px,-88px,0) rotate(12deg)}}
@keyframes musicDustA{from{transform:translate3d(0,0,0)}to{transform:translate3d(-96px,-136px,0)}}
@keyframes musicDustB{from{transform:translate3d(0,0,0) scale(1.04)}to{transform:translate3d(78px,-92px,0) scale(1.1)}}
@media (prefers-reduced-motion:reduce){.music-stars .note-star,.music-stars:before,.music-stars:after{animation:none}}
</style>`;
const MUSIC_NOTE_STARS_LAYER = `<div class="music-stars" aria-hidden="true"><span class="note-star n1">&#9834;</span><span class="note-star n2">&#9835;</span><span class="note-star n3">&#9836;</span><span class="note-star n4">&#9834;</span><span class="note-star n5">&#9835;</span><span class="note-star n6">&#9836;</span><span class="note-star n7">&#9834;</span><span class="note-star n8">&#9835;</span><span class="note-star n9">&#9834;</span><span class="note-star n10">&#9836;</span></div>`;
const HERO_QUALITY_PATCH = `<script src="assets/bot/hero-quality-patch.js?v=hero-quality-1"></script>`;
const JAZZYCAT_RESTORE_PATCH = `<script src="assets/bot/jazzycat-restore-patch.js?v=jazzycat-original-1"></script>`;
const COSMIC_RESTORE_PATCH = `<script src="assets/bot/cosmic-restore-patch.js?v=cosmic-restore-1"></script>`;
const MANAGEMENT_SCHEDULE_PATCH = ``;
const SCHEDULE_AUTHORITY_PATCH = `<script src="assets/bot/schedule-authority-patch.js?v=20260704-band-photo-wire"></script>`;
const VENUE_GALLERY_PATCH = `<script src="assets/venue/venue-gallery-local-patch.js?v=local-venue-2"></script>`;

function patchJulyText(html) {
  return html
    .replace(/Scan, save, and check the June lineup\./gi, 'Scan, save, and check the July lineup.')
    .replace(/check the June lineup/gi, 'check the July lineup')
    .replace(/June 2026 live music/gi, 'July 2026 live music')
    .replace(/June schedule is embedded from the approved JazzyCatBotAI schedule snapshot\./gi, 'July schedule is loaded from the approved BMC schedule snapshot.');
}

function patchAlertTopicCopy(html) {
  return html
    .replace(/<h3>Local guest preferences<\/h3>/g, '<h3>ALERT TOPICS</h3>')
    .replace(/<span>Band schedule updates<\/span>/g, '<span>Drink Specials!</span>')
    .replace(/<span>Special events<\/span>/g, '<span>Exclusive Member Discounts!</span>')
    .replace(/<span>Store \/ merch updates<\/span>/g, '<span>Special Event Invitations!</span>');
}

function patchMusicNoteStars(html) {
  let patched = html;
  if (!patched.includes('bmc-music-note-stars')) patched = patched.replace('</head>', MUSIC_NOTE_STARS_PATCH + '</head>');
  if (!patched.includes('class="music-stars"')) patched = patched.replace('<body>', '<body>' + MUSIC_NOTE_STARS_LAYER);
  return patched;
}

function patchIndexHtml(html) {
  let patched = patchAlertTopicCopy(patchMusicNoteStars(patchJulyText(html)));
  if (!patched.includes('bmc-index-no-circles')) patched = patched.replace('</head>', INDEX_NO_CIRCLES_PATCH + '</head>');
  if (!patched.includes('hero-quality-patch.js')) patched = patched.replace('</body>', HERO_QUALITY_PATCH + '</body>');
  if (!patched.includes('jazzycat-restore-patch.js')) patched = patched.replace('</body>', JAZZYCAT_RESTORE_PATCH + '</body>');
  if (!patched.includes('cosmic-restore-patch.js')) patched = patched.replace('</body>', COSMIC_RESTORE_PATCH + '</body>');
  if (MANAGEMENT_SCHEDULE_PATCH && !patched.includes('management-schedule-patch.js')) patched = patched.replace('</body>', MANAGEMENT_SCHEDULE_PATCH + '</body>');
  patched = patched.replace(/assets\/bot\/schedule-authority-patch\.js\?v=[^"']+/g, 'assets/bot/schedule-authority-patch.js?v=20260704-band-photo-wire');
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
        .then((body) => new Response(patchIndexHtml(body), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }))
        .catch(() => caches.match(event.request).then((cached) => cached ? cached.text().then((body) => new Response(patchIndexHtml(body), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })) : Response.error()))
    );
    return;
  }

  event.respondWith(fetch(event.request, { cache: 'no-store' }).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); return response; }).catch(() => caches.match(event.request)));
});
