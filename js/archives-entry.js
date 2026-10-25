/* Head-time empty shelf and the index -> archives sealed-folio handoff. */
(function () {
  'use strict';
  var root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
  var isShelf=/\/archives\.html$/i.test(location.pathname),active=null,overlay=null,introTimer=0,watch=null;
  var navigation=performance.getEntriesByType('navigation')[0];
  if(isShelf)root.dataset.archiveIntro=reduced.matches||(navigation&&navigation.type==='back_forward')?'complete':'waiting';
  function mount(){
    if(overlay||!document.body)return;
    overlay=document.createElement('div');overlay.id='archives-entry';overlay.hidden=true;overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML='<div class="archives-folio-camera"><div class="archives-folio"><div class="archives-folio-inside"><i></i><i></i><i></i></div><div class="archives-folio-front"><div class="archives-folio-rules"></div><span>档案目录</span><small>ARCHIVES OF THE VEILED</small><b class="archives-wax"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="15"/><path d="M24 7 37 24 24 41 11 24ZM10 24H38M24 9V39"/></svg></b></div></div></div><div class="archives-entry-dark"></div>';
    document.body.appendChild(overlay);
  }
  function queueShelf(delay){
    clearTimeout(introTimer);
    if(!isShelf||root.dataset.archiveIntro!=='waiting')return;
    introTimer=setTimeout(function(){if(root.dataset.archiveIntro==='waiting'&&window.ArchiveShelf)window.ArchiveShelf.startIntro();},delay);
  }
  function skipShelf(){
    clearTimeout(introTimer);if(watch){watch.disconnect();watch=null;}
    if(!isShelf)return;
    if(window.ArchiveShelf)window.ArchiveShelf.finishIntro();
    else root.dataset.archiveIntro='complete';
  }
  function prepare(target){
    if(reduced.matches||!/\/index\.html$/i.test(location.pathname)||!/\/archives\.html$/i.test(target.pathname))return null;
    return{kind:'archives',duration:960};
  }
  function receive(mark){
    if(!isShelf||reduced.matches||!mark||mark.kind!=='archives')return false;
    active={incoming:true};root.dataset.archivesTransition='entering';return true;
  }
  function leave(){
    mount();if(!overlay)return;
    active={incoming:false};
    var marker=document.querySelector('[data-marker="character"]'),r=marker?marker.getBoundingClientRect():null;
    var x=r&&r.width?r.x+r.width/2:innerWidth*.81,y=r&&r.height?r.y+r.height/2:innerHeight*.29;
    root.style.setProperty('--archives-origin-x',x+'px');root.style.setProperty('--archives-origin-y',y+'px');
    root.style.setProperty('--archives-from-x',(x-innerWidth*.5)+'px');root.style.setProperty('--archives-from-y',(y-innerHeight*.5)+'px');
    overlay.hidden=false;root.dataset.archivesTransition='leaving';
  }
  function reveal(){
    if(!active||!active.incoming)return;
    mount();if(overlay)overlay.hidden=false;
    root.dataset.archivesTransition='revealing';queueShelf(240);
  }
  function reset(preserveIntro){
    var skip=active&&active.incoming&&!preserveIntro;active=null;delete root.dataset.archivesTransition;
    ['--archives-origin-x','--archives-origin-y','--archives-from-x','--archives-from-y'].forEach(function(k){root.style.removeProperty(k);});
    if(overlay)overlay.hidden=true;
    if(skip)skipShelf();
  }
  window.ArchivesEntrance={prepare:prepare,receive:receive,leave:leave,reveal:reveal,reset:reset};
  document.addEventListener('DOMContentLoaded',function(){
    mount();if(active&&overlay)overlay.hidden=false;
    if(!isShelf||root.dataset.archiveIntro!=='waiting'||(active&&active.incoming))return;
    if(root.dataset.sceneTransition==='entering'){
      watch=new MutationObserver(function(){
        if(['revealing','idle'].includes(root.dataset.sceneTransition)){watch.disconnect();watch=null;queueShelf(220);}
      });watch.observe(root,{attributes:true,attributeFilter:['data-scene-transition']});
    }else{
      Promise.race([document.fonts.ready,new Promise(function(resolve){setTimeout(resolve,300);})]).then(function(){queueShelf(220);});
    }
  });
  window.addEventListener('pageshow',function(e){if(e.persisted)skipShelf();});
  reduced.addEventListener('change',function(){if(reduced.matches)skipShelf();});
})();
