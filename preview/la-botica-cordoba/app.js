window.__CFG={"tz": "Europe/Madrid", "hours": [[], [["08:00", "16:00"], ["19:30", "00:00"]], [["08:00", "16:00"], ["19:30", "00:00"]], [["08:00", "16:00"], ["19:30", "00:00"]], [["08:00", "16:00"], ["19:30", "00:00"]], [["13:00", "00:00"]], [["13:00", "00:00"]]], "t": {"closed": "Cerrado", "open": "Abierto ahora", "closes": "cierra a las", "opens": "abre a las", "call": "Llama para el horario", "banner": "Vista previa de diseño de GunaFix, no es la web oficial de {n}.", "credits": "Créditos de imágenes", "skip": "Saltar al contenido", "dir": "Cómo llegar"}, "lang": "es"};
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
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const cards=[...document.querySelectorAll('.lbl')],grid=document.querySelector('.grid'),q=document.querySelector('.srch input'),empty=document.querySelector('.empty'),cnt=document.querySelector('.count');
let f='*';
function apply(anim){const s=norm(q.value.trim());let n=0;cards.forEach(c=>{const ok=(f==='*'||c.dataset.c===f)&&(!s||norm(c.dataset.s).includes(s));c.hidden=!ok;if(ok)n++});empty.hidden=n>0;cnt.textContent=n+(n===1?' remedio':' remedios');if(anim){grid.classList.remove('wipe-in');void grid.offsetWidth;grid.classList.add('wipe-in')}}
document.querySelectorAll('.dr').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.dr').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});f=b.dataset.f;apply(true)}));
q.addEventListener('input',()=>apply(false));apply(false);
// tilt
if(GF.fine&&GF.motion)cards.forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`translateY(-6px) rotateX(${(-y*6).toFixed(1)}deg) rotateY(${(x*8).toFixed(1)}deg)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
// consulta
const rec=document.querySelector('.rec');
document.querySelectorAll('.moods button').forEach(b=>{b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{document.querySelectorAll('.moods button').forEach(x=>x.setAttribute('aria-pressed',x===b));rec.textContent='Te receto: '+b.dataset.a+' ('+b.dataset.c.toLowerCase()+').'})});
})();
