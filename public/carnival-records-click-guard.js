(() => {
  if (window.__carnivalRecordsClickGuardV2) return;
  window.__carnivalRecordsClickGuardV2 = true;

  const LIGHTBOX_CLASS = 'cr-swipe-lightbox';
  const CONTROL_SELECTOR = [
    '.cr-close',
    '.cr-light-close',
    '.cr-nav',
    '.project-scroll-top',
    'a',
    'input',
    'select',
    'textarea',
  ].join(',');

  let overlay = null;
  let images = [];
  let index = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const normalize = (value) => {
    if (!value) return '';
    try { return new URL(value, location.href).href; }
    catch { return String(value); }
  };

  const unique = (values) => [...new Set(values.map(normalize).filter(Boolean))];

  function imageSource(image) {
    return image?.currentSrc || image?.getAttribute('src') || '';
  }

  function galleryImages(scope) {
    if (!scope) return [];

    const ordered = [];
    scope.querySelectorAll('.cr-card').forEach((card) => {
      card.querySelectorAll('.cr-img, img').forEach((image) => {
        const source = imageSource(image);
        if (source) ordered.push(source);
      });
    });

    return unique(ordered);
  }

  function galleryForCard(card) {
    const section = card.closest('.cr-section');
    let result = galleryImages(section);

    if (result.length < 2) {
      result = galleryImages(card.closest('.cr-modal'));
    }

    return result;
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
    overlay?.remove();
    overlay = null;
    images = [];
    index = 0;
    unlockPage();
  }

  function draw() {
    if (!overlay || !images.length) return;

    const image = overlay.querySelector('.cr-swipe-image');
    const counter = overlay.querySelector('.cr-swipe-counter');
    image.src = images[index];
    counter.textContent = `${index + 1} / ${images.length}`;

    const nextImage = new Image();
    nextImage.src = images[(index + 1) % images.length];
  }

  function step(amount) {
    if (images.length < 2) return;
    index = (index + amount + images.length) % images.length;
    draw();
  }

  function openLightbox(items, startSource = '') {
    closeLightbox();
    images = unique(items);
    if (!images.length) return;

    const normalizedStart = normalize(startSource);
    const startIndex = images.indexOf(normalizedStart);
    index = startIndex >= 0 ? startIndex : 0;

    const root = document.createElement('div');
    root.className = `${LIGHTBOX_CLASS}${images.length < 2 ? ' is-single' : ''}`;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML = `
      <button type="button" class="cr-swipe-nav cr-swipe-prev" aria-label="Previous image">←</button>
      <div class="cr-swipe-stage">
        <img class="cr-swipe-image" alt="" draggable="false">
      </div>
      <button type="button" class="cr-swipe-nav cr-swipe-next" aria-label="Next image">→</button>
      <button type="button" class="cr-swipe-close">${document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE'}</button>
      <p class="cr-swipe-counter"></p>
    `;

    root.querySelector('.cr-swipe-prev').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      step(-1);
    });

    root.querySelector('.cr-swipe-next').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      step(1);
    });

    root.querySelector('.cr-swipe-close').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeLightbox();
    });

    const stage = root.querySelector('.cr-swipe-stage');
    stage.addEventListener('click', (event) => event.stopPropagation());

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
        step(dx < 0 ? 1 : -1);
      } else if (dy >= 100 && Math.abs(dy) > Math.abs(dx) * 1.25) {
        event.preventDefault();
        closeLightbox();
      }
    });

    stage.addEventListener('pointercancel', () => {
      pointerActive = false;
    });

    root.addEventListener('click', (event) => {
      if (event.target === root) closeLightbox();
    });

    document.body.append(root);
    overlay = root;
    lockPage();
    draw();
  }

  document.getElementById('carnival-records-swipe-lightbox-style')?.remove();
  const style = document.createElement('style');
  style.id = 'carnival-records-swipe-lightbox-style';
  style.textContent = `
    .${LIGHTBOX_CLASS} {
      position: fixed;
      inset: 0;
      z-index: 2200000;
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

    .cr-swipe-stage {
      min-width: 0;
      height: calc(100dvh - 2rem);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: grab;
      touch-action: none;
    }

    .cr-swipe-stage:active { cursor: grabbing; }

    .cr-swipe-image {
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

    .cr-swipe-nav,
    .cr-swipe-close {
      border: 1px solid rgba(255, 255, 255, .86);
      border-radius: 0;
      background: #050505;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 900;
      cursor: pointer;
    }

    .cr-swipe-nav {
      width: 3.35rem;
      height: 3.35rem;
      font-size: 1.5rem;
    }

    .cr-swipe-close {
      position: absolute;
      top: max(1rem, env(safe-area-inset-top));
      right: max(1rem, env(safe-area-inset-right));
      padding: .72rem .95rem;
      font-size: .68rem;
      letter-spacing: .2em;
      text-transform: uppercase;
    }

    .cr-swipe-counter {
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

    .${LIGHTBOX_CLASS}.is-single .cr-swipe-nav {
      visibility: hidden;
      pointer-events: none;
    }

    @media (max-width: 700px), (hover: none), (pointer: coarse) {
      .${LIGHTBOX_CLASS} {
        grid-template-columns: 1fr;
        padding: .75rem;
      }

      .cr-swipe-nav { display: none !important; }
      .cr-swipe-stage { height: calc(100dvh - 1.5rem); }
    }
  `;
  document.head.append(style);

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(`.${LIGHTBOX_CLASS}`)) return;

    const modal = event.target.closest('.cr-modal');
    if (!modal) return;

    if (event.target.closest(CONTROL_SELECTOR)) return;

    const card = event.target.closest('.cr-card');
    const clickedImage = event.target.closest('.cr-img, .cr-card img');

    if (card && clickedImage) {
      const gallery = galleryForCard(card);
      const startSource = imageSource(clickedImage)
        || imageSource(card.querySelector('.cr-img.active, .cr-img, img'));

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openLightbox(gallery, startSource);
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (!overlay) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopImmediatePropagation();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopImmediatePropagation();
      step(1);
    }
  }, true);
})();