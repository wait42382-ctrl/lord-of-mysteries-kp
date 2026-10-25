// ============================================================
// js/app.js —— 主逻辑
// 负责：tab 切换、封印物卡片，以及加载后调用各模块 render 完成装配。
// （22 途径 / 途径速查已合并至独立页 pathways.html）
// ============================================================

(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // ---------- tab 切换 ----------
  function initTabs() {
    const tabs = document.querySelectorAll('.tool-tab');
    function activate(target) {
      const tab = document.querySelector('.tool-tab[data-tab="' + target + '"]');
      const pane = document.getElementById('pane-' + target);
      if (!tab || !pane) return;
      document.querySelectorAll('.tool-tab').forEach(function (t) { t.classList.toggle('active', t === tab); });
      document.querySelectorAll('.tool-pane').forEach(function (p) { p.classList.toggle('active', p === pane); });
    }
    function fromHash() {
      const target = location.hash.slice(1);
      if (['dice', 'events', 'enemies', 'artifact'].includes(target)) activate(target);
    }
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.getAttribute('data-tab');
        activate(target);
        history.replaceState(null, '', '#' + target);
      });
    });
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  // ---------- 封印物卡片 ----------
  function renderArtifact(container) {
    const a = window.ARTIFACT;
    if (!a) { container.innerHTML = '<p class="muted">未加载 artifact.js</p>'; return; }

    function fold(title, inner) {
      return `
        <div class="fold">
          <div class="fold-head"><span>▸</span><span>${esc(title)}</span></div>
          <div class="fold-body">${inner}</div>
        </div>`;
    }

    const effects = a.effects.map(function (e, i) {
      return '<li><b>' + (i + 1) + '. ' + esc(e.name) + '</b>：' + esc(e.desc) + '</li>';
    }).join('');

    const suppress = a.suppression.durationBySequence.map(function (d) {
      return '<tr><td style="padding:2px 12px 2px 0">序列 ' + d.sequence + '</td><td>' + esc(d.duration) + '</td></tr>';
    }).join('');

    const weak = a.spiritWeak.map(function (w) {
      return '<li>序列' + w.sequence + '：' + esc(w.pathways) + '</li>';
    }).join('');

    container.innerHTML = `
      <div class="card">
        <h3>${esc(a.name)}</h3>
        <div class="muted" style="font-size:12px;margin-bottom:6px">
          表面「${esc(a.surface.name)}」序列${a.surface.sequence}（${esc(a.surface.sequenceName)}）· ${a.surface.dangerLevel}级
          ｜ 真相「${esc(a.truth.name)}」序列${a.truth.sequence}（${esc(a.truth.sequenceName)}）· ${a.truth.dangerLevel}级
          ｜ 非官方，无编号
        </div>
        ${fold('本质与隐藏线',
          '<p class="muted">' + esc(a.essence) + '</p><p style="color:var(--red)">' + esc(a.hiddenLine) + '</p>')}
        ${fold('外观', '<p>' + esc(a.appearance) + '</p>')}
        ${fold('效果（9 条）', '<ul>' + effects + '</ul>')}
        ${fold('呓语检定',
          '<p>弱：' + esc(a.whisperCheck.weak.roll) + '；强：' + esc(a.whisperCheck.strong.roll) + '。</p><p class="muted">' + esc(a.whisperCheck.rule) + '</p>')}
        ${fold('抑制时长（太阳途径血液）',
          '<p class="muted">' + esc(a.suppression.method) + '</p><table>' + suppress + '</table><p class="muted">' + esc(a.suppression.otherPathwayBlood) + '</p><p class="muted">' + esc(a.suppression.defaultNote) + '</p>')}
        ${fold('「灵性弱」名单', '<ul>' + weak + '</ul>')}
        ${fold('剧情钩子', '<ul>' + a.hooks.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>')}
      </div>`;

    container.querySelectorAll('.fold-head').forEach(function (head) {
      head.addEventListener('click', function () {
        head.parentElement.classList.toggle('open');
      });
    });
  }

  // ---------- 装配 ----------
  function init() {
    initTabs();
    if (window.Dice) Dice.render(document.getElementById('pane-dice'));
    if (window.Flow) Flow.render(document.getElementById('flow-list'));
    if (window.Encounter) Encounter.render(document.getElementById('pane-events'));
    if (window.Combat) Combat.render(document.getElementById('pane-enemies'));
    renderArtifact(document.getElementById('pane-artifact'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
