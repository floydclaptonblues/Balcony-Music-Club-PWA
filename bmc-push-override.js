// Root app override loader.
// This file is referenced directly by index.html and cached by sw.js.
// Keep it present so the service worker install does not fail on cache.addAll().
(function(){
  var PATCH_ID='bmc-schedule-authority-direct-loader';
  var PATCH_SRC='/assets/bot/schedule-authority-patch.js?v=july-schedule-20260704-mobile-clamp';
  var MOBILE_FIX_ID='bmc-mobile-weekly-lineup-clamp-fix';

  function installMobileLineupFix(){
    var old=document.getElementById(MOBILE_FIX_ID);
    if(old)old.parentNode.removeChild(old);
    var style=document.createElement('style');
    style.id=MOBILE_FIX_ID;
    style.textContent=[
      '@media(max-width:760px){',
      '  html,body{max-width:100vw!important;overflow-x:hidden!important;}',
      '  main,#schedule,#schedule.panel,#schedule .card,#schedule .show-day{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;overflow:hidden!important;}',
      '  #schedule{padding-left:10px!important;padding-right:10px!important;margin-left:0!important;margin-right:0!important;}',
      '  #schedule h2{font-size:clamp(34px,12vw,52px)!important;line-height:.92!important;margin:0 0 12px!important;max-width:100%!important;word-break:normal!important;}',
      '  #schedule .ribbon{font-size:10px!important;max-width:100%!important;}',
      '  #schedule .artist-day-heading{font-size:clamp(18px,6vw,26px)!important;line-height:1.05!important;margin:0 0 10px!important;max-width:100%!important;}',
      '  #schedule .artist-day-strip{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;width:100%!important;max-width:100%!important;min-width:0!important;margin:8px 0 12px!important;overflow:hidden!important;}',
      '  #schedule .artist-day-act{display:grid!important;grid-template-columns:62px minmax(0,1fr)!important;grid-template-rows:auto auto!important;align-items:stretch!important;width:100%!important;max-width:100%!important;min-width:0!important;min-height:62px!important;max-height:82px!important;margin:0!important;overflow:hidden!important;border-radius:10px!important;}',
      '  #schedule .artist-day-photo,#schedule .artist-day-no-photo{grid-row:1 / span 2!important;width:62px!important;height:62px!important;min-width:62px!important;min-height:62px!important;max-width:62px!important;max-height:62px!important;aspect-ratio:auto!important;object-fit:cover!important;}',
      '  #schedule .artist-day-no-photo{display:grid!important;place-items:center!important;background:#07030f!important;color:#ffd857!important;font-size:18px!important;}',
      '  #schedule .artist-day-time{position:static!important;grid-column:2!important;align-self:start!important;justify-self:start!important;margin:6px 7px 2px!important;padding:3px 6px!important;max-width:calc(100% - 14px)!important;font-size:8.5px!important;line-height:1!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;}',
      '  #schedule .artist-day-marquee{grid-column:2!important;align-self:end!important;width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important;border-top:1px solid rgba(255,255,255,.16)!important;font-size:9px!important;line-height:1.6!important;overflow:hidden!important;}',
      '  #schedule .artist-day-marquee span{display:inline-block!important;max-width:none!important;animation-duration:18s!important;}',
      '  #schedule .schedule-list{display:grid!important;grid-template-columns:1fr!important;width:100%!important;max-width:100%!important;gap:10px!important;overflow:hidden!important;}',
      '  #schedule .show-day{padding:12px!important;margin:0!important;border-left-width:4px!important;}',
      '  #schedule .show-day h3{font-size:18px!important;line-height:1.05!important;margin:0 0 8px!important;}',
      '  #schedule .show-day .act{display:grid!important;grid-template-columns:54px minmax(0,1fr)!important;align-items:center!important;gap:8px!important;width:100%!important;max-width:100%!important;min-width:0!important;padding-top:7px!important;margin-top:7px!important;overflow:hidden!important;}',
      '  #schedule .bmc-band-photo,#schedule .bmc-band-photo--act{width:54px!important;height:44px!important;min-width:54px!important;max-width:54px!important;max-height:44px!important;object-fit:cover!important;border-radius:7px!important;}',
      '  #schedule .act-copy{min-width:0!important;max-width:100%!important;overflow:hidden!important;}',
      '  #schedule .act-copy b{display:block!important;font-size:11px!important;line-height:1.12!important;white-space:normal!important;overflow-wrap:anywhere!important;}',
      '  #schedule .act-copy span{display:block!important;font-size:9.5px!important;line-height:1.2!important;}',
      '}',
      '@media(max-width:420px){',
      '  #schedule{padding-left:8px!important;padding-right:8px!important;}',
      '  #schedule .artist-day-act{grid-template-columns:52px minmax(0,1fr)!important;min-height:52px!important;max-height:72px!important;}',
      '  #schedule .artist-day-photo,#schedule .artist-day-no-photo{width:52px!important;height:52px!important;min-width:52px!important;min-height:52px!important;max-width:52px!important;max-height:52px!important;}',
      '  #schedule .artist-day-time{font-size:8px!important;margin:5px 6px 1px!important;padding:3px 5px!important;}',
      '  #schedule .artist-day-marquee{font-size:8.5px!important;}',
      '  #schedule .show-day .act{grid-template-columns:48px minmax(0,1fr)!important;gap:7px!important;}',
      '  #schedule .bmc-band-photo,#schedule .bmc-band-photo--act{width:48px!important;height:40px!important;min-width:48px!important;max-width:48px!important;max-height:40px!important;}',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function patchStaticJulyCopy(){
    var marquee=document.querySelector('.marquee p');
    if(marquee)marquee.textContent='Scan, save, and check the July lineup.';
    var scheduleRibbon=document.querySelector('#schedule .ribbon');
    if(scheduleRibbon)scheduleRibbon.textContent='July 2026 live music';
    var scheduleNote=document.querySelector('#schedule .note');
    if(scheduleNote)scheduleNote.textContent='July schedule is loaded from the approved BMC schedule snapshot.';
  }

  function loadScheduleAuthority(){
    var existing=document.querySelector('script[src*="schedule-authority-patch.js"]');
    if(existing){installMobileLineupFix();return;}
    var script=document.createElement('script');
    script.id=PATCH_ID;
    script.src=PATCH_SRC;
    script.defer=true;
    script.onload=function(){installMobileLineupFix();setTimeout(installMobileLineupFix,100);setTimeout(installMobileLineupFix,500);};
    document.body.appendChild(script);
  }

  function run(){
    patchStaticJulyCopy();
    loadScheduleAuthority();
    installMobileLineupFix();
    setTimeout(function(){patchStaticJulyCopy();installMobileLineupFix();},250);
    setTimeout(function(){patchStaticJulyCopy();installMobileLineupFix();},1000);
    setTimeout(function(){patchStaticJulyCopy();installMobileLineupFix();},2500);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
  window.addEventListener('load',run);
})();