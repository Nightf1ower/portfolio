(() => {
  if (window.__portfolioHeaderNormalFlowV3) return;
  window.__portfolioHeaderNormalFlowV3 = true;

  const STYLE_ID = 'portfolio-header-top-layer-style';
  const FLOW_CLASS = 'portfolio-flow-project-head';
  const HIDDEN_CLASS = 'portfolio-flow-project-head-hidden';

  const PROJECTS = [
    { modal: '.cr-modal', native: '.cr-head' },
    { modal: '.zny-modal', native: '.zny-head' },
    { modal: '.vtb-modal', native: '.vtb-head' },
    { modal: '.pcg-modal', native: '.pcg-head' },
    { modal: '.fable-modal', native: '.fable-head' },
    { modal: '.blandetto-modal, .bf', native: '.bf-h, .blandetto-head, .bld-head' },
    { modal: '.album-covers-modal', native: '.album-covers-head' },
    { modal: '.mc-modal, .m10-modal', native: '.mc-head, .m10-head' },
    { modal: '.stk-modal', native: '.stk-head' },
    { modal: '.lcg-modal', native: '.lcg-head' },
    { modal: '.su-modal', native: '.su-head' },
    { modal: '.project9006-modal', native: '.project9006-toolbar' },
    { modal: '.anka-peresild-modal', native: '.anka-peresild-head' },
  ];

  const SHARED = [
    '.portfolio-stable-head',
    '.portfolio-standard-head',
    '.portfolio-fixed-project-head',
    '.portfolio-qa-static-head',
  ];

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* The old viewport-level replacement header is no longer used. */
      .portfolio-master-project-head,
      .portfolio-master-project-head__label,
      .portfolio-master-project-head__close {
        display: none !important;
        position: static !important;
      }

      /* Exactly one real project header stays inside the scrollable project. */
      .cr-modal .${FLOW_CLASS},
      .zny-modal .${FLOW_CLASS},
      .vtb-modal .${FLOW_CLASS},
      .pcg-modal .${FLOW_CLASS},
      .fable-modal .${FLOW_CLASS},
      .blandetto-modal .${FLOW_CLASS},
      .bf .${FLOW_CLASS},
      .album-covers-modal .${FLOW_CLASS},
      .mc-modal .${FLOW_CLASS},
      .m10-modal .${FLOW_CLASS},
      .stk-modal .${FLOW_CLASS},
      .lcg-modal .${FLOW_CLASS},
      .su-modal .${FLOW_CLASS},
      .project9006-modal .${FLOW_CLASS},
      .anka-peresild-modal .${FLOW_CLASS} {
        display: flex !important;
        position: static !important;
        inset: auto !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        left: auto !important;
        width: 100% !important;
        max-width: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        will-change: auto !important;
      }

      .cr-modal .${HIDDEN_CLASS},
      .zny-modal .${HIDDEN_CLASS},
      .vtb-modal .${HIDDEN_CLASS},
      .pcg-modal .${HIDDEN_CLASS},
      .fable-modal .${HIDDEN_CLASS},
      .blandetto-modal .${HIDDEN_CLASS},
      .bf .${HIDDEN_CLASS},
      .album-covers-modal .${HIDDEN_CLASS},
      .mc-modal .${HIDDEN_CLASS},
      .m10-modal .${HIDDEN_CLASS},
      .stk-modal .${HIDDEN_CLASS},
      .lcg-modal .${HIDDEN_CLASS},
      .su-modal .${HIDDEN_CLASS},
      .project9006-modal .${HIDDEN_CLASS},
      .anka-peresild-modal .${HIDDEN_CLASS} {
        display: none !important;
      }

      /* ANKA's native CLOSE was hidden by the previous fixed-header workaround. */
      .anka-peresild-modal .${FLOW_CLASS} .anka-peresild-close {
        display: inline-flex !important;
        position: static !important;
        inset: auto !important;
        width: auto !important;
        height: auto !important;
        min-width: 0 !important;
        max-width: max-content !important;
        transform: none !important;
      }
    `;

    document.head.append(style);
  }

  function normalizeModal(modal, nativeSelector) {
    if (!(modal instanceof HTMLElement)) return;

    const candidates = [];
    for (const selector of SHARED) {
      modal.querySelectorAll(selector).forEach((node) => {
        if (!candidates.includes(node)) candidates.push(node);
      });
    }
    modal.querySelectorAll(nativeSelector).forEach((node) => {
      if (!candidates.includes(node)) candidates.push(node);
    });

    if (!candidates.length) return;

    const chosen = candidates[0];
    candidates.forEach((node) => {
      node.classList.toggle(FLOW_CLASS, node === chosen);
      node.classList.toggle(HIDDEN_CLASS, node !== chosen);
      if (node === chosen) {
        node.removeAttribute('popover');
      }
    });
  }

  function normalize() {
    const master = document.querySelector('.portfolio-master-project-head');
    if (master instanceof HTMLElement) {
      if (master.matches(':popover-open') && typeof master.hidePopover === 'function') {
        try { master.hidePopover(); } catch (_) {}
      }
      master.removeAttribute('popover');
    }

    for (const project of PROJECTS) {
      document.querySelectorAll(project.modal).forEach((modal) => normalizeModal(modal, project.native));
    }
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      normalize();
    });
  }

  installStyles();
  schedule();

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('popstate', schedule);
  [80, 220, 600, 1200].forEach((delay) => setTimeout(schedule, delay));
})();
