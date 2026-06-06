(function(){
  var CONTACT_DISPLAY='504-428-5494';
  var CONTACT_TEL='+15044285494';
  var HERO_ASSET='assets/hero/bmc-hero.png?v=20260606hq';
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
  function run(){patchContactGrid();patchBookingAndEvents();patchBot();preferFullQualityHero();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
