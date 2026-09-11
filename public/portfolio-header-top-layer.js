(() => {
  if (window.__portfolioHeaderTopLayerV1) return;
  window.__portfolioHeaderTopLayerV1 = true;

  const VERSION = 'portfolio-header-top-layer-1';
  const STYLE_ID = 'portfolio-header-top-layer-style';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-master-project-head[popover] {
        position: fixed !important;
        inset: 0 0 auto 0 !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: auto !important;
        width: 100vw !important;
        max-width: none !important;
        margin: 0 !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        pointer-events: auto !important;
      }

      .portfolio-master-project-head[popover]::backdrop {
        background: transparent !important;
        pointer-events: none !important;
      }
    `;
    document.head.append(style);
  }

  function promote() {
    const head = document.querySelector('.portfolio-master-project-head');
    if (!(head instanceof HTMLElement)) return false;

    if (head.getAttribute('popover') !== 'manual') {
      head.setAttribute('popover', 'manual');
    }

    if (typeof head.showPopover === 'function' && !head.matches(':popover-open')) {
      try { head.showPopover(); } catch (_) {}
    }

    return true;
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      promote();
    });
  }

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('popstate', schedule);

  installStyles();
  schedule();
  [50, 150, 400, 900, 1600].forEach((delay) => setTimeout(schedule, delay));
})();
