(() => {
  if (window.__desktopSiteExperienceV1) return;
  window.__desktopSiteExperienceV1 = true;

  const VERSION = 'desktop-site-experience-1';
  const STYLE_ID = 'desktop-site-experience-style';
  const DEFAULT_TITLE = 'Yaroslav — Graphic Designer';
  const HOME_SCROLL_KEY = 'portfolio-home-scroll-y';

  const PROJECTS = [
    { slug: 'zny', name: 'ZNY', titles: ['ZNY'], selectors: ['.zny-modal'] },
    { slug: 'fable', name: 'F | ABLE', titles: ['F | ABLE', 'FABLE'], selectors: ['.fable-modal'] },
    { slug: 'pink-punk', name: 'PINK PUNK', titles: ['PINK PUNK'], selectors: ['.pink-punk-fullscreen'] },
    { slug: 'carnival-records', name: 'CARNIVAL RECORDS', titles: ['CARNIVAL RECORDS'], selectors: ['.cr-modal'] },
    { slug: 'blandetto', name: 'BLANDETTO', titles: ['BLANDETTO'], selectors: ['.blandetto-modal', '.bf'] },
    { slug: 'ninety-z-s', name: 'NINETY Z S', titles: ['NINETY Z S', '90.06', '90 06'], selectors: ['.project9006-modal'] },
    { slug: 'posters', name: 'POSTERS', titles: ['POSTERS'], selectors: ['.pcg-modal'] },
    { slug: 'merch', name: 'MERCH', titles: ['MERCH'], selectors: ['.mc-modal'] },
    { slug: 'stickers', name: 'STICKERS', titles: ['STICKERS'], selectors: ['.stk-modal'] },
    { slug: 'logos', name: 'LOGOS', titles: ['LOGOS', 'ЛОГОТИПЫ'], selectors: ['.lcg-modal'] },
    { slug: 'album-covers', name: 'ALBUM COVERS', titles: ['ALBUM COVERS'], selectors: ['.album-covers-modal'] },
    { slug: 'stay-ugly', name: 'STAY UGLY', titles: ['STAY UGLY', 'STAYUGLY'], selectors: ['.su-modal'] },
    { slug: 'anka-peresild', name: 'ANKA PERESILD', titles: ['ANKA PERESILD'], selectors: ['.anka-peresild-modal'] },
    { slug: 'vtb-design-team', name: 'VTB DESIGN TEAM', titles: ['VTB DESIGN TEAM'], selectors: ['.vtb-modal'] },
    { slug: 'collages-photo-edit', name: 'COLLAGES PHOTO EDIT', titles: ['COLLAGES PHOTO EDIT'], selectors: ['.collages-modal'] },
  ];

  const PROJECT_BY_SLUG = new Map(PROJECTS.map((project) => [project.slug, project]));
  const VALID_SLUGS = new Set(PROJECTS.map((project) => project.slug));
  const MODAL_SELECTOR = [...new Set(PROJECTS.flatMap((project) => project.selectors).concat('.pag-modal'))].join(',');
  const CLOSE_SELECTOR = [
    '.zny-close', '.fable-close', '.su-close', '.vtb-close', '.cr-close', '.mc-close', '.stk-close',
    '.pcg-close', '.lcg-close', '.pag-close', '.blandetto-close', '.bf-close', '.bf-x',
    '.anka-peresild-close', '.album-covers-close', '.project9006-toolbar__close', '.project9006-close',
    '.p9006-close', '.pink-punk-fullscreen > div > .sticky button'
  ].join(',');

  const normalize = (value) => String(value || '')
    .toUpperCase().replace(/Ё/g, 'Е').replace(/\|/g, '').replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim().replace(/\s+/g, ' ');

  const isDesktop = () => window.innerWidth > 820 && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const language = () => document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      @keyframes portfolioDesktopEnter{from{transform:translateY(10px);filter:brightness(.985)}to{transform:translateY(0);filter:brightness(1)}}
      @keyframes portfolioDesktopExit{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(8px)}}
      @media (hover:hover) and (pointer:fine) and (min-width:821px){
        .portfolio-desktop-project-enter{animation:portfolioDesktopEnter .22s cubic-bezier(.2,.8,.2,1) both}
        .portfolio-desktop-project-exit{animation:portfolioDesktopExit .17s ease both!important;pointer-events:none!important}
        ${MODAL_SELECTOR}{max-width:100vw!important;overflow-x:clip!important}
        ${MODAL_SELECTOR} img,${MODAL_SELECTOR} video,${MODAL_SELECTOR} canvas,${MODAL_SELECTOR} svg{max-width:100%}
      }
      .portfolio-copy-project-link{
        position:fixed;left:max(1rem,env(safe-area-inset-left));bottom:max(1rem,env(safe-area-inset-bottom));z-index:1900000;
        min-height:2.9rem;padding:.78rem 1rem;border:1px solid #fff;border-radius:0;background:#050505;color:#fff;
        font:900 .64rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;
        transition:background-color .16s ease,color .16s ease,transform .16s ease;
      }
      .portfolio-copy-project-link:hover{background:#a6ff00;color:#050505;border-color:#050505}
      .portfolio-copy-project-link:active{transform:scale(.98)}
      .portfolio-image-loading{
        position:fixed;left:50%;top:max(.8rem,env(safe-area-inset-top));z-index:1950000;transform:translateX(-50%);
        display:flex;align-items:center;gap:.65rem;min-height:2.25rem;padding:.55rem .75rem;border:1px solid rgba(255,255,255,.8);
        background:#050505;color:#fff;font:900 .6rem/1 Arial,Helvetica,sans-serif;letter-spacing:.16em;text-transform:uppercase;
        opacity:0;pointer-events:none;transition:opacity .16s ease;
      }
      .portfolio-image-loading.is-visible{opacity:1}
      .portfolio-image-loading__bar{display:block;width:3rem;height:2px;overflow:hidden;background:rgba(255,255,255,.24)}
      .portfolio-image-loading__bar::after{content:'';display:block;width:45%;height:100%;background:#a6ff00;animation:portfolioLoadingBar .8s ease-in-out infinite alternate}
      @keyframes portfolioLoadingBar{from{transform:translateX(-15%)}to{transform:translateX(145%)}}
      @media (max-width:820px){.portfolio-copy-project-link,.portfolio-image-loading{display:none!important}}
      @media (min-width:1920px){
        #top>.mx-auto,#about>.mx-auto,#services>.mx-auto,#works>.mx-auto,#contacts>.mx-auto{max-width:96rem!important;margin-left:auto!important;margin-right:auto!important}
        .desktop-project-navigation{max-width:96rem!important;margin-left:auto!important;margin-right:auto!important}
      }
      @media (prefers-reduced-motion:reduce){
        html{scroll-behavior:auto!important}
        *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
      }
    `;
    document.head.append(style);
  }

  function visible(node) {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function projectFromCard(card) {
    const title = normalize(card?.querySelector('h3')?.textContent);
    return PROJECTS.find((project) => project.titles.some((candidate) => normalize(candidate) === title)) || null;
  }

  function projectFromUrl() {
    const slug = new URLSearchParams(location.search).get('project') || '';
    return PROJECT_BY_SLUG.get(slug) || null;
  }

  function activeProject() {
    const byUrl = projectFromUrl();
    if (byUrl) {
      for (const selector of byUrl.selectors) {
        const modal = [...document.querySelectorAll(selector)].filter(visible).at(-1);
        if (modal) return { project: byUrl, modal };
      }
      const pag = [...document.querySelectorAll('.pag-modal')].filter(visible).at(-1);
      if (pag && ['posters', 'logos', 'collages-photo-edit'].includes(byUrl.slug)) return { project: byUrl, modal: pag };
    }

    for (const project of PROJECTS) {
      for (const selector of project.selectors) {
        const modal = [...document.querySelectorAll(selector)].filter(visible).at(-1);
        if (modal) return { project, modal };
      }
    }
    return null;
  }

  function findCloseButton(modal) {
    if (!(modal instanceof Element)) return null;
    return modal.querySelector(CLOSE_SELECTOR) || [...modal.querySelectorAll('button')].find((button) => {
      const text = normalize(button.textContent);
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ';
    }) || null;
  }

  function markOpenModal(modal) {
    if (!isDesktop() || !(modal instanceof HTMLElement) || modal.dataset.desktopEnter === VERSION) return;
    modal.dataset.desktopEnter = VERSION;
    modal.setAttribute('role', modal.getAttribute('role') || 'dialog');
    modal.setAttribute('aria-modal', 'true');
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('portfolio-desktop-project-enter')));
  }

  const closeBypass = new WeakSet();
  function animateClose(button, modal) {
    if (!isDesktop() || !(button instanceof HTMLElement) || !(modal instanceof HTMLElement)) return false;
    if (closeBypass.has(button) || modal.classList.contains('portfolio-desktop-project-exit')) return false;
    modal.classList.remove('portfolio-desktop-project-enter');
    modal.classList.add('portfolio-desktop-project-exit');
    window.setTimeout(() => {
      if (!button.isConnected) return;
      closeBypass.add(button);
      button.click();
      queueMicrotask(() => closeBypass.delete(button));
    }, 165);
    return true;
  }

  function rememberHomeScroll(card) {
    if (!card || !projectFromCard(card)) return;
    try { sessionStorage.setItem(HOME_SCROLL_KEY, String(Math.max(0, Math.round(window.scrollY)))); } catch {}
  }

  function restoreHomeScrollIfNeeded() {
    window.setTimeout(() => {
      if (activeProject() || new URLSearchParams(location.search).get('project')) return;
      let value = 0;
      try { value = Number(sessionStorage.getItem(HOME_SCROLL_KEY) || 0); } catch {}
      if (Number.isFinite(value) && value >= 0) window.scrollTo({ top: value, left: 0, behavior: 'auto' });
    }, 0);
  }

  let copyButton = null;
  function canonicalProjectUrl(project) {
    const url = new URL(location.href);
    url.searchParams.set('project', project.slug);
    url.searchParams.delete('section');
    url.hash = '';
    return url.href;
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch {}
      area.remove();
      return ok;
    }
  }

  function syncCopyButton(opened) {
    if (!isDesktop() || !opened) {
      copyButton?.remove();
      copyButton = null;
      return;
    }
    if (!copyButton?.isConnected) {
      copyButton = document.createElement('button');
      copyButton.type = 'button';
      copyButton.className = 'portfolio-copy-project-link';
      copyButton.addEventListener('click', async () => {
        const current = activeProject();
        if (!current) return;
        const ok = await copyText(canonicalProjectUrl(current.project));
        const original = language() === 'ru' ? 'СКОПИРОВАТЬ ССЫЛКУ' : 'COPY PROJECT LINK';
        copyButton.textContent = ok ? (language() === 'ru' ? 'ССЫЛКА СКОПИРОВАНА' : 'LINK COPIED') : original;
        window.setTimeout(() => { if (copyButton) copyButton.textContent = original; }, 1500);
      });
      document.body.append(copyButton);
    }
    copyButton.textContent = language() === 'ru' ? 'СКОПИРОВАТЬ ССЫЛКУ' : 'COPY PROJECT LINK';
    copyButton.dataset.project = opened.project.slug;
  }

  function syncDocumentTitle(opened) {
    const next = opened ? `${opened.project.name} — Yaroslav / Graphic Designer` : DEFAULT_TITLE;
    if (document.title !== next) document.title = next;
  }

  function focusableIn(scope) {
    const nodes = scope instanceof Element ? [...scope.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')] : [];
    return nodes.filter((node) => {
      if (!(node instanceof HTMLElement)) return false;
      const rect = node.getBoundingClientRect();
      const css = getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && css.display !== 'none' && css.visibility !== 'hidden';
    });
  }

  function trapTab(event, scope, extras = []) {
    const focusables = [...focusableIn(scope), ...extras.filter((node) => node?.isConnected && visible(node))];
    const uniqueNodes = [...new Set(focusables)];
    if (!uniqueNodes.length) return;
    const first = uniqueNodes[0];
    const last = uniqueNodes.at(-1);
    const current = document.activeElement;
    if (event.shiftKey) {
      if (current === first || !uniqueNodes.includes(current)) { event.preventDefault(); last.focus(); }
    } else if (current === last || !uniqueNodes.includes(current)) {
      event.preventDefault(); first.focus();
    }
  }

  const preloaded = new Set();
  function preloadUrl(value) {
    if (!value) return;
    let url = String(value);
    const staticAssets = window.PORTFOLIO_STATIC_ASSETS;
    if (staticAssets?.toLocalUrl) url = staticAssets.toLocalUrl(url);
    try { url = new URL(url, location.href).href; } catch {}
    if (preloaded.has(url)) return;
    preloaded.add(url);
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = 'low';
    image.src = url;
  }

  function projectPreloadSources(project, card) {
    const urls = [];
    const staticAssets = window.PORTFOLIO_STATIC_ASSETS;
    card?.querySelectorAll('img').forEach((image) => urls.push(image.dataset.portfolioOriginal || image.currentSrc || image.getAttribute('src')));
    card?.querySelectorAll('[data-hover-src],[data-worn-src],[data-images]').forEach((node) => {
      ['data-hover-src', 'data-worn-src'].forEach((name) => urls.push(node.getAttribute(name)));
      const list = node.getAttribute('data-images');
      if (list) urls.push(...list.split(/[|,]/));
    });

    if (project.slug === 'zny') urls.push(...(staticAssets?.zny?.prints || []).slice(0, 2));
    if (project.slug === 'fable') urls.push(...(staticAssets?.fable || []).slice(0, 2));
    if (project.slug === 'merch') urls.push(...(staticAssets?.merch || []).slice(0, 2));
    if (project.slug === 'stay-ugly') urls.push(...(staticAssets?.stayUgly?.concept || []).slice(0, 2));
    if (project.slug === 'ninety-z-s') urls.push('/works/90-06/logo-variations/LOGO%201.jpg', '/works/90-06/logo-variations/LOGO%203.jpg');
    if (project.slug === 'vtb-design-team') urls.push('/works/VTB%20DESIGN%20TEAM/print/print-1.jpg');
    if (project.slug === 'pink-punk') urls.push('https://raw.githubusercontent.com/Nightf1ower/portfolio/main/works/pink-punk/-%20pink-punk-01-flat.jpg');
    return urls.filter(Boolean).slice(0, 4);
  }

  let loadingIndicator = null;
  let imageObserver = null;
  const pendingImages = new Set();
  const loadingBound = new WeakSet();

  function ensureLoadingIndicator() {
    if (loadingIndicator?.isConnected) return loadingIndicator;
    const root = document.createElement('div');
    const label = document.createElement('span');
    const bar = document.createElement('span');
    root.className = 'portfolio-image-loading';
    label.className = 'portfolio-image-loading__label';
    bar.className = 'portfolio-image-loading__bar';
    root.append(label, bar);
    document.body.append(root);
    loadingIndicator = root;
    return root;
  }

  function updateLoadingIndicator() {
    const root = ensureLoadingIndicator();
    const count = pendingImages.size;
    root.querySelector('.portfolio-image-loading__label').textContent = count ? `LOADING · ${String(count).padStart(2, '0')}` : 'LOADING';
    root.classList.toggle('is-visible', isDesktop() && count > 0 && Boolean(activeProject()));
  }

  function bindImageLoading(image) {
    if (!(image instanceof HTMLImageElement) || loadingBound.has(image)) return;
    loadingBound.add(image);
    const finish = () => {
      pendingImages.delete(image);
      updateLoadingIndicator();
    };
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', finish, { once: true });
  }

  function observeLoadingFor(modal) {
    imageObserver?.disconnect();
    imageObserver = null;
    pendingImages.clear();
    updateLoadingIndicator();
    if (!isDesktop() || !modal) return;

    imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const image = entry.target;
        imageObserver.unobserve(image);
        if (!(image instanceof HTMLImageElement) || image.complete) return;
        bindImageLoading(image);
        pendingImages.add(image);
        updateLoadingIndicator();
      });
    }, { root: null, rootMargin: '650px 0px', threshold: 0.01 });

    modal.querySelectorAll('img').forEach((image) => imageObserver.observe(image));
  }

  const optimizedImages = new WeakSet();
  function optimizeProjectMedia(modal) {
    if (!(modal instanceof Element)) return;
    const images = [...modal.querySelectorAll('img')];
    images.forEach((image, index) => {
      if (optimizedImages.has(image)) return;
      optimizedImages.add(image);
      image.decoding = 'async';
      if (index < 2) {
        image.loading = 'eager';
        try { image.fetchPriority = 'high'; } catch {}
      } else {
        if (!image.hasAttribute('loading')) image.loading = 'lazy';
        try { if (!image.fetchPriority || image.fetchPriority === 'auto') image.fetchPriority = 'low'; } catch {}
      }
    });
    modal.querySelectorAll('video').forEach((video) => {
      if (!video.autoplay && !video.hasAttribute('preload')) video.preload = 'metadata';
    });
  }

  function sanitizeLocation() {
    const url = new URL(location.href);
    const project = url.searchParams.get('project');
    const hasInvalidProject = project && !VALID_SLUGS.has(project);
    const orphanSection = !project && url.searchParams.has('section');
    if (!hasInvalidProject && !orphanSection) return false;
    url.searchParams.delete('project');
    url.searchParams.delete('section');
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    if (hasInvalidProject) window.setTimeout(() => document.getElementById('works')?.scrollIntoView({ block: 'start', behavior: 'auto' }), 0);
    return true;
  }

  let observedModal = null;
  function sync() {
    installStyles();
    sanitizeLocation();
    const opened = activeProject();
    if (opened) {
      markOpenModal(opened.modal);
      optimizeProjectMedia(opened.modal);
      if (observedModal !== opened.modal) {
        observedModal = opened.modal;
        observeLoadingFor(opened.modal);
      } else if (imageObserver) {
        opened.modal.querySelectorAll('img').forEach((image) => {
          if (!optimizedImages.has(image)) optimizeProjectMedia(opened.modal);
          try { imageObserver.observe(image); } catch {}
        });
      }
    } else if (observedModal) {
      observedModal = null;
      observeLoadingFor(null);
      restoreHomeScrollIfNeeded();
    }
    syncCopyButton(opened);
    syncDocumentTitle(opened);
  }

  function wrapHistoryMethod(name) {
    const original = history[name];
    if (original.__portfolioExperienceWrapped) return;
    const wrapped = function (...args) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event('portfolio:historychange'));
      return result;
    };
    wrapped.__portfolioExperienceWrapped = true;
    history[name] = wrapped;
  }

  wrapHistoryMethod('pushState');
  wrapHistoryMethod('replaceState');

  window.addEventListener('pointerdown', (event) => {
    const card = event.target.closest?.('#works article,#works button');
    if (card) rememberHomeScroll(card);
  }, true);

  window.addEventListener('keydown', (event) => {
    const lightbox = document.querySelector('.desktop-unified-lightbox');
    if (lightbox) {
      if (event.key === 'Tab') {
        event.stopPropagation();
        trapTab(event, lightbox);
      }
      return;
    }

    const opened = activeProject();
    if (!opened || !isDesktop()) return;

    if (event.key === 'Escape') {
      const close = findCloseButton(opened.modal);
      if (!close) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      close.click();
      return;
    }

    if (event.key === 'Tab') {
      event.stopPropagation();
      trapTab(event, opened.modal, copyButton ? [copyButton] : []);
    }
  }, true);

  window.addEventListener('click', (event) => {
    if (!isDesktop() || !(event.target instanceof Element)) return;
    const button = event.target.closest(CLOSE_SELECTOR);
    const modal = button?.closest(MODAL_SELECTOR);
    if (!button || !modal || closeBypass.has(button)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    animateClose(button, modal);
  }, true);

  window.addEventListener('pointerover', (event) => {
    if (!isDesktop() || !(event.target instanceof Element)) return;
    const card = event.target.closest('#works article,#works button');
    if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
    const project = projectFromCard(card);
    if (!project) return;
    const run = () => projectPreloadSources(project, card).forEach(preloadUrl);
    if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 450 });
    else window.setTimeout(run, 50);
  }, true);

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      sync();
    });
  }

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('portfolio:historychange', schedule);
  window.addEventListener('popstate', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule, { once: true });

  installStyles();
  sanitizeLocation();
  [0, 80, 240, 700].forEach((delay) => setTimeout(schedule, delay));
})();
