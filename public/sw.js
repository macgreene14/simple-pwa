const CACHE_NAME = "todo-pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/App.jsx",
  "/src/db.js",
  "/src/App.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
