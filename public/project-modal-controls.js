(() => {
  if (window.__projectModalControlsV2) return;
  window.__projectModalControlsV2 = true;

  const VERSION = 'modal-controls-2';
  const MODAL_SELECTORS = [
    '.album-covers-modal',
    '.zny-modal',
    '.fable-modal',
    '.bf',
    '.blandetto-modal',
    '.bld-modal',
    '.su-modal',
    '.m10-modal',
    '.merch9-modal',
    '.project9006-modal',
    '.pink-punk-fullscreen',
    '.z-\\[100\\].fixed.inset-0'
  ];

  const LIGHTBOX_CLOSE_SELECTORS = [
    '.album-covers-light .album-covers-light-close',
    '.zny-light button',
    '.fable-light button',
    '.bf-light .bf-close',
    '.blandetto-lightbox button',
    '.su-light button',
    '.m10-light button',
    '.merch9-light button',
    '.project9006-lightbox button',
    '.z-\\[150\\].fixed.inset-0 > button'
  ];

  const MODAL_CLOSE_SELECTORS = [
    '.album-covers-close',
    '.zny-close',
    '.fable-close',
    '.bf-x',
    '.blandetto-close',
    '.bld-close',
    '.su-close',
    '.m10-close',
    '.merch9-close',
    '.project9006-close',
    '.p9006-close',
    '.pink-punk-fullscreen > div > .sticky button',
    '.project9006-modal > div > .sticky button',
    '.z-\\[100\\].fixed.inset-0 > div > .sticky button'
  ];

  const PROJECT_TITLES = new Set([
    'ALBUM COVERS', 'ZNY', 'FABLE', 'PINK PUNK', 'BLANDETTO', '90.06', 'MERCH', 'STAY UGLY', 'STAYUGLY'
  ]);

  const style = document.createElement('style');
  style.id = 'project-modal-controls-style';
  style.dataset.version = VERSION;
  style.textContent = `
    .project-scroll-top {
      position: fixed;
      right: max(1rem, env(safe-area-inset-right));
      bottom: max(1rem, env(safe-area-inset-bottom));
      z-index: 900090;
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      margin: 0;
      padding: 0;
      border: 1px solid rgba(255,255,255,.55);
      border-radius: 0;
      background: #050505;
      color: #fff;
      box-shadow: 0 .65rem 2rem rgba(0,0,0,.22);
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1.45rem;
      font-weight: 900;
      line-height: 1;
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transform: translateY(.5rem);
      transition: opacity .2s ease, transform .2s ease;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    .project-scroll-top.is-visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .project-scroll-top:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }

    @media (max-width: 560px) {
      .project-scroll-top {
        right: max(.85rem, env(safe-area-inset-right));
        bottom: max(.85rem, env(safe-area-inset-bottom));
        width: 2.8rem;
        height: 2.8rem;
        font-size: 1.3rem;
      }
    }
  `;
  document.head.append(style);

  const oldButton = document.querySelector('.project-scroll-top');
  oldButton?.remove();
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'project-scroll-top';
  button.setAttribute('aria-label', 'Наверх');
  button.title = 'Наверх';
  button.textContent = '↑';
  document.body.append(button);

  let activeModal = null;

  function isVisible(node) {
    if (!node?.isConnected) return false;
    const styles = window.getComputedStyle(node);
    return styles.display !== 'none' && styles.visibility !== 'hidden' && Number(styles.opacity || 1) !== 0;
  }

  function lastVisible(selectors) {
    const nodes = selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));
    return nodes.filter(isVisible).at(-1) || null;
  }

  function findModal() {
    return lastVisible(MODAL_SELECTORS);
  }

  function updateButton() {
    const shouldShow = Boolean(activeModal && activeModal.scrollTop > 420 && !document.querySelector('.album-covers-light, .psg-lightbox'));
    button.classList.toggle('is-visible', shouldShow);
  }

  function bindModal(modal) {
    if (activeModal === modal) {
      updateButton();
      return Boolean(modal);
    }

    activeModal?.removeEventListener('scroll', updateButton);
    activeModal = modal || null;
    activeModal?.addEventListener('scroll', updateButton, { passive: true });
    updateButton();
    return Boolean(activeModal);
  }

  function refresh() {
    bindModal(findModal());
  }

  function scheduleRefresh() {
    window.setTimeout(refresh, 0);
    window.setTimeout(refresh, 120);
    window.setTimeout(refresh, 420);
  }

  button.addEventListener('click', () => {
    if (!activeModal) return;
    try {
      activeModal.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      activeModal.scrollTop = 0;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    const lightboxClose = lastVisible(LIGHTBOX_CLOSE_SELECTORS);
    if (lightboxClose) {
      event.preventDefault();
      event.stopImmediatePropagation();
      lightboxClose.click();
      scheduleRefresh();
      return;
    }

    const modal = findModal();
    const modalClose = lastVisible(MODAL_CLOSE_SELECTORS);
    if (!modal || !modalClose) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    modalClose.click();
    scheduleRefresh();
  }, true);

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    const closeControl = event.target.closest(MODAL_CLOSE_SELECTORS.join(','));

    if (PROJECT_TITLES.has(title) || closeControl || event.target.closest('.album-covers-card')) scheduleRefresh();
  }, true);

  window.addEventListener('load', refresh);
  window.addEventListener('resize', updateButton, { passive: true });
  refresh();
})();