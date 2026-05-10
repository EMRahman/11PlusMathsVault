/**
 * sw.js — Service worker for offline support.
 *
 * Strategy:
 *   - Shell assets (HTML/CSS/JS): cache-first, populated on install.
 *   - questions.json: network-first with cache fallback so updates land
 *     while online but the app still works offline.
 *
 * Bump CACHE_VERSION whenever shell assets change so old caches are
 * cleared on the next visit.
 */

const CACHE_VERSION = 'mathsvault-v1';

const SHELL_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/router.js',
  './js/walk.js',
  './js/desk.js',
  './js/state.js',
  './js/stats.js',
  './js/validate.js',
  './js/hacks.js',
  './data/questions.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for the question bank so edits land on next refresh when online.
  if (url.pathname.endsWith('/data/questions.json')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first for everything else (shell).
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
