(function () {
  'use strict';
  var canvas = document.getElementById('symbol-canvas');
  var stage = document.querySelector('.symbol-stage');
  var context = canvas.getContext('2d');
  var scene = document.querySelector('.world-scene');
  var directory = document.querySelector('.symbol-index');
  var detail = document.getElementById('world-detail');
  var controls = document.querySelector('.detail-controls');
  var badge = document.getElementById('cursor-badge');
  var back = document.getElementById('world-back');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var selected = 0, detailed = false, width = 0, height = 0, lastTime = 0;
  var positions = new Float32Array(TAROT_PARTICLES.points.length), targets = new Float32Array(TAROT_PARTICLES.points.length);
  var repulsionRadius = 85 * 1.15, repulsionForce = 48 * 1.15;
  var pointer = { x: -10000, y: -10000 }, badgePointer = { x: 0, y: 0 };
  var frame = 0, badgeFrame = 0, focusTimer = 0, returningFocus = false;
  var textAnimations = [];
  var ritualStart = 0;
  var entryPending = true, entryActive = false, entryStart = 0, entryPausedAt = 0;
  var entrySeeds = new Float32Array(positions.length / 2 * 3);
  var entryAlpha = new Float32Array(positions.length / 2), entryScale = new Float32Array(positions.length / 2);
  var backColors = [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255]];
  var tarotColors = [[218, 218, 221], [185, 185, 192], [145, 145, 154], [115, 115, 125], [152, 45, 64]];
  canvas.dataset.particleEntry = 'waiting';
  for (var seed = 0; seed < entrySeeds.length; seed++) {
    var random = Math.sin((seed + 1) * 127.1 + 311.7) * 43758.5453;
    entrySeeds[seed] = random - Math.floor(random);
  }
  var list = document.getElementById('symbol-list');
  // Ambient dust remains separate from the 7700-point pathway silhouettes.
  var dust = document.querySelector('.world-dust');
  for (var mote = 0; mote < 96; mote++) {
    var speck = document.createElement('i');
    speck.style.cssText = 'left:' + ((mote * 37.17 + 5) % 100) + '%;--rest-y:' + ((mote * 23.71 + 9) % 100) + '%;--size:' + (mote % 7 === 0 ? 3 : 1.2 + mote % 3 * .4) + 'px;--drift:' + (mote % 2 ? 18 : -24) + 'px;--duration:' + (42 + mote % 19) + 's;--delay:-' + (mote * 1.73 + 8) + 's;--glow:' + (.16 + mote % 5 * .065) + ';';
    dust.appendChild(speck);
  }
  function pauseAtmosphere() { scene.classList.toggle('atmosphere-paused', document.hidden); }
  pauseAtmosphere();
  PATHWAY_SYMBOLS.forEach(function (symbol, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.dataset.key = symbol.key;
    var presentation = PATHWAY_PRESENTATION[symbol.key];
    button.setAttribute('aria-controls', 'world-detail');
    [['pathway-ghost', presentation.english], ['pathway-cn', symbol.name], ['pathway-en', presentation.english]].forEach(function (item) {
      var span = document.createElement('span');
      span.className = item[0]; span.textContent = item[1];
      if (item[0] === 'pathway-ghost') span.setAttribute('aria-hidden', 'true');
      button.appendChild(span);
    });
    button.addEventListener('click', function () { navigate(index); });
    button.addEventListener('pointerenter', function (event) {
      if (detailed || event.pointerType === 'touch') return;
      select(index); showBadge(index, event.clientX, event.clientY);
    });
    button.addEventListener('pointermove', function (event) { if (!detailed) showBadge(index, event.clientX, event.clientY); });
    button.addEventListener('pointerleave', hideBadge);
    button.addEventListener('focus', function () { if (!detailed && !returningFocus) select(index); });
    button.addEventListener('keydown', function (event) {
      var at = index;
      if (event.key === 'ArrowDown') at = Math.min(index + 1, PATHWAY_SYMBOLS.length - 1);
      else if (event.key === 'ArrowUp') at = Math.max(index - 1, 0);
      else if (event.key === 'Home') at = 0;
      else if (event.key === 'End') at = PATHWAY_SYMBOLS.length - 1;
      else return;
      event.preventDefault(); list.children[at].focus();
    });
    list.appendChild(button);
  });

  function updateTargets(settle) {
    var symbol = detailed ? PATHWAY_SYMBOLS[selected] : TAROT_PARTICLES;
    var size = Math.min(width * (detailed ? 0.135 : 0.19), height * 0.30);
    var center = width * (detailed ? 0.30 : 0.665);
    for (var i = 0; i < targets.length; i += 2) {
      targets[i] = center + symbol.points[i] * size;
      targets[i + 1] = height * 0.48 - symbol.points[i + 1] * size;
      if (settle) { positions[i] = targets[i]; positions[i + 1] = targets[i + 1]; }
    }
  }

  function finishEntry(settle) {
    entryPending = false; entryActive = false; entryStart = 0; entryPausedAt = 0;
    canvas.dataset.particleEntry = 'complete';
    if (settle) updateTargets(true);
  }
  function clamp(value) { return Math.min(1, Math.max(0, value)); }

  function draw(time) {
    frame = 0;
    if (document.hidden) return;
    if (!width || !height) { frame = requestAnimationFrame(draw); return; }
    if (reducedMotion.matches && (entryPending || entryActive)) finishEntry(true);
    if (entryActive && (document.documentElement.dataset.sceneTransition === 'entering' || document.documentElement.dataset.sceneTransition === 'revealing')) { frame = requestAnimationFrame(draw); return; }
    if (entryActive && !entryStart) entryStart = time;
    var entryAge = entryActive ? (time - entryStart) * 1.65 * 1.30 : 0;
    if (entryActive && entryAge >= 3000) finishEntry(true);
    if (entryActive) canvas.dataset.particleEntry = entryAge < 600 ? 'back-flash' : 'forming';
    var elapsed = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1;
    lastTime = time;
    var ease = reducedMotion.matches ? 1 : 1 - Math.pow(0.90, elapsed);
    context.clearRect(0, 0, width, height);
    var entrySize = Math.min(width * .19, height * .30);
    for (var i = 0; i < positions.length; i += 2) {
      var x = targets[i], y = targets[i + 1];
      if (entryActive) {
        var particle = i / 2, c = entrySeeds[particle * 3 + 2];
        var emerge = clamp((entryAge - c * 150) / 450);
        var depth = .88 + .12 * (1 - Math.pow(1 - emerge, 3));
        var gather = clamp((entryAge - 180 - c * 80) / 2740);
        gather = 1 - Math.pow(1 - gather, 2);
        var cloudX = width * .665 + TAROT_BACK_PARTICLES.points[i] * entrySize * .70 * depth;
        var cloudY = height * .48 + entrySize * .04 - TAROT_BACK_PARTICLES.points[i + 1] * entrySize * .70 * depth;
        positions[i] = cloudX + (x - cloudX) * gather;
        positions[i + 1] = cloudY + (y - cloudY) * gather;
        entryAlpha[particle] = emerge;
        entryScale[particle] = .2 + .8 * emerge;
        continue;
      }
      if (ritualStart) {
        var progress = Math.min(1, Math.max(0, (time - ritualStart) / 650));
        var blend = 1 - Math.pow(1 - progress, 3);
        var point = i / 2;
        var radius = Math.min(width * .16, height * .28) * (point % 3 === 0 ? .9 : 1);
        var angle = point * 2.399963;
        var seal = PATHWAY_SYMBOLS[selected].points;
        var size = Math.min(width * .135, height * .3) * .38;
        var ring = point % 5 < 2;
        var targetX = width * .4382 + (ring ? Math.cos(angle) * radius : seal[i] * size);
        var targetY = height * .49 + (ring ? Math.sin(angle) * radius : -seal[i + 1] * size);
        x += (targetX - x) * blend; y += (targetY - y) * blend;
      } else if (!reducedMotion.matches) {
        var dx = x - pointer.x, dy = y - pointer.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0 && distance < repulsionRadius) { var force = (1 - distance / repulsionRadius) * repulsionForce; x += dx / distance * force; y += dy / distance * force; }
        x += Math.sin(time * 0.0007 + i * 0.71) * 0.55;
        y += Math.cos(time * 0.0006 + i * 0.41) * 0.55;
      }
      positions[i] += (x - positions[i]) * ease;
      positions[i + 1] += (y - positions[i + 1]) * ease;
    }
    for (var group = 0; group < 5; group++) {
      var colorBlend = entryActive ? clamp((entryAge - 700) / 2300) : 1;
      var color = tarotColors[group].map(function (value, channel) { return Math.round(backColors[group][channel] + (value - backColors[group][channel]) * colorBlend); });
      context.fillStyle = 'rgb(' + color.join(',') + ')';
      var layers = entryActive ? 5 : 1;
      for (var layer = 0; layer < layers; layer++) {
        context.globalAlpha = entryActive ? (layer + 1) / 5 : 1;
        context.beginPath();
        for (var at = group * 2; at < positions.length; at += 10) {
          if (entryActive && (entryAlpha[at / 2] < .025 || Math.min(4, Math.floor(entryAlpha[at / 2] * 5)) !== layer)) continue;
          var radius = (group === 4 ? 0.72 : 0.85) * (entryActive ? entryScale[at / 2] : 1);
          context.moveTo(positions[at] + radius, positions[at + 1]);
          context.arc(positions[at], positions[at + 1], radius, 0, Math.PI * 2);
        }
        context.fill();
      }
    }
    context.globalAlpha = 1;
    if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
  }

  function schedule() {
    if (frame) cancelAnimationFrame(frame);
    lastTime = 0;
    frame = requestAnimationFrame(draw);
  }

  function select(index, reveal) {
    var changed = selected !== index;
    textAnimations.forEach(function (animation) { animation.cancel(); });
    textAnimations = [];
    selected = index;
    var symbol = PATHWAY_SYMBOLS[index];
    var presentation = PATHWAY_PRESENTATION[symbol.key];
    document.getElementById('symbol-title').textContent = symbol.name;
    document.getElementById('symbol-number').textContent = String(index + 1).padStart(2, '0');
    document.getElementById('symbol-key').textContent = presentation.english;
    document.getElementById('symbol-description').textContent = presentation.intro;
    var more = document.getElementById('symbol-more');
    more.setAttribute('href', 'sequences.html#' + symbol.key);
    more.setAttribute('aria-label', '窥探序列：' + symbol.name + '途径能力详情');
    document.getElementById('rail-count').textContent = String(index + 1).padStart(2, '0') + ' / 22';
    canvas.setAttribute('aria-label', (detailed ? symbol.name : TAROT_PARTICLES.name) + '粒子符号');
    document.title = (detailed ? symbol.name : '神之途径') + ' · LOM诡秘之主';
    Array.from(list.children).forEach(function (button, at) {
      button.setAttribute('aria-current', String(at === index));
      button.setAttribute('aria-expanded', String(detailed && at === index));
    });
    if (reveal && changed && !reducedMotion.matches) {
      [detail.querySelector('.detail-heading'), document.getElementById('symbol-description'), more].forEach(function (element, at) {
        textAnimations.push(element.animate([{ opacity: 0, transform: 'translateX(12px)' }, { opacity: 1, transform: 'translateX(0)' }], {
          duration: 440, delay: 90 + at * 100, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards'
        }));
      });
    }
    updateTargets(reducedMotion.matches);
    schedule();
  }

  function updateSlots() {
    var row = list.children[0].offsetHeight;
    var first = Math.floor(list.scrollTop / row);
    Array.from(list.children).forEach(function (button, at) { button.style.setProperty('--slot', Math.max(0, Math.min(5, at - first))); });
    document.getElementById('directory-range').textContent = String(first + 1).padStart(2, '0') + '–' + String(Math.min(22, Math.ceil((list.scrollTop + list.clientHeight) / row))).padStart(2, '0');
  }

  function keepSelectionVisible(index) {
    var button = list.children[index];
    var top = button.offsetTop - list.offsetTop;
    var bottom = top + button.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }

  function setView(isDetail, index, focus) {
    var wasDetail = detailed;
    if (isDetail && (entryPending || entryActive)) finishEntry(false);
    clearTimeout(focusTimer);
    detailed = isDetail;
    hideBadge(); pointer.x = pointer.y = -10000;
    updateSlots();
    scene.dataset.view = isDetail ? 'detail' : 'overview';
    directory.inert = isDetail; directory.setAttribute('aria-hidden', String(isDetail));
    detail.inert = !isDetail; detail.setAttribute('aria-hidden', String(!isDetail));
    controls.inert = !isDetail; controls.setAttribute('aria-hidden', String(!isDetail));
    select(index, wasDetail && isDetail);
    if (focus && isDetail && (!wasDetail || !controls.contains(document.activeElement))) {
      if (reducedMotion.matches) back.focus({ preventScroll: true });
      else focusTimer = setTimeout(function () { if (detailed) back.focus({ preventScroll: true }); }, 480);
    }
    if (focus && wasDetail && !isDetail) {
      keepSelectionVisible(index);
      returningFocus = true; list.children[index].focus({ preventScroll: true }); returningFocus = false;
    }
  }

  // History changes and explicit navigation share one state transition.
  function navigate(index) {
    var hash = '#' + PATHWAY_SYMBOLS[index].key;
    if (location.hash !== hash) history.pushState(null, '', hash);
    setView(true, index, true);
  }
  function overview() {
    if (location.hash !== '#pathways') history.pushState(null, '', '#pathways');
    setView(false, selected, true);
  }
  function fromHash() {
    var key = window.location.hash.slice(1);
    var index = PATHWAY_SYMBOLS.findIndex(function (symbol) { return symbol.key === key; });
    setView(index >= 0, index >= 0 ? index : selected, true);
  }

  function showBadge(index, x, y) {
    if (detailed) return;
    var source = 'assets/pathway-symbols/badges/' + PATHWAY_SYMBOLS[index].key + '.svg';
    if (badge.getAttribute('src') !== source) badge.src = source;
    badge.hidden = false; badgePointer.x = x; badgePointer.y = y;
    if (!badgeFrame) badgeFrame = requestAnimationFrame(function () {
      badgeFrame = 0;
      var left = badgePointer.x - badge.offsetWidth / 2;
      var top = badgePointer.y - badge.offsetHeight / 2;
      badge.style.transform = 'translate3d(' + left + 'px,' + top + 'px,0)';
    });
  }
  function hideBadge() {
    badge.hidden = true;
    if (badgeFrame) cancelAnimationFrame(badgeFrame);
    badgeFrame = 0;
  }

  back.addEventListener('click', overview);
  window.addEventListener('ritual-leave', function () {
    ritualStart = performance.now(); scene.inert = true; hideBadge(); pointer.x = pointer.y = -10000; schedule();
  });
  window.addEventListener('ritual-reset', function () {
    if (!ritualStart) return;
    ritualStart = 0; scene.inert = false; updateTargets(true); schedule();
  });
  document.getElementById('world-previous').addEventListener('click', function () { navigate((selected + 21) % 22); });
  document.getElementById('world-next').addEventListener('click', function () { navigate((selected + 1) % 22); });
  document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented || event.key !== 'Escape') return;
    if (detailed) { event.preventDefault(); overview(); }
    else if (entryActive) { event.preventDefault(); finishEntry(true); schedule(); }
  });
  list.addEventListener('scroll', function () { hideBadge(); updateSlots(); }, { passive: true });
  document.addEventListener('pointermove', function (event) { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
  document.documentElement.addEventListener('pointerleave', function () { pointer.x = pointer.y = -10000; hideBadge(); });
  window.addEventListener('hashchange', fromHash);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && entryActive) entryPausedAt = performance.now();
    else if (entryActive && entryPausedAt) { if (entryStart) entryStart += performance.now() - entryPausedAt; entryPausedAt = 0; }
    pauseAtmosphere(); hideBadge(); schedule();
  });
  reducedMotion.addEventListener('change', function () { if (reducedMotion.matches) finishEntry(true); updateTargets(reducedMotion.matches); schedule(); });
  window.addEventListener('pagehide', function () { finishEntry(false); if (frame) cancelAnimationFrame(frame); frame = 0; hideBadge(); });
  window.addEventListener('pageshow', function (event) { if (event.persisted) { finishEntry(true); schedule(); } });
  new ResizeObserver(function () {
    width = stage.clientWidth; height = stage.clientHeight;
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (!detailed && document.activeElement.parentElement === list) keepSelectionVisible(selected);
    updateTargets(!entryActive); updateSlots(); hideBadge();
    if (entryPending) {
      entryPending = false;
      if (!detailed && !reducedMotion.matches) { entryActive = true; entryStart = 0; canvas.dataset.particleEntry = 'emerging'; }
      else finishEntry(true);
    }
    schedule();
  }).observe(stage);
  fromHash();
})();
