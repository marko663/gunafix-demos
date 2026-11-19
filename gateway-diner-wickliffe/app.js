window.addEventListener('load',function(){
 if(!window.gsap||!window.ScrollTrigger||GF.RM)return;
 gsap.registerPlugin(ScrollTrigger);
 var caps=[].slice.call(document.querySelectorAll('#caps li'));
 function step(i){caps.forEach(function(c,k){c.classList.toggle('on',k===i)})}
 function build(len){
  var tl=gsap.timeline({scrollTrigger:{trigger:'.press',start:'top top',end:'+='+len,pin:'.press-in',scrub:.6,
   onUpdate:function(s){step(Math.min(4,Math.floor(s.progress*5)))}}});
  tl.from('#b-bot',{y:-420,duration:1,ease:'bounce.out'})
    .set('#b-pat',{opacity:0},0)
    .fromTo('#b-ball',{opacity:1,y:-460},{opacity:1,y:0,duration:1,ease:'bounce.out'})
    .fromTo('#b-spat',{opacity:1,y:-80},{y:248,duration:.6,ease:'power2.in'})
    .set('#b-ball',{opacity:0}).set('#b-pat',{opacity:1})
    .fromTo('#b-pat',{scaleX:.42,scaleY:2.3,transformOrigin:'50% 50%'},{scaleX:1,scaleY:1,duration:.35,ease:'power3.out'},'<')
    .to('#b-spat',{y:-80,opacity:0,duration:.5})
    .from('#b-chs',{y:-480,duration:1})
    .from('#b-chs',{scaleY:.4,transformOrigin:'50% 0%',duration:.5})
    .from('#b-let',{y:-480,rotation:-8,duration:1})
    .from('#b-tom',{y:-480,duration:.8})
    .from('#b-top',{y:-520,rotation:6,duration:1,ease:'back.out(1.4)'})
    .from('#b-steam',{opacity:0,y:20,duration:.6});
 }
 var mm=gsap.matchMedia();
 mm.add('(min-width:1025px)',function(){build(innerHeight*2.5)});
 mm.add('(min-width:768px) and (max-width:1024px)',function(){build(innerHeight*1.8)});
 mm.add('(max-width:767px)',function(){build(innerHeight*1.2)});
});
