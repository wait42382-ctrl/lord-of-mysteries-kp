(function () {
  'use strict';
  const catalog=window.ARCHIVE_CATALOG, content=window.ARCHIVE_CONTENT, actors=window.ARCHIVE_ACTORS;
  const scroll=document.getElementById('reader-scroll'), main=document.getElementById('reader-content');
  const nav=document.getElementById('reader-chapters'), previous=document.getElementById('reader-previous');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let current=null, stack=[];
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const table=(headers,rows,cls)=>'<div class="record-table-wrap"><table class="'+(cls||'record-table')+'"><thead><tr>'+headers.map(x=>'<th scope="col">'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  function statSheet(a){
    let html='<section class="record-section actor-record" id="record-stats" tabindex="-1"><h3>数值档案</h3>';
    html+='<p class="actor-identity">'+esc(a.pathway?a.pathway.name+'途径 · 序列'+a.pathway.sequence+' '+a.pathway.sequenceName:a.kind==='phenomenon'?'污染现象':'普通人／污染受害者')+'</p>';
    if(a.attributes){
      const labels={STR:'力量',CON:'体质',SIZ:'体型',DEX:'敏捷',APP:'外貌',INT:'智力',POW:'意志',EDU:'教育'};
      const keys=Object.keys(labels);
      html+='<p class="table-reading">每项依次为普通／困难／极难；伤害另按攻击表。</p><table class="actor-attributes"><caption class="visually-hidden">八项百分制属性及成功阈值</caption><tbody>';
      for(let n=0;n<8;n+=4)html+='<tr>'+keys.slice(n,n+4).map(k=>'<td><span>'+labels[k]+' <small>'+k+'</small></span><strong>'+a.attributes[k]+'</strong><em>'+Math.floor(a.attributes[k]/2)+' / '+Math.floor(a.attributes[k]/5)+'</em></td>').join('')+'</tr>';
      html+='</tbody></table>';
      html+=table(['生命HP','理智SAN','灵感','移动MOV'],[[a.resources.hp,a.resources.san,a.resources.inspiration,a.combat.mov]],'record-table resource-table');
      html+=table(['伤害加值','体格','常态护甲','重伤门槛'],[[a.combat.damageBonus,a.combat.build,a.combat.armor,a.combat.majorWound+' HP']]);
      html+='<h4>攻击与防御</h4>'+table(['攻击','普通／困难／极难','伤害','限制'],a.attacks.map(r=>[r.name,r.value+' / '+Math.floor(r.value/2)+' / '+Math.floor(r.value/5),r.damage,r.note]));
      html+='<h4>主要技能</h4>'+table(['技能','普通','困难','极难'],a.skills.filter(r=>r.value>0).map(r=>[r.name,r.value,r.hard,r.extreme]));
      if(a.budget){html+='<details class="record-budget"><summary>基础属性与加点依据</summary><p>固定基础属性合计460；职业投入'+a.budget.occupation+'，兴趣投入'+a.budget.interest+'。晋升与专属面板已计入当前属性；不补发技能点或恢复SAN。</p>'+table(['基础属性','值'],Object.entries(a.base).map(([k,v])=>[k,v]))+table(['技能','基础','职业投入','兴趣投入'],a.allocations.map(r=>[r.name,r.base,r.occupation,r.interest]))+'</details>';}
    }
    html+='<p class="record-caution">'+esc(a.note)+'</p>';
    if(a.abilities.length){
      html+='<h4>途径主动能力</h4><p>已标注“替代”的高阶版本优先，不叠加已被替代的同类效果；下列费用均支付灵感。</p>';
      for(const ability of a.abilities)html+='<article class="record-ability"><header><h5>'+esc(ability.name)+'</h5><span>序列'+ability.sequence+' · '+ability.cost+' 灵感</span></header><p class="ability-line">'+esc([ability.check,ability.action,ability.range,ability.duration].join(' ｜ '))+'</p><p>'+esc(ability.rule||ability.desc)+'</p></article>';
    }
    return html+'</section>';
  }
  function sectionHTML(section,i){
    let html='<section class="record-section" id="record-'+i+'" tabindex="-1"><h3>'+esc(section.title)+'</h3>';
    if(section.quote)html+='<blockquote class="record-readaloud"><span>场景朗读</span><p>'+esc(section.quote)+'</p></blockquote>';
    html+=(section.paragraphs||[]).map(p=>'<p>'+esc(p)+'</p>').join('');
    if(section.bullets)html+='<ul>'+section.bullets.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
    if(section.table)html+=table(section.table.headers,section.table.rows);
    if(section.links)html+='<div class="record-links" aria-label="相关档案">'+section.links.map(l=>'<button type="button" data-reader-book="'+esc(l.book)+'">'+esc(l.label)+'</button>').join('')+'</div>';
    return html+'</section>';
  }
  function render(id){
    const book=catalog.books.find(b=>b.id===id), data=content[id];
    if(!book||!data)return;
    current=id;
    document.getElementById('reader-title').textContent=book.title;
    document.getElementById('reader-category').textContent=catalog.categories.find(c=>c.key===book.category).name;
    document.getElementById('reader-cover-category').textContent=catalog.categories.find(c=>c.key===book.category).name;
    document.getElementById('reader-cover-title').textContent=book.title;
    document.getElementById('reader-description').textContent=data.lead;
    const old=document.getElementById('reader-template');old.hidden=!book.link;
    if(book.link)old.href=book.link;
    main.innerHTML=data.sections.map(sectionHTML).join('')+(data.actor?statSheet(actors[data.actor]):'');
    const targets=data.sections.map((s,i)=>({title:s.title,id:'record-'+i}));
    if(data.actor)targets.push({title:'数值档案',id:'record-stats'});
    nav.innerHTML=targets.map((s,i)=>'<button type="button" data-reader-section="'+s.id+'"'+(i===0?' aria-current="location"':'')+'>'+esc(s.title)+'</button>').join('');
    previous.hidden=stack.length===0;
    scroll.scrollTop=0;nav.scrollTop=0;
  }
  function syncChapter(){
    const rect=scroll.getBoundingClientRect();let id='record-0';
    for(const el of main.querySelectorAll('.record-section'))if(el.getBoundingClientRect().top<=rect.top+90)id=el.id;
    nav.querySelectorAll('button').forEach(b=>{if(b.dataset.readerSection===id)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current');});
  }
  nav.addEventListener('click',e=>{
    const b=e.target.closest('[data-reader-section]');if(!b)return;
    const section=document.getElementById(b.dataset.readerSection);
    const top=section.offsetTop-scroll.offsetTop;
    scroll.scrollTo({top:Math.max(0,top-22),behavior:reduced.matches?'instant':'smooth'});
    section.focus({preventScroll:true});
  });
  main.addEventListener('click',e=>{
    const button=e.target.closest('[data-reader-book]');if(!button)return;
    stack.push({id:current,scroll:scroll.scrollTop,focus:button.dataset.readerBook});
    render(button.dataset.readerBook);document.getElementById('reader-title').focus({preventScroll:true});
  });
  previous.addEventListener('click',()=>{
    const old=stack.pop();if(!old)return;render(old.id);scroll.scrollTop=old.scroll;
    Array.from(main.querySelectorAll('[data-reader-book]')).find(b=>b.dataset.readerBook===old.focus)?.focus({preventScroll:true});
  });
  scroll.addEventListener('scroll',syncChapter,{passive:true});
  window.ArchiveReader={render,open(id){stack=[];render(id);},reset(){stack=[];current=null;}};
})();
