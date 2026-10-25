// ============================================================
// data/identities.js —— 玩家身份：阵营三选一
// 来源：规格文档 §8
// 玩家不设固定职业，身份由「非凡者途径」决定：选一条途径（22 选一）
// + 一个序列（8~3）。阵营影响开场立场、NPC 关系、剧情钩子。
// 背景职业（侦探、记者、古董商、贵族等）由 KP 现场口述，不写入系统。
// ============================================================

var IDENTITIES = [
  {
    key: 'official',
    name: '官方非凡者',
    desc: '鲁恩三大教会成员，有组织庇护，但行动受纪律与立场约束。',
    factions: [
      { name: '值夜者', god: '黑夜女神', pathway: '不眠者' },
      { name: '代罚者', god: '风暴之主', pathway: '水手' },
      { name: '机械之心', god: '蒸汽与机械之神', pathway: '通识者' }
    ]
  },
  {
    key: 'unofficial',
    name: '非官方非凡者',
    desc: '民间散修，无组织归属。行动自由，但缺乏庇护与情报网。',
    factions: []
  },
  {
    key: 'cultist',
    name: '邪教教徒',
    desc: '各邪教组织成员。立场与官方对立，易被母树线索牵动。',
    factions: [
      { name: '玫瑰学派 / 纵欲派', pathway: '囚犯 / 被缚者' },
      { name: '深渊崇拜', pathway: '罪犯 / 深渊' },
      { name: '秘祈人', pathway: '倒吊人' },
      { name: '窥秘人', pathway: '隐者' }
    ]
  }
];

// 备注：背景职业由 KP 现场口述给玩家，不做预映射、不写入系统。
var IDENTITY_NOTE = '背景职业（侦探、记者、古董商、贵族等）由 KP 现场口述给玩家，不写入系统、不做预映射。';

// Node 环境下导出（供测试/工具使用；浏览器中自动跳过）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IDENTITIES, IDENTITY_NOTE };
}
