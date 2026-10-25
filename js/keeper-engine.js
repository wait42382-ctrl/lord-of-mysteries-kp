var KeeperEngine = (function () {
  'use strict';
  function parse(expression) {
    var source = String(expression).replace(/\s/g, '').toLowerCase();
    if (!source || source.length > 120 || !/^[+-]?(?:\d*d\d+|\d+)(?:[+-](?:\d*d\d+|\d+))*$/.test(source)) throw new Error('请输入有效表达式，例如 2d6+3 或 1d6+1d8。');
    var count = 0;
    var terms = source.match(/[+-]?[^+-]+/g).map(function (term) {
      var sign = term[0] === '-' ? -1 : 1;
      term = term.replace(/^[+-]/, '');
      if (!term.includes('d')) {
        var value = Number(term);
        if (!Number.isSafeInteger(value) || value > 100000) throw new Error('固定修正值请保持在 100000 以内。');
        return {sign:sign, constant:value};
      }
      var parts = term.split('d'), n = parts[0] ? Number(parts[0]) : 1, sides = Number(parts[1]);
      count += n;
      if (!Number.isInteger(n) || n < 1 || count > 24 || !Number.isInteger(sides) || sides < 2 || sides > 1000) throw new Error('每次最多掷 24 枚骰子，面数为 2～1000。');
      return {sign:sign, count:n, sides:sides};
    });
    if (!count) throw new Error('表达式需要至少一枚骰子。');
    return {source:source, terms:terms};
  }
  function expression(source, random) {
    var parsed = parse(source), rolls = [], dice = [], mod = 0;
    random = random || Math.random;
    parsed.terms.forEach(function (term) {
      if (term.constant !== undefined) { mod += term.sign * term.constant; return; }
      for (var i = 0; i < term.count; i++) {
        var value = Math.floor(random() * term.sides) + 1;
        rolls.push(term.sign * value);
        dice.push({sides:term.sides, value:value, sign:term.sign});
      }
    });
    return {expr:parsed.source, rolls:rolls, dice:dice, mod:mod, total:rolls.reduce(function (a,b) { return a+b; }, mod)};
  }
  function checkDice(result) {
    var selected = false;
    var dice = result.tens.map(function (t) {
      var chosen = !selected && t === result.chosen;
      if (chosen) selected = true;
      return {sides:10,value:t,role:'tens',chosen:chosen,label:String(t*10).padStart(2,'0')};
    });
    dice.push({sides:10,value:result.unit,role:'unit',chosen:true,label:String(result.unit)});
    return dice;
  }
  function save(key, value) { try { sessionStorage.setItem(key,JSON.stringify(value)); } catch (_) {} }
  function read(key, fallback) { try { var value = JSON.parse(sessionStorage.getItem(key)); return value === null ? fallback : value; } catch (_) { return fallback; } }
  return {parse:parse, expression:expression, checkDice:checkDice, save:save, read:read};
})();
if (typeof module !== 'undefined' && module.exports) module.exports = KeeperEngine;
