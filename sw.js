const staticCacheName = 'CacheSpace1';

const assetUrls = [
  '/images',
  '/ios',
  '/css/styles.css',
  '/background',
  '/index.html',
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})
self.addEventListener('activate', event => {
  console.log('[SW]: activate');
})

self.addEventListener('fetch', event => {
  console.log('Fetch', event.request.url);
  event.respondWith(cacheFirst(event.request));
})

async function cacheFirst(request) {
  const cached = await cache.match(request);
  return cached ?? await fetch(request);
}