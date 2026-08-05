(() => {
  if (window.__postersGalleryCleanV1) return;
  window.__postersGalleryCleanV1 = true;

  const VERSION = 'posters-gallery-clean-1';
  const manifest = window.PORTFOLIO_GALLERY_MANIFEST || {};
  const SOURCE = Array.isArray(manifest.posters) ? manifest.posters : [];

  const normalize = value => String(value || '')
    .trim()
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      title: 'ПОСТЕРЫ',
      intro: 'Серия постеров, созданных для различных проектов, мероприятий и личных экспериментов. В работах я исследую разные визуальные стили, сочетая типографику, фотографию, коллаж и ручную графику.',
      italyTitle: 'SPECIAL ITALY PROJECT',
      italyText: 'Разработка серии рекламных постеров для мероприятий в Италии. В основе дизайна — выразительная типографика, динамичные композиции и яркий визуальный язык, передающий настроение и атмосферу каждого события.',
      eventsTitle: 'EVENT POSTERS',
      eventsText: 'Разработка постеров для мероприятий, клубных вечеринок и музыкальных событий. Каждый дизайн создавался с учетом формата, аудитории и общей атмосферы конкретного ивента.',
      flawaTitle: 'FLAWA POSTERS',
      flawaText: 'Серия личных постеров, созданных как способ самовыражения и презентации себя в качестве артиста. В основе работ — собственные фотографии, личные образы и эксперименты с коллажем, типографикой и обработкой.',
      otherTitle: 'POSTERS',
      open: 'ОТКРЫТЬ ПОСТЕР',
      top: 'НАВЕРХ',
    },
    en: {
      close: 'CLOSE',
      title: 'POSTERS',
      intro: 'A series of posters created for various projects, events, and personal experiments. The works explore different visual styles through typography, photography, collage, and handmade graphics.',
      italyTitle: 'SPECIAL ITALY PROJECT',
      italyText: 'A series of promotional posters created for events in Italy. The designs combine expressive typography, dynamic compositions, and a bold visual language that reflects the mood and atmosphere of each event.',
      eventsTitle: 'EVENT POSTERS',
      eventsText: 'Poster designs for events, club nights, and music-related projects. Each visual was developed around the format, audience, and individual atmosphere of the event.',
      flawaTitle: 'FLAWA POSTERS',
      flawaText: 'A personal poster series created as a form of self-expression and a way to present myself as an artist. The works are based on personal photographs, individual imagery, and experiments with collage, typography, and image processing.',
      otherTitle: 'POSTERS',
      open: 'OPEN POSTER',
      top: 'BACK TO TOP',
    },
  };

  const naturalCompare = (a, b) => String(a).localeCompare(String(b), 'en', {
    numeric: true,
    sensitivity: 'base',
  });

  const cleanPath = item => [item?.name, item?.relative, item?.folder, item?.src]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const isSocPoster = item => /soc[\s_\-/]*posters?/.test(cleanPath(item));
  const isItaly = item => /(italo|italy)/.test(cleanPath(item));
  const isFlawa = item => /flawa/.test(cleanPath(item));
  const isEvent = item => /(^|[\s_\-/])events?([\s_\-/]|$)/.test(cleanPath(item));

  const POSTERS = SOURCE
    .filter(item => item?.src && !isSocPoster(item))
    .sort((a, b) => naturalCompare(a.relative || a.name, b.relative || b.name));

  let modal = null;
  let lightbox = null;
  let observer = null;
  let items = [];
  let activeIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function installStyles() {
    const id = 'posters-gallery-clean-style';
    const old = document.getElementById(id);
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = el('style');
    style.id = id;
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.pcg-modal), body:has(.pcg-modal) { overflow: hidden !important; }

      .pcg-modal {
        position: fixed;
        inset: 0;
        z-index: 950000;
        box-sizing: border-box;
        width: 100vw;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: contain;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(5rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #f3f2ef;
        color: #050505;
      }

      .pcg-inner { width: 100%; max-width: none; margin: 0; }

      .pcg-head {
        position: sticky;
        top: 0;
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .7rem 0 1rem;
        background: rgba(243,242,239,.96);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      .pcg-label,
      .pcg-close {
        margin: 0;
        border: 0;
        padding: .7rem 1rem;
        background: #050505;
        color: #fff;
        font: 900 .68rem/1 Arial, Helvetica, sans-serif;
        letter-spacing: .25em;
        text-transform: uppercase;
      }

      .pcg-close { cursor: pointer; }

      .pcg-hero { padding: clamp(3.5rem, 8vw, 7rem) 0 clamp(3rem, 6vw, 5rem); }

      .pcg-title {
        margin: 0;
        font: 900 clamp(4.2rem, 14vw, 13rem)/.82 Arial, Helvetica, sans-serif;
        letter-spacing: -.075em;
        text-transform: uppercase;
      }

      .pcg-intro,
      .pcg-copy {
        box-sizing: border-box;
        width: 100%;
        max-width: none;
        padding-right: clamp(0rem, 8vw, 9rem);
        font: 500 clamp(1rem, 1.25vw, 1.3rem)/1.42 Arial, Helvetica, sans-serif;
        letter-spacing: -.015em;
      }

      .pcg-intro { margin: clamp(1.5rem, 3vw, 2.5rem) 0 0; }
      .pcg-copy { margin: 0 0 clamp(2rem, 4vw, 3.5rem); }

      .pcg-section {
        padding: clamp(3.25rem, 6vw, 6rem) 0;
        border-top: 1px solid rgba(5,5,5,.22);
        content-visibility: auto;
        contain-intrinsic-size: auto 1200px;
      }

      .pcg-section-title {
        margin: 0 0 clamp(1rem, 2vw, 1.5rem);
        font: 900 clamp(2.8rem, 7vw, 7.5rem)/.84 Arial, Helvetica, sans-serif;
        letter-spacing: -.07em;
        text-transform: uppercase;
      }

      .pcg-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        align-items: start;
      }

      .pcg-card {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        background: transparent;
        box-shadow: none;
        cursor: zoom-in;
      }

      .pcg-card img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        background: transparent;
        box-shadow: none;
        object-fit: contain;
        opacity: 0;
        transition: opacity .18s ease;
      }

      .pcg-card img.is-loaded { opacity: 1; }

      .pcg-light {
        position: fixed;
        inset: 0;
        z-index: 990000;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: clamp(.5rem, 2vw, 1.25rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
        touch-action: none;
      }

      .pcg-light-stage {
        position: relative;
        min-width: 0;
        height: calc(100dvh - 2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .pcg-light-stage::after {
        content: '';
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        border: 3px solid rgba(255,255,255,.25);
        border-top-color: #fff;
        border-radius: 50%;
        animation: pcg-spin .8s linear infinite;
      }

      .pcg-light-stage.is-loaded::after { display: none; }
      @keyframes pcg-spin { to { transform: rotate(360deg); } }

      .pcg-light-image {
        display: block;
        max-width: 100%;
        max-height: 92dvh;
        width: auto;
        height: auto;
        object-fit: contain;
        opacity: 0;
        transition: opacity .16s ease;
        user-select: none;
        -webkit-user-drag: none;
      }

      .pcg-light-stage.is-loaded .pcg-light-image { opacity: 1; }

      .pcg-light-nav,
      .pcg-light-close {
        border: 1px solid rgba(255,255,255,.72);
        background: #050505;
        color: #fff;
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 900;
      }

      .pcg-light-nav { width: 3.3rem; height: 3.3rem; font-size: 1.5rem; }

      .pcg-light-close {
        position: absolute;
        top: max(1rem, env(safe-area-inset-top));
        right: max(1rem, env(safe-area-inset-right));
        z-index: 2;
        padding: .72rem .95rem;
        font-size: .68rem;
        letter-spacing: .2em;
      }

      .pcg-top {
        position: fixed;
        right: max(1rem, env(safe-area-inset-right));
        bottom: max(1rem, env(safe-area-inset-bottom));
        z-index: 960000;
        display: grid;
        place-items: center;
        width: 3.5rem;
        height: 3.5rem;
        margin: 0;
        padding: 0;
        border: 1px solid #050505;
        background: #fff;
        color: #050505;
        font: 900 1.55rem/1 Arial, Helvetica, sans-serif;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(.7rem);
        transition: opacity .18s ease, transform .18s ease, visibility .18s ease;
      }

      .pcg-top.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      @media (max-width: 920px) {
        .pcg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }

      @media (max-width: 620px), (hover: none), (pointer: coarse) {
        .pcg-title { font-size: clamp(3rem, 16vw, 6rem); }
        .pcg-intro, .pcg-copy { padding-right: 0; font-size: 1rem; line-height: 1.45; }
        .pcg-grid { grid-template-columns: 1fr; gap: .8rem; }
        .pcg-light { grid-template-columns: 1fr; padding: .75rem; }
        .pcg-light-nav { display: none; }
        .pcg-light-stage { height: calc(100dvh - 1.5rem); }
        .pcg-top { width: 3.1rem; height: 3.1rem; }
      }
    `;
    document.head.append(style);
  }

  function groups() {
    const copy = COPY[language()];
    const used = new Set();
    const take = (title, description, predicate) => {
      const groupItems = POSTERS.filter(item => !used.has(item.src) && predicate(item));
      groupItems.forEach(item => used.add(item.src));
      return groupItems.length ? { title, description, items: groupItems } : null;
    };

    return [
      take(copy.italyTitle, copy.italyText, isItaly),
      take(copy.eventsTitle, copy.eventsText, isEvent),
      take(copy.flawaTitle, copy.flawaText, isFlawa),
      take(copy.otherTitle, '', () => true),
    ].filter(Boolean);
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

  function loadThumb(image) {
    if (!image?.dataset.src || image.dataset.loading === '1') return;
    image.dataset.loading = '1';
    image.src = image.dataset.src;
    image.removeAttribute('data-src');
    image.addEventListener('load', () => image.classList.add('is-loaded'), { once: true });
    image.addEventListener('error', () => image.classList.add('is-loaded'), { once: true });
  }

  function setupObserver() {
    observer?.disconnect();
    if (!modal) return;

    if (!('IntersectionObserver' in window)) {
      modal.querySelectorAll('img[data-src]').forEach(loadThumb);
      return;
    }

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        loadThumb(entry.target);
      });
    }, {
      root: modal,
      rootMargin: '900px 0px',
      threshold: .01,
    });

    modal.querySelectorAll('img[data-src]').forEach(image => observer.observe(image));
  }

  function preload(index) {
    if (!items.length) return;
    [-1, 1].forEach(offset => {
      const next = items[(index + offset + items.length) % items.length];
      if (!next?.src) return;
      const image = new Image();
      image.decoding = 'async';
      image.src = next.src;
    });
  }

  function renderLightbox() {
    if (!lightbox || !items.length) return;
    const item = items[activeIndex];
    const stage = lightbox.querySelector('.pcg-light-stage');
    const image = lightbox.querySelector('.pcg-light-image');
    stage.classList.remove('is-loaded');
    image.removeAttribute('src');
    image.alt = item.alt || 'Poster';

    requestAnimationFrame(() => {
      image.src = item.src;
      const finish = () => {
        stage.classList.add('is-loaded');
        preload(activeIndex);
      };
      if (image.complete && image.naturalWidth) finish();
      else {
        image.addEventListener('load', finish, { once: true });
        image.addEventListener('error', finish, { once: true });
      }
    });
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
  }

  function stepLightbox(amount) {
    if (!items.length) return;
    activeIndex = (activeIndex + amount + items.length) % items.length;
    renderLightbox();
  }

  function openLightbox(index) {
    closeLightbox();
    activeIndex = Math.max(0, Math.min(index, items.length - 1));

    const overlay = el('div', 'pcg-light');
    const previous = el('button', 'pcg-light-nav', '←');
    const stage = el('div', 'pcg-light-stage');
    const image = el('img', 'pcg-light-image');
    const next = el('button', 'pcg-light-nav', '→');
    const close = el('button', 'pcg-light-close', COPY[language()].close);
    previous.type = next.type = close.type = 'button';
    image.draggable = false;

    previous.onclick = event => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = event => { event.stopPropagation(); stepLightbox(1); };
    close.onclick = event => { event.stopPropagation(); closeLightbox(); };
    stage.onclick = event => event.stopPropagation();
    overlay.onclick = closeLightbox;

    let startX = 0;
    let startY = 0;
    overlay.addEventListener('touchstart', event => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    overlay.addEventListener('touchend', event => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) stepLightbox(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) closeLightbox();
    }, { passive: true });

    stage.append(image);
    overlay.append(previous, stage, next, close);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function closeModal() {
    closeLightbox();
    observer?.disconnect();
    observer = null;
    modal?.remove();
    modal = null;
    items = [];
    unlockPage();
  }

  function createSection(group) {
    const section = el('section', 'pcg-section');
    const title = el('h2', 'pcg-section-title', group.title);
    section.append(title);
    if (group.description) section.append(el('p', 'pcg-copy', group.description));

    const grid = el('div', 'pcg-grid');
    group.items.forEach(item => {
      const index = items.findIndex(entry => entry.src === item.src);
      const card = el('button', 'pcg-card');
      const image = el('img');
      card.type = 'button';
      card.setAttribute('aria-label', COPY[language()].open);
      image.dataset.src = item.src;
      image.alt = item.alt || item.name || 'Poster';
      image.decoding = 'async';
      image.loading = 'lazy';
      image.fetchPriority = 'low';
      image.draggable = false;
      card.append(image);
      card.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        openLightbox(index);
      };
      grid.append(card);
    });
    section.append(grid);
    return section;
  }

  function openModal() {
    installStyles();
    closeModal();
    lockPage();

    const copy = COPY[language()];
    const sectionGroups = groups();
    items = sectionGroups.flatMap(group => group.items);

    const overlay = el('div', 'pcg-modal');
    const inner = el('div', 'pcg-inner');
    const head = el('div', 'pcg-head');
    const label = el('p', 'pcg-label', copy.title);
    const close = el('button', 'pcg-close', copy.close);
    const hero = el('section', 'pcg-hero');
    const title = el('h1', 'pcg-title', copy.title);
    const intro = el('p', 'pcg-intro', copy.intro);
    const top = el('button', 'pcg-top', '↑');

    close.type = top.type = 'button';
    close.onclick = event => { event.stopPropagation(); closeModal(); };
    top.setAttribute('aria-label', copy.top);
    top.onclick = event => {
      event.preventDefault();
      event.stopPropagation();
      overlay.scrollTo({ top: 0, behavior: 'smooth' });
    };

    overlay.addEventListener('scroll', () => {
      top.classList.toggle('is-visible', overlay.scrollTop > 520);
    }, { passive: true });

    head.append(label, close);
    hero.append(title, intro);
    inner.append(head, hero);
    sectionGroups.forEach(group => inner.append(createSection(group)));
    overlay.append(inner, top);
    document.body.append(overlay);
    modal = overlay;
    setupObserver();

    modal.querySelectorAll('.pcg-grid').forEach(grid => {
      [...grid.querySelectorAll('img[data-src]')].slice(0, 3).forEach(loadThumb);
    });
  }

  function findPostersCard(target) {
    const card = target?.closest?.('#works article, #works button');
    if (!card) return null;
    const title = normalize(card.querySelector('h3')?.textContent);
    return title === 'POSTERS' || title === 'ПОСТЕРЫ' ? card : null;
  }

  window.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!findPostersCard(target)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openModal();
  }, true);

  window.addEventListener('keydown', event => {
    if (lightbox) {
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeLightbox(); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); event.stopImmediatePropagation(); stepLightbox(-1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); event.stopImmediatePropagation(); stepLightbox(1); }
      return;
    }
    if (modal && event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeModal();
    }
  }, true);
})();
