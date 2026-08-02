/* Hyper Focus service worker.
   Goal: after one online visit the app opens with no network at all — including
   on a phone in airplane mode. Bump CACHE when you ship a new HyperFocus.html. */
const CACHE = "hyperfocus-v2";

// Same-origin files that make up the app shell. Fonts (woff2) are picked up by
// the runtime cache on first render rather than listed one by one here.
const SHELL = [
  "./",
  "./HyperFocus.html",
  "./fonts.css",
  "./vendor/react.production.min.js",
  "./vendor/react-dom.production.min.js",
  "./vendor/babel.min.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  // addAll fails the whole install if any entry 404s — add them individually.
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Navigations: network first, so a redeploy is picked up immediately, with the
  // cached shell as the offline fallback.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./HyperFocus.html")))
    );
    return;
  }

  // Everything else (scripts, fonts): cache first, then refill in the background.
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
