(function () {
  'use strict';
  var root = document.documentElement;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var active = null, overlay = null;
  function validKey(key) { return typeof key === 'string' && /^[a-z][a-z-]{0,30}$/.test(key); }
  function mount() {
    if (overlay || !document.body) return;
    overlay = document.createElement('div');
    overlay.id = 'ritual-aperture'; overlay.hidden = true; overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<svg class="ritual-connector" aria-hidden="true"><path id="ritual-connector-path" pathLength="1"/></svg>' +
      '<div class="ritual-orbit"><svg viewBox="0 0 400 400" aria-hidden="true"><g class="ritual-measures">' +
      '<circle class="ritual-outer" cx="200" cy="200" r="180" pathLength="1"/><circle class="ritual-inner" cx="200" cy="200" r="156" pathLength="1"/>' +
      '<path class="ritual-brackets" d="M77 125V77H125 M275 77H323V125 M323 275V323H275 M125 323H77V275" pathLength="1"/>' +
      '<path class="ritual-axes" d="M200 6V46 M200 354V394 M6 200H46 M354 200H394 M100 200H300 M200 100V300"/>' +
      '<circle class="ritual-point" cx="200" cy="20" r="3"/><circle class="ritual-point" cx="380" cy="200" r="3"/>' +
      '<circle class="ritual-point" cx="200" cy="380" r="3"/><circle class="ritual-point" cx="20" cy="200" r="3"/>' +
      '</g></svg><img id="ritual-glyph" alt=""></div>';
    document.body.appendChild(overlay);
  }
  function showGlyph(key) {
    mount();
    if (!overlay) return;
    document.getElementById('ritual-glyph').setAttribute('src', 'assets/pathway-symbols/contours/' + key + '.svg');
    overlay.hidden = false;
  }
  function prepare(target) {
    if (reduced.matches || !/\/symbols\.html$/i.test(location.pathname) || !/\/sequences\.html$/i.test(target.pathname)) return null;
    var key = target.hash.slice(1);
    if (!validKey(key) || key !== location.hash.slice(1) || !document.querySelector('.world-scene[data-view="detail"]')) return null;
    return { kind: 'ritual', key: key };
  }
  function receive(mark) {
    if (reduced.matches || !mark || mark.kind !== 'ritual' || !validKey(mark.key) || mark.key !== location.hash.slice(1) || !/\/sequences\.html$/i.test(location.pathname)) return false;
    active = { key: mark.key, incoming: true };
    root.dataset.ritual = 'entering';
    return true;
  }
  function leave(effect) {
    active = { key: effect.key, incoming: false };
    showGlyph(effect.key);
    var button = document.getElementById('symbol-more').getBoundingClientRect();
    var x = innerWidth * .4382, y = innerHeight * .49;
    var connector = document.querySelector('.ritual-connector');
    connector.setAttribute('viewBox', '0 0 ' + innerWidth + ' ' + innerHeight);
    document.getElementById('ritual-connector-path').setAttribute('d', 'M' + (button.left + button.width / 2) + ' ' + (button.top + button.height) + ' L' + x + ' ' + (button.top + button.height) + ' L' + x + ' ' + y);
    root.dataset.ritual = 'leaving';
    window.dispatchEvent(new CustomEvent('ritual-leave', { detail: { duration: 780 } }));
  }
  function reveal() {
    if (!active || !active.incoming) return;
    showGlyph(active.key);
    var stage = document.getElementById('sequence-stage');
    if (stage) stage.dataset.entry = 'ritual';
    root.dataset.ritual = 'revealing';
  }
  function reset() {
    var restoreFocus = active && !active.incoming ? document.getElementById('symbol-more') : null;
    active = null;
    delete root.dataset.ritual;
    if (overlay) overlay.hidden = true;
    window.dispatchEvent(new Event('ritual-reset'));
    if (restoreFocus) restoreFocus.focus({ preventScroll: true });
  }
  window.RitualTransition = { prepare: prepare, receive: receive, leave: leave, reveal: reveal, reset: reset };
  document.addEventListener('DOMContentLoaded', function () {
    mount();
    if (active && active.incoming) {
      showGlyph(active.key);
      var stage = document.getElementById('sequence-stage');
      if (stage) stage.dataset.entry = 'ritual';
    }
  });
})();
