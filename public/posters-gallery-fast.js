(() => {
  if (window.__postersGalleryV1) return;
  window.__postersGalleryV1 = true;
  window.__postersGalleryFastV1 = true;

  const VERSION = 'posters-fast-1';
  const ROOT = '/works/posters';

  const italo = Array.from({ length: 18 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const extension = index < 3 ? 'png' : 'jpg';
    return {
      src: `${ROOT}/italo-poster-${number}.${extension}?v=${VERSION}`,
      alt: `Italo poster ${number}`,
    };
  });

  const flawa = Array.from({ length: 3 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return {
      src: `${ROOT}/flawa-poster-${number}.jpg?v=${VERSION}`,
      alt: `Flawa poster ${number}`,
    };
  });

  const allImages = [...italo, ...flawa];
  let modal = null;
  let lightbox = null;
  let activeIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const copy = () => language() === 'ru'
    ? {
        close: 'ЗАКРЫТЬ',
        title: 'POSTERS',
        subtitle: 'ПОСТЕР-ДИЗАЙН',
        open: 'ОТКРЫТЬ ПРОЕКТ',
        italo: 'ITALO POSTERS',
        flawa: 'FLAWA POSTERS',
      }
    : {
        close: 'CLOSE',
        title: 'POSTERS',
        subtitle: 'POSTER DESIGN',
        open: 'OPEN PROJECT',
        italo: 'ITALO POSTERS',
        flawa: 'FLAWA POSTERS',
      };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function injectStyles() {
    document.getElementById('posters-gallery-style')?.remove();
    document.getElementById('posters-final-layout-style')?.remove();

    const style = el('style');
    style.id = 'posters-gallery-style';
    style.textContent = `
      html:has(.posters-modal), body:has(.posters-modal) {
        overflow: hidden !important;
        background: #f3f2ef !important;
      }
      .posters-modal {
        position: fixed;
        inset: 0;
        z-index: 630;
        width: 100vw;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(5rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #f3f2ef;
        color: #050505;
        overscroll-behavior: contain;
      }
      .posters-inner { width: 100%; max-width: none; margin: 0 auto; }
      .posters-head {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .7rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.28);
        background: rgba(243,242,239,.94);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .posters-label, .posters-close {
        margin: 0;
        border: 0;
        padding: .68rem 1rem;
        background: #050505;
        color: #fff;
        font: 900 .68rem/1 Arial, Helvetica, sans-serif;
        letter-spacing: .27em;
        text-transform: uppercase;
      }
      .posters-close { cursor: pointer; }
      .posters-hero { padding: clamp(3.5rem, 9vw, 8rem) 0 clamp(3rem, 7vw, 6rem); }
      .posters-title {
        width: 100%;
        max-width: none;
        margin: 0;
        font-size: clamp(4.5rem, 15vw, 13rem);
        font-weight: 900;
        line-height: .86;
        letter-spacing: .018em;
        text-transform: uppercase;
      }
      .posters-subtitle {
        width: 100%;
        max-width: none;
        margin: 1.4rem 0 0;
        font: 900 .72rem/1.3 Arial, Helvetica, sans-serif;
        letter-spacing: .32em;
        text-transform: uppercase;
        color: rgba(5,5,5,.55);
      }
      .posters-section {
        content-visibility: auto;
        contain-intrinsic-size: 1px 1000px;
        border-top: 1px solid rgba(5,5,5,.25);
        padding: clamp(4rem, 7vw, 7rem) 0;
      }
      .posters-section-title {
        width: 100%;
        max-width: none;
        margin: 0 0 clamp(2rem,4vw,3.5rem);
        font-size: clamp(3.4rem, 10vw, 8.5rem);
        font-weight: 900;
        line-height: .9;
        letter-spacing: .025em;
        text-transform: uppercase;
      }
      .posters-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0,1fr));
        gap: 1rem;
        align-items: start;
      }
      .posters-card {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: zoom-in;
        overflow: visible;
      }
      .posters-card img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        object-fit: contain;
      }
      .posters-light {
        position: fixed;
        inset: 0;
        z-index: 970000;
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: clamp(.5rem,2vw,1.25rem);
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
      }
      .posters-light-stage {
        min-width: 0;
        height: calc(100dvh - 2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .posters-light-image {
        display: block;
        max-width: 100%;
        max-height: 92dvh;
        width: auto;
        height: auto;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
      }
      .posters-light-nav, .posters-light-close {
        border: 1px solid rgba(255,255,255,.72);
        background: #050505;
        color: #fff;
        cursor: pointer;
        font: 900 1.5rem/1 Arial, Helvetica, sans-serif;
      }
      .posters-light-nav { width: 3.3rem; height: 3.3rem; }
      .posters-light-close {
        position: absolute;
        top: max(1rem,env(safe-area-inset-top));
        right: max(1rem,env(safe-area-inset-right));
        padding: .72rem .95rem;
        font-size: .68rem;
        letter-spacing: .2em;
      }
      .posters-light-count {
        position: absolute;
        left: 50%;
        bottom: max(1rem,env(safe-area-inset-bottom));
        transform: translateX(-50%);
        margin: 0;
        padding: .45rem .7rem;
        background: #fff;
        color: #050505;
        font: 900 .65rem/1 Arial, Helvetica, sans-serif;
        letter-spacing: .18em;
      }
      @media (max-width: 920px) {
        .posters-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
      }
      @media (max-width: 640px), (hover: none), (pointer: coarse) {
        .posters-grid { grid-template-columns: 1fr; gap: .8rem; }
        .posters-light { grid-template-columns: 1fr; padding: .75rem; }
        .posters-light-nav { display: none; }
        .posters-light-stage { height: calc(100dvh - 1.5rem); }
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
    if (!lightbox || !allImages.length) return;
    const item = allImages[activeIndex];
    const image = lightbox.querySelector('.posters-light-image');
    const count = lightbox.querySelector('.posters-light-count');
    image.src = item.src;
    image.alt = item.alt;
    count.textContent = `${activeIndex + 1} / ${allImages.length}`;
  }

  function stepLightbox(amount) {
    if (!allImages.length) return;
    activeIndex = (activeIndex + amount + allImages.length) % allImages.length;
    renderLightbox();
  }

  function openLightbox(item) {
    closeLightbox();
    activeIndex = Math.max(0, allImages.findIndex((entry) => entry.src === item.src));

    const overlay = el('div', 'posters-light');
    const previous = el('button', 'posters-light-nav', '←');
    const stage = el('div', 'posters-light-stage');
    const image = el('img', 'posters-light-image');
    const next = el('button', 'posters-light-nav', '→');
    const close = el('button', 'posters-light-close', copy().close);
    const count = el('p', 'posters-light-count');

    previous.type = next.type = close.type = 'button';
    image.draggable = false;
    image.decoding = 'async';
    try { image.fetchPriority = 'high'; } catch {}

    previous.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    close.onclick = closeLightbox;
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = closeLightbox;

    stage.append(image);
    overlay.append(previous, stage, next, close, count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function createCard(item, critical = false) {
    const card = el('button', 'posters-card');
    const image = el('img');
    card.type = 'button';
    card.setAttribute('aria-label', item.alt);

    if (critical) image.dataset.portfolioCritical = VERSION;
    image.loading = critical ? 'eager' : 'lazy';
    image.decoding = 'async';
    try { image.fetchPriority = critical ? 'high' : 'low'; } catch {}
    image.alt = item.alt;
    image.src = item.src;

    card.append(image);
    card.onclick = () => openLightbox(item);
    return card;
  }

  function createSection(title, items, criticalCount = 0) {
    const section = el('section', 'posters-section');
    const heading = el('h3', 'posters-section-title', title);
    const grid = el('div', 'posters-grid');
    section.append(heading);
    items.forEach((item, index) => grid.append(createCard(item, index < criticalCount)));
    section.append(grid);
    return section;
  }

  function openModal() {
    if (modal) return;
    injectStyles();
    lockPage();
    const text = copy();

    const overlay = el('div', 'posters-modal');
    const inner = el('div', 'posters-inner');
    const head = el('div', 'posters-head');
    const label = el('span', 'posters-label', text.title);
    const close = el('button', 'posters-close', text.close);
    const hero = el('div', 'posters-hero');
    const title = el('h2', 'posters-title', text.title);
    const subtitle = el('p', 'posters-subtitle', text.subtitle);

    close.type = 'button';
    close.onclick = closeModal;
    head.append(label, close);
    hero.append(title, subtitle);
    inner.append(
      head,
      hero,
      createSection(text.italo, italo, 2),
      createSection(text.flawa, flawa, 0),
    );
    overlay.append(inner);
    document.body.append(overlay);
    modal = overlay;
  }

  function findCard() {
    return [...document.querySelectorAll('#works article, #works button')]
      .find((card) => card.querySelector('h3')?.textContent?.trim().toUpperCase() === 'POSTERS') || null;
  }

  function enhanceCard() {
    const card = findCard();
    if (!card) return false;
    card.dataset.postersReady = VERSION;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', copy().open);
    card.style.cursor = 'pointer';
    return true;
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'POSTERS') {
      event.preventDefault();
      openModal();
    }
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
      return;
    }

    const card = event.target.closest?.('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'POSTERS' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openModal();
    }
  }, true);

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    if (enhanceCard() || attempts >= 40) window.clearInterval(retry);
  }, 120);

  window.addEventListener('load', enhanceCard);
  injectStyles();
  enhanceCard();
})();
