
if ('serviceWorker' in navigator) { window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js')); }
const gal=document.getElementById('gallery');
const preset=[
  "https://images-assets.nasa.gov/image/PIA13522/PIA13522~orig.jpg",
  "https://images-assets.nasa.gov/image/PIA23764/PIA23764~orig.jpg",
  "https://images-assets.nasa.gov/image/PIA22559/PIA22559~orig.jpg",
  "https://images-assets.nasa.gov/image/iss070e000001/iss070e000001~orig.jpg",
  "https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg",
  "https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg"
];
function add(src){ const img=new Image(); img.loading='lazy'; img.src=src; gal.appendChild(img); }
preset.forEach(add);
document.getElementById('imgInput').addEventListener('change',(e)=>{ for(const f of e.target.files){ add(URL.createObjectURL(f)); } });
