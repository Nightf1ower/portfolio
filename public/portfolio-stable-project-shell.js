(() => {
  if (window.__portfolioStableProjectShellV1) return;
  window.__portfolioStableProjectShellV1 = true;

  const VERSION = 'portfolio-stable-project-shell-1';
  const STYLE_ID = 'portfolio-stable-project-shell-style';
  const PROJECTS = [
    { slug:'zny', selector:'.zny-modal', title:'ZNY', chips:['GRAPHIC DESIGN','PRINTS','CAMPAIGN','STICKERS'], kind:'brand' },
    { slug:'fable', selector:'.fable-modal', title:'F | ABLE', chips:['LOGOS','GRAPHICS','APPAREL'], kind:'brand' },
    { slug:'pink-punk', selector:'.pink-punk-fullscreen', title:'PINK PUNK', chips:['GRAPHICS','POSTERS','PRINTS'], kind:'brand', bg:'#9b0014', fg:'#fff' },
    { slug:'carnival-records', selector:'.cr-modal', title:'CARNIVAL RECORDS', chips:['ALBUM COVERS','GRAPHICS','MERCH'], kind:'brand' },
    { slug:'blandetto', selector:'.blandetto-modal,.bf', title:'BLANDETTO', chips:['LOGOS','GRAPHICS','ACCESSORIES'], kind:'brand' },
    { slug:'ninety-z-s', selector:'.project9006-modal', title:'NINETY Z S', chips:['IDENTITY','PENDANT','LOOKBOOK','POSTERS'], kind:'brand', bg:'#050505', fg:'#fff' },
    { slug:'posters', selector:'.pcg-modal', title:'POSTERS', chips:['INFOGRAPHICS','PROJECTS','PARTIES'], kind:'project', bg:'#2C3D55', fg:'#fff' },
    { slug:'merch', selector:'.mc-modal,.m10-modal', title:'MERCH', chips:['POSTERS','PRINTS','AI ILLUSTRATIONS'], kind:'project', bg:'#87CEEB', fg:'#050505' },
    { slug:'stickers', selector:'.stk-modal', title:'STICKERS', chips:['MNU','NIGHTFLOWER'], kind:'project' },
    { slug:'logos', selector:'.lcg-modal', title:'LOGOS', chips:['IDENTITY','BRANDING','DEVELOPMENT'], kind:'project' },
    { slug:'album-covers', selector:'.album-covers-modal', title:'ALBUM COVERS', chips:['COVER ART','GRAPHICS'], kind:'project' },
    { slug:'stay-ugly', selector:'.su-modal', title:'STAY UGLY', chips:['DEVELOPMENT','LOOKBOOK'], kind:'brand' },
    { slug:'anka-peresild', selector:'.anka-peresild-modal', title:'ANKA PERESILD', chips:['APPAREL','AI ILLUSTRATIONS','MOCKUPS'], kind:'brand' },
    { slug:'vtb-design-team', selector:'.vtb-modal', title:'VTB DESIGN TEAM', chips:['MERCH','ACCESSORIES','PRINTS'], kind:'project', bg:'#ff0101', fg:'#050505' },
    { slug:'collages-photo-edit', selector:'.collages-modal', title:'COLLAGES PHOTO EDIT', chips:['MY OWN EDITS'], kind:'project' },
  ];

  const ALL_SELECTORS = PROJECTS.map(p => p.selector).join(',');
  const CLOSE_SELECTOR = [
    '.zny-close','.fable-close','.su-close','.vtb-close','.cr-close','.mc-close','.stk-close',
    '.pcg-close','.lcg-close','.pag-close','.blandetto-close','.bf-close','.bf-x',
    '.anka-peresild-close','.album-covers-close','.project9006-toolbar__close','.project9006-close','.p9006-close',
    '.pink-punk-fullscreen button'
  ].join(',');

  const norm = value => String(value || '').toUpperCase().replace(/Ё/g,'Е').replace(/\|/g,' ').replace(/[^A-ZА-Я0-9]+/g,' ').trim().replace(/\s+/g,' ');
  const language = () => document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  const isVisible = node => node instanceof HTMLElement && node.isConnected && getComputedStyle(node).display !== 'none' && getComputedStyle(node).visibility !== 'hidden';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .portfolio-stable-head{position:fixed!important;inset:0 0 auto 0!important;z-index:1900000!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:space-between!important;width:100vw!important;min-height:4rem!important;margin:0!important;padding:.72rem clamp(1rem,1.8vw,2rem)!important;border:0!important;border-bottom:1px solid rgba(5,5,5,.12)!important;background:#fff!important;color:#050505!important;transform:none!important;animation:none!important;transition:none!important}
      .portfolio-stable-head__label,.portfolio-stable-head__close{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:2.25rem!important;margin:0!important;padding:.68rem 1rem!important;border:0!important;border-radius:0!important;background:#050505!important;color:#fff!important;font:900 .68rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.24em!important;text-transform:uppercase!important;white-space:nowrap!important}
      .portfolio-stable-head__close{cursor:pointer!important}
      .portfolio-stable-head__close:hover{background:#a6ff00!important;color:#050505!important}
      .portfolio-stable-intro{position:relative!important;z-index:2!important;box-sizing:border-box!important;display:block!important;width:100vw!important;max-width:none!important;min-height:0!important;height:auto!important;margin:0 0 0 calc(50% - 50vw)!important;padding:clamp(5.8rem,7.5vw,7rem) clamp(1rem,3.2vw,4rem) clamp(2.5rem,3.8vw,3.5rem)!important;background:var(--psi-bg,#fff)!important;color:var(--psi-fg,#050505)!important;border:0!important;opacity:1!important;visibility:visible!important;transform:none!important;animation:none!important;transition:none!important}
      .portfolio-stable-intro__title{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;color:inherit!important;font:900 clamp(4.6rem,10.6vw,12rem)/.79 Arial,Helvetica,sans-serif!important;letter-spacing:-.075em!important;text-transform:uppercase!important;text-wrap:balance!important}
      .portfolio-stable-intro__chips{display:flex!important;flex-wrap:wrap!important;gap:.55rem!important;margin:clamp(1.2rem,1.8vw,1.7rem) 0 0!important;padding:0!important}
      .portfolio-stable-intro__chip{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:2rem!important;margin:0!important;padding:.55rem .85rem!important;border:1px solid currentColor!important;background:transparent!important;color:inherit!important;font:900 .62rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;white-space:nowrap!important}
      .portfolio-stable-intro__about{display:grid!important;grid-template-columns:minmax(10rem,.28fr) minmax(0,1fr)!important;gap:clamp(2rem,5vw,6rem)!important;width:100%!important;margin:clamp(2rem,3vw,2.8rem) 0 0!important;padding:clamp(1rem,1.5vw,1.4rem) 0 0!important;border-top:1px solid currentColor!important}
      .portfolio-stable-intro__about.is-empty{display:none!important}
      .portfolio-stable-intro__about-label{width:max-content!important;max-width:100%!important;margin:0!important;padding:.6rem .8rem!important;background:#050505!important;color:#fff!important;font:900 .64rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important;align-self:start!important}
      .portfolio-stable-intro__about-text{max-width:70rem!important;margin:0!important;padding:0!important;color:inherit!important;font:600 clamp(1.15rem,2vw,2rem)/1.28 Arial,Helvetica,sans-serif!important;letter-spacing:-.025em!important;text-wrap:pretty!important}
      .portfolio-stable-legacy-hidden{display:none!important;width:0!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;visibility:hidden!important}
      .portfolio-stable-copy{position:fixed!important;left:max(1rem,env(safe-area-inset-left))!important;bottom:max(1rem,env(safe-area-inset-bottom))!important;z-index:1900000!important;min-height:2.75rem!important;margin:0!important;padding:.75rem 1rem!important;border:1px solid #fff!important;background:#050505!important;color:#fff!important;font:900 .62rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;cursor:pointer!important}
      .portfolio-stable-copy:hover{background:#a6ff00!important;color:#050505!important;border-color:#050505!important}
      ${ALL_SELECTORS}{animation:none!important;transition:none!important}
      @media(max-width:820px){.portfolio-stable-head{min-height:3.65rem!important;padding:.62rem .75rem!important}.portfolio-stable-head__label,.portfolio-stable-head__close{min-height:2.05rem!important;padding:.62rem .72rem!important;font-size:.58rem!important;letter-spacing:.18em!important}.portfolio-stable-intro{padding:5.4rem 1rem 2.5rem!important}.portfolio-stable-intro__title{font-size:clamp(3.25rem,16vw,6.2rem)!important;line-height:.82!important}.portfolio-stable-intro__about{grid-template-columns:1fr!important;gap:1.25rem!important}.portfolio-stable-copy{display:none!important}}
    `;
    document.head.append(style);
  }

  function projectFor(modal) { return PROJECTS.find(project => modal.matches(project.selector)) || null; }

  function findClose(modal) {
    const explicit = [...modal.querySelectorAll(CLOSE_SELECTOR)].find(node => !node.closest('.portfolio-stable-head') && isVisible(node));
    if (explicit) return explicit;
    return [...modal.querySelectorAll('button,[role="button"]')].find(button => {
      if (button.closest('.portfolio-stable-head,.desktop-unified-lightbox')) return false;
      const text = norm([button.textContent,button.getAttribute('aria-label'),button.getAttribute('title')].filter(Boolean).join(' '));
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ' || text.includes('CLOSE PROJECT') || text.includes('ЗАКРЫТЬ ПРОЕКТ');
    }) || null;
  }

  function detectTheme(modal, project) {
    if (project.bg) return { bg:project.bg, fg:project.fg || '#050505' };
    const nodes = [modal, ...[...modal.children].slice(0,5)];
    for (const node of nodes) {
      if (!(node instanceof HTMLElement)) continue;
      const css = getComputedStyle(node);
      const bg = css.backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(255, 255, 255)') {
        const m = bg.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
        if (m) {
          const lum = (Number(m[1])*299 + Number(m[2])*587 + Number(m[3])*114)/1000;
          return { bg, fg: lum < 142 ? '#fff' : '#050505' };
        }
      }
    }
    return { bg:'#fff', fg:'#050505' };
  }

  function firstAboutText(modal) {
    const candidates = [...modal.querySelectorAll('p')].filter(node => {
      if (node.closest('.portfolio-stable-head,.portfolio-stable-intro,.desktop-unified-lightbox')) return false;
      if (node.querySelector('img,video,picture,canvas')) return false;
      const text = String(node.textContent || '').replace(/\s+/g,' ').trim();
      return text.length >= 70 && text.length <= 2200;
    });
    return candidates[0] ? String(candidates[0].textContent || '').replace(/\s+/g,' ').trim() : '';
  }

  function collapseLegacy(modal, project, close) {
    const accepted = new Set([project.title, ...project.chips].map(norm));
    const aboutLabels = new Set(['ABOUT THE BRAND','ABOUT THE PROJECT','О БРЕНДЕ','О ПРОЕКТЕ']);
    const originalHead = close?.closest('header,[class*="head"],[class*="toolbar"],[class*="topbar"],[class*="top-bar"],.sticky');
    if (originalHead && originalHead !== modal) originalHead.classList.add('portfolio-stable-legacy-hidden');

    const firstMedia = [...modal.querySelectorAll('img,video,picture,canvas')].find(node => !node.closest('.portfolio-stable-intro,.portfolio-stable-head,.desktop-unified-lightbox')) || null;
    const beforeMedia = node => !firstMedia || Boolean(node.compareDocumentPosition(firstMedia) & Node.DOCUMENT_POSITION_FOLLOWING);

    [...modal.querySelectorAll('section,div,nav,ul')].forEach(node => {
      if (!(node instanceof HTMLElement) || node === modal) return;
      if (node.closest('.portfolio-stable-head,.portfolio-stable-intro,.desktop-project-navigation,.desktop-unified-lightbox')) return;
      if (!beforeMedia(node) || node.querySelector('img,video,picture,canvas')) return;
      const cls = String(node.className || '');
      const text = norm(node.textContent);
      const headings = [...node.querySelectorAll('h1,h2,h3,h4')].map(h => norm(h.textContent));
      const hasIdentity = headings.includes(norm(project.title));
      const hasAbout = [...node.querySelectorAll('p,span,h1,h2,h3,h4')].some(child => aboutLabels.has(norm(child.textContent)));
      const direct = [...node.children].map(child => norm(child.textContent)).filter(Boolean);
      const chipMatches = direct.filter(value => accepted.has(value)).length;
      const topish = /(intro|hero|brand|overview|summary|chip|tag|categor|meta)/i.test(cls);
      if (hasIdentity || hasAbout || (topish && chipMatches >= 2)) node.classList.add('portfolio-stable-legacy-hidden');
    });
  }

  function createHead(modal, project, close) {
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
        event.preventDefault(); event.stopPropagation();
        const live = findClose(modal);
        if (live) live.click();
      });
      head.append(label,button);
      modal.prepend(head);
    }
    head.querySelector('.portfolio-stable-head__label').textContent = project.title;
    head.querySelector('.portfolio-stable-head__close').textContent = language() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    return head;
  }

  function createIntro(modal, project, head, aboutText) {
    let intro = modal.querySelector(':scope > .portfolio-stable-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.className = 'portfolio-stable-intro';
      intro.innerHTML = '<h1 class="portfolio-stable-intro__title"></h1><div class="portfolio-stable-intro__chips"></div><div class="portfolio-stable-intro__about"><p class="portfolio-stable-intro__about-label"></p><p class="portfolio-stable-intro__about-text"></p></div>';
      head.after(intro);
    }
    const theme = detectTheme(modal,project);
    intro.style.setProperty('--psi-bg',theme.bg);
    intro.style.setProperty('--psi-fg',theme.fg);
    intro.querySelector('.portfolio-stable-intro__title').textContent = project.title;
    const chips = intro.querySelector('.portfolio-stable-intro__chips');
    chips.replaceChildren(...project.chips.map(text => { const span=document.createElement('span'); span.className='portfolio-stable-intro__chip'; span.textContent=text; return span; }));
    intro.querySelector('.portfolio-stable-intro__about-label').textContent = project.kind === 'brand' ? (language()==='ru'?'О БРЕНДЕ':'ABOUT THE BRAND') : (language()==='ru'?'О ПРОЕКТЕ':'ABOUT THE PROJECT');
    intro.querySelector('.portfolio-stable-intro__about-text').textContent = aboutText;
    intro.querySelector('.portfolio-stable-intro__about').classList.toggle('is-empty',!aboutText);
    return intro;
  }

  function syncCopy(modal, project) {
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
      const url = new URL(location.href); url.searchParams.set('project',project.slug); url.searchParams.delete('section'); url.hash='';
      try { await navigator.clipboard.writeText(url.href); button.textContent = language()==='ru' ? 'ССЫЛКА СКОПИРОВАНА' : 'LINK COPIED'; }
      catch { return; }
      setTimeout(() => { if (button.isConnected) button.textContent = language()==='ru' ? 'СКОПИРОВАТЬ ССЫЛКУ' : 'COPY PROJECT LINK'; },1200);
    };
  }

  function processModal(modal) {
    if (!(modal instanceof HTMLElement) || modal.dataset.portfolioStableShell === VERSION || !isVisible(modal)) return;
    const project = projectFor(modal);
    if (!project) return;
    const close = findClose(modal);
    const aboutText = firstAboutText(modal);
    const head = createHead(modal,project,close);
    createIntro(modal,project,head,aboutText);
    collapseLegacy(modal,project,close);
    modal.dataset.portfolioStableShell = VERSION;
    modal.style.setProperty('animation','none','important');
    modal.style.setProperty('transition','none','important');
    try { modal.scrollTop = 0; } catch {}
    syncCopy(modal,project);
  }

  function processAll() { PROJECTS.forEach(project => document.querySelectorAll(project.selector).forEach(processModal)); }

  function scheduleModal(modal) {
    if (!(modal instanceof HTMLElement) || modal.dataset.portfolioStableQueued === VERSION) return;
    modal.dataset.portfolioStableQueued = VERSION;
    requestAnimationFrame(() => requestAnimationFrame(() => processModal(modal)));
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      for (const added of record.addedNodes) {
        if (!(added instanceof Element)) continue;
        if (added.matches?.(ALL_SELECTORS)) scheduleModal(added);
        added.querySelectorAll?.(ALL_SELECTORS).forEach(scheduleModal);
      }
    }
    if (!document.querySelector(ALL_SELECTORS)) document.querySelector('.portfolio-stable-copy')?.remove();
  });
  observer.observe(document.body,{childList:true,subtree:true});

  new MutationObserver(() => {
    document.querySelectorAll(ALL_SELECTORS).forEach(modal => {
      const project = projectFor(modal); if (!project) return;
      const head = modal.querySelector(':scope > .portfolio-stable-head');
      const intro = modal.querySelector(':scope > .portfolio-stable-intro');
      if (head) head.querySelector('.portfolio-stable-head__close').textContent = language()==='ru'?'ЗАКРЫТЬ':'CLOSE';
      if (intro) intro.querySelector('.portfolio-stable-intro__about-label').textContent = project.kind==='brand' ? (language()==='ru'?'О БРЕНДЕ':'ABOUT THE BRAND') : (language()==='ru'?'О ПРОЕКТЕ':'ABOUT THE PROJECT');
    });
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  installStyles();
  window.addEventListener('load',processAll,{once:true});
  processAll();
})();