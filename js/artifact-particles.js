(function(){
 'use strict';
 var d=window.ARTIFACT_PARTICLES,figure=document.querySelector('.artifact-exhibit'),portrait=document.getElementById('artifact-portrait'),canvas=document.getElementById('artifact-particle-canvas'),hit=document.getElementById('artifact-finger-hit'),hint=document.getElementById('artifact-particle-hint');
 if(!d||!figure||!portrait||!canvas||!hit||!hint)return;
 var ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),svgNS='http://www.w3.org/2000/svg';
 var phase='loading',ready=false,raf=0,frames=0,bounces=0,w=innerWidth,h=innerHeight,image={x:0,y:0,width:0,height:0,scale:1};
 var elapsed=0,last=0,positions=new Float32Array(d.count*2),targets=new Float32Array(d.count*2),velocity=new Float32Array(d.count*2),starts=new Float32Array(d.count*2),trails=new Float32Array(d.count*2),opacity=0;
 var speedMultiplier=1.5,sizeMultiplier=2.5,trailSegments=0,maxTrailLength=0;
 var palette=['#170f14','#4c0c1b','#961a32','#c93449','#e26068'];
 var repair=document.createElementNS(svgNS,'svg');repair.id='artifact-repair';repair.setAttribute('viewBox','0 0 '+d.width+' '+d.height);repair.setAttribute('aria-hidden','true');repair.innerHTML='<defs><filter id="finger-edge" x="-20%" y="-10%" width="140%" height="120%"><feGaussianBlur stdDeviation="2"/></filter><mask id="finger-only-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1536"><path d="'+d.outline+'" fill="white" stroke="white" stroke-width="34" filter="url(#finger-edge)"/></mask></defs><image href="assets/artifact-scenes/baiji-zhi-without-finger-v1.png" width="1024" height="1536" mask="url(#finger-only-mask)"/>';
 figure.insertBefore(repair,hit);
 var patchImage=new Image();patchImage.src='assets/artifact-scenes/baiji-zhi-without-finger-v1.png';
 var messages={loading:'',unavailable:'',photo:'双击手指，立即打散',particles:'点击展品区域，收回碎影',scattering:'点击展品区域或碎影，召回手指',regrouping:'碎影正在聚拢…',holding:'形体重现…',restoring:'封存如初…'};
 function state(next){phase=next;elapsed=0;figure.dataset.particleState=next;hint.textContent=messages[next];hit.setAttribute('aria-label',['scattering','particles'].includes(next)?'点击召回手指粒子':'双击打散拜祭之指');hit.setAttribute('aria-pressed',String(!['photo','loading','unavailable'].includes(next)));}
 function cover(value){repair.style.opacity=String(value);repair.dataset.visible=String(value>0);}
 function snap(){positions.set(targets);}
 function size(){
  var oldW=w,oldH=h;w=innerWidth;h=innerHeight;var pixelRatio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*pixelRatio);canvas.height=Math.round(h*pixelRatio);ctx&&ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);
  var r=portrait.getBoundingClientRect(),f=figure.getBoundingClientRect(),scale=Math.min(r.width/d.width,r.height/d.height);image={x:r.x+(r.width-d.width*scale)/2,y:r.y+(r.height-d.height*scale)/2,width:d.width*scale,height:d.height*scale,scale:scale};
  for(var i=0;i<d.count;i++){targets[i*2]=image.x+d.points[i*6]*scale;targets[i*2+1]=image.y+d.points[i*6+1]*scale;}
  if(['scattering','regrouping'].includes(phase)){for(var j=0;j<positions.length;j+=2){positions[j]*=w/oldW;positions[j+1]*=h/oldH;starts[j]*=w/oldW;starts[j+1]*=h/oldH;trails[j]*=w/oldW;trails[j+1]*=h/oldH;}}else{snap();trails.set(positions);}
  var box=d.bounds;hit.style.left=(image.x-f.x+box[0]*scale-3)+'px';hit.style.top=(image.y-f.y+box[1]*scale-3)+'px';hit.style.width=((box[2]-box[0])*scale+6)+'px';hit.style.height=((box[3]-box[1])*scale+6)+'px';
  // The clickable region follows the actual curved finger, rather than the glass.
  var path=repair.querySelector('mask path'),length=path.getTotalLength(),polygon=[];for(var n=0;n<110;n++){var pt=path.getPointAtLength(length*n/110);polygon.push(((pt.x-box[0])*scale+3)/((box[2]-box[0])*scale+6)*100+'% '+((pt.y-box[1])*scale+3)/((box[3]-box[1])*scale+6)*100+'%');}hit.style.clipPath='polygon('+polygon.join(',')+')';
  if(ctx&&!document.hidden)paint();
 }
 function paint(){
  if(!ctx)return;ctx.clearRect(0,0,w,h);frames++;trailSegments=0;maxTrailLength=0;if(opacity<=0)return;
  var moving=['scattering','regrouping'].includes(phase);ctx.lineCap='round';
  for(var i=0;i<d.count;i++){
   var k=i*6,j=i*2,seed=d.points[k+5],s=(.55+seed*.65)*sizeMultiplier,index=seed<.2?0:seed<.5?1:seed<.8?2:seed<.95?3:4,color=palette[index];ctx.fillStyle=color;
   if(moving){
    var dx=(trails[j]-positions[j])*6.4,dy=(trails[j+1]-positions[j+1])*6.4,length=Math.hypot(dx,dy);
    if(length>.25){var trim=Math.min(1,128/length);dx*=trim;dy*=trim;length*=trim;ctx.globalAlpha=opacity*(index===0?.22:.2);ctx.strokeStyle=index===0?'#64172a':color;ctx.lineWidth=Math.max(.65,s*.45);ctx.beginPath();ctx.moveTo(positions[j]+dx,positions[j+1]+dy);ctx.lineTo(positions[j],positions[j+1]);ctx.stroke();trailSegments++;maxTrailLength=Math.max(maxTrailLength,length);}
   }
   ctx.globalAlpha=opacity;ctx.beginPath();ctx.ellipse(positions[j],positions[j+1],s*.52,s*.78,0,0,Math.PI*2);ctx.fill();if(index===0){ctx.strokeStyle='#64172a';ctx.lineWidth=.5;ctx.stroke();}
  }ctx.globalAlpha=1;
 }
 function stop(){cancelAnimationFrame(raf);raf=0;last=0;}
 function reset(){stop();opacity=0;cover(0);if(ready)state('photo');snap();trails.set(positions);paint();}
 function smooth(t){return t*t*(3-2*t);}
 function animate(now){
  raf=0;if(document.hidden)return;
  var dt=last?Math.min((now-last)/1000,.05):0;last=now;elapsed+=dt;var u,i,j;
  if(phase==='scattering'){
   trails.set(positions);
   for(i=0;i<d.count;i++){j=i*2;var angle=Math.sin(d.points[i*6+5]*20+elapsed*9)*dt*4,c=Math.cos(angle),s=Math.sin(angle),vx=velocity[j],vy=velocity[j+1];velocity[j]=vx*c-vy*s;velocity[j+1]=vx*s+vy*c;positions[j]+=velocity[j]*dt;positions[j+1]+=velocity[j+1]*dt;if(positions[j]<2||positions[j]>w-3){positions[j]=Math.max(2,Math.min(w-3,positions[j]));velocity[j]*=-1;bounces++;}if(positions[j+1]<2||positions[j+1]>h-3){positions[j+1]=Math.max(2,Math.min(h-3,positions[j+1]));velocity[j+1]*=-1;bounces++;}}
  }else if(phase==='regrouping'){
   trails.set(positions);u=Math.min(1,elapsed/1.2);var blend=smooth(u);for(i=0;i<positions.length;i++)positions[i]=starts[i]+(targets[i]-starts[i])*blend;if(u===1){snap();state('holding');}
  }else if(phase==='holding'){if(elapsed>=.35)state('restoring');}
  else if(phase==='restoring'){u=Math.min(1,elapsed/.65);opacity=1-smooth(u);cover(opacity);if(u===1){reset();return;}}
  paint();if(['scattering','regrouping','holding','restoring'].includes(phase))raf=requestAnimationFrame(animate);
 }
 function run(){stop();raf=requestAnimationFrame(animate);}
 function recall(){if(!ready||document.hidden||document.documentElement.dataset.sceneTransition!=='idle'||!['scattering','particles'].includes(phase))return;if(reduced.matches){reset();return;}starts.set(positions);state('regrouping');run();}
 function activate(){
  if(!ready||document.hidden||document.documentElement.dataset.sceneTransition!=='idle')return;
  if(['scattering','particles'].includes(phase)){recall();return;}if(phase!=='photo')return;
  size();snap();trails.set(positions);opacity=1;cover(1);
  if(reduced.matches){state('particles');paint();return;}
  bounces=0;for(var i=0;i<d.count;i++){var seed=d.points[i*6+5],angle=seed*Math.PI*2,speed=(620+((i*79)%401))*speedMultiplier;velocity[i*2]=Math.cos(angle)*speed;velocity[i*2+1]=Math.sin(angle)*speed;}
  state('scattering');paint();run();
 }
 function inspect(){var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity,minSpeed=Infinity,maxSpeed=0;for(var i=0;i<positions.length;i+=2){minX=Math.min(minX,positions[i]);minY=Math.min(minY,positions[i+1]);maxX=Math.max(maxX,positions[i]);maxY=Math.max(maxY,positions[i+1]);var speed=Math.hypot(velocity[i],velocity[i+1]);minSpeed=Math.min(minSpeed,speed);maxSpeed=Math.max(maxSpeed,speed);}return {phase:phase,ready:ready,count:d.count,frames:frames,bounces:bounces,active:!!raf,headShape:'ellipse',palette:palette.slice(),speedRange:{min:minSpeed,max:maxSpeed},sizeRange:{min:.55*sizeMultiplier,max:1.2*sizeMultiplier},trailSegments:trailSegments,maxTrailLength:maxTrailLength,image:Object.assign({},image),extents:{minX:minX,minY:minY,maxX:maxX,maxY:maxY}};}
 window.ArtifactParticles={inspect:inspect};
 // Decoding may finish during the exhibit's opening transform. Re-measure its
 // resting geometry after the shared transition removes that temporary transform.
 new MutationObserver(function(){if(ready&&document.documentElement.dataset.sceneTransition==='idle')size();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-scene-transition']});
 hit.addEventListener('click',function(e){if(['scattering','particles'].includes(phase))recall();else if(e.detail===0)activate();});hit.addEventListener('dblclick',function(e){e.preventDefault();activate();});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!['photo','loading','unavailable'].includes(phase)){e.preventDefault();reset();}});
 document.addEventListener('click',function(e){if(phase!=='scattering'||e.defaultPrevented||e.target.closest('a,button,input,select,textarea,summary,.artifact-document,.artifact-header,.artifact-footer'))return;for(var i=0;i<positions.length;i+=2)if(Math.hypot(positions[i]-e.clientX,positions[i+1]-e.clientY)<16){recall();break;}});
 window.addEventListener('resize',size);window.addEventListener('scroll',size,{passive:true});document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else if(ready){size();if(['scattering','regrouping','holding','restoring'].includes(phase)&&!reduced.matches)run();}});reduced.addEventListener('change',function(){if(['scattering','particles'].includes(phase)){stop();if(!document.hidden)paint();if(!reduced.matches&&phase==='scattering'&&!document.hidden)run();}else reset();});window.addEventListener('scene-transition-start',reset);window.addEventListener('pagehide',reset);window.addEventListener('pageshow',function(){if(ready){size();reset();}});
 state('loading');hit.hidden=true;cover(0);
 Promise.all([portrait.decode(),patchImage.decode()]).then(function(){if(!ctx)throw Error('Canvas unavailable');ready=true;size();hit.hidden=false;state('photo');}).catch(function(){ready=false;stop();state('unavailable');hit.hidden=true;cover(0);});
})();
