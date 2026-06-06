(function(){
  var CONTACT_DISPLAY='504-428-5494';
  var CONTACT_TEL='+15044285494';
  var HERO_ASSET='assets/hero/file_000000006800722f9d43f096597b367e.png?v=20260606hq2';
  var SIGNATURE_DRINKS=[
    ['The BMC','Choice of tequila, vodka, gin, or rum; sweet blue-agave lift with minty citrus and a bright soda finish.'],
    ['Etta Jameson','Whiskey-based; peach, passionfruit, citrus, and soft almond notes.'],
    ['Jimi Hendrix Fizz','Gin-based; floral violet, fresh lemon, and a crisp bubbly finish.'],
    ['Uptown Funk','Tequila-based; bright lime, guava sweetness, and a floral finish.'],
    ['Muddy Waters','Chocolate vodka-based; creamy chocolate, espresso, and warm spice.'],
    ['Billie Holiday','Rum-based; tropical mango, lime, and pineapple.'],
    ['Prince Pimms','Pimm’s and cucumber-vodka based; cucumber, lemon, and ginger spice.'],
    ['Esplanade Lemonade','Strawberry-vodka based; strawberry lemonade, grapefruit bitters, and soda sparkle.']
  ];
  var PACKAGED_DRINKS=['Budweiser','Corona','Crescent 9 Tropical','Crescent 9 Ginger Lemonade','Gosling Ginger Beer','Heineken','Heineken Zero','High Noon Grapefruit','High Noon Watermelon','High Noon Pin','Michelob Ultra','Miller High Life','Negra Modelo','New Castle','Not Your Fathers Root Beer','Pacifico','Paradise Park','PBR','Red Stripe','Shiner Bock','Sierra Nevada','Stella Artois','Urban South Holy Roller','Woodchuck Amber'];

  function installStarryNightTheme(){
    if(document.getElementById('bmc-starry-night-theme'))return;
    var style=document.createElement('style');
    style.id='bmc-starry-night-theme';
    style.textContent='html{background:#05020b!important;}body{background:#05020b!important;position:relative;}body:after{display:none!important}.bmc-ironwork{display:none!important}.bmc-cosmic-field{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:radial-gradient(circle at 78% 8%,rgba(232,222,255,.44) 0 2.3rem,rgba(160,145,255,.16) 2.4rem 5rem,transparent 5.1rem),radial-gradient(circle at 18% 16%,rgba(255,74,176,.28),transparent 22rem),radial-gradient(circle at 84% 36%,rgba(94,230,255,.18),transparent 20rem),linear-gradient(180deg,#07051a 0%,#13072d 38%,#210a37 70%,#06030f 100%)}.bmc-cosmic-field:before,.bmc-cosmic-field:after{content:"";position:absolute;inset:-20%;background-repeat:repeat;will-change:transform,background-position}.bmc-cosmic-field:before{background-image:radial-gradient(circle,rgba(255,255,255,.95) 0 1px,transparent 1.45px),radial-gradient(circle,rgba(255,216,87,.74) 0 1px,transparent 1.55px),radial-gradient(circle,rgba(94,230,255,.68) 0 1px,transparent 1.65px);background-size:72px 72px,119px 119px,181px 181px;background-position:0 0,26px 48px,84px 18px;opacity:.72;animation:bmcStarDrift 42s linear infinite}.bmc-cosmic-field:after{background-image:radial-gradient(ellipse at center,rgba(118,76,255,.34),transparent 38%),radial-gradient(circle,rgba(255,255,255,.36) 0 1px,transparent 1.8px);background-size:100% 100%,260px 260px;background-position:center,40px 60px;opacity:.44;animation:bmcStarSpin 95s linear infinite}.bmc-night-haze{position:fixed;inset:auto -10vw 0 -10vw;height:58vh;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 20% 75%,rgba(255,135,63,.22),transparent 28rem),radial-gradient(ellipse at 80% 70%,rgba(171,55,255,.28),transparent 32rem),linear-gradient(180deg,transparent,rgba(6,2,12,.74))}.bmc-orbit-ring{position:fixed;inset:9vh 5vw auto auto;width:min(72vw,620px);height:min(72vw,620px);border:1px solid rgba(118,210,255,.12);border-radius:50%;z-index:1;pointer-events:none;animation:bmcOrbitSpin 84s linear infinite}.bmc-orbit-ring:before,.bmc-orbit-ring:after{content:"";position:absolute;border-radius:50%;box-shadow:0 0 28px rgba(94,230,255,.24),inset -18px -16px 26px rgba(0,0,0,.55),inset 12px 10px 18px rgba(255,255,255,.16)}.bmc-orbit-ring:before{width:78px;height:78px;left:8%;top:10%;background:radial-gradient(circle at 30% 28%,#8deaff 0 8%,#1b83b4 34%,#07142d 70%)}.bmc-orbit-ring:after{width:48px;height:48px;right:9%;bottom:18%;background:radial-gradient(circle at 28% 26%,#ffb1ff 0 8%,#7e2fbb 38%,#170622 72%);box-shadow:0 0 32px rgba(255,74,176,.32),inset -12px -10px 20px rgba(0,0,0,.58),inset 8px 8px 14px rgba(255,255,255,.14)}.bmc-planet-large{position:fixed;right:clamp(12px,5vw,70px);bottom:clamp(80px,16vh,170px);width:clamp(88px,15vw,170px);height:clamp(88px,15vw,170px);border-radius:50%;z-index:1;pointer-events:none;background:radial-gradient(circle at 28% 24%,rgba(255,195,255,.9) 0 7%,rgba(155,65,210,.9) 30%,rgba(42,10,67,.96) 68%,rgba(5,2,11,.95) 100%);box-shadow:0 0 46px rgba(255,74,176,.42),inset -32px -26px 42px rgba(0,0,0,.62),inset 18px 16px 22px rgba(255,255,255,.12);animation:bmcPlanetFloat 18s ease-in-out infinite}.bmc-planet-small{position:fixed;left:clamp(18px,7vw,92px);top:clamp(110px,18vh,190px);width:clamp(46px,8vw,82px);height:clamp(46px,8vw,82px);border-radius:50%;z-index:1;pointer-events:none;background:radial-gradient(circle at 30% 26%,rgba(142,246,255,.95) 0 9%,rgba(18,109,170,.9) 36%,rgba(5,17,38,.95) 75%);box-shadow:0 0 36px rgba(94,230,255,.4),inset -16px -14px 24px rgba(0,0,0,.65),inset 10px 9px 14px rgba(255,255,255,.14);animation:bmcPlanetFloat2 23s ease-in-out infinite}.bmc-comet{position:fixed;left:-20vw;top:22vh;width:34vw;height:2px;z-index:1;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(94,230,255,.9),rgba(255,255,255,.7),transparent);filter:blur(.4px);opacity:.0;transform:rotate(-13deg);animation:bmcComet 12s ease-in-out infinite}body>header,body>main,body>footer{position:relative;z-index:2}.chips{display:none!important}.window,.panel,.top{backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);background-color:rgba(18,7,40,.76)!important}.card,.bot-box{background-color:rgba(30,13,52,.78)!important}.window,.panel,.card,.bot-box{border-color:rgba(255,216,87,.48)!important;box-shadow:0 0 0 1px rgba(255,216,87,.08),0 18px 42px rgba(0,0,0,.42)!important}.marquee-shell{background:linear-gradient(180deg,rgba(116,66,0,.74),rgba(75,37,0,.62))!important;box-shadow:0 12px 38px rgba(255,74,176,.12)!important}.drink-menu-panel .drink-card h3{color:#ffd857}.drink-menu-panel .drink-card p{font-size:13px}.drink-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px}.drink-pill{border:1px solid rgba(255,216,87,.42);border-radius:999px;padding:8px 10px;background:rgba(0,0,0,.18);font-size:12px;color:#fff6e8;text-align:center}.drink-menu-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}@keyframes bmcStarDrift{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(120px,-90px,0)}}@keyframes bmcStarSpin{0%{transform:rotate(0deg) scale(1.05)}100%{transform:rotate(360deg) scale(1.05)}}@keyframes bmcOrbitSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes bmcPlanetFloat{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-18px,-14px,0) scale(1.04)}}@keyframes bmcPlanetFloat2{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(16px,12px,0) scale(.96)}}@keyframes bmcComet{0%,70%{opacity:0;transform:translateX(0) rotate(-13deg)}78%{opacity:.75}100%{opacity:0;transform:translateX(140vw) translateY(22vh) rotate(-13deg)}}@media(min-width:760px){.drink-list{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(prefers-reduced-motion:reduce){.bmc-cosmic-field:before,.bmc-cosmic-field:after,.bmc-orbit-ring,.bmc-planet-large,.bmc-planet-small,.bmc-comet{animation:none!important}}';
    document.head.appendChild(style);
    document.querySelectorAll('.bmc-ironwork').forEach(function(el){el.remove();});
    var cosmic=document.createElement('div');cosmic.className='bmc-cosmic-field';cosmic.setAttribute('aria-hidden','true');
    var haze=document.createElement('div');haze.className='bmc-night-haze';haze.setAttribute('aria-hidden','true');
    var orbit=document.createElement('div');orbit.className='bmc-orbit-ring';orbit.setAttribute('aria-hidden','true');
    var large=document.createElement('div');large.className='bmc-planet-large';large.setAttribute('aria-hidden','true');
    var small=document.createElement('div');small.className='bmc-planet-small';small.setAttribute('aria-hidden','true');
    var comet=document.createElement('div');comet.className='bmc-comet';comet.setAttribute('aria-hidden','true');
    document.body.prepend(comet);document.body.prepend(large);document.body.prepend(small);document.body.prepend(orbit);document.body.prepend(haze);document.body.prepend(cosmic);
  }

  function removeFakeChips(){document.querySelectorAll('.chips').forEach(function(el){el.remove();});}
  function patchText(el){
    if(!el)return;
    el.querySelectorAll('a[href^="tel:"]').forEach(function(a){a.href='tel:'+CONTACT_TEL;a.textContent=CONTACT_DISPLAY;});
    el.innerHTML=el.innerHTML.replace(/\(504\) 301-5912/g,CONTACT_DISPLAY).replace(/504-301-5912/g,CONTACT_DISPLAY).replace(/504-281-8736/g,CONTACT_DISPLAY).replace(/\+15043015912/g,CONTACT_TEL).replace(/\+15042818736/g,CONTACT_TEL);
  }
  function patchContactGrid(){var grid=document.querySelector('.contact-grid');if(grid){grid.innerHTML='<article class="card contact-item"><strong>Contact</strong><a href="tel:'+CONTACT_TEL+'">'+CONTACT_DISPLAY+'</a></article>';grid.style.gridTemplateColumns='1fr';}}
  function patchBookingAndEvents(){var book=document.getElementById('book');var events=document.getElementById('events');patchText(book);patchText(events);if(events){events.querySelectorAll('p').forEach(function(p){p.innerHTML=p.innerHTML.replace(/Registration: <a href="tel:[^"]+">[^<]+<\/a>/g,'Registration / contact: <a href="tel:'+CONTACT_TEL+'">'+CONTACT_DISPLAY+'</a>');});}}
  function patchBot(){
    var bot=window.BMC_JAZZYCAT;if(!bot)return;
    bot.fallback='I do not have that loaded yet. Ask about the schedule, booking, drink menu, contact, Paint and Sip, social links, or venue spaces.';
    bot.answers=(bot.answers||[]).filter(function(item){var keys=(item.keys||[]).join(' ');return !/phone|call|contact|number|paint|sip|register|drink|cocktail|beer|menu/.test(keys);});
    bot.answers.splice(3,0,
      {keys:['phone','call','contact','number'],answer:'The contact number for Balcony Music Club is 504-428-5494.'},
      {keys:['paint','sip','register'],answer:'For Paint and Sip or general questions, use the contact number 504-428-5494.'},
      {keys:['drink','cocktail','beer','menu','signature'],answer:'The Drink Menu section lists BMC signature drinks by main spirit and flavor profile, plus packaged drinks visible from the approved menu photos.'}
    );
  }
  function preferFullQualityHero(){var poster=document.querySelector('.poster');if(!poster)return;var test=new Image();test.onload=function(){poster.innerHTML='<img class="hero-upload" src="'+HERO_ASSET+'" alt="Balcony Music Club live music cocktails NOLA collage">';};test.onerror=function(){if(window.BMC_HERO_IMAGE&&!poster.querySelector('.hero-upload')){var hero=document.getElementById('heroArt');if(hero)hero.outerHTML='<img class="hero-upload" src="'+window.BMC_HERO_IMAGE+'" alt="Balcony Music Club live music cocktails NOLA collage">';}};test.src=HERO_ASSET;}
  function installDrinkMenu(){
    if(document.getElementById('drinks'))return;
    var nav=document.querySelector('nav');
    if(nav&&!nav.querySelector('a[href="#drinks"]')){var a=document.createElement('a');a.href='#drinks';a.textContent='Drinks';var contact=nav.querySelector('a[href="#contact"]');nav.insertBefore(a,contact||null);}
    var buttons=document.querySelector('.hero-copy .buttons');
    if(buttons&&!buttons.querySelector('a[href="#drinks"]')){var b=document.createElement('a');b.className='button secondary';b.href='#drinks';b.textContent='Drink Menu';buttons.appendChild(b);}
    var drinksHtml=SIGNATURE_DRINKS.map(function(d){return '<article class="card drink-card"><h3>'+d[0]+'</h3><p>'+d[1]+'</p></article>';}).join('');
    var packagedHtml=PACKAGED_DRINKS.map(function(d){return '<span class="drink-pill">'+d+'</span>';}).join('');
    var section=document.createElement('section');section.id='drinks';section.className='panel drink-menu-panel';
    section.innerHTML='<span class="ribbon">Drink Menu</span><h2>Signature Drinks</h2><p class="note">Guest-facing descriptions show the main spirit and flavor profile only. Prices are not shown in the uploaded menu images.</p><div class="grid">'+drinksHtml+'</div><h2 style="margin-top:18px">Packaged Drinks</h2><p class="note">Visible list from the uploaded packaged-drinks menu image.</p><div class="drink-list">'+packagedHtml+'</div><div class="drink-menu-actions"><a class="button primary" href="#contact">Questions? Call '+CONTACT_DISPLAY+'</a></div>';
    var events=document.getElementById('events');var book=document.getElementById('book');
    if(events&&events.parentNode)events.parentNode.insertBefore(section,events);else if(book&&book.parentNode)book.parentNode.insertBefore(section,book.nextSibling);
  }
  function run(){installStarryNightTheme();removeFakeChips();patchContactGrid();patchBookingAndEvents();patchBot();preferFullQualityHero();installDrinkMenu();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
