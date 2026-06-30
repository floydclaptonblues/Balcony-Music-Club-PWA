(function(){
  var ARTIST='Ashley Paige & The Soulcial Club';
  var BAND_BASE='assets/bands/bmc-band-assets/assets/bands/';
  var UPCOMING_ARTIST_BASE='https://floydclaptonblues.github.io/UpcomingShows/assets/artists/';
  var PHOTO_VERSION='?v=20260630-photo-match';
  function uploadedPhoto(file){return UPCOMING_ARTIST_BASE+file+PHOTO_VERSION;}
  var BAND_IMAGES={
    'ANDRE LOVETT BAND':BAND_BASE+'andre-lovett-band.jpg?v=20260615',
    'ASHLEY PAIGE & THE SOULCIAL CLUB':uploadedPhoto('Ashley%20Paige%20and%20the%20Soulcial%20Club.jpeg'),
    'ASHLEY PAIGE & SOULCIAL CLUB':uploadedPhoto('Ashley%20Paige%20and%20the%20Soulcial%20Club.jpeg'),
    'DAPPER DANDIES':BAND_BASE+'dapper-dandies.jpg?v=20260615',
    'MAURICE CADE & ESS':uploadedPhoto('Maurice%20Cade%20%26%20ESS%20Sunday%206pm.jpg'),
    'MOTHER RUCKUS':uploadedPhoto('Mother%20Ruckus.png'),
    'DEEJ FLAVA & MOTHER RUCKUS':uploadedPhoto('Mother%20Ruckus.png'),
    'SUGAR & THE DADDIES':BAND_BASE+'sugar-and-the-daddies.jpg?v=20260615',
    'WOODYS RAMPAGE':BAND_BASE+'woodys-rampage.jpg?v=20260615',
    "WOODY'S RAMPAGE":BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'BIG MIKE & THE R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'BIG MIKE & R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'SIERRA GREEN':BAND_BASE+'sierra-green.jpg?v=20260615',
    'SIERRA & GREEN NOTES':BAND_BASE+'sierra-green.jpg?v=20260615',
    'KIM IN THE WIND BAND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KIM IN THE WIND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KAT KILEY EXPERIENCE':BAND_BASE+'kat-kiley-experience.webp?v=20260615',
    'LOUISIANA PARISH LINE':uploadedPhoto('Louisiana%20Parish%20Line.png'),
    'PARISH LINE':uploadedPhoto('Louisiana%20Parish%20Line.png'),
    'FUNKY SOLES':uploadedPhoto('Funky%20Soles%20Featuring%20Tahj%20Derosier.png'),
    'FUNKY SOLES FEATURING TAHJ DEROSIER':uploadedPhoto('Funky%20Soles%20Featuring%20Tahj%20Derosier.png'),
    'ADO SOUL & THE TRIBE':uploadedPhoto('Ado%20Soul%20Tribe.png'),
    'ADO SOUL TRIBE':uploadedPhoto('Ado%20Soul%20Tribe.png'),
    'YUNG DEX BRASS BAND':uploadedPhoto('Yung%20Dex%20Ya%20Feel%20Me%20Brass%20Band.png'),
    'GABE STILLMAN BAND':uploadedPhoto('Gabe%20Stillman.png'),
    'GABE STILLMAN':uploadedPhoto('Gabe%20Stillman.png'),
    'THEE PLAYMATEZ':uploadedPhoto('Thee%20PlayMateZ.png')
  };

  function normalize(s){
    return String(s||'')
      .replace(/UNDER THE COVERS/g,ARTIST)
      .replace(/UNDER COVERS/g,ARTIST)
      .replace(/KIM INDA WIND BAND/g,'KIM IN THE WIND BAND')
      .replace(/Kim Inda Wind Band/g,'Kim In The Wind Band')
      .replace(/’/g,"'")
      .replace(/\s+/g,' ')
      .trim()
      .toUpperCase();
  }

  function cleanArtistName(s){
    return String(s||'')
      .replace(/UNDER THE COVERS/g,ARTIST)
      .replace(/UNDER COVERS/g,ARTIST)
      .replace(/KIM INDA WIND BAND/g,'KIM IN THE WIND BAND')
      .replace(/Kim Inda Wind Band/g,'Kim In The Wind Band');
  }

  function updateTextNodes(root){
    if(!root||!document.createTreeWalker)return;
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
    var node;
    while((node=walker.nextNode())){
      node.nodeValue=cleanArtistName(node.nodeValue);
    }
  }

  function updateJazzyAnswers(){
    if(window.BMC_JAZZYCAT&&Array.isArray(window.BMC_JAZZYCAT.answers)){
      window.BMC_JAZZYCAT.answers.forEach(function(item){
        if(item&&typeof item.answer==='string')item.answer=cleanArtistName(item.answer);
      });
    }
  }

  function installBandStyles(){
    if(document.getElementById('bmc-headliner-band-style'))return;
    var style=document.createElement('style');
    style.id='bmc-headliner-band-style';
    style.textContent='.bmc-band-photo{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border:2px solid rgba(255,216,87,.58);border-radius:14px;margin:8px 0 10px;background:#120728;box-shadow:0 12px 28px rgba(0,0,0,.32)}.today-lineup .bmc-band-photo{margin-top:10px}.show-day .bmc-band-photo{max-height:220px}.act.is-featured-headliner{border-top:1px dashed rgba(255,255,255,.24);padding-top:8px;margin-top:8px}.headliner-note{display:inline-flex;margin:0 0 5px;padding:3px 7px;border:1px solid rgba(255,216,87,.38);border-radius:999px;color:var(--gold);font-size:10px;letter-spacing:.05em;text-transform:uppercase;background:rgba(0,0,0,.2)}';
    document.head.appendChild(style);
  }

  function imageForArtist(artist){return BAND_IMAGES[normalize(artist)]||'';}

  function decorateContainer(container){
    if(!container)return;
    var acts=[].slice.call(container.querySelectorAll(':scope > .act'));
    if(!acts.length)return;

    acts.forEach(function(act){
      var nameEl=act.querySelector('b');
      if(nameEl)nameEl.textContent=cleanArtistName(nameEl.textContent);
      act.classList.remove('is-headliner-only','is-featured-headliner');
      act.querySelectorAll('.bmc-band-photo,.headliner-note').forEach(function(el){el.remove();});
    });

    var headliner=acts[acts.length-1];
    var headlinerNameEl=headliner.querySelector('b');
    var artist=headlinerNameEl?headlinerNameEl.textContent:'';
    headliner.classList.add('is-featured-headliner');

    var src=imageForArtist(artist);
    if(src){
      var img=document.createElement('img');
      img.className='bmc-band-photo';
      img.src=src;
      img.loading='lazy';
      img.decoding='async';
      img.alt=artist+' at Balcony Music Club';
      img.onerror=function(){this.remove();};
      headliner.insertBefore(img,headliner.firstChild);
    }
  }

  function decorateSchedule(){document.querySelectorAll('.today-lineup,.show-day').forEach(decorateContainer);}

  function run(){installBandStyles();updateTextNodes(document.body);updateJazzyAnswers();decorateSchedule();}

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',function(){run();setTimeout(run,250);setTimeout(run,1000);setTimeout(run,2000);});
})();