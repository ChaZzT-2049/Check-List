const CACHE_NAME = 'v1_cache_checklist',
urlsToCache = [
    './',
    './index.html',
    './favicon.ico',
    './script.js',
    './img/icons/android-icon-192x192.png',
    './img/icons/apple-icon.png'
]

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache =>{
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(error => console.log(error))
    )
})
self.addEventListener('activate', event =>{
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys()
            .then(cachesNames =>{
                cachesNames.map(cacheName =>{
                    if(cacheWhitelist.indexOf(cacheName)=== -1){
                        return caches.delete(cacheName)
                    }
                })
            })
            .then(() => self.clients.claim())
    )
})
self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request)
        .then(res => {
            if(res){
                return res
            }
            
            return fetch(event.request)
        })
    )
})