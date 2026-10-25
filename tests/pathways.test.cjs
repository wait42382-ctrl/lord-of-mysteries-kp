const test = require('node:test');
const assert = require('node:assert/strict');
const { PATHWAYS } = require('../data/pathways.js');

test('22 途径的序列 8～4 都提供可用于带团的规则，且每序列不超过三条', () => {
  assert.equal(PATHWAYS.length, 22);
  for (const p of PATHWAYS) {
    for (const level of [8, 7, 6, 5, 4]) {
      const s = p.sequences.find(s => s.level === level);
      assert.ok(s, `${p.key} 缺序列 ${level}`);
      assert.ok(s.panelBonus && s.abilities.length <= 3, `${p.key}/${level} 条数错误`);
      for (const a of s.abilities) {
        assert.ok(['active', 'passive'].includes(a.type), `${p.key}/${level}/${a.name} 缺类型`);
        assert.ok(a.rule && a.rule.length > 10, `${p.key}/${level}/${a.name} 缺具体规则`);
        assert.ok(a.desc && a.name);
        assert.ok(Number.isInteger(a.cost) && a.cost >= 0);
        if (a.type === 'passive') assert.equal(a.cost, 0, `${a.name} 被动不应扣灵性`);
        if (a.type === 'active') assert.ok(a.action && a.check && a.range && a.duration, `${a.name} 缺施放条件`);
      }
    }
    assert.ok(p.abilitySource && /^https:\/\//.test(p.abilitySource.url), `${p.key} 缺来源`);
  }
});
