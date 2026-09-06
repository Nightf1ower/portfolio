(() => {
  if (window.__portfolioProjectConsistencyV1) return;
  window.__portfolioProjectConsistencyV1 = true;

  const VERSION = 'portfolio-project-consistency-1';
  const STYLE_ID = 'portfolio-project-consistency-style';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      /* Keep the project title + CLOSE bar fixed on every project. */
      .portfolio-stable-head,
      .portfolio-standard-head,
      .portfolio-qa-static-head {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: auto !important;
        width: 100vw !important;
        max-width: none !important;
        margin: 0 !important;
        transform: none !important;
        translate: none !important;
        z-index: 2100000 !important;
        will-change: auto !important;
      }

      /* Native heads are kept fixed too if a project temporarily renders before the shared shell adopts it. */
      .pink-punk-fullscreen > div > .sticky,
      .bf .bf-h,
      .zny-modal .zny-head,
      .fable-modal .fable-head,
      .cr-modal .cr-head,
      .project9006-modal .project9006-toolbar,
      .pcg-modal .pcg-head,
      .mc-modal .mc-head,
      .m10-modal .m10-head,
      .stk-modal .stk-head,
      .lcg-modal .lcg-head,
      .album-covers-modal .album-covers-head,
      .su-modal .su-head,
      .anka-peresild-modal .anka-peresild-head,
      .vtb-modal .vtb-head,
      .collages-modal .pag-head {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: auto !important;
        width: 100vw !important;
        max-width: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        transform: none !important;
        translate: none !important;
        will-change: auto !important;
      }

      /* Make every top project description use the full available page width. */
      .portfolio-stable-intro__about,
      .portfolio-standard-intro__about {
        box-sizing: border-box !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        grid-template-columns: 1fr !important;
        width: 100% !important;
        max-width: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      .portfolio-stable-intro__about-label,
      .portfolio-standard-intro__about-label {
        align-self: flex-start !important;
      }

      .portfolio-stable-intro__about-text,
      .portfolio-standard-intro__about-text {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        text-align: left !important;
      }

      /* Same rule for native intro copy before/without shell migration. */
      .zny-brand-copy,
      .fable-brand-copy,
      .bf-brand-copy,
      .project9006-brand-copy,
      .vtb-project-intro__text,
      .stk-project-copy,
      .su-copy,
      .pcg-intro,
      .m10-project-copy,
      .mc-project-copy,
      .cr-brand-copy,
      .album-covers-description,
      .anka-peresild-brand-copy,
      .collages-copy {
        width: 100% !important;
        max-width: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    `;

    document.head.append(style);
  }

  function isBlandettoStableClose(target) {
    if (!(target instanceof Element)) return null;
    const button = target.closest('.portfolio-stable-head__close, .portfolio-standard-head__close');
    if (!button) return null;
    const modal = button.closest('.bf, .blandetto-modal, .bld-modal');
    return modal ? { button, modal } : null;
  }

  document.addEventListener('click', (event) => {
    const match = isBlandettoStableClose(event.target);
    if (!match) return;

    const { button, modal } = match;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    /* Blandetto owns a reliable Escape handler that calls its real closeModal(),
       which also clears its internal modal reference and restores page scrolling. */
    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true,
    }));

    requestAnimationFrame(() => {
      if (!modal.isConnected) return;
      const nativeClose = [...modal.querySelectorAll('.bf-x, .blandetto-close, .bld-close')]
        .find((node) => node !== button);
      nativeClose?.click();
    });

    setTimeout(() => {
      if (!modal.isConnected) return;
      modal.remove();
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    }, 100);
  }, true);

  installStyles();
})();
