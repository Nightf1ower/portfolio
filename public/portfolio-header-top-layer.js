(() => {
  if (window.__portfolioHeaderNormalFlowV7) return;
  window.__portfolioHeaderNormalFlowV7 = true;
  window.__portfolioHeaderNormalFlowV6 = true;
  window.__portfolioHeaderNormalFlowV3 = true;

  const STYLE_ID = 'portfolio-header-top-layer-style';
  const FLOW_CLASS = 'portfolio-flow-project-head';
  const HIDDEN_CLASS = 'portfolio-flow-project-head-hidden';
  const NINETY_HEAD_CLASS = 'project9006-normal-head';

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
      .anka-peresild-modal .${HIDDEN_CLASS} {
        display: none !important;
      }

      /* NINETY Z S: retire every old header implementation. */
      .project9006-modal .project9006-toolbar,
      .project9006-modal .project9006-native-toolbar,
      .project9006-modal .portfolio-stable-head,
      .project9006-modal .portfolio-standard-head,
      .project9006-modal .portfolio-fixed-project-head,
      .project9006-modal .portfolio-qa-static-head,
      .project9006-modal .project9006-flow-head {
        display: none !important;
      }

      /* NINETY Z S now uses one compact in-flow header, same visual logic as the other folders. */
      .project9006-modal > .${NINETY_HEAD_CLASS} {
        position: static !important;
        inset: auto !important;
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        max-width: none !important;
        height: 4rem !important;
        min-height: 4rem !important;
        max-height: 4rem !important;
        margin: 0 !important;
        padding: 0 clamp(1rem,1.8vw,2rem) !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(255,255,255,.18) !important;
        overflow: hidden !important;
        background: #050505 !important;
        color: #fff !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        animation: none !important;
        transition: none !important;
        z-index: auto !important;
      }

      .project9006-modal > .${NINETY_HEAD_CLASS}__label,
      .project9006-modal > .${NINETY_HEAD_CLASS}__close {
        position: static !important;
        inset: auto !important;
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
        background: #fff !important;
        color: #050505 !important;
        font: 900 .68rem/1 Arial,Helvetica,sans-serif !important;
        letter-spacing: .22em !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        flex: 0 0 auto !important;
      }

      .project9006-modal > .${NINETY_HEAD_CLASS}__close {
        min-width: 6.5rem !important;
        cursor: pointer !important;
      }

      .project9006-modal > .${NINETY_HEAD_CLASS}__close:hover {
        background: #a6ff00 !important;
        color: #050505 !important;
      }

      /* Remove the extra top gap that the old fixed NINETY toolbar required. */
      .project9006-modal .project9006-brand {
        padding-top: clamp(3rem,7vw,6rem) !important;
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

      @media (max-width: 820px) {
        .project9006-modal > .${NINETY_HEAD_CLASS} {
          height: 3.65rem !important;
          min-height: 3.65rem !important;
          max-height: 3.65rem !important;
          padding: 0 .75rem !important;
        }

        .project9006-modal > .${NINETY_HEAD_CLASS}__label,
        .project9006-modal > .${NINETY_HEAD_CLASS}__close {
          height: 2.05rem !important;
          min-height: 2.05rem !important;
          max-height: 2.05rem !important;
          padding: 0 .72rem !important;
          font-size: .58rem !important;
          letter-spacing: .18em !important;
        }
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
      if (node === chosen) node.removeAttribute('popover');
    });
  }

  function closeNinety(modal) {
    if (!(modal instanceof HTMLElement) || !modal.isConnected) return;

    const nativeClose = [...modal.querySelectorAll(
      '.project9006-toolbar__close,.project9006-close,.p9006-close,.portfolio-stable-head__close,.portfolio-standard-head__close'
    )].find((node) => !node.closest(`.${NINETY_HEAD_CLASS}`));

    if (nativeClose instanceof HTMLElement) {
      nativeClose.click();
      return;
    }

    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true,
    }));
  }

  function normalizeNinety() {
    document.querySelectorAll('.project9006-modal').forEach((modal) => {
      if (!(modal instanceof HTMLElement)) return;

      let head = modal.querySelector(`:scope > .${NINETY_HEAD_CLASS}`);
      if (!(head instanceof HTMLElement)) {
        head = document.createElement('div');
        head.className = NINETY_HEAD_CLASS;

        const label = document.createElement('span');
        label.className = `${NINETY_HEAD_CLASS}__label`;
        label.textContent = 'NINETY Z S';

        const close = document.createElement('button');
        close.type = 'button';
        close.className = `${NINETY_HEAD_CLASS}__close`;
        close.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          closeNinety(modal);
        });

        head.append(label, close);
        modal.prepend(head);
      } else if (modal.firstElementChild !== head) {
        modal.prepend(head);
      }

      /* Main stylesheet intentionally hides legacy NINETY heads; this is the one real replacement head. */
      head.style.setProperty('display', 'flex', 'important');
      head.style.setProperty('position', 'static', 'important');

      const close = head.querySelector(`.${NINETY_HEAD_CLASS}__close`);
      if (close) {
        close.textContent = document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
          ? 'ЗАКРЫТЬ'
          : 'CLOSE';
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

    normalizeNinety();
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
