/* Local software 3D: convex dice, perspective projection and cosmetic tumble.
   Outcomes are supplied by Keeper; this renderer never rolls or changes them. */
var KeeperDice = (function () {
  'use strict';
  var TAU = Math.PI * 2;
  function add(a,b){return a.map(function(v,i){return v+b[i];});}
  function mul(a,n){return a.map(function(v){return v*n;});}
  function dot(a,b){return a.reduce(function(v,x,i){return v+x*b[i];},0);}
  function cross(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  function norm(a){return mul(a,1/(Math.hypot.apply(null,a)||1));}
  function center(points){return mul(points.reduce(add,[0,0,0]),1/points.length);}
  function normal(points){return norm(cross(add(points[1],mul(points[0],-1)),add(points[2],mul(points[0],-1))));}
  function hull(vertices){
    var faces=[];
    for(var a=0;a<vertices.length;a++)for(var b=a+1;b<vertices.length;b++)for(var c=b+1;c<vertices.length;c++){
      var n=normal([vertices[a],vertices[b],vertices[c]]), d=dot(n,vertices[a]);
      var distances=vertices.map(function(v){return dot(n,v)-d;});
      if(distances.every(function(t){return t<1e-6;}))faces.push([a,b,c]);
      else if(distances.every(function(t){return t>-1e-6;}))faces.push([a,c,b]);
    }
    return {vertices:vertices,faces:faces};
  }
  function ordered(indices, vertices, n){
    var middle=center(indices.map(function(i){return vertices[i];})), u=norm(add(vertices[indices[0]],mul(middle,-1))),v=cross(n,u);
    return indices.sort(function(a,b){var pa=add(vertices[a],mul(middle,-1)),pb=add(vertices[b],mul(middle,-1));return Math.atan2(dot(pa,v),dot(pa,u))-Math.atan2(dot(pb,v),dot(pb,u));});
  }
  function dual(model){
    var vertices=model.faces.map(function(face){var points=face.map(function(i){return model.vertices[i];}),n=normal(points);if(dot(n,center(points))<0)n=mul(n,-1);return mul(n,1/dot(n,points[0]));});
    var faces=model.vertices.map(function(point,i){var ids=[];model.faces.forEach(function(face,j){if(face.includes(i))ids.push(j);});return ordered(ids,vertices,norm(point));});
    return {vertices:vertices,faces:faces};
  }
  var cache={};
  function geometry(sides){
    if(cache[sides])return cache[sides];
    var model, i, vertices=[];
    if(sides===4)model=hull([[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]]);
    else if(sides===6)model={vertices:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],faces:[[0,3,2,1],[4,5,6,7],[0,1,5,4],[3,7,6,2],[0,4,7,3],[1,2,6,5]]};
    else if(sides===8)model=hull([[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]);
    else if(sides===10){
      for(i=0;i<5;i++)vertices.push([Math.cos(i*TAU/5),Math.sin(i*TAU/5),.72]);
      for(i=0;i<5;i++)vertices.push([Math.cos((i+.5)*TAU/5),Math.sin((i+.5)*TAU/5),-.72]);
      var faces=[[0,1,2,3,4],[9,8,7,6,5]];
      for(i=0;i<5;i++){faces.push([i,(i+1)%5,i+5]);faces.push([(i+1)%5,(i+1)%5+5,i+5]);}
      model=dual({vertices:vertices,faces:faces});
    }else if(sides===12||sides===20){
      var phi=(1+Math.sqrt(5))/2;
      [-1,1].forEach(function(a){[-phi,phi].forEach(function(b){vertices.push([0,a,b],[a,b,0],[b,0,a]);});});
      model=hull(vertices);if(sides===12)model=dual(model);
    }else{
      // A numbered reel for nonstandard dice. It is a display, not a new die rule.
      for(i=0;i<8;i++){var angle=(i-.5)*TAU/8;vertices.push([Math.cos(angle),-.7,Math.sin(angle)],[Math.cos(angle),.7,Math.sin(angle)]);}
      var reelFaces=[];for(i=0;i<8;i++)reelFaces.push([i*2,((i+1)%8)*2,((i+1)%8)*2+1,i*2+1]);
      reelFaces.push([14,12,10,8,6,4,2,0],[1,3,5,7,9,11,13,15]);model={vertices:vertices,faces:reelFaces,reel:true};
    }
    var radius=Math.max.apply(null,model.vertices.map(function(v){return Math.hypot.apply(null,v);}));
    model.vertices=model.vertices.map(function(v){return mul(v,1/radius);});
    model.faces=model.faces.map(function(face){var points=face.map(function(j){return model.vertices[j];});return dot(normal(points),center(points))<0?face.slice().reverse():face;});
    cache[sides]=model;return model;
  }
  function euler(v,x,y,z){var a=v[0],b=v[1]*Math.cos(x)-v[2]*Math.sin(x),c=v[1]*Math.sin(x)+v[2]*Math.cos(x);var d=a*Math.cos(y)+c*Math.sin(y),f=-a*Math.sin(y)+c*Math.cos(y);return[d*Math.cos(z)-b*Math.sin(z),d*Math.sin(z)+b*Math.cos(z),f];}
  function align(v,n){
    var target=[0,0,1],cos=dot(n,target),axis=cross(n,target),sin=Math.hypot.apply(null,axis);
    if(sin<1e-6)return cos>0?v:[v[0],-v[1],-v[2]];
    axis=mul(axis,1/sin);return add(add(mul(v,cos),mul(cross(axis,v),sin)),mul(axis,dot(axis,v)*(1-cos)));
  }
  // Inverse of align: establish a stable local X/Y frame for each numbered face.
  function unalign(v,n){var axis=cross([0,0,1],n),sin=Math.hypot.apply(null,axis),cos=n[2];if(sin<1e-6)return cos>0?v:[v[0],-v[1],-v[2]];axis=mul(axis,1/sin);return add(add(mul(v,cos),mul(cross(axis,v),sin)),mul(axis,dot(axis,v)*(1-cos)));}
  var surfaceCache={};
  function beveledGeometry(sides){
    if(surfaceCache[sides])return surfaceCache[sides];
    var base=geometry(sides),vertices=[],faces=[],edges={},corners=base.vertices.map(function(){return [];});
    var bevel=base.reel?.035:sides===20?.06:.09;
    function face(ids,number){var points=ids.map(function(i){return vertices[i];});if(dot(normal(points),center(points))<0)ids=ids.slice().reverse();faces.push({ids:ids,number:number});}
    base.faces.forEach(function(ids,number){
      var c=center(ids.map(function(i){return base.vertices[i];}));
      var inset=ids.map(function(id){var i=vertices.length;vertices.push(add(mul(base.vertices[id],1-bevel),mul(c,bevel)));corners[id].push(i);return i;});
      face(inset,number);
      ids.forEach(function(a,j){var b=ids[(j+1)%ids.length],key=[a,b].sort(function(x,y){return x-y;}).join(',');(edges[key]||(edges[key]=[])).push([inset[j],inset[(j+1)%ids.length]]);});
    });
    Object.keys(edges).forEach(function(key){var pair=edges[key];if(pair.length===2)face(pair[0].concat(pair[1]),null);});
    corners.forEach(function(ids,i){ids=ordered(ids,vertices,norm(base.vertices[i]));for(var j=1;j<ids.length-1;j++)face([ids[0],ids[j],ids[j+1]],null);});
    faces.forEach(function(f){
      var points=f.ids.map(function(i){return vertices[i];});f.middle=polygonCenter(points);f.normal=normal(points);
      if(f.number!==null){
        f.u=unalign([1,0,0],f.normal);f.v=unalign([0,1,0],f.normal);
        f.radius=Math.min.apply(null,points.map(function(a,i){var edge=add(points[(i+1)%points.length],mul(a,-1));return Math.hypot.apply(null,cross(edge,add(f.middle,mul(a,-1))))/Math.hypot.apply(null,edge);}));
      }
    });
    var model={vertices:vertices,faces:faces,reel:base.reel,numberedFaces:base.faces.length};surfaceCache[sides]=model;return model;
  }
  function polygonCenter(points){
    var total=0,sum=[0,0,0];
    for(var i=1;i<points.length-1;i++){var area=Math.hypot.apply(null,cross(add(points[i],mul(points[0],-1)),add(points[i+1],mul(points[0],-1))));sum=add(sum,mul(center([points[0],points[i],points[i+1]]),area));total+=area;}
    return total?mul(sum,1/total):center(points);
  }
  var numberCache={};
  function numberTexture(label,light){
    var key=label+':'+light;if(numberCache[key])return numberCache[key];
    var bitmap=document.createElement('canvas'),ink=bitmap.getContext('2d'),font='600 96px Georgia,serif';
    ink.font=font;var metrics=ink.measureText(label),left=metrics.actualBoundingBoxLeft||0,right=metrics.actualBoundingBoxRight||metrics.width;
    bitmap.width=Math.ceil(Math.max(150,left+right+32));bitmap.height=160;ink.font=font;ink.textAlign='left';ink.textBaseline='alphabetic';
    var ascent=metrics.actualBoundingBoxAscent||72,descent=metrics.actualBoundingBoxDescent||0;
    var x=bitmap.width/2+(left-right)/2,y=bitmap.height/2+(ascent-descent)/2;
    ink.fillStyle=light?'#f7f0d9':'#050407';ink.fillText(label,x+1,y+1);ink.fillStyle=light?'#32231d':'#f0dfb9';ink.fillText(label,x,y);
    if(label==='6'||label==='9'){ink.beginPath();ink.moveTo(bitmap.width/2-16,y+10);ink.lineTo(bitmap.width/2+16,y+10);ink.lineWidth=2;ink.strokeStyle=ink.fillStyle;ink.stroke();}
    // Measure the complete visible ink (including the 6/9 mark) so its anchor is exact.
    var bytes=ink.getImageData(0,0,bitmap.width,bitmap.height).data,minX=bitmap.width,maxX=0,minY=bitmap.height,maxY=0;
    for(var py=0;py<bitmap.height;py++)for(var px=0;px<bitmap.width;px++)if(bytes[(py*bitmap.width+px)*4+3]>32){minX=Math.min(minX,px);maxX=Math.max(maxX,px);minY=Math.min(minY,py);maxY=Math.max(maxY,py);}
    var texture={canvas:bitmap,anchorX:(minX+maxX)/2,anchorY:(minY+maxY)/2,widthInEm:metrics.width/96};numberCache[key]=texture;return texture;
  }
  function create(canvas){
    var ctx=canvas.getContext('2d'),width=0,height=0,dpr=1,items=[],frame=0,start=0,complete=null,playing=false,surfaceReport=[];
    var light=norm([-.5,-.8,1.5]),half=norm(add(light,[0,0,1])),duration=1450;
    function progress(){return playing?Math.min(1,(performance.now()-start)/duration):1;}
    function resize(){var r=canvas.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);draw(progress());}
    function prepare(next){items=next.map(function(d,i){return Object.assign({},d,{seed:i*.83+.6});});}
    function set(next){prepare(next);draw(1);}
    function path(points){ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);points.slice(1).forEach(function(p){ctx.lineTo(p[0],p[1]);});ctx.closePath();}
    function rgb(base,factor,shine){return 'rgb('+base.map(function(v){return Math.min(255,Math.max(0,Math.round(v*factor+shine)));}).join(',')+')';}
    function noise(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
    function draw(t){
      if(!ctx)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);surfaceReport=[];if(!items.length)return;
      var cols=items.length<5?items.length:Math.ceil(Math.sqrt(items.length*1.75)),rows=Math.ceil(items.length/cols),cellW=width/(cols+.6),cellH=height/(rows+.4),size=Math.min(cellW*.43,cellH*.39,94),allFaces=[];
      items.forEach(function(d,index){
        var col=index%cols,row=Math.floor(index/cols),inRow=Math.min(cols,items.length-row*cols),remaining=Math.pow(1-t,1.8);
        var x=width/2+(col-(inRow-1)/2)*cellW-cellW*.22*remaining,y=height*.53+(row-(rows-1)/2)*cellH;
        var bounce=-height*.25*Math.pow(1-t,1.3)-Math.abs(Math.sin(t*Math.PI*3))*Math.pow(1-t,1.3)*height*.17;
        var base=geometry(d.sides),model=beveledGeometry(d.sides),faceIndex=model.reel?0:((d.role?d.value:d.value-1)%base.faces.length+base.faces.length)%base.faces.length;
        var faceNormal=normal(base.faces[faceIndex].map(function(i){return base.vertices[i];})),spin=remaining*TAU*2;
        function rotate(v){return euler(align(euler(v,spin*(1.15+d.seed*.12),spin*.73,spin*.35),faceNormal),.18,-.23,-.14+(index%3)*.10);}
        function rest(v){return euler(align(v,faceNormal),.18,-.23,-.14+(index%3)*.10);}
        function project(v){var p=4.8/(4.8-v[2]);return[x+v[0]*size*p,y+bounce+v[1]*size*p,v[2]];}
        var transformed=model.vertices.map(rotate),projected=transformed.map(project);
        var bottom=Math.max.apply(null,model.vertices.map(function(v){var q=rest(v);return q[1]*size*4.8/(4.8-q[2]);}));
        ctx.save();ctx.translate(x,y+bottom+2);ctx.scale(1,.19+remaining*.18);
        var shadow=ctx.createRadialGradient(0,0,size*.12,0,0,size*1.12);shadow.addColorStop(0,'rgba(0,0,0,'+(.72-remaining*.4)+')');shadow.addColorStop(1,'#0000');ctx.fillStyle=shadow;ctx.beginPath();ctx.arc(0,0,size*1.12,0,TAU);ctx.fill();ctx.restore();
        var visible=[],bevelCount=0;
        model.faces.forEach(function(f,fi){
          if(f.number===null)bevelCount++;
          var points=f.ids.map(function(i){return transformed[i];}),n=normal(points),middle=rotate(f.middle),facing=dot(n,norm(add([0,0,4.8],mul(middle,-1))));
          if(facing<=0)return;
          var number=f.number,label=null;
          if(number!==null){var value=model.reel?((d.value-1+number)%d.sides+d.sides)%d.sides+1:(d.role?number:number+1);label=d.role==='tens'?String(value*10).padStart(2,'0'):String(value);visible.push({label:label,facing:facing});}
          allFaces.push({points:f.ids.map(function(i){return projected[i];}),normal:n,middle:project(middle),depth:middle[2],label:label,bevel:number===null,radius:f.radius,u:f.u?project(add(middle,mul(rotate(f.u),.1))):null,v:f.v?project(add(middle,mul(rotate(f.v),.1))):null,size:size,light:index%2===0,chosen:d.chosen!==false,seed:index*47+fi});
        });
        visible.sort(function(a,b){return b.facing-a.facing;});
        surfaceReport.push({frontLabel:visible[0]?visible[0].label:'',bevelFaces:bevelCount,inside:projected.every(function(p){return p[0]>=0&&p[0]<=width&&p[1]>=0&&p[1]<=height;})});
        // Percentile roles deliberately have no under-die captions.
        if(!d.role){ctx.save();ctx.fillStyle='#b7a8b2';ctx.font='12px "Microsoft YaHei",sans-serif';ctx.textAlign='center';ctx.fillText('d'+d.sides+(model.reel?' 转轮':''),x,y+bottom+23);ctx.restore();}
      });
      allFaces.sort(function(a,b){return a.depth-b.depth;}).forEach(function(f){
        var diffuse=Math.max(0,dot(f.normal,light)),spec=Math.pow(Math.max(0,dot(f.normal,half)),f.bevel?12:38);
        var base=f.bevel?(f.light?[221,207,180]:[133,109,76]):(f.light?[222,212,190]:[34,28,38]);
        var c=f.middle,gradient=ctx.createLinearGradient(c[0]-f.size,c[1]-f.size,c[0]+f.size*.8,c[1]+f.size);
        gradient.addColorStop(0,rgb(base,.50+diffuse*.58,spec*(f.bevel?70:22)));gradient.addColorStop(.48,rgb(base,.44+diffuse*.55,spec*14));gradient.addColorStop(1,rgb(base,.35+diffuse*.48,0));
        ctx.globalAlpha=f.chosen?1:.57;path(f.points);ctx.fillStyle=gradient;ctx.fill();ctx.lineWidth=f.bevel?.45:.6;ctx.strokeStyle=f.light?'#e9d8bf45':'#c5a47b38';ctx.stroke();
        if(f.label===null)return;
        if(f.size>42){ctx.save();ctx.clip();ctx.globalAlpha*=.13;ctx.fillStyle=f.light?'#4c3c30':'#cbb99f';var minX=Math.min.apply(null,f.points.map(function(p){return p[0];})),maxX=Math.max.apply(null,f.points.map(function(p){return p[0];})),minY=Math.min.apply(null,f.points.map(function(p){return p[1];})),maxY=Math.max.apply(null,f.points.map(function(p){return p[1];}));for(var k=0;k<18;k++)ctx.fillRect(minX+noise(f.seed+k*3)*(maxX-minX),minY+noise(f.seed+k*3+1)*(maxY-minY),.7,.7);ctx.restore();}
        if(f.radius*f.size<1.5)return;
        ctx.save();ctx.transform((f.u[0]-c[0])*10,(f.u[1]-c[1])*10,(f.v[0]-c[0])*10,(f.v[1]-c[1])*10,c[0],c[1]);
        var glyph=numberTexture(f.label,f.light),font=Math.min(.8,f.radius*1.65,f.radius*1.72/glyph.widthInEm);
        ctx.scale(font/96,font/96);ctx.drawImage(glyph.canvas,-glyph.anchorX,-glyph.anchorY);ctx.restore();
      });ctx.globalAlpha=1;
    }
    function finish(){if(!playing)return;playing=false;cancelAnimationFrame(frame);frame=0;draw(1);var cb=complete;complete=null;if(cb)cb();}
    function tick(){if(!playing)return;var t=progress();draw(t);if(t<1)frame=requestAnimationFrame(tick);else finish();}
    function play(next,done){finish();prepare(next);complete=done;playing=true;start=performance.now();draw(0);frame=requestAnimationFrame(tick);}
    var observer=new ResizeObserver(resize);observer.observe(canvas);
    return {set:set,play:play,finish:finish,resize:resize,inspect:function(){return items.map(function(d){return Object.assign({},d);});},inspectSurface:function(){return surfaceReport.map(function(s){return Object.assign({},s);});},destroy:function(){finish();observer.disconnect();}};
  }
  return {create:create,geometry:geometry,beveledGeometry:beveledGeometry,numberTexture:numberTexture};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=KeeperDice;
