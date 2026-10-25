// 本团档案数值：百分制、现有晋升公式；不修改旧安魂师模板。
var ARCHIVE_ACTORS = (function () {
  'use strict';
  const node = typeof module !== 'undefined' && module.exports;
  const paths = typeof PATHWAYS !== 'undefined' ? PATHWAYS : require('./pathways.js').PATHWAYS;
  const panels = typeof PATHWAY_ATTRIBUTES !== 'undefined' ? PATHWAY_ATTRIBUTES : require('./attributes.js').PATHWAY_ATTRIBUTES;
  const spirit = typeof SPIRITUALITY !== 'undefined' ? SPIRITUALITY : require('./spirituality.js').SPIRITUALITY;
  const old = typeof CHARACTER_TEMPLATE !== 'undefined' ? CHARACTER_TEMPLATE : node ? require('./character.js').CHARACTER_TEMPLATE : null;
  const skills = list => list.map(r => ({name:r[0],value:r[1],hard:Math.floor(r[1]/2),extreme:Math.floor(r[1]/5)}));
  function actor(name, base, path, list, options) {
    const o=options||{}, attributes=Object.assign({},base);
    let pathway=null, abilities=[];
    if(path){
      const p=paths.find(p=>p.key===path[0]);
      pathway={key:p.key,name:p.name,sequence:path[1],sequenceName:p.sequences.find(s=>s.level===path[1]).name};
      const gain=Math.max(0,9-path[1]);
      for(const k of ['STR','CON','DEX','INT','POW'])attributes[k]+=gain;
      for(const [k,v] of Object.entries(panels.cumulative(path[0],path[1])))attributes[k]+=v;
      abilities=p.sequences.filter(s=>s.level>=path[1]&&s.level<=8).slice().sort((a,b)=>b.level-a.level).flatMap(s=>s.abilities.filter(a=>a.type==='active').map(a=>Object.assign({sequence:s.level},a)));
    }
    const hp=Math.floor((attributes.CON+attributes.SIZ)/10), total=attributes.STR+attributes.SIZ;
    const build=total<=64?-2:total<=84?-1:total<=124?0:total<=164?1:2;
    const db=['-2','-1','0','+1d4','+1d6'][build+2];
    const rows=list.map(r=>[r[0],r[1]==='dodge'?Math.floor(attributes.DEX/2)+(r[2]||0):r[1]]);
    const inspiration=pathway?spirit.maximum(attributes.POW,attributes.INT,pathway.key,pathway.sequence).total:spirit.base(attributes.POW,attributes.INT).total;
    return {name,kind:'person',base,attributes,pathway,abilities,skills:skills(rows),
      resources:{hp,san:o.san==null?base.POW:o.san,inspiration},
      combat:{damageBonus:db,build,mov:o.mov|| (attributes.STR<attributes.SIZ&&attributes.DEX<attributes.SIZ?7:attributes.STR>attributes.SIZ&&attributes.DEX>attributes.SIZ?9:8),armor:o.armor||0,majorWound:Math.ceil(hp/2)},
      attacks:o.attacks||[{name:'徒手',value:rows.find(r=>r[0]==='格斗（斗殴）')?.[1]||25,damage:'1d3'+(db==='0'?'':db),note:'每轮1次主要行动；可闪避或反击。'}],
      note:o.note||'列出的是当前可用数值；能力效果另行支付灵感，资源由KP记录。'};
  }
  function template(name,base,path,occupation,interest,note){
    const merged=new Map();
    for(const [n,b,add]of occupation)merged.set(n,{base:b,occupation:add,interest:0});
    for(const [n,b,add]of interest){const r=merged.get(n)||{base:b,occupation:0,interest:0};r.interest+=add;merged.set(n,r);}
    const a=actor(name,base,path,Array.from(merged,([n,r])=>[n,r.base==='dodge'?'dodge':r.base+r.occupation+r.interest,r.base==='dodge'?r.occupation+r.interest:0]),{note});
    a.budget={occupation:occupation.reduce((v,r)=>v+r[2],0),interest:interest.reduce((v,r)=>v+r[2],0)};
    a.allocations=Array.from(merged,([name,r])=>({name,base:r.base==='dodge'?Math.floor(a.attributes.DEX/2):r.base,occupation:r.occupation,interest:r.interest}));
    return a;
  }
  const out={};
  out.repose={name:'安魂师',kind:'person',base:old.baseAttributes,attributes:old.attributes,pathway:old.pathway,
    resources:{hp:old.derived.hp,san:old.derived.san,inspiration:old.derived.inspiration},
    combat:{damageBonus:old.derived.damageBonus,build:old.derived.build,mov:old.derived.mov,armor:old.derived.armor,majorWound:old.derived.majorWound},
    skills:old.skills,allocations:old.skills.filter(s=>s.occupation||s.interest).map(s=>({name:s.name,base:s.base,occupation:s.occupation,interest:s.interest})),budget:{occupation:240,interest:130},
    abilities:paths.find(p=>p.key==='darkness').sequences.filter(s=>s.level>=6&&s.level<=8).slice().sort((a,b)=>b.level-a.level).flatMap(s=>s.abilities.filter(a=>a.type==='active').map(a=>Object.assign({sequence:s.level},a))),
    attacks:[{name:'徒手',value:45,damage:'1d3',note:'每轮1次主要行动。'},{name:'手枪',value:40,damage:'1d10',note:'仅在KP提供普通左轮时；6发，1次射击行动，不默认拥有武器。'}],note:'原序列6安魂师完整保留。感知与神之呓语门槛未设定；不能用POW×5替代当前百分制检定。'};
  out.sun=template('光之祭司',{STR:50,CON:55,SIZ:55,DEX:55,APP:55,INT:65,POW:65,EDU:60},['sun',5],
    [['侦查',25,30],['聆听',20,25],['心理学',10,20],['说服',10,35],['神秘学',5,40],['医学',1,25],['急救',30,35],['信用评级',0,30]],
    [['格斗（斗殴）',25,15],['闪避','dodge',25],['射击（手枪）',20,25],['图书馆使用',20,30],['潜行',20,20],['攀爬',20,15]],
    '调查与净化支援模板；血液抑制仍须每次300ml，不因途径正确而免除用量。不默认携带血样或治疗药品。固定基础460、职业240、兴趣130，属于本团预设分配。');
  out.guardian=template('守护者',{STR:65,CON:60,SIZ:65,DEX:45,APP:40,INT:65,POW:60,EDU:60},['twilight-giant',5],
    [['格斗（斗殴）',25,40],['射击（手枪）',20,35],['侦查',25,25],['聆听',20,25],['急救',30,20],['恐吓',15,30],['潜行',20,35],['信用评级',0,30]],
    [['闪避','dodge',35],['神秘学',5,25],['图书馆使用',20,25],['心理学',10,20],['说服',10,25]],
    '保护与近战模板；常态护甲0，能力需要施放。固定基础460、职业240、兴趣130；不额外叠加旧版护甲/再生被动。');
  out.reader=template('秘术导师',{STR:40,CON:50,SIZ:50,DEX:55,APP:65,INT:75,POW:65,EDU:60},['white-tower',5],
    [['图书馆使用',20,40],['侦查',25,30],['神秘学',5,40],['历史',5,35],['心理学',10,25],['说服',10,35],['信用评级',0,20],['聆听',20,15]],
    [['格斗（斗殴）',25,20],['闪避','dodge',25],['射击（手枪）',20,25],['急救',30,25],['潜行',20,20],['攀爬',20,15]],
    '推理与术式识别模板。固定基础460、职业240、兴趣130，不按提高后的INT补发技能点；模仿只可选KP已经定义的能力，初始不拥有无限已知法术。');
  out.client=actor('伊恩·莫里斯',{STR:50,CON:55,SIZ:55,DEX:60,APP:50,INT:65,POW:60,EDU:65},['darkness',7],[['格斗（斗殴）',45],['闪避','dodge',15],['侦查',60],['聆听',60],['心理学',50],['说服',55],['神秘学',45]],{note:'值夜者联络人；主要负责封锁、接应和证物转交，不随队代解谜题。强制入梦沿用当前4点灵感及双方当前灵感比规则。'});
  out.auctioneer=actor('西拉斯·贝尔',{STR:45,CON:50,SIZ:55,DEX:55,APP:60,INT:65,POW:50,EDU:65},null,[['格斗（斗殴）',30],['闪避','dodge',0],['话术',65],['说服',55],['心理学',50],['估价',70],['会计',60],['信用评级',45]],{note:'普通商人；优先逃跑、求饶或交易，不为保账本与非凡者死战。'});
  out.survivor=actor('艾达·芬奇',{STR:40,CON:45,SIZ:50,DEX:55,APP:55,INT:65,POW:55,EDU:60},null,[['格斗（斗殴）',25],['闪避','dodge',0],['侦查',50],['聆听',55],['估价',55],['话术',35],['说服',40]],{san:32,note:'受污染的普通人，曾参与验货，并未买走同一根手指。安抚、隔离和移除刺激可使本幕避免战斗；此处资源为会面时状态。'});
  out.neighbor=actor('玛莎·里德',{STR:35,CON:50,SIZ:50,DEX:45,APP:50,INT:60,POW:55,EDU:45},null,[['格斗（斗殴）',20],['闪避','dodge',0],['侦查',40],['聆听',60],['心理学',40],['说服',35],['急救',40]],{note:'普通邻居证人，无隐藏战斗能力；数字用于追逐/惊吓/救援，不鼓励对证人作战。'});
  out.holder=actor('奥斯温·哈罗',{STR:55,CON:60,SIZ:65,DEX:55,APP:60,INT:65,POW:60,EDU:60},['abyss',5],[['格斗（斗殴）',60],['闪避','dodge',15],['侦查',55],['聆听',50],['心理学',60],['说服',60],['恐吓',60],['神秘学',55]],{san:25,attacks:[{name:'徒手',value:60,damage:'1d3+1d4',note:'每轮1次主要行动。'},{name:'恶魔爪击',value:60,damage:'1d6+1d4',note:'仅恶魔化已生效时；享其近战1奖励骰，不额外追加一次攻击。'}],note:'污染压低当前SAN；无免费再生/常驻护甲。恶魔化和欲望化身等均占行动与灵感。血液须真实接触手指才触发封印物大爆发，不能因他在远处受伤直接触发。'});
  out.buyer=actor('被污染的艾达',{STR:55,CON:50,SIZ:50,DEX:45,APP:45,INT:55,POW:45,EDU:60},null,[['格斗（斗殴）',40],['闪避',25],['聆听',45]],{san:15,attacks:[{name:'痉挛抓挠',value:40,damage:'1d3',note:'每轮1次；半异化力量已计入属性，不再另加伤害。'}],note:'同一人物的污染发作分支，不是第二名买家。此变体为剧情污染，不是晋升；用制伏、退至罩外或保护家人可结束冲突。'});
  out.servant=actor('封印物仆从',{STR:60,CON:60,SIZ:60,DEX:45,APP:30,INT:25,POW:30,EDU:30},null,[['格斗（斗殴）',45],['闪避',20],['侦查',30]],{san:0,attacks:[{name:'扑击',value:45,damage:'1d4',note:'每轮1次；无额外攻击，不因不知痛免疫伤害。'}],note:'低智能污染受害者，不是自动获得某条途径全部能力的非凡者。常态无护甲/再生，HP归零失去行动。'});
  out.phantasm={name:'封印物幻象',kind:'phenomenon',attributes:null,skills:[],attacks:[],abilities:[],note:'无实体，不设HP/SAN/灵感供物理战斗。看穿只是识别，离开污染或抑制本体才会终止；不得每轮自动重复收取同一呓语损失。'};
  out.projection={name:'欲望母树投影',kind:'phenomenon',attributes:null,skills:[],attacks:[],abilities:[],note:'仪式中的投影表象，非外神本体，不设可击杀HP。以观察、对话和一次关键介入处理；抑制媒介不自动逆转已成寄生，原封印物规则保持。'};
  return out;
})();
if (typeof module !== 'undefined' && module.exports) module.exports={ARCHIVE_ACTORS};
