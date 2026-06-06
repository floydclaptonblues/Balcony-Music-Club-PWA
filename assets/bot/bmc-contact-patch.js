(function(){
  var CONTACT_DISPLAY='504-428-5494';
  var CONTACT_TEL='+15044285494';
  var HERO_ASSET='assets/hero/file_000000006800722f9d43f096597b367e.png?v=20260606hq2';
  var SIGNATURE_DRINKS=[
    ['The BMC','Shot of tequila, vodka, gin or rum, 1.5 oz blue agave syrup, creme de menthe, splash of Sprite, mint leaf & lemon.'],
    ['Etta Jameson','2 oz Jameson, 1/2 oz Amaretto, 1/2 oz passion purée, 3/4 oz fresh lemon juice, peach bitters.'],
    ['Jimi Hendrix Fizz','2 oz Hendricks gin, 3/4 oz fresh lemon juice, 1/2 oz Creme de Violette, 1/2 oz simple syrup, top with Prosecco.'],
    ['Uptown Funk','2 oz Espolon Blanco, 3/4 oz Elderflower Liqueur, 3/4 oz fresh lime juice, 1/2 oz guava syrup.'],
    ['Muddy Waters','2 oz Chocolate Vodka, 1 oz Baileys Espresso, Aztec chocolate bitters.'],
    ['Billie Holiday','2 oz House Rum, 3/4 mango, 3/4 fresh lime juice, top with pineapple juice.'],
    ['Prince Pimms','1 oz Pimm’s, 1 1/2 Cucumber Vodka, 3/4 fresh lemon juice, top with Ginger Beer.'],
    ['Esplanade Lemonade','2 oz Strawberry Stoli, 3/4 oz strawberry purée, 3/4 oz fresh lemon juice, grapefruit bitters, top with soda.']
  ];
  var PACKAGED_DRINKS=['Budweiser','Corona','Crescent 9 Tropical','Crescent 9 Ginger Lemonade','Gosling Ginger Beer','Heineken','Heineken Zero','High Noon Grapefruit','High Noon Watermelon','High Noon Pin','Michelob Ultra','Miller High Life','Negra Modelo','New Castle','Not Your Fathers Root Beer','Pacifico','Paradise Park','PBR','Red Stripe','Shiner Bock','Sierra Nevada','Stella Artois','Urban South Holy Roller','Woodchuck Amber'];
  function installStarryNightTheme(){
    if(document.getElementById('bmc-starry-night-theme'))return;
    var style=document.createElement('style');
    style.id='bmc-starry-night-theme';
    style.textContent='html{background:#05020b!important;}body{background:#05020b!important;position:relative;}body:before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(circle at 78% 8%,rgba(232,222,255,.72) 0 2.8rem,rgba(160,145,255,.22) 2.9rem 5.4rem,transparent 5.5rem),radial-gradient(circle at 20% 15%,rgba(255,74,176,.27),transparent 20rem),radial-gradient(circle at 82% 36%,rgba(94,230,255,.2),transparent 18rem),linear-gradient(180deg,#07051a 0%,#13072d 36%,#210a37 68%,#06030f 100%)!important;}.bmc-stars,.bmc-stars:before,.bmc-stars:after{position:fixed;inset:0;z-index:0;pointer-events:none;content:"";background-repeat:repeat;background-image:radial-gradient(circle,rgba(255,255,255,.95) 0 1px,transparent 1.5px),radial-gradient(circle,rgba(255,216,87,.78) 0 1px,transparent 1.6px),radial-gradient(circle,rgba(94,230,255,.72) 0 1px,transparent 1.7px);background-size:72px 72px,119px 119px,181px 181px;background-position:0 0,26px 48px,84px 18px;opacity:.7;}.bmc-stars:before{opacity:.48;filter:blur(.35px);transform:scale(1.15);}.bmc-stars:after{opacity:.28;filter:blur(1px);transform:scale(1.55);}.bmc-night-haze{position:fixed;inset:auto -10vw 0 -10vw;height:58vh;z-index:0;pointer-events:none;background:radial-gradient(ellipse at 20% 75%,rgba(255,135,63,.28),transparent 28rem),radial-gradient(ellipse at 80% 70%,rgba(171,55,255,.28),transparent 32rem),linear-gradient(180deg,transparent,rgba(6,2,12,.74));}.bmc-ironwork{position:fixed;inset:auto 0 0 0;height:32vh;z-index:0;pointer-events:none;opacity:.25;background:repeating-linear-gradient(90deg,transparent 0 2.1rem,rgba(255,216,87,.28) 2.16rem 2.24rem,transparent 2.3rem 4.5rem),radial-gradient(circle at 12% 72%,transparent 0 2.1rem,rgba(255,216,87,.25) 2.18rem 2.26rem,transparent 2.34rem),radial-gradient(circle at 32% 74%,transparent 0 2rem,rgba(255,216,87,.23) 2.08rem 2.16rem,transparent 2.25rem),radial-gradient(circle at 52% 74%,transparent 0 2rem,rgba(255,216,87,.23) 2.08rem 2.16rem,transparent 2.25rem),radial-gradient(circle at 72% 74%,transparent 0 2rem,rgba(255,216,87,.23) 2.08rem 2.16rem,transparent 2.25rem),linear-gradient(180deg,transparent,rgba(0,0,0,.65));}body>header,body>main,body>footer{position:relative;z-index:2;}.chips{display:none!important;}.window,.panel,.top{backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);background-color:rgba(18,7,40,.76)!important;}.card,.bot-box{background-color:rgba(30,13,52,.78)!important;}.window,.panel,.card,.bot-box{border-color:rgba(255,216,87,.48)!important;box-shadow:0 0 0 1px rgba(255,216,87,.08),0 18px 42px rgba(0,0,0,.42)!important;}.marquee-shell{background:linear-gradient(180deg,rgba(116,66,0,.74),rgba(75,37,0,.62))!important;box-shadow:0 12px 38px rgba(255,74,176,.12)!important;}.drink-menu-panel .drink-card h3{color:#ffd857}.drink-menu-panel .drink-card p{font-size:13px}.drink-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px}.drink-pill{border:1px solid rgba(255,216,87,.42);border-radius:999px;padding:8px 10px;background:rgba(0,0,0,.18);font-size:12px;color:#fff6e8;text-align:center}.drink-menu-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}@media(min-width:760px){.drink-list{grid-template-columns:repeat(3,minmax(0,1fr))}}';
    document.head.appendChild(style);
    var stars=document.createElement('div');stars.className='bmc-stars';stars.setAttribute('aria-hidden','true');
    var haze=document.createElement('div');haze.className='bmc-night-haze';haze.setAttribute('aria-hidden','true');
    var iron=document.createElement('div');iron.className='bmc-ironwork';iron.setAttribute('aria-hidden','true');
    document.body.prepend(iron);document.body.prepend(haze);document.body.prepend(stars);
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
      {keys:['drink','cocktail','beer','menu','signature'],answer:'The Drink Menu section lists BMC signature drinks and packaged drinks visible from the approved menu photos.'}
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
    section.innerHTML='<span class="ribbon">Drink Menu</span><h2>Signature Drinks</h2><p class="note">Typed from the approved BMC signature drink menu photos. Prices are not shown in the uploaded menu images.</p><div class="grid">'+drinksHtml+'</div><h2 style="margin-top:18px">Packaged Drinks</h2><p class="note">Visible list from the uploaded packaged-drinks menu image.</p><div class="drink-list">'+packagedHtml+'</div><div class="drink-menu-actions"><a class="button primary" href="#contact">Questions? Call '+CONTACT_DISPLAY+'</a></div>';
    var events=document.getElementById('events');var book=document.getElementById('book');
    if(events&&events.parentNode)events.parentNode.insertBefore(section,events);else if(book&&book.parentNode)book.parentNode.insertBefore(section,book.nextSibling);
  }
  function run(){installStarryNightTheme();removeFakeChips();patchContactGrid();patchBookingAndEvents();patchBot();preferFullQualityHero();installDrinkMenu();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
