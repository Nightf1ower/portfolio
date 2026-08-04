(() => {
  if (window.__portfolioAutoGalleriesV1) return;
  window.__portfolioAutoGalleriesV1 = true;

  const VERSION = 'portfolio-auto-galleries-1';
  const manifest = window.PORTFOLIO_GALLERY_MANIFEST || {
    logos: [],
    collages: [],
    posters: [],
  };

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const naturalCompare = (a, b) => String(a).localeCompare(String(b), 'en', {
    numeric: true,
    sensitivity: 'base',
  });

  const cleanName = (item) => String(item?.name || item?.relative || 'image')
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const items = (source, prefix) => [...(source || [])]
    .sort((a, b) => naturalCompare(a.relative, b.relative))
    .map((item, index) => ({
      ...item,
      alt: `${prefix} ${index + 1}: ${cleanName(item)}`,
    }));

  const LOGOS = items(manifest.logos, 'Logo');
  const COLLAGES = items(manifest.collages, 'Collage');
  const POSTERS = items(manifest.posters, 'Poster');

  let modal = null;
  let lightbox = null;
  let lightboxItems = [];
  let activeIndex = 0;
  let oldBodyOverflow = '';
  let oldHtmlOverflow = '';

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => language() === 'ru'
    ? {
        close: 'ЗАКРЫТЬ',
        logos: 'ЛОГОТИПЫ',
        collages: 'КОЛЛАЖИ',
        posters: 'ПОСТЕРЫ',
        events: 'ИВЕНТЫ / ВЕЧЕРИНКИ',
        italo: 'ITALO POSTERS',
        flawa: 'FLAWA POSTERS',
        collagePosters: 'КОЛЛАЖНЫЕ ПОСТЕРЫ',
        dots: 'DOTS',
        open: 'ОТКРЫТЬ ПРОЕКТ',
        empty: 'ИЗОБРАЖЕНИЯ НЕ НАЙДЕНЫ',
        items: 'РАБОТ',
      }
    : {
        close: 'CLOSE',
        logos: 'LOGOS',
        collages: 'COLLAGES',
        posters: 'POSTERS',
        events: 'EVENTS / PARTIES',
        italo: 'ITALO POSTERS',
        flawa: 'FLAWA POSTERS',
        collagePosters: 'COLLAGE POSTERS',
        dots: 'DOTS',
        open: 'OPEN PROJECT',
        empty: 'NO IMAGES FOUND',
        items: 'ITEMS',
      };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function injectStyles() {
    const old = document.getElementById('portfolio-auto-galleries-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = el('style');
    style.id = 'portfolio-auto-galleries-style';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.pag-modal), body:has(.pag-modal) {
        overflow: hidden !important;
      }
      .pag-modal {
        position: fixed;
        inset: 0;
        z-index: 920000;
        width: 100vw;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: contain;
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(5rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: #f3f2ef;
        color: #050505;
      }
      .pag-inner { width: 100%; max-width: none; margin: 0 auto; }
      .pag-head {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .7rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.28);
        background: rgba(243,242,239,.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .pag-label, .pag-close, .pag-count {
        font-family: Arial,Helvetica,sans-serif;
        font-size: .68rem;
        font-weight: 900;
        line-height: 1;
        letter-spacing: .25em;
        text-transform: uppercase;
      }
      .pag-label, .pag-close {
        margin: 0;
        border: 0;
        padding: .7rem 1rem;
        background: #050505;
        color: #fff;
      }
      .pag-close { cursor: pointer; }
      .pag-hero { padding: clamp(4rem,10vw,9rem) 0 clamp(3rem,7vw,6rem); }
      .pag-title {
        width: 100%;
        max-width: none;
        margin: 0;
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(4.2rem,14vw,13rem);
        font-weight: 900;
        line-height: .82;
        letter-spacing: -.075em;
        text-transform: uppercase;
      }
      .pag-section {
        padding: clamp(3.5rem,7vw,6.5rem) 0;
        border-top: 1px solid rgba(5,5,5,.25);
      }
      .pag-section-head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: clamp(1.5rem,3vw,2.5rem);
      }
      .pag-section-title {
        margin: 0;
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(2.8rem,7vw,7.5rem);
        font-weight: 900;
        line-height: .84;
        letter-spacing: -.07em;
        text-transform: uppercase;
      }
      .pag-count { margin: 0; color: rgba(5,5,5,.48); white-space: nowrap; }
      .pag-grid {
        display: grid;
        grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 1rem;
        align-items: start;
      }
      .pag-grid.is-logos { grid-template-columns: repeat(3,minmax(0,1fr)); }
      .pag-card {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: zoom-in;
        overflow: hidden;
      }
      .pag-card-media {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 12rem;
        background: #fff;
        border: 1px solid rgba(5,5,5,.18);
        overflow: hidden;
      }
      .pag-card img {
        display: block;
        width: 100%;
        height: auto;
        max-height: 80vh;
        margin: 0;
        padding: 0;
        border: 0;
        object-fit: contain;
      }
      .pag-grid.is-logos .pag-card img { padding: clamp(.75rem,2vw,1.5rem); }
      .pag-empty {
        margin: 0;
        padding: 3rem 1rem;
        border: 1px solid rgba(5,5,5,.25);
        font: 900 .7rem/1.3 Arial,Helvetica,sans-serif;
        letter-spacing: .22em;
        text-align: center;
      }
      .pag-light {
        position: fixed;
        inset: 0;
        z-index: 990000;
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: clamp(.5rem,2vw,1.25rem);
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
      }
      .pag-light-stage {
        min-width: 0;
        height: calc(100dvh - 2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .pag-light-image {
        display: block;
        max-width: 100%;
        max-height: 92dvh;
        width: auto;
        height: auto;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
      }
      .pag-light-nav, .pag-light-close {
        border: 1px solid rgba(255,255,255,.75);
        background: #050505;
        color: #fff;
        cursor: pointer;
        font-family: Arial,Helvetica,sans-serif;
        font-weight: 900;
      }
      .pag-light-nav { width: 3.3rem; height: 3.3rem; font-size: 1.5rem; }
      .pag-light-close {
        position: absolute;
        top: max(1rem,env(safe-area-inset-top));
        right: max(1rem,env(safe-area-inset-right));
        padding: .72rem .95rem;
        font-size: .68rem;
        letter-spacing: .2em;
      }
      .pag-light-count {
        position: absolute;
        left: 50%;
        bottom: max(1rem,env(safe-area-inset-bottom));
        transform: translateX(-50%);
        margin: 0;
        padding: .45rem .7rem;
        background: #fff;
        color: #050505;
        font: 900 .65rem/1 Arial,Helvetica,sans-serif;
        letter-spacing: .18em;
      }
      #works [data-auto-gallery-card="LOGOS"] .project-card-preview-v5 img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        padding: .7rem !important;
        object-fit: contain !important;
        background: #fff !important;
      }
      @media (max-width: 920px) {
        .pag-grid, .pag-grid.is-logos { grid-template-columns: repeat(2,minmax(0,1fr)); }
      }
      @media (max-width: 620px), (hover:none), (pointer:coarse) {
        .pag-title { font-size: clamp(3rem,16vw,6rem); }
        .pag-section-head { display: block; }
        .pag-count { margin-top: .75rem; }
        .pag-grid, .pag-grid.is-logos { grid-template-columns: 1fr; gap: .8rem; }
        .pag-light { grid-template-columns: 1fr; padding: .75rem; }
        .pag-light-nav { display: none; }
        .pag-light-stage { height: calc(100dvh - 1.5rem); }
      }
    `;
    document.head.append(style);
  }

  function itemFolder(item) {
    return String(item.folder || 'root').toLowerCase().replace(/\\/g, '/');
  }

  function groupCollages() {
    const text = copy();
    const groups = [];
    const used = new Set();

    const take = (title, predicate, className = '') => {
      const groupItems = COLLAGES.filter((item) => !used.has(item.src) && predicate(item));
      if (!groupItems.length) return;
      groupItems.forEach((item) => used.add(item.src));
      groups.push({ title, items: groupItems, className });
    };

    take(text.collages, (item) => ['root', 'collage'].includes(itemFolder(item)));
    take(text.collagePosters, (item) => /collage[-_ ]?poster/.test(itemFolder(item)));
    take(text.dots, (item) => /(^|\/)dots($|\/)/.test(itemFolder(item)));

    const remainingFolders = [...new Set(COLLAGES
      .filter((item) => !used.has(item.src))
      .map(itemFolder))]
      .sort(naturalCompare);

    remainingFolders.forEach((folder) => take(
      folder.replace(/[/_-]+/g, ' ').toUpperCase(),
      (item) => itemFolder(item) === folder,
    ));

    return groups;
  }

  function groupPosters() {
    const text = copy();
    const groups = [];
    const used = new Set();

    const take = (title, predicate) => {
      const groupItems = POSTERS.filter((item) => !used.has(item.src) && predicate(item));
      if (!groupItems.length) return;
      groupItems.forEach((item) => used.add(item.src));
      groups.push({ title, items: groupItems });
    };

    take(text.italo, (item) => /italo/i.test(item.name));
    take(text.flawa, (item) => /flawa/i.test(item.name));
    take(text.events, (item) => itemFolder(item).split('/').includes('events'));
    take(text.posters, () => true);
    return groups;
  }

  function galleryConfig(project) {
    const text = copy();
    if (project === 'LOGOS') {
      return { title: text.logos, sections: [{ title: text.logos, items: LOGOS, className: 'is-logos' }] };
    }
    if (project === 'COLLAGES PHOTO EDIT') {
      return { title: text.collages, sections: groupCollages() };
    }
    return { title: text.posters, sections: groupPosters() };
  }

  function lockPage() {
    oldBodyOverflow = document.body.style.overflow;
    oldHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPage() {
    document.body.style.overflow = oldBodyOverflow;
    document.documentElement.style.overflow = oldHtmlOverflow;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
  }

  function closeModal() {
    closeLightbox();
    modal?.remove();
    modal = null;
    unlockPage();
  }

  function renderLightbox() {
    if (!lightbox || !lightboxItems.length) return;
    const item = lightboxItems[activeIndex];
    const image = lightbox.querySelector('.pag-light-image');
    image.src = item.src;
    image.alt = item.alt;
    lightbox.querySelector('.pag-light-count').textContent = `${activeIndex + 1} / ${lightboxItems.length}`;
  }

  function stepLightbox(amount) {
    if (!lightboxItems.length) return;
    activeIndex = (activeIndex + amount + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  }

  function openLightbox(item) {
    closeLightbox();
    activeIndex = Math.max(0, lightboxItems.findIndex((entry) => entry.src === item.src));

    const overlay = el('div', 'pag-light');
    const previous = el('button', 'pag-light-nav', '←');
    const stage = el('div', 'pag-light-stage');
    const image = el('img', 'pag-light-image');
    const next = el('button', 'pag-light-nav', '→');
    const close = el('button', 'pag-light-close', copy().close);
    const count = el('p', 'pag-light-count');

    previous.type = next.type = close.type = 'button';
    image.draggable = false;
    previous.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    close.onclick = (event) => { event.stopPropagation(); closeLightbox(); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = closeLightbox;

    let startX = 0;
    overlay.addEventListener('touchstart', (event) => {
      startX = event.touches[0]?.clientX || 0;
    }, { passive: true });
    overlay.addEventListener('touchend', (event) => {
      const endX = event.changedTouches[0]?.clientX || startX;
      const delta = endX - startX;
      if (Math.abs(delta) > 48) stepLightbox(delta < 0 ? 1 : -1);
    }, { passive: true });

    stage.append(image);
    overlay.append(previous, stage, next, close, count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function createSection(section) {
    const wrapper = el('section', 'pag-section');
    const head = el('div', 'pag-section-head');
    const heading = el('h2', 'pag-section-title', section.title);
    const count = el('p', 'pag-count', `${section.items.length} ${copy().items}`);
    head.append(heading, count);
    wrapper.append(head);

    if (!section.items.length) {
      wrapper.append(el('p', 'pag-empty', copy().empty));
      return wrapper;
    }

    const grid = el('div', `pag-grid${section.className ? ` ${section.className}` : ''}`);
    section.items.forEach((item) => {
      const card = el('button', 'pag-card');
      const media = el('span', 'pag-card-media');
      const image = el('img');
      card.type = 'button';
      card.setAttribute('aria-label', item.alt);
      image.src = item.src;
      image.alt = item.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      media.append(image);
      card.append(media);
      card.onclick = (event) => {
        event.stopPropagation();
        openLightbox(item);
      };
      grid.append(card);
    });
    wrapper.append(grid);
    return wrapper;
  }

  function openModal(project) {
    injectStyles();
    closeModal();
    lockPage();

    const config = galleryConfig(project);
    lightboxItems = config.sections.flatMap((section) => section.items);

    const overlay = el('div', 'pag-modal');
    const inner = el('div', 'pag-inner');
    const head = el('div', 'pag-head');
    const label = el('p', 'pag-label', config.title);
    const close = el('button', 'pag-close', copy().close);
    const hero = el('section', 'pag-hero');
    const title = el('h1', 'pag-title', config.title);

    close.type = 'button';
    close.onclick = (event) => { event.stopPropagation(); closeModal(); };
    head.append(label, close);
    hero.append(title);
    inner.append(head, hero);

    if (config.sections.length) {
      config.sections.forEach((section) => inner.append(createSection(section)));
    } else {
      inner.append(el('p', 'pag-empty', copy().empty));
    }

    overlay.append(inner);
    document.body.append(overlay);
    modal = overlay;
  }

  function findCard(project) {
    return [...document.querySelectorAll('#works article, #works button')]
      .find((card) => normalize(card.querySelector('h3')?.textContent) === project) || null;
  }

  function enhanceCards() {
    ['LOGOS', 'COLLAGES PHOTO EDIT', 'POSTERS'].forEach((project) => {
      const card = findCard(project);
      if (!card) return;
      card.dataset.autoGalleryCard = project;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', copy().open);
      card.style.cursor = 'pointer';
    });

    const logoCard = findCard('LOGOS');
    const previewItem = LOGOS.find((item) => /cpm-main-logo/i.test(item.name)) || LOGOS[0];
    if (!logoCard || !previewItem) return;

    const host = logoCard.querySelector('.my-10.flex.flex-1')
      || logoCard.querySelector('.my-10')
      || null;
    if (!host) return;

    let preview = host.querySelector(':scope > .project-card-preview-v5');
    if (!preview) {
      preview = el('div', 'project-card-preview-v5');
      host.replaceChildren(preview);
    }

    let image = preview.querySelector(':scope > img');
    if (!image) {
      image = el('img');
      preview.replaceChildren(image);
    }

    if (image.getAttribute('src') !== previewItem.src) image.src = previewItem.src;
    image.alt = 'LOGOS preview';
    image.loading = 'eager';
    image.decoding = 'async';
  }

  window.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const card = target?.closest('#works article, #works button');
    const title = normalize(card?.querySelector('h3')?.textContent);
    if (!['LOGOS', 'COLLAGES PHOTO EDIT', 'POSTERS'].includes(title)) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openModal(title);
  }, true);

  window.addEventListener('keydown', (event) => {
    if (lightbox) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopImmediatePropagation();
        stepLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopImmediatePropagation();
        stepLightbox(1);
      }
      return;
    }

    if (modal && event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeModal();
    }
  }, true);

  injectStyles();

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhanceCards();
    });
  };

  const works = document.getElementById('works');
  if (works) {
    new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length || mutation.removedNodes.length)) schedule();
    }).observe(works, { childList: true, subtree: true });
  }

  window.addEventListener('load', schedule);
  [0, 120, 350, 900, 1800].forEach((delay) => setTimeout(schedule, delay));
  schedule();
})();
