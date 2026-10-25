(function () {
  'use strict';
  var root = document.documentElement, screen = document.getElementById('startup-screen');
  var frame = document.getElementById('music-frame'), reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var route;
  try { route = decodeURIComponent(location.hash.slice(1)) || 'index.html'; } catch (_) { route = 'index.html'; }
  if (route.split(/[?#]/)[0] !== 'index.html') { root.dataset.startup = 'skipped'; return; }
  var progress = document.getElementById('startup-progress'), percent = document.getElementById('startup-percent');
  var active = true, loaded = false, finishedProgress = false, raf = 0, closeTimer = 0, safetyTimer = 0;
  var start = performance.now(), duration = 2200, previous = -1;
  screen.hidden = false; frame.inert = true; root.dataset.startup = 'loading';
  function value(amount) {
    var integer = Math.min(100, Math.floor(amount * 100));
    screen.style.setProperty('--startup-progress', String(amount));
    if (integer !== previous) { previous = integer; progress.setAttribute('aria-valuenow', String(integer)); percent.textContent = integer + '%'; }
  }
  function close() {
    clearTimeout(closeTimer); clearTimeout(safetyTimer); cancelAnimationFrame(raf);
    active = false; screen.hidden = true; frame.inert = false; root.dataset.startup = 'complete';
  }
  function finish(immediate) {
    if (!active) return;
    cancelAnimationFrame(raf); clearTimeout(safetyTimer); value(1);
    root.dataset.startup = 'revealing'; screen.classList.add('is-leaving');
    if (immediate || reduced.matches) close();
    else if (!closeTimer) closeTimer = setTimeout(close, 320);
  }
  function tick(now) {
    if (!active) return;
    var age = Math.min(1, (now - start) / duration), amount;
    // Deliberately timed presentation, independent of asset/network byte counts.
    if (age < .22) amount = age / .22 * .38;
    else if (age < .74) amount = .38 + (age - .22) / .52 * .34;
    else amount = .72 + (age - .74) / .26 * .28;
    value(amount); finishedProgress = age >= 1;
    if (finishedProgress && loaded) finish(false);
    else raf = requestAnimationFrame(tick);
  }
  frame.addEventListener('load', function () {
    if (!active || !frame.getAttribute('src')) return;
    loaded = true;
    if (reduced.matches || finishedProgress) finish(reduced.matches);
  });
  document.addEventListener('keydown', function (event) {
    if (active && event.key === 'Escape') { event.preventDefault(); finish(true); }
  });
  document.addEventListener('visibilitychange', function () { if (active && document.hidden) finish(true); });
  reduced.addEventListener('change', function () { if (active && reduced.matches) finish(true); });
  window.addEventListener('pagehide', function () { if (active) finish(true); });
  window.addEventListener('pageshow', function (event) { if (event.persisted && active) finish(true); });
  safetyTimer = setTimeout(function () { finish(true); }, 6000);
  value(reduced.matches ? 1 : 0);
  if (!reduced.matches) raf = requestAnimationFrame(tick);
})();
