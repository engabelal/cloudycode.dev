// Service Worker
// CloudyCode v7.0.0

const CACHE_VERSION = "v2.1.0";
const CACHE_NAME = `cloudycode-${CACHE_VERSION}`;

// Critical assets to cache on install
const CRITICAL_ASSETS = [
  "/",
  "/index.html",
  "/css/theme.css",
  "/css/custom.css",
  "/js/main.js",
  "/js/utils.js",
  "/js/animations.js",
  "/js/ui.js",
  "/js/projects.js",
  "/config/site.config.js",
  "/images/avatar.webp",
  "/images/cloudycode-light.webp",
  "/images/favicon.svg",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/images/og-image.webp",
  "/images/welcome-bg.webp",
  "/offline.html",
  "/manifest.json",
];

// Install event - cache critical assets
self.addEventListener("install", (event) => {
  console.log(`[SW] Installing service worker ${CACHE_VERSION}`);

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching critical assets");
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log(`[SW] Activating service worker ${CACHE_VERSION}`);

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log(`[SW] Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - network-first strategy with cache fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network-first strategy for HTML
  if (request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(request).then((cached) => {
            return cached || caches.match("/offline.html");
          });
        })
    );
    return;
  }

  // Cache-first strategy for other assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Return cached version and update in background
        fetch(request)
          .then((response) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response);
            });
          })
          .catch(() => {});
        return cached;
      }

      // Not in cache, fetch from network
      return fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});

// Message event - manual cache update
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CACHE_UPDATE") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(CRITICAL_ASSETS);
      })
    );
  }
});
