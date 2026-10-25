// ============================================================
// data/pathways.js —— 22 条成神途径（序列9 → 序列0）
// ============================================================
// 序列名称：已按原著与多来源核对（规格文档 §10 及 §12 来源）。
// abilities[].cost：灵性消耗，属本项目规则值（平衡提案，可改）。
// 序列 8～4 已整理为本团 CoC 改编：type 为 active/passive，rule 为效果与限制。
// 主动能力另含 check/action/range/duration；被动 cost=0。数值非官方规则。
// 资料来源与共通裁定见 docs/rules/sequence-abilities-coc.md；其他序列保留原概述。
//
// 结构：
// {
//   key: 'fool',          // 稳定标识（内部用）
//   name: '占卜家',        // 序列9 起始名
//   godName: '愚者',       // 序列0 真神名
//   sequences: [
//     { level: 9, name: '占卜家', abilities: [{ name, desc, cost }] },
//     ...
//   ]
// }
// ============================================================

var PATHWAYS = [
  {
    key: 'fool',
    name: '占卜家',
    godName: '愚者',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Fool_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '占卜家', abilities: [
        { name: '灵摆/梦境占卜', desc: '借助灵摆或梦境窥见命运片段，可对吉凶做模糊预判。', cost: 1 }
      ]},
      { level: 8, name: '小丑', abilities: [
        {"name":"纸刃","type":"active","desc":"将普通纸片化作锐利武器。","cost":1,"check":"斗殴或投掷","action":"1 行动","range":"近战或 10m","duration":"本次攻击","rule":"命中造成 1d4＋伤害加值（投掷用半伤害加值）；纸片用后损毁。"}
      ]},
      { level: 7, name: '魔术师', abilities: [
        {"name":"空气子弹","type":"active","desc":"压缩空气发射无形弹丸。","cost":2,"check":"施法（POW）对抗闪避","action":"1 行动","range":"20m","duration":"瞬时","rule":"命中造成 1d6＋2；普通护甲有效；完全掩体阻断。"},
        {"name":"火焰跳跃","type":"active","desc":"借现存火焰转移位置。","cost":2,"check":"自动；复杂落点需 DEX","action":"1 行动","range":"30m 内可见火焰","duration":"瞬时","rule":"移动到能容身的火焰旁；没有火焰不能发动，不能携带他人。"},
        {"name":"纸人替身","type":"active","desc":"让预备纸人承受一次伤害。","cost":3,"check":"DEX","action":"反应；消耗下次行动","range":"自身","duration":"本次伤害","rule":"在伤害骰掷出前声明，成功抵消一次物理攻击并移动 3m；需预备纸人。不能抵消区域污染或持续精神攻击。"}
      ]},
      { level: 6, name: '无面人', abilities: [
        {"name":"无面易容","type":"active","desc":"重塑外貌与声音，冒充另一人。","cost":2,"check":"自动；冒充举止用乔装","action":"1 行动","range":"自身","duration":"1 小时","rule":"外观层面的乔装检定获 1 奖励骰；不获得记忆、技能或真实性别变化，身高变化不超过一个头。"}
      ]},
      { level: 5, name: '秘偶大师', abilities: [
        {"name":"灵体之线初控","type":"active","desc":"逐步操纵目标灵体之线，使其行动僵滞。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"10m 内可感知活物","duration":"维持至多 3 回合","rule":"胜出使目标行动检定获 1 惩罚骰，移动减半；每回合占行动并支付消耗重新对抗。施术者受伤则控制中断。"},
        {"name":"秘偶化","type":"active","desc":"将完全受控的目标转为秘偶。","cost":6,"check":"POW 对抗 POW","action":"1 行动","range":"10m","duration":"至被毁或解除","rule":"仅在初控连续 3 回合成功后使用；再胜出完成秘偶化。最多持有 1 具，控制距离 100m；操控与自身共享每回合 1 个攻击行动。不得跳过控制过程。"}
      ]},
      { level: 4, name: '诡法师', abilities: [
        {"name":"秘偶互换","type":"active","desc":"与自己控制的秘偶瞬间交换位置。","cost":5,"check":"自动","action":"反应；消耗下次行动","range":"100m 内自有秘偶","duration":"瞬时","rule":"需连接完好的秘偶；可替代一次闪避，成功交换后原位置攻击命中秘偶。区域攻击仍按新位置结算。"},
        {"name":"诡法秘偶","type":"active","desc":"强化秘偶控制，并向秘偶分配自己的能力。","cost":6,"check":"POW 对抗 POW","action":"1 行动","range":"初控 30m；操控 300m","duration":"初控至多 3 回合","rule":"替代灵体之线初控：仍需连续 3 回合控制与最终秘偶化检定；持有上限增至 3。秘偶可用已学主动能力，仍由施术者支付消耗且共享攻击行动。"},
        {"name":"空气炮","type":"active","desc":"大幅增强空气弹丸的威力。","cost":6,"check":"施法（POW）对抗闪避","action":"1 行动","range":"50m","duration":"瞬时","rule":"替代空气子弹，命中造成 3d6；可破坏薄木墙，但不能穿越厚石墙或无视护甲。"}
      ]},
      { level: 3, name: '古代学者', abilities: [
        { name: '历史投影', desc: '从历史中借取/召唤出过去的物品、能力乃至人物投影。', cost: 4 }
      ]},
      { level: 2, name: '奇迹师', abilities: [
        { name: '实现奇迹', desc: '以累积的奇迹为代价，实现不可思议之事（如复活死者）。', cost: 5 }
      ]},
      { level: 1, name: '诡秘侍者', abilities: [
        { name: '隐秘权柄', desc: '扭曲规则、隐匿自身与事物，趋近愚者的权柄。', cost: 6 }
      ]},
      { level: 0, name: '愚者', abilities: [
        { name: '愚弄', desc: '愚弄历史、命运与规则的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'door',
    name: '学徒',
    godName: '门',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Door_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '学徒', abilities: [
        { name: '空间门', desc: '开启短暂的空间通道，实现短距穿梭与物品转移。', cost: 1 }
      ]},
      { level: 8, name: '戏法大师', abilities: [
        {"name":"闪光与黑幕","type":"active","desc":"以小型戏法干扰视线或遮蔽物件。","cost":1,"check":"闪光用 POW 对抗 CON；黑幕自动","action":"1 行动","range":"5m","duration":"1 回合","rule":"二选一：闪光对抗胜出令目标依赖视力的检定获 1 惩罚骰；黑幕遮住 1m 范围的小物件，不隐去声音或灵性。"},
        {"name":"气体转移","type":"active","desc":"转移少量有害气体。","cost":1,"check":"施法（POW）","action":"1 行动","range":"15m","duration":"瞬时","rule":"转移 1m 范围的气体至可见空处，暂清一条通路；不净化气体，不能直接抽走生物肺内空气。"}
      ]},
      { level: 7, name: '占星人', abilities: [
        {"name":"星象占卜","type":"active","desc":"借水晶球和星象获取启示。","cost":2,"check":"神秘学","action":"仪式：10 分钟","range":"个人或一处地点","duration":"一次启示","rule":"需线索和水晶球，耗时 10 分钟；成功得到一个方向、征兆或身份对应关系。不能询问无关联未知目标或直接指定未来结果。"},
        {"name":"占卜干扰","type":"active","desc":"遮蔽自己或同伴的灵性踪迹。","cost":2,"check":"施法（POW）","action":"1 行动","range":"接触 1 人","duration":"10 分钟","rule":"成功使针对目标的占卜和神秘追踪获 1 惩罚骰；同类干扰不叠加，高序列来源可抵消。"},
      ]},
      { level: 6, name: '记录官', abilities: [
        {"name":"记录与释放","type":"active","desc":"记录亲眼见到的主动非凡能力，随后重现。","cost":3,"check":"记录用神秘学；释放用原检定","action":"1 行动","range":"观察 20m 内施放","duration":"储存至使用","rule":"记录耗 3 灵性，需完整目睹并成功检定；本团限 3 个序列 6～9 能力槽，不能记录被动、封印物本质或权柄。释放占 1 行动，仅支付原消耗并用原检定；伤害与持续时间减半向上取整，用后删槽。"}
      ]},
      { level: 5, name: '旅行家', abilities: [
        {"name":"旅行","type":"active","desc":"经灵界通道转移到已知地点。","cost":5,"check":"神秘学","action":"1 行动","range":"本城市已去过的地点","duration":"瞬时","rule":"成功可携 1 名自愿同伴；每多 1 人另耗 2 灵性，最多 3 人。未知坐标、封锁空间不可直达；失败留在原处，大失败遭灵界污染，失控值＋2。"},
        {"name":"闪现","type":"active","desc":"短距离频繁转移，避开可见威胁。","cost":4,"check":"DEX","action":"反应；消耗下次行动","range":"20m 内已知安全落点","duration":"瞬时","rule":"成功避开一次可见物理攻击并转移；不抵消已附着的诅咒、精神控制或同时覆盖落点的范围伤害。"}
      ]},
      { level: 4, name: '秘法师', abilities: [
        {"name":"空间隐匿","type":"active","desc":"隔离出只经特定门进入的隐秘空间。","cost":7,"check":"神秘学","action":"1 行动","range":"20m 内一间房","duration":"3 回合或非战斗 10 分钟","rule":"需指定一扇出口；困住不愿者另做 POW 对抗，失败时目标可离开。空间到期安全返回，不能靠取消出口直接杀死目标。"},
        {"name":"短暂放逐","type":"active","desc":"把已控制的目标送入短暂空间乱流。","cost":8,"check":"POW 对抗 POW","action":"1 行动","range":"20m","duration":"2 回合","rule":"必须先束缚或控制目标；胜出令其离场 2 回合后返回原处，承受 2d6 伤害。不是永久放逐，同一目标每幕最多成功一次。"}
      ]},
      { level: 3, name: '漫游者', abilities: [
        { name: '灵界漫游', desc: '自由穿梭灵界与现实，隐匿行迹。', cost: 4 }
      ]},
      { level: 2, name: '旅法师', abilities: [
        { name: '跨位面旅行', desc: '跨位面、跨世界旅行，通达万千门径。', cost: 5 }
      ]},
      { level: 1, name: '星之匙', abilities: [
        { name: '门之钥', desc: '开启一切门扉与封印的钥匙权柄。', cost: 6 }
      ]},
      { level: 0, name: '门', abilities: [
        { name: '万物之门', desc: '一切「门」与「通道」概念的真神化身。', cost: null }
      ]}
    ]
  },
  {
    key: 'error',
    name: '偷盗者',
    godName: '错误',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Error_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '偷盗者', abilities: [
        { name: '偷窃', desc: '窃取他人随身之物，乃至短暂偷取技巧与能力。', cost: 1 }
      ]},
      { level: 8, name: '诈骗师', abilities: [
      ]},
      { level: 7, name: '解密学者', abilities: [
        {"name":"解密","type":"active","desc":"从已有线索推断隐藏联系和神秘结构。","cost":2,"check":"神秘学","action":"调查：1 分钟","range":"一组相关线索","duration":"本次推断","rule":"耗时 1 分钟；成功揭露一项暗号含义、能力弱点或追踪方向。必须拥有足够信息；未知高序列秘密用困难检定，不能无中生有。"},
      ]},
      { level: 6, name: '盗火人', abilities: [
        {"name":"盗取能力","type":"active","desc":"暂时偷走目标的一项主动能力。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"10m 可感知目标","duration":"2 回合","rule":"必须看过该能力，胜出暂禁目标使用并供自己使用；限序列 6～9，最多持有 1 项。施放另耗原灵性，保留原检定与限制；不能偷被动、权柄或生命。"}
      ]},
      { level: 5, name: '窃梦家', abilities: [
        {"name":"窃取念头","type":"active","desc":"偷走一个即将执行的念头，使目标忘记意图。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"15m","duration":"1 回合","rule":"胜出取消目标下次计划中的一个行动，施术者必须在下次行动执行对应意图；不获得完成意图所需的能力或材料。无法执行时不可偷取；目标仍可闪避或反击。"},
        {"name":"窃取梦境","type":"active","desc":"从睡眠者的梦中取得一段信息。","cost":3,"check":"POW 对抗 POW","action":"1 行动","range":"10m 内睡眠者","duration":"一个片段","rule":"胜出获得一段相关梦境或记忆线索；梦境可能象征化，非完整事实。主动攻击或唤醒使连接结束。"}
      ]},
      { level: 4, name: '寄生者', abilities: [
        {"name":"寄生","type":"active","desc":"以时之虫依附并逐步控制宿主。","cost":8,"check":"POW 对抗 POW","action":"1 行动","range":"接触","duration":"本幕；主动解除可结束","rule":"需连续 2 回合接触且两次胜出，最多 1 宿主。浅寄生共享感知；深寄生再对抗可控制 1 行动。受伤或强迫致命行为时宿主立刻重试对抗；不能额外获得宿主权柄。"},
        {"name":"强化盗取","type":"active","desc":"扩大盗取对象和能力层次。","cost":7,"check":"POW 对抗 POW","action":"1 行动","range":"20m","duration":"2 回合","rule":"替代盗取能力，可偷序列 4～9 的 1 项主动能力；对更高序列无效。每回合仍只有 1 行动，不获得永久特性；不能盗取时间、命运或真神权柄。"}
      ]},
      { level: 3, name: '欺瞒导师', abilities: [
        { name: '欺瞒命运', desc: '欺骗占卜与命运的窥探，误导对自身的预测。', cost: 4 }
      ]},
      { level: 2, name: '命运木马', abilities: [
        { name: '命运陷阱', desc: '在他人命运中埋入陷阱，令其自食恶果。', cost: 5 }
      ]},
      { level: 1, name: '时之虫', abilities: [
        { name: '偷窃时间', desc: '窃取他人时间、寿命与「过去」，制造时间错乱。', cost: 6 }
      ]},
      { level: 0, name: '错误', abilities: [
        { name: '制造错误', desc: '在概念层面制造「错误」，窃取与改写现实的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'sun',
    name: '歌颂者',
    godName: '太阳',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Sun_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '歌颂者', abilities: [
        { name: '歌颂', desc: '以歌声鼓舞士气，并对污秽施加微弱净化。', cost: 1 }
      ]},
      { level: 8, name: '祈光人', abilities: [
        {"name":"阳光","type":"active","desc":"放出净化亡灵的强光。","cost":2,"check":"施法（POW）对抗闪避","action":"1 行动","range":"10m 单体","duration":"瞬时","rule":"命中亡灵或污染实体造成 1d6；普通活物仅受强光干扰，下次视力检定获 1 惩罚骰，不额外扣 SAN。"},
      ]},
      { level: 7, name: '太阳神官', abilities: [
        {"name":"圣光召唤","type":"active","desc":"召唤圣光攻击敌人。","cost":3,"check":"施法（POW）对抗闪避","action":"1 行动","range":"20m 单体","duration":"瞬时","rule":"命中造成 1d6，亡灵或污秽实体额外＋1d6；普通护甲有效，灵体护甲由 KP 判定。"},
        {"name":"太阳光环","type":"active","desc":"鼓舞同伴并驱逐弱小污秽。","cost":3,"check":"施法（POW）","action":"1 行动","range":"半径 10m","duration":"3 回合","rule":"成功使自愿同伴抵抗恐惧、精神控制的 POW 检定获 1 奖励骰；不自动解除高序列控制或恢复 SAN。"},
        {"name":"太阳圣水","type":"active","desc":"赋予清水净化力量。","cost":2,"check":"神秘学","action":"制作：1 分钟","range":"接触一瓶水","duration":"1 小时或用完","rule":"制作需 1 分钟；可用投掷攻击亡灵，命中造成 1d6；或净化一处低序列污染残留。不能替代拜祭之指的血液抑制。"}
      ]},
      { level: 6, name: '公证人', abilities: [
        {"name":"公证强化","type":"active","desc":"对一项声明的行动进行超自然公证。","cost":3,"check":"神秘学","action":"1 行动","range":"10m 内 1 名自愿者","duration":"3 回合","rule":"指定一项已会的技能，成功后其相关检定获 1 奖励骰；不得扩大到所有行动，也不叠加同类奖励。"},
        {"name":"公证契约","type":"active","desc":"约束明确且自愿签订的约定。","cost":4,"check":"神秘学","action":"仪式：10 分钟","range":"接触双方","duration":"本团","rule":"耗时 10 分钟，双方知晓条款并同意；主动违约承受 1d6 灵性损失（不足部分扣 HP），每幕最多结算一次。不允许隐瞒条款或直接处死。"}
      ]},
      { level: 5, name: '光之祭司', abilities: [
        {"name":"光明之火","type":"active","desc":"强化圣光，灼烧敌人。","cost":5,"check":"施法（POW）对抗闪避","action":"1 行动","range":"30m 单体","duration":"瞬时","rule":"替代圣光召唤，命中造成 2d6，亡灵与污秽实体额外＋1d6；不能因为伤害高就免除攻击检定。"},
        {"name":"净化光环","type":"active","desc":"使周围充满可控的净化力量。","cost":5,"check":"施法（POW）","action":"1 行动","range":"半径 10m","duration":"3 回合","rule":"替代太阳光环，保留其奖励骰；进入或留在范围内的亡灵每回合对抗施术者 POW，失败受 1d6。低序列污染残留可清除，外神持续污染只能减缓。"}
      ]},
      { level: 4, name: '无暗者', abilities: [
        {"name":"无暗领域","type":"active","desc":"让纯净日光揭露隐藏与污秽。","cost":7,"check":"神秘学","action":"1 行动","range":"半径 20m","duration":"3 回合","rule":"成功令普通隐身、影藏显露；非凡隐藏逐目标做 POW 对抗。亡灵与污秽实体每回合对抗失败受 2d6；同一回合不与净化光环重复伤害。"},
        {"name":"无暗之枪","type":"active","desc":"凝聚太阳力量成攻击长枪。","cost":7,"check":"施法（POW）对抗闪避","action":"1 行动","range":"40m 单体","duration":"瞬时","rule":"命中造成 3d6，亡灵或污秽实体额外＋1d6；不能直接净化封印物本体或外神权柄。"}
      ]},
      { level: 3, name: '正义导师', abilities: [
        { name: '正义审判', desc: '以圣光裁决不义，加持自身与同伴的意志。', cost: 4 }
      ]},
      { level: 2, name: '逐光者', abilities: [
        { name: '逐光', desc: '追逐并凝聚至纯之光，极致净化一切污秽。', cost: 5 }
      ]},
      { level: 1, name: '纯白天使', abilities: [
        { name: '纯白圣光', desc: '降下纯白圣光，大范围净化与庇护。', cost: 6 }
      ]},
      { level: 0, name: '太阳', abilities: [
        { name: '光明权柄', desc: '光明、净化与生命之光的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'tyrant',
    name: '水手',
    godName: '暴君',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Tyrant_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '水手', abilities: [
        { name: '超凡体质', desc: '体魄强健、水性绝佳，能长时间耐受海洋环境。', cost: 1 }
      ]},
      { level: 8, name: '暴怒之民', abilities: [
        {"name":"暴怒一击","type":"active","desc":"积累愤怒后爆发强力打击。","cost":2,"check":"斗殴","action":"1 行动","range":"近战","duration":"本次攻击","rule":"须先命中或受到一次伤害，命中额外＋1d6 伤害；发动后重新积累，不能连续每回合无条件触发。"}
      ]},
      { level: 7, name: '航海家', abilities: [
      ]},
      { level: 6, name: '风眷者', abilities: [
        {"name":"风刃","type":"active","desc":"凝聚锋利气流切割目标。","cost":3,"check":"施法（POW）对抗闪避","action":"1 行动","range":"20m 单体","duration":"瞬时","rule":"命中造成 2d6，普通护甲有效；不能穿过完整掩体。"},
        {"name":"乘风","type":"active","desc":"短时间飞行或借气流缓冲坠落。","cost":3,"check":"施法（POW）","action":"1 行动","range":"自身；每回合 20m","duration":"3 回合","rule":"成功可短距飞行、滑翔或缓冲自身坠落；不能悬停无限续航。搬运另一人时每回合另耗 2 灵性。"}
      ]},
      { level: 5, name: '海洋歌者', abilities: [
        {"name":"海洋之歌","type":"active","desc":"以歌声干扰敌人的精神或灵体。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"半径 15m，至多 3 目标","duration":"2 回合","rule":"逐目标对抗，胜出使其所有行动检定获 1 惩罚骰；持续吟唱占每回合行动。堵耳只能令防御获 1 奖励骰，不能完全阻断。"},
        {"name":"闪电","type":"active","desc":"召来电击攻击单体。","cost":5,"check":"施法（POW）对抗闪避","action":"1 行动","range":"30m","duration":"瞬时","rule":"命中造成 2d6＋2；金属护甲不减伤，绝缘或魔法防护有效；不因处于水中就无限扩大目标数。"},
      ]},
      { level: 4, name: '灾难主祭', abilities: [
        {"name":"飓风","type":"active","desc":"制造强烈旋风席卷区域。","cost":8,"check":"施法（POW）；目标 DEX","action":"1 行动","range":"30m 内半径 10m","duration":"3 回合","rule":"施法成功后，范围内所有人每回合做 DEX；失败受 2d6 并倒地，成功伤害减半向下取整。不区分敌友，需要持续每回合支付 4 灵性。"},
        {"name":"连锁闪电","type":"active","desc":"使闪电在多个目标间跳跃。","cost":8,"check":"施法（POW）对抗闪避","action":"1 行动","range":"40m；目标间距 5m","duration":"瞬时","rule":"替代闪电，最多 3 目标，分别检定；首目标 3d6，后续各 2d6。金属护甲不减伤；不能重复跳回同一目标。"}
      ]},
      { level: 3, name: '海王', abilities: [
        { name: '统御海洋', desc: '号令海洋生物与洋流，掌控一片海域。', cost: 4 }
      ]},
      { level: 2, name: '天灾', abilities: [
        { name: '化身天灾', desc: '化身风暴与灾难，带来毁天灭地的力量。', cost: 5 }
      ]},
      { level: 1, name: '雷神', abilities: [
        { name: '掌控雷电', desc: '驾驭雷电，降下天罚。', cost: 6 }
      ]},
      { level: 0, name: '暴君', abilities: [
        { name: '风暴权柄', desc: '风暴与海洋之怒的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'visionary',
    name: '观众',
    godName: '空想家',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Visionary_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '观众', abilities: [
        { name: '洞察', desc: '如观众般冷静观察，洞察他人的行为逻辑与情绪。', cost: 1 }
      ]},
      { level: 8, name: '读心者', abilities: [
      ]},
      { level: 7, name: '心理医生', abilities: [
        {"name":"安抚","type":"active","desc":"缓解心理崩溃，使目标恢复理智。","cost":3,"check":"精神分析；不愿者另做 POW 对抗","action":"1 行动","range":"5m 单体","duration":"即时；治疗需 10 分钟","rule":"战斗中成功压住非污染性疯狂 2 回合；非战斗治疗可恢复本幕心理冲击损失的 SAN 1d3，每目标每幕一次，不超过原值与 SAN 上限。不清除非凡特性失控。"},
        {"name":"震慑","type":"active","desc":"以龙威般的压迫使敌人惊慌。","cost":3,"check":"POW 对抗 POW","action":"1 行动","range":"10m，至多 2 目标","duration":"1 回合","rule":"逐目标胜出使其下次行动获 1 惩罚骰；极难成功且胜出时目标改为丧失该行动。已经免疫此类恐惧的目标不适用。"}
      ]},
      { level: 6, name: '催眠师', abilities: [
        {"name":"战斗催眠","type":"active","desc":"短暂植入违背原意的指令。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"10m 单体","duration":"1 行动","rule":"胜出使目标执行一个简单非自杀指令，如放下武器或后退；明显致命或伤害最重要之人的命令无效，受伤立即解除。"},
        {"name":"心理学隐身","type":"active","desc":"留在目标意识盲区中。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"10m，至多 3 观察者","duration":"3 回合","rule":"逐目标胜出使其忽略施术者；对其他人不隐形，攻击或直接改变环境立刻解除。无法欺骗没有心智的装置。"},
      ]},
      { level: 5, name: '梦境行者', abilities: [
        {"name":"梦境引导","type":"active","desc":"进入睡眠者的梦，诱导其暴露秘密。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"20m 内睡眠者","duration":"10 分钟","rule":"胜出可得到一个相关秘密片段或植入温和暗示；仍需有明确话题，梦境不保证真实，强烈惊扰会唤醒目标并中断。"},
        {"name":"梦境穿梭","type":"active","desc":"借附近睡眠者的梦移动身体。","cost":5,"check":"神秘学","action":"1 行动","range":"50m 内已确认的梦境","duration":"瞬时","rule":"成功可在两个有睡眠者的地点间穿梭；需先接触过对应梦境，不可用自己的梦凭空创造落点。失败留原地，大失败失控值＋2。"}
      ]},
      { level: 4, name: '操纵师', abilities: [
        {"name":"潜意识操纵","type":"active","desc":"深植暗示，控制一小群目标。","cost":8,"check":"POW 对抗 POW","action":"1 行动","range":"20m，至多 3 目标","duration":"3 回合","rule":"逐目标对抗，胜出可每回合发一个简单指令。违背核心信念或受伤时目标获 1 奖励骰立即重试；不自动改写人格、夺取特性或令目标自杀。"},
        {"name":"精神瘟疫","type":"active","desc":"植入可传播的心智混乱。","cost":8,"check":"POW 对抗 POW","action":"1 行动","range":"15m 单体；接触者 3m","duration":"3 回合","rule":"胜出令目标行动获 1 惩罚骰并做 SAN 0/1d4；每回合只可向一个接触者传播，传播也需对抗。全场感染上限 3 人，同一目标本次仅扣一次 SAN。"}
      ]},
      { level: 3, name: '织梦人', abilities: [
        { name: '编织梦境', desc: '编织以假乱真的梦境，甚至将现实片段织入梦中。', cost: 4 }
      ]},
      { level: 2, name: '洞察者', abilities: [
        { name: '洞察命运', desc: '洞察命运走向与隐秘真相，趋近全知。', cost: 5 }
      ]},
      { level: 1, name: '作家', abilities: [
        { name: '书写现实', desc: '如作家书写故事般，将空想写为现实。', cost: 6 }
      ]},
      { level: 0, name: '空想家', abilities: [
        { name: '空想具现', desc: '将想象化为真实的造物权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'white-tower',
    name: '阅读者',
    godName: '白塔',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/White_Tower_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '阅读者', abilities: [
        { name: '快速阅读', desc: '极速阅读并牢记看过的文字与知识。', cost: 1 }
      ]},
      { level: 8, name: '推理学员', abilities: [
      ]},
      { level: 7, name: '侦探', abilities: [
        {"name":"现场重建","type":"active","desc":"从现场痕迹重构事件经过。","cost":2,"check":"侦查","action":"调查：1 分钟","range":"接触一处现场","duration":"一个关键片段","rule":"调查 1 分钟，成功还原一个动作顺序或重要人物动线；缺失痕迹不能补成确定事实，超自然抹除痕迹需困难检定。"},
      ]},
      { level: 6, name: '博学者', abilities: [
        {"name":"能力解析","type":"active","desc":"用已有知识辨别非凡能力的原理与弱点。","cost":3,"check":"神秘学","action":"1 行动","range":"20m 内目睹的能力","duration":"本幕","rule":"成功由 KP 告知一个可利用的限制；信息不足需困难成功。每种能力每幕一次，不自动解出高序列权柄。"},
        {"name":"模仿","type":"active","desc":"重现已经正确解析的能力。","cost":4,"check":"按模板原检定","action":"1 行动","range":"原能力范围的一半","duration":"原持续的一半","rule":"限序列 6～9 已解析的主动能力，每幕预先选 2 种。每次施放耗 4 灵性并另付原消耗，用原检定；伤害、范围与持续减半向上取整。不模仿被动、特性或无限复活。"}
      ]},
      { level: 5, name: '秘术导师', abilities: [
        {"name":"秘术编排","type":"active","desc":"从已研究的领域建立可用秘术。","cost":5,"check":"按模板原检定","action":"1 行动","range":"按所选模板","duration":"按所选模板","rule":"每幕预先选 2 种已解析的序列 5～9 主动模板；每次施放耗 5 灵性并另付原消耗，用原检定与限制，伤害和范围不超过原值。本条替代模仿，不能战斗中临时创造必中或必杀能力。"}
      ]},
      { level: 4, name: '预言家', abilities: [
        {"name":"预言","type":"active","desc":"看到近期最可能发生的情景。","cost":6,"check":"神秘学","action":"占卜：1 分钟","range":"一个相关事件","duration":"下一场景","rule":"耗时 1 分钟，每幕一次；成功得一个可行动的未来征兆，并为针对该征兆的首次行动给 1 奖励骰。不保证必然发生，也不直接指定敌人结局。"},
        {"name":"星界秘术","type":"active","desc":"利用已理解的星界知识改良秘术。","cost":7,"check":"神秘学","action":"升级模板：1 行动","range":"自身已准备模板","duration":"本幕","rule":"耗 7 灵性并成功检定，本幕可把 1 个秘术编排模板升级到序列 4；需先有合法研究记录。之后施放占另一次行动，按秘术编排支付 5 灵性及原消耗、用原检定与限制；未知权柄与外神知识不得直接调用。"}
      ]},
      { level: 3, name: '洞悉者', abilities: [
        { name: '洞悉真相', desc: '洞悉表象之下的本质与真相。', cost: 4 }
      ]},
      { level: 2, name: '智天使', abilities: [
        { name: '智慧权柄', desc: '承载智慧权柄，洞察万物规律。', cost: 5 }
      ]},
      { level: 1, name: '全知之眼', abilities: [
        { name: '全知', desc: '以全知之眼洞见一切知识与隐秘。', cost: 6 }
      ]},
      { level: 0, name: '白塔', abilities: [
        { name: '知识权柄', desc: '知识与智慧之源的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'abyss',
    name: '罪犯',
    godName: '深渊',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Abyss_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '罪犯', abilities: [
        { name: '超凡体质', desc: '体魄与战斗直觉超凡，精于近身搏杀。', cost: 1 }
      ]},
      { level: 8, name: '折翼天使', abilities: [
        {"name":"迟缓","type":"active","desc":"恶魔性力量压制目标的行动。","cost":2,"check":"POW 对抗 POW","action":"1 行动","range":"10m 单体","duration":"1 回合","rule":"胜出令移动减半，下一次 DEX 或闪避获 1 惩罚骰；不使目标失去全部行动。"},
      ]},
      { level: 7, name: '连环杀手', abilities: [
        {"name":"占卜干涉","type":"active","desc":"干扰追查自己犯罪与身份的神秘手段。","cost":2,"check":"施法（POW）","action":"1 行动","range":"自身与本次行动痕迹","duration":"本幕","rule":"成功使相关占卜、通灵获 1 惩罚骰；不抹除实体证据或证人记忆。"},
        {"name":"恶魔祭仪","type":"active","desc":"用完整祭仪寻求恶魔投影的帮助。","cost":4,"check":"神秘学","action":"仪式：30 分钟","range":"事先布置的仪式场","duration":"一次情报或协助","rule":"准备需 30 分钟、祭材与已有祭仪知识；成功获一个线索或一次相关检定奖励骰。大失败受 SAN 1/1d4 并失控值＋2；不能临场无材料召唤半神战力。"}
      ]},
      { level: 6, name: '恶魔', abilities: [
        {"name":"恶魔化","type":"active","desc":"显露恶魔身体，提升近战与防御。","cost":4,"check":"自动","action":"1 行动","range":"自身","duration":"3 回合","rule":"STR 检定及近战斗殴获 1 奖励骰，爪击 1d6＋伤害加值，护甲 2；结束失控值＋1。不同血统专有法术须另外与 KP 约定，不能一次获得所有血统技能。"}
      ]},
      { level: 5, name: '欲望使徒', abilities: [
        {"name":"引爆欲望","type":"active","desc":"催化已经出现的情绪与欲望。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"20m 单体","duration":"瞬时或 1 回合","rule":"目标必须已呈现可辨情绪；胜出二选一：造成 2d6 灵体伤害，或下一行动获 1 惩罚骰。不免除目标防御，不能无条件读出或制造欲望。"},
        {"name":"欲望化身","type":"active","desc":"化作欲望凝成的虚幻流体。","cost":5,"check":"施法（POW）","action":"1 行动","range":"自身；每回合 10m","duration":"2 回合","rule":"成功后非魔法物理伤害减半向下取整，可穿窄缝；期间不能用实体武器。净化、精神与灵体攻击照常，不能借此无伤躲避区域污染。"}
      ]},
      { level: 4, name: '魔鬼', abilities: [
        {"name":"心智侵蚀","type":"active","desc":"直接放大欲望并干扰思考。","cost":7,"check":"POW 对抗 POW","action":"1 行动","range":"20m，至多 3 目标","duration":"2 回合","rule":"替代引爆欲望的情绪前提；逐目标胜出，令 INT、心理学与行动判断获 1 惩罚骰，并做 SAN 0/1d4。不能以情绪膨胀直接判定死亡。"},
        {"name":"地狱火","type":"active","desc":"用恶魔火焰灼蚀一片区域。","cost":7,"check":"施法（POW）；目标 DEX","action":"1 行动","range":"20m 内半径 3m","duration":"瞬时","rule":"施法成功后，范围内所有人做 DEX；失败受 3d6，成功伤害减半向下取整。普通护甲减半取整后抵扣；精神防护不能替代抗火。"}
      ]},
      { level: 3, name: '呓语者', abilities: [
        { name: '呓语', desc: '发出污染心智的呓语，勾连欲望母树之力。', cost: 4 }
      ]},
      { level: 2, name: '鲜血大公', abilities: [
        { name: '操控血液', desc: '操控自身与他人的血液，以血为媒施法。', cost: 5 }
      ]},
      { level: 1, name: '污秽君王', abilities: [
        { name: '污秽权柄', desc: '统御污秽与堕落，侵蚀一切纯净。', cost: 6 }
      ]},
      { level: 0, name: '深渊', abilities: [
        { name: '深渊权柄', desc: '欲望与堕落之渊的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'chained',
    name: '囚犯',
    godName: '被缚者',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Chained_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '囚犯', abilities: [
        { name: '坚韧体魄', desc: '久经束缚的体魄坚忍，耐受疼痛与禁锢。', cost: 1 }
      ]},
      { level: 8, name: '疯子', abilities: [
        {"name":"狂化","type":"active","desc":"放纵冲动换取超凡力量和抗干扰能力。","cost":1,"check":"自动","action":"1 行动","range":"自身","duration":"3 回合","rule":"STR、斗殴与抵抗心智干扰的 POW 获 1 奖励骰；不能冷静调查或施放复杂仪式。结束失控值＋1，大失败另做项目失控检定。"}
      ]},
      { level: 7, name: '狼人', abilities: [
        {"name":"狼人化","type":"active","desc":"长出利爪，显露狼人形态。","cost":3,"check":"自动","action":"1 行动","range":"自身","duration":"3 回合","rule":"爪击以斗殴检定，伤害 1d6＋伤害加值；力量、速度相关 STR/DEX 检定获 1 奖励骰。太阳净化伤害额外＋1d4。"},
      ]},
      { level: 6, name: '活尸', abilities: [
        {"name":"冰霜控制","type":"active","desc":"以寒冰攻击并限制行动。","cost":3,"check":"施法（POW）对抗闪避","action":"1 行动","range":"15m 单体","duration":"瞬时；迟缓 1 回合","rule":"命中受 1d6＋2，下一次移动或闪避获 1 惩罚骰；火焰可解除迟缓，不对已免疫寒冷的敌人附加迟缓。"}
      ]},
      { level: 5, name: '怨魂', abilities: [
        {"name":"怨魂化与镜跳","type":"active","desc":"化为幽灵，穿越薄障碍或在镜面间跳跃。","cost":5,"check":"施法（POW）","action":"1 行动","range":"自身；镜面间 20m","duration":"2 回合","rule":"成功可穿普通门墙、隐入镜面；普通物理攻击无效，灵体攻击与净化有效。不能穿非凡封锁或携带他人；代替实体身体行动，不能同时狂化爪击。"},
        {"name":"怨魂附身","type":"active","desc":"经视线连接侵入目标身体。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"10m，需目光连接","duration":"1 回合","rule":"胜出控制目标一个非自杀行动；受伤或同伴驱邪时目标立即再对抗。失败暴露施术者位置；不能把附身当永久寄生。"}
      ]},
      { level: 4, name: '木偶', abilities: [
        {"name":"物品操纵","type":"active","desc":"令附近非生命物件自行活动。","cost":6,"check":"施法（POW）；持有人另做 POW 对抗","action":"1 行动","range":"20m，至多 3 小物件","duration":"3 回合","rule":"可移动门锁、武器等；争夺持有物需对抗。全组每回合合计 1 攻击，以施法对抗闪避，伤害按物件且最高 2d6；不能操控 1 级封印物。"},
        {"name":"诅咒之源","type":"active","desc":"通过确立的联系传递诅咒。","cost":7,"check":"POW 对抗 POW","action":"1 行动","range":"30m；需血液、头发或接触","duration":"3 回合","rule":"胜出令相关行动获 1 惩罚骰并造成 2d6 灵体伤害；同一次施放只伤害一次。联系切断、替身或净化可解除；不能用模糊传闻诅咒整座城市。"},
        {"name":"物化封印","type":"active","desc":"变为静止木偶，压住内在疯狂。","cost":4,"check":"自动；他人必须自愿","action":"1 行动","range":"自身或接触","duration":"3 回合","rule":"物化期间暂停当前失控发作但不能行动；结束恢复原状态，失控值不减少，不解除污染。最多每幕一次，不能通过循环物化刷 SAN。"}
      ]},
      { level: 3, name: '沉默门徒', abilities: [
        { name: '沉默', desc: '令言语与能力失效，以沉默压制他人。', cost: 4 }
      ]},
      { level: 2, name: '古代邪物', abilities: [
        { name: '邪物化', desc: '化为古代邪物，获得诡异的诅咒之力。', cost: 5 }
      ]},
      { level: 1, name: '神孽', abilities: [
        { name: '神之孽', desc: '化身为神所不容之孽，扭曲现实。', cost: 6 }
      ]},
      { level: 0, name: '被缚者', abilities: [
        { name: '束缚权柄', desc: '束缚与囚禁万物的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'hanged-man',
    name: '秘祈人',
    godName: '倒吊人',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Hanged_Man_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '秘祈人', abilities: [
        { name: '秘密祈祷', desc: '以隐秘祈祷与更高存在建立感应。', cost: 1 }
      ]},
      { level: 8, name: '倾听者', abilities: [
      ]},
      { level: 7, name: '隐修士', abilities: [
        {"name":"影中潜伏","type":"active","desc":"藏入较大的阴影并悄悄追踪。","cost":3,"check":"潜行","action":"1 行动","range":"自身；相连阴影 10m","duration":"3 回合","rule":"潜行获 1 奖励骰，依赖普通视力的侦查获 1 惩罚骰；强光、攻击或阴影消失会解除，仍可能被灵性感知。"},
        {"name":"阴影束缚","type":"active","desc":"使影子缠绕目标。","cost":3,"check":"POW 对抗 POW","action":"1 行动","range":"10m 单体","duration":"2 回合","rule":"胜出固定其位置，目标每回合可用行动重试 POW 或 STR 解除；仍可攻击，强光令维持者本次对抗获 1 惩罚骰。"}
      ]},
      { level: 6, name: '蔷薇主教', abilities: [
        {"name":"血肉修复","type":"active","desc":"操纵血肉治疗自身或接触者。","cost":4,"check":"医学","action":"1 行动","range":"接触单体","duration":"瞬时","rule":"成功恢复 1d6 HP，每个伤口只受益一次；不能复活、恢复被毁大脑或消除高序列异化。"},
        {"name":"血肉潜藏","type":"active","desc":"藏进足以容身的血肉载体。","cost":4,"check":"施法（POW）；活载体需自愿","action":"1 行动","range":"接触载体","duration":"10 分钟","rule":"成功隐藏身体，普通侦查获 1 惩罚骰；载体遭破坏时强制退出并受 1d6。不能操控宿主，也不免疫太阳净化。"}
      ]},
      { level: 5, name: '牧羊人', abilities: [
        {"name":"放牧","type":"active","desc":"容纳灵魂并借用其非凡能力。","cost":5,"check":"容纳用神秘学；施放用原检定","action":"仪式：10 分钟；切换 1 行动","range":"接触刚死亡的非凡者","duration":"本团，释放可结束","rule":"每魂耗 5 灵性、仪式 10 分钟；本团上限 3 魂，每魂预定最多 2 条序列 5～9 主动能力。切换占 1 行动，不耗灵性；施放另占行动，仅付原消耗、用原检定与限制。不能同时开多个魂；高于序列 5 须 KP 另定。"}
      ]},
      { level: 4, name: '黑骑士', abilities: [
        {"name":"灵肉斩","type":"active","desc":"以堕落巨剑同时伤害肉体与灵魂。","cost":7,"check":"斗殴","action":"1 行动","range":"近战","duration":"本次攻击","rule":"命中造成 3d6＋伤害加值，其中 1d6 为灵体伤害；不把全部伤害都当无视防御，灵体防护仍有效。"},
        {"name":"黑铠","type":"active","desc":"凝聚能偏转攻击的黑色铠甲。","cost":6,"check":"自动","action":"1 行动","range":"自身","duration":"3 回合","rule":"物理护甲 5，不与普通护甲相加；可提前碎铠减去一次物理伤害 2d6，随后效果结束。净化伤害只减 2 点。"},
        {"name":"堕落之影","type":"active","desc":"剥离异物意识为可攻击的阴影。","cost":7,"check":"POW 对抗 POW","action":"1 行动","range":"自身或 10m 单体","duration":"1 回合","rule":"对侵入者胜出可解除一项心智附着或操纵，使其化为可见阴影至下回合。只处理意识入侵，不自动清除外神污染或抹去真实人格。"}
      ]},
      { level: 3, name: '三首圣堂', abilities: [
        { name: '三首', desc: '分化多重意识，同时处理多线事务与祈祷。', cost: 4 }
      ]},
      { level: 2, name: '秽语长老', abilities: [
        { name: '秽语', desc: '以污秽之言施加诅咒，腐化他人心智。', cost: 5 }
      ]},
      { level: 1, name: '暗天使', abilities: [
        { name: '暗之天使', desc: '化身为黑暗与堕落的天使。', cost: 6 }
      ]},
      { level: 0, name: '倒吊人', abilities: [
        { name: '堕落权柄', desc: '堕落与倒吊之径的真神权柄。', cost: null }
      ]}
    ]
  },
  {
  "key": "darkness",
  "name": "不眠者",
  "godName": "黑暗",
  "abilitySource": {
    "label": "途径能力资料（搜索索引核对）",
    "url": "https://lordofthemysteries.fandom.com/wiki/Darkness_Pathway/Abilities",
    "checkedOn": "2026-10-11"
  },
  "sequences": [
    {
      "level": 9,
      "name": "不眠者",
      "abilities": [
        {
          "name": "夜视",
          "desc": "夜视卓越、精力充沛，几乎无需睡眠。",
          "cost": 1
        }
      ]
    },
    {
      "level": 8,
      "name": "午夜诗人",
      "abilities": [
        {
          "name": "午夜诗篇",
          "desc": "吟诵夜之诗歌，使目标安宁、恐惧或入眠。",
          "cost": 2,
          "type": "active",
          "rule": "逐目标对抗，胜出选择平静（情绪检定 1 奖励骰）或催眠（无行动）。战斗中的睡眠目标受伤即醒；堵耳令抵抗获 1 奖励骰。吟诵中断则结束。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "10m，至多 2 听众",
          "duration": "2 回合"
        }
      ]
    },
    {
      "level": 7,
      "name": "梦魇",
      "abilities": [
        {
          "name": "强制入梦",
          "desc": "把清醒目标短暂拉进梦境。",
          "cost": 4,
          "type": "active",
          "rule": "比较施法前双方当前灵感：目标＜施术者的0.5倍时强制成功，目标≥施术者的1.5倍时强制失败；其余情况做POW对抗。成功将一个清醒目标与自己一起拉入梦境，持续至多10分钟。施术者须有至少4点灵感，无论成功或失败均消耗4点，不额外给予比值奖励骰。",
          "check": "POW 对抗 POW",
          "action": "1行动",
          "range": "20m内",
          "duration": "10 分钟"
        },
        {
          "name": "梦境塑形",
          "desc": "引导梦境，探问隐藏的信息。",
          "cost": 3,
          "type": "active",
          "rule": "胜出得到梦主对一个问题的记忆或象征片段；可能受误记影响，不强制现实中的目标服从，失败梦主醒来。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "已进入的梦境",
          "duration": "一个问题"
        }
      ]
    },
    {
      "level": 6,
      "name": "安魂师",
      "abilities": [
        {
          "name": "安魂",
          "desc": "安抚或压制灵体，使之趋于平静。",
          "cost": 4,
          "type": "active",
          "rule": "敌对灵体对抗失败行动获 1 惩罚骰；自愿者可暂停一次非污染性的恐惧或躁狂。不能消灭灵魂或根治失控。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "15m 单体",
          "duration": "2 回合"
        }
      ]
    },
    {
      "level": 5,
      "name": "灵巫",
      "abilities": [
        {
          "name": "封存与驱使灵",
          "desc": "把已制伏的灵封存在身体中，借其能力。",
          "cost": 5,
          "type": "active",
          "rule": "每灵耗 5 灵感、准备 10 分钟，本团最多 2 个灵，每灵预定 1 项序列 5～9 主动模板。切换占 1 行动，不耗灵感；施放另占行动，仅付原消耗、用原检定。不能无限召灵或增加攻击次数。",
          "check": "封存用神秘学；施放用原检定",
          "action": "准备：10 分钟；切换 1 行动",
          "range": "接触已制伏或自愿的灵",
          "duration": "本幕"
        }
      ]
    },
    {
      "level": 4,
      "name": "守夜人",
      "abilities": [
        {
          "name": "黑夜领域",
          "desc": "涌出黑暗，保护同伴并干扰敌人。",
          "cost": 7,
          "type": "active",
          "rule": "成功后己方潜行获 1 奖励骰；逐敌对目标对抗，胜出令其视力相关行动获 1 惩罚骰。不同途径的黑暗领域效果不叠加。",
          "check": "施法（POW）；敌对者另做 POW 对抗",
          "action": "1 行动",
          "range": "半径 20m",
          "duration": "3 回合"
        },
        {
          "name": "幽发束缚",
          "desc": "以冰冷幽发束缚身体和灵体。",
          "cost": 6,
          "type": "active",
          "rule": "胜出令目标固定原地、行动获 1 惩罚骰；每回合可用行动重试 STR 或 POW 解除。太阳净化或强火可破坏幽发。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "15m 单体",
          "duration": "2 回合"
        },
        {
          "name": "隐秘遮蔽",
          "desc": "以夜幕遮蔽容貌和神秘联系。",
          "cost": 6,
          "type": "active",
          "rule": "成功使针对身份的占卜获 1 惩罚骰，遮蔽真实容貌；不删除记忆、物证或已经建立的强力诅咒连接。",
          "check": "神秘学",
          "action": "1 行动",
          "range": "接触 1 人",
          "duration": "本幕"
        }
      ]
    },
    {
      "level": 3,
      "name": "恐惧主教",
      "abilities": [
        {
          "name": "恐惧",
          "desc": "操纵恐惧，令他人陷入深重恐惧。",
          "cost": 4
        }
      ]
    },
    {
      "level": 2,
      "name": "隐秘之仆",
      "abilities": [
        {
          "name": "隐秘",
          "desc": "隐匿自身与事物的存在，难以被窥探。",
          "cost": 5
        }
      ]
    },
    {
      "level": 1,
      "name": "厄难骑士",
      "abilities": [
        {
          "name": "厄难",
          "desc": "降下厄难，令灾祸缠身。",
          "cost": 6
        }
      ]
    },
    {
      "level": 0,
      "name": "黑暗",
      "abilities": [
        {
          "name": "黑暗权柄",
          "desc": "黑暗与隐秘的真神权柄。",
          "cost": null
        }
      ]
    }
  ]
},

  {
    key: 'death',
    name: '收尸人',
    godName: '死神',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Death_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '收尸人', abilities: [
        { name: '尸体知识', desc: '深谙尸体与亡灵，能避免亡灵袭扰。', cost: 1 }
      ]},
      { level: 8, name: '掘墓人', abilities: [
        {"name":"死亡之眼","type":"active","desc":"辨认亡灵和失控怪物的弱点。","cost":2,"check":"侦查","action":"1 行动","range":"10m 可见单体","duration":"本场战斗","rule":"成功发现一个灵体节点或弱点；首次针对该点攻击获 1 奖励骰。不对普通活人提供弱点，也不自动命中。"},
        {"name":"灵的协助","type":"active","desc":"请周围弱小灵体进行简单协助。","cost":2,"check":"神秘学","action":"1 行动","range":"10m 内已有灵","duration":"1 回合","rule":"成功可传递一句话、拾取小物或牵制目标；牵制再做 POW 对抗，胜出令目标下一次移动获 1 惩罚骰。没有灵体不能凭空产生。"}
      ]},
      { level: 7, name: '通灵者', abilities: [
        {"name":"通灵","type":"active","desc":"与亡魂或自然灵沟通。","cost":3,"check":"神秘学","action":"仪式：10 分钟","range":"接触遗骸或 10m 内的灵","duration":"10 分钟","rule":"需香料或相关媒介，成功询问 2 个问题；答案限灵生前或当场所知，不保证诚实。高序列或恶灵需对抗并可能做 SAN 0/1d4。"},
      ]},
      { level: 6, name: '死灵导师', abilities: [
        {"name":"亡者之语","type":"active","desc":"以神秘语言影响灵体。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"10m 单体","duration":"1 回合","rule":"胜出造成 1d6 灵体伤害并使下一次行动获 1 惩罚骰；不受普通物理护甲影响，灵体防护有效。"},
        {"name":"驱使亡者","type":"active","desc":"唤起无主尸体，令其执行简单命令。","cost":4,"check":"神秘学","action":"仪式：1 分钟","range":"10m 尸体；控制 30m","duration":"本幕","rule":"准备 1 分钟，最多 2 具；每回合全体合计 1 个攻击，与施术者共享攻击行动。尸体用原 HP、斗殴最高 40、伤害 1d6；不恢复人格或非凡能力。"}
      ]},
      { level: 5, name: '看门人', abilities: [
        {"name":"冥界之门","type":"active","desc":"开启死亡通道，拖拽并限制目标。","cost":6,"check":"POW 对抗 POW","action":"1 行动","range":"15m 单体","duration":"2 回合","rule":"胜出造成 2d6 灵体伤害并固定目标；每回合重试 POW 可脱离。门关闭前目标返回现场，不直接判死，也不永久送入冥界。"},
        {"name":"体内藏灵","type":"active","desc":"在体内容纳亡灵并借其帮助。","cost":5,"check":"容纳用神秘学；施放用原检定","action":"准备：10 分钟","range":"接触已有灵","duration":"本幕","rule":"每灵耗 5 灵性、准备 10 分钟，本团最多 2 个灵，各预定 1 项序列 5～9 主动能力。切换占 1 行动，不耗灵性；施放另占行动，仅付原消耗、用原检定。容纳恶灵时额外做 SAN 0/1d4。"}
      ]},
      { level: 4, name: '不死者', abilities: [
        {"name":"亡灵统御","type":"active","desc":"更强地控制场内亡灵。","cost":7,"check":"POW 对抗 POW","action":"1 行动","range":"30m，至多 3 个亡灵","duration":"3 回合","rule":"逐目标胜出令其停止攻击或执行一个简单命令；有主人者防御获 1 奖励骰。仍共享每回合 1 个攻击行动，不能借统御夺取特性。"}
      ]},
      { level: 3, name: '摆渡人', abilities: [
        { name: '摆渡灵魂', desc: '摆渡灵魂往来生死，判其归宿。', cost: 4 }
      ]},
      { level: 2, name: '死亡执政官', abilities: [
        { name: '死亡权柄', desc: '行使死亡权柄，裁定生死。', cost: 5 }
      ]},
      { level: 1, name: '苍白皇帝', abilities: [
        { name: '苍白皇权', desc: '以苍白皇权统御死亡与衰败。', cost: 6 }
      ]},
      { level: 0, name: '死神', abilities: [
        { name: '永眠权柄', desc: '死亡与永眠的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'twilight-giant',
    name: '战士',
    godName: '黄昏巨人',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Twilight_Giant_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '战士', abilities: [
        { name: '超凡体魄', desc: '力量与敏捷超常，精通战斗。', cost: 1 }
      ]},
      { level: 8, name: '格斗家', abilities: [
      ]},
      { level: 7, name: '武器大师', abilities: [
      ]},
      { level: 6, name: '黎明骑士', abilities: [
        {"name":"晨曦之剑","type":"active","desc":"凝聚具有净化力量的武器。","cost":3,"check":"自动；攻击用斗殴","action":"1 行动","range":"近战","duration":"3 回合","rule":"命中造成 1d8＋伤害加值，亡灵额外＋1d4；可伤灵体。不能与手中另一武器同时加一次攻击。"},
        {"name":"黎明铠甲","type":"active","desc":"召唤轻便的晨曦护甲。","cost":3,"check":"自动","action":"1 行动","range":"自身","duration":"3 回合","rule":"物理护甲 3，不与普通护甲相加；直接精神与灵体伤害不受减免。"},
        {"name":"光之风暴","type":"active","desc":"粉碎晨曦之剑为旋转的光刃。","cost":5,"check":"施法（POW）；目标 DEX","action":"1 行动","range":"半径 5m","duration":"瞬时","rule":"须已有晨曦之剑；施法成功后范围内所有人做 DEX，失败受 2d6、成功减半，亡灵额外＋1d6。用后剑消失，3 回合内不能重凝。"}
      ]},
      { level: 5, name: '守护者', abilities: [
        {"name":"守护屏障","type":"active","desc":"放弃进攻，以屏障为同伴挡伤。","cost":5,"check":"自动","action":"1 行动","range":"自身与身后 3m 同伴","duration":"至多 3 回合","rule":"需插剑并每回合占行动维持：来自正面的物理伤害减 6，净化伤害减 3；移动、进攻或被绕后即结束，不与护甲重复取值。"},
      ]},
      { level: 4, name: '猎魔人', abilities: [
        {"name":"猎魔之眼","type":"active","desc":"辨认腐化、附身与异常弱点。","cost":5,"check":"侦查","action":"1 行动","range":"20m 单体","duration":"本幕","rule":"成功揭示一项污染来源或弱点，首次利用该信息的检定获 1 奖励骰；高序列隐藏用困难成功，不自动获知全部能力。"},
        {"name":"心灵隐匿","type":"active","desc":"遮蔽意图，绕过危险预感。","cost":6,"check":"神秘学","action":"1 行动","range":"自身","duration":"3 回合","rule":"成功使追踪自身意图的占卜获 1 惩罚骰，偷袭的潜行获 1 奖励骰；仍会留下声响、脚印与可见动作。"},
        {"name":"强化守护","type":"active","desc":"将屏障锚定到地面，阻断强力侵入。","cost":7,"check":"自动；非凡侵入做 POW 对抗","action":"1 行动","range":"自身与身后 5m 同伴","duration":"3 回合","rule":"替代守护屏障，正面物理减伤增至 10、灵体或净化减伤 4；可对抗穿越屏障的传送。须每回合占行动且不可移动，失败不能阻断高序列侵入。"}
      ]},
      { level: 3, name: '银骑士', abilities: [
        { name: '银骑士化', desc: '化为银骑士，以圣银之力净化与作战。', cost: 4 }
      ]},
      { level: 2, name: '荣耀者', abilities: [
        { name: '荣耀', desc: '以荣耀之名，极致的勇气与战力。', cost: 5 }
      ]},
      { level: 1, name: '神明之手', abilities: [
        { name: '神之手', desc: '化为神明之手，执掌伟力。', cost: 6 }
      ]},
      { level: 0, name: '黄昏巨人', abilities: [
        { name: '黄昏权柄', desc: '黄昏与衰败的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'demoness',
    name: '刺客',
    godName: '魔女',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Demoness_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '刺客', abilities: [
        { name: '暗杀', desc: '精于隐匿与致命一击，暗杀技艺高超。', cost: 1 }
      ]},
      { level: 8, name: '教唆者', abilities: [
        {"name":"教唆","type":"active","desc":"放大已有的不满、敌意或贪欲。","cost":2,"check":"POW 对抗 POW","action":"1 行动","range":"5m，须能沟通","duration":"1 分钟","rule":"需交谈至少 1 回合，胜出促使目标采取一个符合已有欲望的选择；不创造完全不存在的动机，直接致命或明显违背信念的要求无效。"}
      ]},
      { level: 7, name: '女巫', abilities: [
        {"name":"隐身","type":"active","desc":"藏入阴影，避开普通视线。","cost":3,"check":"潜行","action":"1 行动","range":"自身","duration":"3 回合","rule":"潜行获 1 奖励骰；声音、足迹与灵性感知仍可能暴露，强光或攻击令隐身解除。"},
        {"name":"黑焰与冰霜","type":"active","desc":"运用黑火或寒冰打击目标。","cost":3,"check":"施法（POW）对抗闪避","action":"1 行动","range":"15m 单体","duration":"瞬时","rule":"二选一：黑焰命中造成 1d6 灵体伤害；冰霜造成 1d6 物理伤害并使下次移动获 1 惩罚骰。不能一次获得两种效果。"},
        {"name":"镜面替身","type":"active","desc":"以预备镜面承受一次攻击。","cost":3,"check":"DEX","action":"反应；消耗下次行动","range":"自身；附近 5m 有镜","duration":"本次伤害","rule":"在伤害骰前声明，成功抵消一次可见物理攻击，镜面破碎；不抵消持续诅咒、精神或区域污染。"}
      ]},
      { level: 6, name: '欢愉', abilities: [
        {"name":"蛛丝束缚","type":"active","desc":"以近乎无形的丝线限制目标。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"15m 单体","duration":"2 回合","rule":"胜出令目标移动停止、斗殴与闪避获 1 惩罚骰；每回合可用行动重试 STR 解除，强火可烧断丝线。"},
      ]},
      { level: 5, name: '痛苦', abilities: [
        {"name":"疾病","type":"active","desc":"释放加速发作的病原。","cost":5,"check":"施法（POW）；目标 CON","action":"1 行动","range":"半径 10m","duration":"3 回合","rule":"施法成功后范围内所有活物做 CON，失败每回合受 1d3 HP、行动获 1 惩罚骰；每回合重试 CON 可终止。不重复叠病，不感染普通亡灵，强火与净化可清除。"}
      ]},
      { level: 4, name: '绝望', abilities: [
        {"name":"瘟疫","type":"active","desc":"强化病原，侵蚀身体与灵性。","cost":8,"check":"施法（POW）；目标 CON","action":"1 行动","range":"半径 20m","duration":"3 回合","rule":"替代疾病，失败每回合受 1d6 HP 或失去 1d6 灵性（二选一）；能影响低序列亡灵，每回合可重试。不可叠加疾病，同样会感染同伴。"},
        {"name":"镜界穿梭","type":"active","desc":"借熟悉镜面在镜界中移动。","cost":6,"check":"神秘学","action":"1 行动","range":"100m 内曾见过的完整镜面","duration":"瞬时","rule":"成功进入另一镜面附近；最多携 1 自愿者，另耗 3 灵性。净化封锁或镜面破碎则不可用，失败留原处，大失败失控值＋2。"}
      ]},
      { level: 3, name: '不老', abilities: [
        { name: '不老', desc: '容颜与生命停滞，青春不老。', cost: 4 }
      ]},
      { level: 2, name: '灾难', abilities: [
        { name: '灾难权柄', desc: '招来灾祸，化身灾难。', cost: 5 }
      ]},
      { level: 1, name: '末日', abilities: [
        { name: '末日', desc: '降下末日，带来终焉。', cost: 6 }
      ]},
      { level: 0, name: '魔女', abilities: [
        { name: '灾祸权柄', desc: '灾祸与诱惑的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'red-priest',
    name: '猎人',
    godName: '红祭司',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Red_Priest_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '猎人', abilities: [
        { name: '追踪狩猎', desc: '精于追踪与狩猎，锁定猎物。', cost: 1 }
      ]},
      { level: 8, name: '挑衅者', abilities: [
        {"name":"挑衅","type":"active","desc":"以侮辱或敌意诱使目标失去冷静。","cost":2,"check":"POW 对抗 POW","action":"1 行动","range":"10m 单体","duration":"1 回合","rule":"胜出使目标下次针对他人的攻击获 1 惩罚骰；攻击施术者则无惩罚。不是强制嘲讽，也不保证目标放弃撤退。"},
      ]},
      { level: 7, name: '纵火家', abilities: [
        {"name":"火球","type":"active","desc":"制造并投射压缩火焰。","cost":3,"check":"施法（POW）对抗闪避","action":"1 行动","range":"20m 单体","duration":"瞬时","rule":"命中造成 2d6，若周围可燃则点燃小物；不能无限追踪目标或无视防火掩体。"},
        {"name":"火焰武器","type":"active","desc":"把自身火焰凝成武器。","cost":3,"check":"自动；攻击用斗殴","action":"1 行动","range":"近战","duration":"3 回合","rule":"每次命中以原武器伤害额外＋1d4 火焰；不与火球同次攻击合用，对防火目标只结算实体部分。"},
      ]},
      { level: 6, name: '阴谋家', abilities: [
        {"name":"火焰化","type":"active","desc":"融入自己投出的火焰移动。","cost":4,"check":"施法（POW）","action":"1 行动","range":"自身火焰落点 10m","duration":"瞬时","rule":"成功移动到安全落点，可兼作本回合移动；攻击仍须另外占行动与支付消耗。携带者不自动抗火，不可穿过厚墙。"}
      ]},
      { level: 5, name: '收割者', abilities: [
        {"name":"弱点洞察","type":"active","desc":"锁定敌人身体的破绽。","cost":3,"check":"侦查","action":"1 行动","range":"20m 单体","duration":"至下次命中或 2 回合","rule":"成功使下次针对该目标的攻击获 1 奖励骰；不能凭空替目标增加致命弱点。"},
        {"name":"收割","type":"active","desc":"集中力量攻击已锁定的弱点。","cost":6,"check":"斗殴或施法（POW）对抗闪避","action":"1 行动","range":"近战或 20m","duration":"本次攻击","rule":"需弱点洞察成功，命中额外＋2d6并忽略普通护甲 2 点；不能无视非凡屏障或指定即死。"},
        {"name":"火鸦","type":"active","desc":"将火焰分化为可控的攻击。","cost":4,"check":"施法（POW）对抗闪避","action":"1 行动","range":"30m，至多 2 目标","duration":"瞬时","rule":"分别检定，每目标命中受 1d6＋2；不能把同一群火鸦拆成额外独立行动。"}
      ]},
      { level: 4, name: '铁血骑士', abilities: [
        {"name":"团队连接","type":"active","desc":"连接队员，协调行动与分担伤害。","cost":7,"check":"自动；必须自愿","action":"1 行动","range":"30m，至多 3 同伴","duration":"3 回合","rule":"可无声传递战术；每回合一次，将一人受到的物理伤害在连接者间自愿分配，须在掷伤害前声明。总伤害不减少，每人分配后护甲不再重复抵扣。"},
        {"name":"钢铁化","type":"active","desc":"以钢铁般的身体和火焰武装自己。","cost":6,"check":"自动","action":"1 行动","range":"自身","duration":"3 回合","rule":"物理护甲 5，STR 检定获 1 奖励骰；火焰武器额外伤害升为 1d6。钢铁化不与普通护甲叠加，精神攻击照常。"}
      ]},
      { level: 3, name: '战争主教', abilities: [
        { name: '战争权柄', desc: '煽动战争，掌控战场。', cost: 4 }
      ]},
      { level: 2, name: '天气术士', abilities: [
        { name: '操控天气', desc: '操控天气，呼风唤雨。', cost: 5 }
      ]},
      { level: 1, name: '征服者', abilities: [
        { name: '征服', desc: '以征服之名，号令万军。', cost: 6 }
      ]},
      { level: 0, name: '红祭司', abilities: [
        { name: '战争权柄', desc: '战争与征服的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'mother',
    name: '耕种者',
    godName: '母亲',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Mother_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '耕种者', abilities: [
        { name: '耕种', desc: '与土地和作物建立联系，催生生命。', cost: 1 }
      ]},
      { level: 8, name: '医师', abilities: [
        {"name":"超凡治疗","type":"active","desc":"以治疗能力修复活体损伤。","cost":2,"check":"医学","action":"1 行动","range":"接触单体","duration":"瞬时","rule":"成功恢复 1d6 HP；同一伤口每幕只受益一次，不与急救重复治疗同一伤势。不复活、不消除污染或重建完全缺失的器官。"},
      ]},
      { level: 7, name: '丰收祭司', abilities: [
        {"name":"种子催生","type":"active","desc":"让种子或植物迅速长成。","cost":3,"check":"施法（POW）","action":"1 行动","range":"接触种子；影响 10m","duration":"3 回合","rule":"须有种子或植株；可造藤蔓障碍。束缚活物另做 POW 对抗，胜出固定位置；目标可用行动 STR 解除。火焰可烧毁，不在无植物处凭空造森林。"},
        {"name":"植物与昆虫指令","type":"active","desc":"指挥附近无智慧植物和昆虫。","cost":2,"check":"施法（POW）","action":"1 行动","range":"20m","duration":"10 分钟","rule":"成功获得一个简单协助，如探路、送小物或辨明脚步方向；不越过物种能力，不能命令非凡或智慧生命。"}
      ]},
      { level: 6, name: '生物学家', abilities: [
        {"name":"生物杂交","type":"active","desc":"将已有生物材料组合为新物种或功能性样本。","cost":4,"check":"生物学","action":"实验：1 小时","range":"实验台与真实材料","duration":"本团","rule":"需 1 小时与设备，每幕最多 1 样本；用途选食物、普通病解药或一种植物工具。不能凭材料不足造无限食物、非凡特性或无条件治愈一切的药。"},
      ]},
      { level: 5, name: '德鲁伊', abilities: [
        {"name":"地下潜行","type":"active","desc":"使土地松软，穿入地下移动。","cost":5,"check":"施法（POW）","action":"1 行动","range":"自身；地下移动 20m","duration":"2 回合","rule":"可穿土层但不能穿金属、整块岩石或非凡封锁；必须在时间内回到地面，到期由最近安全点排出，受 1d6 HP。"},
        {"name":"自然之怒","type":"active","desc":"使已有自然环境敌视指定目标。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"20m，至多 3 目标","duration":"3 回合","rule":"逐目标胜出使其移动、闪避获 1 惩罚骰；现场有明确危险时，首次失败另受 1d6。无植物、碎石等自然条件时不能制造灾害。"}
      ]},
      { level: 4, name: '古代炼金师', abilities: [
        {"name":"生命炼成","type":"active","desc":"用真实材料和灵魂碎片构造生命。","cost":8,"check":"生物学困难成功","action":"炼成：1 小时","range":"实验场","duration":"本团","rule":"耗时 1 小时、足量材料；最多 1 个辅助造物，HP 15、行动技能 50、攻击 1d6，与施术者共享攻击行动。不创造非凡特性或复制完整人格。"},
        {"name":"异变","type":"active","desc":"诱发目标血肉或心智异常。","cost":7,"check":"POW 对抗 POW","action":"1 行动","range":"15m 单体","duration":"3 回合","rule":"胜出使一项身体技能获 1 惩罚骰，并造成 2d6 HP；若为非凡者再加失控值＋1。不能指定即死、永久改写途径或改变封印物本质。"}
      ]},
      { level: 3, name: '抬棺人', abilities: [
        { name: '重生仪式', desc: '主持重生仪式，沟通生死循环。', cost: 4 }
      ]},
      { level: 2, name: '荒芜主母', abilities: [
        { name: '荒芜与生育', desc: '统御荒芜与生育，掌控生命之源（晋升后男性转为女性）。', cost: 5 }
      ]},
      { level: 1, name: '自然行者', abilities: [
        { name: '自然化身', desc: '化身自然，与万物生灵合一。', cost: 6 }
      ]},
      { level: 0, name: '母亲', abilities: [
        { name: '生命权柄', desc: '生命与生育的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'moon',
    name: '药师',
    godName: '月亮',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Moon_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '药师', abilities: [
        { name: '制药', desc: '调制药剂，治愈伤病或施加毒性。', cost: 1 }
      ]},
      { level: 8, name: '驯兽师', abilities: [
        {"name":"驯兽","type":"active","desc":"与普通动物建立超自然的服从关系。","cost":2,"check":"驯兽（POW）；敌对动物需 POW 对抗","action":"驯服：1 分钟","range":"10m 普通动物","duration":"本幕","rule":"准备 1 分钟，成功可令 1 动物执行简单已会动作；不能授予人类思维、控制非凡生物或命令明显自杀。"},
      ]},
      { level: 7, name: '吸血鬼', abilities: [
        {"name":"腐蚀之爪","type":"active","desc":"伸长指甲，附上腐蚀力量。","cost":3,"check":"斗殴","action":"1 行动","range":"近战","duration":"3 回合","rule":"命中造成 1d6＋伤害加值，并忽略皮肤、鳞片护甲 2 点；不无视钢甲或非凡屏障。"},
        {"name":"黑暗之翼","type":"active","desc":"凝成蝠翼，以黑暗进行短距飞行。","cost":3,"check":"施法（POW）","action":"1 行动","range":"自身；每回合 15m","duration":"3 回合","rule":"成功可短距飞行；明亮太阳下施法获 1 惩罚骰。不是序列 4 的可散开重构蝠群，不能免疫物理伤害。"}
      ]},
      { level: 6, name: '魔药教授', abilities: [
        {"name":"魔药调制","type":"active","desc":"制作强化身体或治疗的临时药剂。","cost":4,"check":"药学（医学）","action":"制作：10 分钟","range":"工作台与药材","duration":"药效 3 回合；药剂存 1 日","rule":"耗时 10 分钟，每幕制 2 剂；选恢复 1d6 HP、抵抗普通毒素 1 奖励骰或 DEX 检定 1 奖励骰。饮用占 1 行动，同类药效不叠加，不能炼制晋升魔药。"},
      ]},
      { level: 5, name: '深红学者', abilities: [
        {"name":"满月环境","type":"active","desc":"调整一小片区域的月光。","cost":5,"check":"施法（POW）","action":"1 行动","range":"半径 10m","duration":"3 回合","rule":"成功使友方灵体感知 POW 获 1 奖励骰，允许月光化和月闪；也会触发相关敌人的满月特性，不直接回满灵性。"},
        {"name":"月光化与月闪","type":"active","desc":"凝成月光形体，在月光照耀处移动。","cost":5,"check":"施法（POW）","action":"1 行动","range":"20m 内月光落点","duration":"2 回合","rule":"成功后普通物理伤害减半，可每回合移动到一处月光落点；心脏被瞄准并命中或净化攻击不减伤。不能传送同伴。"}
      ]},
      { level: 4, name: '巫王', abilities: [
        {"name":"虚幻蝠群","type":"active","desc":"分散成兼具虚实的蝙蝠群。","cost":7,"check":"施法（POW）","action":"1 行动","range":"自身；每回合 30m","duration":"2 回合","rule":"成功后闪避获 1 奖励骰，单体物理伤害减半；重构时保留所受伤害，范围火焰、净化照常。不是永久不死，期间不能拿实体武器。"},
        {"name":"血月之箭","type":"active","desc":"发出具血月力量的法术箭。","cost":7,"check":"施法（POW）对抗闪避","action":"1 行动","range":"40m 单体","duration":"瞬时","rule":"命中造成 3d6，其中 1d6 为灵体伤害；普通护甲只抵扣实体部分，灵体防护仍有效。"}
      ]},
      { level: 3, name: '召唤大师', abilities: [
        { name: '召唤', desc: '召唤异界存在与血族仆从。', cost: 4 }
      ]},
      { level: 2, name: '创生者', abilities: [
        { name: '创造生命', desc: '创造生命，缔造血族后裔。', cost: 5 }
      ]},
      { level: 1, name: '美神', abilities: [
        { name: '美之权柄', desc: '掌控美丽与魅力，颠倒众生。', cost: 6 }
      ]},
      { level: 0, name: '月亮', abilities: [
        { name: '月亮权柄', desc: '月亮与母巢的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'justiciar',
    name: '仲裁人',
    godName: '审判者',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Justiciar_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '仲裁人', abilities: [
        { name: '仲裁', desc: '裁定是非，辨识谎言与真相。', cost: 1 }
      ]},
      { level: 8, name: '治安官', abilities: [
      ]},
      { level: 7, name: '审讯者', abilities: [
        {"name":"精神刺穿","type":"active","desc":"直接以威压攻击目标精神体。","cost":3,"check":"POW 对抗 POW","action":"1 行动","range":"5m 单体","duration":"瞬时","rule":"胜出造成 1d6 灵体伤害，忽略普通护甲；灵体防护有效，不自动读心或强迫招供。"},
        {"name":"痛苦之鞭","type":"active","desc":"以持续灵体痛苦压制目标。","cost":3,"check":"POW 对抗 POW","action":"1 行动","range":"5m 单体","duration":"2 回合","rule":"胜出令其行动检定获 1 惩罚骰；每回合需占行动维持并重试对抗。只增加审讯压力，不保证口供真实，不能无限叠加痛苦。"}
      ]},
      { level: 6, name: '法官', abilities: [
        {"name":"禁止","type":"active","desc":"以超自然宣判禁止一种明确行为。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"半径 10m","duration":"2 回合","rule":"逐目标对抗；胜出后违反所定行为者该次检定获 1 惩罚骰。规则也约束施术者和同伴，不能直接禁止生命或呼吸。"},
        {"name":"判决","type":"active","desc":"宣布穿刺、鞭笞等惩戒。","cost":4,"check":"POW 对抗 POW","action":"1 行动","range":"10m 单体","duration":"瞬时","rule":"胜出造成 1d6＋2 灵体伤害；必须能看见并宣判目标，不能把“死亡”宣判直接当即死效果。"}
      ]},
      { level: 5, name: '惩戒骑士', abilities: [
        {"name":"惩戒标记","type":"active","desc":"标记正在攻击或妨碍自己的目标。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"15m 单体","duration":"3 回合","rule":"目标必须本场曾攻击或妨碍施术者；胜出后针对其攻击获 1 奖励骰，首次命中额外＋1d6。标记不能自动命中。"},
        {"name":"强化禁止","type":"active","desc":"令违禁行为承受更强压制。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"半径 15m","duration":"3 回合","rule":"替代禁止：违规行动获 1 惩罚骰，并在本次完成后受 1d4 灵体伤害。每人每回合最多触发一次，仍约束敌友与自身。"}
      ]},
      { level: 4, name: '律令法师', abilities: [
        {"name":"律令","type":"active","desc":"在区域内持续强化或削弱一类行为。","cost":8,"check":"施法（POW）；敌对者 POW 对抗","action":"1 行动","range":"半径 20m","duration":"3 回合","rule":"选一条具体律令，如禁止传送，或非凡施法获 1 惩罚骰、普通武器获 1 奖励骰。逐目标对抗；同样影响自身与同伴，不得规定必死或无限行动。"},
        {"name":"剥夺","type":"active","desc":"暂时阻止目标使用特定能力。","cost":7,"check":"POW 对抗 POW","action":"1 行动","range":"20m 单体","duration":"2 回合","rule":"必须辨认其一项主动能力；胜出使该项暂不可用。不是偷取特性，不能得到该技能或剥夺所有能力，对序列 3 及以上默认无效。"},
        {"name":"律令放逐","type":"active","desc":"把难以对付的敌人短暂移出战场。","cost":8,"check":"POW 对抗 POW","action":"1 行动","range":"20m 单体","duration":"2 回合","rule":"胜出令目标暂离战场，到期回原处；没有额外伤害，不能选择必死落点。同目标每幕最多成功一次。"}
      ]},
      { level: 3, name: '混乱猎手', abilities: [
        { name: '狩猎混乱', desc: '狩猎并平定混乱，恢复秩序。', cost: 4 }
      ]},
      { level: 2, name: '平衡者', abilities: [
        { name: '平衡', desc: '维系秩序与混乱的平衡。', cost: 5 }
      ]},
      { level: 1, name: '秩序之手', abilities: [
        { name: '秩序', desc: '化身为秩序的意志，重塑规则。', cost: 6 }
      ]},
      { level: 0, name: '审判者', abilities: [
        { name: '审判权柄', desc: '秩序与审判的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'black-emperor',
    name: '律师',
    godName: '黑皇帝',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Black_Emperor_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '律师', abilities: [
        { name: '辩才', desc: '精于辞令与规则，善用漏洞。', cost: 1 }
      ]},
      { level: 8, name: '野蛮人', abilities: [
      ]},
      { level: 7, name: '贿赂者', abilities: [
        {"name":"贿赂","type":"active","desc":"通过赠与建立影响目标的联系。","cost":3,"check":"POW 对抗 POW","action":"1 行动","range":"10m 单体","duration":"2 回合","rule":"须实际赠送或掷出一件物品作媒介，胜出选削弱（目标针对自己的攻击 1 惩罚骰）或魅惑（自身对其社交 1 奖励骰）。一次只选一项，不强制背叛。"}
      ]},
      { level: 6, name: '腐化男爵', abilities: [
        {"name":"扭曲","type":"active","desc":"利用既有动作或语言的漏洞改变其方向。","cost":5,"check":"POW 对抗攻击者原攻击技能","action":"反应；消耗下次行动","range":"10m 内一次可见攻击","duration":"本次攻击","rule":"伤害掷出前声明，胜出使本次攻击偏转为空处；不能反射成必中第三人，范围攻击、未察觉攻击与权柄不适用。"},
      ]},
      { level: 5, name: '混乱导师', abilities: [
        {"name":"混乱","type":"active","desc":"扰乱目标判断方位与行动次序。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"半径 10m，至多 3 目标","duration":"2 回合","rule":"逐目标胜出使其导航、侦查与攻击获 1 惩罚骰。只是判断混乱，不缩短真实距离、不额外制造行动或直接控制移动。"},
        {"name":"放大","type":"active","desc":"放大已存在攻击或作用的影响。","cost":5,"check":"施法（POW）","action":"预备：1 行动","range":"自身的一次攻击","duration":"本次攻击","rule":"需占 1 行动预备，下一回合命中额外＋1d6或范围增加 2m，二选一；未命中没有伤害。不能放大为即死、无限距离或无限恢复。"}
      ]},
      { level: 4, name: '堕落伯爵', abilities: [
        {"name":"规则利用","type":"active","desc":"延长或缩短一项既有状态。","cost":7,"check":"施法（POW）；敌对状态需 POW 对抗","action":"1 行动","range":"20m 单体","duration":"改变 1 回合","rule":"成功使一项正在持续的序列 4～9 效果延长或缩短 1 回合，不能延长已结束状态。同一状态每次只可改一次，不能取消死亡、停止时间或刷消耗。"},
        {"name":"堕落扭曲","type":"active","desc":"将严重攻击扭为较轻的结果。","cost":7,"check":"POW 对抗攻击者原攻击技能","action":"反应；消耗下次行动","range":"15m 内一次可见攻击","duration":"本次攻击","rule":"替代扭曲：伤害掷出前声明，胜出使单体攻击伤害减半向下取整或偏转为空处，二选一；不能把伤害变为治疗，区域污染照常。"}
      ]},
      { level: 3, name: '狂乱法师', abilities: [
        { name: '狂乱', desc: '以狂乱之力颠覆规则。', cost: 4 }
      ]},
      { level: 2, name: '熵之公爵', abilities: [
        { name: '熵', desc: '操控熵与混乱，加速崩坏。', cost: 5 }
      ]},
      { level: 1, name: '弑序亲王', abilities: [
        { name: '弑序', desc: '弑杀秩序，重塑自定规则。', cost: 6 }
      ]},
      { level: 0, name: '黑皇帝', abilities: [
        { name: '扭曲规则', desc: '扭曲与改写规则的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'paragon',
    name: '通识者',
    godName: '完美者',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Paragon_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '通识者', abilities: [
        { name: '唤醒记忆', desc: '凡看过的知识都不会忘记，记忆理解超凡。', cost: 1 }
      ]},
      { level: 8, name: '考古学家', abilities: [
      ]},
      { level: 7, name: '鉴定师', abilities: [
        {"name":"鉴定","type":"active","desc":"识别非凡物品的主要能力与问题。","cost":2,"check":"神秘学","action":"鉴定：1 分钟","range":"接触一件物品","duration":"本次信息","rule":"观察 1 分钟，成功得知一项主要效果和一项副作用；高于自身层次需困难成功且信息不完整。不能改写或自动识破拜祭之指全部秘密。"}
      ]},
      { level: 6, name: '机械专家', abilities: [
        {"name":"非凡制作","type":"active","desc":"将已有非凡材料制成实用物件。","cost":5,"check":"工艺（机械）","action":"制作：1 小时","range":"工坊与材料","duration":"本团","rule":"需 1 小时与特性或已有材料；每团最多 1 件，收录 1 个序列 6～9 主动模板，使用保留原消耗及限制。KP 必须同时指定副作用，不能无材料复制封印物。"},
      ]},
      { level: 5, name: '天文学家', abilities: [
        {"name":"天象引导","type":"active","desc":"借已有天文现象引导有限能量。","cost":5,"check":"神秘学","action":"1 行动","range":"已观察天象；30m 目标","duration":"1 回合","rule":"必须有 KP 确认的可利用现象；成功得下一次相关仪式 1 奖励骰，或以施法对抗闪避攻击、命中 2d6。不能凭空造流星雨；涉及危险星界时 SAN 0/1d4。"},
      ]},
      { level: 4, name: '炼金术士', abilities: [
        {"name":"机械生命","type":"active","desc":"将灵魂碎片注入机械，赋予自主行动。","cost":8,"check":"工艺（机械）困难成功","action":"制作：1 小时","range":"工坊与完整机械体","duration":"本团","rule":"需 1 小时、真实材料与合法灵魂碎片；最多 1 造物，HP 15、护甲 3、攻击技能 50、伤害 1d8。共享每回合攻击行动，不制造完整人格或无限能源。"},
        {"name":"炼金改造","type":"active","desc":"改善已有机械或非凡装备的结构。","cost":6,"check":"工艺（机械）","action":"改造：10 分钟","range":"接触一件装备","duration":"本幕","rule":"耗时 10 分钟，成功选物理护甲＋2或一种机械操作获 1 奖励骰；每件每幕一次。不能提高封印物危险等级、消除既有副作用或凭空加权柄。"}
      ]},
      { level: 3, name: '奥秘学者', abilities: [
        { name: '奥秘', desc: '研习世界奥秘，趋近本源知识。', cost: 4 }
      ]},
      { level: 2, name: '知识导师', abilities: [
        { name: '知识', desc: '统御知识，传授与点化他人。', cost: 5 }
      ]},
      { level: 1, name: '启蒙者', abilities: [
        { name: '启蒙', desc: '以文明之光启蒙万物。', cost: 6 }
      ]},
      { level: 0, name: '完美者', abilities: [
        { name: '完美权柄', desc: '文明与完美的真神权柄。', cost: null }
      ]}
    ]
  },
  {
    key: 'hermit',
    name: '窥秘人',
    godName: '隐者',
    abilitySource: {"label":"途径能力资料（搜索索引核对）","url":"https://lordofthemysteries.fandom.com/wiki/Hermit_Pathway/Abilities","checkedOn":"2026-10-11"},
    sequences: [
      { level: 9, name: '窥秘人', abilities: [
        { name: '窥探隐秘', desc: '窥探隐秘，捕捉隐藏的知识与真相。', cost: 1 }
      ]},
      { level: 8, name: '格斗学者', abilities: [
      ]},
      { level: 7, name: '巫师', abilities: [
        {"name":"知识施法","type":"active","desc":"以已学知识构成实际法术。","cost":3,"check":"按模板原检定","action":"1 行动","range":"模板范围，最多 10m","duration":"模板持续的一半，最多 1 回合","rule":"每幕预选 2 个有学习来源的序列 7～9 主动模板。每次施放耗 3 灵性并另付原消耗，用原检定，伤害与持续减半向上取整；无模板不能临时编万能术。"},
      ]},
      { level: 6, name: '卷轴教授', abilities: [
        {"name":"卷轴制作","type":"active","desc":"把已学法术预先储存在卷轴中。","cost":4,"check":"制作用神秘学；释放用原检定","action":"制作：10 分钟；释放 1 行动","range":"材料与工作台","duration":"保存 1 日或至使用","rule":"每幕最多制 3 卷，限已会的主动模板；每卷需 10 分钟、材料、4 灵性及原消耗。释放占 1 行动，用原检定并消耗卷轴，不再扣灵性；不制造被动或晋升魔药。"}
      ]},
      { level: 5, name: '星象师', abilities: [
        {"name":"星光囚笼","type":"active","desc":"凝聚星光，把目标禁锢在原处。","cost":5,"check":"POW 对抗 POW","action":"1 行动","range":"20m 单体","duration":"2 回合","rule":"胜出令目标不能移动，攻击与闪避获 1 惩罚骰；每回合可用行动重试 POW，成功解除，施术者失去意识时解除。"},
        {"name":"星之柱","type":"active","desc":"以凝聚星光摧毁局部结构。","cost":6,"check":"施法（POW）对抗闪避","action":"1 行动","range":"30m 单体","duration":"瞬时","rule":"命中造成 2d6＋2，其中 1d6 为灵体伤害；厚实掩体阻断，不能指定概念瓦解或自动消灭敌人。"},
        {"name":"星光化","type":"active","desc":"分散为星光碎片重新聚合。","cost":5,"check":"DEX","action":"反应；消耗下次行动","range":"10m 安全落点","duration":"瞬时","rule":"成功规避一次可见物理攻击并移动；不能穿非凡封锁，也不抵消覆盖落点的区域伤害。"}
      ]},
      { level: 4, name: '神秘学家', abilities: [
        {"name":"神秘再现","type":"active","desc":"从理解过的神秘故事中提取法术效果。","cost":8,"check":"按预定模板原检定","action":"1 行动","range":"预定故事模板的范围","duration":"模板持续，最长 3 回合","rule":"每团与 KP 预定 2 个有真实依据的故事模板，对应至多序列 4 主动效果。每次施放耗 8 灵性并另付原消耗，用原检定与限制；不能再现未知故事、真神权柄或无条件判死。"},
        {"name":"血液法术","type":"active","desc":"根据晋升所用神话血液掌握一种特殊术。","cost":7,"check":"按预定模板原检定","action":"1 行动","range":"预定模板范围","duration":"模板原持续","rule":"建卡时与 KP 固定 1 种序列 4 或以下主动模板，写明血液来源与风险。每次施放耗 7 灵性并另付原消耗，用原检定与限制；同一角色不能获取所有血液能力。"}
      ]},
      { level: 3, name: '预言大师', abilities: [
        { name: '预言', desc: '做出精准预言，窥见未来。', cost: 4 }
      ]},
      { level: 2, name: '贤者', abilities: [
        { name: '贤者智慧', desc: '以贤者智慧洞见万理。', cost: 5 }
      ]},
      { level: 1, name: '知识皇帝', abilities: [
        { name: '知识皇权', desc: '统御一切知识，君临知性之海。', cost: 6 }
      ]},
      { level: 0, name: '隐者', abilities: [
        { name: '隐秘知识', desc: '隐秘与知识之源的真神权柄。', cost: null }
      ]}
    ]
  },
  {
  "key": "wheel-of-fortune",
  "name": "怪物",
  "godName": "命运之轮",
  "abilitySource": {
    "label": "途径能力资料（搜索索引核对）",
    "url": "https://lordofthemysteries.fandom.com/wiki/Wheel_of_Fortune_Pathway/Abilities",
    "checkedOn": "2026-10-11"
  },
  "sequences": [
    {
      "level": 9,
      "name": "怪物",
      "abilities": [
        {
          "name": "危险预感",
          "desc": "对危险与灾祸有超常的直觉预感。",
          "cost": 1
        }
      ]
    },
    {
      "level": 8,
      "name": "机器",
      "abilities": []
    },
    {
      "level": 7,
      "name": "幸运者",
      "abilities": []
    },
    {
      "level": 6,
      "name": "灾祸教士",
      "abilities": [
        {
          "name": "吸引灾祸",
          "desc": "引来环境中的危险并预判其发展。",
          "cost": 4,
          "type": "active",
          "rule": "必须有实际危险条件；胜出使目标下次相关 DEX 检定获 1 惩罚骰，失败受 1d6 环境伤害。施术者也做 LUCK，失败同受灾，不凭空造雷击或塌楼。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "20m 单体",
          "duration": "2 回合"
        },
        {
          "name": "精神风暴",
          "desc": "以强大灵性扰乱目标精神体。",
          "cost": 4,
          "type": "active",
          "rule": "胜出令目标眩晕，行动检定获 1 惩罚骰；不自动吞噬目标或造成永久失忆。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "15m 单体",
          "duration": "1 回合"
        }
      ]
    },
    {
      "level": 5,
      "name": "赢家",
      "abilities": [
        {
          "name": "有限厄运",
          "desc": "使目标暂时更容易遭遇失误。",
          "cost": 5,
          "type": "active",
          "rule": "胜出使目标下一次技能检定获 1 惩罚骰；同一目标不能叠加，不把普通失败升级为大失败。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "20m 单体",
          "duration": "2 回合"
        },
        {
          "name": "释放积运",
          "desc": "把已积累的幸运用在关键行动。",
          "cost": 4,
          "type": "active",
          "rule": "另耗 5 LUCK，使下一次非 SAN、非伤害检定获 1 奖励骰；最多每幕两次，不能反复预备叠加。不能改已经掷出的结果，LUCK 不因本技能自动回复。",
          "check": "自动；需 LUCK 支出",
          "action": "预备：1 行动",
          "range": "自身",
          "duration": "下一次检定；至下回合结束"
        }
      ]
    },
    {
      "level": 4,
      "name": "厄运法师",
      "abilities": [
        {
          "name": "厄运领域",
          "desc": "令进入附近的人染上厄运。",
          "cost": 8,
          "type": "active",
          "rule": "逐目标胜出，使其每回合首次行动获 1 惩罚骰；影响敌友，施术者自身除外。替代有限厄运，不累计成必败或自动触发大失败。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "半径 20m",
          "duration": "3 回合"
        },
        {
          "name": "幸运赐福",
          "desc": "消耗自己的运气，使同伴暂时幸运。",
          "cost": 6,
          "type": "active",
          "rule": "每目标下一次非 SAN、非伤害检定获 1 奖励骰；一次支出灵感，每人另付 LUCK。不能刷回幸运或从未来借出无限好运。",
          "check": "自动；每目标支出 5 LUCK",
          "action": "1 行动",
          "range": "20m，至多 3 自愿者",
          "duration": "下一次检定或 3 回合"
        },
        {
          "name": "强化精神风暴",
          "desc": "令灵体和思绪陷入混乱。",
          "cost": 7,
          "type": "active",
          "rule": "替代精神风暴，逐目标胜出令行动获 1 惩罚骰并做 SAN 0/1d4；不以混乱直接操控行为，同一次施放每目标仅扣一次 SAN。",
          "check": "POW 对抗 POW",
          "action": "1 行动",
          "range": "20m，至多 3 目标",
          "duration": "2 回合"
        }
      ]
    },
    {
      "level": 3,
      "name": "混乱行者",
      "abilities": [
        {
          "name": "混乱",
          "desc": "搅动命运，制造混乱与变数。",
          "cost": 4
        }
      ]
    },
    {
      "level": 2,
      "name": "先知",
      "abilities": [
        {
          "name": "预言未来",
          "desc": "预见未来，洞悉命运长河。",
          "cost": 5
        }
      ]
    },
    {
      "level": 1,
      "name": "巨蛇",
      "abilities": [
        {
          "name": "命运之蛇",
          "desc": "化为命运之蛇，吞尾衔环，掌命运循环。",
          "cost": 6
        }
      ]
    },
    {
      "level": 0,
      "name": "命运之轮",
      "abilities": [
        {
          "name": "命运权柄",
          "desc": "命运与循环的真神权柄。",
          "cost": null
        }
      ]
    }
  ]
},

];

// 灵感独立记录；序列8～4的专属属性被动采用统一数据，序列9不加点。
(function () {
  const rules = typeof SPIRITUALITY !== 'undefined' ? SPIRITUALITY : require('./spirituality.js').SPIRITUALITY;
  const attributes = typeof PATHWAY_ATTRIBUTES !== 'undefined' ? PATHWAY_ATTRIBUTES : require('./attributes.js').PATHWAY_ATTRIBUTES;
  PATHWAYS.forEach(function (p) {
    p.spirituality = { referenceMaximum: p.key === 'wheel-of-fortune', status: 'confirmed' };
    p.sequences.forEach(function (s) {
      if (s.level >= 3) s.spirituality = rules.growth(p.key, s.level);
      const bonus = attributes.at(p.key, s.level);
      if (bonus) s.panelBonus = bonus;
      (s.abilities || []).forEach(function (a) { if (a.rule) a.rule = a.rule.replace(/灵性/g, '灵感'); });
    });
  });
})();
// Node 环境下导出（供测试/工具使用；浏览器中自动跳过）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PATHWAYS };
}
