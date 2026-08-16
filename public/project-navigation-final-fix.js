(() => {
  if (window.__projectNavigationFinalFixV1) return;
  window.__projectNavigationFinalFixV1 = true;

  const VERSION = 'project-navigation-final-fix-1';
  const NAV = '.desktop-project-navigation';
  const BUTTON = '.desktop-project-navigation__button';
  const STYLE_ID = 'project-navigation-final-fix-style';

  const PROJECTS = [
    { slug:'zny', titles:['ZNY'], selectors:['.zny-modal'] },
    { slug:'fable', titles:['F | ABLE','FABLE'], selectors:['.fable-modal'] },
    { slug:'pink-punk', titles:['PINK PUNK'], selectors:['.pink-punk-fullscreen'] },
    { slug:'carnival-records', titles:['CARNIVAL RECORDS'], selectors:['.cr-modal'] },
    { slug:'blandetto', titles:['BLANDETTO'], selectors:['.blandetto-modal','.bf'] },
    { slug:'ninety-z-s', titles:['NINETY Z S','90.06','90 06'], selectors:['.project9006-modal'] },
    { slug:'posters', titles:['POSTERS'], selectors:['.pcg-modal'] },
    { slug:'merch', titles:['MERCH'], selectors:['.mc-modal','.m10-modal'] },
    { slug:'stickers', titles:['STICKERS'], selectors:['.stk-modal'] },
    { slug:'logos', titles:['LOGOS','ЛОГОТИПЫ'], selectors:['.lcg-modal'] },
    { slug:'album-covers', titles:['ALBUM COVERS'], selectors:['.album-covers-modal'] },
    { slug:'stay-ugly', titles:['STAY UGLY','STAYUGLY'], selectors:['.su-modal'] },
    { slug:'anka-peresild', titles:['ANKA PERESILD'], selectors:['.anka-peresild-modal'] },
    { slug:'vtb-design-team', titles:['VTB DESIGN TEAM'], selectors:['.vtb-modal'] },
    { slug:'collages-photo-edit', titles:['COLLAGES PHOTO EDIT','COLLAGES'], selectors:['.collages-modal'] },
  ];

  const END_THEMES = {
    'pink-punk': { background:'#9b0014', foreground:'#ffffff' },
    'ninety-z-s': { background:'#050505', foreground:'#ffffff' },
    posters: { background:'#56876D', foreground:'#050505' },
    merch: { background:'#ef2b27', foreground:'#050505' },
    'vtb-design-team': { background:'#292929', foreground:'#ffffff' },
  };

  const bySlug = new Map(PROJECTS.map(project => [project.slug, project]));
  const norm = value => String(value || '')
    .toUpperCase().replace(/Ё/g,'Е').replace(/\|/g,' ')
    .replace(/[^A-ZА-Я0-9]+/g,' ').trim().replace(/\s+/g,' ');

  const visible = node => {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  };

  const transparent = value => {
    const v = String(value || '').replace(/\s+/g,'').toLowerCase();
    return !v || v === 'transparent' || v === 'rgba(0,0,0,0)';
  };

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      ${NAV}{
        --project-nav-bg:#fff;
        --project-nav-fg:#050505;
        --project-nav-image:none;
        box-sizing:border-box!important;
        position:relative!important;
        z-index:4!important;
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:0!important;
        width:100%!important;
        max-width:none!important;
        margin:clamp(5rem,9vw,9rem) 0 0!important;
        padding:0!important;
        border:0!important;
        border-top:1px solid var(--project-nav-fg)!important;
        background-color:var(--project-nav-bg)!important;
        background-image:var(--project-nav-image)!important;
        background-size:var(--project-nav-size,cover)!important;
        background-position:var(--project-nav-position,center bottom)!important;
        background-repeat:var(--project-nav-repeat,no-repeat)!important;
        color:var(--project-nav-fg)!important;
        overflow:hidden!important;
      }
      ${NAV}__spacer{
        display:block!important;
        min-height:clamp(9rem,15vw,15rem)!important;
        background:transparent!important;
        border:0!important;
      }
      ${BUTTON}{
        box-sizing:border-box!important;
        position:relative!important;
        z-index:1!important;
        display:flex!important;
        flex-direction:column!important;
        justify-content:space-between!important;
        align-items:flex-start!important;
        min-width:0!important;
        min-height:clamp(9rem,15vw,15rem)!important;
        margin:0!important;
        padding:clamp(1.25rem,2.6vw,2.5rem)!important;
        border:0!important;
        border-radius:0!important;
        outline:0!important;
        background:transparent!important;
        color:inherit!important;
        text-align:left!important;
        cursor:pointer!important;
        pointer-events:auto!important;
        touch-action:manipulation!important;
        overflow:hidden!important;
        transition:background-color .18s ease,color .18s ease,transform .18s ease!important;
      }
      ${BUTTON}+${BUTTON},
      ${NAV}__spacer+${BUTTON},
      ${BUTTON}+${NAV}__spacer{border-left:1px solid currentColor!important}
      ${BUTTON}:hover{background:rgba(166,255,0,.94)!important;color:#050505!important}
      ${BUTTON}:active{transform:scale(.996)!important}
      ${NAV}__eyebrow{
        display:flex!important;align-items:center!important;gap:.7rem!important;margin:0!important;
        font:900 .66rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;
      }
      ${NAV}__title{
        display:block!important;max-width:14ch!important;margin:clamp(2.5rem,6vw,6rem) 0 0!important;
        font:900 clamp(2.6rem,5.6vw,7rem)/.82 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.075em!important;text-transform:uppercase!important;overflow-wrap:anywhere!important;
      }
      ${NAV}__button--next{align-items:flex-end!important;text-align:right!important}
      ${NAV}__button--next ${NAV}__title{margin-left:auto!important}
      ${NAV}__arrow{font-size:1rem!important;letter-spacing:0!important}
      @media(max-width:820px){
        ${NAV}{display:grid!important;grid-template-columns:1fr!important;margin-top:3.5rem!important}
        ${BUTTON},${NAV}__spacer{min-height:9rem!important}
        ${BUTTON}{padding:1.15rem!important}
        ${BUTTON}+${BUTTON},${NAV}__spacer+${BUTTON},${BUTTON}+${NAV}__spacer{border-left:0!important;border-top:1px solid currentColor!important}
        ${NAV}__title{margin-top:2rem!important;font-size:clamp(2.4rem,13vw,4.8rem)!important}
      }
      @media(prefers-reduced-motion:reduce){${BUTTON}{transition:none!important}}
    `;
    document.head.append(style);
  }

  function projectFromUrl() {
    return bySlug.get(new URLSearchParams(location.search).get('project') || '') || null;
  }

  function openModalFor(project) {
    if (!project) return null;
    for (const selector of project.selectors) {
      const modal = [...document.querySelectorAll(selector)].filter(visible).at(-1);
      if (modal) return modal;
    }
    return null;
  }

  function detect() {
    const fromUrl = projectFromUrl();
    if (fromUrl) {
      const modal = openModalFor(fromUrl);
      if (modal) return { project:fromUrl, modal };
    }
    for (const project of PROJECTS) {
      const modal = openModalFor(project);
      if (modal) return { project, modal };
    }
    return null;
  }

  function cardFor(project) {
    const accepted = new Set(project.titles.map(norm));
    return [...document.querySelectorAll('#works article,#works button')]
      .find(card => accepted.has(norm(card.querySelector('h3')?.textContent))) || null;
  }

  function orderedProjects() {
    const rows = PROJECTS.map((project, fallback) => {
      const card = cardFor(project);
      if (!card) return { project, order:1000 + fallback, dom:fallback };
      const raw = Number(getComputedStyle(card).order);
      const mark = [...card.querySelectorAll('span,p,div')]
        .map(node => String(node.textContent || '').trim())
        .find(text => /^\d{2}$/.test(text));
      const numericMark = mark ? Number(mark) : NaN;
      const order = Number.isFinite(numericMark) ? numericMark : (Number.isFinite(raw) ? raw : 1000 + fallback);
      return { project, order, dom:[...card.parentElement?.children || []].indexOf(card) };
    });
    return rows.sort((a,b) => a.order-b.order || a.dom-b.dom).map(row => row.project);
  }

  function copy() {
    return document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? { previous:'ПРЕДЫДУЩИЙ ПРОЕКТ', next:'СЛЕДУЮЩИЙ ПРОЕКТ' }
      : { previous:'PREVIOUS PROJECT', next:'NEXT PROJECT' };
  }

  function makeButton(direction, project) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `desktop-project-navigation__button desktop-project-navigation__button--${direction}`;
    button.dataset.projectSlug = project.slug;
    button.setAttribute('aria-label', `${direction === 'previous' ? copy().previous : copy().next}: ${project.titles[0]}`);

    const eyebrow = document.createElement('span');
    eyebrow.className = 'desktop-project-navigation__eyebrow';
    const arrow = document.createElement('span');
    arrow.className = 'desktop-project-navigation__arrow';
    arrow.textContent = direction === 'previous' ? '←' : '→';
    const label = document.createElement('span');
    label.textContent = direction === 'previous' ? copy().previous : copy().next;
    direction === 'previous' ? eyebrow.append(arrow,label) : eyebrow.append(label,arrow);

    const title = document.createElement('strong');
    title.className = 'desktop-project-navigation__title';
    title.textContent = project.titles[0];
    button.append(eyebrow,title);
    return button;
  }

  function defaultHost(modal) {
    const direct = [...modal.children].filter(node => node instanceof HTMLElement && !node.matches('button,style,script,.portfolio-standard-head,.portfolio-standard-intro'));
    const preferred = direct.find(node => /(inner|shell|content|wrap|body|container)/i.test(String(node.className || '')) && node.querySelector('h1,h2,h3,img,video'));
    if (preferred) return preferred;
    return direct.filter(node => node.querySelector('h1,h2,h3,img,video')).sort((a,b) => b.querySelectorAll('*').length-a.querySelectorAll('*').length)[0] || modal;
  }

  function ensureFooter(project, modal) {
    const order = orderedProjects();
    const index = order.findIndex(item => item.slug === project.slug);
    if (index < 0) return null;
    const previous = index > 0 ? order[index-1] : null;
    const next = index < order.length-1 ? order[index+1] : null;
    const host = defaultHost(modal);

    let footer = modal.querySelector(NAV);
    if (!footer) {
      footer = document.createElement('nav');
      footer.className = 'desktop-project-navigation';
      footer.setAttribute('aria-label','Project navigation');
      host.append(footer);
    }

    const signature = `${project.slug}|${previous?.slug || ''}|${next?.slug || ''}|${copy().previous}`;
    if (footer.dataset.finalSignature !== signature) {
      footer.dataset.finalSignature = signature;
      footer.replaceChildren(
        previous ? makeButton('previous',previous) : Object.assign(document.createElement('span'),{className:'desktop-project-navigation__spacer'}),
        next ? makeButton('next',next) : Object.assign(document.createElement('span'),{className:'desktop-project-navigation__spacer'}),
      );
    }
    if (footer.parentElement !== host || host.lastElementChild !== footer) host.append(footer);
    return footer;
  }

  function lastThemeSource(modal, footer) {
    const candidates = [...modal.querySelectorAll('section,[class*="section"],[class*="bridge"],[class*="final"],[class*="footer"]')]
      .filter(node => node instanceof HTMLElement && !node.closest(NAV) && node !== footer && visible(node))
      .reverse();
    for (const node of candidates) {
      const css = getComputedStyle(node);
      if ((css.backgroundImage && css.backgroundImage !== 'none') || !transparent(css.backgroundColor)) return node;
    }
    return modal;
  }

  function applyTheme(project, modal, footer) {
    const fixed = END_THEMES[project.slug];
    if (fixed) {
      footer.style.setProperty('--project-nav-bg',fixed.background);
      footer.style.setProperty('--project-nav-fg',fixed.foreground);
      footer.style.setProperty('--project-nav-image','none');
      footer.style.removeProperty('--project-nav-size');
      footer.style.removeProperty('--project-nav-position');
      footer.style.removeProperty('--project-nav-repeat');
      return;
    }

    const source = lastThemeSource(modal,footer);
    const css = getComputedStyle(source);
    const bg = transparent(css.backgroundColor) ? getComputedStyle(modal).backgroundColor : css.backgroundColor;
    const image = css.backgroundImage && css.backgroundImage !== 'none' ? css.backgroundImage : 'none';
    footer.style.setProperty('--project-nav-bg',transparent(bg) ? '#ffffff' : bg);
    footer.style.setProperty('--project-nav-fg',css.color || '#050505');
    footer.style.setProperty('--project-nav-image',image);
    footer.style.setProperty('--project-nav-size',css.backgroundSize || 'cover');
    footer.style.setProperty('--project-nav-position',css.backgroundPosition || 'center bottom');
    footer.style.setProperty('--project-nav-repeat',css.backgroundRepeat || 'no-repeat');
  }

  function targetIsOpen(project) {
    return Boolean(openModalFor(project));
  }

  function navigate(slug) {
    const project = bySlug.get(slug);
    if (!project) return;
    const url = new URL(location.href);
    url.searchParams.set('project',project.slug);
    url.searchParams.delete('section');
    url.hash = '';
    const next = `${url.pathname}${url.search}${url.hash}`;
    history.pushState({ projectNavigationFinal:VERSION, project:project.slug },'',next);
    try { window.dispatchEvent(new PopStateEvent('popstate',{state:history.state})); }
    catch { window.dispatchEvent(new Event('popstate')); }

    window.setTimeout(() => {
      if (targetIsOpen(project)) return;
      const card = cardFor(project);
      if (card) card.click();
    },1100);
  }

  function navButtonFromEvent(event) {
    const target = event.target instanceof Element ? event.target : null;
    return target?.closest(BUTTON) || null;
  }

  window.addEventListener('pointerdown',event => {
    const button = navButtonFromEvent(event);
    const slug = button?.dataset.projectSlug;
    if (!slug) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    navigate(slug);
  },true);

  window.addEventListener('click',event => {
    const button = navButtonFromEvent(event);
    const slug = button?.dataset.projectSlug;
    if (!slug) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  },true);

  window.addEventListener('keydown',event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const button = document.activeElement?.closest?.(BUTTON);
    const slug = button?.dataset.projectSlug;
    if (!slug) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    navigate(slug);
  },true);

  function repair() {
    const opened = detect();
    if (!opened) return;
    const footer = ensureFooter(opened.project,opened.modal);
    if (!footer) return;
    footer.dataset.projectNavigationFinal = VERSION;
    applyTheme(opened.project,opened.modal,footer);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued=false; repair(); });
  };

  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('popstate',()=>setTimeout(schedule,0));
  window.addEventListener('load',schedule,{once:true});
  window.addEventListener('resize',schedule,{passive:true});

  installStyles();
  [0,80,240,600,1200].forEach(delay => setTimeout(schedule,delay));
})();
