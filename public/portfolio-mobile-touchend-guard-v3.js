(() => {
  if (window.__portfolioMobileTouchendGuardV3) return;
  window.__portfolioMobileTouchendGuardV3 = true;

  const LIGHTBOX_SELECTOR = [
    '.psg-lightbox', '.pul-overlay', '.cr-final-lightbox',
    '.cr-light', '.cr-lightbox', '.zny-light', '.zny-lightbox',
    '.fable-light', '.fable-lightbox', '.bf-light', '.blandetto-lightbox',
    '.su-light', '.su-lightbox', '.m10-light', '.merch9-light', '.mc-light', '.mc-lightbox',
    '.project9006-lightbox', '.vtb-light',
    '.pcg-light', '.pcg-lightbox', '.pag-light', '.pag-lightbox',
    '.lcg-light', '.lcg-lightbox', '.stk-light', '.stk-lightbox',
    '.album-covers-lightbox', '.anka-peresild-lightbox',
    '.collages-light', '.collages-lightbox', '.z-\\[150\\].fixed.inset-0'
  ].join(',');

  window.addEventListener('touchend', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest(LIGHTBOX_SELECTOR)) return;
    // V2 already handles committed swipes before this listener.
    // This blocks legacy touchend-only handlers after a V2-owned tap/vertical gesture,
    // while preserving the browser's default click because preventDefault is not used.
    event.stopImmediatePropagation();
  }, { capture: true, passive: true });
})();