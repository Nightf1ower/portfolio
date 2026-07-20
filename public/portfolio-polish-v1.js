(() => {
  if (window.__portfolioPolishV1) return;
  window.__portfolioPolishV1 = true;

  const VERSION = 'portfolio-polish-1';
  const style = document.createElement('style');
  style.id = 'portfolio-polish-style';
  style.dataset.version = VERSION;
  style.textContent = `
    /* PINK PUNK: keep only the header divider, not a second divider below it. */
    .pink-punk-gallery--grouped > .pink-punk-section:first-child {
      border-top: 0 !important;
      padding-top: 0 !important;
    }

    /* BLANDETTO: align the reference caption with the left edge of the image. */
    .bf-ref > .bf-p,
    .blandetto-cap-reference__caption {
      box-sizing: border-box !important;
      width: 100% !important;
      margin: .75rem 0 0 !important;
      padding-right: 1rem !important;
      padding-left: 1rem !important;
      text-align: left !important;
    }

    /* 90.06: use the same absolute black as the logo artwork. */
    html:has(.project9006-modal),
    body:has(.project9006-modal),
    .project9006-modal,
    .project9006-modal::before,
    .project9006-modal > div {
      background-color: #000 !important;
    }

    .project9006-modal {
      background-image: none !important;
    }

    .project9006-logo-card,
    .project9006-logo-sheet {
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      background: #000 !important;
      cursor: zoom-in !important;
    }

    .project9006-logo-sheet {
      padding: 0 !important;
      overflow: hidden !important;
    }

    .project9006-logo-sheet img {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      outline: 0 !important;
      background: #000 !important;
    }

    .project9006-polish-lightbox {
      position: fixed !important;
      inset: 0 !important;
      z-index: 900120 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 1rem !important;
      background: rgba(0,0,0,.94) !important;
      cursor: zoom-out !important;
    }

    .project9006-polish-lightbox img {
      display: block !important;
      max-width: 94vw !important;
      max-height: 90dvh !important;
      object-fit: contain !important;
      background: #000 !important;
      cursor: default !important;
    }

    .project9006-polish-lightbox button {
      position: absolute !important;
      top: max(1rem, env(safe-area-inset-top)) !important;
      right: max(1rem, env(safe-area-inset-right)) !important;
      border: 1px solid #fff !important;
      background: #fff !important;
      color: #000 !important;
      padding: .7rem 1rem !important;
      font: 900 .7rem/1 Arial, Helvetica, sans-serif !important;
      letter-spacing: .24em !important;
      text-transform: uppercase !important;
      cursor: pointer !important;
    }
  `;
  document.head.append(style);

  function close9006Lightbox() {
    document.querySelector('.project9006-polish-lightbox')?.remove();
  }

  function open9006Lightbox(image) {
    if (!image) return;
    close9006Lightbox();

    const overlay = document.createElement('div');
    overlay.className = 'project9006-lightbox project9006-polish-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    close.addEventListener('click', close9006Lightbox);

    const expanded = document.createElement('img');
    expanded.src = image.currentSrc || image.src;
    expanded.alt = image.alt || '90.06 logo';
    expanded.addEventListener('click', (event) => event.stopPropagation());

    overlay.addEventListener('click', close9006Lightbox);
    overlay.append(close, expanded);
    document.body.append(overlay);
  }

  document.addEventListener('click', (event) => {
    const logo = event.target.closest(
      '.project9006-modal .project9006-logo-card, .project9006-modal .project9006-logo-sheet'
    );
    if (!logo) return;

    const image = logo.querySelector('img');
    if (!image) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open9006Lightbox(image);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.querySelector('.project9006-polish-lightbox')) {
      event.preventDefault();
      close9006Lightbox();
    }
  }, true);

  function getScrollButton() {
    return document.querySelector('.project-scroll-top');
  }

  function syncStayUglyButton(modal) {
    const button = getScrollButton();
    if (!button || !modal) return;
    button.classList.toggle('is-visible', modal.scrollTop > 220);
  }

  document.addEventListener('scroll', (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.matches('.su-modal')) return;
    syncStayUglyButton(target);
  }, true);

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.project-scroll-top');
    if (button) {
      const stayUgly = document.querySelector('.su-modal');
      if (!stayUgly) return;
      event.preventDefault();
      try {
        stayUgly.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        stayUgly.scrollTop = 0;
      }
      return;
    }

    const projectCard = event.target.closest('#works article, #works button');
    const title = projectCard?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'STAY UGLY' && title !== 'STAYUGLY') return;

    [0, 160, 500, 1000].forEach((delay) => {
      window.setTimeout(() => {
        const modal = document.querySelector('.su-modal');
        if (modal) syncStayUglyButton(modal);
      }, delay);
    });
  }, true);
})();