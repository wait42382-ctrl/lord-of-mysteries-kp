// 原图坐标中的动画裁切；原PNG及最终静态画面保持完整。
var SEQUENCE_SCENE = {
  width: 1205, height: 1305, image: 'assets/sequences/vitruvian.png',
  arms: [
    { side: 'left', order: 3, pivot: [510,390], rotation: -85, points: '510,390 255,0 0,0 0,95' },
    { side: 'right', order: 3, pivot: [710,390], rotation: 85, points: '710,390 960,0 1205,0 1205,150' },
    { side: 'left', order: 2, pivot: [510,390], rotation: -65, points: '510,390 0,95 0,390' },
    { side: 'right', order: 2, pivot: [710,390], rotation: 65, points: '710,390 1205,150 1205,338' },
    { side: 'left', order: 1, pivot: [510,390], rotation: -42, points: '510,390 0,390 0,556' },
    { side: 'right', order: 1, pivot: [710,390], rotation: 42, points: '710,390 1205,338 1205,542' },
    { side: 'left', order: 0, pivot: [510,390], rotation: -22, points: '510,390 0,556 0,660 230,660' },
    { side: 'right', order: 0, pivot: [710,390], rotation: 22, points: '710,390 1205,542 1205,660 1000,660' }
  ]
};
if (typeof module !== 'undefined' && module.exports) module.exports = { SEQUENCE_SCENE };
