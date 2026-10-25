(function () {
  'use strict';
  var stage = document.getElementById('sequence-stage');
  var backdrop = document.getElementById('sequence-backdrop');
  var panel = document.getElementById('sequence-panel');
  var focusNode = document.getElementById('sequence-focus');
  var back = document.getElementById('sequence-back');
  var previous = document.getElementById('sequence-previous');
  var next = document.getElementById('sequence-next');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var current = null, level = null, selectedNode = null, moveAnimation = null;
  var focusTimer = 0, introTimer = 0, textAnimation = null;
  var source = document.getElementById('vitruvian-source');
  var ready = false;
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function image(extra) { return '<image href="' + SEQUENCE_SCENE.image + '" x="0" y="0" width="1205" height="1305" ' + (extra || '') + '/>'; }
  function buildFigure() {
    var arms = SEQUENCE_SCENE.arms;
    var defs = arms.map(function (arm, i) { return '<clipPath id="arm-clip-' + i + '"><polygon points="' + arm.points + '"/></clipPath>'; }).join('');
    // Keep the core intact while each outer fan sector unfolds around its shoulder.
    // The full original takes over at rest, preserving every source pixel.
    defs += '<clipPath id="body-clip"><polygon points="490,135 725,135 745,325 745,485 710,645 1060,1135 925,1295 290,1295 145,1135 485,645 470,475 470,325"/></clipPath>';
    var layers = arms.map(function (arm, i) {
      return '<g class="vitruvian-arm" style="--pivot-x:' + arm.pivot[0] / 1205 * 100 + '%;--pivot-y:' + arm.pivot[1] / 1305 * 100 + '%;--fold:' + arm.rotation + 'deg;--delay:' + (190 + arm.order * 145) + 'ms">' + image('clip-path="url(#arm-clip-' + i + ')"') + '</g>';
    }).join('');
    document.getElementById('vitruvian-fragments').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1205 1305"><defs>' + defs + '</defs><g class="vitruvian-body">' + image('clip-path="url(#body-clip)"') + '</g>' + layers + '</svg>';
  }
  function finishIntro() { clearTimeout(introTimer); stage.dataset.intro = 'complete'; }
  function startIntro() {
    if (!ready || stage.dataset.intro !== 'waiting') return;
    if (document.documentElement.dataset.sceneTransition === 'entering') return;
    if (reduced.matches) { finishIntro(); return; }
    stage.dataset.intro = 'playing';
    introTimer = setTimeout(finishIntro, stage.dataset.entry === 'ritual' ? 1320 : 1780);
  }
  function lineFor(sequence) {
    var descriptions = sequence.abilities.map(function (a) { return a.desc; }).filter(Boolean);
    return descriptions.length ? descriptions[0].split(/[。！？]/)[0] + '。' : sequence.name;
  }
  function nodeContent(sequence) {
    return '<span class="seq-number">' + String(sequence.level).padStart(2, '0') + '</span><span class="seq-name">' + esc(sequence.name) + '</span><span class="seq-intro">' + esc(lineFor(sequence)) + '</span>';
  }
  function buildDirectory(pathway) {
    [document.getElementById('sequence-left'), document.getElementById('sequence-right')].forEach(function (column, side) {
      column.innerHTML = pathway.sequences.filter(function (s) { return side ? s.level < 5 : s.level >= 5; }).map(function (s, row) {
        return '<button type="button" class="sequence-node" data-level="' + s.level + '" style="--reveal-order:' + row + '" aria-controls="sequence-panel" aria-expanded="false">' + nodeContent(s) + '</button>';
      }).join('');
      column.querySelectorAll('button').forEach(function (button) {
        button.addEventListener('click', function () { navigate(Number(button.dataset.level)); });
        button.addEventListener('keydown', function (event) {
          var at = Number(button.dataset.level);
          if (event.key === 'ArrowDown') at = Math.max(0, at - 1);
          else if (event.key === 'ArrowUp') at = Math.min(9, at + 1);
          else if (event.key === 'ArrowRight') at = at >= 5 ? at - 5 : at;
          else if (event.key === 'ArrowLeft') at = at < 5 ? at + 5 : at;
          else return;
          event.preventDefault(); backdrop.querySelector('[data-level="' + at + '"]').focus();
        });
      });
    });
  }
  function renderAbility(ability) {
    var meta = ability.type === 'active' ? '<dl>' + [['检定', ability.check], ['行动', ability.action], ['范围', ability.range], ['持续', ability.duration]].filter(function (pair) { return pair[1]; }).map(function (pair) { return '<div><dt>' + pair[0] + '</dt><dd>' + esc(pair[1]) + '</dd></div>'; }).join('') + '</dl>' : '';
    return '<article class="sequence-ability"><header><h3>' + esc(ability.name) + '</h3>' + (ability.cost == null ? '' : '<span class="ability-cost">灵感 ' + esc(ability.cost) + '</span>') + '</header><p class="ability-description">' + esc(ability.desc) + '</p>' + meta + (ability.rule ? '<p class="ability-rule">' + esc(ability.rule) + '</p>' : '') + '</article>';
  }
  function cancelMotion() {
    clearTimeout(focusTimer);
    if (moveAnimation) moveAnimation.cancel();
    if (textAnimation) textAnimation.cancel();
    moveAnimation = textAnimation = null;
  }
  function show(pathway, chosen, focus) {
    var wasDetail = level !== null;
    var changedPathway = !current || current.key !== pathway.key;
    var oldLevel = level;
    cancelMotion();
    if (changedPathway) {
      current = pathway; selectedNode = null; buildDirectory(pathway);
      document.getElementById('sequence-pathway-title').textContent = pathway.name + '途径';
      document.getElementById('sequence-pathway-english').textContent = PATHWAY_PRESENTATION[pathway.key].english;
      ['pathway-return', 'sequence-pathway-back'].forEach(function (id) { document.getElementById(id).href = 'symbols.html#' + pathway.key; });
      document.getElementById('sequence-home').href = '#' + pathway.key;
    }
    // Reset the background before measuring the actual source button for the FLIP move.
    var origin = null;
    if (chosen !== null && (!wasDetail || changedPathway)) {
      stage.dataset.view = 'overview';
      if (selectedNode) selectedNode.dataset.selected = 'false';
      origin = backdrop.querySelector('[data-level="' + chosen + '"]').getBoundingClientRect();
    }
    if (selectedNode) { selectedNode.dataset.selected = 'false'; selectedNode.setAttribute('aria-expanded', 'false'); }
    level = chosen;
    var detailed = chosen !== null;
    backdrop.inert = detailed;
    backdrop.setAttribute('aria-hidden', String(detailed));
    panel.inert = !detailed; panel.setAttribute('aria-hidden', String(!detailed));
    focusNode.setAttribute('aria-hidden', String(!detailed)); focusNode.tabIndex = detailed ? 0 : -1;
    back.setAttribute('aria-hidden', String(!detailed)); back.tabIndex = detailed ? 0 : -1;
    if (detailed) {
      var sequence = pathway.sequences.find(function (s) { return s.level === chosen; });
      selectedNode = backdrop.querySelector('[data-level="' + chosen + '"]');
      selectedNode.dataset.selected = 'true'; selectedNode.setAttribute('aria-expanded', 'true');
      focusNode.innerHTML = nodeContent(sequence);
      focusNode.setAttribute('aria-label', sequence.name + '，返回序列总览');
      panel.dataset.level = chosen;
      document.getElementById('sequence-abilities').innerHTML = sequence.abilities.map(renderAbility).join('');
      document.getElementById('sequence-abilities').scrollTop = 0;
      // For 2–0, carry the already-known total at 3 without inventing additional gains.
      document.getElementById('spirituality-total').textContent = '+' + SPIRITUALITY.growth(pathway.key, Math.max(3, chosen)).extraTotal;
      document.getElementById('sequence-number').textContent = String(chosen).padStart(2, '0');
      document.getElementById('sequence-rail-count').textContent = String(10 - chosen).padStart(2, '0') + ' / 10';
      document.getElementById('sequence-level-label').textContent = '序列 ' + chosen;
      previous.disabled = chosen === 9; next.disabled = chosen === 0;
      document.title = sequence.name + ' · ' + pathway.name + '途径';
      stage.dataset.view = 'detail';
      if (!reduced.matches) {
        if (origin) {
          var destination = focusNode.getBoundingClientRect();
          moveAnimation = focusNode.animate([{ transform: 'translate(' + (origin.left - destination.left) + 'px,' + (origin.top - destination.top) + 'px) scale(' + origin.width / destination.width + ',' + origin.height / destination.height + ')' }, { transform: 'translate(0,0) scale(1,1)' }], { duration: 680, easing: 'cubic-bezier(.22,.61,.36,1)' });
        } else if (oldLevel !== chosen) {
          textAnimation = panel.animate([{ opacity: 0, transform: 'translateX(16px)' }, { opacity: 1, transform: 'none' }], { duration: 440, easing: 'ease-out' });
        }
      }
      if (focus && !panel.contains(document.activeElement)) {
        if (reduced.matches) back.focus({ preventScroll: true });
        else focusTimer = setTimeout(function () { if (level !== null) back.focus({ preventScroll: true }); }, 720);
      }
    } else {
      stage.dataset.view = 'overview';
      document.getElementById('sequence-number').textContent = '10';
      document.getElementById('sequence-rail-count').textContent = '09 — 00';
      document.title = pathway.name + ' · 序列档案';
      if (focus && selectedNode) selectedNode.focus({ preventScroll: true });
    }
  }
  function navigate(chosen) {
    var hash = '#' + current.key + (chosen === null ? '' : '/' + chosen);
    if (location.hash !== hash) history.pushState(null, '', hash);
    show(current, chosen, true);
  }
  function fromHash() {
    var parts = location.hash.slice(1).split('/');
    var pathway = PATHWAYS.find(function (p) { return p.key === parts[0]; }) || PATHWAYS[0];
    var chosen = parts.length === 2 && /^[0-9]$/.test(parts[1]) ? Number(parts[1]) : null;
    show(pathway, chosen, Boolean(current));
  }
  back.addEventListener('click', function () { navigate(null); });
  focusNode.addEventListener('click', function () { navigate(null); });
  previous.addEventListener('click', function () { if (level < 9) navigate(level + 1); });
  next.addEventListener('click', function () { if (level > 0) navigate(level - 1); });
  document.addEventListener('keydown', function (event) {
    if (!event.defaultPrevented && event.key === 'Escape' && level !== null && document.documentElement.dataset.sceneTransition !== 'leaving') { event.preventDefault(); navigate(null); }
  });
  window.addEventListener('hashchange', fromHash);
  window.addEventListener('pageshow', function (event) { if (event.persisted) finishIntro(); });
  reduced.addEventListener('change', function () { if (reduced.matches) { finishIntro(); cancelMotion(); } });
  var dust = document.querySelector('.world-dust');
  for (var i = 0; i < 224; i++) {
    var mote = document.createElement('i');
    mote.style.cssText = 'left:' + (i * 37.17 + 5) % 100 + '%;--rest-y:' + (i * 23.71 + 9) % 100 + '%;--size:' + (i % 7 === 0 ? 3.2 : 1.4 + i % 4 * .4) + 'px;--drift:18px;--duration:' + (42 + i % 19) + 's;--delay:-' + (i * 1.73 + 8) + 's;--glow:' + (.24 + i % 5 * .055);
    dust.appendChild(mote);
  }
  function pauseAtmosphere() { stage.classList.toggle('atmosphere-paused', document.hidden); }
  document.addEventListener('visibilitychange', pauseAtmosphere);
  pauseAtmosphere(); buildFigure(); fromHash();
  new MutationObserver(startIntro).observe(document.documentElement, { attributes: true, attributeFilter: ['data-scene-transition'] });
  Promise.all([source.decode().catch(function () { document.getElementById('vitruvian-art').classList.add('unavailable'); }), document.fonts.ready]).then(function () { ready = true; startIntro(); });
})();
