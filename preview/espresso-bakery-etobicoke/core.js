/* GunaFix preview core (batch D v2). Shared helpers; each venue adds its own scenes in app.js. */
(function(){
var d=document,h=d.documentElement;
var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var FINE=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
h.classList.add('js');h.classList.add(RM?'rm':'motion');if(FINE)h.classList.add('fine');
window.GF={RM:RM,FINE:FINE,bp:function(){var w=innerWidth;return w>=1025?'laptop':w>=768?'ipad':'phone'}};
/* Smooth scroll on fine pointers only */
window.addEventListener('load',function(){
 if(!RM&&FINE&&window.Lenis){var l=new Lenis({lerp:.11});window.__lenis=l;
  if(window.ScrollTrigger){l.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){l.raf(t*1000)});gsap.ticker.lagSmoothing(0)}
  else{(function r(t){l.raf(t);requestAnimationFrame(r)})(0)}
  d.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=d.querySelector(a.getAttribute('href'));if(t){e.preventDefault();l.scrollTo(t,{offset:-10})}})});
 }
});
/* Fit text: [data-fit] scales its font so the widest .l line fills (not exceeds) its box. data-fit-max = max px */
function fitAll(){d.querySelectorAll('[data-fit]').forEach(function(el){var mx=parseFloat(el.dataset.fitMax||'9999');el.style.fontSize='10px';
 var lines=el.querySelectorAll('.l');var w=0;(lines.length?lines:[el]).forEach(function(l){var ds=l.style.display;l.style.display='inline-block';w=Math.max(w,l.offsetWidth);l.style.display=ds});
 var cs=getComputedStyle(el);var avail=el.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);var f=Math.min(mx,10*avail/w*(parseFloat(el.dataset.fit)||.98));el.style.fontSize=f+'px'})}
window.GF_fit=fitAll;
/* Reveal on view */
function reveal(){var els=d.querySelectorAll('[data-r]');
 if(RM||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
 els.forEach(function(e){io.observe(e)});}
/* Opening hours: window.HOURS = {tz:'Europe/London', days:[[['07:30','14:00']],...Mon..Sun], labels:[...7 names], open:'Open now', closed:'Closed', until:'until', opens:'opens'} */
function nowIn(tz){var f=new Intl.DateTimeFormat('en-GB',{timeZone:tz,weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());var o={};f.forEach(function(p){o[p.type]=p.value});var wd=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(o.weekday);return{wd:wd,m:(+o.hour%24)*60+(+o.minute)}}
function mins(s){var p=s.split(':');return +p[0]*60+(+p[1])}
function status(){var H=window.HOURS;if(!H)return;var n=nowIn(H.tz),txt,open=false;
 // check today and yesterday spill-over (e.g. 11:30-02:00)
 var y=(n.wd+6)%7;(H.days[y]||[]).forEach(function(r){var a=mins(r[0]),b=mins(r[1]);if(b<=a&&n.m<b){open=true;txt=H.open+' · '+H.until+' '+r[1]}});
 (H.days[n.wd]||[]).forEach(function(r){var a=mins(r[0]),b=mins(r[1]);if(b<=a)b+=1440;if(n.m>=a&&n.m<b){open=true;txt=H.open+' · '+H.until+' '+r[1]}});
 if(!open){for(var i=0;i<8&&!txt;i++){var day=(n.wd+i)%7;(H.days[day]||[]).some(function(r){if(i===0&&mins(r[0])<=n.m)return false;txt=H.closed+' · '+H.opens+' '+(i===0?H.today:H.labels[day])+' '+r[0];return true})}}
 d.querySelectorAll('[data-status]').forEach(function(e){e.textContent=txt||'';e.classList.toggle('is-open',open);e.classList.toggle('is-closed',!open)});
 d.querySelectorAll('[data-hours] [data-day]').forEach(function(r){r.classList.toggle('today',+r.dataset.day===n.wd)});
}
/* Curtain panels: [data-open="#id"], [data-close] */
function curtains(){var last;
 d.querySelectorAll('[data-open]').forEach(function(b){b.addEventListener('click',function(e){var p=d.querySelector(b.dataset.open);if(!p)return;e.preventDefault();last=b;p.hidden=false;requestAnimationFrame(function(){p.classList.add('on');h.classList.add('locked')});var f=p.querySelector('a,button,input');f&&setTimeout(function(){f.focus()},RM?0:350)})});
 function close(p){p.classList.remove('on');h.classList.remove('locked');setTimeout(function(){p.hidden=true},RM?0:650);last&&last.focus()}
 d.querySelectorAll('[data-close]').forEach(function(b){b.addEventListener('click',function(){close(b.closest('.curtain'))})});
 d.querySelectorAll('.curtain a[href^="#"]').forEach(function(a){a.addEventListener('click',function(){close(a.closest('.curtain'))})});
 d.addEventListener('keydown',function(e){if(e.key==='Escape'){var p=d.querySelector('.curtain.on');p&&close(p)}});
}
/* Cursor-reactive list: [data-hover-list] rows [data-pv="#tpl"]; floating .pv follows pointer on fine pointers; tap toggles .open on touch */
function hoverLists(){d.querySelectorAll('[data-hover-list]').forEach(function(list){
 var rows=list.querySelectorAll('[data-pv]');
 if(FINE&&!RM){var pv=d.createElement('div');pv.className='pv';pv.setAttribute('aria-hidden','true');d.body.appendChild(pv);
  var x=0,y=0,tx=0,ty=0,on=false;
  function loop(){x+=(tx-x)*.16;y+=(ty-y)*.16;pv.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%) rotate('+((tx-x)*.04)+'deg)';requestAnimationFrame(loop)}loop();
  rows.forEach(function(r){r.addEventListener('pointerenter',function(){var t=d.querySelector(r.dataset.pv);pv.innerHTML=t?t.innerHTML:'';pv.classList.add('on');on=true});
   r.addEventListener('pointerleave',function(){pv.classList.remove('on');on=false})});
  list.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY});
 }
 rows.forEach(function(r){var b=r.querySelector('button.row-btn');if(!b)return;b.addEventListener('click',function(){var o=r.classList.toggle('open');b.setAttribute('aria-expanded',o)})});
})}
d.addEventListener('DOMContentLoaded',function(){fitAll();(d.fonts&&d.fonts.ready||Promise.resolve()).then(function(){fitAll();window.ScrollTrigger&&ScrollTrigger.refresh()});var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(fitAll,120)});reveal();status();setInterval(status,60000);curtains();hoverLists();
 d.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()})});
})();
