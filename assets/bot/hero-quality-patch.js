(function(){
  var HERO_ASSET='assets/hero/file_000000006800722f9d43f096597b367e.png?v=hero-quality-20260609';

  function applyHero(){
    var poster=document.querySelector('.poster');
    if(!poster)return;

    var current=poster.querySelector('img.hero-upload');
    if(current && current.getAttribute('src') && current.getAttribute('src').indexOf('file_000000006800722f9d43f096597b367e.png')!==-1){
      current.style.imageRendering='auto';
      current.style.objectFit='contain';
      current.style.width='100%';
      current.style.height='auto';
      current.decoding='async';
      current.loading='eager';
      return;
    }

    var img=new Image();
    img.className='hero-upload';
    img.alt='Balcony Music Club live music cocktails NOLA collage';
    img.decoding='async';
    img.loading='eager';
    img.style.imageRendering='auto';
    img.style.objectFit='contain';
    img.style.width='100%';
    img.style.height='auto';
    img.onload=function(){poster.innerHTML='';poster.appendChild(img);};
    img.src=HERO_ASSET;
  }

  function installStyle(){
    if(document.getElementById('bmc-hero-quality-style'))return;
    var style=document.createElement('style');
    style.id='bmc-hero-quality-style';
    style.textContent='.poster{max-width:520px!important}.hero-upload{display:block!important;width:100%!important;height:auto!important;object-fit:contain!important;image-rendering:auto!important;filter:none!important;transform:translateZ(0)}@media(max-width:600px){.poster{max-width:94vw!important}}';
    document.head.appendChild(style);
  }

  function run(){installStyle();applyHero();setTimeout(applyHero,150);setTimeout(applyHero,600);setTimeout(applyHero,1400);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',run);
})();