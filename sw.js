// Garde l'application disponible sans connexion.
// À chaque mise en ligne d'une nouvelle version, changer CACHE (ex. 'boutique-1.0.1').
const CACHE = 'boutique-1.0.0';
const FICHIERS = ['./', './index.html', './manifest.webmanifest', './icone-180.png', './icone-192.png', './icone-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'activer') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((trouve) => trouve || fetch(e.request))
  );
});
