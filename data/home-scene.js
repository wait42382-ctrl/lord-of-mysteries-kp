var HOME_SCENE = {
  image: 'assets/scenes/workbench.png', width: 1672, height: 941,
  sourceSha256: 'c87590d0414f0e088d7995973ae34256a686456f72380a532f5cbca5a42658f9',
  items: [
    { key: 'story', title: '剧情档案', english: 'Chronicle', description: '贝克兰德\n拍卖会的藏品', href: 'chronicle.html', label: [553, 167], marker: [530, 164, 538, 340],
      outline: [[543,274],[601,220],[658,219],[777,204],[910,172],[938,184],[1058,341],[987,377],[996,415],[682,494],[630,498],[557,414],[553,334]] },
    { key: 'pathways', title: '神之途径', english: 'Pathways', description: '亵渎之路\n二十二条神之途径', href: 'symbols.html#pathways', label: [940, 674], marker: [730, 384, 505, 292],
      outline: [[748,528],[825,469],[927,407],[1007,387],[1142,415],[1176,480],[1180,521],[1220,546],[1118,653],[1096,651],[936,637],[874,625],[835,586],[789,587],[746,550]] },
    { key: 'character', title: '档案目录', english: 'Archives', description: '角色模板 · 扮演角色\n怪物档案 · 剧情文档', href: 'archives.html', label: [1322, 67], marker: [1294, 61, 359, 380],
      outline: [[1367,72],[1480,88],[1648,157],[1643,224],[1616,423],[1594,433],[1444,422],[1377,399],[1320,378],[1306,228],[1332,121]] },
    { key: 'artifact', title: '封印物', english: 'Sealed Artifact', description: '拜祭之指\n封存档案', href: 'artifact.html', label: [1405, 747], marker: [1220, 369, 410, 370],
      outline: [[1260,410],[1410,374],[1598,450],[1622,551],[1605,664],[1493,722],[1362,687],[1251,609],[1238,494]] },
    { key: 'host', title: '裁定台', english: 'Keeper', description: '掷骰与检定\n呓语 · 失控表现', href: 'keeper.html', label: [971, 39], marker: [947, 0, 348, 394],
      outline: [[963,26],[977,17],[1036,48],[1147,0],[1210,72],[1242,142],[1280,241],[1227,288],[1177,313],[1182,369],[1127,388],[1080,363],[1110,309],[1020,260],[984,198],[971,119]] }
  ]
};
if (typeof module !== 'undefined' && module.exports) module.exports = { HOME_SCENE: HOME_SCENE };
