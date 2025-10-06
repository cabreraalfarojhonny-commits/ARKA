
if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js')); }
const list=document.getElementById('list');
const get=()=> JSON.parse(localStorage.getItem('arka.designs')||'[]');
const set=x=> localStorage.setItem('arka.designs', JSON.stringify(x));
const EX=[
  {name:'Lunar Outpost — South Pole (2030)', payload: JSON.stringify({objects:[{p:{x:0,y:3,z:0}, s:{x:3,y:6,z:3}}]})},
  {name:'Inflatable Greenhouse (2032)', payload: JSON.stringify({objects:[{p:{x:2,y:2,z:-1}, s:{x:2,y:2,z:2}}]})},
  {name:'Pressurized Rover Garage (2035)', payload: JSON.stringify({objects:[{p:{x:-2,y:1.5,z:1}, s:{x:3,y:1.5,z:3}}]})},
  {name:'Mars Transit Habitat (2038)', payload: JSON.stringify({objects:[{p:{x:0,y:2.5,z:0}, s:{x:1.5,y:5,z:1.5}}]})},
  {name:'Gateway Dock Module (2040)', payload: JSON.stringify({objects:[{p:{x:1.2,y:1.5,z:-1.2}, s:{x:1.2,y:3.2,z:1.2}}]})},
  {name:'Surface Science Lab (2042)', payload: JSON.stringify({objects:[{p:{x:-1.5,y:2,z:0.5}, s:{x:2.2,y:2.2,z:2.2}}]})}
];
function render(){
  list.innerHTML='';
  EX.forEach(d=> addItem(d.name, d.payload, true));
  get().forEach((d,i)=> addItem(d.name, d.payload, false, i));
}
function addItem(name, payload, builtin=false, idx=null){
  const li=document.createElement('li');
  const span=document.createElement('span'); span.textContent=name;
  const dl=document.createElement('a'); dl.className='btn'; dl.textContent='Download JSON';
  dl.href=URL.createObjectURL(new Blob([payload],{type:'application/json'})); dl.download=name.replace(/\s+/g,'_')+'.json';
  li.append(span, dl);
  if(!builtin){ const del=document.createElement('button'); del.className='btn'; del.textContent='Delete';
    del.onclick=()=>{ const arr=get(); arr.splice(idx,1); set(arr); render(); }; li.append(del); }
  list.append(li);
}
document.getElementById('save').addEventListener('click', ()=>{
  const name=(document.getElementById('dname').value||'Untitled').trim();
  const example = JSON.stringify({objects:[{p:{x:0,y:2,z:0}, s:{x:2,y:2,z:2}}]});
  const arr=get(); arr.unshift({name, payload: example, ts: Date.now()}); set(arr); render();
});
render();
