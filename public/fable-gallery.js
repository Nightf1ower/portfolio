(() => {
  if (window.__fableGalleryV9) return;
  window.__fableGalleryV9 = true;

  const V = 'fable-9';
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
    ru: {
      close: 'ЗАКРЫТЬ',
      aboutLabel: 'О БРЕНДЕ',
      about: 'F | ABLE — бренд одежды, объединяющий современный стритвир, винтажную спортивную эстетику и выразительную графику. Визуальный язык бренда строится на переосмыслении знакомых образов, работе с культурными референсами и сочетании ностальгии с актуальными тенденциями.',
      vintageTitle: 'VINTAGE SPORTS GRAPHICS',
      vintageDescription: 'Серия принтов, вдохновлённая винтажными футболками из американских секонд-хендов 1990-х годов. Графика отсылает к университетскому мерчу, спортивным командам, старой рекламной продукции и характерной эстетике американской спортивной одежды того периода.',
      modernTitle: 'CONTEMPORARY GRAPHICS',
      modernDescription: 'Графика, созданная на основе современных визуальных референсов и актуальных тенденций. В работах используются узнаваемые культурные образы, экспериментальная типографика и элементы постиронии, позволяющие по-новому интерпретировать привычные символы и сюжеты.',
      clothesTitle: 'GRAPHICS IN PRODUCTION',
      clothesDescription: 'Примеры готовых предметов одежды, созданных с использованием разработанных мной принтов и графических решений. Раздел показывает, как первоначальные визуальные концепции были перенесены на реальные изделия и стали частью коллекций бренда.',
      saintTitle: 'SAINT IDENTITY',
      saintDescription: 'Для коллекции F | ABLE FW25–26 мной был разработан отдельный логотип SAINT. Он стал одним из основных визуальных элементов коллекции и использовался на большом количестве предметов одежды и аксессуаров в качестве центрального знака.',
    },
    en: {
      close: 'CLOSE',
      aboutLabel: 'ABOUT THE BRAND',
      about: 'F | ABLE is a clothing brand combining contemporary streetwear, vintage sports aesthetics, and expressive graphics. Its visual language is built around reinterpreting familiar imagery, working with cultural references, and blending nostalgia with current trends.',
      vintageTitle: 'VINTAGE SPORTS GRAPHICS',
      vintageDescription: 'A series of prints inspired by vintage T-shirts found in American thrift stores in the 1990s. The graphics reference collegiate merchandise, sports teams, archival advertising, and the distinctive visual language of American sportswear from that era.',
      modernTitle: 'CONTEMPORARY GRAPHICS',
      modernDescription: 'Graphics based on contemporary visual references and current trends. The works combine recognizable cultural imagery, experimental typography, and elements of post-irony to reinterpret familiar symbols and narratives.',
      clothesTitle: 'GRAPHICS IN PRODUCTION',
      clothesDescription: 'Examples of finished garments featuring prints and graphic solutions developed by me. This section shows how the original visual concepts were translated into physical products and became part of the brand’s collections.',
      saintTitle: 'SAINT IDENTITY',
      saintDescription: 'For the F | ABLE FW25–26 collection, I developed a standalone SAINT logo. It became one of the collection’s primary visual elements and appeared across a wide range of garments and accessories as its central mark.',
    },
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
      .fable-head {
        position: sticky; top: 0; z-index: 10; display: flex; align-items: center;
        justify-content: space-between; gap: 1rem; padding: .7rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.22); background: rgba(255,255,255,.88);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      }
      .fable-label,.fable-close,.fable-count,.fable-intro-label {
        font-family: Arial,Helvetica,sans-serif; font-size: .68rem; font-weight: 900;
        letter-spacing: .28em; text-transform: uppercase;
      }
      .fable-label { margin: 0; background: #050505; color: #fff; padding: .45rem .75rem; }
      .fable-close { border: 0; background: #050505; color: #fff; padding: .65rem 1rem; cursor: pointer; }
      .fable-intro { padding: clamp(3rem,7vw,7rem) 0 clamp(4rem,8vw,7rem); }
      .fable-brand-title {
        margin: 0; font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(5rem,14vw,13rem); font-weight: 900; line-height: .75;
        letter-spacing: -.09em; text-transform: uppercase;
      }
      .fable-intro-label { margin: clamp(2rem,4vw,3.5rem) 0 .8rem; color: rgba(5,5,5,.55); }
      .fable-description {
        max-width: 62rem; margin: 0; font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(1rem,1.55vw,1.35rem); line-height: 1.5; letter-spacing: -.015em;
      }
      .fable-section {
        position: relative; border-top: 1px solid rgba(5,5,5,.22);
        padding: clamp(2.5rem,5vw,5rem) 0 clamp(4rem,8vw,7rem);
      }
      .fable-section.is-clothes,.fable-section.is-saint { isolation: isolate; }
      .fable-section.is-clothes::before,.fable-section.is-saint::before {
        content: ''; position: absolute; z-index: -1; inset: 0 auto 0 50%;
        width: 100vw; transform: translateX(-50%); pointer-events: none;
      }
      .fable-section.is-clothes::before {
        background: linear-gradient(180deg,#fff 0%,#f9f9f9 28%,#f6f6f6 82%,#f6f6f6 100%);
      }
      .fable-section.is-saint::before { background: #f6f6f6; }
      .fable-section-head {
        display: flex; align-items: flex-end; justify-content: space-between;
        gap: 1rem; margin-bottom: 1rem;
      }
      .fable-title {
        max-width: 65rem; margin: 0; font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(3rem,7vw,7.5rem); font-weight: 900; line-height: .82;
        letter-spacing: -.075em; text-transform: uppercase; overflow-wrap: anywhere;
      }
      .fable-count { margin: 0; color: rgba(5,5,5,.48); white-space: nowrap; }
      .fable-section-description {
        max-width: 62rem; margin: 0 0 clamp(2rem,4vw,3.5rem);
        font-family: Arial,Helvetica,sans-serif;
        font-size: clamp(1rem,1.45vw,1.25rem); line-height: 1.5; letter-spacing: -.012em;
      }
      .fable-grid {
        display: grid; grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 1rem; align-items: start;
      }
      .fable-grid.is-saint { grid-template-columns: repeat(2,minmax(0,1fr)); }
      .fable-card,.fable-saint-logo {
        display: block; width: 100%; margin: 0; padding: 0; border: 0; outline: 0;
        background: transparent; box-shadow: none; cursor: zoom-in; overflow: hidden;
      }
      .fable-saint-logo { margin-bottom: 1rem; }
      .fable-card img,.fable-saint-logo img {
        display: block; width: 100%; height: auto; margin: 0; padding: 0;
        border: 0; background: transparent; object-fit: contain;
      }
      .fable-light {
        position: fixed; inset: 0; z-index: 970000; display: grid;
        grid-template-columns: auto minmax(0,1fr) auto; align-items: center;
        gap: clamp(.5rem,2vw,1.25rem);
        padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background: rgba(0,0,0,.97); color: #fff; touch-action: none;
      }
      .fable-light-stage {
        min-width: 0; height: calc(100dvh - 2rem); display: flex;
        align-items: center; justify-content: center; overflow: hidden;
      }
      .fable-light-image {
        display: block; max-width: 100%; max-height: 92dvh; width: auto; height: auto;
        object-fit: contain; user-select: none; -webkit-user-drag: none;
      }
      .fable-light-close,.fable-light-nav {
        border: 1px solid rgba(255,255,255,.72); background: #050505; color: #fff;
        cursor: pointer; font-family: Arial,Helvetica,sans-serif; font-weight: 900;
      }
      .fable-light-close {
        position: absolute; top: max(1rem,env(safe-area-inset-top));
        right: max(1rem,env(safe-area-inset-right)); padding: .72rem .95rem;
        font-size: .68rem; letter-spacing: .2em;
      }
      .fable-light-nav { width: 3.3rem; height: 3.3rem; font-size: 1.5rem; }
      .fable-light-count {
        position: absolute; left: 50%; bottom: max(1rem,env(safe-area-inset-bottom));
        transform: translateX(-50%); margin: 0; padding: .45rem .7rem;
        background: #fff; color: #050505;
        font: 900 .65rem/1 Arial,Helvetica,sans-serif; letter-spacing: .18em;
      }
      @media (max-width:900px) {
        .fable-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
      }
      @media (max-width:560px),(hover:none),(pointer:coarse) {
        .fable-grid,.fable-grid.is-saint { grid-template-columns: 1fr; }
        .fable-section-head { display: block; }
        .fable-count { margin-top: .75rem; }
        .fable-brand-title { font-size: clamp(4.2rem,20vw,7rem); }
        .fable-title { font-size: clamp(2.6rem,13vw,4.8rem); }
        .fable-light {
          grid-template-columns: 1fr;
          padding: max(.75rem,env(safe-area-inset-top)) max(.75rem,env(safe-area-inset-right)) max(.75rem,env(safe-area-inset-bottom)) max(.75rem,env(safe-area-inset-left));
        }
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

  function createIntro() {
    const intro = el('section','fable-intro');
    const title = el('h1','fable-brand-title','F | ABLE');
    const label = el('p','fable-intro-label',t().aboutLabel);
    label.dataset.fableCopy = 'aboutLabel';
    const description = el('p','fable-description',t().about);
    description.dataset.fableCopy = 'about';
    intro.append(title,label,description);
    return intro;
  }

  function createSection(titleKey, descriptionKey, items, options = {}) {
    const section = el('section',`fable-section${options.sectionClass ? ` ${options.sectionClass}` : ''}`);
    const head = el('div','fable-section-head');
    const heading = el('h2','fable-title',t()[titleKey]);
    heading.dataset.fableCopy = titleKey;
    const count = el('p','fable-count',`${items.length} / ${items.length}`);
    head.append(heading,count);

    const description = el('p','fable-section-description',t()[descriptionKey]);
    description.dataset.fableCopy = descriptionKey;

    const grid = el('div',`fable-grid${options.saint ? ' is-saint' : ''}`);
    items.forEach((item,index) => grid.append(createCard(item,items,index,index < (options.eagerCount || 0))));
    section.append(head,description,grid);
    return section;
  }

  function createSaintSection() {
    const section = el('section','fable-section is-saint');
    const head = el('div','fable-section-head');
    const heading = el('h2','fable-title',t().saintTitle);
    heading.dataset.fableCopy = 'saintTitle';
    head.append(heading,el('p','fable-count',`${SAINT.length} / ${SAINT.length}`));

    const description = el('p','fable-section-description',t().saintDescription);
    description.dataset.fableCopy = 'saintDescription';

    section.append(head,description,createCard(SAINT_LOGO,[SAINT_LOGO],0,true,'fable-saint-logo'));
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
      createIntro(),
      createSection('vintageTitle','vintageDescription',VINTAGE_PRINTS,{ eagerCount:6,sectionClass:'is-vintage' }),
      createSection('modernTitle','modernDescription',MODERN_PRINTS,{ eagerCount:6,sectionClass:'is-modern' }),
      createSection('clothesTitle','clothesDescription',CLOTHES,{ eagerCount:3,sectionClass:'is-clothes' }),
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