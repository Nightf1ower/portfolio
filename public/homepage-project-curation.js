(() => {
  if (window.__homepageProjectCurationV1) return;
  window.__homepageProjectCurationV1 = true;

  const VERSION = 'homepage-project-curation-1';
  const STYLE_ID = 'homepage-project-curation-style';
  const FEATURED_COUNT = 8;

  const ORDER = [
    { key: 'CARNIVAL RECORDS', aliases: ['CARNIVAL RECORDS'] },
    { key: 'ZNY', aliases: ['ZNY'] },
    { key: 'VTB DESIGN TEAM', aliases: ['VTB DESIGN TEAM'] },
    { key: 'NINETY Z S', aliases: ['NINETY Z S', '90.06', '90 06', '9006'] },
    { key: 'ANKA PERESILD', aliases: ['ANKA PERESILD'] },
    { key: 'POSTERS', aliases: ['POSTERS'] },
    { key: 'FABLE', aliases: ['F | ABLE', 'FABLE', 'F ABLE'] },
    { key: 'COLLAGES PHOTO EDIT', aliases: ['COLLAGES PHOTO EDIT', 'COLLAGES (PHOTO EDIT)', 'COLLAGES'] },
    { key: 'PINK PUNK', aliases: ['PINK PUNK', 'PINKPUNK'] },
    { key: 'BLANDETTO', aliases: ['BLANDETTO'] },
    { key: 'ALBUM COVERS', aliases: ['ALBUM COVERS'] },
    { key: 'MERCH', aliases: ['MERCH'] },
    { key: 'STICKERS', aliases: ['STICKERS'] },
    { key: 'LOGOS', aliases: ['LOGOS', 'ЛОГОТИПЫ'] },
    { key: 'STAY UGLY', aliases: ['STAY UGLY', 'STAYUGLY'] },
  ];

  const COPY = {
    en: 'VIEW ALL PROJECTS',
    ru: 'ПОКАЗАТЬ ВСЕ ПРОЕКТЫ',
  };

  let expanded = false;
  let scheduled = false;
  let observer = null;
  let observedGrid = null;

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/\|/g, ' ')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  const aliasMap = new Map();
  ORDER.forEach((project) => {
    project.aliases.forEach((alias) => aliasMap.set(normalize(alias), project.key));
  });

  function grid() {
    return document.querySelector('#works .mt-10.grid');
  }

  function cards(root = grid()) {
    if (!root) return [];
    return [...root.children].filter((node) => (
      node instanceof HTMLElement
      && node.matches('article,button')
      && node.querySelector('h3')
    ));
  }

  function cardKey(card) {
    return aliasMap.get(normalize(card?.querySelector('h3')?.textContent)) || '';
  }

  function numberNode(card) {
    return [...card.querySelectorAll('span,small,p')]
      .find((node) => /^\d{2}$/.test((node.textContent || '').trim())) || null;
  }

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      #works .mt-10.grid > .homepage-project-curation-hidden {
        display: none !important;
      }

      #works .homepage-project-curation-controls {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        margin: clamp(1rem, 2vw, 1.6rem) 0 0 !important;
        padding: 0 !important;
      }

      #works .homepage-project-curation-toggle {
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        min-height: 4.2rem !important;
        margin: 0 !important;
        padding: 1rem 1.25rem !important;
        border: 1px solid #050505 !important;
        border-radius: 0 !important;
        background: #050505 !important;
        color: #fff !important;
        font: 900 clamp(.7rem, .85vw, .84rem)/1 Arial, Helvetica, sans-serif !important;
        letter-spacing: .22em !important;
        text-align: center !important;
        text-transform: uppercase !important;
        cursor: pointer !important;
        transition: background-color .22s ease, color .22s ease !important;
      }

      #works .homepage-project-curation-toggle:hover,
      #works .homepage-project-curation-toggle:focus-visible {
        background: #a6ff00 !important;
        color: #050505 !important;
        outline: none !important;
      }

      @media (max-width: 820px) {
        #works .homepage-project-curation-controls {
          margin-top: .85rem !important;
        }
        #works .homepage-project-curation-toggle {
          min-height: 3.8rem !important;
          padding: .95rem 1rem !important;
          font-size: .66rem !important;
          letter-spacing: .18em !important;
        }
      }
    `;
    document.head.append(style);
  }

  function ensureControls(root, visibleProjectCount) {
    const container = root?.parentElement;
    if (!(container instanceof HTMLElement)) return;

    let controls = container.querySelector(':scope > .homepage-project-curation-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'homepage-project-curation-controls';
      controls.dataset.version = VERSION;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'homepage-project-curation-toggle';
      button.addEventListener('click', () => {
        expanded = true;
        scheduleApply();
      });

      controls.append(button);
      root.after(controls);
    }

    const button = controls.querySelector('.homepage-project-curation-toggle');
    if (button) {
      button.textContent = COPY[language()];
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      button.setAttribute('aria-controls', 'works');
    }

    controls.hidden = expanded || visibleProjectCount <= FEATURED_COUNT;
  }

  function applyOrderAndVisibility() {
    installStyles();
    const root = grid();
    if (!root) return 0;

    const available = cards(root);
    const byKey = new Map();
    available.forEach((card) => {
      const key = cardKey(card);
      if (key && !byKey.has(key)) byKey.set(key, card);
    });

    let matched = 0;
    ORDER.forEach((project, index) => {
      const card = byKey.get(project.key);
      if (!card) return;
      matched += 1;

      card.dataset.homepageCurationKey = project.key;
      card.dataset.homepageCurationOrder = String(index + 1);
      card.style.setProperty('order', String(index + 1), 'important');

      const marker = numberNode(card);
      const nextNumber = String(index + 1).padStart(2, '0');
      if (marker && marker.textContent?.trim() !== nextNumber) marker.textContent = nextNumber;

      card.classList.toggle('homepage-project-curation-hidden', !expanded && index >= FEATURED_COUNT);
    });

    ensureControls(root, matched);
    root.dataset.homepageProjectCuration = expanded ? 'all' : 'featured';
    return matched;
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyOrderAndVisibility();
      watchGrid();
    });
  }

  function watchGrid() {
    const root = grid();
    if (!root || root === observedGrid) return Boolean(root);
    observer?.disconnect();
    observedGrid = root;
    observer = new MutationObserver(scheduleApply);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return true;
  }

  new MutationObserver(scheduleApply).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    const matched = applyOrderAndVisibility();
    watchGrid();
    if (matched >= ORDER.length || attempts >= 100) window.clearInterval(retry);
  }, 120);

  window.addEventListener('load', scheduleApply, { once: true });
  installStyles();
  scheduleApply();
})();
