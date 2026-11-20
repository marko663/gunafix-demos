(function(){
'use strict';
var S=window.SITE||{},D=document,H=D.documentElement;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=matchMedia('(pointer:fine) and (min-width:960px)').matches;

/* ---------- live open / closed status in the venue's own time zone ---------- */
function venueNow(){
  var p=new Intl.DateTimeFormat('en-US',{timeZone:S.tz,weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
  var o={};p.forEach(function(x){o[x.type]=x.value});
  var d=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(o.weekday);var h=parseInt(o.hour,10)%24;
  return{d:d,m:h*60+parseInt(o.minute,10)};
}
function mins(t){var a=t.split(':');return(+a[0])*60+(+a[1])}
function fmt(t){var a=t.split(':'),h=+a[0],m=+a[1];if(!S.h12)return t;if(h===0&&m===0)return'midnight';var ap=h<12?'am':'pm',hh=h%12||12;return hh+(m?':'+(m<10?'0':'')+m:'')+ap}
function status(){
  var els=[D.getElementById('status'),D.getElementById('status2')].filter(Boolean);
  if(!S.hours){return}
  var n=venueNow(),L=S.L,txt,open=false;
  // today highlight
  D.querySelectorAll('.hours tr[data-d]').forEach(function(r){if(+r.dataset.d===n.d){r.classList.add('today');r.querySelector('th').setAttribute('data-today',L.today)}});
  function ivs(d){return (S.hours[d]||[]).map(function(x){var a=mins(x[0]),b=mins(x[1]);if(b<=a)b+=1440;return[a,b,x]})}
  var y=(n.d+6)%7;
  ivs(y).forEach(function(i){if(i[1]>1440&&n.m<i[1]-1440){open=true;txt=L.open+' · '+L.until+' '+fmt(i[2][1])}});
  if(!open)ivs(n.d).forEach(function(i){if(n.m>=i[0]&&n.m<i[1]){open=true;txt=L.open+' · '+L.until+' '+fmt(i[2][1])}});
  if(!open){
    for(var k=0;k<8&&!txt;k++){var dd=(n.d+k)%7;ivs(dd).forEach(function(i){if(txt)return;if(k>0||i[0]>n.m){txt=L.closed+' · '+L.opens+' '+(k===0?'':L.dshort[dd]+' ')+fmt(i[2][0])}})}
    txt=txt||L.closed;
  }
  els.forEach(function(el){el.classList.toggle('is-open',open);el.querySelector('.st-txt').textContent=txt});
}
status();setInterval(status,60000);

/* ---------- menu tabs ---------- */
var tabs=[].slice.call(D.querySelectorAll('[role=tab]'));
function sel(t){tabs.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;D.getElementById(b.getAttribute('aria-controls')).hidden=!on});
  if(window.ScrollTrigger)ScrollTrigger.refresh();
  if(window.gsap&&!reduce){gsap.fromTo('#'+t.getAttribute('aria-controls')+' li',{y:24,opacity:0},{y:0,opacity:1,stagger:.03,duration:.6,ease:'power3.out'})}}
tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var n=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];sel(n);n.focus()}})});

/* ---------- nav state ---------- */
var nav=D.getElementById('nav'),rib=D.querySelector('.ribbon');function ribH(){if(rib)D.documentElement.style.setProperty('--rib',rib.offsetHeight+'px')}ribH();addEventListener('resize',ribH);function navState(){nav.classList.toggle('solid',(window.scrollY||0)>80)}navState();addEventListener('scroll',navState,{passive:true});

/* ---------- pointer tilt (desktop) ---------- */
if(fine&&!reduce){var tilt=D.querySelector('.subj-hero .subj-tilt');var tx=0,ty=0,cx=0,cy=0;
  addEventListener('pointermove',function(e){tx=(e.clientX/innerWidth-.5)*16;ty=(e.clientY/innerHeight-.5)*-16},{passive:true});
  (function loop(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;if(tilt){tilt.style.setProperty('--ry',cx.toFixed(2)+'deg');tilt.style.setProperty('--rx',cy.toFixed(2)+'deg')}requestAnimationFrame(loop)})();}

if(reduce||!window.gsap||!window.ScrollTrigger){H.classList.remove('motion-ok');return}
gsap.registerPlugin(ScrollTrigger);

/* ---------- Lenis smooth scroll ---------- */
var lenis=null;
if(window.Lenis){lenis=new Lenis({duration:1.1,smoothWheel:true});window.__lenis=lenis;
  lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  D.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length>1&&D.querySelector(id)){e.preventDefault();lenis.scrollTo(id,{offset:-70})}})});}

/* ---------- split-text hero reveal ---------- */
var hasSplit=!!window.SplitType;
D.querySelectorAll('.hero-title .hl-in').forEach(function(el,i){
  var chars=[el];if(hasSplit){chars=new SplitType(el,{types:'chars'}).chars}
  el.style.visibility='visible';
  gsap.from(chars,{yPercent:115,rotate:6,duration:1.25,ease:'expo.out',stagger:.035,delay:.15+i*.18});
});
gsap.from('.subj-hero .subj-par',{scale:.6,opacity:0,y:80,duration:1.6,ease:'expo.out',delay:.35});
gsap.from('.hero-foot > *',{y:40,opacity:0,duration:1,ease:'power3.out',stagger:.12,delay:.6});
/* parallax: background slow, subject faster */
gsap.to('.hero-bg img',{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.subj-hero .subj-par',{yPercent:-45,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hl1',{xPercent:-8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hl2',{xPercent:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

/* ---------- section titles: masked line reveal ---------- */
D.querySelectorAll('.sec-t,.cta-t').forEach(function(t){
  gsap.to(t.querySelectorAll('.ln-in'),{y:0,duration:1.2,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:t,start:'top 85%'}});
});
/* story paragraphs: word-by-word scrub */
D.querySelectorAll('.words').forEach(function(p){
  var w=hasSplit?new SplitType(p,{types:'words'}).words:[p];
  gsap.to(w,{opacity:1,stagger:.04,ease:'none',scrollTrigger:{trigger:p,start:'top 85%',end:'bottom 55%',scrub:true}});
});
/* generic reveals */
ScrollTrigger.batch('[data-reveal]',{start:'top 90%',onEnter:function(b){gsap.to(b,{opacity:1,y:0,duration:1,ease:'power3.out',stagger:.1})}});
/* image slide-up reveals + parallax at different speeds */
D.querySelectorAll('.ph-in').forEach(function(ph){
  gsap.to(ph,{clipPath:'inset(0% 0 0 0)',duration:1.4,ease:'expo.out',scrollTrigger:{trigger:ph,start:'top 92%'}});
  gsap.from(ph.querySelector('img'),{scale:1.25,duration:1.8,ease:'expo.out',scrollTrigger:{trigger:ph,start:'top 92%'}});
});
D.querySelectorAll('[data-speed]').forEach(function(el){var s=+el.dataset.speed;
  gsap.fromTo(el,{yPercent:-s},{yPercent:s,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}})});

/* ---------- pinned signature showcase ---------- */
var pin=D.querySelector('.pin');
if(pin){
  var ch=[].slice.call(pin.querySelectorAll('.chap')),pr=[].slice.call(pin.querySelectorAll('.prog li')),spin=pin.querySelector('.subj-spin'),n=ch.length;
  function mark(i){pr.forEach(function(l,k){l.classList.toggle('on',k===i)})}mark(0);
  gsap.set(pin,{backgroundColor:S.chapters[0],color:S.chapter_ink[0]});
  var tl=gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{trigger:pin,start:'top top',end:function(){return'+='+(innerHeight*(innerWidth<760?.8:1)*(n-1)+innerHeight*.4)},pin:true,scrub:.7,anticipatePin:1,
    onUpdate:function(st){mark(Math.min(n-1,Math.round(st.progress*(n-1))))}}});
  var SP=!!S.spin;tl.fromTo(spin,{rotate:SP?-25:-6,scale:.85},{rotate:0,scale:1,duration:.4},0);
  for(var i=1;i<n;i++){
    var at=i-.6;
    tl.to(pin,{backgroundColor:S.chapters[i],color:S.chapter_ink[i],duration:1},at)
      .to(ch[i-1],{autoAlpha:0,yPercent:-30,duration:.45},at)
      .fromTo(ch[i],{autoAlpha:0,yPercent:30},{autoAlpha:1,yPercent:0,duration:.5},at+.5)
      .to(spin,{rotate:SP?'+=120':(i%2?7:-5),y:SP?0:(i%2?-18:10),scale:i%2?1.08:0.96,duration:1},at);
  }
  tl.to({},{duration:.4});
  gsap.to(pin.querySelector('.pin-mq'),{xPercent:-12,ease:'none',scrollTrigger:{trigger:pin,start:'top bottom',end:'bottom top',scrub:true}});
}
window.__ready=true;
addEventListener('load',function(){ScrollTrigger.refresh()});
})();
