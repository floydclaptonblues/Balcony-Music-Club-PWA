(function(){
  var CONTACT_DISPLAY='504-428-5494';
  var CONTACT_TEL='+15044285494';
  var HERO_ASSET='assets/hero/file_000000006800722f9d43f096597b367e.png?v=hero-safe-20260609';
  var SHORTY_PHOTO='assets/bands/bmc-band-assets/assets/bands/1000021874.png?v=20260809-shorty';
  var FINAL_WELCOME='WELCOME TO THE OFFICIAL BALCONY MUSIC CLUB APP. BROWSE AND ENJOY.<br><br>© BALCONY MUSIC CLUB - THE CENTER OF THE UNIVERSE';
  var SIGNATURE_DRINKS=[
    ['Etta Jameson','Whiskey-based; peach, passionfruit, citrus, and soft almond notes.'],
    ['Jimi Hendrix Fizz','Gin-based; floral violet, fresh lemon, and a crisp bubbly finish.'],
    ['Uptown Funk','Tequila-based; bright lime, guava sweetness, and a floral finish.'],
    ['Muddy Waters','Chocolate vodka-based; creamy chocolate, espresso, and warm spice.'],
    ['Billie Holiday','Rum-based; tropical mango, lime, and pineapple.'],
    ['Prince Pimms','Pimm’s and cucumber-vodka based; cucumber, lemon, and ginger spice.'],
    ['Esplanade Lemonade','Strawberry-vodka based; strawberry lemonade, grapefruit bitters, and soda sparkle.']
  ];
  var PACKAGED_DRINKS=['Budweiser','Corona','Crescent 9 Tropical','Crescent 9 Ginger Lemonade','Gosling Ginger Beer','Heineken','Heineken Zero','High Noon Grapefruit','High Noon Watermelon','High Noon Pin','Michelob Ultra','Miller High Life','Negra Modelo','New Castle','Not Your Fathers Root Beer','Pacifico','Paradise Park','PBR','Red Stripe','Shiner Bock','Sierra Nevada','Stella Artois','Urban South Holy Roller','Woodchuck Amber'];
  var DRAFT_BEERS=['Coors Light','Dos Equis','Blue Moon Belgian White','Miller Lite','Modelo Especial','Lagunitas IPA','Yuengling Lager','Paradise Park','Abita Strawberry Lager','Abita Amber','Abita Purple Haze','Gnarley Barley Jucifer IPA'];
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function drinkCard(d){return '<article class="card drink-card"><h3>'+esc(d[0])+'</h3><p>'+esc(d[1])+'</p></article>';}
  function pillList(items){return items.map(function(d){return '<span class="drink-pill">'+esc(d)+'</span>';}).join('');}
  function isShorty(text){return /SHORTY\s*(?:&|AND)\s*THE\s*GIANTS/i.test(String(text||''));}
  function fixShortyPhotos(){
    document.querySelectorAll('.frozen-day-card,.bmc-calendar-act').forEach(function(block){
      if(!isShorty(block.textContent))return;
      var img=block.querySelector('.frozen-band-photo,.bmc-calendar-band-photo');
      if(!img)return;
      if(img.getAttribute('src')!==SHORTY_PHOTO)img.src=SHORTY_PHOTO;
      img.alt='Shorty & The Giants at Balcony Music Club';
      img.onerror=null;
      img.dataset.shortyCanonical='true';
    });
  }
  function watchShortyPhotos(){
    if(window.__BMC_SHORTY_PHOTO_WIRED||!window.MutationObserver||!document.body)return;
    window.__BMC_SHORTY_PHOTO_WIRED=true;
    new MutationObserver(function(){fixShortyPhotos();}).observe(document.body,{childList:true,subtree:true});
  }
  function installStyles(){
    var old=document.getElementById('bmc-safe-patch-style');
    if(old)old.remove();
    var s=document.createElement('style');s.id='bmc-safe-patch-style';
    s.textContent='.drink-modal-backdrop{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.72);display:none;align-items:center;justify-content:center;padding:16px}.drink-modal-backdrop.is-open{display:flex}.drink-modal{width:min(960px,100%);max-height:86vh;overflow:auto;border:2px solid rgba(255,216,87,.62);background:linear-gradient(180deg,rgba(38,14,68,.98),rgba(14,5,28,.98));box-shadow:0 24px 70px rgba(0,0,0,.7);padding:14px}.drink-modal-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.featured-drink-strip,.drink-highlight-strip{display:grid;gap:10px}.drink-pill-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}.drink-pill{border:1px solid rgba(255,216,87,.42);border-radius:999px;padding:8px 10px;background:rgba(0,0,0,.18);font-size:12px;color:#fff6e8;text-align:center}.hero-upload{image-rendering:auto!important;object-fit:contain!important;filter:none!important}@media(min-width:760px){.featured-drink-strip,.drink-highlight-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.drink-pill-list{grid-template-columns:repeat(3,minmax(0,1fr))}}';
    document.head.appendChild(s);
  }
  function removeSpecialEvents(){
    var events=document.getElementById('events');
    if(events)events.remove();
    document.querySelectorAll('nav a[href="#events"]').forEach(function(a){a.remove();});
  }
  function replaceTextSafe(root){
    if(!root||!document.createTreeWalker)return;
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null); var n;
    while((n=w.nextNode())){
      n.nodeValue=n.nodeValue.replace(/KIM INDA WIND BAND/g,'KIM IN THE WIND BAND').replace(/Kim Inda Wind Band/g,'Kim In The Wind Band').replace(/Scan, save, and check the July lineup\./gi,'Scan, save, and check the August lineup.').replace(/July 2026 live music/g,'August 2026 live music').replace(/Open Full July Calendar/g,'Open Full Calendar').replace(/Balcony Bar \/ Event Space/g,'Bar').replace(/balcony bar \/ event space/gi,'bar').replace(/balcony bar/gi,'bar');
    }
  }
  function cleanVenueSpaces(){
    if(Array.isArray(window.BMC_VENUE_PHOTOS))window.BMC_VENUE_PHOTOS=window.BMC_VENUE_PHOTOS.filter(function(p){return !/balcony bar|event space|private gathering/i.test((p.title||'')+' '+(p.caption||''));});
    document.querySelectorAll('.venue-photo-card').forEach(function(card){if(/balcony bar|event space|private gathering/i.test(card.textContent||''))card.remove();});
    document.querySelectorAll('#book p').forEach(function(p){p.innerHTML=p.innerHTML.replace(/Book the courtyard, speakeasy, balcony bar, or main stage for weddings, graduations, Mardi Gras balls, private celebrations, and receptions\./gi,'Book the courtyard, speakeasy, main stage, or approved private-event spaces for weddings, graduations, Mardi Gras balls, private celebrations, and receptions.');});
  }
  function cleanNotes(){document.querySelectorAll('#jazzycat .note, footer .note').forEach(function(el){el.remove();});document.querySelectorAll('p.note').forEach(function(el){if(/repo|source|embedded|snapshot|panel updates|loaded from|configured/i.test(el.textContent||''))el.remove();});}
  function hero(){var p=document.querySelector('.hero-copy p');if(p)p.innerHTML=FINAL_WELCOME;var poster=document.querySelector('.poster');if(poster&&!poster.querySelector('img[src*="file_000000006800722f9d43f096597b367e.png"]')){var img=new Image();img.className='hero-upload';img.alt='Balcony Music Club live music cocktails NOLA collage';img.decoding='async';img.loading='eager';img.onload=function(){poster.innerHTML='';poster.appendChild(img);};img.src=HERO_ASSET;}}
  function contacts(){document.querySelectorAll('a[href^="tel:"]').forEach(function(a){a.href='tel:'+CONTACT_TEL;if(/504|phone|contact/i.test(a.textContent))a.textContent=CONTACT_DISPLAY;});var grid=document.querySelector('.contact-grid');if(grid){grid.innerHTML='<article class="card contact-item"><strong>Contact</strong><a href="tel:'+CONTACT_TEL+'">'+CONTACT_DISPLAY+'</a></article>';grid.style.gridTemplateColumns='1fr';}}
  function installDrinkModal(){var old=document.getElementById('bmcDrinkModal');if(old)old.remove();var modal=document.createElement('div');modal.id='bmcDrinkModal';modal.className='drink-modal-backdrop';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.innerHTML='<div class="drink-modal"><div class="drink-modal-head"><h2>Drink Menu</h2><button type="button" class="button ghost drink-modal-close">Close</button></div><h3>Signature Drinks</h3><div class="drink-highlight-strip">'+SIGNATURE_DRINKS.map(drinkCard).join('')+'</div><h3 style="margin-top:16px">Draft Beers</h3><div class="drink-pill-list draft-beer-list">'+pillList(DRAFT_BEERS)+'</div><h3 style="margin-top:16px">Packaged Drinks</h3><div class="drink-pill-list packaged-drink-list">'+pillList(PACKAGED_DRINKS)+'</div></div>';document.body.appendChild(modal);}
  function drinks(){var existing=document.getElementById('drinks');if(existing)existing.remove();installDrinkModal();var nav=document.querySelector('nav');if(nav&&!nav.querySelector('a[href="#drinks"]')){var a=document.createElement('a');a.href='#drinks';a.textContent='Drinks';nav.insertBefore(a,nav.querySelector('a[href="#contact"]')||null);}var buttons=document.querySelector('.hero-copy .buttons');if(buttons&&!buttons.querySelector('a[href="#drinks"]')){var b=document.createElement('a');b.className='button secondary';b.href='#drinks';b.textContent='Drink Menu';buttons.appendChild(b);}var featured=SIGNATURE_DRINKS.slice(0,4);var section=document.createElement('section');section.id='drinks';section.className='panel drink-menu-panel';section.innerHTML='<span class="ribbon">Drink Menu</span><h2>Featured Drinks</h2><div class="featured-drink-strip">'+featured.map(drinkCard).join('')+'</div><p><button id="openDrinkMenu" type="button" class="button primary">Open Full Drink Menu</button></p>';var anchor=document.getElementById('events')||document.getElementById('jazzycat')||document.getElementById('store')||document.getElementById('contact');if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(section,anchor);}
  function setupBot(){var bot=window.BMC_JAZZYCAT;var log=document.getElementById('botLog');var form=document.getElementById('botForm');var input=document.getElementById('botInput');var quick=document.getElementById('quickRow');if(!bot||!log||!form||!input||!quick)return;var answers=[{keys:['schedule','band','music','tonight','lineup','show'],answer:'The Band Schedule section shows This Week\'s Lineup, with a button to open the full schedule.'},{keys:['drink','cocktail','beer','menu','draft'],answer:'The Drink Menu section shows featured drinks and opens the full drink menu with signature drinks, draft beers, and packaged drinks.'},{keys:['phone','call','contact','number'],answer:'The contact number for Balcony Music Club is '+CONTACT_DISPLAY+'.'},{keys:['space','spaces','room','rooms','courtyard','speakeasy','bar','stage'],answer:'Venue highlights include the courtyard, speakeasy, bar, and main-stage atmosphere.'}];function ask(q){var text=(q||'').toLowerCase();var hit=answers.find(function(item){return item.keys.some(function(k){return text.indexOf(k)!==-1;});});return hit?hit.answer:'Ask about the weekly lineup, full schedule, booking, drink menu, contact, social links, or venue spaces.';}log.textContent='Hi, I am JazzyCat. Ask about music, drinks, booking, or venue info.';quick.innerHTML=['Tonight','Band schedule','Drink menu','Contact','Booking'].map(function(q){return '<button class="button ghost" type="button">'+q+'</button>';}).join('');quick.querySelectorAll('button').forEach(function(btn){btn.onclick=function(){input.value=btn.textContent;log.textContent=ask(input.value);};});form.onsubmit=function(e){e.preventDefault();log.textContent=ask(input.value);};}
  function wireClicks(){if(window.__BMC_SAFE_CLICK_WIRED)return;window.__BMC_SAFE_CLICK_WIRED=true;document.addEventListener('click',function(e){var openDrinks=e.target.closest&&e.target.closest('#openDrinkMenu,a[href="#drinks"]');var drinkBackdrop=e.target.classList&&e.target.classList.contains('drink-modal-backdrop');var closeDrinks=e.target.closest&&e.target.closest('.drink-modal-close');if(openDrinks){e.preventDefault();var d=document.getElementById('bmcDrinkModal');if(d)d.classList.add('is-open');}if(drinkBackdrop||closeDrinks){var dm=document.getElementById('bmcDrinkModal');if(dm)dm.classList.remove('is-open');}});document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.drink-modal-backdrop.is-open').forEach(function(el){el.classList.remove('is-open');});}});}
  function run(){installStyles();removeSpecialEvents();cleanVenueSpaces();hero();contacts();drinks();setupBot();cleanNotes();replaceTextSafe(document.body);fixShortyPhotos();watchShortyPhotos();wireClicks();}
  function runSoon(){run();setTimeout(run,250);setTimeout(run,900);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',runSoon);else runSoon();
  window.addEventListener('load',runSoon);
})();
