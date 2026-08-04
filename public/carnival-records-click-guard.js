(() => {
  if (window.__carnivalRecordsClickGuardV4) return;
  window.__carnivalRecordsClickGuardV4 = true;

  const LIGHTBOX_CLASS = 'cr-group-lightbox';
  let overlay = null;
  let sources = [];
  let activeIndex = 0;
  let bodyOverflow = '';
  let htmlOverflow = '';

  const normalize = (value) => {
    if (!value) return '';
    try { return new URL(String(value), location.href).href; }
    catch { return String(value); }
  };

  const unique = (items) => [...new Set(items.map(normalize).filter(Boolean))];

  function imageSource(image) {
    return image?.currentSrc || image?.getAttribute('src') || '';
  }

  function firstCardImage(card) {
    return card?.querySelector('.cr-img.active, .cr-img, img') || null;
  }

  function allCardImages(card) {
    return unique([...card.querySelectorAll('.cr-img, img')].map(imageSource));
  }

  function subgroupImages(subgroup) {
    return unique([...subgroup.querySelectorAll(':scope .cr-card')]
      .map((card) => imageSource(firstCardImage(card))));
  }

  function sectionImages(section) {
    return unique([...section.querySelectorAll(':scope .cr-card')]
      .map((card) => imageSource(firstCardImage(card))));
  }

  function resolveGallery(card) {
    const subgroup = card.closest('.cr-subgroup');
    if (subgroup) {
      const grouped = subgroupImages(subgroup);
      if (grouped.length > 1) return grouped;
    }

    const own = allCardImages(card);
    if (own.length > 1) return own;

    const section = card.closest('.cr-section');
    const grouped = section ? sectionImages(section) : [];
    return grouped.length > 1 ? grouped : own;
  }

  function lockPage() {
    bodyOverflow = document.body.style.overflow;
    htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPage() {
    document.body.style.overflow = bodyOverflow;
    document.documentElement.style.overflow = htmlOverflow;
  }

  function closeLightbox() {
    overlay?.remove();
    overlay = null;
    sources = [];
    activeIndex = 0;
    unlockPage();
  }

  function draw() {
    if (!overlay || !sources.length) return;
    const image = overlay.querySelector('.cr-group-image');
    const counter = overlay.querySelector('.cr-group-counter');
    image.src = sources[activeIndex];
    counter.textContent = `${activeIndex + 1} / ${sources.length}`;
  }

  function step(amount) {
    if (sources.length < 2) return;
    activeIndex = (activeIndex + amount + sources.length) % sources.length;
    draw();
  }

  function openLightbox(items, startSource) {
    closeLightbox();
    document.querySelector('.cr-light')?.remove();
    document.querySelector('.psg-lightbox')?.remove();

    sources = unique(items);
    if (!sources.length) return;

    const start = sources.indexOf(normalize(startSource));
    activeIndex = start >= 0 ? start : 0;

    const root = document.createElement('div');
    root.className = `${LIGHTBOX_CLASS}${sources.length < 2 ? ' is-single' : ''}`;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML = `
      <button type="button" class="cr-group-nav cr-group-prev" aria-label="Previous image">←</button>
      <div class="cr-group-stage"><img class="cr-group-image" alt="" draggable="false"></div>
      <button type="button" class="cr-group-nav cr-group-next" aria-label="Next image">→</button>
      <button type="button" class="cr-group-close">${document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE'}</button>
      <p class="cr-group-counter"></p>
    `;

    root.querySelector('.cr-group-prev').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      step(-1);
    });
    root.querySelector('.cr-group-next').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      step(1);
    });
    root.querySelector('.cr-group-close').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeLightbox();
    });

    const stage = root.querySelector('.cr-group-stage');
    stage.addEventListener('click', (event) => event.stopPropagation());

    let startX = 0;
    let startY = 0;
    let pointerId = null;

    stage.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      stage.setPointerCapture?.(pointerId);
    });

    stage.addEventListener('pointerup', (event) => {
      if (pointerId !== event.pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      pointerId = null;

      if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.1) {
        event.preventDefault();
        step(dx < 0 ? 1 : -1);
      } else if (dy >= 100 && Math.abs(dy) > Math.abs(dx) * 1.25) {
        event.preventDefault();
        closeLightbox();
      }
    });

    stage.addEventListener('pointercancel', () => { pointerId = null; });
    root.addEventListener('click', (event) => {
      if (event.target === root) closeLightbox();
    });

    document.body.append(root);
    overlay = root;
    lockPage();
    draw();
  }

  document.getElementById('carnival-records-group-lightbox-style')?.remove();
  const style = document.createElement('style');
  style.id = 'carnival-records-group-lightbox-style';
  style.textContent = `
    .${LIGHTBOX_CLASS} {
      position: fixed;
      inset: 0;
      z-index: 3000000;
      display: grid;
      grid-template-columns: auto minmax(0,1fr) auto;
      align-items: center;
      gap: clamp(.65rem,2vw,1.35rem);
      padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
      background: rgba(0,0,0,.97);
      color: #fff;
      touch-action: none;
      overscroll-behavior: none;
    }
    .cr-group-stage {
      min-width: 0;
      height: calc(100dvh - 2rem);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: grab;
      touch-action: none;
    }
    .cr-group-stage:active { cursor: grabbing; }
    .cr-group-image {
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
    .cr-group-nav,
    .cr-group-close {
      border: 1px solid rgba(255,255,255,.86);
      border-radius: 0;
      background: #050505;
      color: #fff;
      font-family: Arial,Helvetica,sans-serif;
      font-weight: 900;
      cursor: pointer;
    }
    .cr-group-nav { width: 3.35rem; height: 3.35rem; font-size: 1.5rem; }
    .cr-group-close {
      position: absolute;
      top: max(1rem,env(safe-area-inset-top));
      right: max(1rem,env(safe-area-inset-right));
      padding: .72rem .95rem;
      font-size: .68rem;
      letter-spacing: .2em;
      text-transform: uppercase;
    }
    .cr-group-counter {
      position: absolute;
      left: 50%;
      bottom: max(1rem,env(safe-area-inset-bottom));
      transform: translateX(-50%);
      margin: 0;
      padding: .45rem .68rem;
      background: #fff;
      color: #050505;
      font: 900 .65rem/1 Arial,Helvetica,sans-serif;
      letter-spacing: .18em;
    }
    .${LIGHTBOX_CLASS}.is-single .cr-group-nav { visibility: hidden; pointer-events: none; }
    @media (max-width:700px),(hover:none),(pointer:coarse) {
      .${LIGHTBOX_CLASS} { grid-template-columns: 1fr; padding: .75rem; }
      .cr-group-nav { display: none !important; }
      .cr-group-stage { height: calc(100dvh - 1.5rem); }
    }
  `;
  document.head.append(style);

  window.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(`.${LIGHTBOX_CLASS}`)) return;

    const modal = event.target.closest('.cr-modal');
    if (!modal) return;

    if (event.target.closest('.cr-close, .cr-light-close, .cr-nav, .project-scroll-top, a, input, select, textarea')) return;

    const card = event.target.closest('.cr-card');
    if (!card) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }

    const gallery = resolveGallery(card);
    if (!gallery.length) return;

    const startImage = firstCardImage(card);
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openLightbox(gallery, imageSource(startImage));
  }, true);

  window.addEventListener('keydown', (event) => {
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