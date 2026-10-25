// 安魂师数值卡：保留普通 CoC 的 460 点基线，再计算序列属性增长。
// 职业/兴趣分配使用原建卡属性；晋升不自动追加技能点或恢复 SAN。
// 灵感采用普通基础＋魔药累计＋途径累计；感知判定待用户制定。
var CHARACTER_TEMPLATE = (function () {
  'use strict';
  const baseAttributes = { STR: 50, CON: 55, SIZ: 60, DEX: 60, APP: 50, INT: 65, POW: 60, EDU: 60 };
  const attributeRules = typeof PATHWAY_ATTRIBUTES !== 'undefined' ? PATHWAY_ATTRIBUTES : require('./attributes.js').PATHWAY_ATTRIBUTES;
  const pathway = { key: 'darkness', name: '黑暗', sequence: 6, sequenceName: '安魂师', specialAttributeBonus: attributeRules.cumulative('darkness',6) };
  const sequenceIncrease = Math.max(0, 9 - pathway.sequence);
  const attributes = Object.assign({}, baseAttributes);
  ['STR', 'CON', 'DEX', 'INT', 'POW'].forEach(function (key) { attributes[key] += sequenceIncrease; });
  Object.entries(pathway.specialAttributeBonus).forEach(function (entry) { if (entry[0] in attributes) attributes[entry[0]] += entry[1]; });
  // key / 技能 / 基础 / 职业投入 / 兴趣投入 / 八项职业技能组
  const rows = [
    ['spot-hidden', '侦查', 25, 40, 0, true],
    ['library-use', '图书馆使用', 20, 40, 0, true],
    ['listen', '聆听', 20, 30, 0, true],
    ['psychology', '心理学', 10, 30, 0, true],
    ['persuade', '说服', 10, 40, 0, true],
    ['history', '历史', 5, 25, 0, true],
    ['photography', '艺术／工艺（摄影）', 5, 20, 0, true],
    ['own-language', '母语', attributes.EDU, 0, 0, true],
    ['credit-rating', '信用评级', 0, 15, 0],
    ['dodge', '闪避', Math.floor(attributes.DEX / 2), 0, 20],
    ['brawl', '格斗（斗殴）', 25, 0, 20],
    ['first-aid', '急救', 30, 0, 20],
    ['stealth', '潜行', 20, 0, 20],
    ['handgun', '射击（手枪）', 20, 0, 20],
    ['occult', '神秘学', 5, 0, 20],
    ['climb', '攀爬', 20, 0, 10],
    ['accounting', '会计', 5, 0, 0],
    ['anthropology', '人类学', 1, 0, 0],
    ['appraise', '估价', 5, 0, 0],
    ['archaeology', '考古学', 1, 0, 0],
    ['other-art', '艺术／工艺（其他专长）', 5, 0, 0],
    ['charm', '魅惑', 15, 0, 0],
    ['mythos', '克苏鲁神话', 0, 0, 0],
    ['disguise', '乔装', 5, 0, 0],
    ['drive', '汽车驾驶', 20, 0, 0],
    ['electrical', '电气维修', 10, 0, 0],
    ['fast-talk', '话术', 5, 0, 0],
    ['rifle', '射击（步枪／霰弹枪）', 25, 0, 0],
    ['intimidate', '恐吓', 15, 0, 0],
    ['jump', '跳跃', 20, 0, 0],
    ['other-language', '外语（每一门）', 1, 0, 0],
    ['law', '法律', 5, 0, 0],
    ['locksmith', '锁匠', 1, 0, 0],
    ['mechanical', '机械维修', 10, 0, 0],
    ['medicine', '医学', 1, 0, 0],
    ['natural-world', '博物学', 10, 0, 0],
    ['navigate', '导航', 10, 0, 0],
    ['heavy-machinery', '操作重型机械', 1, 0, 0],
    ['pilot', '驾驶（每一专长）', 1, 0, 0],
    ['psychoanalysis', '精神分析', 1, 0, 0],
    ['ride', '骑术', 5, 0, 0],
    ['science', '科学（每一专长）', 1, 0, 0],
    ['sleight', '妙手', 10, 0, 0],
    ['survival', '生存（每一环境）', 10, 0, 0],
    ['swim', '游泳', 20, 0, 0],
    ['throw', '投掷', 20, 0, 0],
    ['track', '追踪', 10, 0, 0]
  ];
  const skills = rows.map(function (r) {
    const value = r[2] + r[3] + r[4];
    return { key: r[0], name: r[1], base: r[2], occupation: r[3], interest: r[4],
      occupationSkill: !!r[5], value: value, hard: Math.floor(value / 2), extreme: Math.floor(value / 5) };
  });
  const hp = Math.floor((attributes.CON + attributes.SIZ) / 10);
  const spirituality = typeof SPIRITUALITY !== 'undefined' ? SPIRITUALITY : require('./spirituality.js').SPIRITUALITY;
  const inspirationBreakdown = spirituality.maximum(attributes.POW, attributes.INT, pathway.key, pathway.sequence);
  const inspirationMax = inspirationBreakdown.total;
  const physique = attributes.STR + attributes.SIZ;
  const build = physique <= 64 ? -2 : physique <= 84 ? -1 : physique <= 124 ? 0 : physique <= 164 ? 1 : 2;
  const damageBonus = ['-2', '-1', '0', '+1d4', '+1d6'][build + 2];
  const mov = attributes.STR < attributes.SIZ && attributes.DEX < attributes.SIZ ? 7
    : attributes.STR > attributes.SIZ && attributes.DEX > attributes.SIZ ? 9 : 8;
  return {
    baseAttributes: baseAttributes, attributes: attributes, skills: skills,
    pathway: pathway, sequenceIncrease: sequenceIncrease,
    inspirationBreakdown: inspirationBreakdown,
    inspirationRules: { maxFormula: '普通基础＋魔药累计＋途径累计', lowIntThreshold: spirituality.lowIntThreshold,
      thresholdStatus: spirituality.thresholdStatus, deityWhispers: null, mysticalFactors: null },
    derived: { hp: hp, inspiration: inspirationMax, inspirationMax: inspirationMax, san: baseAttributes.POW,
      sanMax: 99 - skills.find(s => s.key === 'mythos').value,
      luck: 55, mov: mov, damageBonus: damageBonus, build: build, armor: 0, majorWound: Math.ceil(hp / 2) }
  };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = { CHARACTER_TEMPLATE };
