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
    {date:"2026-07-04",acts:[["3:00 PM","5:30 PM","TROPICAL WEATHER"],["6:00 PM","8:30 PM","YUNG DEX BRASS BAND"],["9:00 PM","11:30 PM","THEE FONK JAM feat. TamarieT"]]},
    {date:"2026-07-05",acts:[["3:00 PM","5:30 PM","SIERRA & GREEN NOTES"],["6:00 PM","8:30 PM","JOSH BENITEZ BAND"],["9:00 PM","11:30 PM","MAURICE CADE & ESS"]]},
    {date:"2026-07-09",acts:[["6:00 PM","8:30 PM","DAPPER DANDIES"],["9:00 PM","11:30 PM","JAM BRASS BAND"]]},
    {date:"2026-07-10",acts:[["6:00 PM","8:30 PM","ADO SOUL & THE TRIBE"],["9:00 PM","11:30 PM","KAT KILEY EXPERIENCE"]]},
    {date:"2026-07-11",acts:[["3:00 PM","5:30 PM","ANDRE LOVETT BAND"],["6:00 PM","8:30 PM","WOODY'S RAMPAGE"],["9:00 PM","11:30 PM","TBA"]]},
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
  var BAND_IMAGES={
    'ANDRE LOVETT BAND':BAND_BASE+'andre-lovett-band.jpg?v=20260615',
    'ASHLEY PAIGE & THE SOULCIAL CLUB':BAND_BASE+'ashley-paige-soulcial-club.jpg?v=20260615',
    'ASHLEY PAIGE & SOULCIAL CLUB':BAND_BASE+'ashley-paige-soulcial-club.jpg?v=20260615',
    'DAPPER DANDIES':BAND_BASE+'dapper-dandies.jpg?v=20260615',
    'MAURICE CADE & ESS':BAND_BASE+'maurice-cade-ess.jpg?v=20260615',
    'MOTHER RUCKUS':BAND_BASE+'mother-ruckus.jpg?v=20260615',
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
    'LOUISIANA PARISH LINE':BAND_BASE+'14FA40D0-F6EC-48BB-9A69-08C469C16B73.PNG?v=20260624',
    'PARISH LINE':BAND_BASE+'14FA40D0-F6EC-48BB-9A69-08C469C16B73.PNG?v=20260624'
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
  function photoAct(day){if(day&&day.date==='2026-06-24'){var lpl=day.acts.find(function(a){return key(a[2])==='LOUISIANA PARISH LINE';});if(lpl)return lpl;}var idx=featuredIndex(day);return day.acts[idx];}
  function headlinerPhoto(day){var act=photoAct(day);var src=act?imgFor(act[2]):'';return src?'<img class="bmc-band-photo" src="'+esc(src)+'" alt="'+esc(act[2])+' at Balcony Music Club" loading="lazy" decoding="async" onerror="this.remove()">':'';}
  function actsHtml(day){var featured=featuredIndex(day);return day.acts.map(function(a,i){return '<div class="act '+(i===featured?'is-featured-headliner':'')+'"><b>'+esc(a[2])+'</b><span>'+esc(a[0])+'–'+esc(a[1])+'</span></div>';}).join('');}
  function dayCard(day){return '<article class="card show-day"><h3>'+pretty(day.date)+'</h3>'+headlinerPhoto(day)+actsHtml(day)+'</article>';}

  function installStyle(){
    if(document.getElementById('bmc-schedule-authority-style'))return;
    var style=document.createElement('style');
    style.id='bmc-schedule-authority-style';
    style.textContent='.bmc-band-photo{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border:2px solid rgba(255,216,87,.58);border-radius:14px;margin:8px 0 10px;background:#120728;box-shadow:0 12px 28px rgba(0,0,0,.32)}.show-day .bmc-band-photo{max-height:220px}.today-lineup .bmc-band-photo{margin-top:10px}.act.is-featured-headliner{border-top:1px dashed rgba(255,255,255,.24);padding-top:8px;margin-top:8px}';
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
    var todayHtml=today?'<h3>Artist of the Day</h3>'+headlinerPhoto(today)+actsHtml(today):'<h3>Artist of the Day</h3>'+(next?'<p>Next show: '+pretty(next.date)+'</p>':'');
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
