(() => {
  if (window.__projectCardCategoriesV4) return;
  window.__projectCardCategoriesV4 = true;

  const VERSION = 'project-card-categories-4';
  const STYLE_ID = 'project-card-categories-style';
  const FEATURED_ORDER = ['ZNY', 'FABLE', 'PINK PUNK', 'CARNIVAL RECORDS', 'NINETY Z S', 'VTB DESIGN TEAM'];

  const CATEGORIES = {
    FABLE: ['LOGOS', 'GRAPHICS', 'APPAREL'],
    'ANKA PERESILD': ['APPAREL', 'AI ILLUSTRATIONS', 'MOCKUPS'],
    ZNY: ['DESIGN', 'INFOGRAPHICS', 'STICKERS'],
    BLANDETTO: ['LOGOS', 'GRAPHICS', 'ACCESSORIES'],
    'PINK PUNK': ['GRAPHICS', 'POSTERS'],
    'CARNIVAL RECORDS': ['ALBUM COVERS', 'GRAPHICS', 'MERCH'],
    MERCH: ['POSTERS', 'PRINTS', 'AI ILLUSTRATIONS'],
    'NINETY Z S': ['LOGOS', 'LOOKBOOK', 'POSTERS'],
    'VTB DESIGN TEAM': ['MERCH', 'ACCESSORIES', 'PRINTS'],
    'STAY UGLY': ['DEVELOPMENT', 'LOOKBOOK'],
    POSTERS: ['INFOGRAPHICS', 'PROJECTS', 'PARTIES'],
    STICKERS: ['MNU', 'NIGHTFLOWER'],
    LOGOS: ['IDENTITY', 'BRANDING', 'DEVELOPMENT'],
    'ALBUM COVERS': ['COVER ART', 'GRAPHICS'],
    'COLLAGES PHOTO EDIT': ['MY OWN EDITS'],
  };

  function normalize(value) {
    const title = (value || '')
      .toUpperCase()
      .replace(/\|/g, '')
      .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');

    if (title === 'F ABLE' || title === 'FABLE') return 'FABLE';
    if (title === '90 06' || title === 'NINETY Z S') return 'NINETY Z S';
    if (title === 'STAYUGLY') return 'STAY UGLY';
    if (title === 'COLLAGES PHOTO EDIT') return 'COLLAGES PHOTO EDIT';
    return title;
  }

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      #works .project-card-category-guard { display: none !important; }
      #works .project-card-category-row {
        box-sizing: border-box !important;
        display: flex !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        flex-wrap: wrap !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        gap: .5rem !important;
        margin-top: 1rem !important;
        padding: 0 !important;
        list-style: none !important;
      }
      #works .project-card-category-chip {
        box-sizing: border-box !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 1.65rem !important;
        margin: 0 !important;
        padding: .32rem .58rem !important;
        border: 1px solid rgba(5,5,5,.42) !important;
        background: rgba(255,255,255,.68) !important;
        color: #050505 !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: .58rem !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        letter-spacing: .18em !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        transition: background-color .25s ease, border-color .25s ease !important;
      }
      #works .group:hover .project-card-category-chip {
        border-color: #050505 !important;
        background: #a6ff00 !important;
      }
      @media (max-width: 820px) {
        #works .project-card-category-row { gap: .42rem !important; margin-top: .9rem !important; }
        #works .project-card-category-chip {
          min-height: 1.55rem !important;
          padding: .3rem .5rem !important;
          font-size: clamp(.5rem, 2.15vw, .57rem) !important;
          letter-spacing: .15em !important;
        }
      }
      @media (max-width: 350px) {
        #works .project-card-category-chip { white-space: normal !important; text-align: center !important; }
      }
    `;
    document.head.append(style);
  }

  function getGrid() { return document.querySelector('#works .mt-10.grid'); }

  function getCards() {
    const grid = getGrid();
    if (!grid) return [];
    return [...grid.children].filter((node) =>
      node instanceof HTMLElement && node.matches('article, button') && node.querySelector('h3')
    );
  }

  function reorderFeatured() {
    const grid = getGrid();
    const cards = getCards();
    if (!grid || cards.length < FEATURED_ORDER.length) return;

    const byTitle = new Map(cards.map((card) => [normalize(card.querySelector('h3')?.textContent), card]));
    if (!FEATURED_ORDER.every((title) => byTitle.has(title))) return;

    const featured = FEATURED_ORDER.map((title) => byTitle.get(title));
    const featuredSet = new Set(featured);
    const desired = [...featured, ...cards.filter((card) => !featuredSet.has(card))];
    const alreadyCorrect = desired.every((card, index) => cards[index] === card);
    if (alreadyCorrect) return;

    const fragment = document.createDocumentFragment();
    desired.forEach((card) => fragment.append(card));
    grid.append(fragment);
    grid.dataset.featuredOrder = VERSION;
  }

  function protectGuard(guard) {
    if (guard.dataset.removeProtected === VERSION) return;
    guard.dataset.removeProtected = VERSION;
    try {
      Object.defineProperty(guard, 'remove', { configurable: true, value: () => {} });
    } catch {
      guard.remove = () => {};
    }
  }

  function isLegacyCategoryBlock(node) {
    if (!(node instanceof HTMLElement)) return false;
    if (!node.matches('div, ul, ol')) return false;
    if (node.classList.contains('project-card-category-row')) return true;
    if (node.querySelector('h1, h2, h3, h4, p, img, picture, video, canvas, svg, button, a')) return false;
    const labels = [...node.querySelectorAll('span, li')]
      .map((item) => item.textContent?.trim() || '')
      .filter(Boolean);
    return labels.length > 0 && labels.every((label) => label.length <= 40);
  }

  function findTypeParagraph(content, heading) {
    if (heading.nextElementSibling?.tagName === 'P') return heading.nextElementSibling;
    return [...content.children].find((node) => node.tagName === 'P') || null;
  }

  function findOrCreateRow(heading) {
    const content = heading.parentElement;
    if (!(content instanceof HTMLElement)) return null;
    const typeParagraph = findTypeParagraph(content, heading);
    let guard = content.querySelector(':scope > .project-card-category-guard');
    if (!guard) {
      guard = document.createElement('span');
      guard.className = 'project-card-category-guard';
      guard.hidden = true;
      guard.setAttribute('aria-hidden', 'true');
    }
    protectGuard(guard);

    const existingRows = [...content.querySelectorAll(':scope > .project-card-category-row')];
    let row = existingRows.shift() || document.createElement('div');
    row.className = 'project-card-category-row';
    row.dataset.projectCategoriesFinal = VERSION;
    existingRows.forEach((duplicate) => duplicate.remove());

    [...content.children].forEach((node) => {
      if (node === heading || node === typeParagraph || node === guard || node === row) return;
      if (isLegacyCategoryBlock(node)) node.remove();
    });

    const anchor = typeParagraph || heading;
    if (guard.previousElementSibling !== anchor) anchor.after(guard);
    if (guard.nextElementSibling !== row) guard.after(row);
    return row;
  }

  function updateCard(card) {
    const heading = card.querySelector('h3');
    if (!(heading instanceof HTMLElement)) return;
    const categories = CATEGORIES[normalize(heading.textContent)];
    if (!categories) return;
    const row = findOrCreateRow(heading);
    if (!row) return;

    const current = [...row.children].map((child) => child.textContent?.trim() || '');
    const matches = current.length === categories.length && current.every((value, index) => value === categories[index]);
    if (matches && row.dataset.categorySignature === categories.join('|')) return;

    row.dataset.categorySignature = categories.join('|');
    row.replaceChildren(...categories.map((category) => {
      const chip = document.createElement('span');
      chip.className = 'project-card-category-chip';
      chip.textContent = category;
      return chip;
    }));
  }

  function apply() {
    installStyles();
    reorderFeatured();
    getCards().forEach(updateCard);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  let observer = null;
  let observedGrid = null;
  function observeGrid() {
    const grid = getGrid();
    if (!grid || grid === observedGrid) return Boolean(grid);
    observer?.disconnect();
    observedGrid = grid;
    observer = new MutationObserver(schedule);
    observer.observe(grid, { childList: true, subtree: true, characterData: true });
    return true;
  }

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    const ready = observeGrid();
    schedule();
    if (ready || attempts >= 40) window.clearInterval(retry);
  }, 120);

  document.addEventListener('click', () => setTimeout(schedule, 0), true);
  window.addEventListener('load', () => { observeGrid(); schedule(); }, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  installStyles();
  schedule();
})();
