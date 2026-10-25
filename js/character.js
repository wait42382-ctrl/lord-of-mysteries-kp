(function () {
  'use strict';
  const c = window.CHARACTER_TEMPLATE;
  if (!c) return;
  const baseTotal = Object.values(c.baseAttributes).reduce((n, v) => n + v, 0);
  const currentTotal = Object.values(c.attributes).reduce((n, v) => n + v, 0);
  const b = c.inspirationBreakdown;
  document.getElementById('character-tags').innerHTML =
    '<span class="tag">基础属性 ' + baseTotal + ' → ' + currentTotal + '</span>' +
    '<span class="tag">通用五项各＋' + c.sequenceIncrease + '</span><span class="tag">职业点 240</span><span class="tag">兴趣点 130</span>';
  document.getElementById('character-pathway').innerHTML =
    '<p><span>所属途径</span><strong>' + c.pathway.name + '途径</strong></p>' +
    '<p><span>当前序列</span><strong>序列 ' + c.pathway.sequence + ' · ' + c.pathway.sequenceName + '</strong></p>' +
    '<p><span>晋升累计</span><strong>序列 8 → 7 → 6，共 ' + c.sequenceIncrease + ' 次强化</strong></p>' +
    '<p><span>途径专属属性加成（提案）</span><strong>' + window.PATHWAY_ATTRIBUTES.describe(c.pathway.specialAttributeBonus) + '</strong></p>' +
    '<p><span>灵感上限构成</span><strong>普通 ' + b.ordinary.total + ' ＋ 魔药 ' + b.growth.potionTotal + ' ＋ 途径 ' + b.growth.pathwayTotal + ' ＝ ' + b.total + '</strong></p>' +
    '<p><span>低智力扣减</span><strong>INT＜' + c.inspirationRules.lowIntThreshold + '（暂定）时扣⌊INT÷10⌋；本卡扣 ' + b.ordinary.intelligencePenalty + '</strong></p>' +
    '<p><span>神之呓语 · 灵感上限门槛</span><strong class="pending-value">—</strong></p>' +
    '<p><span>神秘因素感知 · 灵感上限门槛</span><strong class="pending-value">—</strong></p>';
  const labels = { STR: '力量', CON: '体质', SIZ: '体型', DEX: '敏捷', APP: '外貌', INT: '智力', POW: '意志', EDU: '教育' };
  document.getElementById('character-attributes').innerHTML = Object.entries(c.attributes).map(function (entry) {
    const key = entry[0], value = entry[1];
    return '<article class="attribute-card"><h3>' + labels[key] + ' <span>' + key + '</span></h3><strong>' + value +
      '</strong><p class="attribute-origin">基础 ' + c.baseAttributes[key] + ' ＋ 通用 ' + (['STR','CON','DEX','INT','POW'].includes(key) ? c.sequenceIncrease : 0) + ' ＋ 专属 ' + (c.pathway.specialAttributeBonus[key] || 0) + '</p>' +
      '<p>困难 ' + Math.floor(value / 2) + ' <span> / </span> 极难 ' + Math.floor(value / 5) + '</p></article>';
  }).join('');
  const d = c.derived;
  const resources = [['生命 HP', d.hp + ' / ' + d.hp, '⌊(CON＋SIZ) / 10⌋'],
    ['灵感', d.inspiration + ' / ' + d.inspirationMax, '普通 ' + b.ordinary.total + '＋魔药 ' + b.growth.potionTotal + '＋途径 ' + b.growth.pathwayTotal], ['理智 SAN', d.san + ' / ' + d.sanMax, '沿用原卡；上限 99－神话'],
    ['幸运 LUCK', d.luck, '困难 ' + Math.floor(d.luck / 2) + ' · 极难 ' + Math.floor(d.luck / 5)],
    ['移动 MOV', d.mov, '按当前 STR / DEX / SIZ，无年龄减值'], ['伤害加值 / 体格', d.damageBonus + ' / ' + d.build, 'STR＋SIZ＝' + (c.attributes.STR + c.attributes.SIZ)]];
  document.getElementById('character-resources').innerHTML = resources.map(function (r) {
    return '<article class="resource-card"><h3>' + r[0] + '</h3><strong>' + r[1] + '</strong><p>' + r[2] + '</p></article>';
  }).join('');
  function table(skills) {
    return '<table class="skill-table"><thead><tr><th scope="col">技能</th><th scope="col">基础</th><th scope="col">职业＋</th><th scope="col">兴趣＋</th><th scope="col">普通</th><th scope="col">困难</th><th scope="col">极难</th></tr></thead><tbody>' + skills.map(function (s) {
      return '<tr data-skill="' + s.key + '"><th scope="row">' + s.name + '</th><td>' + s.base + '</td><td>' + s.occupation + '</td><td>' + s.interest + '</td><td class="skill-value">' + s.value + '</td><td>' + s.hard + '</td><td>' + s.extreme + '</td></tr>';
    }).join('') + '</tbody></table>';
  }
  document.getElementById('character-skills').innerHTML = table(c.skills.filter(s => s.occupationSkill || s.occupation || s.interest));
  document.getElementById('character-base-skills').innerHTML = table(c.skills.filter(s => !s.occupationSkill && !s.occupation && !s.interest));
  const skill = key => c.skills.find(s => s.key === key);
  document.getElementById('character-combat').innerHTML =
    '<p><span>徒手攻击</span><strong>' + skill('brawl').value + '% · 1d3＋DB（本卡为 1d3）</strong></p>' +
    '<p><span>闪避</span><strong>' + skill('dodge').value + '%（困难 ' + skill('dodge').hard + ' / 极难 ' + skill('dodge').extreme + '）</strong></p>' +
    '<p><span>护甲</span><strong>' + d.armor + '</strong></p><p><span>重伤门槛</span><strong>单次 ≥ ' + d.majorWound + ' HP</strong></p>';
  document.getElementById('character-budget').innerHTML =
    '<p>职业点：原 EDU ' + c.baseAttributes.EDU + ' × 4 ＝ ' + c.baseAttributes.EDU * 4 + '；已投入 ' + c.skills.reduce((n, s) => n + s.occupation, 0) + '，剩余 0。</p>' +
    '<p>兴趣点：原 INT ' + c.baseAttributes.INT + ' × 2 ＝ ' + c.baseAttributes.INT * 2 + '；已投入 ' + c.skills.reduce((n, s) => n + s.interest, 0) + '，剩余 0。</p>';
  const baseSkills = document.querySelector('.base-skills');
  let wasOpen = false;
  window.addEventListener('beforeprint', function () {
    wasOpen = baseSkills.open;
    baseSkills.open = true;
  });
  window.addEventListener('afterprint', function () { baseSkills.open = wasOpen; });
  document.getElementById('print-character').addEventListener('click', function () { window.print(); });
})();
