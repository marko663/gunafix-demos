/* Red Beard · GunaFix preview */
window.SIG=function(gsap,ScrollTrigger,D,S){

var tl=PINTL(320),pin=D.querySelector('.rb-pin');
gsap.set(pin,{backgroundColor:'#F3E8D6',color:'#141312'});
tl.to(pin,{backgroundColor:'#E8B04B',color:'#141312',duration:.6},.7)
  .to(pin,{backgroundColor:'#B53A23',color:'#F3E8D6',duration:.6},1.7)
  .to(pin,{backgroundColor:'#141312',color:'#F3E8D6',duration:.6},2.7)
  .fromTo('.rb-g1',{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(8% 0% 0% 0%)',duration:3.6},0)
  .to({}, {duration:.4},3.6);

};
/* GunaFix batch D motion core: Lenis + GSAP ScrollTrigger + SplitType. Each site adds its own signature moment in window.SIG. */
(function(){
'use strict';
var S=window.SITE||{},D=document,H=D.documentElement;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=matchMedia('(pointer:fine) and (min-width:960px)').matches;
/* live open / closed status in the venue's time zone */
function venueNow(){var p=new Intl.DateTimeFormat('en-US',{timeZone:S.tz,weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());var o={};p.forEach(function(x){o[x.type]=x.value});return{d:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(o.weekday),m:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)}}
function mins(t){var a=t.split(':');return(+a[0])*60+(+a[1])}
function fmt(t){var a=t.split(':'),h=+a[0],m=+a[1];if(!S.h12)return S.lang==='pt-PT'?(a[0]+'h'+a[1]):t;if(h===0&&m===0)return'midnight';var ap=h<12?'am':'pm',hh=h%12||12;return hh+(m?':'+(m<10?'0':'')+m:'')+ap}
function status(){var els=[D.getElementById('status'),D.getElementById('status2')].filter(Boolean);if(!S.hours)return;var n=venueNow(),L=S.L,txt,open=false;
 D.querySelectorAll('.hours tr[data-d]').forEach(function(r){if(+r.dataset.d===n.d){r.classList.add('today');r.querySelector('th').setAttribute('data-today',L.today)}});
 function ivs(d){return(S.hours[d]||[]).map(function(x){var a=mins(x[0]),b=mins(x[1]);if(b<=a)b+=1440;return[a,b,x]})}
 ivs((n.d+6)%7).forEach(function(i){if(i[1]>1440&&n.m<i[1]-1440){open=true;txt=L.open+' · '+L.until+' '+fmt(i[2][1])}});
 if(!open)ivs(n.d).forEach(function(i){if(n.m>=i[0]&&n.m<i[1]){open=true;txt=L.open+' · '+L.until+' '+fmt(i[2][1])}});
 if(!open){for(var k=0;k<8&&!txt;k++){var dd=(n.d+k)%7;ivs(dd).forEach(function(i){if(txt)return;if(k>0||i[0]>n.m){txt=L.closed+' · '+L.opens+' '+(k===0?'':L.dshort[dd]+' ')+fmt(i[2][0])}})}txt=txt||L.closed}
 els.forEach(function(el){el.classList.toggle('is-open',open);el.querySelector('.st-txt').textContent=txt})}
status();setInterval(status,60000);
/* mobile dock hides while hero buttons are visible */
(function(){var dk=D.querySelector('.dock'),hb=D.querySelector('.hero .btns');if(!dk||!hb||!('IntersectionObserver' in window))return;dk.classList.add('dock-hide');new IntersectionObserver(function(es){es.forEach(function(e){dk.classList.toggle('dock-hide',e.isIntersecting)})},{threshold:0}).observe(hb)})();
/* menu tabs */
var tabs=[].slice.call(D.querySelectorAll('[role=tab]'));
function sel(t){tabs.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;D.getElementById(b.getAttribute('aria-controls')).hidden=!on});if(window.ScrollTrigger)ScrollTrigger.refresh();if(window.gsap&&!reduce)gsap.fromTo('#'+t.getAttribute('aria-controls')+' li',{y:22,opacity:0},{y:0,opacity:1,stagger:.035,duration:.6,ease:'power3.out'})}
tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var n=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];sel(n);n.focus()}})});
/* nav */
var nav=D.getElementById('nav');function navState(){if(nav)nav.classList.toggle('solid',(window.scrollY||0)>60)}navState();addEventListener('scroll',navState,{passive:true});
/* pointer tilt on [data-tilt] (desktop only) */
if(fine&&!reduce){var tilts=[].slice.call(D.querySelectorAll('[data-tilt]')),tx=0,ty=0,cx=0,cy=0,amp=+(S.tilt||14);
 addEventListener('pointermove',function(e){tx=(e.clientX/innerWidth-.5)*amp;ty=(e.clientY/innerHeight-.5)*-amp},{passive:true});
 (function loop(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;var ang=Math.sqrt(cx*cx+cy*cy),rv=ang<.05?'none':(cy/ang).toFixed(3)+' '+(cx/ang).toFixed(3)+' 0 '+ang.toFixed(2)+'deg';for(var i=0;i<tilts.length;i++){tilts[i].style.rotate=rv}requestAnimationFrame(loop)})()}
if(reduce||!window.gsap||!window.ScrollTrigger){H.classList.remove('motion-ok');return}
gsap.registerPlugin(ScrollTrigger);
/* Lenis */
var lenis=null;if(window.Lenis){lenis=new Lenis({duration:1.15,smoothWheel:true});window.__lenis=lenis;lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
 D.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length>1&&D.querySelector(id)){e.preventDefault();lenis.scrollTo(id,{offset:-72})}})})}
var M=S.motion||{};
/* hero title: masked char reveal */
var ht=D.querySelector('.hero-title');
if(ht&&window.SplitType){ht.querySelectorAll('.hl-in').forEach(function(el){new SplitType(el,{types:'words,chars'})});
 gsap.set(ht.querySelectorAll('.hl-in'),{visibility:'visible'});
 gsap.from(ht.querySelectorAll('.char'),Object.assign({yPercent:115,rotate:M.heroRot||0,duration:1.25,ease:M.heroEase||'expo.out',stagger:M.heroStagger||.045,delay:.15},M.heroFrom||{}))}
else if(ht){gsap.set(ht.querySelectorAll('.hl-in'),{visibility:'visible'})}
gsap.from('.hero [data-hero-in]',{y:28,opacity:0,duration:1,ease:'power3.out',stagger:.08,delay:.55});
/* section titles */
D.querySelectorAll('[data-split]').forEach(function(el){if(!window.SplitType)return;var mode=el.dataset.split||M.titleSplit||'chars';var st=new SplitType(el,{types:mode==='words'?'words':'words,chars'});var tg=mode==='words'?st.words:st.chars;
 gsap.from(tg,{yPercent:110,opacity:mode==='fade'?0:1,rotate:M.titleRot||0,duration:1.1,ease:'expo.out',stagger:mode==='words'?.07:.022,scrollTrigger:{trigger:el,start:'top 86%'}})});
/* story words */
D.querySelectorAll('.words').forEach(function(el){if(!window.SplitType)return;var st=new SplitType(el,{types:'words'});gsap.fromTo(st.words,{opacity:.14},{opacity:1,stagger:.03,ease:'none',scrollTrigger:{trigger:el,start:'top 82%',end:'bottom 52%',scrub:true}})});
D.querySelectorAll('[data-reveal]').forEach(function(el){gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}})});
D.querySelectorAll('.ph-in').forEach(function(ph){if(ph.closest('.hero')||ph.closest('.pin'))return;gsap.fromTo(ph,{clipPath:M.clipFrom||'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.4,ease:'expo.out',scrollTrigger:{trigger:ph,start:'top 92%'}});var im=ph.querySelector('img');if(im)gsap.from(im,{scale:1.22,duration:1.8,ease:'expo.out',scrollTrigger:{trigger:ph,start:'top 92%'}})});
D.querySelectorAll('[data-speed]').forEach(function(el){var s=+el.dataset.speed;gsap.fromTo(el,{yPercent:-s},{yPercent:s,ease:'none',scrollTrigger:{trigger:el.closest('section')||el,start:'top bottom',end:'bottom top',scrub:true}})});
/* pinned signature helper: one pin per page, data-step = active chapter, [data-ch] gets .is-on */
window.PINTL=function(len,opts){opts=opts||{};var pin=D.querySelector('.pin'),n=S.steps||4,chs=[].slice.call(pin.querySelectorAll('[data-ch]'));
 function setStep(st){if(pin.dataset.step===String(st))return;pin.dataset.step=st;chs.forEach(function(c){c.classList.toggle('is-on',+c.dataset.ch===st)});if(opts.onStep)opts.onStep(st)}
 return gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:pin,start:'top top',end:'+='+(len||300)+'%',scrub:opts.scrub||.8,pin:true,anticipatePin:1,invalidateOnRefresh:true,onUpdate:function(s){setStep(Math.min(n-1,Math.floor(s.progress*n)))}}})};
/* site signature moment */
if(typeof window.SIG==='function'){try{window.SIG(gsap,ScrollTrigger,D,S)}catch(e){console.error('sig',e)}}
window.__ready=true;
addEventListener('load',function(){ScrollTrigger.refresh()});
})();
