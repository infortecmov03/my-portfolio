// sw.js - Service Worker para funcionamento offline
const CACHE_NAME = 'itm-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/itm-store.html',
  '/css/style.css',
  '/css/itm-store.css',
  '/js/main.js',
  '/js/pwa-manager.js',
  '/js/download-manager.js',
  '/js/itm-store.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch (offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache ou faz fetch
        return response || fetch(event.request);
      })
  );
});

// Atualizar cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
