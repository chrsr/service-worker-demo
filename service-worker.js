
// CACHE POLYFILL

if( 'function' === typeof importScripts) {
    importScripts('cache-polyfill.js');
}

// INSTALL

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('web-directions-code-2015').then(function (cache) {
            return cache.addAll([
                '/offline.html',
                'styles.css',
                'expedia.com.au.png',
                'fourpoints.jpg'
            ]);
        })
    );
});

// REQUESTS

self.addEventListener('fetch', function (event) {
    var requestUrl = new URL(event.request.url).pathname;
    console.log('Requested:', requestUrl);

    event.respondWith(

        caches.open('web-directions-code-2015').then(function (cache) {

            // search cache
            cache.match(event.request).then(function (response) {
                // First, serve from cache.
                if (response) {
                    return response;
                }
                // Attempt to get itinerary from network
                // or fallback to cache
                return fetch(event.request).then(function (response) {
                    // if network
                    // update offline.htm with response
                    cache.put('/offline.html', response.clone());
                    return response;
                }).catch(function() {
                    console.log('cannot connect');
                    return caches.match('/offline.html');
                });
            });
        });
    );
});
