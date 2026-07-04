(function(){
  var SCHEDULE=[
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

  var BAND_BASE="assets/bands/bmc-band-assets/assets/bands/";
  var UP="https://floydclaptonblues.github.io/UpcomingShows/assets/artists/";
  var V="?v=20260704-mobile-safe";
  function up(file){return UP+file+V;}
  var IMAGES={
    "ANDRE LOVETT BAND":BAND_BASE+"andre-lovett-band.jpg?v=20260615",
    "DAPPER DANDIES":BAND_BASE+"dapper-dandies.jpg?v=20260615",
    "SUGAR & THE DADDIES":BAND_BASE+"sugar-and-the-daddies.jpg?v=20260615",
    "WOODY'S RAMPAGE":BAND_BASE+"woodys-rampage.jpg?v=20260615",
    "WOODYS RAMPAGE":BAND_BASE+"woodys-rampage.jpg?v=20260615",
    "BIG MIKE & THE R&B KINGS":BAND_BASE+"big-mike-rb-kings.webp?v=20260615",
    "BIG MIKE & R&B KINGS":BAND_BASE+"big-mike-rb-kings.webp?v=20260615",
    "SIERRA GREEN":BAND_BASE+"sierra-green.jpg?v=20260615",
    "SIERRA & GREEN NOTES":BAND_BASE+"sierra-green.jpg?v=20260615",
    "KIM IN THE WIND":BAND_BASE+"kim-in-the-wind.webp?v=20260615",
    "KAT KILEY EXPERIENCE":BAND_BASE+"kat-kiley-experience.webp?v=20260615",
    "MAURICE CADE & ESS":up("Maurice%20Cade%20%26%20ESS%20Sunday%206pm.jpg"),
    "MOTHER RUCKUS":up("Mother%20Ruckus.png"),
    "DEEJ FLAVA & MOTHER RUCKUS":up("Mother%20Ruckus.png"),
    "FUNKY SOLES":up("Funky%20Soles%20Featuring%20Tahj%20Derosier.png"),
    "ADO SOUL & THE TRIBE":up("Ado%20Soul%20Tribe.png"),
    "ADO SOUL TRIBE":up("Ado%20Soul%20Tribe.png"),
    "GABE STILLMAN BAND":up("Gabe%20Stillman.png"),
    "GABE STILLMAN":up("Gabe%20Stillman.png"),
    "PARISH LINE":up("Louisiana%20Parish%20Line.png"),
    "LOUISIANA PARISH LINE":up("Louisiana%20Parish%20Line.png"),
    "THEE FONK JAM":up("Thee%20PlayMateZ.png"),
    "THEE FONK JAM FEAT. TAMARIET":up("Thee%20PlayMateZ.png"),
    "THEE FONK JAM FEAT TAMARIET":up("Thee%20PlayMateZ.png"),
    "JOHN LISI & DELTA FUNK":"https://images.squarespace-cdn.com/content/v1/5872a05fb8a79b5c39e888e8/1570220588454-ROAJNS29CYDX7TFZ3B09/johnlisi.jpg?format=1000w"
  };

  function esc(s){return String(s||"").replace(/[&<>\"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
  function key(s){return String(s||"").replace(/’/g,"'").replace(/\s+/g," ").trim().toUpperCase();}
  function imgFor(name){return IMAGES[key(name)]||"";}
  function dFromIso(s){return new Date(s+"T12:00:00");}
  function iso(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
  function pretty(s){return dFromIso(s).toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"});}
  function venueToday(){
    var parts=new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",year:"numeric",month:"numeric",day:"numeric"}).formatToParts(new Date());
    var out={}; parts.forEach(function(p){out[p.type]=p.value;});
    return new Date(Number(out.year),Number(out.month)-1,Number(out.day),12);
  }
  function weekWindow(now){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);var sinceMon=(d.getDay()+6)%7;var mon=new Date(d);mon.setDate(d.getDate()-sinceMon);var wed=new Date(mon);wed.setDate(mon.getDate()+2);var sun=new Date(mon);sun.setDate(mon.getDate()+6);return {start:iso(wed),end:iso(sun)};}
  function isPlaceholder(a){return !a||key(a[2])==="TBA"||key(a[2])==="TO BE ANNOUNCED";}
  function weekDays(){var w=weekWindow(venueToday());var days=SCHEDULE.filter(function(day){return day.date>=w.start&&day.date<=w.end;});return days.length?days:SCHEDULE.slice(0,4);}
  function focusDay(days){var today=iso(venueToday());return days.find(function(d){return d.date===today;})||days[0]||SCHEDULE[0];}
  function photo(act,klass){var src=imgFor(act[2]);return src?'<img class="'+klass+'" src="'+esc(src)+'" alt="'+esc(act[2])+' at BMC" loading="lazy" decoding="async">':'<div class="'+klass+' no-photo"><span>♪</span></div>';}
  function aodCard(act){return '<article class="bmc-aod-card">'+photo(act,"bmc-aod-photo")+'<div class="bmc-aod-copy"><span>'+esc(act[0])+'–'+esc(act[1])+'</span><b>'+esc(act[2])+'</b></div></article>';}
  function actRow(act){return '<div class="bmc-week-act">'+photo(act,"bmc-week-photo")+'<div class="bmc-week-copy"><b>'+esc(act[2])+'</b><span>'+esc(act[0])+'–'+esc(act[1])+'</span></div></div>';}
  function dayCard(day){return '<article class="card show-day bmc-week-day"><h3>'+pretty(day.date)+'</h3>'+day.acts.map(actRow).join("")+'</article>';}

  function installStyle(){
    var old=document.getElementById("bmc-schedule-authority-style");
    if(old) old.remove();
    var css=[
      "#schedule,#schedule *{box-sizing:border-box}",
      "#schedule{max-width:100%;overflow:hidden}",
      "#schedule .schedule-list{display:block;width:100%;max-width:100%;overflow:hidden}",
      ".bmc-aod-heading{margin:0 0 10px;color:#fff6e8;text-transform:uppercase;letter-spacing:.06em;text-shadow:2px 2px 0 #000}",
      ".bmc-aod-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;width:100%;max-width:100%;margin:0 0 14px;overflow:hidden}",
      ".bmc-aod-card{display:grid;grid-template-columns:88px minmax(0,1fr);align-items:center;width:100%;min-width:0;overflow:hidden;border:2px solid rgba(255,216,87,.68);border-radius:12px;background:linear-gradient(180deg,rgba(12,9,35,.96),rgba(0,0,0,.94))}",
      ".bmc-aod-photo{display:block;width:88px;height:72px;object-fit:cover;background:#07030f}",
      ".bmc-aod-photo.no-photo{display:grid;place-items:center;color:#ffd857;font-size:22px}",
      ".bmc-aod-copy{min-width:0;padding:7px 9px;overflow:hidden}",
      ".bmc-aod-copy span{display:inline-block;max-width:100%;font-size:10px;font-weight:900;color:#5ee6ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".bmc-aod-copy b{display:block;font-size:13px;line-height:1.12;color:#fff6e8;text-transform:uppercase;overflow-wrap:anywhere}",
      ".bmc-week-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;width:100%;max-width:100%;overflow:hidden}",
      ".bmc-week-day{min-width:0;max-width:100%;overflow:hidden}",
      ".bmc-week-act{display:grid;grid-template-columns:64px minmax(0,1fr);gap:9px;align-items:center;width:100%;min-width:0;padding:7px 0;border-top:1px dashed rgba(255,255,255,.24);overflow:hidden}",
      ".bmc-week-photo{display:block;width:64px;height:50px;object-fit:cover;border-radius:7px;background:#07030f}",
      ".bmc-week-photo.no-photo{display:grid;place-items:center;color:#ffd857;font-size:18px}",
      ".bmc-week-copy{min-width:0;overflow:hidden}",
      ".bmc-week-copy b{display:block;font-size:12px;line-height:1.13;color:#fff6e8;text-transform:uppercase;overflow-wrap:anywhere}",
      ".bmc-week-copy span{display:block;font-size:10px;color:#5ee6ff;margin-top:2px}",
      "@media(max-width:760px){html,body{max-width:100vw!important;overflow-x:hidden!important}main,#schedule,#schedule.panel,#schedule .schedule-list,#schedule .card{width:100%!important;max-width:100%!important;min-width:0!important;overflow:hidden!important}#schedule{padding-left:10px!important;padding-right:10px!important}#schedule h2{font-size:clamp(34px,12vw,50px)!important;line-height:.92!important}.bmc-aod-grid{grid-template-columns:1fr!important;gap:8px!important}.bmc-aod-card{grid-template-columns:54px minmax(0,1fr)!important;min-height:54px!important;max-height:70px!important}.bmc-aod-photo{width:54px!important;height:54px!important;min-width:54px!important;max-width:54px!important}.bmc-aod-copy{padding:5px 7px!important}.bmc-aod-copy span{font-size:8.5px!important}.bmc-aod-copy b{font-size:10.5px!important}.bmc-week-grid{grid-template-columns:1fr!important;gap:10px!important}.bmc-week-day{padding:12px!important}.bmc-week-act{grid-template-columns:44px minmax(0,1fr)!important;gap:7px!important}.bmc-week-photo{width:44px!important;height:36px!important;min-width:44px!important;max-width:44px!important}.bmc-week-copy b{font-size:10.5px!important}.bmc-week-copy span{font-size:9px!important}}"
    ].join("\n");
    var style=document.createElement("style");
    style.id="bmc-schedule-authority-style";
    style.textContent=css;
    document.head.appendChild(style);
  }
  function render(){
    installStyle();
    var list=document.getElementById("scheduleList");
    if(!list) return;
    var days=weekDays();
    var focus=focusDay(days);
    var focusActs=(focus.acts||[]).filter(function(a){return !isPlaceholder(a);});
    list.innerHTML='<h3 class="bmc-aod-heading">Artists of the Day</h3><div class="bmc-aod-grid">'+focusActs.map(aodCard).join("")+'</div><div class="bmc-week-grid">'+days.map(dayCard).join("")+'</div>';
    var ribbon=document.querySelector("#schedule .ribbon"); if(ribbon) ribbon.textContent="July 2026 live music";
    var note=document.querySelector("#schedule .note"); if(note) note.textContent="July schedule is loaded from the approved BMC schedule snapshot.";
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",render); else render();
  window.addEventListener("load",render);
})();