(function(){
  var SCHEDULE=[
    {date:'2026-06-03',acts:[['6:00 PM','8:30 PM','TROPICAL WEATHER'],['9:00 PM','11:30 PM','FELIPE ANTIONIO MUSIC']]},
    {date:'2026-06-04',acts:[['6:00 PM','8:30 PM','JOHN LISI & DELTA FUNK'],['9:00 PM','11:30 PM','JAM BRASS BAND']]},
    {date:'2026-06-05',acts:[['6:00 PM','8:30 PM','COVERTONES'],['9:00 PM','11:30 PM','BIG MIKE & THE R&B KINGS']]},
    {date:'2026-06-06',acts:[['3:00 PM','5:30 PM','ANDRE LOVETT BAND'],['6:00 PM','8:30 PM',"WOODY'S RAMPAGE"],['9:00 PM','11:30 PM','CAESAR BROTHERS']]},
    {date:'2026-06-07',acts:[['3:00 PM','5:30 PM','SIERRA & GREEN NOTES'],['6:00 PM','8:30 PM','MAURICE CADE & ESS'],['9:00 PM','11:30 PM','KIM IN THE WIND BAND']]},
    {date:'2026-06-10',acts:[['6:00 PM','8:30 PM','RUMPSHAKERS'],['9:00 PM','11:30 PM','Ashley Paige & The Soulcial Club']]},
    {date:'2026-06-11',acts:[['6:00 PM','8:30 PM','DAPPER DANDIES'],['9:00 PM','11:30 PM','JAM BRASS BAND']]},
    {date:'2026-06-12',acts:[['6:00 PM','8:30 PM','TROPICAL WEATHER'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-06-13',acts:[['3:00 PM','5:30 PM','ANDRE LOVETT BAND'],['6:00 PM','8:30 PM','MOTHER RUCKUS'],['9:00 PM','11:30 PM','SIERRA GREEN']]},
    {date:'2026-06-14',acts:[['3:00 PM','5:30 PM','DEEJ FLAVA & MOTHER RUCKUS'],['6:00 PM','8:30 PM','MAURICE CADE & ESS'],['9:00 PM','11:30 PM','KIM IN THE WIND BAND']]},
    {date:'2026-06-17',acts:[['6:00 PM','8:30 PM','SUGAR & THE DADDIES'],['9:00 PM','11:30 PM','DECATUR RADIO']]},
    {date:'2026-06-18',acts:[['6:00 PM','8:30 PM','JOHN LISI & DELTA FUNK'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-06-19',acts:[['6:00 PM','8:30 PM','JOSH BENITEZ BAND'],['9:00 PM','11:30 PM','BIG MIKE & THE R&B KINGS']]},
    {date:'2026-06-20',acts:[['3:00 PM','5:30 PM','ANDRE LOVETT BAND'],['6:00 PM','8:30 PM','T MARIE'],['9:00 PM','11:30 PM','MOTHER RUCKUS']]},
    {date:'2026-06-21',acts:[['3:00 PM','5:30 PM','SIERRA & GREEN NOTES'],['6:00 PM','8:30 PM','SUGAR & THE DADDIES'],['9:00 PM','11:30 PM','JAM BRASS BAND']]},
    {date:'2026-06-24',acts:[['6:00 PM','8:30 PM','RUMPSHAKERS'],['9:00 PM','11:30 PM','Ashley Paige & The Soulcial Club']]},
    {date:'2026-06-25',acts:[['6:00 PM','8:30 PM','DAPPER DANDIES'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-06-26',acts:[['6:00 PM','8:30 PM','JOSH BENITEZ BAND'],['9:00 PM','11:30 PM','BIG MIKE & THE R&B KINGS']]},
    {date:'2026-06-27',acts:[['3:00 PM','5:30 PM','ANDRE LOVETT BAND'],['6:00 PM','8:30 PM','MOTHER RUCKUS'],['9:00 PM','11:30 PM','SIERRA GREEN']]},
    {date:'2026-06-28',acts:[['3:00 PM','5:30 PM','DEEJ FLAVA & MOTHER RUCKUS'],['6:00 PM','8:30 PM','MAURICE CADE & ESS'],['9:00 PM','11:30 PM','KIM IN THE WIND BAND']]}
  ];

  var BAND_BASE='assets/bands/bmc-band-assets/assets/bands/';
  var BAND_IMAGES={
    'ANDRE LOVETT BAND':BAND_BASE+'andre-lovett-band.jpg?v=20260615',
    'ASHLEY PAIGE & THE SOULCIAL CLUB':BAND_BASE+'ashley-paige-soulcial-club.jpg?v=20260615',
    'DAPPER DANDIES':BAND_BASE+'dapper-dandies.jpg?v=20260615',
    'MAURICE CADE & ESS':BAND_BASE+'maurice-cade-ess.jpg?v=20260615',
    'MOTHER RUCKUS':BAND_BASE+'mother-ruckus.jpg?v=20260615',
    'SUGAR & THE DADDIES':BAND_BASE+'sugar-and-the-daddies.jpg?v=20260615',
    "WOODY'S RAMPAGE":BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'WOODYS RAMPAGE':BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'BIG MIKE & THE R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'SIERRA GREEN':BAND_BASE+'sierra-green.jpg?v=20260615',
    'SIERRA & GREEN NOTES':BAND_BASE+'sierra-green.jpg?v=20260615',
    'KIM IN THE WIND BAND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KAT KILEY EXPERIENCE':BAND_BASE+'kat-kiley-experience.webp?v=20260615'
  };

  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function dFromIso(s){return new Date(s+'T12:00:00');}
  function pretty(s){return dFromIso(s).toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});}
  function weekWindow(now){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);var sinceMon=(d.getDay()+6)%7;var mon=new Date(d);mon.setDate(d.getDate()-sinceMon);var wed=new Date(mon);wed.setDate(mon.getDate()+2);var sun=new Date(mon);sun.setDate(mon.getDate()+6);return {start:iso(wed),end:iso(sun)};}
  function key(name){return String(name||'').replace(/’/g,"'").replace(/\s+/g,' ').trim().toUpperCase();}
  function imgFor(name){return BAND_IMAGES[key(name)]||'';}
  function headlinerPhoto(day){var act=day.acts[day.acts.length-1];var src=act?imgFor(act[2]):'';return src?'<img class="bmc-band-photo" src="'+esc(src)+'" alt="'+esc(act[2])+' at Balcony Music Club" loading="lazy" decoding="async" onerror="this.remove()">':'';}
  function actsHtml(day){return day.acts.map(function(a,i){return '<div class="act '+(i===day.acts.length-1?'is-featured-headliner':'')+'"><b>'+esc(a[2])+'</b><span>'+esc(a[0])+'–'+esc(a[1])+'</span></div>';}).join('');}
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