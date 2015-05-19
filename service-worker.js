
// CACHE POLYFILL

if( 'function' === typeof importScripts) {
    importScripts('cache-polyfill.js');
}

// INSTALL

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('wdyk-demo-v1').then(function (cache) {
            return cache.addAll([
                '/',
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

    event.respondWith(caches.match(event.request).then(function (response) {
            // CACHE
            if (response) {
                return response;
            }
            // NETWORK
            return fetch(event.request);
        })
    );
});