
if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js')); }
(async function(){
  const wrap=document.getElementById('learnWrap');
  const data=await fetch('./data/nasa.json').then(r=>r.json()).catch(()=>({learn_sections:[]}));
  (data.learn_sections||[]).forEach(sec=>{
    const el=document.createElement('div'); el.className='card';
    el.innerHTML=`<h3>${sec.title}</h3><p>${sec.summary}</p><ul>${(sec.bullets||[]).map(b=>`<li>${b}</li>`).join('')}</ul>`;
    wrap.appendChild(el);
  });
})();
