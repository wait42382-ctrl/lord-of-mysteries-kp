const test=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../js/keeper-engine.js');
const {geometry,beveledGeometry}=require('../js/keeper-dice.js');
test('自定义表达式：多种骰、负数修正与有界输入',()=>{
 assert.deepEqual(engine.expression('1d6+1d8+3',()=>0).rolls,[1,1]);
 assert.equal(engine.expression('2d6-1d4-2',()=>.999).total,6);
 assert.equal(engine.expression('1d100',()=>.999).total,100);
 assert.equal(engine.expression('-3d6',()=>0).total,-3);
 for(const expr of ['','3','0d6','99999d6','1d0','1d1001','1d6;alert(1)','1d6+','1d6+100001'])assert.throws(()=>engine.parse(expr),expr);
});
test('奖励骰可视数据：只标记一个选中十位，零位数保持正确',()=>{
 const dice=engine.checkDice({unit:0,tens:[0,5,5],chosen:5});
 assert.equal(dice.length,4);assert.equal(dice.filter(d=>d.role==='tens'&&d.chosen).length,1);
 assert.equal(dice[1].label,'50');assert.equal(dice[3].value,0);
});
test('原生骰子几何：面数、共面、封闭边与一致外法线',()=>{
 for(const n of [4,6,8,10,12,20]){
  const m=geometry(n),edges=new Map();assert.equal(m.faces.length,n);
  for(const face of m.faces){
   const [a,b,c]=face.map(i=>m.vertices[i]),u=b.map((x,i)=>x-a[i]),v=c.map((x,i)=>x-a[i]);
   const normal=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
   const dot=(x,y)=>x.reduce((s,v,i)=>s+v*y[i],0);assert.ok(dot(normal,a)>0);
   for(const id of face)assert.ok(Math.abs(dot(normal,m.vertices[id])-dot(normal,a))<1e-7,'面必须共面');
   face.forEach((a,i)=>{const b=face[(i+1)%face.length],key=[a,b].sort((x,y)=>x-y).join(',');edges.set(key,(edges.get(key)||0)+1);});
  }
  for(const count of edges.values())assert.equal(count,2,'封闭多面体每边连接两面');
 }
 assert.equal(geometry(37).reel,true);
});
test('倒角网格为封闭实体，新增表面不增加编号',()=>{
 for(const sides of [4,6,8,10,12,20]){
  const mesh=beveledGeometry(sides),edges=new Map();
  assert.deepEqual(mesh.faces.filter(f=>f.number!==null).map(f=>f.number),Array.from({length:sides},(_,i)=>i));
  assert.ok(mesh.faces.length>sides*2);
  for(const face of mesh.faces){
   assert.ok(face.normal.reduce((sum,n,i)=>sum+n*face.middle[i],0)>0);
   face.ids.forEach((a,i)=>{const b=face.ids[(i+1)%face.ids.length],key=[a,b].sort((x,y)=>x-y).join(',');edges.set(key,(edges.get(key)||0)+1);});
  }
  for(const count of edges.values())assert.equal(count,2,'每条倒角边都必须由两面共享');
 }
});
