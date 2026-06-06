const CACHE_NAME = 'bmc-guest-pwa-v16';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/assets/venue/photos.js',
  '/assets/bot/jazzycat-bot.js',
  '/assets/bot/bmc-contact-patch.js'
];

const PHOTO_SWAP_PATCH = `
(function(){
  var photos = window.BMC_VENUE_PHOTOS || [];
  var speakeasy = photos.find(function(photo){ return photo.title === 'Speakeasy'; });
  var bar = photos.find(function(photo){ return photo.title === 'Bar'; });
  if (speakeasy && bar) {
    var originalSpeakeasySrc = speakeasy.src;
    speakeasy.src = bar.src;
    bar.src = originalSpeakeasySrc;
  }
})();
`;

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
  if (url.pathname.endsWith('/assets/venue/photos.js')) {
    event.respondWith(fetch(event.request).then((response) => response.text()).then((body) => new Response(body + PHOTO_SWAP_PATCH, { headers: { 'Content-Type': 'application/javascript; charset=utf-8' } })).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); return response; }).catch(() => caches.match(event.request)));
});
