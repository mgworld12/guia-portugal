const V="guia-pt-v12",A=["./","index.html","secao.html","orgaos.html","orgaos.js","administracao.html","administracao.js","mapa-dados.js","mapa-continente.js","img/mapa-portugal.webp","style.css","common.js","secao.js","data.js","favicon.png","img/logo-192.webp","favicon.ico","img/azulejo-azul.webp","img/pasteis.webp","img/bonde.webp","img/bussola.webp","img/azulejo-laranja.webp","img/garrafa.webp","img/galo.webp","img/sardinhas.webp","img/ancora.webp","img/ponte.webp","img/bola.webp","img/azulejo-verde.webp"];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x))))));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
