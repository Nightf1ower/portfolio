(() => {
  if (window.__projectListExpansionV2) return;
  window.__projectListExpansionV2 = true;

  const VERSION = 'project-list-expansion-2';
  const FALLBACK_ASSETS = [
    '/works/anka-peresild/acs/LOGO-ANKA-2.jpg',
    '/works/anka-peresild/acs/LOGO-ANKA.jpg',
    '/works/anka-peresild/acs/button-concept-1.jpg',
    '/works/anka-peresild/acs/button-concept-2.jpg',
    '/works/anka-peresild/acs/button-concept-art-1.jpg',
    '/works/anka-peresild/acs/button-concept-art-2.jpg',
    '/works/anka-peresild/acs/button-concept-final-1.jpg',
    '/works/anka-peresild/acs/button-concept-final-2.jpg',
    '/works/anka-peresild/acs/button-concept-wings.jpg',
    '/works/anka-peresild/acs/button-new-1.jpg',
    '/works/anka-peresild/acs/button-new-2.jpg',
    '/works/anka-peresild/acs/button-new-3.jpg',
    '/works/anka-peresild/acs/button-new-4.jpg',
    '/works/anka-peresild/acs/misc-1.png',
    '/works/anka-peresild/acs/misc-2.png',
    '/works/anka-peresild/acs/misc-3.png',
    '/works/anka-peresild/acs/needles-1.png',
    '/works/anka-peresild/acs/needles-2.png',
    '/works/anka-peresild/acs/needles-3.png',
    '/works/anka-peresild/babes/draw-baba-1.jpg',
    '/works/anka-peresild/babes/draw-baba-2.jpg',
    '/works/anka-peresild/babes/draw-baba-3.jpg',
    '/works/anka-peresild/babes/draw-baba-4.jpg',
    '/works/anka-peresild/babes/draw-baba-5.jpg',
    '/works/anka-peresild/babes/real-baba-1.webp',
    '/works/anka-peresild/babes/real-baba-2.webp',
    '/works/anka-peresild/babes/real-baba-3.webp',
    '/works/anka-peresild/babes/real-baba-4.webp',
    '/works/anka-peresild/babes/real-baba-5.webp',
    '/works/anka-peresild/clothes/costume-blackl-art.jpg',
    '/works/anka-peresild/clothes/costume-blackl-final.jpg',
    '/works/anka-peresild/clothes/costume-blackl-mockup.jpg',
    '/works/anka-peresild/clothes/costume-white-art.jpg',
    '/works/anka-peresild/clothes/costume-white-final.jpg',
    '/works/anka-peresild/clothes/costume-white-mockup.jpg',
    '/works/anka-peresild/clothes/olymp-jacket-art.jpg',
    '/works/anka-peresild/clothes/olymp-jacket-final.webp',
    '/works/anka-peresild/clothes/olymp-jacket-mockup-back.webp',
    '/works/anka-peresild/clothes/olymp-jacket-mockup-flat.jpg',
    '/works/anka-peresild/clothes/olymp-jacket-mockup.jpg',
    '/works/anka-peresild/clothes/olymp-pants-art.jpg',
    '/works/anka-peresild/clothes/olymp-pants-final-side.webp',
    '/works/anka-peresild/clothes/olymp-pants-final.webp',
    '/works/anka-peresild/clothes/olymp-pants-mockup.jpg',
    '/works/anka-peresild/clothes/shirt-blue-art.jpg',
    '/works/anka-peresild/clothes/shirt-blue-final.jpg',
    '/works/anka-peresild/clothes/shirt-blue-mockup.jpg',
    '/works/anka-peresild/clothes/shirt-white-art.jpg',
    '/works/anka-peresild/clothes/shirt-white-final.jpg',
    '/works/anka-peresild/clothes/shirt-white-mockup.jpg',
  ];

  const COPY = {
    ru: { close: 'ЗАКРЫТЬ', images: 'ИЗОБРАЖЕНИЙ' },
    en: { close: 'CLOSE', images: 'IMAGES' },
  };

  let modal = null;
  let lightbox = null;
  let activeIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';
  let touchStartX = 0;

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => COPY[language()];
  const normalized = (value) => String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  const naturalCompare = (a, b) => String(a).localeCompare(String(b), 'en', { numeric: true, sensitivity: 'base' });

  function assets() {
    const generated = window.PORTFOLIO_GALLERY_MANIFEST?.ankaPeresild || [];
    const sources = generated.length
      ? generated.map((item) => item.src)
      : FALLBACK_ASSETS;
    return [...new Set(sources)].sort(naturalCompare);
  }

  function injectStyles() {
    const old = document.getElementById('project-list-expansion-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = 'project-list-expansion-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .anka-peresild-modal {
        position: fixed;
        inset: 0;
        z-index: 760000;
        box-sizing: border-box;
        width: 100vw;
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(5rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: #f1f0ec;
        color: #050505;
        overscroll-behavior: contain;
      }
      .anka-peresild-inner { width: min(100%, 96rem); margin: 0 auto; }
      .anka-peresild-head {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .75rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.28);
        background: rgba(241,240,236,.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .anka-peresild-label,
      .anka-peresild-close,
      .anka-peresild-count {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: .68rem;
        font-weight: 900;
        line-height: 1;
        letter-spacing: .24em;
        text-transform: uppercase;
      }
      .anka-peresild-label,
      .anka-peresild-close {
        border: 0;
        padding: .68rem 1rem;
        background: #050505;
        color: #fff;
      }
      .anka-peresild-close { cursor: pointer; }
      .anka-peresild-hero { padding: clamp(4rem, 9vw, 8rem) 0 clamp(3rem, 7vw, 6rem); }
      .anka-peresild-title {
        margin: 0;
        font-family: Arial Black, Arial, Helvetica, sans-serif;
        font-size: clamp(4rem, 12vw, 12rem);
        font-weight: 900;
        line-height: .78;
        letter-spacing: -.08em;
        text-transform: uppercase;
      }
      .anka-peresild-count { margin-top: 2rem; color: rgba(5,5,5,.55); }
      .anka-peresild-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: start;
        gap: clamp(.75rem, 1.5vw, 1.25rem);
        padding-top: clamp(2rem, 4vw, 3.5rem);
        border-top: 1px solid rgba(5,5,5,.28);
      }
      .anka-peresild-gallery-card {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 1px solid rgba(5,5,5,.18);
        background: #fff;
        cursor: zoom-in;
        overflow: hidden;
      }
      .anka-peresild-gallery-card img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        object-fit: contain;
      }
      .anka-peresild-lightbox {
        position: fixed;
        inset: 0;
        z-index: 990000;
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: clamp(.5rem, 2vw, 1.25rem);
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
        background: rgba(0,0,0,.97);
        color: #fff;
      }
      .anka-peresild-lightbox-stage {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        height: calc(100dvh - 2rem);
        overflow: hidden;
      }
      .anka-peresild-lightbox-image {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 92dvh;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
      }
      .anka-peresild-lightbox-nav,
      .anka-peresild-lightbox-close {
        border: 1px solid rgba(255,255,255,.8);
        background: #050505;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 900;
        cursor: pointer;
      }
      .anka-peresild-lightbox-nav { width: 3.35rem; height: 3.35rem; font-size: 1.5rem; }
      .anka-peresild-lightbox-close {
        position: absolute;
        top: max(1rem, env(safe-area-inset-top));
        right: max(1rem, env(safe-area-inset-right));
        padding: .72rem .95rem;
        font-size: .68rem;
        letter-spacing: .2em;
      }
      .anka-peresild-lightbox-counter {
        position: absolute;
        left: 50%;
        bottom: max(1rem, env(safe-area-inset-bottom));
        transform: translateX(-50%);
        margin: 0;
        padding: .45rem .7rem;
        background: #fff;
        color: #050505;
        font: 900 .65rem/1 Arial, Helvetica, sans-serif;
        letter-spacing: .18em;
      }
      @media (max-width: 900px) {
        .anka-peresild-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
      }
      @media (max-width: 620px), (hover:none), (pointer:coarse) {
        .anka-peresild-title { font-size: clamp(3.25rem, 16vw, 6rem); }
        .anka-peresild-grid { grid-template-columns: 1fr; }
        .anka-peresild-lightbox { grid-template-columns: 1fr; padding: .75rem; }
        .anka-peresild-lightbox-nav { display: none; }
        .anka-peresild-lightbox-stage { height: calc(100dvh - 1.5rem); }
      }
    `;
    document.head.append(style);
  }

  function cards() {
    return [...document.querySelectorAll('#works article, #works button')];
  }

  function findCard(...titles) {
    const accepted = new Set(titles.map(normalized));
    return cards().find((card) => accepted.has(normalized(card.querySelector('h3')?.textContent)));
  }

  function ensureAnkaCard() {
    let card = findCard('ANKA PERESILD');
    if (!card) {
      const grid = document.querySelector('#works .mt-10.grid');
      const source = findCard('STAY UGLY', 'STAYUGLY') || cards().at(-1);
      if (!grid || !source) return false;
      card = document.createElement('button');
      card.type = 'button';
      card.className = `${source.className} cursor-pointer`.replace(/\s+/g, ' ').trim();
      card.innerHTML = source.innerHTML;
      grid.append(card);
    }

    card.dataset.ankaPeresildCard = 'true';
    card.setAttribute('aria-label', 'Open ANKA PERESILD project');
    const heading = card.querySelector('h3');
    if (heading && heading.textContent !== 'ANKA PERESILD') heading.textContent = 'ANKA PERESILD';
    return true;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
  }

  function closeAnka() {
    closeLightbox();
    modal?.remove();
    modal = null;
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;
  }

  function renderLightbox() {
    if (!lightbox) return;
    const list = assets();
    if (!list.length) return;
    activeIndex = (activeIndex + list.length) % list.length;
    const image = lightbox.querySelector('.anka-peresild-lightbox-image');
    const counter = lightbox.querySelector('.anka-peresild-lightbox-counter');
    image.src = list[activeIndex];
    image.alt = `ANKA PERESILD ${activeIndex + 1}`;
    counter.textContent = `${activeIndex + 1} / ${list.length}`;
  }

  function stepLightbox(amount) {
    activeIndex += amount;
    renderLightbox();
  }

  function openLightbox(index) {
    closeLightbox();
    activeIndex = index;

    const overlay = document.createElement('div');
    overlay.className = 'anka-peresild-lightbox';
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'anka-peresild-lightbox-nav';
    previous.textContent = '←';
    const stage = document.createElement('div');
    stage.className = 'anka-peresild-lightbox-stage';
    const image = document.createElement('img');
    image.className = 'anka-peresild-lightbox-image';
    image.draggable = false;
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'anka-peresild-lightbox-nav';
    next.textContent = '→';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'anka-peresild-lightbox-close';
    close.textContent = copy().close;
    const counter = document.createElement('p');
    counter.className = 'anka-peresild-lightbox-counter';

    previous.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    close.onclick = (event) => { event.stopPropagation(); closeLightbox(); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = closeLightbox;
    overlay.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0]?.clientX || 0;
    }, { passive: true });
    overlay.addEventListener('touchend', (event) => {
      const endX = event.changedTouches[0]?.clientX || touchStartX;
      const delta = endX - touchStartX;
      if (Math.abs(delta) > 48) stepLightbox(delta < 0 ? 1 : -1);
    }, { passive: true });

    stage.append(image);
    overlay.append(previous, stage, next, close, counter);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function openAnka() {
    closeAnka();
    injectStyles();
    const list = assets();
    const current = copy();
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const root = document.createElement('div');
    root.className = 'anka-peresild-modal';
    const inner = document.createElement('div');
    inner.className = 'anka-peresild-inner';
    const head = document.createElement('div');
    head.className = 'anka-peresild-head';
    const label = document.createElement('p');
    label.className = 'anka-peresild-label';
    label.textContent = 'ANKA PERESILD';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'anka-peresild-close';
    close.textContent = current.close;
    close.onclick = closeAnka;
    head.append(label, close);

    const hero = document.createElement('section');
    hero.className = 'anka-peresild-hero';
    const title = document.createElement('h1');
    title.className = 'anka-peresild-title';
    title.textContent = 'ANKA PERESILD';
    const count = document.createElement('p');
    count.className = 'anka-peresild-count';
    count.textContent = `${list.length} ${current.images}`;
    hero.append(title, count);

    const grid = document.createElement('div');
    grid.className = 'anka-peresild-grid';
    list.forEach((src, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'anka-peresild-gallery-card';
      const image = document.createElement('img');
      image.src = src;
      image.alt = `ANKA PERESILD ${index + 1}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      card.append(image);
      card.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        openLightbox(index);
      };
      grid.append(card);
    });

    inner.append(head, hero, grid);
    root.append(inner);
    document.body.append(root);
    modal = root;
  }

  function apply() {
    ensureAnkaCard();
  }

  injectStyles();
  [0, 120, 450, 1000].forEach((delay) => window.setTimeout(apply, delay));

  document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-anka-peresild-card]');
    if (!card) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openAnka();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (lightbox) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepLightbox(1);
      }
      return;
    }
    if (event.key === 'Escape' && modal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeAnka();
    }
  }, true);

  new MutationObserver(apply).observe(document.body, { childList: true, subtree: true });
})();
