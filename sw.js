/* AURUM service worker - build 6cdd4e40e5 (generated; do not edit) */
const V='aurum-6cdd4e40e5';
self.addEventListener('install',()=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const keep=(r,res)=>{if(res&&res.ok&&res.type==='basic'){const c=res.clone();caches.open(V).then(x=>x.put(r,c)).catch(()=>{})}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin||u.pathname==='/sw.js')return;
  /* assets carry ?v=<build id>: that URL never changes content, so cache-first is safe. Everything else (HTML!) is network-first so a new release is never hidden. */
  if(u.search.indexOf('v=6cdd4e40e5')>-1){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>keep(r,res))));return}
  e.respondWith(fetch(r).then(res=>keep(r,res)).catch(()=>caches.match(r).then(h=>h||caches.match('/404'))))});
