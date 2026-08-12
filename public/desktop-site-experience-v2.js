(() => {
  if (window.__desktopSiteExperienceV2Loaded) return;
  window.__desktopSiteExperienceV2Loaded = true;

  const VERSION = 'desktop-site-experience-2';
  const DEFAULT_TITLE = 'Yaroslav — Graphic Designer';
  const SCROLL_KEY = 'portfolio-home-scroll-y';
  const PROJECTS = [
    ['zny','ZNY',['ZNY'],['.zny-modal']],
    ['fable','F | ABLE',['F | ABLE','FABLE'],['.fable-modal']],
    ['pink-punk','PINK PUNK',['PINK PUNK'],['.pink-punk-fullscreen']],
    ['carnival-records','CARNIVAL RECORDS',['CARNIVAL RECORDS'],['.cr-modal']],
    ['blandetto','BLANDETTO',['BLANDETTO'],['.blandetto-modal','.bf']],
    ['ninety-z-s','NINETY Z S',['NINETY Z S','90.06','90 06'],['.project9006-modal']],
    ['posters','POSTERS',['POSTERS'],['.pcg-modal']],
    ['merch','MERCH',['MERCH'],['.mc-modal']],
    ['stickers','STICKERS',['STICKERS'],['.stk-modal']],
    ['logos','LOGOS',['LOGOS','ЛОГОТИПЫ'],['.lcg-modal']],
    ['album-covers','ALBUM COVERS',['ALBUM COVERS'],['.album-covers-modal']],
    ['stay-ugly','STAY UGLY',['STAY UGLY','STAYUGLY'],['.su-modal']],
    ['anka-peresild','ANKA PERESILD',['ANKA PERESILD'],['.anka-peresild-modal']],
    ['vtb-design-team','VTB DESIGN TEAM',['VTB DESIGN TEAM'],['.vtb-modal']],
    ['collages-photo-edit','COLLAGES PHOTO EDIT',['COLLAGES PHOTO EDIT'],['.collages-modal']],
  ].map(([slug,name,titles,selectors]) => ({slug,name,titles,selectors}));
  const BY_SLUG = new Map(PROJECTS.map(p => [p.slug,p]));
  const VALID = new Set(BY_SLUG.keys());
  const MODALS = [...new Set(PROJECTS.flatMap(p => p.selectors).concat('.pag-modal'))].join(',');
  const CLOSE = ['.zny-close','.fable-close','.su-close','.vtb-close','.cr-close','.mc-close','.stk-close','.pcg-close','.lcg-close','.pag-close','.blandetto-close','.bf-close','.bf-x','.anka-peresild-close','.album-covers-close','.project9006-toolbar__close','.project9006-close','.p9006-close','.pink-punk-fullscreen > div > .sticky button'].join(',');
  const norm = v => String(v||'').toUpperCase().replace(/Ё/g,'Е').replace(/\|/g,'').replace(/[^A-ZА-Я0-9]+/g,' ').trim().replace(/\s+/g,' ');
  const desktop = () => innerWidth > 820 && matchMedia('(hover:hover) and (pointer:fine)').matches;
  const lang = () => document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';

  const style = document.createElement('style');
  style.id = 'desktop-site-experience-style-v2';
  style.textContent = `
    @keyframes pdeIn{from{transform:translateY(10px);filter:brightness(.985)}to{transform:none;filter:none}}
    @keyframes pdeOut{to{opacity:0;transform:translateY(8px)}}
    @media(hover:hover) and (pointer:fine) and (min-width:821px){
      .pde-enter{animation:pdeIn .22s cubic-bezier(.2,.8,.2,1) both}.pde-exit{animation:pdeOut .17s ease both!important;pointer-events:none!important}
      ${MODALS}{max-width:100vw!important;overflow-x:clip!important}${MODALS} img,${MODALS} video,${MODALS} canvas,${MODALS} svg{max-width:100%}
    }
    .pde-copy{position:fixed;left:max(1rem,env(safe-area-inset-left));bottom:max(1rem,env(safe-area-inset-bottom));z-index:1900000;min-height:2.9rem;padding:.78rem 1rem;border:1px solid #fff;background:#050505;color:#fff;font:900 .64rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em;text-transform:uppercase;cursor:pointer}
    .pde-copy:hover{background:#a6ff00;color:#050505;border-color:#050505}
    .pde-load{position:fixed;left:50%;top:max(.8rem,env(safe-area-inset-top));z-index:1950000;transform:translateX(-50%);display:flex;gap:.65rem;align-items:center;padding:.55rem .75rem;border:1px solid #fff;background:#050505;color:#fff;font:900 .6rem/1 Arial,Helvetica,sans-serif;letter-spacing:.16em;opacity:0;pointer-events:none}.pde-load.on{opacity:1}
    .pde-load b{display:block;width:3rem;height:2px;overflow:hidden;background:#555}.pde-load b:after{content:'';display:block;width:45%;height:100%;background:#a6ff00;animation:pdeBar .8s ease-in-out infinite alternate}@keyframes pdeBar{from{transform:translateX(-15%)}to{transform:translateX(145%)}}
    @media(max-width:820px){.pde-copy,.pde-load{display:none!important}}
    @media(min-width:1920px){#top>.mx-auto,#about>.mx-auto,#services>.mx-auto,#works>.mx-auto,#contacts>.mx-auto,.desktop-project-navigation{max-width:96rem!important;margin-left:auto!important;margin-right:auto!important}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
  `;
  document.head.append(style);

  const shown = n => n instanceof HTMLElement && n.isConnected && getComputedStyle(n).display !== 'none' && getComputedStyle(n).visibility !== 'hidden' && Number(getComputedStyle(n).opacity||1) !== 0;
  const projectForCard = card => { const t=norm(card?.querySelector('h3')?.textContent); return PROJECTS.find(p=>p.titles.some(x=>norm(x)===t))||null; };
  const projectFromUrl = () => BY_SLUG.get(new URLSearchParams(location.search).get('project')||'')||null;
  function active(){
    const p=projectFromUrl();
    if(p){ for(const s of p.selectors){const m=[...document.querySelectorAll(s)].filter(shown).at(-1);if(m)return{project:p,modal:m}} const pag=[...document.querySelectorAll('.pag-modal')].filter(shown).at(-1);if(pag&&['posters','logos','collages-photo-edit'].includes(p.slug))return{project:p,modal:pag}; }
    for(const q of PROJECTS)for(const s of q.selectors){const m=[...document.querySelectorAll(s)].filter(shown).at(-1);if(m)return{project:q,modal:m}}
    return null;
  }
  function closeButton(modal){return modal?.querySelector(CLOSE)||[...(modal?.querySelectorAll('button')||[])].find(b=>['CLOSE','ЗАКРЫТЬ'].includes(norm(b.textContent)))||null}

  const bypass=new WeakSet();
  function closeAnimated(button,modal){
    if(!desktop()||bypass.has(button)||modal.classList.contains('pde-exit'))return;
    modal.classList.remove('pde-enter');modal.classList.add('pde-exit');
    const delay=matchMedia('(prefers-reduced-motion:reduce)').matches?0:165;
    setTimeout(()=>{if(!button.isConnected)return;bypass.add(button);button.click();queueMicrotask(()=>bypass.delete(button))},delay);
  }

  let copy=null;
  async function copyText(v){try{await navigator.clipboard.writeText(v);return true}catch{const t=document.createElement('textarea');t.value=v;t.style.cssText='position:fixed;opacity:0';document.body.append(t);t.select();let ok=false;try{ok=document.execCommand('copy')}catch{}t.remove();return ok}}
  function syncCopy(opened){
    if(!desktop()||!opened){if(copy){copy.remove();copy=null}return}
    if(!copy){copy=document.createElement('button');copy.type='button';copy.className='pde-copy';copy.addEventListener('click',async()=>{const a=active();if(!a)return;const u=new URL(location.href);u.searchParams.set('project',a.project.slug);u.searchParams.delete('section');u.hash='';const label=lang()==='ru'?'СКОПИРОВАТЬ ССЫЛКУ':'COPY PROJECT LINK';const ok=await copyText(u.href);copy.textContent=ok?(lang()==='ru'?'ССЫЛКА СКОПИРОВАНА':'LINK COPIED'):label;setTimeout(()=>{if(copy?.isConnected&&copy.textContent!==label)copy.textContent=label},1400)});document.body.append(copy)}
    const text=lang()==='ru'?'СКОПИРОВАТЬ ССЫЛКУ':'COPY PROJECT LINK';if(copy.textContent!==text&&!/COPIED|СКОПИРОВАНА/.test(copy.textContent))copy.textContent=text;copy.dataset.project=opened.project.slug;
  }

  function focusables(root){return [...root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(shown)}
  function trap(e,root,extra=[]){const a=[...new Set([...focusables(root),...extra.filter(shown)])];if(!a.length)return;const i=a.indexOf(document.activeElement);if(e.shiftKey&&(i<=0)){e.preventDefault();a.at(-1).focus()}else if(!e.shiftKey&&(i<0||i===a.length-1)){e.preventDefault();a[0].focus()}}

  const preloaded=new Set();
  function preload(u){if(!u)return;const st=window.PORTFOLIO_STATIC_ASSETS;u=st?.toLocalUrl?st.toLocalUrl(u):u;try{u=new URL(u,location.href).href}catch{}if(preloaded.has(u))return;preloaded.add(u);const im=new Image();im.decoding='async';im.fetchPriority='low';im.src=u}
  function hoverSources(p,card){const a=[];const st=window.PORTFOLIO_STATIC_ASSETS;card?.querySelectorAll('img').forEach(i=>a.push(i.dataset.portfolioOriginal||i.currentSrc||i.src));if(p.slug==='zny')a.push(...(st?.zny?.prints||[]).slice(0,2));if(p.slug==='fable')a.push(...(st?.fable||[]).slice(0,2));if(p.slug==='merch')a.push(...(st?.merch||[]).slice(0,2));if(p.slug==='stay-ugly')a.push(...(st?.stayUgly?.concept||[]).slice(0,2));if(p.slug==='ninety-z-s')a.push('/works/90-06/logo-variations/LOGO%201.jpg','/works/90-06/logo-variations/LOGO%203.jpg');if(p.slug==='vtb-design-team')a.push('/works/VTB%20DESIGN%20TEAM/print/print-1.jpg');return a.filter(Boolean).slice(0,4)}

  let loader=null,io=null,currentModal=null;const pending=new Set(),bound=new WeakSet(),optimized=new WeakSet();
  function loaderEl(){if(loader?.isConnected)return loader;loader=document.createElement('div');loader.className='pde-load';loader.innerHTML='<span>LOADING</span><b></b>';document.body.append(loader);return loader}
  function drawLoad(){const el=loaderEl(),txt=pending.size?`LOADING · ${String(pending.size).padStart(2,'0')}`:'LOADING',span=el.querySelector('span');if(span.textContent!==txt)span.textContent=txt;el.classList.toggle('on',desktop()&&pending.size>0&&!!active())}
  function track(img){if(bound.has(img))return;bound.add(img);const done=()=>{pending.delete(img);drawLoad()};img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true})}
  function media(modal){const imgs=[...modal.querySelectorAll('img')];imgs.forEach((img,i)=>{if(!optimized.has(img)){optimized.add(img);img.decoding='async';if(i<2){img.loading='eager';try{img.fetchPriority='high'}catch{}}else{if(!img.hasAttribute('loading'))img.loading='lazy';try{img.fetchPriority='low'}catch{}}}});modal.querySelectorAll('video').forEach(v=>{if(!v.autoplay&&!v.hasAttribute('preload'))v.preload='metadata'});if(currentModal!==modal){io?.disconnect();pending.clear();currentModal=modal;io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);if(e.target.complete)return;track(e.target);pending.add(e.target);drawLoad()}),{rootMargin:'650px 0px',threshold:.01})}imgs.forEach(i=>{try{io.observe(i)}catch{}});drawLoad()}
  function stopMedia(){io?.disconnect();io=null;currentModal=null;pending.clear();drawLoad()}

  function sanitize(){const u=new URL(location.href),p=u.searchParams.get('project'),bad=p&&!VALID.has(p),orphan=!p&&u.searchParams.has('section');if(!bad&&!orphan)return;u.searchParams.delete('project');u.searchParams.delete('section');history.replaceState(history.state,'',`${u.pathname}${u.search}${u.hash}`);if(bad)setTimeout(()=>document.getElementById('works')?.scrollIntoView({block:'start'}),0)}
  function restore(){setTimeout(()=>{if(active()||new URLSearchParams(location.search).get('project'))return;let y=0;try{y=Number(sessionStorage.getItem(SCROLL_KEY)||0)}catch{}if(Number.isFinite(y))scrollTo({top:y,left:0,behavior:'auto'})},0)}

  let lastModal=null;
  function sync(){
    sanitize();const a=active();
    if(a){if(a.modal.dataset.pde!==VERSION){a.modal.dataset.pde=VERSION;a.modal.setAttribute('role',a.modal.getAttribute('role')||'dialog');a.modal.setAttribute('aria-modal','true');requestAnimationFrame(()=>requestAnimationFrame(()=>a.modal.classList.add('pde-enter')))}media(a.modal)}
    else if(lastModal){stopMedia();restore()}
    if(lastModal!==a?.modal)lastModal=a?.modal||null;
    syncCopy(a);const title=a?`${a.project.name} — Yaroslav / Graphic Designer`:DEFAULT_TITLE;if(document.title!==title)document.title=title;
  }

  for(const name of ['pushState','replaceState']){const orig=history[name];if(!orig.__pde){const fn=function(...args){const r=orig.apply(this,args);dispatchEvent(new Event('pde-history'));return r};fn.__pde=true;history[name]=fn}}

  addEventListener('pointerdown',e=>{const card=e.target.closest?.('#works article,#works button');if(card&&projectForCard(card)){try{sessionStorage.setItem(SCROLL_KEY,String(Math.round(scrollY)))}catch{}}},true);
  addEventListener('click',e=>{if(!desktop()||!(e.target instanceof Element))return;const b=e.target.closest(CLOSE),m=b?.closest(MODALS);if(!b||!m||bypass.has(b))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();closeAnimated(b,m)},true);
  addEventListener('keydown',e=>{const lb=document.querySelector('.desktop-unified-lightbox');if(lb){if(e.key==='Tab'){e.stopPropagation();trap(e,lb)}return}const a=active();if(!a||!desktop())return;if(e.key==='Escape'){const b=closeButton(a.modal);if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();b.click()}}else if(e.key==='Tab'){e.stopPropagation();trap(e,a.modal,copy?[copy]:[])}},true);
  addEventListener('pointerover',e=>{if(!desktop()||!(e.target instanceof Element))return;const card=e.target.closest('#works article,#works button');if(!card||(e.relatedTarget instanceof Node&&card.contains(e.relatedTarget)))return;const p=projectForCard(card);if(!p)return;const run=()=>hoverSources(p,card).forEach(preload);'requestIdleCallback'in window?requestIdleCallback(run,{timeout:450}):setTimeout(run,50)},true);

  let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync()})};
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  addEventListener('pde-history',schedule);addEventListener('popstate',schedule);addEventListener('resize',schedule,{passive:true});addEventListener('load',schedule,{once:true});
  sanitize();[0,80,240,700].forEach(t=>setTimeout(schedule,t));
})();
