const CACHE_NAME = 'bmc-guest-pwa-v83-headliner-photos';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/assets/venue/photos.js',
  '/assets/venue/venue-gallery-local-patch.js',
  '/assets/venue/jazzycat-ufo-orbit.js',
  '/assets/venue/bmc_jazzycat_ufo_360_rotation.gif',
  '/assets/venue/bmc-drink-menu-patch.js',
  '/assets/venue/1000019805.jpg',
  '/assets/bot/jazzycat-bot.js',
  '/assets/bot/bmc-contact-patch.js',
  '/assets/bot/hero-quality-patch.js',
  '/assets/bot/jazzycat-restore-patch.js',
  '/assets/bot/cosmic-restore-patch.js',
  '/assets/bot/schedule-authority-patch.js',
  '/assets/bands/bmc-band-assets/assets/bands/andre-lovett-band.jpg',
  '/assets/bands/bmc-band-assets/assets/bands/dapper-dandies.jpg',
  '/assets/bands/bmc-band-assets/assets/bands/sugar-and-the-daddies.jpg',
  '/assets/bands/bmc-band-assets/assets/bands/woodys-rampage.jpg',
  '/assets/bands/bmc-band-assets/assets/bands/big-mike-rb-kings.webp',
  '/assets/bands/bmc-band-assets/assets/bands/sierra-green.jpg',
  '/assets/bands/bmc-band-assets/assets/bands/kim-in-the-wind.webp',
  '/assets/bands/bmc-band-assets/assets/bands/kat-kiley-experience.webp',
  '/push-config.js',
  '/bmc-push-override.js',
  '/push-repair.html'
];

const ALERT_COPY = 'Tap Enable Show Alerts below. Your browser will ask for notification permission before BMC can send show announcements to this device.';

const INDEX_NO_CIRCLES_PATCH = `<style id="bmc-index-no-circles">
html,body{background:#05020b!important;background-image:none!important;}
body:before,body:after{display:none!important;content:none!important;background:none!important;}
.bmc-ironwork{display:none!important;}
</style>`;

const MUSIC_NOTE_STARS_PATCH = `<style id="bmc-music-note-stars">
.music-stars{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;opacity:.9;mix-blend-mode:screen;perspective:1100px;perspective-origin:50% 48%;transform-style:preserve-3d;}
.music-stars .note-star{position:absolute;display:block;font-family:Georgia,serif;font-weight:900;text-shadow:0 0 10px rgba(255,216,87,.48),0 0 24px rgba(94,230,255,.22);transform-style:preserve-3d;backface-visibility:visible;will-change:transform;animation-timing-function:ease-in-out;animation-iteration-count:infinite;}
.music-stars .n1{left:8%;top:14%;font-size:96px;color:rgba(255,229,122,.7);animation:musicFloatA 76s ease-in-out infinite;animation-delay:-4s}.music-stars .n2{left:23%;top:72%;font-size:72px;color:rgba(94,230,255,.55);animation:musicFloatB 96s ease-in-out infinite;animation-delay:-18s}.music-stars .n3{left:39%;top:24%;font-size:108px;color:rgba(255,137,207,.52);animation:musicFloatC 88s ease-in-out infinite;animation-delay:-32s}.music-stars .n4{left:57%;top:82%;font-size:84px;color:rgba(255,229,122,.58);animation:musicFloatD 104s ease-in-out infinite;animation-delay:-11s}.music-stars .n5{left:72%;top:18%;font-size:78px;color:rgba(255,255,255,.52);animation:musicFloatE 90s ease-in-out infinite;animation-delay:-41s}.music-stars .n6{left:88%;top:58%;font-size:120px;color:rgba(94,230,255,.48);animation:musicFloatA 112s ease-in-out infinite reverse;animation-delay:-27s}.music-stars .n7{left:14%;top:44%;font-size:66px;color:rgba(255,255,255,.38);animation:musicFloatB 120s ease-in-out infinite reverse;animation-delay:-54s}.music-stars .n8{left:64%;top:42%;font-size:90px;color:rgba(255,229,122,.50);animation:musicFloatC 84s ease-in-out infinite;animation-delay:-8s}.music-stars .n9{left:81%;top:76%;font-size:72px;color:rgba(255,137,207,.42);animation:musicFloatD 108s ease-in-out infinite reverse;animation-delay:-63s}.music-stars .n10{left:46%;top:61%;font-size:60px;color:rgba(94,230,255,.42);animation:musicFloatE 118s ease-in-out infinite;animation-delay:-21s}
.music-stars:before,.music-stars:after{content:"";position:absolute;inset:-12%;background-repeat:repeat;will-change:transform}.music-stars:before{background-size:180px 180px,240px 240px;background-image:radial-gradient(circle at 24px 32px,rgba(255,229,122,.82) 0 1.2px,transparent 2px),radial-gradient(circle at 142px 118px,rgba(94,230,255,.58) 0 1px,transparent 2px);animation:musicDustA 96s linear infinite}.music-stars:after{background-size:260px 260px,320px 320px;background-image:radial-gradient(circle at 80px 72px,rgba(255,255,255,.46) 0 1px,transparent 2px),radial-gradient(circle at 218px 210px,rgba(255,137,207,.34) 0 1px,transparent 2px);animation:musicDustB 130s linear infinite}
@keyframes musicFloatA{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}33%{transform:translate3d(24px,-28px,42px) rotateX(220deg) rotateY(360deg) rotateZ(36deg)}66%{transform:translate3d(-18px,-54px,-24px) rotateX(480deg) rotateY(760deg) rotateZ(-28deg)}100%{transform:translate3d(0,0,0) rotateX(720deg) rotateY(1080deg) rotateZ(360deg)}}
@keyframes musicFloatB{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}33%{transform:translate3d(-28px,18px,-36px) rotateX(-240deg) rotateY(340deg) rotateZ(-42deg)}66%{transform:translate3d(18px,-38px,50px) rotateX(-500deg) rotateY(720deg) rotateZ(30deg)}100%{transform:translate3d(0,0,0) rotateX(-720deg) rotateY(1080deg) rotateZ(-360deg)}}
@keyframes musicFloatC{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}33%{transform:translate3d(20px,32px,32px) rotateX(260deg) rotateY(-360deg) rotateZ(48deg)}66%{transform:translate3d(44px,-20px,-42px) rotateX(560deg) rotateY(-760deg) rotateZ(-24deg)}100%{transform:translate3d(0,0,0) rotateX(720deg) rotateY(-1080deg) rotateZ(360deg)}}
@keyframes musicFloatD{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}33%{transform:translate3d(-18px,-42px,54px) rotateX(-260deg) rotateY(-280deg) rotateZ(38deg)}66%{transform:translate3d(34px,8px,-46px) rotateX(-520deg) rotateY(-760deg) rotateZ(-36deg)}100%{transform:translate3d(0,0,0) rotateX(-720deg) rotateY(-1080deg) rotateZ(360deg)}}
@keyframes musicFloatE{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}33%{transform:translate3d(36px,14px,-28px) rotateX(260deg) rotateY(380deg) rotateZ(-32deg)}66%{transform:translate3d(-30px,-30px,62px) rotateX(560deg) rotateY(760deg) rotateZ(26deg)}100%{transform:translate3d(0,0,0) rotateX(720deg) rotateY(1080deg) rotateZ(360deg)}}
@keyframes musicDustA{from{transform:translate3d(0,0,0)}to{transform:translate3d(-96px,-136px,0)}}@keyframes musicDustB{from{transform:translate3d(0,0,0) scale(1.04)}to{transform:translate3d(78px,-92px,0) scale(1.1)}}@media (prefers-reduced-motion:reduce){.music-stars .note-star,.music-stars:before,.music-stars:after{animation:none}}
</style>`;

const MUSIC_NOTE_STARS_LAYER = `<div class="music-stars" aria-hidden="true"><span class="note-star n1">&#9834;</span><span class="note-star n2">&#9835;</span><span class="note-star n3">&#9836;</span><span class="note-star n4">&#9834;</span><span class="note-star n5">&#9835;</span><span class="note-star n6">&#9836;</span><span class="note-star n7">&#9834;</span><span class="note-star n8">&#9835;</span><span class="note-star n9">&#9834;</span><span class="note-star n10">&#9836;</span></div>`;
const CONTACT_PATCH = `<script src="assets/bot/bmc-contact-patch.js?v=20260706-featured-draft-beers"></script>`;
const SCHEDULE_AUTHORITY_PATCH = `<script src="assets/bot/schedule-authority-patch.js?v=20260723-headliner-photos"></script>`;
const DRINK_MENU_PATCH = `<script src="assets/venue/bmc-drink-menu-patch.js?v=20260706-featured-draft-beers"></script>`;
const HERO_QUALITY_PATCH = `<script src="assets/bot/hero-quality-patch.js?v=hero-quality-1"></script>`;
const JAZZYCAT_RESTORE_PATCH = `<script src="assets/bot/jazzycat-restore-patch.js?v=jazzycat-original-1"></script>`;
const COSMIC_RESTORE_PATCH = `<script src="assets/bot/cosmic-restore-patch.js?v=cosmic-restore-1"></script>`;
const VENUE_GALLERY_PATCH = `<script src="assets/venue/venue-gallery-local-patch.js?v=local-venue-2"></script>`;
const UFO_ORBIT_PATCH = `<script src="assets/venue/jazzycat-ufo-orbit.js?v=20260705-ufo-orbit-3x-fast"></script>`;

function patchJulyText(html) {
  return html
    .replace(/June 2026 live music/gi, 'July 2026 live music')
    .replace(/June schedule/gi, 'July schedule')
    .replace(/June lineup/gi, 'July lineup')
    .replace(/check the June/gi, 'check the July')
    .replace(/June calendar/gi, 'July lineup')
    .replace(/>June</g, '>July<');
}

function patchAlertTopicCopy(html) {
  return html
    .replace(/<p>Enable Wed–Sun show announcements from Balcony Music Club on this device\.<\/p>/g, '<p>' + ALERT_COPY + '</p>')
    .replace(/<article class="card"><h3>Alert topics<\/h3><ul><li>Tonight’s BMC show announcements<\/li><li>Wed–Sun schedule reminders<\/li><li>Special event notices when approved<\/li><\/ul><\/article>/g, '')
    .replace(/<h3>Local guest preferences<\/h3>/g, '<h3>ALERT TOPICS</h3>')
    .replace(/<span>Band schedule updates<\/span>/g, '<span>Drink Specials!</span>')
    .replace(/<span>Special events<\/span>/g, '<span>Exclusive Member Discounts!</span>')
    .replace(/<span>Store \/ merch updates<\/span>/g, '<span>Special Event Invitations!</span>');
}

function patchContact(html) {
  let patched = html.replace(/assets\/bot\/bmc-contact-patch\.js\?v=[^"']+/g, 'assets/bot/bmc-contact-patch.js?v=20260706-featured-draft-beers');
  if (!patched.includes('bmc-contact-patch.js')) patched = patched.replace('</body>', CONTACT_PATCH + '</body>');
  return patched;
}

function patchScheduleAuthority(html) {
  let patched = html.replace(/assets\/bot\/schedule-authority-patch\.js\?v=[^"']+/g, 'assets/bot/schedule-authority-patch.js?v=20260723-headliner-photos');
  if (!patched.includes('schedule-authority-patch.js')) patched = patched.replace('</body>', SCHEDULE_AUTHORITY_PATCH + '</body>');
  return patched;
}

function patchDrinkMenu(html) {
  let patched = html
    .replace(/<style id="bmc-hide-boozeball-temporary">[\s\S]*?<\/style>/g, '')
    .replace(/<script id="bmc-hide-boozeball-temporary-script">[\s\S]*?<\/script>/g, '')
    .replace(/assets\/venue\/bmc-drink-menu-patch\.js\?v=[^"']+/g, 'assets/venue/bmc-drink-menu-patch.js?v=20260706-featured-draft-beers');
  if (!patched.includes('bmc-drink-menu-patch.js')) patched = patched.replace('</body>', DRINK_MENU_PATCH + '</body>');
  return patched;
}

function patchMusicNoteStars(html) {
  let patched = html;
  if (!patched.includes('bmc-music-note-stars')) patched = patched.replace('</head>', MUSIC_NOTE_STARS_PATCH + '</head>');
  if (!patched.includes('class="music-stars"')) patched = patched.replace('<body>', '<body>' + MUSIC_NOTE_STARS_LAYER);
  return patched;
}

function patchUfoOrbit(html) {
  let patched = html.replace(/assets\/venue\/jazzycat-ufo-orbit\.js\?v=[^"']+/g, 'assets/venue/jazzycat-ufo-orbit.js?v=20260705-ufo-orbit-3x-fast');
  if (!patched.includes('jazzycat-ufo-orbit.js')) patched = patched.replace('</body>', UFO_ORBIT_PATCH + '</body>');
  return patched;
}

function patchIndexHtml(html) {
  let patched = patchDrinkMenu(patchUfoOrbit(patchScheduleAuthority(patchContact(patchAlertTopicCopy(patchMusicNoteStars(patchJulyText(html)))))));
  if (!patched.includes('bmc-index-no-circles')) patched = patched.replace('</head>', INDEX_NO_CIRCLES_PATCH + '</head>');
  if (!patched.includes('hero-quality-patch.js')) patched = patched.replace('</body>', HERO_QUALITY_PATCH + '</body>');
  if (!patched.includes('jazzycat-restore-patch.js')) patched = patched.replace('</body>', JAZZYCAT_RESTORE_PATCH + '</body>');
  if (!patched.includes('cosmic-restore-patch.js')) patched = patched.replace('</body>', COSMIC_RESTORE_PATCH + '</body>');
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
