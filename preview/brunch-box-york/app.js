(function(){var d=document;
function svgEl(t,a){var e=d.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)e.setAttribute(k,a[k]);return e}
function render(animLast){
 var sw=d.getElementById('sw');sw.innerHTML='';
 var b=d.querySelector('input[name=bread]:checked');var c=b.dataset.c;
 var fills=[].slice.call(d.querySelectorAll('input[name=f]:checked'));
 var n=fills.length,lh=34,base=270,wrap=!!b.dataset.wrap,roll=!!b.dataset.roll;
 sw.appendChild(svgEl('ellipse',{cx:200,cy:300,rx:160,ry:10,fill:'#141414',opacity:.12}));
 // bottom bread
 var bottom=wrap?svgEl('path',{d:'M30 '+(base-10)+'q170 60 340 0v20q-170 60-340 0z',fill:c,stroke:'#141414','stroke-width':4}):roll?svgEl('path',{d:'M40 '+base+'h320c0 30-60 36-160 36S40 '+(base+30)+' 40 '+base+'z',fill:c,stroke:'#141414','stroke-width':4}):svgEl('rect',{x:40,y:base,width:320,height:26,rx:8,fill:c,stroke:'#141414','stroke-width':4});
 sw.appendChild(bottom);
 var y=base;var layers=[];
 // lettuce always
 fills.forEach(function(f,i){y-=lh;var g=svgEl('g',{});
  var r=svgEl('rect',{x:34+(i%2)*6,y:y+4,width:332-(i%2)*12,height:lh-4,rx:14,fill:f.dataset.c,stroke:'#141414','stroke-width':4});g.appendChild(r);
  if(f.dataset.hot){for(var k=0;k<3;k++)g.appendChild(svgEl('path',{d:'M'+(150+k*50)+' '+(y-4)+'c-8-10 8-14 0-24',fill:'none',stroke:'#141414','stroke-width':3,'stroke-linecap':'round'}))}
  sw.appendChild(g);layers.push(g)});
 y-=16;var lt=svgEl('path',{d:'M32 '+(y+16)+'c30-14 50 10 80-2s50 12 80 0 50 10 80-2 46 8 96 0v10H32z',fill:'#5DBB63',stroke:'#141414','stroke-width':4,'stroke-linejoin':'round'});sw.appendChild(lt);
 var top;if(wrap){top=svgEl('path',{d:'M30 '+(y+10)+'q170 -50 340 0l-10 16q-160 -40 -320 0z',fill:c,stroke:'#141414','stroke-width':4})}
 else if(roll){top=svgEl('path',{d:'M40 '+(y+10)+'c0-80 320-80 320 0z',fill:c,stroke:'#141414','stroke-width':4})}
 else{top=svgEl('rect',{x:40,y:y-16,width:320,height:26,rx:8,fill:c,stroke:'#141414','stroke-width':4})}
 sw.appendChild(top);
 if(b.dataset.seed){for(var s=0;s<14;s++)sw.appendChild(svgEl('circle',{cx:60+s*21,cy:y-4+(s%3)*4,r:2.5,fill:'#5b3a1a'}))}
 sw.setAttribute('viewBox','0 '+Math.min(0,y-90)+' 400 '+(320-Math.min(0,y-90)));
 if(animLast&&window.gsap&&!GF.RM){var t=layers.length&&animLast==='f'?layers[layers.length-1]:null;
  if(t)gsap.from(t,{y:-160,opacity:0,duration:.55,ease:'back.out(1.6)'});gsap.from(top,{y:-120,duration:.6,ease:'bounce.out'});}
 // summary
 var names=fills.map(function(f){return f.value});
 d.getElementById('sum-h').textContent=b.value;
 d.getElementById('sum-t').textContent=names.length?'With '+names.join(', ')+'.':'Pick up to three fillings.';
 d.getElementById('order-txt').textContent=b.value+(names.length?' with '+names.join(', ').toLowerCase()+'.':' with your choice of fillings.')+' Freshly made while you wait.';
 var dis=fills.length>=3;d.querySelectorAll('input[name=f]').forEach(function(i){i.disabled=dis&&!i.checked});
}
d.addEventListener('DOMContentLoaded',function(){
 d.querySelectorAll('input[name=bread]').forEach(function(i){i.addEventListener('change',function(){render('b')})});
 d.querySelectorAll('input[name=f]').forEach(function(i){i.addEventListener('change',function(){render(i.checked?'f':'b')})});
 // preselect two fillings so the stage looks alive
 ['Chicken mayo','Bacon'].forEach(function(v){var i=d.querySelector('input[name=f][value="'+v+'"]');if(i)i.checked=true});
 render();
 var g=d.getElementById('bgrid');g.classList.add('js-steps');var steps=[].slice.call(g.querySelectorAll('.step'));var cur=0;
 function show(i){cur=Math.max(0,Math.min(steps.length-1,i));steps.forEach(function(s,k){s.classList.toggle('cur',k===cur)});if(GF.bp()==='phone'){var f=steps[cur].querySelector('input,a,button');f&&f.focus({preventScroll:true})}}
 g.querySelectorAll('[data-next]').forEach(function(b){b.addEventListener('click',function(){show(cur+1)})});
 g.querySelectorAll('[data-prev]').forEach(function(b){b.addEventListener('click',function(){show(cur-1)})});
});})();
