
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js')); }

const cvs=document.getElementById('designCanvas');
const renderer=new THREE.WebGLRenderer({canvas:cvs,antialias:true}); renderer.setPixelRatio(devicePixelRatio);
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x020712);
const camera=new THREE.PerspectiveCamera(60,2,0.01,1000); camera.position.set(7,7,12);
const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true;
scene.add(new THREE.HemisphereLight(0xffffff,0x334455,0.7));
const dl=new THREE.DirectionalLight(0xffffff,0.8); dl.position.set(5,8,3); scene.add(dl);
const grid=new THREE.GridHelper(100,100,0x335577,0x223355); grid.material.transparent=true; grid.material.opacity=0.25; scene.add(grid);

const G1=new THREE.Group(); const G2=new THREE.Group(); scene.add(G1,G2);
function onResize(){const w=cvs.clientWidth,h=cvs.clientHeight;if(cvs.width!==w||cvs.height!==h){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}}
window.addEventListener('resize',onResize); onResize(); (function loop(){requestAnimationFrame(loop);controls.update();renderer.render(scene,camera);})();

function mat(c){return new THREE.MeshStandardMaterial({color:c,metalness:0.1,roughness:0.6});}
const C1=0x67e8f9,C2=0xa78bfa;
function addCylinder(r,h){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,48,1,true),mat(C1));const t=new THREE.Mesh(new THREE.CircleGeometry(r,48),mat(C1));t.position.y=h/2;t.rotation.x=-Math.PI/2;const b=new THREE.Mesh(new THREE.CircleGeometry(r,48),mat(C1));b.position.y=-h/2;b.rotation.x=Math.PI/2;m.add(t,b);m.position.y=h/2;G1.add(m);}
function addSphere(r){const m=new THREE.Mesh(new THREE.SphereGeometry(r,64,32),mat(C1));m.position.y=r;G1.add(m);}
function addDome(r){const g=new THREE.SphereGeometry(r,64,32,0,Math.PI*2,0,Math.PI/2);const m=new THREE.Mesh(g,mat(C1));m.position.y=r/2;G1.add(m);}
function addCapsule(r,h){const m=new THREE.Mesh(new THREE.CapsuleGeometry(r,Math.max(0.001,h-2*r),16,32),mat(C1));m.position.y=Math.max(r,h/2);G1.add(m);}
function addCube(s){const m=new THREE.Mesh(new THREE.BoxGeometry(s,s,s),mat(C1));m.position.y=s/2;G1.add(m);}
function addRing(r,R){const m=new THREE.Mesh(new THREE.TorusGeometry((r+R)/2,(R-r)/2,16,48),mat(C1));m.position.y=1;G1.add(m);}

function addByShape(name,r,h){
  if(name==='cylinder') addCylinder(r,h);
  else if(name==='sphere') addSphere(r);
  else if(name==='dome') addDome(r);
  else if(name==='capsule') addCapsule(r,h);
  else if(name==='cube') addCube(r*1.2);
  else if(name==='ring') addRing(r*0.6,r*1.2);
}

document.getElementById('addToScene').addEventListener('click',()=>{
  const shape=document.getElementById('shape').value;
  const r=parseFloat(document.getElementById('radius').value||'2.5');
  const h=parseFloat(document.getElementById('height').value||'5');
  addByShape(shape,r,h);
  document.getElementById('calcOut').className='notice ok';
  document.getElementById('calcOut').textContent='Module added to scene.';
});
document.getElementById('clearScene').addEventListener('click',()=>{G1.clear();G2.clear();});

// Export/Import
document.getElementById('exportBtn').addEventListener('click',()=>{
  const design={objects:G1.children.map(o=>({position:o.position,scale:o.scale}))};
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(design,null,2)],{type:'application/json'}));
  a.download='arka-design.json'; a.click();
});
document.getElementById('importInput').addEventListener('change',async(e)=>{
  const f=e.target.files[0]; if(!f) return; const txt=await f.text(); const d=JSON.parse(txt); G1.clear();
  (d.objects||[]).forEach(o=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),mat(0x335577)); m.position.set(o.position.x,o.position.y,o.position.z); m.scale.set(o.scale.x,o.scale.y,o.scale.z); G1.add(m);});
});

// GLTF upload
const loader=new GLTFLoader();
document.getElementById('gltfInput').addEventListener('change',(e)=>{
  const f=e.target.files[0]; if(!f) return; const url=URL.createObjectURL(f);
  loader.load(url,(g)=>{G2.clear(); const o=g.scene; o.traverse(n=>{if(n.isMesh){n.material=new THREE.MeshStandardMaterial({color:C2,metalness:0.1,roughness:0.6});}}); G2.add(o);},undefined,err=>alert('Load error: '+err.message));
});

// Example layouts (8)
const EX=[
  {name:'Lunar Outpost — South Pole (2030)', mods:[['cylinder',3,6],['dome',3,0],['ring',2,0]]},
  {name:'Inflatable Greenhouse (2032)', mods:[['capsule',2,5],['cube',2,0]]},
  {name:'Pressurized Rover Garage (2035)', mods:[['cylinder',3,3],['cube',3,0]]},
  {name:'Mars Transit Habitat (2038)', mods:[['capsule',1.6,6],['ring',1.2,0]]},
  {name:'Gateway Dock Module (2040)', mods:[['cylinder',1.8,4],['dome',1.8,0]]},
  {name:'Surface Science Lab (2042)', mods:[['cube',2.2,0],['sphere',1.6,0]]},
  {name:'Crew Quarters (2044)', mods:[['capsule',1.4,3.2],['cube',1.4,0]]},
  {name:'Power Hub (2046)', mods:[['cylinder',2.8,1.2],['ring',1.4,0]]}
];
const list=document.getElementById('exampleList');
EX.forEach(e=>{
  const li=document.createElement('li'); const s=document.createElement('span'); s.textContent=e.name;
  const b=document.createElement('button'); b.className='btn'; b.textContent='Load';
  b.onclick=()=>{ G1.clear(); e.mods.forEach(m=>addByShape(m[0],m[1],m[2])); document.getElementById('calcOut').className='notice ok'; document.getElementById('calcOut').textContent='Example loaded: '+e.name; };
  li.append(s,b); list.appendChild(li);
});
