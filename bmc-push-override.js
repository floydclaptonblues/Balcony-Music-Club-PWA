// Root app override loader.
// This file is referenced directly by index.html and cached by sw.js.
// Keep it present so the service worker install does not fail on cache.addAll().
(function(){
  var PATCH_ID='bmc-schedule-authority-direct-loader';
  var PATCH_SRC='/assets/bot/schedule-authority-patch.js?v=july-schedule-20260702';
  var MOBILE_FIX_ID='bmc-mobile-weekly-lineup-fix';

  function loadScheduleAuthority(){
    if(document.getElementById(PATCH_ID))return;
    if(document.querySelector('script[src*="schedule-authority-patch.js"]'))return;
    var script=document.createElement('script');
    script.id=PATCH_ID;
    script.src=PATCH_SRC;
    script.defer=true;
    document.body.appendChild(script);
  }

  function installMobileLineupFix(){
    if(document.getElementById(MOBILE_FIX_ID))return;
    var style=document.createElement('style');
    style.id=MOBILE_FIX_ID;
    style.textContent=[
      '@media(max-width:760px){',
      '  #schedule{overflow:hidden!important;}',
      '  #schedule h2{font-size:clamp(40px,13vw,60px)!important;line-height:.92!important;margin-bottom:12px!important;}',
      '  .artist-day-heading{font-size:clamp(20px,6.5vw,30px)!important;line-height:1!important;margin:0 0 10px!important;}',
      '  .artist-day-strip{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;width:100%!important;max-width:100%!important;margin:8px 0 12px!important;overflow:visible!important;}',
      '  .artist-day-act{display:grid!important;grid-template-columns:78px minmax(0,1fr)!important;grid-template-rows:auto 1fr!important;align-items:stretch!important;min-height:78px!important;max-height:96px!important;width:100%!important;max-width:100%!important;overflow:hidden!important;border-radius:12px!important;}',
      '  .artist-day-photo,.artist-day-no-photo{grid-row:1 / span 2!important;width:78px!important;height:78px!important;min-height:78px!important;max-height:78px!important;aspect-ratio:auto!important;object-fit:cover!important;}',
      '  .artist-day-no-photo{display:grid!important;place-items:center!important;background:linear-gradient(135deg,#160622,#050208)!important;color:#ffd857!important;font-size:22px!important;}',
      '  .artist-day-time{position:static!important;align-self:start!important;justify-self:start!important;margin:7px 8px 3px!important;padding:4px 7px!important;max-width:calc(100% - 16px)!important;font-size:9px!important;white-space:nowrap!important;}',
      '  .artist-day-marquee{align-self:end!important;min-width:0!important;margin:0!important;border-top:1px solid rgba(255,255,255,.18)!important;font-size:11px!important;}',
      '  .artist-day-marquee span{animation-duration:16s!important;}',
      '  .show-day{overflow:hidden!important;}',
      '  .show-day .act{grid-template-columns:68px minmax(0,1fr)!important;align-items:center!important;gap:9px!important;}',
      '  .bmc-band-photo--act{width:68px!important;height:54px!important;max-height:54px!important;object-fit:cover!important;border-radius:8px!important;}',
      '  .act-copy b{font-size:12px!important;line-height:1.15!important;}',
      '  .act-copy span{font-size:10px!important;}',
      '}',
      '@media(max-width:420px){',
      '  .artist-day-act{grid-template-columns:64px minmax(0,1fr)!important;min-height:64px!important;max-height:82px!important;}',
      '  .artist-day-photo,.artist-day-no-photo{width:64px!important;height:64px!important;min-height:64px!important;max-height:64px!important;}',
      '  .artist-day-time{font-size:8.5px!important;margin:6px 7px 2px!important;padding:3px 6px!important;}',
      '  .artist-day-marquee{font-size:10px!important;}',
      '  .show-day .act{grid-template-columns:58px minmax(0,1fr)!important;gap:8px!important;}',
      '  .bmc-band-photo--act{width:58px!important;height:48px!important;max-height:48px!important;}',
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

  function run(){
    installMobileLineupFix();
    patchStaticJulyCopy();
    loadScheduleAuthority();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
  window.addEventListener('load',function(){run();setTimeout(run,250);setTimeout(run,1000);});
})();