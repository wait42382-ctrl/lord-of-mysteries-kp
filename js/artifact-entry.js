/* Only index -> artifact opens the archive casket. Shared navigation owns timing. */
(function(){
 'use strict';
 var root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)'),overlay=null,active=false;
 function mount(){if(overlay||!document.body)return;overlay=document.createElement('div');overlay.id='artifact-entry';overlay.hidden=true;overlay.setAttribute('aria-hidden','true');overlay.innerHTML='<div class="casket-perspective"><div class="casket-body"><i class="casket-velvet"></i><div class="casket-lid"><i class="casket-binding"></i><span>Sealed Artifact</span><b></b></div></div></div><div class="casket-dark"></div>';document.body.appendChild(overlay);}
 function prepare(target){if(reduced.matches||!/\/index\.html$/i.test(location.pathname)||!/\/artifact\.html$/i.test(target.pathname))return null;return {kind:'artifact',duration:920};}
 function receive(mark){if(reduced.matches||!mark||mark.kind!=='artifact'||!/\/artifact\.html$/i.test(location.pathname))return false;active=true;root.dataset.artifactTransition='entering';return true;}
 function leave(){mount();if(!overlay)return;active=true;var marker=document.querySelector('[data-marker="artifact"]'),r=marker?marker.getBoundingClientRect():null;var x=r&&r.width?r.x+r.width/2:innerWidth*.74,y=r&&r.height?r.y+r.height/2:innerHeight*.62;root.style.setProperty('--artifact-origin-x',x+'px');root.style.setProperty('--artifact-origin-y',y+'px');root.style.setProperty('--artifact-from-x',(x-innerWidth*.5)+'px');root.style.setProperty('--artifact-from-y',(y-innerHeight*.5)+'px');overlay.hidden=false;root.dataset.artifactTransition='leaving';}
 function reveal(){if(!active)return;mount();if(overlay)overlay.hidden=false;root.dataset.artifactTransition='revealing';}
 function reset(){active=false;delete root.dataset.artifactTransition;['--artifact-origin-x','--artifact-origin-y','--artifact-from-x','--artifact-from-y'].forEach(function(k){root.style.removeProperty(k);});if(overlay)overlay.hidden=true;}
 window.ArtifactTransition={prepare:prepare,receive:receive,leave:leave,reveal:reveal,reset:reset};
 document.addEventListener('DOMContentLoaded',function(){mount();if(active&&overlay)overlay.hidden=false;});
})();
