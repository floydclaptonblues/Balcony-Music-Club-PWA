(function(){
  var rows=[
    ['Wed Jul 2','6:00 PM–8:30 PM','FUNKY SOLES'],['Wed Jul 2','9:00 PM–11:30 PM','MOTHER RUCKUS'],
    ['Thu Jul 3','6:00 PM–8:30 PM','ADO SOUL & THE TRIBE'],['Thu Jul 3','9:00 PM–11:30 PM','KAT KILEY EXPERIENCE'],
    ['Fri Jul 4','3:00 PM–5:30 PM','TROPICAL WEATHER'],['Fri Jul 4','6:00 PM–8:30 PM','JOHN LISI & DELTA FUNK'],['Fri Jul 4','9:00 PM–11:30 PM','THEE FONK JAM feat. TamarieT'],
    ['Sat Jul 5','3:00 PM–5:30 PM','SIERRA & GREEN NOTES'],['Sat Jul 5','6:00 PM–8:30 PM','JOSH BENITEZ BAND'],['Sat Jul 5','9:00 PM–11:30 PM','MAURICE CADE & ESS'],
    ['Wed Jul 9','6:00 PM–8:30 PM','DAPPER DANDIES'],['Wed Jul 9','9:00 PM–11:30 PM','JAM BRASS BAND'],
    ['Thu Jul 10','6:00 PM–8:30 PM','ADO SOUL & THE TRIBE'],['Thu Jul 10','9:00 PM–11:30 PM','KAT KILEY EXPERIENCE'],
    ['Fri Jul 11','3:00 PM–5:30 PM','ANDRE LOVETT BAND'],['Fri Jul 11','6:00 PM–8:30 PM',"WOODY'S RAMPAGE"],['Fri Jul 11','9:00 PM–11:30 PM','JOHN LISI & DELTA FUNK'],
    ['Sat Jul 12','3:00 PM–5:30 PM','DEEJ FLAVA & MOTHER RUCKUS'],['Sat Jul 12','6:00 PM–8:30 PM','MAURICE CADE & ESS'],['Sat Jul 12','9:00 PM–11:30 PM','KIM IN THE WIND'],
    ['Wed Jul 16','6:00 PM–8:30 PM','LEROY MARSHALL BAND'],['Wed Jul 16','9:00 PM–11:30 PM','KAT KILEY EXPERIENCE'],
    ['Thu Jul 17','6:00 PM–8:30 PM','PARISH LINE'],['Thu Jul 17','9:00 PM–11:30 PM','BIG MIKE & THE R&B KINGS'],
    ['Fri Jul 18','3:00 PM–5:30 PM','ANDRE LOVETT BAND'],['Fri Jul 18','6:00 PM–8:30 PM','JON RONIGER'],['Fri Jul 18','9:00 PM–11:30 PM','ASHLEY PAIGE & SOULCIAL CLUB'],
    ['Sat Jul 19','3:00 PM–5:30 PM','SIERRA & GREEN NOTES'],['Sat Jul 19','6:00 PM–8:30 PM','GABE STILLMAN BAND'],['Sat Jul 19','9:00 PM–11:30 PM','KIM IN THE WIND'],
    ['Wed Jul 23','6:00 PM–8:30 PM','DAPPER DANDIES'],['Wed Jul 23','9:00 PM–11:30 PM','KAT KILEY EXPERIENCE'],
    ['Thu Jul 24','6:00 PM–8:30 PM','MOTHER RUCKUS'],['Thu Jul 24','9:00 PM–11:30 PM','BIG MIKE & THE R&B KINGS'],
    ['Fri Jul 25','3:00 PM–5:30 PM','ANDRE LOVETT BAND'],['Fri Jul 25','6:00 PM–8:30 PM','SUGAR & THE DADDIES'],['Fri Jul 25','9:00 PM–11:30 PM','FLEURTATIONS'],
    ['Sat Jul 26','3:00 PM–5:30 PM','DEEJ FLAVA & MOTHER RUCKUS'],['Sat Jul 26','6:00 PM–8:30 PM','MAURICE CADE & ESS'],['Sat Jul 26','9:00 PM–11:30 PM','KIM IN THE WIND'],
    ['Wed Jul 30','6:00 PM–8:30 PM','TBA'],['Wed Jul 30','9:00 PM–11:30 PM','KAT KILEY EXPERIENCE'],
    ['Thu Jul 31','6:00 PM–8:30 PM','MOTHER RUCKUS'],['Thu Jul 31','9:00 PM–11:30 PM','BIG MIKE & R&B KINGS']
  ];
  function style(){
    if(document.getElementById('bmc-july-drawer-style'))return;
    var s=document.createElement('style');
    s.id='bmc-july-drawer-style';
    s.textContent='.bmc-july-drawer{margin-top:12px;border:2px solid rgba(255,216,87,.58);background:rgba(0,0,0,.22);padding:10px;max-height:70vh;overflow:auto}.bmc-july-drawer[hidden]{display:none}.bmc-july-row{display:grid;grid-template-columns:90px 130px minmax(0,1fr);gap:8px;border-top:1px dashed rgba(255,255,255,.24);padding:8px 0}.bmc-july-row:first-child{border-top:0}.bmc-july-date{color:#ffd857;font-weight:900}.bmc-july-time{color:#5ee6ff;font-weight:900}.bmc-july-act{color:#fff6e8;font-weight:900;text-transform:uppercase;overflow-wrap:anywhere}@media(max-width:620px){.bmc-july-row{grid-template-columns:1fr;gap:2px}}';
    document.head.appendChild(s);
  }
  function build(){
    style();
    var old=document.getElementById('bmcJulyScheduleDrawer');
    if(old)return old;
    var box=document.createElement('div');
    box.id='bmcJulyScheduleDrawer';
    box.className='bmc-july-drawer';
    box.hidden=true;
    rows.forEach(function(r){
      var row=document.createElement('div'); row.className='bmc-july-row';
      var d=document.createElement('span'); d.className='bmc-july-date'; d.textContent=r[0];
      var t=document.createElement('span'); t.className='bmc-july-time'; t.textContent=r[1];
      var a=document.createElement('span'); a.className='bmc-july-act'; a.textContent=r[2];
      row.appendChild(d); row.appendChild(t); row.appendChild(a); box.appendChild(row);
    });
    var schedule=document.getElementById('schedule');
    if(schedule)schedule.appendChild(box);
    return box;
  }
  function wire(){
    build();
    document.addEventListener('click',function(e){
      var btn=e.target.closest&&e.target.closest('#openFullSchedule');
      if(!btn)return;
      e.preventDefault();
      var box=build();
      box.hidden=!box.hidden;
      btn.textContent=box.hidden?'Open Full Band Schedule':'Hide Full Band Schedule';
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
  window.addEventListener('load',wire);
})();