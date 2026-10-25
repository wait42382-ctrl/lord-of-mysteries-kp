(function () {
  'use strict';
  var root = document.documentElement;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var storageKey = 'lom-scene-entry';
  var timer = 0, busy = false, generation = 0, pendingHref = null;
  var routes = /\/(index|symbols|keeper|character|archives|sequences|chronicle|artifact)\.html$/i;
  function read() {
    try { return JSON.parse(sessionStorage.getItem(storageKey)); } catch (_) { return null; }
  }
  function clear() { try { sessionStorage.removeItem(storageKey); } catch (_) {} }
  function pageKey(url) { return url.origin + url.pathname + url.search; }
  var incoming = read(); clear();
  root.dataset.sceneTransition = incoming && incoming.target === pageKey(new URL(location.href)) && Date.now() - incoming.time < 10000 && !reduced.matches ? 'entering' : 'idle';
  var ritualEntry = root.dataset.sceneTransition === 'entering' && window.RitualTransition && window.RitualTransition.receive(incoming);
  var keeperEntry = root.dataset.sceneTransition === 'entering' && window.KeeperTransition && window.KeeperTransition.receive(incoming);
  var artifactEntry = root.dataset.sceneTransition === 'entering' && window.ArtifactTransition && window.ArtifactTransition.receive(incoming);
  var archivesEntry = root.dataset.sceneTransition === 'entering' && window.ArchivesEntrance && window.ArchivesEntrance.receive(incoming);
  busy = root.dataset.sceneTransition === 'entering';

  function finish(preserveArchivesIntro) {
    clearTimeout(timer); generation++; busy = false; pendingHref = null;
    root.dataset.sceneTransition = 'idle';
    if (window.RitualTransition) window.RitualTransition.reset();
    if (window.KeeperTransition) window.KeeperTransition.reset();
    if (window.ArtifactTransition) window.ArtifactTransition.reset();
    if (window.ArchivesEntrance) window.ArchivesEntrance.reset(preserveArchivesIntro === true);
  }
  function cancel() {
    if (!busy) return;
    finish(); clear();
    window.dispatchEvent(new Event('scene-transition-cancel'));
  }
  function navigate(href) {
    var target = new URL(href, location.href);
    if (busy) return false;
    if (target.protocol !== location.protocol || target.host !== location.host || !routes.test(target.pathname) || pageKey(target) === pageKey(new URL(location.href))) return false;
    busy = true;
    window.dispatchEvent(new Event('scene-transition-start'));
    if (reduced.matches) { location.href = target.href; return true; }
    root.dataset.sceneTransition = 'leaving';
    var effect = (window.RitualTransition && window.RitualTransition.prepare(target)) || (window.KeeperTransition && window.KeeperTransition.prepare(target)) || (window.ArtifactTransition && window.ArtifactTransition.prepare(target)) || (window.ArchivesEntrance && window.ArchivesEntrance.prepare(target));
    // Store the destination before leaving so its head script covers the first paint.
    try { sessionStorage.setItem(storageKey, JSON.stringify({ target: pageKey(target), time: Date.now(), kind: effect ? effect.kind : 'wipe', key: effect ? effect.key : null })); } catch (_) { effect = null; }
    if (effect && effect.kind === 'ritual') window.RitualTransition.leave(effect);
    if (effect && effect.kind === 'keeper') window.KeeperTransition.leave(effect);
    if (effect && effect.kind === 'artifact') window.ArtifactTransition.leave(effect);
    if (effect && effect.kind === 'archives') window.ArchivesEntrance.leave(effect);
    pendingHref = target.href;
    timer = setTimeout(function () { location.href = target.href; }, effect && (effect.kind === 'keeper' || effect.kind === 'artifact' || effect.kind === 'archives') ? effect.duration : 780);
    return true;
  }
  window.SceneTransition = { navigate: navigate, cancel: cancel };
  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    if (busy) { event.preventDefault(); return; }
    if (navigate(link.href)) event.preventDefault();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && busy) { event.preventDefault(); cancel(); }
  });
  window.addEventListener('pageshow', function (event) { if (event.persisted) { finish(); clear(); } });
  reduced.addEventListener('change', function () {
    if (reduced.matches && (root.dataset.keeperTransition === 'leaving' || root.dataset.artifactTransition === 'leaving' || root.dataset.archivesTransition === 'leaving') && pendingHref) { clearTimeout(timer); location.href = pendingHref; return; }
    if (reduced.matches && root.dataset.sceneTransition !== 'leaving') finish();
  });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden || (!root.dataset.keeperTransition && !root.dataset.artifactTransition && !root.dataset.archivesTransition)) return;
    if (root.dataset.sceneTransition === 'leaving' && pendingHref) { clearTimeout(timer); location.href = pendingHref; }
    else finish();
  });
  document.addEventListener('DOMContentLoaded', function () {
    if (root.dataset.sceneTransition !== 'entering') return;
    var token = generation;
    // Wait briefly for local art/fonts without letting a failed asset trap the page.
    var ready = Promise.all([document.fonts.ready].concat(Array.from(document.images).map(function (image) { return image.decode().catch(function () {}); })));
    Promise.race([ready, new Promise(function (resolve) { setTimeout(resolve, 400); })]).then(function () {
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        if (token !== generation) return;
        root.dataset.sceneTransition = 'revealing';
        if (ritualEntry) window.RitualTransition.reveal();
        if (keeperEntry) window.KeeperTransition.reveal();
        if (artifactEntry) window.ArtifactTransition.reveal();
        if (archivesEntry) window.ArchivesEntrance.reveal();
        // The shelf owns its longer train motion; release navigation after the curtain clears.
        timer = setTimeout(function () { finish(!!archivesEntry); }, ritualEntry ? 1420 : keeperEntry ? 1250 : artifactEntry ? 1100 : archivesEntry ? 640 : 860);
      }); });
    });
  });
})();
