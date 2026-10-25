(function () {
  'use strict';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var markIndex = 0, markGeneration = 0, markAnimations = [], markTimer = 0, markFinish = 0;
  var markLabels = [], decoding = null, decodeFrame = 0;
  var storyDecoding = null, storyDecodeFrame = 0;
  var canvas = document.getElementById('archive-particles');
  var ctx = canvas.getContext('2d');
  var width = 0, height = 0, particles = [], dustFrame = 0, dustTime = 0, lastDustTime = 0, lastDustDraw = 0, dustFrames = 0;
  var currentMark = document.getElementById('chapter-current-mark');
  var nextMark = document.getElementById('chapter-next-mark');
  function putMarks() {
    var next = markIndex % 4 + 1;
    document.getElementById('chapter-numeral').textContent = String(markIndex).padStart(2, '0');
    document.getElementById('chapter-mark-english').textContent = (markLabels[markIndex - 1] || '').toUpperCase();
    document.getElementById('next-chapter-numeral').textContent = String(next).padStart(2, '0');
    document.getElementById('next-chapter-mark-english').textContent = (markLabels[next - 1] || '').toUpperCase();
  }
  function cancelMarkAnimations() {
    clearTimeout(markTimer); clearTimeout(markFinish);
    markAnimations.forEach(function (a) { a.cancel(); }); markAnimations = [];
  }
  function finishMarks() {
    cancelMarkAnimations();
    if (markIndex) putMarks();
    currentMark.dataset.markState = nextMark.dataset.markState = 'idle';
  }
  function animateMarkParts(entering) {
    [currentMark, nextMark].forEach(function (mark) {
      var parts = entering ? [mark.querySelector('.chapter-mark-label'), mark.querySelector('.chapter-mark-number')] : [mark.querySelector('.chapter-mark-number'), mark.querySelector('.chapter-mark-label')];
      parts.forEach(function (part, i) {
        markAnimations.push(part.animate(entering ? [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }] : [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(14px)' }], { duration: 500, delay: i * 60, easing: 'cubic-bezier(.25,.46,.45,.94)', fill: 'both' }));
      });
    });
  }
  function updateMarks(id, labels, instant) {
    if (id === markIndex && !instant) return;
    markIndex = id; markLabels = labels;
    var token = ++markGeneration;
    cancelMarkAnimations();
    if (instant || reduced.matches || document.hidden) { finishMarks(); return; }
    currentMark.dataset.markState = nextMark.dataset.markState = 'exiting';
    animateMarkParts(false);
    markTimer = setTimeout(function () {
      if (token !== markGeneration) return;
      cancelMarkAnimations(); putMarks();
      currentMark.dataset.markState = nextMark.dataset.markState = 'entering';
      animateMarkParts(true);
      markFinish = setTimeout(function () { if (token === markGeneration) finishMarks(); }, 565);
    }, 565);
  }
  function finishDecode() {
    cancelAnimationFrame(decodeFrame); decodeFrame = 0;
    if (!decoding) return;
    decoding.lines.forEach(function (line) { line.display.textContent = line.text; });
    decoding.container.dataset.decoding = 'false'; decoding = null;
  }
  function decodeRoom(container, title, description, clues) {
    finishDecode(); container.replaceChildren();
    var heading = document.createElement('strong'); heading.textContent = title; container.appendChild(heading);
    var texts = [description].concat(clues.length ? [clues.join('；')] : []), lines = [];
    texts.forEach(function (text, i) {
      var el = document.createElement(i ? 'small' : 'p'); el.className = 'decode-line'; el.dataset.final = text;
      var reserve = document.createElement('span'); reserve.className = 'decode-reserve'; reserve.textContent = text; reserve.setAttribute('aria-hidden', 'true');
      var display = document.createElement('span'); display.className = 'decode-display'; display.setAttribute('aria-hidden', 'true');
      var readable = document.createElement('span'); readable.className = 'decode-sr-only'; readable.textContent = text;
      el.append(reserve, display, readable); container.appendChild(el);
      lines.push({ text: text, characters: Array.from(text), display: display });
    });
    container.dataset.decoding = 'true'; decoding = { container: container, lines: lines };
    if (reduced.matches || document.hidden) { finishDecode(); return; }
    var start = performance.now(), last = -100, longest = Math.max.apply(null, lines.map(function (line) { return line.characters.length; }));
    var step = Math.min(20, 2200 / (longest + 14));
    var latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var chinese = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥ〇口甲乙丙丁戊己庚辛壬癸';
    function tick(now) {
      if (!decoding || decoding.container !== container) return;
      var elapsed = now - start;
      if (elapsed - last >= 20) {
        last = elapsed;
        var head = Math.floor((elapsed - 150) / step);
        lines.forEach(function (line) {
          line.display.textContent = line.characters.map(function (char, i) {
            if (/[\s\-/'，。；：、（）＋×%=]/.test(char)) return char;
            if (elapsed < 100 && i > line.characters.length * elapsed / 100) return '';
            var age = head - i;
            if (age >= 14) return char;
            if (age < 0) return char.charCodeAt(0) > 255 ? '//' : '/';
            var pool = char.charCodeAt(0) > 255 ? chinese : latin;
            return pool[Math.floor(Math.random() * pool.length)];
          }).join('');
        });
      }
      if (elapsed > 150 + (longest + 14) * step) finishDecode();
      else decodeFrame = requestAnimationFrame(tick);
    }
    decodeFrame = requestAnimationFrame(tick);
  }
  function finishStoryDecode() {
    cancelAnimationFrame(storyDecodeFrame); storyDecodeFrame = 0;
    if (!storyDecoding) return;
    storyDecoding.items.forEach(function (item) {
      // Restore the original nodes so links, room associations and text stay intact.
      while (item.source.firstChild) item.section.insertBefore(item.source.firstChild, item.source);
      item.source.remove(); item.visual.remove(); item.section.removeAttribute('data-story-decoding');
    });
    storyDecoding.container.dataset.storyDecoding = 'false'; storyDecoding = null;
  }
  function decodeStory(container, enabled) {
    finishStoryDecode(); container.dataset.storyDecoding = 'false';
    if (!enabled || reduced.matches || document.hidden) return;
    var glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*+-=<>?{}[]:;~^_|';
    var revealTime = 700, pauseTime = 150, resolveTime = 1250;
    var items = Array.from(container.querySelectorAll('.story-section')).map(function (section, order) {
      var padding = getComputedStyle(section);
      var source = document.createElement('div'); source.className = 'story-decode-source';
      while (section.firstChild) source.appendChild(section.firstChild);
      var visual = source.cloneNode(true); visual.className = 'story-decode-visual';
      visual.setAttribute('aria-hidden', 'true'); visual.inert = true;
      visual.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
      visual.style.top = padding.paddingTop; visual.style.left = padding.paddingLeft; visual.style.right = padding.paddingRight;
      section.setAttribute('data-story-decoding', 'true'); section.append(source, visual);
      var walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT), node, lines = [], length = 0;
      while ((node = walker.nextNode())) {
        var characters = Array.from(node.nodeValue);
        lines.push({ node: node, characters: characters, offset: length }); length += characters.length;
      }
      return { section: section, source: source, visual: visual, lines: lines, length: length, delay: Math.min(order * 100, 600) };
    });
    var job = { container: container, items: items }, start = performance.now(), last = -100;
    storyDecoding = job; container.dataset.storyDecoding = 'true';
    function paint(elapsed) {
      items.forEach(function (item) {
        var localTime = elapsed - item.delay;
        var appeared = Math.ceil(Math.max(0, Math.min(1, localTime / revealTime)) * item.length);
        var resolved = Math.floor(Math.max(0, Math.min(1, (localTime - revealTime - pauseTime) / resolveTime)) * item.length);
        item.lines.forEach(function (line) {
          line.node.nodeValue = line.characters.map(function (char, i) {
            if (/\s/.test(char)) return char;
            var position = line.offset + i;
            if (position >= appeared) return '\u00a0';
            if (position < resolved) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          }).join('');
        });
      });
    }
    var duration = revealTime + pauseTime + resolveTime + Math.max.apply(null, items.map(function (item) { return item.delay; }).concat([0]));
    function tick(now) {
      if (storyDecoding !== job) return;
      var elapsed = now - start;
      if (elapsed >= duration) { finishStoryDecode(); return; }
      if (elapsed - last >= 45) { last = elapsed; paint(elapsed); }
      storyDecodeFrame = requestAnimationFrame(tick);
    }
    // Reveal a growing cipher stream first, then resolve it into the original text.
    paint(0); storyDecodeFrame = requestAnimationFrame(tick);
  }
  function buildDust() {
    width = innerWidth; height = innerHeight;
    var dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.min(520, Math.max(360, Math.round(width * height / 3800)));
    particles = Array.from({ length: count }, function (_, i) {
      return { x: Math.random(), y: Math.random(), size: .45 + Math.random() * 1.7, speed: 4 + Math.random() * 10, drift: Math.random() * Math.PI * 2, opacity: .06 + Math.random() * .25, red: i % 9 === 0 };
    });
    canvas.dataset.particleCount = String(count); drawDust();
  }
  function drawDust() {
    ctx.clearRect(0, 0, width, height);
    var t = dustTime / 1000;
    particles.forEach(function (p) {
      var x = p.x * width + Math.sin(t * .13 + p.drift) * 18;
      var y = ((p.y * height - t * p.speed) % (height + 28) + height + 28) % (height + 28) - 14;
      var edge = Math.min(1, Math.max(0, y / 75), Math.max(0, (height - y) / 75));
      ctx.globalAlpha = p.opacity * edge; ctx.fillStyle = p.red ? '#b65c75' : '#d1c6d3';
      ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1; dustFrames++;
    if (dustFrames % 15 === 0 || reduced.matches) canvas.dataset.frames = String(dustFrames);
  }
  function dustTick(now) {
    if (document.hidden || reduced.matches) { dustFrame = 0; return; }
    dustTime += Math.min(50, now - lastDustTime); lastDustTime = now;
    if (now - lastDustDraw >= 32) { lastDustDraw = now; drawDust(); }
    dustFrame = requestAnimationFrame(dustTick);
  }
  function startDust() {
    if (dustFrame || document.hidden || reduced.matches) return;
    lastDustTime = performance.now(); dustFrame = requestAnimationFrame(dustTick);
  }
  function setDetail(isDetail) {
    if (!isDetail) { finishDecode(); finishStoryDecode(); }
  }
  reduced.addEventListener('change', function () {
    if (reduced.matches) { cancelAnimationFrame(dustFrame); dustFrame = 0; finishMarks(); finishDecode(); finishStoryDecode(); drawDust(); }
    else startDust();
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(dustFrame); dustFrame = 0; finishMarks(); finishDecode(); finishStoryDecode(); }
    else startDust();
  });
  window.addEventListener('resize', buildDust);
  window.addEventListener('pageshow', function (event) { if (event.persisted) { finishMarks(); finishDecode(); finishStoryDecode(); startDust(); } });
  window.ChronicleEffects = { updateMarks: updateMarks, decodeRoom: decodeRoom, decodeStory: decodeStory, setDetail: setDetail };
  buildDust(); startDust();
})();
