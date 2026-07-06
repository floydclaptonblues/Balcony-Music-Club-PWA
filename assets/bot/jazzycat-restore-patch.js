(function(){
  var CONTACT_DISPLAY='504-428-5494';
  var ORIGINAL_QUICK=[
    'Is there a cover charge?',
    'Where is BMC?',
    'How do I book an event?',
    'Where is the BMC app?',
    'What spaces are available?'
  ];

  var RESTORED_ANSWERS=[
    {keys:['cover','charge','admission'],answer:'No cover, no charge.'},
    {keys:['address','where','location','esplanade'],answer:'Balcony Music Club is at 504 Esplanade Avenue in New Orleans, Louisiana.'},
    {keys:['book','booking','private','event','reserve','wedding','graduation'],answer:'For private events, use the booking email BMC@marullomgmt.com or call '+CONTACT_DISPLAY+'.'},
    {keys:['phone','call','contact','number'],answer:'The contact number for Balcony Music Club is '+CONTACT_DISPLAY+'.'},
    {keys:['app','install','save'],answer:'The BMC app keeps the schedule, show alerts, venue info, and JazzyCat handy.'},
    {keys:['live','stream','broadcast'],answer:'BMC LIVE is the live Balcony Music Club stream.'},
    {keys:['youtube','video','channel'],answer:'Use the YouTube button in the Contact section to open the official BMC YouTube channel.'},
    {keys:['social','instagram','facebook','links'],answer:'Instagram, Facebook, YouTube, and the official website are listed in the Contact section.'},
    {keys:['space','spaces','room','rooms','courtyard','speakeasy','bar','stage'],answer:'Venue highlights include the courtyard, speakeasy, bar, and main-stage atmosphere.'},
    {keys:['schedule','band','music','tonight','lineup','show'],answer:'The Band Schedule section shows This Week\'s Lineup. Use the full schedule button to see all loaded dates.'},
    {keys:['drink','cocktail','beer','menu','crescent'],answer:'The Drink Menu section shows featured drinks and opens the full drink menu.'},
    {keys:['store','merch','art','painting'],answer:'Use the Store button to open the official BMC store.'}
  ];

  function askJazzyCat(q){
    var text=(q||'').toLowerCase();
    var hit=RESTORED_ANSWERS.find(function(item){
      return item.keys.some(function(k){return text.indexOf(k)!==-1;});
    });
    return hit?hit.answer:'Ask about the schedule, booking, contact, BMC app, BMC LIVE, social links, drink menu, store, or venue spaces.';
  }

  function restoreBotObject(){
    window.BMC_JAZZYCAT=window.BMC_JAZZYCAT||{};
    window.BMC_JAZZYCAT.welcome='Hey, I am JazzyCat. Ask me about BMC, the schedule, booking, the BMC app, BMC LIVE, social links, or venue spaces.';
    window.BMC_JAZZYCAT.fallback='Ask about the schedule, booking, contact, BMC app, BMC LIVE, social links, drink menu, store, or venue spaces.';
    window.BMC_JAZZYCAT.answers=RESTORED_ANSWERS.slice();
    window.BMC_JAZZYCAT.quick=ORIGINAL_QUICK.slice();
  }

  function setupBotUi(){
    restoreBotObject();
    var log=document.getElementById('botLog');
    var form=document.getElementById('botForm');
    var input=document.getElementById('botInput');
    var quick=document.getElementById('quickRow');
    if(!log||!form||!input||!quick)return;

    log.textContent=window.BMC_JAZZYCAT.welcome;
    quick.innerHTML=ORIGINAL_QUICK.map(function(q){
      return '<button class="button ghost" type="button">'+q+'</button>';
    }).join('');

    quick.querySelectorAll('button').forEach(function(btn){
      btn.onclick=function(){
        input.value=btn.textContent;
        log.textContent=askJazzyCat(input.value);
      };
    });

    form.onsubmit=function(e){
      e.preventDefault();
      log.textContent=askJazzyCat(input.value);
    };
  }

  function run(){setupBotUi();setTimeout(setupBotUi,250);setTimeout(setupBotUi,900);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',run);
})();
