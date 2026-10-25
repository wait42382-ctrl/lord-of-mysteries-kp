(function () {
  'use strict';
  var frame = document.getElementById('music-frame');
  var names = /^(index|symbols|sequences|chronicle|keeper|artifact|archives|character)\.html$/;
  var base = new URL('.', location.href), current = null;
  function allowed(href) {
    try {
      var url = new URL(href, base);
      var split = url.pathname.lastIndexOf('/');
      if (url.protocol !== base.protocol || url.host !== base.host || url.pathname.slice(0, split + 1) !== base.pathname || !names.test(url.pathname.slice(split + 1))) return null;
      return url;
    } catch (_) { return null; }
  }
  function fromHash() {
    try { return allowed(decodeURIComponent(location.hash.slice(1))) || new URL('index.html', base); }
    catch (_) { return new URL('index.html', base); }
  }
  function open(url) {
    if (current === url.href) return;
    current = url.href; frame.src = current;
  }
  window.addEventListener('message', function (event) {
    if (event.source !== frame.contentWindow || !event.data || event.data.channel !== 'lom-music-host' || event.data.type !== 'scene') return;
    var url = allowed(event.data.href);
    if (!url) return;
    current = url.href;
    var route = url.pathname.split('/').pop() + url.search + url.hash;
    // The frame owns native browser history. Replace only the readable host route;
    // pushing another entry here would duplicate every Back/Forward step.
    history.replaceState(null, '', '#' + encodeURIComponent(route));
    document.documentElement.dataset.musicRoute = route;
    if (typeof event.data.title === 'string') { document.title = event.data.title; frame.title = event.data.title; }
  });
  frame.addEventListener('load', function () {
    frame.contentWindow.postMessage({ channel: 'lom-music-host', type: 'host-ready' }, '*');
  });
  window.addEventListener('hashchange', function () { open(fromHash()); });
  open(fromHash());
})();
