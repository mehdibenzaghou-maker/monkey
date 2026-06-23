/* MONKEY — script.js */

/* ── Intro ────────────────────────────────────────────── */
setTimeout(function(){var i=document.getElementById('intro');if(i)i.remove();},4800);

/* ── Nav scroll ───────────────────────────────────────── */
var nav=document.getElementById('nav');
if(nav)window.addEventListener('scroll',function(){nav.classList.toggle('on',window.scrollY>50);},{passive:true});

/* ── Burger ───────────────────────────────────────────── */
var burger=document.getElementById('burger'),drawer=document.getElementById('mobDrawer');
if(burger&&drawer){
  burger.addEventListener('click',function(){burger.classList.toggle('x');drawer.classList.toggle('open');document.body.style.overflow=drawer.classList.contains('open')?'hidden':'';});
  drawer.querySelectorAll('.mob-link').forEach(function(a){a.addEventListener('click',function(){burger.classList.remove('x');drawer.classList.remove('open');document.body.style.overflow='';});});
}

/* ── Bilingual Toggle ─────────────────────────────────── */
var currentLang = localStorage.getItem('monkey-lang') || 'fr';

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-fr][data-en]').forEach(function(el) {
    el.textContent = el.getAttribute('data-' + lang);
  });
  document.querySelectorAll('.lang-toggle').forEach(function(btn) {
    var fr = btn.querySelector('.lang-fr');
    var en = btn.querySelector('.lang-en');
    if (fr) fr.classList.toggle('active', lang === 'fr');
    if (en) en.classList.toggle('active', lang === 'en');
  });
  currentLang = lang;
  localStorage.setItem('monkey-lang', lang);
}

document.querySelectorAll('.lang-toggle').forEach(function(btn) {
  btn.addEventListener('click', function() {
    applyLang(currentLang === 'fr' ? 'en' : 'fr');
  });
});

applyLang(currentLang);

/* ── Scroll Reveal ────────────────────────────────────── */
if('IntersectionObserver' in window){
  var rio=new IntersectionObserver(function(es){es.forEach(function(e,i){if(e.isIntersecting){setTimeout(function(){e.target.classList.add('in');},i*80);rio.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){rio.observe(el);});
}

/* ── 3D Viewer ────────────────────────────────────────── */
window.loadDishViewer=function(btn){
  var d3=btn.closest('.dish-3d');if(!d3)return;
  d3.classList.add('loaded');
  var mv=d3.querySelector('model-viewer'),glb=d3.dataset.glb||'';
  if(mv&&glb)mv.setAttribute('src',glb);
  if(mv)mv.style.opacity='1';
};

/* ── Particles ────────────────────────────────────────── */
(function(){
  var c=document.getElementById('particles');if(!c)return;
  var ctx=c.getContext('2d'),W,H;
  function rsz(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;}
  window.addEventListener('resize',rsz,{passive:true});rsz();
  var cols=['rgba(197,165,90,','rgba(160,130,70,','rgba(240,235,224,'];
  function mk(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+.15,vy:-(Math.random()*.15+.04),vx:(Math.random()-.5)*.08,a:Math.random()*Math.PI*2,s:Math.random()*.012,o:Math.random()*.28+.03,col:cols[Math.floor(Math.random()*cols.length)]};}
  var pts=Array.from({length:60},mk);
  (function draw(){ctx.clearRect(0,0,W,H);pts.forEach(function(p){p.a+=p.s;p.x+=p.vx+Math.sin(p.a)*.07;p.y+=p.vy;if(p.y<-4)Object.assign(p,mk(),{y:H+4});ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.col+p.o+')';ctx.fill();});requestAnimationFrame(draw);})();
})();

/* ── Gold Cursor Trail (desktop) ──────────────────────── */
if(!window.matchMedia('(hover:none)').matches){
  var dots=[];
  for(var i=0;i<5;i++){var d=document.createElement('div'),sz=4-i*.6;d.className='cursor-dot';d.style.cssText='width:'+sz+'px;height:'+sz+'px;background:rgba(197,165,90,'+(0.45-i*.07)+');transition:left '+(18+i*20)+'ms linear,top '+(18+i*20)+'ms linear;';document.body.appendChild(d);dots.push(d);}
  document.addEventListener('mousemove',function(e){dots[0].style.left=e.clientX+'px';dots[0].style.top=e.clientY+'px';});
  (function loop(){for(var i=1;i<dots.length;i++){dots[i].style.left=(parseFloat(dots[i-1].style.left)||0)+'px';dots[i].style.top=(parseFloat(dots[i-1].style.top)||0)+'px';}requestAnimationFrame(loop);})();
}

/* ── Card Tilt (desktop) ──────────────────────────────── */
if(!window.matchMedia('(hover:none)').matches){
  document.querySelectorAll('.dish-card,.ms-card,.feat-card').forEach(function(c){
    c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(700px) rotateY('+x*2.5+'deg) rotateX('+-y*2.5+'deg) translateY(-4px)';});
    c.addEventListener('mouseleave',function(){c.style.transform='';});
  });
}
