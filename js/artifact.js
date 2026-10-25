(function(){
 'use strict';
 var a=window.ARTIFACT,reading=document.getElementById('artifact-reading');if(!a||!reading)return;
 function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function p(v,cls){return '<p'+(cls?' class="'+cls+'"':'')+'>'+esc(v)+'</p>';}
 function identity(v,label){return '<div><small>'+label+'</small><b>'+esc(v.name)+'</b>'+p('序列'+v.sequence+' · '+v.sequenceName+' · '+v.dangerLevel+'级')+'</div>';}
 var appearanceNarration=[
  '你们首先看见的是一只窄而高的玻璃罩。圆拱形的罩顶向上收拢，弧面将周围的光拉成几道细长的冷亮，罩内的东西被这些反光隔在更深的阴影里。它被安置在一方厚实的深酒红色呢绒垫上，边缘隆起，绒毛细密而蓬松，随着光线的角度泛出深浅不同的红。一圈金丝沿垫缘绣出繁复的纹路，转角与缝线都收束得极为精细，像是专为某件贵重藏品准备的陈设。',
  '玻璃罩扣住的那一圈，绒面的质地却发生了变化。罩外的软绒仍饱满地拥簇着，罩内却向中央沉下去，形成一片暗红近黑的凹陷。血已经浸进了织物深处，细密的绒毛一缕缕黏合、倒伏，边缘凝着发乌的硬痂；有些地方仍留着沉暗的湿光，有些地方已经干瘪发硬，像一块反复浸透又阴干的旧布。金丝从这片暗色旁绕过，偶尔闪出一点微光，将血渍的边界衬得格外清楚。',
  '一根手指就竖直插在这片凹陷的中央。它没有露出断口，根部深陷在浸血的绒面里，仿佛被那团僵硬的织物紧紧攥住。指身通体发黑，干枯的皮肉紧贴着骨节，细密的褶皱沿着关节层层积起，表面的暗纹使它看上去像一截被保存了很久的枯枝。向上看，指甲长得异乎寻常，沿着指尖伸出，尖端微微弯曲；甲面只在侧光下显出一线钝亮，其余部分都沉在黑色里。',
  '指甲与皮肉相接的缝隙里，积着一丝极细的暗红。那道颜色顺着甲缘蜿蜒，到了侧面便收成几处凝固的血渍，深处几乎与黑色的皮肤融为一体。你们再看向整件藏品：蓬松的软垫托住玻璃罩，金丝环抱着浸血的凹陷，而那根干枯的手指始终笔直地立在中心。几缕细线般的黑雾绕过它的轮廓，玻璃上的冷光又将那些细节切碎。隔着这一层透明的弧面，每一道皱褶、每一处暗渍都近得清晰，罩内却仍显得幽深。'
 ];
 reading.innerHTML='<section id="appearance" tabindex="-1"><h2>初见与外观</h2><div class="artifact-description">'+appearanceNarration.map(function(v){return p(v);}).join('')+'</div></section>'+
 '<section id="influence" tabindex="-1"><h2>接近后的影响</h2>'+p('范围内持续暴露的影响，供 KP 现场裁定。','influence-intro')+'<ul class="influence-list"><li><b>5<small>m</small></b><span>'+esc(a.effects[0].desc)+'</span></li><li><b>＞6<small>h</small></b><span>'+esc(a.effects[1].desc)+'</span></li><li><b>离开后</b><span>'+esc(a.effects[3].desc)+'</span></li></ul>'+p(a.effects[2].desc+' '+a.effects[4].desc,'influence-note')+'</section>'+
 '<section id="identity" tabindex="-1"><h2>封存档案</h2><div class="identity-columns">'+identity(a.surface,'表面信息 · 错误')+identity(a.truth,'真实信息')+'</div>'+p('非官方封印物 · 无编号 · 罪犯途径','artifact-facts')+'<h3>本质与隐藏线</h3>'+p(a.essence)+p(a.hiddenLine)+'<h3>外观</h3>'+p(a.appearance)+'</section>'+
 '<section id="effects" tabindex="-1"><h2>效果与使用后果</h2><ol class="artifact-effects-list">'+a.effects.map(function(e){return '<li><h3>'+esc(e.name)+'</h3>'+p(e.desc)+'</li>';}).join('')+'</ol></section>'+
 '<section id="suppression" tabindex="-1"><h2>抑制与裁定</h2>'+p(a.suppression.method)+'<table class="suppression-table"><thead><tr><th scope="col">太阳途径序列</th><th scope="col">有效时长</th></tr></thead><tbody>'+a.suppression.durationBySequence.map(function(d){return '<tr><td>序列 '+d.sequence+'</td><td>'+esc(d.duration)+'</td></tr>';}).join('')+'</tbody></table>'+p(a.suppression.defaultNote,'artifact-rule-note')+p(a.suppression.otherPathwayBlood)+'<h3>呓语检定</h3>'+p(a.whisperCheck.rule)+p('灵性强弱由 KP 对照下表裁定，不自动扣除角色数值。','artifact-rule-note')+'<details><summary>「灵性弱」名单</summary><ul>'+a.spiritWeak.map(function(w){return '<li>序列'+w.sequence+'：'+esc(w.pathways)+'</li>';}).join('')+'</ul></details><details><summary>剧情钩子</summary><ul>'+a.hooks.map(function(h){return '<li>'+esc(h)+'</li>';}).join('')+'</ul></details></section>';
 var links=Array.from(document.querySelectorAll('.artifact-sections a')),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function active(id){links.forEach(function(l){if(l.hash==='#'+id)l.setAttribute('aria-current','location');else l.removeAttribute('aria-current');});}
 function go(id,focus){var section=document.getElementById(id);if(!section||section.parentNode!==reading)return;active(id);if(focus)section.focus({preventScroll:true});reading.scrollTo({top:Math.max(0,section.offsetTop-reading.offsetTop-8),behavior:reduced.matches?'instant':'smooth'});}
 links.forEach(function(l){l.addEventListener('click',function(e){if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();history.pushState(null,'',l.hash);go(l.hash.slice(1),true);});});
 window.addEventListener('hashchange',function(){go(location.hash.slice(1)||'appearance',false);});
 reading.addEventListener('scroll',function(){var top=reading.getBoundingClientRect().top;var current='appearance';Array.from(reading.children).forEach(function(s){if(s.getBoundingClientRect().top<=top+70)current=s.id;});active(current);},{passive:true});
 if(location.hash)requestAnimationFrame(function(){go(location.hash.slice(1),false);});
})();
