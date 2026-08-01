(() => {
  if (window.__stickersGalleryV1) return;
  window.__stickersGalleryV1 = true;

  const VERSION = 'stickers-gallery-1';
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  const PROJECTS = [
    { key: 'mnu', title: 'MNU', root: 'public/works/stickers/MNU' },
    { key: 'flawa', title: 'FLAWA', root: 'public/works/stickers/flawa' },
  ];

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
      loading: 'ЗАГРУЗКА СТИКЕРОВ...',
      empty: 'ИЗОБРАЖЕНИЯ ПОКА НЕ НАЙДЕНЫ',
      stickers: 'СТИКЕРЫ',
      real: 'REAL',
    },
    en: {
      close: 'CLOSE',
      loading: 'LOADING STICKERS...',
      empty: 'NO IMAGES FOUND YET',
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

  const naturalSort = (a, b) => (
    (a.path || a.name || '').localeCompare(
      b.path || b.name || '',
      undefined,
      { numeric: true, sensitivity: 'base' },
    )
  );

  const isRealAsset = (item) => {
    const value = `${item.path || ''}/${item.name || ''}`;
    return /(?:^|\/)real(?:\/|$)/i.test(value)
      || /(?:^|[-_\s])real(?:[-_\s.\d]|$)/i.test(item.name || '');
  };

  const apiUrl = (path) => (
    `https://api.github.com/repos/${REPO}/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(BRANCH)}`
  );

  async function fetchDirectory(path, depth = 0) {
    try {
      const response = await fetch(apiUrl(path), {
        cache: 'no-store',
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!response.ok) return [];
      const entries = await response.json();
      if (!Array.isArray(entries)) return [];

      const files = entries
        .filter((entry) => entry.type === 'file' && IMAGE_RE.test(entry.name || entry.path || ''))
        .map((entry) => ({
          name: entry.name,
          path: entry.path,
          src: entry.download_url || `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${entry.path}`,
        }));

      if (depth >= 3) return files;
      const directories = entries.filter((entry) => entry.type === 'dir');
      const nested = await Promise.all(
        directories.map((entry) => fetchDirectory(entry.path, depth + 1)),
      );
      return files.concat(...nested);
    } catch {
      return [];
    }
  }

  async function loadProject(project) {
    const items = await fetchDirectory(project.root);
    const unique = [...new Map(items.map((item) => [item.path, item])).values()];
    return {
      ...project,
      stickers: unique.filter((item) => !isRealAsset(item)).sort(naturalSort),
      real: unique.filter(isRealAsset).sort(naturalSort),
    };
  }

  function injectStyles() {
    document.getElementById('stickers-gallery-style')?.remove();
    const style = el('style');
    style.id = 'stickers-gallery-style';
    style.textContent = `
      html:has(.stk-modal), body:has(.stk-modal) { overflow: hidden !important; }
      .stk-modal {
        position: fixed;
        inset: 0;
        z-index: 760000;
        width: 100vw;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(5rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #f5f1e8;
        color: #050505;
        overscroll-behavior: contain;
      }
      .stk-inner { width: min(100%, 86rem); margin: 0 auto; }
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
      .stk-loading { margin: 0; padding: 2rem 0; font: 900 .75rem/1.2 Arial, Helvetica, sans-serif; letter-spacing: .22em; text-transform: uppercase; }
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
      .stk-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; align-items: start; }
      .stk-card {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: zoom-in;
        overflow: hidden;
      }
      .stk-card img { display: block; width: 100%; height: auto; }
      .stk-grid--stickers .stk-card { background: rgba(255,255,255,.55); }
      .stk-grid--stickers .stk-card img { object-fit: contain; }
      .stk-grid--real .stk-card img { object-fit: cover; }
      .stk-empty { margin: 0; color: rgba(5,5,5,.48); }
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

  function renderLightbox() {
    if (!lightbox || !allItems.length) return;
    const item = allItems[activeIndex];
    const image = lightbox.querySelector('.stk-light-image');
    image.src = item.src;
    image.alt = item.name || 'Sticker image';
    lightbox.querySelector('.stk-light-count').textContent = `${activeIndex + 1} / ${allItems.length}`;
  }

  function stepLightbox(amount) {
    if (!allItems.length) return;
    activeIndex = (activeIndex + amount + allItems.length) % allItems.length;
    renderLightbox();
  }

  function openLightbox(index) {
    if (!allItems.length) return;
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
      image.src = `${item.src}${item.src.includes('?') ? '&' : '?'}v=${VERSION}`;
      image.alt = item.name || 'Sticker image';
      image.loading = 'lazy';
      image.decoding = 'async';
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

  async function openModal() {
    injectStyles();
    closeModal();
    lockPage();

    const copy = COPY[language()];
    modal = el('div', 'stk-modal');
    const inner = el('div', 'stk-inner');
    const head = el('div', 'stk-head');
    const close = el('button', 'stk-close', copy.close);
    const hero = el('section', 'stk-hero');
    const loading = el('p', 'stk-loading', copy.loading);

    close.type = 'button';
    close.onclick = (event) => { event.stopPropagation(); closeModal(); };
    head.append(el('p', 'stk-label', 'STICKERS'), close);
    hero.append(el('h1', 'stk-title', 'STICKERS'));
    inner.append(head, hero, loading);
    modal.append(inner);
    document.body.append(modal);

    const projects = await Promise.all(PROJECTS.map(loadProject));
    if (!modal || !document.body.contains(modal)) return;
    loading.remove();
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
})();
