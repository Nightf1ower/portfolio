(() => {
  if (window.__stickersGalleryV2) return;
  window.__stickersGalleryV2 = true;

  const VERSION = 'stickers-gallery-2';
  const PROJECT_ORDER = ['mnu', 'flawa'];
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;

  let modal = null;
  let lightbox = null;
  let activeIndex = 0;
  let allItems = [];
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      empty: 'ИЗОБРАЖЕНИЯ ПОКА НЕ НАЙДЕНЫ',
      manifestError: 'СПИСОК ИЗОБРАЖЕНИЙ НЕ СОЗДАН',
      stickers: 'СТИКЕРЫ',
      real: 'REAL',
    },
    en: {
      close: 'CLOSE',
      empty: 'NO IMAGES FOUND YET',
      manifestError: 'IMAGE LIST WAS NOT GENERATED',
      stickers: 'STICKERS',
      real: 'REAL',
    },
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const naturalSort = (left, right) => (
    (left.path || left.name || '').localeCompare(
      right.path || right.name || '',
      undefined,
      { numeric: true, sensitivity: 'base' },
    )
  );

  function isRealAsset(item) {
    const value = `${item.path || ''}/${item.name || ''}`;
    return /(?:^|\/)real(?:\/|$)/i.test(value)
      || /(?:^|[-_\s])real(?:[-_\s.\d]|$)/i.test(item.name || '');
  }

  function normalizeItem(item) {
    if (!item || typeof item !== 'object') return null;
    const name = String(item.name || '').trim();
    const path = String(item.path || '').trim();
    const src = String(item.src || '').trim();
    if (!src || !IMAGE_RE.test(name || path || src.split(/[?#]/)[0])) return null;
    return { name: name || src.split('/').pop() || 'Sticker image', path: path || src, src };
  }

  function readManifestProjects() {
    const manifest = window.STICKERS_ASSET_MANIFEST;
    const source = manifest?.projects;
    if (!source || typeof source !== 'object') return [];

    const keys = [
      ...PROJECT_ORDER.filter((key) => source[key]),
      ...Object.keys(source).filter((key) => !PROJECT_ORDER.includes(key)).sort(),
    ];

    return keys.map((key) => {
      const project = source[key] || {};
      const unique = [...new Map(
        (Array.isArray(project.items) ? project.items : [])
          .map(normalizeItem)
          .filter(Boolean)
          .map((item) => [item.path, item]),
      ).values()].sort(naturalSort);

      return {
        key,
        title: project.title || key.toUpperCase(),
        stickers: unique.filter((item) => !isRealAsset(item)),
        real: unique.filter(isRealAsset),
      };
    });
  }

  function injectStyles() {
    const existing = document.getElementById('stickers-gallery-style');
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = el('style');
    style.id = 'stickers-gallery-style';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.stk-modal), body:has(.stk-modal) { overflow: hidden !important; }
      .stk-modal {
        position: fixed;
        inset: 0;
        z-index: 760000;
        box-sizing: border-box;
        width: 100%;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(5rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #f5f1e8;
        color: #050505;
        overscroll-behavior: contain;
      }
      .stk-inner { box-sizing: border-box; width: min(100%, 86rem); margin: 0 auto; }
      .stk-head {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .7rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.25);
        background: rgba(245,241,232,.94);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .stk-label, .stk-close, .stk-subtitle, .stk-empty, .stk-light-count {
        font-family: Arial, Helvetica, sans-serif;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .24em;
        text-transform: uppercase;
      }
      .stk-label { margin: 0; padding: .45rem .75rem; background: #050505; color: #fff; }
      .stk-close { border: 0; padding: .7rem 1rem; background: #050505; color: #fff; cursor: pointer; }
      .stk-hero { padding: clamp(4.5rem, 11vw, 9rem) 0 clamp(4rem, 8vw, 7rem); }
      .stk-title {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(4rem, 13vw, 13rem);
        font-weight: 900;
        line-height: .74;
        letter-spacing: -.095em;
        text-transform: uppercase;
      }
      .stk-project { padding: clamp(3rem, 7vw, 6rem) 0; border-top: 1px solid rgba(5,5,5,.25); }
      .stk-project-title {
        margin: 0 0 clamp(2rem, 4vw, 3.5rem);
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(3.5rem, 9vw, 9rem);
        font-weight: 900;
        line-height: .76;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .stk-group + .stk-group { margin-top: clamp(4rem, 8vw, 7rem); }
      .stk-subtitle { margin: 0 0 1.25rem; }
      .stk-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        align-items: start;
        width: 100%;
      }
      .stk-card {
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: zoom-in;
        overflow: hidden;
      }
      .stk-card img {
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        height: auto !important;
        min-height: 1px;
        opacity: 1 !important;
        visibility: visible !important;
      }
      .stk-grid--stickers .stk-card { background: transparent; }
      .stk-grid--stickers .stk-card img { object-fit: contain; }
      .stk-grid--real .stk-card img { object-fit: cover; }
      .stk-empty { margin: 0; padding: 1rem 0; color: rgba(5,5,5,.55); }
      .stk-light {
        position: fixed;
        inset: 0;
        z-index: 980000;
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: clamp(.5rem, 2vw, 1.25rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
      }
      .stk-light-stage { min-width: 0; height: calc(100dvh - 2rem); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .stk-light-image { display: block; max-width: 100%; max-height: 92dvh; width: auto; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
      .stk-light-close, .stk-light-nav {
        border: 1px solid rgba(255,255,255,.7);
        background: #050505;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 900;
        cursor: pointer;
      }
      .stk-light-close { position: absolute; top: max(1rem, env(safe-area-inset-top)); right: max(1rem, env(safe-area-inset-right)); padding: .75rem 1rem; font-size: .68rem; letter-spacing: .18em; }
      .stk-light-nav { width: 3.4rem; height: 3.4rem; font-size: 1.6rem; }
      .stk-light-count { position: absolute; left: 50%; bottom: max(1rem, env(safe-area-inset-bottom)); transform: translateX(-50%); margin: 0; padding: .5rem .75rem; background: #fff; color: #050505; }
      @media (max-width: 900px) { .stk-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 560px), (hover: none), (pointer: coarse) {
        .stk-grid { grid-template-columns: 1fr; }
        .stk-light { grid-template-columns: 1fr; padding: .75rem; }
        .stk-light-nav { display: none; }
        .stk-light-stage { height: calc(100dvh - 1.5rem); }
      }
    `;
    document.head.append(style);
  }

  function lockPage() {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPage() {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
  }

  function closeModal() {
    closeLightbox();
    modal?.remove();
    modal = null;
    allItems = [];
    unlockPage();
  }

  function versionedSource(src) {
    return `${src}${src.includes('?') ? '&' : '?'}v=${VERSION}`;
  }

  function renderLightbox() {
    if (!lightbox || !allItems.length) return;
    const item = allItems[activeIndex];
    const image = lightbox.querySelector('.stk-light-image');
    image.src = versionedSource(item.src);
    image.alt = item.name || 'Sticker image';
    lightbox.querySelector('.stk-light-count').textContent = `${activeIndex + 1} / ${allItems.length}`;
  }

  function stepLightbox(amount) {
    if (!allItems.length) return;
    activeIndex = (activeIndex + amount + allItems.length) % allItems.length;
    renderLightbox();
  }

  function openLightbox(index) {
    if (!allItems.length || index < 0) return;
    closeLightbox();
    activeIndex = Math.max(0, Math.min(index, allItems.length - 1));

    const overlay = el('div', 'stk-light');
    const close = el('button', 'stk-light-close', COPY[language()].close);
    const previous = el('button', 'stk-light-nav', '←');
    const stage = el('div', 'stk-light-stage');
    const image = el('img', 'stk-light-image');
    const next = el('button', 'stk-light-nav', '→');
    const count = el('p', 'stk-light-count');
    close.type = previous.type = next.type = 'button';
    image.draggable = false;

    close.onclick = (event) => { event.stopPropagation(); closeLightbox(); };
    previous.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = closeLightbox;

    let startX = 0;
    let startY = 0;
    overlay.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    overlay.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) stepLightbox(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) closeLightbox();
    }, { passive: true });

    stage.append(image);
    overlay.append(close, previous, stage, next, count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function makeGrid(items, type) {
    const copy = COPY[language()];
    if (!items.length) return el('p', 'stk-empty', copy.empty);

    const grid = el('div', `stk-grid stk-grid--${type}`);
    items.forEach((item) => {
      const button = el('button', 'stk-card');
      const image = el('img');
      button.type = 'button';
      image.src = versionedSource(item.src);
      image.alt = item.name || 'Sticker image';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      image.addEventListener('error', () => {
        button.hidden = true;
      }, { once: true });
      button.append(image);
      button.onclick = (event) => {
        event.stopPropagation();
        openLightbox(allItems.findIndex((candidate) => candidate.path === item.path));
      };
      grid.append(button);
    });
    return grid;
  }

  function makeGroup(title, items, type) {
    const group = el('div', 'stk-group');
    group.append(el('h3', 'stk-subtitle', title), makeGrid(items, type));
    return group;
  }

  function renderProjects(inner, projects) {
    const copy = COPY[language()];
    allItems = projects.flatMap((project) => [...project.stickers, ...project.real]);

    projects.forEach((project) => {
      const section = el('section', 'stk-project');
      section.dataset.stickersProject = project.key;
      section.append(el('h2', 'stk-project-title', project.title));
      if (project.stickers.length) section.append(makeGroup(copy.stickers, project.stickers, 'stickers'));
      if (project.real.length) section.append(makeGroup(copy.real, project.real, 'real'));
      if (!project.stickers.length && !project.real.length) section.append(el('p', 'stk-empty', copy.empty));
      inner.append(section);
    });
  }

  function openModal() {
    injectStyles();
    closeModal();
    lockPage();

    const copy = COPY[language()];
    modal = el('div', 'stk-modal');
    const inner = el('div', 'stk-inner');
    const head = el('div', 'stk-head');
    const close = el('button', 'stk-close', copy.close);
    const hero = el('section', 'stk-hero');

    close.type = 'button';
    close.onclick = (event) => { event.stopPropagation(); closeModal(); };
    head.append(el('p', 'stk-label', 'STICKERS'), close);
    hero.append(el('h1', 'stk-title', 'STICKERS'));
    inner.append(head, hero);
    modal.append(inner);
    document.body.append(modal);

    const projects = readManifestProjects();
    if (!projects.length) {
      inner.append(el('p', 'stk-empty', copy.manifestError));
      return;
    }
    renderProjects(inner, projects);
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    if (!card) return;
    const title = card.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'STICKERS') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openModal();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeLightbox();
      return;
    }
    if (event.key === 'ArrowLeft' && lightbox) {
      event.preventDefault();
      event.stopImmediatePropagation();
      stepLightbox(-1);
      return;
    }
    if (event.key === 'ArrowRight' && lightbox) {
      event.preventDefault();
      event.stopImmediatePropagation();
      stepLightbox(1);
      return;
    }
    if (event.key === 'Escape' && modal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeModal();
    }
  }, true);

  injectStyles();
})();
