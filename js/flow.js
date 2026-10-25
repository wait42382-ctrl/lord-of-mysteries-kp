// ============================================================
// js/flow.js —— 线性流程轴渲染
// 读取 data/story.js 的 STORY，渲染 4 幕节点（点击展开详情）。
// ============================================================

var Flow = (function () {
  'use strict';

  function findNPC(key) {
    return (window.NPCS || []).find(function (n) { return n.key === key; });
  }
  function findEnemy(key) {
    return (window.ENEMIES || []).find(function (e) { return e.key === key; });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function render(container) {
    const s = window.STORY;
    if (!s) { container.innerHTML = '<p class="muted">未加载 story.js</p>'; return; }

    let html = `
      <div class="card">
        <h3>${esc(s.title)}</h3>
        <p class="muted" style="font-size:13px">${esc(s.hook)}</p>
        <div style="margin-top:8px;font-size:12px;color:var(--faint)">
          邪神：${esc(s.evilGod)} ｜ 主舞台：${esc(s.mainStage)}
        </div>
        <div style="font-size:12px;color:var(--faint)">副舞台：${s.sideStages.map(esc).join(' ／ ')}</div>
      </div>`;

    s.acts.forEach(function (act, i) {
      html += `
        <div class="act" id="act-${act.id}">
          <div class="act-head">
            <div class="act-num">${act.id}</div>
            <div class="act-title-box">
              <div class="act-title">${esc(act.title)}</div>
              <div class="act-subtitle">${esc(act.subtitle)}</div>
            </div>
            <span class="act-chevron">▶</span>
          </div>
          <div class="act-body">
            <p class="summary">${esc(act.summary)}</p>
            ${section('地点', [act.location])}
            ${act.npcs && act.npcs.length ? section('NPC', act.npcs.map(function (k) {
              const n = findNPC(k); return n ? n.name + ' · ' + n.role : k;
            })) : ''}
            ${act.enemies && act.enemies.length ? section('敌人', act.enemies.map(function (k) {
              const e = findEnemy(k); return e ? e.name + '（' + e.category + '）' : k;
            })) : ''}
            ${act.clues && act.clues.length ? section('线索', act.clues) : ''}
            ${act.checks && act.checks.length ? checksSection(act.checks) : ''}
            ${act.decision ? section('抉择', [act.decision]) : ''}
            ${act.endings && act.endings.length ? endingsSection(act.endings) : ''}
            ${act.randomEvents ? section('随机事件', ['挂载：' + act.randomEvents + '（见右侧「随机事件」面板）']) : ''}
          </div>
        </div>`;
    });

    container.innerHTML = html;

    // 点击展开/折叠
    container.querySelectorAll('.act-head').forEach(function (head) {
      head.addEventListener('click', function () {
        head.parentElement.classList.toggle('open');
      });
    });
    // 默认展开第一幕
    const first = container.querySelector('.act');
    if (first) first.classList.add('open');
  }

  function section(title, items) {
    if (!items || !items.length) return '';
    return `
      <div class="act-section">
        <h4>${title}</h4>
        <ul>${items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('')}</ul>
      </div>`;
  }

  function checksSection(checks) {
    return `
      <div class="act-section">
        <h4>检定</h4>
        ${checks.map(function (c) {
          return `
            <div class="check-item">
              <div class="check-skill">${esc(c.skill)}</div>
              <div class="check-roll">${esc(c.roll)}</div>
              <div class="check-result">成功：${esc(c.success)}<br>失败：${esc(c.fail)}</div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function endingsSection(endings) {
    return `
      <div class="act-section">
        <h4>结局</h4>
        <ul class="endings-box">${endings.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('')}</ul>
      </div>`;
  }

  return { render };
})();
