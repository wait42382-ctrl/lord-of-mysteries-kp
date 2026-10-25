// 四幕短团平面图；由 assets/story-maps/generate.cjs 同步生成。
// 只提供空间描述与既有线索索引，不新增剧情或规则。
var STORY_MAPS = [
  {
    "actId": 1,
    "title": "受害者住所",
    "subtitle": "煤气灯下的静默",
    "area": "约120 m²",
    "scale": "1格＝1米",
    "file": "assets/story-maps/act-01.svg",
    "floors": [
      {
        "id": "ground",
        "name": "首层 / GROUND FLOOR",
        "width": 12,
        "height": 10,
        "x": 216,
        "y": 164,
        "p": 39
      }
    ],
    "rooms": [
      {
        "id": "drawing-room",
        "name": "起居室",
        "floor": "ground",
        "bounds": [
          0,
          0,
          4,
          4
        ],
        "description": "壁炉、两张扶手沙发与小茶几；南侧门通书房，东侧门接中央过厅。",
        "clues": [],
        "label": [
          2,
          1.15
        ]
      },
      {
        "id": "study",
        "name": "书房",
        "floor": "ground",
        "bounds": [
          0,
          4,
          4,
          6
        ],
        "description": "靠墙书柜与窗边书桌，中央留出翻查空间；票据与残留污染按既有剧情供KP描述。",
        "clues": [
          0,
          2
        ],
        "label": [
          2,
          6.1
        ]
      },
      {
        "id": "hall",
        "name": "门厅 / 过厅",
        "floor": "ground",
        "bounds": [
          4,
          0,
          3,
          10
        ],
        "description": "南端为临街正门与衣帽架；贯通房屋中央，连接起居室、书房、卧房、厨房及餐室。",
        "clues": [],
        "label": [
          5.5,
          4.55
        ]
      },
      {
        "id": "bedroom",
        "name": "卧房",
        "floor": "ground",
        "bounds": [
          7,
          0,
          5,
          4
        ],
        "description": "双人床、衣橱与床头柜，临北侧及东侧窗；受害者与血液残留线索在此供KP描述。",
        "clues": [
          1,
          3
        ],
        "label": [
          9.5,
          1.12
        ]
      },
      {
        "id": "kitchen",
        "name": "厨房",
        "floor": "ground",
        "bounds": [
          7,
          4,
          5,
          3
        ],
        "description": "灶台、洗槽、木质工作台与储物柜；西门接过厅，东侧服务后门可直出。",
        "clues": [],
        "label": [
          9.5,
          4.72
        ]
      },
      {
        "id": "dining-room",
        "name": "餐室",
        "floor": "ground",
        "bounds": [
          7,
          7,
          5,
          3
        ],
        "description": "小型六人餐桌与边柜；西门通中央过厅，南侧两扇窗面向街道。",
        "clues": [],
        "label": [
          9.5,
          7.65
        ]
      }
    ],
    "connections": [
      {
        "id": "front-entry",
        "from": "hall",
        "to": "outside",
        "x": 5.5,
        "y": 10,
        "dir": "h",
        "width": 1.3,
        "kind": "door"
      },
      {
        "id": "hall-drawing",
        "from": "hall",
        "to": "drawing-room",
        "x": 4,
        "y": 2.7,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "hall-study",
        "from": "hall",
        "to": "study",
        "x": 4,
        "y": 6.7,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "hall-bedroom",
        "from": "hall",
        "to": "bedroom",
        "x": 7,
        "y": 2.7,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "hall-kitchen",
        "from": "hall",
        "to": "kitchen",
        "x": 7,
        "y": 5.7,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "hall-dining",
        "from": "hall",
        "to": "dining-room",
        "x": 7,
        "y": 8.5,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "drawing-study",
        "from": "drawing-room",
        "to": "study",
        "x": 1.2,
        "y": 4,
        "dir": "h",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "kitchen-back",
        "from": "kitchen",
        "to": "outside",
        "x": 12,
        "y": 5.8,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      }
    ],
    "notes": [
      "南：临街正门",
      "东：服务后门",
      "仅首层 · 6个空间"
    ],
    "north": "up",
    "embedViewBox": [
      182,
      120,
      555,
      495
    ],
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 900 740\" class=\"story-map-svg\" id=\"map-1-root\" role=\"group\" aria-labelledby=\"map-1-title map-1-desc\"><title id=\"map-1-title\">第1幕 · 受害者住所平面图</title><desc id=\"map-1-desc\">约120 m²。起居室、书房、门厅 / 过厅、卧房、厨房、餐室。选取房间查看空间说明。建筑门洞及楼梯均已标示，户型供KP描述场景。</desc><defs><pattern id=\"map-1-grid-ground\" width=\"39\" height=\"39\" patternUnits=\"userSpaceOnUse\" x=\"216\" y=\"164\"><path d=\"M39 0H0V39\" fill=\"none\" stroke=\"#8b9992\" stroke-width=\".7\"/></pattern></defs><style>#map-1-root{font-family:\"Noto Serif SC\",\"Songti SC\",\"SimSun\",serif;background:#111315;color:#c7cac7}#map-1-root text{fill:#c9cecb;stroke:none;user-select:none}#map-1-root .headline{font-size:25px;letter-spacing:4px}#map-1-root .subhead{fill:#85928e;font-size:11px;letter-spacing:2px}#map-1-root .floor-title{font-size:12px;letter-spacing:2px;fill:#aab8b1}#map-1-root .wall-shadow{fill:none;stroke:#383d3d;stroke-width:.27}#map-1-root .wall{fill:none;stroke:#b5bab8;stroke-width:.105}#map-1-root .outer{stroke-width:.17;stroke:#c4c7c3}#map-1-root .floor-grid{opacity:.2}#map-1-root .room-zone{outline:none;cursor:pointer}#map-1-root .room-floor{fill:#b2c4bb;fill-opacity:.015;stroke:none}#map-1-root .room-zone:hover .room-floor,#map-1-root .room-zone:focus .room-floor{fill:#b1bdb5;fill-opacity:.12}#map-1-root .room-zone.is-selected .room-floor{fill:#a63847;fill-opacity:.23}#map-1-root .room-label{font-size:16px;letter-spacing:1.4px;pointer-events:none}#map-1-root .room-number{font:10px Georgia,serif;letter-spacing:2px;fill:#7b9188;pointer-events:none}#map-1-root .room-zone.is-selected .room-label{fill:#eee5da}#map-1-root .room-zone.is-selected .room-number{fill:#c66b75}#map-1-root .furniture{fill:none;stroke:#8c9691;stroke-width:.04;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}#map-1-root .rug{fill:none;stroke:#65786d;stroke-width:.025;stroke-dasharray:.13 .07;pointer-events:none}#map-1-root .door-gap{stroke:#111315;stroke-width:.35;fill:none}#map-1-root .door-line{stroke:#9ba99f;stroke-width:.04;fill:none}#map-1-root .door-arc{stroke:#7c9187;stroke-width:.025;fill:none;stroke-dasharray:.09 .05}#map-1-root .window-gap{stroke:#111315;stroke-width:.25}#map-1-root .window-line{stroke:#bdd1c7;stroke-width:.035;fill:none}#map-1-root .dimension{stroke:#707f78;stroke-width:1;fill:none}#map-1-root .dimension-label{font:10px Georgia,serif;letter-spacing:1.4px;fill:#859b8e}#map-1-root .note{font-size:11px;fill:#83948b;letter-spacing:1px}#map-1-root .scale-bar{stroke:#b5c0b6;fill:none;stroke-width:1}#map-1-root .scale-label{font:11px Georgia,serif;fill:#9eafa3}#map-1-root .north-arrow{stroke:#a8b9ad;fill:none;stroke-width:1}#map-1-root .north-label{font:12px Georgia,serif;fill:#b8c6bb}#map-1-root .thin-rule{stroke:#5d7066;stroke-width:1}#map-1-root .garden-path{fill:#73877b;fill-opacity:.10;stroke:#7d9285;stroke-opacity:.5;stroke-width:.025;pointer-events:none}#map-1-root .garden-hedge{fill:#586f5b;fill-opacity:.16;stroke:#789580;stroke-width:.05;stroke-dasharray:.12 .1;pointer-events:none}#map-1-root .ritual-symbol{fill:none;stroke:#98515a;stroke-width:.055;pointer-events:none}#map-1-root .stairs-link{font:11px Georgia,serif;letter-spacing:1px;fill:#c1b8a4}#map-1-root .room-marker{fill:#b65761;stroke:#c38489;stroke-width:1}#map-1-root .artifact-symbol{stroke:#b4b6a4}\n</style><rect x=\"0\" y=\"0\" width=\"900\" height=\"740\" fill=\"#111315\"/><g class=\"map-sheet-header\"><path class=\"thin-rule\" d=\"M38 110H862M38 651H862\"/><text class=\"subhead\" x=\"44\" y=\"38\">BACKLUND · SURVEY RECORD / 01</text><text class=\"headline\" x=\"44\" y=\"75\">受害者住所</text><text class=\"subhead\" x=\"45\" y=\"97\">煤气灯下的静默 · 约120 m²</text><g class=\"north-arrow\" aria-label=\"北向上\" transform=\"translate(838 63)\"><path d=\"M0 28V-10M-6 1L0-10L6 1M-15 14H15\"/><path d=\"M0 -10L-4 0H0Z\" fill=\"#a8b9ad\"/><text class=\"north-label\" x=\"0\" y=\"-19\" text-anchor=\"middle\">N</text></g></g><text class=\"floor-title\" x=\"216\" y=\"134\">首层 / GROUND FLOOR</text><rect x=\"216\" y=\"164\" width=\"468\" height=\"390\" fill=\"#111315\"/><rect class=\"floor-grid\" x=\"216\" y=\"164\" width=\"468\" height=\"390\" fill=\"url(#map-1-grid-ground)\"/><g class=\"room-zone\" data-room=\"drawing-room\" tabindex=\"0\" role=\"button\" aria-label=\"起居室：壁炉、两张扶手沙发与小茶几；南侧门通书房，东侧门接中央过厅。\"><rect class=\"room-floor\" x=\"219\" y=\"167\" width=\"150\" height=\"150\"/><text class=\"room-number\" x=\"294\" y=\"192.85\" text-anchor=\"middle\">01</text><text class=\"room-label\" x=\"294\" y=\"208.85\" text-anchor=\"middle\">起居室</text></g><g class=\"room-zone\" data-room=\"study\" tabindex=\"0\" role=\"button\" aria-label=\"书房：靠墙书柜与窗边书桌，中央留出翻查空间；票据与残留污染按既有剧情供KP描述。\"><rect class=\"room-floor\" x=\"219\" y=\"323\" width=\"150\" height=\"228\"/><text class=\"room-number\" x=\"294\" y=\"385.9\" text-anchor=\"middle\">02</text><text class=\"room-label\" x=\"294\" y=\"401.9\" text-anchor=\"middle\">书房</text><circle class=\"room-marker\" cx=\"362\" cy=\"544\" r=\"2.5\"/></g><g class=\"room-zone\" data-room=\"hall\" tabindex=\"0\" role=\"button\" aria-label=\"门厅 / 过厅：南端为临街正门与衣帽架；贯通房屋中央，连接起居室、书房、卧房、厨房及餐室。\"><rect class=\"room-floor\" x=\"375\" y=\"167\" width=\"111\" height=\"384\"/><text class=\"room-number\" x=\"430.5\" y=\"325.45\" text-anchor=\"middle\">03</text><text class=\"room-label\" x=\"430.5\" y=\"341.45\" text-anchor=\"middle\">门厅 / 过厅</text></g><g class=\"room-zone\" data-room=\"bedroom\" tabindex=\"0\" role=\"button\" aria-label=\"卧房：双人床、衣橱与床头柜，临北侧及东侧窗；受害者与血液残留线索在此供KP描述。\"><rect class=\"room-floor\" x=\"492\" y=\"167\" width=\"189\" height=\"150\"/><text class=\"room-number\" x=\"586.5\" y=\"191.68\" text-anchor=\"middle\">04</text><text class=\"room-label\" x=\"586.5\" y=\"207.68\" text-anchor=\"middle\">卧房</text><circle class=\"room-marker\" cx=\"674\" cy=\"310\" r=\"2.5\"/></g><g class=\"room-zone\" data-room=\"kitchen\" tabindex=\"0\" role=\"button\" aria-label=\"厨房：灶台、洗槽、木质工作台与储物柜；西门接过厅，东侧服务后门可直出。\"><rect class=\"room-floor\" x=\"492\" y=\"323\" width=\"189\" height=\"111\"/><text class=\"room-number\" x=\"586.5\" y=\"332.08\" text-anchor=\"middle\">05</text><text class=\"room-label\" x=\"586.5\" y=\"348.08\" text-anchor=\"middle\">厨房</text></g><g class=\"room-zone\" data-room=\"dining-room\" tabindex=\"0\" role=\"button\" aria-label=\"餐室：小型六人餐桌与边柜；西门通中央过厅，南侧两扇窗面向街道。\"><rect class=\"room-floor\" x=\"492\" y=\"440\" width=\"189\" height=\"111\"/><text class=\"room-number\" x=\"586.5\" y=\"446.35\" text-anchor=\"middle\">06</text><text class=\"room-label\" x=\"586.5\" y=\"462.35\" text-anchor=\"middle\">餐室</text></g><g transform=\"translate(216 164) scale(39)\" pointer-events=\"none\"><g class=\"wall-shadow\"><rect x=\"0\" y=\"0\" width=\"4\" height=\"4\"/><rect x=\"0\" y=\"4\" width=\"4\" height=\"6\"/><rect x=\"4\" y=\"0\" width=\"3\" height=\"10\"/><rect x=\"7\" y=\"0\" width=\"5\" height=\"4\"/><rect x=\"7\" y=\"4\" width=\"5\" height=\"3\"/><rect x=\"7\" y=\"7\" width=\"5\" height=\"3\"/></g><g class=\"wall\"><rect x=\"0\" y=\"0\" width=\"4\" height=\"4\"/><rect x=\"0\" y=\"4\" width=\"4\" height=\"6\"/><rect x=\"4\" y=\"0\" width=\"3\" height=\"10\"/><rect x=\"7\" y=\"0\" width=\"5\" height=\"4\"/><rect x=\"7\" y=\"4\" width=\"5\" height=\"3\"/><rect x=\"7\" y=\"7\" width=\"5\" height=\"3\"/></g><rect class=\"wall outer\" x=\"0\" y=\"0\" width=\"12\" height=\"10\"/><g class=\"furniture\"><rect x=\"1.3\" y=\"0.15\" width=\"1.4\" height=\"0.4\" rx=\"0\"/><rect x=\"1.45\" y=\"0.21\" width=\"1.0999999999999999\" height=\"0.27\" rx=\"0\"/><path d=\"M1.65 0.4l.2 -.12l.2 .12l.2 -.12\"/></g><g class=\"furniture\"><rect x=\"0.45\" y=\"1.9\" width=\"1.1\" height=\"1.4\" rx=\"0.15\"/><rect x=\"0.65\" y=\"2.05\" width=\"0.7000000000000001\" height=\"1.0999999999999999\" rx=\"0.1\"/><path d=\"M1 2.1V3.0999999999999996\"/></g><g class=\"furniture\"><rect x=\"2.55\" y=\"1.9\" width=\"1\" height=\"1.4\" rx=\"0.15\"/><rect x=\"2.75\" y=\"2.05\" width=\"0.6\" height=\"1.0999999999999999\" rx=\"0.1\"/><path d=\"M3.05 2.1V3.0999999999999996\"/></g><g class=\"furniture\"><rect x=\"1.7\" y=\"2.05\" width=\"0.6\" height=\"1\" rx=\"0.12\"/><rect x=\"1.8199999999999998\" y=\"2.17\" width=\"0.36\" height=\"0.76\" rx=\"0.08\"/></g><g class=\"rug\"><rect x=\"0.65\" y=\"1.7\" width=\"2.75\" height=\"1.85\" rx=\"0.03\"/><rect x=\"0.8\" y=\"1.8499999999999999\" width=\"2.45\" height=\"1.55\" rx=\"0.02\"/><path d=\"M2.025 2.1625l0.4675 0.4625l-0.4675 0.4625l-0.4675 -0.4625Z\"/></g><g class=\"furniture\"><rect x=\"2.2\" y=\"4.3\" width=\"1.4\" height=\"0.45\" rx=\"0\"/><path d=\"M2.3000000000000003 4.359999999999999v0.33\"/><path d=\"M2.4600000000000004 4.359999999999999v0.33\"/><path d=\"M2.62 4.359999999999999v0.33\"/><path d=\"M2.7800000000000002 4.359999999999999v0.33\"/><path d=\"M2.9400000000000004 4.359999999999999v0.33\"/><path d=\"M3.1000000000000005 4.359999999999999v0.33\"/><path d=\"M3.2600000000000002 4.359999999999999v0.33\"/><path d=\"M3.4200000000000004 4.359999999999999v0.33\"/></g><g class=\"furniture\"><rect x=\"0.3\" y=\"5.5\" width=\"0.45\" height=\"2\" rx=\"0\"/><path d=\"M0.4 5.56v1.88\"/><path d=\"M0.56 5.56v1.88\"/></g><g class=\"furniture\"><rect x=\"0.45\" y=\"8.45\" width=\"2.3\" height=\"0.8\" rx=\"0.12\"/><rect x=\"0.5700000000000001\" y=\"8.569999999999999\" width=\"2.0599999999999996\" height=\"0.56\" rx=\"0.08\"/></g><g class=\"furniture\" transform=\"translate(1.5999999999999999 9.8) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\"><rect x=\"0.65\" y=\"8.6\" width=\"0.4\" height=\"0.3\" rx=\"0\"/><path d=\"M2.2 8.649999999999999h.3m-.3 .12h.3\"/><circle cx=\"2.45\" cy=\"9.03\" r=\"0.08\"/></g><g class=\"rug\"><rect x=\"0.7\" y=\"5.9\" width=\"2.5\" height=\"1.5\" rx=\"0.03\"/><rect x=\"0.85\" y=\"6.050000000000001\" width=\"2.2\" height=\"1.2\" rx=\"0.02\"/><path d=\"M1.95 6.275l0.42500000000000004 0.375l-0.42500000000000004 0.375l-0.42500000000000004 -0.375Z\"/></g><g class=\"furniture\"><rect x=\"8.5\" y=\"1.65\" width=\"1.65\" height=\"2.05\" rx=\"0.1\"/><rect x=\"8.62\" y=\"1.7999999999999998\" width=\"1.41\" height=\"0.45\" rx=\"0.08\"/><rect x=\"8.62\" y=\"2.3499999999999996\" width=\"1.41\" height=\"1.1999999999999997\" rx=\"0.05\"/><path d=\"M8.65 2.7h1.3499999999999999M8.65 3.3h1.3499999999999999\"/></g><g class=\"furniture\"><rect x=\"8\" y=\"1.25\" width=\"0.4\" height=\"0.45\" rx=\"0.12\"/><rect x=\"8.12\" y=\"1.37\" width=\"0.16000000000000003\" height=\"0.21000000000000002\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"10.3\" y=\"1.75\" width=\"0.4\" height=\"0.55\" rx=\"0.12\"/><rect x=\"10.42\" y=\"1.87\" width=\"0.16000000000000003\" height=\"0.31000000000000005\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"10.85\" y=\"0.45\" width=\"0.6\" height=\"2.4\" rx=\"0\"/><path d=\"M10.95 0.51v2.28\"/><path d=\"M11.11 0.51v2.28\"/><path d=\"M11.27 0.51v2.28\"/></g><g class=\"furniture\"><rect x=\"8\" y=\"6\" width=\"3.25\" height=\"0.65\" rx=\"0\"/><rect x=\"8.15\" y=\"6.12\" width=\"0.65\" height=\"0.41000000000000003\" rx=\"0.12\"/><circle cx=\"10.8\" cy=\"6.325\" r=\"0.22\"/><circle cx=\"10.35\" cy=\"6.325\" r=\"0.18\"/></g><g class=\"furniture\"><rect x=\"9.2\" y=\"5.05\" width=\"1.4\" height=\"0.65\" rx=\"0.12\"/><rect x=\"9.319999999999999\" y=\"5.17\" width=\"1.16\" height=\"0.41000000000000003\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"8.35\" y=\"8.6\" width=\"2.3\" height=\"0.6\" rx=\"0.12\"/><rect x=\"8.469999999999999\" y=\"8.719999999999999\" width=\"2.0599999999999996\" height=\"0.36\" rx=\"0.08\"/></g><g class=\"furniture\" transform=\"translate(8.733333333333333 8.1) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(8.733333333333333 9.7) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(9.5 8.1) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(9.5 9.7) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(10.266666666666666 8.1) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(10.266666666666666 9.7) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\"><rect x=\"11.25\" y=\"7.7\" width=\"0.45\" height=\"1.7\" rx=\"0\"/><path d=\"M11.35 7.76v1.58\"/><path d=\"M11.51 7.76v1.58\"/></g><g class=\"rug\"><rect x=\"4.4\" y=\"7.8\" width=\"2.2\" height=\"1.2\" rx=\"0.03\"/><rect x=\"4.550000000000001\" y=\"7.95\" width=\"1.9000000000000001\" height=\"0.8999999999999999\" rx=\"0.02\"/><path d=\"M5.5 8.1l0.37400000000000005 0.3l-0.37400000000000005 0.3l-0.37400000000000005 -0.3Z\"/></g><g class=\"furniture plant\"><circle cx=\"4.55\" cy=\"0.6\" r=\"0.28\"/><path d=\"M4.34 0.6h0.42000000000000004M4.55 0.38999999999999996v0.42000000000000004M4.41 0.45999999999999996l0.28 0.28M4.6899999999999995 0.45999999999999996l-0.28 0.28\"/></g><g class=\"furniture\"><rect x=\"6.3\" y=\"8.1\" width=\"0.4\" height=\"1.4\" rx=\"0.12\"/><rect x=\"6.42\" y=\"8.219999999999999\" width=\"0.16000000000000003\" height=\"1.16\" rx=\"0.08\"/></g></g><g transform=\"translate(216 164) scale(39)\" pointer-events=\"none\"><path class=\"window-gap\" d=\"M0.7 0L2.5 0\"/><path class=\"window-line\" d=\"M0.7 -0.065L2.5 -0.065M0.7 0.065L2.5 0.065\"/><path class=\"window-line\" d=\"M1.6 -0.12v.24\"/><path class=\"window-gap\" d=\"M8 0L11 0\"/><path class=\"window-line\" d=\"M8 -0.065L11 -0.065M8 0.065L11 0.065\"/><path class=\"window-line\" d=\"M9.5 -0.12v.24\"/><path class=\"window-gap\" d=\"M0 0.7L0 2.5\"/><path class=\"window-line\" d=\"M-0.065 0.7L-0.065 2.5M0.065 0.7L0.065 2.5\"/><path class=\"window-line\" d=\"M-0.12 1.6h.24\"/><path class=\"window-gap\" d=\"M0 5L0 6.5\"/><path class=\"window-line\" d=\"M-0.065 5L-0.065 6.5M0.065 5L0.065 6.5\"/><path class=\"window-line\" d=\"M-0.12 5.75h.24\"/><path class=\"window-gap\" d=\"M0 8L0 9.3\"/><path class=\"window-line\" d=\"M-0.065 8L-0.065 9.3M0.065 8L0.065 9.3\"/><path class=\"window-line\" d=\"M-0.12 8.65h.24\"/><path class=\"window-gap\" d=\"M8 10L11 10\"/><path class=\"window-line\" d=\"M8 9.935L11 9.935M8 10.065L11 10.065\"/><path class=\"window-line\" d=\"M9.5 9.88v.24\"/><path class=\"window-gap\" d=\"M12 0.7L12 2.5\"/><path class=\"window-line\" d=\"M11.935 0.7L11.935 2.5M12.065 0.7L12.065 2.5\"/><path class=\"window-line\" d=\"M11.88 1.6h.24\"/><path class=\"window-gap\" d=\"M12 7.7L12 9.1\"/><path class=\"window-line\" d=\"M11.935 7.7L11.935 9.1M12.065 7.7L12.065 9.1\"/><path class=\"window-line\" d=\"M11.88 8.4h.24\"/></g><g class=\"dimension\"><path d=\"M216 150h468M216 145v10M684 145v10\"/><path d=\"M202 164v390M197 164h10M197 554h10\"/></g><text class=\"dimension-label\" text-anchor=\"middle\" x=\"450\" y=\"145\">12.0 m</text><text class=\"dimension-label\" text-anchor=\"middle\" transform=\"translate(193 359) rotate(-90)\">10.0 m</text><g data-connection=\"front-entry\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M4.85 10h1.3\"/><path class=\"door-line\" d=\"M4.85 10v1.3\"/><path class=\"door-arc\" d=\"M4.85 11.3A1.3 1.3 0 0 0 6.15 10\"/></g><g data-connection=\"hall-drawing\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M4 2.1500000000000004v1.1\"/><path class=\"door-line\" d=\"M4 2.1500000000000004h1.1\"/><path class=\"door-arc\" d=\"M5.1 2.1500000000000004A1.1 1.1 0 0 1 4 3.25\"/></g><g data-connection=\"hall-study\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M4 6.15v1.1\"/><path class=\"door-line\" d=\"M4 6.15h1.1\"/><path class=\"door-arc\" d=\"M5.1 6.15A1.1 1.1 0 0 1 4 7.25\"/></g><g data-connection=\"hall-bedroom\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M7 2.1500000000000004v1.1\"/><path class=\"door-line\" d=\"M7 2.1500000000000004h1.1\"/><path class=\"door-arc\" d=\"M8.1 2.1500000000000004A1.1 1.1 0 0 1 7 3.25\"/></g><g data-connection=\"hall-kitchen\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M7 5.15v1.1\"/><path class=\"door-line\" d=\"M7 5.15h1.1\"/><path class=\"door-arc\" d=\"M8.1 5.15A1.1 1.1 0 0 1 7 6.25\"/></g><g data-connection=\"hall-dining\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M7 7.95v1.1\"/><path class=\"door-line\" d=\"M7 7.95h1.1\"/><path class=\"door-arc\" d=\"M8.1 7.95A1.1 1.1 0 0 1 7 9.05\"/></g><g data-connection=\"drawing-study\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M0.6499999999999999 4h1.1\"/><path class=\"door-line\" d=\"M0.6499999999999999 4v1.1\"/><path class=\"door-arc\" d=\"M0.6499999999999999 5.1A1.1 1.1 0 0 0 1.75 4\"/></g><g data-connection=\"kitchen-back\" transform=\"translate(216 164) scale(39)\"><path class=\"door-gap\" d=\"M12 5.25v1.1\"/><path class=\"door-line\" d=\"M12 5.25h1.1\"/><path class=\"door-arc\" d=\"M13.1 5.25A1.1 1.1 0 0 1 12 6.35\"/></g><g class=\"map-sheet-footer\"><g class=\"scale-bar\"><path d=\"M56 684h195M56 679v10M134 679v10M251 679v10\"/><path d=\"M56 684h78\" stroke-width=\"4\"/><text class=\"scale-label\" x=\"56\" y=\"705\">0</text><text class=\"scale-label\" x=\"134\" y=\"705\" text-anchor=\"middle\">2</text><text class=\"scale-label\" x=\"251\" y=\"705\" text-anchor=\"middle\">5 m</text></g><text class=\"note\" x=\"855\" y=\"679\" text-anchor=\"end\">1格＝1米 · 门弧表示开启方向</text><text class=\"note\" x=\"855\" y=\"699\" text-anchor=\"end\">南：临街正门</text><text class=\"subhead\" x=\"44\" y=\"730\">东：服务后门 / 仅首层 · 6个空间</text></g></svg>\n"
  },
  {
    "actId": 2,
    "title": "拍卖会所",
    "subtitle": "同一建筑 · 地面接待 / 地下拍卖",
    "area": "两层合计约360 m²",
    "scale": "1格＝1米",
    "file": "assets/story-maps/act-02.svg",
    "floors": [
      {
        "id": "ground",
        "name": "地面会所 / GROUND FLOOR",
        "width": 15,
        "height": 12,
        "x": 70,
        "y": 218,
        "p": 25
      },
      {
        "id": "basement",
        "name": "地下拍卖 / BASEMENT",
        "width": 15,
        "height": 12,
        "x": 555,
        "y": 218,
        "p": 25
      }
    ],
    "rooms": [
      {
        "id": "records",
        "name": "记录室",
        "floor": "ground",
        "bounds": [
          0,
          0,
          5,
          5
        ],
        "description": "封闭书柜、账簿桌与文件柜；东门接内过厅，交易记录与封印物去向沿用原剧情。",
        "clues": [
          0,
          2
        ],
        "label": [
          2.5,
          1.55
        ]
      },
      {
        "id": "parlor",
        "name": "会客厅",
        "floor": "ground",
        "bounds": [
          0,
          5,
          5,
          7
        ],
        "description": "壁炉、长沙发与两组洽谈席；东门接迎宾厅，可作KP描述接待活动的空间。",
        "clues": [],
        "label": [
          2.5,
          6.05
        ]
      },
      {
        "id": "inner-hall",
        "name": "内过厅",
        "floor": "ground",
        "bounds": [
          5,
          0,
          5,
          7
        ],
        "description": "连接记录室、迎宾厅和楼梯间的主通路；北侧后门通服务巷。",
        "clues": [],
        "label": [
          7.5,
          2
        ]
      },
      {
        "id": "reception",
        "name": "迎宾厅",
        "floor": "ground",
        "bounds": [
          5,
          7,
          5,
          5
        ],
        "description": "临街双扇门、接待台与衣帽寄存入口；白天关闭、夜间迎客由KP按到访时间判断。",
        "clues": [],
        "label": [
          7.5,
          8.1
        ]
      },
      {
        "id": "cloakroom",
        "name": "衣帽间",
        "floor": "ground",
        "bounds": [
          10,
          5,
          5,
          7
        ],
        "description": "沿墙衣帽钩、伞架和长柜；西门接迎宾厅，北门通服务楼梯间。",
        "clues": [],
        "label": [
          12.5,
          6.05
        ]
      },
      {
        "id": "service-stair",
        "name": "服务楼梯 A",
        "floor": "ground",
        "bounds": [
          10,
          0,
          5,
          5
        ],
        "description": "双跑楼梯向下接地下同标记A；西门接内过厅，南门接衣帽间。",
        "clues": [],
        "label": [
          12.5,
          0.9
        ]
      },
      {
        "id": "auction-hall",
        "name": "拍卖厅",
        "floor": "basement",
        "bounds": [
          0,
          0,
          10,
          8
        ],
        "description": "低矮讲台、空展台与三列座席；东门通楼梯前室，南侧双门接候拍区。",
        "clues": [],
        "label": [
          5,
          1
        ]
      },
      {
        "id": "stair-landing",
        "name": "楼梯前室 A",
        "floor": "basement",
        "bounds": [
          10,
          0,
          5,
          5
        ],
        "description": "与地面服务楼梯A对应；西门直通拍卖厅，南门通备品间。",
        "clues": [],
        "label": [
          12.5,
          0.9
        ]
      },
      {
        "id": "preparation",
        "name": "备品间",
        "floor": "basement",
        "bounds": [
          10,
          5,
          5,
          7
        ],
        "description": "壁柜、空木箱与工作台；北通楼梯前室，西门接候拍区，形成服务动线。",
        "clues": [],
        "label": [
          12.5,
          6.05
        ]
      },
      {
        "id": "auction-foyer",
        "name": "候拍区",
        "floor": "basement",
        "bounds": [
          0,
          8,
          10,
          4
        ],
        "description": "长凳、边桌与等候位置；北侧双门进拍卖厅，东门接备品间。",
        "clues": [],
        "label": [
          5,
          8.85
        ]
      }
    ],
    "connections": [
      {
        "id": "club-front",
        "from": "reception",
        "to": "outside",
        "x": 7.5,
        "y": 12,
        "dir": "h",
        "width": 1.6,
        "kind": "door"
      },
      {
        "id": "club-back",
        "from": "inner-hall",
        "to": "outside",
        "x": 7.5,
        "y": 0,
        "dir": "h",
        "width": 1.2,
        "kind": "door"
      },
      {
        "id": "entry-inner",
        "from": "reception",
        "to": "inner-hall",
        "x": 7.5,
        "y": 7,
        "dir": "h",
        "width": 1.5,
        "kind": "door"
      },
      {
        "id": "entry-parlor",
        "from": "reception",
        "to": "parlor",
        "x": 5,
        "y": 9.7,
        "dir": "v",
        "width": 1.3,
        "kind": "door"
      },
      {
        "id": "entry-cloak",
        "from": "reception",
        "to": "cloakroom",
        "x": 10,
        "y": 9.7,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "inner-records",
        "from": "inner-hall",
        "to": "records",
        "x": 5,
        "y": 3.4,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "inner-stair",
        "from": "inner-hall",
        "to": "service-stair",
        "x": 10,
        "y": 3.2,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "cloak-stair",
        "from": "cloakroom",
        "to": "service-stair",
        "x": 12.8,
        "y": 5,
        "dir": "h",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "stair-a",
        "from": "service-stair",
        "to": "stair-landing",
        "kind": "stairs",
        "label": "A"
      },
      {
        "id": "stair-auction",
        "from": "stair-landing",
        "to": "auction-hall",
        "x": 10,
        "y": 3.25,
        "dir": "v",
        "width": 1.3,
        "kind": "door"
      },
      {
        "id": "stair-prep",
        "from": "stair-landing",
        "to": "preparation",
        "x": 12.8,
        "y": 5,
        "dir": "h",
        "width": 1.1,
        "kind": "door"
      },
      {
        "id": "auction-foyer",
        "from": "auction-hall",
        "to": "auction-foyer",
        "x": 5,
        "y": 8,
        "dir": "h",
        "width": 1.8,
        "kind": "door"
      },
      {
        "id": "foyer-prep",
        "from": "auction-foyer",
        "to": "preparation",
        "x": 10,
        "y": 10.2,
        "dir": "v",
        "width": 1.1,
        "kind": "door"
      }
    ],
    "notes": [
      "白天与夜晚共用这一组户型",
      "两处 A 为同一楼梯",
      "幸存买家处在本图之外"
    ],
    "north": "up",
    "embedViewBox": [
      36,
      174,
      906,
      394
    ],
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 740\" class=\"story-map-svg\" id=\"map-2-root\" role=\"group\" aria-labelledby=\"map-2-title map-2-desc\"><title id=\"map-2-title\">第2幕 · 拍卖会所平面图</title><desc id=\"map-2-desc\">两层合计约360 m²。记录室、会客厅、内过厅、迎宾厅、衣帽间、服务楼梯 A、拍卖厅、楼梯前室 A、备品间、候拍区。选取房间查看空间说明。建筑门洞及楼梯均已标示，户型供KP描述场景。</desc><defs><pattern id=\"map-2-grid-ground\" width=\"25\" height=\"25\" patternUnits=\"userSpaceOnUse\" x=\"70\" y=\"218\"><path d=\"M25 0H0V25\" fill=\"none\" stroke=\"#8b9992\" stroke-width=\".7\"/></pattern><pattern id=\"map-2-grid-basement\" width=\"25\" height=\"25\" patternUnits=\"userSpaceOnUse\" x=\"555\" y=\"218\"><path d=\"M25 0H0V25\" fill=\"none\" stroke=\"#8b9992\" stroke-width=\".7\"/></pattern></defs><style>#map-2-root{font-family:\"Noto Serif SC\",\"Songti SC\",\"SimSun\",serif;background:#111315;color:#c7cac7}#map-2-root text{fill:#c9cecb;stroke:none;user-select:none}#map-2-root .headline{font-size:25px;letter-spacing:4px}#map-2-root .subhead{fill:#85928e;font-size:11px;letter-spacing:2px}#map-2-root .floor-title{font-size:12px;letter-spacing:2px;fill:#aab8b1}#map-2-root .wall-shadow{fill:none;stroke:#383d3d;stroke-width:.27}#map-2-root .wall{fill:none;stroke:#b5bab8;stroke-width:.105}#map-2-root .outer{stroke-width:.17;stroke:#c4c7c3}#map-2-root .floor-grid{opacity:.2}#map-2-root .room-zone{outline:none;cursor:pointer}#map-2-root .room-floor{fill:#b2c4bb;fill-opacity:.015;stroke:none}#map-2-root .room-zone:hover .room-floor,#map-2-root .room-zone:focus .room-floor{fill:#b1bdb5;fill-opacity:.12}#map-2-root .room-zone.is-selected .room-floor{fill:#a63847;fill-opacity:.23}#map-2-root .room-label{font-size:16px;letter-spacing:1.4px;pointer-events:none}#map-2-root .room-number{font:10px Georgia,serif;letter-spacing:2px;fill:#7b9188;pointer-events:none}#map-2-root .room-zone.is-selected .room-label{fill:#eee5da}#map-2-root .room-zone.is-selected .room-number{fill:#c66b75}#map-2-root .furniture{fill:none;stroke:#8c9691;stroke-width:.04;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}#map-2-root .rug{fill:none;stroke:#65786d;stroke-width:.025;stroke-dasharray:.13 .07;pointer-events:none}#map-2-root .door-gap{stroke:#111315;stroke-width:.35;fill:none}#map-2-root .door-line{stroke:#9ba99f;stroke-width:.04;fill:none}#map-2-root .door-arc{stroke:#7c9187;stroke-width:.025;fill:none;stroke-dasharray:.09 .05}#map-2-root .window-gap{stroke:#111315;stroke-width:.25}#map-2-root .window-line{stroke:#bdd1c7;stroke-width:.035;fill:none}#map-2-root .dimension{stroke:#707f78;stroke-width:1;fill:none}#map-2-root .dimension-label{font:10px Georgia,serif;letter-spacing:1.4px;fill:#859b8e}#map-2-root .note{font-size:11px;fill:#83948b;letter-spacing:1px}#map-2-root .scale-bar{stroke:#b5c0b6;fill:none;stroke-width:1}#map-2-root .scale-label{font:11px Georgia,serif;fill:#9eafa3}#map-2-root .north-arrow{stroke:#a8b9ad;fill:none;stroke-width:1}#map-2-root .north-label{font:12px Georgia,serif;fill:#b8c6bb}#map-2-root .thin-rule{stroke:#5d7066;stroke-width:1}#map-2-root .garden-path{fill:#73877b;fill-opacity:.10;stroke:#7d9285;stroke-opacity:.5;stroke-width:.025;pointer-events:none}#map-2-root .garden-hedge{fill:#586f5b;fill-opacity:.16;stroke:#789580;stroke-width:.05;stroke-dasharray:.12 .1;pointer-events:none}#map-2-root .ritual-symbol{fill:none;stroke:#98515a;stroke-width:.055;pointer-events:none}#map-2-root .stairs-link{font:11px Georgia,serif;letter-spacing:1px;fill:#c1b8a4}#map-2-root .room-marker{fill:#b65761;stroke:#c38489;stroke-width:1}#map-2-root .artifact-symbol{stroke:#b4b6a4}\n</style><rect x=\"0\" y=\"0\" width=\"1000\" height=\"740\" fill=\"#111315\"/><g class=\"map-sheet-header\"><path class=\"thin-rule\" d=\"M38 110H962M38 651H962\"/><text class=\"subhead\" x=\"44\" y=\"38\">BACKLUND · SURVEY RECORD / 02</text><text class=\"headline\" x=\"44\" y=\"75\">拍卖会所</text><text class=\"subhead\" x=\"45\" y=\"97\">同一建筑 · 地面接待 / 地下拍卖 · 两层合计约360 m²</text><g class=\"north-arrow\" aria-label=\"北向上\" transform=\"translate(938 63)\"><path d=\"M0 28V-10M-6 1L0-10L6 1M-15 14H15\"/><path d=\"M0 -10L-4 0H0Z\" fill=\"#a8b9ad\"/><text class=\"north-label\" x=\"0\" y=\"-19\" text-anchor=\"middle\">N</text></g></g><text class=\"floor-title\" x=\"70\" y=\"188\">地面会所 / GROUND FLOOR</text><rect x=\"70\" y=\"218\" width=\"375\" height=\"300\" fill=\"#111315\"/><rect class=\"floor-grid\" x=\"70\" y=\"218\" width=\"375\" height=\"300\" fill=\"url(#map-2-grid-ground)\"/><g class=\"room-zone\" data-room=\"records\" tabindex=\"0\" role=\"button\" aria-label=\"记录室：封闭书柜、账簿桌与文件柜；东门接内过厅，交易记录与封印物去向沿用原剧情。\"><rect class=\"room-floor\" x=\"73\" y=\"221\" width=\"119\" height=\"119\"/><text class=\"room-number\" x=\"132.5\" y=\"240.75\" text-anchor=\"middle\">01</text><text class=\"room-label\" x=\"132.5\" y=\"256.75\" text-anchor=\"middle\">记录室</text><circle class=\"room-marker\" cx=\"185\" cy=\"333\" r=\"2.5\"/></g><g class=\"room-zone\" data-room=\"parlor\" tabindex=\"0\" role=\"button\" aria-label=\"会客厅：壁炉、长沙发与两组洽谈席；东门接迎宾厅，可作KP描述接待活动的空间。\"><rect class=\"room-floor\" x=\"73\" y=\"346\" width=\"119\" height=\"169\"/><text class=\"room-number\" x=\"132.5\" y=\"353.25\" text-anchor=\"middle\">02</text><text class=\"room-label\" x=\"132.5\" y=\"369.25\" text-anchor=\"middle\">会客厅</text></g><g class=\"room-zone\" data-room=\"inner-hall\" tabindex=\"0\" role=\"button\" aria-label=\"内过厅：连接记录室、迎宾厅和楼梯间的主通路；北侧后门通服务巷。\"><rect class=\"room-floor\" x=\"198\" y=\"221\" width=\"119\" height=\"169\"/><text class=\"room-number\" x=\"257.5\" y=\"252\" text-anchor=\"middle\">03</text><text class=\"room-label\" x=\"257.5\" y=\"268\" text-anchor=\"middle\">内过厅</text></g><g class=\"room-zone\" data-room=\"reception\" tabindex=\"0\" role=\"button\" aria-label=\"迎宾厅：临街双扇门、接待台与衣帽寄存入口；白天关闭、夜间迎客由KP按到访时间判断。\"><rect class=\"room-floor\" x=\"198\" y=\"396\" width=\"119\" height=\"119\"/><text class=\"room-number\" x=\"257.5\" y=\"404.5\" text-anchor=\"middle\">04</text><text class=\"room-label\" x=\"257.5\" y=\"420.5\" text-anchor=\"middle\">迎宾厅</text></g><g class=\"room-zone\" data-room=\"cloakroom\" tabindex=\"0\" role=\"button\" aria-label=\"衣帽间：沿墙衣帽钩、伞架和长柜；西门接迎宾厅，北门通服务楼梯间。\"><rect class=\"room-floor\" x=\"323\" y=\"346\" width=\"119\" height=\"169\"/><text class=\"room-number\" x=\"382.5\" y=\"353.25\" text-anchor=\"middle\">05</text><text class=\"room-label\" x=\"382.5\" y=\"369.25\" text-anchor=\"middle\">衣帽间</text></g><g class=\"room-zone\" data-room=\"service-stair\" tabindex=\"0\" role=\"button\" aria-label=\"服务楼梯 A：双跑楼梯向下接地下同标记A；西门接内过厅，南门接衣帽间。\"><rect class=\"room-floor\" x=\"323\" y=\"221\" width=\"119\" height=\"119\"/><text class=\"room-number\" x=\"382.5\" y=\"224.5\" text-anchor=\"middle\">06</text><text class=\"room-label\" x=\"382.5\" y=\"240.5\" text-anchor=\"middle\">服务楼梯 A</text></g><g transform=\"translate(70 218) scale(25)\" pointer-events=\"none\"><g class=\"wall-shadow\"><rect x=\"0\" y=\"0\" width=\"5\" height=\"5\"/><rect x=\"0\" y=\"5\" width=\"5\" height=\"7\"/><rect x=\"5\" y=\"0\" width=\"5\" height=\"7\"/><rect x=\"5\" y=\"7\" width=\"5\" height=\"5\"/><rect x=\"10\" y=\"5\" width=\"5\" height=\"7\"/><rect x=\"10\" y=\"0\" width=\"5\" height=\"5\"/></g><g class=\"wall\"><rect x=\"0\" y=\"0\" width=\"5\" height=\"5\"/><rect x=\"0\" y=\"5\" width=\"5\" height=\"7\"/><rect x=\"5\" y=\"0\" width=\"5\" height=\"7\"/><rect x=\"5\" y=\"7\" width=\"5\" height=\"5\"/><rect x=\"10\" y=\"5\" width=\"5\" height=\"7\"/><rect x=\"10\" y=\"0\" width=\"5\" height=\"5\"/></g><rect class=\"wall outer\" x=\"0\" y=\"0\" width=\"15\" height=\"12\"/><g class=\"furniture\"><rect x=\"0.35\" y=\"0.3\" width=\"0.6\" height=\"2.6\" rx=\"0\"/><path d=\"M0.44999999999999996 0.36v2.48\"/><path d=\"M0.61 0.36v2.48\"/><path d=\"M0.77 0.36v2.48\"/></g><g class=\"furniture\"><rect x=\"3.95\" y=\"0.4\" width=\"0.55\" height=\"2.2\" rx=\"0\"/><path d=\"M4.05 0.46v2.08\"/><path d=\"M4.21 0.46v2.08\"/><path d=\"M4.37 0.46v2.08\"/></g><g class=\"furniture\"><rect x=\"1.7\" y=\"3.3\" width=\"2.3\" height=\"0.8\" rx=\"0.12\"/><rect x=\"1.8199999999999998\" y=\"3.42\" width=\"2.0599999999999996\" height=\"0.56\" rx=\"0.08\"/></g><g class=\"furniture\" transform=\"translate(2.8499999999999996 4.6499999999999995) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\"><rect x=\"1.9\" y=\"3.4499999999999997\" width=\"0.4\" height=\"0.3\" rx=\"0\"/><path d=\"M3.45 3.5h.3m-.3 .12h.3\"/><circle cx=\"3.7\" cy=\"3.8799999999999994\" r=\"0.08\"/></g><g class=\"furniture\"><rect x=\"0.9\" y=\"5.2\" width=\"2\" height=\"0.4\" rx=\"0\"/><rect x=\"1.05\" y=\"5.26\" width=\"1.7\" height=\"0.27\" rx=\"0\"/><path d=\"M1.25 5.45l.2 -.12l.2 .12l.2 -.12\"/></g><g class=\"furniture\"><rect x=\"0.55\" y=\"7.2\" width=\"3.8\" height=\"1.1\" rx=\"0.15\"/><rect x=\"0.75\" y=\"7.3500000000000005\" width=\"3.4\" height=\"0.8\" rx=\"0.1\"/><path d=\"M2.45 7.4V8.100000000000001\"/></g><g class=\"furniture\"><rect x=\"0.55\" y=\"10\" width=\"3.8\" height=\"1.1\" rx=\"0.15\"/><rect x=\"0.75\" y=\"10.15\" width=\"3.4\" height=\"0.8\" rx=\"0.1\"/><path d=\"M2.45 10.2V10.9\"/></g><g class=\"furniture\"><rect x=\"1.55\" y=\"8.65\" width=\"1.8\" height=\"0.7\" rx=\"0.12\"/><rect x=\"1.67\" y=\"8.77\" width=\"1.56\" height=\"0.45999999999999996\" rx=\"0.08\"/></g><g class=\"rug\"><rect x=\"0.7\" y=\"7.1\" width=\"3.5\" height=\"4.25\" rx=\"0.03\"/><rect x=\"0.85\" y=\"7.25\" width=\"3.2\" height=\"3.95\" rx=\"0.02\"/><path d=\"M2.45 8.1625l0.5950000000000001 1.0625l-0.5950000000000001 1.0625l-0.5950000000000001 -1.0625Z\"/></g><g class=\"furniture plant\"><circle cx=\"5.55\" cy=\"0.7\" r=\"0.38\"/><path d=\"M5.265 0.7h0.5700000000000001M5.55 0.4149999999999999v0.5700000000000001M5.359999999999999 0.51l0.38 0.38M5.74 0.51l-0.38 0.38\"/></g><g class=\"furniture\"><rect x=\"6\" y=\"10.1\" width=\"3\" height=\"0.7\" rx=\"0.12\"/><rect x=\"6.12\" y=\"10.219999999999999\" width=\"2.76\" height=\"0.45999999999999996\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"10.6\" y=\"7.1\" width=\"0.7\" height=\"3.6\" rx=\"0.12\"/><rect x=\"10.719999999999999\" y=\"7.22\" width=\"0.45999999999999996\" height=\"3.3600000000000003\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"13.9\" y=\"6.2\" width=\"0.7\" height=\"4.6\" rx=\"0\"/><path d=\"M14 6.26v4.4799999999999995\"/><path d=\"M14.16 6.26v4.4799999999999995\"/><path d=\"M14.32 6.26v4.4799999999999995\"/><path d=\"M14.48 6.26v4.4799999999999995\"/></g><g class=\"stairs furniture\"><rect x=\"11.15\" y=\"1.6\" width=\"1.15\" height=\"2.7\" rx=\"0\"/><path d=\"M11.15 1.87h1.15\"/><path d=\"M11.15 2.14h1.15\"/><path d=\"M11.15 2.41h1.15\"/><path d=\"M11.15 2.68h1.15\"/><path d=\"M11.15 2.95h1.15\"/><path d=\"M11.15 3.2200000000000006h1.15\"/><path d=\"M11.15 3.49h1.15\"/><path d=\"M11.15 3.7600000000000002h1.15\"/><path d=\"M11.15 4.03h1.15\"/><path d=\"M11.725 3.895V2.005m-.18 .25l.18 -.25l.18 .25\"/></g><g class=\"stairs furniture\"><rect x=\"12.65\" y=\"1.6\" width=\"1.15\" height=\"2.7\" rx=\"0\"/><path d=\"M12.65 1.87h1.15\"/><path d=\"M12.65 2.14h1.15\"/><path d=\"M12.65 2.41h1.15\"/><path d=\"M12.65 2.68h1.15\"/><path d=\"M12.65 2.95h1.15\"/><path d=\"M12.65 3.2200000000000006h1.15\"/><path d=\"M12.65 3.49h1.15\"/><path d=\"M12.65 3.7600000000000002h1.15\"/><path d=\"M12.65 4.03h1.15\"/><path d=\"M13.225 3.895V2.005m-.18 .25l.18 -.25l.18 .25\"/></g><path d=\"M12.3 1.6h.3M12.3 4.3h.3\"/></g><g transform=\"translate(70 218) scale(25)\" pointer-events=\"none\"><path class=\"window-gap\" d=\"M0.8 0L3.9 0\"/><path class=\"window-line\" d=\"M0.8 -0.065L3.9 -0.065M0.8 0.065L3.9 0.065\"/><path class=\"window-line\" d=\"M2.35 -0.12v.24\"/><path class=\"window-gap\" d=\"M0 6.4L0 8.8\"/><path class=\"window-line\" d=\"M-0.065 6.4L-0.065 8.8M0.065 6.4L0.065 8.8\"/><path class=\"window-line\" d=\"M-0.12 7.6000000000000005h.24\"/><path class=\"window-gap\" d=\"M0 9.7L0 11.3\"/><path class=\"window-line\" d=\"M-0.065 9.7L-0.065 11.3M0.065 9.7L0.065 11.3\"/><path class=\"window-line\" d=\"M-0.12 10.5h.24\"/><path class=\"window-gap\" d=\"M11 12L14 12\"/><path class=\"window-line\" d=\"M11 11.935L14 11.935M11 12.065L14 12.065\"/><path class=\"window-line\" d=\"M12.5 11.88v.24\"/><path class=\"window-gap\" d=\"M12.5 0L14.3 0\"/><path class=\"window-line\" d=\"M12.5 -0.065L14.3 -0.065M12.5 0.065L14.3 0.065\"/><path class=\"window-line\" d=\"M13.4 -0.12v.24\"/><path class=\"window-gap\" d=\"M15 6.5L15 9.5\"/><path class=\"window-line\" d=\"M14.935 6.5L14.935 9.5M15.065 6.5L15.065 9.5\"/><path class=\"window-line\" d=\"M14.88 8h.24\"/></g><g class=\"dimension\"><path d=\"M70 204h375M70 199v10M445 199v10\"/><path d=\"M56 218v300M51 218h10M51 518h10\"/></g><text class=\"dimension-label\" text-anchor=\"middle\" x=\"257.5\" y=\"199\">15.0 m</text><text class=\"dimension-label\" text-anchor=\"middle\" transform=\"translate(47 368) rotate(-90)\">12.0 m</text><text class=\"floor-title\" x=\"555\" y=\"188\">地下拍卖 / BASEMENT</text><rect x=\"555\" y=\"218\" width=\"375\" height=\"300\" fill=\"#111315\"/><rect class=\"floor-grid\" x=\"555\" y=\"218\" width=\"375\" height=\"300\" fill=\"url(#map-2-grid-basement)\"/><g class=\"room-zone\" data-room=\"auction-hall\" tabindex=\"0\" role=\"button\" aria-label=\"拍卖厅：低矮讲台、空展台与三列座席；东门通楼梯前室，南侧双门接候拍区。\"><rect class=\"room-floor\" x=\"558\" y=\"221\" width=\"244\" height=\"194\"/><text class=\"room-number\" x=\"680\" y=\"227\" text-anchor=\"middle\">07</text><text class=\"room-label\" x=\"680\" y=\"243\" text-anchor=\"middle\">拍卖厅</text></g><g class=\"room-zone\" data-room=\"stair-landing\" tabindex=\"0\" role=\"button\" aria-label=\"楼梯前室 A：与地面服务楼梯A对应；西门直通拍卖厅，南门通备品间。\"><rect class=\"room-floor\" x=\"808\" y=\"221\" width=\"119\" height=\"119\"/><text class=\"room-number\" x=\"867.5\" y=\"224.5\" text-anchor=\"middle\">08</text><text class=\"room-label\" x=\"867.5\" y=\"240.5\" text-anchor=\"middle\">楼梯前室 A</text></g><g class=\"room-zone\" data-room=\"preparation\" tabindex=\"0\" role=\"button\" aria-label=\"备品间：壁柜、空木箱与工作台；北通楼梯前室，西门接候拍区，形成服务动线。\"><rect class=\"room-floor\" x=\"808\" y=\"346\" width=\"119\" height=\"169\"/><text class=\"room-number\" x=\"867.5\" y=\"353.25\" text-anchor=\"middle\">09</text><text class=\"room-label\" x=\"867.5\" y=\"369.25\" text-anchor=\"middle\">备品间</text></g><g class=\"room-zone\" data-room=\"auction-foyer\" tabindex=\"0\" role=\"button\" aria-label=\"候拍区：长凳、边桌与等候位置；北侧双门进拍卖厅，东门接备品间。\"><rect class=\"room-floor\" x=\"558\" y=\"421\" width=\"244\" height=\"94\"/><text class=\"room-number\" x=\"680\" y=\"423.25\" text-anchor=\"middle\">10</text><text class=\"room-label\" x=\"680\" y=\"439.25\" text-anchor=\"middle\">候拍区</text></g><g transform=\"translate(555 218) scale(25)\" pointer-events=\"none\"><g class=\"wall-shadow\"><rect x=\"0\" y=\"0\" width=\"10\" height=\"8\"/><rect x=\"10\" y=\"0\" width=\"5\" height=\"5\"/><rect x=\"10\" y=\"5\" width=\"5\" height=\"7\"/><rect x=\"0\" y=\"8\" width=\"10\" height=\"4\"/></g><g class=\"wall\"><rect x=\"0\" y=\"0\" width=\"10\" height=\"8\"/><rect x=\"10\" y=\"0\" width=\"5\" height=\"5\"/><rect x=\"10\" y=\"5\" width=\"5\" height=\"7\"/><rect x=\"0\" y=\"8\" width=\"10\" height=\"4\"/></g><rect class=\"wall outer\" x=\"0\" y=\"0\" width=\"15\" height=\"12\"/><g class=\"furniture\"><rect x=\"2.9\" y=\"1.8\" width=\"4.2\" height=\"0.8\" rx=\"0.12\"/><rect x=\"3.02\" y=\"1.92\" width=\"3.96\" height=\"0.56\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"4.3\" y=\"3.15\" width=\"1.4\" height=\"0.9\" rx=\"0.12\"/><rect x=\"4.42\" y=\"3.27\" width=\"1.16\" height=\"0.66\" rx=\"0.08\"/></g><g class=\"furniture\" transform=\"translate(1.6 5) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(3.25 5) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(4.9 5) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(6.549999999999999 5) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(8.2 5) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(1.6 5.85) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(3.25 5.85) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(4.9 5.85) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(6.549999999999999 5.85) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(8.2 5.85) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(1.6 6.7) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(3.25 6.7) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(4.9 6.7) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(6.549999999999999 6.7) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(8.2 6.7) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"stairs furniture\"><rect x=\"11.15\" y=\"1.6\" width=\"1.15\" height=\"2.7\" rx=\"0\"/><path d=\"M11.15 1.87h1.15\"/><path d=\"M11.15 2.14h1.15\"/><path d=\"M11.15 2.41h1.15\"/><path d=\"M11.15 2.68h1.15\"/><path d=\"M11.15 2.95h1.15\"/><path d=\"M11.15 3.2200000000000006h1.15\"/><path d=\"M11.15 3.49h1.15\"/><path d=\"M11.15 3.7600000000000002h1.15\"/><path d=\"M11.15 4.03h1.15\"/><path d=\"M11.725 3.895V2.005m-.18 .25l.18 -.25l.18 .25\"/></g><g class=\"stairs furniture\"><rect x=\"12.65\" y=\"1.6\" width=\"1.15\" height=\"2.7\" rx=\"0\"/><path d=\"M12.65 1.87h1.15\"/><path d=\"M12.65 2.14h1.15\"/><path d=\"M12.65 2.41h1.15\"/><path d=\"M12.65 2.68h1.15\"/><path d=\"M12.65 2.95h1.15\"/><path d=\"M12.65 3.2200000000000006h1.15\"/><path d=\"M12.65 3.49h1.15\"/><path d=\"M12.65 3.7600000000000002h1.15\"/><path d=\"M12.65 4.03h1.15\"/><path d=\"M13.225 3.895V2.005m-.18 .25l.18 -.25l.18 .25\"/></g><g class=\"furniture\"><rect x=\"14.1\" y=\"5.4\" width=\"0.5\" height=\"1.5\" rx=\"0\"/><path d=\"M14.2 5.46v1.38\"/><path d=\"M14.36 5.46v1.38\"/><path d=\"M14.52 5.46v1.38\"/></g><g class=\"furniture\"><rect x=\"10.6\" y=\"7.8\" width=\"1.4\" height=\"2.5\" rx=\"0.12\"/><rect x=\"10.719999999999999\" y=\"7.92\" width=\"1.16\" height=\"2.26\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"13.1\" y=\"7.8\" width=\"1.35\" height=\"2.5\" rx=\"0.12\"/><rect x=\"13.219999999999999\" y=\"7.92\" width=\"1.11\" height=\"2.26\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"10.7\" y=\"11\" width=\"3.3\" height=\"0.55\" rx=\"0.12\"/><rect x=\"10.819999999999999\" y=\"11.12\" width=\"3.0599999999999996\" height=\"0.31000000000000005\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"0.7\" y=\"10.4\" width=\"3.4\" height=\"0.65\" rx=\"0.15\"/><rect x=\"0.8999999999999999\" y=\"10.55\" width=\"3\" height=\"0.35000000000000003\" rx=\"0.1\"/><path d=\"M2.4 10.6V10.850000000000001\"/></g><g class=\"furniture\"><rect x=\"5.7\" y=\"10.4\" width=\"3.4\" height=\"0.65\" rx=\"0.15\"/><rect x=\"5.9\" y=\"10.55\" width=\"3\" height=\"0.35000000000000003\" rx=\"0.1\"/><path d=\"M7.4 10.6V10.850000000000001\"/></g><g class=\"furniture\"><rect x=\"4.6\" y=\"9.6\" width=\"0.8\" height=\"1.4\" rx=\"0.12\"/><rect x=\"4.72\" y=\"9.719999999999999\" width=\"0.56\" height=\"1.16\" rx=\"0.08\"/></g></g><g transform=\"translate(555 218) scale(25)\" pointer-events=\"none\"></g><g class=\"dimension\"><path d=\"M555 204h375M555 199v10M930 199v10\"/><path d=\"M541 218v300M536 218h10M536 518h10\"/></g><text class=\"dimension-label\" text-anchor=\"middle\" x=\"742.5\" y=\"199\">15.0 m</text><text class=\"dimension-label\" text-anchor=\"middle\" transform=\"translate(532 368) rotate(-90)\">12.0 m</text><g data-connection=\"club-front\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M6.7 12h1.6\"/><path class=\"door-line\" d=\"M6.7 12v1.6\"/><path class=\"door-arc\" d=\"M6.7 13.6A1.6 1.6 0 0 0 8.3 12\"/></g><g data-connection=\"club-back\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M6.9 0h1.2\"/><path class=\"door-line\" d=\"M6.9 0v1.2\"/><path class=\"door-arc\" d=\"M6.9 1.2A1.2 1.2 0 0 0 8.1 0\"/></g><g data-connection=\"entry-inner\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M6.75 7h1.5\"/><path class=\"door-line\" d=\"M6.75 7v1.5\"/><path class=\"door-arc\" d=\"M6.75 8.5A1.5 1.5 0 0 0 8.25 7\"/></g><g data-connection=\"entry-parlor\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M5 9.049999999999999v1.3\"/><path class=\"door-line\" d=\"M5 9.049999999999999h1.3\"/><path class=\"door-arc\" d=\"M6.3 9.049999999999999A1.3 1.3 0 0 1 5 10.35\"/></g><g data-connection=\"entry-cloak\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M10 9.149999999999999v1.1\"/><path class=\"door-line\" d=\"M10 9.149999999999999h1.1\"/><path class=\"door-arc\" d=\"M11.1 9.149999999999999A1.1 1.1 0 0 1 10 10.25\"/></g><g data-connection=\"inner-records\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M5 2.8499999999999996v1.1\"/><path class=\"door-line\" d=\"M5 2.8499999999999996h1.1\"/><path class=\"door-arc\" d=\"M6.1 2.8499999999999996A1.1 1.1 0 0 1 5 3.95\"/></g><g data-connection=\"inner-stair\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M10 2.6500000000000004v1.1\"/><path class=\"door-line\" d=\"M10 2.6500000000000004h1.1\"/><path class=\"door-arc\" d=\"M11.1 2.6500000000000004A1.1 1.1 0 0 1 10 3.75\"/></g><g data-connection=\"cloak-stair\" transform=\"translate(70 218) scale(25)\"><path class=\"door-gap\" d=\"M12.25 5h1.1\"/><path class=\"door-line\" d=\"M12.25 5v1.1\"/><path class=\"door-arc\" d=\"M12.25 6.1A1.1 1.1 0 0 0 13.350000000000001 5\"/></g><g data-connection=\"stair-a\" class=\"stairs-link\"><path d=\"M475 350h50m-7 -5l7 5l-7 5\" stroke=\"#7c9687\" fill=\"none\"/><text x=\"500\" y=\"338\" text-anchor=\"middle\">A ⇄ A</text></g><g data-connection=\"stair-auction\" transform=\"translate(555 218) scale(25)\"><path class=\"door-gap\" d=\"M10 2.6v1.3\"/><path class=\"door-line\" d=\"M10 2.6h1.3\"/><path class=\"door-arc\" d=\"M11.3 2.6A1.3 1.3 0 0 1 10 3.9\"/></g><g data-connection=\"stair-prep\" transform=\"translate(555 218) scale(25)\"><path class=\"door-gap\" d=\"M12.25 5h1.1\"/><path class=\"door-line\" d=\"M12.25 5v1.1\"/><path class=\"door-arc\" d=\"M12.25 6.1A1.1 1.1 0 0 0 13.350000000000001 5\"/></g><g data-connection=\"auction-foyer\" transform=\"translate(555 218) scale(25)\"><path class=\"door-gap\" d=\"M4.1 8h1.8\"/><path class=\"door-line\" d=\"M4.1 8v1.8\"/><path class=\"door-arc\" d=\"M4.1 9.8A1.8 1.8 0 0 0 5.9 8\"/></g><g data-connection=\"foyer-prep\" transform=\"translate(555 218) scale(25)\"><path class=\"door-gap\" d=\"M10 9.649999999999999v1.1\"/><path class=\"door-line\" d=\"M10 9.649999999999999h1.1\"/><path class=\"door-arc\" d=\"M11.1 9.649999999999999A1.1 1.1 0 0 1 10 10.75\"/></g><g class=\"map-sheet-footer\"><g class=\"scale-bar\"><path d=\"M56 684h125M56 679v10M106 679v10M181 679v10\"/><path d=\"M56 684h50\" stroke-width=\"4\"/><text class=\"scale-label\" x=\"56\" y=\"705\">0</text><text class=\"scale-label\" x=\"106\" y=\"705\" text-anchor=\"middle\">2</text><text class=\"scale-label\" x=\"181\" y=\"705\" text-anchor=\"middle\">5 m</text></g><text class=\"note\" x=\"955\" y=\"679\" text-anchor=\"end\">1格＝1米 · 门弧表示开启方向</text><text class=\"note\" x=\"955\" y=\"699\" text-anchor=\"end\">白天与夜晚共用这一组户型</text><text class=\"subhead\" x=\"44\" y=\"730\">两处 A 为同一楼梯 / 幸存买家处在本图之外</text></g></svg>\n"
  },
  {
    "actId": 3,
    "title": "富商宅邸",
    "subtitle": "木饰面后的欲望",
    "area": "首层约320 m²",
    "scale": "1格＝1米",
    "file": "assets/story-maps/act-03.svg",
    "estateDoor": "estate-rear-door",
    "estateDoorWidth": 1.6,
    "estateDoorEdge": "north",
    "floors": [
      {
        "id": "ground",
        "name": "宅邸首层 / MANOR GROUND",
        "width": 20,
        "height": 16,
        "x": 180,
        "y": 170,
        "p": 27
      }
    ],
    "rooms": [
      {
        "id": "library",
        "name": "藏书室",
        "floor": "ground",
        "bounds": [
          0,
          0,
          8,
          9
        ],
        "description": "落地书架、阅读桌、窗下扶手椅与壁炉；东门接后廊，供探索时描述遮蔽与视线。",
        "clues": [],
        "label": [
          4,
          1.7
        ]
      },
      {
        "id": "drawing-room",
        "name": "会客厅",
        "floor": "ground",
        "bounds": [
          0,
          9,
          8,
          7
        ],
        "description": "成组长沙发、中央地毯与壁炉；东侧双门连接前厅，适合宅邸内接触与周旋。",
        "clues": [],
        "label": [
          4,
          10.35
        ]
      },
      {
        "id": "rear-gallery",
        "name": "后廊",
        "floor": "ground",
        "bounds": [
          8,
          0,
          4,
          9
        ],
        "description": "南接前厅，左右通藏书室、书房与藏品室；北端后门直达第四幕同一庄园花园。",
        "clues": [],
        "label": [
          10,
          4.15
        ]
      },
      {
        "id": "entrance",
        "name": "前厅",
        "floor": "ground",
        "bounds": [
          8,
          9,
          4,
          7
        ],
        "description": "南端双扇正门与石阶，中央保留宽阔通道；向北接后廊，左右通会客厅及餐厅。",
        "clues": [],
        "label": [
          10,
          11.15
        ]
      },
      {
        "id": "holder-study",
        "name": "书房",
        "floor": "ground",
        "bounds": [
          12,
          0,
          8,
          5
        ],
        "description": "大书桌、壁柜与仪式准备工作台；西门接后廊，准备现场线索由既有剧情裁定。",
        "clues": [
          1
        ],
        "label": [
          16,
          1.7
        ]
      },
      {
        "id": "exhibition",
        "name": "藏品室",
        "floor": "ground",
        "bounds": [
          12,
          5,
          8,
          4
        ],
        "description": "中央陈列桌以玻璃罩和呢绒垫平面符号标记；不新增或改画拜祭之指本体。",
        "clues": [
          0
        ],
        "label": [
          16,
          5.85
        ]
      },
      {
        "id": "dining-room",
        "name": "餐厅",
        "floor": "ground",
        "bounds": [
          12,
          9,
          8,
          7
        ],
        "description": "八人长桌、餐边柜与侧窗；西门接前厅，东侧服务门可出入。",
        "clues": [],
        "label": [
          16,
          10.25
        ]
      }
    ],
    "connections": [
      {
        "id": "manor-front",
        "from": "entrance",
        "to": "outside",
        "x": 10,
        "y": 16,
        "dir": "h",
        "width": 1.8,
        "kind": "door"
      },
      {
        "id": "estate-rear-door",
        "from": "rear-gallery",
        "to": "outside",
        "x": 10,
        "y": 0,
        "dir": "h",
        "width": 1.6,
        "kind": "door"
      },
      {
        "id": "entrance-rear",
        "from": "entrance",
        "to": "rear-gallery",
        "x": 10,
        "y": 9,
        "dir": "h",
        "width": 2,
        "kind": "door"
      },
      {
        "id": "entrance-drawing",
        "from": "entrance",
        "to": "drawing-room",
        "x": 8,
        "y": 12.5,
        "dir": "v",
        "width": 1.8,
        "kind": "door"
      },
      {
        "id": "entrance-dining",
        "from": "entrance",
        "to": "dining-room",
        "x": 12,
        "y": 12.5,
        "dir": "v",
        "width": 1.6,
        "kind": "door"
      },
      {
        "id": "gallery-library",
        "from": "rear-gallery",
        "to": "library",
        "x": 8,
        "y": 5.8,
        "dir": "v",
        "width": 1.6,
        "kind": "door"
      },
      {
        "id": "gallery-study",
        "from": "rear-gallery",
        "to": "holder-study",
        "x": 12,
        "y": 2.9,
        "dir": "v",
        "width": 1.3,
        "kind": "door"
      },
      {
        "id": "gallery-exhibit",
        "from": "rear-gallery",
        "to": "exhibition",
        "x": 12,
        "y": 7.2,
        "dir": "v",
        "width": 1.4,
        "kind": "door"
      },
      {
        "id": "dining-service",
        "from": "dining-room",
        "to": "outside",
        "x": 20,
        "y": 13,
        "dir": "v",
        "width": 1.2,
        "kind": "door"
      }
    ],
    "notes": [
      "北侧后门 → 同一庄园花园",
      "南：主入口 / 东：服务门",
      "仅首层 · 7个空间"
    ],
    "north": "up",
    "embedViewBox": [
      146,
      126,
      617,
      535
    ],
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 900 740\" class=\"story-map-svg\" id=\"map-3-root\" role=\"group\" aria-labelledby=\"map-3-title map-3-desc\"><title id=\"map-3-title\">第3幕 · 富商宅邸平面图</title><desc id=\"map-3-desc\">首层约320 m²。藏书室、会客厅、后廊、前厅、书房、藏品室、餐厅。选取房间查看空间说明。建筑门洞及楼梯均已标示，户型供KP描述场景。</desc><defs><pattern id=\"map-3-grid-ground\" width=\"27\" height=\"27\" patternUnits=\"userSpaceOnUse\" x=\"180\" y=\"170\"><path d=\"M27 0H0V27\" fill=\"none\" stroke=\"#8b9992\" stroke-width=\".7\"/></pattern></defs><style>#map-3-root{font-family:\"Noto Serif SC\",\"Songti SC\",\"SimSun\",serif;background:#111315;color:#c7cac7}#map-3-root text{fill:#c9cecb;stroke:none;user-select:none}#map-3-root .headline{font-size:25px;letter-spacing:4px}#map-3-root .subhead{fill:#85928e;font-size:11px;letter-spacing:2px}#map-3-root .floor-title{font-size:12px;letter-spacing:2px;fill:#aab8b1}#map-3-root .wall-shadow{fill:none;stroke:#383d3d;stroke-width:.27}#map-3-root .wall{fill:none;stroke:#b5bab8;stroke-width:.105}#map-3-root .outer{stroke-width:.17;stroke:#c4c7c3}#map-3-root .floor-grid{opacity:.2}#map-3-root .room-zone{outline:none;cursor:pointer}#map-3-root .room-floor{fill:#b2c4bb;fill-opacity:.015;stroke:none}#map-3-root .room-zone:hover .room-floor,#map-3-root .room-zone:focus .room-floor{fill:#b1bdb5;fill-opacity:.12}#map-3-root .room-zone.is-selected .room-floor{fill:#a63847;fill-opacity:.23}#map-3-root .room-label{font-size:16px;letter-spacing:1.4px;pointer-events:none}#map-3-root .room-number{font:10px Georgia,serif;letter-spacing:2px;fill:#7b9188;pointer-events:none}#map-3-root .room-zone.is-selected .room-label{fill:#eee5da}#map-3-root .room-zone.is-selected .room-number{fill:#c66b75}#map-3-root .furniture{fill:none;stroke:#8c9691;stroke-width:.04;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}#map-3-root .rug{fill:none;stroke:#65786d;stroke-width:.025;stroke-dasharray:.13 .07;pointer-events:none}#map-3-root .door-gap{stroke:#111315;stroke-width:.35;fill:none}#map-3-root .door-line{stroke:#9ba99f;stroke-width:.04;fill:none}#map-3-root .door-arc{stroke:#7c9187;stroke-width:.025;fill:none;stroke-dasharray:.09 .05}#map-3-root .window-gap{stroke:#111315;stroke-width:.25}#map-3-root .window-line{stroke:#bdd1c7;stroke-width:.035;fill:none}#map-3-root .dimension{stroke:#707f78;stroke-width:1;fill:none}#map-3-root .dimension-label{font:10px Georgia,serif;letter-spacing:1.4px;fill:#859b8e}#map-3-root .note{font-size:11px;fill:#83948b;letter-spacing:1px}#map-3-root .scale-bar{stroke:#b5c0b6;fill:none;stroke-width:1}#map-3-root .scale-label{font:11px Georgia,serif;fill:#9eafa3}#map-3-root .north-arrow{stroke:#a8b9ad;fill:none;stroke-width:1}#map-3-root .north-label{font:12px Georgia,serif;fill:#b8c6bb}#map-3-root .thin-rule{stroke:#5d7066;stroke-width:1}#map-3-root .garden-path{fill:#73877b;fill-opacity:.10;stroke:#7d9285;stroke-opacity:.5;stroke-width:.025;pointer-events:none}#map-3-root .garden-hedge{fill:#586f5b;fill-opacity:.16;stroke:#789580;stroke-width:.05;stroke-dasharray:.12 .1;pointer-events:none}#map-3-root .ritual-symbol{fill:none;stroke:#98515a;stroke-width:.055;pointer-events:none}#map-3-root .stairs-link{font:11px Georgia,serif;letter-spacing:1px;fill:#c1b8a4}#map-3-root .room-marker{fill:#b65761;stroke:#c38489;stroke-width:1}#map-3-root .artifact-symbol{stroke:#b4b6a4}\n</style><rect x=\"0\" y=\"0\" width=\"900\" height=\"740\" fill=\"#111315\"/><g class=\"map-sheet-header\"><path class=\"thin-rule\" d=\"M38 110H862M38 651H862\"/><text class=\"subhead\" x=\"44\" y=\"38\">BACKLUND · SURVEY RECORD / 03</text><text class=\"headline\" x=\"44\" y=\"75\">富商宅邸</text><text class=\"subhead\" x=\"45\" y=\"97\">木饰面后的欲望 · 首层约320 m²</text><g class=\"north-arrow\" aria-label=\"北向上\" transform=\"translate(838 63)\"><path d=\"M0 28V-10M-6 1L0-10L6 1M-15 14H15\"/><path d=\"M0 -10L-4 0H0Z\" fill=\"#a8b9ad\"/><text class=\"north-label\" x=\"0\" y=\"-19\" text-anchor=\"middle\">N</text></g></g><text class=\"floor-title\" x=\"180\" y=\"140\">宅邸首层 / MANOR GROUND</text><rect x=\"180\" y=\"170\" width=\"540\" height=\"432\" fill=\"#111315\"/><rect class=\"floor-grid\" x=\"180\" y=\"170\" width=\"540\" height=\"432\" fill=\"url(#map-3-grid-ground)\"/><g class=\"room-zone\" data-room=\"library\" tabindex=\"0\" role=\"button\" aria-label=\"藏书室：落地书架、阅读桌、窗下扶手椅与壁炉；东门接后廊，供探索时描述遮蔽与视线。\"><rect class=\"room-floor\" x=\"183\" y=\"173\" width=\"210\" height=\"237\"/><text class=\"room-number\" x=\"288\" y=\"199.9\" text-anchor=\"middle\">01</text><text class=\"room-label\" x=\"288\" y=\"215.9\" text-anchor=\"middle\">藏书室</text></g><g class=\"room-zone\" data-room=\"drawing-room\" tabindex=\"0\" role=\"button\" aria-label=\"会客厅：成组长沙发、中央地毯与壁炉；东侧双门连接前厅，适合宅邸内接触与周旋。\"><rect class=\"room-floor\" x=\"183\" y=\"416\" width=\"210\" height=\"183\"/><text class=\"room-number\" x=\"288\" y=\"433.45\" text-anchor=\"middle\">02</text><text class=\"room-label\" x=\"288\" y=\"449.45\" text-anchor=\"middle\">会客厅</text></g><g class=\"room-zone\" data-room=\"rear-gallery\" tabindex=\"0\" role=\"button\" aria-label=\"后廊：南接前厅，左右通藏书室、书房与藏品室；北端后门直达第四幕同一庄园花园。\"><rect class=\"room-floor\" x=\"399\" y=\"173\" width=\"102\" height=\"237\"/><text class=\"room-number\" x=\"450\" y=\"266.05\" text-anchor=\"middle\">03</text><text class=\"room-label\" x=\"450\" y=\"282.05\" text-anchor=\"middle\">后廊</text></g><g class=\"room-zone\" data-room=\"entrance\" tabindex=\"0\" role=\"button\" aria-label=\"前厅：南端双扇正门与石阶，中央保留宽阔通道；向北接后廊，左右通会客厅及餐厅。\"><rect class=\"room-floor\" x=\"399\" y=\"416\" width=\"102\" height=\"183\"/><text class=\"room-number\" x=\"450\" y=\"455.05\" text-anchor=\"middle\">04</text><text class=\"room-label\" x=\"450\" y=\"471.05\" text-anchor=\"middle\">前厅</text></g><g class=\"room-zone\" data-room=\"holder-study\" tabindex=\"0\" role=\"button\" aria-label=\"书房：大书桌、壁柜与仪式准备工作台；西门接后廊，准备现场线索由既有剧情裁定。\"><rect class=\"room-floor\" x=\"507\" y=\"173\" width=\"210\" height=\"129\"/><text class=\"room-number\" x=\"612\" y=\"199.9\" text-anchor=\"middle\">05</text><text class=\"room-label\" x=\"612\" y=\"215.9\" text-anchor=\"middle\">书房</text><circle class=\"room-marker\" cx=\"710\" cy=\"295\" r=\"2.5\"/></g><g class=\"room-zone\" data-room=\"exhibition\" tabindex=\"0\" role=\"button\" aria-label=\"藏品室：中央陈列桌以玻璃罩和呢绒垫平面符号标记；不新增或改画拜祭之指本体。\"><rect class=\"room-floor\" x=\"507\" y=\"308\" width=\"210\" height=\"102\"/><text class=\"room-number\" x=\"612\" y=\"311.95\" text-anchor=\"middle\">06</text><text class=\"room-label\" x=\"612\" y=\"327.95\" text-anchor=\"middle\">藏品室</text><circle class=\"room-marker\" cx=\"710\" cy=\"403\" r=\"2.5\"/></g><g class=\"room-zone\" data-room=\"dining-room\" tabindex=\"0\" role=\"button\" aria-label=\"餐厅：八人长桌、餐边柜与侧窗；西门接前厅，东侧服务门可出入。\"><rect class=\"room-floor\" x=\"507\" y=\"416\" width=\"210\" height=\"183\"/><text class=\"room-number\" x=\"612\" y=\"430.75\" text-anchor=\"middle\">07</text><text class=\"room-label\" x=\"612\" y=\"446.75\" text-anchor=\"middle\">餐厅</text></g><g transform=\"translate(180 170) scale(27)\" pointer-events=\"none\"><g class=\"wall-shadow\"><rect x=\"0\" y=\"0\" width=\"8\" height=\"9\"/><rect x=\"0\" y=\"9\" width=\"8\" height=\"7\"/><rect x=\"8\" y=\"0\" width=\"4\" height=\"9\"/><rect x=\"8\" y=\"9\" width=\"4\" height=\"7\"/><rect x=\"12\" y=\"0\" width=\"8\" height=\"5\"/><rect x=\"12\" y=\"5\" width=\"8\" height=\"4\"/><rect x=\"12\" y=\"9\" width=\"8\" height=\"7\"/></g><g class=\"wall\"><rect x=\"0\" y=\"0\" width=\"8\" height=\"9\"/><rect x=\"0\" y=\"9\" width=\"8\" height=\"7\"/><rect x=\"8\" y=\"0\" width=\"4\" height=\"9\"/><rect x=\"8\" y=\"9\" width=\"4\" height=\"7\"/><rect x=\"12\" y=\"0\" width=\"8\" height=\"5\"/><rect x=\"12\" y=\"5\" width=\"8\" height=\"4\"/><rect x=\"12\" y=\"9\" width=\"8\" height=\"7\"/></g><rect class=\"wall outer\" x=\"0\" y=\"0\" width=\"20\" height=\"16\"/><g class=\"furniture\"><rect x=\"0.4\" y=\"0.4\" width=\"7.1\" height=\"0.45\" rx=\"0\"/><path d=\"M0.5 0.46v0.33\"/><path d=\"M0.66 0.46v0.33\"/><path d=\"M0.8200000000000001 0.46v0.33\"/><path d=\"M0.98 0.46v0.33\"/><path d=\"M1.1400000000000001 0.46v0.33\"/><path d=\"M1.3 0.46v0.33\"/><path d=\"M1.46 0.46v0.33\"/><path d=\"M1.62 0.46v0.33\"/><path d=\"M1.78 0.46v0.33\"/><path d=\"M1.94 0.46v0.33\"/><path d=\"M2.1 0.46v0.33\"/><path d=\"M2.26 0.46v0.33\"/><path d=\"M2.42 0.46v0.33\"/><path d=\"M2.58 0.46v0.33\"/><path d=\"M2.74 0.46v0.33\"/><path d=\"M2.9 0.46v0.33\"/><path d=\"M3.06 0.46v0.33\"/><path d=\"M3.22 0.46v0.33\"/><path d=\"M3.38 0.46v0.33\"/><path d=\"M3.54 0.46v0.33\"/><path d=\"M3.7 0.46v0.33\"/><path d=\"M3.86 0.46v0.33\"/><path d=\"M4.02 0.46v0.33\"/><path d=\"M4.18 0.46v0.33\"/><path d=\"M4.34 0.46v0.33\"/><path d=\"M4.5 0.46v0.33\"/><path d=\"M4.66 0.46v0.33\"/><path d=\"M4.82 0.46v0.33\"/><path d=\"M4.98 0.46v0.33\"/><path d=\"M5.14 0.46v0.33\"/><path d=\"M5.3 0.46v0.33\"/><path d=\"M5.46 0.46v0.33\"/><path d=\"M5.62 0.46v0.33\"/><path d=\"M5.78 0.46v0.33\"/><path d=\"M5.94 0.46v0.33\"/><path d=\"M6.1000000000000005 0.46v0.33\"/><path d=\"M6.26 0.46v0.33\"/><path d=\"M6.42 0.46v0.33\"/><path d=\"M6.58 0.46v0.33\"/><path d=\"M6.74 0.46v0.33\"/><path d=\"M6.9 0.46v0.33\"/><path d=\"M7.0600000000000005 0.46v0.33\"/><path d=\"M7.22 0.46v0.33\"/><path d=\"M7.38 0.46v0.33\"/></g><g class=\"furniture\"><rect x=\"0.4\" y=\"1.3\" width=\"0.6\" height=\"5.8\" rx=\"0\"/><path d=\"M0.5 1.36v5.68\"/><path d=\"M0.66 1.36v5.68\"/><path d=\"M0.8200000000000001 1.36v5.68\"/></g><g class=\"furniture\"><rect x=\"6.95\" y=\"1.3\" width=\"0.6\" height=\"3.4\" rx=\"0\"/><path d=\"M7.05 1.36v3.28\"/><path d=\"M7.21 1.36v3.28\"/><path d=\"M7.37 1.36v3.28\"/></g><g class=\"furniture\"><rect x=\"2.6\" y=\"3.4\" width=\"2.8\" height=\"1.2\" rx=\"0.12\"/><rect x=\"2.72\" y=\"3.52\" width=\"2.5599999999999996\" height=\"0.96\" rx=\"0.08\"/></g><g class=\"furniture\" transform=\"translate(4 5.1499999999999995) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\"><rect x=\"2.8000000000000003\" y=\"3.55\" width=\"0.4\" height=\"0.3\" rx=\"0\"/><path d=\"M4.8500000000000005 3.6h.3m-.3 .12h.3\"/><circle cx=\"5.1000000000000005\" cy=\"4.38\" r=\"0.08\"/></g><g class=\"rug\"><rect x=\"1.7\" y=\"2.8\" width=\"4.7\" height=\"3.5\" rx=\"0.03\"/><rect x=\"1.8499999999999999\" y=\"2.9499999999999997\" width=\"4.4\" height=\"3.2\" rx=\"0.02\"/><path d=\"M4.05 3.675l0.799 0.875l-0.799 0.875l-0.799 -0.875Z\"/></g><g class=\"furniture\"><rect x=\"2.9\" y=\"8.4\" width=\"2.2\" height=\"0.4\" rx=\"0\"/><rect x=\"3.05\" y=\"8.46\" width=\"1.9000000000000001\" height=\"0.27\" rx=\"0\"/><path d=\"M3.25 8.65l.2 -.12l.2 .12l.2 -.12\"/></g><g class=\"furniture\"><rect x=\"1.3\" y=\"6.7\" width=\"1.2\" height=\"1.2\" rx=\"0.15\"/><rect x=\"1.5\" y=\"6.8500000000000005\" width=\"0.7999999999999999\" height=\"0.8999999999999999\" rx=\"0.1\"/><path d=\"M1.9 6.9V7.7\"/></g><g class=\"furniture\"><rect x=\"5.4\" y=\"6.7\" width=\"1.2\" height=\"1.2\" rx=\"0.15\"/><rect x=\"5.6000000000000005\" y=\"6.8500000000000005\" width=\"0.7999999999999999\" height=\"0.8999999999999999\" rx=\"0.1\"/><path d=\"M6 6.9V7.7\"/></g><g class=\"furniture\"><rect x=\"2.9\" y=\"9.15\" width=\"2.2\" height=\"0.4\" rx=\"0\"/><rect x=\"3.05\" y=\"9.21\" width=\"1.9000000000000001\" height=\"0.27\" rx=\"0\"/><path d=\"M3.25 9.4l.2 -.12l.2 .12l.2 -.12\"/></g><g class=\"furniture\"><rect x=\"1.2\" y=\"11.1\" width=\"5.5\" height=\"1.15\" rx=\"0.15\"/><rect x=\"1.4\" y=\"11.25\" width=\"5.1\" height=\"0.8499999999999999\" rx=\"0.1\"/><path d=\"M3.95 11.299999999999999V12.05\"/></g><g class=\"furniture\"><rect x=\"1.2\" y=\"14\" width=\"5.5\" height=\"1.15\" rx=\"0.15\"/><rect x=\"1.4\" y=\"14.15\" width=\"5.1\" height=\"0.8499999999999999\" rx=\"0.1\"/><path d=\"M3.95 14.2V14.950000000000001\"/></g><g class=\"furniture\"><rect x=\"3.05\" y=\"12.75\" width=\"1.8\" height=\"0.8\" rx=\"0.12\"/><rect x=\"3.17\" y=\"12.87\" width=\"1.56\" height=\"0.56\" rx=\"0.08\"/></g><g class=\"rug\"><rect x=\"1.35\" y=\"10.8\" width=\"5.2\" height=\"4.55\" rx=\"0.03\"/><rect x=\"1.5\" y=\"10.950000000000001\" width=\"4.9\" height=\"4.25\" rx=\"0.02\"/><path d=\"M3.95 11.9375l0.8840000000000001 1.1375l-0.8840000000000001 1.1375l-0.8840000000000001 -1.1375Z\"/></g><g class=\"furniture plant\"><circle cx=\"8.65\" cy=\"0.7\" r=\"0.38\"/><path d=\"M8.365 0.7h0.5700000000000001M8.65 0.4149999999999999v0.5700000000000001M8.46 0.51l0.38 0.38M8.84 0.51l-0.38 0.38\"/></g><g class=\"furniture plant\"><circle cx=\"11.35\" cy=\"0.7\" r=\"0.38\"/><path d=\"M11.065 0.7h0.5700000000000001M11.35 0.4149999999999999v0.5700000000000001M11.16 0.51l0.38 0.38M11.54 0.51l-0.38 0.38\"/></g><g class=\"rug\"><rect x=\"8.5\" y=\"13.7\" width=\"3\" height=\"1.4\" rx=\"0.03\"/><rect x=\"8.65\" y=\"13.85\" width=\"2.7\" height=\"1.0999999999999999\" rx=\"0.02\"/><path d=\"M10 14.049999999999999l0.51 0.35l-0.51 0.35l-0.51 -0.35Z\"/></g><g class=\"furniture\"><rect x=\"8.5\" y=\"9.6\" width=\"0.4\" height=\"2.5\" rx=\"0.12\"/><rect x=\"8.62\" y=\"9.719999999999999\" width=\"0.16000000000000003\" height=\"2.26\" rx=\"0.08\"/></g><g class=\"furniture plant\"><circle cx=\"11.2\" cy=\"15.1\" r=\"0.38\"/><path d=\"M10.915 15.1h0.5700000000000001M11.2 14.815v0.5700000000000001M11.01 14.91l0.38 0.38M11.389999999999999 14.91l-0.38 0.38\"/></g><g class=\"furniture\"><rect x=\"14.4\" y=\"2.25\" width=\"3.2\" height=\"1.1\" rx=\"0.12\"/><rect x=\"14.52\" y=\"2.37\" width=\"2.96\" height=\"0.8600000000000001\" rx=\"0.08\"/></g><g class=\"furniture\" transform=\"translate(16 3.9000000000000004) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\"><rect x=\"14.6\" y=\"2.4\" width=\"0.4\" height=\"0.3\" rx=\"0\"/><path d=\"M17.05 2.45h.3m-.3 .12h.3\"/><circle cx=\"17.3\" cy=\"3.13\" r=\"0.08\"/></g><g class=\"furniture\"><rect x=\"12.5\" y=\"0.4\" width=\"6.8\" height=\"0.45\" rx=\"0\"/><path d=\"M12.6 0.46v0.33\"/><path d=\"M12.76 0.46v0.33\"/><path d=\"M12.92 0.46v0.33\"/><path d=\"M13.08 0.46v0.33\"/><path d=\"M13.24 0.46v0.33\"/><path d=\"M13.4 0.46v0.33\"/><path d=\"M13.559999999999999 0.46v0.33\"/><path d=\"M13.719999999999999 0.46v0.33\"/><path d=\"M13.879999999999999 0.46v0.33\"/><path d=\"M14.04 0.46v0.33\"/><path d=\"M14.2 0.46v0.33\"/><path d=\"M14.36 0.46v0.33\"/><path d=\"M14.52 0.46v0.33\"/><path d=\"M14.68 0.46v0.33\"/><path d=\"M14.84 0.46v0.33\"/><path d=\"M15 0.46v0.33\"/><path d=\"M15.16 0.46v0.33\"/><path d=\"M15.32 0.46v0.33\"/><path d=\"M15.48 0.46v0.33\"/><path d=\"M15.64 0.46v0.33\"/><path d=\"M15.8 0.46v0.33\"/><path d=\"M15.959999999999999 0.46v0.33\"/><path d=\"M16.12 0.46v0.33\"/><path d=\"M16.28 0.46v0.33\"/><path d=\"M16.439999999999998 0.46v0.33\"/><path d=\"M16.6 0.46v0.33\"/><path d=\"M16.759999999999998 0.46v0.33\"/><path d=\"M16.92 0.46v0.33\"/><path d=\"M17.08 0.46v0.33\"/><path d=\"M17.24 0.46v0.33\"/><path d=\"M17.4 0.46v0.33\"/><path d=\"M17.56 0.46v0.33\"/><path d=\"M17.72 0.46v0.33\"/><path d=\"M17.88 0.46v0.33\"/><path d=\"M18.04 0.46v0.33\"/><path d=\"M18.2 0.46v0.33\"/><path d=\"M18.36 0.46v0.33\"/><path d=\"M18.52 0.46v0.33\"/><path d=\"M18.68 0.46v0.33\"/><path d=\"M18.84 0.46v0.33\"/><path d=\"M19 0.46v0.33\"/><path d=\"M19.16 0.46v0.33\"/></g><g class=\"furniture\"><rect x=\"18.7\" y=\"1.7\" width=\"0.7\" height=\"2.6\" rx=\"0.12\"/><rect x=\"18.82\" y=\"1.8199999999999998\" width=\"0.45999999999999996\" height=\"2.3600000000000003\" rx=\"0.08\"/></g><g class=\"furniture\"><rect x=\"14.9\" y=\"6.6\" width=\"2.2\" height=\"1.25\" rx=\"0.12\"/><rect x=\"15.02\" y=\"6.72\" width=\"1.9600000000000002\" height=\"1.01\" rx=\"0.08\"/></g><g class=\"furniture artifact-symbol\"><rect x=\"15.2\" y=\"6.82\" width=\"1.6\" height=\"0.8\" rx=\"0.08\"/><rect x=\"15.48\" y=\"6.95\" width=\"1.05\" height=\"0.52\" rx=\"0.04\"/><path d=\"M15.35 7.5v-.6a.75 .4 0 0 1 1.3 0v.6\"/><circle cx=\"16\" cy=\"7.19\" r=\"0.18\"/></g><g class=\"furniture\"><rect x=\"18.9\" y=\"5.5\" width=\"0.6\" height=\"2.8\" rx=\"0\"/><path d=\"M19 5.56v2.6799999999999997\"/><path d=\"M19.16 5.56v2.6799999999999997\"/><path d=\"M19.32 5.56v2.6799999999999997\"/></g><g class=\"furniture\"><rect x=\"14.5\" y=\"11.7\" width=\"3.3\" height=\"1.8\" rx=\"0.12\"/><rect x=\"14.62\" y=\"11.819999999999999\" width=\"3.0599999999999996\" height=\"1.56\" rx=\"0.08\"/></g><g class=\"furniture\" transform=\"translate(15.05 11.2) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(15.05 14) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(16.15 11.2) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(16.15 14) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(17.25 11.2) rotate(180)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(17.25 14) rotate(0)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(14 12.6) rotate(90)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\" transform=\"translate(18.3 12.6) rotate(-90)\"><rect x=\"-0.25\" y=\"-0.25\" width=\"0.5\" height=\"0.5\" rx=\"0.06\"/><path d=\"M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12\"/></g><g class=\"furniture\"><rect x=\"12.65\" y=\"15.1\" width=\"5.5\" height=\"0.5\" rx=\"0\"/><path d=\"M12.75 15.16v0.38\"/><path d=\"M12.91 15.16v0.38\"/><path d=\"M13.07 15.16v0.38\"/><path d=\"M13.23 15.16v0.38\"/><path d=\"M13.39 15.16v0.38\"/><path d=\"M13.55 15.16v0.38\"/><path d=\"M13.71 15.16v0.38\"/><path d=\"M13.870000000000001 15.16v0.38\"/><path d=\"M14.03 15.16v0.38\"/><path d=\"M14.19 15.16v0.38\"/><path d=\"M14.35 15.16v0.38\"/><path d=\"M14.51 15.16v0.38\"/><path d=\"M14.67 15.16v0.38\"/><path d=\"M14.83 15.16v0.38\"/><path d=\"M14.99 15.16v0.38\"/><path d=\"M15.15 15.16v0.38\"/><path d=\"M15.31 15.16v0.38\"/><path d=\"M15.47 15.16v0.38\"/><path d=\"M15.629999999999999 15.16v0.38\"/><path d=\"M15.79 15.16v0.38\"/><path d=\"M15.95 15.16v0.38\"/><path d=\"M16.11 15.16v0.38\"/><path d=\"M16.27 15.16v0.38\"/><path d=\"M16.43 15.16v0.38\"/><path d=\"M16.59 15.16v0.38\"/><path d=\"M16.75 15.16v0.38\"/><path d=\"M16.91 15.16v0.38\"/><path d=\"M17.07 15.16v0.38\"/><path d=\"M17.23 15.16v0.38\"/><path d=\"M17.39 15.16v0.38\"/><path d=\"M17.55 15.16v0.38\"/><path d=\"M17.71 15.16v0.38\"/><path d=\"M17.87 15.16v0.38\"/><path d=\"M18.03 15.16v0.38\"/></g></g><g transform=\"translate(180 170) scale(27)\" pointer-events=\"none\"><path class=\"window-gap\" d=\"M1 0L3.2 0\"/><path class=\"window-line\" d=\"M1 -0.065L3.2 -0.065M1 0.065L3.2 0.065\"/><path class=\"window-line\" d=\"M2.1 -0.12v.24\"/><path class=\"window-gap\" d=\"M4.8 0L7 0\"/><path class=\"window-line\" d=\"M4.8 -0.065L7 -0.065M4.8 0.065L7 0.065\"/><path class=\"window-line\" d=\"M5.9 -0.12v.24\"/><path class=\"window-gap\" d=\"M13 0L15.6 0\"/><path class=\"window-line\" d=\"M13 -0.065L15.6 -0.065M13 0.065L15.6 0.065\"/><path class=\"window-line\" d=\"M14.3 -0.12v.24\"/><path class=\"window-gap\" d=\"M17.3 0L19.1 0\"/><path class=\"window-line\" d=\"M17.3 -0.065L19.1 -0.065M17.3 0.065L19.1 0.065\"/><path class=\"window-line\" d=\"M18.200000000000003 -0.12v.24\"/><path class=\"window-gap\" d=\"M0 1.5L0 3.7\"/><path class=\"window-line\" d=\"M-0.065 1.5L-0.065 3.7M0.065 1.5L0.065 3.7\"/><path class=\"window-line\" d=\"M-0.12 2.6h.24\"/><path class=\"window-gap\" d=\"M0 6L0 8\"/><path class=\"window-line\" d=\"M-0.065 6L-0.065 8M0.065 6L0.065 8\"/><path class=\"window-line\" d=\"M-0.12 7h.24\"/><path class=\"window-gap\" d=\"M0 10.2L0 12.2\"/><path class=\"window-line\" d=\"M-0.065 10.2L-0.065 12.2M0.065 10.2L0.065 12.2\"/><path class=\"window-line\" d=\"M-0.12 11.2h.24\"/><path class=\"window-gap\" d=\"M0 13.3L0 15.2\"/><path class=\"window-line\" d=\"M-0.065 13.3L-0.065 15.2M0.065 13.3L0.065 15.2\"/><path class=\"window-line\" d=\"M-0.12 14.25h.24\"/><path class=\"window-gap\" d=\"M1 16L3.2 16\"/><path class=\"window-line\" d=\"M1 15.935L3.2 15.935M1 16.065L3.2 16.065\"/><path class=\"window-line\" d=\"M2.1 15.88v.24\"/><path class=\"window-gap\" d=\"M5 16L7.1 16\"/><path class=\"window-line\" d=\"M5 15.935L7.1 15.935M5 16.065L7.1 16.065\"/><path class=\"window-line\" d=\"M6.05 15.88v.24\"/><path class=\"window-gap\" d=\"M13.3 16L15.8 16\"/><path class=\"window-line\" d=\"M13.3 15.935L15.8 15.935M13.3 16.065L15.8 16.065\"/><path class=\"window-line\" d=\"M14.55 15.88v.24\"/><path class=\"window-gap\" d=\"M17.4 16L19 16\"/><path class=\"window-line\" d=\"M17.4 15.935L19 15.935M17.4 16.065L19 16.065\"/><path class=\"window-line\" d=\"M18.2 15.88v.24\"/><path class=\"window-gap\" d=\"M20 1L20 3.5\"/><path class=\"window-line\" d=\"M19.935 1L19.935 3.5M20.065 1L20.065 3.5\"/><path class=\"window-line\" d=\"M19.88 2.25h.24\"/><path class=\"window-gap\" d=\"M20 5.8L20 8.3\"/><path class=\"window-line\" d=\"M19.935 5.8L19.935 8.3M20.065 5.8L20.065 8.3\"/><path class=\"window-line\" d=\"M19.88 7.050000000000001h.24\"/><path class=\"window-gap\" d=\"M20 9.8L20 11.4\"/><path class=\"window-line\" d=\"M19.935 9.8L19.935 11.4M20.065 9.8L20.065 11.4\"/><path class=\"window-line\" d=\"M19.88 10.600000000000001h.24\"/></g><g class=\"dimension\"><path d=\"M180 156h540M180 151v10M720 151v10\"/><path d=\"M166 170v432M161 170h10M161 602h10\"/></g><text class=\"dimension-label\" text-anchor=\"middle\" x=\"450\" y=\"151\">20.0 m</text><text class=\"dimension-label\" text-anchor=\"middle\" transform=\"translate(157 386) rotate(-90)\">16.0 m</text><g data-connection=\"manor-front\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M9.1 16h1.8\"/><path class=\"door-line\" d=\"M9.1 16v1.8\"/><path class=\"door-arc\" d=\"M9.1 17.8A1.8 1.8 0 0 0 10.9 16\"/></g><g data-connection=\"estate-rear-door\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M9.2 0h1.6\"/><path class=\"door-line\" d=\"M9.2 0v1.6\"/><path class=\"door-arc\" d=\"M9.2 1.6A1.6 1.6 0 0 0 10.8 0\"/></g><g data-connection=\"entrance-rear\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M9 9h2\"/><path class=\"door-line\" d=\"M9 9v2\"/><path class=\"door-arc\" d=\"M9 11A2 2 0 0 0 11 9\"/></g><g data-connection=\"entrance-drawing\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M8 11.6v1.8\"/><path class=\"door-line\" d=\"M8 11.6h1.8\"/><path class=\"door-arc\" d=\"M9.8 11.6A1.8 1.8 0 0 1 8 13.4\"/></g><g data-connection=\"entrance-dining\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M12 11.7v1.6\"/><path class=\"door-line\" d=\"M12 11.7h1.6\"/><path class=\"door-arc\" d=\"M13.6 11.7A1.6 1.6 0 0 1 12 13.3\"/></g><g data-connection=\"gallery-library\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M8 5v1.6\"/><path class=\"door-line\" d=\"M8 5h1.6\"/><path class=\"door-arc\" d=\"M9.6 5A1.6 1.6 0 0 1 8 6.6\"/></g><g data-connection=\"gallery-study\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M12 2.25v1.3\"/><path class=\"door-line\" d=\"M12 2.25h1.3\"/><path class=\"door-arc\" d=\"M13.3 2.25A1.3 1.3 0 0 1 12 3.55\"/></g><g data-connection=\"gallery-exhibit\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M12 6.5v1.4\"/><path class=\"door-line\" d=\"M12 6.5h1.4\"/><path class=\"door-arc\" d=\"M13.4 6.5A1.4 1.4 0 0 1 12 7.9\"/></g><g data-connection=\"dining-service\" transform=\"translate(180 170) scale(27)\"><path class=\"door-gap\" d=\"M20 12.4v1.2\"/><path class=\"door-line\" d=\"M20 12.4h1.2\"/><path class=\"door-arc\" d=\"M21.2 12.4A1.2 1.2 0 0 1 20 13.6\"/></g><g class=\"map-sheet-footer\"><g class=\"scale-bar\"><path d=\"M56 684h135M56 679v10M110 679v10M191 679v10\"/><path d=\"M56 684h54\" stroke-width=\"4\"/><text class=\"scale-label\" x=\"56\" y=\"705\">0</text><text class=\"scale-label\" x=\"110\" y=\"705\" text-anchor=\"middle\">2</text><text class=\"scale-label\" x=\"191\" y=\"705\" text-anchor=\"middle\">5 m</text></g><text class=\"note\" x=\"855\" y=\"679\" text-anchor=\"end\">1格＝1米 · 门弧表示开启方向</text><text class=\"note\" x=\"855\" y=\"699\" text-anchor=\"end\">北侧后门 → 同一庄园花园</text><text class=\"subhead\" x=\"44\" y=\"730\">南：主入口 / 东：服务门 / 仅首层 · 7个空间</text></g></svg>\n"
  },
  {
    "actId": 4,
    "title": "庄园院落与花园",
    "subtitle": "夜色中的降临仪式",
    "area": "约720 m²",
    "scale": "1格＝1米",
    "file": "assets/story-maps/act-04.svg",
    "estateDoor": "estate-rear-door",
    "estateDoorWidth": 1.6,
    "estateDoorEdge": "south",
    "floors": [
      {
        "id": "garden",
        "name": "庄园后园 / MANOR GARDEN",
        "width": 30,
        "height": 24,
        "x": 150,
        "y": 154,
        "p": 20
      }
    ],
    "rooms": [
      {
        "id": "glasshouse",
        "name": "玻璃温室",
        "floor": "garden",
        "bounds": [
          0,
          0,
          8,
          7
        ],
        "description": "砖基与玻璃框架的小温室，内部为花架和中央过道；北门通东侧树篱径。",
        "clues": [],
        "label": [
          4,
          1.2
        ]
      },
      {
        "id": "east-hedge-walk",
        "name": "东侧树篱径",
        "floor": "garden",
        "bounds": [
          0,
          7,
          8,
          17
        ],
        "description": "修剪树篱、石径与长凳；南接温室，向西有两处开口连中央草坪和北门区。",
        "clues": [],
        "label": [
          4,
          8.35
        ]
      },
      {
        "id": "terrace",
        "name": "宅后石台",
        "floor": "garden",
        "bounds": [
          8,
          0,
          14,
          5
        ],
        "description": "顶部为第三幕宅邸的北侧后门，石阶下接草坪；左右各有通往温室区和园务小院的通路。",
        "clues": [],
        "label": [
          15,
          1.3
        ]
      },
      {
        "id": "service-court",
        "name": "园务小院",
        "floor": "garden",
        "bounds": [
          22,
          0,
          8,
          7
        ],
        "description": "石铺地、木质园务棚与堆放园具的边台；东接宅后石台，北接西侧步道。",
        "clues": [],
        "label": [
          26,
          1.2
        ]
      },
      {
        "id": "west-walk",
        "name": "西侧步道",
        "floor": "garden",
        "bounds": [
          22,
          7,
          8,
          17
        ],
        "description": "树丛、园墙和沿墙石径；可从草坪侧开口通行，向北连出入口区域。",
        "clues": [],
        "label": [
          26,
          8.35
        ]
      },
      {
        "id": "ritual-lawn",
        "name": "仪式草坪",
        "floor": "garden",
        "bounds": [
          8,
          5,
          14,
          14
        ],
        "description": "草坪中央为既有降临仪式现场，图中圆形仅作范围示意；四向石径接石台、侧径与北门。",
        "clues": [
          0
        ],
        "label": [
          15,
          6.25
        ]
      },
      {
        "id": "north-gate",
        "name": "北门与外径",
        "floor": "garden",
        "bounds": [
          8,
          19,
          14,
          5
        ],
        "description": "庄园后园铁门与横向石径，向南到仪式草坪，左右连两条侧径；门外为庄园道路。",
        "clues": [],
        "label": [
          15,
          20.25
        ]
      }
    ],
    "connections": [
      {
        "id": "estate-rear-door",
        "from": "terrace",
        "to": "outside",
        "x": 15,
        "y": 0,
        "dir": "h",
        "width": 1.6,
        "kind": "door"
      },
      {
        "id": "terrace-east",
        "from": "terrace",
        "to": "glasshouse",
        "x": 8,
        "y": 3,
        "dir": "v",
        "width": 1.5,
        "kind": "door"
      },
      {
        "id": "terrace-service",
        "from": "terrace",
        "to": "service-court",
        "x": 22,
        "y": 3,
        "dir": "v",
        "width": 1.5,
        "kind": "door"
      },
      {
        "id": "glasshouse-walk",
        "from": "glasshouse",
        "to": "east-hedge-walk",
        "x": 4,
        "y": 7,
        "dir": "h",
        "width": 1.5,
        "kind": "door"
      },
      {
        "id": "service-west",
        "from": "service-court",
        "to": "west-walk",
        "x": 26,
        "y": 7,
        "dir": "h",
        "width": 1.5,
        "kind": "door"
      },
      {
        "id": "terrace-lawn",
        "from": "terrace",
        "to": "ritual-lawn",
        "x": 15,
        "y": 5,
        "dir": "h",
        "width": 3,
        "kind": "door"
      },
      {
        "id": "east-lawn",
        "from": "east-hedge-walk",
        "to": "ritual-lawn",
        "x": 8,
        "y": 12,
        "dir": "v",
        "width": 2,
        "kind": "door"
      },
      {
        "id": "west-lawn",
        "from": "west-walk",
        "to": "ritual-lawn",
        "x": 22,
        "y": 12,
        "dir": "v",
        "width": 2,
        "kind": "door"
      },
      {
        "id": "lawn-gate",
        "from": "ritual-lawn",
        "to": "north-gate",
        "x": 15,
        "y": 19,
        "dir": "h",
        "width": 3,
        "kind": "door"
      },
      {
        "id": "east-gate",
        "from": "east-hedge-walk",
        "to": "north-gate",
        "x": 8,
        "y": 22,
        "dir": "v",
        "width": 2,
        "kind": "door"
      },
      {
        "id": "west-gate",
        "from": "west-walk",
        "to": "north-gate",
        "x": 22,
        "y": 22,
        "dir": "v",
        "width": 2,
        "kind": "door"
      },
      {
        "id": "garden-gate",
        "from": "north-gate",
        "to": "outside",
        "x": 15,
        "y": 24,
        "dir": "h",
        "width": 2.5,
        "kind": "door"
      }
    ],
    "notes": [
      "图上为南，图下为北 · 顶部门衔接第三幕",
      "中央仪式范围仅作示意",
      "北侧铁门通庄园外径"
    ],
    "north": "down",
    "embedViewBox": [
      116,
      110,
      646,
      584
    ],
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 900 740\" class=\"story-map-svg\" id=\"map-4-root\" role=\"group\" aria-labelledby=\"map-4-title map-4-desc\"><title id=\"map-4-title\">第4幕 · 庄园院落与花园平面图</title><desc id=\"map-4-desc\">约720 m²。玻璃温室、东侧树篱径、宅后石台、园务小院、西侧步道、仪式草坪、北门与外径。选取房间查看空间说明。建筑门洞及楼梯均已标示，户型供KP描述场景。</desc><defs><pattern id=\"map-4-grid-garden\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\" x=\"150\" y=\"154\"><path d=\"M20 0H0V20\" fill=\"none\" stroke=\"#8b9992\" stroke-width=\".7\"/></pattern></defs><style>#map-4-root{font-family:\"Noto Serif SC\",\"Songti SC\",\"SimSun\",serif;background:#111315;color:#c7cac7}#map-4-root text{fill:#c9cecb;stroke:none;user-select:none}#map-4-root .headline{font-size:25px;letter-spacing:4px}#map-4-root .subhead{fill:#85928e;font-size:11px;letter-spacing:2px}#map-4-root .floor-title{font-size:12px;letter-spacing:2px;fill:#aab8b1}#map-4-root .wall-shadow{fill:none;stroke:#383d3d;stroke-width:.27}#map-4-root .wall{fill:none;stroke:#b5bab8;stroke-width:.105}#map-4-root .outer{stroke-width:.17;stroke:#c4c7c3}#map-4-root .floor-grid{opacity:.2}#map-4-root .room-zone{outline:none;cursor:pointer}#map-4-root .room-floor{fill:#b2c4bb;fill-opacity:.015;stroke:none}#map-4-root .room-zone:hover .room-floor,#map-4-root .room-zone:focus .room-floor{fill:#b1bdb5;fill-opacity:.12}#map-4-root .room-zone.is-selected .room-floor{fill:#a63847;fill-opacity:.23}#map-4-root .room-label{font-size:16px;letter-spacing:1.4px;pointer-events:none}#map-4-root .room-number{font:10px Georgia,serif;letter-spacing:2px;fill:#7b9188;pointer-events:none}#map-4-root .room-zone.is-selected .room-label{fill:#eee5da}#map-4-root .room-zone.is-selected .room-number{fill:#c66b75}#map-4-root .furniture{fill:none;stroke:#8c9691;stroke-width:.04;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}#map-4-root .rug{fill:none;stroke:#65786d;stroke-width:.025;stroke-dasharray:.13 .07;pointer-events:none}#map-4-root .door-gap{stroke:#111315;stroke-width:.35;fill:none}#map-4-root .door-line{stroke:#9ba99f;stroke-width:.04;fill:none}#map-4-root .door-arc{stroke:#7c9187;stroke-width:.025;fill:none;stroke-dasharray:.09 .05}#map-4-root .window-gap{stroke:#111315;stroke-width:.25}#map-4-root .window-line{stroke:#bdd1c7;stroke-width:.035;fill:none}#map-4-root .dimension{stroke:#707f78;stroke-width:1;fill:none}#map-4-root .dimension-label{font:10px Georgia,serif;letter-spacing:1.4px;fill:#859b8e}#map-4-root .note{font-size:11px;fill:#83948b;letter-spacing:1px}#map-4-root .scale-bar{stroke:#b5c0b6;fill:none;stroke-width:1}#map-4-root .scale-label{font:11px Georgia,serif;fill:#9eafa3}#map-4-root .north-arrow{stroke:#a8b9ad;fill:none;stroke-width:1}#map-4-root .north-label{font:12px Georgia,serif;fill:#b8c6bb}#map-4-root .thin-rule{stroke:#5d7066;stroke-width:1}#map-4-root .garden-path{fill:#73877b;fill-opacity:.10;stroke:#7d9285;stroke-opacity:.5;stroke-width:.025;pointer-events:none}#map-4-root .garden-hedge{fill:#586f5b;fill-opacity:.16;stroke:#789580;stroke-width:.05;stroke-dasharray:.12 .1;pointer-events:none}#map-4-root .ritual-symbol{fill:none;stroke:#98515a;stroke-width:.055;pointer-events:none}#map-4-root .stairs-link{font:11px Georgia,serif;letter-spacing:1px;fill:#c1b8a4}#map-4-root .room-marker{fill:#b65761;stroke:#c38489;stroke-width:1}#map-4-root .artifact-symbol{stroke:#b4b6a4}\n</style><rect x=\"0\" y=\"0\" width=\"900\" height=\"740\" fill=\"#111315\"/><g class=\"map-sheet-header\"><path class=\"thin-rule\" d=\"M38 110H862M38 651H862\"/><text class=\"subhead\" x=\"44\" y=\"38\">BACKLUND · SURVEY RECORD / 04</text><text class=\"headline\" x=\"44\" y=\"75\">庄园院落与花园</text><text class=\"subhead\" x=\"45\" y=\"97\">夜色中的降临仪式 · 约720 m²</text><g class=\"north-arrow\" aria-label=\"北向下\" transform=\"translate(838 63)\"><path d=\"M0 -18V20M-6 9L0 20L6 9M-15 -4H15\"/><path d=\"M0 20L-4 10H0Z\" fill=\"#a8b9ad\"/><text class=\"north-label\" x=\"0\" y=\"38\" text-anchor=\"middle\">N</text></g></g><text class=\"floor-title\" x=\"150\" y=\"124\">庄园后园 / MANOR GARDEN</text><rect x=\"150\" y=\"154\" width=\"600\" height=\"480\" fill=\"#111315\"/><rect class=\"floor-grid\" x=\"150\" y=\"154\" width=\"600\" height=\"480\" fill=\"url(#map-4-grid-garden)\"/><g class=\"room-zone\" data-room=\"glasshouse\" tabindex=\"0\" role=\"button\" aria-label=\"玻璃温室：砖基与玻璃框架的小温室，内部为花架和中央过道；北门通东侧树篱径。\"><rect class=\"room-floor\" x=\"153\" y=\"157\" width=\"154\" height=\"134\"/><text class=\"room-number\" x=\"230\" y=\"162\" text-anchor=\"middle\">01</text><text class=\"room-label\" x=\"230\" y=\"178\" text-anchor=\"middle\">玻璃温室</text></g><g class=\"room-zone\" data-room=\"east-hedge-walk\" tabindex=\"0\" role=\"button\" aria-label=\"东侧树篱径：修剪树篱、石径与长凳；南接温室，向西有两处开口连中央草坪和北门区。\"><rect class=\"room-floor\" x=\"153\" y=\"297\" width=\"154\" height=\"334\"/><text class=\"room-number\" x=\"230\" y=\"305\" text-anchor=\"middle\">02</text><text class=\"room-label\" x=\"230\" y=\"321\" text-anchor=\"middle\">东侧树篱径</text></g><g class=\"room-zone\" data-room=\"terrace\" tabindex=\"0\" role=\"button\" aria-label=\"宅后石台：顶部为第三幕宅邸的北侧后门，石阶下接草坪；左右各有通往温室区和园务小院的通路。\"><rect class=\"room-floor\" x=\"313\" y=\"157\" width=\"274\" height=\"94\"/><text class=\"room-number\" x=\"450\" y=\"164\" text-anchor=\"middle\">03</text><text class=\"room-label\" x=\"450\" y=\"180\" text-anchor=\"middle\">宅后石台</text></g><g class=\"room-zone\" data-room=\"service-court\" tabindex=\"0\" role=\"button\" aria-label=\"园务小院：石铺地、木质园务棚与堆放园具的边台；东接宅后石台，北接西侧步道。\"><rect class=\"room-floor\" x=\"593\" y=\"157\" width=\"154\" height=\"134\"/><text class=\"room-number\" x=\"670\" y=\"162\" text-anchor=\"middle\">04</text><text class=\"room-label\" x=\"670\" y=\"178\" text-anchor=\"middle\">园务小院</text></g><g class=\"room-zone\" data-room=\"west-walk\" tabindex=\"0\" role=\"button\" aria-label=\"西侧步道：树丛、园墙和沿墙石径；可从草坪侧开口通行，向北连出入口区域。\"><rect class=\"room-floor\" x=\"593\" y=\"297\" width=\"154\" height=\"334\"/><text class=\"room-number\" x=\"670\" y=\"305\" text-anchor=\"middle\">05</text><text class=\"room-label\" x=\"670\" y=\"321\" text-anchor=\"middle\">西侧步道</text></g><g class=\"room-zone\" data-room=\"ritual-lawn\" tabindex=\"0\" role=\"button\" aria-label=\"仪式草坪：草坪中央为既有降临仪式现场，图中圆形仅作范围示意；四向石径接石台、侧径与北门。\"><rect class=\"room-floor\" x=\"313\" y=\"257\" width=\"274\" height=\"274\"/><text class=\"room-number\" x=\"450\" y=\"263\" text-anchor=\"middle\">06</text><text class=\"room-label\" x=\"450\" y=\"279\" text-anchor=\"middle\">仪式草坪</text><circle class=\"room-marker\" cx=\"580\" cy=\"524\" r=\"2.5\"/></g><g class=\"room-zone\" data-room=\"north-gate\" tabindex=\"0\" role=\"button\" aria-label=\"北门与外径：庄园后园铁门与横向石径，向南到仪式草坪，左右连两条侧径；门外为庄园道路。\"><rect class=\"room-floor\" x=\"313\" y=\"537\" width=\"274\" height=\"94\"/><text class=\"room-number\" x=\"450\" y=\"543\" text-anchor=\"middle\">07</text><text class=\"room-label\" x=\"450\" y=\"559\" text-anchor=\"middle\">北门与外径</text></g><g transform=\"translate(150 154) scale(20)\" pointer-events=\"none\"><g class=\"wall-shadow\"><rect x=\"0\" y=\"0\" width=\"8\" height=\"7\"/></g><g class=\"wall\"><rect x=\"0\" y=\"0\" width=\"8\" height=\"7\"/></g><rect class=\"wall outer\" x=\"0\" y=\"0\" width=\"30\" height=\"24\"/><g class=\"glasshouse furniture\"><rect x=\"0.7\" y=\"2.2\" width=\"6.6\" height=\"4.1\" rx=\"0\"/><path d=\"M.7 3.5h6.6M.7 4.9h6.6M2.3 2.2v4.1M4 2.2v4.1M5.7 2.2v4.1\"/><rect x=\"1\" y=\"2.5\" width=\"1.1\" height=\"3.5\" rx=\"0\"/><rect x=\"5.9\" y=\"2.5\" width=\"1.1\" height=\"3.5\" rx=\"0\"/></g><g class=\"furniture plant\"><circle cx=\"1.55\" cy=\"2.8\" r=\"0.18\"/><path d=\"M1.415 2.8h0.27M1.55 2.665v0.27M1.46 2.71l0.18 0.18M1.6400000000000001 2.71l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"6.45\" cy=\"2.8\" r=\"0.18\"/><path d=\"M6.315 2.8h0.27M6.45 2.665v0.27M6.36 2.71l0.18 0.18M6.54 2.71l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"1.55\" cy=\"3.3\" r=\"0.18\"/><path d=\"M1.415 3.3h0.27M1.55 3.165v0.27M1.46 3.21l0.18 0.18M1.6400000000000001 3.21l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"6.45\" cy=\"3.3\" r=\"0.18\"/><path d=\"M6.315 3.3h0.27M6.45 3.165v0.27M6.36 3.21l0.18 0.18M6.54 3.21l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"1.55\" cy=\"3.8\" r=\"0.18\"/><path d=\"M1.415 3.8h0.27M1.55 3.665v0.27M1.46 3.71l0.18 0.18M1.6400000000000001 3.71l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"6.45\" cy=\"3.8\" r=\"0.18\"/><path d=\"M6.315 3.8h0.27M6.45 3.665v0.27M6.36 3.71l0.18 0.18M6.54 3.71l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"1.55\" cy=\"4.3\" r=\"0.18\"/><path d=\"M1.415 4.3h0.27M1.55 4.165v0.27M1.46 4.21l0.18 0.18M1.6400000000000001 4.21l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"6.45\" cy=\"4.3\" r=\"0.18\"/><path d=\"M6.315 4.3h0.27M6.45 4.165v0.27M6.36 4.21l0.18 0.18M6.54 4.21l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"1.55\" cy=\"4.8\" r=\"0.18\"/><path d=\"M1.415 4.8h0.27M1.55 4.665v0.27M1.46 4.71l0.18 0.18M1.6400000000000001 4.71l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"6.45\" cy=\"4.8\" r=\"0.18\"/><path d=\"M6.315 4.8h0.27M6.45 4.665v0.27M6.36 4.71l0.18 0.18M6.54 4.71l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"1.55\" cy=\"5.3\" r=\"0.18\"/><path d=\"M1.415 5.3h0.27M1.55 5.165v0.27M1.46 5.21l0.18 0.18M1.6400000000000001 5.21l-0.18 0.18\"/></g><g class=\"furniture plant\"><circle cx=\"6.45\" cy=\"5.3\" r=\"0.18\"/><path d=\"M6.315 5.3h0.27M6.45 5.165v0.27M6.36 5.21l0.18 0.18M6.54 5.21l-0.18 0.18\"/></g><g class=\"furniture\"><rect x=\"23\" y=\"2.5\" width=\"6\" height=\"3.5\" rx=\"0\"/><path d=\"M23 2.5l3 -1l3 1M23 4h6\"/><rect x=\"23.5\" y=\"3.1\" width=\"1.7\" height=\"0.65\" rx=\"0\"/><rect x=\"27.2\" y=\"3.1\" width=\"1.2\" height=\"2.3\" rx=\"0\"/></g><g class=\"garden-path\"><rect x=\"14\" y=\"5\" width=\"2\" height=\"19\" rx=\"0\"/><rect x=\"5\" y=\"11\" width=\"20\" height=\"2\" rx=\"0\"/><rect x=\"4\" y=\"21\" width=\"22\" height=\"2\" rx=\"0\"/><rect x=\"3\" y=\"7\" width=\"2\" height=\"14\" rx=\"0\"/><rect x=\"25\" y=\"7\" width=\"2\" height=\"14\" rx=\"0\"/><rect x=\"8\" y=\"2\" width=\"14\" height=\"1.5\" rx=\"0\"/></g><g class=\"garden-hedge\"><rect x=\"0.8\" y=\"9.7\" width=\"1.1\" height=\"10.5\" rx=\"0.45\"/><rect x=\"6.1\" y=\"14.1\" width=\"1.1\" height=\"5.8\" rx=\"0.45\"/><rect x=\"23\" y=\"14.1\" width=\"1.1\" height=\"5.8\" rx=\"0.45\"/><rect x=\"28.1\" y=\"9.7\" width=\"1.1\" height=\"10.5\" rx=\"0.45\"/><rect x=\"9.1\" y=\"7.3\" width=\"2.2\" height=\"2.1\" rx=\"0.5\"/><rect x=\"18.7\" y=\"7.3\" width=\"2.2\" height=\"2.1\" rx=\"0.5\"/><rect x=\"9.1\" y=\"15\" width=\"2.2\" height=\"2.5\" rx=\"0.5\"/><rect x=\"18.7\" y=\"15\" width=\"2.2\" height=\"2.5\" rx=\"0.5\"/></g><g class=\"furniture plant\"><circle cx=\"1.3\" cy=\"23\" r=\"0.55\"/><path d=\"M0.8875 23h0.8250000000000001M1.3 22.5875v0.8250000000000001M1.025 22.725l0.55 0.55M1.5750000000000002 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"23.1\" cy=\"23\" r=\"0.55\"/><path d=\"M22.6875 23h0.8250000000000001M23.1 22.5875v0.8250000000000001M22.825000000000003 22.725l0.55 0.55M23.375 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"3.1500000000000004\" cy=\"23\" r=\"0.55\"/><path d=\"M2.7375000000000003 23h0.8250000000000001M3.1500000000000004 22.5875v0.8250000000000001M2.8750000000000004 22.725l0.55 0.55M3.4250000000000003 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"24.8\" cy=\"23\" r=\"0.55\"/><path d=\"M24.3875 23h0.8250000000000001M24.8 22.5875v0.8250000000000001M24.525000000000002 22.725l0.55 0.55M25.075 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"5\" cy=\"23\" r=\"0.55\"/><path d=\"M4.5875 23h0.8250000000000001M5 22.5875v0.8250000000000001M4.725 22.725l0.55 0.55M5.275 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"26.5\" cy=\"23\" r=\"0.55\"/><path d=\"M26.0875 23h0.8250000000000001M26.5 22.5875v0.8250000000000001M26.225 22.725l0.55 0.55M26.775 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"6.8500000000000005\" cy=\"23\" r=\"0.55\"/><path d=\"M6.437500000000001 23h0.8250000000000001M6.8500000000000005 22.5875v0.8250000000000001M6.575 22.725l0.55 0.55M7.125000000000001 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"28.200000000000003\" cy=\"23\" r=\"0.55\"/><path d=\"M27.7875 23h0.8250000000000001M28.200000000000003 22.5875v0.8250000000000001M27.925000000000004 22.725l0.55 0.55M28.475 22.725l-0.55 0.55\"/></g><g class=\"furniture plant\"><circle cx=\"3.8\" cy=\"15.5\" r=\"1.1\"/><path d=\"M2.9749999999999996 15.5h1.6500000000000001M3.8 14.675v1.6500000000000001M3.25 14.95l1.1 1.1M4.35 14.95l-1.1 1.1\"/></g><g class=\"furniture plant\"><circle cx=\"26.3\" cy=\"16.5\" r=\"1.1\"/><path d=\"M25.475 16.5h1.6500000000000001M26.3 15.675v1.6500000000000001M25.75 15.95l1.1 1.1M26.85 15.95l-1.1 1.1\"/></g><g class=\"ritual-symbol\"><circle cx=\"15\" cy=\"12\" r=\"3.05\"/><circle cx=\"15\" cy=\"12\" r=\"2.7\"/><circle cx=\"15\" cy=\"12\" r=\"0.85\"/><path d=\"M15 8.95l2.9 4.0h-5.8ZM15 15.05l-2.9 -4h5.8Z\"/><circle cx=\"18.45\" cy=\"12\" r=\"0.12\"/><circle cx=\"17.43951839509359\" cy=\"14.43951839509359\" r=\"0.12\"/><circle cx=\"15\" cy=\"15.45\" r=\"0.12\"/><circle cx=\"12.56048160490641\" cy=\"14.43951839509359\" r=\"0.12\"/><circle cx=\"11.55\" cy=\"12\" r=\"0.12\"/><circle cx=\"12.56048160490641\" cy=\"9.56048160490641\" r=\"0.12\"/><circle cx=\"15\" cy=\"8.55\" r=\"0.12\"/><circle cx=\"17.43951839509359\" cy=\"9.56048160490641\" r=\"0.12\"/></g><g class=\"furniture\"><rect x=\"8.9\" y=\"2.8\" width=\"2.8\" height=\"0.65\" rx=\"0.15\"/><rect x=\"9.1\" y=\"2.9499999999999997\" width=\"2.4\" height=\"0.35000000000000003\" rx=\"0.1\"/><path d=\"M10.3 3V3.2499999999999996\"/></g><g class=\"furniture\"><rect x=\"18.3\" y=\"2.8\" width=\"2.8\" height=\"0.65\" rx=\"0.15\"/><rect x=\"18.5\" y=\"2.9499999999999997\" width=\"2.4\" height=\"0.35000000000000003\" rx=\"0.1\"/><path d=\"M19.7 3V3.2499999999999996\"/></g><g class=\"furniture\"><path d=\"M12 4h6M12 4.3h6M12 4.6h6\"/></g></g><g transform=\"translate(150 154) scale(20)\" pointer-events=\"none\"></g><g class=\"dimension\"><path d=\"M150 140h600M150 135v10M750 135v10\"/><path d=\"M136 154v480M131 154h10M131 634h10\"/></g><text class=\"dimension-label\" text-anchor=\"middle\" x=\"450\" y=\"135\">30.0 m</text><text class=\"dimension-label\" text-anchor=\"middle\" transform=\"translate(127 394) rotate(-90)\">24.0 m</text><g data-connection=\"estate-rear-door\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M14.2 0h1.6\"/><path class=\"door-line\" d=\"M14.2 0v1.6\"/><path class=\"door-arc\" d=\"M14.2 1.6A1.6 1.6 0 0 0 15.8 0\"/></g><g data-connection=\"terrace-east\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M8 2.25v1.5\"/><path class=\"door-line\" d=\"M8 2.25h1.5\"/><path class=\"door-arc\" d=\"M9.5 2.25A1.5 1.5 0 0 1 8 3.75\"/></g><g data-connection=\"terrace-service\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M22 2.25v1.5\"/></g><g data-connection=\"glasshouse-walk\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M3.25 7h1.5\"/><path class=\"door-line\" d=\"M3.25 7v1.5\"/><path class=\"door-arc\" d=\"M3.25 8.5A1.5 1.5 0 0 0 4.75 7\"/></g><g data-connection=\"service-west\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M25.25 7h1.5\"/></g><g data-connection=\"terrace-lawn\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M13.5 5h3\"/></g><g data-connection=\"east-lawn\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M8 11v2\"/></g><g data-connection=\"west-lawn\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M22 11v2\"/></g><g data-connection=\"lawn-gate\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M13.5 19h3\"/></g><g data-connection=\"east-gate\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M8 21v2\"/></g><g data-connection=\"west-gate\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M22 21v2\"/></g><g data-connection=\"garden-gate\" transform=\"translate(150 154) scale(20)\"><path class=\"door-gap\" d=\"M13.75 24h2.5\"/><path class=\"door-line\" d=\"M13.75 24v2.5\"/><path class=\"door-arc\" d=\"M13.75 26.5A2.5 2.5 0 0 0 16.25 24\"/></g><g class=\"map-sheet-footer\"><g class=\"scale-bar\"><path d=\"M56 684h100M56 679v10M96 679v10M156 679v10\"/><path d=\"M56 684h40\" stroke-width=\"4\"/><text class=\"scale-label\" x=\"56\" y=\"705\">0</text><text class=\"scale-label\" x=\"96\" y=\"705\" text-anchor=\"middle\">2</text><text class=\"scale-label\" x=\"156\" y=\"705\" text-anchor=\"middle\">5 m</text></g><text class=\"note\" x=\"855\" y=\"679\" text-anchor=\"end\">1格＝1米 · 门弧表示开启方向</text><text class=\"note\" x=\"855\" y=\"699\" text-anchor=\"end\">图上为南，图下为北 · 顶部门衔接第三幕</text><text class=\"subhead\" x=\"44\" y=\"730\">中央仪式范围仅作示意 / 北侧铁门通庄园外径</text></g></svg>\n"
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = { STORY_MAPS }; }
