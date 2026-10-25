// ============================================================
// js/encounter.js —— 随机事件面板（一键掷表 + 全部展开）
// 读取 data/events.js 的 RANDOM_TABLES：
//   呓语内容表 / 失控表现表 / 每幕随机遭遇表。
// 顶部统计总数；每个表标题带条数徽章，可「展开全部」浏览所有条目。
// ============================================================

var Encounter = (function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 每幕遭遇表总条数（自动统计，不硬编码）
  function countEncounterItems(t) {
    return Object.keys(t.encounters).reduce(function (n, k) {
      return n + t.encounters[k].items.length;
    }, 0);
  }

  function totalCount(t) {
    return t.whispers.length + t.lossOfControl.length + countEncounterItems(t);
  }

  function badge(n) {
    return '<span class="badge">' + n + '</span>';
  }

  // 折叠块（展开/收起，复用 .fold 结构）
  function fold(title, inner) {
    return `
      <div class="fold">
        <div class="fold-head"><span>▸</span><span>${title}</span></div>
        <div class="fold-body">${inner}</div>
      </div>`;
  }

  // 条目列表
  function renderList(items) {
    return '<ul class="event-list">' + items.map(function (it) {
      return '<li>' + esc(it) + '</li>';
    }).join('') + '</ul>';
  }

  // 每幕遭遇表全部内容（按幕分组）
  function renderEncountersAll(t) {
    return Object.keys(t.encounters).map(function (k) {
      const e = t.encounters[k];
      return '<div class="event-group"><div class="event-group-title">' + esc(e.title) + ' ' + badge(e.items.length) + '</div>' + renderList(e.items) + '</div>';
    }).join('');
  }

  function render(container) {
    const t = window.RANDOM_TABLES;
    if (!t) { container.innerHTML = '<p class="muted">未加载 events.js</p>'; return; }

    const encCount = countEncounterItems(t);
    const total = totalCount(t);

    container.innerHTML = `
      <div class="card event-summary">
        <h3>随机事件表</h3>
        <div class="event-summary-total">共 <b>${total}</b> 条</div>
        <div class="event-summary-rows">
          <span>呓语内容 <b>${t.whispers.length}</b></span>
          <span>失控表现 <b>${t.lossOfControl.length}</b></span>
          <span>每幕遭遇 <b>${encCount}</b>（${Object.keys(t.encounters).length} 幕）</span>
        </div>
      </div>

      <div class="card">
        <h3>呓语内容表 ${badge(t.whispers.length)}</h3>
        <button class="btn" data-roll="whispers">掷呓语</button>
        <div class="dice-result" id="enc-whispers" style="margin-top:10px">—</div>
        ${fold('展开全部 ' + t.whispers.length + ' 条', renderList(t.whispers))}
      </div>

      <div class="card">
        <h3>失控表现表 ${badge(t.lossOfControl.length)}</h3>
        <button class="btn" data-roll="loc">掷失控表现</button>
        <div class="dice-result" id="enc-loc" style="margin-top:10px">—</div>
        ${fold('展开全部 ' + t.lossOfControl.length + ' 条', renderList(t.lossOfControl))}
      </div>

      <div class="card">
        <h3>每幕随机遭遇 / 线索 ${badge(encCount)}</h3>
        <div class="dice-row">
          <label>选择幕</label>
          <select class="select" id="enc-act">
            ${Object.keys(t.encounters).map(function (k) {
              return '<option value="' + k + '">' + esc(t.encounters[k].title) + '</option>';
            }).join('')}
          </select>
          <button class="btn" data-roll="act">掷</button>
        </div>
        <div class="dice-result" id="enc-act-result" style="margin-top:10px">—</div>
        ${fold('展开全部 ' + encCount + ' 条（按幕分组）', renderEncountersAll(t))}
      </div>
    `;

    // 掷表按钮
    container.querySelectorAll('[data-roll]').forEach(function (b) {
      b.addEventListener('click', function () {
        const kind = b.getAttribute('data-roll');
        if (kind === 'whispers') {
          document.getElementById('enc-whispers').textContent = pick(t.whispers);
        } else if (kind === 'loc') {
          document.getElementById('enc-loc').textContent = pick(t.lossOfControl);
        } else if (kind === 'act') {
          const key = document.getElementById('enc-act').value;
          const table = t.encounters[key];
          if (table) document.getElementById('enc-act-result').textContent = pick(table.items);
        }
      });
    });

    // 折叠块展开/收起
    container.querySelectorAll('.fold-head').forEach(function (head) {
      head.addEventListener('click', function () {
        head.parentElement.classList.toggle('open');
      });
    });
  }

  return { render, pick };
})();
