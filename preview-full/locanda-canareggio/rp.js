/* GunaFix real-photo 3D kit (CSS 3D, no WebGL, no drawn objects) */
(function(){
'use strict';
var D=document,H=D.documentElement;
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var FINE=matchMedia('(pointer:fine)').matches;
var conn=navigator.connection||{};
var SAVE=!!conn.saveData||/(^|-)2g$/.test(conn.effectiveType||'');
function clamp(v,a,b){return v<a?a:v>b?b:v}
function sm(t){t=clamp(t,0,1);return t*t*(3-2*t)}
function dev(){var w=innerWidth;return w<=767?'phone':(w<=1024?'ipad':'laptop')}

/* ---------- hero video: muted loop autoplay; poster only for reduced motion / Save-Data ---------- */
(function(){
  var v=D.querySelector('.rp-vid');if(!v)return;
  if(RM||SAVE){v.remove();return}
  var portrait=innerHeight>innerWidth*1.02;
  v.src=portrait?v.dataset.p:v.dataset.l;
  v.muted=true;v.loop=true;v.playsInline=true;
  v.addEventListener('playing',function(){v.classList.add('on');H.classList.add('rp-vid-on')});
  var go=function(){var p=v.play();if(p&&p.catch)p.catch(function(){})};
  go();D.addEventListener('visibilitychange',function(){if(!D.hidden)go()});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)go();else v.pause()})},{threshold:0});io.observe(v.parentNode);
})();

/* ---------- B family: smooth scroll (A family gets it from app.js) ---------- */
if(!RM&&!D.querySelector('script[src$="app.js"]')&&window.Lenis&&window.gsap&&window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  var lz=new Lenis({duration:1.1,smoothWheel:true});window.__lenis=lz;lz.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lz.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  D.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length>1&&D.querySelector(id)){e.preventDefault();lz.scrollTo(id,{offset:-70})}})});
  gsap.utils.toArray('.rp-g2 .g-it').forEach(function(c,i){gsap.from(c,{y:60,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 92%'}})});
}
/* ---------- shared pointer / gyro ---------- */
var pt={x:0,y:0},pc={x:0,y:0};
if(!RM){
  addEventListener('pointermove',function(e){pt.x=e.clientX/innerWidth*2-1;pt.y=e.clientY/innerHeight*2-1},{passive:true});
  if(!FINE&&'DeviceOrientationEvent' in window&&typeof DeviceOrientationEvent.requestPermission!=='function'){
    addEventListener('deviceorientation',function(e){if(e.gamma==null)return;pt.x=clamp(e.gamma/28,-1,1);pt.y=clamp(((e.beta||50)-55)/28,-1,1)});
  }
}

/* ---------- hero tilt (touch / gyro too; fine pointers are handled below) ---------- */
var heroT=D.querySelector('.subj-hero .subj-tilt, .rp-bh .subj-tilt');var OWN=!D.querySelector('script[src$="app.js"]');
/* GSAP depth: layered hero planes drift at different speeds as you leave the hero, and settle in on load */
if(window.gsap&&window.ScrollTrigger&&!RM){
  gsap.registerPlugin(ScrollTrigger);
  var ST={trigger:D.querySelector('.hero')||D.body,start:'top top',end:'bottom top',scrub:true};
  gsap.to('.rp-h .h-det',{'--ty':'-90px',ease:'none',scrollTrigger:ST});
  gsap.to('.rp-h .h-sm',{'--ty':'-30px',ease:'none',scrollTrigger:ST});
  gsap.to('.rp-h .h-back',{'--ty':'40px',ease:'none',scrollTrigger:ST});
  gsap.from('.rp-h .h-det',{x:80,y:60,opacity:0,rotate:12,duration:1.6,ease:'expo.out',delay:.9});
  gsap.from('.rp-h .h-sm',{x:-80,y:-40,opacity:0,rotate:-14,duration:1.6,ease:'expo.out',delay:1.05});
  gsap.utils.toArray('.rp-hl-c').forEach(function(c,i){gsap.from(c,{y:70+i*30,opacity:0,rotateX:14,transformPerspective:900,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 92%'}})});
}
/* ---------- pinned stack follows chapters ---------- */
(function(){
  var st=D.querySelector('.rp-pinstack');if(!st)return;
  var figs=[].slice.call(st.children),prog=D.querySelectorAll('.pin .prog li');
  function show(i){figs.forEach(function(f,k){f.classList.toggle('on',k===i%figs.length);f.classList.toggle('off',k<i%figs.length)})}
  show(0);
  if(!prog.length)return;
  function cur(){for(var i=0;i<prog.length;i++)if(prog[i].classList.contains('on'))return i;return 0}
  var last=-1;
  var mo=new MutationObserver(function(){var c=cur();if(c!==last){last=c;show(c)}});
  prog.forEach(function(l){mo.observe(l,{attributes:true,attributeFilter:['class']})});
  /* when the progress list is hidden (small screens) the same observer still sees class changes from app.js */
})();

/* ---------- scroll-driven 3D photo gallery ---------- */
(function(){
  var sec=D.querySelector('.gf3d');if(!sec)return;
  var stick=sec.querySelector('.gf-stick'),stage=sec.querySelector('.rp-stage'),world=sec.querySelector('.rp-world');
  if(!stage)return;
  var planes=[].slice.call(world.children),N=planes.length;
  var beats=[].slice.call(sec.querySelectorAll('.gf-beat')),dots=[].slice.call(sec.querySelectorAll('.gf-dots i'));
  var side=sec.classList.contains('gf-left')?-1:1,center=sec.classList.contains('gf-v-center');
  var P=0,inView=false,W=0,Hh=0,dv='laptop',cx=0,cy=0,maxW=0,maxH=0,DZ=0,cur=0,tgt=0,time=0,last=0;
  var ar=planes.map(function(p){return parseFloat(p.dataset.ar)||.75});
  function layout(){
    dv=dev();W=stick.clientWidth;Hh=stick.clientHeight;
    if(dv==='laptop'){
      if(center){cx=W*.5;cy=Hh*.36;maxH=Hh*.5;maxW=W*.34}
      else{cx=W*(.5+side*.2);cy=Hh*.5;maxH=Hh*.7;maxW=W*.3}
    }else if(dv==='ipad'){cx=W*.5;cy=Hh*.34;maxH=Hh*.42;maxW=W*.56}
    else{cx=W*.5;cy=Hh*.3;maxH=Hh*.36;maxW=W*.62}
    DZ=Math.max(420,Math.min(W,Hh)*.62);
    stage.style.perspective=Math.round(Math.max(W,Hh)*1.05)+'px';
    stage.style.perspectiveOrigin=cx+'px '+cy+'px';
    world.style.left=cx+'px';world.style.top=cy+'px';
    planes.forEach(function(p,i){var w=Math.min(maxW,maxH*ar[i]),h=w/ar[i];p.style.width=w+'px';p.style.height=h+'px';p.style.marginLeft=(-w/2)+'px';p.style.marginTop=(-h/2)+'px';p._w=w;p._h=h});
  }
  function measure(){var r=sec.getBoundingClientRect(),span=Math.max(1,r.height-stick.clientHeight);P=clamp(-r.top/span,0,1);inView=r.bottom>-120&&r.top<innerHeight+120}
  function frame(ts){
    requestAnimationFrame(frame);
    var dt=Math.min(.05,(ts-last)/1000||.016);last=ts;
    measure();if(!inView)return;
    time+=dt;
    var k=RM?1:1-Math.pow(.0015,dt);
    tgt=P*(N-1);cur+=(tgt-cur)*k;
    pc.x+=(pt.x-pc.x)*(RM?1:1-Math.pow(.02,dt));pc.y+=(pt.y-pc.y)*(RM?1:1-Math.pow(.02,dt));
    var rx=RM?0:-pc.y*5,ry=RM?0:pc.x*8;
    var bob=RM?0:Math.sin(time*.8)*5;
    world.style.transform='translate3d(0,'+bob.toFixed(1)+'px,0) rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg)';
    var lat=dv==='laptop'?(center?.9:.72):.62;
    for(var i=0;i<N;i++){
      var p=planes[i],d=i-cur;            /* d<0: already passed (towards camera), d>0: ahead */
      var dz=-d*DZ;                        /* world z */
      var a=Math.abs(d);
      var ahead=d>0;
      var opacity,blur,sx,sy,yaw,z=dz;
      if(RM){opacity=a<.5?1:0;blur=0;sx=0;sy=0;yaw=0;z=0}
      else{
        var fan=sm(Math.min(1,a*1.15));
        var dir=(i%2?1:-1);
        sx=dir*fan*p._w*lat*(dv==='laptop'?1:.7)+(ahead?0:dir*fan*p._w*.3);
        sy=(i%3-1)*fan*p._h*.12;
        yaw=-dir*fan*14;
        blur=Math.min(7,a*5.2)*(ahead?1:1.3);
        opacity=ahead?1-clamp((a-1.25)/1.35,0,1):1-clamp((a-.15)/.55,0,1);
        if(!ahead&&a>.15)z=dz*.9;
      }
      p.style.transform='translate3d('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px,'+z.toFixed(1)+'px) rotateY('+yaw.toFixed(2)+'deg)';
      p.style.opacity=opacity<.01?0:opacity.toFixed(3);
      p.style.filter=blur>.25?'blur('+blur.toFixed(2)+'px) brightness('+(1-Math.min(.35,a*.2)).toFixed(2)+')':'none';
      p.style.visibility=opacity<.01?'hidden':'visible';
      p.style.zIndex=String(100-Math.round(a*10));
      p.style.pointerEvents=a<.4?'auto':'none';
      p.style.setProperty('--cap',a<.3?1:0);
      p.style.setProperty('--sx',(-pc.x*40).toFixed(1)+'%');
    }
    var n3=beats.length,pos=P*n3;
    beats.forEach(function(b,i){var c=i+.5,o=1-clamp(Math.abs(pos-c)*2.6-.55,0,1);o=sm(o);b.style.opacity=o.toFixed(3);b.style.transform='translateY('+((pos-c)*-26).toFixed(1)+'px)';b.style.visibility=o<.02?'hidden':'visible';b.style.pointerEvents=o>.5?'auto':'none'});
    var act=clamp(Math.floor(pos),0,n3-1);dots.forEach(function(dd,i){dd.classList.toggle('on',i===act)});
  }
  layout();measure();
  addEventListener('resize',function(){layout()});
  addEventListener('load',function(){layout()});
  H.classList.add('rp-ready');
  requestAnimationFrame(frame);
  window.__rp={stage:function(){return{P:P,cur:cur,N:N,dev:dv}}};
})();

/* ---------- tilt on hero card, highlights, gallery ---------- */
(function(){
  if(RM)return;
  function bind(sel,max,ctx){
    D.querySelectorAll(sel).forEach(function(el){
      el.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        el.style.setProperty('--ry',(x*max).toFixed(2)+'deg');el.style.setProperty('--rx',(-y*max).toFixed(2)+'deg');el.style.setProperty('--gx',((x+.5)*100)+'%');el.style.setProperty('--gy',((y+.5)*100)+'%')});
      el.addEventListener('pointerleave',function(){el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg')});
    });
  }
  bind('.rp-hl-c .im',12);bind('.rp-gal .g-it .ph-in',10);
  /* hero: pointer on fine devices (app.js loop targets .subj-tilt too, harmless), gyro/touch via shared pt */
  if(heroT&&(!FINE||OWN)){(function loop(){heroT.style.setProperty('--ry',(pc.x*12).toFixed(2)+'deg');heroT.style.setProperty('--rx',(-pc.y*10).toFixed(2)+'deg');heroT.style.setProperty('--sx',(-pc.x*40).toFixed(1)+'%');requestAnimationFrame(loop)})()}
  else if(heroT){(function loop(){heroT.style.setProperty('--sx',(-pc.x*40).toFixed(1)+'%');pc.x+=(pt.x-pc.x)*.08;pc.y+=(pt.y-pc.y)*.08;requestAnimationFrame(loop)})()}
})();

/* ---------- lightbox with depth-of-field zoom (FLIP) ---------- */
(function(){
  var items=[].slice.call(D.querySelectorAll('[data-lb]'));if(!items.length)return;
  var lb=D.createElement('div');lb.className='rp-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo');
  lb.innerHTML='<img alt=""><div class="cap"></div><button class="nav prev" aria-label="Previous">‹</button><button class="nav next" aria-label="Next">›</button><button class="x" aria-label="Close">×</button>';
  D.body.appendChild(lb);
  var im=lb.querySelector('img'),cap=lb.querySelector('.cap'),idx=0,src=null,opener=null,set=[];
  function uniq(){var seen={};set=[];items.forEach(function(el){var u=el.dataset.lb;if(!seen[u]){seen[u]=1;set.push({u:u,c:el.dataset.cap||'',el:el})}})}
  uniq();
  function open(el){
    var u=el.dataset.lb;idx=Math.max(0,set.findIndex(function(s){return s.u===u}));opener=el;
    var thumb=el.querySelector('img'),r=thumb?thumb.getBoundingClientRect():el.getBoundingClientRect();
    im.src=u;im.alt=thumb?thumb.alt:'';cap.textContent=set[idx].c;lb.classList.add('open');
    if(H.classList.contains('lenis')&&window.__lenis)window.__lenis.stop();
    lb.querySelector('.x').focus({preventScroll:true});
    function fly(){
      var b=im.getBoundingClientRect();if(!b.width||RM)return;
      var sx=r.width/b.width,sy=r.height/b.height,dx=r.left+r.width/2-(b.left+b.width/2),dy=r.top+r.height/2-(b.top+b.height/2);
      im.animate([{transform:'translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')',filter:'blur(8px)'},{transform:'none',filter:'blur(0px)'}],{duration:800,easing:'cubic-bezier(.2,.8,.2,1)'});
    }
    if(im.complete)fly();else im.onload=fly;
  }
  function close(){lb.classList.remove('open');if(window.__lenis)window.__lenis.start();if(opener&&opener.focus)try{opener.focus({preventScroll:true})}catch(e){}}
  function go(n){idx=(idx+n+set.length)%set.length;im.src=set[idx].u;cap.textContent=set[idx].c;if(!RM)im.animate([{opacity:0,transform:'scale(.96)',filter:'blur(10px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:500,easing:'ease-out'})}
  items.forEach(function(el){el.addEventListener('click',function(e){if(e.target.closest('a'))return;open(el)});el.setAttribute('tabindex',el.getAttribute('tabindex')||'0');el.setAttribute('role','button');el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(el)}})});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('x'))close()});
  lb.querySelector('.prev').addEventListener('click',function(){go(-1)});lb.querySelector('.next').addEventListener('click',function(){go(1)});
  addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
})();
})();
