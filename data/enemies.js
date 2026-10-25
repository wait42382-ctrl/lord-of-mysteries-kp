// ============================================================
// data/enemies.js —— 敌人图鉴
// 当前内容与档案目录一致；数值由 archive-actors.js 复算并由测试比对。
// 属性说明：CoC 7e 八属性之核心战斗四维 + SIZ（用于 HP）。
// HP = (CON + SIZ) / 10；SAN 由 POW 折算，污染会额外压低。
// 普通人平均属性 ≈ 50。数值可由 KP 调整。
// ============================================================

var ENEMIES = [
  {
    key: 'corrupted-buyer',
    name: '被污染的买家',
    category: '半异化失控者',
    appearsIn: '调查幕',
    stats: {
      STR: 55, CON: 50, SIZ: 50, DEX: 45, POW: 45,
      HP: 10, SAN: 15, inspiration: 9
    },
    pathway: null,
    sequence: null,
    sequenceName: null,
    abilities: [
      { name: '半异化', desc: '污染发作时力量已计入属性；抓挠40%，伤害1d3，每轮一次；闪避25%，无护甲。' },
      { name: '惊恐冲动', desc: '优先推开刺激源或离开；持续阻挡才反击。可安抚、隔离或制伏。' }
    ],
    lossOfControl: '艾达的发作分支，有明确预兆；不因一次社交失败强制启用。',
    notes: '与艾达·芬奇是同一人，变体切换不回血；可避免战斗，完整裁定见档案目录。'
  },
  {
    key: 'artifact-servant',
    name: '封印物仆从',
    category: '失控者 / 傀儡',
    appearsIn: '调查 / 冲突幕',
    stats: {
      STR: 60, CON: 60, SIZ: 60, DEX: 45, POW: 30,
      HP: 12, SAN: 0, inspiration: 4
    },
    pathway: null,
    sequence: null,
    sequenceName: null,
    abilities: [
      { name: '呓语驱使', desc: '阻挡后园入口，扑击45%，伤害1d4，每轮一次；闪避20%，无护甲。不是每轮免费施放呓语。' },
      { name: '不知疼痛', desc: '不因普通疼痛退缩，仍受伤害、重伤和昏迷规则影响；无再生。' }
    ],
    lossOfControl: '早已完全失控，只服从呓语的简单指令。',
    notes: '三人队总计1名活跃仆从，四人最多2名；宅邸与花园共用，不刷新。可诱离、束缚或绕过，后续由教会评估救治。'
  },
  {
    key: 'artifact-phantasm',
    name: '封印物幻象',
    category: '精神体 / 幻象',
    appearsIn: '调查幕',
    stats: {
      STR: null, CON: null, SIZ: null, DEX: null, POW: null,
      HP: null, SAN: null, inspiration: null
    },
    pathway: null,
    sequence: null,
    sequenceName: null,
    abilities: [
      { name: '欲望幻象', desc: '投射受害者最深欲望的幻象，诱人沉沦。' },
      { name: '呓语攻击', desc: '直接攻击 SAN，投呓语检定（见 artifact.js）。' }
    ],
    lossOfControl: '无实体，靠制造幻象与呓语侵蚀意志。',
    notes: '无实体，不设可物理击杀的HP；识别、离开污染或抑制本体。相同污染事件不因多段描述重复扣值。'
  },
  {
    key: 'current-holder',
    name: '奥斯温·哈罗（欲望使徒）',
    category: '半异化中序列非凡者（Boss）',
    appearsIn: '冲突幕',
    stats: {
      STR: 66, CON: 69, SIZ: 65, DEX: 61, POW: 66,
      HP: 13, SAN: 25, inspiration: 26
    },
    pathway: '罪犯',
    sequence: 5,
    sequenceName: '欲望使徒',
    abilities: [
      { name: '引爆欲望', desc: '5灵感、1行动，20m单体，须有可辨情绪并POW对抗；胜出二选一：2d6灵体伤害或下一行动1惩罚骰。' },
      { name: '恶魔化', desc: '4灵感、1行动、3回合：近战1奖励骰，爪击60%／1d6+1d4，护甲2；常态护甲0、徒手1d3+1d4，无免费再生。' },
      { name: '欲望化身', desc: '5灵感、1行动，施法POW，成功2回合普通物理伤害减半且可穿窄缝，不能用实体武器；闪避45%。' }
    ],
    lossOfControl: '已被封印物深度异化，濒临成为神临载体。',
    notes: '每轮1主要行动，可交涉、制伏或击倒；血液实际接触手指才触发大爆发。仪式可提前阻断，战斗完整行动与继承卡见档案目录。'
  },
  {
    key: 'mother-tree-projection',
    name: '欲望母树投影',
    category: '仪式显现／叙事高潮',
    appearsIn: '高潮与结局幕',
    stats: {
      STR: null, CON: null, SIZ: null, DEX: null, POW: null,
      HP: null, SAN: null, inspiration: null
    },
    pathway: null,
    sequence: null,
    sequenceName: null,
    abilities: [
      { name: '投影外观', desc: '本团原创表象：根系仿佛埋在人身的巨大黑树影，湿亮树皮偶尔拼成人脸，枝间垂着温柔却未完成的人形；树冠像正俯身倾听。' },
      { name: '气氛与感觉', desc: '湿土与熟果的甜味留在喉间，耳后传来亲昵称呼，心跳与树影呼吸同步；被理解的诱惑与失去边界的恐惧并存。分段朗读见档案目录“欲望母树投影”。' },
      { name: '叙事介入', desc: '观察媒介／寄生者／仪式的联系，听完愿望再作一次关键选择；未成寄生可阻止，已成寄生需实际切断宿主主持。血液抑制不自动逆转寄生，原封印物规则保持。' }
    ],
    lossOfControl: '外神意志的延伸，本身即失控与污染的具现。',
    notes: '投影非外神本体，无可击杀HP；提前有效干预可用散去残像收束，救人撤离也有成果。此处不安排清怪或固定回合拆解。'
  }
];

// Node 环境下导出（供测试/工具使用；浏览器中自动跳过）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ENEMIES };
}
