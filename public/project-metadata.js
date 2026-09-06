(() => {
  if (window.__portfolioProjectMetadataV1) return;
  window.__portfolioProjectMetadataV1 = true;

  const VERSION = 'project-metadata-1';
  const STYLE_ID = 'project-metadata-style';

  const PROJECTS = [
    {
      slug: 'carnival-records',
      selector: '.cr-modal',
      titles: ['CARNIVAL RECORDS'],
      year: '2025–2026',
      role: 'Graphic Designer',
      did: 'Merch, Prints, Album Artwork, Visuals',
    },
    {
      slug: 'zny',
      selector: '.zny-modal',
      titles: ['ZNY'],
      year: '2022–2024',
      role: 'Graphic Designer',
      did: 'Prints, Campaign Graphics, Stickers',
    },
    {
      slug: 'ninety-z-s',
      selector: '.project9006-modal',
      titles: ['NINETY Z S', '90.06', '90 06'],
      year: '2024-2025',
      role: 'Graphic Designer',
      did: 'Identity, Merch, Posters, Photo Editing',
    },
    {
      slug: 'posters',
      selector: '.pcg-modal',
      titles: ['POSTERS'],
      year: '2019–2026',
      role: 'Graphic Designer',
      did: 'Art Direction, Posters, Handmade Graphics',
    },
    {
      slug: 'pink-punk',
      selector: '.pink-punk-fullscreen',
      titles: ['PINK PUNK'],
      year: '2024',
      role: 'Graphic Designer',
      did: 'Prints, Posters, Collage',
    },
    {
      slug: 'blandetto',
      selector: '.blandetto-modal, .bf',
      titles: ['BLANDETTO'],
      year: '2024-2026',
      role: 'Graphic Designer',
      did: 'Logos, Prints, Merch Graphics',
    },
    {
      slug: 'album-covers',
      selector: '.album-covers-modal',
      titles: ['ALBUM COVERS'],
      year: '2020–2026',
      role: 'Graphic Designer',
      did: 'Artwork, Typography, Illustration',
    },
    {
      slug: 'merch',
      selector: '.mc-modal, .m10-modal',
      titles: ['MERCH'],
      year: '2024–2026',
      role: 'Graphic Designer',
      did: 'Prints, Apparel Graphics, Visual Concepts',
    },
    {
      slug: 'fable',
      selector: '.fable-modal',
      titles: ['F | ABLE', 'FABLE', 'F ABLE'],
      year: '2024–2026',
      role: 'Graphic Designer',
      did: 'Prints, Logo Design, Visual Graphics',
    },
    {
      slug: 'stickers',
      selector: '.stk-modal',
      titles: ['STICKERS'],
      year: '2021–2026',
      role: 'Graphic Designer',
      did: 'Sticker Design, Illustration, Print Preparation',
    },
    {
      slug: 'logos',
      selector: '.lcg-modal',
      titles: ['LOGOS', 'ЛОГОТИПЫ'],
      year: '2022–2026',
      role: 'Graphic Designer',
      did: 'Logo Design, Marks, Logo Variations',
    },
    {
      slug: 'stay-ugly',
      selector: '.su-modal',
      titles: ['STAY UGLY', 'STAYUGLY'],
      year: '2025',
      role: 'Graphic Designer',
      did: 'Art Direction, Graphics, Personal Project',
    },
    {
      slug: 'anka-peresild',
      selector: '.anka-peresild-modal',
      titles: ['ANKA PERESILD'],
      year: '2026',
      role: 'Graphic Designer / AI Illustrator',
      did: 'Product Visuals, Labels, Merch, AI-assisted Production',
    },
    {
      slug: 'vtb-design-team',
      selector: '.vtb-modal',
      titles: ['VTB DESIGN TEAM'],
      year: '2025–2026',
      role: 'Graphic Designer',
      did: 'Merch Graphics, Prints, Brand Visuals',
    },
    {
      slug: 'collages-photo-edit',
      selector: '.collages-modal',
      titles: ['COLLAGES PHOTO EDIT', 'COLLAGES'],
      year: '2016-2026',
      role: 'Graphic Designer',
      did: 'Handmade Collage, Photo Editing, Print & Scan',
    },
  ];

  const normalize = (value) => String(value || '')
    .trim()
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/\|/g, ' ')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-project-metadata {
        box-sizing: border-box !important;
        display: grid !important;
        grid-template-columns: minmax(8rem, .7fr) minmax(12rem, 1fr) minmax(18rem, 1.6fr) !important;
        gap: 0 !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border-top: 1px solid rgba(5,5,5,.9) !important;
        border-bottom: 1px solid rgba(5,5,5,.9) !important;
        background: transparent !important;
        color: #050505 !important;
      }
      .portfolio-project-metadata__item {
        box-sizing: border-box !important;
        min-width: 0 !important;
        padding: clamp(1rem, 1.8vw, 1.6rem) clamp(1rem, 2vw, 2rem) !important;
        border-right: 1px solid rgba(5,5,5,.28) !important;
      }
      .portfolio-project-metadata__item:last-child { border-right: 0 !important; }
      .portfolio-project-metadata__label {
        margin: 0 0 .55rem !important;
        padding: 0 !important;
        color: rgba(5,5,5,.52) !important;
        font: 900 .58rem/1 Arial, Helvetica, sans-serif !important;
        letter-spacing: .22em !important;
        text-transform: uppercase !important;
      }
      .portfolio-project-metadata__value {
        margin: 0 !important;
        padding: 0 !important;
        color: #050505 !important;
        font: 700 clamp(.9rem, 1.15vw, 1.08rem)/1.35 Arial, Helvetica, sans-serif !important;
        letter-spacing: -.015em !important;
        overflow-wrap: anywhere !important;
      }
      .portfolio-standard-intro > .portfolio-project-metadata,
      .portfolio-standard-intro__inner > .portfolio-project-metadata {
        margin-top: clamp(2.4rem, 4vw, 4rem) !important;
      }
      @media (max-width: 820px) {
        .portfolio-project-metadata {
          grid-template-columns: 1fr !important;
        }
        .portfolio-project-metadata__item {
          padding: 1rem !important;
          border-right: 0 !important;
          border-bottom: 1px solid rgba(5,5,5,.22) !important;
        }
        .portfolio-project-metadata__item:last-child { border-bottom: 0 !important; }
        .portfolio-project-metadata__label { margin-bottom: .4rem !important; font-size: .54rem !important; }
        .portfolio-project-metadata__value { font-size: .96rem !important; }
      }
    `;
    document.head.append(style);
  }

  function isVisible(node) {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function titleMatches(project, node) {
    const text = normalize(node?.textContent);
    if (!text) return false;
    const accepted = project.titles.map(normalize);
    return accepted.includes(text);
  }

  function findProject(modal) {
    return PROJECTS.find((project) => modal.matches(project.selector)) || null;
  }

  function findHero(modal, project) {
    const standardIntro = modal.querySelector('.portfolio-standard-intro__inner, .portfolio-standard-intro');
    if (standardIntro) return standardIntro;

    const headings = [...modal.querySelectorAll('h1,h2,h3')]
      .filter((node) => titleMatches(project, node))
      .sort((a, b) => Number(isVisible(b)) - Number(isVisible(a)));

    for (const heading of headings) {
      const container = heading.closest('section,[class*="hero"],[class*="intro"],[class*="brand-head"],[class*="project-head"]');
      if (container && container !== modal) return container;
      if (heading.parentElement && heading.parentElement !== modal) return heading.parentElement;
    }

    const firstContent = [...modal.children].find((child) => {
      if (!(child instanceof HTMLElement)) return false;
      const css = getComputedStyle(child);
      return css.position !== 'fixed' && css.position !== 'sticky' && !child.matches('.portfolio-project-metadata');
    });
    return firstContent || modal;
  }

  function makeItem(label, value) {
    const item = document.createElement('div');
    item.className = 'portfolio-project-metadata__item';

    const heading = document.createElement('p');
    heading.className = 'portfolio-project-metadata__label';
    heading.textContent = label;

    const text = document.createElement('p');
    text.className = 'portfolio-project-metadata__value';
    text.textContent = value;

    item.append(heading, text);
    return item;
  }

  function createMetadata(project) {
    const block = document.createElement('section');
    block.className = 'portfolio-project-metadata';
    block.dataset.projectMetadata = project.slug;
    block.dataset.version = VERSION;
    block.setAttribute('aria-label', `${project.title || project.titles[0]} project metadata`);
    block.append(
      makeItem('YEAR', project.year),
      makeItem('ROLE', project.role),
      makeItem('WHAT I DID', project.did),
    );
    return block;
  }

  function placeMetadata(modal, project) {
    if (!(modal instanceof HTMLElement) || !project) return false;

    const duplicates = [...modal.querySelectorAll('.portfolio-project-metadata')];
    const existing = duplicates.find((node) => node.dataset.projectMetadata === project.slug);
    duplicates.forEach((node) => { if (node !== existing) node.remove(); });
    if (existing) return true;

    const block = createMetadata(project);
    const anchor = findHero(modal, project);

    if (anchor?.matches('.portfolio-standard-intro__inner, .portfolio-standard-intro')) {
      const about = anchor.querySelector('.portfolio-standard-intro__about');
      if (about) about.before(block);
      else anchor.append(block);
      return true;
    }

    if (anchor && anchor !== modal) {
      anchor.after(block);
      return true;
    }

    const fixedHead = [...modal.children].find((child) => {
      if (!(child instanceof HTMLElement)) return false;
      const css = getComputedStyle(child);
      return css.position === 'fixed' || css.position === 'sticky';
    });
    if (fixedHead) fixedHead.after(block);
    else modal.prepend(block);
    return true;
  }

  function apply() {
    installStyles();
    PROJECTS.forEach((project) => {
      document.querySelectorAll(project.selector).forEach((modal) => placeMetadata(modal, project));
    });
  }

  let scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('#works article, #works button')) {
      setTimeout(scheduleApply, 0);
      setTimeout(scheduleApply, 80);
      setTimeout(scheduleApply, 220);
    }
  }, true);

  window.addEventListener('load', scheduleApply, { once: true });
  installStyles();
  scheduleApply();
})();
