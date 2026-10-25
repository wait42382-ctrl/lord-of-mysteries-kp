const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
test('正式书目四类完整接入正文，引用没有悬空', () => {
  const { ARCHIVE_CATALOG:c }=require('../data/archives.js');
  assert.equal(c.books.length,19,'应有19本正式档案');
  assert.ok(fs.existsSync(path.join(root,'data/archive-content.js')),'应有可读取的正文');
  const { ARCHIVE_CONTENT:content }=require('../data/archive-content.js');
  const { ARCHIVE_ACTORS:actors }=require('../data/archive-actors.js');
  for(const b of c.books){
    assert.equal(b.placeholder,false,b.id);
    const d=content[b.id];assert.ok(d,b.id);assert.ok(d.sections.length>=4,b.id);
    assert.ok(JSON.stringify(d).length>600,'书籍必须有实质正文：'+b.id);
    if(d.actor)assert.ok(actors[d.actor],b.id);
    for(const s of d.sections)for(const l of s.links||[])assert.ok(content[l.book],'关联书存在：'+l.book);
  }
  assert.deepEqual(Object.keys(content).sort(),c.books.map(b=>b.id).sort());
});
test('NPC遵循示例人物小传与扮演结构，数值另附',()=>{
  assert.ok(fs.existsSync(path.join(root,'data/archive-content.js')));
  const c=require('../data/archive-content.js').ARCHIVE_CONTENT;
  for(let i=1;i<=5;i++)assert.deepEqual(c['persona-'+i].sections.map(s=>s.title),['人物描述','与埃德蒙·维尔德的关系','真相和线索','角色扮演要点','给守秘人的建议','模组之外']);
});
test('人物派生值按当前规则复算，旧安魂师数值完整保留',()=>{
  assert.ok(fs.existsSync(path.join(root,'data/archive-actors.js')));
  const actors=require('../data/archive-actors.js').ARCHIVE_ACTORS;
  const original=require('../data/character.js').CHARACTER_TEMPLATE;
  assert.deepEqual(actors.repose.attributes,original.attributes);
  assert.equal(actors.repose.resources.inspiration,21);assert.equal(actors.repose.resources.san,60);
  for(const a of Object.values(actors)){
    if(a.kind==='phenomenon') {assert.equal(a.attributes,null);continue;}
    assert.equal(Object.keys(a.attributes).length,8,a.name);
    assert.equal(a.resources.hp,Math.floor((a.attributes.CON+a.attributes.SIZ)/10),a.name);
    if(a.pathway) {
      const v=require('../data/spirituality.js').SPIRITUALITY.maximum(a.attributes.POW,a.attributes.INT,a.pathway.key,a.pathway.sequence);
      assert.equal(a.resources.inspiration,v.total,a.name);
    }
    for(const s of a.skills){assert.equal(s.hard,Math.floor(s.value/2));assert.equal(s.extreme,Math.floor(s.value/5));}
    for(const attack of a.attacks){assert.ok(attack.damage);assert.ok(Number.isInteger(attack.value));}
    if(a.budget){assert.equal(Object.values(a.base).reduce((n,v)=>n+v,0),460);assert.equal(a.budget.occupation,240);assert.equal(a.budget.interest,130);}
  }
  assert.equal(actors.holder.pathway.key,'abyss');assert.equal(actors.holder.pathway.sequence,5);
});
test('旧人物与敌人入口共享当前身份、资源和无实体标记',()=>{
 const a=require('../data/archive-actors.js').ARCHIVE_ACTORS;
 const npcs=require('../data/npcs.js').NPCS,enemies=require('../data/enemies.js').ENEMIES;
 assert.match(npcs.find(n=>n.key==='survivor-buyer').desc,/验货/);
 assert.equal(npcs.find(n=>n.key==='current-holder').name,a.holder.name);
 for(const[key,id]of[['corrupted-buyer','buyer'],['artifact-servant','servant'],['current-holder','holder']]){
  const e=enemies.find(e=>e.key===key);assert.equal(e.stats.HP,a[id].resources.hp,key);assert.equal(e.stats.inspiration,a[id].resources.inspiration,key);
 }
 assert.equal(enemies.find(e=>e.key==='mother-tree-projection').stats.HP,null,'现象不能显示可击杀的神明HP');
});
