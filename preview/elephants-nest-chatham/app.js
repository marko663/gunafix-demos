(function(){var d=document;
d.addEventListener('DOMContentLoaded',function(){
 var k=d.getElementById('kin');
 // split letters
 k.querySelectorAll('.l').forEach(function(l){var walk=function(node){[].slice.call(node.childNodes).forEach(function(n){if(n.nodeType===3){var f=d.createDocumentFragment();n.textContent.split('').forEach(function(ch,i){var s=d.createElement('span');s.className='c';s.textContent=ch;if(ch===' ')s.style.whiteSpace='pre';s.style.animationDelay=(i*.12)+'s';f.appendChild(s)});node.replaceChild(f,n)}else walk(n)})};walk(l)});
 window.GF_fit&&GF_fit();
 if(GF.FINE&&!GF.RM){var cs=[].slice.call(k.querySelectorAll('.c'));var raf;
  k.addEventListener('pointermove',function(e){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){cs.forEach(function(c){var r=c.getBoundingClientRect();var dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);var dist=Math.sqrt(dx*dx+dy*dy);var t=Math.max(0,1-dist/360);c.style.fontVariationSettings='"wdth" '+(80+t*40).toFixed(0)+',"wght" '+(700+t*200).toFixed(0)})})});
  k.addEventListener('pointerleave',function(){cs.forEach(function(c){c.style.fontVariationSettings=''})})}
 // tonight
 var tz='America/Toronto';var p=new Intl.DateTimeFormat('en-GB',{timeZone:tz,weekday:'short',hour:'2-digit',hour12:false}).formatToParts(new Date());var o={};p.forEach(function(x){o[x.type]=x.value});
 var wd=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(o.weekday);if(+o.hour<3)wd=(wd+6)%7;
 var el=d.querySelector('.night[data-day="'+wd+'"]');if(el){el.classList.add('today');var h=el.querySelector('h3').textContent;d.getElementById('now').textContent='Tonight: '+h;
  if(GF.bp()==='phone')el.parentNode.insertBefore(el,el.parentNode.firstChild)}
});
window.addEventListener('load',function(){
 if(!window.gsap||!window.ScrollTrigger||GF.RM)return;gsap.registerPlugin(ScrollTrigger);
 function tl(o){var t=gsap.timeline({scrollTrigger:o});t.fromTo('#arm',{rotation:-28,svgOrigin:'360 40'},{rotation:0,svgOrigin:'360 40',duration:.25,ease:'power2.out'}).fromTo('#vinyl',{rotation:0,svgOrigin:'200 200'},{rotation:720,svgOrigin:'200 200',duration:1,ease:'none'},.1);return t}
 var mm=gsap.matchMedia();
 mm.add('(min-width:1025px)',function(){tl({trigger:'#record',start:'top top',end:'+='+innerHeight*1.6,pin:'.r-in',scrub:.6})});
 mm.add('(min-width:768px) and (max-width:1024px)',function(){tl({trigger:'#record',start:'top top',end:'+='+innerHeight*1.2,pin:'.r-in',scrub:.6})});
 mm.add('(max-width:767px)',function(){tl({trigger:'.disc',start:'top 90%',end:'bottom 10%',scrub:.5})});
});})();
