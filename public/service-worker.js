// TODO: implement service worker so that users can use the app offline. The SW
// will need to cache static assets to display the app offline. Additionally,
// the SW should cache transaction data, using the cached data as a fallback
// when the app is used offline. HINT: You should use two caches. One for the
// static assets such ass html, css, js, images, etc; and another cache for
// the dynamic data from requests to routes beginning with "/api".
const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/assets/styles.css",
    "/assets/js/index.js",
    "/assets/js/db.js",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-72x72.png",
    "/assets/icons/icon-96x96.png",
    "/assets/icons/icon-128x128.png",
    "/assets/icons/icon-144x144.png",
    "/assets/icons/icon-152x152.png",
    "/assets/icons/icon-384x384.png",
    "/assets/icons/icon-512x512.png",
    "/manifest.json",
  ];
  
  self.addEventListener('install', function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('Your files were pre-cached successfully!');
        return cache.addAll(FILES_TO_CACHE);
      })
    );
    self.skipWaiting();
  });
  // Activate the service worker and remove old data from the cache
  self.addEventListener('activate', function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log('Removing old cache data', key);
              return caches.delete(key);
            }
          })
        );
      })
    );
    self.clients.claim();
  });
  // Intercept fetch requests
  self.addEventListener('fetch', function(evt) {
    if (evt.request.url.includes('/api/')) {
      evt.respondWith(
        caches
          .open(DATA_CACHE_NAME)
          .then(cache => {
            return fetch(evt.request)
              .then(response => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              })
              .catch(err => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
          })
          .catch(err => console.log(err))
      );
      return;
    }
    evt.respondWith(
      fetch(evt.request).catch(function() {
        return caches.match(evt.request).then(function(response) {
          if (response) {
            return response;
          } else if (evt.request.headers.get('accept').includes('text/html')) {
            // return the cached home page for all requests for html pages
            return caches.match('/');
          }
        });
      })
    );
  });
  // self.addEventListener("install", (evt) => {
  //   evt.waitUntil(
  //     caches.open(CACHE_NAME).then((cache) => {
  //       return cache.addAll(FILES_TO_CACHE);
  //     })
  //   );
  
  //   self.skipWaiting();
  // });
  
  // self.addEventListener("activate", (evt) => {
  //   // remove old caches
  //   evt.waitUntil(
  //     caches.keys().then((keyList) => {
  //       return Promise.all(
  //         keyList.map((key) => {
  //           if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
  //             return caches.delete(key);
  //           }
  //         })
  //       );
  //     })
  //   );
  
  //   self.clients.claim();
  // });
  
  // self.addEventListener("fetch", (evt) => {
  //   // cache successful GET requests to the API
  //   if (evt.request.url.includes("/api/") && evt.request.method === "GET") {
  //     evt.respondWith(
  //       caches
  //         .open(DATA_CACHE_NAME)
  //         .then((cache) => {
  //           return fetch(evt.request)
  //             .then((response) => {
  //               // If the response was good, clone it and store it in the cache.
  //               if (response.status === 200) {
  //                 cache.put(evt.request, response.clone());
  //               }
  
  //               return response;
  //             })
  //             .catch(() => {
  //               // Network request failed, try to get it from the cache.
  //               return cache.match(evt.request);
  //             });
  //         })
  //         .catch((err) => console.log(err))
  //     );
  
  //     // stop execution of the fetch event callback
  //     return;
  //   }
  
  //   // if the request is not for the API, serve static assets using
  //   // "offline-first" approach.
  //   evt.respondWith(
  //     caches.match(evt.request).then((response) => {
  //       return response || fetch(evt.request);
  //     })
  //   );
  // });