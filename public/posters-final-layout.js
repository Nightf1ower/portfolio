(() => {
  if (window.__postersFinalLayoutV1) return;
  window.__postersFinalLayoutV1 = true;

  const VERSION = 'posters-final-1';
  const ROOT = '/works/posters';

  const italo = Array.from({ length: 18 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const extension = index < 3 ? 'png' : 'jpg';
    return {
      src: `${ROOT}/italo-poster-${number}.${extension}?v=${VERSION}`,
      alt: `Italo poster ${number}`,
    };
  });

  const soc = Array.from({ length: 6 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return [
      { src: `${ROOT}/soc-poster-${number}.jpg?v=${VERSION}`, alt: `SOC poster ${number}` },
      { src: `${ROOT}/soc-poster-${number}-scetch.jpg?v=${VERSION}`, alt: `SOC poster ${number} sketch` },
      { src: `${ROOT}/soc-poster-${number}-variant.jpg?v=${VERSION}`, alt: `SOC poster ${number} variant` },
    ];
  }).flat();

  const flawa = Array.from({ length: 3 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return {
      src: `${ROOT}/flawa-poster-${number}.jpg?v=${VERSION}`,
      alt: `Flawa poster ${number}`,
    };
  });

  const allImages = [...italo, ...soc, ...flawa];
  let lightbox = null;
  let activeIndex = 0;

  function injectStyles() {
    if (document.getElementById('posters-final-layout-style')) return;
    const style = document.createElement('style');
    style.id = 'posters-final-layout-style';
    style.textContent = `
      .posters-section .posters-hint { display: none !important; }
      .posters-final-grid {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        align-items: start !important;
        gap: 1rem !important;
      }
      .posters-final-card {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        outline: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        overflow: visible !important;
        cursor: zoom-in !important;
      }
      .posters-final-card img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        outline: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        object-fit: contain !important;
      }
      @media (max-width: 920px) {
        .posters-final-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      }
      @media (max-width: 640px) {
        .posters-final-grid { grid-template-columns: 1fr !important; gap: .8rem !important; }
      }
    `;
    document.head.append(style);
  }

  function sectionByTitle(modal, title) {
    return [...modal.querySelectorAll('.posters-section')].find((section) =>
      section.querySelector('.posters-section-title')?.textContent?.trim().toUpperCase() === title
    ) || null;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
  }

  function renderLightbox() {
    if (!lightbox) return;
    const image = lightbox.querySelector('.posters-light-image');
    const counter = lightbox.querySelector('.posters-light-count');
    const item = allImages[activeIndex];
    image.src = item.src;
    image.alt = item.alt;
    counter.textContent = `${activeIndex + 1} / ${allImages.length}`;
  }

  function stepLightbox(amount) {
    activeIndex = (activeIndex + amount + allImages.length) % allImages.length;
    renderLightbox();
  }

  function openLightbox(item) {
    closeLightbox();
    activeIndex = Math.max(0, allImages.findIndex((entry) => entry.src === item.src));

    const overlay = document.createElement('div');
    overlay.className = 'posters-light';
    overlay.dataset.postersFinalLightbox = 'true';

    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'posters-light-nav posters-light-prev';
    previous.textContent = '←';
    previous.setAttribute('aria-label', 'Previous image');

    const stage = document.createElement('div');
    stage.className = 'posters-light-stage';

    const image = document.createElement('img');
    image.className = 'posters-light-image';
    image.draggable = false;
    stage.append(image);

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'posters-light-nav posters-light-next';
    next.textContent = '→';
    next.setAttribute('aria-label', 'Next image');

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'posters-light-close';
    close.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    close.setAttribute('aria-label', 'Close image');

    const counter = document.createElement('p');
    counter.className = 'posters-light-count';

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
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        stepLightbox(dx < 0 ? 1 : -1);
      } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        closeLightbox();
      }
    }, { passive: true });

    overlay.append(previous, stage, next, close, counter);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function createCard(item, eager = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'posters-final-card';
    button.setAttribute('aria-label', item.alt);

    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt;
    image.loading = eager ? 'eager' : 'lazy';
    image.decoding = 'async';

    button.append(image);
    button.onclick = () => openLightbox(item);
    return button;
  }

  function rebuildSection(section, items, eagerCount = 0) {
    if (!section) return;
    section.querySelector('.posters-hint')?.remove();
    const oldGrid = section.querySelector('.posters-grid, .posters-final-grid');
    const grid = document.createElement('div');
    grid.className = 'posters-grid posters-final-grid';
    items.forEach((item, index) => grid.append(createCard(item, index < eagerCount)));
    oldGrid?.replaceWith(grid);
  }

  function applyModal() {
    injectStyles();
    const modal = document.querySelector('.posters-modal');
    if (!modal || modal.dataset.postersFinalized === VERSION) return false;

    rebuildSection(sectionByTitle(modal, 'ITALO POSTERS'), italo, 6);
    rebuildSection(sectionByTitle(modal, 'SOC POSTERS'), soc, 0);
    rebuildSection(sectionByTitle(modal, 'FLAWA POSTERS'), flawa, 0);

    modal.dataset.postersFinalized = VERSION;
    return true;
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'POSTERS') {
      window.setTimeout(applyModal, 0);
      window.setTimeout(applyModal, 80);
      window.setTimeout(applyModal, 240);
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (!lightbox) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopImmediatePropagation();
      stepLightbox(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopImmediatePropagation();
      stepLightbox(1);
    }
  }, true);

  injectStyles();
  applyModal();
})();