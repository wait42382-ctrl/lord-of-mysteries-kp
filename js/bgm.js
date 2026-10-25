(function () {
  'use strict';
  if (window.LOMMusicFrame) return;
  if (document.getElementById('bgm-toggle')) return;
  var key = 'lom-bgm-v1';
  function read(storage) {
    try { var state = JSON.parse(storage.getItem(key)); return state && typeof state === 'object' ? state : null; } catch (_) { return null; }
  }
  function initialState() {
    try { return read(window.sessionStorage) || read(window.localStorage) || {}; } catch (_) { return {}; }
  }
  var saved = initialState();
  var wanted = saved.on === true;
  var position = Number.isFinite(saved.position) && saved.position > 0 ? saved.position : 0;
  var audio = document.createElement('audio');
  audio.id = 'bgm-audio';
  audio.src = 'assets/audio/BGM.mp3';
  audio.preload = wanted ? 'metadata' : 'none';
  audio.loop = true;
  audio.volume = 0.35;
  audio.hidden = true;
  var button = document.createElement('button');
  button.id = 'bgm-toggle';
  button.type = 'button';
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = '<svg viewBox="0 0 34 28" aria-hidden="true"><path d="M1 25 12 3h5L6 25zm10 0L22 3h5L16 25zm10 0 5-10 7 10h-6l-2-3-1 3z"/></svg><span class="bgm-wave" aria-hidden="true"></span>';
  var status = document.createElement('span');
  status.className = 'bgm-status';
  status.setAttribute('role', 'status');
  document.body.append(audio, button, status);
  // A native modal makes the rest of the document inert. Move the same switch
  // into its top layer while it is open, keeping playback and focus semantics.
  function syncLayer() {
    var dialogs = document.querySelectorAll('dialog[open]'), parent = document.body;
    for (var d = dialogs.length - 1; d >= 0; d--) {
      if (dialogs[d].matches(':modal')) { parent = dialogs[d]; break; }
    }
    if (button.parentNode !== parent) parent.append(button, status);
  }
  new MutationObserver(syncLayer).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
  syncLayer();
  document.documentElement.dataset.bgmPage = location.pathname.split('/').pop().replace(/\.html$/, '');
  var bars = [], wave = button.querySelector('.bgm-wave');
  for (var i = 0; i < 32; i++) { var bar = document.createElement('i'); wave.appendChild(bar); bars.push(bar); }
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var track = typeof BGM_ENVELOPE !== 'undefined' ? BGM_ENVELOPE : null;
  var samples = track ? atob(track.samples) : '';
  var raf = 0, lastFrame = 0, lastSave = 0, request = 0, pending = false, leaving = false;
  var channel = null;
  try { channel = new BroadcastChannel('lom-background-music'); } catch (_) {}

  function store(local) {
    var state = JSON.stringify({ on: wanted, position: audio.currentTime || position });
    try { window.sessionStorage.setItem(key, state); } catch (_) {}
    if (local !== false) { try { window.localStorage.setItem(key, state); } catch (_) {} }
  }
  function draw(active) {
    var cursor = track ? audio.currentTime * track.fps : 0;
    var frame = Math.floor(cursor), blend = cursor - frame;
    bars.forEach(function (bar, index) {
      var height = 3;
      if (active) {
        if (reduced.matches || !track) height = 9;
        else {
          var band = index / (bars.length - 1) * (track.bands - 1);
          var left = Math.floor(band), right = Math.min(track.bands - 1, left + 1), mix = band - left;
          function value(f) {
            var offset = Math.min(track.frames - 1, f) * track.bands;
            return (samples.charCodeAt(offset + left) * (1 - mix) + samples.charCodeAt(offset + right) * mix) / 255;
          }
          height += 24 * (value(frame) * (1 - blend) + value(frame + 1) * blend);
        }
      }
      bar.style.height = height.toFixed(2) + 'px';
    });
  }
  function stopVisual() { cancelAnimationFrame(raf); raf = 0; }
  function tick(now) {
    raf = 0;
    if (document.hidden || audio.paused || leaving) return;
    if (reduced.matches) { draw(true); return; }
    if (now - lastFrame >= 33) { draw(true); lastFrame = now; }
    raf = requestAnimationFrame(tick);
  }
  function update() {
    var active = !audio.paused && !audio.ended && !audio.error;
    button.setAttribute('aria-pressed', String(active));
    button.dataset.pending = String(pending);
    var label = active ? '关闭背景音乐' : (pending ? '正在加载背景音乐' : '播放背景音乐');
    button.setAttribute('aria-label', label);
    button.title = label;
    stopVisual(); draw(active);
    if (active && !document.hidden && !reduced.matches && !leaving) raf = requestAnimationFrame(tick);
  }
  function play() {
    var token = ++request;
    wanted = true; pending = true; status.textContent = ''; store(); update();
    audio.play().then(function () {
      if (token !== request || !wanted || leaving) return;
      pending = false; store(); update();
    }).catch(function () {
      if (token !== request) return;
      pending = false;
      status.textContent = audio.error ? '音乐未能加载，请检查项目中的音乐文件后重试。' : '点击音乐开关即可继续播放。';
      update();
    });
  }
  function pause(local) {
    ++request; wanted = false; pending = false; audio.pause(); store(local); update();
  }
  button.addEventListener('click', function () {
    if (!audio.paused || pending) pause();
    else {
      // Manual enable always restarts; clearing the cached position also
      // prevents delayed metadata from restoring an older saved timestamp.
      position = 0;
      audio.currentTime = 0;
      play();
    }
  });
  audio.addEventListener('loadedmetadata', function () {
    if (position && Number.isFinite(audio.duration)) audio.currentTime = position % audio.duration;
  });
  audio.addEventListener('playing', function () {
    if (!wanted || leaving) { audio.pause(); return; }
    pending = false;
    if (channel) channel.postMessage('claim');
    store(); update();
  });
  ['pause', 'waiting', 'seeked', 'ended'].forEach(function (event) { audio.addEventListener(event, update); });
  audio.addEventListener('error', function () { pending = false; status.textContent = '音乐未能加载，请检查项目中的音乐文件后重试。'; update(); });
  audio.addEventListener('timeupdate', function () { if (Date.now() - lastSave > 1000) { lastSave = Date.now(); store(); } });
  document.addEventListener('visibilitychange', function () { if (document.hidden) { store(); stopVisual(); } else update(); });
  reduced.addEventListener('change', update);
  if (channel) channel.onmessage = function (event) { if (event.data === 'claim' && (!audio.paused || pending)) pause(false); };
  window.addEventListener('pagehide', function () { store(); leaving = true; ++request; pending = false; stopVisual(); audio.pause(); });
  window.addEventListener('pageshow', function (event) { if (event.persisted) { leaving = false; if (wanted) play(); else update(); } });
  update();
  if (wanted) play();
})();
