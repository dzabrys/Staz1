/* A user-triggered decorative cue. The ordinary anchor remains the no-JS fallback. */
(() => {
 const trigger=document.querySelector('.subpage-intro a[href="#zapytanie"]');
 const target=document.querySelector('#zapytanie');
 const host=document.querySelector('.page-contact .supplemental');
 if(!trigger||!target||!host||!Element.prototype.animate)return;
 const heading=target.querySelector('h2');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const desktop=matchMedia('(min-width:1001px) and (hover:hover) and (pointer:fine)');
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.setAttribute('class','inquiry-guide');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
 const shaft=document.createElementNS(ns,'path'),head=document.createElementNS(ns,'path');
 for(const path of [shaft,head]){path.setAttribute('pathLength','1');svg.append(path)}
 host.append(svg);
 let animations=[],timer,run=0;
 const reset=()=>{clearTimeout(timer);animations.forEach(a=>a.cancel());animations=[];svg.classList.remove('is-active')};
 const draw=()=>{
  reset();const current=++run;
  const base=host.getBoundingClientRect(),button=trigger.getBoundingClientRect(),title=heading.getBoundingClientRect();
  const endX=title.left-base.left+22,endY=title.top-base.top-9;
  const gap=title.top-button.bottom;
  const fromButton=gap>=48&&(gap<=160||(innerWidth>1000&&gap<=340));
  const startX=fromButton?button.left-base.left+button.width*.55:endX+66;
  const startY=fromButton?button.bottom-base.top+9:endY-48;
  const distance=endY-startY;
  const left=Math.min(startX,endX)-16,top=startY-10;
  const width=Math.abs(startX-endX)+32,height=Math.max(36,distance+28);
  svg.style.left=left+'px';svg.style.top=top+'px';svg.style.width=width+'px';svg.style.height=height+'px';
  svg.setAttribute('viewBox',`${left} ${top} ${width} ${height}`);
  shaft.setAttribute('d',`M ${startX} ${startY} C ${startX+10} ${startY+distance*.7}, ${endX} ${startY+distance*.25}, ${endX} ${endY}`);
  head.setAttribute('d',`M ${endX-7} ${endY-8} Q ${endX-2} ${endY-5} ${endX} ${endY} Q ${endX+3} ${endY-5} ${endX+8} ${endY-8}`);
  svg.classList.add('is-active');
  animations.push(shaft.animate([{strokeDashoffset:'1'},{strokeDashoffset:'0'}],{duration:reduced.matches?450:1000,easing:'cubic-bezier(.35,0,.2,1)',fill:'forwards'}));
  animations.push(head.animate([{strokeDashoffset:'1'},{strokeDashoffset:'0'}],{duration:reduced.matches?120:200,delay:reduced.matches?360:850,easing:'ease-out',fill:'both'}));
  timer=setTimeout(()=>{
   const fade=svg.animate([{opacity:1},{opacity:0}],{duration:reduced.matches?180:350,fill:'forwards'});
   animations.push(fade);fade.finished.then(()=>{if(current===run)reset()}).catch(()=>{});
  },3200);
 };
 trigger.addEventListener('click',event=>{
  if(!desktop.matches)return;
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  const rect=target.getBoundingClientRect();
  if(rect.top<16||rect.bottom>innerHeight-16)target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
  if(location.hash!=='#zapytanie')history.pushState(null,'','#zapytanie');
  heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
  draw();
 });
 window.addEventListener('resize',()=>{run++;reset()},{passive:true});
})();
