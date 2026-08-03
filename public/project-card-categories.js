(() => {
  if (window.__projectCardCategoriesV1) return;
  window.__projectCardCategoriesV1 = true;

  const VERSION = 'project-card-categories-1';
  const STYLE_ID = 'project-card-categories-style';

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
        #works .project-card-category-row {
          gap: .42rem !important;
          margin-top: .9rem !important;
        }

        #works .project-card-category-chip {
          min-height: 1.55rem !important;
          padding: .3rem .5rem !important;
          font-size: clamp(.5rem, 2.15vw, .57rem) !important;
          letter-spacing: .15em !important;
        }
      }

      @media (max-width: 350px) {
        #works .project-card-category-chip {
          white-space: normal !important;
          text-align: center !important;
        }
      }
    `;
    document.head.append(style);
  }

  function getCards() {
    const grid = document.querySelector('#works .mt-10.grid');
    if (!grid) return [];
    return [...grid.children].filter((node) =>
      node instanceof HTMLElement &&
      node.matches('article, button') &&
      node.querySelector('h3')
    );
  }

  function findOrCreateRow(heading) {
    const content = heading.parentElement;
    if (!(content instanceof HTMLElement)) return null;

    let row = content.querySelector(':scope > .project-card-category-row');
    if (row) return row;

    const typeParagraph = heading.nextElementSibling?.tagName === 'P'
      ? heading.nextElementSibling
      : [...content.children].find((node) => node.tagName === 'P');

    const possibleOldRow = typeParagraph?.nextElementSibling;
    if (
      possibleOldRow instanceof HTMLElement &&
      possibleOldRow.tagName === 'DIV' &&
      !possibleOldRow.querySelector('img, picture, video, h1, h2, h3, p')
    ) {
      row = possibleOldRow;
      row.className = 'project-card-category-row';
      return row;
    }

    row = document.createElement('div');
    row.className = 'project-card-category-row';
    if (typeParagraph) typeParagraph.after(row);
    else heading.after(row);
    return row;
  }

  function updateCard(card) {
    const heading = card.querySelector('h3');
    if (!(heading instanceof HTMLElement)) return;

    const key = normalize(heading.textContent);
    const categories = CATEGORIES[key];
    if (!categories) return;

    const row = findOrCreateRow(heading);
    if (!row) return;

    const signature = categories.join('|');
    if (row.dataset.categorySignature === signature && row.children.length === categories.length) return;

    row.dataset.categorySignature = signature;
    row.replaceChildren(...categories.map((category) => {
      const chip = document.createElement('span');
      chip.className = 'project-card-category-chip';
      chip.textContent = category;
      return chip;
    }));
  }

  function apply() {
    installStyles();
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

  new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) =>
      mutation.type === 'characterData' ||
      [...mutation.addedNodes].some((node) => node instanceof Element)
    );
    if (relevant) schedule();
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  document.addEventListener('click', schedule, true);
  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule, { passive: true });

  installStyles();
  schedule();
})();
