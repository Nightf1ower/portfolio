(() => {
  if (window.__carnivalRecordsNativeLayoutV4) return;
  window.__carnivalRecordsNativeLayoutV4 = true;

  const style = document.createElement('style');
  style.id = 'carnival-records-native-layout-style';
  style.textContent = `
    .cr-modal .cr-card-label {
      display: none !important;
    }

    .cr-subgroup-album-covers .cr-grid,
    .cr-subgroup-merchalbum-wide .cr-grid {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: clamp(1rem, 2.5vw, 2rem) !important;
    }

    .cr-subgroup-album-covers .cr-card,
    .cr-subgroup-merchalbum-wide .cr-card,
    .cr-section-merch-clean .cr-card {
      width: 100% !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-subgroup-album-covers .cr-media,
    .cr-subgroup-merchalbum-wide .cr-media,
    .cr-section-merch-clean .cr-media {
      display: block !important;
      width: 100% !important;
      aspect-ratio: auto !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-subgroup-album-covers .cr-img,
    .cr-subgroup-merchalbum-wide .cr-img,
    .cr-section-merch-clean .cr-img {
      position: static !important;
      inset: auto !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      max-width: 100% !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      object-fit: contain !important;
      background: transparent !important;
      opacity: 1 !important;
    }

    .cr-subgroup-vinyl-grid .cr-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 1rem !important;
    }

    .cr-subgroup-vinyl-grid .cr-card {
      width: 100% !important;
    }

    .cr-section-merch-clean .cr-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 1rem !important;
      align-items: start !important;
    }

    .cr-section-album-curated .cr-subgroup + .cr-subgroup {
      margin-top: clamp(4rem, 8vw, 7rem) !important;
    }

    .cr-native-gallery {
      position: fixed;
      inset: 0;
      z-index: 2600000;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: clamp(.65rem, 2vw, 1.35rem);
      padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
      background: rgba(0, 0, 0, .97);
      color: #fff;
      touch-action: none;
      overscroll-behavior: none;
    }

    .cr-native-stage {
      min-width: 0;
      height: calc(100dvh - 2rem);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: grab;
      touch-action: none;
    }

    .cr-native-stage:active { cursor: grabbing; }

    .cr-native-image {
      display: block;
      max-width: 100%;
      max-height: 92dvh;
      width: auto;
      height: auto;
      object-fit: contain;
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
    }

    .cr-native-nav,
    .cr-native-close {
      border: 1px solid rgba(255, 255, 255, .86);
      border-radius: 0;
      background: #050505;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 900;
      cursor: pointer;
    }

    .cr-native-nav {
      width: 3.35rem;
      height: 3.35rem;
      font-size: 1.5rem;
    }

    .cr-native-close {
      position: absolute;
      top: max(1rem, env(safe-area-inset-top));
      right: max(1rem, env(safe-area-inset-right));
      padding: .72rem .95rem;
      font-size: .68rem;
      letter-spacing: .2em;
      text-transform: uppercase;
    }

    .cr-native-counter {
      position: absolute;
      left: 50%;
      bottom: max(1rem, env(safe-area-inset-bottom));
      transform: translateX(-50%);
      margin: 0;
      padding: .45rem .68rem;
      background: #fff;
      color: #050505;
      font: 900 .65rem/1 Arial, Helvetica, sans-serif;
      letter-spacing: .18em;
    }

    @media (max-width: 900px) {
      .cr-subgroup-vinyl-grid .cr-grid,
      .cr-section-merch-clean .cr-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
    }

    @media (max-width: 700px), (hover: none), (pointer: coarse) {
      .cr-native-gallery {
        grid-template-columns: 1fr;
        padding: .75rem;
      }

      .cr-native-nav {
        display: none !important;
      }

      .cr-native-stage {
        height: calc(100dvh - 1.5rem);
      }
    }

    @media (max-width: 600px) {
      .cr-subgroup-vinyl-grid .cr-grid,
      .cr-section-merch-clean .cr-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.getElementById(style.id)?.remove();
  document.head.append(style);

  const GROUP_TITLES = new Set([
    'ALBUM ARTWORK',
    'ОБЛОЖКИ',
    'TRACKLIST',
    'ТРЕКЛИСТ',
    'VINYL GATEFOLD',
    'РАЗВОРОТ ВИНИЛА',
    'VINYL',
    'ВИНИЛ',
    'RECORDS',
    'ПЛАСТИНКИ',
  ]);

  let gallery = null;
  let galleryImages = [];
  let galleryIndex = 0;
  let oldBodyOverflow = '';
  let oldHtmlOverflow = '';

  const normalize = (value) => {
    if (!value) return '';
    try { return new URL(value, location.href).href; }
    catch { return String(value); }
  };

  const unique = (values) => [...new Set(values.map(normalize).filter(Boolean))];

  function findSection(modal, title) {
    return [...modal.querySelectorAll('.cr-h')]
      .find((heading) => heading.textContent?.trim().toUpperCase() === title)
      ?.closest('.cr-section') || null;
  }

  function closeGallery() {
    gallery?.remove();
    gallery = null;
    galleryImages = [];
    galleryIndex = 0;
    document.body.style.overflow = oldBodyOverflow;
    document.documentElement.style.overflow = oldHtmlOverflow;
  }

  function drawGallery() {
    if (!gallery || !galleryImages.length) return;
    gallery.querySelector('.cr-native-image').src = galleryImages[galleryIndex];
    gallery.querySelector('.cr-native-counter').textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  }

  function stepGallery(amount) {
    if (galleryImages.length < 2) return;
    galleryIndex = (galleryIndex + amount + galleryImages.length) % galleryImages.length;
    drawGallery();
  }

  function openGallery(images, startIndex = 0) {
    closeGallery();
    galleryImages = unique(images);
    if (!galleryImages.length) return;
    galleryIndex = Math.max(0, Math.min(startIndex, galleryImages.length - 1));

    const root = document.createElement('div');
    root.className = 'cr-native-gallery';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML = `
      <button type="button" class="cr-native-nav cr-native-prev" aria-label="Previous image">←</button>
      <div class="cr-native-stage"><img class="cr-native-image" alt="" draggable="false"></div>
      <button type="button" class="cr-native-nav cr-native-next" aria-label="Next image">→</button>
      <button type="button" class="cr-native-close">${document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE'}</button>
      <p class="cr-native-counter"></p>
    `;

    root.querySelector('.cr-native-prev').onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      stepGallery(-1);
    };
    root.querySelector('.cr-native-next').onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      stepGallery(1);
    };
    root.querySelector('.cr-native-close').onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeGallery();
    };

    const stage = root.querySelector('.cr-native-stage');
    stage.onclick = (event) => event.stopPropagation();

    let startX = 0;
    let startY = 0;
    let pointerActive = false;

    stage.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary) return;
      pointerActive = true;
      startX = event.clientX;
      startY = event.clientY;
      stage.setPointerCapture?.(event.pointerId);
    });

    stage.addEventListener('pointerup', (event) => {
      if (!pointerActive || !event.isPrimary) return;
      pointerActive = false;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.1) {
        event.preventDefault();
        stepGallery(dx < 0 ? 1 : -1);
      }
    });

    stage.addEventListener('pointercancel', () => {
      pointerActive = false;
    });

    root.onclick = (event) => {
      if (event.target === root) closeGallery();
    };

    oldBodyOverflow = document.body.style.overflow;
    oldHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.append(root);
    gallery = root;
    drawGallery();
  }

  function cardSource(card) {
    const image = card.querySelector('.cr-img.active, .cr-img, img');
    return normalize(image?.currentSrc || image?.getAttribute('src') || '');
  }

  function patchAlbumGalleries(modal = document.querySelector('.cr-modal')) {
    if (!modal) return;

    modal.querySelectorAll('.cr-subgroup').forEach((subgroup) => {
      const title = subgroup.querySelector(':scope > .cr-subtitle')?.textContent?.trim().toUpperCase() || '';
      if (!GROUP_TITLES.has(title)) return;

      const cards = [...subgroup.querySelectorAll('.cr-grid > .cr-card')];
      const images = unique(cards.map(cardSource));
      if (!cards.length || images.length < 2) return;

      cards.forEach((card, cardIndex) => {
        card.dataset.crNativeGalleryV4 = title;
        card.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          const currentCards = [...subgroup.querySelectorAll('.cr-grid > .cr-card')];
          const currentImages = unique(currentCards.map(cardSource));
          const startSource = cardSource(card);
          const start = Math.max(0, currentImages.indexOf(startSource));
          openGallery(currentImages, start >= 0 ? start : cardIndex);
        };
      });
    });
  }

  function apply(modal = document.querySelector('.cr-modal')) {
    if (!modal) return;

    if (modal.dataset.carnivalCuratedV4 !== 'true') {
      const albumSection = findSection(modal, 'ALBUM');
      if (albumSection) {
        albumSection.classList.add('cr-section-album-curated');
        const subgroups = [...albumSection.querySelectorAll('.cr-subgroup')];

        subgroups[0]?.classList.add('cr-subgroup-album-covers');
        subgroups[1]?.classList.add('cr-subgroup-vinyl-grid');
        subgroups[2]?.classList.add('cr-subgroup-merchalbum-wide');

        const vinylCards = [...(subgroups[1]?.querySelectorAll('.cr-card') || [])];
        vinylCards.slice(6).forEach((card) => card.remove());
      }

      const merchSection = findSection(modal, 'MERCH');
      if (merchSection) {
        merchSection.classList.add('cr-section-merch-clean');
        const merchCards = [...merchSection.querySelectorAll('.cr-card')];
        merchCards[0]?.remove();
      }

      modal.dataset.carnivalCuratedV4 = 'true';
    }

    patchAlbumGalleries(modal);
  }

  document.addEventListener('keydown', (event) => {
    if (!gallery) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeGallery();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepGallery(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepGallery(1);
    }
  }, true);

  apply();

  let scheduled = false;
  const scheduleApply = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  };

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();
