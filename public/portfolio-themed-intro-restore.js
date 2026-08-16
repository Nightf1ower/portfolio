(() => {
  if (window.__portfolioThemedIntroRestoreV1) return;
  window.__portfolioThemedIntroRestoreV1 = true;

  const VERSION = 'portfolio-themed-intro-restore-1';
  const STYLE_ID = 'portfolio-themed-intro-restore-style';

  const PROJECTS = [
    {
      selector: '.pink-punk-fullscreen',
      slug: 'pink-punk',
      title: 'PINK PUNK',
      chips: ['GRAPHICS', 'POSTERS', 'PRINTS'],
      background: '#9b0014',
      foreground: '#ffffff',
      kind: 'brand',
      copySelectors: ['.pink-punk-brand-copy', '.pink-punk-intro p', '.pink-punk-fullscreen p'],
    },
    {
      selector: '.mc-modal,.m10-modal',
      slug: 'merch',
      title: 'MERCH',
      chips: ['POSTERS', 'PRINTS', 'AI ILLUSTRATIONS'],
      background: '#87CEEB',
      foreground: '#050505',
      kind: 'project',
      copySelectors: ['.mc-hero .mc-copy', '.m10-hero p', '.mc-modal p', '.m10-modal p'],
    },
    {
      selector: '.vtb-modal',
      slug: 'vtb-design-team',
      title: 'VTB DESIGN TEAM',
      chips: ['MERCH', 'ACCESSORIES', 'PRINTS'],
      background: '#ff0101',
      foreground: '#050505',
      kind: 'project',
      copySelectors: ['.vtb-project-intro__text', '.vtb-modal p'],
    },
    {
      selector: '.pcg-modal',
      slug: 'posters',
      title: 'POSTERS',
      chips: ['INFOGRAPHICS', 'PROJECTS', 'PARTIES'],
      background: '#2C3D55',
      foreground: '#ffffff',
      kind: 'project',
      copySelectors: ['.pcg-intro', '.pcg-modal p'],
    },
  ];

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  const norm = value => String(value || '')
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-standard-intro[data-portfolio-themed="true"]{
        position:relative!important;
        inset:auto!important;
        z-index:2!important;
        display:block!important;
        box-sizing:border-box!important;
        width:100vw!important;
        max-width:none!important;
        min-height:0!important;
        height:auto!important;
        margin:0 0 0 calc(50% - 50vw)!important;
        padding:clamp(7rem,10vw,10rem) clamp(1rem,3.2vw,4rem) clamp(4.5rem,7vw,7rem)!important;
        background:var(--portfolio-intro-bg)!important;
        background-image:none!important;
        color:var(--portfolio-intro-fg)!important;
        opacity:1!important;
        visibility:visible!important;
        transform:none!important;
        translate:none!important;
        animation:none!important;
        filter:none!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__inner,
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__title,
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__chips,
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__about{
        display:block!important;
        opacity:1!important;
        visibility:visible!important;
        transform:none!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__title,
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__about-text{
        color:var(--portfolio-intro-fg)!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__chips{
        display:flex!important;
        flex-wrap:wrap!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__chip{
        border-color:var(--portfolio-intro-fg)!important;
        background:transparent!important;
        color:var(--portfolio-intro-fg)!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__about{
        display:grid!important;
        border-top-color:var(--portfolio-intro-fg)!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__about-label{
        background:#050505!important;
        color:#fff!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__about.is-empty{
        display:none!important;
      }

      .pink-punk-fullscreen,
      .pink-punk-fullscreen > div{
        background:#9b0014!important;
      }
      .pink-punk-fullscreen > .portfolio-standard-head,
      .mc-modal > .portfolio-standard-head,
      .m10-modal > .portfolio-standard-head,
      .vtb-modal > .portfolio-standard-head,
      .pcg-modal > .portfolio-standard-head{
        position:fixed!important;
        top:0!important;
        left:0!important;
        right:0!important;
        bottom:auto!important;
        transform:none!important;
        translate:none!important;
        margin:0!important;
      }

      @media(max-width:820px){
        .portfolio-standard-intro[data-portfolio-themed="true"]{
          padding:clamp(6rem,22vw,7.5rem) 1rem clamp(3.5rem,14vw,5rem)!important;
        }
      }
    `;
    document.head.append(style);
  }

  function substantial(node) {
    if (!(node instanceof HTMLElement)) return false;
    if (node.closest('.portfolio-standard-head,.portfolio-standard-intro,.desktop-unified-lightbox')) return false;
    const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
    return text.length >= 70 && text.length <= 2400 && !node.querySelector('img,video,picture,canvas');
  }

  function sourceText(modal, project) {
    for (const selector of project.copySelectors) {
      const nodes = [...modal.querySelectorAll(selector)];
      const node = nodes.find(substantial);
      if (node) return (node.textContent || '').replace(/\s+/g, ' ').trim();
    }
    const fallback = [...modal.querySelectorAll('p')].find(substantial);
    return fallback ? (fallback.textContent || '').replace(/\s+/g, ' ').trim() : '';
  }

  function makeIntro(project) {
    const intro = document.createElement('section');
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
    return intro;
  }

  function ensureIntro(modal, project) {
    let intro = modal.querySelector(':scope > .portfolio-standard-intro');
    if (!intro) intro = makeIntro(project);

    const head = modal.querySelector(':scope > .portfolio-standard-head');
    if (head) {
      if (intro.parentElement !== modal || head.nextElementSibling !== intro) head.after(intro);
    } else if (intro.parentElement !== modal || modal.firstElementChild !== intro) {
      modal.prepend(intro);
    }

    intro.dataset.portfolioThemed = 'true';
    intro.dataset.portfolioProject = project.slug;
    intro.style.setProperty('--portfolio-intro-bg', project.background);
    intro.style.setProperty('--portfolio-intro-fg', project.foreground);

    const title = intro.querySelector('.portfolio-standard-intro__title');
    if (title) title.textContent = project.title;

    const chips = intro.querySelector('.portfolio-standard-intro__chips');
    if (chips) {
      const signature = project.chips.join('|');
      if (chips.dataset.themeSignature !== signature) {
        chips.dataset.themeSignature = signature;
        chips.replaceChildren(...project.chips.map(label => {
          const chip = document.createElement('span');
          chip.className = 'portfolio-standard-intro__chip';
          chip.textContent = label;
          return chip;
        }));
      }
    }

    const about = intro.querySelector('.portfolio-standard-intro__about');
    const label = intro.querySelector('.portfolio-standard-intro__about-label');
    const text = intro.querySelector('.portfolio-standard-intro__about-text');
    if (label) {
      label.textContent = project.kind === 'brand'
        ? (language() === 'ru' ? 'О БРЕНДЕ' : 'ABOUT THE BRAND')
        : (language() === 'ru' ? 'О ПРОЕКТЕ' : 'ABOUT THE PROJECT');
    }
    if (text && !text.textContent.trim()) text.textContent = sourceText(modal, project);
    if (about) about.classList.toggle('is-empty', !text?.textContent.trim());

    return intro;
  }

  function hideDuplicateChipRows(modal, project) {
    const expected = new Set(project.chips.map(norm));
    const parents = new Set();

    [...modal.querySelectorAll('span,button,a,li,p')].forEach(node => {
      if (node.closest('.portfolio-standard-intro,.portfolio-standard-head,.desktop-unified-lightbox')) return;
      if (expected.has(norm(node.textContent))) parents.add(node.parentElement);
    });

    parents.forEach(parent => {
      if (!(parent instanceof HTMLElement)) return;
      if (parent.querySelector('img,video,picture,canvas')) return;
      const direct = [...parent.children]
        .map(child => norm(child.textContent))
        .filter(Boolean);
      const matches = direct.filter(text => expected.has(text)).length;
      if (matches >= 2 && matches >= Math.ceil(direct.length * .5)) {
        parent.classList.add('portfolio-standard-source-hidden');
      }
    });
  }

  function repairProject(project) {
    document.querySelectorAll(project.selector).forEach(modal => {
      if (!(modal instanceof HTMLElement)) return;
      const css = getComputedStyle(modal);
      if (css.display === 'none' || css.visibility === 'hidden') return;

      const firstRepair = modal.dataset.portfolioThemeRepair !== VERSION;
      ensureIntro(modal, project);
      hideDuplicateChipRows(modal, project);

      if (project.slug === 'pink-punk') {
        modal.style.setProperty('background', project.background, 'important');
        modal.style.setProperty('background-color', project.background, 'important');
        modal.style.setProperty('transform', 'none', 'important');
        modal.style.setProperty('translate', 'none', 'important');
      }

      if (firstRepair) {
        modal.dataset.portfolioThemeRepair = VERSION;
        requestAnimationFrame(() => {
          try { modal.scrollTop = 0; } catch {}
        });
      }
    });
  }

  function apply() {
    installStyles();
    PROJECTS.forEach(repairProject);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  };

  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['class'] });
  new MutationObserver(schedule).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  window.addEventListener('popstate', () => setTimeout(schedule, 0));
  window.addEventListener('load', schedule, { once:true });

  installStyles();
  [0, 60, 180, 420, 900].forEach(delay => setTimeout(schedule, delay));
})();