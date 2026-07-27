(() => {
  if (window.__projectCardLayoutV2) return;
  window.__projectCardLayoutV2 = true;

  const VERSION = 'project-card-layout-2';
  const PROJECTS = [
    { key: 'FABLE', title: 'F | ABLE', size: 'large', preview: '/works/previes/FABLE.jpg' },
    { key: 'ANKA PERESILD', title: 'ANKA PERESILD', size: 'small', preview: '/works/previes/ANKA.jpg' },
    { key: 'ZNY', title: 'ZNY', size: 'small', preview: '/works/previes/ZNY.jpg' },
    { key: 'BLANDETTO', title: 'BLANDETTO', size: 'small', preview: '/works/previes/BLANDETTO.jpg' },
    { key: 'PINK PUNK', title: 'PINK PUNK', size: 'small', preview: '/works/previes/pink%20punk.jpg' },
    { key: 'CARNIVAL RECORDS', title: 'CARNIVAL RECORDS', size: 'large', preview: '/works/previes/CARNIVAL%20RECORDS.jpg' },
    { key: 'MERCH', title: 'MERCH', size: 'large' },
    { key: 'NINETY Z S', title: 'NINETY Z S', size: 'small', preview: '/works/previes/NINETY%20Z%20S.jpg' },
    { key: 'VTB DESIGN TEAM', title: 'VTB DESIGN TEAM', size: 'small', preview: '/works/previes/VTB.jpg', newCard: true },
    { key: 'STAY UGLY', title: 'STAY UGLY', size: 'small', preview: '/works/previes/STAY%20UGLY.jpg' },
    { key: 'POSTERS', title: 'POSTERS', size: 'large' },
    { key: 'STICKERS', title: 'STICKERS', size: 'small' },
    { key: 'LOGOS', title: 'LOGOS', size: 'small' },
    { key: 'ALBUM COVERS', title: 'ALBUM COVERS', size: 'small' },
  ];

  const COPY = {
    ru: {
      vtbType: 'Дизайн-команда и визуальные коммуникации',
      open: 'ОТКРЫТЬ ПРОЕКТ',
      close: 'ЗАКРЫТЬ',
      status: 'IN DEVELOPMENT',
    },
    en: {
      vtbType: 'Design team and visual communications',
      open: 'OPEN PROJECT',
      close: 'CLOSE',
      status: 'IN DEVELOPMENT',
    },
  };

  let vtbModal = null;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';
  let scheduled = false;

  const lang = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => COPY[lang()];
  const normalize = (value) => (value || '')
    .toUpperCase()
    .replace(/\|/g, '')
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function projectKey(card) {
    const title = normalize(card?.querySelector('h3')?.textContent);
    if (title === 'F ABLE' || title === 'FABLE') return 'FABLE';
    if (title === '90 06' || title === 'NINETY Z S') return 'NINETY Z S';
    if (title === 'STAYUGLY') return 'STAY UGLY';
    return title;
  }

  function injectStyles() {
    const previous = document.getElementById('project-card-layout-v2-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'project-card-layout-v2-style';
    style.dataset.version = VERSION;
    style.textContent = `
      #works [data-project-layout-size="large"] {
        grid-column: span 2 / span 2 !important;
      }
      #works [data-project-layout-size="small"] {
        grid-column: span 1 / span 1 !important;
      }
      .project-card-preview-v2 {
        position: relative;
        width: 11rem;
        max-width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border: 1px solid #050505;
        background: #fff;
        transition: transform .5s ease;
      }
      .group:hover .project-card-preview-v2 {
        transform: rotate(3deg) scale(1.05);
      }
      .project-card-preview-v2 img {
        display: block;
        width: 100%;
        height: 100%;
        padding: .65rem;
        border: 0;
        background: #fff;
        object-fit: contain;
        object-position: center;
      }
      .vtb-design-team-modal {
        position: fixed;
        inset: 0;
        z-index: 770000;
        overflow-y: auto;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(4rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #fff;
        color: #050505;
      }
      .vtb-design-team-inner {
        width: min(100%, 80rem);
        min-height: 100%;
        margin: 0 auto;
      }
      .vtb-design-team-head {
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
      .vtb-design-team-label,
      .vtb-design-team-close,
      .vtb-design-team-status {
        font-family: Arial, Helvetica, sans-serif;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .26em;
        text-transform: uppercase;
      }
      .vtb-design-team-label,
      .vtb-design-team-close {
        border: 0;
        padding: .65rem 1rem;
        background: #050505;
        color: #fff;
      }
      .vtb-design-team-close { cursor: pointer; }
      .vtb-design-team-hero {
        min-height: calc(100dvh - 7rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(4rem, 10vw, 9rem) 0;
      }
      .vtb-design-team-title {
        max-width: 12ch;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(4rem, 12vw, 11rem);
        font-weight: 900;
        line-height: .76;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .vtb-design-team-status {
        width: fit-content;
        margin: 2rem 0 0;
        padding: .7rem 1rem;
        border: 1px solid #050505;
      }
      @media (max-width: 639px) {
        #works [data-project-layout-size="large"],
        #works [data-project-layout-size="small"] {
          grid-column: span 1 / span 1 !important;
        }
      }
    `;
    document.head.append(style);
  }

  function projectCards() {
    return [...document.querySelectorAll('#works article, #works button')]
      .filter((card) => card.querySelector('h3'));
  }

  function findCard(key) {
    return projectCards().find((card) => projectKey(card) === key);
  }

  function findVisualHost(card) {
    const direct = [...card.querySelectorAll('div')].find((node) =>
      node.classList.contains('my-10')
      && node.classList.contains('flex-1')
      && node.querySelector(':scope > div')
    );
    if (direct) return direct;

    return [...card.querySelectorAll('div')].find((node) =>
      node.querySelector(':scope > div.relative.aspect-square')
    ) || null;
  }

  function applyPreview(card, src, title) {
    if (!src || !card) return;
    const host = findVisualHost(card);
    if (!host) return;

    let preview = host.querySelector(':scope > .project-card-preview-v2');
    if (!preview) {
      preview = document.createElement('div');
      preview.className = 'project-card-preview-v2';
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

    const expected = new URL(`${src}?v=${VERSION}`, location.href).href;
    if (image.src !== expected) image.src = `${src}?v=${VERSION}`;
    if (image.alt !== `${title} preview`) image.alt = `${title} preview`;
  }

  function setCardText(card, project, index) {
    const heading = card.querySelector('h3');
    if (heading && heading.textContent !== project.title) heading.textContent = project.title;

    const mark = [...card.querySelectorAll('span')].find((node) => /^\d{2}$/.test(node.textContent?.trim() || ''));
    const number = String(index + 1).padStart(2, '0');
    if (mark && mark.textContent !== number) mark.textContent = number;

    card.dataset.projectLayoutKey = project.key;
    card.dataset.projectLayoutSize = project.size;
    card.classList.remove('sm:col-span-2');
    if (project.size === 'large') card.classList.add('sm:col-span-2');

    if (project.key === 'VTB DESIGN TEAM') {
      const type = heading?.nextElementSibling;
      if (type?.tagName === 'P' && type.textContent !== copy().vtbType) type.textContent = copy().vtbType;

      const chipWrap = type?.nextElementSibling;
      if (chipWrap) chipWrap.remove();

      const visualText = [...card.querySelectorAll('div')].find((node) =>
        /^(визуальный плейсхолдер|placeholder visual|открыть проект|open project)$/i.test(node.textContent?.trim() || '')
      );
      if (visualText && visualText.textContent !== copy().open) visualText.textContent = copy().open;

      card.dataset.vtbDesignTeamCard = 'true';
      card.setAttribute('aria-label', 'Open VTB DESIGN TEAM project');
    }

    if (project.preview) applyPreview(card, project.preview, project.title);
  }

  function createVtbCard() {
    const existing = findCard('VTB DESIGN TEAM');
    if (existing) return existing;

    const grid = document.querySelector('#works .mt-10.grid');
    const source = findCard('ANKA PERESILD') || findCard('STAY UGLY') || projectCards().at(-1);
    if (!grid || !source) return null;

    const card = document.createElement('button');
    card.type = 'button';
    card.className = `${source.className} cursor-pointer`.replace(/\s+/g, ' ').trim();
    card.innerHTML = source.innerHTML;
    card.dataset.vtbDesignTeamCard = 'true';
    grid.append(card);
    return card;
  }

  function reorderCards() {
    const grid = document.querySelector('#works .mt-10.grid');
    if (!grid) return;

    createVtbCard();
    const ordered = PROJECTS.map((project) => findCard(project.key)).filter(Boolean);
    if (ordered.length !== PROJECTS.length) return;

    ordered.forEach((card, index) => setCardText(card, PROJECTS[index], index));

    const current = [...grid.children].filter((node) => node.querySelector?.('h3'));
    const differs = ordered.some((card, index) => current[index] !== card);
    if (differs) ordered.forEach((card) => grid.append(card));
  }

  function closeVtb() {
    vtbModal?.remove();
    vtbModal = null;
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function openVtb() {
    closeVtb();
    injectStyles();
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;

    const modal = document.createElement('div');
    modal.className = 'vtb-design-team-modal';
    const inner = document.createElement('div');
    inner.className = 'vtb-design-team-inner';
    const head = document.createElement('div');
    head.className = 'vtb-design-team-head';
    const label = document.createElement('p');
    label.className = 'vtb-design-team-label';
    label.textContent = 'VTB DESIGN TEAM';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'vtb-design-team-close';
    close.textContent = copy().close;
    close.onclick = closeVtb;

    const hero = document.createElement('section');
    hero.className = 'vtb-design-team-hero';
    const title = document.createElement('h2');
    title.className = 'vtb-design-team-title';
    title.textContent = 'VTB DESIGN TEAM';
    const status = document.createElement('p');
    status.className = 'vtb-design-team-status';
    status.textContent = copy().status;

    head.append(label, close);
    hero.append(title, status);
    inner.append(head, hero);
    modal.append(inner);
    document.body.append(modal);
    vtbModal = modal;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      reorderCards();
    });
  }

  injectStyles();
  [0, 120, 400, 900, 1600].forEach((delay) => setTimeout(schedule, delay));

  document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-vtb-design-team-card]');
    if (!card) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openVtb();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && vtbModal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeVtb();
    }
  }, true);

  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  new MutationObserver(() => {
    schedule();
    if (vtbModal) {
      const close = vtbModal.querySelector('.vtb-design-team-close');
      if (close && close.textContent !== copy().close) close.textContent = copy().close;
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();