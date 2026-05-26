const CACHE_NAME = "etf-calculator-v1";

// 精準指定需要快取的檔案
const urlsToCache = [
    "index.html",
    "manifest.json",
    "icon-192.png",
    "icon-512.png"
];

// 安裝並快取資產
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log("快取開啟成功，正在寫入靜態檔案...");
            return cache.addAll(urlsToCache);
        })
        .then(() => self.skipWaiting()) // 強制更新
    );
});

// 啟用新的 Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

// 攔截請求並由快取回應
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // 如果快取有就用快取，沒有就走網路
            return response || fetch(event.request);
        })
    );
});