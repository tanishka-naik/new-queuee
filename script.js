(()=>{
const d=document,b=d.body,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;

// Loading
addEventListener('load',()=>b.classList.remove('is-loading'));
setTimeout(()=>b.classList.remove('is-loading'),1500);

// Footer year
const y=d.getElementById('yr');if(y)y.textContent=new Date().getFullYear();

// Mobile menu
const bg=d.querySelector('.burger'),m=d.getElementById('menu');
const close=()=>{m.classList.remove('open');bg.setAttribute('aria-expanded','false')};
bg.addEventListener('click',()=>{const o=m.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
d.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
m.addEventListener('click',e=>{if(e.target.closest('a'))close()});

// Scroll reveal (respects reduced motion)
const els=d.querySelectorAll('.rv');
if('IntersectionObserver'in window&&!rm){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
  }),{threshold:.12});
  els.forEach(e=>io.observe(e));
}else els.forEach(e=>e.classList.add('in'));

// Hash router: #home, #work, #services, #contact
const T={
  home:'QUEUEE | Web Design & Development Studio, Bengaluru',
  work:'Work | QUEUEE',
  services:'Services | QUEUEE',
  contact:'Contact | QUEUEE'
};
const route=()=>{
  let h=(location.hash||'#home').slice(1);
  if(!T[h])h='home';
  d.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+h));
  d.querySelectorAll('#menu a').forEach(a=>
    a.getAttribute('href')==='#'+h?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  d.title=T[h];
  scrollTo(0,0);
  b.classList.remove('leave');
};
addEventListener('hashchange',route);
route();

// Enquiry form -> prefilled WhatsApp message
const f=d.getElementById('enq');
if(f)f.addEventListener('submit',e=>{
  e.preventDefault();
  const g=n=>f.elements[n].value.trim();
  let ok=true;
  ['name','msg'].forEach(n=>{
    const bad=!g(n);
    f.elements[n].classList.toggle('bad',bad);
    if(bad)ok=false;
  });
  const note=d.getElementById('fnote');
  if(!ok){note.textContent='Please add your name and a short project description.';return}
  const t=`Hey QUEUEE! I'm ${g('name')}${g('biz')?' from '+g('biz'):''}.\nService: ${f.elements.svc.value}\nProject: ${g('msg')}`;
  note.textContent='Opening WhatsApp. If nothing happens, allow pop-ups for this site.';
  window.open('https://wa.me/918147037924?text='+encodeURIComponent(t),'_blank','noopener');
});
})();