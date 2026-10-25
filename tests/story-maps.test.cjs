const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { STORY } = require('../data/story.js');
const { STORY_MAPS } = require('../data/story-maps.js');

const near = (a, b) => Math.abs(a - b) < 1e-6;
const onBoundary = (p, b) => p.x >= b[0] && p.x <= b[0] + b[2] && p.y >= b[1] && p.y <= b[1] + b[3] &&
  (near(p.x, b[0]) || near(p.x, b[0] + b[2]) || near(p.y, b[1]) || near(p.y, b[1] + b[3]));

test('四幕地图为独立本地SVG，内联与资源逐字节相同且没有外链', () => {
  assert.deepEqual(STORY_MAPS.map(m => m.actId), [1, 2, 3, 4]);
  for (const m of STORY_MAPS) {
    assert.equal(m.svg, fs.readFileSync(path.join(__dirname, '..', m.file), 'utf8'));
    assert.match(m.svg, /<svg[^>]+viewBox="0 0 \d+ \d+"/);
    assert.match(m.svg, /<title[^>]*>/);
    assert.match(m.svg, /class="scale-bar"/);
    assert.match(m.svg, /class="north-arrow"/);
    assert.doesNotMatch(m.svg, /(?:href\s*=\s*["']https?:|url\(https?:|<image|<script|foreignObject)/i);
    assert.ok(m.area && m.scale === '1格＝1米');
    const svgIds = [...m.svg.matchAll(/\bid="([^"]+)"/g)].map(v => v[1]);
    assert.equal(new Set(svgIds).size, svgIds.length, 'SVG内ID唯一');
    assert.ok(svgIds.every(id => id.startsWith('map-' + m.actId + '-')), '地图间ID必须隔离');
    const css = m.svg.match(/<style>([\s\S]*?)<\/style>/)[1];
    for (const [, selectors] of css.matchAll(/([^{}]+)\{/g)) {
      assert.ok(selectors.split(',').every(s => s.trim().startsWith('#map-' + m.actId + '-root')), '内联CSS不污染页面其他SVG');
    }
  }
});

test('房间有效、线索索引来自现有剧情，空间不重叠且容纳于真实建筑边界', () => {
  for (const m of STORY_MAPS) {
    const act = STORY.acts.find(a => a.id === m.actId);
    assert.equal(new Set(m.rooms.map(r => r.id)).size, m.rooms.length);
    for (const r of m.rooms) {
      const floor = m.floors.find(f => f.id === r.floor);
      assert.ok(floor, `${m.actId}/${r.id} 楼层存在`);
      const [x,y,w,h] = r.bounds;
      assert.ok(x >= 0 && y >= 0 && w > 0 && h > 0 && x+w <= floor.width && y+h <= floor.height);
      assert.ok(r.description.length > 12);
      for (const clue of r.clues) assert.ok(Number.isInteger(clue) && clue >= 0 && clue < act.clues.length);
      assert.match(m.svg, new RegExp('data-room="' + r.id + '"[^>]*tabindex="0"[^>]*role="button"[^>]*aria-label="[^"]+"'));
      for (const s of m.rooms) {
        if (r.id >= s.id || r.floor !== s.floor) continue;
        const [a,b,c,d] = s.bounds;
        assert.ok(Math.min(x+w,a+c)-Math.max(x,a) <= 1e-6 || Math.min(y+h,b+d)-Math.max(y,b) <= 1e-6,
          `${r.id} 与 ${s.id} 不重叠`);
      }
    }
  }
});

test('所有房间经真实相邻门洞/楼梯与外部入口连通，门洞同时绘入SVG', () => {
  for (const m of STORY_MAPS) {
    const byId = new Map(m.rooms.map(r => [r.id, r]));
    const reached = new Set(['outside']);
    for (const c of m.connections) {
      const a = byId.get(c.from), b = byId.get(c.to);
      assert.ok(a, c.from);
      assert.ok(b || c.to === 'outside', c.to);
      assert.match(m.svg, new RegExp('data-connection="' + c.id + '"'));
      if (c.kind === 'stairs') {
        assert.notEqual(a.floor, b.floor);
        assert.equal(c.label, 'A');
      } else {
        assert.ok(c.width >= 1, `${c.id} 门洞至少1米`);
        assert.ok(onBoundary(c, a.bounds), `${c.id} 位于房间一的边界`);
        const ends = c.dir === 'h' ? [{x:c.x-c.width/2,y:c.y},{x:c.x+c.width/2,y:c.y}] : [{x:c.x,y:c.y-c.width/2},{x:c.x,y:c.y+c.width/2}];
        assert.ok(ends.every(p => onBoundary(p, a.bounds)), `${c.id} 完整门洞位于房间一的边界`);
        if (b) {
          assert.equal(a.floor, b.floor);
          assert.ok(onBoundary(c, b.bounds), `${c.id} 位于房间二的边界`);
          assert.ok(ends.every(p => onBoundary(p, b.bounds)), `${c.id} 完整门洞位于房间二的边界`);
        } else {
          const floor = m.floors.find(f => f.id === a.floor);
          assert.ok(onBoundary(c, [0,0,floor.width,floor.height]), `${c.id} 是外墙入口`);
        }
      }
    }
    let changed = true;
    while (changed) {
      changed = false;
      for (const c of m.connections) {
        if (reached.has(c.from) && !reached.has(c.to)) { reached.add(c.to); changed = true; }
        if (reached.has(c.to) && !reached.has(c.from)) { reached.add(c.from); changed = true; }
      }
    }
    assert.ok(m.rooms.every(r => reached.has(r.id)), `${m.actId} 所有房间都能由入口到达`);
  }
});

test('会所楼层并置且不是昼夜开关，宅邸与花园共享北向后门', () => {
  const auction = STORY_MAPS[1];
  assert.deepEqual(auction.floors.map(f => f.id), ['ground', 'basement']);
  assert.equal(auction.connections.filter(c => c.kind === 'stairs').length, 1);
  assert.ok(!auction.rooms.some(r => /幸存|买家住所/.test(r.name)));
  assert.equal(auction.rooms.filter(r => r.clues.includes(1)).length, 0, '异地买家访谈不搬进拍卖行');
  assert.equal(STORY_MAPS[2].estateDoor, STORY_MAPS[3].estateDoor);
  assert.equal(STORY_MAPS[2].estateDoorWidth, STORY_MAPS[3].estateDoorWidth, '同一宅后门宽度一致');
  assert.equal(STORY_MAPS[2].estateDoorEdge, 'north');
  assert.equal(STORY_MAPS[3].estateDoorEdge, 'south', '花园从南界接宅邸北侧后门');
  assert.equal(STORY_MAPS[3].north, 'down', '花园图朝南观看时，北向朝下');
  assert.ok(STORY_MAPS[3].rooms.find(r => r.id === 'ritual-lawn').clues.includes(0));
  assert.equal(STORY_MAPS[0].floors[0].width * STORY_MAPS[0].floors[0].height, 120);
  assert.equal(STORY_MAPS[2].floors[0].width * STORY_MAPS[2].floors[0].height, 320);
  assert.equal(STORY_MAPS[3].floors[0].width * STORY_MAPS[3].floors[0].height, 720);
});
