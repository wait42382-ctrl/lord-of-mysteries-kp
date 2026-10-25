// ============================================================
// js/combat.js —— 敌人图鉴渲染
// 读取 data/enemies.js 的 ENEMIES，渲染数值卡
// （CoC 六维 + HP/SAN/MP + 序列能力 + 失控行为）。
// ============================================================

var Combat = (function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function stat(k, v) {
    return '<div class="stat"><div class="k">' + esc(k) + '</div><div class="v">' + esc(v==null?'—':v) + '</div></div>';
  }

  function render(container) {
    const list = window.ENEMIES;
    if (!list || !list.length) { container.innerHTML = '<p class="muted">未加载 enemies.js</p>'; return; }

    container.innerHTML = list.map(function (e) {
      const boss = /Boss|终战/.test(e.category);
      const seq = e.sequence ? '（' + e.pathway + '途径 序列' + e.sequence + ' ' + e.sequenceName + '）' : '';

      return `
        <div class="enemy-card${boss ? ' boss' : ''}">
          <div class="enemy-head">
            <span class="enemy-name">${esc(e.name)}</span>
            <span class="enemy-cat">${esc(e.category)} · ${esc(e.appearsIn)}</span>
          </div>
          ${seq ? '<div class="muted" style="font-size:12px;margin-bottom:8px">' + esc(seq) + '</div>' : ''}
          <div class="stat-grid">
            ${stat('STR', e.stats.STR)}
            ${stat('CON', e.stats.CON)}
            ${stat('SIZ', e.stats.SIZ)}
            ${stat('DEX', e.stats.DEX)}
            ${stat('POW', e.stats.POW)}
            ${stat('HP', e.stats.HP)}
            ${stat('SAN', e.stats.SAN)}
            ${stat('灵感', e.stats.inspiration)}
          </div>
          <div class="act-section"><h4>能力</h4>
            <ul>${e.abilities.map(function (a) {
              return '<li><b>' + esc(a.name) + '</b>：' + esc(a.desc) + '</li>';
            }).join('')}</ul>
          </div>
          <div class="act-section"><h4>失控行为</h4>
            <ul><li>${esc(e.lossOfControl)}</li></ul>
          </div>
          <div class="act-section"><h4>备注</h4>
            <ul><li class="muted-item">${esc(e.notes)}</li></ul>
          </div>
        </div>`;
    }).join('');
  }

  return { render };
})();
