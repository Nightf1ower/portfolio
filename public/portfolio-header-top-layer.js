(() => {
  if (window.__portfolioHeaderTopLayerV2) return;
  window.__portfolioHeaderTopLayerV2 = true;

  const STYLE_ID = 'portfolio-header-top-layer-style';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .portfolio-master-project-head {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: auto !important;
        inset: 0 0 auto 0 !important;
        z-index: 2147483000 !important;
        box-sizing: border-box !important;
        width: 100vw !important;
        max-width: none !important;
        height: 4rem !important;
        min-height: 4rem !important;
        max-height: 4rem !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        background: #fff !important;
        pointer-events: none !important;
      }

      .portfolio-master-project-head.is-dark {
        background: #050505 !important;
      }

      .portfolio-master-project-head__label,
      .portfolio-master-project-head__close {
        position: fixed !important;
        top: .825rem !important;
        bottom: auto !important;
        z-index: 2147483001 !important;
        box-sizing: border-box !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        min-width: 0 !important;
        max-width: max-content !important;
        height: 2.35rem !important;
        min-height: 2.35rem !important;
        max-height: 2.35rem !important;
        margin: 0 !important;
        padding: 0 1rem !important;
        border: 0 !important;
        border-radius: 0 !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        pointer-events: auto !important;
      }

      .portfolio-master-project-head__label {
        left: clamp(1rem, 1.8vw, 2rem) !important;
        right: auto !important;
      }

      .portfolio-master-project-head__close {
        left: auto !important;
        right: clamp(1rem, 1.8vw, 2rem) !important;
      }

      @media (max-width: 820px) {
        .portfolio-master-project-head {
          height: 3.65rem !important;
          min-height: 3.65rem !important;
          max-height: 3.65rem !important;
        }

        .portfolio-master-project-head__label,
        .portfolio-master-project-head__close {
          top: .8rem !important;
          height: 2.05rem !important;
          min-height: 2.05rem !important;
          max-height: 2.05rem !important;
          padding: 0 .72rem !important;
        }

        .portfolio-master-project-head__label {
          left: .75rem !important;
        }

        .portfolio-master-project-head__close {
          right: .75rem !important;
        }
      }
    `;

    document.head.append(style);
  }

  function cleanHeader() {
    const head = document.querySelector('.portfolio-master-project-head');
    if (!(head instanceof HTMLElement)) return;

    if (head.matches(':popover-open') && typeof head.hidePopover === 'function') {
      try { head.hidePopover(); } catch (_) {}
    }

    head.removeAttribute('popover');
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      cleanHeader();
    });
  }

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  installStyles();
  schedule();
  window.addEventListener('load', schedule, { once: true });
})();
