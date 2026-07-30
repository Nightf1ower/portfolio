(() => {
  if (window.__projectCardLayoutV5) return;
  window.__projectCardLayoutV5 = true;

  const VERSION = 'project-card-layout-5';
  const PROJECTS = [
    { key: 'FABLE', title: 'F | ABLE', size: 'large', preview: '/works/previes/FABLE.jpg' },
    { key: 'ANKA PERESILD', title: 'ANKA PERESILD', size: 'small', preview: '/works/previes/ANKA.jpg', generated: true, typeKey: 'ankaType' },
    { key: 'ZNY', title: 'ZNY', size: 'small', preview: '/works/previes/ZNY.jpg' },
    { key: 'BLANDETTO', title: 'BLANDETTO', size: 'small', preview: '/works/previes/BLANDETTO.jpg' },
    { key: 'PINK PUNK', title: 'PINK PUNK', size: 'small', preview: '/works/previes/pink%20punk.jpg' },
    { key: 'CARNIVAL RECORDS', title: 'CARNIVAL RECORDS', size: 'large', preview: '/works/previes/CARNIVAL%20RECORDS.jpg' },
    { key: 'MERCH', title: 'MERCH', size: 'large' },
    { key: 'NINETY Z S', title: 'NINETY Z S', size: 'small', preview: '/works/previes/NINETY%20Z%20S.jpg' },
    { key: 'VTB DESIGN TEAM', title: 'VTB DESIGN TEAM', size: 'small', preview: '/works/previes/VTB.jpg', generated: true, typeKey: 'vtbType' },
    { key: 'STAY UGLY', title: 'STAY UGLY', size: 'small', preview: '/works/previes/STAY%20UGLY.jpg' },
    { key: 'POSTERS', title: 'POSTERS', size: 'large' },
    { key: 'STICKERS', title: 'STICKERS', size: 'small' },
    { key: 'LOGOS', title: 'LOGOS', size: 'small' },
    { key: 'ALBUM COVERS', title: 'ALBUM COVERS', size: 'small' },
    { key: 'COLLAGES PHOTO EDIT', title: 'COLLAGES (PHOTO EDIT)', size: 'small', generated: true, typeKey: 'collagesType' },
  ];

  const COPY = {
    ru: {
      ankaType: 'Айдентика и визуальная система',
      vtbType: 'Дизайн-команда и визуальные коммуникации',
      collagesType: 'Коллажи и обработка фотографий',
      close: 'ЗАКРЫТЬ',
      status: 'IN DEVELOPMENT',
    },
    en: {
      ankaType: 'Identity and visual system',
      vtbType: 'Design team and visual communications',
      collagesType: 'Collage and photo editing',
      close: 'CLOSE',
      status: 'IN DEVELOPMENT',
    },
  };

  const GENERATED_MARKERS = {
    'ANKA PERESILD': 'data-safe-anka-card',
    'VTB DESIGN TEAM': 'data-safe-vtb-card',
    'COLLAGES PHOTO EDIT': 'data-safe-collages-card',
  };

  let gridObserver = null;
  let observedGrid = null;
  let scheduled = false;
  let applying = false;
  let placeholderModal = null;
  let oldBodyOverflow = '';
  let oldHtmlOverflow = '';

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => COPY[language()];
  const normalize = (value) => (value || '')
    .toUpperCase()
    .replace(/\|/g, '')
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function getGrid() {
    return document.querySelector('#works .mt-10.grid');
  }

  function cards(root = getGrid()) {
    if (!root) return [];
    return [...root.children].filter((node) =>
      node.matches?.('article,button') && node.querySelector('h3')
    );
  }

  function cardKey(card) {
    const title = normalize(card?.querySelector('h3')?.textContent);
    if (title === 'F ABLE' || title === 'FABLE') return 'FABLE';
    if (title === '90 06' || title === 'NINETY Z S') return 'NINETY Z S';
    if (title === 'STAYUGLY') return 'STAY UGLY';
    if (title === 'COLLAGES PHOTO EDIT') return 'COLLAGES PHOTO EDIT';
    return title;
  }

  function findCard(key, root = getGrid()) {
    return cards(root).find((card) => cardKey(card) === key) || null;
  }

  function injectStyles() {
    document.getElementById('project-card-layout-v4-style')?.remove();
    document.getElementById('project-card-layout-v5-style')?.remove();

    const style = document.createElement('style');
    style.id = 'project-card-layout-v5-style';
    style.dataset.version = VERSION;
    style.textContent = `
      #works [data-project-layout-v5-size="large"] { grid-column: span 2 / span 2 !important; }
      #works [data-project-layout-v5-size="small"] { grid-column: span 1 / span 1 !important; }

      #works .project-card-preview-v5,
      #works .project-card-placeholder-v5 {
        position: relative !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 11rem !important;
        max-width: 100% !important;
        min-height: 0 !important;
        aspect-ratio: 1 / 1 !important;
        overflow: hidden !important;
        border: 1px solid #050505 !important;
        background: #fff !important;
        transform: none;
        transition: transform .5s ease;
      }
      #works .group:hover .project-card-preview-v5,
      #works .group:hover .project-card-placeholder-v5 {
        transform: rotate(3deg) scale(1.05);
      }
      #works .project-card-preview-v5 > img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        padding: .65rem !important;
        border: 0 !important;
        opacity: 1 !important;
        visibility: visible !important;
        background: #fff !important;
        object-fit: contain !important;
        object-position: center !important;
      }
      #works .project-card-preview-v5 > :not(img) { display: none !important; }
      #works .project-card-placeholder-v5::before {
        content: '';
        display: block;
        width: 58%;
        aspect-ratio: 1 / 1;
        background: #050505;
      }
      #works .project-card-placeholder-v5::after {
        content: '';
        position: absolute;
        width: 34%;
        aspect-ratio: 1 / 1;
        background: #a6ff00;
      }

      .safe-generated-project-modal-v5 {
        position: fixed;
        inset: 0;
        z-index: 790000;
        overflow-y: auto;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(4rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #fff;
        color: #050505;
      }
      .safe-generated-project-inner-v5 { width: min(100%,80rem); min-height: 100%; margin: 0 auto; }
      .safe-generated-project-head-v5 {
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .75rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.25);
        background: rgba(255,255,255,.96);
      }
      .safe-generated-project-label-v5,
      .safe-generated-project-close-v5,
      .safe-generated-project-status-v5 {
        font-family: Arial,Helvetica,sans-serif;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .26em;
        text-transform: uppercase;
      }
      .safe-generated-project-label-v5,
      .safe-generated-project-close-v5 {
        margin: 0;
        border: 0;
        padding: .65rem 1rem;
        background: #050505;
        color: #fff;
      }
      .safe-generated-project-close-v5 { cursor: pointer; }
      .safe-generated-project-hero-v5 {
        min-height: calc(100dvh - 7rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(4rem,10vw,9rem) 0;
      }
      .safe-generated-project-title-v5 {
        max-width: 13ch;
        margin: 0;
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(3.4rem,10vw,10rem);
        font-weight: 900;
        line-height: .78;
        letter-spacing: -.085em;
        text-transform: uppercase;
      }
      .safe-generated-project-status-v5 {
        width: fit-content;
        margin: 2rem 0 0;
        padding: .7rem 1rem;
        border: 1px solid #050505;
      }

      @media (max-width: 639px) {
        #works [data-project-layout-v5-size="large"],
        #works [data-project-layout-v5-size="small"] { grid-column: span 1 / span 1 !important; }
      }
    `;
    document.head.append(style);
  }

  function removeGeneratedDuplicates(root, project) {
    const marker = GENERATED_MARKERS[project.key];
    const matches = cards(root).filter((card) =>
      cardKey(card) === project.key || (marker && card.hasAttribute(marker))
    );
    if (!matches.length) return null;
    const keep = matches[0];
    matches.slice(1).forEach((card) => card.remove());
    return keep;
  }

  function prepareGeneratedCard(card, project) {
    if (!card) return null;
    Object.values(GENERATED_MARKERS).forEach((marker) => card.removeAttribute(marker));
    card.removeAttribute('data-project-layout-key');
    card.removeAttribute('data-project-layout-size');
    card.removeAttribute('data-project-size');
    card.removeAttribute('data-project-layout-v4-key');
    card.removeAttribute('data-project-layout-v4-size');

    const marker = GENERATED_MARKERS[project.key];
    if (marker) card.setAttribute(marker, 'true');
    card.dataset.safeGeneratedProjectV5 = project.title;
    if (card.tagName === 'BUTTON') card.type = 'button';

    const heading = card.querySelector('h3');
    if (heading) heading.textContent = project.title;
    return card;
  }

  function ensureGenerated(root, project) {
    let card = removeGeneratedDuplicates(root, project);
    if (card) return prepareGeneratedCard(card, project);

    const source = findCard('STAY UGLY', root) || findCard('ZNY', root) || cards(root).at(-1);
    if (!source) return null;

    card = source.cloneNode(true);
    prepareGeneratedCard(card, project);
    root.append(card);
    return card;
  }

  function visualHost(card) {
    return card.querySelector(':scope > .my-10.flex.flex-1')
      || card.querySelector('.my-10.flex.flex-1')
      || card.querySelector(':scope > .my-10')
      || card.querySelector('.my-10')
      || null;
  }

  function applyVisual(card, project) {
    const host = visualHost(card);
    if (!host) return;

    if (!project.preview) {
      if (project.generated) {
        let placeholder = host.querySelector(':scope > .project-card-placeholder-v5');
        if (!placeholder) {
          placeholder = document.createElement('div');
          placeholder.className = 'project-card-placeholder-v5';
          host.replaceChildren(placeholder);
        }
      }
      return;
    }

    let preview = host.querySelector(':scope > .project-card-preview-v5');
    if (!preview) {
      preview = document.createElement('div');
      preview.className = 'project-card-preview-v5';
      host.replaceChildren(preview);
    }

    let image = preview.querySelector(':scope > img');
    if (!image) {
      image = document.createElement('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      preview.append(image);
    }

    const src = `${project.preview}?v=${VERSION}`;
    if (image.getAttribute('src') !== src) image.src = src;
    image.alt = `${project.title} preview`;
  }

  function configureGeneratedCopy(card, project) {
    const heading = card.querySelector('h3');
    const type = heading?.nextElementSibling;
    const text = copy()[project.typeKey] || '';
    if (type?.tagName === 'P' && type.textContent !== text) type.textContent = text;

    const chips = type?.nextElementSibling;
    if (chips) chips.remove();
    card.setAttribute('aria-label', `Open ${project.title} project`);
  }

  function configureCard(card, project, index) {
    const heading = card.querySelector('h3');
    if (heading && heading.textContent !== project.title) heading.textContent = project.title;

    const number = [...card.querySelectorAll('span')].find((node) => /^\d{2}$/.test(node.textContent?.trim() || ''));
    const value = String(index + 1).padStart(2, '0');
    if (number && number.textContent !== value) number.textContent = value;

    card.dataset.projectLayoutV5Key = project.key;
    card.dataset.projectLayoutV5Size = project.size;
    card.classList.remove('sm:col-span-2');
    if (project.size === 'large') card.classList.add('sm:col-span-2');

    if (project.generated) configureGeneratedCopy(card, project);
    applyVisual(card, project);
  }

  function renameNinetyModal() {
    const modal = document.querySelector('.project9006-modal')
      || [...document.querySelectorAll('div.fixed.inset-0')].find((node) =>
        [...node.querySelectorAll('p')].some((item) => ['90 06','NINETY Z S'].includes(normalize(item.textContent)))
      );
    if (!modal) return;
    const label = [...modal.querySelectorAll('p')].find((item) =>
      ['90 06','NINETY Z S'].includes(normalize(item.textContent))
    );
    if (label) label.textContent = 'NINETY Z S';
  }

  function applyLayout() {
    if (applying) return;
    const root = getGrid();
    if (!root) return;

    applying = true;
    try {
      injectStyles();
      PROJECTS.filter((project) => project.generated).forEach((project) => ensureGenerated(root, project));

      const ordered = PROJECTS.map((project) => findCard(project.key, root));
      if (ordered.some((card) => !card)) return;

      ordered.forEach((card, index) => configureCard(card, PROJECTS[index], index));
      const current = cards(root);
      const differs = ordered.some((card, index) => current[index] !== card);
      if (differs) ordered.forEach((card) => root.append(card));
      renameNinetyModal();
    } finally {
      applying = false;
    }
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyLayout();
      watchGrid();
    });
  }

  function watchGrid() {
    const root = getGrid();
    if (!root || root === observedGrid) return;
    gridObserver?.disconnect();
    observedGrid = root;
    gridObserver = new MutationObserver(scheduleApply);
    gridObserver.observe(root, { childList: true });
  }

  function closePlaceholder() {
    placeholderModal?.remove();
    placeholderModal = null;
    document.body.style.overflow = oldBodyOverflow;
    document.documentElement.style.overflow = oldHtmlOverflow;
  }

  function openPlaceholder(title) {
    closePlaceholder();
    oldBodyOverflow = document.body.style.overflow;
    oldHtmlOverflow = document.documentElement.style.overflow;

    const modal = document.createElement('div');
    modal.className = 'safe-generated-project-modal-v5';
    modal.innerHTML = `
      <div class="safe-generated-project-inner-v5">
        <div class="safe-generated-project-head-v5">
          <p class="safe-generated-project-label-v5"></p>
          <button type="button" class="safe-generated-project-close-v5"></button>
        </div>
        <section class="safe-generated-project-hero-v5">
          <h2 class="safe-generated-project-title-v5"></h2>
          <p class="safe-generated-project-status-v5"></p>
        </section>
      </div>
    `;
    modal.querySelector('.safe-generated-project-label-v5').textContent = title;
    modal.querySelector('.safe-generated-project-title-v5').textContent = title;
    modal.querySelector('.safe-generated-project-close-v5').textContent = copy().close;
    modal.querySelector('.safe-generated-project-status-v5').textContent = copy().status;
    modal.querySelector('.safe-generated-project-close-v5').onclick = closePlaceholder;

    document.body.append(modal);
    placeholderModal = modal;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  document.addEventListener('click', (event) => {
    const generated = event.target.closest('[data-safe-generated-project-v5]');
    if (generated) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openPlaceholder(generated.dataset.safeGeneratedProjectV5);
      return;
    }

    if (event.target.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) {
      [0,80,240].forEach((delay) => setTimeout(scheduleApply, delay));
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && placeholderModal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closePlaceholder();
    }
  }, true);

  new MutationObserver(() => {
    scheduleApply();
    if (placeholderModal) {
      placeholderModal.querySelector('.safe-generated-project-close-v5').textContent = copy().close;
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  injectStyles();
  [0,80,240,700,1400].forEach((delay) => setTimeout(scheduleApply, delay));
})();