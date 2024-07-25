const staticCacheName = 's-app-v1';

const assetUrls = [
    '/',
    '/index.html',
    '/style_app.css',
    '/images',
    '/ios' 
];

self.addEventListener('install', event => { 
    event.waitUntil( 
      (async () => { 
        const cache = await caches.open(staticCacheName); 
        for (const url of assetUrls) { 
          try { 
            await cache.add(url); 
            console.log(`Cached asset: ${url}`);  // Исправлено: добавлены обратные кавычки
          } catch (error) { 
            console.error(`Failed to cache asset: ${url}`, error);  // Исправлено: добавлены обратные кавычки
            throw error;  // Прервать установку Service Worker, если любой запрос не удался 
          } 
        } 
      })() 
    ); 
  });

self.addEventListener('activate', event => {
  console.log('[SW]: activate');
});

self.addEventListener('fetch', event => {
  console.log('Fetch', event.request.url);
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cache = await caches.open(staticCacheName);
  const cached = await cache.match(request);
  return cached ?? await fetch(request);
}