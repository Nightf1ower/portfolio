(() => {
  if (window.__portfolioFinalQaFixesV5) return;
  window.__portfolioFinalQaFixesV5 = true;

  const VERSION = 'portfolio-final-qa-fixes-5';
  const PROJECT_NAMES = 'ZNY | FABLE | CARNIVAL RECORDS | ANKA PERESILD | PINK PUNK';
  const LEGACY_LIGHTBOXES = [
    '.vtb-light','.stk-light','.cr-light','.cr-lightbox','.cr-final-lightbox','.zny-light','.zny-lightbox',
    '.fable-light','.fable-lightbox','.bf-light','.blandetto-lightbox','.su-light','.su-lightbox',
    '.m10-light','.merch9-light','.mc-light','.mc-lightbox','.project9006-lightbox','.pcg-light',
    '.pcg-lightbox','.pag-light','.pag-lightbox','.lcg-light','.lcg-lightbox','.album-covers-lightbox',
    '.album-covers-light','.anka-peresild-lightbox','.collages-light','.collages-lightbox'
  ];

  document.getElementById('portfolio-final-qa-fixes-style')?.remove();
  const style = document.createElement('style');
  style.id = 'portfolio-final-qa-fixes-style';
  style.dataset.version = VERSION;
  style.textContent = `
    #top .portfolio-hero-profession-with-brands{
      display:flex!important;
      flex-direction:column-reverse!important;
      align-items:flex-start!important;
      justify-content:flex-start!important;
      gap:clamp(.75rem,1.05vw,1.05rem)!important;
    }
    #top .portfolio-hero-brands{
      display:block!important;
      width:max-content!important;
      max-width:100%!important;
      margin:0!important;
      font:900 clamp(.62rem,.78vw,.82rem)/1.25 Arial,Helvetica,sans-serif!important;
      letter-spacing:.18em!important;
      text-transform:uppercase!important;
      white-space:normal!important;
    }
    .pink-punk-fullscreen .portfolio-qa-stable-title,.pink-punk-fullscreen .portfolio-qa-stable-title *{animation:none!important;transition:none!important;transform:none!important;will-change:auto!important;backface-visibility:hidden!important;-webkit-font-smoothing:antialiased!important}
    .vtb-head,.portfolio-qa-static-head{position:sticky!important;top:0!important;z-index:900500!important;transform:none!important;will-change:auto!important}

    .project9006-modal{position:fixed!important;inset:0!important;box-sizing:border-box!important;width:100vw!important;max-width:none!important;height:100dvh!important;min-height:100dvh!important;margin:0!important;overflow-y:auto!important;overflow-x:hidden!important}
    .project9006-modal>.mx-auto,.project9006-modal>[class*="max-w-"],.project9006-modal>.project9006-inner,.project9006-modal>.project9006-shell{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important}

    .desktop-project-navigation{position:relative!important;z-index:900200!important;isolation:isolate!important;pointer-events:auto!important}
    .desktop-project-navigation__button{position:relative!important;z-index:2!important;pointer-events:auto!important;touch-action:manipulation!important}
    .desktop-project-navigation::before{content:'';position:absolute;z-index:-1;left:50%;width:100vw;top:calc(-1 * clamp(5rem,9vw,9rem));bottom:0;transform:translateX(-50%);background:var(--portfolio-nav-surround,transparent);pointer-events:none}
    .desktop-project-navigation[data-qa-project="merch"]{--portfolio-nav-surround:#e5312b}
    .desktop-project-navigation[data-qa-project="posters"]{--portfolio-nav-surround:#56876D}
    .stk-subtitle{margin:0 0 clamp(1.35rem,2.5vw,2rem)!important;font:900 clamp(1.25rem,2.25vw,2.15rem)/.95 Arial,Helvetica,sans-serif!important;letter-spacing:.1em!important;text-transform:uppercase!important}

    @media(max-width:820px){
      #top .portfolio-hero-profession-with-brands{gap:.65rem!important}
      #top .portfolio-hero-brands{font-size:.64rem!important;letter-spacing:.12em!important;line-height:1.45!important}
      .desktop-project-navigation{display:grid!important;grid-template-columns:1fr!important;width:100%!important;margin-top:4rem!important}
      .desktop-project-navigation__button,.desktop-project-navigation__spacer{min-height:9rem!important}
      .desktop-project-navigation__spacer{display:none!important}
      .desktop-project-navigation__button{padding:1.15rem!important}
      .desktop-project-navigation__title{margin-top:2rem!important;font-size:clamp(2.2rem,13vw,4.6rem)!important;line-height:.84!important}
      .desktop-project-navigation::before{top:-4rem!important}
      .stk-subtitle{font-size:1.2rem!important}
    }
  `;
  document.head.append(style);

  const norm=value=>String(value||'').replace(/\s+/g,' ').trim().toUpperCase();
  const visible=node=>{if(!(node instanceof Element)||!node.isConnected)return false;const css=getComputedStyle(node),rect=node.getBoundingClientRect();return css.display!=='none'&&css.visibility!=='hidden'&&Number(css.opacity||1)!==0&&rect.width>2&&rect.height>2};

  function fixHero(){
    const hero=document.getElementById('top');if(!hero)return;
    const profession=[...hero.querySelectorAll('p')].find(p=>/GRAPHIC DESIGNER|ГРАФИЧЕСКИЙ ДИЗАЙНЕР/.test(norm(p.textContent)));if(!profession)return;
    profession.classList.add('portfolio-hero-profession-with-brands');
    let brands=profession.querySelector(':scope>.portfolio-hero-brands');
    if(!brands){brands=document.createElement('span');brands.className='portfolio-hero-brands';profession.append(brands)}
    if(brands.textContent!==PROJECT_NAMES)brands.textContent=PROJECT_NAMES;
  }
  function fixPinkTitle(){const modal=document.querySelector('.pink-punk-fullscreen');if(!modal)return;[...modal.querySelectorAll('h1,h2,h3,p')].forEach(node=>{if(norm(node.textContent).includes('GRAPHIC T-SHIRT DESIGN'))node.classList.add('portfolio-qa-stable-title')})}
  function fixStaticHeads(){document.querySelectorAll('.vtb-head').forEach(node=>node.classList.add('portfolio-qa-static-head'));const anka=document.querySelector('.anka-peresild-modal');const close=anka?.querySelector('.anka-peresild-close,[class*="close"],button[aria-label*="close" i]');if(close){const head=close.closest('header,[class*="head"],[class*="toolbar"],[class*="topbar"],[class*="top-bar"]')||close.parentElement;if(head&&head!==anka)head.classList.add('portfolio-qa-static-head')}}
  function fixNav(){const slug=new URLSearchParams(location.search).get('project')||'';document.querySelectorAll('.desktop-project-navigation').forEach(nav=>{if(nav.dataset.qaProject!==slug)nav.dataset.qaProject=slug})}
  function apply(){fixHero();fixPinkTitle();fixStaticHeads();fixNav()}

  let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})};
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,characterData:true});
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  addEventListener('popstate',schedule);addEventListener('resize',schedule,{passive:true});

  window.addEventListener('keydown',event=>{
    if(event.key!=='Escape'||document.querySelector('.desktop-unified-lightbox'))return;
    const light=LEGACY_LIGHTBOXES.flatMap(selector=>[...document.querySelectorAll(selector)]).filter(visible).at(-1);if(!light)return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    const close=[...light.querySelectorAll('button,[role="button"]')].find(button=>/CLOSE|ЗАКРЫТЬ|×|✕/.test(norm([button.className,button.getAttribute('aria-label'),button.textContent].filter(Boolean).join(' '))));
    if(close)close.click();else light.remove();
  },true);

  apply();[80,240,700,1400].forEach(ms=>setTimeout(schedule,ms));
})();