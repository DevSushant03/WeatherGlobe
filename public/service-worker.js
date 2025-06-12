self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate");
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
