(() => {
  if (window.__znyGalleryV9) return;
  window.__znyGalleryV9 = true;

  const V = 'zny-9';
  const ROOT = '/works/zny';
  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      aboutLabel: 'О БРЕНДЕ',
      about: 'ZNY — московский бренд уличной одежды, объединяющий современный стритвир, экспериментальную графику и элементы DIY-культуры. Визуальный язык бренда строится на смелой типографике, ручных техниках, переосмыслении винтажных образов и свободной работе с различными культурными кодами.',
      printsTitle: 'ХЭНДМЕЙД-ПРИНТЫ — FW 24/25',
      printsText: 'Серия хэндмейд-принтов, разработанная для коллекции ZNY FW 24/25. Вся графика создавалась вручную с использованием доступных материалов и экспериментальных техник: аэрозольной краски, самодельных трафаретов и различных подручных средств. Такой подход позволил сохранить живую фактуру, намеренную небрежность и характерную DIY-эстетику.',
      campaignTitle: 'ВИЗУАЛЬНЫЙ СТИЛЬ И КАМПЕЙН — SS 25',
      campaignText: 'Разработка визуального стиля и кампейна для коллекции ZNY SS 25. Основными источниками вдохновения стали эстетика винтажной Мексики и визуальный мир фильма База Лурмана «Ромео + Джульетта» с Леонардо Ди Каприо. В проекте были объединены насыщенные винтажные оттенки, выразительная типографика и кинематографичные графические образы.',
      stickersTitle: 'СЕРИЯ СТИКЕРОВ — SS 25',
      stickersText: 'Серия стикеров, продолжающая визуальный кампейн и общую эстетику коллекции ZNY SS 25. Стикеры дополняют основную айдентику коллекции и переносят её ключевые образы в самостоятельный формат.',
    },
    en: {
      close: 'CLOSE',
      aboutLabel: 'ABOUT THE BRAND',
      about: 'ZNY is a Moscow-based streetwear brand combining contemporary street fashion, experimental graphics, and elements of DIY culture. Its visual language is built around bold typography, handmade techniques, reinterpreted vintage imagery, and a free-form approach to various cultural references.',
      printsTitle: 'HANDMADE PRINTS — FW 24/25',
      printsText: 'A series of handmade prints developed for the ZNY FW 24/25 collection. All graphics were created manually using accessible materials and experimental techniques, including spray paint, handmade stencils, and various improvised tools. This approach helped preserve raw textures, intentional imperfections, and a distinctive DIY aesthetic.',
      campaignTitle: 'VISUAL IDENTITY & CAMPAIGN — SS 25',
      campaignText: 'Visual identity and campaign development for the ZNY SS 25 collection. The project was inspired by vintage Mexican aesthetics and the visual world of Baz Luhrmann’s Romeo + Juliet, starring Leonardo DiCaprio. The campaign combines rich vintage tones, expressive typography, and cinematic graphic imagery.',
      stickersTitle: 'STICKER SERIES — SS 25',
      stickersText: 'A sticker series extending the visual campaign and overall aesthetic of the ZNY SS 25 collection. The stickers complement the collection’s main identity and translate its key imagery into a standalone format.',
    },
  };

  const PRINT_FILES = [
    'znyprint-01-tee.jpg','znyprint-01.jpg',
    'znyprint-02-tee.jpg','znyprint-02-variant-tee.jpg','znyprint-02-variant.jpg','znyprint-02.jpg',
    'znyprint-03.jpg',
    'znyprint-04-tee.jpg','znyprint-04-variant.jpg','znyprint-04.jpg',
    'znyprint-05-tee.jpg','znyprint-05-variant-02.jpg','znyprint-05-variant.jpg','znyprint-05.jpg',
    'znyprint-06-tee.jpg','znyprint-06.jpg',
    'znyprint-07-tee.jpg','znyprint-07-variant.jpg','znyprint-07.jpg',
    'znyprint-08-tee.jpg','znyprint-08.jpg',
    'znyprint-09-variant.jpg','znyprint-09.jpg',
  ];
  const POSTER_FILES = Array.from({ length: 5 }, (_, i) => `afisha-${String(i + 1).padStart(2, '0')}.jpg`);
  const STICKER_FILES = Array.from({ length: 5 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return [`znysticker-${n}.jpg`, `znysticker-${n}-irl.jpg`];
  }).flat();

  const lang = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const src = (folder, name) => `${ROOT}/${folder}/${name}?v=${V}`;
  const el = (tag, cls, text = '') => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  };

  let modal = null;
  let lightbox = null;
  let lightItems = [];
  let lightIndex = 0;
  let touchX = 0;
  let touchY = 0;
  let oldBodyOverflow = '';
  let oldHtmlOverflow = '';

  function injectStyles() {
    document.getElementById('zny-style-v8')?.remove();
    document.getElementById('zny-style-v9')?.remove();
    const style = el('style');
    style.id = 'zny-style-v9';
    style.textContent = `
      html:has(.zny-modal),body:has(.zny-modal){overflow:hidden!important}
      .zny-modal{position:fixed;inset:0;z-index:330;overflow:auto;background:#fff;color:#050505;padding:1.25rem 1rem 5rem}
      .zny-inner{width:min(100%,80rem);margin:auto}
      .zny-head{position:sticky;top:0;z-index:20;display:flex;justify-content:flex-end;padding:.75rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.22);background:rgba(255,255,255,.94);backdrop-filter:blur(10px)}
      .zny-close{border:1px solid #050505;background:#050505;color:#fff;padding:.6rem 1rem;font:900 .68rem/1 Arial,sans-serif;letter-spacing:.25em}
      .zny-brand{padding:clamp(3rem,7vw,6rem) 0 clamp(5rem,9vw,8rem)}
      .zny-brand-title{margin:0;font:900 clamp(5.5rem,17vw,14rem)/.7 Arial,sans-serif;letter-spacing:-.1em}
      .zny-brand-label{margin:clamp(2.3rem,5vw,4rem) 0 .85rem;font:900 .72rem/1 Arial,sans-serif;letter-spacing:.27em}
      .zny-copy{width:min(100%,58rem);margin:0;color:rgba(5,5,5,.78);font:600 clamp(1rem,1.45vw,1.25rem)/1.48 Arial,sans-serif;letter-spacing:-.018em}
      .zny-section{border-top:1px solid rgba(5,5,5,.22);padding-top:1.35rem}
      .zny-section+.zny-section{margin-top:clamp(5rem,10vw,9rem)}
      .zny-title{margin:0;font:900 clamp(2.8rem,5.2vw,5.9rem)/.86 Arial,sans-serif;letter-spacing:-.075em;text-transform:uppercase;text-wrap:balance}
      .zny-section-copy{margin:1.3rem 0 2.2rem}
      .zny-print-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
      .zny-card{border:0;background:transparent;padding:0;cursor:zoom-in}
      .zny-media{position:relative;aspect-ratio:1/1;overflow:hidden;background:#fff}
      .zny-card img{display:block;width:100%;height:100%;object-fit:contain;background:#fff}
      .zny-layer{position:absolute;inset:0;opacity:0;transition:opacity .35s ease}
      .zny-card:hover .zny-layer.is-active{opacity:1}
      .zny-card:hover .zny-main.has-hover{opacity:0}
      .zny-poster-grid{display:grid;grid-template-columns:1fr;gap:2.5rem}
      .zny-poster-grid .zny-media{aspect-ratio:auto;overflow:visible}
      .zny-poster-grid img{height:auto;position:static}
      .zny-sticker-grid{display:grid;gap:1rem}
      .zny-sticker-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
      .zny-light{position:fixed;inset:0;z-index:1000500;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:1rem;padding:1rem;background:rgba(0,0,0,.96);color:#fff;touch-action:none}
      .zny-light-stage{height:calc(100dvh - 2rem);display:flex;align-items:center;justify-content:center;overflow:hidden}
      .zny-light-image{display:block;max-width:100%;max-height:92dvh;width:auto;height:auto;object-fit:contain}
      .zny-light-nav,.zny-light-close{border:1px solid rgba(255,255,255,.8);background:#050505;color:#fff;font:900 1.45rem/1 Arial,sans-serif;cursor:pointer}
      .zny-light-nav{width:3.25rem;height:3.25rem}
      .zny-light-close{position:absolute;top:1rem;right:1rem;padding:.75rem 1rem;font-size:.68rem;letter-spacing:.2em}
      .zny-light-count{position:absolute;left:50%;bottom:1rem;transform:translateX(-50%);margin:0;padding:.45rem .65rem;background:#fff;color:#050505;font:900 .65rem/1 Arial,sans-serif;letter-spacing:.18em}
      @media(max-width:900px){.zny-print-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:650px){.zny-brand-title{font-size:clamp(5rem,30vw,8rem)}.zny-title{font-size:clamp(2.35rem,11vw,4rem)}.zny-print-grid,.zny-sticker-row{grid-template-columns:1fr}.zny-light{grid-template-columns:1fr}.zny-light-nav{display:none}}
    `;
    document.head.append(style);
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
    lightItems = [];
  }

  function renderLightbox() {
    if (!lightbox || !lightItems.length) return;
    lightbox.querySelector('.zny-light-image').src = lightItems[lightIndex];
    lightbox.querySelector('.zny-light-count').textContent = `${lightIndex + 1} / ${lightItems.length}`;
  }

  function step(amount) {
    if (lightItems.length < 2) return;
    lightIndex = (lightIndex + amount + lightItems.length) % lightItems.length;
    renderLightbox();
  }

  function openLightbox(items, index) {
    closeLightbox();
    lightItems = items;
    lightIndex = Math.max(0, index);
    const root = el('div', 'zny-light');
    const prev = el('button', 'zny-light-nav', '←');
    const stage = el('div', 'zny-light-stage');
    const image = el('img', 'zny-light-image');
    const next = el('button', 'zny-light-nav', '→');
    const closeButton = el('button', 'zny-light-close', COPY[lang()].close);
    const count = el('p', 'zny-light-count');
    prev.onclick = e => { e.stopPropagation(); step(-1); };
    next.onclick = e => { e.stopPropagation(); step(1); };
    closeButton.onclick = e => { e.stopPropagation(); closeLightbox(); };
    stage.onclick = e => e.stopPropagation();
    root.onclick = closeLightbox;
    root.addEventListener('touchstart', e => {
      touchX = e.touches[0]?.clientX || 0;
      touchY = e.touches[0]?.clientY || 0;
    }, { passive: true });
    root.addEventListener('touchend', e => {
      const point = e.changedTouches[0];
      if (!point) return;
      const dx = point.clientX - touchX;
      const dy = point.clientY - touchY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) closeLightbox();
    }, { passive: true });
    stage.append(image);
    root.append(prev, stage, next, closeButton, count);
    document.body.append(root);
    lightbox = root;
    renderLightbox();
  }

  function imageCard(items, index, poster = false) {
    const button = el('button', 'zny-card');
    const media = el('div', 'zny-media');
    const image = el('img');
    image.src = items[index];
    image.loading = 'lazy';
    image.decoding = 'async';
    if (poster) button.classList.add('zny-poster-card');
    media.append(image);
    button.append(media);
    button.onclick = e => { e.stopPropagation(); openLightbox(items, index); };
    return button;
  }

  function printGroups() {
    const groups = new Map();
    PRINT_FILES.forEach(name => {
      const match = name.match(/znyprint-(\d+)/);
      const key = match?.[1] || name;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(name);
    });
    return [...groups.values()].map(names => names.sort((a, b) => {
      const score = name => /variant/.test(name) && /tee/.test(name) ? 3 : /variant/.test(name) ? 1 : /tee/.test(name) ? 2 : 0;
      return score(a) - score(b) || a.localeCompare(b);
    }));
  }

  function printCard(names) {
    const urls = names.map(name => src('prints', name));
    const button = el('button', names.length > 1 ? 'zny-card has-hover' : 'zny-card');
    const media = el('div', 'zny-media');
    const main = el('img', 'zny-main');
    main.src = urls[0];
    main.loading = 'lazy';
    if (urls.length > 1) main.classList.add('has-hover');
    media.append(main);
    let timer = null;
    let active = 0;
    const layers = urls.slice(1).map(url => {
      const img = el('img', 'zny-layer');
      img.src = url;
      img.loading = 'lazy';
      media.append(img);
      return img;
    });
    if (layers.length) {
      const show = () => {
        layers.forEach((layer, i) => layer.classList.toggle('is-active', i === active));
        active = (active + 1) % layers.length;
      };
      button.onmouseenter = () => { active = 0; show(); timer = setInterval(show, 900); };
      button.onmouseleave = () => { clearInterval(timer); layers.forEach(x => x.classList.remove('is-active')); };
    }
    button.append(media);
    button.onclick = e => { e.stopPropagation(); openLightbox(urls, 0); };
    return button;
  }

  function makeSection(titleKey, textKey, content) {
    const section = el('section', 'zny-section');
    const title = el('h2', 'zny-title');
    title.dataset.copy = titleKey;
    const copy = el('p', 'zny-copy zny-section-copy');
    copy.dataset.copy = textKey;
    section.append(title, copy, content);
    return section;
  }

  function updateCopy() {
    if (!modal) return;
    const copy = COPY[lang()];
    modal.querySelector('.zny-close').textContent = copy.close;
    modal.querySelectorAll('[data-copy]').forEach(node => node.textContent = copy[node.dataset.copy]);
    lightbox?.querySelector('.zny-light-close') && (lightbox.querySelector('.zny-light-close').textContent = copy.close);
  }

  function closeModal() {
    closeLightbox();
    modal?.remove();
    modal = null;
    document.body.style.overflow = oldBodyOverflow;
    document.documentElement.style.overflow = oldHtmlOverflow;
  }

  function openModal() {
    injectStyles();
    closeModal();
    oldBodyOverflow = document.body.style.overflow;
    oldHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    modal = el('div', 'zny-modal');
    const inner = el('div', 'zny-inner');
    const head = el('div', 'zny-head');
    const closeButton = el('button', 'zny-close');
    closeButton.onclick = closeModal;
    head.append(closeButton);

    const brand = el('section', 'zny-brand');
    const brandTitle = el('h1', 'zny-brand-title', 'ZNY');
    const brandLabel = el('p', 'zny-brand-label');
    brandLabel.dataset.copy = 'aboutLabel';
    const brandCopy = el('p', 'zny-copy');
    brandCopy.dataset.copy = 'about';
    brand.append(brandTitle, brandLabel, brandCopy);

    const printGrid = el('div', 'zny-print-grid');
    printGroups().forEach(group => printGrid.append(printCard(group)));

    const posterUrls = POSTER_FILES.map(name => src('afisha', name));
    const posterGrid = el('div', 'zny-poster-grid');
    posterUrls.forEach((_, i) => posterGrid.append(imageCard(posterUrls, i, true)));

    const stickerGrid = el('div', 'zny-sticker-grid');
    for (let i = 0; i < STICKER_FILES.length; i += 2) {
      const urls = STICKER_FILES.slice(i, i + 2).map(name => src('stickers', name));
      const row = el('div', 'zny-sticker-row');
      urls.forEach((_, index) => row.append(imageCard(urls, index)));
      stickerGrid.append(row);
    }

    inner.append(
      head,
      brand,
      makeSection('printsTitle', 'printsText', printGrid),
      makeSection('campaignTitle', 'campaignText', posterGrid),
      makeSection('stickersTitle', 'stickersText', stickerGrid),
    );
    modal.append(inner);
    document.body.append(modal);
    updateCopy();
  }

  document.addEventListener('click', event => {
    const card = event.target.closest('#works article,#works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'ZNY') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openModal();
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (lightbox) closeLightbox();
      else if (modal) closeModal();
    } else if (lightbox && event.key === 'ArrowLeft') step(-1);
    else if (lightbox && event.key === 'ArrowRight') step(1);
  }, true);

  new MutationObserver(updateCopy).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
