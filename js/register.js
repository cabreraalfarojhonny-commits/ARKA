
if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js')); }
const $=s=>document.querySelector(s);
function H(s){let h=0; for(let i=0;i<s.length;i++){h=(h<<5)-h+s.charCodeAt(i);h|=0;} return h.toString(16);}
const users=()=> JSON.parse(localStorage.getItem('arka.users')||'{}');
const setUsers=u=> localStorage.setItem('arka.users', JSON.stringify(u));
function status(msg,ok=true){const el=$('#status'); el.className='notice ' + (ok?'ok':'err'); el.textContent=msg;}
document.getElementById('registerBtn').addEventListener('click',()=>{
  const u=$('#user').value.trim(), p=$('#pass').value;
  if(!u||!p) return status('Please fill username & password.',false);
  const db=users(); if(db[u]) return status('User already exists.',false);
  db[u]=H(p); setUsers(db); status('Account created. You can login now!',true);
});
