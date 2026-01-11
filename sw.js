const CACHE_NAME = 'jh-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/datenschutz.html',
  '/impressum.html',
  '/css/main.css',
  '/scripts/main.js',
  '/css/font-awesome/css/all.min.css',
  '/images/avatar.png',
  '/images/favicon-32x32.png',
  '/images/favicon-16x16.png',
  '/manifest.json',
  '/projects/blog-template.html',
  '/projects/enmie-netzanmeldungen.html',
  '/projects/jobblitz.html',
  '/projects/mdl-reklame.html',
  '/projects/mdt-app.html',
  '/projects/natuerliche-werke.html',
  '/projects/tractime.html',
  '/projects/voltampere-exposes.html'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
