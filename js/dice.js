// ============================================================
// js/dice.js —— CoC 7e 骰子引擎 + 骰子面板
// 提供：CoC 7e d100 检定（普通/困难/极难/大成功/失败/大失败）、
//       奖励/惩罚骰、自定义骰（如 2d6+3）、快速骰按钮、掷骰历史。
// ============================================================

var Dice = (function () {
  'use strict';

  // ---- 引擎 ----
  function rand(n) { return Math.floor(Math.random() * n); }
  function roll(sides) { return 1 + rand(sides); }          // 1..sides
  function d100() { return 1 + rand(100); }                  // 1..100

  // 解析 "2d6+3" / "1d20" / "3" 之类表达式
  function parse(expr) {
    const s = String(expr).trim().toLowerCase();
    const m = s.match(/^(\d*)d(\d+)([+-]\d+)?$/);
    if (!m) return null;
    const count = m[1] ? parseInt(m[1], 10) : 1;
    const sides = parseInt(m[2], 10);
    const mod = m[3] ? parseInt(m[3], 10) : 0;
    if (sides < 1 || count < 1) return null;
    return { count, sides, mod };
  }

  // 掷自定义骰，返回 { expr, rolls, mod, total }
  function rollExpr(expr) {
    const p = parse(expr);
    if (!p) return null;
    const rolls = [];
    for (let i = 0; i < p.count; i++) rolls.push(roll(p.sides));
    const total = rolls.reduce((a, b) => a + b, 0) + p.mod;
    return { expr, rolls, mod: p.mod, total };
  }

  // CoC 7e 技能检定（含奖励/惩罚骰）
  // 返回 { target, rolls:[十位,个位], result, grade }
  function check(target, opts) {
    opts = opts || {};
    const bonus = Math.max(0, Math.floor(Number(opts.bonus) || 0));
    const penalty = Math.max(0, Math.floor(Number(opts.penalty) || 0));
    const net = Math.max(-2, Math.min(2, bonus - penalty));

    const unit = rand(10);              // 个位 0-9
    const tensArr = [rand(10)];         // 基础十位 0-9
    for (let i = 0; i < Math.abs(net); i++) tensArr.push(rand(10));
    // 比较完整结果：个位为 0 时，十位 0 是 100，不能直接取最小十位。
    const candidates = tensArr.map(t => t * 10 + unit || 100);
    const result = net > 0 ? Math.min.apply(null, candidates)
      : net < 0 ? Math.max.apply(null, candidates) : candidates[0];
    const chosen = tensArr[candidates.indexOf(result)];

    let grade;
    if (result === 1) grade = 'crit';          // 大成功 01
    else if (result === 100 || (target < 50 && result >= 96)) grade = 'fumble';
    else if (result <= Math.floor(target / 5)) grade = 'extreme';
    else if (result <= Math.floor(target / 2)) grade = 'hard';
    else if (result <= target) grade = 'success';
    else grade = 'fail';

    return { target, unit, tens: tensArr, chosen, result, grade };
  }

  const GRADE_TEXT = {
    crit: '大成功（01）',
    fumble: '大失败',
    extreme: '极难成功',
    hard: '困难成功',
    success: '普通成功',
    fail: '失败'
  };

  // ---- 面板渲染 ----
  const history = [];

  function render(container) {
    container.innerHTML = `
      <div class="card">
        <h3>d100 技能检定</h3>
        <div class="dice-row">
          <label>目标值</label>
          <input class="input" id="dice-target" type="number" min="1" max="100" value="50" style="width:90px">
          <button class="btn" id="dice-check">检定</button>
        </div>
        <div class="dice-row">
          <label>奖励/惩罚骰</label>
          <select class="select" id="dice-bonus">
            <option value="0">无</option>
            <option value="1">1 奖励骰</option>
            <option value="2">2 奖励骰</option>
            <option value="-1">1 惩罚骰</option>
            <option value="-2">2 惩罚骰</option>
          </select>
        </div>
        <div id="dice-check-result"></div>
      </div>

      <div class="card">
        <h3>自定义骰</h3>
        <div class="dice-row">
          <label>表达式</label>
          <input class="input" id="dice-expr" type="text" value="2d6+3" placeholder="如 2d6+3 / 1d20 / 1d6+1d8" style="width:160px">
          <button class="btn" id="dice-roll-expr">掷</button>
        </div>
        <div id="dice-expr-result"></div>
      </div>

      <div class="card">
        <h3>快速骰</h3>
        <div class="dice-row">
          <button class="btn small" data-quick="1d4">1d4</button>
          <button class="btn small" data-quick="1d6">1d6</button>
          <button class="btn small" data-quick="1d8">1d8</button>
          <button class="btn small" data-quick="1d10">1d10</button>
          <button class="btn small" data-quick="1d20">1d20</button>
          <button class="btn small" data-quick="1d100">1d100</button>
          <button class="btn small" data-quick="1d6+1d8">1d6+1d8</button>
        </div>
        <div id="dice-quick-result"></div>
      </div>

      <div class="card">
        <h3>掷骰历史</h3>
        <div id="dice-history" class="muted" style="font-family:Consolas,monospace;font-size:12px"></div>
      </div>
    `;

    // 事件绑定
    container.querySelector('#dice-check').addEventListener('click', onCheck);
    container.querySelector('#dice-roll-expr').addEventListener('click', onExpr);
    container.querySelectorAll('[data-quick]').forEach(function (b) {
      b.addEventListener('click', function () { quickRoll(b.getAttribute('data-quick')); });
    });
  }

  function onCheck() {
    const box = document.getElementById('dice-check-result');
    const target = parseInt(document.getElementById('dice-target').value, 10) || 50;
    const bonusSel = parseInt(document.getElementById('dice-bonus').value, 10) || 0;
    const opts = bonusSel > 0 ? { bonus: bonusSel } : bonusSel < 0 ? { penalty: -bonusSel } : {};
    const r = check(target, opts);

    const cls = ['hard', 'extreme'].includes(r.grade) ? 'success' : r.grade;
    box.innerHTML = `
      <div class="dice-result ${cls}">
        <span class="roll-num">${r.result}</span> / ${r.target}
        &nbsp;—&nbsp; ${GRADE_TEXT[r.grade]}
        ${(opts.bonus || opts.penalty) ? '<div style="font-size:12px;opacity:.8">十位骰: [' + r.tens.join(', ') + '] → 取 ' + r.chosen + '</div>' : ''}
      </div>`;
    pushHistory(`d100 检定(${target})${opts.bonus ? ' +奖励' + opts.bonus : opts.penalty ? ' +惩罚' + opts.penalty : ''} = ${r.result} ${GRADE_TEXT[r.grade]}`);
  }

  function onExpr() {
    const box = document.getElementById('dice-expr-result');
    const expr = document.getElementById('dice-expr').value.trim();
    const r = rollExpr(expr);
    if (!r) { box.innerHTML = '<div class="dice-result fail">表达式无法解析</div>'; return; }
    const detail = r.rolls.length > 1 ? ' [' + r.rolls.join(', ') + ']' : '';
    box.innerHTML = `
      <div class="dice-result">
        <span class="roll-num">${r.total}</span>
        <span style="font-size:12px;opacity:.8">= ${r.expr}${detail}${r.mod ? ' ' + (r.mod > 0 ? '+' : '') + r.mod : ''}</span>
      </div>`;
    pushHistory(r.expr + ' = ' + r.total + detail);
  }

  function quickRoll(expr) {
    const box = document.getElementById('dice-quick-result');
    const r = rollExpr(expr);
    const detail = r.rolls.length > 1 ? ' [' + r.rolls.join(', ') + ']' : '';
    box.innerHTML = `
      <div class="dice-result">
        <span class="roll-num">${r.total}</span>
        <span style="font-size:12px;opacity:.8">= ${expr}${detail}</span>
      </div>`;
    pushHistory(expr + ' = ' + r.total + detail);
  }

  function pushHistory(line) {
    history.unshift(line);
    if (history.length > 20) history.pop();
    const el = document.getElementById('dice-history');
    if (el) el.innerHTML = history.join('<br>');
  }

  return { render, check, roll, d100, rollExpr, parse, GRADE_TEXT };
})();
