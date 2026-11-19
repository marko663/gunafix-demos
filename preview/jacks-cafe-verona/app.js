(function(){var d=document;
function lines(){var svg=d.getElementById('lines'),w=d.querySelector('.tw');if(!svg||GF.bp()==='phone')return;svg.innerHTML='';
 var R=w.getBoundingClientRect();var pp=[].slice.call(d.querySelectorAll('#people .pp'));var root=pp[0],you=pp[pp.length-1],kids=pp.slice(1,-1);
 function c(e,top){var r=e.getBoundingClientRect();return{x:r.left-R.left+r.width/2,y:(top?r.top:r.bottom)-R.top}}
 var a=c(root,false);var paths=[];
 kids.forEach(function(k){var b=c(k,true);paths.push('M'+a.x+' '+a.y+' C'+a.x+' '+(a.y+40)+' '+b.x+' '+(b.y-50)+' '+b.x+' '+b.y);var bb=c(k,false),y=c(you,true);paths.push('M'+bb.x+' '+bb.y+' C'+bb.x+' '+(bb.y+40)+' '+y.x+' '+(y.y-50)+' '+y.x+' '+y.y)});
 paths.forEach(function(p){var e=d.createElementNS('http://www.w3.org/2000/svg','path');e.setAttribute('d',p);svg.appendChild(e)});
 if(window.gsap&&window.ScrollTrigger&&!GF.RM){svg.querySelectorAll('path').forEach(function(p){var L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
  gsap.to(svg.querySelectorAll('path'),{strokeDashoffset:0,ease:'none',stagger:.1,scrollTrigger:{trigger:'.tw',start:'top 70%',end:'bottom 60%',scrub:.6}})}
}
window.addEventListener('load',function(){
 if(window.gsap&&window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
 setTimeout(lines,300);var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(function(){if(window.ScrollTrigger)ScrollTrigger.getAll().forEach(function(s){if(s.trigger&&s.trigger.classList&&s.trigger.classList.contains('tw'))s.kill()});lines()},200)});
 // draggable snapshots on laptop
 if(GF.FINE&&!GF.RM){d.querySelectorAll('.snap').forEach(function(s){var sx,sy,ox=0,oy=0,on=false;var base=getComputedStyle(s).transform;base=base==='none'?'':base;
  s.addEventListener('pointerdown',function(e){on=true;s.classList.add('drag');sx=e.clientX-ox;sy=e.clientY-oy;s.setPointerCapture(e.pointerId)});
  s.addEventListener('pointermove',function(e){if(!on)return;ox=e.clientX-sx;oy=e.clientY-sy;s.style.transform='translate('+ox+'px,'+oy+'px) rotate('+(ox*.02)+'deg)'});
  s.addEventListener('pointerup',function(){on=false;s.classList.remove('drag')})})}
});})();
