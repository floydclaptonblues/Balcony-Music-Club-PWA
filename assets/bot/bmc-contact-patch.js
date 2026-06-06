(function(){
  var CONTACT_DISPLAY='504-428-5494';
  var CONTACT_TEL='+15044285494';
  var HERO_ASSET='assets/hero/file_000000006800722f9d43f096597b367e.png?v=20260606hq2';
  function installStarryNightTheme(){
    if(document.getElementById('bmc-starry-night-theme'))return;
    var style=document.createElement('style');
    style.id='bmc-starry-night-theme';
    style.textContent='html{background:#05020b!important;}body{background:#05020b!important;position:relative;}body:before{content:"";position:fixed;inset:0;z-index:-5;pointer-events:none;background:radial-gradient(circle at 78% 8%,rgba(232,222,255,.62) 0 2.8rem,rgba(160,145,255,.18) 2.9rem 5.4rem,transparent 5.5rem),radial-gradient(circle at 20% 15%,rgba(255,74,176,.22),transparent 20rem),radial-gradient(circle at 82% 36%,rgba(94,230,255,.16),transparent 18rem),linear-gradient(180deg,#07051a 0%,#13072d 36%,#210a37 68%,#06030f 100%);}.bmc-stars,.bmc-stars:before,.bmc-stars:after{position:fixed;inset:0;z-index:-4;pointer-events:none;content:"";background-repeat:repeat;background-image:radial-gradient(circle,rgba(255,255,255,.92) 0 1px,transparent 1.4px),radial-gradient(circle,rgba(255,216,87,.72) 0 1px,transparent 1.5px),radial-gradient(circle,rgba(94,230,255,.65) 0 1px,transparent 1.6px);background-size:92px 92px,137px 137px,211px 211px;background-position:0 0,26px 48px,84px 18px;opacity:.58;}.bmc-stars:before{opacity:.42;filter:blur(.35px);transform:scale(1.15);}.bmc-stars:after{opacity:.22;filter:blur(1px);transform:scale(1.6);}.bmc-night-haze{position:fixed;inset:auto -10vw 0 -10vw;height:58vh;z-index:-3;pointer-events:none;background:radial-gradient(ellipse at 20% 75%,rgba(255,135,63,.24),transparent 28rem),radial-gradient(ellipse at 80% 70%,rgba(171,55,255,.22),transparent 32rem),linear-gradient(180deg,transparent,rgba(6,2,12,.74));}.bmc-ironwork{position:fixed;inset:auto 0 0 0;height:32vh;z-index:-2;pointer-events:none;opacity:.22;background:repeating-linear-gradient(90deg,transparent 0 2.1rem,rgba(255,216,87,.24) 2.16rem 2.24rem,transparent 2.3rem 4.5rem),radial-gradient(circle at 12% 72%,transparent 0 2.1rem,rgba(255,216,87,.22) 2.18rem 2.26rem,transparent 2.34rem),radial-gradient(circle at 32% 74%,transparent 0 2rem,rgba(255,216,87,.2) 2.08rem 2.16rem,transparent 2.25rem),radial-gradient(circle at 52% 74%,transparent 0 2rem,rgba(255,216,87,.2) 2.08rem 2.16rem,transparent 2.25rem),radial-gradient(circle at 72% 74%,transparent 0 2rem,rgba(255,216,87,.2) 2.08rem 2.16rem,transparent 2.25rem),linear-gradient(180deg,transparent,rgba(0,0,0,.65));}.window,.panel,.top{backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);background-color:rgba(18,7,40,.72)!important;}.card,.bot-box{background-color:rgba(30,13,52,.74)!important;}.window,.panel,.card,.bot-box{border-color:rgba(255,216,87,.46)!important;box-shadow:0 0 0 1px rgba(255,216,87,.08),0 18px 42px rgba(0,0,0,.42)!important;}.marquee-shell{background:linear-gradient(180deg,rgba(116,66,0,.74),rgba(75,37,0,.62))!important;box-shadow:0 12px 38px rgba(255,74,176,.12)!important;}';
    document.head.appendChild(style);
    var stars=document.createElement('div');stars.className='bmc-stars';stars.setAttribute('aria-hidden','true');
    var haze=document.createElement('div');haze.className='bmc-night-haze';haze.setAttribute('aria-hidden','true');
    var iron=document.createElement('div');iron.className='bmc-ironwork';iron.setAttribute('aria-hidden','true');
    document.body.prepend(iron);document.body.prepend(haze);document.body.prepend(stars);
  }
  function patchText(el){
    if(!el)return;
    el.querySelectorAll('a[href^="tel:"]').forEach(function(a){a.href='tel:'+CONTACT_TEL;a.textContent=CONTACT_DISPLAY;});
    el.innerHTML=el.innerHTML
      .replace(/\(504\) 301-5912/g, CONTACT_DISPLAY)
      .replace(/504-301-5912/g, CONTACT_DISPLAY)
      .replace(/504-281-8736/g, CONTACT_DISPLAY)
      .replace(/\+15043015912/g, CONTACT_TEL)
      .replace(/\+15042818736/g, CONTACT_TEL);
  }
  function patchContactGrid(){
    var grid=document.querySelector('.contact-grid');
    if(grid){
      grid.innerHTML='<article class="card contact-item"><strong>Contact</strong><a href="tel:'+CONTACT_TEL+'">'+CONTACT_DISPLAY+'</a></article>';
      grid.style.gridTemplateColumns='1fr';
    }
  }
  function patchBookingAndEvents(){
    var book=document.getElementById('book');
    var events=document.getElementById('events');
    patchText(book); patchText(events);
    if(events){
      events.querySelectorAll('p').forEach(function(p){
        p.innerHTML=p.innerHTML.replace(/Registration: <a href="tel:[^"]+">[^<]+<\/a>/g,'Registration / contact: <a href="tel:'+CONTACT_TEL+'">'+CONTACT_DISPLAY+'</a>');
      });
    }
  }
  function patchBot(){
    var bot=window.BMC_JAZZYCAT;
    if(!bot)return;
    bot.fallback='I do not have that loaded yet. Ask about the schedule, booking, contact, Paint and Sip, social links, or venue spaces.';
    bot.answers=(bot.answers||[]).filter(function(item){
      var keys=(item.keys||[]).join(' ');
      return !/phone|call|contact|number|paint|sip|register/.test(keys);
    });
    bot.answers.splice(3,0,
      {keys:['phone','call','contact','number'],answer:'The contact number for Balcony Music Club is 504-428-5494.'},
      {keys:['paint','sip','register'],answer:'For Paint and Sip or general questions, use the contact number 504-428-5494.'}
    );
  }
  function preferFullQualityHero(){
    var poster=document.querySelector('.poster');
    if(!poster)return;
    var test=new Image();
    test.onload=function(){
      poster.innerHTML='<img class="hero-upload" src="'+HERO_ASSET+'" alt="Balcony Music Club live music cocktails NOLA collage">';
    };
    test.onerror=function(){
      if(window.BMC_HERO_IMAGE && !poster.querySelector('.hero-upload')){
        var hero=document.getElementById('heroArt');
        if(hero)hero.outerHTML='<img class="hero-upload" src="'+window.BMC_HERO_IMAGE+'" alt="Balcony Music Club live music cocktails NOLA collage">';
      }
    };
    test.src=HERO_ASSET;
  }
  function run(){installStarryNightTheme();patchContactGrid();patchBookingAndEvents();patchBot();preferFullQualityHero();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
