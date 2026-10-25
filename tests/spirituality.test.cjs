const test = require('node:test');
const assert = require('node:assert/strict');

test('普通灵感按 POW/5，低智力阈值按严格小于并扣 INT/10', () => {
  const { SPIRITUALITY } = require('../data/spirituality.js');
  assert.deepEqual(SPIRITUALITY.base(63, 68), { willpower: 12, intelligencePenalty: 0, total: 12 });
  assert.deepEqual(SPIRITUALITY.base(60, 39), { willpower: 12, intelligencePenalty: 3, total: 9 });
  assert.equal(SPIRITUALITY.base(60, 40).intelligencePenalty, 0);
  assert.equal(SPIRITUALITY.base(5, 39).total, 0);
});
test('用户填写的途径额外灵感分别累计且仅覆盖序列 9～3', () => {
  const { SPIRITUALITY } = require('../data/spirituality.js');
  assert.equal(SPIRITUALITY.growth('darkness', 9).potionTotal, 1);
  assert.equal(SPIRITUALITY.growth('darkness', 7).potionTotal, 3);
  assert.deepEqual(SPIRITUALITY.growth('darkness', 6), { potionGain: 2, potionTotal: 5, pathwayGain: 1, pathwayTotal: 3, extraTotal: 8 });
  assert.deepEqual(SPIRITUALITY.growth('wheel-of-fortune', 6), { potionGain: 2, potionTotal: 5, pathwayGain: 1, pathwayTotal: 4, extraTotal: 9 });
  assert.equal(SPIRITUALITY.maximum(67, 69, 'darkness', 6).total, 21);
  assert.equal(SPIRITUALITY.maximum(63, 68, 'wheel-of-fortune', 6).total, 21);
  assert.equal(SPIRITUALITY.growth('unknown', 6), null);
  assert.equal(SPIRITUALITY.maximum(63, 68, 'unknown', 6), null);
  assert.throws(() => SPIRITUALITY.growth('darkness', 10), RangeError);
  assert.equal(SPIRITUALITY.growth('wheel-of-fortune', 0), null);
  assert.equal(SPIRITUALITY.growth('darkness', 0), null);
  const { PATHWAYS } = require('../data/pathways.js');
  for (const key of ['darkness', 'wheel-of-fortune']) {
    const p = PATHWAYS.find(p => p.key === key);
    assert.equal(p.spirituality.referenceMaximum, key === 'wheel-of-fortune');
    for (const s of p.sequences) assert.deepEqual(s.spirituality, s.level < 3 ? undefined : SPIRITUALITY.growth(key, s.level));
    assert.ok(!p.sequences.flatMap(s => s.abilities).some(a => /灵性上限[＋+]\d+/.test(a.rule || '')), '旧加成不能继续重复计算');
  }
});
