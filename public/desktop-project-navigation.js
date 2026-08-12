(() => {
  if (window.__desktopProjectNavigationV2) return;
  window.__desktopProjectNavigationV2 = true;

  const VERSION = 'desktop-project-navigation-2';
  const STYLE_ID = 'desktop-project-navigation-style';
  const FOOTER_CLASS = 'desktop-project-navigation';

  const PROJECTS = [
    { slug: 'zny', titles: ['ZNY'], selectors: ['.zny-modal'] },
    { slug: 'fable', titles: ['F | ABLE', 'FABLE'], selectors: ['.fable-modal'] },
    { slug: 'pink-punk', titles: ['PINK PUNK'], selectors: ['.pink-punk-fullscreen'] },
    { slug: 'carnival-records', titles: ['CARNIVAL RECORDS'], selectors: ['.cr-modal'] },
    { slug: 'blandetto', titles: ['BLANDETTO'], selectors: ['.blandetto-modal', '.bf'] },
    { slug: 'ninety-z-s', titles: ['NINETY Z S', '90.06', '90 06'], selectors: ['.project9006-modal'] },
    { slug: 'posters', titles: ['POSTERS'], selectors: ['.pcg-modal'] },
    { slug: 'merch', titles: ['MERCH'], selectors: ['.mc-modal'] },
    { slug: 'stickers', titles: ['STICKERS'], selectors: ['.stk-modal'] },
    { slug: 'logos', titles: ['LOGOS', 'ЛОГОТИПЫ'], selectors: ['.lcg-modal'] },
    { slug: 'album-covers', titles: ['ALBUM COVERS'], selectors: ['.album-covers-modal'] },
    { slug: 'stay-ugly', titles: ['STAY UGLY', 'STAYUGLY'], selectors: ['.su-modal'] },
    { slug: 'anka-peresild', titles: ['ANKA PERESILD'], selectors: ['.anka-peresild-modal'] },
    { slug: 'vtb-design-team', titles: ['VTB DESIGN TEAM'], selectors: ['.vtb-modal'] },
    { slug: 'collages-photo-edit', titles: ['COLLAGES PHOTO EDIT'], selectors: ['.collages-modal'] },
  ];

  const PROJECT_BY_SLUG = new Map(PROJECTS.map((project) => [project.slug, project]));

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/\|/g, '')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const titleToProject = (title) => {
    const wanted = normalize(title);
    return PROJECTS.find((project) => project.titles.some((candidate) => normalize(candidate) === wanted)) || null;
  };

  function language() {
    return document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  }

  function copy() {
    return language() === 'ru'
      ? { previous: 'ПРЕДЫДУЩИЙ ПРОЕКТ', next: 'СЛЕДУЮЩИЙ ПРОЕКТ' }
      : { previous: 'PREVIOUS PROJECT', next: 'NEXT PROJECT' };
  }

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .${FOOTER_CLASS}{
        box-sizing:border-box!important;
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:1px!important;
        width:100%!important;
        max-width:none!important;
        grid-column:1/-1!important;
        margin:clamp(5rem,9vw,9rem) 0 0!important;
        padding:1px!important;
        border:0!important;
        background:#050505!important;
      }
      .${FOOTER_CLASS}__spacer{display:block!important;min-height:clamp(8rem,14vw,14rem)!important;background:#fff!important}
      .${FOOTER_CLASS}__button{
        box-sizing:border-box!important;
        position:relative!important;
        display:flex!important;
        flex-direction:column!important;
        justify-content:space-between!important;
        align-items:flex-start!important;
        min-width:0!important;
        min-height:clamp(8rem,14vw,14rem)!important;
        margin:0!important;
        padding:clamp(1.25rem,2.6vw,2.5rem)!important;
        border:0!important;
        border-radius:0!important;
        outline:0!important;
        background:#fff!important;
        color:#050505!important;
        text-align:left!important;
        cursor:pointer!important;
        overflow:hidden!important;
        transition:background-color .22s ease,color .22s ease,transform .22s ease!important;
      }
      .${FOOTER_CLASS}__button:hover{background:#a6ff00!important;color:#050505!important}
      .${FOOTER_CLASS}__button:active{transform:scale(.995)!important}
      .${FOOTER_CLASS}__eyebrow{
        display:flex!important;
        align-items:center!important;
        gap:.7rem!important;
        margin:0!important;
        font:900 .66rem/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.22em!important;
        text-transform:uppercase!important;
      }
      .${FOOTER_CLASS}__title{
        display:block!important;
        max-width:14ch!important;
        margin:clamp(2.5rem,6vw,6rem) 0 0!important;
        font:900 clamp(2.6rem,5.6vw,7rem)/.82 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.075em!important;
        text-transform:uppercase!important;
        overflow-wrap:anywhere!important;
      }
      .${FOOTER_CLASS}__button--next{align-items:flex-end!important;text-align:right!important}
      .${FOOTER_CLASS}__button--next .${FOOTER_CLASS}__title{margin-left:auto!important}
      .${FOOTER_CLASS}__arrow{font-size:1rem!important;letter-spacing:0!important}
      @media(max-width:820px){.${FOOTER_CLASS}{display:none!important}}
      @media(prefers-reduced-motion:reduce){.${FOOTER_CLASS}__button{transition:none!important}}
    `;
    document.head.append(style);
  }

  function visible(node) {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function currentProjectFromUrl() {
    const slug = new URLSearchParams(location.search).get('project') || '';
    return PROJECT_BY_SLUG.get(slug) || null;
  }

  function detectOpenModal() {
    const fromUrl = currentProjectFromUrl();
    if (fromUrl) {
      for (const selector of fromUrl.selectors) {
        const modal = [...document.querySelectorAll(selector)].filter(visible).at(-1);
        if (modal) return { project: fromUrl, modal };
      }
      const genericPag = [...document.querySelectorAll('.pag-modal')].filter(visible).at(-1);
      if (genericPag && ['posters', 'logos', 'collages-photo-edit'].includes(fromUrl.slug)) return { project: fromUrl, modal: genericPag };
    }

    for (const project of PROJECTS) {
      for (const selector of project.selectors) {
        const modal = [...document.querySelectorAll(selector)].filter(visible).at(-1);
        if (modal) return { project, modal };
      }
    }

    const pag = [...document.querySelectorAll('.pag-modal')].filter(visible).at(-1);
    if (pag) {
      const heading = pag.querySelector('.pag-title,.pag-label,h1,h2,h3')?.textContent || '';
      const normalized = normalize(heading);
      if (normalized.includes('COLLAGE')) return { project: PROJECT_BY_SLUG.get('collages-photo-edit'), modal: pag };
      if (normalized.includes('POSTER')) return { project: PROJECT_BY_SLUG.get('posters'), modal: pag };
      if (normalized.includes('LOGO')) return { project: PROJECT_BY_SLUG.get('logos'), modal: pag };
    }

    return null;
  }

  function orderedProjects() {
    const cards = [...document.querySelectorAll('#works .mt-10.grid > article, #works .mt-10.grid > button')]
      .map((card, domIndex) => {
        const project = titleToProject(card.querySelector('h3')?.textContent);
        if (!project) return null;
        const rawOrder = getComputedStyle(card).order;
        const order = Number.isFinite(Number(rawOrder)) ? Number(rawOrder) : 0;
        return { project, order, domIndex };
      })
      .filter(Boolean)
      .sort((a, b) => a.order - b.order || a.domIndex - b.domIndex);

    const seen = new Set();
    const result = [];
    cards.forEach(({ project }) => {
      if (seen.has(project.slug)) return;
      seen.add(project.slug);
      result.push(project);
    });
    PROJECTS.forEach((project) => {
      if (!seen.has(project.slug)) result.push(project);
    });
    return result;
  }

  function footerHost(modal) {
    const direct = [...modal.children].filter((node) => node instanceof HTMLElement && !node.matches('button,style,script'));
    if (!direct.length) return modal;

    const preferred = direct.find((node) => {
      const cls = String(node.className || '');
      return /(inner|shell|content|wrap|body|container)/i.test(cls) && node.querySelector('h1,h2,h3,img,video');
    });
    if (preferred) return preferred;

    return direct
      .filter((node) => node.querySelector('h1,h2,h3,img,video'))
      .sort((a, b) => b.querySelectorAll('*').length - a.querySelectorAll('*').length)[0]
      || modal;
  }

  function navigateTo(project) {
    if (!project) return;
    const url = new URL(location.href);
    url.searchParams.set('project', project.slug);
    url.searchParams.delete('section');
    url.hash = '';
    const next = `${url.pathname}${url.search}${url.hash}`;
    history.pushState({ desktopProjectNavigation: VERSION, project: project.slug }, '', next);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  }

  function makeButton(direction, project) {
    const text = copy();
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `${FOOTER_CLASS}__button ${FOOTER_CLASS}__button--${direction}`;
    button.dataset.projectSlug = project.slug;

    const eyebrow = document.createElement('span');
    eyebrow.className = `${FOOTER_CLASS}__eyebrow`;
    const arrow = document.createElement('span');
    arrow.className = `${FOOTER_CLASS}__arrow`;
    arrow.textContent = direction === 'previous' ? '←' : '→';
    const label = document.createElement('span');
    label.textContent = direction === 'previous' ? text.previous : text.next;
    if (direction === 'previous') eyebrow.append(arrow, label);
    else eyebrow.append(label, arrow);

    const title = document.createElement('strong');
    title.className = `${FOOTER_CLASS}__title`;
    title.textContent = project.titles[0];
    button.append(eyebrow, title);
    button.addEventListener('click', () => navigateTo(project));
    return button;
  }

  function renderNavigation(project, modal) {
    if (!project || !modal?.isConnected) return false;
    installStyles();

    const order = orderedProjects();
    const index = order.findIndex((item) => item.slug === project.slug);
    if (index < 0) return false;
    const previous = index > 0 ? order[index - 1] : null;
    const next = index < order.length - 1 ? order[index + 1] : null;
    const host = footerHost(modal);

    let footer = modal.querySelector(`.${FOOTER_CLASS}`);
    if (!footer) {
      footer = document.createElement('nav');
      footer.className = FOOTER_CLASS;
      footer.setAttribute('aria-label', language() === 'ru' ? 'Навигация между проектами' : 'Project navigation');
    }

    footer.dataset.currentProject = project.slug;
    const signature = `${project.slug}|${previous?.slug || ''}|${next?.slug || ''}|${language()}`;
    if (footer.dataset.signature !== signature) {
      footer.dataset.signature = signature;
      footer.setAttribute('aria-label', language() === 'ru' ? 'Навигация между проектами' : 'Project navigation');
      footer.replaceChildren(
        previous ? makeButton('previous', previous) : Object.assign(document.createElement('span'), { className: `${FOOTER_CLASS}__spacer` }),
        next ? makeButton('next', next) : Object.assign(document.createElement('span'), { className: `${FOOTER_CLASS}__spacer` }),
      );
    }

    if (footer.parentElement !== host || host.lastElementChild !== footer) host.append(footer);
    return true;
  }

  let scheduled = false;
  function apply() {
    scheduled = false;
    const opened = detectOpenModal();
    if (!opened) return;
    renderNavigation(opened.project, opened.modal);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(apply);
  }

  new MutationObserver((records) => {
    if (records.some((record) => record.addedNodes.length || record.removedNodes.length)) schedule();
  }).observe(document.body, { childList: true, subtree: true });

  new MutationObserver(schedule).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('popstate', () => setTimeout(schedule, 0));
  window.addEventListener('load', schedule, { once: true });
  installStyles();
  [0, 80, 240, 700].forEach((delay) => setTimeout(schedule, delay));
})();
