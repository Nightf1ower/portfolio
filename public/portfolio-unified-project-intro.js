(() => {
  if (window.__portfolioUnifiedProjectIntroV1) return;
  window.__portfolioUnifiedProjectIntroV1 = true;

  const VERSION = 'portfolio-unified-project-intro-1';
  const STYLE_ID = 'portfolio-unified-project-intro-style';

  const PROJECTS = [
    { slug:'zny', selector:'.zny-modal', title:'ZNY', aliases:['ZNY'], chips:['GRAPHIC DESIGN','PRINTS','CAMPAIGN','STICKERS'], kind:'brand' },
    { slug:'fable', selector:'.fable-modal', title:'F | ABLE', aliases:['F | ABLE','FABLE','F ABLE'], chips:['LOGOS','GRAPHICS','APPAREL'], kind:'brand' },
    { slug:'pink-punk', selector:'.pink-punk-fullscreen', title:'PINK PUNK', aliases:['PINK PUNK'], chips:['GRAPHICS','POSTERS','PRINTS'], kind:'brand' },
    { slug:'carnival-records', selector:'.cr-modal', title:'CARNIVAL RECORDS', aliases:['CARNIVAL RECORDS'], chips:['ALBUM COVERS','GRAPHICS','MERCH'], kind:'brand' },
    { slug:'blandetto', selector:'.blandetto-modal,.bf', title:'BLANDETTO', aliases:['BLANDETTO'], chips:['LOGOS','GRAPHICS','ACCESSORIES'], kind:'brand' },
    { slug:'ninety-z-s', selector:'.project9006-modal', title:'NINETY Z S', aliases:['NINETY Z S','90.06','90 06'], chips:['IDENTITY','PENDANT','LOOKBOOK','POSTERS'], kind:'brand' },
    { slug:'posters', selector:'.pcg-modal', title:'POSTERS', aliases:['POSTERS'], chips:['INFOGRAPHICS','PROJECTS','PARTIES'], kind:'project' },
    { slug:'merch', selector:'.mc-modal,.m10-modal', title:'MERCH', aliases:['MERCH'], chips:['POSTERS','PRINTS','AI ILLUSTRATIONS'], kind:'project' },
    { slug:'stickers', selector:'.stk-modal', title:'STICKERS', aliases:['STICKERS'], chips:['MNU','NIGHTFLOWER'], kind:'project' },
    { slug:'logos', selector:'.lcg-modal', title:'LOGOS', aliases:['LOGOS','ЛОГОТИПЫ'], chips:['IDENTITY','BRANDING','DEVELOPMENT'], kind:'project' },
    { slug:'album-covers', selector:'.album-covers-modal', title:'ALBUM COVERS', aliases:['ALBUM COVERS'], chips:['COVER ART','GRAPHICS'], kind:'project' },
    { slug:'stay-ugly', selector:'.su-modal', title:'STAY UGLY', aliases:['STAY UGLY','STAYUGLY'], chips:['DEVELOPMENT','LOOKBOOK'], kind:'brand' },
    { slug:'anka-peresild', selector:'.anka-peresild-modal', title:'ANKA PERESILD', aliases:['ANKA PERESILD'], chips:['APPAREL','AI ILLUSTRATIONS','MOCKUPS'], kind:'brand' },
    { slug:'vtb-design-team', selector:'.vtb-modal', title:'VTB DESIGN TEAM', aliases:['VTB DESIGN TEAM'], chips:['MERCH','ACCESSORIES','PRINTS'], kind:'project' },
    { slug:'collages-photo-edit', selector:'.collages-modal', title:'COLLAGES PHOTO EDIT', aliases:['COLLAGES PHOTO EDIT','COLLAGES'], chips:['MY OWN EDITS'], kind:'project' },
  ];

  const CLOSE_CLASSES = [
    '.zny-close','.fable-close','.su-close','.vtb-close','.cr-close','.mc-close','.stk-close',
    '.pcg-close','.lcg-close','.pag-close','.blandetto-close','.bf-close','.bf-x',
    '.anka-peresild-close','.album-covers-close','.project9006-toolbar__close','.project9006-close','.p9006-close'
  ].join(',');

  const preferredCopySelectors = [
    '.fable-brand-copy','.zny-brand-copy','.bf-brand-copy','.project9006-brand-copy',
    '.vtb-project-intro__text','.stk-project-copy','.su-copy','.pcg-intro','.mc-hero .mc-copy',
    '.cr-hero p','.album-covers-description p','.album-covers-description',
    '.anka-peresild-brand-copy','.anka-peresild-copy','.collages-copy',
    '[class*="brand-copy"]','[class*="about-copy"]','[class*="project-intro__text"]','[class*="intro-copy"]'
  ];

  const norm = value => String(value || '')
    .toUpperCase().replace(/Ё/g,'Е').replace(/\|/g,' ')
    .replace(/[^A-ZА-Я0-9]+/g,' ').trim().replace(/\s+/g,' ');

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function copy(project) {
    const ru = language() === 'ru';
    return {
      close: ru ? 'ЗАКРЫТЬ' : 'CLOSE',
      about: project.kind === 'brand'
        ? (ru ? 'О БРЕНДЕ' : 'ABOUT THE BRAND')
        : (ru ? 'О ПРОЕКТЕ' : 'ABOUT THE PROJECT'),
    };
  }

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-standard-original-head{display:none!important}
      .portfolio-fixed-project-head-spacer.portfolio-standard-remove-spacer{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important}

      .portfolio-standard-head{
        position:fixed!important;inset:0 0 auto 0!important;z-index:1900000!important;
        box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:space-between!important;
        width:100vw!important;min-height:4rem!important;margin:0!important;padding:.72rem clamp(1rem,1.8vw,2rem)!important;
        border:0!important;border-bottom:1px solid rgba(5,5,5,.12)!important;
        background:#fff!important;color:#050505!important;transform:none!important;animation:none!important;transition:none!important;
      }
      .portfolio-standard-head__label,.portfolio-standard-head__close{
        box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;
        min-height:2.25rem!important;margin:0!important;padding:.68rem 1rem!important;border:0!important;border-radius:0!important;
        background:#050505!important;color:#fff!important;font:900 .68rem/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.24em!important;text-transform:uppercase!important;white-space:nowrap!important;
      }
      .portfolio-standard-head__close{cursor:pointer!important}
      .portfolio-standard-head__close:hover{background:#a6ff00!important;color:#050505!important}

      .portfolio-standard-intro{
        box-sizing:border-box!important;width:100vw!important;max-width:none!important;margin:0 0 0 calc(50% - 50vw)!important;
        padding:clamp(7rem,10vw,10rem) clamp(1rem,3.2vw,4rem) clamp(4.5rem,7vw,7rem)!important;
        background:#fff!important;color:#050505!important;border:0!important;
      }
      .portfolio-standard-intro__inner{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important}
      .portfolio-standard-intro__title{
        width:100%!important;max-width:none!important;margin:0!important;padding:0!important;
        color:#050505!important;font:900 clamp(4.6rem,10.6vw,12rem)/.79 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.075em!important;text-transform:uppercase!important;text-wrap:balance!important;
      }
      .portfolio-standard-intro__chips{display:flex!important;flex-wrap:wrap!important;gap:.55rem!important;margin:clamp(1.75rem,3vw,2.6rem) 0 0!important;padding:0!important}
      .portfolio-standard-intro__chip{
        display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:2rem!important;
        margin:0!important;padding:.55rem .85rem!important;border:1px solid #050505!important;background:#fff!important;color:#050505!important;
        font:900 .62rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;white-space:nowrap!important;
      }
      .portfolio-standard-intro__about{
        display:grid!important;grid-template-columns:minmax(10rem,.28fr) minmax(0,1fr)!important;gap:clamp(2rem,5vw,6rem)!important;
        width:100%!important;margin:clamp(3.5rem,6vw,6rem) 0 0!important;padding:clamp(1.5rem,2.4vw,2.25rem) 0 0!important;
        border-top:1px solid #050505!important;
      }
      .portfolio-standard-intro__about-label{
        width:max-content!important;max-width:100%!important;margin:0!important;padding:.6rem .8rem!important;background:#050505!important;color:#fff!important;
        font:900 .64rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important;align-self:start!important;
      }
      .portfolio-standard-intro__about-text{
        max-width:70rem!important;margin:0!important;padding:0!important;color:#050505!important;
        font:600 clamp(1.15rem,2vw,2rem)/1.28 Arial,Helvetica,sans-serif!important;letter-spacing:-.025em!important;text-wrap:pretty!important;
      }
      .portfolio-standard-intro__about.is-empty{display:none!important}
      .portfolio-standard-source-hidden{display:none!important}

      @media(max-width:820px){
        .portfolio-standard-head{min-height:3.65rem!important;padding:.62rem .75rem!important}
        .portfolio-standard-head__label,.portfolio-standard-head__close{min-height:2.05rem!important;padding:.62rem .72rem!important;font-size:.58rem!important;letter-spacing:.18em!important}
        .portfolio-standard-intro{padding:clamp(6rem,22vw,7.5rem) 1rem clamp(3.5rem,14vw,5rem)!important}
        .portfolio-standard-intro__title{font-size:clamp(3.25rem,16vw,6.2rem)!important;line-height:.82!important}
        .portfolio-standard-intro__chips{gap:.45rem!important;margin-top:1.45rem!important}
        .portfolio-standard-intro__chip{min-height:1.8rem!important;padding:.48rem .65rem!important;font-size:.55rem!important;letter-spacing:.15em!important}
        .portfolio-standard-intro__about{grid-template-columns:1fr!important;gap:1.35rem!important;margin-top:3rem!important;padding-top:1.35rem!important}
        .portfolio-standard-intro__about-text{font-size:clamp(1.05rem,5vw,1.45rem)!important;line-height:1.35!important}
      }
    `;
    document.head.append(style);
  }

  function isVisible(node) {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function projectForModal(modal) {
    return PROJECTS.find(project => modal.matches(project.selector)) || null;
  }

  function originalClose(modal) {
    const explicit = [...modal.querySelectorAll(CLOSE_CLASSES)].find(button => !button.closest('.portfolio-standard-head'));
    if (explicit) return explicit;
    return [...modal.querySelectorAll('button,[role="button"]')].find(button => {
      if (button.closest('.portfolio-standard-head,.desktop-unified-lightbox')) return false;
      const text = norm([button.textContent,button.getAttribute('aria-label'),button.getAttribute('title')].filter(Boolean).join(' '));
      return /^(CLOSE|ЗАКРЫТЬ|EXIT|ВЫЙТИ)$/.test(text) || text.includes('CLOSE PROJECT') || text.includes('ЗАКРЫТЬ ПРОЕКТ');
    }) || null;
  }

  function originalHead(modal, close) {
    if (!(close instanceof Element)) return null;
    const candidate = close.closest('header,[class*="head"],[class*="toolbar"],[class*="topbar"],[class*="top-bar"],.sticky');
    if (candidate && candidate !== modal) return candidate;
    return close.parentElement && close.parentElement !== modal ? close.parentElement : null;
  }

  function findAboutHeading(modal) {
    return [...modal.querySelectorAll('h1,h2,h3,h4,p,span')].find(node => {
      if (node.closest('.portfolio-standard-intro,.portfolio-standard-head')) return false;
      const text = norm(node.textContent);
      return ['ABOUT THE BRAND','ABOUT THE PROJECT','О БРЕНДЕ','О ПРОЕКТЕ','ABOUT BRAND','ABOUT PROJECT'].includes(text);
    }) || null;
  }

  function substantial(node) {
    if (!(node instanceof HTMLElement) || node.closest('.portfolio-standard-intro,.portfolio-standard-head,.desktop-unified-lightbox')) return false;
    const text = (node.textContent || '').replace(/\s+/g,' ').trim();
    return text.length >= 70 && text.length <= 2200 && !node.querySelector('img,video,picture,canvas');
  }

  function findAbout(modal) {
    const aboutHeading = findAboutHeading(modal);
    if (aboutHeading) {
      const zone = aboutHeading.closest('section,[class*="intro"],[class*="about"],[class*="brand"]') || aboutHeading.parentElement;
      const paragraph = zone ? [...zone.querySelectorAll('p')].find(node => node !== aboutHeading && substantial(node)) : null;
      if (paragraph) return { paragraph, heading: aboutHeading };
    }

    for (const selector of preferredCopySelectors) {
      const candidate = [...modal.querySelectorAll(selector)].find(substantial);
      if (candidate) return { paragraph: candidate, heading: null };
    }

    const candidates = [...modal.querySelectorAll('p')].filter(substantial);
    const firstImage = modal.querySelector('img,video,picture');
    if (firstImage) {
      const beforeMedia = candidates.find(node => Boolean(node.compareDocumentPosition(firstImage) & Node.DOCUMENT_POSITION_FOLLOWING));
      if (beforeMedia) return { paragraph: beforeMedia, heading: null };
    }
    return candidates[0] ? { paragraph:candidates[0], heading:null } : null;
  }

  function hideTextSource(node) {
    if (!(node instanceof HTMLElement)) return;
    node.classList.add('portfolio-standard-source-hidden');
    let parent = node.parentElement;
    for (let depth=0; parent && depth<2; depth+=1, parent=parent.parentElement) {
      if (parent.matches('.portfolio-standard-intro,.portfolio-standard-head') || parent.closest('.portfolio-standard-intro')) break;
      if (parent.querySelector('img,video,picture,canvas')) break;
      const visibleTextChildren = [...parent.children].filter(child => !child.classList.contains('portfolio-standard-source-hidden') && (child.textContent || '').trim());
      if (visibleTextChildren.length === 0 && parent.children.length <= 4) parent.classList.add('portfolio-standard-source-hidden');
    }
  }

  function hideLegacyTop(modal, project, about) {
    const aliases = new Set(project.aliases.map(norm));
    [...modal.querySelectorAll('h1,h2,h3')].forEach(heading => {
      if (heading.closest('.portfolio-standard-intro,.portfolio-standard-head')) return;
      if (aliases.has(norm(heading.textContent))) heading.classList.add('portfolio-standard-source-hidden');
    });

    const chipSet = new Set(project.chips.map(norm));
    [...modal.querySelectorAll('div,nav,ul')].forEach(container => {
      if (container.closest('.portfolio-standard-intro,.portfolio-standard-head')) return;
      if (container.querySelector('img,video,picture,canvas')) return;
      const children = [...container.children].filter(child => (child.textContent || '').trim());
      if (children.length < 2 || children.length > 8) return;
      const texts = children.map(child => norm(child.textContent)).filter(Boolean);
      const matches = texts.filter(text => chipSet.has(text)).length;
      if (matches >= Math.min(2, project.chips.length) && matches >= Math.ceil(texts.length * .6)) {
        container.classList.add('portfolio-standard-source-hidden');
      }
    });

    if (about?.heading) hideTextSource(about.heading);
    if (about?.paragraph) hideTextSource(about.paragraph);
  }

  function buildHead(modal, project, close) {
    let head = modal.querySelector(':scope > .portfolio-standard-head');
    if (!head) {
      head = document.createElement('div');
      head.className = 'portfolio-standard-head';
      const label = document.createElement('span');
      label.className = 'portfolio-standard-head__label';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'portfolio-standard-head__close';
      button.setAttribute('aria-label','Exit project');
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const live = originalClose(modal);
        if (live) live.click();
        else window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));
      });
      head.append(label,button);
      modal.prepend(head);
    }
    head.querySelector('.portfolio-standard-head__label').textContent = project.title;
    head.querySelector('.portfolio-standard-head__close').textContent = copy(project).close;

    const legacy = originalHead(modal, close);
    if (legacy && legacy !== head) {
      legacy.classList.remove('portfolio-fixed-project-head');
      legacy.classList.add('portfolio-standard-original-head');
      const spacer = legacy.nextElementSibling;
      if (spacer?.classList?.contains('portfolio-fixed-project-head-spacer')) spacer.classList.add('portfolio-standard-remove-spacer');
    }
    return head;
  }

  function buildIntro(modal, project, about) {
    let intro = modal.querySelector(':scope > .portfolio-standard-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.className = 'portfolio-standard-intro';
      intro.innerHTML = `
        <div class="portfolio-standard-intro__inner">
          <h1 class="portfolio-standard-intro__title"></h1>
          <div class="portfolio-standard-intro__chips"></div>
          <div class="portfolio-standard-intro__about">
            <p class="portfolio-standard-intro__about-label"></p>
            <p class="portfolio-standard-intro__about-text"></p>
          </div>
        </div>`;
      const head = modal.querySelector(':scope > .portfolio-standard-head');
      if (head) head.after(intro); else modal.prepend(intro);
    }

    intro.querySelector('.portfolio-standard-intro__title').textContent = project.title;
    const chips = intro.querySelector('.portfolio-standard-intro__chips');
    const signature = project.chips.join('|');
    if (chips.dataset.signature !== signature) {
      chips.dataset.signature = signature;
      chips.replaceChildren(...project.chips.map(text => {
        const chip = document.createElement('span');
        chip.className = 'portfolio-standard-intro__chip';
        chip.textContent = text;
        return chip;
      }));
    }

    const aboutBox = intro.querySelector('.portfolio-standard-intro__about');
    intro.querySelector('.portfolio-standard-intro__about-label').textContent = copy(project).about;
    const text = (about?.paragraph?.textContent || '').replace(/\s+/g,' ').trim();
    intro.querySelector('.portfolio-standard-intro__about-text').textContent = text;
    aboutBox.classList.toggle('is-empty', !text);
    return intro;
  }

  function applyModal(modal) {
    if (!(modal instanceof HTMLElement) || !isVisible(modal)) return;
    const project = projectForModal(modal);
    if (!project) return;

    const close = originalClose(modal);
    const about = findAbout(modal);
    buildHead(modal, project, close);
    buildIntro(modal, project, about);
    hideLegacyTop(modal, project, about);
    modal.dataset.portfolioStandardIntro = VERSION;
  }

  function apply() {
    installStyles();
    PROJECTS.forEach(project => document.querySelectorAll(project.selector).forEach(applyModal));
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued=false; apply(); });
  }

  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('popstate',()=>setTimeout(schedule,0));
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('load',schedule,{once:true});

  installStyles();
  [0,80,240,700,1400].forEach(delay => setTimeout(schedule,delay));
})();