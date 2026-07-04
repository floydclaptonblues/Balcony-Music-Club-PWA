const CACHE_NAME = 'bmc-guest-pwa-v74-boozeball-specials';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/assets/venue/photos.js',
  '/assets/venue/venue-gallery-local-patch.js',
  '/assets/venue/1000019805.jpg',
  '/assets/venue/1000019788.jpg',
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
.music-stars{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;opacity:.92;mix-blend-mode:screen;perspective:1100px;perspective-origin:50% 48%;transform-style:preserve-3d;}
.music-stars .note-star{position:absolute;display:block;color:rgba(255,229,122,.7);font-family:Georgia,serif;font-weight:900;text-shadow:0 0 10px rgba(255,216,87,.48),0 0 24px rgba(94,230,255,.22);transform-style:preserve-3d;backface-visibility:visible;will-change:transform;animation-timing-function:ease-in-out;animation-iteration-count:infinite;animation-direction:normal;}
.music-stars .n1{left:8%;top:14%;font-size:96px;animation:musicFloatA 76s ease-in-out infinite;animation-delay:-4s;}
.music-stars .n2{left:23%;top:72%;font-size:72px;color:rgba(94,230,255,.55);animation:musicFloatB 96s cubic-bezier(.42,0,.58,1) infinite;animation-delay:-18s;}
.music-stars .n3{left:39%;top:24%;font-size:108px;color:rgba(255,137,207,.52);animation:musicFloatC 88s ease-in-out infinite;animation-delay:-32s;}
.music-stars .n4{left:57%;top:82%;font-size:84px;color:rgba(255,229,122,.58);animation:musicFloatD 104s cubic-bezier(.36,0,.64,1) infinite;animation-delay:-11s;}
.music-stars .n5{left:72%;top:18%;font-size:78px;color:rgba(255,255,255,.52);animation:musicFloatE 90s ease-in-out infinite;animation-delay:-41s;}
.music-stars .n6{left:88%;top:58%;font-size:120px;color:rgba(94,230,255,.48);animation:musicFloatA 112s cubic-bezier(.42,0,.58,1) infinite reverse;animation-delay:-27s;}
.music-stars .n7{left:14%;top:44%;font-size:66px;color:rgba(255,255,255,.38);animation:musicFloatB 120s ease-in-out infinite reverse;animation-delay:-54s;}
.music-stars .n8{left:64%;top:42%;font-size:90px;color:rgba(255,229,122,.50);animation:musicFloatC 84s cubic-bezier(.36,0,.64,1) infinite;animation-delay:-8s;}
.music-stars .n9{left:81%;top:76%;font-size:72px;color:rgba(255,137,207,.42);animation:musicFloatD 108s ease-in-out infinite reverse;animation-delay:-63s;}
.music-stars .n10{left:46%;top:61%;font-size:60px;color:rgba(94,230,255,.42);animation:musicFloatE 118s cubic-bezier(.42,0,.58,1) infinite;animation-delay:-21s;}
.music-stars .n11{left:5%;top:62%;font-size:102px;color:rgba(255,229,122,.46);animation:musicFloatC 92s ease-in-out infinite reverse;animation-delay:-48s;}
.music-stars .n12{left:18%;top:27%;font-size:84px;color:rgba(94,230,255,.44);animation:musicFloatD 116s cubic-bezier(.36,0,.64,1) infinite;animation-delay:-36s;}
.music-stars .n13{left:31%;top:86%;font-size:114px;color:rgba(255,137,207,.38);animation:musicFloatA 100s ease-in-out infinite reverse;animation-delay:-15s;}
.music-stars .n14{left:52%;top:12%;font-size:72px;color:rgba(255,255,255,.42);animation:musicFloatB 126s cubic-bezier(.42,0,.58,1) infinite;animation-delay:-70s;}
.music-stars .n15{left:69%;top:66%;font-size:96px;color:rgba(255,229,122,.44);animation:musicFloatE 98s ease-in-out infinite reverse;animation-delay:-26s;}
.music-stars .n16{left:92%;top:31%;font-size:78px;color:rgba(94,230,255,.38);animation:musicFloatC 132s cubic-bezier(.36,0,.64,1) infinite;animation-delay:-59s;}
.music-stars .n17{left:35%;top:48%;font-size:66px;color:rgba(255,255,255,.34);animation:musicFloatD 122s ease-in-out infinite reverse;animation-delay:-44s;}
.music-stars .n18{left:76%;top:7%;font-size:108px;color:rgba(255,137,207,.36);animation:musicFloatA 106s cubic-bezier(.42,0,.58,1) infinite;animation-delay:-12s;}
.music-stars .n19{left:3%;top:82%;font-size:72px;color:rgba(94,230,255,.36);animation:musicFloatB 134s ease-in-out infinite reverse;animation-delay:-81s;}
.music-stars .n20{left:58%;top:55%;font-size:120px;color:rgba(255,229,122,.32);animation:musicFloatE 140s cubic-bezier(.36,0,.64,1) infinite;animation-delay:-51s;}
.music-stars:before,.music-stars:after{content:"";position:absolute;inset:-12%;background-repeat:repeat;will-change:transform;}
.music-stars:before{background-size:180px 180px,240px 240px;background-image:radial-gradient(circle at 24px 32px,rgba(255,229,122,.82) 0 1.2px,transparent 2px),radial-gradient(circle at 142px 118px,rgba(94,230,255,.58) 0 1px,transparent 2px);animation:musicDustA 96s linear infinite;}
.music-stars:after{background-size:260px 260px,320px 320px;background-image:radial-gradient(circle at 80px 72px,rgba(255,255,255,.46) 0 1px,transparent 2px),radial-gradient(circle at 218px 210px,rgba(255,137,207,.34) 0 1px,transparent 2px);animation:musicDustB 130s linear infinite;}
@keyframes musicFloatA{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}18%{transform:translate3d(24px,-28px,42px) rotateX(160deg) rotateY(250deg) rotateZ(36deg)}43%{transform:translate3d(-18px,-54px,-24px) rotateX(340deg) rotateY(520deg) rotateZ(-28deg)}67%{transform:translate3d(32px,-18px,58px) rotateX(560deg) rotateY(780deg) rotateZ(22deg)}100%{transform:translate3d(0,0,0) rotateX(720deg) rotateY(1080deg) rotateZ(360deg)}}
@keyframes musicFloatB{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}22%{transform:translate3d(-28px,18px,-36px) rotateX(-190deg) rotateY(240deg) rotateZ(-42deg)}49%{transform:translate3d(18px,-38px,50px) rotateX(-390deg) rotateY(520deg) rotateZ(30deg)}74%{transform:translate3d(-34px,-12px,18px) rotateX(-560deg) rotateY(780deg) rotateZ(-18deg)}100%{transform:translate3d(0,0,0) rotateX(-720deg) rotateY(1080deg) rotateZ(-360deg)}}
@keyframes musicFloatC{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}16%{transform:translate3d(20px,32px,32px) rotateX(210deg) rotateY(-260deg) rotateZ(48deg)}38%{transform:translate3d(44px,-20px,-42px) rotateX(420deg) rotateY(-540deg) rotateZ(-24deg)}71%{transform:translate3d(-22px,-44px,46px) rotateX(650deg) rotateY(-820deg) rotateZ(18deg)}100%{transform:translate3d(0,0,0) rotateX(720deg) rotateY(-1080deg) rotateZ(360deg)}}
@keyframes musicFloatD{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}25%{transform:translate3d(-18px,-42px,54px) rotateX(-220deg) rotateY(-180deg) rotateZ(38deg)}52%{transform:translate3d(34px,8px,-46px) rotateX(-440deg) rotateY(-500deg) rotateZ(-36deg)}82%{transform:translate3d(12px,-58px,24px) rotateX(-630deg) rotateY(-820deg) rotateZ(20deg)}100%{transform:translate3d(0,0,0) rotateX(-720deg) rotateY(-1080deg) rotateZ(360deg)}}
@keyframes musicFloatE{0%{transform:translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)}20%{transform:translate3d(36px,14px,-28px) rotateX(180deg) rotateY(300deg) rotateZ(-32deg)}46%{transform:translate3d(-30px,-30px,62px) rotateX(390deg) rotateY(610deg) rotateZ(26deg)}69%{transform:translate3d(14px,-66px,-20px) rotateX(590deg) rotateY(880deg) rotateZ(-16deg)}100%{transform:translate3d(0,0,0) rotateX(720deg) rotateY(1080deg) rotateZ(360deg)}}
@keyframes musicDustA{from{transform:translate3d(0,0,0)}to{transform:translate3d(-96px,-136px,0)}}
@keyframes musicDustB{from{transform:translate3d(0,0,0) scale(1.04)}to{transform:translate3d(78px,-92px,0) scale(1.1)}}
@media (prefers-reduced-motion:reduce){.music-stars .note-star,.music-stars:before,.music-stars:after{animation:none}}
</style>`;
const BOOZEBALL_SPECIALS_PATCH = `<style id="bmc-boozeball-specials-style">
.boozeball-marquee-shell{margin:6px 0 16px;padding:9px;background:linear-gradient(180deg,rgba(255,216,87,.82),rgba(255,74,176,.58));border:2px solid #000;border-radius:16px;box-shadow:0 0 22px rgba(255,216,87,.28),0 10px 30px rgba(255,74,176,.18);overflow:hidden;}
.boozeball-marquee-link{display:block;position:relative;overflow:hidden;min-height:52px;border:2px solid #000;border-radius:12px;background:linear-gradient(90deg,#190724,#4b1380,#190724);color:#fff7d6;text-decoration:none;text-shadow:2px 2px 0 #000;box-shadow:inset 0 0 0 3px rgba(94,230,255,.58);animation:boozeBlink 1.05s steps(2,end) infinite;}
.boozeball-marquee-track{display:flex;width:max-content;white-space:nowrap;animation:boozeScroll 13s linear infinite;}
.boozeball-marquee-track span{display:inline-flex;align-items:center;min-height:52px;padding:0 34px;font-family:Chicago,Charcoal,Geneva,'Arial Rounded MT Bold',Verdana,sans-serif;text-transform:uppercase;letter-spacing:.08em;font-size:clamp(15px,4.5vw,26px);font-weight:1000;color:#ffe57a;}
.boozeball-card{border-color:rgba(255,216,87,.68);background:linear-gradient(180deg,rgba(255,216,87,.12),rgba(255,74,176,.07)),linear-gradient(180deg,rgba(50,25,86,.86),rgba(20,7,35,.88));}
.boozeball-lede{font-size:16px;color:#fff6e8;margin-top:0;}
.boozeball-photo-grid{display:grid;grid-template-columns:1fr;gap:10px;margin:12px 0;}
.boozeball-photo-grid img{display:block;width:100%;height:auto;border:2px solid #000;border-radius:14px;background:#120728;box-shadow:0 8px 28px rgba(0,0,0,.42);}
.boozeball-menu{display:grid;grid-template-columns:1fr;gap:10px;margin-top:12px;}
.boozeball-menu article{border:2px solid #000;border-radius:12px;background:rgba(0,0,0,.24);padding:12px;}
.boozeball-menu h3{color:#ffe57a;margin-bottom:6px;}
.boozeball-menu ul{list-style:none;margin:0;padding:0;columns:1;}
.boozeball-menu li{font-weight:900;color:#fff6e8;font-size:14px;line-height:1.65;}
@keyframes boozeBlink{0%,49%{filter:saturate(1.15) brightness(1.08)}50%,100%{filter:saturate(1.9) brightness(1.34)}}
@keyframes boozeScroll{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@media(min-width:760px){.boozeball-photo-grid{grid-template-columns:1.1fr .9fr}.boozeball-menu{grid-template-columns:repeat(2,minmax(0,1fr))}.boozeball-menu ul{columns:1}}
@media (prefers-reduced-motion:reduce){.boozeball-marquee-link,.boozeball-marquee-track{animation:none}.boozeball-marquee-track{transform:none}}
</style>`;
const BOOZEBALL_SPECIALS_SECTION = `<section class="boozeball-marquee-shell" aria-label="BMC BoozeBall special"><a class="boozeball-marquee-link" href="#boozeball"><span class="boozeball-marquee-track"><span>The Slammin' $7 BMC BoozeBall.....Try Now!!!</span><span>The Slammin' $7 BMC BoozeBall.....Try Now!!!</span></span></a></section><section id="boozeball" class="panel boozeball-card"><span class="ribbon">Drink Special</span><h2>The Slammin' $7 BMC BoozeBall</h2><p class="boozeball-lede"><strong>Available now at the Patio Bar.</strong> Choose Absolut plus puree flavor and make it a cold little BMC party ball.</p><div class="boozeball-photo-grid"><img src="assets/venue/1000019805.jpg" alt="BMC BoozeBalls patio bar promo showing seven flavors available now"><img src="assets/venue/1000019788.jpg" alt="BMC Boozy Balls flavor menu with Absolut and puree flavor options"></div><div class="boozeball-menu"><article><h3>Absolut flavors</h3><ul><li>🍋 Citrus</li><li>💚 Lime</li><li>🥭 Mango</li><li>🍊 Mandarine</li><li>🌶️ Pepper</li><li>🍓 Raspberry</li><li>🫐 Wildberry</li></ul></article><article><h3>Puree flavors</h3><ul><li>🍓 Strawberry</li><li>🫐 Blueberry</li><li>⭐ Passion</li><li>🍓 Strawberry</li><li>🍈 Guava</li><li>🍈 Guava</li><li>⭐ Passion Fruit</li></ul></article></div></section>`;
const MUSIC_NOTE_STARS_LAYER = `<div class="music-stars" aria-hidden="true"><span class="note-star n1">&#9834;</span><span class="note-star n2">&#9835;</span><span class="note-star n3">&#9836;</span><span class="note-star n4">&#9834;</span><span class="note-star n5">&#9835;</span><span class="note-star n6">&#9836;</span><span class="note-star n7">&#9834;</span><span class="note-star n8">&#9835;</span><span class="note-star n9">&#9834;</span><span class="note-star n10">&#9836;</span><span class="note-star n11">&#9835;</span><span class="note-star n12">&#9834;</span><span class="note-star n13">&#9836;</span><span class="note-star n14">&#9835;</span><span class="note-star n15">&#9834;</span><span class="note-star n16">&#9836;</span><span class="note-star n17">&#9835;</span><span class="note-star n18">&#9834;</span><span class="note-star n19">&#9836;</span><span class="note-star n20">&#9835;</span></div>`;
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
    .replace(/<article class="card"><h3>Alert topics<\/h3><ul><li>Tonight’s BMC show announcements<\/li><li>Wed–Sun schedule reminders<\/li><li>Special event notices when approved<\/li><\/ul><\/article>/g, '')
    .replace(/<h3>Local guest preferences<\/h3>/g, '<h3>ALERT TOPICS</h3>')
    .replace(/<span>Band schedule updates<\/span>/g, '<span>Drink Specials!</span>')
    .replace(/<span>Special events<\/span>/g, '<span>Exclusive Member Discounts!</span>')
    .replace(/<span>Store \/ merch updates<\/span>/g, '<span>Special Event Invitations!</span>');
}

function patchBoozeBallSpecials(html) {
  let patched = html;
  if (!patched.includes('bmc-boozeball-specials-style')) patched = patched.replace('</head>', BOOZEBALL_SPECIALS_PATCH + '</head>');
  if (!patched.includes('id="boozeball"')) patched = patched.replace('<section id="book"', BOOZEBALL_SPECIALS_SECTION + '<section id="book"');
  return patched;
}

function patchMusicNoteStars(html) {
  let patched = html;
  if (!patched.includes('bmc-music-note-stars')) patched = patched.replace('</head>', MUSIC_NOTE_STARS_PATCH + '</head>');
  if (!patched.includes('class="music-stars"')) patched = patched.replace('<body>', '<body>' + MUSIC_NOTE_STARS_LAYER);
  return patched;
}

function patchIndexHtml(html) {
  let patched = patchBoozeBallSpecials(patchAlertTopicCopy(patchMusicNoteStars(patchJulyText(html))));
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
