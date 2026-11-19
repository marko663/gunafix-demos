(function(){var d=document;var NS='http://www.w3.org/2000/svg';
var cols=['#7A3E22','#FFF6E6','#E3263A','#E8B26A','#F4C2C2','#5A2A16'];
d.addEventListener('DOMContentLoaded',function(){
 var g=d.getElementById('scoops'),n=0,msg=d.getElementById('scoopmsg');
 function add(){if(n>=6){g.innerHTML='';n=0;msg.textContent='Back to one. Flavours change weekly.'}
  var y=120-n*44;var p=d.createElementNS(NS,'path');
  p.setAttribute('d','M48 '+(y+30)+'c-6-30 24-52 52-52s58 22 52 52c8 4 6 16-4 18H52c-10-2-12-14-4-18z');p.setAttribute('fill',cols[n%cols.length]);p.setAttribute('stroke','#FFF6E6');p.setAttribute('stroke-width','5');
  g.appendChild(p);n++;
  var svg=d.getElementById('hcone');svg.setAttribute('viewBox','0 '+Math.min(0,y-30)+' 200 '+(300-Math.min(0,y-30)));
  if(window.gsap&&!GF.RM)gsap.from(p,{y:-160,duration:.6,ease:'bounce.out'});
  if(n>1)msg.textContent=n<6?n+' scoops. Steady now.':'Six! That\u2019s a proper Skoosh. Flavours change weekly.';}
 add();d.getElementById('addscoop').addEventListener('click',add);
 // tabs
 var tabs=[].slice.call(d.querySelectorAll('[role=tab]'));
 function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;d.getElementById(x.getAttribute('aria-controls')).hidden=!on})}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){var k=e.key;if(k==='ArrowRight'||k==='ArrowDown'){e.preventDefault();var nx=tabs[(i+1)%tabs.length];sel(nx);nx.focus()}if(k==='ArrowLeft'||k==='ArrowUp'){e.preventDefault();var pv=tabs[(i+tabs.length-1)%tabs.length];sel(pv);pv.focus()}})});
});
window.addEventListener('load',function(){
 if(!window.gsap||!window.ScrollTrigger||GF.RM)return;gsap.registerPlugin(ScrollTrigger);
 function tl(o){var t=gsap.timeline({scrollTrigger:o});
  t.from('#k-cone',{y:200,opacity:0,duration:.7,ease:'back.out(1.4)'})
   .from('#k-s1',{y:-360,duration:.8,ease:'bounce.out'})
   .from('#k-s2',{y:-360,duration:.8,ease:'bounce.out'})
   .from('#k-cherry',{y:-300,rotation:-90,transformOrigin:'50% 50%',duration:.7,ease:'back.out(2)'})
   .from('#k-sprinkles path',{scale:0,transformOrigin:'50% 50%',stagger:.08,duration:.4});return t}
 var mm=gsap.matchMedia();
 mm.add('(min-width:1025px)',function(){tl({trigger:'#build',start:'top top',end:'+='+innerHeight*1.8,pin:'.b-in',scrub:.6})});
 mm.add('(min-width:768px) and (max-width:1024px)',function(){tl({trigger:'#build',start:'top top',end:'+='+innerHeight*1.4,pin:'.b-in',scrub:.6})});
 mm.add('(max-width:767px)',function(){tl({trigger:'.b-stage',start:'top 85%',end:'bottom 55%',scrub:.5})});
});})();
