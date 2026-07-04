// Root app override loader.
// This file is referenced directly by index.html and cached by sw.js.
// Keep it present so the service worker install does not fail on cache.addAll().
(function(){
  var PATCH_ID='bmc-schedule-authority-direct-loader';
  var PATCH_SRC='/assets/bot/schedule-authority-patch.js?v=20260704-july-direct-shell';

  function loadScheduleAuthority(){
    if(document.getElementById(PATCH_ID))return;
    if(document.querySelector('script[src*="schedule-authority-patch.js"]'))return;
    var script=document.createElement('script');
    script.id=PATCH_ID;
    script.src=PATCH_SRC;
    script.defer=true;
    document.body.appendChild(script);
  }

  function patchStaticJulyCopy(){
    var marquee=document.querySelector('.marquee p');
    if(marquee)marquee.textContent='Scan, save, and check the July lineup.';
    var scheduleRibbon=document.querySelector('#schedule .ribbon');
    if(scheduleRibbon)scheduleRibbon.textContent='July 2026 live music';
    var scheduleNote=document.querySelector('#schedule .note');
    if(scheduleNote)scheduleNote.textContent='July schedule is loaded from the approved BMC schedule snapshot.';
  }

  function run(){
    patchStaticJulyCopy();
    loadScheduleAuthority();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
  window.addEventListener('load',function(){run();setTimeout(run,250);setTimeout(run,1000);});
})();