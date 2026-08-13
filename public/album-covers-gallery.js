(() => {
  if (window.__albumCoversGalleryV3) return;
  window.__albumCoversGalleryV3 = true;

  const VERSION = 'album-covers-3';
  const ORDER = ['10','01','08','11','14','12','04','02','03','05','07','06','13','09','14'];
  const IMAGES = ORDER.map((number, index) => ({
    src: `/works/album-covers/cover-${number}.jpg?v=${VERSION}`,
    alt: `Album cover ${number}`,
    number,
    position: index + 1,
  }));

  let modal = null;
  let lightbox = null;
  let activeIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => language() === 'ru'
    ? { close: 'ЗАКРЫТЬ', title: 'ALBUM COVERS', subtitle: 'ОБЛОЖКИ ДЛЯ МУЗЫКИ', open: 'ОТКРЫТЬ ПРОЕКТ' }
    : { close: 'CLOSE', title: 'ALBUM COVERS', subtitle: 'MUSIC COVER ARTWORKS', open: 'OPEN PROJECT' };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function injectStyles() {
    document.getElementById('album-covers-gallery-style')?.remove();
    const style = el('style');
    style.id = 'album-covers-gallery-style';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.album-covers-modal), body:has(.album-covers-modal) { overflow: hidden !important; }
      .album-covers-modal {
        position: fixed; inset: 0; z-index: 620; overflow-y: auto; overflow-x: hidden;
        width: 100vw; min-height: 100vh; min-height: 100dvh;
        background: #f4f4f2; color: #050505;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(4rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        overscroll-behavior: contain;
      }
      .album-covers-inner { width: min(100%, 84rem); margin: 0 auto; }
      .album-covers-head {
        position: sticky; top: 0; z-index: 8; display: flex; align-items: center; justify-content: space-between;
        gap: 1rem; padding: .75rem 0 1rem; border-bottom: 1px solid rgba(5,5,5,.28);
        background: rgba(244,244,242,.94); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      }
      .album-covers-label, .album-covers-close {
        border: 0; background: #050505; color: #fff; padding: .65rem 1rem;
        font: 900 .68rem/1 Arial, Helvetica, sans-serif; letter-spacing: .26em; text-transform: uppercase;
      }
      .album-covers-close { cursor: pointer; }
      .album-covers-hero { padding: clamp(3rem, 8vw, 7rem) 0 clamp(2.5rem, 5vw, 4.5rem); }
      .album-covers-title {
        margin: 0; font-size: clamp(4rem, 13vw, 12rem); font-weight: 900; line-height: .76;
        letter-spacing: -.095em; text-transform: uppercase;
      }
      .album-covers-subtitle {
        margin: 1.3rem 0 0; font: 900 .72rem/1.2 Arial, Helvetica, sans-serif;
        letter-spacing: .32em; text-transform: uppercase; color: rgba(5,5,5,.58);
      }
      .album-covers-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0,1fr));
        gap: 1rem;
        align-items: start;
      }
      .album-covers-card { margin: 0; padding: 0; border: 0; background: transparent; cursor: zoom-in; min-width: 0; }
      .album-covers-card img { display: block; width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: cover; background: #fff; }
      .album-covers-light {
        position: fixed; inset: 0; z-index: 960000; display: grid; grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center; gap: clamp(.5rem, 2vw, 1.25rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0,0,0,.97); color: #fff; touch-action: none;
      }
      .album-covers-light-stage { min-width: 0; height: calc(100dvh - 2rem); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .album-covers-light-image { display: block; max-width: 100%; max-height: 92dvh; width: auto; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
      .album-covers-light-nav, .album-covers-light-close {
        border: 1px solid rgba(255,255,255,.75); background: #050505; color: #fff; cursor: pointer;
        font: 900 1.45rem/1 Arial, Helvetica, sans-serif;
      }
      .album-covers-light-nav { width: 3.25rem; height: 3.25rem; }
      .album-covers-light-close { position: absolute; top: max(1rem, env(safe-area-inset-top)); right: max(1rem, env(safe-area-inset-right)); padding: .7rem .9rem; font-size: .68rem; letter-spacing: .2em; }
      .album-covers-light-count { position: absolute; left: 50%; bottom: max(1rem, env(safe-area-inset-bottom)); transform: translateX(-50%); margin: 0; padding: .45rem .65rem; background: #fff; color: #050505; font: 900 .65rem/1 Arial, Helvetica, sans-serif; letter-spacing: .18em; }
      @media (max-width: 640px) {
        .album-covers-grid { grid-template-columns: repeat(3, minmax(0,1fr)); gap: .45rem; }
        .album-covers-light { grid-template-columns: 1fr; padding: max(.75rem, env(safe-area-inset-top)) max(.75rem, env(safe-area-inset-right)) max(.75rem, env(safe-area-inset-bottom)) max(.75rem, env(safe-area-inset-left)); }
        .album-covers-light-nav { display: none !important; }
        .album-covers-light-stage { height: calc(100dvh - 1.5rem); }
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
    const image = lightbox.querySelector('.album-covers-light-image');
    const count = lightbox.querySelector('.album-covers-light-count');
    image.src = IMAGES[activeIndex].src;
    image.alt = IMAGES[activeIndex].alt;
    count.textContent = `${activeIndex + 1} / ${IMAGES.length}`;
  }

  function stepLightbox(amount) {
    activeIndex = (activeIndex + amount + IMAGES.length) % IMAGES.length;
    renderLightbox();
  }

  function openLightbox(index) {
    closeLightbox();
    activeIndex = index;
    const overlay = el('div', 'album-covers-light');
    const prev = el('button', 'album-covers-light-nav album-covers-light-prev', '←');
    const next = el('button', 'album-covers-light-nav album-covers-light-next', '→');
    const close = el('button', 'album-covers-light-close', copy().close);
    const stage = el('div', 'album-covers-light-stage');
    const image = el('img', 'album-covers-light-image');
    const count = el('p', 'album-covers-light-count');

    prev.type = next.type = close.type = 'button';
    prev.setAttribute('aria-label', 'Previous image');
    next.setAttribute('aria-label', 'Next image');
    close.setAttribute('aria-label', 'Close image');
    image.draggable = false;
    prev.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    close.onclick = (event) => { event.stopPropagation(); closeLightbox(); };
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
    overlay.append(prev, stage, next, close, count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function openModal() {
    if (modal) return;
    injectStyles();
    lockPage();

    const overlay = el('div', 'album-covers-modal');
    const inner = el('div', 'album-covers-inner');
    const head = el('div', 'album-covers-head');
    const label = el('span', 'album-covers-label', copy().title);
    const close = el('button', 'album-covers-close', copy().close);
    const hero = el('div', 'album-covers-hero');
    const title = el('h2', 'album-covers-title', copy().title);
    const subtitle = el('p', 'album-covers-subtitle', copy().subtitle);
    const grid = el('div', 'album-covers-grid');

    close.type = 'button';
    close.onclick = closeModal;
    hero.append(title, subtitle);
    head.append(label, close);

    IMAGES.forEach((item, index) => {
      const card = el('button', 'album-covers-card');
      const image = el('img');
      card.type = 'button';
      card.dataset.cover = item.number;
      card.setAttribute('aria-label', `${copy().title} ${item.number}`);
      image.src = item.src;
      image.alt = item.alt;
      image.loading = index < 6 ? 'eager' : 'lazy';
      image.decoding = 'async';
      card.append(image);
      card.onclick = () => openLightbox(index);
      grid.append(card);
    });

    inner.append(head, hero, grid);
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
      .find((card) => card.querySelector('h3')?.textContent?.trim().toUpperCase() === 'ALBUM COVERS') || null;
  }

  function enhanceCard() {
    const card = findCard();
    if (!card) return false;
    card.dataset.albumCoversReady = 'true';
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
    const card = event.target.closest?.('#works article, #works button');
    if (card?.querySelector('h3')?.textContent?.trim().toUpperCase() === 'ALBUM COVERS') {
      event.preventDefault();
      openModal();
      return;
    }
    if (event.target.closest?.('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(enhanceCard, 0);
      setTimeout(enhanceCard, 120);
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (lightbox) {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeLightbox(); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); stepLightbox(-1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); stepLightbox(1); }
      return;
    }
    const card = event.target.closest?.('#works article, #works button');
    if (card?.querySelector('h3')?.textContent?.trim().toUpperCase() === 'ALBUM COVERS' && (event.key === 'Enter' || event.key === ' ')) {
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