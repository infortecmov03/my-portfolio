// Service Worker para funcionamento offline
const CACHE_NAME = 'itm-store-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/itm-store.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
