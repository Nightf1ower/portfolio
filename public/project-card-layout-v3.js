(() => {
  if (window.__projectCardLayoutV3) return;
  window.__projectCardLayoutV3 = true;

  const VERSION = 'project-card-layout-3';
  const PROJECTS = [
    { key: 'FABLE', title: 'F | ABLE', size: 'large', preview: '/works/previes/FABLE.jpg' },
    { key: 'ANKA PERESILD', title: 'ANKA PERESILD', size: 'small', preview: '/works/previes/ANKA.jpg', generated: true },
    { key: 'ZNY', title: 'ZNY', size: 'small', preview: '/works/previes/ZNY.jpg' },
    { key: 'BLANDETTO', title: 'BLANDETTO', size: 'small', preview: '/works/previes/BLANDETTO.jpg' },
    { key: 'PINK PUNK', title: 'PINK PUNK', size: 'small', preview: '/works/previes/pink%20punk.jpg' },
    { key: 'CARNIVAL RECORDS', title: 'CARNIVAL RECORDS', size: 'large', preview: '/works/previes/CARNIVAL%20RECORDS.jpg' },
    { key: 'MERCH', title: 'MERCH', size: 'large' },
    { key: 'NINETY Z S', title: 'NINETY Z S', size: 'small', preview: '/works/previes/NINETY%20Z%20S.jpg' },
    { key: 'VTB DESIGN TEAM', title: 'VTB DESIGN TEAM', size: 'small', preview: '/works/previes/VTB.jpg', generated: true },
    { key: 'STAY UGLY', title: 'STAY UGLY', size: 'small', preview: '/works/previes/STAY%20UGLY.jpg' },
    { key: 'POSTERS', title: 'POSTERS', size: 'large' },
    { key: 'STICKERS', title: 'STICKERS', size: 'small' },
    { key: 'LOGOS', title: 'LOGOS', size: 'small' },
    { key: 'ALBUM COVERS', title: 'ALBUM COVERS', size: 'small' },
  ];

  const COPY = {
    ru: {
      ankaType: 'Айдентика и визуальная система',
      vtbType: 'Дизайн-команда и визуальные коммуникации',
      open: 'ОТКРЫТЬ ПРОЕКТ',
      close: 'ЗАКРЫТЬ',
      status: 'IN DEVELOPMENT',
    },
    en: {
      ankaType: 'Identity and visual system',
      vtbType: 'Design team and visual communications',
      open: 'OPEN PROJECT',
      close: 'CLOSE',
      status: 'IN DEVELOPMENT',
    },
  };

  let placeholderModal = null;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';
  let scheduled = false;

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => COPY[language()];
  const normalize = (value) => (value || '')
    .toUpperCase()
    .replace(/\|/g, '')
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function grid() {
    return document.querySelector('#works .mt-10.grid');
  }

  function cards() {
    const root = grid();
    return root ? [...root.children].filter((node) => node.querySelector?.('h3')) : [];
  }

  function cardKey(card) {
    const title = normalize(card?.querySelector('h3')?.textContent);
    if (title === 'F ABLE' || title === 'FABLE') return 'FABLE';
    if (title === '90 06' || title === 'NINETY Z S') return 'NINETY Z S';
    if (title === 'STAYUGLY') return 'STAY UGLY';
    return title;
  }

  function findCard(key) {
    return cards().find((card) => cardKey(card) === key) || null;
  }

  function injectStyles() {
    const previous = document.getElementById('project-card-layout-v3-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'project-card-layout-v3-style';
    style.dataset.version = VERSION;
    style.textContent = `
      #works [data-project-size="large"] { grid-column: span 2 / span 2 !important; }
      #works [data-project-size="small"] { grid-column: span 1 / span 1 !important; }
      .project-preview-v3 {
        position: relative;
        width: 11rem;
        max-width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border: 1px solid #050505;
        background: #fff;
        transition: transform .5s ease;
      }
      .group:hover .project-preview-v3 { transform: rotate(3deg) scale(1.05); }
      .project-preview-v3 img {
        display: block;
        width: 100%;
        height: 100%;
        padding: .65rem;
        border: 0;
        background: #fff;
        object-fit: contain;
        object-position: center;
      }
      .generated-project-modal {
        position: fixed;
        inset: 0;
        z-index: 780000;
        overflow-y: auto;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(4rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #fff;
        color: #050505;
      }
      .generated-project-inner { width: min(100%, 80rem); min-height: 100%; margin: 0 auto; }
      .generated-project-head {
        position: sticky;
        top: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .75rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.25);
        background: rgba(255,255,255,.96);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .generated-project-label,
      .generated-project-close,
      .generated-project-status {
        font-family: Arial, Helvetica, sans-serif;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .26em;
        text-transform: uppercase;
      }
      .generated-project-label,
      .generated-project-close {
        border: 0;
        padding: .65rem 1rem;
        background: #050505;
        color: #fff;
      }
      .generated-project-close { cursor: pointer; }
      .generated-project-hero {
        min-height: calc(100dvh - 7rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(4rem, 10vw, 9rem) 0;
      }
      .generated-project-title {
        max-width: 12ch;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(4rem, 12vw, 11rem);
        font-weight: 900;
        line-height: .76;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .generated-project-status {
        width: fit-content;
        margin: 2rem 0 0;
        padding: .7rem 1rem;
        border: 1px solid #050505;
      }
      @media (max-width: 639px) {
        #works [data-project-size="large"],
        #works [data-project-size="small"] { grid-column: span 1 / span 1 !important; }
      }
    `;
    document.head.append(style);
  }

  function cleanGeneratedDuplicates(key, dataAttribute) {
    const matches = cards().filter((card) => cardKey(card) === key || card.hasAttribute(dataAttribute));
    if (matches.length < 2) return matches[0] || null;
    const keep = matches.find((card) => card.hasAttribute(dataAttribute)) || matches[0];
    matches.forEach((card) => { if (card !== keep) card.remove(); });
    return keep;
  }

  function cloneBaseCard() {
    return findCard('STAY UGLY') || findCard('ZNY') || cards().at(-1) || null;
  }

  function prepareGeneratedCard(card, key, title, dataAttribute) {
    if (!card) return null;
    card.removeAttribute('data-anka-peresild-card');
    card.removeAttribute('data-vtb-design-team-card');
    card.removeAttribute('data-project-layout-key');
    card.removeAttribute('data-project-layout-size');
    card.removeAttribute('data-project-size');
    card.setAttribute(dataAttribute, 'true');
    card.type = 'button';
    card.dataset.generatedProjectKey = key;
    const heading = card.querySelector('h3');
    if (heading) heading.textContent = title;
    return card;
  }

  function ensureAnkaCard() {
    let card = cleanGeneratedDuplicates('ANKA PERESILD', 'data-anka-peresild-card');
    if (card) return prepareGeneratedCard(card, 'ANKA PERESILD', 'ANKA PERESILD', 'data-anka-peresild-card');

    const source = cloneBaseCard();
    const root = grid();
    if (!source || !root) return null;
    card = source.cloneNode(true);
    prepareGeneratedCard(card, 'ANKA PERESILD', 'ANKA PERESILD', 'data-anka-peresild-card');
    root.append(card);
    return card;
  }

  function ensureVtbCard() {
    let card = cleanGeneratedDuplicates('VTB DESIGN TEAM', 'data-vtb-design-team-card');
    if (card) return prepareGeneratedCard(card, 'VTB DESIGN TEAM', 'VTB DESIGN TEAM', 'data-vtb-design-team-card');

    const source = findCard('ANKA PERESILD') || cloneBaseCard();
    const root = grid();
    if (!source || !root) return null;
    card = source.cloneNode(true);
    prepareGeneratedCard(card, 'VTB DESIGN TEAM', 'VTB DESIGN TEAM', 'data-vtb-design-team-card');
    root.append(card);
    return card;
  }

  function visualHost(card) {
    return card.querySelector('.my-10.flex.flex-1')
      || [...card.querySelectorAll('div')].find((node) => node.querySelector(':scope > div.relative.aspect-square'))
      || null;
  }

  function applyPreview(card, project) {
    if (!project.preview) return;
    const host = visualHost(card);
    if (!host) return;

    let preview = host.querySelector(':scope > .project-preview-v3');
    if (!preview) {
      preview = document.createElement('div');
      preview.className = 'project-preview-v3';
      host.replaceChildren(preview);
    }

    let image = preview.querySelector('img');
    if (!image) {
      image = document.createElement('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      preview.append(image);
    }

    const source = `${project.preview}?v=${VERSION}`;
    if (image.getAttribute('src') !== source) image.src = source;
    if (image.alt !== `${project.title} preview`) image.alt = `${project.title} preview`;
  }

  function updateGeneratedCopy(card, key) {
    const heading = card.querySelector('h3');
    const type = heading?.nextElementSibling;
    const current = copy();
    const text = key === 'ANKA PERESILD' ? current.ankaType : current.vtbType;
    if (type?.tagName === 'P' && type.textContent !== text) type.textContent = text;

    const chipWrap = type?.nextElementSibling;
    if (chipWrap) chipWrap.remove();
    card.setAttribute('aria-label', `Open ${key} project`);
  }

  function configureCard(card, project, index) {
    const heading = card.querySelector('h3');
    if (heading && heading.textContent !== project.title) heading.textContent = project.title;

    const mark = [...card.querySelectorAll('span')].find((node) => /^\d{2}$/.test(node.textContent?.trim() || ''));
    const number = String(index + 1).padStart(2, '0');
    if (mark && mark.textContent !== number) mark.textContent = number;

    card.dataset.projectSize = project.size;
    card.dataset.projectOrder = String(index + 1);
    card.classList.remove('sm:col-span-2');
    if (project.size === 'large') card.classList.add('sm:col-span-2');

    if (project.generated) updateGeneratedCopy(card, project.key);
    applyPreview(card, project);
  }

  function renameNinetyModal() {
    const modal = document.querySelector('.project9006-modal')
      || [...document.querySelectorAll('div.fixed.inset-0')].find((node) =>
        [...node.querySelectorAll('p')].some((item) => ['90 06', 'NINETY Z S'].includes(normalize(item.textContent)))
      );
    if (!modal) return;
    const label = [...modal.querySelectorAll('p')].find((item) => ['90 06', 'NINETY Z S'].includes(normalize(item.textContent)));
    if (label && label.textContent !== 'NINETY Z S') label.textContent = 'NINETY Z S';
  }

  function applyLayout() {
    injectStyles();
    const root = grid();
    if (!root) return;

    ensureAnkaCard();
    ensureVtbCard();

    const ordered = PROJECTS.map((project) => findCard(project.key));
    if (ordered.some((card) => !card)) return;

    ordered.forEach((card, index) => configureCard(card, PROJECTS[index], index));

    const current = cards();
    const differs = ordered.some((card, index) => current[index] !== card);
    if (differs) ordered.forEach((card) => root.append(card));

    renameNinetyModal();
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyLayout();
    });
  }

  function closePlaceholder() {
    placeholderModal?.remove();
    placeholderModal = null;
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function openPlaceholder(title) {
    closePlaceholder();
    injectStyles();
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;

    const modal = document.createElement('div');
    modal.className = 'generated-project-modal';
    const inner = document.createElement('div');
    inner.className = 'generated-project-inner';
    const head = document.createElement('div');
    head.className = 'generated-project-head';
    const label = document.createElement('p');
    label.className = 'generated-project-label';
    label.textContent = title;
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'generated-project-close';
    close.textContent = copy().close;
    close.onclick = closePlaceholder;

    const hero = document.createElement('section');
    hero.className = 'generated-project-hero';
    const heading = document.createElement('h2');
    heading.className = 'generated-project-title';
    heading.textContent = title;
    const status = document.createElement('p');
    status.className = 'generated-project-status';
    status.textContent = copy().status;

    head.append(label, close);
    hero.append(heading, status);
    inner.append(head, hero);
    modal.append(inner);
    document.body.append(modal);
    placeholderModal = modal;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  document.addEventListener('click', (event) => {
    const anka = event.target.closest('[data-anka-peresild-card]');
    const vtb = event.target.closest('[data-vtb-design-team-card]');
    if (!anka && !vtb) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openPlaceholder(anka ? 'ANKA PERESILD' : 'VTB DESIGN TEAM');
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && placeholderModal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closePlaceholder();
    }
  }, true);

  const bodyObserver = new MutationObserver(scheduleApply);
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  new MutationObserver(() => {
    scheduleApply();
    if (placeholderModal) {
      const close = placeholderModal.querySelector('.generated-project-close');
      if (close) close.textContent = copy().close;
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  injectStyles();
  [0, 80, 240, 700].forEach((delay) => setTimeout(scheduleApply, delay));
})();