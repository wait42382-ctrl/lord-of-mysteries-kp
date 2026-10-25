(function () {
  'use strict';
  const catalog = window.ARCHIVE_CATALOG;
  if (!catalog) return;
  const books = catalog.books;
  const body = document.body;
  const root = document.documentElement;
  const viewport = document.getElementById('shelf-viewport');
  const track = document.getElementById('shelf-track');
  const ground = document.querySelector('.shelf-ground');
  const shell = document.getElementById('directory-shell');
  const directory = document.getElementById('archive-directory');
  const toggle = document.getElementById('directory-toggle');
  const reader = document.getElementById('archive-reader');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = null, ready = false, hovered = null;
  const firstPersona = Math.max(0,books.findIndex(b=>b.category==='persona'));
  let position = firstPersona, target = firstPersona, spacing = 100, rise = 15;
  let raf = 0, lastTime = 0, readyTimer = 0, menuTimer = 0;
  let menuOpen = false, menuBusy = false, suspended = false;
  let pointerInput = false;
  let returnState = null;
  let introRunning = root.dataset.archiveIntro === 'waiting', introOffset = 0, introFrame = 0;
  document.addEventListener('pointerdown', () => { pointerInput = true; }, true);
  document.addEventListener('keydown', () => { pointerInput = false; }, true);
  const category = key => catalog.categories.find(c => c.key === key);
  const nodes = new Map(), links = new Map();
  const volumes = [];
  const stamp = '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="47"/><circle cx="60" cy="60" r="39" stroke-dasharray="1 5"/><path d="M60 9 91 60 60 111 29 60Z M13 60H107 M60 13V107 M31 60Q60 32 89 60Q60 88 31 60Z"/><circle cx="60" cy="60" r="9"/><path d="M16 22H30M23 15V29M90 98H104M97 91V105"/></svg>';
  function text(tag, className, value) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = value;
    return el;
  }
  books.forEach((book, index) => {
    const c = category(book.category);
    const slot = document.createElement('button');
    slot.type = 'button';
    slot.className = 'archive-book';
    slot.dataset.book = book.id;
    slot.dataset.category = book.category;
    slot.setAttribute('aria-label', book.title + '，' + c.name + '，点选后再次点击展开');
    slot.setAttribute('aria-pressed', 'false');
    slot.innerHTML = '<span class="book-shadow"></span><span class="book-body"><span class="book-pages"></span><span class="book-top"></span><span class="book-face book-front"><header><span>' + c.english.toUpperCase() + '</span><span>' + c.mark + '</span></header><span class="cover-title"></span>' + stamp + '<span class="cover-english"></span></span><span class="book-face book-spine"><span class="spine-title"></span><span class="spine-index">' + String(index + 1).padStart(2, '0') + '</span></span><span class="book-pivot"></span></span>';
    const coverName = book.cover || book.title;
    const coverTitle = slot.querySelector('.cover-title');
    if (coverName.length === 4) coverTitle.append(document.createTextNode(coverName.slice(0, 2)), document.createElement('br'), document.createTextNode(coverName.slice(2)));
    else if (book.category === 'story' && coverName.length === 6) coverTitle.append(document.createTextNode(coverName.slice(0, 3)), document.createElement('br'), document.createTextNode(coverName.slice(3)));
    else coverTitle.textContent = coverName;
    slot.querySelector('.cover-english').textContent = book.english;
    slot.querySelector('.spine-title').textContent = /^story-[1-4]$/.test(book.id) ? book.cover : (book.placeholder ? book.cover + ' ' + String(index + 1).padStart(2, '0') : book.title);
    if (/^story-[1-4]$/.test(book.id)) slot.querySelector('.book-spine').appendChild(text('span', 'spine-act', book.title.split(' · ')[0]));
    // 原位透明书面与旋出书体共同命中，旋转不会把指针甩出交互区。
    const hit = document.createElement('span');
    hit.className = 'book-hit'; hit.setAttribute('aria-hidden', 'true'); slot.prepend(hit);
    slot.addEventListener('pointerenter', () => {
      if (selected || menuBusy || raf || suspended) return;
      hovered = book.id; updateBooks(); caption(book);
    });
    slot.addEventListener('pointerleave', () => {
      if (hovered === book.id) { hovered = null; updateBooks(); captionCurrent(); }
    });
    slot.addEventListener('focus', () => {
      // 鼠标按下获得焦点不是一次选择；留给随后的click处理，避免单击被计为两次。
      if (!pointerInput && selected !== book.id && !reader.open) select(book.id);
    });
    slot.addEventListener('blur', () => {
      if (hovered === book.id) { hovered = null; updateBooks(); captionCurrent(); }
    });
    slot.addEventListener('click', () => activate(book.id, slot));
    track.append(slot); nodes.set(book.id, slot); volumes.push({node:slot,index});
  });
  // 装饰延伸不参与目录、焦点或选择，真实书目首尾仍由原有边界控制。
  const fillerBefore = document.createDocumentFragment(), fillerAfter = document.createDocumentFragment();
  for (const side of ['before','after']) {
    for (let n = 0; n < 20; n++) {
      const index = side === 'before' ? n - 20 : books.length + n;
      const filler = document.createElement('div');
      filler.className = 'shelf-filler'; filler.dataset.side = side;
      filler.setAttribute('aria-hidden','true'); filler.inert = true;
      filler.innerHTML = nodes.get(books[0].id).innerHTML;
      filler.querySelector('.book-hit').remove();
      filler.querySelector('.book-pivot').remove();
      const binding = n % 5;
      filler.dataset.binding = String(binding);
      filler.querySelector('.book-front header').innerHTML = '<span>ARCHIVUM</span><span>' + ['I','II','III','IV','V'][binding] + '</span>';
      filler.querySelector('.cover-title').textContent = '';
      filler.querySelector('.cover-english').textContent = '';
      filler.querySelector('.spine-title').textContent = '';
      filler.querySelector('.spine-index').textContent = '—';
      const engravings = [
        '<circle cx="60" cy="60" r="45"/><circle cx="60" cy="60" r="32"/><path d="M60 8 73 47 112 60 73 73 60 112 47 73 8 60 47 47Z M26 26 94 94 M94 26 26 94"/><circle cx="60" cy="60" r="12"/>',
        '<path d="M60 9 103 34V86L60 111 17 86V34Z M60 22 91 41V79L60 98 29 79V41Z M17 34 103 86 M103 34 17 86 M60 9V111"/><circle cx="60" cy="60" r="23"/>',
        '<circle cx="60" cy="60" r="46" stroke-dasharray="1 4"/><path d="M60 12 92 60 60 108 28 60Z M12 60H108 M60 12V108 M19 39Q60 5 101 39 M19 81Q60 115 101 81"/><ellipse cx="60" cy="60" rx="39" ry="18"/><circle cx="60" cy="60" r="8"/>',
        '<path d="M20 15H100V105H20Z M29 24H91V96H29Z M60 12V108 M13 60H107 M34 34 86 86 M86 34 34 86"/><circle cx="60" cy="60" r="28"/><path d="M43 60 60 40 77 60 60 80Z"/>',
        '<circle cx="60" cy="60" r="44"/><circle cx="60" cy="60" r="37" stroke-dasharray="3 3"/><path d="M60 17 98 82H22Z M60 103 22 38H98Z M35 17V103 M85 17V103"/><circle cx="60" cy="60" r="16"/>'
      ];
      filler.querySelector('.book-front svg').outerHTML = '<svg class="filler-engraving" viewBox="0 0 120 120" aria-hidden="true">' + engravings[binding] + '</svg>';
      filler.querySelector('.book-front').insertAdjacentHTML('beforeend', '<span class="filler-corner a"></span><span class="filler-corner b"></span><span class="filler-corner c"></span><span class="filler-corner d"></span><span class="filler-volume">' + ['VII','XIV','XXI','XXVIII','XXXV'][binding] + '</span><span class="filler-plate">EX ARCHIVIS</span>');
      filler.querySelector('.book-spine').insertAdjacentHTML('beforeend', '<span class="filler-spine-ornament"><i></i><b>◇</b><i></i><em>' + ['VII','XIV','XXI','XXVIII','XXXV'][binding] + '</em></span>');
      filler.style.setProperty('--cover',['#222d38','#40232f','#37333e','#42372f','#263630'][binding]);
      filler.style.setProperty('--foil',['#a6b6c4','#b79ba6','#beb9c6','#c0aa83','#a2b5aa'][binding]);
      filler.style.zIndex = index + 50;
      volumes.push({node:filler,index});
      (side === 'before' ? fillerBefore : fillerAfter).append(filler);
    }
  }
  track.prepend(fillerBefore); track.append(fillerAfter);
  const groups = document.getElementById('directory-groups');
  catalog.categories.forEach((c, groupIndex) => {
    const section = document.createElement('section'); section.className = 'directory-group';
    section.style.setProperty('--entrance', groupIndex * 50 + 'ms');
    const h = document.createElement('h2'); h.append(text('span', '', c.name), text('small', '', c.english));
    section.append(h); const ul = document.createElement('ul');
    books.filter(b => b.category === c.key).forEach((book, i) => {
      const li = document.createElement('li');
      const link = document.createElement('button'); link.type = 'button';
      link.className = 'directory-book'; link.dataset.book = book.id;
      link.style.setProperty('--entrance', Math.min(groupIndex * 50 + i * 22, 260) + 'ms');
      link.append(text('small', '', String(books.indexOf(book) + 1).padStart(2, '0')), text('span', '', book.title));
      link.addEventListener('click', () => activate(book.id, link));
      li.append(link); ul.append(li); links.set(book.id, link);
    });
    section.append(ul); groups.append(section);
  });
  function caption(book) {
    document.getElementById('caption-category').textContent = category(book.category).name;
    document.getElementById('caption-title').textContent = book.title;
    document.getElementById('caption-subtitle').textContent = book.subtitle || '装帧展示 · 内容待整理';
  }
  function captionCurrent() { caption(books.find(b => b.id === selected) || books[Math.round(position)]); }
  function updateBooks() {
    books.forEach((book, i) => {
      const isSelected = book.id === selected;
      const out = isSelected || (!selected && book.id === hovered);
      const node = nodes.get(book.id);
      node.classList.toggle('is-out', out);
      node.style.zIndex = out ? 200 : i + 50;
      node.setAttribute('aria-pressed', String(isSelected));
      if (isSelected) links.get(book.id).setAttribute('aria-current', 'true');
      else links.get(book.id).removeAttribute('aria-current');
    });
    body.dataset.selected = selected || '';
    body.dataset.ready = String(ready);
  }
  function applyPosition() {
    const displayed = position + introOffset;
    track.style.transform = 'translate3d(' + (-displayed * spacing).toFixed(3) + 'px,' + (-displayed * rise).toFixed(3) + 'px,0)';
    const n = Math.round(position);
    document.getElementById('shelf-counter').textContent = String(n + 1).padStart(2, '0') + ' / ' + String(books.length).padStart(2, '0');
    document.getElementById('shelf-prev').disabled = introRunning || target <= 0;
    document.getElementById('shelf-next').disabled = introRunning || target >= books.length - 1;
  }
  function finishIntro() {
    if (!introRunning) return;
    cancelAnimationFrame(introFrame); introFrame = 0; introOffset = 0; introRunning = false;
    root.dataset.archiveIntro = 'complete'; viewport.inert = false; toggle.disabled = false;
    applyPosition(); scheduleReady();
    window.dispatchEvent(new Event('archives-intro-complete'));
  }
  function startIntro() {
    if (!introRunning) return;
    if (reduced.matches || suspended || document.hidden) { finishIntro(); return; }
    cancelAnimationFrame(introFrame);
    // 整列从远端驶入；所有书保持固定间距，不拆成逐本淡入。
    introOffset = 100; applyPosition(); root.dataset.archiveIntro = 'arriving';
    const start = performance.now();
    function advance(now) {
      if (!introRunning) return;
      const progress = Math.min(1, (now - start) / (2600 / 1.5));
      introOffset = 100 * Math.pow(1 - progress, 3); applyPosition();
      if (progress >= 1) finishIntro();
      else introFrame = requestAnimationFrame(advance);
    }
    introFrame = requestAnimationFrame(advance);
  }
  function clearReady() { clearTimeout(readyTimer); ready = false; body.dataset.ready = 'false'; }
  function scheduleReady() {
    clearTimeout(readyTimer);
    if (!selected || menuBusy || raf || suspended || introRunning) return;
    readyTimer = setTimeout(() => { ready = true; body.dataset.ready = 'true'; }, reduced.matches ? 0 : 510);
  }
  function tick(now) {
    const dt = Math.min(50, now - (lastTime || now - 16)); lastTime = now;
    position += (target - position) * (1 - Math.exp(-dt / 105));
    if (Math.abs(target - position) < .002) {
      position = target; raf = 0; lastTime = 0; applyPosition(); captionCurrent();
      scheduleReady(); return;
    }
    applyPosition(); raf = requestAnimationFrame(tick);
  }
  function moveTo(value) {
    target = Math.max(0, Math.min(books.length - 1, value));
    if (reduced.matches || suspended) {
      cancelAnimationFrame(raf); raf = 0; position = target; applyPosition(); captionCurrent(); scheduleReady();
    } else if (Math.abs(position - target) < .002) {
      applyPosition(); scheduleReady();
    } else if (!raf) { lastTime = 0; raf = requestAnimationFrame(tick); }
  }
  function select(id) {
    if (introRunning) return;
    selected = id; hovered = null; clearReady(); updateBooks();
    const index = books.findIndex(b => b.id === id); caption(books[index]); moveTo(index);
  }
  function clearSelection() { selected = null; hovered = null; clearReady(); updateBooks(); captionCurrent(); }
  function activate(id, origin) {
    if (reader.open || suspended || introRunning) return;
    if (selected === id) { if (ready && !menuBusy) openReader(id, origin); return; }
    select(id);
  }
  function setMenu(open) {
    if (introRunning) return;
    clearTimeout(menuTimer); menuOpen = open; menuBusy = !reduced.matches; clearReady();
    hovered = null; body.dataset.directory = String(open); body.dataset.menu = open ? 'opening' : 'closing';
    toggle.setAttribute('aria-expanded', String(open));
    shell.inert = !open; shell.setAttribute('aria-hidden', String(!open));
    if (!open && shell.contains(document.activeElement)) toggle.focus({preventScroll:true});
    updateBooks();
    menuTimer = setTimeout(() => {
      body.dataset.menu = open ? 'open' : 'closed'; menuBusy = false; scheduleReady();
    }, reduced.matches ? 0 : open ? 1200 : 780);
  }
  function openReader(id, origin) {
    const book = books.find(b => b.id === id);
    returnState = { menu: menuOpen, scroll: directory.scrollTop, focus: origin, position, selected };
    window.ArchiveReader.open(book.id);
    setMenu(false); reader.showModal();
  }
  function closeReader() {
    if (!reader.open) return;
    reader.close(); window.ArchiveReader.reset();
    const old = returnState; returnState = null;
    if (old) {
      selected = old.selected; position = old.position; target = old.position; applyPosition();
      setMenu(old.menu); directory.scrollTop = old.scroll;
      old.focus.focus({preventScroll:true}); updateBooks();
    }
  }
  toggle.addEventListener('click', () => setMenu(!menuOpen));
  document.getElementById('reader-close').addEventListener('click', closeReader);
  reader.addEventListener('cancel', e => { e.preventDefault(); closeReader(); });
  reader.addEventListener('click', e => {
    if (e.target === reader) {
      const r = reader.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeReader();
    }
  });
  viewport.addEventListener('click', e => {
    if (!e.target.closest('.archive-book')) clearSelection();
  });
  function browse(delta) {
    if (reader.open || menuBusy || suspended || introRunning) return;
    clearSelection(); moveTo(Math.round(target) + delta);
  }
  viewport.addEventListener('wheel', e => {
    e.preventDefault();
    if (menuBusy || reader.open || suspended || introRunning) return;
    clearSelection();
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const pixels = raw * (e.deltaMode === 1 ? 24 : e.deltaMode === 2 ? viewport.clientHeight : 1);
    moveTo(target + Math.max(-1.5, Math.min(1.5, pixels / 170)));
    clearTimeout(viewport._snapTimer);
    viewport._snapTimer = setTimeout(() => moveTo(Math.round(target)), 140);
  }, {passive:false});
  document.getElementById('shelf-prev').addEventListener('click', () => browse(-1));
  document.getElementById('shelf-next').addEventListener('click', () => browse(1));
  document.addEventListener('keydown', e => {
    if (introRunning) {
      if (e.key === 'Escape') { finishIntro(); e.preventDefault(); }
      return;
    }
    if (e.defaultPrevented) return;
    if (reader.open || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      if (menuOpen) { setMenu(false); toggle.focus({preventScroll:true}); }
      else clearSelection();
    } else if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key) && !shell.contains(e.target) && e.target !== toggle) {
      e.preventDefault();
      let index = selected ? books.findIndex(b => b.id === selected) : Math.round(target);
      index = e.key === 'Home' ? 0 : e.key === 'End' ? books.length - 1 : Math.max(0,Math.min(books.length-1,index+(e.key==='ArrowRight'?1:-1)));
      select(books[index].id); nodes.get(books[index].id).focus({preventScroll:true});
    }
  });
  function resize() {
    const width = parseFloat(getComputedStyle(body).getPropertyValue('--book-w'));
    spacing = width * .59; rise = width * .078;
    const height = parseFloat(getComputedStyle(body).getPropertyValue('--book-h'));
    volumes.forEach(({node,index}) => {
      node.style.setProperty('--book-x', index * spacing + 'px');
      node.style.setProperty('--book-y', -height + index * rise + 'px');
    });
    // 台面与书底共用同一斜率；滚动只沿这条直线移动，所以不会脱离承托面。
    const w = viewport.clientWidth, h = viewport.clientHeight;
    const trackStyle = getComputedStyle(track);
    const anchorX = parseFloat(trackStyle.left), anchorY = parseFloat(trackStyle.top);
    const slope = rise / spacing;
    const line = x => anchorY + (x - anchorX) * slope;
    const left = -w * .5, right = w * 1.5;
    const nearLeft = [left - 55, line(left) + 30];
    const nearRight = [right - 55, line(right) + 30];
    const farRight = [right + 145, line(right) - 65];
    const farLeft = [left + 145, line(left) - 65];
    const points = list => list.map(p => p.map(n => n.toFixed(2)).join(',')).join(' ');
    const top = points([nearLeft, nearRight, farRight, farLeft]);
    ground.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    ground.querySelector('.shelf-surface').setAttribute('points', top);
    ground.querySelector('.shelf-grain').setAttribute('points', top);
    ground.querySelector('.shelf-fascia').setAttribute('points', points([nearLeft, nearRight, [nearRight[0], nearRight[1] + 13], [nearLeft[0], nearLeft[1] + 13]]));
    ground.querySelector('.shelf-drop-shadow').setAttribute('points', points([nearLeft, nearRight, [nearRight[0] + 8, nearRight[1] + 32], [nearLeft[0] + 8, nearLeft[1] + 32]]));
    ground.querySelector('.shelf-front-edge').setAttribute('points', points([nearLeft, nearRight]));
    ground.querySelector('.shelf-back-edge').setAttribute('points', points([farLeft, farRight]));
    applyPosition();
  }
  function settle() {
    cancelAnimationFrame(raf); raf = 0; lastTime = 0;
    clearTimeout(viewport._snapTimer); position = Math.round(target); target = position; applyPosition();
    clearTimeout(menuTimer); body.dataset.menu = menuOpen ? 'open' : 'closed'; menuBusy = false;
    hovered = null; updateBooks(); scheduleReady();
  }
  document.addEventListener('visibilitychange', () => {
    suspended = document.hidden;
    if (suspended) { finishIntro(); settle(); clearReady(); }
    else scheduleReady();
  });
  reduced.addEventListener('change', () => { if (reduced.matches) finishIntro(); settle(); });
  window.addEventListener('resize', resize);
  window.addEventListener('pagehide', () => { suspended = true; finishIntro(); settle(); clearReady(); });
  window.addEventListener('pageshow', () => { suspended = false; scheduleReady(); });
  window.addEventListener('scene-transition-start', finishIntro);
  window.ArchiveShelf = { startIntro, finishIntro };
  viewport.inert = introRunning; toggle.disabled = introRunning;
  resize(); applyPosition(); captionCurrent();
})();
