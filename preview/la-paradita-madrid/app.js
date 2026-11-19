window.__CFG={"tz": "Europe/Madrid", "hours": null, "t": {"closed": "Cerrado", "open": "Abierto ahora", "closes": "cierra a las", "opens": "abre a las", "call": "Llama para el horario", "banner": "Vista previa de diseño de GunaFix, no es la web oficial de {n}.", "credits": "Créditos de imágenes", "skip": "Saltar al contenido", "dir": "Cómo llegar"}, "lang": "es"};
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
const L=[...document.querySelectorAll('.hero .l')];
if(GF.motion&&GF.fine){let mx=-9999,my=-9999;const st=L.map(()=>({x:0,y:0}));
 addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
 (function loop(){L.forEach((l,i)=>{const r=l.getBoundingClientRect();const cx=r.left+r.width/2-st[i].x,cy=r.top+r.height/2-st[i].y;const dx=cx-mx,dy=cy-my,d=Math.hypot(dx,dy),R=260;let tx=0,ty=0;if(d<R){const f=(1-d/R)*70;tx=dx/d*f;ty=dy/d*f}st[i].x+=(tx-st[i].x)*.12;st[i].y+=(ty-st[i].y)*.12;l.style.transform=`translate(${st[i].x.toFixed(1)}px,${st[i].y.toFixed(1)}px) rotate(${(st[i].x/6).toFixed(1)}deg)`});requestAnimationFrame(loop)})();
}else if(GF.motion){L.forEach((l,i)=>l.animate([{transform:'translateY(0)'},{transform:'translateY(-14%)'},{transform:'translateY(0)'}],{duration:700,delay:200+i*70,easing:'ease-out'}));
 let last=scrollY,sk=0;(function loop(){const v=scrollY-last;last=scrollY;sk+=(Math.max(-12,Math.min(12,v*.4))-sk)*.15;L.forEach(l=>l.style.transform=`skewX(${(-sk).toFixed(2)}deg)`);requestAnimationFrame(loop)})();}
// menu
const fol=document.querySelector('.follow'),fi=fol.querySelector('img');
document.querySelectorAll('.mi-b').forEach(b=>{const fig=b.nextElementSibling;
 if(b.dataset.img){
  b.addEventListener('click',()=>{if(GF.fine&&GF.motion)return;const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);fig.hidden=o});
  if(GF.fine&&GF.motion){b.removeAttribute('aria-expanded');b.addEventListener('pointerenter',()=>{fi.src=b.dataset.img;fol.classList.add('on')});b.addEventListener('pointerleave',()=>fol.classList.remove('on'));
   b.addEventListener('focus',()=>{fi.src=b.dataset.img;const r=b.getBoundingClientRect();fol.style.transform=`translate(${r.right-360}px,${r.top-60}px)`;fol.classList.add('on')});b.addEventListener('blur',()=>fol.classList.remove('on'))}
 }else{b.removeAttribute('aria-expanded');b.setAttribute('tabindex','-1')}
});
if(GF.fine&&GF.motion){let x=0,y=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX+24;ty=e.clientY-120},{passive:true});(function lp(){x+=(tx-x)*.18;y+=(ty-y)*.18;if(fol.classList.contains('on'))fol.style.transform=`translate(${x}px,${y}px) rotate(${((tx-x)/40).toFixed(2)}deg)`;requestAnimationFrame(lp)})()}
})();
