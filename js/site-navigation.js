(function () {
  'use strict';
  var nav = document.getElementById('site-navigation');
  if (!nav) return;
  var page = location.pathname.split('/').pop().replace(/\.html$/, '');
  document.documentElement.dataset.navigationPage = page;
  var section = { sequences: 'symbols', pathways: 'symbols', character: 'archives', kp: 'keeper' }[page] || page;
  var home = { symbols: '#pathways', sequences: '#pathways', chronicle: '#story', artifact: '#artifact', character: '#character' }[page] || '';
  var items = [
    ['index', 'Index', '档案室'], ['symbols', 'Pathways', '神之途径'],
    ['archives', 'Archives', '档案目录'], ['chronicle', 'Chronicle', '剧情档案'],
    ['keeper', 'Keeper', '裁定台'], ['artifact', 'Artifact', '封印物']
  ];
  items.forEach(function (item) {
    var link = document.createElement('a');
    link.href = item[0] + '.html' + (item[0] === 'index' ? home : '');
    if (section === item[0]) link.setAttribute('aria-current', 'page');
    if (page === 'sequences' && item[0] === 'symbols') link.id = 'pathway-return';
    var en = document.createElement('span'), cn = document.createElement('small');
    en.textContent = item[1]; cn.textContent = item[2]; link.append(en, cn); nav.appendChild(link);
  });
})();
