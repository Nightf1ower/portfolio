(() => {
  if (window.__postersGalleryV1) return;
  window.__postersGalleryV1 = true;

  const VERSION = 'posters-1';
  const ROOT = '/works/posters';

  const italo = Array.from({ length: 9 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const extension = index < 3 ? 'png' : 'jpg';
    return {
      src: `${ROOT}/italo-poster-${number}.${extension}?v=${VERSION}`,
      alt: `Italo poster ${number}`,
      group: 'italo',
    };
  });

  const soc = Array.from({ length: 6 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return {
      id: number,
      images: [
        { src: `${ROOT}/soc-poster-${number}.jpg?v=${VERSION}`, alt: `SOC poster ${number}` },
        { src: `${ROOT}/soc-poster-${number}-variant.jpg?v=${VERSION}`, alt: `SOC poster ${number} variant` },
        { src: `${ROOT}/soc-poster-${number}-scetch.jpg?v=${VERSION}`, alt: `SOC poster ${number} sketch` },
      ],
    };
  });

  const flawa = Array.from({ length: 2 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return {
      src: `${ROOT}/flawa-poster-${number}.jpg?v=${VERSION}`,
      alt: `Flawa poster ${number}`,
      group: 'flawa',
    };
  });

  const lightboxItems = [
    ...italo,
    ...soc.flatMap((series) => series.images),
    ...flawa,
  ];

  let modal = null;
  let lightbox = null;
  let activeIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => language() === 'ru'
    ? {
        close: 'ЗАКРЫТЬ',
        title: 'POSTERS',
        subtitle: 'ПОСТЕР-ДИЗАЙН',
        open: 'ОТКРЫТЬ ПРОЕКТ',
        italo: 'ITALO POSTERS',
        soc: 'SOC POSTERS',
        flawa: 'FLAWA POSTERS',
        socHint: 'НАВЕДИТЕ НА ПОСТЕР, ЧТОБЫ УВИДЕТЬ ВАРИАНТЫ И ЭСКИЗ',
      }
    : {
        close: 'CLOSE',
        title: 'POSTERS',
        subtitle: 'POSTER DESIGN',
        open: 'OPEN PROJECT',
        italo: 'ITALO POSTERS',
        soc: 'SOC POSTERS',
        flawa: 'FLAWA POSTERS',
        socHint: 'HOVER A POSTER TO VIEW VARIANTS AND SKETCH',
      };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  function injectStyles() {
    if (document.getElementById('posters-gallery-style')) return;
    const style = el('style');
    style.id = 'posters-gallery-style';
    style.textContent = `
      html:has(.posters-modal), body:has(.posters-modal) { overflow: hidden !important; background: #f3f2ef !important; }
      .posters-modal {
        position: fixed; inset: 0; z-index: 630; overflow-y: auto; overflow-x: hidden;
        width: 100vw; height: 100vh; height: 100dvh; min-height: 100svh;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(5rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #f3f2ef; color: #050505; overscroll-behavior: contain;
      }
      .posters-inner { width: min(100%, 88rem); margin: 0 auto; }
      .posters-head {
        position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between;
        gap: 1rem; padding: .7rem 0 1rem; border-bottom: 1px solid rgba(5,5,5,.28);
        background: rgba(243,242,239,.94); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      }
      .posters-label, .posters-close {
        margin: 0; border: 0; background: #050505; color: #fff; padding: .68rem 1rem;
        font: 900 .68rem/1 Arial, Helvetica, sans-serif; letter-spacing: .27em; text-transform: uppercase;
      }
      .posters-close { cursor: pointer; }
      .posters-hero { padding: clamp(3.5rem, 9vw, 8rem) 0 clamp(3rem, 7vw, 6rem); }
      .posters-title {
        margin: 0; font-size: clamp(4.5rem, 15vw, 13rem); font-weight: 900; line-height: .76;
        letter-spacing: -.1em; text-transform: uppercase;
      }
      .posters-subtitle {
        margin: 1.4rem 0 0; font: 900 .72rem/1.2 Arial, Helvetica, sans-serif;
        letter-spacing: .32em; text-transform: uppercase; color: rgba(5,5,5,.55);
      }
      .posters-section { border-top: 1px solid rgba(5,5,5,.25); padding: clamp(2rem, 5vw, 4rem) 0 clamp(4rem, 8vw, 7rem); }
      .posters-section-title {
        margin: 0 0 1.7rem; font-size: clamp(3.4rem, 10vw, 8.5rem); font-weight: 900; line-height: .82;
        letter-spacing: -.085em; text-transform: uppercase;
      }
      .posters-hint {
        margin: -1rem 0 1.8rem; max-width: 48rem; font: 900 .66rem/1.4 Arial, Helvetica, sans-serif;
        letter-spacing: .25em; text-transform: uppercase; color: rgba(5,5,5,.48);
      }
      .posters-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 1rem; align-items: start; }
      .posters-card {
        position: relative; display: block; width: 100%; margin: 0; padding: 0; border: 0;
        background: transparent; cursor: zoom-in; overflow: hidden;
      }
      .posters-card > img { display: block; width: 100%; height: auto; object-fit: contain; background: #fff; }
      .posters-soc-card { aspect-ratio: 1 / 1; background: #fff; }
      .posters-soc-card > img {
        position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;
        opacity: 0; transition: opacity .18s linear;
      }
      .posters-soc-card > img.is-active { opacity: 1; }
      .posters-light {
        position: fixed; inset: 0; z-index: 970000; display: grid; grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center; gap: clamp(.5rem, 2vw, 1.25rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0,0,0,.97); color: #fff; touch-action: none;
      }
      .posters-light-stage { min-width: 0; height: calc(100dvh - 2rem); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .posters-light-image { display: block; max-width: 100%; max-height: 92dvh; width: auto; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
      .posters-light-nav, .posters-light-close {
        border: 1px solid rgba(255,255,255,.72); background: #050505; color: #fff; cursor: pointer;
        font: 900 1.5rem/1 Arial, Helvetica, sans-serif;
      }
      .posters-light-nav { width: 3.3rem; height: 3.3rem; }
      .posters-light-close {
        position: absolute; top: max(1rem, env(safe-area-inset-top)); right: max(1rem, env(safe-area-inset-right));
        padding: .72rem .95rem; font-size: .68rem; letter-spacing: .2em;
      }
      .posters-light-count {
        position: absolute; left: 50%; bottom: max(1rem, env(safe-area-inset-bottom)); transform: translateX(-50%);
        margin: 0; padding: .45rem .7rem; background: #fff; color: #050505;
        font: 900 .65rem/1 Arial, Helvetica, sans-serif; letter-spacing: .18em;
      }
      @media (max-width: 920px) { .posters-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
      @media (hover: none), (pointer: coarse), (max-width: 640px) {
        .posters-grid { grid-template-columns: 1fr; gap: .8rem; }
        .posters-hint { display: none; }
        .posters-light { grid-template-columns: 1fr; padding: max(.75rem, env(safe-area-inset-top)) max(.75rem, env(safe-area-inset-right)) max(.75rem, env(safe-area-inset-bottom)) max(.75rem, env(safe-area-inset-left)); }
        .posters-light-nav { display: none !important; }
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
    if (!lightbox) return;
    const item = lightboxItems[activeIndex];
    const image = lightbox.querySelector('.posters-light-image');
    const count = lightbox.querySelector('.posters-light-count');
    image.src = item.src;
    image.alt = item.alt;
    count.textContent = `${activeIndex + 1} / ${lightboxItems.length}`;
  }

  function stepLightbox(amount) {
    activeIndex = (activeIndex + amount + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  }

  function openLightbox(item) {
    closeLightbox();
    activeIndex = Math.max(0, lightboxItems.findIndex((entry) => entry.src === item.src));

    const overlay = el('div', 'posters-light');
    const previous = el('button', 'posters-light-nav posters-light-prev', '←');
    const next = el('button', 'posters-light-nav posters-light-next', '→');
    const close = el('button', 'posters-light-close', copy().close);
    const stage = el('div', 'posters-light-stage');
    const image = el('img', 'posters-light-image');
    const count = el('p', 'posters-light-count');

    previous.type = next.type = close.type = 'button';
    previous.setAttribute('aria-label', 'Previous image');
    next.setAttribute('aria-label', 'Next image');
    close.setAttribute('aria-label', 'Close image');
    image.draggable = false;

    previous.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    close.onclick = closeLightbox;
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
    overlay.append(previous, stage, next, close, count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function createPlainCard(item, eager = false) {
    const card = el('button', 'posters-card');
    const image = el('img');
    card.type = 'button';
    card.setAttribute('aria-label', item.alt);
    image.src = item.src;
    image.alt = item.alt;
    image.loading = eager ? 'eager' : 'lazy';
    image.decoding = 'async';
    card.append(image);
    card.onclick = () => openLightbox(item);
    return card;
  }

  function createSocCard(series) {
    const card = el('button', 'posters-card posters-soc-card');
    card.type = 'button';
    card.setAttribute('aria-label', `SOC poster ${series.id}`);
    let index = 0;
    let timer = null;

    series.images.forEach((item, imageIndex) => {
      const image = el('img', imageIndex === 0 ? 'is-active' : '');
      image.src = item.src;
      image.alt = item.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      card.append(image);
    });

    const show = (nextIndex) => {
      index = nextIndex;
      [...card.children].forEach((image, imageIndex) => image.classList.toggle('is-active', imageIndex === index));
    };

    card.addEventListener('mouseenter', () => {
      if (matchMedia('(hover: none), (pointer: coarse)').matches) return;
      window.clearInterval(timer);
      show(1);
      timer = window.setInterval(() => show((index + 1) % series.images.length), 850);
    });
    card.addEventListener('mouseleave', () => {
      window.clearInterval(timer);
      timer = null;
      show(0);
    });
    card.onclick = () => openLightbox(series.images[index] || series.images[0]);
    return card;
  }

  function createSection(title, items, mode, hint = '') {
    const section = el('section', 'posters-section');
    const heading = el('h3', 'posters-section-title', title);
    const grid = el('div', 'posters-grid');
    section.append(heading);
    if (hint) section.append(el('p', 'posters-hint', hint));

    items.forEach((item, index) => {
      grid.append(mode === 'soc' ? createSocCard(item) : createPlainCard(item, mode === 'italo' && index < 6));
    });
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
      createSection(text.italo, italo, 'italo'),
      createSection(text.soc, soc, 'soc', text.socHint),
      createSection(text.flawa, flawa, 'flawa'),
    );
    overlay.append(inner);
    document.body.append(overlay);
    modal = overlay;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    overlay.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1 || overlay.scrollTop > 5 || lightbox) return;
      const touch = event.touches[0];
      if (touch.clientY > Math.min(190, innerHeight * .22)) return;
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = performance.now();
    }, { passive: true });
    overlay.addEventListener('touchend', (event) => {
      if (!startTime || !event.changedTouches.length || overlay.scrollTop > 8 || lightbox) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const elapsed = performance.now() - startTime;
      startTime = 0;
      if (dy > 105 && Math.abs(dy) > Math.abs(dx) * 1.25 && elapsed < 1100) closeModal();
    }, { passive: true });
  }

  function findCard() {
    return [...document.querySelectorAll('#works article, #works button')]
      .find((card) => card.querySelector('h3')?.textContent?.trim().toUpperCase() === 'POSTERS') || null;
  }

  function enhanceCard() {
    const card = findCard();
    if (!card) return false;
    card.dataset.postersReady = 'true';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', copy().open);
    card.style.cursor = 'pointer';
    const placeholder = [...card.querySelectorAll('div')].find((node) =>
      /^(визуальный плейсхолдер|placeholder visual|открыть проект|open project)$/i.test(node.textContent?.trim() || '')
    );
    if (placeholder) placeholder.textContent = copy().open;
    return true;
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    if (card?.querySelector('h3')?.textContent?.trim().toUpperCase() === 'POSTERS') {
      event.preventDefault();
      openModal();
      return;
    }
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      window.setTimeout(enhanceCard, 0);
      window.setTimeout(enhanceCard, 120);
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (lightbox) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); event.stopImmediatePropagation(); stepLightbox(-1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); event.stopImmediatePropagation(); stepLightbox(1); }
      return;
    }
    const card = event.target.closest?.('#works article, #works button');
    if (card?.querySelector('h3')?.textContent?.trim().toUpperCase() === 'POSTERS' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openModal();
    }
  }, true);

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    if (enhanceCard() || attempts >= 30) window.clearInterval(retry);
  }, 120);
  window.addEventListener('load', enhanceCard);
  enhanceCard();
})();