// Service Worker Installation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('cat-clicker-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/game.js',
                // Add more files and assets to cache as needed
            ]);
        })
    );
});

// Service Worker Activation
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    // Delete any old caches that don't match the current cache name
                    return cacheName !== 'cat-clicker-v1';
                }).map((cacheName) => {
                    return caches.delete(cacheName);
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