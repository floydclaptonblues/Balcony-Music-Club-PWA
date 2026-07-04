(function(){
  function add(id,src){
    if(document.getElementById(id))return;
    if(document.querySelector('script[src*="'+src.split('?')[0]+'"]'))return;
    var s=document.createElement('script');
    s.id=id;
    s.src=src;
    s.defer=true;
    document.body.appendChild(s);
  }
  function copy(){
    var m=document.querySelector('.marquee p');
    if(m)m.textContent='Scan, save, and check the July lineup.';
    var r=document.querySelector('#schedule .ribbon');
    if(r)r.textContent='July 2026 live music';
    var n=document.querySelector('#schedule .note');
    if(n)n.textContent='July schedule is loaded from the approved BMC schedule snapshot.';
  }
  function run(){
    copy();
    add('bmc-july-schedule','/assets/bot/schedule-authority-patch.js?v=20260704-july-direct-shell');
    add('bmc-july-full','/assets/bot/july-schedule-drawer.js?v=20260704-july-only');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',function(){run();setTimeout(run,250);setTimeout(run,1000);});
})();