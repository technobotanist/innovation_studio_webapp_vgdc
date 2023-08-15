self.addEventListener('install', event => {
    event.waitUntil(
         caches.open('my-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/main.css',
                // Add other assets like CSS, JS, images, etc.
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open('my-cache').then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});
