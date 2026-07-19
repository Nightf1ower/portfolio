(() => {
  const VERSION = '9006-layout-3';
  const LOGOS = [
    '/works/90-06/logo-variations/LOGO%201.jpg',
    '/works/90-06/logo-variations/LOGO%203.jpg',
  ];
  const LOGO_SHEET = '/works/90-06/logo-variations/LOGO%204.jpg';
  const POSTERS = [
    '/works/90-06/posters/nzc1.jpg',
    '/works/90-06/posters/nzc2.jpg',
    '/works/90-06/posters/nzc3.jpg',
    '/works/90-06/posters/nzc4.jpg',
    '/works/90-06/posters/nzc5.jpg',
    '/works/90-06/posters/nzc6.jpg',
  ];

  const COPY = {
    ru: {
      projectType: 'Визуальная айдентика и арт-дирекшн',
      chips: ['АЙДЕНТИКА', 'ДИЗАЙН МЕРЧА', 'КАМПЭЙН', 'СЕРИЯ ПОСТЕРОВ'],
      identity: 'АЙДЕНТИКА',
      merch: 'ДИЗАЙН МЕРЧА',
      campaign: 'КАМПЭЙН',
      posters: 'СЕРИЯ ПОСТЕРОВ',
    },
    en: {
      projectType: 'Visual Identity & Art Direction',
      chips: ['IDENTITY', 'MERCH DESIGN', 'PHOTO CAMPAIGN', 'POSTER SERIES'],
      identity: 'IDENTITY',
      merch: 'MERCH DESIGN',
      campaign: 'PHOTO CAMPAIGN',
      posters: 'POSTER SERIES',
    },
  };

  const SECTION_TITLES = {
    identity: ['LOGO VARIATIONS', 'LOGO', 'IDENTITY', 'АЙДЕНТИКА'],
    sheet: ['LOGO SHEET'],
    merch: ['MERCH', 'MERCH DESIGN', 'ДИЗАЙН МЕРЧА'],
    campaign: ['PHOTOSHOOT', 'PHOTO CAMPAIGN', 'КАМПЭЙН'],
    posters: ['POSTERS', 'POSTER SERIES', 'СЕРИЯ ПОСТЕРОВ'],
  };

  const normalize = (value) => (value || '').trim().toUpperCase();
  const getLanguage = () => (localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en');

  function injectStyles() {
    const previous = document.getElementById('project9006-layout-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'project9006-layout-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .project9006-modal .project9006-switch-layout {
        display: block !important;
      }

      .project9006-modal .project9006-switch-controls,
      .project9006-modal .project9006-hidden-action,
      .project9006-modal .project9006-logo-sheet-source {
        display: none !important;
      }

      .project9006-modal .project9006-logo-pair {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: clamp(.75rem, 2vw, 1.25rem) !important;
      }

      .project9006-modal .project9006-logo-card {
        box-sizing: border-box !important;
        width: 100% !important;
        aspect-ratio: 1 / 1 !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(255,255,255,.04) !important;
      }

      .project9006-modal .project9006-logo-card img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        padding: clamp(.75rem, 2.5vw, 1.5rem) !important;
        object-fit: contain !important;
      }

      .project9006-modal .project9006-logo-sheet {
        width: 100% !important;
        margin-top: clamp(1rem, 2.5vw, 1.75rem) !important;
        background: rgba(255,255,255,.04) !important;
      }

      .project9006-modal .project9006-logo-sheet img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-height: none !important;
        object-fit: contain !important;
      }

      .project9006-modal .project9006-merch-media {
        box-sizing: border-box !important;
        width: min(100%, 42rem) !important;
        aspect-ratio: 1 / 1 !important;
        min-height: 0 !important;
        margin-inline: auto !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(255,255,255,.04) !important;
      }

      .project9006-modal .project9006-merch-media img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        padding: 1rem !important;
        object-fit: contain !important;
        transform: none !important;
      }

      .project9006-modal .project9006-photoshoot-list {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: clamp(1.25rem, 3vw, 2rem) !important;
      }

      .project9006-modal .project9006-photoshoot-card {
        display: block !important;
        width: 100% !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        background: transparent !important;
      }

      .project9006-modal .project9006-photoshoot-card img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        padding: 0 !important;
        object-fit: contain !important;
        transform: none !important;
      }

      .project9006-modal .project9006-posters-grid {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 1rem !important;
      }

      .project9006-modal .project9006-poster-card {
        box-sizing: border-box !important;
        width: 100% !important;
        aspect-ratio: 1 / 1 !important;
        min-height: 0 !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(255,255,255,.04) !important;
      }

      .project9006-modal .project9006-poster-card img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        object-fit: cover !important;
      }

      @media (max-width: 900px) {
        .project9006-modal .project9006-posters-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }

      @media (max-width: 560px) {
        .project9006-modal .project9006-posters-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `;
    document.head.append(style);
  }

  function find9006Modal() {
    return Array.from(document.querySelectorAll('div.fixed')).find((node) => {
      const label = node.querySelector('p');
      return label?.textContent?.trim() === '90.06';
    });
  }

  function sectionByTitles(modal, titles) {
    const accepted = new Set(titles.map(normalize));
    return Array.from(modal.querySelectorAll('section')).find((section) => {
      const heading = section.querySelector('h3');
      return accepted.has(normalize(heading?.textContent));
    });
  }

  function setHeading(section, text) {
    const heading = section?.querySelector('h3');
    if (heading && heading.textContent !== text) heading.textContent = text;
  }

  function imageNode(src, alt, loading = 'lazy') {
    const image = document.createElement('img');
    image.src = `${src}?v=${VERSION}`;
    image.alt = alt;
    image.loading = loading;
    image.draggable = false;
    return image;
  }

  function updateProjectCard(lang) {
    const card = Array.from(document.querySelectorAll('#works button, #works article')).find((node) =>
      node.querySelector('h3')?.textContent?.trim() === '90.06'
    );
    if (!card) return;

    const heading = card.querySelector('h3');
    const type = heading?.nextElementSibling;
    if (type?.tagName === 'P' && type.textContent !== COPY[lang].projectType) {
      type.textContent = COPY[lang].projectType;
    }

    const chipWrap = type?.nextElementSibling;
    const chips = chipWrap ? Array.from(chipWrap.querySelectorAll(':scope > span')) : [];
    chips.forEach((chip, index) => {
      const label = COPY[lang].chips[index];
      if (label && chip.textContent !== label) chip.textContent = label;
    });
  }

  function rebuildLogoSection(modal, section, sheetSection) {
    if (!section || section.dataset.layout9006 === VERSION) return;

    const headingRow = section.firstElementChild;
    headingRow?.querySelector('p')?.remove();
    Array.from(section.children).slice(1).forEach((child) => child.remove());

    const pair = document.createElement('div');
    pair.className = 'project9006-logo-pair';
    LOGOS.forEach((src, index) => {
      const card = document.createElement('div');
      card.className = 'project9006-logo-card';
      card.append(imageNode(src, `90.06 logo ${index + 1}`, index === 0 ? 'eager' : 'lazy'));
      pair.append(card);
    });

    const sheet = document.createElement('div');
    sheet.className = 'project9006-logo-sheet';
    sheet.append(imageNode(LOGO_SHEET, '90.06 logo sheet'));
    section.append(pair, sheet);

    if (sheetSection) sheetSection.classList.add('project9006-logo-sheet-source');
    section.dataset.layout9006 = VERSION;
  }

  function simplifyMerchSection(section) {
    if (!section) return;
    const layout = Array.from(section.children).find((child) => child.querySelector?.('img'));
    if (!layout) return;
    layout.classList.add('project9006-switch-layout');
    const columns = Array.from(layout.children);
    const mediaButton = columns[0]?.querySelector('button:has(img)');
    mediaButton?.classList.add('project9006-merch-media');
    if (columns[1]) columns[1].classList.add('project9006-switch-controls');
  }

  function restorePhotoshoot(section) {
    if (!section || section.dataset.layout9006 === VERSION) return;
    const imageButtons = Array.from(section.querySelectorAll('button')).filter((button) => button.querySelector('img'));
    if (!imageButtons.length) return;
    const list = imageButtons[0].parentElement;
    list?.classList.remove('project9006-feature-grid');
    list?.classList.add('project9006-photoshoot-list');
    imageButtons.forEach((button) => {
      button.classList.remove('project9006-feature-card');
      button.classList.add('project9006-photoshoot-card');
    });
    section.dataset.layout9006 = VERSION;
  }

  function hideTextActions(modal) {
    const labels = new Set([
      'СЛЕДУЮЩИЙ ВАРИАНТ',
      'СЛЕДУЮЩАЯ',
      'NEXT IMAGE',
      'NEXT',
      'УВЕЛИЧИТЬ',
      'РАЗВЕРНУТЬ',
      'EXPAND',
    ]);
    modal.querySelectorAll('button').forEach((button) => {
      const text = normalize(button.textContent);
      if (labels.has(text)) button.classList.add('project9006-hidden-action');
    });
  }

  function replacePosters(section) {
    if (!section || section.dataset.layout9006 === VERSION) return;
    const headingRow = section.firstElementChild;
    Array.from(section.children).slice(1).forEach((child) => child.remove());

    const grid = document.createElement('div');
    grid.className = 'project9006-posters-grid';
    POSTERS.forEach((src, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'project9006-poster-card';
      button.setAttribute('aria-label', `Open 90.06 poster ${index + 1}`);
      button.append(imageNode(src, `90.06 poster ${index + 1}`));
      button.addEventListener('click', () => window.open(src, '_blank', 'noopener,noreferrer'));
      grid.append(button);
    });

    if (headingRow) headingRow.after(grid);
    else section.append(grid);
    section.dataset.layout9006 = VERSION;
  }

  function enhance() {
    injectStyles();
    const lang = getLanguage();
    updateProjectCard(lang);

    const modal = find9006Modal();
    if (!modal) return;
    modal.classList.add('project9006-modal');

    const identity = sectionByTitles(modal, SECTION_TITLES.identity);
    const sheet = sectionByTitles(modal, SECTION_TITLES.sheet);
    const merch = sectionByTitles(modal, SECTION_TITLES.merch);
    const campaign = sectionByTitles(modal, SECTION_TITLES.campaign);
    const posters = sectionByTitles(modal, SECTION_TITLES.posters);

    rebuildLogoSection(modal, identity, sheet);
    simplifyMerchSection(merch);
    restorePhotoshoot(campaign);
    hideTextActions(modal);
    replacePosters(posters);

    setHeading(identity, COPY[lang].identity);
    setHeading(merch, COPY[lang].merch);
    setHeading(campaign, COPY[lang].campaign);
    setHeading(posters, COPY[lang].posters);
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', enhance);
  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(enhance, 0);
      setTimeout(enhance, 80);
    }
  });
  enhance();
})();