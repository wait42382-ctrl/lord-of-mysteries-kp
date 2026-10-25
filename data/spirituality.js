// 用户自定义灵感/灵性规则。途径专属数值采用用户填写表（2026-10-14）。
var SPIRITUALITY = (function () {
  'use strict';
  const lowIntThreshold = 40; // 暂定阈值：INT 恰为 40 不扣减。
  // 各阶独立额外提升：0 表示本阶没有新增；序列 2～0 不涉及。
  const pathwayGains = {
  "fool": {
    "3": 2,
    "4": 1,
    "5": 2,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 2
  },
  "door": {
    "3": 0,
    "4": 1,
    "5": 0,
    "6": 1,
    "7": 2,
    "8": 0,
    "9": 1
  },
  "error": {
    "3": 2,
    "4": 1,
    "5": 1,
    "6": 0,
    "7": 2,
    "8": 1,
    "9": 2
  },
  "sun": {
    "3": 0,
    "4": 0,
    "5": 2,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 0
  },
  "tyrant": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 0
  },
  "visionary": {
    "3": 0,
    "4": 1,
    "5": 1,
    "6": 1,
    "7": 1,
    "8": 1,
    "9": 1
  },
  "white-tower": {
    "3": 2,
    "4": 2,
    "5": 0,
    "6": 0,
    "7": 1,
    "8": 1,
    "9": 2
  },
  "abyss": {
    "3": 2,
    "4": 2,
    "5": 2,
    "6": 1,
    "7": 1,
    "8": 1,
    "9": 1
  },
  "chained": {
    "3": 2,
    "4": 0,
    "5": 2,
    "6": 0,
    "7": 1,
    "8": 1,
    "9": 1
  },
  "hanged-man": {
    "3": 1,
    "4": 0,
    "5": 1,
    "6": 0,
    "7": 1,
    "8": 1,
    "9": 1
  },
  "darkness": {
    "3": 1,
    "4": 0,
    "5": 1,
    "6": 1,
    "7": 2,
    "8": 0,
    "9": 0
  },
  "death": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 0
  },
  "twilight-giant": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 1,
    "7": 0,
    "8": 0,
    "9": 0
  },
  "demoness": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 1,
    "8": 0,
    "9": 0
  },
  "red-priest": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 1,
    "7": 0,
    "8": 0,
    "9": 0
  },
  "mother": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 0
  },
  "moon": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 1,
    "8": 0,
    "9": 0
  },
  "justiciar": {
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 1,
    "7": 0,
    "8": 0,
    "9": 0
  },
  "black-emperor": {
    "3": 0,
    "4": 0,
    "5": 1,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 2
  },
  "paragon": {
    "3": 1,
    "4": 1,
    "5": 2,
    "6": 0,
    "7": 1,
    "8": 1,
    "9": 1
  },
  "hermit": {
    "3": 1,
    "4": 1,
    "5": 1,
    "6": 0,
    "7": 1,
    "8": 0,
    "9": 2
  },
  "wheel-of-fortune": {
    "3": 1,
    "4": 2,
    "5": 2,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 2
  }
};
  function base(pow, intelligence) {
    const willpower = Math.floor(pow / 5);
    const intelligencePenalty = intelligence < lowIntThreshold ? Math.floor(intelligence / 10) : 0;
    return { willpower: willpower, intelligencePenalty: intelligencePenalty, total: Math.max(0, willpower - intelligencePenalty) };
  }
  function growth(key, level) {
    if (!Number.isInteger(level) || level < 0 || level > 9) throw new RangeError('序列必须为 0～9');
    if (level < 3 || !Object.prototype.hasOwnProperty.call(pathwayGains, key)) return null;
    let potionTotal = 0;
    let pathwayTotal = 0;
    for (let stage = 9; stage >= level; stage--) {
      potionTotal += stage <= 6 ? 2 : 1;
      pathwayTotal += pathwayGains[key][stage];
    }
    const pathwayGain = pathwayGains[key][level];
    return { potionGain: level <= 6 ? 2 : 1, potionTotal: potionTotal,
      pathwayGain: pathwayGain, pathwayTotal: pathwayTotal, extraTotal: potionTotal + pathwayTotal };
  }
  function maximum(pow, intelligence, key, level) {
    const ordinary = base(pow, intelligence);
    const progress = growth(key, level);
    if (!progress) return null;
    return { ordinary: ordinary, growth: progress, total: ordinary.total + progress.extraTotal };
  }
  return { lowIntThreshold: lowIntThreshold, thresholdStatus: 'proposal', pathwayStatus: 'confirmed', pathwayGains: pathwayGains,
    base: base, growth: growth, maximum: maximum };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = { SPIRITUALITY };
