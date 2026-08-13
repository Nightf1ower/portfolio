(() => {
  if (window.__projectCardCategoriesV6) return;
  window.__projectCardCategoriesV6 = true;

  const VERSION = 'project-card-categories-6';
  const STYLE_ID = 'project-card-categories-style';
  const CATEGORIES = {
    FABLE: ['LOGOS', 'GRAPHICS', 'APPAREL'],
    'ANKA PERESILD': ['APPAREL', 'AI ILLUSTRATIONS', 'MOCKUPS'],
    ZNY: ['DESIGN', 'INFOGRAPHICS', 'STICKERS'],
    BLANDETTO: ['LOGOS', 'GRAPHICS', 'ACCESSORIES'],
    'PINK PUNK': ['GRAPHICS', 'POSTERS'],
    'CARNIVAL RECORDS': ['ALBUM COVERS', 'GRAPHICS', 'MERCH'],
    MERCH: ['POSTERS', 'PRINTS', 'AI ILLUSTRATIONS'],
    'NINETY Z S': ['LOGOS', 'LOOKBOOK', 'POSTERS'],
    'VTB DESIGN TEAM': ['MERCH', 'ACCESSORIES', 'PRINTS'],
    'STAY UGLY': ['DEVELOPMENT', 'LOOKBOOK'],
    POSTERS: ['INFOGRAPHICS', 'PROJECTS', 'PARTIES'],
    STICKERS: ['MNU', 'NIGHTFLOWER'],
    LOGOS: ['IDENTITY', 'BRANDING', 'DEVELOPMENT'],
    'ALBUM COVERS': ['COVER ART', 'GRAPHICS'],
    'COLLAGES PHOTO EDIT': ['MY OWN EDITS'],
  };

  function normalize(value) {
    const title = String(value || '').toUpperCase().replace(/\|/g, '').replace(/[^A-ZА-ЯЁ0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
    if (title === 'F ABLE' || title === 'FABLE') return 'FABLE';
    if (title === '90 06' || title === 'NINETY Z S') return 'NINETY Z S';
    if (title === 'STAYUGLY') return 'STAY UGLY';
    return title;
  }

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      #works .project-card-category-guard{display:none!important}
      #works .mt-10.grid>article,#works .mt-10.grid>button{position:relative!important;pointer-events:auto!important}
      #works .project-card-category-row{box-sizing:border-box!important;display:flex!important;width:100%!important;max-width:100%!important;min-width:0!important;flex-wrap:wrap!important;align-items:flex-start!important;justify-content:flex-start!important;gap:.5rem!important;margin-top:1rem!important;padding:0!important;list-style:none!important}
      #works .project-card-category-chip{box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:1.65rem!important;margin:0!important;padding:.32rem .58rem!important;border:1px solid rgba(5,5,5,.42)!important;background:rgba(255,255,255,.68)!important;color:#050505!important;font-family:Arial,Helvetica,sans-serif!important;font-size:.58rem!important;font-weight:900!important;line-height:1!important;letter-spacing:.18em!important;text-transform:uppercase!important;white-space:nowrap!important;transition:background-color .25s ease,border-color .25s ease!important}
      #works .group:hover .project-card-category-chip{border-color:#050505!important;background:#a6ff00!important}
      @media(hover:hover) and (pointer:fine){
        #works .mt-10.grid>article,#works .mt-10.grid>button{transition:transform 300ms ease,box-shadow 300ms ease!important;transform:translateY(0)!important}
        #works .mt-10.grid>article:hover,#works .mt-10.grid>button:hover{transform:translateY(-.5rem)!important}
        #works .group .project-card-preview-v5,#works .group .project-card-placeholder-v5,#works .group .my-10>div{transition:transform 500ms ease!important;transform-origin:center center!important}
        #works .group:hover .project-card-preview-v5,#works .group:hover .project-card-placeholder-v5,#works .group:hover .my-10>div{transform:rotate(3deg) scale(1.05)!important}
      }
      @media(max-width:820px){#works .project-card-category-row{gap:.42rem!important;margin-top:.9rem!important}#works .project-card-category-chip{min-height:1.55rem!important;padding:.3rem .5rem!important;font-size:clamp(.5rem,2.15vw,.57rem)!important;letter-spacing:.15em!important}}
      @media(max-width:350px){#works .project-card-category-chip{white-space:normal!important;text-align:center!important}}
    `;
    document.head.append(style);
  }

  const grid = () => document.querySelector('#works .mt-10.grid');
  const cards = () => [...(grid()?.children || [])].filter(node => node instanceof HTMLElement && node.matches('article,button') && node.querySelector('h3'));

  function cardNumber(card) {
    const direct = [...card.querySelectorAll('span,small,p')].find(node => /^\d{2}$/.test((node.textContent || '').trim()));
    if (direct) return Number(direct.textContent.trim());
    const fallback = [...card.querySelectorAll('*')].find(node => /^\d{2}$/.test((node.textContent || '').trim()));
    return fallback ? Number(fallback.textContent.trim()) : null;
  }

  function applyNumberOrder() {
    cards().forEach((card, domIndex) => {
      const number = cardNumber(card);
      const order = Number.isFinite(number) ? number : 1000 + domIndex;
      card.style.setProperty('order', String(order), 'important');
      card.dataset.projectNumberOrder = String(order);
      delete card.dataset.featuredOrder;
    });
  }

  function protectGuard(guard) {
    if (guard.dataset.removeProtected === VERSION) return;
    guard.dataset.removeProtected = VERSION;
    try { Object.defineProperty(guard, 'remove', { configurable: true, value: () => {} }); } catch { guard.remove = () => {}; }
  }

  function legacyCategoryBlock(node) {
    if (!(node instanceof HTMLElement) || !node.matches('div,ul,ol')) return false;
    if (node.classList.contains('project-card-category-row')) return true;
    if (node.querySelector('h1,h2,h3,h4,p,img,picture,video,canvas,svg,button,a')) return false;
    const labels=[...node.querySelectorAll('span,li')].map(item=>item.textContent?.trim()||'').filter(Boolean);
    return labels.length>0 && labels.every(label=>label.length<=40);
  }

  function rowFor(heading) {
    const content=heading.parentElement;
    if(!(content instanceof HTMLElement))return null;
    const typeParagraph=heading.nextElementSibling?.tagName==='P'?heading.nextElementSibling:[...content.children].find(node=>node.tagName==='P')||null;
    let guard=content.querySelector(':scope>.project-card-category-guard');
    if(!guard){guard=document.createElement('span');guard.className='project-card-category-guard';guard.hidden=true;guard.setAttribute('aria-hidden','true')}
    protectGuard(guard);
    const rows=[...content.querySelectorAll(':scope>.project-card-category-row')];
    let row=rows.shift()||document.createElement('div');
    row.className='project-card-category-row';row.dataset.projectCategoriesFinal=VERSION;rows.forEach(n=>n.remove());
    [...content.children].forEach(node=>{if(node===heading||node===typeParagraph||node===guard||node===row)return;if(legacyCategoryBlock(node))node.remove()});
    const anchor=typeParagraph||heading;if(guard.previousElementSibling!==anchor)anchor.after(guard);if(guard.nextElementSibling!==row)guard.after(row);
    return row;
  }

  function updateCard(card) {
    const heading=card.querySelector('h3');if(!(heading instanceof HTMLElement))return;
    const categories=CATEGORIES[normalize(heading.textContent)];if(!categories)return;
    const row=rowFor(heading);if(!row)return;
    const signature=categories.join('|');if(row.dataset.categorySignature===signature)return;
    row.dataset.categorySignature=signature;
    row.replaceChildren(...categories.map(text=>{const chip=document.createElement('span');chip.className='project-card-category-chip';chip.textContent=text;return chip}));
  }

  function apply(){installStyles();applyNumberOrder();cards().forEach(updateCard)}
  let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})}
  let observer=null,observed=null;function observe(){const target=grid();if(!target||target===observed)return Boolean(target);observer?.disconnect();observed=target;observer=new MutationObserver(schedule);observer.observe(target,{childList:true,subtree:true,characterData:true});return true}
  let attempts=0;const retry=setInterval(()=>{attempts++;const ready=observe();schedule();if(ready||attempts>=40)clearInterval(retry)},120);
  document.addEventListener('click',()=>setTimeout(schedule,0),true);
  addEventListener('load',()=>{observe();schedule()},{once:true});
  addEventListener('resize',schedule,{passive:true});
  installStyles();schedule();
})();