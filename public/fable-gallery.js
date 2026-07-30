(() => {
  if (window.__fableGalleryV8) return;
  window.__fableGalleryV8 = true;

  const V = 'fable-8';
  const ROOT = '/works/fable';

  const makePrint = (name, extension = 'jpg') => ({
    src: `${ROOT}/${name}.${extension}?v=${V}`,
    alt: `FABLE ${name}`,
  });

  const VINTAGE_PRINTS = [
    makePrint('fprint-01'),
    makePrint('fprint-03'),
    makePrint('fprint-02'),
    makePrint('fprint-19'),
    makePrint('print-05', 'webp'),
    makePrint('fprint-35'),
    makePrint('fprint-14'),
    makePrint('fprint-04'),
    makePrint('fprint-29'),
  ];

  const MODERN_PRINTS = [
    'fprint-08',
    'fprint-09',
    'fprint-10',
    'fprint-13',
    'fprint-15',
    'fprint-20',
    'fprint-16',
    'fprint-17',
    'fprint-18',
    'fprint-22',
    'fprint-21',
    'fprint-23',
    'fprint-25',
    'fprint-24',
    'fprint-27',
    'fprint-28',
    'fprint-26',
    'fprint-31',
    'fprint-30',
    'fprint-33',
    'fprint-32',
    'fprint-38',
    'fprint-34',
    'fprint-40',
    'fprint-07',
    'fprint-39',
    'fprint-36',
    'fprint-06',
    'fprint-11',
    'fprint-12',
  ].map((name) => makePrint(name));

  const CLOTHES = [
    'clothes-01.webp',
    'clothes-02.webp',
    'clothes-03.webp',
    'clothes-04.webp',
    'clothes-05.webp',
    'clothes-07.webp',
  ].map((name) => ({
    src: `${ROOT}/clothes/${name}?v=${V}`,
    alt: `FABLE ${name.replace('.webp', '')}`,
  }));

  const SAINT_LOGO = {
    src: `${ROOT}/clothes/SAINT-LOGO-NEW.png?v=${V}`,
    alt: 'SAINT logo',
  };

  const SAINT = [
    'clothes-08-saint.webp',
    'clothes-09-saint.webp',
    'clothes-010-saint.webp',
    'clothes-011-saint.webp',
    'clothes-012-saint.webp',
    'clothes-013-saint.webp',
  ].map((name, index) => ({
    src: `${ROOT}/clothes/${name}?v=${V}`,
    alt: `SAINT clothes ${String(index + 1).padStart(2, '0')}`,
  }));

  const COPY = {
    ru: { close: 'ЗАКРЫТЬ', vintage: 'VINTAGE', modern: 'MODERN', clothes: 'CLOTHES', saint: 'SAINT' },
    en: { close: 'CLOSE', vintage: 'VINTAGE', modern: 'MODERN', clothes: 'CLOTHES', saint: 'SAINT' },
  };

  let modal = null;
  let lightbox = null;
  let activeItems = [];
  let activeIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const currentLanguage = () => {
    const lang = document.documentElement.lang;
    if (lang === 'ru' || lang === 'en') return lang;
    return localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  };
  const t = () => COPY[currentLanguage()];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  function lockPageScroll() {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPageScroll() {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
    activeItems = [];
  }

  function closeModal() {
    closeLightbox();
    modal?.remove();
    modal = null;
    unlockPageScroll();
  }

  function injectStyles() {
    document.getElementById('fable-style')?.remove();
    document.getElementById('fable-gradient-sections-style')?.remove();

    const style = el('style');
    style.id = 'fable-style';
    style.dataset.version = V;
    style.textContent = `
      html:has(.fable-modal), body:has(.fable-modal) {
        overflow: hidden !important;
        background: #fff !important;
      }
      .fable-modal {
        position: fixed; inset: 0; z-index: 335; width: 100vw; height: 100dvh;
        min-height: 100svh; overflow-y: auto; overflow-x: hidden;
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(5rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: #fff; color: #050505; overscroll-behavior: contain;
      }
      .fable-inner { width: min(100%,80rem); margin: 0 auto; }
      .fable-head { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .7rem 0 1rem; border-bottom: 1px solid rgba(5,5,5,.22); background: rgba(255,255,255,.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
      .fable-label,.fable-close,.fable-count { font-family: Arial,Helvetica,sans-serif; font-size: .68rem; font-weight: 900; letter-spacing: .28em; text-transform: uppercase; }
      .fable-label { margin: 0; background: #050505; color: #fff; padding: .45rem .75rem; }
      .fable-close { border: 0; background: #050505; color: #fff; padding: .65rem 1rem; cursor: pointer; }
      .fable-section { position: relative; border-top: 1px solid rgba(5,5,5,.22); padding: clamp(2rem,5vw,4rem) 0 clamp(4rem,8vw,7rem); }
      .fable-section:first-of-type { border-top: 0; }
      .fable-section.is-clothes,.fable-section.is-saint { isolation: isolate; }
      .fable-section.is-clothes::before,.fable-section.is-saint::before { content: ''; position: absolute; z-index: -1; inset: 0 auto 0 50%; width: 100vw; transform: translateX(-50%); pointer-events: none; }
      .fable-section.is-clothes::before { background: linear-gradient(180deg,#fff 0%,#f9f9f9 28%,#f6f6f6 82%,#f6f6f6 100%); }
      .fable-section.is-saint::before { background: #f6f6f6; }
      .fable-section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
      .fable-title { margin: 0; font-family: Arial,Helvetica,sans-serif; font-size: clamp(3.6rem,9vw,9rem); font-weight: 900; line-height: .78; letter-spacing: -.09em; text-transform: uppercase; }
      .fable-count { margin: 0; color: rgba(5,5,5,.48); white-space: nowrap; }
      .fable-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 1rem; align-items: start; }
      .fable-grid.is-saint { grid-template-columns: repeat(2,minmax(0,1fr)); }
      .fable-card,.fable-saint-logo { display: block; width: 100%; margin: 0; padding: 0; border: 0; outline: 0; background: transparent; box-shadow: none; cursor: zoom-in; overflow: hidden; }
      .fable-saint-logo { margin-bottom: 1rem; }
      .fable-card img,.fable-saint-logo img { display: block; width: 100%; height: auto; margin: 0; padding: 0; border: 0; background: transparent; object-fit: contain; }
      .fable-light { position: fixed; inset: 0; z-index: 970000; display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: clamp(.5rem,2vw,1.25rem); padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left)); background: rgba(0,0,0,.97); color: #fff; touch-action: none; }
      .fable-light-stage { min-width: 0; height: calc(100dvh - 2rem); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .fable-light-image { display: block; max-width: 100%; max-height: 92dvh; width: auto; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
      .fable-light-close,.fable-light-nav { border: 1px solid rgba(255,255,255,.72); background: #050505; color: #fff; cursor: pointer; font-family: Arial,Helvetica,sans-serif; font-weight: 900; }
      .fable-light-close { position: absolute; top: max(1rem,env(safe-area-inset-top)); right: max(1rem,env(safe-area-inset-right)); padding: .72rem .95rem; font-size: .68rem; letter-spacing: .2em; }
      .fable-light-nav { width: 3.3rem; height: 3.3rem; font-size: 1.5rem; }
      .fable-light-count { position: absolute; left: 50%; bottom: max(1rem,env(safe-area-inset-bottom)); transform: translateX(-50%); margin: 0; padding: .45rem .7rem; background: #fff; color: #050505; font: 900 .65rem/1 Arial,Helvetica,sans-serif; letter-spacing: .18em; }
      @media (max-width:900px) { .fable-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
      @media (max-width:560px),(hover:none),(pointer:coarse) {
        .fable-grid,.fable-grid.is-saint { grid-template-columns: 1fr; }
        .fable-section-head { display: block; }
        .fable-count { margin-top: .75rem; }
        .fable-light { grid-template-columns: 1fr; padding: max(.75rem,env(safe-area-inset-top)) max(.75rem,env(safe-area-inset-right)) max(.75rem,env(safe-area-inset-bottom)) max(.75rem,env(safe-area-inset-left)); }
        .fable-light-nav { display: none !important; }
        .fable-light-stage { height: calc(100dvh - 1.5rem); }
      }
    `;
    document.head.append(style);
  }

  function renderLightbox() {
    if (!lightbox || !activeItems.length) return;
    const item = activeItems[activeIndex];
    const image = lightbox.querySelector('.fable-light-image');
    image.src = item.src;
    image.alt = item.alt;
    lightbox.querySelector('.fable-light-count').textContent = `${activeIndex + 1} / ${activeItems.length}`;
  }

  function stepLightbox(amount) {
    activeIndex = (activeIndex + amount + activeItems.length) % activeItems.length;
    renderLightbox();
  }

  function openLightbox(items, index = 0) {
    if (!items.length) return;
    closeLightbox();
    activeItems = items;
    activeIndex = Math.max(0, Math.min(index, items.length - 1));

    const overlay = el('div','fable-light');
    const close = el('button','fable-light-close',t().close);
    const previous = el('button','fable-light-nav','←');
    const stage = el('div','fable-light-stage');
    const image = el('img','fable-light-image');
    const next = el('button','fable-light-nav','→');
    const count = el('p','fable-light-count');

    close.type = previous.type = next.type = 'button';
    image.draggable = false;
    close.onclick = (event) => { event.stopPropagation(); closeLightbox(); };
    previous.onclick = (event) => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = (event) => { event.stopPropagation(); stepLightbox(1); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = closeLightbox;

    let startX = 0;
    let startY = 0;
    overlay.addEventListener('touchstart',(event) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    },{ passive:true });
    overlay.addEventListener('touchend',(event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) stepLightbox(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) closeLightbox();
    },{ passive:true });

    stage.append(image);
    overlay.append(close,previous,stage,next,count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function createCard(item, items, index, eager = false, className = 'fable-card') {
    const button = el('button',className);
    button.type = 'button';
    button.setAttribute('aria-label',item.alt);
    const image = el('img');
    image.src = item.src;
    image.alt = item.alt;
    image.loading = eager ? 'eager' : 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    button.append(image);
    button.onclick = (event) => { event.stopPropagation(); openLightbox(items,index); };
    return button;
  }

  function createSection(title, items, options = {}) {
    const section = el('section',`fable-section${options.sectionClass ? ` ${options.sectionClass}` : ''}`);
    const head = el('div','fable-section-head');
    const heading = el('h2','fable-title',title);
    if (options.copyKey) heading.dataset.fableCopy = options.copyKey;
    head.append(heading,el('p','fable-count',`${items.length} / ${items.length}`));
    const grid = el('div',`fable-grid${options.saint ? ' is-saint' : ''}`);
    items.forEach((item,index) => grid.append(createCard(item,items,index,index < (options.eagerCount || 0))));
    section.append(head,grid);
    return section;
  }

  function createSaintSection() {
    const section = el('section','fable-section is-saint');
    const head = el('div','fable-section-head');
    const heading = el('h2','fable-title',t().saint);
    heading.dataset.fableCopy = 'saint';
    head.append(heading,el('p','fable-count',`${SAINT.length} / ${SAINT.length}`));
    section.append(head,createCard(SAINT_LOGO,[SAINT_LOGO],0,true,'fable-saint-logo'));
    const grid = el('div','fable-grid is-saint');
    SAINT.forEach((item,index) => grid.append(createCard(item,SAINT,index,index < 2)));
    section.append(grid);
    return section;
  }

  function updateLanguage() {
    if (!modal) return;
    const copy = t();
    const close = modal.querySelector('.fable-close');
    if (close) close.textContent = copy.close;
    modal.querySelectorAll('[data-fable-copy]').forEach((node) => {
      const key = node.dataset.fableCopy;
      if (copy[key]) node.textContent = copy[key];
    });
    const lightClose = document.querySelector('.fable-light-close');
    if (lightClose) lightClose.textContent = copy.close;
  }

  function open() {
    injectStyles();
    closeModal();
    lockPageScroll();

    const inner = el('div','fable-inner');
    const header = el('div','fable-head');
    const close = el('button','fable-close',t().close);
    close.type = 'button';
    close.onclick = (event) => { event.stopPropagation(); closeModal(); };
    header.append(el('p','fable-label','FABLE'),close);

    modal = el('div','fable-modal');
    modal.append(inner);
    inner.append(
      header,
      createSection(t().vintage,VINTAGE_PRINTS,{ copyKey:'vintage',eagerCount:6,sectionClass:'is-vintage' }),
      createSection(t().modern,MODERN_PRINTS,{ copyKey:'modern',eagerCount:6,sectionClass:'is-modern' }),
      createSection(t().clothes,CLOTHES,{ copyKey:'clothes',eagerCount:3,sectionClass:'is-clothes' }),
      createSaintSection(),
    );
    document.body.append(modal);
  }

  new MutationObserver(updateLanguage).observe(document.documentElement,{ attributes:true,attributeFilter:['lang'] });

  document.addEventListener('keydown',(event) => {
    if (lightbox) {
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeLightbox(); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); event.stopImmediatePropagation(); stepLightbox(-1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); event.stopImmediatePropagation(); stepLightbox(1); }
      return;
    }
    if (event.key === 'Escape' && modal) { event.preventDefault(); event.stopImmediatePropagation(); closeModal(); }
  },true);

  document.addEventListener('click',(event) => {
    const card = event.target.closest('#works article,#works button');
    if (!card) return;
    const rawTitle = card.querySelector('h3')?.textContent?.trim().toUpperCase() || '';
    const title = rawTitle.replace(/[^A-ZА-Я0-9]/g,'');
    if (title !== 'FABLE') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  },true);

  injectStyles();
})();