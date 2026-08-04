(() => {
  if (window.__merchGalleryCleanV1) return;
  window.__merchGalleryCleanV1 = true;

  const VERSION = 'merch-clean-1';
  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      merch: 'МЕРЧ',
      yKicker: 'ЯБЛОЧКО ЗЕЛЕНОЕ',
      yTitle: 'РАЗРАБОТКА МЕРЧА К АЛЬБОМУ «MOSGORTRAX»',
      yText: 'Серия мерча для музыкального альбома Mosgortrax исполнителя «Яблочко Зеленое». Визуальная система построена на сочетании наивной графики, яркого цвета и намеренно простой формы, которая переносится на футболки, принты, постеры, рекламные материалы и наружные носители.',
      campaign: 'КАМПЕЙН',
      posters: 'ПОСТЕРЫ',
      socials: 'МАТЕРИАЛЫ ДЛЯ СОЦСЕТЕЙ',
      billboards: 'БИЛБОРДЫ',
      billboardText: 'Серия рекламных визуалов для социальных сетей, вдохновлённая масштабными фестивальными билбордами Coachella. Изображения созданы с помощью ИИ и доработаны вручную.',
      dxsText: 'DXS — фотостудия, для которой была разработана контрастная визуальная система, построенная вокруг крупной типографики, насыщенного красного цвета и фрагментированной графики.',
      stickers: 'СТИКЕРЫ',
      visualization: 'ВИЗУАЛИЗАЦИИ',
      ads: 'РЕКЛАМНЫЕ МАТЕРИАЛЫ',
    },
    en: {
      close: 'CLOSE',
      merch: 'MERCH',
      yKicker: 'YABLOCHKO ZELENOE',
      yTitle: 'MERCHANDISE DESIGN FOR THE ALBUM “MOSGORTRAX”',
      yText: 'A merchandise series created for Mosgortrax, an album by the artist Yablochko Zelenoe. The visual system combines naïve graphics, vivid color and intentionally simple forms across T-shirts, prints, posters, promotional materials and outdoor formats.',
      campaign: 'CAMPAIGN',
      posters: 'POSTERS',
      socials: 'SOCIAL MEDIA MATERIALS',
      billboards: 'BILLBOARDS',
      billboardText: 'A series of social media campaign visuals inspired by Coachella’s large-scale festival billboards. The imagery was created with AI and refined through post-production.',
      dxsText: 'DXS is a photography studio for which a bold visual system was developed around oversized typography, saturated red and fragmented graphic elements.',
      stickers: 'STICKERS',
      visualization: 'VISUALIZATIONS',
      ads: 'ADVERTISING MATERIALS',
    },
  };

  const ASSETS = {
    brochures: [
      ['/works/merch/yablochko/brochure/brochure-01-new.jpg', '/works/merch/yablochko/brochure/brochure-01-tee-new.jpg'],
      ['/works/merch/yablochko/brochure/brochure-02-new.jpg', '/works/merch/yablochko/brochure/brochure-02-tee-new.jpg'],
    ],
    prints: [
      '/works/merch/yablochko/print/ya-print-01.jpg',
      '/works/merch/yablochko/print/ya-print-02.png',
      '/works/merch/yablochko/print/ya-print-03.jpg',
      '/works/merch/yablochko/print/ya-print-04.jpg',
    ],
    posters: [
      '/works/merch/yablochko/poster/ya-poster-02-new.jpg',
      '/works/merch/yablochko/poster/ya-poster-01.jpg',
      '/works/merch/yablochko/poster/ya-poster-03.jpg',
    ],
    socials: [
      '/works/merch/yablochko/ad/ya-ad-04.jpg',
      '/works/merch/yablochko/ad/ya-ad-03.jpg',
      '/works/merch/yablochko/ad/ya-ad-01-new.jpg',
      '/works/merch/yablochko/ad/ya-ad-02.jpg',
    ],
    billboards: [1, 2, 3, 4, 5].map(number => `/works/merch/yablochko/billboard/billboard-0${number}.jpg`),
    dxsStickers: [
      '/works/merch/dxs/sticker/dxs_sticker-01.jpg',
      '/works/merch/dxs/sticker/dxs_sticker-02.jpg',
      '/works/merch/dxs/sticker/dxs_sticker-03.jpg',
    ],
    dxsStickerVisuals: [
      '/works/merch/dxs/sticker/dxs-sticker-visual-01.png',
      '/works/merch/dxs/sticker/dxs-sticker-visual-02.png',
    ],
    dxsPosters: [
      '/works/merch/dxs/poster/dxs_poster_01.jpg',
      '/works/merch/dxs/poster/dxs_poster_03.jpg',
      '/works/merch/dxs/poster/dxs_poster_04.jpg',
    ],
    dxsPosterVisuals: [
      '/works/merch/dxs/poster/dxs_poster-visual_01.jpg',
      '/works/merch/dxs/poster/dxs_poster-visual_02.jpg',
    ],
    dxsAds: [
      '/works/merch/dxs/ad/dxs_ad_01.jpg',
      '/works/merch/dxs/ad/dxs_ad_02.jpg',
      '/works/merch/dxs/ad/dxs_ad_03.jpg',
    ],
  };

  let modal = null;
  let lightbox = null;
  let lightboxItems = [];
  let lightboxIndex = 0;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );
  const t = () => COPY[language()];
  const src = path => `${path}?v=${VERSION}`;
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function installStyles() {
    document.getElementById('merch-clean-style')?.remove();
    const style = el('style');
    style.id = 'merch-clean-style';
    style.textContent = `
      html:has(.mc-modal),body:has(.mc-modal){overflow:hidden!important}
      .mc-modal{position:fixed;inset:0;z-index:950000;overflow-y:auto;overflow-x:hidden;background:#87CEEB;color:#050505;opacity:0;transition:opacity .25s ease}
      .mc-modal.is-open{opacity:1}
      .mc-shell{width:min(calc(100% - 2rem),92rem);margin:0 auto;padding:1rem 0 0}
      .mc-head{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.75rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.3);background:rgba(135,206,235,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
      .mc-label,.mc-close,.mc-count{font:900 .68rem/1 Arial,Helvetica,sans-serif;letter-spacing:.24em;text-transform:uppercase}
      .mc-label,.mc-close{border:0;background:#050505;color:#fff;padding:.7rem 1rem}
      .mc-close{cursor:pointer}
      .mc-hero{padding:clamp(4rem,9vw,8rem) 0 clamp(4rem,8vw,7rem)}
      .mc-kicker{margin:0;font:900 .72rem/1 Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase}
      .mc-title{max-width:15ch;margin:1rem 0 0;font:900 clamp(3rem,7.2vw,8rem)/.84 Arial,Helvetica,sans-serif;letter-spacing:-.075em;text-transform:uppercase}
      .mc-copy{width:min(100%,54rem);margin:clamp(1.5rem,3vw,2.5rem) 0 0;font:600 clamp(1rem,1.4vw,1.25rem)/1.5 Arial,Helvetica,sans-serif;letter-spacing:-.015em}
      .mc-section{padding-top:1.35rem;margin-top:clamp(4rem,8vw,7rem);border-top:1px solid rgba(5,5,5,.3)}
      .mc-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:clamp(1.5rem,3vw,2.5rem)}
      .mc-section-title{margin:0;font:900 clamp(2.7rem,6vw,6.5rem)/.82 Arial,Helvetica,sans-serif;letter-spacing:-.07em;text-transform:uppercase}
      .mc-count{margin:0;color:rgba(5,5,5,.5);white-space:nowrap}
      .mc-grid{display:grid;gap:clamp(.8rem,1.6vw,1.25rem);align-items:start}
      .mc-grid--2{grid-template-columns:repeat(2,minmax(0,1fr))}
      .mc-grid--3{grid-template-columns:repeat(3,minmax(0,1fr))}
      .mc-grid--4{grid-template-columns:repeat(4,minmax(0,1fr))}
      .mc-grid--5{grid-template-columns:repeat(5,minmax(0,1fr))}
      .mc-card{display:block;width:100%;min-width:0;margin:0;padding:0;border:0;background:transparent;cursor:zoom-in}
      .mc-media{position:relative;display:flex;align-items:center;justify-content:center;width:100%;min-height:12rem;overflow:hidden}
      .mc-media img{display:block;width:100%;height:auto;max-height:85vh;object-fit:contain}
      .mc-hover{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:contain!important;opacity:0;transition:opacity .35s ease}
      .mc-card:hover .mc-hover{opacity:1}
      .mc-bridge{box-sizing:border-box;width:100vw;margin-left:calc(50% - 50vw);margin-top:clamp(5rem,10vw,9rem);padding:0 max(1rem,calc((100vw - 92rem)/2)) clamp(6rem,11vw,10rem);background:linear-gradient(180deg,#87CEEB 0,#87CEEB 8rem,#90c6dd 18rem,#a6b5c8 30rem,#c58e9d 43rem,#dd5b5a 56rem,#e5312b 68rem,#ef2b27 82rem,#ef2b27 100%)}
      .mc-bridge .mc-section{background:transparent}
      .mc-billboards{padding-top:1.35rem;margin-top:0}
      .mc-dxs{padding-top:clamp(8rem,13vw,13rem)}
      .mc-dxs-title{margin:0;font:900 clamp(5rem,16vw,14rem)/.78 Arial,Helvetica,sans-serif;letter-spacing:-.085em;text-transform:uppercase}
      .mc-dxs .mc-copy{margin-bottom:clamp(4rem,8vw,7rem)}
      .mc-subtitle{margin:clamp(2.5rem,5vw,4.5rem) 0 1rem;font:900 clamp(1rem,1.8vw,1.45rem)/1 Arial,Helvetica,sans-serif;letter-spacing:.18em;text-transform:uppercase}
      .mc-light{position:fixed;inset:0;z-index:990000;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:1rem;padding:1rem;background:rgba(0,0,0,.97)}
      .mc-light-stage{display:flex;align-items:center;justify-content:center;height:calc(100dvh - 2rem);min-width:0;overflow:hidden}
      .mc-light-image{display:block;max-width:100%;max-height:92dvh;width:auto;height:auto;object-fit:contain}
      .mc-light-nav,.mc-light-close{border:1px solid rgba(255,255,255,.8);background:#050505;color:#fff;font-family:Arial,Helvetica,sans-serif;font-weight:900;cursor:pointer}
      .mc-light-nav{width:3.3rem;height:3.3rem;font-size:1.5rem}
      .mc-light-close{position:absolute;top:1rem;right:1rem;padding:.75rem 1rem;font-size:.68rem;letter-spacing:.2em}
      .mc-light-count{position:absolute;left:50%;bottom:1rem;transform:translateX(-50%);margin:0;padding:.45rem .7rem;background:#fff;color:#050505;font:900 .65rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em}
      @media(max-width:1000px){.mc-grid--5{grid-template-columns:repeat(3,minmax(0,1fr))}.mc-grid--4{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:700px){
        .mc-shell{width:min(calc(100% - 1.5rem),92rem)}
        .mc-section-head{display:block}.mc-count{margin-top:.75rem}
        .mc-grid--2,.mc-grid--3,.mc-grid--4,.mc-grid--5{grid-template-columns:1fr}
        .mc-bridge{padding-left:.75rem;padding-right:.75rem;background:linear-gradient(180deg,#87CEEB 0,#87CEEB 5rem,#98c0d6 13rem,#ba9faf 23rem,#dc605f 34rem,#e5312b 44rem,#ef2b27 54rem,#ef2b27 100%)}
        .mc-dxs{padding-top:7rem}
        .mc-light{grid-template-columns:1fr;padding:.75rem}.mc-light-nav{display:none}.mc-light-stage{height:calc(100dvh - 1.5rem)}
        .mc-card:hover .mc-hover{opacity:0}
      }
    `;
    document.head.append(style);
  }

  function imageCard(path, group, index, hoverPath = '') {
    const button = el('button', 'mc-card');
    const media = el('span', 'mc-media');
    const image = el('img');
    button.type = 'button';
    image.src = src(path);
    image.alt = path.split('/').pop() || 'MERCH image';
    image.loading = 'lazy';
    image.decoding = 'async';
    media.append(image);
    if (hoverPath) {
      const hover = el('img', 'mc-hover');
      hover.src = src(hoverPath);
      hover.alt = hoverPath.split('/').pop() || 'MERCH mockup';
      hover.loading = 'lazy';
      hover.decoding = 'async';
      media.append(hover);
    }
    button.append(media);
    button.onclick = event => {
      event.stopPropagation();
      openLightbox(group, index);
    };
    return button;
  }

  function grid(items, columns, hoverPairs = false) {
    const wrapper = el('div', `mc-grid mc-grid--${columns}`);
    if (hoverPairs) {
      const flattened = items.flat();
      items.forEach(([base, hover], index) => wrapper.append(imageCard(base, flattened, index * 2, hover)));
    } else {
      items.forEach((path, index) => wrapper.append(imageCard(path, items, index)));
    }
    return wrapper;
  }

  function section(title, items, content, extraClass = '') {
    const wrapper = el('section', `mc-section ${extraClass}`.trim());
    const head = el('div', 'mc-section-head');
    head.append(el('h2', 'mc-section-title', title), el('p', 'mc-count', `${items.length} / ${items.length}`));
    wrapper.append(head, content);
    return wrapper;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
    lightboxItems = [];
  }

  function renderLightbox() {
    if (!lightbox || !lightboxItems.length) return;
    lightbox.querySelector('.mc-light-image').src = src(lightboxItems[lightboxIndex]);
    lightbox.querySelector('.mc-light-count').textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
  }

  function stepLightbox(amount) {
    lightboxIndex = (lightboxIndex + amount + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  }

  function openLightbox(items, start = 0) {
    closeLightbox();
    lightboxItems = [...items];
    lightboxIndex = Math.max(0, Math.min(start, lightboxItems.length - 1));
    const overlay = el('div', 'mc-light');
    const previous = el('button', 'mc-light-nav', '←');
    const stage = el('div', 'mc-light-stage');
    const image = el('img', 'mc-light-image');
    const next = el('button', 'mc-light-nav', '→');
    const close = el('button', 'mc-light-close', t().close);
    const count = el('p', 'mc-light-count');
    previous.type = next.type = close.type = 'button';
    previous.onclick = event => { event.stopPropagation(); stepLightbox(-1); };
    next.onclick = event => { event.stopPropagation(); stepLightbox(1); };
    close.onclick = event => { event.stopPropagation(); closeLightbox(); };
    stage.onclick = event => event.stopPropagation();
    overlay.onclick = closeLightbox;
    stage.append(image);
    overlay.append(previous, stage, next, close, count);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function closeModal() {
    closeLightbox();
    modal?.remove();
    modal = null;
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function openModal() {
    installStyles();
    closeModal();
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const copy = t();
    const overlay = el('div', 'mc-modal');
    const shell = el('div', 'mc-shell');
    const head = el('div', 'mc-head');
    const close = el('button', 'mc-close', copy.close);
    close.type = 'button';
    close.onclick = closeModal;
    head.append(el('p', 'mc-label', copy.merch), close);

    const hero = el('section', 'mc-hero');
    hero.append(el('p', 'mc-kicker', copy.yKicker), el('h1', 'mc-title', copy.yTitle), el('p', 'mc-copy', copy.yText));

    const campaignContent = el('div');
    campaignContent.append(grid(ASSETS.brochures, 2, true), grid(ASSETS.prints, 4));
    campaignContent.style.display = 'grid';
    campaignContent.style.gap = 'clamp(1.25rem,3vw,2.5rem)';

    shell.append(
      head,
      hero,
      section(copy.campaign, [...ASSETS.brochures.flat(), ...ASSETS.prints], campaignContent),
      section(copy.posters, ASSETS.posters, grid(ASSETS.posters, 3)),
      section(copy.socials, ASSETS.socials, grid(ASSETS.socials, 2)),
    );

    const bridge = el('div', 'mc-bridge');
    const billboardSection = section(copy.billboards, ASSETS.billboards, grid(ASSETS.billboards, 5), 'mc-billboards');
    billboardSection.insertBefore(el('p', 'mc-copy', copy.billboardText), billboardSection.querySelector('.mc-grid'));

    const dxs = el('section', 'mc-dxs');
    dxs.append(el('h1', 'mc-dxs-title', 'DXS'), el('p', 'mc-copy', copy.dxsText));
    dxs.append(
      section(copy.stickers, ASSETS.dxsStickers, grid(ASSETS.dxsStickers, 3)),
      el('h3', 'mc-subtitle', copy.visualization),
      grid(ASSETS.dxsStickerVisuals, 2),
      section(copy.posters, ASSETS.dxsPosters, grid(ASSETS.dxsPosters, 3)),
      el('h3', 'mc-subtitle', copy.visualization),
      grid(ASSETS.dxsPosterVisuals, 2),
      section(copy.ads, ASSETS.dxsAds, grid(ASSETS.dxsAds, 3)),
    );

    bridge.append(billboardSection, dxs);
    shell.append(bridge);
    overlay.append(shell);
    document.body.append(overlay);
    modal = overlay;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
  }

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    const card = target?.closest('#works article,#works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    const isMerch = card?.dataset.projectLayoutV5Key === 'MERCH' || title === 'MERCH';
    if (!isMerch) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openModal();
  }, true);

  window.addEventListener('keydown', event => {
    if (lightbox) {
      if (event.key === 'Escape') { event.preventDefault(); closeLightbox(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); stepLightbox(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); stepLightbox(1); }
      return;
    }
    if (modal && event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    }
  }, true);

  installStyles();
})();
