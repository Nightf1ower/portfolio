(() => {
  if (window.__vtbDesignTeamGalleryV1) return;
  window.__vtbDesignTeamGalleryV1 = true;

  const VERSION = 'vtb-gallery-1';
  const ROOT = '/works/VTB%20DESIGN%20TEAM';

  const PRINT_SERIES = [
    ['print-1.jpg', 'print-1-variant.jpg', 'print-1-tee-1.jpg', 'print-1-tee-2.jpg', 'print-1-tee-3.jpg', 'print-1-tee-4.jpg', 'print-1-tee-5.jpg', 'print-1-tee-6.jpg'],
    ['print-2.jpg', 'print-2-tee-1.jpg', 'print-2-tee-2.jpg'],
    ['print-3.jpg', 'print-3-variant.jpg', 'print-3-tee-1.jpg', 'print-3-tee-2.jpg', 'print-3-tee-3.jpg', 'print-3-tee-4.jpg', 'print-3-tee-5.jpg'],
    ['print-4.jpg', 'print-4-tee-1.jpg', 'print-4-tee-2.jpg'],
    ['print-5.jpg', 'print-5-variant.jpg', 'print-5-tee-1.jpg', 'print-5-tee-2.jpg', 'print-5-tee-3.jpg'],
    ['print-6.jpg', 'print-6-tee-1.jpg', 'print-6-tee-2.jpg'],
    ['print-7.jpg', 'print-7-tee-1.jpg', 'print-7-tee-2.jpg', 'print-7-tee-3.jpg'],
    ['print-8-1.jpg', 'print-8-tee-1.jpg', 'print-8-tee-2.jpg'],
    ['print-9-1.jpg', 'print-9-variant-1.jpg', 'print-9-variant-2.jpg', 'print-9-tee-1.jpg', 'print-9-tee-2.jpg', 'print-9-tee-3.jpg', 'print-9-tee-4.jpg'],
  ].map((series, seriesIndex) => series.map((name, itemIndex) => ({
    src: `${ROOT}/print/${encodeURIComponent(name)}?v=${VERSION}`,
    alt: `VTB DESIGN TEAM print ${seriesIndex + 1}${itemIndex ? ` variation ${itemIndex}` : ''}`,
  })));

  const MERCH = [
    'merch-1-boxers.jpg',
    'merch-2-boxers.jpg',
    'merch-3-ashtray.jpg',
    'merch-4-ashtray.jpg',
    'merch-5-ashtray.jpg',
    'merch-6-ashtray.jpg',
    'merch-7-ashtray.jpg',
  ].map((name, index) => ({
    src: `${ROOT}/merch/${encodeURIComponent(name)}?v=${VERSION}`,
    alt: `VTB DESIGN TEAM merch ${index + 1}`,
  }));

  const ADS = [
    { src: `${ROOT}/ad/${encodeURIComponent('ad-3.jpg')}?v=${VERSION}`, alt: 'VTB DESIGN TEAM ad 3', type: 'main' },
    { src: `${ROOT}/ad/${encodeURIComponent('ad-4.jpg')}?v=${VERSION}`, alt: 'VTB DESIGN TEAM ad 4', type: 'main' },
    { src: `${ROOT}/ad/${encodeURIComponent('ad billboard-1.png')}?v=${VERSION}`, alt: 'VTB DESIGN TEAM billboard 1', type: 'billboard' },
    { src: `${ROOT}/ad/${encodeURIComponent('ad billboard-2.png')}?v=${VERSION}`, alt: 'VTB DESIGN TEAM billboard 2', type: 'billboard' },
  ];

  const ALL_ITEMS = [...PRINT_SERIES.flat(), ...MERCH, ...ADS];
  const firstIndexFor = (item) => ALL_ITEMS.findIndex((candidate) => candidate.src === item.src);

  let modal = null;
  let lightbox = null;
  let activeIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function injectStyles() {
    const old = document.getElementById('vtb-design-team-gallery-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = el('style');
    style.id = 'vtb-design-team-gallery-style';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.vtb-modal), body:has(.vtb-modal) { overflow: hidden !important; background: #fff !important; }
      .vtb-modal {
        position: fixed;
        inset: 0;
        z-index: 650000;
        width: 100vw;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(5rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: #fff;
        color: #050505;
        overscroll-behavior: contain;
      }
      .vtb-inner { width: min(100%,80rem); margin: 0 auto; }
      .vtb-head {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .75rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.24);
        background: rgba(255,255,255,.96);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .vtb-label, .vtb-close, .vtb-count {
        font-family: Arial,Helvetica,sans-serif;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .26em;
        text-transform: uppercase;
      }
      .vtb-label { margin: 0; padding: .55rem .8rem; background: #050505; color: #fff; }
      .vtb-close { border: 0; padding: .7rem 1rem; background: #050505; color: #fff; cursor: pointer; }
      .vtb-hero { padding: clamp(5rem,12vw,10rem) 0 clamp(4rem,9vw,7rem); }
      .vtb-hero-title {
        max-width: 10ch;
        margin: 0;
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(4rem,11vw,11rem);
        font-weight: 900;
        line-height: .76;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .vtb-section { padding: clamp(3rem,7vw,6rem) 0; border-top: 1px solid rgba(5,5,5,.24); }
      .vtb-section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
      .vtb-title {
        margin: 0;
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(3.2rem,8vw,8rem);
        font-weight: 900;
        line-height: .8;
        letter-spacing: -.085em;
        text-transform: uppercase;
      }
      .vtb-count { margin: 0; color: rgba(5,5,5,.48); white-space: nowrap; }
      .vtb-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 1rem; align-items: start; }
      .vtb-ad-grid, .vtb-billboard-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; }
      .vtb-billboard-grid { margin-top: 1rem; }
      .vtb-card {
        position: relative;
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        background: transparent;
        box-shadow: none;
        overflow: hidden;
        cursor: zoom-in;
      }
      .vtb-card img { display: block; width: 100%; height: auto; margin: 0; border: 0; background: transparent; object-fit: contain; }
      .vtb-hover-badge {
        position: absolute;
        right: .65rem;
        bottom: .65rem;
        z-index: 2;
        padding: .38rem .5rem;
        border: 1px solid #050505;
        background: rgba(255,255,255,.92);
        color: #050505;
        font: 900 .58rem/1 Arial,Helvetica,sans-serif;
        letter-spacing: .16em;
        pointer-events: none;
      }
      .vtb-light {
        position: fixed;
        inset: 0;
        z-index: 980000;
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: clamp(.5rem,2vw,1.25rem);
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
        touch-action: none;
      }
      .vtb-light-stage { min-width: 0; height: calc(100dvh - 2rem); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .vtb-light-image { display: block; max-width: 100%; max-height: 92dvh; width: auto; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
      .vtb-light-close, .vtb-light-nav {
        border: 1px solid rgba(255,255,255,.72);
        background: #050505;
        color: #fff;
        cursor: pointer;
        font-family: Arial,Helvetica,sans-serif;
        font-weight: 900;
      }
      .vtb-light-close { position: absolute; top: max(1rem,env(safe-area-inset-top)); right: max(1rem,env(safe-area-inset-right)); padding: .72rem .95rem; font-size: .68rem; letter-spacing: .18em; }
      .vtb-light-nav { width: 3.3rem; height: 3.3rem; font-size: 1.5rem; }
      .vtb-light-count { position: absolute; left: 50%; bottom: max(1rem,env(safe-area-inset-bottom)); transform: translateX(-50%); margin: 0; padding: .45rem .7rem; background: #fff; color: #050505; font: 900 .65rem/1 Arial,Helvetica,sans-serif; letter-spacing: .18em; }
      @media (max-width: 900px) { .vtb-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
      @media (max-width: 560px), (hover: none), (pointer: coarse) {
        .vtb-grid, .vtb-ad-grid, .vtb-billboard-grid { grid-template-columns: 1fr; }
        .vtb-section-head { display: block; }
        .vtb-count { margin-top: .75rem; }
        .vtb-hover-badge { display: none; }
        .vtb-light { grid-template-columns: 1fr; padding: max(.75rem,env(safe-area-inset-top)) max(.75rem,env(safe-area-inset-right)) max(.75rem,env(safe-area-inset-bottom)) max(.75rem,env(safe-area-inset-left)); }
        .vtb-light-nav { display: none !important; }
        .vtb-light-stage { height: calc(100dvh - 1.5rem); }
      }
    `;
    document.head.append(style);
  }

  function lockPage() {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPage() {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
  }

  function closeModal() {
    closeLightbox();
    modal?.remove();
    modal = null;
    unlockPage();
  }

  function renderLightbox() {
    if (!lightbox) return;
    const item = ALL_ITEMS[activeIndex];
    const image = lightbox.querySelector('.vtb-light-image');
    image.src = item.src;
    image.alt = item.alt;
    lightbox.querySelector('.vtb-light-count').textContent = `${activeIndex + 1} / ${ALL_ITEMS.length}`;
  }

  function stepLightbox(amount) {
    activeIndex = (activeIndex + amount + ALL_ITEMS.length) % ALL_ITEMS.length;
    renderLightbox();
  }

  function openLightbox(index) {
    closeLightbox();
    activeIndex = Math.max(0, Math.min(index, ALL_ITEMS.length - 1));

    const overlay = el('div', 'vtb-light');
    const close = el('button', 'vtb-light-close', 'CLOSE');
    const previous = el('button', 'vtb-light-nav', '←');
    const stage = el('div', 'vtb-light-stage');
    const image = el('img', 'vtb-light-image');
    const next = el('button', 'vtb-light-nav', '→');
    const count = el('p', 'vtb-light-count');
    close.type = previous.type = next.type = 'button';
    image.draggable = false;

    close.onclick = (event) => { event.stopPropagation(); closeLightbox(); };
    previous.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = closeLightbox;

    let startX = 0;
    let startY = 0;
    overlay.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    overlay.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) stepLightbox(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) closeLightbox();
    }, { passive: true });

    stage.append(image);
    overlay.append(close, previous, stage, next, count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function createImageCard(item, index, className = '') {
    const card = el('button', `vtb-card${className ? ` ${className}` : ''}`);
    card.type = 'button';
    card.setAttribute('aria-label', item.alt);
    const image = el('img');
    image.src = item.src;
    image.alt = item.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    card.append(image);
    card.onclick = (event) => {
      event.stopPropagation();
      openLightbox(index);
    };
    return card;
  }

  function createPrintCard(series) {
    const startIndex = firstIndexFor(series[0]);
    const card = createImageCard(series[0], startIndex, 'vtb-print-card');
    const image = card.querySelector('img');
    const badge = el('span', 'vtb-hover-badge', `${series.length} IMAGES`);
    card.append(badge);

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && series.length > 1) {
      let timer = 0;
      let index = 0;
      const stop = () => {
        window.clearInterval(timer);
        timer = 0;
        index = 0;
        image.src = series[0].src;
        image.alt = series[0].alt;
      };
      card.addEventListener('mouseenter', () => {
        stop();
        series.slice(1).forEach((item) => { const preload = new Image(); preload.src = item.src; });
        timer = window.setInterval(() => {
          index = (index + 1) % series.length;
          image.src = series[index].src;
          image.alt = series[index].alt;
        }, 700);
      });
      card.addEventListener('mouseleave', stop);
    }

    return card;
  }

  function createSection(title, countText) {
    const section = el('section', 'vtb-section');
    const head = el('div', 'vtb-section-head');
    head.append(el('h2', 'vtb-title', title), el('p', 'vtb-count', countText));
    section.append(head);
    return section;
  }

  function openModal() {
    injectStyles();
    closeModal();
    lockPage();

    modal = el('div', 'vtb-modal');
    const inner = el('div', 'vtb-inner');
    const head = el('div', 'vtb-head');
    const close = el('button', 'vtb-close', 'CLOSE');
    close.type = 'button';
    close.onclick = (event) => { event.stopPropagation(); closeModal(); };
    head.append(el('p', 'vtb-label', 'VTB DESIGN TEAM'), close);

    const hero = el('section', 'vtb-hero');
    hero.append(el('h1', 'vtb-hero-title', 'VTB DESIGN TEAM'));

    const printsSection = createSection('PRINTS', `${PRINT_SERIES.length} SERIES`);
    const printGrid = el('div', 'vtb-grid');
    PRINT_SERIES.forEach((series) => printGrid.append(createPrintCard(series)));
    printsSection.append(printGrid);

    const merchSection = createSection('MERCH', `${MERCH.length} ITEMS`);
    const merchGrid = el('div', 'vtb-grid');
    MERCH.forEach((item) => merchGrid.append(createImageCard(item, firstIndexFor(item))));
    merchSection.append(merchGrid);

    const adSection = createSection('ADVERTISING', `${ADS.length} ITEMS`);
    const adGrid = el('div', 'vtb-ad-grid');
    ADS.filter((item) => item.type === 'main').forEach((item) => adGrid.append(createImageCard(item, firstIndexFor(item))));
    const billboardGrid = el('div', 'vtb-billboard-grid');
    ADS.filter((item) => item.type === 'billboard').forEach((item) => billboardGrid.append(createImageCard(item, firstIndexFor(item))));
    adSection.append(adGrid, billboardGrid);

    inner.append(head, hero, printsSection, merchSection, adSection);
    modal.append(inner);
    document.body.append(modal);
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    if (!card) return;
    const title = card.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'VTB DESIGN TEAM') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openModal();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (lightbox) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopImmediatePropagation();
        stepLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopImmediatePropagation();
        stepLightbox(1);
      }
      return;
    }
    if (modal && event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeModal();
    }
  }, true);

  injectStyles();
})();