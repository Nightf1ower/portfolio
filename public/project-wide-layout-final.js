(() => {
  if (window.__projectWideLayoutFinalV2) return;
  window.__projectWideLayoutFinalV2 = true;

  const STYLE_ID = 'project-wide-layout-final-style';
  const VERSION = 'project-wide-layout-final-2';
  const existing = document.getElementById(STYLE_ID);
  if (existing?.dataset.version === VERSION) return;
  existing?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.dataset.version = VERSION;
  style.textContent = `
    /* Project context: fast role/scope read before the case study. */
    .portfolio-project-context {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      gap: .55rem !important;
      box-sizing: border-box !important;
      width: 100% !important;
      margin: clamp(1.25rem,2.3vw,2rem) 0 clamp(2.5rem,5vw,4.5rem) !important;
    }

    .portfolio-project-context__chip {
      display: inline-flex !important;
      align-items: center !important;
      min-height: 2rem !important;
      margin: 0 !important;
      padding: .55rem .72rem !important;
      border: 1px solid currentColor !important;
      border-radius: 0 !important;
      background: transparent !important;
      color: inherit !important;
      font: 900 .62rem/1 Arial,Helvetica,sans-serif !important;
      letter-spacing: .16em !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
    }

    .zny-modal .portfolio-project-context { padding: 0 !important; }
    .cr-modal .portfolio-project-context { color: #f5f1e8 !important; }

    /* NINETY Z S — remove the legacy narrow desktop container. */
    .project9006-modal {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      overflow-x: clip !important;
    }

    .project9006-modal > .mx-auto,
    .project9006-modal > [class*="max-w-"],
    .project9006-modal .project9006-wide-root {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .project9006-modal .space-y-20,
    .project9006-modal section,
    .project9006-modal .project9006-brand,
    .project9006-modal .project9006-switch-layout,
    .project9006-modal .project9006-logo-pair,
    .project9006-modal .project9006-pendant-wrap,
    .project9006-modal .project9006-lookbook-wrap,
    .project9006-modal .project9006-posters-grid {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
    }

    .project9006-modal .project9006-logo-sheet {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    .project9006-modal .project9006-logo-sheet img,
    .project9006-modal .project9006-lookbook-card img,
    .project9006-modal .project9006-photoshoot-card img {
      width: 100% !important;
      max-width: none !important;
      height: auto !important;
    }

    .project9006-modal .project9006-pendant-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      width: 100% !important;
      max-width: none !important;
    }

    .project9006-modal .project9006-pendant-card:last-child {
      grid-column: 1 / -1 !important;
      width: 100% !important;
      max-width: none !important;
      justify-self: stretch !important;
    }

    /* YABLOCHKO ZELENOE — all five billboards in one wide desktop row. */
    .m10-modal .m10-billboard-grid {
      box-sizing: border-box !important;
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      align-items: start !important;
      gap: clamp(.75rem, 1.25vw, 1.25rem) !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    .m10-modal .m10-billboard-center-row {
      display: contents !important;
      width: auto !important;
      margin: 0 !important;
    }

    .m10-modal .m10-billboard-grid .m10-card,
    .m10-modal .m10-billboard-grid .m10-media {
      box-sizing: border-box !important;
      display: block !important;
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      aspect-ratio: auto !important;
      margin: 0 !important;
      overflow: visible !important;
    }

    .m10-modal .m10-billboard-grid img {
      position: static !important;
      display: block !important;
      width: 100% !important;
      max-width: none !important;
      height: auto !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      object-fit: contain !important;
      transform: none !important;
    }

    /* DXS — posters in three equal columns on wide screens. */
    .m10-modal .m10-dxs-zone .m10-dxs-posters {
      box-sizing: border-box !important;
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      align-items: start !important;
      gap: clamp(.9rem, 1.5vw, 1.4rem) !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
    }

    .m10-modal .m10-dxs-zone .m10-dxs-posters > .m10-card,
    .m10-modal .m10-dxs-zone .m10-dxs-posters .m10-media,
    .m10-modal .m10-dxs-zone .m10-dxs-posters img {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      aspect-ratio: auto !important;
      margin: 0 !important;
      object-fit: contain !important;
    }

    @media (min-width: 1440px) {
      .project9006-modal {
        padding-left: clamp(2rem, 3vw, 4rem) !important;
        padding-right: clamp(2rem, 3vw, 4rem) !important;
      }
    }

    @media (max-width: 1100px) {
      .m10-modal .m10-billboard-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }

      .m10-modal .m10-dxs-zone .m10-dxs-posters {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
    }

    @media (max-width: 720px) {
      .portfolio-project-context { gap: .4rem !important; }
      .portfolio-project-context__chip {
        min-height: 1.8rem !important;
        padding: .48rem .58rem !important;
        font-size: .56rem !important;
        letter-spacing: .12em !important;
      }

      .project9006-modal .project9006-pendant-grid,
      .m10-modal .m10-dxs-zone .m10-dxs-posters {
        grid-template-columns: 1fr !important;
      }

      .project9006-modal .project9006-pendant-card:last-child {
        grid-column: auto !important;
      }

      .m10-modal .m10-billboard-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
    }

    @media (max-width: 460px) {
      .m10-modal .m10-billboard-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  document.head.append(style);

  const PROJECTS = [
    { selector: '.zny-modal', chips: ['GRAPHIC DESIGN', 'PRINTS', 'CAMPAIGN', 'STICKERS'], anchors: ['.zny-head'] },
    { selector: '.fable-modal', chips: ['GRAPHIC DESIGN', 'PRINTS', 'BRAND VISUALS'], anchors: ['h1', 'h2'] },
    { selector: '.anka-peresild-modal', chips: ['AI ILLUSTRATION', '3D MOCKUPS', 'APPAREL'], anchors: ['.anka-peresild-title'] },
    { selector: '.pink-punk-fullscreen', chips: ['GRAPHIC DESIGN', 'PRINTS', 'POSTERS'], anchors: ['h1', 'h2'] },
    { selector: '.cr-modal', chips: ['GRAPHIC DESIGN', 'ALBUM ART', 'MERCH'], anchors: ['.cr-lead', '.cr-title'] },
    { selector: '.blandetto-modal', chips: ['LOGO DESIGN', 'GRAPHICS', 'ACCESSORIES'], anchors: ['h1', 'h2'] },
    { selector: '.project9006-modal', chips: ['IDENTITY', 'LOOKBOOK', 'POSTERS'], anchors: ['.project9006-brand h1', '.project9006-brand h2', '.project9006-brand h3', '.project9006-brand'] },
    { selector: '.vtb-modal', chips: ['MERCH', 'ACCESSORIES', 'PRINTS'], anchors: ['h1', 'h2'] },
    { selector: '.m10-modal', chips: ['GRAPHIC DESIGN', 'MERCH', 'POSTERS'], anchors: ['h1', 'h2'] },
    { selector: '.su-modal', chips: ['DEVELOPMENT', 'LOOKBOOK', 'PACKAGING'], anchors: ['h1', 'h2'] },
  ];

  function createContext(chips) {
    const node = document.createElement('div');
    node.className = 'portfolio-project-context';
    node.dataset.projectContext = VERSION;
    chips.forEach((label) => {
      const chip = document.createElement('span');
      chip.className = 'portfolio-project-context__chip';
      chip.textContent = label;
      node.append(chip);
    });
    return node;
  }

  function enhanceModal(modal, config) {
    if (!(modal instanceof Element) || modal.dataset.projectContext === VERSION) return false;
    if (modal.querySelector(':scope .portfolio-project-context')) {
      modal.dataset.projectContext = VERSION;
      return true;
    }

    const anchor = config.anchors
      .map((selector) => modal.querySelector(selector))
      .find(Boolean);
    if (!anchor) return false;

    const context = createContext(config.chips);
    anchor.after(context);
    modal.dataset.projectContext = VERSION;
    return true;
  }

  function enhanceAll() {
    PROJECTS.forEach((config) => {
      document.querySelectorAll(config.selector).forEach((modal) => enhanceModal(modal, config));
    });
  }

  let frame = 0;
  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      enhanceAll();
    });
  }

  const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => [...mutation.addedNodes].some((node) => (
      node instanceof Element && PROJECTS.some(({ selector }) => node.matches?.(selector) || node.querySelector?.(selector))
    )))) schedule();
  });
  observer.observe(document.body, { childList: true });

  window.addEventListener('load', schedule, { once: true });
  schedule();
})();
