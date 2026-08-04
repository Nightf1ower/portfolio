(() => {
  if (window.__project9006LayoutV7) return;
  window.__project9006LayoutV7 = true;

  const VERSION = '9006-layout-7';
  const BRAND_NAME = 'NINETY Z S';
  const LOGOS = [
    '/works/90-06/logo-variations/LOGO%201.jpg',
    '/works/90-06/logo-variations/LOGO%204.jpg',
    '/works/90-06/logo-variations/LOGO%203.jpg',
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
      close: 'ЗАКРЫТЬ',
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
      close: 'CLOSE',
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

  const normalize = value => String(value || '').trim().toUpperCase();
  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function injectStyles() {
    document.getElementById('project9006-layout-style')?.remove();
    const style = document.createElement('style');
    style.id = 'project9006-layout-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .project9006-modal .project9006-toolbar {
        position: sticky !important;
        top: 0 !important;
        z-index: 100 !important;
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        padding: .9rem clamp(1rem,2.5vw,2.5rem) !important;
        margin: 0 !important;
        background: rgba(0,0,0,.96) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
      }
      .project9006-modal .project9006-toolbar__label,
      .project9006-modal .project9006-toolbar__close {
        margin: 0 !important;
        padding: .72rem 1rem !important;
        border: 0 !important;
        font: 900 .68rem/1 Arial,Helvetica,sans-serif !important;
        letter-spacing: .22em !important;
        text-transform: uppercase !important;
      }
      .project9006-modal .project9006-toolbar__label {
        background: #a6ff00 !important;
        color: #050505 !important;
      }
      .project9006-modal .project9006-toolbar__close {
        background: #fff !important;
        color: #050505 !important;
        cursor: pointer !important;
      }
      .project9006-modal .project9006-native-toolbar {
        display: none !important;
      }
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
      .project9006-modal .project9006-section-copy,
      .project9006-modal .project9006-clean-copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        color: rgba(255,255,255,.76) !important;
        font: 600 clamp(1rem,1.45vw,1.25rem)/1.48 Arial,Helvetica,sans-serif !important;
        letter-spacing: -.018em !important;
        white-space: pre-line !important;
        text-wrap: pretty !important;
      }
      .project9006-modal .project9006-brand-copy { margin: 0 !important; }
      .project9006-modal .project9006-section-copy,
      .project9006-modal .project9006-clean-copy { margin: 1.25rem 0 2.2rem !important; }
      .project9006-modal .project9006-switch-layout { display: block !important; }
      .project9006-modal .project9006-switch-controls,
      .project9006-modal .project9006-hidden-action,
      .project9006-modal .project9006-logo-sheet-source { display: none !important; }
      .project9006-modal .project9006-logo-pair {
        display: grid !important;
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
        align-items: start !important;
        gap: clamp(.75rem,2vw,1.25rem) !important;
        width: 100% !important;
      }
      .project9006-modal .project9006-logo-card {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        aspect-ratio: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: visible !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      .project9006-modal .project9006-logo-card img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        object-fit: contain !important;
        object-position: center !important;
        transform: none !important;
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
      .project9006-modal .project9006-photoshoot-card,
      .project9006-modal .project9006-poster-card {
        display: block !important;
        box-sizing: border-box !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: visible !important;
        background: transparent !important;
      }
      .project9006-modal .project9006-photoshoot-card img,
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
      .project9006-modal .project9006-posters-grid {
        display: grid !important;
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
        align-items: start !important;
        gap: 1rem !important;
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
    return [...document.querySelectorAll('div.fixed')].find(node => {
      const text = normalize(node.textContent);
      return text.includes('90.06') || text.includes(BRAND_NAME);
    }) || null;
  }

  function sectionByTitles(modal, titles) {
    const accepted = new Set(titles.map(normalize));
    return [...modal.querySelectorAll('section')].find(section => (
      accepted.has(normalize(section.querySelector('h3')?.textContent))
    )) || null;
  }

  function imageNode(src, alt, loading = 'lazy') {
    const image = document.createElement('img');
    image.src = `${src}?v=${VERSION}`;
    image.alt = alt;
    image.loading = loading;
    image.decoding = 'async';
    image.draggable = false;
    return image;
  }

  function closeModal(modal, closeButton) {
    const nativeClose = [...modal.querySelectorAll('button')].find(button => {
      if (button === closeButton) return false;
      const text = normalize(button.textContent);
      const aria = normalize(button.getAttribute('aria-label'));
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ' || aria.includes('CLOSE') || aria.includes('ЗАКР');
    });
    if (nativeClose) {
      nativeClose.click();
      return;
    }
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    setTimeout(() => {
      if (!document.body.contains(modal)) return;
      modal.remove();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 0);
  }

  function ensureToolbar(modal, lang) {
    let toolbar = modal.querySelector(':scope > .project9006-toolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.className = 'project9006-toolbar';
      const label = document.createElement('p');
      label.className = 'project9006-toolbar__label';
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'project9006-toolbar__close';
      close.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        closeModal(modal, close);
      };
      toolbar.append(label, close);
      modal.prepend(toolbar);
    }
    toolbar.querySelector('.project9006-toolbar__label').textContent = BRAND_NAME;
    toolbar.querySelector('.project9006-toolbar__close').textContent = COPY[lang].close;

    [...modal.querySelectorAll('button')].forEach(button => {
      if (button.closest('.project9006-toolbar')) return;
      const text = normalize(button.textContent);
      const aria = normalize(button.getAttribute('aria-label'));
      if (text === 'CLOSE' || text === 'ЗАКРЫТЬ' || aria.includes('CLOSE') || aria.includes('ЗАКР')) {
        button.parentElement?.classList.add('project9006-native-toolbar');
      }
    });
  }

  function ensureBrand(modal, identity, lang) {
    if (!identity) return;
    let brand = modal.querySelector('.project9006-brand');
    if (!brand) {
      brand = document.createElement('div');
      brand.className = 'project9006-brand';
      brand.innerHTML = '<h1 class="project9006-brand-title"></h1><p class="project9006-brand-label"></p><p class="project9006-brand-copy"></p>';
      identity.parentElement?.insertBefore(brand, identity);
    }
    brand.querySelector('.project9006-brand-title').textContent = BRAND_NAME;
    brand.querySelector('.project9006-brand-label').textContent = COPY[lang].aboutLabel;
    brand.querySelector('.project9006-brand-copy').textContent = COPY[lang].about;
  }

  function setHeading(section, text) {
    const heading = section?.querySelector('h3');
    if (heading && heading.textContent !== text) heading.textContent = text;
  }

  function setSectionCopy(section, text) {
    if (!section) return;
    const directCopies = [...section.children].filter(child => (
      child.matches?.('.project9006-clean-copy,.project9006-section-copy')
    ));
    let canonical = directCopies.find(child => child.classList.contains('project9006-clean-copy')) || directCopies[0];
    if (!canonical) {
      canonical = document.createElement('p');
      const heading = section.querySelector(':scope > h3') || section.firstElementChild;
      heading?.insertAdjacentElement('afterend', canonical);
    }
    canonical.className = 'project9006-clean-copy';
    if (canonical.textContent !== text) canonical.textContent = text;
    directCopies.forEach(copy => {
      if (copy !== canonical) copy.remove();
    });

    [...section.children].forEach(child => {
      if (child === canonical || child.tagName !== 'P') return;
      if (normalize(child.textContent) === normalize(text)) child.remove();
    });
  }

  function updateProjectCard(lang) {
    const card = [...document.querySelectorAll('#works button,#works article')].find(node => {
      const title = normalize(node.querySelector('h3')?.textContent);
      return title === '90.06' || title === BRAND_NAME;
    });
    if (!card) return;
    const heading = card.querySelector('h3');
    if (heading) heading.textContent = BRAND_NAME;
    const type = heading?.nextElementSibling;
    if (type?.tagName === 'P') type.textContent = COPY[lang].projectType;
    const chips = type?.nextElementSibling?.querySelectorAll(':scope > span') || [];
    chips.forEach((chip, index) => {
      if (COPY[lang].chips[index]) chip.textContent = COPY[lang].chips[index];
    });
  }

  function rebuildLogoSection(section, sheetSection) {
    if (!section) return;
    const current = section.querySelector(':scope > .project9006-logo-pair');
    const currentVersion = current?.dataset.version;
    if (currentVersion === VERSION) return;

    [...section.children].forEach(child => {
      if (child === section.firstElementChild) return;
      if (child.matches?.('.project9006-clean-copy,.project9006-section-copy')) return;
      child.remove();
    });

    const row = document.createElement('div');
    row.className = 'project9006-logo-pair';
    row.dataset.version = VERSION;
    LOGOS.forEach((src, index) => {
      const card = document.createElement('div');
      card.className = 'project9006-logo-card';
      card.append(imageNode(src, `NINETY Z S logo ${['01','04','03'][index]}`, index === 0 ? 'eager' : 'lazy'));
      row.append(card);
    });
    section.append(row);
    sheetSection?.classList.add('project9006-logo-sheet-source');
  }

  function simplifyMerchSection(section) {
    if (!section) return;
    const layout = [...section.children].find(child => child.querySelector?.('img'));
    if (!layout) return;
    layout.classList.add('project9006-switch-layout');
    const columns = [...layout.children];
    columns[0]?.querySelector('button:has(img)')?.classList.add('project9006-merch-media');
    if (columns[1]) columns[1].classList.add('project9006-switch-controls');
  }

  function restorePhotoshoot(section) {
    if (!section) return;
    const imageButtons = [...section.querySelectorAll('button')].filter(button => button.querySelector('img'));
    if (!imageButtons.length) return;
    const list = imageButtons[0].parentElement;
    list?.classList.remove('project9006-feature-grid');
    list?.classList.add('project9006-photoshoot-list');
    imageButtons.forEach(button => {
      button.classList.remove('project9006-feature-card');
      button.classList.add('project9006-photoshoot-card');
    });
  }

  function hideTextActions(modal) {
    const labels = new Set(['СЛЕДУЮЩИЙ ВАРИАНТ','СЛЕДУЮЩАЯ','NEXT IMAGE','NEXT','УВЕЛИЧИТЬ','РАЗВЕРНУТЬ','EXPAND']);
    modal.querySelectorAll('button').forEach(button => {
      if (labels.has(normalize(button.textContent))) button.classList.add('project9006-hidden-action');
    });
  }

  function replacePosters(section) {
    if (!section) return;
    let grid = section.querySelector(':scope > .project9006-posters-grid');
    if (grid?.dataset.version === VERSION) return;
    grid?.remove();
    grid = document.createElement('div');
    grid.className = 'project9006-posters-grid';
    grid.dataset.version = VERSION;
    POSTERS.forEach((src, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'project9006-poster-card';
      button.setAttribute('aria-label', `Open NINETY Z S poster ${index + 1}`);
      button.append(imageNode(src, `NINETY Z S poster ${index + 1}`));
      button.onclick = () => window.open(src, '_blank', 'noopener,noreferrer');
      grid.append(button);
    });
    [...section.children].forEach(child => {
      if (child === section.firstElementChild || child.matches?.('.project9006-clean-copy,.project9006-section-copy')) return;
      child.remove();
    });
    section.append(grid);
  }

  function enhance() {
    injectStyles();
    const lang = language();
    updateProjectCard(lang);

    const modal = find9006Modal();
    if (!modal) return;
    modal.classList.add('project9006-modal');
    ensureToolbar(modal, lang);

    const identity = sectionByTitles(modal, SECTION_TITLES.identity);
    const sheet = sectionByTitles(modal, SECTION_TITLES.sheet);
    const merch = sectionByTitles(modal, SECTION_TITLES.merch);
    const campaign = sectionByTitles(modal, SECTION_TITLES.campaign);
    const posters = sectionByTitles(modal, SECTION_TITLES.posters);

    ensureBrand(modal, identity, lang);
    setHeading(identity, COPY[lang].identityTitle);
    setHeading(merch, COPY[lang].pendantTitle);
    setHeading(campaign, COPY[lang].lookbookTitle);
    setHeading(posters, COPY[lang].mascotTitle);

    setSectionCopy(identity, COPY[lang].identityText);
    setSectionCopy(merch, COPY[lang].pendantText);
    setSectionCopy(campaign, COPY[lang].lookbookText);
    setSectionCopy(posters, COPY[lang].mascotText);

    rebuildLogoSection(identity, sheet);
    simplifyMerchSection(merch);
    restorePhotoshoot(campaign);
    replacePosters(posters);
    hideTextActions(modal);
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

  new MutationObserver(scheduleEnhance).observe(document.body, { childList: true, subtree: true });
  new MutationObserver(scheduleEnhance).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
  window.addEventListener('load', scheduleEnhance);
  document.addEventListener('click', event => {
    if (event.target.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) {
      setTimeout(scheduleEnhance, 0);
      setTimeout(scheduleEnhance, 100);
    }
  });
  scheduleEnhance();
})();