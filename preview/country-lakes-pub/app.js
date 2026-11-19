window.__CFG={"tz": "America/New_York", "hours": null, "t": {"closed": "Closed", "open": "Open now", "closes": "closes", "opens": "opens", "call": "Call for today's hours", "banner": "Design preview by GunaFix, not the official website of {n}.", "credits": "Image credits", "skip": "Skip to content", "dir": "Directions"}, "lang": "en"};
(function(){
const H=document.documentElement,C=window.__CFG;
const motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(motion)H.classList.add('motion'); if(fine)H.classList.add('fine');
const GF=window.GF={motion,fine,lenis:null,bp:()=>innerWidth>=1025?'laptop':innerWidth>=768?'ipad':'phone'};
// reveals
const rs=document.querySelectorAll('[data-r]');
if(!motion||!('IntersectionObserver' in window))rs.forEach(e=>e.classList.add('in'));
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});rs.forEach(e=>io.observe(e))}
// open status
function now(){const p=new Intl.DateTimeFormat('en-GB',{timeZone:C.tz,weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const g=t=>p.find(x=>x.type===t).value;return{d:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(g('weekday')),m:(+g('hour'))*60+(+g('minute'))}}
const mm=t=>{const[a,b]=t.split(':').map(Number);return a*60+b}
const f=t=>{if(C.lang!=='en')return t;const[h,m]=t.split(':').map(Number);if(h===0&&m===0)return'midnight';return((h%12)||12)+(m?':'+String(m).padStart(2,'0'):'')+(h<12?'am':'pm')}
const DN={en:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],it:['lun','mar','mer','gio','ven','sab','dom'],es:['lun','mar','mié','jue','vie','sáb','dom']}[C.lang];
let st={open:null,txt:C.t.call};
if(C.hours){const n=now();let o=null;(C.hours[n.d]||[]).forEach(([a,b])=>{const B=b==='00:00'?1440:mm(b);if(n.m>=mm(a)&&n.m<B)o=b});
 if(o)st={open:true,txt:C.t.open+' · '+C.t.closes+' '+f(o)};
 else{let nx=null;for(let k=0;k<8&&!nx;k++){const d=(n.d+k)%7;for(const[a]of(C.hours[d]||[])){if(k>0||mm(a)>n.m){nx={k,d,a};break}}}
  st={open:false,txt:C.t.closed+(nx?' · '+C.t.opens+' '+f(nx.a)+(nx.k>0?' ('+DN[nx.d]+')':''):'')}}}
GF.status=st;
document.querySelectorAll('[data-status]').forEach(e=>{e.textContent=st.txt;e.dataset.open=st.open});
// smooth scroll
if(motion&&fine&&window.Lenis){const l=GF.lenis=new Lenis({lerp:.11});if(window.gsap&&window.ScrollTrigger){l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0)}else{const r=t=>{l.raf(t);requestAnimationFrame(r)};requestAnimationFrame(r)}}
if(window.gsap&&window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
GF.go=function(id){const el=document.querySelector(id);if(!el)return;if(GF.lenis)GF.lenis.scrollTo(el,{offset:0});else el.scrollIntoView({behavior:motion?'smooth':'auto'});el.setAttribute('tabindex','-1');el.focus({preventScroll:true})};
// curtain/wipe on in-page links when a .wipe element exists
const wipe=document.querySelector('.wipe');
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.getAttribute('href').length<2)return;const id=a.getAttribute('href');if(!document.querySelector(id))return;e.preventDefault();
 if(wipe&&motion){wipe.classList.remove('out');wipe.classList.add('on');setTimeout(()=>{if(GF.lenis)GF.lenis.scrollTo(id,{immediate:true});else document.querySelector(id).scrollIntoView();wipe.classList.add('out');setTimeout(()=>wipe.classList.remove('on','out'),620)},420);const el=document.querySelector(id);el.setAttribute('tabindex','-1');el.focus({preventScroll:true})}else GF.go(id);
 document.dispatchEvent(new CustomEvent('gf:nav'))});
})();


(function(){
const ct=document.querySelector('.ballct .n');
if(GF.motion&&window.gsap&&window.ScrollTrigger){
 const mm=gsap.matchMedia();
 mm.add({lap:'(min-width:1025px)',pad:'(min-width:768px) and (max-width:1024px)',ph:'(max-width:767px)'},c=>{
  const len=c.conditions.lap?1800:c.conditions.pad?1400:1000;
  const B=gsap.utils.toArray('.rack .ball');
  const tl=gsap.timeline({scrollTrigger:{trigger:'.rk',start:'top top',end:'+='+len,pin:'.rk-w',scrub:.6,onUpdate:s=>{ct.textContent=Math.min(15,Math.floor(s.progress*17))}}});
  tl.from('.tri',{opacity:0,scale:.6,transformOrigin:'200px 200px',duration:.4});
  B.forEach((b,i)=>{const a=(i/15)*Math.PI*2;tl.from(b,{x:Math.cos(a)*520,y:Math.sin(a)*420,rotate:360,duration:.5,ease:'power2.out'},.3+i*.1)});
  tl.from('.cue',{y:200,opacity:0,duration:.4});
 });
}else{ct.textContent='15'}
// grub flips
const g=document.querySelector('.grub');new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){g.classList.add('go');o.disconnect()}},{threshold:.3}).observe(g);
// darts
const btn=document.querySelector('.dartbtn'),svg=btn.querySelector('svg'),dg=svg.querySelector('.darts'),out=document.querySelector('.dscore');
const N=[20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];let round=[],total=0;
function score(x,y){const dx=x-160,dy=y-160,r=Math.hypot(dx,dy);if(r>150)return[0,'Miss! Off the board'];if(r<9)return[50,'Bullseye!'];if(r<20)return[25,'Outer bull'];let a=Math.atan2(dy,dx)*180/Math.PI+90+9;a=(a+360)%360;const n=N[Math.floor(a/18)];if(r>=140)return[n*2,'Double '+n];if(r>=90&&r<100)return[n*3,'Treble '+n];return[n,String(n)]}
function throwAt(x,y){if(round.length===3){round=[];dg.innerHTML=''}const[s,t]=score(x,y);round.push(s);total+=s;
 const ns='http://www.w3.org/2000/svg',d=document.createElementNS(ns,'g');d.innerHTML=`<line x1="${x}" y1="${y}" x2="${x+16}" y2="${y-22}" stroke="#FF7A1A" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="3.5" fill="#F1F0E8"/>`;dg.appendChild(d);
 if(GF.motion)d.animate([{transform:'translate(60px,-80px) scale(1.6)',opacity:0},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.2,.8,.3,1)'});
 out.textContent=`${t} · ${s} pts. Round: ${round.reduce((a,b)=>a+b,0)} (${round.length}/3)`+(round.length===3?'. Come play for real at 558 Lakehurst Rd.':'')}
btn.addEventListener('click',e=>{const r=svg.getBoundingClientRect();if(e.clientX===0&&e.clientY===0){const a=Math.random()*Math.PI*2,R=Math.random()*150;throwAt(160+Math.cos(a)*R,160+Math.sin(a)*R);return}const x=(e.clientX-r.left)/r.width*336-8,y=(e.clientY-r.top)/r.height*336-8;const j=GF.fine?6:14;throwAt(x+(Math.random()-.5)*j,y+(Math.random()-.5)*j)});
})();
