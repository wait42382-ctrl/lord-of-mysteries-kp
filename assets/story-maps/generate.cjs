/* 原生建筑平面图的离线生成源；网页不执行此文件。 */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const rect = (x,y,w,h,rx=0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
const line = (x1,y1,x2,y2) => `<path d="M${x1} ${y1}H${x2}"/>`;
const pth = d => `<path d="${d}"/>`;
const circle = (x,y,r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
const table = (x,y,w,h) => `<g class="furniture">${rect(x,y,w,h,.12)}${rect(x+.12,y+.12,w-.24,h-.24,.08)}</g>`;
const chair = (x,y,rot=0) => `<g class="furniture" transform="translate(${x} ${y}) rotate(${rot})">${rect(-.25,-.25,.5,.5,.06)}${pth('M-.32 .31H.32M-.32 .31V-.12M.32 .31V-.12')}</g>`;
const dining = (x,y,w,h) => table(x,y,w,h) + [0,1,2].map(i => chair(x+(i+.5)*w/3,y-.5,180)+chair(x+(i+.5)*w/3,y+h+.5)).join('');
const couch = (x,y,w,h=1) => `<g class="furniture">${rect(x,y,w,h,.15)}${rect(x+.2,y+.15,w-.4,h-.3,.1)}${pth(`M${x+w/2} ${y+.2}V${y+h-.2}`)}</g>`;
const desk = (x,y,w=2,h=.8) => table(x,y,w,h)+chair(x+w/2,y+h+.55)+`<g class="furniture">${rect(x+.2,y+.15,.4,.3)}${pth(`M${x+w-.55} ${y+.2}h.3m-.3 .12h.3`)}${circle(x+w-.3,y+h-.22,.08)}</g>`;
const bed = (x,y,w,h) => `<g class="furniture">${rect(x,y,w,h,.1)}${rect(x+.12,y+.15,w-.24,.45,.08)}${rect(x+.12,y+.7,w-.24,h-.85,.05)}${pth(`M${x+.15} ${y+1.05}h${w-.3}M${x+.15} ${y+h-.4}h${w-.3}`)}</g>`;
const shelves = (x,y,w,h=.45) => `<g class="furniture">${rect(x,y,w,h)}${Array.from({length:Math.floor(w/.16)},(_,i)=>pth(`M${x+.1+i*.16} ${y+.06}v${h-.12}`)).join('')}</g>`;
const plant = (x,y,r=.38) => `<g class="furniture plant">${circle(x,y,r)}${pth(`M${x-r*.75} ${y}h${r*1.5}M${x} ${y-r*.75}v${r*1.5}M${x-r*.5} ${y-r*.5}l${r} ${r}M${x+r*.5} ${y-r*.5}l-${r} ${r}`)}</g>`;
const rug = (x,y,w,h) => `<g class="rug">${rect(x,y,w,h,.03)}${rect(x+.15,y+.15,w-.3,h-.3,.02)}${pth(`M${x+w*.5} ${y+h*.25}l${w*.17} ${h*.25}l-${w*.17} ${h*.25}l-${w*.17} -${h*.25}Z`)}</g>`;
const stairs = (x,y,w,h,label='A') => `<g class="stairs furniture">${rect(x,y,w,h)}${Array.from({length:9},(_,i)=>pth(`M${x} ${y+(i+1)*h/10}h${w}`)).join('')}${pth(`M${x+w*.5} ${y+h*.85}V${y+h*.15}m-.18 .25l.18 -.25l.18 .25`)}</g>`;
const fireplace = (x,y,w=1.4) => `<g class="furniture">${rect(x,y,w,.4)}${rect(x+.15,y+.06,w-.3,.27)}${pth(`M${x+.35} ${y+.25}l.2 -.12l.2 .12l.2 -.12`)}</g>`;
const counter = (x,y,w,h) => `<g class="furniture">${rect(x,y,w,h)}${rect(x+.15,y+.12,.65,h-.24,.12)}${circle(x+w-.45,y+h/2,.22)}${circle(x+w-.9,y+h/2,.18)}</g>`;
const room = (id,name,floor,bounds,description,clues=[],label=null) => ({id,name,floor,bounds,description,clues,...(label?{label}: {})});
const door = (id,from,to,x,y,dir='h',width=1.1) => ({id,from,to,x,y,dir,width,kind:'door'});
const maps = [
  {
    actId:1,title:'受害者住所',subtitle:'煤气灯下的静默',area:'约120 m²',scale:'1格＝1米',file:'assets/story-maps/act-01.svg',
    floors:[{id:'ground',name:'首层 / GROUND FLOOR',width:12,height:10,x:216,y:164,p:39}],
    rooms:[
      room('drawing-room','起居室','ground',[0,0,4,4],'壁炉、两张扶手沙发与小茶几；南侧门通书房，东侧门接中央过厅。',[],[2,1.15]),
      room('study','书房','ground',[0,4,4,6],'靠墙书柜与窗边书桌，中央留出翻查空间；票据与残留污染按既有剧情供KP描述。',[0,2],[2,6.1]),
      room('hall','门厅 / 过厅','ground',[4,0,3,10],'南端为临街正门与衣帽架；贯通房屋中央，连接起居室、书房、卧房、厨房及餐室。',[],[5.5,4.55]),
      room('bedroom','卧房','ground',[7,0,5,4],'双人床、衣橱与床头柜，临北侧及东侧窗；受害者与血液残留线索在此供KP描述。',[1,3],[9.5,1.12]),
      room('kitchen','厨房','ground',[7,4,5,3],'灶台、洗槽、木质工作台与储物柜；西门接过厅，东侧服务后门可直出。',[],[9.5,4.72]),
      room('dining-room','餐室','ground',[7,7,5,3],'小型六人餐桌与边柜；西门通中央过厅，南侧两扇窗面向街道。',[],[9.5,7.65])
    ],
    connections:[door('front-entry','hall','outside',5.5,10,'h',1.3),door('hall-drawing','hall','drawing-room',4,2.7,'v'),door('hall-study','hall','study',4,6.7,'v'),door('hall-bedroom','hall','bedroom',7,2.7,'v'),door('hall-kitchen','hall','kitchen',7,5.7,'v'),door('hall-dining','hall','dining-room',7,8.5,'v'),door('drawing-study','drawing-room','study',1.2,4),door('kitchen-back','kitchen','outside',12,5.8,'v')],
    windows:{ground:[[.7,0,2.5,0],[8,0,11,0],[0,.7,0,2.5],[0,5,0,6.5],[0,8,0,9.3],[8,10,11,10],[12,.7,12,2.5],[12,7.7,12,9.1]]},
    furniture:{ground: fireplace(1.3,.15)+couch(.45,1.9,1.1,1.4)+couch(2.55,1.9,1,1.4)+table(1.7,2.05,.6,1)+rug(.65,1.7,2.75,1.85)+shelves(2.2,4.3,1.4)+shelves(.3,5.5,.45,2)+desk(.45,8.45,2.3)+rug(.7,5.9,2.5,1.5)+bed(8.5,1.65,1.65,2.05)+table(8,1.25,.4,.45)+table(10.3,1.75,.4,.55)+shelves(10.85,.45,.6,2.4)+counter(8,6,3.25,.65)+table(9.2,5.05,1.4,.65)+dining(8.35,8.6,2.3,.6)+shelves(11.25,7.7,.45,1.7)+rug(4.4,7.8,2.2,1.2)+plant(4.55,.6,.28)+table(6.3,8.1,.4,1.4)},
    notes:['南：临街正门','东：服务后门','仅首层 · 6个空间']
  },
  {
    actId:2,title:'拍卖会所',subtitle:'同一建筑 · 地面接待 / 地下拍卖',area:'两层合计约360 m²',scale:'1格＝1米',file:'assets/story-maps/act-02.svg',svgWidth:1000,
    floors:[{id:'ground',name:'地面会所 / GROUND FLOOR',width:15,height:12,x:70,y:218,p:25},{id:'basement',name:'地下拍卖 / BASEMENT',width:15,height:12,x:555,y:218,p:25}],
    rooms:[
      room('records','记录室','ground',[0,0,5,5],'封闭书柜、账簿桌与文件柜；东门接内过厅，交易记录与封印物去向沿用原剧情。',[0,2],[2.5,1.55]),
      room('parlor','会客厅','ground',[0,5,5,7],'壁炉、长沙发与两组洽谈席；东门接迎宾厅，可作KP描述接待活动的空间。',[],[2.5,6.05]),
      room('inner-hall','内过厅','ground',[5,0,5,7],'连接记录室、迎宾厅和楼梯间的主通路；北侧后门通服务巷。',[],[7.5,2]),
      room('reception','迎宾厅','ground',[5,7,5,5],'临街双扇门、接待台与衣帽寄存入口；白天关闭、夜间迎客由KP按到访时间判断。',[],[7.5,8.1]),
      room('cloakroom','衣帽间','ground',[10,5,5,7],'沿墙衣帽钩、伞架和长柜；西门接迎宾厅，北门通服务楼梯间。',[],[12.5,6.05]),
      room('service-stair','服务楼梯 A','ground',[10,0,5,5],'双跑楼梯向下接地下同标记A；西门接内过厅，南门接衣帽间。',[],[12.5,.9]),
      room('auction-hall','拍卖厅','basement',[0,0,10,8],'低矮讲台、空展台与三列座席；东门通楼梯前室，南侧双门接候拍区。',[],[5,1.0]),
      room('stair-landing','楼梯前室 A','basement',[10,0,5,5],'与地面服务楼梯A对应；西门直通拍卖厅，南门通备品间。',[],[12.5,.9]),
      room('preparation','备品间','basement',[10,5,5,7],'壁柜、空木箱与工作台；北通楼梯前室，西门接候拍区，形成服务动线。',[],[12.5,6.05]),
      room('auction-foyer','候拍区','basement',[0,8,10,4],'长凳、边桌与等候位置；北侧双门进拍卖厅，东门接备品间。',[],[5,8.85])
    ],
    connections:[door('club-front','reception','outside',7.5,12,'h',1.6),door('club-back','inner-hall','outside',7.5,0,'h',1.2),door('entry-inner','reception','inner-hall',7.5,7,'h',1.5),door('entry-parlor','reception','parlor',5,9.7,'v',1.3),door('entry-cloak','reception','cloakroom',10,9.7,'v'),door('inner-records','inner-hall','records',5,3.4,'v'),door('inner-stair','inner-hall','service-stair',10,3.2,'v'),door('cloak-stair','cloakroom','service-stair',12.8,5),{id:'stair-a',from:'service-stair',to:'stair-landing',kind:'stairs',label:'A'},door('stair-auction','stair-landing','auction-hall',10,3.25,'v',1.3),door('stair-prep','stair-landing','preparation',12.8,5),door('auction-foyer','auction-hall','auction-foyer',5,8,'h',1.8),door('foyer-prep','auction-foyer','preparation',10,10.2,'v')],
    windows:{ground:[[.8,0,3.9,0],[0,6.4,0,8.8],[0,9.7,0,11.3],[11,12,14,12],[12.5,0,14.3,0],[15,6.5,15,9.5]]},
    furniture:{ground:shelves(.35,.3,.6,2.6)+shelves(3.95,.4,.55,2.2)+desk(1.7,3.3,2.3,.8)+fireplace(.9,5.2,2)+couch(.55,7.2,3.8,1.1)+couch(.55,10,3.8,1.1)+table(1.55,8.65,1.8,.7)+rug(.7,7.1,3.5,4.25)+plant(5.55,.7)+table(6,10.1,3,.7)+table(10.6,7.1,.7,3.6)+shelves(13.9,6.2,.7,4.6)+stairs(11.15,1.6,1.15,2.7)+stairs(12.65,1.6,1.15,2.7)+pth('M12.3 1.6h.3M12.3 4.3h.3'),basement:table(2.9,1.8,4.2,.8)+table(4.3,3.15,1.4,.9)+Array.from({length:3},(_,r)=>Array.from({length:5},(_,i)=>chair(1.6+i*1.65,5+r*.85,180)).join('')).join('')+stairs(11.15,1.6,1.15,2.7)+stairs(12.65,1.6,1.15,2.7)+shelves(14.1,5.4,.5,1.5)+table(10.6,7.8,1.4,2.5)+table(13.1,7.8,1.35,2.5)+table(10.7,11,3.3,.55)+couch(.7,10.4,3.4,.65)+couch(5.7,10.4,3.4,.65)+table(4.6,9.6,.8,1.4)},
    notes:['白天与夜晚共用这一组户型','两处 A 为同一楼梯','幸存买家处在本图之外']
  },
  {
    actId:3,title:'富商宅邸',subtitle:'木饰面后的欲望',area:'首层约320 m²',scale:'1格＝1米',file:'assets/story-maps/act-03.svg',estateDoor:'estate-rear-door',estateDoorWidth:1.6,estateDoorEdge:'north',
    floors:[{id:'ground',name:'宅邸首层 / MANOR GROUND',width:20,height:16,x:180,y:170,p:27}],
    rooms:[
      room('library','藏书室','ground',[0,0,8,9],'落地书架、阅读桌、窗下扶手椅与壁炉；东门接后廊，供探索时描述遮蔽与视线。',[],[4,1.7]),
      room('drawing-room','会客厅','ground',[0,9,8,7],'成组长沙发、中央地毯与壁炉；东侧双门连接前厅，适合宅邸内接触与周旋。',[],[4,10.35]),
      room('rear-gallery','后廊','ground',[8,0,4,9],'南接前厅，左右通藏书室、书房与藏品室；北端后门直达第四幕同一庄园花园。',[],[10,4.15]),
      room('entrance','前厅','ground',[8,9,4,7],'南端双扇正门与石阶，中央保留宽阔通道；向北接后廊，左右通会客厅及餐厅。',[],[10,11.15]),
      room('holder-study','书房','ground',[12,0,8,5],'大书桌、壁柜与仪式准备工作台；西门接后廊，准备现场线索由既有剧情裁定。',[1],[16,1.7]),
      room('exhibition','藏品室','ground',[12,5,8,4],'中央陈列桌以玻璃罩和呢绒垫平面符号标记；不新增或改画拜祭之指本体。',[0],[16,5.85]),
      room('dining-room','餐厅','ground',[12,9,8,7],'八人长桌、餐边柜与侧窗；西门接前厅，东侧服务门可出入。',[],[16,10.25])
    ],
    connections:[door('manor-front','entrance','outside',10,16,'h',1.8),door('estate-rear-door','rear-gallery','outside',10,0,'h',1.6),door('entrance-rear','entrance','rear-gallery',10,9,'h',2),door('entrance-drawing','entrance','drawing-room',8,12.5,'v',1.8),door('entrance-dining','entrance','dining-room',12,12.5,'v',1.6),door('gallery-library','rear-gallery','library',8,5.8,'v',1.6),door('gallery-study','rear-gallery','holder-study',12,2.9,'v',1.3),door('gallery-exhibit','rear-gallery','exhibition',12,7.2,'v',1.4),door('dining-service','dining-room','outside',20,13,'v',1.2)],
    windows:{ground:[[1,0,3.2,0],[4.8,0,7,0],[13,0,15.6,0],[17.3,0,19.1,0],[0,1.5,0,3.7],[0,6,0,8],[0,10.2,0,12.2],[0,13.3,0,15.2],[1,16,3.2,16],[5,16,7.1,16],[13.3,16,15.8,16],[17.4,16,19,16],[20,1,20,3.5],[20,5.8,20,8.3],[20,9.8,20,11.4]]},
    furniture:{ground:shelves(.4,.4,7.1)+shelves(.4,1.3,.6,5.8)+shelves(6.95,1.3,.6,3.4)+desk(2.6,3.4,2.8,1.2)+rug(1.7,2.8,4.7,3.5)+fireplace(2.9,8.4,2.2)+couch(1.3,6.7,1.2,1.2)+couch(5.4,6.7,1.2,1.2)+fireplace(2.9,9.15,2.2)+couch(1.2,11.1,5.5,1.15)+couch(1.2,14,5.5,1.15)+table(3.05,12.75,1.8,.8)+rug(1.35,10.8,5.2,4.55)+plant(8.65,.7)+plant(11.35,.7)+rug(8.5,13.7,3,1.4)+table(8.5,9.6,.4,2.5)+plant(11.2,15.1)+desk(14.4,2.25,3.2,1.1)+shelves(12.5,.4,6.8)+table(18.7,1.7,.7,2.6)+table(14.9,6.6,2.2,1.25)+`<g class="furniture artifact-symbol">${rect(15.2,6.82,1.6,.8,.08)}${rect(15.48,6.95,1.05,.52,.04)}${pth('M15.35 7.5v-.6a.75 .4 0 0 1 1.3 0v.6')}${circle(16,7.19,.18)}</g>`+shelves(18.9,5.5,.6,2.8)+dining(14.5,11.7,3.3,1.8)+chair(14,12.6,90)+chair(18.3,12.6,-90)+shelves(12.65,15.1,5.5,.5)},
    notes:['北侧后门 → 同一庄园花园','南：主入口 / 东：服务门','仅首层 · 7个空间']
  },
  {
    actId:4,title:'庄园院落与花园',subtitle:'夜色中的降临仪式',area:'约720 m²',scale:'1格＝1米',file:'assets/story-maps/act-04.svg',estateDoor:'estate-rear-door',estateDoorWidth:1.6,estateDoorEdge:'south',
    floors:[{id:'garden',name:'庄园后园 / MANOR GARDEN',width:30,height:24,x:150,y:154,p:20}],
    rooms:[
      room('glasshouse','玻璃温室','garden',[0,0,8,7],'砖基与玻璃框架的小温室，内部为花架和中央过道；北门通东侧树篱径。',[],[4,1.2]),
      room('east-hedge-walk','东侧树篱径','garden',[0,7,8,17],'修剪树篱、石径与长凳；南接温室，向西有两处开口连中央草坪和北门区。',[],[4,8.35]),
      room('terrace','宅后石台','garden',[8,0,14,5],'顶部为第三幕宅邸的北侧后门，石阶下接草坪；左右各有通往温室区和园务小院的通路。',[],[15,1.3]),
      room('service-court','园务小院','garden',[22,0,8,7],'石铺地、木质园务棚与堆放园具的边台；东接宅后石台，北接西侧步道。',[],[26,1.2]),
      room('west-walk','西侧步道','garden',[22,7,8,17],'树丛、园墙和沿墙石径；可从草坪侧开口通行，向北连出入口区域。',[],[26,8.35]),
      room('ritual-lawn','仪式草坪','garden',[8,5,14,14],'草坪中央为既有降临仪式现场，图中圆形仅作范围示意；四向石径接石台、侧径与北门。',[0],[15,6.25]),
      room('north-gate','北门与外径','garden',[8,19,14,5],'庄园后园铁门与横向石径，向南到仪式草坪，左右连两条侧径；门外为庄园道路。',[],[15,20.25])
    ],
    connections:[door('estate-rear-door','terrace','outside',15,0,'h',1.6),door('terrace-east','terrace','glasshouse',8,3,'v',1.5),door('terrace-service','terrace','service-court',22,3,'v',1.5),door('glasshouse-walk','glasshouse','east-hedge-walk',4,7,'h',1.5),door('service-west','service-court','west-walk',26,7,'h',1.5),door('terrace-lawn','terrace','ritual-lawn',15,5,'h',3),door('east-lawn','east-hedge-walk','ritual-lawn',8,12,'v',2),door('west-lawn','west-walk','ritual-lawn',22,12,'v',2),door('lawn-gate','ritual-lawn','north-gate',15,19,'h',3),door('east-gate','east-hedge-walk','north-gate',8,22,'v',2),door('west-gate','west-walk','north-gate',22,22,'v',2),door('garden-gate','north-gate','outside',15,24,'h',2.5)],
    windows:{garden:[]},
    furniture:{garden:`<g class="glasshouse furniture">${rect(.7,2.2,6.6,4.1)}${pth('M.7 3.5h6.6M.7 4.9h6.6M2.3 2.2v4.1M4 2.2v4.1M5.7 2.2v4.1')}${rect(1,2.5,1.1,3.5)}${rect(5.9,2.5,1.1,3.5)}</g>`+Array.from({length:6},(_,i)=>plant(1.55,2.8+i*.5,.18)+plant(6.45,2.8+i*.5,.18)).join('')+`<g class="furniture">${rect(23,2.5,6,3.5)}${pth('M23 2.5l3 -1l3 1M23 4h6')}${rect(23.5,3.1,1.7,.65)}${rect(27.2,3.1,1.2,2.3)}</g>`+`<g class="garden-path">${rect(14,5,2,19)}${rect(5,11,20,2)}${rect(4,21,22,2)}${rect(3,7,2,14)}${rect(25,7,2,14)}${rect(8,2,14,1.5)}</g>`+`<g class="garden-hedge">${rect(.8,9.7,1.1,10.5,.45)}${rect(6.1,14.1,1.1,5.8,.45)}${rect(23,14.1,1.1,5.8,.45)}${rect(28.1,9.7,1.1,10.5,.45)}${rect(9.1,7.3,2.2,2.1,.5)}${rect(18.7,7.3,2.2,2.1,.5)}${rect(9.1,15,2.2,2.5,.5)}${rect(18.7,15,2.2,2.5,.5)}</g>`+Array.from({length:4},(_,i)=>plant(1.3+i*1.85,23,.55)+plant(23.1+i*1.7,23,.55)).join('')+plant(3.8,15.5,1.1)+plant(26.3,16.5,1.1)+`<g class="ritual-symbol">${circle(15,12,3.05)}${circle(15,12,2.7)}${circle(15,12,.85)}${pth('M15 8.95l2.9 4.0h-5.8ZM15 15.05l-2.9 -4h5.8Z')}${[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return circle(15+Math.cos(a)*3.45,12+Math.sin(a)*3.45,.12)}).join('')}</g>`+couch(8.9,2.8,2.8,.65)+couch(18.3,2.8,2.8,.65)+`<g class="furniture">${pth('M12 4h6M12 4.3h6M12 4.6h6')}</g>`},
    notes:['图上为南，图下为北 · 顶部门衔接第三幕','中央仪式范围仅作示意','北侧铁门通庄园外径']
  }
];

function style(m){ const css = `
svg{font-family:"Noto Serif SC","Songti SC","SimSun",serif;background:#111315;color:#c7cac7}
text{fill:#c9cecb;stroke:none;user-select:none}.headline{font-size:25px;letter-spacing:4px}.subhead{fill:#85928e;font-size:11px;letter-spacing:2px}.floor-title{font-size:12px;letter-spacing:2px;fill:#aab8b1}
.wall-shadow{fill:none;stroke:#383d3d;stroke-width:.27}.wall{fill:none;stroke:#b5bab8;stroke-width:.105}.outer{stroke-width:.17;stroke:#c4c7c3}.floor-grid{opacity:.2}.room-zone{outline:none;cursor:pointer}.room-floor{fill:#b2c4bb;fill-opacity:.015;stroke:none}.room-zone:hover .room-floor,.room-zone:focus .room-floor{fill:#b1bdb5;fill-opacity:.12}.room-zone.is-selected .room-floor{fill:#a63847;fill-opacity:.23}
.room-label{font-size:16px;letter-spacing:1.4px;pointer-events:none}.room-number{font:10px Georgia,serif;letter-spacing:2px;fill:#7b9188;pointer-events:none}.room-zone.is-selected .room-label{fill:#eee5da}.room-zone.is-selected .room-number{fill:#c66b75}
.furniture{fill:none;stroke:#8c9691;stroke-width:.04;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}.rug{fill:none;stroke:#65786d;stroke-width:.025;stroke-dasharray:.13 .07;pointer-events:none}.door-gap{stroke:#111315;stroke-width:.35;fill:none}.door-line{stroke:#9ba99f;stroke-width:.04;fill:none}.door-arc{stroke:#7c9187;stroke-width:.025;fill:none;stroke-dasharray:.09 .05}.window-gap{stroke:#111315;stroke-width:.25}.window-line{stroke:#bdd1c7;stroke-width:.035;fill:none}.dimension{stroke:#707f78;stroke-width:1;fill:none}.dimension-label{font:10px Georgia,serif;letter-spacing:1.4px;fill:#859b8e}.note{font-size:11px;fill:#83948b;letter-spacing:1px}.scale-bar{stroke:#b5c0b6;fill:none;stroke-width:1}.scale-label{font:11px Georgia,serif;fill:#9eafa3}.north-arrow{stroke:#a8b9ad;fill:none;stroke-width:1}.north-label{font:12px Georgia,serif;fill:#b8c6bb}.thin-rule{stroke:#5d7066;stroke-width:1}.garden-path{fill:#73877b;fill-opacity:.10;stroke:#7d9285;stroke-opacity:.5;stroke-width:.025;pointer-events:none}.garden-hedge{fill:#586f5b;fill-opacity:.16;stroke:#789580;stroke-width:.05;stroke-dasharray:.12 .1;pointer-events:none}.ritual-symbol{fill:none;stroke:#98515a;stroke-width:.055;pointer-events:none}.stairs-link{font:11px Georgia,serif;letter-spacing:1px;fill:#c1b8a4}.room-marker{fill:#b65761;stroke:#c38489;stroke-width:1}.artifact-symbol{stroke:#b4b6a4}
`; return '<style>' + css.replace(/([^{}]+)\{/g, (_, selectors) => selectors.split(',').map(s => s.trim() === 'svg' ? '#map-'+m.actId+'-root' : '#map-'+m.actId+'-root '+s.trim()).join(',')+'{') + '</style>'; }

function drawDoor(c,m){
  if(c.kind==='stairs') return `<g data-connection="${c.id}" class="stairs-link"><path d="M475 350h50m-7 -5l7 5l-7 5" stroke="#7c9687" fill="none"/><text x="500" y="338" text-anchor="middle">A ⇄ A</text></g>`;
  const r=m.rooms.find(r=>r.id===c.from),f=m.floors.find(f=>f.id===r.floor);
  const w=c.width/2; const x=c.x,y=c.y; let d,leaf,arc;
  if(c.dir==='h'){d=`M${x-w} ${y}h${c.width}`;leaf=`M${x-w} ${y}v${c.width}`;arc=`M${x-w} ${y+c.width}A${c.width} ${c.width} 0 0 0 ${x+w} ${y}`;}
  else{d=`M${x} ${y-w}v${c.width}`;leaf=`M${x} ${y-w}h${c.width}`;arc=`M${x+c.width} ${y-w}A${c.width} ${c.width} 0 0 1 ${x} ${y+w}`;}
  // 园路开口只保留门洞，建筑门保留门扇与开门弧；庄园两端门仍画门扇。
  const gardenOpen=m.actId===4 && !['estate-rear-door','garden-gate','glasshouse-walk','terrace-east'].includes(c.id);
  return `<g data-connection="${c.id}" transform="translate(${f.x} ${f.y}) scale(${f.p})"><path class="door-gap" d="${d}"/>${gardenOpen?'':`<path class="door-line" d="${leaf}"/><path class="door-arc" d="${arc}"/>`}</g>`;
}

function northArrow(m,W){
  const down=m.north==='down';
  return `<g class="north-arrow" aria-label="${down?'北向下':'北向上'}" transform="translate(${W-62} 63)"><path d="${down?'M0 -18V20M-6 9L0 20L6 9M-15 -4H15':'M0 28V-10M-6 1L0-10L6 1M-15 14H15'}"/><path d="${down?'M0 20L-4 10H0Z':'M0 -10L-4 0H0Z'}" fill="#a8b9ad"/><text class="north-label" x="0" y="${down?38:-19}" text-anchor="middle">N</text></g>`;
}

function embeddedBounds(m){
  const left=Math.min(...m.floors.map(f=>f.x-34));
  const top=Math.min(...m.floors.map(f=>f.y-44));
  let right=Math.max(...m.floors.map(f=>f.x+f.width*f.p+12));
  let bottom=Math.max(...m.floors.map(f=>f.y+f.height*f.p+12));
  for(const c of m.connections.filter(c=>c.to==='outside')){
    const r=m.rooms.find(r=>r.id===c.from),f=m.floors.find(f=>f.id===r.floor);
    if(c.dir==='v') right=Math.max(right,f.x+(c.x+c.width)*f.p+10);
    if(c.dir==='h') bottom=Math.max(bottom,f.y+(c.y+c.width)*f.p+10);
  }
  return [Math.floor(left),Math.floor(top),Math.ceil(right-left),Math.ceil(bottom-top)];
}

function render(m){
  const W=m.svgWidth||900,H=740,prefix='map-'+m.actId+'-';
  let defs=m.floors.map(f=>`<pattern id="${prefix}grid-${f.id}" width="${f.p}" height="${f.p}" patternUnits="userSpaceOnUse" x="${f.x}" y="${f.y}"><path d="M${f.p} 0H0V${f.p}" fill="none" stroke="#8b9992" stroke-width=".7"/></pattern>`).join('');
  let content='';
  for(const f of m.floors){
    const fw=f.width*f.p,fh=f.height*f.p;
    content+=`<text class="floor-title" x="${f.x}" y="${f.y-30}">${esc(f.name)}</text><rect x="${f.x}" y="${f.y}" width="${fw}" height="${fh}" fill="#111315"/><rect class="floor-grid" x="${f.x}" y="${f.y}" width="${fw}" height="${fh}" fill="url(#${prefix}grid-${f.id})"/>`;
    content+=m.rooms.filter(r=>r.floor===f.id).map(r=>{const[x,y,w,h]=r.bounds;const [lx,ly]=r.label||[x+w/2,y+.8];return `<g class="room-zone" data-room="${r.id}" tabindex="0" role="button" aria-label="${esc(r.name+'：'+r.description)}"><rect class="room-floor" x="${f.x+x*f.p+3}" y="${f.y+y*f.p+3}" width="${w*f.p-6}" height="${h*f.p-6}"/><text class="room-number" x="${f.x+lx*f.p}" y="${f.y+ly*f.p-16}" text-anchor="middle">${String(m.rooms.indexOf(r)+1).padStart(2,'0')}</text><text class="room-label" x="${f.x+lx*f.p}" y="${f.y+ly*f.p}" text-anchor="middle">${esc(r.name)}</text>${r.clues.length?`<circle class="room-marker" cx="${f.x+(x+w)*f.p-10}" cy="${f.y+(y+h)*f.p-10}" r="2.5"/>`:''}</g>`}).join('');
    let walls=m.rooms.filter(r=>r.floor===f.id && (m.actId!==4 || r.id==='glasshouse')).map(r=>{const[x,y,w,h]=r.bounds;return `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`}).join('');
    content+=`<g transform="translate(${f.x} ${f.y}) scale(${f.p})" pointer-events="none"><g class="wall-shadow">${walls}</g><g class="wall">${walls}</g><rect class="wall outer" x="0" y="0" width="${f.width}" height="${f.height}"/>${m.furniture[f.id]||''}</g>`;
    const wins=m.windows[f.id]||[];
    content+=`<g transform="translate(${f.x} ${f.y}) scale(${f.p})" pointer-events="none">${wins.map(([a,b,c,d])=>{const horizontal=b===d;const glass=horizontal?`M${a} ${b-.065}L${c} ${d-.065}M${a} ${b+.065}L${c} ${d+.065}`:`M${a-.065} ${b}L${c-.065} ${d}M${a+.065} ${b}L${c+.065} ${d}`;return `<path class="window-gap" d="M${a} ${b}L${c} ${d}"/><path class="window-line" d="${glass}"/>${horizontal?`<path class="window-line" d="M${(a+c)/2} ${b-.12}v.24"/>`:`<path class="window-line" d="M${a-.12} ${(b+d)/2}h.24"/>`}`}).join('')}</g>`;
    // 水平尺寸线与四角测量刻线，标注世界单位米。
    const dy=f.y-14;
    content+=`<g class="dimension"><path d="M${f.x} ${dy}h${fw}M${f.x} ${dy-5}v10M${f.x+fw} ${dy-5}v10"/><path d="M${f.x-14} ${f.y}v${fh}M${f.x-19} ${f.y}h10M${f.x-19} ${f.y+fh}h10"/></g><text class="dimension-label" text-anchor="middle" x="${f.x+fw/2}" y="${dy-5}">${f.width.toFixed(1)} m</text><text class="dimension-label" text-anchor="middle" transform="translate(${f.x-23} ${f.y+fh/2}) rotate(-90)">${f.height.toFixed(1)} m</text>`;
  }
  content+=m.connections.map(c=>drawDoor(c,m)).join('');
  const sc=m.floors[0].p,bx=56,by=684;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="story-map-svg" id="${prefix}root" role="group" aria-labelledby="${prefix}title ${prefix}desc"><title id="${prefix}title">第${m.actId}幕 · ${esc(m.title)}平面图</title><desc id="${prefix}desc">${esc(m.area+'。'+m.rooms.map(r=>r.name).join('、')+'。选取房间查看空间说明。建筑门洞及楼梯均已标示，户型供KP描述场景。')}</desc><defs>${defs}</defs>${style(m)}<rect x="0" y="0" width="${W}" height="${H}" fill="#111315"/><g class="map-sheet-header"><path class="thin-rule" d="M38 110H${W-38}M38 651H${W-38}"/><text class="subhead" x="44" y="38">BACKLUND · SURVEY RECORD / 0${m.actId}</text><text class="headline" x="44" y="75">${esc(m.title)}</text><text class="subhead" x="45" y="97">${esc(m.subtitle)} · ${esc(m.area)}</text>${northArrow(m,W)}</g>${content}<g class="map-sheet-footer"><g class="scale-bar"><path d="M${bx} ${by}h${sc*5}M${bx} ${by-5}v10M${bx+sc*2} ${by-5}v10M${bx+sc*5} ${by-5}v10"/><path d="M${bx} ${by}h${sc*2}" stroke-width="4"/><text class="scale-label" x="${bx}" y="${by+21}">0</text><text class="scale-label" x="${bx+sc*2}" y="${by+21}" text-anchor="middle">2</text><text class="scale-label" x="${bx+sc*5}" y="${by+21}" text-anchor="middle">5 m</text></g><text class="note" x="${W-45}" y="679" text-anchor="end">1格＝1米 · 门弧表示开启方向</text><text class="note" x="${W-45}" y="699" text-anchor="end">${esc(m.notes[0])}</text><text class="subhead" x="44" y="730">${esc(m.notes.slice(1).join(' / '))}</text></g></svg>\n`;
}

for(const m of maps){
  m.north=m.actId===4?'down':'up';
  m.embedViewBox=embeddedBounds(m);
  m.svg=render(m);
  fs.writeFileSync(path.join(root,m.file),m.svg,'utf8');
  delete m.furniture; delete m.windows; delete m.svgWidth;
}
fs.writeFileSync(path.join(root,'data/story-maps.js'),'// 四幕短团平面图；由 assets/story-maps/generate.cjs 同步生成。\n// 只提供空间描述与既有线索索引，不新增剧情或规则。\nvar STORY_MAPS = '+JSON.stringify(maps,null,2)+';\n\nif (typeof module !== "undefined" && module.exports) { module.exports = { STORY_MAPS }; }\n','utf8');
console.log('已同步4份SVG与STORY_MAPS。');
