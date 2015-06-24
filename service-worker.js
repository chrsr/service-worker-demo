
// CACHE POLYFILL

if( 'function' === typeof importScripts) {
    importScripts('cache-polyfill.js');
}

var cacheKey = 'ws-code-2015-v5';

// INSTALL

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheKey).then(function (cache) {
            return cache.addAll([
                '/service-worker-demo/offline.html',
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
        caches.match(event.request).then(function (response) {
            // found cache
            if (response) {
                return response;
            }
            // network with fallback
            return fetch(event.request).then(function (response) {
                // try the network
                // for non-cached requests
                return response;
            }).catch(function() {
                // no connection
                // fallback to message or previous versions?
                return caches.match('/service-worker-demo/offline.html');
            });
        })
    );
});
