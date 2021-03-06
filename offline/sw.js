var CACHE_NAME = 'my-test-cache-v21';
var urlsToCache = [];

self.addEventListener('install', function(e) {
  console.log('serviceWorker installing')
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
//     self.skipWaiting()
  );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([

            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        //按版本更新緩存（全部清理）
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 来来来，代理可以搞一些代理的事情

      // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
      if (response) {
        return response;
      }

      // 如果 service worker 没有返回，那就得直接请求真实远程服务
      var request = event.request.clone(); // 把原始请求拷过来
      return fetch(request).then(function (httpRes) {

        // http请求的返回已被抓到，可以处置了。

        // 请求失败了，直接返回失败的结果就好了。。
        if (!httpRes || httpRes.status !== 200) {
            return httpRes;
        }

        // 请求成功的话，将请求缓存起来。
        var responseClone = httpRes.clone();
        caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseClone);
        });

        return httpRes;
      });
    })
  );
});

self.addEventListener('message', function (event) {
    console.log(event.data)
});
