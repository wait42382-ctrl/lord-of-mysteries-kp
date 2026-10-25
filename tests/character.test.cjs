const test = require('node:test');
const assert = require('node:assert/strict');

test('安魂师继承普通卡基线，通用与专属面板分别累计', () => {
  const { CHARACTER_TEMPLATE: c } = require('../data/character.js');
  assert.equal(Object.values(c.baseAttributes).reduce((a, b) => a + b, 0), 460);
  assert.equal(Object.values(c.attributes).reduce((a, b) => a + b, 0), 483);
  assert.deepEqual(c.pathway, { key: 'darkness', name: '黑暗', sequence: 6, sequenceName: '安魂师', specialAttributeBonus: { STR: 1, DEX: 1, POW: 4, INT: 1, CON: 1 } });
  assert.equal(c.sequenceIncrease, 3);
  for (const key of Object.keys(c.attributes)) {
    assert.equal(c.attributes[key] - c.baseAttributes[key], (['STR', 'CON', 'DEX', 'INT', 'POW'].includes(key) ? 3 : 0) + (c.pathway.specialAttributeBonus[key] || 0));
  }
  assert.equal(c.skills.reduce((n, s) => n + s.occupation, 0), c.baseAttributes.EDU * 4);
  assert.equal(c.skills.reduce((n, s) => n + s.interest, 0), c.baseAttributes.INT * 2);
  assert.equal(c.skills.filter(s => s.occupationSkill).length, 8);
  assert.equal(new Set(c.skills.map(s => s.key)).size, c.skills.length);
  for (const s of c.skills) {
    assert.equal(s.value, s.base + s.occupation + s.interest);
    assert.equal(s.hard, Math.floor(s.value / 2));
    assert.equal(s.extreme, Math.floor(s.value / 5));
    assert.ok(s.value >= 0 && s.value <= 70);
  }
  const skill = key => c.skills.find(s => s.key === key);
  assert.equal(skill('own-language').base, c.attributes.EDU);
  assert.equal(skill('dodge').base, Math.floor(c.attributes.DEX / 2));
  assert.equal(skill('mythos').value, 0);
  assert.equal(skill('dodge').value, 52);
  assert.equal(c.inspirationRules.deityWhispers, null);
  assert.equal(c.inspirationRules.mysticalFactors, null);
  assert.equal(c.derived.mp, undefined);
  assert.deepEqual(c.derived, {
    hp: 11, inspiration: 21, inspirationMax: 21, san: 60, sanMax: 99, luck: 55, mov: 8,
    damageBonus: '0', build: 0, armor: 0, majorWound: 6
  });
});
