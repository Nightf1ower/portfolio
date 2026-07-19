(() => {
  const VERSION = '9006-layout-2';
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

  function injectStyles() {
    if (document.getElementById('project9006-layout-style')) return;
    const style = document.createElement('style');
    style.id = 'project9006-layout-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .project9006-modal .project9006-switch-layout {
        display: block !important;
      }

      .project9006-modal .project9006-switch-controls {
        display: none !important;
      }

      .project9006-modal .project9006-hidden-action {
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

      .project9006-modal .project9006-logo-sheet-source {
        display: none !important;
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

  function sectionByTitle(modal, title) {
    return Array.from(modal.querySelectorAll('section')).find((section) => {
      const heading = section.querySelector('h3');
      return heading?.textContent?.trim().toUpperCase() === title;
    });
  }

  function imageNode(src, alt, loading = 'lazy') {
    const image = document.createElement('img');
    image.src = `${src}?v=${VERSION}`;
    image.alt = alt;
    image.loading = loading;
    image.draggable = false;
    return image;
  }

  function rebuildLogoSection(modal) {
    const section = sectionByTitle(modal, 'LOGO VARIATIONS') || sectionByTitle(modal, 'LOGO');
    const sheetSection = sectionByTitle(modal, 'LOGO SHEET');
    if (!section || section.dataset.layout9006 === VERSION) return;

    const headingRow = section.firstElementChild;
    const heading = headingRow?.querySelector('h3');
    if (heading) heading.textContent = 'LOGO';
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

  function simplifyMerchSection(modal) {
    const section = sectionByTitle(modal, 'MERCH');
    if (!section) return;
    const layout = Array.from(section.children).find((child) => child.querySelector?.('img'));
    if (!layout) return;
    layout.classList.add('project9006-switch-layout');
    const columns = Array.from(layout.children);
    const mediaButton = columns[0]?.querySelector('button:has(img)');
    mediaButton?.classList.add('project9006-merch-media');
    if (columns[1]) columns[1].classList.add('project9006-switch-controls');
  }

  function restorePhotoshoot(modal) {
    const section = sectionByTitle(modal, 'PHOTOSHOOT');
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
      const text = button.textContent?.trim().toUpperCase();
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
      const image = imageNode(src, `90.06 poster ${index + 1}`);
      button.append(image);
      button.addEventListener('click', () => window.open(src, '_blank', 'noopener,noreferrer'));
      grid.append(button);
    });

    if (headingRow) headingRow.after(grid);
    else section.append(grid);
    section.dataset.layout9006 = VERSION;
  }

  function enhance() {
    injectStyles();
    const modal = find9006Modal();
    if (!modal) return;
    modal.classList.add('project9006-modal');
    rebuildLogoSection(modal);
    simplifyMerchSection(modal);
    restorePhotoshoot(modal);
    hideTextActions(modal);
    replacePosters(sectionByTitle(modal, 'POSTERS'));
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', enhance);
  enhance();
})();