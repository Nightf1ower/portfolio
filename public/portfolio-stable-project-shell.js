(() => {
  if (window.__portfolioStableProjectShellV5) return;
  window.__portfolioStableProjectShellV5 = true;
  window.__portfolioStableProjectShellV4 = true;
  window.__portfolioStableProjectShellV3 = true;
  window.__portfolioStableProjectShellV2 = true;

  const VERSION = 'portfolio-stable-project-shell-5';
  const STYLE_ID = 'portfolio-stable-project-shell-style';

  const PROJECTS = [
    { slug:'zny', selector:'.zny-modal', title:'ZNY', aliases:['ZNY'], chips:['GRAPHIC DESIGN','PRINTS','CAMPAIGN','STICKERS'], kind:'brand', aboutHints:['.zny-brand-copy','.zny-about-copy','.zny-intro-copy','.zny-copy'] },
    { slug:'fable', selector:'.fable-modal', title:'F | ABLE', aliases:['F | ABLE','FABLE'], chips:['LOGOS','GRAPHICS','APPAREL'], kind:'brand', aboutHints:['.fable-brand-copy','.fable-about-copy','.fable-intro-copy','.fable-copy'] },
    { slug:'carnival-records', selector:'.cr-modal', title:'CARNIVAL RECORDS', aliases:['CARNIVAL RECORDS'], chips:['ALBUM COVERS','GRAPHICS','MERCH'], kind:'brand', aboutHints:['.cr-brand-copy','.cr-about-copy','.cr-intro-copy','.cr-lead p','.cr-copy'] },
    { slug:'blandetto', selector:'.blandetto-modal,.bf', title:'BLANDETTO', aliases:['BLANDETTO'], chips:['LOGOS','GRAPHICS','ACCESSORIES'], kind:'brand', aboutHints:['.bf-brand-copy','.blandetto-brand-copy','.bf-about-copy'], legacy:['.bf-brand','.bf-h'] },
    { slug:'ninety-z-s', selector:'.project9006-modal', title:'NINETY Z S', aliases:['NINETY Z S','90.06','90 06'], chips:['IDENTITY','PENDANT','LOOKBOOK','POSTERS'], kind:'brand', bg:'#050505', fg:'#fff', aboutHints:['.project9006-brand-copy'], legacy:['.project9006-brand'] },
    { slug:'posters', selector:'.pcg-modal', title:'POSTERS', aliases:['POSTERS'], chips:['INFOGRAPHICS','PROJECTS','PARTIES'], kind:'project', bg:'#2C3D55', fg:'#fff', aboutHints:['.pcg-project-copy','.pcg-about-copy','.pcg-intro-copy','.pcg-copy'] },
    { slug:'merch', selector:'.mc-modal,.m10-modal', title:'MERCH', aliases:['MERCH'], chips:['POSTERS','PRINTS','AI ILLUSTRATIONS'], kind:'project', bg:'#87CEEB', fg:'#050505', aboutHints:['.m10-project-copy','.mc-project-copy','.m10-intro-copy'] },
    { slug:'stickers', selector:'.stk-modal', title:'STICKERS', aliases:['STICKERS'], chips:['MNU','NIGHTFLOWER'], kind:'project', aboutHints:['.stk-project-copy','.stk-about-copy','.stk-intro-copy'] },
    { slug:'logos', selector:'.lcg-modal', title:'LOGOS', aliases:['LOGOS'], chips:['IDENTITY','BRANDING','DEVELOPMENT'], kind:'project', aboutHints:['.lcg-project-copy','.lcg-about-copy','.lcg-intro-copy','.lcg-copy'] },
    { slug:'album-covers', selector:'.album-covers-modal', title:'ALBUM COVERS', aliases:['ALBUM COVERS'], chips:['COVER ART','GRAPHICS'], kind:'project', aboutHints:['.album-covers-project-copy','.album-covers-about-copy','.album-covers-intro-copy'] },
    { slug:'stay-ugly', selector:'.su-modal', title:'STAY UGLY', aliases:['STAY UGLY','STAYUGLY'], chips:['DEVELOPMENT','LOOKBOOK'], kind:'brand', aboutHints:['.su-brand-copy','.su-project-copy','.su-about-copy','.su-intro-copy','.su-copy'] },
    { slug:'anka-peresild', selector:'.anka-peresild-modal', title:'ANKA PERESILD', aliases:['ANKA PERESILD'], chips:['APPAREL','AI ILLUSTRATIONS','MOCKUPS'], kind:'brand', aboutHints:['.anka-peresild-brand-copy','.anka-peresild-about-copy','.anka-peresild-intro-copy','.anka-peresild-copy'] },
    { slug:'vtb-design-team', selector:'.vtb-modal', title:'VTB DESIGN TEAM', aliases:['VTB DESIGN TEAM'], chips:['MERCH','ACCESSORIES','PRINTS'], kind:'project', bg:'#ff0101', fg:'#050505', aboutHints:['.vtb-project-intro__text','.vtb-project-copy','.vtb-about-copy'], legacy:['.vtb-project-intro'] },
    { slug:'collages-photo-edit', selector:'.collages-modal', title:'COLLAGES PHOTO EDIT', aliases:['COLLAGES PHOTO EDIT','COLLAGES'], chips:['MY OWN EDITS'], kind:'project', aboutHints:['.collages-project-copy','.collages-about-copy','.collages-intro-copy','.pag-copy'] },
  ];

  const ALL_SELECTORS = PROJECTS.map(project => project.selector).join(',');
  const CLOSE_SELECTOR = [
    '.zny-close','.fable-close','.su-close','.vtb-close','.cr-close','.mc-close','.m10-close','.stk-close',
    '.pcg-close','.lcg-close','.pag-close','.blandetto-close','.bf-close','.bf-x','.bld-close',
    '.anka-peresild-close','.album-covers-close','.project9006-toolbar__close','.project9006-close','.p9006-close'
  ].join(',');
  const ABOUT_LABELS = new Set(['ABOUT THE BRAND','ABOUT THE PROJECT','О БРЕНДЕ','О ПРОЕКТЕ']);

  const norm = value => String(value || '').toUpperCase().replace(/Ё/g,'Е').replace(/\|/g,' ').replace(/[^A-ZА-Я0-9]+/g,' ').trim().replace(/\s+/g,' ');
  const language = () => document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  const textOf = node => String(node?.textContent || '').replace(/\s+/g,' ').trim();
  const hide = node => { if (node instanceof HTMLElement) node.classList.add('portfolio-stable-legacy-hidden'); };

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-stable-head{position:fixed!important;inset:0 0 auto 0!important;z-index:1900000!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:space-between!important;width:100vw!important;min-height:4rem!important;margin:0!important;padding:.72rem clamp(1rem,1.8vw,2rem)!important;border:0!important;border-bottom:1px solid var(--psh-border,rgba(5,5,5,.14))!important;background:var(--psh-bg,#fff)!important;color:var(--psh-fg,#050505)!important;transform:none!important;animation:none!important;transition:none!important}
      .portfolio-stable-head__label,.portfolio-stable-head__close{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:2.25rem!important;margin:0!important;padding:.68rem 1rem!important;border:0!important;border-radius:0!important;background:#050505!important;color:#fff!important;font:900 .68rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.24em!important;text-transform:uppercase!important;white-space:nowrap!important}
      .portfolio-stable-head__close{cursor:pointer!important}.portfolio-stable-head__close:hover{background:#a6ff00!important;color:#050505!important}
      .portfolio-stable-intro{position:relative!important;z-index:2!important;box-sizing:border-box!important;display:block!important;width:100vw!important;max-width:none!important;min-height:0!important;height:auto!important;margin:0 0 0 calc(50% - 50vw)!important;padding:clamp(5.8rem,7.5vw,7rem) clamp(1rem,3.2vw,4rem) clamp(2.5rem,3.8vw,3.5rem)!important;background:var(--psi-bg,#fff)!important;color:var(--psi-fg,#050505)!important;border:0!important;opacity:1!important;visibility:visible!important;transform:none!important;animation:none!important;transition:none!important}
      .portfolio-stable-intro__title{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;color:inherit!important;font:900 clamp(4.6rem,10.6vw,12rem)/.79 Arial,Helvetica,sans-serif!important;letter-spacing:-.075em!important;text-transform:uppercase!important}
      .portfolio-stable-intro__chips{display:flex!important;flex-wrap:wrap!important;gap:.55rem!important;margin:clamp(1.2rem,1.8vw,1.7rem) 0 0!important;padding:0!important}
      .portfolio-stable-intro__chip{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:2rem!important;margin:0!important;padding:.55rem .85rem!important;border:1px solid currentColor!important;background:transparent!important;color:inherit!important;font:900 .62rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;white-space:nowrap!important}
      .portfolio-stable-intro__about{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:clamp(1rem,1.6vw,1.5rem)!important;width:100%!important;max-width:none!important;margin:clamp(2rem,3vw,2.8rem) 0 0!important;padding:clamp(1rem,1.5vw,1.4rem) 0 0!important;border-top:1px solid currentColor!important}
      .portfolio-stable-intro__about.is-empty{display:none!important}
      .portfolio-stable-intro__about-label{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:max-content!important;max-width:100%!important;margin:0!important;padding:.6rem .8rem!important;background:#050505!important;color:#fff!important;font:900 .64rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.2em!important;text-align:left!important;text-transform:uppercase!important;white-space:nowrap!important}
      .portfolio-stable-intro__about-text{box-sizing:border-box!important;display:block!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;color:inherit!important;font:600 clamp(1.15rem,2vw,2rem)/1.28 Arial,Helvetica,sans-serif!important;letter-spacing:-.025em!important;text-align:left!important}
      .portfolio-stable-legacy-hidden{display:none!important;width:0!important;height:0!important;min-width:0!important;min-height:0!important;max-width:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;visibility:hidden!important}
      .portfolio-stable-copy{position:fixed!important;left:max(1rem,env(safe-area-inset-left))!important;bottom:max(1rem,env(safe-area-inset-bottom))!important;z-index:1900000!important;min-height:2.75rem!important;margin:0!important;padding:.75rem 1rem!important;border:1px solid #fff!important;background:#050505!important;color:#fff!important;font:900 .62rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;cursor:pointer!important}
      .portfolio-stable-copy:hover{background:#a6ff00!important;color:#050505!important;border-color:#050505!important}
      .zny-modal .zny-close,.fable-modal .fable-close,.cr-modal .cr-close,.blandetto-modal .blandetto-close,.blandetto-modal .bf-close,.blandetto-modal .bf-x,.bf .blandetto-close,.bf .bf-close,.bf .bf-x,.bf .bld-close,.project9006-modal .project9006-toolbar__close,.project9006-modal .project9006-close,.project9006-modal .p9006-close,.pcg-modal .pcg-close,.mc-modal .mc-close,.m10-modal .m10-close,.stk-modal .stk-close,.lcg-modal .lcg-close,.album-covers-modal .album-covers-close,.su-modal .su-close,.anka-peresild-modal .anka-peresild-close,.vtb-modal .vtb-close,.collages-modal .pag-close{display:none!important}
      ${ALL_SELECTORS}{animation:none!important;transition:none!important}
      @media(max-width:820px){.portfolio-stable-head{min-height:3.65rem!important;padding:.62rem .75rem!important}.portfolio-stable-head__label,.portfolio-stable-head__close{min-height:2.05rem!important;padding:.62rem .72rem!important;font-size:.58rem!important;letter-spacing:.18em!important}.portfolio-stable-intro{padding:5.4rem 1rem 2.5rem!important}.portfolio-stable-intro__title{font-size:clamp(3.25rem,16vw,6.2rem)!important;line-height:.82!important}.portfolio-stable-copy{display:none!important}}
    `;
    document.head.append(style);
  }

  function projectFor(modal) { return PROJECTS.find(project => modal.matches(project.selector)) || null; }

  function findClose(modal) {
    const explicit = [...modal.querySelectorAll(CLOSE_SELECTOR)].find(node => !node.closest('.portfolio-stable-head,.desktop-unified-lightbox'));
    if (explicit) return explicit;
    return [...modal.querySelectorAll('button,[role="button"]')].find(button => {
      if (button.closest('.portfolio-stable-head,.desktop-unified-lightbox')) return false;
      const text = norm([button.textContent,button.getAttribute('aria-label'),button.getAttribute('title')].filter(Boolean).join(' '));
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ' || text.includes('CLOSE PROJECT') || text.includes('ЗАКРЫТЬ ПРОЕКТ');
    }) || null;
  }

  function detectTheme(modal, project) {
    if (project.bg) return { bg:project.bg, fg:project.fg || '#050505' };
    for (const node of [modal, ...[...modal.children].slice(0,6)]) {
      if (!(node instanceof HTMLElement)) continue;
      const css = getComputedStyle(node);
      const bg = css.backgroundColor;
      if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)' || bg === 'rgb(255, 255, 255)') continue;
      const match = bg.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
      if (!match) continue;
      const lum = (Number(match[1])*299 + Number(match[2])*587 + Number(match[3])*114)/1000;
      return { bg, fg:lum < 142 ? '#fff' : '#050505' };
    }
    return { bg:'#fff', fg:'#050505' };
  }

  function firstMedia(modal) {
    return [...modal.querySelectorAll('img,video,picture,canvas')].find(node => !node.closest('.portfolio-stable-head,.portfolio-stable-intro,.desktop-unified-lightbox')) || null;
  }

  function beforeMedia(node, media) {
    return !media || Boolean(node.compareDocumentPosition(media) & Node.DOCUMENT_POSITION_FOLLOWING);
  }

  function candidateAboutNodes(modal, project) {
    const nodes = [];
    for (const selector of project.aboutHints || []) modal.querySelectorAll(selector).forEach(node => nodes.push(node));
    modal.querySelectorAll('p,[class*="brand-copy"],[class*="about-copy"],[class*="intro-copy"],[class*="project-copy"],[class*="description"],[class*="lead-copy"],[class*="summary-copy"]').forEach(node => nodes.push(node));
    return [...new Set(nodes)];
  }

  function findAbout(modal, project) {
    const media = firstMedia(modal);
    for (const node of candidateAboutNodes(modal,project)) {
      if (!(node instanceof HTMLElement)) continue;
      if (node.closest('.portfolio-stable-head,.portfolio-stable-intro,.desktop-unified-lightbox,.portfolio-stable-legacy-hidden')) continue;
      if (node.querySelector('img,video,picture,canvas')) continue;
      const text = textOf(node);
      if (text.length < 55 || text.length > 2400) continue;
      const strongHint = /(brand|about|intro|lead|summary)/i.test(String(node.className || '')) || (project.aboutHints || []).some(selector => node.matches?.(selector));
      if (!strongHint && !beforeMedia(node,media)) continue;
      return { node, text };
    }
    return { node:null, text:'' };
  }

  function legacyWrapper(node, modal) {
    if (!(node instanceof HTMLElement)) return null;
    const wrapper = node.closest('[class*="brand"],[class*="intro"],[class*="hero"],[class*="overview"],[class*="summary"],[class*="lead"],section');
    if (!wrapper || wrapper === modal || wrapper.querySelector('img,video,picture,canvas')) return null;
    return wrapper;
  }

  function collapseLegacy(modal, project, nativeClose, aboutNode) {
    const media = firstMedia(modal);
    const aliases = new Set((project.aliases || [project.title]).map(norm));
    const accepted = new Set([project.title,...(project.aliases || []),...project.chips].map(norm));

    const originalHead = nativeClose?.closest('header,[class*="head"],[class*="toolbar"],[class*="topbar"],[class*="top-bar"],.sticky,.bf-h');
    if (originalHead && originalHead !== modal) hide(originalHead);

    for (const selector of project.legacy || []) {
      modal.querySelectorAll(selector).forEach(node => {
        if (node.closest('.portfolio-stable-head,.portfolio-stable-intro')) return;
        if (beforeMedia(node,media)) hide(node);
      });
    }

    if (aboutNode) {
      const wrapper = legacyWrapper(aboutNode,modal);
      if (wrapper && beforeMedia(wrapper,media)) hide(wrapper);
      else if (beforeMedia(aboutNode,media)) hide(aboutNode);
    }

    modal.querySelectorAll('h1,h2,h3,h4,[class*="brand-title"],[class*="project-title"]').forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      if (node.closest('.portfolio-stable-head,.portfolio-stable-intro,.desktop-project-navigation,.desktop-unified-lightbox,.portfolio-stable-legacy-hidden')) return;
      if (!beforeMedia(node,media) || !aliases.has(norm(node.textContent))) return;
      const wrapper = legacyWrapper(node,modal);
      if (wrapper && beforeMedia(wrapper,media)) hide(wrapper); else hide(node);
    });

    modal.querySelectorAll('section,div,nav,ul').forEach(node => {
      if (!(node instanceof HTMLElement) || node === modal || node.classList.contains('portfolio-stable-legacy-hidden')) return;
      if (node.closest('.portfolio-stable-head,.portfolio-stable-intro,.desktop-project-navigation,.desktop-unified-lightbox')) return;
      if (!beforeMedia(node,media) || node.querySelector('img,video,picture,canvas')) return;
      const cls = String(node.className || '');
      const direct = [...node.children].map(child => norm(child.textContent)).filter(Boolean);
      const chipMatches = direct.filter(value => accepted.has(value)).length;
      const hasAbout = [...node.querySelectorAll('p,span,h1,h2,h3,h4')].some(child => ABOUT_LABELS.has(norm(child.textContent)));
      const hasIdentity = [...node.querySelectorAll('h1,h2,h3,h4')].some(child => aliases.has(norm(child.textContent)));
      const topish = /(intro|hero|brand|overview|summary|chip|tag|categor|meta|lead)/i.test(cls);
      if (hasIdentity || hasAbout || (chipMatches >= 2 && topish)) hide(node);
    });

    modal.querySelectorAll('p,span,h1,h2,h3,h4').forEach(node => {
      if (node.closest('.portfolio-stable-head,.portfolio-stable-intro,.desktop-project-navigation,.desktop-unified-lightbox,.portfolio-stable-legacy-hidden')) return;
      if (beforeMedia(node,media) && ABOUT_LABELS.has(norm(node.textContent))) hide(node);
    });
  }

  function createHead(modal, project, nativeClose, theme) {
    let head = modal.querySelector(':scope > .portfolio-stable-head');
    if (!head) {
      head = document.createElement('div');
      head.className = 'portfolio-stable-head';
      const label = document.createElement('span');
      label.className = 'portfolio-stable-head__label';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'portfolio-stable-head__close';
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const target = findClose(modal);
        if (target) target.click();
      });
      head.append(label,button);
      modal.prepend(head);
    }
    head.style.setProperty('--psh-bg',theme.bg);
    head.style.setProperty('--psh-fg',theme.fg);
    head.style.setProperty('--psh-border',theme.fg === '#fff' ? 'rgba(255,255,255,.28)' : 'rgba(5,5,5,.14)');
    head.querySelector('.portfolio-stable-head__label').textContent = project.title;
    head.querySelector('.portfolio-stable-head__close').textContent = language() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    return head;
  }

  function createIntro(modal, project, head, theme) {
    let intro = modal.querySelector(':scope > .portfolio-stable-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.className = 'portfolio-stable-intro';
      intro.innerHTML = '<h1 class="portfolio-stable-intro__title"></h1><div class="portfolio-stable-intro__chips"></div><div class="portfolio-stable-intro__about"><p class="portfolio-stable-intro__about-label"></p><p class="portfolio-stable-intro__about-text"></p></div>';
      head.after(intro);
    }
    intro.style.setProperty('--psi-bg',theme.bg);
    intro.style.setProperty('--psi-fg',theme.fg);
    intro.querySelector('.portfolio-stable-intro__title').textContent = project.title;
    const chips = intro.querySelector('.portfolio-stable-intro__chips');
    if (!chips.childElementCount) {
      chips.replaceChildren(...project.chips.map(text => {
        const chip = document.createElement('span');
        chip.className = 'portfolio-stable-intro__chip';
        chip.textContent = text;
        return chip;
      }));
    }
    intro.querySelector('.portfolio-stable-intro__about-label').textContent = project.kind === 'brand'
      ? (language()==='ru' ? 'О БРЕНДЕ' : 'ABOUT THE BRAND')
      : (language()==='ru' ? 'О ПРОЕКТЕ' : 'ABOUT THE PROJECT');
    return intro;
  }

  function syncAbout(intro, about) {
    if (!intro) return;
    const textNode = intro.querySelector('.portfolio-stable-intro__about-text');
    const aboutBox = intro.querySelector('.portfolio-stable-intro__about');
    if (!textNode || !aboutBox) return;
    if (!textNode.dataset.locked && about?.text) {
      textNode.textContent = about.text;
      textNode.dataset.locked = '1';
    }
    aboutBox.classList.toggle('is-empty',!textOf(textNode));
  }

  function syncCopy(project) {
    let button = document.querySelector('.portfolio-stable-copy');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'portfolio-stable-copy';
      document.body.append(button);
    }
    button.dataset.project = project.slug;
    button.textContent = language()==='ru' ? 'СКОПИРОВАТЬ ССЫЛКУ' : 'COPY PROJECT LINK';
    button.onclick = async () => {
      const url = new URL(location.href);
      url.searchParams.set('project',project.slug);
      url.searchParams.delete('section');
      url.hash = '';
      try {
        await navigator.clipboard.writeText(url.href);
        button.textContent = language()==='ru' ? 'ССЫЛКА СКОПИРОВАНА' : 'LINK COPIED';
        setTimeout(() => { if (button.isConnected) button.textContent = language()==='ru' ? 'СКОПИРОВАТЬ ССЫЛКУ' : 'COPY PROJECT LINK'; },1200);
      } catch {}
    };
  }

  function processModal(modal) {
    if (!(modal instanceof HTMLElement)) return false;
    const project = projectFor(modal);
    if (!project || modal.children.length === 0) return false;
    const nativeClose = findClose(modal);
    if (!nativeClose) return false;

    const theme = detectTheme(modal,project);
    const head = createHead(modal,project,nativeClose,theme);
    const intro = createIntro(modal,project,head,theme);
    const about = findAbout(modal,project);
    syncAbout(intro,about);
    collapseLegacy(modal,project,nativeClose,about.node);

    modal.dataset.portfolioStableShell = VERSION;
    modal.style.setProperty('animation','none','important');
    modal.style.setProperty('transition','none','important');
    if (!modal.dataset.portfolioStableScrollReset) {
      modal.dataset.portfolioStableScrollReset = '1';
      try { modal.scrollTop = 0; } catch {}
    }
    syncCopy(project);
    return true;
  }

  function processAll() {
    PROJECTS.forEach(project => document.querySelectorAll(project.selector).forEach(processModal));
  }

  const observer = new MutationObserver(records => {
    const candidates = new Set();
    for (const record of records) {
      for (const added of record.addedNodes) {
        if (!(added instanceof Element)) continue;
        if (added.matches?.(ALL_SELECTORS)) candidates.add(added);
        const parentModal = added.closest?.(ALL_SELECTORS);
        if (parentModal) candidates.add(parentModal);
        added.querySelectorAll?.(ALL_SELECTORS).forEach(modal => candidates.add(modal));
      }
    }
    candidates.forEach(processModal);
    if (!document.querySelector(ALL_SELECTORS)) document.querySelector('.portfolio-stable-copy')?.remove();
  });
  observer.observe(document.body,{childList:true,subtree:true});

  new MutationObserver(() => {
    document.querySelectorAll(ALL_SELECTORS).forEach(modal => {
      const project = projectFor(modal);
      const head = modal.querySelector(':scope > .portfolio-stable-head');
      const intro = modal.querySelector(':scope > .portfolio-stable-intro');
      if (head) head.querySelector('.portfolio-stable-head__close').textContent = language()==='ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
      if (intro && project) intro.querySelector('.portfolio-stable-intro__about-label').textContent = project.kind === 'brand'
        ? (language()==='ru' ? 'О БРЕНДЕ' : 'ABOUT THE BRAND')
        : (language()==='ru' ? 'О ПРОЕКТЕ' : 'ABOUT THE PROJECT');
    });
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  installStyles();
  processAll();
})();