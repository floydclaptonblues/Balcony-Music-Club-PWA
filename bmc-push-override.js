// Root app override loader.
// This file is referenced directly by index.html and cached by sw.js.
// Keep it present so the service worker install does not fail on cache.addAll().
(function(){
  var PATCH_ID='bmc-schedule-authority-direct-loader';
  var PATCH_SRC='/assets/bot/schedule-authority-patch.js?v=parish-line-photo-20260717';

  function loadScheduleAuthority(){
    if(document.getElementById(PATCH_ID))return;
    if(document.querySelector('script[src*="schedule-authority-patch.js"]'))return;
    var script=document.createElement('script');
    script.id=PATCH_ID;
    script.src=PATCH_SRC;
    script.defer=true;
    document.body.appendChild(script);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadScheduleAuthority);
  else loadScheduleAuthority();
})();
