(function () {
  'use strict';
  const canvas = document.getElementById('archive-dust');
  const ctx = canvas && canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, raf = 0, previous = 0, lastDraw = 0;
  const dust = Array.from({length:220}, () => ({x:Math.random(),y:Math.random(),r:.4+Math.random()*1.2,s:.008+Math.random()*.012,a:.12+Math.random()*.4,red:Math.random()<.16}));
  function draw(delta) {
    ctx.clearRect(0,0,width,height);
    dust.forEach(p => {
      p.y -= delta*p.s;
      if (p.y < -.02) {p.y=1.02;p.x=Math.random();}
      const edge=Math.min(1,p.y*8,(1-p.y)*8);
      ctx.globalAlpha=p.a*Math.max(0,edge);
      ctx.fillStyle=p.red?'#bd6a80':'#d2d5df';
      ctx.beginPath();ctx.arc(p.x*width,p.y*height,p.r,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
  }
  function frame(time) {
    if (time-lastDraw>32) {draw(Math.min(.06,(time-(previous||time))/1000));previous=time;lastDraw=time;}
    raf=requestAnimationFrame(frame);
  }
  function state() {
    cancelAnimationFrame(raf);raf=0;previous=lastDraw=0;
    draw(0);
    if (!document.hidden && !reduced.matches) raf=requestAnimationFrame(frame);
  }
  function resize() {
    width=innerWidth;height=innerHeight;
    const dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);draw(0);
  }
  window.addEventListener('resize',resize);
  document.addEventListener('visibilitychange',state);
  reduced.addEventListener('change',state);
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0;});
  window.addEventListener('pageshow',state);
  resize();state();
})();
