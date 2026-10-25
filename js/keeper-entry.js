/* A route-specific handoff: the desktop's instrument opens into three archive leaves. */
(function(){
  'use strict';
  var root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)'),overlay=null,active=null;
  var paths=[
    'M24 3 44 14v22L24 47 4 36V14ZM24 3v21m20-10L24 24 4 14m20 10v23',
    'M17 34c0-9 15-9 15-21a9 9 0 0 0-18 0m-5 0a14 14 0 0 1 28 0c0 14-14 14-14 22 0 8-10 9-12 2',
    'm24 2 17 10-2 26-15 8L9 38 7 12ZM24 2l-5 15 11 8-12 11 6 10'
  ];
  function mount(){
    if(overlay||!document.body)return;
    overlay=document.createElement('div');overlay.id='keeper-entry';overlay.hidden=true;overlay.setAttribute('aria-hidden','true');
    ['dice','whispers','control'].forEach(function(key,index){
      var leaf=document.createElement('div');leaf.className='entry-leaf';leaf.style.setProperty('--leaf',index);
      var face='<img src="assets/keeper-scenes/'+key+'.png" alt="" draggable="false"><i class="entry-leaf-shade"></i><div class="entry-binding"><svg viewBox="0 0 48 48"><path d="'+paths[index]+'"/></svg></div><i class="entry-leaf-edge"></i>';
      if(index===1){leaf.classList.add('entry-fold');leaf.innerHTML='<div class="entry-fold-half left"><div class="entry-fold-surface">'+face+'</div></div><div class="entry-fold-half right"><div class="entry-fold-surface">'+face+'</div></div>';}
      else leaf.innerHTML=face;
      overlay.append(leaf);
    });
    document.body.append(overlay);
  }
  function prepare(target){
    if(reduced.matches||!/\/index\.html$/i.test(location.pathname)||!/\/keeper\.html$/i.test(target.pathname)||!['','#overview'].includes(target.hash))return null;
    return {kind:'keeper',duration:960};
  }
  function receive(mark){
    if(reduced.matches||!mark||mark.kind!=='keeper'||!/\/keeper\.html$/i.test(location.pathname)||!['','#overview'].includes(location.hash))return false;
    active={incoming:true};root.dataset.keeperTransition='entering';return true;
  }
  function leave(){
    mount();if(!overlay)return;
    active={incoming:false};var origin=document.querySelector('.selection-marker[data-marker="host"]');var rect=origin?origin.getBoundingClientRect():null;
    var x=rect&&rect.width?rect.x+rect.width/2:innerWidth*.65,y=rect&&rect.height?rect.y+rect.height/2:innerHeight*.38;
    x=Math.max(innerWidth*.12,Math.min(innerWidth*.88,x));y=Math.max(innerHeight*.16,Math.min(innerHeight*.78,y));
    overlay.querySelectorAll('.entry-leaf').forEach(function(leaf,i){leaf.style.setProperty('--from-x',(x-innerWidth*(i+.5)/3)+'px');leaf.style.setProperty('--from-y',(y-innerHeight*.5)+'px');});
    root.style.setProperty('--keeper-origin-x',x+'px');root.style.setProperty('--keeper-origin-y',y+'px');
    overlay.hidden=false;root.dataset.keeperTransition='leaving';
  }
  function reveal(){if(!active||!active.incoming)return;mount();if(overlay)overlay.hidden=false;root.dataset.keeperTransition='revealing';}
  function reset(){active=null;delete root.dataset.keeperTransition;root.style.removeProperty('--keeper-origin-x');root.style.removeProperty('--keeper-origin-y');if(overlay)overlay.hidden=true;}
  window.KeeperTransition={prepare:prepare,receive:receive,leave:leave,reveal:reveal,reset:reset};
  document.addEventListener('DOMContentLoaded',function(){mount();if(active&&active.incoming&&overlay)overlay.hidden=false;});
})();
