(function(){var d=document;
d.addEventListener('DOMContentLoaded',function(){
 var tabs=[].slice.call(d.querySelectorAll('[role=tab]'));
 function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;d.getElementById(x.getAttribute('aria-controls')).hidden=!on})}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();var n=tabs[(i+1)%tabs.length];sel(n);n.focus()}if(e.key==='ArrowLeft'){e.preventDefault();var p=tabs[(i+tabs.length-1)%tabs.length];sel(p);p.focus()}})});
 // treat box
 var slots=[].slice.call(d.querySelectorAll('#slots .slot')),items=[],msg=d.getElementById('boxmsg');
 function draw(){slots.forEach(function(s,i){s.textContent=items[i]?items[i].e:'';s.classList.toggle('f',!!items[i]);s.setAttribute('aria-label',items[i]?items[i].n:'empty')});
  msg.textContent=!items.length?'Six empty spots. Start tapping.':items.length<6?items.length+' in the box, '+(6-items.length)+' to go.':'Box full! Call (289) 836-9836 to order a treat box to go.'}
 d.querySelectorAll('#shelf button').forEach(function(b){b.addEventListener('click',function(){if(items.length>=6)return;items.push({e:b.dataset.e,n:b.dataset.n});draw();
  if(window.gsap&&!GF.RM)gsap.from(slots[items.length-1],{scale:.3,rotation:-20,duration:.5,ease:'back.out(2.5)'})})});
 d.getElementById('empty').addEventListener('click',function(){items=[];draw()});draw();
 // seasons: wheel follows active card
 var cards=[].slice.call(d.querySelectorAll('.scard')),wh=d.getElementById('wh');
 function season(i){cards.forEach(function(c,k){c.classList.toggle('on',k===i)});if(wh)wh.style.transform='rotate('+(-45-i*90)+'deg)'}
 season(0);
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)season(+e.target.dataset.s)})},{rootMargin:'-45% 0px -45% 0px'});cards.forEach(function(c){io.observe(c)});
  var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&GF.bp()==='phone')season(+e.target.dataset.s)})},{root:d.getElementById('scards'),threshold:.6});cards.forEach(function(c){io2.observe(c)})}
});
window.addEventListener('load',function(){
 if(!window.gsap||!window.ScrollTrigger||GF.RM)return;gsap.registerPlugin(ScrollTrigger);
 var t=gsap.timeline({delay:0});
 t.from('#g-bot',{y:-300,duration:.4,ease:'bounce.out'}).from('#g-c1',{y:-300,duration:.32,ease:'bounce.out'}).from('#g-c2',{y:-300,duration:.32,ease:'bounce.out'}).from('#g-c3',{y:-300,duration:.32,ease:'bounce.out'})
  .from('#g-top',{y:-320,duration:.45,ease:'bounce.out'}).from('#g-steam path',{opacity:0,y:16,stagger:.15,duration:.4});
 // squash on scroll: the press closes as you scroll past
 gsap.to('#gcs',{scaleY:.9,transformOrigin:'50% 100%',scrollTrigger:{trigger:'.gc',start:'center 40%',end:'bottom top',scrub:.5}});
});})();
