// Root app override loader.
// This file is referenced directly by index.html and cached by sw.js.
// Keep it present so the service worker install does not fail on cache.addAll().
(function(){
  var PATCH_ID='bmc-schedule-authority-direct-loader';
  var PATCH_SRC='/assets/bot/schedule-authority-patch.js?v=july-schedule-20260702';
  var BMC_LIVE_HREF='https://bmclive.balconymusicclub.com/';

  function loadScheduleAuthority(){
    if(document.getElementById(PATCH_ID))return;
    if(document.querySelector('script[src*="schedule-authority-patch.js"]'))return;
    var script=document.createElement('script');
    script.id=PATCH_ID;
    script.src=PATCH_SRC;
    script.defer=true;
    document.body.appendChild(script);
  }

  function exposeBmcLive(){
    var nav=document.querySelector('header.top nav');
    if(!nav)return;
    Array.prototype.slice.call(nav.querySelectorAll('a')).forEach(function(existing){
      if((existing.textContent||'').trim().toLowerCase()==='bmc live'||existing.getAttribute('href')==='/bmc-live/'||existing.getAttribute('href')===BMC_LIVE_HREF){
        existing.parentNode.removeChild(existing);
      }
    });
    var link=document.createElement('a');
    link.href=BMC_LIVE_HREF;
    link.target='_blank';
    link.rel='noreferrer';
    link.textContent='BMC Live';
    nav.insertBefore(link,nav.firstChild);
  }

  function run(){loadScheduleAuthority();exposeBmcLive();}

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
  window.addEventListener('load',function(){run();setTimeout(run,250);setTimeout(run,1000);});
})();