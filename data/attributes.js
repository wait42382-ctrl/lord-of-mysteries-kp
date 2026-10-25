// 本团序列 8～4 的专属面板提升提案。数组依次为序列 8、7、6、5、4。
// 与全途径通用五项＋1独立累计，每阶每项最多＋3；序列 9 与 3～0不配置。
var PATHWAY_ATTRIBUTES = (function () {
  'use strict';
  const gains = {
    fool: [{DEX:3},{DEX:2,INT:1},{APP:2,CON:1},{POW:2,INT:2},{DEX:2,POW:3}],
    door: [{DEX:2,INT:1},{INT:2,POW:2},{INT:3,POW:1},{DEX:2,CON:1},{INT:2,POW:3}],
    error: [{INT:2,APP:1},{INT:3},{DEX:2,POW:1},{POW:2,INT:2},{CON:2,POW:3}],
    sun: [{CON:2,POW:1},{POW:2},{POW:2,INT:1},{CON:2,POW:2},{CON:2,POW:3}],
    tyrant: [{STR:3,CON:2},{INT:2,CON:1},{DEX:2,POW:2},{POW:2,CON:1},{STR:2,POW:3}],
    visionary: [{INT:2,POW:1},{INT:2,POW:2},{POW:3,CON:1},{POW:2,INT:1},{POW:3,INT:2}],
    'white-tower': [{INT:3},{DEX:2,INT:2},{INT:3},{INT:2,POW:2},{INT:3,POW:2}],
    abyss: [{STR:2,CON:2},{STR:2,DEX:2},{STR:3,CON:3},{POW:2,APP:1},{POW:3,CON:2}],
    chained: [{STR:2,CON:2},{STR:3,DEX:2,CON:2},{CON:3,STR:2},{POW:3,DEX:1},{CON:2,POW:3}],
    'hanged-man': [{POW:2},{POW:2,CON:1},{CON:2,POW:2},{POW:3,INT:2},{STR:3,CON:3}],
    darkness: [{STR:1,DEX:1},{POW:2,INT:1},{POW:2,CON:1},{POW:2,INT:2},{CON:2,POW:2}],
    death: [{STR:2,CON:1},{POW:2},{POW:2,INT:1},{POW:3,CON:1},{CON:3,POW:2}],
    'twilight-giant': [{STR:2,DEX:2},{STR:2,CON:2},{STR:3,CON:2},{CON:3,POW:2},{STR:2,POW:3}],
    demoness: [{APP:2,INT:1},{APP:3,POW:2},{APP:3,CON:1},{POW:2,CON:2},{CON:3,POW:3}],
    'red-priest': [{STR:2,DEX:2},{CON:2,POW:1},{INT:3},{STR:3,DEX:2},{STR:3,CON:3}],
    mother: [{INT:2},{CON:2,POW:1},{INT:3},{CON:2,POW:2},{INT:3,POW:2}],
    moon: [{POW:1,INT:1},{DEX:3,CON:2},{INT:3},{POW:2,INT:2},{POW:3,INT:2}],
    justiciar: [{CON:2,DEX:1},{STR:2,POW:1},{POW:2,INT:2},{STR:2,CON:2},{POW:3,INT:2}],
    'black-emperor': [{STR:3,CON:2},{APP:2,INT:1},{STR:2,CON:2},{INT:2,POW:2},{POW:3,CON:2}],
    paragon: [{INT:2,CON:1},{INT:2},{INT:3,DEX:1},{INT:3,POW:1},{INT:3,POW:2}],
    hermit: [{STR:2,DEX:1},{POW:2,INT:1},{INT:3},{INT:2,POW:2},{INT:3,POW:3}],
    'wheel-of-fortune': [{INT:3,DEX:2},{LUCK:3},{POW:2,CON:1},{LUCK:3,POW:1},{POW:3,LUCK:2}]
  };
  const labels = {STR:'力量',CON:'体质',SIZ:'体型',DEX:'敏捷',APP:'外貌',INT:'智力',POW:'意志',EDU:'教育',LUCK:'幸运'};
  function at(key, level) {
    return level >= 4 && level <= 8 && gains[key] ? Object.assign({}, gains[key][8-level]) : null;
  }
  function cumulative(key, level) {
    const result = {};
    if (!gains[key]) return result;
    for (let stage=8;stage>=Math.max(4,level);stage--) {
      Object.entries(at(key,stage)).forEach(function (entry) { result[entry[0]]=(result[entry[0]]||0)+entry[1]; });
    }
    return result;
  }
  function describe(bonus) {
    return Object.entries(bonus||{}).map(function (entry) { return labels[entry[0]]+' '+entry[0]+'＋'+entry[1]; }).join('，');
  }
  return {gains:gains,labels:labels,at:at,cumulative:cumulative,describe:describe,status:'proposal'};
})();
if (typeof module!=='undefined'&&module.exports) module.exports={PATHWAY_ATTRIBUTES};
