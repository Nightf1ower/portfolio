(() => {
  const VERSION = '9006-layout-1';
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
    style.textContent = `
      .project9006-modal .project9006-section-media,
      .project9006-modal .project9006-section-single,
      .project9006-modal .project9006-feature-card,
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
      .project9006-modal .project9006-section-media img,
      .project9006-modal .project9006-section-single img,
      .project9006-modal .project9006-feature-card img,
      .project9006-modal .project9006-poster-card img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        padding: 1.5rem !important;
        object-fit: contain !important;
        transform: none !important;
      }
      .project9006-modal .project9006-feature-grid {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 1rem !important;
      }
      .project9006-modal .project9006-feature-card img {
        padding: 0 !important;
        object-fit: cover !important;
      }
      .project9006-modal .project9006-posters-grid {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 1rem !important;
      }
      .project9006-modal .project9006-poster-card img {
        padding: 0 !important;
        object-fit: cover !important;
      }
      @media (max-width: 900px) {
        .project9006-modal .project9006-feature-grid,
        .project9006-modal .project9006-posters-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }
      @media (max-width: 560px) {
        .project9006-modal .project9006-feature-grid,
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

  function equalizeSwitchSection(section) {
    if (!section || section.dataset.layout9006 === VERSION) return;
    const image = section.querySelector('img');
    const mediaButton = image?.closest('button');
    if (mediaButton) mediaButton.classList.add('project9006-section-media');
    section.dataset.layout9006 = VERSION;
  }

  function equalizeSingleSection(section) {
    if (!section || section.dataset.layout9006 === VERSION) return;
    const image = section.querySelector('img');
    const mediaButton = image?.closest('button');
    if (mediaButton) mediaButton.classList.add('project9006-section-single');
    section.dataset.layout9006 = VERSION;
  }

  function equalizeFeatureSection(section) {
    if (!section || section.dataset.layout9006 === VERSION) return;
    const imageButtons = Array.from(section.querySelectorAll('button')).filter((button) => button.querySelector('img'));
    if (!imageButtons.length) return;
    const parent = imageButtons[0].parentElement;
    parent?.classList.add('project9006-feature-grid');
    imageButtons.forEach((button) => button.classList.add('project9006-feature-card'));
    section.dataset.layout9006 = VERSION;
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
      const image = document.createElement('img');
      image.src = `${src}?v=${VERSION}`;
      image.alt = `90.06 poster ${index + 1}`;
      image.loading = 'lazy';
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
    equalizeSwitchSection(sectionByTitle(modal, 'LOGO VARIATIONS'));
    equalizeSingleSection(sectionByTitle(modal, 'LOGO SHEET'));
    equalizeSwitchSection(sectionByTitle(modal, 'MERCH'));
    equalizeFeatureSection(sectionByTitle(modal, 'PHOTOSHOOT'));
    replacePosters(sectionByTitle(modal, 'POSTERS'));
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', enhance);
  enhance();
})();
