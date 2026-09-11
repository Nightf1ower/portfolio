(() => {
  if (window.__portfolioHeaderNormalFlowV8) return;
  window.__portfolioHeaderNormalFlowV8 = true;
  window.__portfolioHeaderNormalFlowV7 = true;
  window.__portfolioHeaderNormalFlowV6 = true;
  window.__portfolioHeaderNormalFlowV3 = true;

  /* Prevent the temporary inline NINETY V2 patch from installing its style-attribute observer. */
  window.__ninetyHeaderFlowFixV2 = true;

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

  const NINETY_COPY = {
    ru: 'NINETY Z S — независимый творческий бренд, объединяющий одежду, графический дизайн и визуальные эксперименты.',
    en: 'NINETY Z S is an independent creative brand that brings together clothing, graphic design, and visual experimentation.',
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .portfolio-master-project-head,
      .portfolio-master-project-head__label,
      .portfolio-master-project-head__close {
        display: none !important;
        position: static !important;
      }

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

      /* NINETY has exactly one in-flow toolbar; no fixed/sticky/master replacement. */
      .project9006-modal > .project9006-toolbar {
        box-sizing: border-box !important;
        display: flex !important;
        position: static !important;
        inset: auto !important;
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
        background: #050505 !important;
        transform: none !important;
        translate: none !important;
        z-index: auto !important;
      }

      .project9006-modal > .project9006-toolbar > .project9006-toolbar__label,
      .project9006-modal > .project9006-toolbar > .project9006-toolbar__close {
        box-sizing: border-box !important;
        display: inline-flex !important;
        position: static !important;
        inset: auto !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
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
        flex: 0 0 auto !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .project9006-modal > .project9006-toolbar > .project9006-toolbar__close {
        min-width: 6.5rem !important;
        cursor: pointer !important;
      }

      .project9006-modal > .project9006-toolbar > .project9006-toolbar__close:hover {
        background: #a6ff00 !important;
      }

      .project9006-modal > .project9006-normal-head,
      .project9006-modal > .portfolio-stable-head,
      .project9006-modal > .portfolio-standard-head,
      .project9006-modal > .portfolio-fixed-project-head,
      .project9006-modal > .portfolio-qa-static-head,
      .project9006-modal .project9006-brand {
        display: none !important;
      }

      .project9006-modal > .portfolio-stable-intro {
        box-sizing: border-box !important;
        display: block !important;
        position: static !important;
        inset: auto !important;
        width: 100% !important;
        max-width: none !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        margin: 0 !important;
        padding: clamp(2.5rem,5vw,5rem) clamp(1rem,3.2vw,4rem) clamp(2.5rem,4vw,4rem) !important;
        overflow: visible !important;
        transform: none !important;
        translate: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

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

      @media (max-width:820px) {
        .project9006-modal > .project9006-toolbar {
          height: 3.65rem !important;
          min-height: 3.65rem !important;
          max-height: 3.65rem !important;
          padding: 0 .75rem !important;
        }
        .project9006-modal > .project9006-toolbar > .project9006-toolbar__label,
        .project9006-modal > .project9006-toolbar > .project9006-toolbar__close {
          height: 2.05rem !important;
          min-height: 2.05rem !important;
          max-height: 2.05rem !important;
          padding: 0 .72rem !important;
          font-size: .58rem !important;
          letter-spacing: .18em !important;
        }
        .project9006-modal > .portfolio-stable-intro {
          padding: 2.5rem 1rem !important;
        }
      }
    `;

    document.head.append(style);
  }

  function force(node, property, value) {
    if (!(node instanceof HTMLElement)) return;
    if (node.style.getPropertyValue(property) === value && node.style.getPropertyPriority(property) === 'important') return;
    node.style.setProperty(property, value, 'important');
  }

  function hide(node) {
    if (!(node instanceof HTMLElement)) return;
    force(node, 'display', 'none');
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

  function normalizeCloseText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().toUpperCase();
  }

  function findRealNinetyClose(modal, visibleClose) {
    return [...modal.querySelectorAll('button,[role="button"]')].find((button) => {
      if (!(button instanceof HTMLElement) || button === visibleClose) return false;
      if (button.closest('.project9006-toolbar,.project9006-normal-head,.portfolio-stable-head,.desktop-unified-lightbox')) return false;
      const text = normalizeCloseText([
        button.textContent,
        button.getAttribute('aria-label'),
        button.getAttribute('title'),
      ].filter(Boolean).join(' '));
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ' || text.includes('CLOSE PROJECT') || text.includes('ЗАКРЫТЬ ПРОЕКТ');
    }) || null;
  }

  function bindNinetyClose(close, modal) {
    if (!(close instanceof HTMLButtonElement) || close.dataset.ninetyRealClose === '1') return;
    close.dataset.ninetyRealClose = '1';
    close.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const realClose = findRealNinetyClose(modal, close);
      if (realClose instanceof HTMLElement) {
        realClose.click();
        return;
      }

      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        cancelable: true,
      }));
    }, true);
  }

  function makeMetaItem(label, value) {
    const item = document.createElement('div');
    item.className = 'portfolio-project-metadata__item';

    const key = document.createElement('p');
    key.className = 'portfolio-project-metadata__label';
    key.textContent = label;

    const text = document.createElement('p');
    text.className = 'portfolio-project-metadata__value';
    text.textContent = value;

    item.append(key, text);
    return item;
  }

  function ensureNinetyMetadata(modal, intro) {
    let meta = modal.querySelector('.portfolio-project-metadata[data-project-metadata="ninety-z-s"]') || modal.querySelector('.portfolio-project-metadata');
    if (!(meta instanceof HTMLElement)) {
      meta = document.createElement('section');
      meta.className = 'portfolio-project-metadata';
      meta.dataset.projectMetadata = 'ninety-z-s';
      meta.append(
        makeMetaItem('YEAR', '2024-2025'),
        makeMetaItem('ROLE', 'Graphic Designer'),
        makeMetaItem('WHAT I DID', 'Identity, Merch, Posters, Photo Editing'),
      );
    }

    force(meta, 'display', 'grid');
    force(meta, 'position', 'static');
    force(meta, 'width', '100%');
    force(meta, 'height', 'auto');
    force(meta, 'min-height', '0px');
    force(meta, 'max-height', 'none');
    force(meta, 'margin', '2rem 0 0');
    force(meta, 'padding', '0px');
    force(meta, 'overflow', 'visible');

    const about = intro.querySelector('.portfolio-stable-intro__about');
    if (about instanceof HTMLElement) {
      if (meta.nextElementSibling !== about) about.before(meta);
    } else if (meta.parentElement !== intro) {
      intro.append(meta);
    }
  }

  function ensureNinetyIntro(modal, toolbar) {
    let intro = modal.querySelector(':scope > .portfolio-stable-intro');
    if (!(intro instanceof HTMLElement)) {
      intro = document.createElement('section');
      intro.className = 'portfolio-stable-intro';
      intro.innerHTML = '<h1 class="portfolio-stable-intro__title"></h1><div class="portfolio-stable-intro__chips"></div><div class="portfolio-stable-intro__about"><p class="portfolio-stable-intro__about-label"></p><p class="portfolio-stable-intro__about-text"></p></div>';
      toolbar.after(intro);
    } else if (toolbar.nextElementSibling !== intro) {
      toolbar.after(intro);
    }

    force(intro, 'display', 'block');
    force(intro, 'position', 'static');
    force(intro, 'inset', 'auto');
    force(intro, 'box-sizing', 'border-box');
    force(intro, 'width', '100%');
    force(intro, 'max-width', 'none');
    force(intro, 'height', 'auto');
    force(intro, 'min-height', '0px');
    force(intro, 'max-height', 'none');
    force(intro, 'margin', '0px');
    force(intro, 'padding', 'clamp(2.5rem, 5vw, 5rem) clamp(1rem, 3.2vw, 4rem) clamp(2.5rem, 4vw, 4rem)');
    force(intro, 'overflow', 'visible');
    force(intro, 'transform', 'none');
    force(intro, 'translate', 'none');
    force(intro, 'opacity', '1');
    force(intro, 'visibility', 'visible');

    const title = intro.querySelector('.portfolio-stable-intro__title');
    if (title instanceof HTMLElement) title.textContent = 'NINETY Z S';

    const chips = intro.querySelector('.portfolio-stable-intro__chips');
    if (chips instanceof HTMLElement && !chips.childElementCount) {
      ['IDENTITY','PENDANT','LOOKBOOK','POSTERS'].forEach((text) => {
        const chip = document.createElement('span');
        chip.className = 'portfolio-stable-intro__chip';
        chip.textContent = text;
        chips.append(chip);
      });
    }

    const about = intro.querySelector('.portfolio-stable-intro__about');
    const aboutLabel = intro.querySelector('.portfolio-stable-intro__about-label');
    const aboutText = intro.querySelector('.portfolio-stable-intro__about-text');
    if (about instanceof HTMLElement) {
      force(about, 'display', 'flex');
      about.classList.remove('is-empty');
    }
    if (aboutLabel instanceof HTMLElement) aboutLabel.textContent = language() === 'ru' ? 'О БРЕНДЕ' : 'ABOUT THE BRAND';
    if (aboutText instanceof HTMLElement) aboutText.textContent = NINETY_COPY[language()];

    ensureNinetyMetadata(modal, intro);
  }

  function normalizeNinety() {
    document.querySelectorAll('.project9006-modal').forEach((modal) => {
      if (!(modal instanceof HTMLElement)) return;

      modal.querySelectorAll(':scope > .project9006-normal-head').forEach((node) => node.remove());
      hide(modal.querySelector(':scope > .portfolio-stable-head'));
      hide(modal.querySelector(':scope > .portfolio-standard-head'));
      hide(modal.querySelector(':scope > .portfolio-fixed-project-head'));
      hide(modal.querySelector(':scope > .portfolio-qa-static-head'));
      hide(modal.querySelector('.project9006-brand'));

      let toolbar = modal.querySelector(':scope > .project9006-toolbar');
      if (!(toolbar instanceof HTMLElement)) {
        toolbar = document.createElement('div');
        toolbar.className = 'project9006-toolbar';
        modal.prepend(toolbar);
      } else if (modal.firstElementChild !== toolbar) {
        modal.prepend(toolbar);
      }

      let label = toolbar.querySelector('.project9006-toolbar__label');
      if (!(label instanceof HTMLElement)) {
        label = document.createElement('span');
        label.className = 'project9006-toolbar__label';
        toolbar.prepend(label);
      }
      label.textContent = 'NINETY Z S';

      let close = toolbar.querySelector('.project9006-toolbar__close');
      if (!(close instanceof HTMLButtonElement)) {
        close = document.createElement('button');
        close.type = 'button';
        close.className = 'project9006-toolbar__close';
        toolbar.append(close);
      }
      close.textContent = language() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
      bindNinetyClose(close, modal);

      force(toolbar, 'display', 'flex');
      force(toolbar, 'position', 'static');
      force(toolbar, 'inset', 'auto');
      force(toolbar, 'z-index', 'auto');
      force(toolbar, 'box-sizing', 'border-box');
      force(toolbar, 'align-items', 'center');
      force(toolbar, 'justify-content', 'space-between');
      force(toolbar, 'width', '100%');
      force(toolbar, 'max-width', 'none');
      force(toolbar, 'height', '4rem');
      force(toolbar, 'min-height', '4rem');
      force(toolbar, 'max-height', '4rem');
      force(toolbar, 'margin', '0px');
      force(toolbar, 'padding', '0 clamp(1rem, 1.8vw, 2rem)');
      force(toolbar, 'border', '0px');
      force(toolbar, 'border-bottom', '1px solid rgba(255,255,255,.18)');
      force(toolbar, 'background', '#050505');
      force(toolbar, 'transform', 'none');
      force(toolbar, 'translate', 'none');
      force(toolbar, 'flex', '0 0 4rem');
      force(toolbar, 'overflow', 'hidden');

      [label, close].forEach((button) => {
        force(button, 'display', 'inline-flex');
        force(button, 'position', 'static');
        force(button, 'inset', 'auto');
        force(button, 'align-items', 'center');
        force(button, 'justify-content', 'center');
        force(button, 'width', 'auto');
        force(button, 'height', '2.35rem');
        force(button, 'min-height', '2.35rem');
        force(button, 'max-height', '2.35rem');
        force(button, 'margin', '0px');
        force(button, 'padding', '0 1rem');
        force(button, 'border', '0px');
        force(button, 'background', '#ffffff');
        force(button, 'color', '#050505');
        force(button, 'transform', 'none');
        force(button, 'flex', '0 0 auto');
        force(button, 'opacity', '1');
        force(button, 'visibility', 'visible');
      });
      force(close, 'min-width', '6.5rem');
      force(close, 'cursor', 'pointer');

      ensureNinetyIntro(modal, toolbar);
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

  /* Child additions/removals only. No style/class attribute observer: it caused the NINETY feedback loop. */
  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const card = target?.closest('#works article,#works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'NINETY Z S' && title !== '90.06') return;
    [0, 80, 220, 460, 700, 1100].forEach((delay) => setTimeout(schedule, delay));
  }, true);

  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('popstate', schedule);
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
  [80, 220, 600, 1200].forEach((delay) => setTimeout(schedule, delay));
})();
