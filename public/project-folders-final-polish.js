(() => {
  if (window.__projectFoldersFinalPolishV2) return;
  window.__projectFoldersFinalPolishV2 = true;

  const VERSION = 'project-folders-final-polish-2';
  const STYLE_ID = 'project-folders-final-polish-style';

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      /* F | ABLE — remove viewport/padding seams around full-bleed backgrounds. */
      .fable-modal {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: 100% !important;
      }

      .fable-modal *,
      .fable-modal *::before,
      .fable-modal *::after {
        box-sizing: border-box !important;
      }

      .fable-section.is-clothes::before,
      .fable-section.is-saint::before {
        left: 50% !important;
        width: calc(100dvw + 6px) !important;
        max-width: none !important;
        transform: translateX(-50%) !important;
      }

      /* PINK PUNK — the top bar stays fixed while the folder scrolls. */
      .pink-punk-fullscreen {
        padding-top: max(5.25rem, calc(env(safe-area-inset-top) + 4.25rem)) !important;
      }

      .pink-punk-fullscreen > div > .sticky {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 900120 !important;
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: max(.75rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) 1rem max(1rem, env(safe-area-inset-left)) !important;
        background: rgba(155, 0, 20, .97) !important;
        border-bottom: 1px solid rgba(255,255,255,.28) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
      }

      /* CARNIVAL RECORDS — readable black subgroup labels. */
      .cr-modal .cr-subtitle {
        margin: 0 0 clamp(1.25rem, 2.2vw, 2rem) !important;
        color: #050505 !important;
        font-size: clamp(1.15rem, 2.15vw, 2.15rem) !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        letter-spacing: .1em !important;
        text-transform: uppercase !important;
      }

      .cr-modal .cr-card,
      .cr-modal .cr-card img,
      .cr-modal .cr-media {
        cursor: zoom-in !important;
      }

      .cr-final-lightbox {
        position: fixed;
        inset: 0;
        z-index: 2100000;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: clamp(.6rem, 2vw, 1.35rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
        touch-action: none;
      }

      .cr-final-lightbox.is-single .cr-final-lightbox__nav {
        visibility: hidden !important;
        pointer-events: none !important;
      }

      .cr-final-lightbox__stage {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        height: calc(100dvh - 2rem);
        overflow: hidden;
      }

      .cr-final-lightbox__image {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 92dvh;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
      }

      .cr-final-lightbox__nav,
      .cr-final-lightbox__close {
        border: 1px solid rgba(255,255,255,.82);
        border-radius: 0;
        background: #050505;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 900;
        cursor: pointer;
      }

      .cr-final-lightbox__nav {
        width: 3.4rem;
        height: 3.4rem;
        font-size: 1.55rem;
      }

      .cr-final-lightbox__close {
        position: absolute;
        top: max(1rem, env(safe-area-inset-top));
        right: max(1rem, env(safe-area-inset-right));
        z-index: 2;
        padding: .72rem .95rem;
        font-size: .68rem;
        letter-spacing: .2em;
        text-transform: uppercase;
      }

      .cr-final-lightbox__counter {
        position: absolute;
        left: 50%;
        bottom: max(1rem, env(safe-area-inset-bottom));
        transform: translateX(-50%);
        margin: 0;
        padding: .46rem .7rem;
        background: #fff;
        color: #050505;
        font: 900 .65rem/1 Arial, Helvetica, sans-serif;
        letter-spacing: .18em;
      }

      .cr-final-scroll-top {
        position: fixed;
        right: max(1rem, env(safe-area-inset-right));
        bottom: max(1rem, env(safe-area-inset-bottom));
        z-index: 900160;
        display: grid;
        place-items: center;
        width: 3rem;
        height: 3rem;
        margin: 0;
        padding: 0;
        border: 1px solid rgba(255,255,255,.65);
        border-radius: 0;
        background: #050505;
        color: #fff;
        font: 900 1.45rem/1 Arial, Helvetica, sans-serif;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transform: translateY(.5rem);
        transition: opacity .2s ease, transform .2s ease;
      }

      .cr-final-scroll-top.is-visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      /* MERCH — smooth sky-blue to DXS red transition and no blue footer seam. */
      .m10-modal {
        overflow-x: hidden !important;
      }

      .m10-modal .m10-dxs-zone {
        background: linear-gradient(
          180deg,
          #87ceeb 0,
          #8dcbe0 2rem,
          #9ebfd0 4.5rem,
          #b7a1ae 7rem,
          #d06d70 10rem,
          #e5312b 13rem,
          #e5312b 100%
        ) !important;
        box-shadow: 0 20rem 0 20rem #e5312b !important;
      }

      @media (min-width: 1101px) {
        .m10-modal .m10-dxs-zone .m10-dxs-posters {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          align-items: start !important;
          gap: clamp(.9rem, 1.5vw, 1.4rem) !important;
          width: 100% !important;
        }
      }

      /* NINETY Z S — three logos in one row; remove the sticky brand/close bar. */
      .project9006-modal {
        padding-top: max(1rem, env(safe-area-inset-top)) !important;
      }

      .project9006-modal > div > .sticky {
        display: none !important;
      }

      .project9006-modal .project9006-logo-pair {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        align-items: stretch !important;
        gap: clamp(.8rem, 1.6vw, 1.3rem) !important;
        width: 100% !important;
      }

      .project9006-modal .project9006-logo-pair > .project9006-logo-card,
      .project9006-modal .project9006-logo-pair > .project9006-logo-sheet {
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        max-width: none !important;
        aspect-ratio: 1 / 1 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        background: #fff !important;
      }

      .project9006-modal .project9006-logo-pair > .project9006-logo-card img,
      .project9006-modal .project9006-logo-pair > .project9006-logo-sheet img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        object-fit: contain !important;
        background: #fff !important;
      }

      @media (max-width: 900px) {
        .project9006-modal .project9006-logo-pair {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }

      @media (max-width: 650px) {
        .project9006-modal .project9006-logo-pair {
          grid-template-columns: 1fr !important;
        }
      }

      @media (hover: none), (pointer: coarse), (max-width: 700px) {
        .cr-final-lightbox {
          grid-template-columns: 1fr;
          padding: max(.75rem, env(safe-area-inset-top)) max(.75rem, env(safe-area-inset-right)) max(.75rem, env(safe-area-inset-bottom)) max(.75rem, env(safe-area-inset-left));
        }

        .cr-final-lightbox__nav {
          display: none !important;
        }

        .cr-final-lightbox__stage {
          height: calc(100dvh - 1.5rem);
        }
      }
    `;
    document.head.append(style);
  }

  function normalizeUrl(value) {
    if (!value) return '';
    try {
      return new URL(String(value), window.location.href).href;
    } catch {
      return String(value);
    }
  }

  function carnivalImageSource(image) {
    if (!(image instanceof HTMLImageElement)) return '';
    return normalizeUrl(
      image.dataset.portfolioOriginal
      || image.getAttribute('data-original')
      || image.currentSrc
      || image.getAttribute('src')
    );
  }

  function visible(node) {
    if (!node?.isConnected) return false;
    const styles = getComputedStyle(node);
    return styles.display !== 'none' && styles.visibility !== 'hidden' && Number(styles.opacity || 1) !== 0;
  }

  let carnivalOverlay = null;
  let carnivalSources = [];
  let carnivalIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function closeCarnivalLightbox() {
    carnivalOverlay?.remove();
    carnivalOverlay = null;
    carnivalSources = [];
    carnivalIndex = 0;
    updateCarnivalScrollButton();
  }

  function renderCarnivalLightbox() {
    if (!carnivalOverlay || !carnivalSources.length) return;
    const image = carnivalOverlay.querySelector('.cr-final-lightbox__image');
    const counter = carnivalOverlay.querySelector('.cr-final-lightbox__counter');
    image.src = carnivalSources[carnivalIndex];
    counter.textContent = `${carnivalIndex + 1} / ${carnivalSources.length}`;
  }

  function stepCarnivalLightbox(amount) {
    if (carnivalSources.length < 2) return;
    carnivalIndex = (carnivalIndex + amount + carnivalSources.length) % carnivalSources.length;
    renderCarnivalLightbox();
  }

  function openCarnivalLightbox(card, clickedImage = null) {
    const sources = [...new Set(
      [...card.querySelectorAll('img')]
        .map(carnivalImageSource)
        .filter(Boolean)
    )];
    if (!sources.length) return;

    closeCarnivalLightbox();
    carnivalSources = sources;
    const clickedSource = carnivalImageSource(clickedImage);
    carnivalIndex = Math.max(0, sources.indexOf(clickedSource));

    const overlay = document.createElement('div');
    const previous = document.createElement('button');
    const next = document.createElement('button');
    const close = document.createElement('button');
    const stage = document.createElement('div');
    const image = document.createElement('img');
    const counter = document.createElement('p');

    overlay.className = `cr-final-lightbox${sources.length < 2 ? ' is-single' : ''}`;
    previous.type = next.type = close.type = 'button';
    previous.className = 'cr-final-lightbox__nav cr-final-lightbox__prev';
    next.className = 'cr-final-lightbox__nav cr-final-lightbox__next';
    close.className = 'cr-final-lightbox__close';
    stage.className = 'cr-final-lightbox__stage';
    image.className = 'cr-final-lightbox__image';
    counter.className = 'cr-final-lightbox__counter';
    previous.textContent = '←';
    next.textContent = '→';
    close.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    image.draggable = false;

    previous.onclick = (event) => { event.stopPropagation(); stepCarnivalLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepCarnivalLightbox(1); };
    close.onclick = (event) => { event.stopPropagation(); closeCarnivalLightbox(); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = closeCarnivalLightbox;

    overlay.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    overlay.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        stepCarnivalLightbox(dx < 0 ? 1 : -1);
      } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        closeCarnivalLightbox();
      }
    }, { passive: true });

    stage.append(image);
    overlay.append(previous, stage, next, close, counter);
    document.body.append(overlay);
    carnivalOverlay = overlay;
    renderCarnivalLightbox();
    updateCarnivalScrollButton();
  }

  let carnivalModal = null;
  let carnivalScrollButton = null;

  function ensureCarnivalScrollButton() {
    if (carnivalScrollButton?.isConnected) return carnivalScrollButton;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cr-final-scroll-top';
    button.textContent = '↑';
    button.setAttribute('aria-label', 'Наверх');
    button.onclick = () => {
      if (!carnivalModal) return;
      try {
        carnivalModal.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        carnivalModal.scrollTop = 0;
      }
    };
    document.body.append(button);
    carnivalScrollButton = button;
    return button;
  }

  function updateCarnivalScrollButton() {
    const button = ensureCarnivalScrollButton();
    const shouldShow = Boolean(
      carnivalModal?.isConnected
      && carnivalModal.scrollTop > 420
      && !carnivalOverlay
      && !document.querySelector('.cr-light, .psg-lightbox')
    );
    button.classList.toggle('is-visible', shouldShow);
  }

  function bindCarnivalModal() {
    const modal = [...document.querySelectorAll('.cr-modal')].filter(visible).at(-1) || null;
    if (modal === carnivalModal) {
      updateCarnivalScrollButton();
      return;
    }

    carnivalModal?.removeEventListener('scroll', updateCarnivalScrollButton);
    carnivalModal = modal;
    carnivalModal?.addEventListener('scroll', updateCarnivalScrollButton, { passive: true });
    updateCarnivalScrollButton();
  }

  function arrangeNinetyLogos(root = document) {
    root.querySelectorAll?.('.project9006-modal').forEach((modal) => {
      const pair = modal.querySelector('.project9006-logo-pair');
      const sheet = modal.querySelector('.project9006-logo-sheet');
      if (!pair || !sheet) return;
      sheet.classList.add('project9006-logo-card', 'project9006-logo-sheet-card');
      if (sheet.parentElement !== pair) pair.append(sheet);
      modal.dataset.ninetyLogosFinal = VERSION;
    });
  }

  function apply() {
    installStyles();
    arrangeNinetyLogos();
    bindCarnivalModal();
  }

  window.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.cr-final-lightbox')) return;

    const card = event.target.closest('.cr-modal .cr-card');
    if (!card || event.target.closest('.cr-close, .cr-nav, .cr-light-close, .project-scroll-top, .cr-final-scroll-top')) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openCarnivalLightbox(card, event.target.closest('img'));
  }, true);

  window.addEventListener('keydown', (event) => {
    if (carnivalOverlay) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        closeCarnivalLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        stepCarnivalLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        stepCarnivalLightbox(1);
      }
      return;
    }

    if (event.key !== 'Escape') return;

    const fableLightbox = [...document.querySelectorAll('.fable-light')].filter(visible).at(-1);
    if (fableLightbox) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      fableLightbox.querySelector('.fable-light-close')?.click();
      return;
    }

    const ninetyModal = [...document.querySelectorAll('.project9006-modal')].filter(visible).at(-1);
    const ninetyLightbox = document.querySelector('.project9006-fix-lightbox, .project9006-lightbox, .pul-overlay, .psg-lightbox');
    if (ninetyModal && !ninetyLightbox) {
      const hiddenClose = ninetyModal.querySelector(':scope > div > .sticky button, .project9006-close, .p9006-close');
      if (hiddenClose) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        hiddenClose.click();
      }
    }
  }, true);

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  }

  new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) =>
      [...mutation.addedNodes, ...mutation.removedNodes].some((node) =>
        node instanceof Element
        && (
          node.matches?.('.cr-modal, .project9006-modal')
          || node.querySelector?.('.cr-modal, .project9006-modal')
        )
      )
    );
    if (relevant) schedule();
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const card = event.target.closest?.('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'CARNIVAL RECORDS' || title === 'NINETY Z S' || title === '90.06' || title === 'PINK PUNK' || title === 'F | ABLE' || title === 'FABLE' || title === 'MERCH') {
      [0, 80, 220, 600].forEach((delay) => setTimeout(schedule, delay));
    }
  }, true);

  window.addEventListener('load', schedule);
  installStyles();
  ensureCarnivalScrollButton();
  [0, 100, 350, 900].forEach((delay) => setTimeout(schedule, delay));
})();
