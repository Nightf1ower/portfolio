(() => {
  if (window.__portfolioHeaderNormalFlowV5) return;
  window.__portfolioHeaderNormalFlowV5 = true;
  window.__portfolioHeaderNormalFlowV4 = true;
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
    { modal: '.anka-peresild-modal', native: '.anka-peresild-head' },
  ];

  const SHARED = [
    '.portfolio-stable-head',
    '.portfolio-standard-head',
    '.portfolio-fixed-project-head',
    '.portfolio-qa-static-head',
  ];

  const ALL_MODALS = [
    '.cr-modal', '.zny-modal', '.vtb-modal', '.pcg-modal', '.fable-modal', '.blandetto-modal', '.bf',
    '.album-covers-modal', '.mc-modal', '.m10-modal', '.stk-modal', '.lcg-modal', '.su-modal',
    '.project9006-modal', '.anka-peresild-modal',
  ].join(',');

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* Old viewport-level/master headers are retired completely. */
      .portfolio-master-project-head,
      .portfolio-master-project-head__label,
      .portfolio-master-project-head__close,
      .project9006-flow-head {
        display: none !important;
      }

      /* One real header lives inside each project and scrolls away with the project content. */
      ${ALL_MODALS} .${FLOW_CLASS} {
        display: flex !important;
        position: static !important;
        inset: auto !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        left: auto !important;
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        height: 4rem !important;
        min-height: 4rem !important;
        max-height: 4rem !important;
        margin: 0 !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        will-change: auto !important;
      }

      ${ALL_MODALS} .${HIDDEN_CLASS} {
        display: none !important;
      }

      /* NINETY Z S: throw away every old custom toolbar and use only the shared stable header. */
      .project9006-modal .project9006-toolbar,
      .project9006-modal .project9006-native-toolbar,
      .project9006-modal .portfolio-standard-head,
      .project9006-modal .portfolio-fixed-project-head,
      .project9006-modal .portfolio-qa-static-head,
      .project9006-modal .project9006-flow-head {
        display: none !important;
        position: static !important;
        inset: auto !important;
        width: auto !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
      }

      .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} {
        display: flex !important;
        position: static !important;
        inset: auto !important;
        width: 100% !important;
        height: 4rem !important;
        min-height: 4rem !important;
        max-height: 4rem !important;
        margin: 0 !important;
        padding: 0 clamp(1rem,1.8vw,2rem) !important;
        background: #050505 !important;
        color: #fff !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(255,255,255,.18) !important;
        transform: none !important;
      }

      .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} .portfolio-stable-head__label,
      .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} .portfolio-stable-head__close {
        display: inline-flex !important;
        position: static !important;
        inset: auto !important;
        width: auto !important;
        min-width: 0 !important;
        max-width: max-content !important;
        height: 2.35rem !important;
        min-height: 2.35rem !important;
        max-height: 2.35rem !important;
        margin: 0 !important;
        padding: 0 1rem !important;
        transform: none !important;
      }

      .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} .portfolio-stable-head__close {
        width: 6.5rem !important;
        min-width: 6.5rem !important;
        max-width: 6.5rem !important;
      }

      /* The old rescue script adds extra top space for a fixed toolbar. Remove it. */
      .project9006-modal .project9006-brand {
        padding-top: clamp(3rem,7vw,6rem) !important;
      }

      /* ANKA native close can remain usable when its native head is selected. */
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

      @media (max-width: 820px) {
        ${ALL_MODALS} .${FLOW_CLASS},
        .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} {
          height: 3.65rem !important;
          min-height: 3.65rem !important;
          max-height: 3.65rem !important;
        }

        .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} {
          padding: 0 .75rem !important;
        }

        .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} .portfolio-stable-head__label,
        .project9006-modal > .portfolio-stable-head.${FLOW_CLASS} .portfolio-stable-head__close {
          height: 2.05rem !important;
          min-height: 2.05rem !important;
          max-height: 2.05rem !important;
          padding: 0 .72rem !important;
        }
      }
    `;

    document.head.append(style);
  }

  function cleanMasterHeader() {
    document.querySelectorAll('.portfolio-master-project-head').forEach((head) => {
      if (head instanceof HTMLElement && head.matches(':popover-open') && typeof head.hidePopover === 'function') {
        try { head.hidePopover(); } catch (_) {}
      }
      head.remove();
    });
  }

  function normalizeRegularModal(modal, nativeSelector) {
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

    const chosen = candidates.find((node) => node.classList.contains('portfolio-stable-head')) || candidates[0];

    candidates.forEach((node) => {
      const use = node === chosen;
      node.classList.toggle(FLOW_CLASS, use);
      node.classList.toggle(HIDDEN_CLASS, !use);
      if (use) node.removeAttribute('popover');
    });

    if (chosen.parentElement === modal && modal.firstElementChild !== chosen) {
      modal.prepend(chosen);
    }
  }

  function normalizeNinety() {
    document.querySelectorAll('.project9006-modal').forEach((modal) => {
      if (!(modal instanceof HTMLElement)) return;

      modal.querySelectorAll('.project9006-flow-head').forEach((node) => node.remove());

      const stableHeads = [...modal.querySelectorAll('.portfolio-stable-head')];
      const chosen = stableHeads[0];
      if (!(chosen instanceof HTMLElement)) return;

      stableHeads.slice(1).forEach((node) => node.remove());

      chosen.classList.add(FLOW_CLASS);
      chosen.classList.remove(HIDDEN_CLASS, 'portfolio-stable-legacy-hidden');
      chosen.removeAttribute('popover');

      modal.querySelectorAll(
        '.project9006-toolbar,.project9006-native-toolbar,.portfolio-standard-head,.portfolio-fixed-project-head,.portfolio-qa-static-head'
      ).forEach((node) => {
        if (node === chosen) return;
        node.classList.remove(FLOW_CLASS);
        node.classList.add(HIDDEN_CLASS);
      });

      if (modal.firstElementChild !== chosen) modal.prepend(chosen);
    });
  }

  function normalize() {
    cleanMasterHeader();
    normalizeNinety();

    for (const project of PROJECTS) {
      document.querySelectorAll(project.modal).forEach((modal) => normalizeRegularModal(modal, project.native));
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
