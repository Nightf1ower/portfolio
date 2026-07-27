(() => {
  if (window.__projectUnifiedLightboxV1) return;
  window.__projectUnifiedLightboxV1 = true;

  const VERSION = 'project-unified-lightbox-1';
  const MODAL_SELECTOR = [
    '.zny-modal',
    '.bf',
    '.blandetto-modal',
    '.bld-modal',
    '.m10-modal',
    '.merch9-modal',
    '.su-modal',
    '.project9006-modal',
  ].join(',');

  const CONTROL_SELECTOR = [
    '.zny-close',
    '.bf-x',
    '.blandetto-close',
    '.bld-close',
    '.m10-close',
    '.merch9-close',
    '.su-close',
    '.project9006-close',
    '.p9006-close',
    '.project-scroll-top',
    '.pul-close',
    '.pul-nav',
    'a',
    'input',
    'select',
    'textarea',
  ].join(',');

  let overlay = null;
  let sources = [];
  let activeIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  const normalizeUrl = (value) => {
    if (!value) return '';
    try {
      return new URL(String(value), location.href).href;
    } catch {
      return String(value);
    }
  };

  const unique = (values) => [...new Set(values.map(normalizeUrl).filter(Boolean))];

  function injectStyles() {
    const old = document.getElementById('project-unified-lightbox-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = 'project-unified-lightbox-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .pul-overlay {
        position: fixed;
        inset: 0;
        z-index: 2000000;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: clamp(.6rem, 2vw, 1.4rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0, 0, 0, .97);
        color: #fff;
        overscroll-behavior: none;
        touch-action: none;
      }
      .pul-stage {
        min-width: 0;
        height: calc(100dvh - 2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .pul-image {
        display: block;
        max-width: 100%;
        max-height: 92dvh;
        width: auto;
        height: auto;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
        transition: opacity .16s ease, transform .16s ease;
      }
      .pul-nav,
      .pul-close {
        border: 1px solid rgba(255, 255, 255, .8);
        border-radius: 0;
        background: #050505;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 900;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .pul-nav {
        width: 3.4rem;
        height: 3.4rem;
        font-size: 1.5rem;
      }
      .pul-close {
        position: absolute;
        top: max(1rem, env(safe-area-inset-top));
        right: max(1rem, env(safe-area-inset-right));
        z-index: 3;
        padding: .72rem .95rem;
        font-size: .68rem;
        letter-spacing: .2em;
        text-transform: uppercase;
      }
      .pul-counter {
        position: absolute;
        left: 50%;
        bottom: max(1rem, env(safe-area-inset-bottom));
        transform: translateX(-50%);
        margin: 0;
        padding: .46rem .68rem;
        background: #fff;
        color: #050505;
        font: 900 .65rem/1 Arial, Helvetica, sans-serif;
        letter-spacing: .18em;
      }
      .pul-overlay.is-single .pul-nav { visibility: hidden; pointer-events: none; }
      @media (hover: none), (pointer: coarse), (max-width: 700px) {
        .pul-overlay {
          grid-template-columns: 1fr;
          padding: max(.75rem, env(safe-area-inset-top)) max(.75rem, env(safe-area-inset-right)) max(.75rem, env(safe-area-inset-bottom)) max(.75rem, env(safe-area-inset-left));
        }
        .pul-nav { display: none !important; }
        .pul-stage { height: calc(100dvh - 1.5rem); }
      }
    `;
    document.head.append(style);
  }

  function is9006Fallback(node) {
    if (!(node instanceof Element)) return false;
    if (!node.matches('div.fixed.inset-0')) return false;
    return [...node.querySelectorAll('p')].some((item) => item.textContent?.trim() === '90.06');
  }

  function findModal(target) {
    if (!(target instanceof Element)) return null;
    const direct = target.closest(MODAL_SELECTOR);
    if (direct) return direct;

    let node = target.closest('div.fixed.inset-0');
    while (node) {
      if (is9006Fallback(node)) return node;
      node = node.parentElement?.closest?.('div.fixed.inset-0') || null;
    }
    return null;
  }

  function projectType(modal) {
    if (modal.matches('.zny-modal')) return 'zny';
    if (modal.matches('.bf, .blandetto-modal, .bld-modal')) return 'blandetto';
    if (modal.matches('.m10-modal, .merch9-modal')) return 'merch';
    if (modal.matches('.su-modal')) return 'stayugly';
    return '9006';
  }

  function collectImages(root) {
    if (!(root instanceof Element)) return [];
    return unique([...root.querySelectorAll('img')].map((image) => image.currentSrc || image.getAttribute('src')));
  }

  function clickedSource(target, card) {
    const image = target instanceof HTMLImageElement ? target : card?.querySelector('img');
    return normalizeUrl(image?.currentSrc || image?.getAttribute('src'));
  }

  function findCard(type, target) {
    if (!(target instanceof Element)) return null;
    const selectors = {
      zny: '.zny-card',
      blandetto: '.bf-card, .bf-ref',
      merch: '.m10-card, .merch9-card',
      stayugly: '.su-card, .su-concept-main, .su-concept-step',
      '9006': '.project9006-logo-card, .project9006-logo-sheet, .project9006-merch-media, .project9006-photoshoot-card, .project9006-poster-card, button',
    };
    const card = target.closest(selectors[type]);
    if (!card) return null;
    return card.querySelector('img') ? card : null;
  }

  function sectionRoot(type, card, modal) {
    if (!card) return modal;
    if (type === 'zny') return card.closest('.zny-sticker-row, .zny-section') || modal;
    if (type === 'blandetto') return card.closest('.bf-capg, .bf-s') || modal;
    if (type === 'merch') return card.closest('.m10-section, .m10-dxs-zone, .merch9-section') || modal;
    if (type === 'stayugly') return card.closest('.su-section') || modal;
    return card.closest('section') || modal;
  }

  function resolveGallery(modal, target) {
    const type = projectType(modal);
    const card = findCard(type, target);
    if (!card) return null;

    const cardSources = collectImages(card);
    if (!cardSources.length) return null;

    if (cardSources.length > 1) {
      return { sources: cardSources, index: 0 };
    }

    const root = sectionRoot(type, card, modal);
    const sectionSources = collectImages(root);
    if (!sectionSources.length) return null;

    const clicked = clickedSource(target, card);
    const index = Math.max(0, sectionSources.indexOf(clicked));
    return { sources: sectionSources, index };
  }

  function closeLightbox() {
    overlay?.remove();
    overlay = null;
    sources = [];
    activeIndex = 0;
  }

  function render(direction = 0) {
    if (!overlay || !sources.length) return;
    const image = overlay.querySelector('.pul-image');
    const counter = overlay.querySelector('.pul-counter');
    image.style.opacity = '0';
    image.style.transform = `translateX(${direction * 18}px)`;
    window.setTimeout(() => {
      image.src = sources[activeIndex];
      counter.textContent = `${activeIndex + 1} / ${sources.length}`;
      requestAnimationFrame(() => {
        image.style.opacity = '1';
        image.style.transform = 'translateX(0)';
      });
    }, 55);
  }

  function step(amount) {
    if (sources.length < 2) return;
    activeIndex = (activeIndex + amount + sources.length) % sources.length;
    render(amount > 0 ? 1 : -1);
  }

  function openLightbox(items, startIndex = 0) {
    closeLightbox();
    injectStyles();

    sources = unique(items);
    if (!sources.length) return;
    activeIndex = Math.max(0, Math.min(startIndex, sources.length - 1));

    const root = document.createElement('div');
    const previous = document.createElement('button');
    const next = document.createElement('button');
    const close = document.createElement('button');
    const stage = document.createElement('div');
    const image = document.createElement('img');
    const counter = document.createElement('p');

    root.className = `pul-overlay${sources.length < 2 ? ' is-single' : ''}`;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    previous.type = next.type = close.type = 'button';
    previous.className = 'pul-nav pul-prev';
    next.className = 'pul-nav pul-next';
    close.className = 'pul-close';
    stage.className = 'pul-stage';
    image.className = 'pul-image';
    counter.className = 'pul-counter';
    previous.textContent = '←';
    next.textContent = '→';
    close.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    previous.setAttribute('aria-label', 'Previous image');
    next.setAttribute('aria-label', 'Next image');
    close.setAttribute('aria-label', 'Close image');
    image.draggable = false;

    previous.onclick = (event) => { event.stopPropagation(); step(-1); };
    next.onclick = (event) => { event.stopPropagation(); step(1); };
    close.onclick = (event) => { event.stopPropagation(); closeLightbox(); };
    stage.onclick = (event) => event.stopPropagation();
    root.onclick = closeLightbox;

    root.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    root.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        step(dx < 0 ? 1 : -1);
      } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        closeLightbox();
      }
    }, { passive: true });

    stage.append(image);
    root.append(previous, stage, next, close, counter);
    document.body.append(root);
    overlay = root;
    render();
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.pul-overlay')) return;
    if (event.target.closest(CONTROL_SELECTOR)) return;

    const modal = findModal(event.target);
    if (!modal) return;

    const gallery = resolveGallery(modal, event.target);
    if (!gallery) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openLightbox(gallery.sources, gallery.index);
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

  injectStyles();
})();