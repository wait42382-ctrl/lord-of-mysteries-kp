(function () {
  'use strict';
  var scene = document.getElementById('home-scene');
  var plane = document.getElementById('scene-plane');
  var highlights = document.getElementById('home-highlights');
  var list = document.getElementById('home-directory');
  var caption = document.getElementById('home-caption');
  var enter = document.getElementById('home-enter');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var selected = null, busy = false, pointerFrame = 0, captionAnimation = null;
  var ns = 'http://www.w3.org/2000/svg';
  highlights.setAttribute('viewBox', '0 0 ' + HOME_SCENE.width + ' ' + HOME_SCENE.height);
  var defs = document.createElementNS(ns, 'defs'); highlights.appendChild(defs);
  function svg(tag, attributes) {
    var element = document.createElementNS(ns, tag);
    Object.keys(attributes).forEach(function (key) { element.setAttribute(key, attributes[key]); });
    return element;
  }
  var gradient = svg('linearGradient', { id: 'object-red-gradient', x1: '12%', y1: '0%', x2: '82%', y2: '100%' });
  gradient.appendChild(svg('stop', { offset: '0%', 'stop-color': '#ffd5df', 'stop-opacity': '.42' }));
  gradient.appendChild(svg('stop', { offset: '32%', 'stop-color': '#ee829d', 'stop-opacity': '.82' }));
  gradient.appendChild(svg('stop', { offset: '67%', 'stop-color': '#c72e52', 'stop-opacity': '.96' }));
  gradient.appendChild(svg('stop', { offset: '100%', 'stop-color': '#6f0c27', 'stop-opacity': '1' }));
  defs.appendChild(gradient);
  var storyGradient = svg('linearGradient', { id: 'object-story-gradient', x1: '15%', y1: '0%', x2: '70%', y2: '100%' });
  storyGradient.appendChild(svg('stop', { offset: '0%', 'stop-color': '#c04b60', 'stop-opacity': '.06' }));
  storyGradient.appendChild(svg('stop', { offset: '45%', 'stop-color': '#c04b60', 'stop-opacity': '.55' }));
  storyGradient.appendChild(svg('stop', { offset: '100%', 'stop-color': '#9e3045', 'stop-opacity': '.96' }));
  defs.appendChild(storyGradient);
  HOME_SCENE.items.forEach(function (item) {
    var shape = 'M' + item.outline.map(function (point) { return point.join(','); }).join('L') + 'Z';
    var clip = svg('clipPath', { id: 'clip-' + item.key });
    clip.appendChild(svg('path', { d: shape })); defs.appendChild(clip);
    var layer = svg('g', { 'data-highlight': item.key, class: 'home-highlight' });
    var bounds = item.marker;
    layer.appendChild(svg('rect', { class: 'selection-plate', x: bounds[0], y: bounds[1], width: bounds[2] * .55, height: bounds[3] * .72 }));
    layer.appendChild(svg('rect', { class: 'selection-frame', x: bounds[0] + bounds[2] * .12, y: bounds[1] + bounds[3] * .12, width: bounds[2] * .76, height: bounds[3] * .8 }));
    layer.appendChild(svg('image', { href: HOME_SCENE.image, width: HOME_SCENE.width, height: HOME_SCENE.height, 'clip-path': 'url(#clip-' + item.key + ')' }));
    layer.appendChild(svg('path', { class: 'object-tint', d: shape, fill: item.key === 'story' ? 'url(#object-story-gradient)' : 'url(#object-red-gradient)' })); highlights.appendChild(layer);
    var button = document.createElement('button');
    button.type = 'button'; button.className = 'object-hotspot'; button.dataset.item = item.key;
    button.setAttribute('aria-label', item.title); button.setAttribute('aria-controls', 'home-caption');
    button.style.clipPath = 'polygon(' + item.outline.map(function (point) { return point[0] / HOME_SCENE.width * 100 + '% ' + point[1] / HOME_SCENE.height * 100 + '%'; }).join(',') + ')';
    button.addEventListener('pointerenter', function () { show(item.key); });
    button.addEventListener('pointerleave', function () { if (!busy) show(selected); });
    button.addEventListener('focus', function () { show(item.key); });
    button.addEventListener('blur', function () { if (!busy) show(selected); });
    button.addEventListener('click', function () { choose(item); });
    plane.appendChild(button);
    var label = document.createElement('div'); label.className = 'object-label'; label.dataset.label = item.key;
    label.style.left = item.label[0] / HOME_SCENE.width * 100 + '%'; label.style.top = item.label[1] / HOME_SCENE.height * 100 + '%';
    var en = document.createElement('b'); en.textContent = item.english;
    var cn = document.createElement('small'); cn.textContent = item.title;
    label.appendChild(en); label.appendChild(cn); plane.appendChild(label);
    var marker = document.createElement('div'); marker.className = 'selection-marker'; marker.dataset.marker = item.key;
    marker.style.left = item.marker[0] / HOME_SCENE.width * 100 + '%'; marker.style.top = item.marker[1] / HOME_SCENE.height * 100 + '%';
    marker.style.width = item.marker[2] / HOME_SCENE.width * 100 + '%'; marker.style.height = item.marker[3] / HOME_SCENE.height * 100 + '%';
    var tag = document.createElement('a'); tag.className = 'selection-tag'; tag.href = item.href;
    tag.setAttribute('aria-label', '查看' + item.title); tag.title = '查看' + item.title;
    var arrow = document.createElement('img'); arrow.src = 'assets/icons/chevron-right.svg'; arrow.alt = '';
    var tagName = document.createElement('b'); tagName.textContent = item.english;
    tag.appendChild(arrow); tag.appendChild(tagName); marker.appendChild(tag);
    plane.appendChild(marker);
    var menu = document.createElement('button'); menu.type = 'button'; menu.dataset.menu = item.key;
    menu.textContent = item.english; menu.setAttribute('aria-label', item.title);
    menu.addEventListener('pointerenter', function () { show(item.key); });
    menu.addEventListener('pointerleave', function () { if (!busy) show(selected); });
    menu.addEventListener('focus', function () { show(item.key); });
    menu.addEventListener('blur', function () { if (!busy) show(selected); });
    menu.addEventListener('click', function () { choose(item); }); list.appendChild(menu);
  });
  function find(key) { return HOME_SCENE.items.find(function (item) { return item.key === key; }); }
  function renderCaption() {
    var item = find(selected);
    var index = item ? HOME_SCENE.items.indexOf(item) + 1 : 0;
    document.getElementById('home-title').textContent = item ? item.title : '诡秘之主';
    document.getElementById('home-english').textContent = item ? item.english : 'Lord of the Mysteries';
    document.getElementById('home-description').textContent = item ? item.description : '拍卖会的藏品';
    document.getElementById('home-number').textContent = String(index).padStart(2, '0');
    document.getElementById('home-count').textContent = String(index).padStart(2, '0') + ' / 05';
    enter.href = item ? item.href : 'keeper.html';
    document.getElementById('home-enter-label').textContent = item ? '查看详情' : '裁定台';
    caption.dataset.active = String(Boolean(item));
  }
  function show(key) {
    if (busy) return;
    HOME_SCENE.items.forEach(function (entry) {
      var active = entry.key === key, isSelected = entry.key === selected;
      var layer = highlights.querySelector('[data-highlight="' + entry.key + '"]');
      layer.dataset.active = String(active || isSelected); layer.dataset.selected = String(isSelected);
      plane.querySelector('[data-label="' + entry.key + '"]').dataset.active = String(active);
      plane.querySelector('[data-label="' + entry.key + '"]').dataset.selected = String(isSelected);
      plane.querySelector('[data-marker="' + entry.key + '"]').dataset.selected = String(isSelected);
      plane.querySelector('[data-item="' + entry.key + '"]').setAttribute('aria-pressed', String(isSelected));
      list.querySelector('[data-menu="' + entry.key + '"]').setAttribute('aria-current', String(isSelected));
      list.querySelector('[data-menu="' + entry.key + '"]').setAttribute('aria-pressed', String(isSelected));
    });
  }
  function choose(item) {
    if (busy) return;
    if (selected === item.key) { navigate(item); return; }
    selected = item.key;
    history.replaceState(null, '', '#' + item.key);
    scene.dataset.state = 'selected';
    renderCaption(); show(selected);
    if (captionAnimation) captionAnimation.cancel();
    if (!reduced.matches) captionAnimation = caption.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'cubic-bezier(.22,.61,.36,1)' });
  }
  function navigate(item) {
    if (busy) return;
    plane.style.setProperty('--origin-x', (item.marker[0] + item.marker[2] / 2) / HOME_SCENE.width * 100 + '%');
    plane.style.setProperty('--origin-y', (item.marker[1] + item.marker[3] / 2) / HOME_SCENE.height * 100 + '%');
    SceneTransition.navigate(item.href);
  }
  function restore() {
    busy = false; plane.inert = false; list.inert = false;
    if (captionAnimation) captionAnimation.cancel();
    var item = find(location.hash.slice(1)); selected = item ? item.key : null;
    scene.dataset.state = selected ? 'selected' : 'idle'; renderCaption(); show(selected);
  }
  enter.addEventListener('click', function (event) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    var item = find(selected);
    if (item) { event.preventDefault(); navigate(item); }
  });
  window.addEventListener('scene-transition-start', function () {
    if (captionAnimation) captionAnimation.cancel();
    busy = true; plane.inert = true; list.inert = true; scene.dataset.state = 'leaving';
  });
  window.addEventListener('scene-transition-cancel', restore);
  document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented || event.key !== 'Escape') return;
    if (selected) { history.replaceState(null, '', location.pathname + location.search); restore(); }
  });
  window.addEventListener('pageshow', restore);
  window.addEventListener('hashchange', restore);
  function fit() {
    var available = innerWidth * 0.8764;
    var width = Math.min(available, innerHeight * 0.96 * HOME_SCENE.width / HOME_SCENE.height);
    var height = width * HOME_SCENE.height / HOME_SCENE.width;
    plane.style.width = width + 'px'; plane.style.height = height + 'px';
    plane.style.left = available - width + 'px'; plane.style.top = Math.max(78, innerHeight * 0.49 - height / 2) + 'px';
  }
  window.addEventListener('resize', fit);
  document.addEventListener('pointermove', function (event) {
    if (reduced.matches || busy || pointerFrame) return;
    var x = (event.clientX / innerWidth - 0.5) * 6, y = (event.clientY / innerHeight - 0.5) * 4;
    pointerFrame = requestAnimationFrame(function () {
      pointerFrame = 0; plane.style.setProperty('--shift-x', x + 'px'); plane.style.setProperty('--shift-y', y + 'px');
    });
  }, { passive: true });
  reduced.addEventListener('change', function () { plane.style.setProperty('--shift-x', '0px'); plane.style.setProperty('--shift-y', '0px'); });
  fit(); restore();
})();
