(function(){var d=document;
d.addEventListener('DOMContentLoaded',function(){
 d.querySelectorAll('.drawer .plate[data-tpl]').forEach(function(p){var t=d.querySelector(p.dataset.tpl);if(t)p.innerHTML=t.innerHTML.replace(/^\s*<div class="plate">|<\/div>\s*$/g,'')});
 var n=7;function take(){n=n%99+1;var el=d.getElementById('num');el.textContent=(n<10?'0':'')+n;if(window.gsap&&!GF.RM)gsap.fromTo(el,{y:-20,opacity:0},{y:0,opacity:1,duration:.4,ease:'back.out(2)'})}
 d.getElementById('take').addEventListener('click',take);
 d.getElementById('take2').addEventListener('click',function(){take();d.getElementById('tkn').scrollIntoView({behavior:GF.RM?'auto':'smooth',block:'center'})});
 /* steam follows pointer */
 if(GF.FINE&&!GF.RM){var s=d.getElementById('steam');addEventListener('pointermove',function(e){var dx=(e.clientX/innerWidth-.5)*30;s.style.transform='skewX('+(-dx)+'deg)'})}
});
window.addEventListener('load',function(){
 if(!window.gsap||!window.ScrollTrigger||GF.RM)return;gsap.registerPlugin(ScrollTrigger);
 function tl(o){var t=gsap.timeline({scrollTrigger:o});
  t.from('#z-dough',{scale:.1,transformOrigin:'50% 50%',duration:.8,ease:'back.out(1.6)'})
   .from('#z-sauce',{scale:0,rotation:-180,transformOrigin:'50% 50%',duration:.8})
   .from('#z-cheese path',{scale:0,transformOrigin:'50% 50%',stagger:.12,duration:.5})
   .from('#z-basil path',{y:-120,opacity:0,stagger:.1,duration:.5})
   .from('#z-cut path',{scale:0,transformOrigin:'50% 50%',stagger:.15,duration:.5})
;return t}
 var mm=gsap.matchMedia();
 mm.add('(min-width:1025px)',function(){tl({trigger:'#pizza',start:'top top',end:'+='+innerHeight*2,pin:'.pz-in',scrub:.6})});
 mm.add('(min-width:768px) and (max-width:1024px)',function(){tl({trigger:'#pizza',start:'top top',end:'+='+innerHeight*1.5,pin:'.pz-in',scrub:.6})});
 mm.add('(max-width:767px)',function(){tl({trigger:'.pz-stage',start:'top 80%',end:'bottom 50%',scrub:.5})});
});})();
