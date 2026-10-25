// 四类正式书目，正文见 archive-content.js；目录与书架由此同源生成。
var ARCHIVE_CATALOG = {
  categories: [
    { key: 'template', name: '角色模板', english: 'Investigator', mark: 'I' },
    { key: 'persona', name: '扮演角色', english: 'Personae', mark: 'II' },
    { key: 'creature', name: '怪物档案', english: 'Bestiary', mark: 'III' },
    { key: 'story', name: '剧情文档', english: 'Chronicle', mark: 'IV' }
  ],
  books: [
    { id: 'repose', category: 'template', title: '安魂师', subtitle: '序列 6 · 只读数值模板', english: 'The Repose', link: 'character.html', placeholder: false },
    { id: 'template-2', category: 'template', title: '光之祭司', subtitle: '序列 5 · 净化与支援', english: 'Priest of Light', placeholder: false },
    { id: 'template-3', category: 'template', title: '守护者', subtitle: '序列 5 · 防护与近战', english: 'Guardian', placeholder: false },
    { id: 'template-4', category: 'template', title: '秘术导师', subtitle: '序列 5 · 调查与秘术', english: 'Mysticism Magister', placeholder: false },
    { id: 'persona-1', category: 'persona', title: '伊恩·莫里斯', cover: '值夜联络', subtitle: '值夜者联络人 · 序列 7 梦魇', english: 'Ian Morris', placeholder: false },
    { id: 'persona-2', category: 'persona', title: '西拉斯·贝尔', cover: '拍卖行主', subtitle: '地下拍卖行主 · 普通人', english: 'Silas Bell', placeholder: false },
    { id: 'persona-3', category: 'persona', title: '艾达·芬奇', cover: '幸存买家', subtitle: '受污染的验货人 · 普通人', english: 'Ada Finch', placeholder: false },
    { id: 'persona-4', category: 'persona', title: '奥斯温·哈罗', cover: '宅邸主人', subtitle: '宅邸主人 · 序列 5 欲望使徒', english: 'Oswin Harrow', placeholder: false },
    { id: 'persona-5', category: 'persona', title: '玛莎·里德', cover: '邻居证人', subtitle: '受害者邻居 · 可选证人', english: 'Martha Reed', placeholder: false },
    { id: 'creature-1', category: 'creature', title: '被污染的买家', subtitle: '艾达的发作分支 · 可避免冲突', english: 'The Afflicted Buyer', placeholder: false },
    { id: 'creature-2', category: 'creature', title: '封印物仆从', subtitle: '污染受害者 · 迟缓而可绕过', english: 'The Bound Servant', placeholder: false },
    { id: 'creature-3', category: 'creature', title: '封印物幻象', subtitle: '无实体污染现象 · 查明并抑制源头', english: 'A Desired Reflection', placeholder: false },
    { id: 'creature-4', category: 'creature', title: '欲望使徒', subtitle: '奥斯温战斗档案 · 深渊途径序列 5', english: 'Apostle of Desire', placeholder: false },
    { id: 'creature-5', category: 'creature', title: '欲望母树投影', cover: '母树投影', subtitle: '外形、感觉与可朗读描写 · 仪式高潮', english: 'An Echo of Desire', placeholder: false },
    { id: 'story-guide', category: 'story', title: '拍卖会的藏品', subtitle: '介绍 · 守秘人信息 · 大纲与时间线', english: 'The Auctioned Relic', placeholder: false },
    { id: 'story-1', category: 'story', title: '第一幕 · 静默的居所', cover: '静默居所', subtitle: '第一名受害者住所', english: 'The First Trace', placeholder: false },
    { id: 'story-2', category: 'story', title: '第二幕 · 银槌之后', cover: '银槌之后', subtitle: '拍卖会所与幸存买家', english: 'Behind Closed Doors', placeholder: false },
    { id: 'story-3', category: 'story', title: '第三幕 · 欲望的宅邸', cover: '欲望宅邸', subtitle: '哈罗宅邸 · 交涉与潜入', english: 'A House of Desire', placeholder: false },
    { id: 'story-4', category: 'story', title: '第四幕 · 未闭合的手掌', cover: '未闭手掌', subtitle: '庄园花园 · 仪式与结局', english: 'The Final Rite', placeholder: false }
  ]
};
if (typeof module !== 'undefined' && module.exports) module.exports = { ARCHIVE_CATALOG };
