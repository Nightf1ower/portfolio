(() => {
  if (window.__desktopProjectNavigationV3) return;
  window.__desktopProjectNavigationV3 = true;

  const VERSION = 'desktop-project-navigation-3';
  const STYLE_ID = 'desktop-project-navigation-style';
  const NAV = '.desktop-project-navigation';
  const BUTTON = '.desktop-project-navigation__button';

  const PROJECTS = [
    { slug:'zny', titles:['ZNY'], selectors:['.zny-modal'] },
    { slug:'fable', titles:['F | ABLE','FABLE'], selectors:['.fable-modal'] },
    { slug:'pink-punk', titles:['PINK PUNK','PINKPUNK'], selectors:['.pink-punk-fullscreen'] },
    { slug:'carnival-records', titles:['CARNIVAL RECORDS'], selectors:['.cr-modal'] },
    { slug:'blandetto', titles:['BLANDETTO'], selectors:['.blandetto-modal','.bf'] },
    { slug:'ninety-z-s', titles:['NINETY Z S','90.06','90 06'], selectors:['.project9006-modal'] },
    { slug:'posters', titles:['POSTERS'], selectors:['.pcg-modal','.pag-modal'] },
    { slug:'merch', titles:['MERCH'], selectors:['.mc-modal','.m10-modal'] },
    { slug:'stickers', titles:['STICKERS'], selectors:['.stk-modal'] },
    { slug:'logos', titles:['LOGOS','ЛОГОТИПЫ'], selectors:['.lcg-modal','.pag-modal'] },
    { slug:'album-covers', titles:['ALBUM COVERS'], selectors:['.album-covers-modal'] },
    { slug:'stay-ugly', titles:['STAY UGLY','STAYUGLY'], selectors:['.su-modal'] },
    { slug:'anka-peresild', titles:['ANKA PERESILD'], selectors:['.anka-peresild-modal'] },
    { slug:'vtb-design-team', titles:['VTB DESIGN TEAM'], selectors:['.vtb-modal'] },
    { slug:'collages-photo-edit', titles:['COLLAGES PHOTO EDIT','COLLAGES'], selectors:['.collages-modal','.pag-modal'] },
  ];

  const BY_SLUG = new Map(PROJECTS.map(project => [project.slug, project]));
  const CLOSE_SELECTORS = [
    '.zny-close','.fable-close','.cr-close','.blandetto-close','.bf-close','.bf-x',
    '.project9006-toolbar__close','.project9006-close','.p9006-close','.pcg-close','.pag-close',
    '.mc-close','.stk-close','.lcg-close','.album-covers-close','.su-close',
    '.anka-peresild-close','.vtb-close'
  ].join(',');

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

  function language() {
    return document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  }

  function copy() {
    return language() === 'ru'
      ? { previous:'ПРЕДЫДУЩИЙ ПРОЕКТ', next:'СЛЕДУЮЩИЙ ПРОЕКТ' }
      : { previous:'PREVIOUS PROJECT', next:'NEXT PROJECT' };
  }

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      ${NAV}{--project-nav-bg:#fff;--project-nav-fg:#050505;--project-nav-image:none;box-sizing:border-box!important;position:relative!important;z-index:20!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:0!important;width:100%!important;max-width:none!important;grid-column:1/-1!important;margin:clamp(5rem,9vw,9rem) 0 0!important;padding:0!important;border:0!important;border-top:1px solid var(--project-nav-fg)!important;background-color:var(--project-nav-bg)!important;background-image:var(--project-nav-image)!important;background-size:var(--project-nav-size,cover)!important;background-position:var(--project-nav-position,center bottom)!important;background-repeat:var(--project-nav-repeat,no-repeat)!important;color:var(--project-nav-fg)!important;overflow:hidden!important}
      ${NAV}__spacer{display:block!important;min-height:clamp(9rem,15vw,15rem)!important;background:transparent!important}
      ${BUTTON}{box-sizing:border-box!important;position:relative!important;z-index:1!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;align-items:flex-start!important;min-width:0!important;min-height:clamp(9rem,15vw,15rem)!important;margin:0!important;padding:clamp(1.25rem,2.6vw,2.5rem)!important;border:0!important;border-radius:0!important;background:transparent!important;color:inherit!important;text-align:left!important;cursor:pointer!important;pointer-events:auto!important;touch-action:manipulation!important;overflow:hidden!important;transition:background-color .18s ease,color .18s ease,transform .18s ease!important}
      ${BUTTON}+${BUTTON},${NAV}__spacer+${BUTTON},${BUTTON}+${NAV}__spacer{border-left:1px solid currentColor!important}
      ${BUTTON}:hover{background:#a6ff00!important;color:#050505!important}
      ${BUTTON}:active{transform:scale(.996)!important}
      ${NAV}__eyebrow{display:flex!important;align-items:center!important;gap:.7rem!important;margin:0!important;font:900 .66rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important}
      ${NAV}__title{display:block!important;max-width:14ch!important;margin:clamp(2.5rem,6vw,6rem) 0 0!important;font:900 clamp(2.6rem,5.6vw,7rem)/.82 Arial,Helvetica,sans-serif!important;letter-spacing:-.075em!important;text-transform:uppercase!important;overflow-wrap:anywhere!important}
      ${NAV}__button--next{align-items:flex-end!important;text-align:right!important}
      ${NAV}__button--next ${NAV}__title{margin-left:auto!important}
      @media(max-width:820px){${NAV}{grid-template-columns:1fr!important;margin-top:3.5rem!important}${BUTTON},${NAV}__spacer{min-height:9rem!important}${BUTTON}{padding:1.15rem!important}${BUTTON}+${BUTTON},${NAV}__spacer+${BUTTON},${BUTTON}+${NAV}__spacer{border-left:0!important;border-top:1px solid currentColor!important}${NAV}__title{margin-top:2rem!important;font-size:clamp(2.4rem,13vw,4.8rem)!important}}
      @media(prefers-reduced-motion:reduce){${BUTTON}{transition:none!important}}
    `;
    document.head.append(style);
  }

  function topLevelCards() {
    const grid = document.querySelector('#works .mt-10.grid');
    if (!grid) return [];
    return [...grid.children].filter(node => node instanceof HTMLElement && node.matches('article,button') && node.querySelector('h3'));
  }

  function cardFor(project) {
    if (!project) return null;
    const accepted = new Set(project.titles.map(norm));
    return topLevelCards().find(card => accepted.has(norm(card.querySelector('h3')?.textContent))) || null;
  }

  function cardNumber(card) {
    if (!(card instanceof HTMLElement)) return null;
    const marker = [...card.querySelectorAll('span,small,p,div')]
      .map(node => String(node.textContent || '').trim())
      .find(text => /^\d{2}$/.test(text));
    return marker ? Number(marker) : null;
  }

  function orderedProjects() {
    const rows = [];
    const seen = new Set();
    topLevelCards().forEach((card, domIndex) => {
      const project = PROJECTS.find(item => item.titles.some(title => norm(title) === norm(card.querySelector('h3')?.textContent)));
      if (!project || seen.has(project.slug)) return;
      seen.add(project.slug);
      const number = cardNumber(card);
      rows.push({ project, order:Number.isFinite(number) ? number : 1000 + domIndex, domIndex });
    });
    PROJECTS.forEach((project, i) => {
      if (!seen.has(project.slug)) rows.push({ project, order:2000 + i, domIndex:2000 + i });
    });
    return rows.sort((a,b) => a.order - b.order || a.domIndex - b.domIndex).map(row => row.project);
  }

  function openModalFor(project) {
    if (!project) return null;
    if (project.slug === 'pink-punk') {
      const gallery = document.querySelector('.pink-punk-gallery');
      const modal = gallery?.closest('.fixed.inset-0,[role="dialog"]');
      if (modal && visible(modal)) return modal;
    }
    for (const selector of project.selectors) {
      const candidates = [...document.querySelectorAll(selector)].filter(visible);
      if (!candidates.length) continue;
      if (selector === '.pag-modal') {
        const accepted = new Set(project.titles.map(norm));
        const match = candidates.find(modal => {
          const title = modal.querySelector('.pag-title,.pag-label,h1,h2,h3')?.textContent;
          return accepted.has(norm(title));
        });
        if (match) return match;
        continue;
      }
      return candidates.at(-1);
    }
    return null;
  }

  function detectOpen() {
    const slug = new URLSearchParams(location.search).get('project');
    const fromUrl = BY_SLUG.get(slug || '');
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

  function closeButton(modal) {
    if (!(modal instanceof HTMLElement)) return null;
    const original = [...modal.querySelectorAll(CLOSE_SELECTORS)].find(node => !node.closest('.portfolio-stable-head') && visible(node));
    if (original) return original;
    const nativePink = [...modal.querySelectorAll('button')].find(button => {
      if (button.closest('.portfolio-stable-head,.desktop-project-navigation,.desktop-unified-lightbox')) return false;
      const text = norm([button.textContent,button.getAttribute('aria-label'),button.getAttribute('title')].filter(Boolean).join(' '));
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ';
    });
    if (nativePink) return nativePink;
    return modal.querySelector(':scope > .portfolio-stable-head .portfolio-stable-head__close');
  }

  function footerHost(modal) {
    const direct = [...modal.children].filter(node => node instanceof HTMLElement && !node.matches('button,style,script,.portfolio-stable-head,.portfolio-stable-intro'));
    const preferred = direct.find(node => /(inner|shell|content|wrap|body|container)/i.test(String(node.className || '')) && node.querySelector('img,video,h1,h2,h3'));
    if (preferred) return preferred;
    return direct.filter(node => node.querySelector('img,video,h1,h2,h3')).sort((a,b) => b.querySelectorAll('*').length-a.querySelectorAll('*').length)[0] || modal;
  }

  function makeButton(direction, project) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `desktop-project-navigation__button desktop-project-navigation__button--${direction}`;
    button.dataset.projectSlug = project.slug;
    const eyebrow = document.createElement('span');
    eyebrow.className = 'desktop-project-navigation__eyebrow';
    const arrow = document.createElement('span');
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

  function lastThemeSource(modal, footer) {
    const nodes = [...modal.querySelectorAll('section,[class*="section"],[class*="bridge"],[class*="final"],[class*="footer"]')]
      .filter(node => node instanceof HTMLElement && node !== footer && !node.closest(NAV) && visible(node)).reverse();
    return nodes.find(node => {
      const css = getComputedStyle(node);
      return (css.backgroundImage && css.backgroundImage !== 'none') || !transparent(css.backgroundColor);
    }) || modal;
  }

  function applyTheme(modal, footer) {
    const source = lastThemeSource(modal,footer);
    const css = getComputedStyle(source);
    const modalCss = getComputedStyle(modal);
    const bg = transparent(css.backgroundColor) ? modalCss.backgroundColor : css.backgroundColor;
    const image = css.backgroundImage && css.backgroundImage !== 'none' ? css.backgroundImage : 'none';
    footer.style.setProperty('--project-nav-bg',transparent(bg) ? '#fff' : bg);
    footer.style.setProperty('--project-nav-fg',css.color || modalCss.color || '#050505');
    footer.style.setProperty('--project-nav-image',image);
    footer.style.setProperty('--project-nav-size',css.backgroundSize || 'cover');
    footer.style.setProperty('--project-nav-position',css.backgroundPosition || 'center bottom');
    footer.style.setProperty('--project-nav-repeat',css.backgroundRepeat || 'no-repeat');
  }

  function render(project, modal) {
    const order = orderedProjects();
    const index = order.findIndex(item => item.slug === project.slug);
    if (index < 0) return;
    const previous = index > 0 ? order[index - 1] : null;
    const next = index < order.length - 1 ? order[index + 1] : null;
    const host = footerHost(modal);
    let footer = modal.querySelector(NAV);
    if (!footer) {
      footer = document.createElement('nav');
      footer.className = 'desktop-project-navigation';
      footer.setAttribute('aria-label','Project navigation');
    }
    const signature = `${project.slug}|${previous?.slug || ''}|${next?.slug || ''}|${language()}`;
    if (footer.dataset.navigationV3 !== signature) {
      footer.dataset.navigationV3 = signature;
      footer.replaceChildren(
        previous ? makeButton('previous',previous) : Object.assign(document.createElement('span'),{className:'desktop-project-navigation__spacer'}),
        next ? makeButton('next',next) : Object.assign(document.createElement('span'),{className:'desktop-project-navigation__spacer'}),
      );
    }
    if (footer.parentElement !== host || host.lastElementChild !== footer) host.append(footer);
    applyTheme(modal,footer);
  }

  function setTargetUrl(project) {
    const url = new URL(location.href);
    url.searchParams.set('project',project.slug);
    url.searchParams.delete('section');
    url.hash = '';
    history.pushState({ desktopProjectNavigation:VERSION, project:project.slug },'',`${url.pathname}${url.search}`);
  }

  function clickProjectCard(project) {
    const card = cardFor(project);
    if (!card) return false;
    card.click();
    return true;
  }

  function openTarget(project, attempts = 0) {
    if (openModalFor(project)) return;
    clickProjectCard(project);
    if (attempts >= 4) return;
    window.setTimeout(() => {
      if (!openModalFor(project)) openTarget(project, attempts + 1);
    }, [70,140,260,480,800][attempts] || 800);
  }

  function navigate(slug) {
    const target = BY_SLUG.get(slug);
    if (!target) return;
    const current = detectOpen();
    if (current?.project.slug === target.slug) return;

    setTargetUrl(target);

    if (!current?.modal?.isConnected) {
      openTarget(target);
      return;
    }

    const currentModal = current.modal;
    const close = closeButton(currentModal);
    if (close) close.click();

    let tries = 0;
    const wait = () => {
      if (!currentModal.isConnected || !visible(currentModal) || tries >= 20) {
        openTarget(target);
        return;
      }
      tries += 1;
      window.setTimeout(wait,35);
    };
    wait();
  }

  function buttonFromEvent(event) {
    const target = event.target instanceof Element ? event.target : null;
    return target?.closest(BUTTON) || null;
  }

  // Single event path for all project navigation. Capture prevents legacy button listeners from firing.
  window.addEventListener('pointerup',event => {
    const button = buttonFromEvent(event);
    if (!button?.dataset.projectSlug) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    navigate(button.dataset.projectSlug);
  },true);

  window.addEventListener('click',event => {
    const button = buttonFromEvent(event);
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  },true);

  window.addEventListener('keydown',event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const button = buttonFromEvent(event);
    if (!button?.dataset.projectSlug) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    navigate(button.dataset.projectSlug);
  },true);

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const opened = detectOpen();
      if (opened) render(opened.project,opened.modal);
    });
  }

  const modalSelector = PROJECTS.flatMap(project => project.selectors).join(',') + ',.pink-punk-gallery';
  new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(modalSelector) || node.querySelector(modalSelector)) {
          schedule();
          return;
        }
      }
    }
  }).observe(document.body,{childList:true,subtree:true});

  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('load',schedule,{once:true});
  installStyles();
  schedule();
})();