// ============================================================
// data/artifact.js —— 封印物「拜祭之指」（用户设计，已确认，勿擅自改动）
// 来源：规格文档 §6
// 本质：由「罪犯途径 序列3 呓语者」非凡特性析出构建的一根手指，
//       被欲望母树（外神）吸引。属非官方封印物，无编号，实为 1 级。
// ============================================================

var ARTIFACT = {
  key: 'baiji-zhi',
  name: '拜祭之指',

  // 名称与误导层（§6.3）
  surface: {
    name: '欲望食指',
    sequence: 5,
    sequenceName: '欲望使徒',
    dangerLevel: 2,
    note: '表面信息，错误'
  },
  truth: {
    name: '拜祭之指',
    sequence: 3,
    sequenceName: '呓语者',
    dangerLevel: 1,
    note: '真相'
  },

  official: false,          // 非官方封印物
  number: null,             // 无编号
  pathway: '罪犯',           // 来源途径（深渊途径）
  sourceSequence: 3,
  sourceSequenceName: '呓语者',
  attractor: '欲望母树',      // 被吸引的外神

  // 本质与隐藏线（§6.1）
  essence: '由罪犯途径序列3「呓语者」的非凡特性析出所构建的一根手指，被欲望母树吸引。',
  hiddenLine: '正常非凡特性析出应是一个手掌，这里只有一根手指 → 不完整，其余四指 + 手掌另有去向（玩家要挖出的深层真相）。',

  // 外观（§6.2）
  appearance: '手指通体黑色、干枯，指甲极长，有黑色线性雾气环绕；装于玻璃罩内，底座为呢绒垫。',

  // 效果（§6.4，9 条）
  effects: [
    { name: '呓语范围', desc: '半径 5m，不时听见呓语。' },
    { name: '直接失控', desc: '序列9 或「灵性弱」者在范围内 >6h → 直接失控。' },
    { name: '隐藏线引导', desc: '呓语潜移默化驱使受影响者寻找其余四指 + 手掌。' },
    { name: '纵欲冲动', desc: '脱离范围后仍有过度纵欲冲动。' },
    { name: '神临引导', desc: '范围内者受母树间接影响，主动促成母树投影神临。' },
    { name: '抑制', desc: '用太阳途径非凡者/生物的血液浸润呢绒垫，可把范围压回玻璃罩内。每次 300ml。序列越高持续越久（见 suppression 表）。其他途径血液大幅衰减（1d20=N → 有效时长 = 正常时长 N%）。' },
    { name: '爆发（最终战）', desc: '接触罪犯途径（同途径）非凡者血液 → 大爆发，大范围施加序列4~3 强度呓语，范围内者面临失控 / 重伤 / 同化。' },
    { name: '咒语（使用方法）', desc: '默念「伟大的恶魔之父，永世的嘶吼者，失心之神，请求您降下呓语惩罚罪人」→ 低程度爆发 + 手指以序列5 力量寻找寄生者。默念者免疫呓语 1~3 行动（KP 定夺；NPC 不受限）。' },
    { name: '寄生', desc: '被寄生 + 有仪式辅助 → 神临；被寄生 + 无仪式 → 寄生者立刻受序列3 呓语攻击，撑不住 → 同化失控。' }
  ],

  // 呓语检定（§6.5）
  whisperCheck: {
    weak: { roll: '1d20', effect: '扣 SAN + 累积失控值' },
    strong: { roll: '1d6+1d8', effect: '扣 SAN + 累积失控值' },
    rule: '受呓语影响者：灵性弱 → 1d20；灵性强 → 1d6+1d8。效果 = 扣 SAN + 累积失控值。'
  },

  // 抑制时长（§6.4-6，太阳途径血液浸润呢绒垫，每次 300ml）
  // 中间档为默认提案，可改。
  suppression: {
    method: '太阳途径非凡者/生物的血液浸润呢绒垫，每次 300ml',
    durationBySequence: [
      { sequence: 9, duration: '1 小时' },
      { sequence: 8, duration: '3 小时' },
      { sequence: 7, duration: '6 小时' },
      { sequence: 6, duration: '12 小时' },
      { sequence: 5, duration: '1 天' },
      { sequence: 4, duration: '1 周' }
    ],
    otherPathwayBlood: '其他途径血液大幅衰减：投 1d20=N → 有效时长 = 正常时长 N%。',
    defaultNote: '中间档（序列8=3h / 7=6h / 6=12h）为默认提案，可改。'
  },

  // 「灵性弱」名单（§6.6，精确）
  spiritWeak: [
    { sequence: 9, pathways: '大部分序列9，排除 占卜家、学徒、偷盗者' },
    { sequence: 8, pathways: '战士、水手、秘祈人、猎人、怪物、囚犯、罪犯' },
    { sequence: 7, pathways: '战士、怪物、囚犯' }
  ],

  // 剧情钩子（§6.7）
  hooks: [
    '若玩家队伍中有罪犯途径非凡者，其血液会成为封印物爆发的触发物（戏剧性拉满，KP 可善用）。',
    '序列3「呓语者」正是封印物来源序列，罪犯途径高序列玩家与之有特殊共鸣风险。'
  ]
};

// Node 环境下导出（供测试/工具使用；浏览器中自动跳过）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ARTIFACT };
}
