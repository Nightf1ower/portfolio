(() => {
  if (window.__project9006FinalFixV1) return;
  window.__project9006FinalFixV1 = true;

  const VERSION = '9006-final-fix-1';
  const PENDANT_IMAGES = [
    '/works/90-06/merch/merch1.png',
    '/works/90-06/merch/merch2.png',
    '/works/90-06/merch/merch3.png',
    '/works/90-06/merch/merch4.png',
    '/works/90-06/merch/merch5.jpg',
  ];
  const LOOKBOOK_IMAGES = [
    '/works/90-06/photoshoot/photoshoot1.jpg',
    '/works/90-06/photoshoot/photoshoot2.png',
    '/works/90-06/photoshoot/photoshoot3.jpg',
  ];

  const COPY = {
    ru: {
      pendantTitle: 'ДИЗАЙН ПОДВЕСКИ',
      pendantText: 'Разработка фирменной подвески на основе визуальной айдентики NINETY Z S. Форма и графические элементы аксессуара продолжают минималистичный стиль бренда и превращают логотип в самостоятельный физический объект.',
      lookbookTitle: 'ЛУКБУК И КОЛЛАЖ',
      lookbookText: 'Участие в создании лукбука для презентации одежды NINETY Z S, в котором я также выступил в качестве модели. Фотосъёмка была посвящена образам и вещам, выпущенным брендом, и продолжала его минималистичную визуальную эстетику.\n\nФинальная работа серии — коллаж, полностью собранный вручную из физических материалов без использования Photoshop.',
      close: 'ЗАКРЫТЬ',
    },
    en: {
      pendantTitle: 'PENDANT DESIGN',
      pendantText: 'Development of a custom pendant based on the NINETY Z S visual identity. Its shape and graphic elements extend the brand’s minimalist aesthetic, transforming the logo into a standalone physical object.',
      lookbookTitle: 'LOOKBOOK PHOTOSHOOT & HANDMADE COLLAGE',
      lookbookText: 'Participation in the creation of a lookbook presenting clothing released by NINETY Z S, in which I also appeared as a model. The photoshoot focused on the brand’s garments and styling while continuing its minimalist visual aesthetic.\n\nThe final piece in the series is a collage assembled entirely by hand using physical materials, without Photoshop.',
      close: 'CLOSE',
    },
  };

  const normalize = (value) => String(value || '').trim().toUpperCase();
  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function injectStyles() {
    const previous = document.getElementById('project9006-final-fix-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'project9006-final-fix-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .project9006-modal .project9006-brand {
        padding-bottom: clamp(2.75rem, 4.5vw, 4.25rem) !important;
      }

      .project9006-modal .project9006-logo-sheet {
        display: block !important;
        width: min(100%, 44rem) !important;
        max-width: 44rem !important;
        margin: clamp(1rem, 2.5vw, 1.75rem) auto 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        background: transparent !important;
      }

      .project9006-modal .project9006-logo-sheet img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        object-fit: contain !important;
        background: #fff !important;
      }

      .project9006-modal .project9006-clean-heading {
        display: block !important;
        margin-bottom: 0 !important;
      }

      .project9006-modal .project9006-clean-copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        margin: 1.25rem 0 2.2rem !important;
        color: rgba(255,255,255,.76) !important;
        font: 600 clamp(1rem,1.45vw,1.25rem)/1.48 Arial,Helvetica,sans-serif !important;
        letter-spacing: -.018em !important;
        white-space: pre-line !important;
        text-wrap: pretty !important;
      }

      .project9006-modal .project9006-pendant-wrap,
      .project9006-modal .project9006-lookbook-wrap {
        display: block !important;
        width: 100% !important;
      }

      .project9006-modal .project9006-pendant-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: clamp(.9rem, 2vw, 1.35rem) !important;
        width: 100% !important;
      }

      .project9006-modal .project9006-pendant-card,
      .project9006-modal .project9006-pendant-card.project9006-merch-media {
        display: block !important;
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        height: auto !important;
        min-height: 0 !important;
        aspect-ratio: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        border: 0 !important;
        background: transparent !important;
        cursor: zoom-in !important;
      }

      .project9006-modal .project9006-pendant-card:last-child {
        grid-column: 1 / -1 !important;
        width: calc(50% - .675rem) !important;
        justify-self: center !important;
      }

      .project9006-modal .project9006-pendant-card img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        object-fit: contain !important;
        transform: none !important;
        background: transparent !important;
      }

      .project9006-modal .project9006-lookbook-list {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: clamp(1.25rem, 3vw, 2rem) !important;
        width: 100% !important;
      }

      .project9006-modal .project9006-lookbook-card {
        display: block !important;
        width: 100% !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        border: 0 !important;
        background: transparent !important;
        cursor: zoom-in !important;
      }

      .project9006-modal .project9006-lookbook-card img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        object-fit: contain !important;
        transform: none !important;
      }

      .project9006-fix-lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000600;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(0,0,0,.96);
      }

      .project9006-fix-lightbox img {
        display: block;
        max-width: calc(100vw - 2rem);
        max-height: calc(100dvh - 2rem);
        width: auto;
        height: auto;
        object-fit: contain;
      }

      .project9006-fix-lightbox__close {
        position: fixed;
        top: 1rem;
        right: 1rem;
        border: 1px solid #fff;
        background: #050505;
        color: #fff;
        padding: .75rem 1rem;
        font: 900 .68rem/1 Arial,Helvetica,sans-serif;
        letter-spacing: .2em;
      }

      @media (max-width: 650px) {
        .project9006-modal .project9006-brand {
          padding-bottom: 2.25rem !important;
        }
        .project9006-modal .project9006-logo-sheet {
          width: 100% !important;
        }
        .project9006-modal .project9006-pendant-grid {
          grid-template-columns: 1fr !important;
        }
        .project9006-modal .project9006-pendant-card:last-child {
          grid-column: auto !important;
          width: 100% !important;
        }
      }
    `;
    document.head.append(style);
  }

  function findModal() {
    return document.querySelector('.project9006-modal') || [...document.querySelectorAll('div.fixed')].find((node) => {
      const label = normalize(node.querySelector('p')?.textContent);
      return label === 'NINETY Z S' || label === '90.06';
    }) || null;
  }

  function findSection(modal, patterns) {
    return [...modal.querySelectorAll('section')].find((section) => {
      const title = normalize(section.querySelector('h3')?.textContent);
      return patterns.some((pattern) => pattern.test(title));
    }) || null;
  }

  function openLightbox(src, alt) {
    document.querySelector('.project9006-fix-lightbox')?.remove();
    const overlay = document.createElement('div');
    const image = document.createElement('img');
    const close = document.createElement('button');

    overlay.className = 'project9006-fix-lightbox';
    image.src = `${src}?v=${VERSION}`;
    image.alt = alt;
    close.type = 'button';
    close.className = 'project9006-fix-lightbox__close';
    close.textContent = COPY[language()].close;

    image.onclick = (event) => event.stopPropagation();
    close.onclick = (event) => {
      event.stopPropagation();
      overlay.remove();
    };
    overlay.onclick = () => overlay.remove();
    overlay.append(image, close);
    document.body.append(overlay);
  }

  function imageButton(src, className, alt) {
    const button = document.createElement('button');
    const image = document.createElement('img');
    button.type = 'button';
    button.className = className;
    button.setAttribute('aria-label', alt);
    image.src = `${src}?v=${VERSION}`;
    image.alt = alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    button.append(image);
    button.onclick = (event) => {
      event.stopPropagation();
      openLightbox(src, alt);
    };
    return button;
  }

  function rebuildSection(section, title, text, content) {
    if (!section) return;
    const oldHeading = section.querySelector('h3');
    const heading = document.createElement('h3');
    heading.className = `${oldHeading?.className || ''} project9006-clean-heading`.trim();
    heading.textContent = title;

    const copy = document.createElement('p');
    copy.className = 'project9006-clean-copy';
    copy.textContent = text;

    section.replaceChildren(heading, copy, content);
  }

  function rebuildPendant(section, copy) {
    if (!section) return;
    let wrap = section.querySelector(':scope > .project9006-pendant-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'project9006-pendant-wrap';
      const grid = document.createElement('div');
      grid.className = 'project9006-pendant-grid';
      PENDANT_IMAGES.forEach((src, index) => {
        grid.append(imageButton(src, 'project9006-pendant-card', `NINETY Z S pendant ${index + 1}`));
      });
      wrap.append(grid);
      rebuildSection(section, copy.pendantTitle, copy.pendantText, wrap);
    } else {
      section.querySelector('h3').textContent = copy.pendantTitle;
      const paragraph = section.querySelector(':scope > .project9006-clean-copy');
      if (paragraph) paragraph.textContent = copy.pendantText;
    }
    section.dataset.project9006FinalPendant = VERSION;
  }

  function rebuildLookbook(section, copy) {
    if (!section) return;
    let wrap = section.querySelector(':scope > .project9006-lookbook-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'project9006-lookbook-wrap';
      const list = document.createElement('div');
      list.className = 'project9006-lookbook-list';
      LOOKBOOK_IMAGES.forEach((src, index) => {
        list.append(imageButton(src, 'project9006-lookbook-card', `NINETY Z S lookbook ${index + 1}`));
      });
      wrap.append(list);
      rebuildSection(section, copy.lookbookTitle, copy.lookbookText, wrap);
    } else {
      section.querySelector('h3').textContent = copy.lookbookTitle;
      const paragraph = section.querySelector(':scope > .project9006-clean-copy');
      if (paragraph) paragraph.textContent = copy.lookbookText;
    }
    section.dataset.project9006FinalLookbook = VERSION;
  }

  function apply() {
    injectStyles();
    const modal = findModal();
    if (!modal) return false;
    modal.classList.add('project9006-modal');

    const copy = COPY[language()];
    const pendant = findSection(modal, [
      /^ДИЗАЙН ПОДВЕСКИ$/,
      /^PENDANT DESIGN$/,
      /^ДИЗАЙН МЕРЧА$/,
      /^MERCH DESIGN$/,
      /^MERCH$/,
    ]);
    const lookbook = findSection(modal, [
      /^ЛУКБУК И КОЛЛАЖ$/,
      /^LOOKBOOK PHOTOSHOOT & HANDMADE COLLAGE$/,
      /^КАМПЭЙН$/,
      /^PHOTO CAMPAIGN$/,
      /^PHOTOSHOOT$/,
    ]);

    rebuildPendant(pendant, copy);
    rebuildLookbook(lookbook, copy);
    modal.dataset.project9006FinalFix = `${VERSION}-${language()}`;
    return true;
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  document.addEventListener('click', (event) => {
    const project = event.target.closest('#works article, #works button');
    const title = normalize(project?.querySelector('h3')?.textContent);
    if (title === 'NINETY Z S' || title === '90.06') {
      setTimeout(schedule, 0);
      setTimeout(schedule, 100);
      setTimeout(schedule, 300);
    }
  }, true);

  schedule();
})();