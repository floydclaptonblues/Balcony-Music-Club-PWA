(function(){
  const MARQUEE_TEXT = "Try The Bangin' BMC BoozBalls Now!";
  const COCKTAIL_IMAGE = 'assets/venue/1000019805.jpg';
  const DRAFT_BEERS = [
    'Coors Light',
    'Dos Equis',
    'Blue Moon Belgian White',
    'Miller Lite',
    'Modelo Especial',
    'Lagunitas IPA',
    'Yuengling Lager',
    'Paradise Park',
    'Abita Strawberry Lager',
    'Abita Amber',
    'Abita Purple Haze',
    'Gnarley Barley Jucifer IPA'
  ];

  function addStyle(){
    document.getElementById('bmc-hide-boozeball-temporary')?.remove();
    document.getElementById('bmc-hide-boozeball-temporary-script')?.remove();
    if(document.getElementById('bmc-drink-menu-style')) return;
    const style=document.createElement('style');
    style.id='bmc-drink-menu-style';
    style.textContent = `
      .boozball-marquee-shell{display:block;position:relative;z-index:5;margin:8px 0 18px;padding:10px;background:linear-gradient(180deg,rgba(255,216,87,.9),rgba(255,74,176,.72));border:2px solid #000;border-radius:16px;box-shadow:0 0 24px rgba(255,216,87,.36),0 10px 30px rgba(255,74,176,.22);overflow:hidden}
      .boozball-marquee-link{display:block;position:relative;overflow:hidden;min-height:58px;border:2px solid #000;border-radius:12px;background:linear-gradient(90deg,#190724,#4b1380,#190724);color:#fff7d6;text-decoration:none;text-shadow:2px 2px 0 #000;box-shadow:inset 0 0 0 3px rgba(94,230,255,.65);animation:boozBallBlink .9s steps(2,end) infinite}
      .boozball-marquee-track{display:flex;width:max-content;white-space:nowrap;animation:boozBallScroll 10s linear infinite}
      .boozball-marquee-track span{display:inline-flex;align-items:center;min-height:58px;padding:0 34px;font-family:Chicago,Charcoal,Geneva,'Arial Rounded MT Bold',Verdana,sans-serif;text-transform:uppercase;letter-spacing:.08em;font-size:clamp(16px,5vw,29px);font-weight:1000;color:#ffe57a}
      .boozball-card{border-color:rgba(255,216,87,.68);background:linear-gradient(180deg,rgba(255,216,87,.12),rgba(255,74,176,.07)),linear-gradient(180deg,rgba(50,25,86,.86),rgba(20,7,35,.88))}
      .boozball-card h2{margin-bottom:10px}.boozball-lede{font-size:16px;color:#fff6e8;margin-top:0}.boozball-photo{display:block;width:100%;height:auto;border:2px solid #000;border-radius:14px;background:#120728;box-shadow:0 8px 28px rgba(0,0,0,.42);margin:12px 0}.boozball-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:10px}
      .bmc-drink-modal{position:fixed;inset:0;z-index:99998;display:none;align-items:center;justify-content:center;padding:14px}.bmc-drink-modal.is-open{display:flex}.bmc-drink-backdrop{position:absolute;inset:0;background:rgba(5,2,11,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}.bmc-drink-dialog{position:relative;z-index:1;width:min(720px,100%);max-height:86svh;overflow:auto;border:3px solid #000;border-radius:18px;background:linear-gradient(180deg,rgba(50,25,86,.98),rgba(18,7,34,.98));box-shadow:0 28px 80px rgba(0,0,0,.72),0 0 0 2px rgba(255,216,87,.35);padding:16px}.bmc-drink-close{float:right;margin-left:8px}.bmc-draft-list{display:grid;grid-template-columns:1fr;gap:8px;list-style:none;margin:12px 0 0;padding:0}.bmc-draft-list li{border:2px solid #000;border-radius:12px;background:rgba(0,0,0,.24);padding:10px 12px;color:#fff6e8;font-weight:900}.bmc-drink-open{overflow:hidden}
      @keyframes boozBallBlink{0%,49%{filter:saturate(1.15) brightness(1.08)}50%,100%{filter:saturate(2.05) brightness(1.42)}}
      @keyframes boozBallScroll{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
      @media(min-width:680px){.bmc-draft-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media (prefers-reduced-motion:reduce){.boozball-marquee-link,.boozball-marquee-track{animation:none}.boozball-marquee-track{transform:none}}
    `;
    document.head.appendChild(style);
  }

  function marquee(){
    return '<section class="boozball-marquee-shell" aria-label="BMC BoozBalls special"><a class="boozball-marquee-link" href="#boozballs"><span class="boozball-marquee-track"><span>'+MARQUEE_TEXT+'</span><span>'+MARQUEE_TEXT+'</span><span>'+MARQUEE_TEXT+'</span><span>'+MARQUEE_TEXT+'</span></span></a></section>';
  }

  function addNav(){
    const nav=document.querySelector('header nav,.top nav,nav');
    if(!nav || nav.querySelector('a[href="#boozballs"]')) return;
    const a=document.createElement('a');
    a.href='#boozballs';
    a.textContent='BoozBalls';
    const before=nav.querySelector('a[href="#notify"]') || nav.querySelector('a[href="#save"]');
    nav.insertBefore(a,before || null);
  }

  function closeDrinkMenu(){
    const modal=document.getElementById('bmc-drink-menu-modal');
    if(modal){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('bmc-drink-open');}
  }

  function openDrinkMenu(){
    let modal=document.getElementById('bmc-drink-menu-modal');
    if(!modal){
      modal=document.createElement('div');
      modal.id='bmc-drink-menu-modal';
      modal.className='bmc-drink-modal';
      modal.setAttribute('aria-hidden','true');
      modal.innerHTML='<div class="bmc-drink-backdrop" data-drink-close="true"></div><div class="bmc-drink-dialog" role="dialog" aria-modal="true" aria-labelledby="bmc-drink-title"><button class="button ghost bmc-drink-close" type="button" data-drink-close="true">Close</button><span class="ribbon">Drink Menu</span><h2 id="bmc-drink-title">Draft Beers</h2><ul class="bmc-draft-list">'+DRAFT_BEERS.map(function(item){return '<li>'+item+'</li>';}).join('')+'</ul></div>';
      document.body.appendChild(modal);
      modal.querySelectorAll('[data-drink-close="true"]').forEach(function(btn){btn.addEventListener('click',closeDrinkMenu);});
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('bmc-drink-open');
    const close=modal.querySelector('.bmc-drink-close');
    if(close) close.focus();
  }

  function addBoozBalls(){
    addStyle();
    addNav();
    document.querySelectorAll('.boozeball-marquee-shell,#boozeball,a[href="#boozeball"]').forEach(function(n){n.remove();});
    if(!document.getElementById('boozballs')){
      const target=document.getElementById('notify') || document.getElementById('schedule') || document.querySelector('.marquee-shell') || document.getElementById('home');
      const html=marquee()+'<section id="boozballs" class="panel boozball-card"><span class="ribbon">Drink Special</span><h2>The Bangin\' BMC BoozBalls</h2><p class="boozball-lede">Ask the bar about the BMC BoozBalls cocktail special.</p><img class="boozball-photo" src="'+COCKTAIL_IMAGE+'" alt="BMC BoozBalls cocktail special"><div class="boozball-actions"><button class="button secondary bmc-drink-menu-button" type="button">View Drink Menu</button></div></section>'+marquee();
      if(target) target.insertAdjacentHTML(target.id==='notify'?'afterend':'afterend',html);
    }
    document.querySelectorAll('.bmc-drink-menu-button').forEach(function(btn){
      if(btn.dataset.bound==='true') return;
      btn.dataset.bound='true';
      btn.addEventListener('click',openDrinkMenu);
    });
  }

  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDrinkMenu();});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addBoozBalls); else addBoozBalls();
  window.addEventListener('load',function(){addBoozBalls();setTimeout(addBoozBalls,300);setTimeout(addBoozBalls,1200);});
})();
