var Keeper = (function () {
  'use strict';
  var $ = function (id) {return document.getElementById(id);};
  var main=$('keeper-main'), reduced=matchMedia('(prefers-reduced-motion: reduce)'), renderer=KeeperDice.create($('dice-canvas'));
  var view='', pending=null, lastCheck=null, lastExpression=null, decodeFrame=0, decodeFinish=null,omenAnimation=null,omenTimer=0,omenGeneration=0;
  var storedHistory=KeeperEngine.read('lom-keeper-rolls',[]);
  var records=Array.isArray(storedHistory)?storedHistory.filter(function(r){return r&&typeof r.label==='string'&&typeof r.detail==='string'&&Number.isFinite(r.value)&&Number.isFinite(r.time);}).slice(0,60):[];
  var savedResults={};
  var tables={
    whispers:{title:'呓语',english:'Whispers beyond the veil',caption:'聆听灰雾背后的声音',description:'受呓语影响时，揭示此刻听见的低语。',hint:'保留全部呓语，供守秘人随时查阅。',button:'揭示呓语',items:RANDOM_TABLES.whispers},
    control:{title:'失控表现',english:'The unraveling',caption:'当理智不再回应',description:'确认角色已经失控后，抽取具体表现。',hint:'此处抽取表现，不自动判定是否失控。',button:'揭示失控表现',items:RANDOM_TABLES.lossOfControl}
  };
  function historyRender(){
    $('roll-history').replaceChildren();
    records.forEach(function(record){
      var li=document.createElement('li'),text=document.createElement('span'),small=document.createElement('small'),value=document.createElement('b');
      text.textContent=record.label;small.textContent=new Date(record.time).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false})+'  '+record.detail;
      text.append(small);value.textContent=record.value;li.append(text,value);$('roll-history').append(li);
    });
    $('history-count').textContent=records.length+' 次';$('history-empty').hidden=records.length>0;
  }
  function record(value,label,detail){records.unshift({value:value,label:label,detail:detail,time:Date.now()});records=records.slice(0,60);KeeperEngine.save('lom-keeper-rolls',records);historyRender();}
  function lockDice(locked){document.querySelectorAll('.dice-controls fieldset').forEach(function(f){f.disabled=locked;});}
  function clearOmen(){omenGeneration++;if(omenAnimation){omenAnimation.cancel();omenAnimation=null;}clearTimeout(omenTimer);omenTimer=0;$('dice-omen').hidden=true;}
  function revealOmen(value){
    clearOmen();if(view!=='dice'||document.hidden)return;
    var el=$('dice-omen'),generation=omenGeneration;el.textContent=value===1?'大成功':'大失败';el.dataset.kind=value===1?'success':'failure';el.hidden=false;
    if(reduced.matches){omenTimer=setTimeout(clearOmen,1400);return;}
    omenAnimation=el.animate([
      {opacity:0,filter:'blur(12px)',transform:'translateY(12px) scale(1.025)',offset:0},
      {opacity:1,filter:'blur(0px)',transform:'translateY(0) scale(1)',offset:.30},
      {opacity:1,filter:'blur(0px)',transform:'translateY(0) scale(1)',offset:.76},
      {opacity:0,filter:'blur(6px)',transform:'translateY(-7px) scale(.995)',offset:1}
    ],{duration:2200,easing:'ease-out',fill:'both'});
    omenAnimation.finished.then(function(){if(generation===omenGeneration)clearOmen();}).catch(function(){});
  }
  function settleDice(){
    if(!pending)return;
    var result=pending;pending=null;lockDice(false);$('dice-stage').dataset.state='settled';
    var extreme=result.percent&&(result.value===1||result.value===100);
    $('dice-total').textContent=String(result.value).padStart(result.percent?3:1,'0');$('dice-scale').hidden=!result.percent;
    $('dice-grade').textContent=extreme?(result.value===1?'大成功':'大失败'):result.grade;
    document.querySelector('.dice-reading').dataset.grade=extreme?(result.value===1?'crit':'fumble'):result.gradeKey||'';
    $('dice-stage').setAttribute('aria-label','骰子已落定：'+result.value+'，'+result.grade+'。'+result.detail);
    record(result.value,result.label,result.detail);
    if(extreme)revealOmen(result.value);
  }
  function launchDice(dice,result){
    if(pending)return;
    clearOmen();pending=result;$('dice-error').textContent='';lockDice(true);$('dice-stage').dataset.state='rolling';
    $('dice-total').textContent='…';$('dice-grade').textContent='骰子翻滚中';$('dice-scale').hidden=!result.percent;
    document.querySelector('.dice-reading').dataset.grade='';$('dice-stage').setAttribute('aria-label','骰子翻滚中');
    if(reduced.matches||document.hidden){renderer.set(dice);settleDice();}else renderer.play(dice,settleDice);
  }
  function rollCheck(event){
    event.preventDefault();if(pending)return;
    var target=Number($('dice-target').value),bonus=Number($('dice-bonus').value);
    if(!Number.isInteger(target)||target<1||target>100){$('dice-error').textContent='目标值请输入 1～100 的整数。';return;}
    var result=Dice.check(target,bonus>0?{bonus:bonus}:{penalty:-bonus});lastCheck=result;
    var detail='十位 ['+result.tens.map(function(t){return String(t*10).padStart(2,'0');}).join('，')+']，取 '+String(result.chosen*10).padStart(2,'0')+'；个位 '+result.unit+'。';
    if(result.result===100)detail+='00 视为 100。';
    launchDice(KeeperEngine.checkDice(result),{value:result.result,percent:true,grade:Dice.GRADE_TEXT[result.grade],gradeKey:result.grade,label:'d100 检定 · 目标 '+target+(bonus>0?' · '+bonus+' 奖励骰':bonus<0?' · '+(-bonus)+' 惩罚骰':''),detail:detail+' '+Dice.GRADE_TEXT[result.grade]});
  }
  function expression(source){
    if(pending)return;
    try{
      var result=KeeperEngine.expression(source);lastExpression=result;
      var dice=[];
      result.dice.forEach(function(d){
        if(d.sides===100){var number=d.value===100?0:d.value;dice.push({sides:10,value:Math.floor(number/10),role:'tens',chosen:true},{sides:10,value:number%10,role:'unit',chosen:true});}
        else dice.push(d);
      });
      var detail='['+result.rolls.join('，')+']'+(result.mod?' '+(result.mod>0?'+':'')+result.mod:'')+' = '+result.total;
      var percentile=result.dice.length===1&&result.dice[0].sides===100&&result.dice[0].sign===1&&result.mod===0;
      launchDice(dice,{value:result.total,percent:percentile,grade:result.expr,gradeKey:'',label:result.expr,detail:detail});
    }catch(error){$('dice-error').textContent=error.message;}
  }
  function stopDecode(){if(decodeFinish)decodeFinish();}
  function decode(text,done){
    stopDecode();var el=$('table-result'),readable=$('table-result-readable'),chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*+-=<>?{}[]:;~^_|';
    if(reduced.matches||document.hidden){el.textContent=text;el.dataset.state='settled';readable.textContent=text;if(done)done();return;}
    var original=document.createElement('span'),visual=document.createElement('span');original.textContent=text;original.style.opacity='0';original.setAttribute('aria-hidden','true');
    visual.style.cssText='position:absolute;inset:0;overflow:hidden';visual.setAttribute('aria-hidden','true');el.style.position='relative';el.replaceChildren(original,visual);el.dataset.state='decoding';readable.textContent='';
    var began=performance.now(),last=-1,finished=false;
    function finish(){if(finished)return;finished=true;cancelAnimationFrame(decodeFrame);decodeFrame=0;decodeFinish=null;el.textContent=text;el.dataset.state='settled';readable.textContent=text;if(done)done();}
    decodeFinish=finish;
    function tick(now){
      var elapsed=(now-began)*1.3,step=Math.floor(elapsed/45);
      if(elapsed>=1700){finish();return;}
      if(step!==last){last=step;var count=Math.min(text.length,Math.floor(elapsed/550*text.length)),resolved=Math.max(0,Math.floor((elapsed-700)/1000*text.length));
        visual.textContent=Array.from(text).map(function(c,i){if(i<resolved)return c;if(i>=count)return '';return chars[(Math.random()*chars.length)|0];}).join('');
      }
      decodeFrame=requestAnimationFrame(tick);
    }
    decodeFrame=requestAnimationFrame(tick);
  }
  function tableRender(kind){
    var table=tables[kind],saved=savedResults[kind];
    $('table-heading').textContent=table.title;$('table-kicker').textContent=table.english;$('table-art-english').textContent=table.english;$('table-art-caption').textContent=table.caption;
    $('table-art').style.backgroundImage='url("assets/keeper-scenes/'+kind+'.png")';$('table-description').textContent=table.description;$('table-count').textContent=table.items.length+' 条';$('table-hint').textContent=table.hint;
    $('table-draw-label').textContent=table.button;$('table-draw').disabled=false;$('table-result').setAttribute('aria-live','off');$('table-result').textContent=saved?table.items[saved.index]:'等待揭示';$('table-result').dataset.state=saved?'settled':'idle';
    $('table-result-readable').textContent=saved?table.items[saved.index]:'';$('table-result-number').textContent=saved?String(saved.index+1).padStart(2,'0')+' / '+table.items.length:'—';
    $('table-list').replaceChildren();table.items.forEach(function(item,index){var li=document.createElement('li');li.textContent=item;if(saved&&saved.index===index)li.className='is-selected';$('table-list').append(li);});
    $('table-list').hidden=true;$('show-all').setAttribute('aria-expanded','false');$('show-all').textContent='查看全部 '+table.items.length+' 条';
  }
  function drawTable(){
    var kind=view,table=tables[kind];if(!table||decodeFinish)return;
    var index=Math.floor(Math.random()*table.items.length);savedResults[kind]={index:index};$('table-result-number').textContent=String(index+1).padStart(2,'0')+' / '+table.items.length;
    Array.from($('table-list').children).forEach(function(li,i){li.classList.toggle('is-selected',i===index);});$('table-draw').disabled=true;
    decode(table.items[index],function(){$('table-draw').disabled=false;});
  }
  function route(){
    var next=location.hash.slice(1);if(!['dice','whispers','control'].includes(next))next='overview';
    if(next===view)return;
    renderer.finish();settleDice();stopDecode();clearOmen();view=next;main.dataset.view=view;
    $('keeper-overview').hidden=view!=='overview';$('keeper-dice').hidden=view!=='dice';$('keeper-table').hidden=!tables[view];document.querySelector('.detail-toolbar').hidden=view==='overview';
    document.querySelectorAll('.detail-toolbar nav a').forEach(function(a){if(a.hash==='#'+view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    if(tables[view])tableRender(view);
    if(view==='dice')requestAnimationFrame(function(){renderer.resize();});
    document.title=(tables[view]?tables[view].title:view==='dice'?'掷骰与检定':'裁定台')+' · 诡秘之主';
    if(innerWidth<=760)window.scrollTo({top:0,behavior:'instant'});
    if(view!=='overview')requestAnimationFrame(function(){(view==='dice'?$('dice-heading'):$('table-heading')).focus({preventScroll:true});});
    else if(main.dataset.previous){var portal=document.querySelector('.keeper-portal[href="#'+main.dataset.previous+'"]');if(portal)portal.focus({preventScroll:true});}
    if(view!=='overview')main.dataset.previous=view;
    window.dispatchEvent(new CustomEvent('keeper-viewchange',{detail:view}));
  }
  $('check-form').addEventListener('submit',rollCheck);
  $('expression-form').addEventListener('submit',function(event){event.preventDefault();expression($('dice-expression').value);});
  document.querySelectorAll('[data-quick]').forEach(function(button){button.addEventListener('click',function(){expression(button.dataset.quick);});});
  $('table-draw').addEventListener('click',drawTable);
  $('show-all').addEventListener('click',function(){
    var expanded=$('table-list').hidden;$('table-list').hidden=!expanded;$('show-all').setAttribute('aria-expanded',String(expanded));$('show-all').textContent=expanded?'收起全部':'查看全部 '+tables[view].items.length+' 条';
    if(expanded&&innerWidth>760){var reading=document.querySelector('.table-reading');reading.scrollTo({top:Math.max(0,$('table-list').offsetTop-70),behavior:reduced.matches?'instant':'smooth'});}
  });
  var act=String(KeeperEngine.read('lom-keeper-current-act','1'));if(!['1','2','3','4'].includes(act))act='1';$('current-act').value=act;
  function currentAct(){KeeperEngine.save('lom-keeper-current-act',$('current-act').value);$('current-story').href='chronicle.html#act-'+$('current-act').value;}
  $('current-act').addEventListener('change',currentAct);currentAct();
  window.addEventListener('hashchange',route);
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&view!=='overview'&&!event.defaultPrevented)location.hash='overview';});
  function finishActive(){renderer.finish();settleDice();stopDecode();clearOmen();}
  document.addEventListener('visibilitychange',function(){if(document.hidden)finishActive();});
  reduced.addEventListener('change',function(){if(reduced.matches)finishActive();});
  window.addEventListener('pagehide',finishActive);window.addEventListener('scene-transition-start',finishActive);
  renderer.set([{sides:10,value:0,role:'tens',chosen:true},{sides:10,value:0,role:'unit',chosen:true}]);historyRender();route();
  return {inspect:function(){return {view:view,pending:!!pending,lastCheck:lastCheck,lastExpression:lastExpression,dice:renderer.inspect(),records:records.slice()};}};
})();
