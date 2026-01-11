const CACHE_NAME = 'jh-portfolio-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index',
  '/datenschutz',
  '/impressum',
  '/404',
  '/css/main.css',
  '/scripts/main.js',
  '/css/font-awesome/css/all.min.css',
  '/images/avatar.png',
  '/images/favicon-32x32.png',
  '/images/favicon-16x16.png',
  '/manifest.json',
  '/projects/blog-template',
  '/projects/enmie-netzanmeldungen',
  '/projects/jobblitz',
  '/projects/mdl-reklame',
  '/projects/mdt-app',
  '/projects/natuerliche-werke',
  '/projects/tractime',
  '/projects/voltampere-exposes'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Wir cachen die Dateien unter ihren sauberen Namen
      // Da die Dateien auf dem Server als .html liegen, müssen wir sie beim Cachen von dort abholen
      const requests = ASSETS_TO_CACHE.map(url => {
        if (url === '/') return url;
        if (url.startsWith('/projects/') || url === '/datenschutz' || url === '/impressum' || url === '/404' || url === '/index') {
          return new Request(url + '.html', { mode: 'no-cors' }); // Hole die physische Datei
        }
        return url;
      });

      // Leider können wir nicht einfach Request-Objekte mappen und erwarten, dass sie unter der sauberen URL gespeichert werden.
      // Wir müssen sie explizit unter der sauberen URL speichern.
      return Promise.all(
        ASSETS_TO_CACHE.map(url => {
          let fetchUrl = url;
          if (url !== '/' && (url.startsWith('/projects/') || ['/datenschutz', '/impressum', '/404', '/index'].includes(url))) {
             fetchUrl = url + '.html';
          }
          return fetch(fetchUrl).then(response => {
            if (!response.ok) throw new TypeError('Bad response status');
            return cache.put(url, response);
          });
        })
      );
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
  const url = new URL(event.request.url);
  
  // Wenn der Request für eine Seite ohne Endung ist, versuche sie aus dem Cache zu laden
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      
      // Fallback für Browser, die eventuell doch noch mit .html anfragen
      if (url.origin === self.origin && url.pathname.endsWith('.html')) {
        const cleanPath = url.pathname.slice(0, -5);
        return caches.match(cleanPath).then(cleanResponse => {
            return cleanResponse || fetch(event.request);
        });
      }

      return fetch(event.request);
    })
  );
});
