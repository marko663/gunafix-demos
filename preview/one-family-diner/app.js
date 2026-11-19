window.__CFG={"tz": "America/New_York", "hours": [[["05:30", "14:00"]], [["05:30", "14:00"]], [["05:30", "14:00"]], [["05:30", "14:00"]], [["05:30", "14:00"]], [["06:00", "14:00"]], [["06:00", "13:00"]]], "t": {"closed": "Closed", "open": "Open now", "closes": "closes", "opens": "opens", "call": "Call for today's hours", "banner": "Design preview by GunaFix, not the official website of {n}.", "credits": "Image credits", "skip": "Skip to content", "dir": "Directions"}, "lang": "en"};
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
const tz='America/New_York';
const d=new Date();document.querySelector('.dl').textContent=new Intl.DateTimeFormat('en-US',{timeZone:tz,weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(d)+' · '+new Intl.DateTimeFormat('en-US',{timeZone:tz,hour:'numeric',minute:'2-digit'}).format(d)+' in Dorchester';
const h=+new Intl.DateTimeFormat('en-US',{timeZone:tz,hour:'numeric',hourCycle:'h23'}).format(d);
const sky=h<5?'#2A2A3A':h<8?'#E85D12':h<12?'#F2A03D':h<17?'#7FB3D5':h<20?'#C2502A':'#2A2A3A';
document.documentElement.style.setProperty('--sky',sky);
// headline words
const hl=document.querySelector('.hl');hl.innerHTML=hl.textContent.split(' ').map((w,k)=>`<span class="w" style="--k:${k}">${w}</span>`).join(' ');
// phone: collapse menu sections except none
if(GF.bp()==='phone')document.querySelectorAll('.sec').forEach((s,i)=>{if(i>0)s.open=false});
else document.querySelectorAll('.sec summary').forEach(s=>s.addEventListener('click',e=>e.preventDefault()));
// photo desk
const dk=document.querySelector('.dk img');
function show(im,alt){if(dk.getAttribute('src')==='img/'+im+'.webp')return;dk.src='img/'+im+'.webp';dk.alt=alt;if(GF.motion){dk.classList.remove('sw');void dk.offsetWidth;dk.classList.add('sw')}}
document.querySelectorAll('.pl li[data-img]').forEach(li=>{const im=li.dataset.img,alt=li.querySelector('img').alt;
 if(GF.fine){li.addEventListener('pointerenter',()=>show(im,alt));li.addEventListener('focus',()=>show(im,alt))}else li.removeAttribute('tabindex');
 const b=li.querySelector('.ph-t'),f=li.querySelector('.ph-in');b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);f.hidden=o;b.textContent=o?'Photo':'Hide photo'})});
})();
