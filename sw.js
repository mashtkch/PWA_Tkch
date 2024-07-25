const staticCacheName = 's-app-v1'

const assetUrls = [
    'index_app.html',
    'style_app.css',
    'images',
    'ios'
]


self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})

self.addEventListener('fetch', event => {
    console.log('Fetch', event.request)

    event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}