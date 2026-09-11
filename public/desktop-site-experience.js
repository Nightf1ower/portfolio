(() => {
  if (window.__desktopSiteExperienceLoaderV40) return;
  window.__desktopSiteExperienceLoaderV40 = true;
  window.__desktopSiteExperienceLoaderV39 = true;
  window.__desktopSiteExperienceLoaderV38 = true;
  window.__desktopSiteExperienceLoaderV37 = true;
  window.__desktopSiteExperienceLoaderV36 = true;
  window.__desktopSiteExperienceLoaderV35 = true;
  window.__desktopSiteExperienceLoaderV34 = true;
  window.__desktopSiteExperienceLoaderV33 = true;
  window.__desktopSiteExperienceLoaderV32 = true;
  window.__desktopSiteExperienceLoaderV31 = true;
  window.__desktopSiteExperienceLoaderV30 = true;
  window.__desktopSiteExperienceV1 = true;

  const load = (src, marker) => {
    if (document.querySelector(`script[data-runtime-marker="${marker}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.dataset.runtimeMarker = marker;
    script.async = false;
    document.head.append(script);
  };

  load('/portfolio-stable-project-shell.js?v=portfolio-stable-project-shell-8', 'portfolio-stable-project-shell-8');
  load('/about-content-update.js?v=about-content-update-4', 'about-content-update-4');
  load('/portfolio-mobile-gestures-v2.js?v=portfolio-mobile-gestures-2', 'portfolio-mobile-gestures-2');
  load('/portfolio-mobile-touchend-guard-v3.js?v=portfolio-mobile-touchend-guard-3', 'portfolio-mobile-touchend-guard-3');
  load('/portfolio-final-qa-fixes.js?v=portfolio-final-qa-fixes-5', 'portfolio-final-qa-fixes-5');
  load('/blandetto-print-layout-restore.js?v=blandetto-print-layout-restore-1', 'blandetto-print-layout-restore-1');
  load('/homepage-project-curation.js?v=homepage-project-curation-2', 'homepage-project-curation-2');
  load('/portfolio-project-consistency.js?v=portfolio-project-consistency-1', 'portfolio-project-consistency-1');
  load('/visual-noise-mobile-v2.js?v=visual-noise-mobile-3', 'visual-noise-mobile-3');
  load('/portfolio-folder-final-fixes.js?v=portfolio-folder-final-fixes-1', 'portfolio-folder-final-fixes-1');
  load('/portfolio-header-top-layer.js?v=portfolio-header-top-layer-1', 'portfolio-header-top-layer-1');

  const S = document.createElement('style');
  S.id = 'anka-peresild-gradient-background';
  document.getElementById(S.id)?.remove();
  S.textContent = `
    .anka-peresild-modal{background:linear-gradient(180deg,#fff 0%,#3A5DAE 100%)!important;background-color:#3A5DAE!important}
    .anka-peresild-modal .portfolio-standard-intro,.anka-peresild-modal .portfolio-stable-intro,.anka-peresild-modal .portfolio-standard-intro__inner,.anka-peresild-modal .portfolio-stable-intro__inner,.anka-peresild-modal .portfolio-project-metadata,.anka-peresild-modal .anka-peresild-inner,.anka-peresild-modal .anka-peresild-hero,.anka-peresild-modal .anka-peresild-grid{background:transparent!important}
    .anka-peresild-grid.anka-v40{display:block!important;width:100%!important;padding:0 0 clamp(5rem,9vw,9rem)!important;border:0!important;background:transparent!important}
    .anka-v40-section{padding:clamp(3.5rem,7vw,7rem) 0 0;background:transparent}
    .anka-v40-title{margin:0 0 clamp(1.5rem,3vw,2.75rem);font:900 clamp(2rem,5.2vw,5.5rem)/.9 Arial Black,Arial,sans-serif;letter-spacing:-.055em;text-transform:uppercase;color:#050505}
    .anka-v40-sub{margin:clamp(2rem,4vw,4rem) 0 1.25rem;font:900 clamp(.8rem,1.2vw,1rem)/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#050505}
    .anka-v40-chain{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:clamp(.65rem,1.4vw,1.35rem);margin:0 0 clamp(1.5rem,3vw,2.6rem)}
    .anka-v40-arrow{display:flex;align-items:center;justify-content:center;width:clamp(1.8rem,2.6vw,2.7rem);height:clamp(1.8rem,2.6vw,2.7rem);font:400 clamp(1.4rem,2.2vw,2.25rem)/1 Arial,sans-serif;color:#050505;pointer-events:none}
    .anka-v40-row{display:grid;gap:clamp(.8rem,1.6vw,1.45rem);margin:0 0 clamp(1rem,2vw,1.7rem)}
    .anka-v40-row.c2{grid-template-columns:repeat(2,minmax(0,1fr))}.anka-v40-row.c3{grid-template-columns:repeat(3,minmax(0,1fr))}
    .anka-v40-card{position:relative;display:flex;align-items:center;justify-content:center;width:100%;min-width:0;aspect-ratio:4/5;margin:0;padding:0;overflow:hidden;border:0;background:rgba(255,255,255,.34);cursor:zoom-in}
    .anka-v40-card.transparent{background:transparent!important}
    .anka-v40-card img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;user-select:none;-webkit-user-drag:none}
    .anka-v40-main{position:relative;z-index:1;transition:opacity .25s ease,transform .3s ease}
    .anka-v40-hover{position:absolute;inset:0;z-index:2;display:grid;grid-template-columns:repeat(var(--cols,1),minmax(0,1fr));gap:.4rem;padding:.4rem;opacity:0;background:rgba(255,255,255,.92);transition:opacity .25s ease;pointer-events:none}
    .anka-v40-card.is-alt .anka-v40-main{opacity:0;transform:scale(.985)}.anka-v40-card.is-alt .anka-v40-hover{opacity:1}
    @media (hover:hover) and (pointer:fine){.anka-v40-card.has-hover:hover .anka-v40-main{opacity:0;transform:scale(.985)}.anka-v40-card.has-hover:hover .anka-v40-hover{opacity:1}}
    .anka-v40-results .anka-v40-card,.anka-v40-art .anka-v40-card,.anka-v40-logo .anka-v40-card{aspect-ratio:auto;min-height:clamp(15rem,28vw,32rem)}
    .anka-v40-results .anka-v40-card{background:transparent!important}
    .anka-v40-details .anka-v40-row .anka-v40-card{aspect-ratio:4/3}
    .anka-v40-light{position:fixed!important;inset:0!important;z-index:3300000!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100vw!important;height:100dvh!important;padding:clamp(1rem,3vw,2.5rem)!important;background:rgba(0,0,0,.96)!important;cursor:zoom-out}
    .anka-v40-light img{display:block;max-width:94vw;max-height:92dvh;object-fit:contain;cursor:default}
    .anka-v40-light button{position:fixed;top:1rem;right:1rem;height:2.4rem;padding:0 1rem;border:0;background:#fff;color:#050505;font:900 .68rem/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}
    @media(max-width:820px){.anka-v40-section{padding-top:3.5rem}.anka-v40-title{font-size:clamp(2rem,10vw,3.7rem);margin-bottom:1.4rem}.anka-v40-chain{grid-template-columns:1fr;gap:.7rem;margin-bottom:2rem}.anka-v40-arrow{width:100%;height:1.5rem;transform:rotate(90deg)}.anka-v40-row.c2,.anka-v40-row.c3{grid-template-columns:1fr}.anka-v40-card,.anka-v40-results .anka-v40-card,.anka-v40-art .anka-v40-card,.anka-v40-logo .anka-v40-card,.anka-v40-details .anka-v40-row .anka-v40-card{min-height:0;aspect-ratio:4/5}}
  `;
  document.head.append(S);

  const p=(folder,file)=>`/works/anka-peresild/${folder}/${file}`;
  const C={
    jacketArt:p('clothes','olymp-jacket-art.jpg'),jacketMock:p('clothes','olymp-jacket-mockup.jpg'),jacketBack:p('clothes','olymp-jacket-mockup-back.webp'),jacketFlat:p('clothes','olymp-jacket-mockup-flat.jpg'),jacketFinal:p('clothes','olymp-jacket-final.webp'),
    pantsArt:p('clothes','olymp-pants-art.jpg'),pantsMock:p('clothes','olymp-pants-mockup.jpg'),pantsFinal:p('clothes','olymp-pants-final.webp'),pantsSide:p('clothes','olymp-pants-final-side.webp'),
    blueArt:p('clothes','shirt-blue-art.jpg'),blueMock:p('clothes','shirt-blue-mockup.jpg'),blueFinal:p('clothes','shirt-blue-final.jpg'),
    whiteArt:p('clothes','shirt-white-art.jpg'),whiteMock:p('clothes','shirt-white-mockup.jpg'),whiteFinal:p('clothes','shirt-white-final.jpg'),
    blackArt:p('clothes','costume-blackl-art.jpg'),blackMock:p('clothes','costume-blackl-mockup.jpg'),blackFinal:p('clothes','costume-blackl-final.jpg'),
    costumeWhiteArt:p('clothes','costume-white-art.jpg'),costumeWhiteMock:p('clothes','costume-white-mockup.jpg'),costumeWhiteFinal:p('clothes','costume-white-final.jpg')
  };
  const B={};
  for(let i=1;i<=5;i++){B[`real${i}`]=p('babes',`real-baba-${i}.webp`);B[`draw${i}`]=p('babes',`draw-baba-${i}.jpg`)}
  const A={
    bc1:p('acs','button-concept-1.jpg'),ba1:p('acs','button-concept-art-1.jpg'),bf1:p('acs','button-concept-final-1.jpg'),
    bc2:p('acs','button-concept-2.jpg'),ba2:p('acs','button-concept-art-2.jpg'),bf2:p('acs','button-concept-final-2.jpg'),
    bn1:p('acs','button-new-1.jpg'),bn2:p('acs','button-new-2.jpg'),bn3:p('acs','button-new-3.jpg'),bn4:p('acs','button-new-4.jpg'),
    logo2:p('acs','LOGO-ANKA-2.jpg'),logo1:p('acs','LOGO-ANKA.jpg'),misc1:p('acs','misc-1.png'),misc3:p('acs','misc-3.png'),misc2:p('acs','misc-2.png'),
    n1:p('acs','needles-1.png'),n2:p('acs','needles-2.png'),n3:p('acs','needles-3.png')
  };

  let light=null;
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const card=(src,{alt='ANKA PERESILD',hover=[],transparent=false}={})=>`<button type="button" class="anka-v40-card${hover.length?' has-hover':''}${transparent?' transparent':''}" data-full="${esc(src)}" data-hover="${hover.length?'1':'0'}" aria-label="${esc(alt)}"><img class="anka-v40-main" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">${hover.length?`<span class="anka-v40-hover" style="--cols:${hover.length}">${hover.map((h,i)=>`<img src="${esc(h)}" alt="${esc(alt)} alternate ${i+1}" loading="lazy" decoding="async">`).join('')}</span>`:''}</button>`;
  const arrow='<span class="anka-v40-arrow" aria-hidden="true">→</span>';
  const chain=(items)=>`<div class="anka-v40-chain">${items.join(arrow)}</div>`;
  const row=(items,n,transparent=false)=>`<div class="anka-v40-row c${n}">${items.map((x,i)=>card(x,{alt:`ANKA PERESILD ${i+1}`,transparent})).join('')}</div>`;
  const section=(title,cls,body)=>`<section class="anka-v40-section ${cls}"><h2 class="anka-v40-title">${title}</h2>${body}</section>`;
  const sub=t=>`<h3 class="anka-v40-sub">${t}</h3>`;

  function closeLight(){light?.remove();light=null}
  function openLight(src,alt){
    closeLight();
    const el=document.createElement('div');
    el.className='anka-peresild-lightbox anka-v40-light';
    el.innerHTML=`<img src="${esc(src)}" alt="${esc(alt||'ANKA PERESILD')}"><button type="button">${document.documentElement.lang==='ru'?'ЗАКРЫТЬ':'CLOSE'}</button>`;
    el.addEventListener('click',closeLight);
    el.querySelector('img').addEventListener('click',e=>e.stopPropagation());
    el.querySelector('button').addEventListener('click',e=>{e.stopPropagation();closeLight()});
    document.body.append(el);light=el;
  }

  function build(grid){
    if(grid.dataset.ankaLayout==='v40')return;
    grid.dataset.ankaLayout='v40';
    grid.classList.add('anka-v40');
    const clothes=section('CLOTHES','anka-v40-clothes',
      chain([card(C.jacketArt,{alt:'Olymp jacket artwork'}),card(C.jacketMock,{alt:'Olymp jacket mockup',hover:[C.jacketBack,C.jacketFlat]}),card(C.jacketFinal,{alt:'Olymp jacket final'})])+
      chain([card(C.pantsArt,{alt:'Olymp pants artwork'}),card(C.pantsMock,{alt:'Olymp pants mockup'}),card(C.pantsFinal,{alt:'Olymp pants final',hover:[C.pantsSide]})])+
      chain([card(C.blueArt,{alt:'Blue shirt artwork'}),card(C.blueMock,{alt:'Blue shirt mockup'}),card(C.blueFinal,{alt:'Blue shirt final'})])+
      chain([card(C.whiteArt,{alt:'White shirt artwork'}),card(C.whiteMock,{alt:'White shirt mockup'}),card(C.whiteFinal,{alt:'White shirt final'})])+
      chain([card(C.blackArt,{alt:'Black costume artwork'}),card(C.blackMock,{alt:'Black costume mockup'}),card(C.blackFinal,{alt:'Black costume final'})])+
      chain([card(C.costumeWhiteArt,{alt:'White costume artwork'}),card(C.costumeWhiteMock,{alt:'White costume mockup'}),card(C.costumeWhiteFinal,{alt:'White costume final'})])
    );
    const results=section('FINAL RESULTS','anka-v40-results',row([B.real1,B.real2,B.real3],3,true)+row([B.real4,B.real5],2,true));
    const art=section('ART','anka-v40-art',row([B.draw1,B.draw2],2)+row([B.draw3,B.draw4,B.draw5],3));
    const details=section('DETAILS','anka-v40-details',sub('BUTTONS')+
      chain([card(A.bc1,{alt:'Button concept 1'}),card(A.ba1,{alt:'Button artwork 1'}),card(A.bf1,{alt:'Button final 1'})])+
      chain([card(A.bc2,{alt:'Button concept 2'}),card(A.ba2,{alt:'Button artwork 2'}),card(A.bf2,{alt:'Button final 2'})])+
      row([A.bn1,A.bn2],2)+row([A.bn3,A.bn4],2)
    );
    const logo=section('LOGO','anka-v40-logo',sub('MAIN LOGO')+row([A.logo2,A.logo1],2)+sub('TAGS')+row([A.misc1,A.misc3,A.misc2],3,true)+row([A.n1,A.n2,A.n3],3,true));
    grid.innerHTML=clothes+results+art+details+logo;

    grid.addEventListener('click',e=>{
      const btn=e.target.closest('.anka-v40-card');
      if(!btn)return;
      e.preventDefault();e.stopPropagation();
      if(btn.dataset.hover==='1'&&matchMedia('(hover:none),(pointer:coarse)').matches&&!btn.classList.contains('is-alt')){btn.classList.add('is-alt');return}
      openLight(btn.dataset.full,btn.getAttribute('aria-label'));
    });
  }

  let queued=false;
  function apply(){
    const modal=document.querySelector('.anka-peresild-modal');
    if(!modal){closeLight();return}
    const grid=modal.querySelector('.anka-peresild-grid');
    if(grid)build(grid);
  }
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})}
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&light){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();closeLight()}},true);
  window.addEventListener('load',schedule,{once:true});
  [80,220,600,1200].forEach(t=>setTimeout(schedule,t));
})();
