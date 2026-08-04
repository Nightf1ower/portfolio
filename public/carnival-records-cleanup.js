(() => {
  if (window.__carnivalRecordsCleanupV8) return;
  window.__carnivalRecordsCleanupV8 = true;

  const VERSION = 'carnival-cleanup-8';
  const LIGHTBOX_CLASS = 'crfix-light';
  let lightbox = null;
  let lightboxImages = [];
  let lightboxIndex = 0;

  const unique = (values) => [...new Set(values.filter(Boolean))];
  const normalize = (value) => {
    if (!value) return '';
    try { return new URL(value, location.href).href; }
    catch { return String(value); }
  };

  function injectStyles() {
    document.getElementById('carnival-records-cleanup-style')?.remove();
    const style = document.createElement('style');
    style.id = 'carnival-records-cleanup-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .cr-modal .cr-note {
        display: none !important;
      }

      .cr-modal .cr-head {
        border: 0 !important;
        border-bottom: 0 !important;
        border-color: transparent !important;
        box-shadow: none !important;
        outline: 0 !important;
      }

      .cr-modal .cr-head::before,
      .cr-modal .cr-head::after {
        content: none !important;
        display: none !important;
      }

      /* Keep the brand introduction compact before the first divider. */
      .cr-modal .cr-hero {
        margin-bottom: clamp(2.75rem, 4vw, 4rem) !important;
      }

      /* One compact rhythm: divider -> title -> copy -> images. */
      .cr-modal .cr-section {
        padding-top: clamp(2rem, 3vw, 3rem) !important;
        padding-bottom: clamp(2.5rem, 3.5vw, 3.5rem) !important;
      }

      .cr-modal .cr-h {
        margin-bottom: 0 !important;
      }

      .cr-modal .cr-description {
        margin: clamp(.9rem, 1.5vw, 1.25rem) 0 clamp(1.25rem, 2vw, 1.75rem) !important;
      }

      .cr-modal .cr-section > .cr-description + * {
        margin-top: 0 !important;
      }

      .cr-modal .cr-card,
      .cr-modal .cr-media,
      .cr-modal .cr-img {
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
      }

      .cr-modal .cr-card {
        background: transparent !important;
      }

      .cr-modal .cr-media,
      .cr-modal .cr-img {
        background-color: transparent !important;
      }

      .cr-modal .cr-subtitle[data-carnival-tracklist-title] {
        display: none !important;
      }

      .${LIGHTBOX_CLASS} {
        position: fixed;
        inset: 0;
        z-index: 2100000;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: clamp(.6rem, 2vw, 1.35rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0, 0, 0, .97);
        color: #fff;
        touch-action: none;
      }

      .crfix-stage {
        min-width: 0;
        height: calc(100dvh - 2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .crfix-image {
        display: block;
        max-width: 100%;
        max-height: 92dvh;
        width: auto;
        height: auto;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
      }

      .crfix-nav,
      .crfix-close {
        border: 1px solid rgba(255, 255, 255, .85);
        border-radius: 0;
        background: #050505;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 900;
        cursor: pointer;
      }

      .crfix-nav {
        width: 3.35rem;
        height: 3.35rem;
        font-size: 1.5rem;
      }

      .crfix-close {
        position: absolute;
        top: max(1rem, env(safe-area-inset-top));
        right: max(1rem, env(safe-area-inset-right));
        padding: .72rem .95rem;
        font-size: .68rem;
        letter-spacing: .2em;
        text-transform: uppercase;
      }

      .crfix-counter {
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

      .${LIGHTBOX_CLASS}.is-single .crfix-nav {
        visibility: hidden;
        pointer-events: none;
      }

      @media (max-width: 700px), (hover: none), (pointer: coarse) {
        .cr-modal .cr-hero {
          margin-bottom: 2.5rem !important;
        }

        .cr-modal .cr-section {
          padding-top: 2rem !important;
          padding-bottom: 2.5rem !important;
        }

        .cr-modal .cr-description {
          margin-top: .9rem !important;
          margin-bottom: 1.25rem !important;
        }

        .${LIGHTBOX_CLASS} {
          grid-template-columns: 1fr;
          padding: .75rem;
        }

        .crfix-nav {
          display: none !important;
        }

        .crfix-stage {
          height: calc(100dvh - 1.5rem);
        }
      }
    `;
    document.head.append(style);
  }

  function cleanup(modal = document.querySelector('.cr-modal')) {
    if (!modal) return false;

    modal.querySelectorAll('.cr-note').forEach((node) => node.remove());

    modal.querySelectorAll('.cr-subtitle').forEach((title) => {
      if (/^(ТРЕКЛИСТ|TRACKLIST)$/i.test(title.textContent?.trim() || '')) {
        title.dataset.carnivalTracklistTitle = 'true';
        title.remove();
      }
    });

    modal.querySelectorAll('.cr-card, .cr-media, .cr-img').forEach((node) => {
      node.style.setProperty('border', '0', 'important');
      node.style.setProperty('outline', '0', 'important');
      node.style.setProperty('box-shadow', 'none', 'important');
    });

    return true;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
    lightboxImages = [];
    lightboxIndex = 0;
  }

  function drawLightbox() {
    if (!lightbox || !lightboxImages.length) return;
    const image = lightbox.querySelector('.crfix-image');
    const counter = lightbox.querySelector('.crfix-counter');
    image.src = lightboxImages[lightboxIndex];
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }

  function stepLightbox(amount) {
    if (!lightboxImages.length) return;
    lightboxIndex = (lightboxIndex + amount + lightboxImages.length) % lightboxImages.length;
    drawLightbox();
  }

  function openLightbox(images, startUrl = '') {
    closeLightbox();
    lightboxImages = unique(images.map(normalize));
    if (!lightboxImages.length) return;

    const normalizedStart = normalize(startUrl);
    lightboxIndex = Math.max(0, lightboxImages.indexOf(normalizedStart));

    const root = document.createElement('div');
    root.className = `${LIGHTBOX_CLASS}${lightboxImages.length < 2 ? ' is-single' : ''}`;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML = `
      <button type="button" class="crfix-nav crfix-prev" aria-label="Previous image">←</button>
      <div class="crfix-stage"><img class="crfix-image" alt="" draggable="false"></div>
      <button type="button" class="crfix-nav crfix-next" aria-label="Next image">→</button>
      <button type="button" class="crfix-close">${document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE'}</button>
      <p class="crfix-counter"></p>
    `;

    root.querySelector('.crfix-prev').onclick = (event) => {
      event.stopPropagation();
      stepLightbox(-1);
    };
    root.querySelector('.crfix-next').onclick = (event) => {
      event.stopPropagation();
      stepLightbox(1);
    };
    root.querySelector('.crfix-close').onclick = (event) => {
      event.stopPropagation();
      closeLightbox();
    };
    root.querySelector('.crfix-stage').onclick = (event) => event.stopPropagation();
    root.querySelector('.crfix-image').onclick = (event) => {
      event.stopPropagation();
      if (lightboxImages.length > 1) stepLightbox(1);
    };
    root.onclick = closeLightbox;

    let startX = 0;
    let startY = 0;
    root.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    root.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        stepLightbox(dx < 0 ? 1 : -1);
      } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        closeLightbox();
      }
    }, { passive: true });

    document.body.append(root);
    lightbox = root;
    drawLightbox();
  }

  function imageUrls(scope) {
    return unique([...scope.querySelectorAll('.cr-card .cr-img, .cr-card img')]
      .map((image) => normalize(image.currentSrc || image.getAttribute('src'))));
  }

  function galleryForCard(card) {
    const grid = card.closest('.cr-grid');
    let urls = grid ? imageUrls(grid) : [];

    if (urls.length < 2) {
      const subgroup = card.closest('.cr-subgroup');
      if (subgroup) urls = imageUrls(subgroup);
    }

    if (urls.length < 2) {
      const section = card.closest('.cr-section');
      if (section) urls = imageUrls(section);
    }

    return urls;
  }

  function loadScript(selector, src) {
    if (document.querySelector(selector)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.append(script);
  }

  injectStyles();
  cleanup();
  loadScript('script[src^="/carnival-records-section-order.js"]', '/carnival-records-section-order.js?v=carnival-section-order-3');
  loadScript('script[src^="/carnival-records-copy-update.js"]', '/carnival-records-copy-update.js?v=carnival-copy-update-2');

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(`.${LIGHTBOX_CLASS}`)) return;

    const card = event.target.closest('.cr-modal .cr-card');
    if (!card) return;

    const urls = galleryForCard(card);
    if (!urls.length) return;

    const clickedImage = event.target.closest('img');
    const firstCardImage = card.querySelector('.cr-img.active, .cr-img, img');
    const startUrl = clickedImage?.currentSrc || clickedImage?.getAttribute('src')
      || firstCardImage?.currentSrc || firstCardImage?.getAttribute('src') || '';

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openLightbox(urls, startUrl);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (!lightbox) return;

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
  }, true);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.cr-modal')) cleanup(node);
        else node.querySelectorAll?.('.cr-modal').forEach(cleanup);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
