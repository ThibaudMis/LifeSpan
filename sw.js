self.addEventListener("install", e =>{
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(
                [
                "./index.html",
                "./style.css",
                "./app.js",
                "./auto.js",
                "./auto.css",
                "./language.css",
                "./language.json",
                "./manual.js",
                "./manual.css",
                "./icons/icon192.png"]);
        })

    );
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request);
        })
    );
});