
// Simple image/sticker demo for ARKA design page
(function(){
  const stage = document.getElementById('imageStage');
  if(!stage) return;
  const img = document.getElementById('demoImage');
  const stickerLayer = document.getElementById('stickerLayer');
  const imgs = ['images/demo1.jpg','images/demo2.jpg'];
  let idx = 0;
  function show(){ img.src = imgs[idx]; }
  document.getElementById('imgPrev').onclick = ()=>{ idx = (idx+imgs.length-1)%imgs.length; show(); };
  document.getElementById('imgNext').onclick = ()=>{ idx = (idx+1)%imgs.length; show(); };
  show();

  // cycle background colors
  const colors = ['#01040c','#0a1535','#001f2d','#222','linear-gradient(135deg,#040a1a,#0a1f3d)'];
  let ci=0;
  document.getElementById('bgColorBtn').onclick = ()=>{
    ci = (ci+1)%colors.length;
    stage.style.background = colors[ci];
  };

  // Helpers to create stickers
  function addSticker(cls){
    const el = document.createElement('div');
    el.className = 'sticker ' + cls;
    // default position center-ish
    el.style.left = '40%';
    el.style.top = '45%';
    stickerLayer.appendChild(el);
    makeDraggable(el);
  }

  document.getElementById('addDoorBtn').onclick = ()=> addSticker('door');
  document.getElementById('addWindowBtn').onclick = ()=> addSticker('window');
  document.getElementById('addRoofBtn').onclick = ()=> addSticker('roof');

  // Drag logic
  function makeDraggable(el){
    let ox=0, oy=0, dragging=false;
    el.addEventListener('pointerdown', (e)=>{
      dragging=true; el.setPointerCapture(e.pointerId);
      const r = el.getBoundingClientRect();
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
    });
    el.addEventListener('pointermove', (e)=>{
      if(!dragging) return;
      const layerRect = stickerLayer.getBoundingClientRect();
      let x = e.clientX - layerRect.left - ox;
      let y = e.clientY - layerRect.top - oy;
      // constrain
      x = Math.max(0, Math.min(layerRect.width - el.offsetWidth, x));
      y = Math.max(0, Math.min(layerRect.height - el.offsetHeight, y));
      el.style.left = (x / layerRect.width * 100) + '%';
      el.style.top  = (y / layerRect.height * 100) + '%';
    });
    el.addEventListener('pointerup', ()=>{ dragging=false; });
    el.addEventListener('pointercancel', ()=>{ dragging=false; });
  }
})();
