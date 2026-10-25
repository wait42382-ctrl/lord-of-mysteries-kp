(function () {
  'use strict';
  // A full browser navigation destroys audio. Enter a persistent host before playback.
  if (window.parent === window) {
    document.documentElement.style.visibility = 'hidden';
    var route = location.pathname.split('/').pop() + location.search + location.hash;
    location.replace(new URL('player.html', location.href).href + '#' + encodeURIComponent(route));
    return;
  }
  window.LOMMusicFrame = true;
  document.documentElement.dataset.bgmPage = location.pathname.split('/').pop().replace(/\.html$/, '');
  function announce() {
    window.parent.postMessage({ channel: 'lom-music-host', type: 'scene', href: location.href, title: document.title }, '*');
  }
  document.addEventListener('DOMContentLoaded', announce);
  window.addEventListener('pageshow', announce);
  window.addEventListener('hashchange', announce);
  ['pushState', 'replaceState'].forEach(function (name) {
    var original = history[name];
    history[name] = function () { var result = original.apply(this, arguments); announce(); return result; };
  });
  window.addEventListener('message', function (event) {
    if (event.source === window.parent && event.data && event.data.channel === 'lom-music-host' && event.data.type === 'host-ready') announce();
  });
})();
