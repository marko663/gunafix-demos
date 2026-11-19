window.__CFG={"tz": "America/New_York", "hours": [[["06:00", "15:00"]], [["06:00", "15:00"]], [["06:00", "15:00"]], [["06:00", "15:00"]], [["06:00", "15:00"]], [["06:00", "15:00"]], [["06:00", "15:00"]]], "t": {"closed": "Closed", "open": "Open now", "closes": "closes", "opens": "opens", "call": "Call for today's hours", "banner": "Design preview by GunaFix, not the official website of {n}.", "credits": "Image credits", "skip": "Skip to content", "dir": "Directions"}, "lang": "en"};
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
// clock
const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
const h=+p.find(x=>x.type==='hour').value,m=+p.find(x=>x.type==='minute').value;
const hand=document.querySelector('.clock .hand');
requestAnimationFrame(()=>hand.style.transform='rotate('+((h+m/60)*15)+'deg)');
document.querySelector('.ctxt .now').textContent=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit'}).format(new Date())+' in Somerville ·';
// pour
const btn=document.querySelector('.pour'),cup=document.querySelector('.cup'),msg=document.getElementById('pour-msg');
let f=0,hold=false,raf=0,done=false;
function tick(){f=Math.max(0,Math.min(1,f+(hold?.012:-.02)*(GF.motion?1:8)));cup.style.setProperty('--f',f);cup.style.setProperty('--s',f>.95?1:0);
 if(f>=1&&!done){done=true;msg.textContent="Coffee's on. Open every day, 6am–3pm. Call 617-764-5398 for pickup."}
 if(f>0&&f<1&&hold)msg.textContent='Pouring… '+Math.round(f*100)+'%';
 if((hold&&f<1)||(!hold&&f>0&&!done))raf=requestAnimationFrame(tick);else raf=0}
const start=e=>{if(e)e.preventDefault();hold=true;btn.classList.add('held');if(!raf)raf=requestAnimationFrame(tick)};
const stop=()=>{hold=false;btn.classList.remove('held');if(!done&&f<1){msg.textContent=f>0?'Keep holding to fill it up.':msg.textContent;if(!raf)raf=requestAnimationFrame(tick)}};
btn.addEventListener('pointerdown',start);['pointerup','pointerleave','pointercancel'].forEach(t=>btn.addEventListener(t,stop));
btn.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat)start(e)});btn.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')stop()});
btn.addEventListener('contextmenu',e=>e.preventDefault());
})();
