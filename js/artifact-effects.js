/* Layered smoke ribbons; the approved illustration is never altered. */
(function(){
 'use strict';
 var canvas=document.getElementById('artifact-fog');if(!canvas)return;var ctx=canvas.getContext('2d');if(!ctx)return;
 var reduced=matchMedia('(prefers-reduced-motion: reduce)'),frame=0,w=0,h=0,t=0,last=0,count=0;
 function size(){var r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.5);w=r.width;h=r.height;canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);paint();}
 function ribbon(x,y,scale,phase){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);for(var j=7;j>=0;j--){ctx.beginPath();for(var i=0;i<=32;i++){var u=i/32,px=(u-.5)*w*.47,py=Math.sin(u*9+phase)*22+Math.cos(u*16-phase*.6)*8;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.strokeStyle=j>1?'rgba(6,4,9,'+(0.016+j*.002)+')':'rgba(118,102,119,.035)';ctx.lineWidth=4+j*7;ctx.lineCap='round';ctx.stroke();}ctx.restore();}
 function paint(){ctx.clearRect(0,0,w,h);ribbon(w*.24,h*.78,1,t*.16);ribbon(w*.19,h*.59,.72,t*.12+4);ribbon(w*.29,h*.38,.4,t*.1+2);ribbon(w*.28,h*.86,1.15,t*.13+1);count++;canvas.dataset.frames=String(count);}
 function tick(now){frame=0;if(document.hidden||reduced.matches)return;if(last)t+=Math.min((now-last)/1000,.05);last=now;paint();frame=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(frame);frame=0;last=0;if(document.hidden)return;paint();if(!reduced.matches)frame=requestAnimationFrame(tick);}
 window.addEventListener('resize',size);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);window.addEventListener('pagehide',function(){cancelAnimationFrame(frame);frame=0;last=0;});window.addEventListener('pageshow',sync);size();sync();
})();
