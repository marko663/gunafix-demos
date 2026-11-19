(function(){var d=document;
d.addEventListener('DOMContentLoaded',function(){
 var o=d.getElementById('o'),w=d.getElementById('wink'),n=0;
 o.addEventListener('click',function(){n++;w.textContent=n%2?'Frade quer dizer frei. Entre, a porta está aberta.':'';o.style.transform=n%2?'rotate(-14deg) scale(1.06)':''});
 if(GF.FINE&&!GF.RM){var ts=[].slice.call(d.querySelectorAll('#tiles .tile:not(.sp)'));var h=d.getElementById('tiles');
  h.addEventListener('pointermove',function(e){ts.forEach(function(t){var r=t.getBoundingClientRect();var dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);var dist=Math.sqrt(dx*dx+dy*dy)||1;var f=Math.max(0,1-dist/420);t.style.transform='translate('+(-dx/dist*f*34).toFixed(1)+'px,'+(-dy/dist*f*24).toFixed(1)+'px) rotate('+(dx/dist*f*-10).toFixed(1)+'deg)'})});
  h.addEventListener('pointerleave',function(){ts.forEach(function(t){t.style.transform=''})})}
 // phone dots
 var tr=d.getElementById('track'),dots=[].slice.call(d.querySelectorAll('#dots span'));
 tr.addEventListener('scroll',function(){if(GF.bp()!=='phone')return;var i=Math.round(tr.scrollLeft/(tr.firstElementChild.offsetWidth));dots.forEach(function(s,k){s.classList.toggle('on',k===i)})},{passive:true});
});
window.addEventListener('load',function(){
 if(!window.gsap||!window.ScrollTrigger||GF.RM)return;gsap.registerPlugin(ScrollTrigger);
 var mm=gsap.matchMedia();
 mm.add('(min-width:1025px)',function(){var tr=d.getElementById('track');
  var tl=gsap.timeline({scrollTrigger:{trigger:'#casa',start:'top top',end:function(){return '+='+(tr.scrollWidth-innerWidth)*1.1},pin:true,scrub:.7,invalidateOnRefresh:true}});
  tl.to(tr,{x:function(){return -(tr.scrollWidth-innerWidth)},ease:'none',duration:3});
  tl.fromTo('#wine',{y:120},{y:0,duration:1.1,ease:'none'},.15).from('#bub circle',{y:40,opacity:0,stagger:.15,duration:.4},.6);
 });
 mm.add('(min-width:768px) and (max-width:1024px)',function(){gsap.fromTo('#wine',{y:120},{y:0,ease:'none',scrollTrigger:{trigger:'.vinho',start:'top 70%',end:'center 40%',scrub:.6}})});
 mm.add('(max-width:767px)',function(){gsap.fromTo('#wine',{y:120},{y:20,ease:'none',duration:1.6,scrollTrigger:{trigger:'#casa',start:'top 70%'}})});
});})();
