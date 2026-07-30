(() => {
  if (window.__collagesGalleryV1) return;
  window.__collagesGalleryV1 = true;

  const VERSION = 'collages-gallery-1';
  const ROOT = '/works/collages';

  const COLLAGES = [
    'collage-1.webp',
    'collage-2.webp',
    'collage-3.webp',
    'collage-4.webp',
    'collage-5.webp',
    'collage-6.webp',
    'collage-7.webp',
    'collage-8.jpg',
    'collage-9.jpg',
    'collage-10.jpg',
  ].map((name, index) => ({
    src: `${ROOT}/collage/${name}?v=${VERSION}`,
    alt: `Collage ${index + 1}`,
  }));

  const COLLAGE_POSTERS = [
    'collage-poster-1.webp',
    'collage-poster-2.webp',
  ].map((name, index) => ({
    src: `${ROOT}/collage-poster/${name}?v=${VERSION}`,
    alt: `Collage poster ${index + 1}`,
  }));

  const DOTS = [
    'dots-1.webp',
    'dots-2.webp',
    'dots-3.webp',
  ].map((name, index) => ({
    src: `${ROOT}/dots/${name}?v=${VERSION}`,
    alt: `Dots ${index + 1}`,
  }));

  const ALL_ITEMS = [...COLLAGES, ...COLLAGE_POSTERS, ...DOTS];
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
    const old = document.getElementById('collages-gallery-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = el('style');
    style.id = 'collages-gallery-style';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.collages-modal), body:has(.collages-modal) {
        overflow: hidden !important;
        background: #fff !important;
      }
      .collages-modal {
        position: fixed;
        inset: 0;
        z-index: 655000;
        width: 100vw;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(5rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: #fff;
        color: #050505;
        overscroll-behavior: contain;
      }
      .collages-inner { width: min(100%,80rem); margin: 0 auto; }
      .collages-head {
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
      .collages-label, .collages-close, .collages-count {
        font-family: Arial,Helvetica,sans-serif;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .26em;
        text-transform: uppercase;
      }
      .collages-label { margin: 0; padding: .55rem .8rem; background: #050505; color: #fff; }
      .collages-close { border: 0; padding: .7rem 1rem; background: #050505; color: #fff; cursor: pointer; }
      .collages-hero { padding: clamp(5rem,12vw,10rem) 0 clamp(4rem,9vw,7rem); }
      .collages-hero-title {
        max-width: 11ch;
        margin: 0;
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(4rem,11vw,11rem);
        font-weight: 900;
        line-height: .76;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .collages-section { padding: clamp(3rem,7vw,6rem) 0; border-top: 1px solid rgba(5,5,5,.24); }
      .collages-section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
      .collages-title {
        margin: 0;
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(3.2rem,8vw,8rem);
        font-weight: 900;
        line-height: .8;
        letter-spacing: -.085em;
        text-transform: uppercase;
      }
      .collages-count { margin: 0; color: rgba(5,5,5,.48); white-space: nowrap; }
      .collages-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 1rem; align-items: start; }
      .collages-grid.is-posters { grid-template-columns: repeat(2,minmax(0,1fr)); }
      .collages-card {
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
      .collages-card img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        object-fit: contain;
      }
      .collages-light {
        position: fixed;
        inset: 0;
        z-index: 985000;
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: clamp(.5rem,2vw,1.25rem);
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
        touch-action: none;
      }
      .collages-light-stage { min-width: 0; height: calc(100dvh - 2rem); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .collages-light-image { display: block; max-width: 100%; max-height: 92dvh; width: auto; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
      .collages-light-close, .collages-light-nav {
        border: 1px solid rgba(255,255,255,.72);
        background: #050505;
        color: #fff;
        cursor: pointer;
        font-family: Arial,Helvetica,sans-serif;
        font-weight: 900;
      }
      .collages-light-close { position: absolute; top: max(1rem,env(safe-area-inset-top)); right: max(1rem,env(safe-area-inset-right)); padding: .72rem .95rem; font-size: .68rem; letter-spacing: .18em; }
      .collages-light-nav { width: 3.3rem; height: 3.3rem; font-size: 1.5rem; }
      .collages-light-count { position: absolute; left: 50%; bottom: max(1rem,env(safe-area-inset-bottom)); transform: translateX(-50%); margin: 0; padding: .45rem .7rem; background: #fff; color: #050505; font: 900 .65rem/1 Arial,Helvetica,sans-serif; letter-spacing: .18em; }
      @media (max-width: 900px) {
        .collages-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
      }
      @media (max-width: 560px), (hover: none), (pointer: coarse) {
        .collages-grid, .collages-grid.is-posters { grid-template-columns: 1fr; }
        .collages-section-head { display: block; }
        .collages-count { margin-top: .75rem; }
        .collages-light { grid-template-columns: 1fr; padding: max(.75rem,env(safe-area-inset-top)) max(.75rem,env(safe-area-inset-right)) max(.75rem,env(safe-area-inset-bottom)) max(.75rem,env(safe-area-inset-left)); }
        .collages-light-nav { display: none !important; }
        .collages-light-stage { height: calc(100dvh - 1.5rem); }
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
    const image = lightbox.querySelector('.collages-light-image');
    image.src = item.src;
    image.alt = item.alt;
    lightbox.querySelector('.collages-light-count').textContent = `${activeIndex + 1} / ${ALL_ITEMS.length}`;
  }

  function stepLightbox(amount) {
    activeIndex = (activeIndex + amount + ALL_ITEMS.length) % ALL_ITEMS.length;
    renderLightbox();
  }

  function openLightbox(index) {
    closeLightbox();
    activeIndex = Math.max(0, Math.min(index, ALL_ITEMS.length - 1));

    const overlay = el('div', 'collages-light');
    const close = el('button', 'collages-light-close', 'CLOSE');
    const previous = el('button', 'collages-light-nav', '←');
    const stage = el('div', 'collages-light-stage');
    const image = el('img', 'collages-light-image');
    const next = el('button', 'collages-light-nav', '→');
    const count = el('p', 'collages-light-count');
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

  function createImageCard(item) {
    const card = el('button', 'collages-card');
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
      openLightbox(firstIndexFor(item));
    };
    return card;
  }

  function createSection(title, items, className = '') {
    const section = el('section', 'collages-section');
    const head = el('div', 'collages-section-head');
    head.append(el('h2', 'collages-title', title), el('p', 'collages-count', `${items.length} ITEMS`));
    const grid = el('div', `collages-grid${className ? ` ${className}` : ''}`);
    items.forEach((item) => grid.append(createImageCard(item)));
    section.append(head, grid);
    return section;
  }

  function openModal() {
    injectStyles();
    closeModal();
    lockPage();

    modal = el('div', 'collages-modal');
    const inner = el('div', 'collages-inner');
    const head = el('div', 'collages-head');
    const close = el('button', 'collages-close', 'CLOSE');
    close.type = 'button';
    close.onclick = (event) => { event.stopPropagation(); closeModal(); };
    head.append(el('p', 'collages-label', 'COLLAGES (PHOTO EDIT)'), close);

    const hero = el('section', 'collages-hero');
    hero.append(el('h1', 'collages-hero-title', 'COLLAGES (PHOTO EDIT)'));

    inner.append(
      head,
      hero,
      createSection('COLLAGE', COLLAGES),
      createSection('COLLAGE POSTER', COLLAGE_POSTERS, 'is-posters'),
      createSection('DOTS', DOTS),
    );
    modal.append(inner);
    document.body.append(modal);
  }

  window.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const card = target?.closest('#works article, #works button');
    if (!card) return;
    const title = card.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'COLLAGES (PHOTO EDIT)') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openModal();
  }, true);

  window.addEventListener('keydown', (event) => {
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