(function(){
  var ARTIST='Ashley Paige & The Soulcial Club';
  var BAND_BASE='assets/bands/bmc-band-assets/assets/bands/';
  var BAND_IMAGES={
    'ANDRE LOVETT BAND':BAND_BASE+'andre-lovett-band.jpg?v=20260615',
    'ASHLEY PAIGE & THE SOULCIAL CLUB':BAND_BASE+'ashley-paige-soulcial-club.jpg?v=20260615',
    'DAPPER DANDIES':BAND_BASE+'dapper-dandies.jpg?v=20260615',
    'MAURICE CADE & ESS':BAND_BASE+'maurice-cade-ess.jpg?v=20260615',
    'MOTHER RUCKUS':BAND_BASE+'mother-ruckus.jpg?v=20260615',
    'SUGAR & THE DADDIES':BAND_BASE+'sugar-and-the-daddies.jpg?v=20260615',
    'WOODYS RAMPAGE':BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'BIG MIKE & THE R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'SIERRA GREEN':BAND_BASE+'sierra-green.jpg?v=20260615',
    'SIERRA & GREEN NOTES':BAND_BASE+'sierra-green.jpg?v=20260615',
    'KIM IN THE WIND BAND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KAT KILEY EXPERIENCE':BAND_BASE+'kat-kiley-experience.webp?v=20260615'
  };

  function normalize(s){
    return String(s||'')
      .replace(/UNDER THE COVERS/g,ARTIST)
      .replace(/UNDER COVERS/g,ARTIST)
      .replace(/KIM INDA WIND BAND/g,'KIM IN THE WIND BAND')
      .replace(/\s+/g,' ')
      .trim()
      .toUpperCase();
  }

  function updateTextNodes(root){
    if(!root||!document.createTreeWalker)return;
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
    var node;
    while((node=walker.nextNode())){
      node.nodeValue=node.nodeValue
        .replace(/UNDER THE COVERS/g,ARTIST)
        .replace(/UNDER COVERS/g,ARTIST)
        .replace(/KIM INDA WIND BAND/g,'KIM IN THE WIND BAND')
        .replace(/Kim Inda Wind Band/g,'Kim In The Wind Band');
    }
  }

  function updateJazzyAnswers(){
    if(window.BMC_JAZZYCAT&&Array.isArray(window.BMC_JAZZYCAT.answers)){
      window.BMC_JAZZYCAT.answers.forEach(function(item){
        if(item&&typeof item.answer==='string'){
          item.answer=item.answer
            .replace(/UNDER THE COVERS/g,ARTIST)
            .replace(/UNDER COVERS/g,ARTIST)
            .replace(/KIM INDA WIND BAND/g,'KIM IN THE WIND BAND');
        }
      });
    }
  }

  function installBandStyles(){
    if(document.getElementById('bmc-headliner-band-style'))return;
    var style=document.createElement('style');
    style.id='bmc-headliner-band-style';
    style.textContent='.bmc-band-photo{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border:2px solid rgba(255,216,87,.58);border-radius:14px;margin:8px 0 10px;background:#120728;box-shadow:0 12px 28px rgba(0,0,0,.32)}.today-lineup .bmc-band-photo{margin-top:10px}.show-day .bmc-band-photo{max-height:220px}.act.is-headliner-only{border-top:1px dashed rgba(255,255,255,.24);padding-top:8px;margin-top:8px}.headliner-note{display:inline-flex;margin:0 0 5px;padding:3px 7px;border:1px solid rgba(255,216,87,.38);border-radius:999px;color:var(--gold);font-size:10px;letter-spacing:.05em;text-transform:uppercase;background:rgba(0,0,0,.2)}';
    document.head.appendChild(style);
  }

  function imageForArtist(artist){
    return BAND_IMAGES[normalize(artist)]||'';
  }

  function decorateContainer(container){
    if(!container)return;
    var acts=[].slice.call(container.querySelectorAll(':scope > .act'));
    if(!acts.length)return;
    var keep=acts[acts.length-1];
    acts.slice(0,-1).forEach(function(act){act.remove();});

    var nameEl=keep.querySelector('b');
    var artist=nameEl?nameEl.textContent:'';
    artist=artist
      .replace(/UNDER THE COVERS/g,ARTIST)
      .replace(/UNDER COVERS/g,ARTIST)
      .replace(/KIM INDA WIND BAND/g,'KIM IN THE WIND BAND');
    if(nameEl)nameEl.textContent=artist;

    keep.classList.add('is-headliner-only');

    var src=imageForArtist(artist);
    container.querySelectorAll(':scope > .bmc-band-photo,:scope > .headliner-note').forEach(function(el){el.remove();});
    if(src){
      var img=document.createElement('img');
      img.className='bmc-band-photo';
      img.src=src;
      img.loading='lazy';
      img.decoding='async';
      img.alt=artist+' at Balcony Music Club';
      img.onerror=function(){this.remove();};
      var h3=container.querySelector(':scope > h3');
      if(h3&&h3.nextSibling)container.insertBefore(img,h3.nextSibling);
      else container.insertBefore(img,keep);
    }
  }

  function showOnlyHeadliners(){
    document.querySelectorAll('.today-lineup,.show-day').forEach(decorateContainer);
  }

  function run(){
    installBandStyles();
    updateTextNodes(document.body);
    updateJazzyAnswers();
    showOnlyHeadliners();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',function(){
    run();
    setTimeout(run,250);
    setTimeout(run,1000);
    setTimeout(run,2000);
  });
})();