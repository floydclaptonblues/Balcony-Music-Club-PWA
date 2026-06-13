(function(){
  var ARTIST='Ashley Paige & The Soulcial Club';

  function updateTextNodes(root){
    if(!root||!document.createTreeWalker)return;
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
    var node;
    while((node=walker.nextNode())){
      node.nodeValue=node.nodeValue
        .replace(/UNDER THE COVERS/g,ARTIST)
        .replace(/UNDER COVERS/g,ARTIST);
    }
  }

  function updateJazzyAnswers(){
    if(window.BMC_JAZZYCAT&&Array.isArray(window.BMC_JAZZYCAT.answers)){
      window.BMC_JAZZYCAT.answers.forEach(function(item){
        if(item&&typeof item.answer==='string'){
          item.answer=item.answer.replace(/UNDER THE COVERS/g,ARTIST).replace(/UNDER COVERS/g,ARTIST);
        }
      });
    }
  }

  function run(){updateTextNodes(document.body);updateJazzyAnswers();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('load',function(){run();setTimeout(run,250);setTimeout(run,1000);setTimeout(run,2000);});
})();