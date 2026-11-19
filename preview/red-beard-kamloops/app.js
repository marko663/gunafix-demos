(function(){var d=document;
var M=[["Brunch","Tropical French toast","Banana bread, lavender-coconut whip, fresh fruit","18"],["Brunch","Salmon benny","Egg, smoked salmon, fried capers, red onion","21"],["Brunch","Bacon benny","Egg, hollandaise, bacon, paprika, green onion","18"],["Brunch","Pastrami hash","House made pastrami, hashbrowns, caramelized onions, 2 eggs, hollandaise","25"],["Brunch","Yellow lentil shakshuka","Spicy pepper and tomato sauce, spinach, arugula, goat's cheese, 2 poached eggs","24"],["Brunch","English breaky","2 eggs, banger, bacon 'n beans, fried tomato, sourdough","19"],
["Lunch","Grapefruit garden salad","Goat's cheese, candied walnuts, grapefruit, vinaigrette","18"],["Lunch","Butter chicken","Creamy tomato curry, rice and naan","24"],["Lunch","Gnocchi al tartufo","Creamy garlic truffle sauce, mushrooms","23"],["Lunch","Pastrami sandwich","House smoked brisket, sauerkraut, havarti, grainy dijon, sourdough","24"],["Lunch","Spicy grilled Nashville chicken","Nashville butter, citrus slaw, house pickles","23"],
["Dinner","Steak frites","Grilled flatiron, fries, salad, chimichurri","26"],["Dinner","Seafood pasta","Mussels, prawns, salmon, creamy garlic linguine, garlic toast","26"],["Dinner","Moules frites","Saltspring Island mussels, tomato garlic cream, beer battered fries","18"],["Dinner","Grilled wings","1lb, house-made lemon pepper or S&P","19"],["Dinner","North Africa lentil curry","Curried lentils and spinach, rice and naan","24"],
["Dessert","Tropical bread pudding","Banana bread pudding, fresh fruit, lavender coconut whip","13"],["Dessert","Lava cake","Molten chocolate cake","14"],["Dessert","Affogato","Fernwood espresso over ice cream","7"],["Dessert","Elephant ears","Fried naan, cinnamon and sugar","5"]];
function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
d.addEventListener('DOMContentLoaded',function(){
 var ul=d.getElementById('mlist');
 M.forEach(function(m){var li=d.createElement('li');li.className='dish';li.dataset.c=m[0];li.dataset.t=norm(m.join(' '));
  li.innerHTML='<span class="c">'+m[0]+'</span><h3>'+m[1]+'</h3><span class="p">$'+m[3]+'</span><p>'+m[2]+'</p>';ul.appendChild(li)});
 var cat='all',q=d.getElementById('q');
 function apply(){var t=norm(q.value.trim()),n=0;ul.querySelectorAll('.dish').forEach(function(li){var ok=(cat==='all'||li.dataset.c===cat)&&(!t||li.dataset.t.indexOf(t)>-1);li.hidden=!ok;if(ok)n++});
  d.getElementById('count').textContent=n+' dish'+(n===1?'':'es');d.getElementById('none').hidden=n>0}
 d.querySelectorAll('#chips button').forEach(function(b){b.addEventListener('click',function(){cat=b.dataset.c;d.querySelectorAll('#chips button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});apply()})});
 q.addEventListener('input',apply);apply();
 // taps
 var row=d.getElementById('taprow'),msg=d.getElementById('tapmsg');var hc=['#C8461F','#2B1D16','#D9B45A','#7A8B5C'];
 for(var i=1;i<=18;i++){var b=d.createElement('button');b.className='tap';b.type='button';b.setAttribute('aria-label','Tap '+i);
  var c=hc[i%4];b.innerHTML='<svg viewBox="0 0 44 120" aria-hidden="true"><rect x="12" y="4" width="20" height="64" rx="9" fill="'+c+'" stroke="#2B1D16" stroke-width="3"/><rect x="18" y="66" width="8" height="22" fill="#9a8f80" stroke="#2B1D16" stroke-width="3"/><path d="M8 88h28v10H8z" fill="#bcb2a3" stroke="#2B1D16" stroke-width="3"/><path d="M18 98h8v14h-8z" fill="#bcb2a3" stroke="#2B1D16" stroke-width="3"/></svg><span class="drop"></span><i>'+(i<10?'0':'')+i+'</i>';
  (function(b,i){b.addEventListener('click',function(){b.classList.remove('on');void b.offsetWidth;b.classList.add('on');msg.textContent='Tap '+i+' is pouring. Ask at the bar what\u2019s on it today.';setTimeout(function(){b.classList.remove('on')},1500)})})(b,i);
  row.appendChild(b)}
 var k=d.getElementById('key');k.addEventListener('click',function(){var s=d.getElementById('secret');s.hidden=!s.hidden;k.setAttribute('aria-expanded',!s.hidden)});
});
window.addEventListener('load',function(){
 if(!window.gsap||!window.ScrollTrigger||GF.RM)return;gsap.registerPlugin(ScrollTrigger);
 function tl(o){var t=gsap.timeline({scrollTrigger:o});
  t.fromTo('#beer',{y:270},{y:0,duration:2,ease:'none'}).fromTo('#foam',{y:270,opacity:0},{y:0,opacity:1,duration:2,ease:'none'},0)
   .from('#bub circle',{y:60,opacity:0,stagger:.2,duration:.6},.6);return t}
 var mm=gsap.matchMedia();
 mm.add('(min-width:1025px)',function(){tl({trigger:'#day',start:'top top',end:'+='+innerHeight*1.6,pin:'.p-in',scrub:.6})});
 mm.add('(min-width:768px) and (max-width:1024px)',function(){tl({trigger:'#day',start:'top top',end:'+='+innerHeight*1.3,pin:'.p-in',scrub:.6})});
 mm.add('(max-width:767px)',function(){tl({trigger:'.glass',start:'top 85%',end:'bottom 50%',scrub:.5})});
});})();
