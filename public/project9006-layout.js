(() => {
  if (window.__project9006LayoutV6) return;
  window.__project9006LayoutV6 = true;

  const VERSION = '9006-layout-6';
  const BRAND_NAME = 'NINETY Z S';
  const LOGOS = [
    '/works/90-06/logo-variations/LOGO%201.jpg',
    '/works/90-06/logo-variations/LOGO%203.jpg',
    '/works/90-06/logo-variations/LOGO%204.jpg',
  ];
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
      projectType: 'Айдентика, дизайн аксессуаров и арт-дирекшн',
      chips: ['АЙДЕНТИКА', 'ПОДВЕСКА', 'ЛУКБУК', 'ПОСТЕРЫ'],
      aboutLabel: 'О БРЕНДЕ',
      about: 'NINETY Z S — независимый творческий бренд, объединяющий одежду, графический дизайн и визуальные эксперименты.',
      identityTitle: 'АЙДЕНТИКА И ЛОГОТИП',
      identityText: 'Разработка айдентики и логотипа NINETY Z S.',
      pendantTitle: 'ДИЗАЙН ПОДВЕСКИ',
      pendantText: 'Разработка фирменной подвески на основе визуальной айдентики NINETY Z S. Форма и графические элементы аксессуара продолжают минималистичный стиль бренда и превращают логотип в самостоятельный физический объект.',
      lookbookTitle: 'ЛУКБУК И КОЛЛАЖ',
      lookbookText: 'Участие в создании лукбука для презентации одежды NINETY Z S, в котором я также выступил в качестве модели. Фотосъёмка была посвящена образам и вещам, выпущенным брендом, и продолжала его минималистичную визуальную эстетику.\n\nФинальная работа серии — коллаж, полностью собранный вручную из физических материалов без использования Photoshop.',
      mascotTitle: 'МАСКОТ И СЕРИЯ ПОСТЕРОВ',
      mascotText: 'Разработка оригинального маскота для NINETY Z S и серии постеров с его использованием. Персонаж стал самостоятельным графическим элементом бренда и продолжением его визуального языка.\n\nВ постерах маскот объединён с фирменной типографикой, фотографиями и элементами айдентики, формируя узнаваемую визуальную систему для коммуникации бренда.',
    },
    en: {
      projectType: 'Visual Identity, Accessory Design & Art Direction',
      chips: ['IDENTITY', 'PENDANT', 'LOOKBOOK', 'POSTERS'],
      aboutLabel: 'ABOUT THE BRAND',
      about: 'NINETY Z S is an independent creative brand that brings together clothing, graphic design, and visual experimentation.',
      identityTitle: 'VISUAL IDENTITY & LOGO DESIGN',
      identityText: 'Development of the NINETY Z S visual identity and logo.',
      pendantTitle: 'PENDANT DESIGN',
      pendantText: 'Development of a custom pendant based on the NINETY Z S visual identity. Its shape and graphic elements extend the brand’s minimalist aesthetic, transforming the logo into a standalone physical object.',
      lookbookTitle: 'LOOKBOOK PHOTOSHOOT & HANDMADE COLLAGE',
      lookbookText: 'Participation in the creation of a lookbook presenting clothing released by NINETY Z S, in which I also appeared as a model. The photoshoot focused on the brand’s garments and styling while continuing its minimalist visual aesthetic.\n\nThe final piece in the series is a collage assembled entirely by hand using physical materials, without Photoshop.',
      mascotTitle: 'MASCOT & POSTER SERIES',
      mascotText: 'Development of an original mascot for NINETY Z S and a series of posters featuring the character. The mascot became a distinctive graphic element and an extension of the brand’s visual language.\n\nAcross the posters, the mascot is combined with branded typography, photography, and identity elements to create a recognizable visual communication system.',
    },
  };

  const SECTION_TITLES = {
    identity: ['LOGO VARIATIONS', 'LOGO', 'IDENTITY', 'АЙДЕНТИКА', 'VISUAL IDENTITY & LOGO DESIGN', 'АЙДЕНТИКА И ЛОГОТИП'],
    sheet: ['LOGO SHEET'],
    merch: ['MERCH', 'MERCH DESIGN', 'ДИЗАЙН МЕРЧА', 'PENDANT DESIGN', 'ДИЗАЙН ПОДВЕСКИ'],
    campaign: ['PHOTOSHOOT', 'PHOTO CAMPAIGN', 'КАМПЭЙН', 'LOOKBOOK PHOTOSHOOT & HANDMADE COLLAGE', 'ЛУКБУК И КОЛЛАЖ'],
    posters: ['POSTERS', 'POSTER SERIES', 'СЕРИЯ ПОСТЕРОВ', 'MASCOT & POSTER SERIES', 'МАСКОТ И СЕРИЯ ПОСТЕРОВ'],
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
      .project9006-modal .project9006-brand {
        padding: clamp(3rem,7vw,6rem) 0 clamp(5rem,9vw,8rem) !important;
      }
      .project9006-modal .project9006-brand-title {
        margin: 0 !important;
        color: inherit !important;
        font: 900 clamp(4.6rem,13vw,11.5rem)/.72 Arial,Helvetica,sans-serif !important;
        letter-spacing: -.045em !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
      }
      .project9006-modal .project9006-brand-label {
        margin: clamp(2.3rem,5vw,4rem) 0 .85rem !important;
        color: inherit !important;
        font: 900 .72rem/1 Arial,Helvetica,sans-serif !important;
        letter-spacing: .27em !important;
        text-transform: uppercase !important;
      }
      .project9006-modal .project9006-brand-copy,
      .project9006-modal .project9006-section-copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        color: rgba(255,255,255,.76) !important;
        font: 600 clamp(1rem,1.45vw,1.25rem)/1.48 Arial,Helvetica,sans-serif !important;
        letter-spacing: -.018em !important;
        white-space: pre-line !important;
        text-wrap: pretty !important;
      }
      .project9006-modal .project9006-brand-copy {
        margin: 0 !important;
      }
      .project9006-modal .project9006-section-copy {
        margin: 1.25rem 0 2.2rem !important;
      }
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
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
        align-items: center !important;
        gap: clamp(.75rem,2vw,1.25rem) !important;
      }
      .project9006-modal .project9006-logo-card {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        aspect-ratio: 2.35/1 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      .project9006-modal .project9006-logo-card img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        object-fit: cover !important;
        object-position: center !important;
        transform: scale(1.62) !important;
        transform-origin: center !important;
      }
      .project9006-modal .project9006-merch-media {
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: min(100%,42rem) !important;
        aspect-ratio: 1/1 !important;
        min-height: 0 !important;
        margin-inline: auto !important;
        overflow: hidden !important;
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
        gap: clamp(1.25rem,3vw,2rem) !important;
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
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
        align-items: start !important;
        gap: 1rem !important;
      }
      .project9006-modal .project9006-poster-card {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        aspect-ratio: auto !important;
        min-height: 0 !important;
        overflow: visible !important;
        background: transparent !important;
      }
      .project9006-modal .project9006-poster-card img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: 100% !important;
        max-height: none !important;
        padding: 0 !important;
        object-fit: contain !important;
        transform: none !important;
      }
      @media(max-width:900px) {
        .project9006-modal .project9006-logo-pair,
        .project9006-modal .project9006-posters-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
      }
      @media(max-width:650px) {
        .project9006-modal .project9006-brand-title {
          font-size: clamp(3.55rem,18.5vw,6.5rem) !important;
          white-space: normal !important;
        }
        .project9006-modal .project9006-brand-label {
          font-size: .66rem !important;
          letter-spacing: .23em !important;
        }
      }
      @media(max-width:560px) {
        .project9006-modal .project9006-logo-pair,
        .project9006-modal .project9006-posters-grid { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.append(style);
  }

  function find9006Modal() {
    const existing = document.querySelector('.project9006-modal');
    if (existing) return existing;
    return Array.from(document.querySelectorAll('div.fixed')).find((node) => {
      const labels = Array.from(node.querySelectorAll('p')).map((item) => normalize(item.textContent));
      return labels.includes('90.06') || labels.includes(BRAND_NAME);
    }) || null;
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

  function setSectionCopy(section, text) {
    if (!section) return;
    let copy = section.querySelector(':scope > .project9006-section-copy');
    if (!copy) {
      copy = document.createElement('p');
      copy.className = 'project9006-section-copy';
      const headingRow = section.firstElementChild;
      if (headingRow) headingRow.insertAdjacentElement('afterend', copy);
      else section.prepend(copy);
    }
    copy.textContent = text;
  }

  function ensureBrand(modal, identity, lang) {
    if (!identity) return;
    let brand = modal.querySelector('.project9006-brand');
    if (!brand) {
      brand = document.createElement('div');
      brand.className = 'project9006-brand';
      const title = document.createElement('h1');
      title.className = 'project9006-brand-title';
      const label = document.createElement('p');
      label.className = 'project9006-brand-label';
      const copy = document.createElement('p');
      copy.className = 'project9006-brand-copy';
      brand.append(title, label, copy);
      identity.parentElement?.insertBefore(brand, identity);
    }
    brand.querySelector('.project9006-brand-title').textContent = BRAND_NAME;
    brand.querySelector('.project9006-brand-label').textContent = COPY[lang].aboutLabel;
    brand.querySelector('.project9006-brand-copy').textContent = COPY[lang].about;
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
    const card = Array.from(document.querySelectorAll('#works button,#works article')).find((node) => {
      const title = normalize(node.querySelector('h3')?.textContent);
      return title === '90.06' || title === BRAND_NAME;
    });
    if (!card) return;

    const heading = card.querySelector('h3');
    if (heading) heading.textContent = BRAND_NAME;
    const type = heading?.nextElementSibling;
    if (type?.tagName === 'P') type.textContent = COPY[lang].projectType;

    const chipWrap = type?.nextElementSibling;
    const chips = chipWrap ? Array.from(chipWrap.querySelectorAll(':scope > span')) : [];
    chips.forEach((chip, index) => {
      const label = COPY[lang].chips[index];
      if (label) chip.textContent = label;
    });
  }

  function updateModalLabel(modal) {
    const label = Array.from(modal.querySelectorAll('p')).find((item) => normalize(item.textContent) === '90.06');
    if (label) label.textContent = BRAND_NAME;
  }

  function rebuildLogoSection(section, sheetSection) {
    if (!section || section.dataset.layout9006 === VERSION) return;
    const headingRow = section.firstElementChild;
    headingRow?.querySelector('p')?.remove();
    Array.from(section.children).slice(1).forEach((child) => child.remove());

    const row = document.createElement('div');
    row.className = 'project9006-logo-pair';
    LOGOS.forEach((src, index) => {
      const card = document.createElement('div');
      card.className = 'project9006-logo-card';
      card.append(imageNode(src, `NINETY Z S logo ${index + 1}`, index === 0 ? 'eager' : 'lazy'));
      row.append(card);
    });
    section.append(row);

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
    const labels = new Set(['СЛЕДУЮЩИЙ ВАРИАНТ','СЛЕДУЮЩАЯ','NEXT IMAGE','NEXT','УВЕЛИЧИТЬ','РАЗВЕРНУТЬ','EXPAND']);
    modal.querySelectorAll('button').forEach((button) => {
      if (labels.has(normalize(button.textContent))) button.classList.add('project9006-hidden-action');
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
      button.setAttribute('aria-label', `Open NINETY Z S poster ${index + 1}`);
      button.append(imageNode(src, `NINETY Z S poster ${index + 1}`));
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
    updateModalLabel(modal);

    const identity = sectionByTitles(modal, SECTION_TITLES.identity);
    const sheet = sectionByTitles(modal, SECTION_TITLES.sheet);
    const merch = sectionByTitles(modal, SECTION_TITLES.merch);
    const campaign = sectionByTitles(modal, SECTION_TITLES.campaign);
    const posters = sectionByTitles(modal, SECTION_TITLES.posters);

    ensureBrand(modal, identity, lang);
    rebuildLogoSection(identity, sheet);
    simplifyMerchSection(merch);
    restorePhotoshoot(campaign);
    hideTextActions(modal);
    replacePosters(posters);

    setHeading(identity, COPY[lang].identityTitle);
    setHeading(merch, COPY[lang].pendantTitle);
    setHeading(campaign, COPY[lang].lookbookTitle);
    setHeading(posters, COPY[lang].mascotTitle);

    setSectionCopy(identity, COPY[lang].identityText);
    setSectionCopy(merch, COPY[lang].pendantText);
    setSectionCopy(campaign, COPY[lang].lookbookText);
    setSectionCopy(posters, COPY[lang].mascotText);
  }

  let scheduled = false;
  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhance();
    });
  }

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', scheduleEnhance);
  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) {
      setTimeout(scheduleEnhance, 0);
      setTimeout(scheduleEnhance, 80);
    }
  });
  scheduleEnhance();
})();