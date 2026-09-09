(() => {
  if (window.__portfolioFolderFinalFixesV1) return;
  window.__portfolioFolderFinalFixesV1 = true;

  const VERSION = 'portfolio-folder-final-fixes-1';
  const STYLE_ID = 'portfolio-folder-final-fixes-style';

  const PROJECTS = [
    { slug: 'carnival-records', selector: '.cr-modal', title: 'CARNIVAL RECORDS' },
    { slug: 'zny', selector: '.zny-modal', title: 'ZNY' },
    { slug: 'vtb-design-team', selector: '.vtb-modal', title: 'VTB DESIGN TEAM' },
    { slug: 'posters', selector: '.pcg-modal', title: 'POSTERS' },
    { slug: 'fable', selector: '.fable-modal', title: 'F | ABLE' },
    { slug: 'blandetto', selector: '.blandetto-modal, .bf', title: 'BLANDETTO' },
    { slug: 'album-covers', selector: '.album-covers-modal', title: 'ALBUM COVERS' },
    { slug: 'merch', selector: '.mc-modal, .m10-modal', title: 'MERCH' },
    { slug: 'stickers', selector: '.stk-modal', title: 'STICKERS' },
    { slug: 'logos', selector: '.lcg-modal', title: 'LOGOS' },
    { slug: 'stay-ugly', selector: '.su-modal', title: 'STAY UGLY' },
    { slug: 'ninety-z-s', selector: '.project9006-modal', title: 'NINETY Z S', dark: true },
    { slug: 'anka-peresild', selector: '.anka-peresild-modal', title: 'ANKA PERESILD' },
  ];

  const HEADER_MODAL_SELECTORS = [
    '.cr-modal', '.zny-modal', '.vtb-modal', '.pcg-modal', '.fable-modal', '.blandetto-modal', '.bf',
    '.album-covers-modal', '.mc-modal', '.m10-modal', '.stk-modal', '.lcg-modal', '.su-modal',
    '.project9006-modal', '.anka-peresild-modal',
  ];

  const NATIVE_CLOSE_SELECTOR = [
    '.cr-close', '.zny-close', '.vtb-close', '.pcg-close', '.fable-close',
    '.blandetto-close', '.bf-x', '.bf-close', '.bld-close',
    '.album-covers-close', '.mc-close', '.m10-close', '.stk-close', '.lcg-close', '.su-close',
    '.project9006-toolbar__close', '.project9006-close', '.p9006-close', '.anka-peresild-close',
    '.portfolio-standard-head__close', '.portfolio-stable-head__close',
  ].join(',');

  const LIGHTBOX_SELECTORS = [
    '.desktop-unified-lightbox', '.album-covers-lightbox', '.album-covers-light', '.cr-final-lightbox',
    '.cr-light', '.cr-lightbox', '.zny-light', '.zny-lightbox', '.fable-light', '.fable-lightbox',
    '.bf-light', '.blandetto-lightbox', '.su-light', '.su-lightbox', '.m10-light', '.mc-light',
    '.mc-lightbox', '.project9006-lightbox', '.pcg-light', '.pcg-lightbox', '.stk-light', '.lcg-light',
    '.lcg-lightbox', '.anka-peresild-lightbox', '.vtb-light',
  ];

  const hiddenHeadSelectors = HEADER_MODAL_SELECTORS.flatMap((modal) => [
    `${modal} .portfolio-stable-head`,
    `${modal} .portfolio-standard-head`,
    `${modal} .portfolio-fixed-project-head`,
    `${modal} .portfolio-qa-static-head`,
  ]).join(',');

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      /* Remove separator rules from the metadata/intro area in every project. */
      .portfolio-project-metadata,
      .portfolio-project-metadata__item,
      .portfolio-standard-intro,
      .portfolio-stable-intro,
      .portfolio-standard-intro__inner,
      .portfolio-stable-intro__about,
      .portfolio-standard-intro__about {
        border-top: 0 !important;
        border-right: 0 !important;
        border-bottom: 0 !important;
        border-left: 0 !important;
      }

      .portfolio-project-metadata__item:last-child {
        border: 0 !important;
      }

      /* NINETY Z S uses a dark intro; its metadata must remain readable. */
      .project9006-modal .portfolio-project-metadata,
      .project9006-modal .portfolio-project-metadata__value {
        color: #fff !important;
      }
      .project9006-modal .portfolio-project-metadata__label {
        color: rgba(255,255,255,.58) !important;
      }

      /* Hide every in-modal header for the projects handled by the viewport-level master header. */
      ${hiddenHeadSelectors} {
        display: none !important;
      }

      .portfolio-master-project-head {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: auto !important;
        z-index: 2200000 !important;
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100vw !important;
        height: 4rem !important;
        min-height: 4rem !important;
        max-height: 4rem !important;
        margin: 0 !important;
        padding: 0 clamp(1rem,1.8vw,2rem) !important;
        border: 0 !important;
        background: #fff !important;
        color: #050505 !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        animation: none !important;
        transition: none !important;
        pointer-events: auto !important;
      }

      .portfolio-master-project-head.is-dark {
        background: #050505 !important;
        color: #fff !important;
      }

      .portfolio-master-project-head__label,
      .portfolio-master-project-head__close {
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
        background: #050505 !important;
        color: #fff !important;
        font: 900 .68rem/1 Arial, Helvetica, sans-serif !important;
        letter-spacing: .22em !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        transform: none !important;
        translate: none !important;
        scale: none !important;
        rotate: none !important;
        flex: 0 0 auto !important;
      }

      .portfolio-master-project-head.is-dark .portfolio-master-project-head__label,
      .portfolio-master-project-head.is-dark .portfolio-master-project-head__close {
        background: #fff !important;
        color: #050505 !important;
      }

      .portfolio-master-project-head__close {
        cursor: pointer !important;
      }
      .portfolio-master-project-head__close:hover {
        background: #a6ff00 !important;
        color: #050505 !important;
      }

      /* Keep ANKA's old close controls from becoming giant through legacy head rules. */
      .anka-peresild-modal .anka-peresild-close,
      .anka-peresild-modal [class*="close"].portfolio-qa-static-head {
        display: none !important;
        position: static !important;
        inset: auto !important;
        width: auto !important;
        height: auto !important;
      }

      /* Extend the homepage brand list without fighting the older QA text observer. */
      #top .portfolio-hero-brands::after {
        content: " | AND OTHERS...";
      }

      @media (max-width: 820px) {
        .portfolio-master-project-head {
          height: 3.65rem !important;
          min-height: 3.65rem !important;
          max-height: 3.65rem !important;
          padding: 0 .75rem !important;
        }
        .portfolio-master-project-head__label,
        .portfolio-master-project-head__close {
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

  function visible(node) {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    if (css.display === 'none' || css.visibility === 'hidden' || Number(css.opacity || 1) === 0) return false;
    const rect = node.getBoundingClientRect();
    return rect.width > 2 && rect.height > 2;
  }

  function activeProject() {
    for (const project of PROJECTS) {
      const modal = [...document.querySelectorAll(project.selector)].find(visible);
      if (modal) return { project, modal };
    }
    return null;
  }

  function lightboxOpen() {
    return LIGHTBOX_SELECTORS.some((selector) => [...document.querySelectorAll(selector)].some(visible));
  }

  function findNativeClose(modal) {
    const explicit = [...modal.querySelectorAll(NATIVE_CLOSE_SELECTOR)]
      .find((button) => !button.closest('.desktop-unified-lightbox'));
    if (explicit) return explicit;

    return [...modal.querySelectorAll('button,[role="button"]')].find((button) => {
      const text = String([
        button.textContent,
        button.getAttribute('aria-label'),
        button.getAttribute('title'),
      ].filter(Boolean).join(' ')).replace(/\s+/g, ' ').trim().toUpperCase();
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ' || text.includes('CLOSE PROJECT') || text.includes('ЗАКРЫТЬ ПРОЕКТ');
    }) || null;
  }

  let internalEscape = false;

  function closeProject(modal) {
    if (!(modal instanceof HTMLElement) || !modal.isConnected) return;

    const nativeClose = findNativeClose(modal);
    if (nativeClose) {
      nativeClose.click();
    }

    setTimeout(() => {
      if (!modal.isConnected) return;
      internalEscape = true;
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        cancelable: true,
      }));
      internalEscape = false;
    }, 40);

    /* Blandetto is fully imperative, so a final fallback can safely remove it and restore scrolling. */
    if (modal.matches('.bf, .blandetto-modal')) {
      setTimeout(() => {
        if (!modal.isConnected) return;
        modal.remove();
        document.body.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('overflow');
      }, 120);
    }
  }

  function ensureMasterHeader() {
    const active = activeProject();
    let head = document.querySelector(':scope > body > .portfolio-master-project-head');

    if (!active) {
      head?.remove();
      return;
    }

    const { project, modal } = active;
    if (!head) {
      head = document.createElement('div');
      head.className = 'portfolio-master-project-head';

      const label = document.createElement('span');
      label.className = 'portfolio-master-project-head__label';

      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'portfolio-master-project-head__close';
      close.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const current = activeProject();
        if (current) closeProject(current.modal);
      });

      head.append(label, close);
      document.body.append(head);
    }

    head.dataset.project = project.slug;
    head.classList.toggle('is-dark', Boolean(project.dark));
    head.querySelector('.portfolio-master-project-head__label').textContent = project.title;
    head.querySelector('.portfolio-master-project-head__close').textContent =
      document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';

    modal.dataset.masterProjectHeader = VERSION;
  }

  window.addEventListener('keydown', (event) => {
    if (internalEscape || event.key !== 'Escape') return;
    if (lightboxOpen()) return;

    const active = activeProject();
    if (!active) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    closeProject(active.modal);
  }, true);

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      ensureMasterHeader();
    });
  }

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  });
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('popstate', schedule);
  window.addEventListener('resize', schedule, { passive: true });

  installStyles();
  schedule();
  [80, 220, 600, 1200].forEach((delay) => setTimeout(schedule, delay));
})();