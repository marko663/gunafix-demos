(function(){
 var d=document;
 function lab(h){var s=h%12||12;return s+(h<12||h===24?' AM':' PM')}
 function say(h){d.getElementById('q').textContent=lab(h)+' · is breakfast on?';
  var hand=d.getElementById('hand');if(hand)hand.style.transform='rotate('+((h%12)*30)+'deg)';
  if(h<6||h>=20){d.getElementById('a').textContent='We\u2019re closed.';d.getElementById('p').textContent=h<6?'The griddle heats up at 6AM. Breakfast starts the second we open.':'We close at 8PM. See you at 6AM for pancakes.';}
  else{d.getElementById('a').textContent=h<11?'Yes. Obviously.':h<16?'Yes. Still.':'Yes. Really.';
   d.getElementById('p').textContent=h<11?'Pancakes, eggs, the works. Today\u2019s homemade soup is already on the stove.':h<16?'Breakfast is served anytime, and the soups are homemade, from scratch today.':'Pancakes for dinner? Breakfast is on until we close at 8PM.';}
  d.querySelectorAll('#chips button').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.h===h)})}
 d.addEventListener('DOMContentLoaded',function(){
  var r=d.getElementById('hr');r.addEventListener('input',function(){say(+r.value)});
  var c=d.getElementById('chips');for(var h=5;h<=21;h++){var b=d.createElement('button');b.type='button';b.dataset.h=h;b.textContent=lab(h);b.setAttribute('aria-pressed',h===8);b.addEventListener('click',function(e){say(+e.currentTarget.dataset.h)});c.appendChild(b)}
  var y=new Date(),o=new Date(1984,4,23);var n=y.getFullYear()-1984-((y.getMonth()<4||(y.getMonth()===4&&y.getDate()<23))?1:0);d.getElementById('yrs').textContent=n;
  say(8);
 });
 window.addEventListener('load',function(){
  if(!window.gsap||!window.ScrollTrigger||GF.RM)return;gsap.registerPlugin(ScrollTrigger);
  var st=[].slice.call(d.querySelectorAll('#steps li'));function step(i){st.forEach(function(l,k){l.classList.toggle('on',k===i)})}
  function tl(opts){var t=gsap.timeline({scrollTrigger:opts});
   t.from('#p-plate',{scaleX:.2,opacity:0,transformOrigin:'50% 50%',duration:.6})
    .from('#pk .pc',{y:-420,duration:.8,stagger:.5,ease:'bounce.out'})
    .from('#butter',{y:-300,rotation:-40,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'})
    .from('#syrup',{scaleY:0,transformOrigin:'50% 0%',duration:1})
    .from('#flag',{scaleY:0,transformOrigin:'50% 100%',duration:.6,ease:'back.out(2)'});return t}
  var mm=gsap.matchMedia();
  mm.add('(min-width:1025px)',function(){tl({trigger:'#stack',start:'top top',end:'+='+innerHeight*2.2,pin:'.stack-in',scrub:.6,onUpdate:function(s){step(Math.min(4,Math.floor(s.progress*5)))}})});
  mm.add('(min-width:768px) and (max-width:1024px)',function(){tl({trigger:'#stack',start:'top top',end:'+='+innerHeight*1.6,pin:'.stack-in',scrub:.6,onUpdate:function(s){step(Math.min(4,Math.floor(s.progress*5)))}})});
  mm.add('(max-width:767px)',function(){st.forEach(function(l){l.classList.add('on')});tl({trigger:'.plate',start:'top 75%',end:'bottom 45%',scrub:.5})});
 });
})();
