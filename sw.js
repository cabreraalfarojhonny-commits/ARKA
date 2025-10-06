const CACHE='arka-complete-v1';
const ASSETS=[
  './','./index.html','./styles/styles.css',
  './design.html','./learn.html','./gallery.html','./community.html','./login.html','./register.html',
  './js/home.js','./js/design.js','./js/learn.js','./js/gallery.js','./js/community.js','./js/login.js','./js/register.js',
  './data/nasa.json','./images/arka-logo.png','./images/icon-192.png','./images/icon-512.png','./manifest.webmanifest'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k)))))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin===location.origin){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;}).catch(_=>r)));
  }
});