const CACHE_NAME = 'beyond-chat-v2';
const urlsToCache = ['./','./index.html','./manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k) }))));
});

self.addEventListener('fetch', event => {
  if(event.request.url.includes('hackclub') || event.request.url.includes('pollinations')){
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});
