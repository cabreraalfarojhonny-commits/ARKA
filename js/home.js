
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js')); }
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);const el=document.getElementById(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}}));
// Starfield
(function(){
  const c=document.getElementById('starfield');if(!c) return;const x=c.getContext('2d');let w,h,S=[],T=[];
  function R(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight;S=new Array(320).fill(0).map(()=>({x:Math.random()*w,y:Math.random()*h,z:Math.random()*0.8+0.2,s:Math.random()*1.2+0.2}))}
  window.addEventListener('resize',R);R();function shoot(){T.push({x:Math.random()*w,y:0,vx:(Math.random()*0.6-0.3),vy:2+Math.random()*1.5,life:60})}
  setInterval(()=>{if(Math.random()<0.35) shoot();},2500);
  (function L(){x.fillStyle='#03060f';x.fillRect(0,0,w,h);for(const s of S){s.y+=s.z*0.15;if(s.y>h){s.y=0;s.x=Math.random()*w;s.z=Math.random()*0.8+0.2;}x.globalAlpha=s.z;x.fillStyle='#cfe9ff';x.fillRect(s.x,s.y,s.s,s.s);}x.globalAlpha=0.9;x.strokeStyle='#9ad0ff';T=T.filter(t=>t.life>0);for(const t of T){t.x+=t.vx;t.y+=t.vy;t.life--;x.beginPath();x.moveTo(t.x,t.y);x.lineTo(t.x-t.vx*12,t.y-t.vy*12);x.stroke();}requestAnimationFrame(L);})();
})();
// Planets
(function(){
  const cvs=document.getElementById('planets3d');if(!cvs) return;const r=new THREE.WebGLRenderer({canvas:cvs,antialias:true,alpha:true});
  const s=new THREE.Scene();const cam=new THREE.PerspectiveCamera(60,2,0.01,1000);cam.position.set(0,0,8);s.add(new THREE.AmbientLight(0x8899aa,0.6));
  const dl=new THREE.DirectionalLight(0xffffff,0.9);dl.position.set(5,5,5);s.add(dl);const L=new THREE.TextureLoader();L.setCrossOrigin('anonymous');
  const tx={earth:L.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),moon:L.load('https://threejs.org/examples/textures/planets/moon_1024.jpg'),mars:L.load('https://threejs.org/examples/textures/planets/mars_1k_color.jpg'),sat:L.load('https://threejs.org/examples/textures/planets/saturn.jpg'),ring:L.load('https://threejs.org/examples/textures/planets/saturnringcolor.jpg')};
  const P=[];const sph=(a,m)=>new THREE.Mesh(new THREE.SphereGeometry(a,48,32),new THREE.MeshStandardMaterial({map:m}));
  const earth=sph(0.6,tx.earth);earth.position.set(-2.2,0.4,0);s.add(earth);P.push({m:earth,s:0.015});
  const mars=sph(0.45,tx.mars);mars.position.set(1.9,-0.2,0);s.add(mars);P.push({m:mars,s:0.018});
  const moon=sph(0.25,tx.moon);moon.position.set(0.2,1.2,0);s.add(moon);P.push({m:moon,s:0.02});
  const sat=sph(0.7,tx.sat);sat.position.set(0.0,-1.0,0);s.add(sat);P.push({m:sat,s:0.012});
  const rg=new THREE.RingGeometry(0.9,1.4,64);const rm=new THREE.MeshBasicMaterial({map:tx.ring,side:THREE.DoubleSide,transparent:true,opacity:0.9});
  const rings=new THREE.Mesh(rg,rm);rings.position.copy(sat.position);rings.rotation.x=Math.PI/2.2;s.add(rings);
  function RS(){const w=cvs.clientWidth,h=cvs.clientHeight;if(cvs.width!==w||cvs.height!==h){r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}}
  window.addEventListener('resize',RS);RS();(function loop(){requestAnimationFrame(loop);P.forEach(p=>p.m.rotation.y+=p.s);rings.rotation.z+=0.002;r.render(s,cam);})();
})();
