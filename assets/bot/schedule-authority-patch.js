(function(){
  var SCHEDULE=[
    {date:'2026-07-02',acts:[['6:00 PM','8:30 PM','FUNKY SOLES'],['9:00 PM','11:30 PM','MOTHER RUCKUS']]},
    {date:'2026-07-03',acts:[['6:00 PM','8:30 PM','ADO SOUL & THE TRIBE'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-07-04',acts:[['3:00 PM','5:30 PM','TROPICAL WEATHER'],['6:00 PM','8:30 PM','JOHN LISI & DELTA FUNK'],['9:00 PM','11:30 PM','THEE FONK JAM feat. TamarieT']]},
    {date:'2026-07-05',acts:[['3:00 PM','5:30 PM','SIERRA & GREEN NOTES'],['6:00 PM','8:30 PM','JOSH BENITEZ BAND'],['9:00 PM','11:30 PM','MAURICE CADE & ESS']]},
    {date:'2026-07-09',acts:[['6:00 PM','8:30 PM','DAPPER DANDIES'],['9:00 PM','11:30 PM','JAM BRASS BAND']]},
    {date:'2026-07-10',acts:[['6:00 PM','8:30 PM','ADO SOUL & THE TRIBE'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-07-11',acts:[['3:00 PM','5:30 PM','ANDRE LOVETT BAND'],['6:00 PM','8:30 PM',"WOODY'S RAMPAGE"],['9:00 PM','11:30 PM','JOHN LISI & DELTA FUNK']]},
    {date:'2026-07-12',acts:[['3:00 PM','5:30 PM','DEEJ FLAVA & MOTHER RUCKUS'],['6:00 PM','8:30 PM','MAURICE CADE & ESS'],['9:00 PM','11:30 PM','KIM IN THE WIND']]},
    {date:'2026-07-16',acts:[['6:00 PM','8:30 PM','LEROY MARSHALL BAND'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-07-17',acts:[['6:00 PM','8:30 PM','PARISH LINE'],['9:00 PM','11:30 PM','BIG MIKE & THE R&B KINGS']]},
    {date:'2026-07-18',acts:[['3:00 PM','5:30 PM','ANDRE LOVETT BAND'],['6:00 PM','8:30 PM','JON RONIGER'],['9:00 PM','11:30 PM','ASHLEY PAIGE & SOULCIAL CLUB']]},
    {date:'2026-07-19',acts:[['3:00 PM','5:30 PM','SIERRA & GREEN NOTES'],['6:00 PM','8:30 PM','GABE STILLMAN BAND'],['9:00 PM','11:30 PM','KIM IN THE WIND']]},
    {date:'2026-07-23',acts:[['6:00 PM','8:30 PM','DAPPER DANDIES'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-07-24',acts:[['6:00 PM','8:30 PM','MOTHER RUCKUS'],['9:00 PM','11:30 PM','BIG MIKE & THE R&B KINGS']]},
    {date:'2026-07-25',acts:[['3:00 PM','5:30 PM','ANDRE LOVETT BAND'],['6:00 PM','8:30 PM','SUGAR & THE DADDIES'],['9:00 PM','11:30 PM','FLEURTATIONS']]},
    {date:'2026-07-26',acts:[['3:00 PM','5:30 PM','DEEJ FLAVA & MOTHER RUCKUS'],['6:00 PM','8:30 PM','MAURICE CADE & ESS'],['9:00 PM','11:30 PM','KIM IN THE WIND']]},
    {date:'2026-07-30',acts:[['6:00 PM','8:30 PM','TBA'],['9:00 PM','11:30 PM','KAT KILEY EXPERIENCE']]},
    {date:'2026-07-31',acts:[['6:00 PM','8:30 PM','MOTHER RUCKUS'],['9:00 PM','11:30 PM','BIG MIKE & R&B KINGS']]}
  ];

  var BAND_BASE='assets/bands/bmc-band-assets/assets/bands/';
  var UPCOMING='https://floydclaptonblues.github.io/UpcomingShows/assets/artists/';
  var PHOTO_VERSION='?v=20260704-clean-mobile';
  function uploaded(file){return UPCOMING+file+PHOTO_VERSION;}
  var IMAGES={
    'ANDRE LOVETT BAND':BAND_BASE+'andre-lovett-band.jpg?v=20260615',
    'DAPPER DANDIES':BAND_BASE+'dapper-dandies.jpg?v=20260615',
    'SUGAR & THE DADDIES':BAND_BASE+'sugar-and-the-daddies.jpg?v=20260615',
    "WOODY'S RAMPAGE":BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'WOODYS RAMPAGE':BAND_BASE+'woodys-rampage.jpg?v=20260615',
    'BIG MIKE & THE R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'BIG MIKE & R&B KINGS':BAND_BASE+'big-mike-rb-kings.webp?v=20260615',
    'SIERRA GREEN':BAND_BASE+'sierra-green.jpg?v=20260615',
    'SIERRA & GREEN NOTES':BAND_BASE+'sierra-green.jpg?v=20260615',
    'KIM IN THE WIND':BAND_BASE+'kim-in-the-wind.webp?v=20260615',
    'KAT KILEY EXPERIENCE':BAND_BASE+'kat-kiley-experience.webp?v=20260615',
    'MAURICE CADE & ESS':uploaded('Maurice%20Cade%20%26%20ESS%20Sunday%206pm.jpg'),
    'MOTHER RUCKUS':uploaded('Mother%20Ruckus.png'),
    'DEEJ FLAVA & MOTHER RUCKUS':uploaded('Mother%20Ruckus.png'),
    'FUNKY SOLES':uploaded('Funky%20Soles%20Featuring%20Tahj%20Derosier.png'),
    'ADO SOUL & THE TRIBE':uploaded('Ado%20Soul%20Tribe.png'),
    'ADO SOUL TRIBE':uploaded('Ado%20Soul%20Tribe.png'),
    'GABE STILLMAN BAND':uploaded('Gabe%20Stillman.png'),
    'GABE STILLMAN':uploaded('Gabe%20Stillman.png'),
    'PARISH LINE':uploaded('Louisiana%20Parish%20Line.png'),
    'LOUISIANA PARISH LINE':uploaded('Louisiana%20Parish%20Line.png'),
    'THEE FONK JAM':uploaded('Thee%20PlayMateZ.png'),
    'THEE FONK JAM FEAT. TAMARIET':uploaded('Thee%20PlayMateZ.png'),
    'THEE FONK JAM FEAT TAMARIET':uploaded('Thee%20PlayMateZ.png'),
    'JOHN LISI & DELTA FUNK':'https://images.squarespace-cdn.com/content/v1/5872a05fb8a79b5c39e888e8/1570220588454-ROAJNS29CYDX7TFZ3B09/johnlisi.jpg?format=1000w'
  };

  function esc(value){return String(value||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function key(value){return String(value||'').replace(/’/g,"'").replace(/\s+/g,' ').trim().toUpperCase();}
  function imgFor(name){return IMAGES[key(name)]||'';}
  function dFromIso(date){return new Date(date+'T12:00:00');}
  function iso(date){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');}
  function pretty(date){return dFromIso(date).toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});}
  function isPlaceholder(act){return !act||key(act[2])==='TBA'||key(act[2])==='TO BE ANNOUNCED';}
  function venueToday(){var now=new Date();var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(now);var obj={};parts.forEach(function(p){obj[p.type]=p.value;});return new Date(Number(obj.year),Number(obj.month)-1,Number(obj.day),12);}
  function weekWindow(now){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);var sinceMon=(d.getDay()+6)%7;var mon=new Date(d);mon.setDate(d.getDate()-sinceMon);var wed=new Date(mon);wed.setDate(mon.getDate()+2);var sun=new Date(mon);sun.setDate(mon.getDate()+6);return {start:iso(wed),end:iso(sun)};}
  function scheduleForWeek(){var w=weekWindow(venueToday());var days=SCHEDULE.filter(function(day){return day.date>=w.start&&day.date<=w.end;});return days.length?days:SCHEDULE.filter(function(day){return day.date>=iso(venueToday());}).slice(0,4);}
  function todayOrFocus(days){var today=iso(venueToday());return days.find(function(day){return day.date===today;})||days[0]||SCHEDULE[0];}
  function photoHtml(act,kind){var src=imgFor(act[2]);if(!src)return '<div class="'+kind+' no-photo" aria-hidden="true"><span>♪</span></div>';return '<img class="'+kind+'" src="'+esc(src)+'" alt="'+esc(act[2])+' at Balcony Music Club" loading="lazy" decoding="async" onerror="this.replaceWith((function(){var d=document.createElement(\'div\');d.className=\''+kind+' no-photo\';d.setAttribute(\'aria-hidden\',\'true\');d.innerHTML=\'<span>♪</span>\';return d;})())">';}
  function artistCard(act){return '<article class="bmc-aod-card">'+photoHtml(act,'bmc-aod-photo')+'<div class="bmc-aod-copy"><span class="bmc-aod-time">'+esc(act[0])+'–'+esc(act[1])+'</span><strong>'+esc(act[2])+'</strong></div></article>';}
  function actRow(act){return '<div class="bmc-week-act">'+photoHtml(act,'bmc-week-photo')+'<div class="bmc-week-copy"><strong>'+esc(act[2])+'</strong><span>'+esc(act[0])+'–'+esc(act[1])+'</span></div></div>';}
  function dayCard(day){return '<article class="card show-day bmc-week-day"><h3>'+pretty(day.date)+'</h3>'+day.acts.map(actRow).join('')+'</article>';}
  function fullScheduleHtml(){return '<div class="bmc-full-schedule-grid">'+SCHEDULE.map(dayCard).join('')+'</div>';}

  function installStyle(){
    var old=document.getElementById('bmc-schedule-authority-style');
    if(old)old.parentNode.removeChild(old);
    var style=document.createElement('style');
    style.id='bmc-schedule-authority-style';
    style.textContent='\
      #schedule,#schedule *{box-sizing:border-box}\
      #schedule{max-width:100%;overflow:hidden}\
      #schedule .schedule-list{display:block;width:100%;max-width:100%;overflow:hidden}\
      .bmc-aod-heading{font-family:Chicago,Charcoal,Geneva,"MS Sans Serif",Tahoma,sans-serif;text-transform:uppercase;letter-spacing:.08em;text-shadow:2px 2px 0 #000;margin:0 0 12px;color:#fff6e8}\
      .bmc-aod-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;width:100%;max-width:100%;margin:0 0 14px;overflow:hidden}\
      .bmc-aod-card{display:grid;grid-template-columns:96px minmax(0,1fr);align-items:center;min-width:0;overflow:hidden;border:2px solid rgba(255,216,87,.68);border-radius:12px;background:linear-gradient(180deg,rgba(12,9,35,.96),rgba(0,0,0,.94));box-shadow:0 10px 24px rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,255,255,.09)}\
      .bmc-aod-photo{display:block;width:96px;height:80px;object-fit:cover;background:#07030f}\
      .bmc-aod-photo.no-photo{display:grid;place-items:center;color:#ffd857;font-size:24px}\
      .bmc-aod-copy{min-width:0;padding:8px 10px;overflow:hidden}\
      .bmc-aod-time{display:inline-block;max-width:100%;padding:3px 7px;margin:0 0 6px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:rgba(0,0,0,.65);font-size:10px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
      .bmc-aod-copy strong{display:block;color:#fff6e8;font-size:14px;line-height:1.12;text-transform:uppercase;overflow-wrap:anywhere}\
      .bmc-week-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;width:100%;max-width:100%;overflow:hidden}\
      .bmc-week-day{min-width:0;max-width:100%;overflow:hidden}\
      .bmc-week-day h3{margin:0 0 8px}\
      .bmc-week-act{display:grid;grid-template-columns:72px minmax(0,1fr);gap:10px;align-items:center;width:100%;max-width:100%;min-width:0;padding:8px 0;border-top:1px dashed rgba(255,255,255,.24);overflow:hidden}\
      .bmc-week-photo{display:block;width:72px;height:56px;object-fit:cover;border-radius:8px;background:#07030f}\
      .bmc-week-photo.no-photo{display:grid;place-items:center;color:#ffd857;font-size:20px}\
      .bmc-week-copy{min-width:0;overflow:hidden}\
      .bmc-week-copy strong{display:block;color:#fff6e8;font-size:13px;line-height:1.16;text-transform:uppercase;overflow-wrap:anywhere}\
      .bmc-week-copy span{display:block;color:#5ee6ff;font-size:11px;margin-top:3px}\
      .bmc-full-schedule-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;max-height:min(70vh,720px);overflow:auto;padding:4px}\
      .bmc-full-schedule-button{margin:14px 0 0}\
      @media(max-width:760px){\
        html,body{max-width:100vw!important;overflow-x:hidden!important}\
        main,#schedule,#schedule.panel,#schedule .schedule-list,#schedule .card{width:100%!important;max-width:100%!important;min-width:0!important;overflow:hidden!important}\
        #schedule{padding-left:10px!important;padding-right:10px!important}\
        #schedule h2{font-size:clamp(34px,12vw,52px)!important;line-height:.92!important;margin-bottom:12px!important}\
        .bmc-aod-heading{font-size:clamp(18px,6vw,26px)!important;margin-bottom:10px!important}\
        .bmc-aod-grid{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;width:100%!important;max-width:100%!important;overflow:hidden!important}\
        .bmc-aod-card{grid-template-columns:58px minmax(0,1fr)!important;width:100%!important;max-width:100%!important;min-height:58px!important;max-height:76px!important}\
        .bmc-aod-photo{width:58px!important;height:58px!important;min-width:58px!important;max-width:58px!important;min-height:58px!important;max-height:58px!important;aspect-ratio:auto!important}\
        .bmc-aod-copy{padding:6px 8px!important}\
        .bmc-aod-time{font-size:8.5px!important;padding:3px 6px!important;margin-bottom:4px!important}\
        .bmc-aod-copy strong{font-size:11px!important;line-height:1.12!important}\
        .bmc-week-grid{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;width:100%!important;max-width:100%!important;overflow:hidden!important}\
        .bmc-week-day{padding:12px!important;margin:0!important;border-left-width:4px!important}\
        .bmc-week-day h3{font-size:18px!important;line-height:1.05!important}\
        .bmc-week-act{grid-template-columns:48px minmax(0,1fr)!important;gap:8px!important;padding:7px 0!important}\
        .bmc-week-photo{width:48px!important;height:40px!important;min-width:48px!important;max-width:48px!important;max-height:40px!important}\
        .bmc-week-copy strong{font-size:11px!important;line-height:1.12!important}\
        .bmc-week-copy span{font-size:9.5px!important}\
      }\
      @media(max-width:420px){\
        #schedule{padding-left:8px!important;padding-right:8px!important}\
        .bmc-aod-card{grid-template-columns:48px minmax(0,1fr)!important;min-height:48px!important;max-height:66px!important}\
        .bmc-aod-photo{width:48px!important;height:48px!important;min-width:48px!important;max-width:48px!important;min-height:48px!important;max-height:48px!important}\
        .bmc-aod-copy strong{font-size:10px!important}\
        .bmc-aod-time{font-size:8px!important}\
      }';
    document.head.appendChild(style);
  }

  function ensureModal(){
    if(document.getElementById('bmcFullScheduleModal'))return;
    var modal=document.createElement('div');
    modal.id='bmcFullScheduleModal';
    modal.className='modal';
    modal.hidden=true;
    modal.innerHTML='<div class="modal-card"><button class="modal-close button ghost" type="button" aria-label="Close full band schedule">Close</button><h2>Full Band Schedule</h2>'+fullScheduleHtml()+'</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',function(e){if(e.target===modal||e.target.classList.contains('modal-close'))modal.hidden=true;});
  }

  function render(){
    installStyle();
    var list=document.getElementById('scheduleList');
    if(!list)return;
    var days=scheduleForWeek();
    var focus=todayOrFocus(days);
    var focusActs=(focus.acts||[]).filter(function(act){return !isPlaceholder(act);});
    list.innerHTML='<h3 class="bmc-aod-heading">Artists of the Day</h3><div class="bmc-aod-grid">'+focusActs.map(artistCard).join('')+'</div><div class="bmc-week-grid">'+days.map(dayCard).join('')+'</div><p class="bmc-full-schedule-button"><button class="button primary" type="button" id="bmcOpenFullSchedule">Open Full Band Schedule</button></p>';
    ensureModal();
    var btn=document.getElementById('bmcOpenFullSchedule');
    if(btn)btn.onclick=function(){var modal=document.getElementById('bmcFullScheduleModal');if(modal)modal.hidden=false;};
    var ribbon=document.querySelector('#schedule .ribbon');
    if(ribbon)ribbon.textContent='July 2026 live music';
    var note=document.querySelector('#schedule .note');
    if(note)note.textContent='July schedule is loaded from the approved BMC schedule snapshot.';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
  window.addEventListener('load',render);
})();