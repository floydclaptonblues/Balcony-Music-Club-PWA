(function(){
  var SCHEDULE=[
    {date:"2026-06-03",acts:[["6:00 PM","8:30 PM","TROPICAL WEATHER"],["9:00 PM","11:30 PM","FELIPE ANTIONIO MUSIC"]]},
    {date:"2026-06-04",acts:[["6:00 PM","8:30 PM","JOHN LISI & DELTA FUNK"],["9:00 PM","11:30 PM","JAM BRASS BAND"]]},
    {date:"2026-06-05",acts:[["6:00 PM","8:30 PM","COVERTONES"],["9:00 PM","11:30 PM","BIG MIKE & THE R&B KINGS"]]},
    {date:"2026-06-06",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","WOODY'S RAMPAGE"],["9:00 PM","11:30 PM","CAESAR BROTHERS"]]},
    {date:"2026-06-07",acts:[["3:00 PM","5:30 PM","SIERRA & GREEN NOTES"],["6:00 PM","8:30 PM","MAURICE CADE & ESS"],["9:00 PM","11:30 PM","KIM IN THE WIND BAND"]]},
    {date:"2026-06-10",acts:[["6:00 PM","8:30 PM","RUMPSHAKERS"],["9:00 PM","11:30 PM","Ashley Paige & The Soulcial Club"]]},
    {date:"2026-06-11",acts:[["6:00 PM","8:30 PM","DAPPER DANDIES"],["9:00 PM","11:30 PM","JAM BRASS BAND"]]},
    {date:"2026-06-12",acts:[["6:00 PM","8:30 PM","TROPICAL WEATHER"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-06-13",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","MOTHER RUCKUS"],["9:00 PM","11:30 PM","SIERRA GREEN"]]},
    {date:"2026-06-14",acts:[["3:00 PM","5:30 PM","DEEJ FLAVA & MOTHER RUCKUS"],["6:00 PM","8:30 PM","MAURICE CADE & ESS"],["9:00 PM","11:30 PM","KIM IN THE WIND BAND"]]},
    {date:"2026-06-17",acts:[["6:00 PM","8:30 PM","SUGAR & THE DADDIES"],["9:00 PM","11:30 PM","DECATUR RADIO"]]},
    {date:"2026-06-18",acts:[["6:00 PM","8:30 PM","JOHN LISI & DELTA FUNK"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-06-19",acts:[["6:00 PM","8:30 PM","JOSH BENITEZ BAND"],["9:00 PM","11:30 PM","BIG MIKE & THE R&B KINGS"]]},
    {date:"2026-06-20",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","T Marie & Bayou JuJu"],["9:00 PM","11:30 PM","MOTHER RUCKUS"]]},
    {date:"2026-06-21",acts:[["3:00 PM","5:30 PM","SIERRA & GREEN NOTES"],["6:00 PM","8:30 PM","SUGAR & THE DADDIES"],["9:00 PM","11:30 PM","JAM BRASS BAND"]]},
    {date:"2026-06-24",acts:[["6:00 PM","8:30 PM","Louisiana Parish Line"],["9:00 PM","11:30 PM","Ashley Paige & The Soulcial Club"]]},
    {date:"2026-06-25",acts:[["6:00 PM","8:30 PM","DAPPER DANDIES"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-06-26",acts:[["6:00 PM","8:30 PM","JOSH BENITEZ BAND"],["9:00 PM","11:30 PM","BIG MIKE & THE R&B KINGS"]]},
    {date:"2026-06-27",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","MOTHER RUCKUS"],["9:00 PM","11:30 PM","SIERRA GREEN"]]},
    {date:"2026-06-28",acts:[["3:00 PM","5:30 PM","DEEJ FLAVA & MOTHER RUCKUS"],["6:00 PM","8:30 PM","MAURICE CADE & ESS"],["9:00 PM","11:30 PM","KIM IN THE WIND"]]},
    {date:"2026-07-02",acts:[["6:00 PM","8:30 PM","FUNKY SOLES"],["9:00 PM","11:30 PM","MOTHER RUCKUS"]]},
    {date:"2026-07-03",acts:[["6:00 PM","8:30 PM","ADO SOUL & THE TRIBE"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-07-04",acts:[["3:00 PM","5:30 PM","TROPICAL WEATHER"],["6:00 PM","8:30 PM","JOHN LISI & DELTA FUNK"],["9:00 PM","11:30 PM","THEE FONK JAM feat. TamarieT"]]},
    {date:"2026-07-05",acts:[["3:00 PM","5:30 PM","SIERRA & GREEN NOTES"],["6:00 PM","8:30 PM","JOSH BENITEZ BAND"],["9:00 PM","11:30 PM","MAURICE CADE & ESS"]]},
    {date:"2026-07-09",acts:[["6:00 PM","8:30 PM","DAPPER DANDIES"],["9:00 PM","11:30 PM","JAM BRASS BAND"]]},
    {date:"2026-07-10",acts:[["6:00 PM","8:30 PM","ADO SOUL & THE TRIBE"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-07-11",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","WOODY'S RAMPAGE"],["9:00 PM","11:30 PM","JOHN LISI & DELTA FUNK"]]},
    {date:"2026-07-12",acts:[["3:00 PM","5:30 PM","DEEJ FLAVA & MOTHER RUCKUS"],["6:00 PM","8:30 PM","MAURICE CADE & ESS"],["9:00 PM","11:30 PM","KIM IN THE WIND"]]},
    {date:"2026-07-16",acts:[["6:00 PM","8:30 PM","LEROY MARSHALL BAND"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-07-17",acts:[["6:00 PM","8:30 PM","PARISH LINE"],["9:00 PM","11:30 PM","BIG MIKE & THE R&B KINGS"]]},
    {date:"2026-07-18",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","JON RONIGER"],["9:00 PM","11:30 PM","ASHLEY PAIGE & SOULCIAL CLUB"]]},
    {date:"2026-07-19",acts:[["3:00 PM","5:30 PM","SIERRA & GREEN NOTES"],["6:00 PM","8:30 PM","GABE STILLMAN BAND"],["9:00 PM","11:30 PM","KIM IN THE WIND"]]},
    {date:"2026-07-23",acts:[["6:00 PM","8:30 PM","DAPPER DANDIES"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-07-24",acts:[["6:00 PM","8:30 PM","MOTHER RUCKUS"],["9:00 PM","11:30 PM","BIG MIKE & THE R&B KINGS"]]},
    {date:"2026-07-25",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","SUGAR & THE DADDIES"],["9:00 PM","11:30 PM","FLEURTATIONS"]]},
    {date:"2026-07-26",acts:[["3:00 PM","5:30 PM","DEEJ FLAVA & MOTHER RUCKUS"],["6:00 PM","8:30 PM","MAURICE CADE & ESS"],["9:00 PM","11:30 PM","KIM IN THE WIND"]]},
    {date:"2026-07-30",acts:[["6:00 PM","8:30 PM","TBA"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-07-31",acts:[["6:00 PM","8:30 PM","MOTHER RUCKUS"],["9:00 PM","11:30 PM","BIG MIKE & R&B KINGS"]]}
  ];

  var BAND_BASE='assets/bands/bmc-band-assets/assets/bands/';
  var UPCOMING_ARTIST_BASE='https://floydclaptonblues.github.io/UpcomingShows/assets/artists/';
  var PHOTO_VERSION='?v=20260701-john-lisi-management';
  var JOHN_LISI_DELTA_FUNK_PHOTO='https://images.squarespace-cdn.com/content/v1/5872a05fb8a79b5c39e888e8/1570220588454-ROAJNS29CYDX7TFZ3B09/johnlisi.jpg?format=1000w';
  function uploadedPhoto(file){return UPCOMING_ARTIST_BASE+file+PHOTO_VERSION;}
  var PARISH_LINE_POSTER=uploadedPhoto('Louisiana%20Parish%20Line.png');
  var THEE_PLAYMATEZ_PHOTO=uploadedPhoto('Thee%20PlayMateZ.png');
  var BAND_IMAGES={
    'ANDRE LOVETT BAND':BAND_BASE+'andre-lovett-band.jpg?v=20260615',
    'ASHLEY PAIGE & THE SOULCIAL CLUB':uploadedPhoto('Ashley%20Paige%20and%20the%20Soulcial%20Club.jpeg'),
    'ASHLEY PAIGE & SOULCIAL CLUB':uploadedPhoto('Ashley%20Paige%20and%20the%20Soulcial%20Club.jpeg'),
    'DAPPER DANDIES':BAND_BASE+'dapper-dandies.jpg?v=20260615',
    'MAURICE CADE & ESS':uploadedPhoto('Maurice%20Cade%20%26%20ESS%20Sunday%206pm.jpg'),
    'MOTHER RUCKUS':uploadedPhoto('Mother%20Ruckus.png'),
    'DEEJ FLAVA & MOTHER RUCKUS':uploadedPhoto('Mother%20Ruckus.png'),
    'SUGAR & THE DADDIES':BAND_BASE+'sugar-and-the-daddies.jpg?v=20260615',
    "WOODY'S RAMPAGE":BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'WOODYS RAMPAGE':BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'BIG MIKE & THE R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'BIG MIKE & R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'SIERRA GREEN':BAND_BASE+'sierra-green.jpg?v=20260615',
    'SIERRA & GREEN NOTES':BAND_BASE+'sierra-green.jpg?v=20260615',
    'KIM IN THE WIND BAND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KIM IN THE WIND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KIM INDA WIND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KAT KILEY EXPERIENCE':BAND_BASE+'kat-kiley-experience.webp?v=20260615',
    'LOUISIANA PARISH LINE':PARISH_LINE_POSTER,
    'PARISH LINE':PARISH_LINE_POSTER,
    'FUNKY SOLES':uploadedPhoto('Funky%20Soles%20Featuring%20Tahj%20Derosier.png'),
    'FUNKY SOLES FEATURING TAHJ DEROSIER':uploadedPhoto('Funky%20Soles%20Featuring%20Tahj%20Derosier.png'),
    'ADO SOUL & THE TRIBE':uploadedPhoto('Ado%20Soul%20Tribe.png'),
    'ADO SOUL TRIBE':uploadedPhoto('Ado%20Soul%20Tribe.png'),
    'YUNG DEX BRASS BAND':uploadedPhoto('Yung%20Dex%20Ya%20Feel%20Me%20Brass%20Band.png'),
    'YUNG DEX YA FEEL ME BRASS BAND':uploadedPhoto('Yung%20Dex%20Ya%20Feel%20Me%20Brass%20Band.png'),
    'JOHN LISI & DELTA FUNK':JOHN_LISI_DELTA_FUNK_PHOTO,
    'JOHN LISI AND DELTA FUNK':JOHN_LISI_DELTA_FUNK_PHOTO,
    'GABE STILLMAN BAND':uploadedPhoto('Gabe%20Stillman.png'),
    'GABE STILLMAN':uploadedPhoto('Gabe%20Stillman.png'),
    'THEE PLAYMATEZ':THEE_PLAYMATEZ_PHOTO,
    'THEEPLAYMATEZ':THEE_PLAYMATEZ_PHOTO,
    'THEE FONK':THEE_PLAYMATEZ_PHOTO,
    'THEE FONK JAM':THEE_PLAYMATEZ_PHOTO,
    'THEE FONK JAM FEAT. TAMARIET':THEE_PLAYMATEZ_PHOTO,
    'THEE FONK JAM FEAT TAMARIET':THEE_PLAYMATEZ_PHOTO
  };

  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function dFromIso(s){return new Date(s+'T12:00:00');}
  function pretty(s){return dFromIso(s).toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});}
  function weekWindow(now){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);var sinceMon=(d.getDay()+6)%7;var mon=new Date(d);mon.setDate(d.getDate()-sinceMon);var wed=new Date(mon);wed.setDate(mon.getDate()+2);var sun=new Date(mon);sun.setDate(mon.getDate()+6);return {start:iso(wed),end:iso(sun)};}
  function key(name){return String(name||'').replace(/’/g,"'").replace(/\s+/g,' ').trim().toUpperCase();}
  function isPlaceholder(act){return !act||key(act[2])==='TBA'||key(act[2])==='TO BE ANNOUNCED';}
  function imgFor(name){return BAND_IMAGES[key(name)]||'';}
  function featuredIndex(day){for(var i=day.acts.length-1;i>=0;i--){if(!isPlaceholder(day.acts[i]))return i;}return day.acts.length-1;}
  function actPhoto(a){var src=a?imgFor(a[2]):'';return src?'<img class="bmc-band-photo bmc-band-photo--act" src="'+esc(src)+'" alt="'+esc(a[2])+' at Balcony Music Club" loading="lazy" decoding="async" onerror="this.remove()">':'';}
  function actsHtml(day){var featured=featuredIndex(day);return day.acts.map(function(a,i){var photo=actPhoto(a);return '<div class="act '+(i===featured?'is-featured-headliner ':'')+(photo?'has-photo':'no-photo')+'">'+photo+'<div class="act-copy"><b>'+esc(a[2])+'</b><span>'+esc(a[0])+'–'+esc(a[1])+'</span></div></div>';}).join('');}
  function dayCard(day){return '<article class="card show-day"><h3>'+pretty(day.date)+'</h3>'+actsHtml(day)+'</article>';}
  function tvStaticPlaceholder(){return '<div class="artist-day-no-photo" aria-hidden="true"><span>♪</span></div>';}
  function marqueeText(a){var label=a[2]+'  •  '+a[0]+'–'+a[1]+'  •  ';return esc(label+label+label);}
  function artistDayAct(a){var src=imgFor(a[2]);var visual=src?'<img class="artist-day-photo" src="'+esc(src)+'" alt="'+esc(a[2])+' at Balcony Music Club" loading="lazy" decoding="async" onerror="this.replaceWith((function(){var d=document.createElement(\'div\');d.className=\'artist-day-no-photo\';d.setAttribute(\'aria-hidden\',\'true\');d.innerHTML=\'<span>♪</span>\';return d;})())">':tvStaticPlaceholder();return '<article class="artist-day-act">'+visual+'<div class="artist-day-time">'+esc(a[0])+'–'+esc(a[1])+'</div><div class="artist-day-marquee" aria-label="'+esc(a[2])+'"><span>'+marqueeText(a)+'</span></div></article>';}
  function artistOfDayHtml(day){return '<h3 class="artist-day-heading">Artists of the Day</h3><div class="artist-day-strip">'+day.acts.filter(function(a){return !isPlaceholder(a);}).map(artistDayAct).join('')+'</div>';}

  function installStyle(){
    if(document.getElementById('bmc-schedule-authority-style'))return;
    var style=document.createElement('style');
    style.id='bmc-schedule-authority-style';
    style.textContent='@keyframes bmcMarquee1994{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.artist-day-heading{font-family:"Chicago","Charcoal","Geneva","MS Sans Serif",Tahoma,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-shadow:2px 2px 0 #000}.artist-day-strip{display:flex;gap:9px;align-items:stretch;margin:8px 0 4px}.artist-day-act{position:relative;flex:1 1 0;min-width:0;overflow:hidden;border:2px solid rgba(255,216,87,.68);border-radius:12px;background:linear-gradient(180deg,rgba(12,9,35,.96),rgba(0,0,0,.94));box-shadow:0 10px 24px rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,255,255,.09)}.artist-day-act:before{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(to bottom,rgba(255,255,255,.08) 0 1px,transparent 1px 4px);mix-blend-mode:screen;opacity:.32;z-index:2}.artist-day-photo,.artist-day-no-photo{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#07030f}.artist-day-no-photo{display:grid;place-items:center;color:#ffd857;font-size:32px;text-shadow:0 0 10px rgba(255,216,87,.7)}.artist-day-time{position:absolute;left:6px;top:6px;z-index:3;padding:3px 6px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:rgba(0,0,0,.68);color:#fff;font-family:"Chicago","Charcoal","Geneva","MS Sans Serif",Tahoma,sans-serif;font-size:10px;font-weight:900;letter-spacing:.04em;white-space:nowrap}.artist-day-marquee{position:relative;z-index:3;overflow:hidden;white-space:nowrap;border-top:1px solid rgba(255,255,255,.20);background:#020202;color:#8ffcff;font-family:"Chicago","Charcoal","Geneva","MS Sans Serif",Tahoma,sans-serif;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;text-shadow:1px 1px 0 #000,0 0 6px rgba(143,252,255,.55)}.artist-day-marquee span{display:inline-block;min-width:200%;padding:6px 0;animation:bmcMarquee1994 13s linear infinite}.show-day .act,.today-lineup .act{display:grid;grid-template-columns:minmax(82px,112px) 1fr;gap:10px;align-items:center}.act-copy{min-width:0}.act-copy b,.act-copy span{display:block}.bmc-band-photo{width:100%;aspect-ratio:4/3;object-fit:cover;border:2px solid rgba(255,216,87,.58);border-radius:10px;background:#120728;box-shadow:0 8px 18px rgba(0,0,0,.28)}.act .bmc-band-photo--act{margin:0;max-height:86px}.act.no-photo{grid-template-columns:1fr}.act.no-photo .act-copy{grid-column:1}.today-lineup .act{display:none}.act.is-featured-headliner{border-top:1px dashed rgba(255,255,255,.24);padding-top:8px;margin-top:8px}@media(max-width:520px){.artist-day-strip{gap:6px}.artist-day-time{font-size:8px;left:4px;top:4px}.artist-day-marquee{font-size:10px}.show-day .act{grid-template-columns:minmax(72px,96px) 1fr}.act .bmc-band-photo--act{max-height:76px}}';
    document.head.appendChild(style);
  }

  function installScheduleModal(){
    var old=document.getElementById('bmcScheduleModal');
    if(old)old.remove();
    var wrap=document.createElement('div');
    wrap.id='bmcScheduleModal';
    wrap.className='schedule-modal-backdrop';
    wrap.innerHTML='<div class="schedule-modal"><div class="schedule-modal-head"><h2>Full Band Schedule</h2><button type="button" class="button ghost schedule-modal-close">Close</button></div><div class="schedule-modal-list">'+SCHEDULE.map(dayCard).join('')+'</div></div>';
    document.body.appendChild(wrap);
  }

  function weeklySchedule(){
    var section=document.getElementById('schedule');
    if(!section)return;
    installScheduleModal();
    var now=new Date();
    var todayIso=iso(now);
    var win=weekWindow(now);
    var week=SCHEDULE.filter(function(d){return d.date>=win.start&&d.date<=win.end;});
    var today=SCHEDULE.find(function(d){return d.date===todayIso;});
    var next=week.find(function(d){return d.date>=todayIso;})||week[0];
    var todayHtml=today?artistOfDayHtml(today):'<h3>Artist of the Day</h3>'+(next?'<p>Next show: '+pretty(next.date)+'</p>':'');
    var weekHtml=week.length?week.map(dayCard).join(''):'<article class="card"><p>Lineup coming soon.</p></article>';
    section.classList.add('weekly-schedule-panel');
    section.innerHTML='<span class="ribbon">This Week\'s Lineup</span><h2>This Week\'s Lineup:</h2><div class="weekly-lineup-grid"><article class="card today-lineup">'+todayHtml+'</article><div><h3>Artists of the Week</h3><div class="week-lineup-strip">'+weekHtml+'</div></div></div><p><button id="openFullSchedule" type="button" class="button primary">Open Full Band Schedule</button></p>';
  }

  function wire(){
    if(window.__BMC_SCHEDULE_AUTHORITY_WIRED)return;
    window.__BMC_SCHEDULE_AUTHORITY_WIRED=true;
    document.addEventListener('click',function(e){
      var open=e.target.closest&&e.target.closest('#openFullSchedule');
      var close=e.target.closest&&e.target.closest('.schedule-modal-close');
      var back=e.target.classList&&e.target.classList.contains('schedule-modal-backdrop');
      if(open){e.preventDefault();var modal=document.getElementById('bmcScheduleModal');if(modal)modal.classList.add('is-open');}
      if(close||back){var modal2=document.getElementById('bmcScheduleModal');if(modal2)modal2.classList.remove('is-open');}
    });
  }

  function run(){installStyle();weeklySchedule();wire();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',function(){run();setTimeout(run,250);setTimeout(run,1000);setTimeout(run,2000);});
})();