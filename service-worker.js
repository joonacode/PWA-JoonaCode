const CACHE_NAME = "Check";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/detail.html",
  "/pages/home.html",
  "/pages/kat.html",
  "/pages/sc.html",
  "/pages/template.html",
  "/pages/tutorial.html",
  "/js/nav.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/style.css",
  "/img/dev.svg",
  "/img/kategori/angular.svg",
  "/img/kategori/reactjs.svg",
  "/img/kategori/html.svg",
  "/img/kategori/bootstrap.svg",
  "/img/kategori/ci.svg",
  "/img/kategori/js.svg",
  "/img/kategori/laravel.svg",
  "/img/kategori/mysql.svg",
  "/img/kategori/nodejs.svg",
  "/img/kategori/php.svg",
  "/img/source_code/jcompany.png",
  "/img/source_code/jinventory.png",
  "/img/source_code/joonaanime.png",
  "/img/source_code/joonacode.png",
  "/img/discussion.svg",
  "/img/facebook.svg",
  "/img/github.svg",
  "/img/ig.svg",
  "/img/lesson.svg",
  "/img/sourcecode.svg",
  "/img/twitter.svg",
  "/img/whatsapp.svg",
  "/img/template/gc.png",
  "/img/tutorial/html.jpg",
  "/icon-512.png",
  "/icon-192.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});