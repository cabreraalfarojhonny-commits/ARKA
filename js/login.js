
if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js')); }
const $=s=>document.querySelector(s);
function H(s){let h=0; for(let i=0;i<s.length;i++){h=(h<<5)-h+s.charCodeAt(i);h|=0;} return h.toString(16);}
const users=()=> JSON.parse(localStorage.getItem('arka.users')||'{}');
function status(msg,ok=true){const el=$('#status'); el.className='notice ' + (ok?'ok':'err'); el.textContent=msg;}
document.getElementById('loginBtn').addEventListener('click',()=>{
  const u=$('#user').value.trim(), p=$('#pass').value; const db=users();
  if(!u||!p) return status('Please provide username and password.',false);
  status(db[u]===H(p)?'Welcome astronaut! You are in (demo only).':'Access denied. Invalid credentials.', db[u]===H(p));
});
