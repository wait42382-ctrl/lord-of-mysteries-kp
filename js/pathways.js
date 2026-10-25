// ============================================================
// js/pathways.js —— 22 神之途径 · 星空思维导图页
// 读取 data/pathways.js 的 PATHWAYS：
//   总览：中心发散导图（22 途径节点环绕中央）
//   详情：8-4 主动/被动规则卡，9/3 原概述，1-2 简写，0 权柄
// 阵营映射由原 app.js 途径速查合并而来。
// ============================================================

(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // 序列9名 → 阵营归属（原「途径速查」的阵营，规格 §8；未列出的默认「非官方」）
  const FACTION_MAP = {
    '不眠者': { faction: '官方非凡者', org: '值夜者（黑夜女神）' },
    '水手':   { faction: '官方非凡者', org: '代罚者（风暴之主）' },
    '通识者': { faction: '官方非凡者', org: '机械之心（蒸汽与机械之神）' },
    '囚犯':   { faction: '邪教教徒', org: '玫瑰学派 / 纵欲派' },
    '罪犯':   { faction: '邪教教徒', org: '深渊崇拜' },
    '秘祈人': { faction: '邪教教徒', org: '秘祈人（倒吊人）' },
    '窥秘人': { faction: '邪教教徒', org: '窥秘人（隐者）' }
  };

  // ---------- 星空 ----------
  function renderStars(container, count) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('i');
      const size = (Math.random() * 2 + 1).toFixed(1);
      s.className = 'star';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.animationDuration = (2 + Math.random() * 3).toFixed(2) + 's';
      s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
      frag.appendChild(s);
    }
    container.appendChild(frag);
  }

  // ---------- 总览：中心发散导图 ----------
  function renderOverview(mindmap) {
    const list = window.PATHWAYS;
    if (!list) { mindmap.innerHTML = '<p style="color:var(--muted)">未加载 pathways.js</p>'; return; }

    const n = list.length;
    const R = 38; // 节点距中心的半径（viewBox 百分比坐标）

    let lines = '';
    let nodesHtml = '';

    list.forEach(function (p, i) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2; // 从正上方开始
      const x = 50 + R * Math.cos(angle);
      const y = 50 + R * Math.sin(angle);
      lines += '<line x1="50" y1="50" x2="' + x.toFixed(2) + '" y2="' + y.toFixed(2) + '"/>';
      nodesHtml +=
        '<button class="pnode" data-key="' + esc(p.key) + '"' +
        ' style="left:' + x.toFixed(2) + '%;top:' + y.toFixed(2) + '%;animation-delay:-' + (i * 0.18).toFixed(2) + 's">' +
        esc(p.name) + '途径</button>';
    });

    mindmap.innerHTML =
      '<svg class="mindmap-lines" viewBox="0 0 100 100" preserveAspectRatio="none">' + lines + '</svg>' +
      '<div class="mindmap-center">22 神之途径</div>' +
      nodesHtml;

    mindmap.querySelectorAll('.pnode').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-key');
        history.pushState(null, '', '#' + key);
        showDetail(key);
      });
    });
  }

  // ---------- 详情 ----------
  function renderAbility(a, resourceName) {
    resourceName = resourceName || '灵性';
    if (!a.type) return '<p>' + esc(a.name) + '：' + esc(a.desc) +
      ' <span class="cost">（' + resourceName + ' ' + esc(a.cost == null ? '—' : a.cost) + '；原有概述）</span></p>';
    const active = a.type === 'active';
    const meta = active ? '<dl class="ability-meta">' +
      [['检定', a.check], ['行动', a.action], ['范围', a.range], ['持续', a.duration]].map(function (item) {
        return '<div><dt>' + item[0] + '</dt><dd>' + esc(item[1]) + '</dd></div>';
      }).join('') + '</dl>' : '';
    return '<article class="ability-card ' + (active ? 'active' : 'passive') + '">' +
      '<div class="ability-heading"><strong>' + esc(a.name) + '</strong>' +
      '<span class="ability-type">' + (active ? '主动' : '被动') + '</span>' +
      '<span class="cost">' + (active ? resourceName + ' ' + esc(a.cost) : '常驻 · 不耗' + resourceName) + '</span></div>' +
      '<p class="ability-desc">' + esc(a.desc) + '</p>' + meta +
      '<p class="ability-rule">' + esc(a.rule) + '</p></article>';
  }

  function renderSpirituality(s) {
    const g = s.spirituality;
    if (!g) return '';
    return '<div class="spirituality-growth" data-level="' + s.level + '">' +
      '<strong>灵性成长 · 灵感上限</strong><p>本次服药：魔药＋' + g.potionGain + '，途径额外＋' + g.pathwayGain + '</p>' +
      '<p>累计：魔药＋' + g.potionTotal + '，途径＋' + g.pathwayTotal + '</p>' +
      '<p class="spirituality-total">当前上限＝普通基础＋' + g.extraTotal + '</p></div>';
  }

  function renderPanelBonus(s) {
    if (!s.panelBonus) return '';
    return '<div class="spirituality-growth panel-bonus" data-level="' + s.level + '">' +
      '<strong>被动 · 专属面板加成</strong><p>' + esc(window.PATHWAY_ATTRIBUTES.describe(s.panelBonus)) + '</p>' +
      '<p>永久加点提案，每阶每项最多＋3；继承前阶，并与通用属性提升累计。灵感单独计入成长栏。</p></div>';
  }

  function showDetail(key) {
    const p = window.PATHWAYS.find(function (x) { return x.key === key; });
    if (!p) return;

    document.getElementById('view-overview').style.display = 'none';
    document.getElementById('view-detail').style.display = 'flex';
    document.getElementById('detail-title').textContent = p.name + ' → ' + p.godName;

    const fm = FACTION_MAP[p.name] || { faction: '非官方非凡者', org: '民间散修，无组织归属' };
    const factionHtml = '<span class="faction">阵营：' + esc(fm.faction) + ' · ' + esc(fm.org) + '</span>';

    const seqHtml = p.sequences.map(function (s) {
      if (s.level === 0) {
        // 序列0：只写权柄（几个词，用「、」连）
        const words = (s.abilities || []).map(function (a) { return a.name; }).join('、');
        return '<div class="seq seq-god">' +
          '<span class="seq-level">序列 0</span>' +
          '<span class="seq-name">' + esc(s.name) + '</span>' +
          '<div class="seq-authority">权柄：' + esc(words) + '</div>' +
          '</div>';
      } else if (s.level <= 2) {
        // 序列1-2：简写（名称 + 一句概述，不标灵性）
        const ab = (s.abilities || []).map(function (a) {
          return esc(a.name) + '：' + esc(a.desc);
        }).join('<br>　');
        return '<div class="seq seq-brief">' +
          '<span class="seq-level">序列 ' + s.level + '</span>' +
          '<span class="seq-name">' + esc(s.name) + '</span>' +
          '<div class="seq-desc">' + ab + '</div>' +
          '</div>';
      } else {
        // 序列8-4：规则卡；9与3：保留旧概述。
        const ab = (s.abilities || []).map(function (a) { return renderAbility(a, p.spirituality ? '灵感' : '灵性'); }).join('');
        return '<div class="seq">' +
          '<span class="seq-level">序列 ' + s.level + '</span>' +
          '<span class="seq-name">' + esc(s.name) + '</span>' +
          '<div class="seq-desc">' + renderSpirituality(s) + renderPanelBonus(s) + ab + '</div>' +
          '</div>';
      }
    }).join('');

    document.getElementById('pathway-detail').innerHTML =
      '<div class="detail-faction">' + factionHtml + '</div>' +
      (p.spirituality ? '<div class="spirituality-guide"><strong>' + esc(p.name) + '途径 · 灵感与面板成长</strong>' +
        '<p>普通基础＝⌊POW÷5⌋；INT＜' + window.SPIRITUALITY.lowIntThreshold + '（阈值暂定）扣⌊INT÷10⌋，最低 0。按当前属性计算。</p>' +
        '<p>灵感按已填写的表计算序列 9～3：9～7 每次魔药＋1，6～3 每次＋2。途径额外值独立记录，不再列为技能被动；累计栏只取当前值，不将各栏再次相加。序列 2～0 不设置灵感成长。</p>' +
        '<p>面板加点仅配置序列 8～4，每阶每项最多＋3，按魔药特点给出提案；序列 9 不加点。与所有途径的 STR／CON／DEX／INT／POW 每阶各＋1分别累计。</p>' +
        '<p>灵感用于施法；神之呓语及神秘感知门槛仍留空。旧被动上限加成已移除。' +
        '<a href="docs/rules/spirituality.md" target="_blank" rel="noopener">灵性规则说明</a></p></div>' :
        '<p class="spirituality-pending">本途径的专属灵感提升待分配；已有能力卡的旧上限数值尚未按新规则结算。</p>') +
      '<details class="rules-guide"><summary>序列 8～4 · CoC 能力裁定</summary>' +
      '<p>每阶列出晋升新增或强化的代表能力，继承低序列能力；同名强化取高，标注替代时使用新版本。主动能力最多三条，无需凑满；专属面板加点单列。</p>' +
      '<p>现有被动改为专属面板加点，不再额外赠送旧被动的技能奖励骰、灵感或属性数值。主动规则中的优势 = 1 个奖励骰，与惩罚骰相抵，最多 2 个。</p>' +
      '<p>主动能力先支付卡片标注的施法资源，失败也消耗；按所列检定、行动、范围和持续裁定。反应每轮最多一次，消耗下次行动。被动按条件加点，上限提升只在晋升时结算一次。</p>' +
      '<p>这里的消耗、伤害、距离与限制是本团改编值。' +
      '<a href="docs/rules/sequence-abilities-coc.md" target="_blank" rel="noopener">完整规则说明</a> · ' +
      '<a href="https://callofcthulhuwiki.chaosium.com/rules/game-system.html" target="_blank" rel="noopener">CoC 检定规则</a></p></details>' +
      (p.abilitySource ? '<p class="source-note"><a class="ability-source" href="' + esc(p.abilitySource.url) +
        '" target="_blank" rel="noopener">' + esc(p.abilitySource.label) + '</a> · ' + esc(p.abilitySource.checkedOn) + '</p>' : '') +
      '<div class="seq-list">' + seqHtml + '</div>';
  }

  function showOverview() {
    document.getElementById('view-detail').style.display = 'none';
    document.getElementById('view-overview').style.display = 'flex';
  }

  function restorePathway() {
    const key = window.location.hash.slice(1);
    if (window.PATHWAYS.some(function (p) { return p.key === key; })) showDetail(key);
    else showOverview();
  }

  // ---------- 装配 ----------
  function init() {
    renderStars(document.getElementById('stars'), 160);
    renderOverview(document.getElementById('mindmap'));
    document.getElementById('back-to-overview').addEventListener('click', function () {
      history.pushState(null, '', '#pathways');
      showOverview();
    });
    window.addEventListener('hashchange', restorePathway);
    window.addEventListener('popstate', restorePathway);
    restorePathway();
    document.getElementById('back-to-host').addEventListener('click', function () {
      SceneTransition.navigate('keeper.html');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
