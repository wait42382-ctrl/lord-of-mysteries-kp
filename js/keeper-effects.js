(function(){
  'use strict';
  var reduced=matchMedia('(prefers-reduced-motion: reduce)'),main=document.getElementById('keeper-main');
  var target={x:0,y:0},current={x:0,y:0},motionFrame=0,lastMotion=0;
  function paintMotion(){
    document.querySelectorAll('.detail-art').forEach(function(el){el.style.transform='translate3d('+current.x*10+'px,'+current.y*7+'px,0) scale(1.035)';});
  }
  function step(now){motionFrame=0;if(reduced.matches||document.hidden)return;var dt=Math.min(48,now-lastMotion||16),a=1-Math.exp(-dt/65);lastMotion=now;current.x+=(target.x-current.x)*a;current.y+=(target.y-current.y)*a;paintMotion();if(Math.abs(target.x-current.x)+Math.abs(target.y-current.y)>.001)motionFrame=requestAnimationFrame(step);}
  function schedule(){if(main.dataset.view==='overview')return;if(!motionFrame&&!reduced.matches&&!document.hidden){lastMotion=performance.now();motionFrame=requestAnimationFrame(step);}}
  document.addEventListener('pointermove',function(event){if(main.dataset.view==='overview'||event.pointerType==='touch'||reduced.matches)return;target.x=(event.clientX/innerWidth-.5)*2;target.y=(event.clientY/innerHeight-.5)*2;schedule();},{passive:true});
  document.documentElement.addEventListener('pointerleave',function(){target.x=target.y=0;schedule();});
  var canvas=document.getElementById('keeper-dust'),ctx=canvas.getContext('2d'),particles=[],dustFrame=0,width=0,height=0,previous=0;
  function resize(){width=innerWidth;height=innerHeight;var ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);particles=Array.from({length:Math.min(160,Math.max(70,Math.round(width/11)))},function(){return{x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.1+.25,speed:Math.random()*.18+.035,alpha:Math.random()*.28+.1};});drawDust(0);}
  function drawDust(dt){ctx.clearRect(0,0,width,height);particles.forEach(function(p){p.y-=p.speed*dt/16;if(p.y<0)p.y=height;p.x+=Math.sin(p.y*.005)*.012*dt/16;ctx.fillStyle='rgba(215,191,198,'+p.alpha+')';ctx.beginPath();ctx.arc(p.x+current.x*p.r*7,p.y+current.y*p.r*5,p.r,0,Math.PI*2);ctx.fill();});}
  function dust(now){dustFrame=0;if(document.hidden||reduced.matches)return;if(now-previous>=32){drawDust(Math.min(60,now-previous||32));previous=now;}dustFrame=requestAnimationFrame(dust);}
  function pause(){cancelAnimationFrame(motionFrame);cancelAnimationFrame(dustFrame);motionFrame=dustFrame=0;}
  function resume(){if(reduced.matches||document.hidden)return;if(!dustFrame){previous=performance.now();dustFrame=requestAnimationFrame(dust);}schedule();}
  document.addEventListener('visibilitychange',function(){if(document.hidden)pause();else resume();});
  reduced.addEventListener('change',function(){pause();if(reduced.matches){current.x=current.y=target.x=target.y=0;paintMotion();drawDust(0);}else resume();});
  window.addEventListener('pagehide',pause);window.addEventListener('pageshow',resume);window.addEventListener('resize',resize);window.addEventListener('keeper-viewchange',function(){target.x=target.y=0;if(main.dataset.view==='overview'){cancelAnimationFrame(motionFrame);motionFrame=0;current.x=current.y=0;paintMotion();}else schedule();});
  if(ctx){resize();resume();}
})();
