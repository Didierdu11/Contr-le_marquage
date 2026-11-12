const C='marquage-v15',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','favicon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.open(C).then(async c=>{try{const r=await fetch(e.request);if(r.ok&&(r.type==='basic'||r.type==='cors'))c.put(e.request,r.clone());return r}
  catch(err){const m=await c.match(e.request,{ignoreSearch:true})||(e.request.mode==='navigate'?await c.match('index.html'):null);if(m)return m;throw err}}))});
