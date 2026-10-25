(function () {
  'use strict';
  var root = document.getElementById('chronicle-main');
  var carousel = document.getElementById('chronicle-carousel');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var acts = window.STORY.acts;
  var images = ['act-01-residence.png', 'act-02-auction-day-night.png', 'act-03-mansion.png', 'act-04-garden-ritual.png'];
  var places = ['受害者住所', '拍卖会所', '富商宅邸', '庄园花园'];
  var english = ['The First Trace', 'Behind Closed Doors', 'A House of Desire', 'The Final Rite'];
  var state = { id: 0, detail: false }, motion = [0, 0, 0, 0], frame = 0;
  var motionTarget = [0, 0, 0, 0], motionTime = 0;
  var map = null, zoom = 1, pan = { x: 0, y: 0 }, drag = null, suppressClick = false;
  var information = document.getElementById('chapter-information');
  var mapStage = document.getElementById('map-stage');
  var back = document.getElementById('chapter-back');
  var detail = document.getElementById('chapter-detail');
  var overview = document.getElementById('chapter-overview');
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var number = function (n) { return String(n).padStart(2, '0'); };
  var byId = function (id) { return document.getElementById(id); };
  function route() {
    var m = /^#act-([1-4])(\/details)?$/.exec(location.hash);
    return { id: m ? Number(m[1]) : 1, detail: !!(m && m[2]) };
  }
  function go(id, showDetail) {
    location.hash = 'act-' + (((id - 1 + 4) % 4) + 1) + (showDetail ? '/details' : '');
  }
  function paintMotion(values) {
    motion = values;
    carousel.dataset.motionX = values[0].toFixed(4);
    carousel.dataset.motionY = values[1].toFixed(4);
    carousel.style.transform = 'perspective(2000px) translate3d(' + values[0] + 'px,' + values[1] + 'px,0) rotateY(' + values[2] + 'deg) rotateX(' + values[3] + 'deg)';
  }
  function animateMotion(target, instant) {
    motionTarget = target;
    if (instant || reduced.matches) {
      cancelAnimationFrame(frame); frame = 0; motionTime = 0; paintMotion(target); return;
    }
    if (!frame) { motionTime = performance.now(); frame = requestAnimationFrame(tickMotion); }
  }
  function tickMotion(now) {
    var dt = Math.min(64, Math.max(0, now - motionTime)); motionTime = now;
    var alpha = 1 - Math.exp(-dt / 65);
    var next = motion.map(function (v, i) { return v + (motionTarget[i] - v) * alpha; });
    var settled = next.every(function (v, i) { return Math.abs(motionTarget[i] - v) < .001; });
    paintMotion(settled ? motionTarget.slice() : next);
    frame = settled ? 0 : requestAnimationFrame(tickMotion);
  }
  root.addEventListener('pointermove', function (e) {
    if (state.detail || reduced.matches || document.hidden || document.documentElement.dataset.sceneTransition === 'leaving') return;
    // Preserve the reference geometry; input only changes the target of one continuous frame loop.
    animateMotion([(e.clientX - innerWidth / 2) * .12, (e.clientY - innerHeight / 2) * .12, 20 * e.clientX / innerWidth - 10, 10 - 20 * e.clientY / innerHeight]);
  });
  root.addEventListener('pointerleave', function () { animateMotion([0, 0, 0, 0]); });
  reduced.addEventListener('change', function () { animateMotion([0, 0, 0, 0], true); });
  window.addEventListener('scene-transition-start', function () { animateMotion([0, 0, 0, 0], true); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) animateMotion([0, 0, 0, 0], true); });
  window.addEventListener('resize', function () { animateMotion([0, 0, 0, 0], true); });

  byId('chapter-overview').querySelector('.chapter-nav').innerHTML = acts.map(function (act, i) {
    return '<button type="button" data-act="' + act.id + '" aria-current="false"><small>' + number(act.id) + '</small><span>' + esc(act.title) + '<em>' + places[i] + '</em></span></button>';
  }).join('');
  carousel.querySelector('.chapter-slides').innerHTML = acts.map(function (act, i) {
    return '<a class="chapter-slide" data-act="' + act.id + '" data-position="hidden" href="#act-' + act.id + '/details" aria-label="进入第' + act.id + '幕：' + esc(act.title) + '"><img src="assets/story-scenes/' + images[i] + '" alt="' + places[i] + (i === 1 ? '，左侧白天闭门，右侧夜间迎客' : '') + '" width="1672" height="941" draggable="false"></a>';
  }).join('');
  carousel.querySelector('.chapter-dots').innerHTML = acts.map(function (act) {
    return '<button class="chapter-dot" type="button" data-act="' + act.id + '" aria-current="false" aria-label="选择第' + act.id + '幕"></button>';
  }).join('');
  document.querySelectorAll('.chapter-nav button,.chapter-dot').forEach(function (el) {
    el.addEventListener('click', function () { go(Number(el.dataset.act), false); });
  });
  document.querySelectorAll('.chapter-arrow').forEach(function (el) {
    el.addEventListener('click', function () { go(route().id + Number(el.dataset.step), false); });
  });
  document.querySelectorAll('.chapter-slide').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      if (el.dataset.position !== 'current') { e.preventDefault(); go(Number(el.dataset.act), false); }
    });
  });
  back.addEventListener('click', function () { go(state.id, false); });
  document.querySelector('.chapter-nav').addEventListener('keydown', function (e) {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    var id = e.key === 'Home' ? 1 : e.key === 'End' ? 4 : ((route().id - 1 + (e.key === 'ArrowDown' ? 1 : -1) + 4) % 4) + 1;
    go(id, false); document.querySelector('.chapter-nav button[data-act="' + id + '"]').focus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.target.matches('input,textarea,select')) return;
    if (e.key === 'Escape' && state.detail) { e.preventDefault(); go(state.id, false); }
    if (!state.detail && !e.target.closest('.chapter-nav') && ['ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault(); go(route().id + (e.key === 'ArrowRight' ? 1 : -1), false);
    }
  });

  function section(title, body, order, className) {
    return '<section class="story-section ' + (className || '') + '" style="--order:' + order + '"><h2>' + esc(title) + '</h2>' + body + '</section>';
  }
  function renderStory(act) {
    var order = 0;
    var quick = '<ul>' + act.clues.map(function (clue, i) {
      var source = map && map.rooms.find(function (r) { return (r.clues || []).includes(i); });
      return '<li id="clue-' + i + '">' + (source ? '<button type="button" class="story-room-link" data-room-link="' + esc(source.id) + '">' + esc(clue) + '</button>' : esc(clue)) + '</li>';
    }).join('') + '</ul>';
    quick += (act.rooms || []).filter(function(r) { return act.clueRooms.includes(r.id); }).map(function(r) {
      return '<div class="story-clue-brief"><h3><button type="button" class="story-room-link" data-room-link="' + esc(r.id) + '">' + esc(r.name) + '</button></h3><p><b>位置</b>　' + esc(r.where) + '</p><p><b>发现与推进</b>　' + esc(r.discovery) + '</p></div>';
    }).join('');
    var html = section('线索与房间速查', quick, order++);
    html += section(act.title, '<p class="story-location">' + esc(act.location) + '</p><p class="story-summary">' + esc(act.summary) + '</p><p>' + esc(act.knowledge) + '</p><blockquote class="story-readaloud">' + esc(act.opening) + '</blockquote>', order++);
    if (act.visits) html += section('同一地点，两种来访', act.visits.map(function(v) { return '<div class="story-time"><h3>' + esc(v.title) + '</h3><p>' + esc(v.description) + '</p></div>'; }).join(''), order++);
    if (act.id === 1) html += section('委托档案', '<p>' + esc(window.STORY.hook) + '</p><p class="story-secret">守秘人保密信息，不在开场朗读：' + esc(window.STORY.evilGod) + '</p><p>主舞台：' + esc(window.STORY.mainStage) + '</p><p class="story-secret">后续隐藏线：' + window.STORY.sideStages.map(esc).join(' ／ ') + '</p>', order++);
    html += section('逐室描述与物品', (act.rooms || []).map(function(r) {
      return '<div class="story-room-reading"><h3><button type="button" class="story-room-link" data-room-link="' + esc(r.id) + '">' + esc(r.name) + '</button></h3><blockquote class="story-readaloud">' + esc(r.readaloud) + '</blockquote><p><b>可见物</b>　' + esc(r.contents) + '</p><p><b>演绎与推进</b>　' + esc(r.leadsTo) + '</p></div>';
    }).join(''), order++);
    (act.beats || []).forEach(function(beat) { if(act.id===2 && beat.title==='同一地点，两种来访')return; html += section(beat.title, beat.paragraphs.map(function(p) { return '<p>' + esc(p) + '</p>'; }).join(''), order++); });
    if (act.npcs && act.npcs.length) html += section('人物与隐情', act.npcs.map(function (key) {
      var n = (window.NPCS || []).find(function (entry) { return entry.key === key; });
      if (!n) return '<p>' + esc(key) + '</p>';
      return '<div class="story-person"><strong>' + esc(n.name) + '</strong><small>' + esc(n.role) + '</small><p class="story-portrayal">' + esc(n.portrayal || n.desc) + '</p><p>' + esc(n.motivation) + '</p><ul>' + n.knows.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul><p class="story-secret">隐情：' + esc(n.secrets) + '</p></div>';
    }).join(''), order++);
    html += section('检定与后果', act.checks.map(function (check) {
      return '<div class="story-check"><strong>' + esc(check.skill) + '</strong><p class="check-roll">' + esc(check.roll) + '</p><p><b>成功</b>　' + esc(check.success) + '</p><p><b>失败</b>　' + esc(check.fail) + '</p></div>';
    }).join(''), order++);
    if (act.enemies && act.enemies.length) html += section('可能面对的敌人', '<ul>' + act.enemies.map(function (key) {
      var enemy = (window.ENEMIES || []).find(function (entry) { return entry.key === key; });
      return '<li>' + esc(enemy ? enemy.name + ' · ' + enemy.category : key) + '</li>';
    }).join('') + '</ul><a class="story-event-link" href="archives.html">前往档案目录查阅怪物档案</a>', order++);
    if (act.decision) html += section('抉择', '<p>' + esc(act.decision) + '</p>', order++);
    if (act.endings) html += section('可能的结局', act.endings.map(function (ending) { return '<p class="story-ending">' + esc(ending) + '</p>'; }).join(''), order++);
    if (act.transition) html += section('衔接', '<p>' + esc(act.transition) + '</p>', order++);
    if (act.randomEvents) {
      var eventPath = act.randomEvents.split('.');
      var eventTable = eventPath.reduce(function (value, key) { return value && value[key]; }, window.RANDOM_TABLES);
      if (eventTable && eventTable.items) html += section('偶发事件', '<p>' + esc(eventTable.title) + '</p><ol>' + eventTable.items.map(function (item) {
        return '<li>' + esc(item) + '</li>';
      }).join('') + '</ol>', order++);
    }
    information.innerHTML = html;
    information.scrollTop = 0;
    window.ChronicleEffects.decodeStory(information, true);
  }
  function resetMap() { zoom = 1; pan.x = 0; pan.y = 0; applyMapTransform(); }
  function applyMapTransform() {
    var viewport = byId('map-viewport'), svg = mapStage.querySelector('svg');
    if (!viewport || !svg) return;
    var box = svg.viewBox.baseVal, cx = box.x + box.width / 2, cy = box.y + box.height / 2;
    viewport.setAttribute('transform', 'translate(' + (cx + pan.x) + ' ' + (cy + pan.y) + ') scale(' + zoom + ') translate(' + -cx + ' ' + -cy + ')');
    byId('map-zoom-out').disabled = zoom <= 1;
    byId('map-zoom-in').disabled = zoom >= 3;
  }
  function renderMap(act) {
    map = (window.STORY_MAPS || []).find(function (entry) { return entry.actId === act.id; });
    if (!map) { mapStage.innerHTML = '<p>地图未能加载，请重新打开页面。</p>'; return; }
    byId('map-title').textContent = map.title;
    byId('map-area').textContent = map.area;
    byId('map-scale').textContent = map.scale + (map.north === 'down' ? ' · 北↓' : ' · 北↑');
    byId('map-act-number').textContent = 'ACT ' + number(act.id);
    byId('map-original').href = map.file;
    mapStage.innerHTML = map.svg;
    var svg = mapStage.querySelector('svg');
    if (map.embedViewBox) svg.setAttribute('viewBox', map.embedViewBox.join(' '));
    var viewport = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    viewport.id = 'map-viewport';
    Array.from(svg.children).forEach(function (child) { if (!['defs','style','title','desc'].includes(child.tagName)) viewport.appendChild(child); });
    svg.appendChild(viewport);
    resetMap();
    window.ChronicleEffects.decodeRoom(byId('room-information'), map.title, '选择图中房间，查看空间与相关痕迹。拖动可平移，使用＋／−调整比例。', []);
  }
  function selectRoom(id) {
    if (!map) return;
    var room = map.rooms.find(function (r) { return r.id === id; });
    if (!room) return;
    mapStage.querySelectorAll('[data-room]').forEach(function (el) { el.classList.toggle('is-selected', el.dataset.room === id); el.setAttribute('aria-pressed', String(el.dataset.room === id)); });
    var clues = (room.clues || []).map(function (i) { return acts[state.id - 1].clues[i]; }).filter(Boolean);
    var description = (acts[state.id - 1].rooms || []).find(function(r) { return r.id === id; });
    window.ChronicleEffects.decodeRoom(byId('room-information'), room.name, description ? description.readaloud : room.description, description ? ['可见物：' + description.contents, '线索位置：' + description.where, '发现与回应：' + description.discovery] : clues);
    information.querySelectorAll('[data-room-link]').forEach(function (el) { el.classList.toggle('is-selected', el.dataset.roomLink === id); });
  }
  mapStage.addEventListener('click', function (e) {
    if (suppressClick) return;
    var target = e.target.closest('[data-room]'); if (target) selectRoom(target.dataset.room);
  });
  mapStage.addEventListener('keydown', function (e) {
    var target = e.target.closest('[data-room]');
    if (target && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectRoom(target.dataset.room); }
  });
  information.addEventListener('click', function (e) { var link = e.target.closest('[data-room-link]'); if (link) selectRoom(link.dataset.roomLink); });
  byId('map-zoom-in').addEventListener('click', function () { zoom = Math.min(3, zoom + .25); applyMapTransform(); });
  byId('map-zoom-out').addEventListener('click', function () { zoom = Math.max(1, zoom - .25); applyMapTransform(); });
  byId('map-reset').addEventListener('click', resetMap);
  mapStage.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y, moved: false };
  });
  mapStage.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;
    drag.moved = true; suppressClick = true; mapStage.classList.add('dragging');
    if (!mapStage.hasPointerCapture(e.pointerId)) mapStage.setPointerCapture(e.pointerId);
    var svg = mapStage.querySelector('svg'), m = svg.getScreenCTM();
    if (!m) return;
    pan.x = drag.panX + dx / m.a; pan.y = drag.panY + dy / m.d; applyMapTransform();
  });
  function endDrag(e) {
    if (!drag) return;
    if (mapStage.hasPointerCapture(e.pointerId)) mapStage.releasePointerCapture(e.pointerId);
    drag = null; mapStage.classList.remove('dragging');
    setTimeout(function () { suppressClick = false; }, 0);
  }
  mapStage.addEventListener('pointerup', endDrag); mapStage.addEventListener('pointercancel', endDrag);
  window.addEventListener('pointerup', endDrag);

  function render() {
    var next = route(), act = acts[next.id - 1], returning = state.detail && !next.detail;
    var previousId = state.id;
    var changedDetail = next.detail && (!state.detail || next.id !== state.id);
    if (changedDetail) { renderMap(act); renderStory(act); byId('detail-act-title').textContent = '第' + number(act.id) + '幕 · ' + act.title; }
    state = next;
    root.dataset.view = state.detail ? 'detail' : 'overview';
    detail.setAttribute('aria-hidden', String(!state.detail)); detail.inert = !state.detail;
    overview.setAttribute('aria-hidden', String(state.detail)); overview.inert = state.detail;
    back.hidden = !state.detail;
    document.querySelectorAll('.chapter-nav button,.chapter-dot').forEach(function (el) { el.setAttribute('aria-current', String(Number(el.dataset.act) === state.id)); });
    document.querySelectorAll('.chapter-slide').forEach(function (el) {
      var delta = (Number(el.dataset.act) - state.id + 4) % 4;
      el.dataset.position = ['current','next','hidden','previous'][delta];
      el.tabIndex = delta === 2 ? -1 : 0; el.setAttribute('aria-hidden', String(delta === 2));
    });
    window.ChronicleEffects.updateMarks(state.id, english, !previousId);
    byId('masthead-page-number').textContent = number(state.id);
    byId('chapter-title').textContent = act.title;
    byId('chapter-subtitle').textContent = act.subtitle;
    byId('rail-number').textContent = number(state.id);
    byId('rail-counter').textContent = number(state.id) + ' / 04';
    byId('archive-progress').style.width = (state.id * 21.91) + '%';
    document.title = act.title + ' · 剧情档案 · 诡秘之主';
    if (state.detail) { animateMotion([0,0,0,0], true); if (changedDetail) information.focus({ preventScroll: true }); }
    if (returning) document.querySelector('.chapter-slide[data-position="current"]').focus({ preventScroll: true });
    window.ChronicleEffects.setDetail(state.detail);
  }
  if (!/^#act-[1-4](\/details)?$/.test(location.hash)) history.replaceState(null, '', '#act-1');
  window.addEventListener('hashchange', render);
  render();
})();
