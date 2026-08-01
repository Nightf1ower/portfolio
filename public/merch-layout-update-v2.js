(() => {
  if (window.__merchLayoutUpdateV2) return;
  window.__merchLayoutUpdateV2 = true;

  const VERSION = 'merch-layout-update-2';
  const ROOT = '/works/merch/yablochko';

  const COPY = {
    ru: {
      dxsTitle: 'КОНТЕНТ ДЛЯ СОЦСЕТЕЙ И ПЕЧАТНЫЕ МАТЕРИАЛЫ',
      dxsText: 'Разработка серии визуальных материалов для модельного комьюнити DXS. В проект вошли изображения для постов и сторис, рекламные и имиджевые постеры, а также графика для стикеров и других носителей. Дизайн строится на сочетании минималистичной типографики, рукописной графики, коротких высказываний и контрастной красно-бело-чёрной палитры, отражающей независимый и экспериментальный характер проекта.',
      socialTitle: 'КОНТЕНТ ДЛЯ СОЦИАЛЬНЫХ СЕТЕЙ',
      close: 'ЗАКРЫТЬ',
    },
    en: {
      dxsTitle: 'SOCIAL MEDIA & PRINT MATERIALS',
      dxsText: 'Development of a series of visual materials for the DXS model community. The project includes content for social media posts and stories, promotional and image-based posters, as well as graphics for stickers and other formats. The visual direction combines minimalist typography, handwritten graphics, concise statements, and a contrasting red, white, and black palette that reflects the project’s independent and experimental character.',
      socialTitle: 'SOCIAL MEDIA CONTENT',
      close: 'CLOSE',
    },
  };

  const BROCHURES = [
    [`${ROOT}/brochure/brochure-01-new.jpg`, `${ROOT}/brochure/brochure-01-tee-new.jpg`],
    [`${ROOT}/brochure/brochure-02-new.jpg`, `${ROOT}/brochure/brochure-02-tee-new.jpg`],
  ];

  const POSTERS = [
    `${ROOT}/poster/ya-poster-02-new.jpg`,
    `${ROOT}/poster/ya-poster-01.jpg`,
    `${ROOT}/poster/ya-poster-03.jpg`,
  ];

  const SOCIAL = [
    `${ROOT}/ad/ya-ad-04.jpg`,
    `${ROOT}/ad/ya-ad-03.jpg`,
    `${ROOT}/ad/ya-ad-01-new.jpg`,
    `${ROOT}/ad/ya-ad-02.jpg`,
  ];

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function injectStyles() {
    const previous = document.getElementById('merch-layout-update-v2-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'merch-layout-update-v2-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .m10-modal .m10-brochure.m10-brochure-new {
        display: grid !important;
        grid-template-columns: repeat(2,minmax(0,1fr)) !important;
        gap: 1.25rem !important;
      }
      .m10-modal .m10-brochure-new .m10-media {
        height: 34rem !important;
      }
      .m10-modal .m10-card img.m10-merch-main,
      .m10-modal .m10-card img.m10-merch-hover {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        object-fit: contain !important;
      }
      .m10-modal .m10-card img.m10-merch-hover {
        opacity: 0 !important;
        transition: opacity .4s ease !important;
      }
      .m10-modal .m10-card:hover img.m10-merch-hover {
        opacity: 1 !important;
      }

      .m10-modal .m10-poster-layout.m10-poster-layout-new {
        display: grid !important;
        grid-template-columns: repeat(2,minmax(0,1fr)) !important;
        gap: 1rem !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
      }
      .m10-modal .m10-poster-layout-new .m10-card {
        width: 100% !important;
      }
      .m10-modal .m10-poster-layout-new .m10-media {
        height: auto !important;
        min-height: 0 !important;
        aspect-ratio: auto !important;
        overflow: visible !important;
      }
      .m10-modal .m10-poster-layout-new img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        object-fit: contain !important;
      }
      .m10-modal .m10-poster-layout-new .m10-poster-third {
        grid-column: 1 / -1 !important;
        width: calc(50% - .5rem) !important;
        justify-self: center !important;
      }

      .m10-modal .m10-ad-layout.m10-ad-layout-new {
        width: min(100%,68rem) !important;
        margin: 0 auto !important;
      }
      .m10-modal .m10-ad-layout-new .m10-ad-feature {
        display: block !important;
        width: min(100%,38rem) !important;
        margin: 0 auto 1.5rem !important;
      }
      .m10-modal .m10-ad-layout-new .m10-ad-feature .m10-media {
        height: 38rem !important;
      }
      .m10-modal .m10-ad-layout-new .m10-ad-rest {
        display: grid !important;
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
        gap: 1.25rem !important;
      }
      .m10-modal .m10-ad-layout-new .m10-ad-rest .m10-media {
        min-height: 16rem !important;
      }

      .m10-modal .m10-billboard-grid {
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
      }
      .m10-modal .m10-billboard-center-row {
        grid-column: 1 / -1 !important;
        display: grid !important;
        grid-template-columns: repeat(2,minmax(0,1fr)) !important;
        gap: 1rem !important;
        width: calc(66.666667% - .333333rem) !important;
        margin: 0 auto !important;
      }
      .m10-modal .m10-billboard-center-row > .m10-card {
        width: 100% !important;
        min-width: 0 !important;
      }

      .m10-modal .m10-dxs-posters {
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
      }

      .m10-modal .m10-dxs-materials-intro {
        border-top: 1px solid rgba(5,5,5,.35) !important;
        padding-top: 1.35rem !important;
        margin: 0 0 clamp(3rem,6vw,5rem) !important;
      }
      .m10-modal .m10-dxs-materials-title {
        margin: 0 !important;
        font-size: clamp(2.65rem,5vw,5.75rem) !important;
        font-weight: 900 !important;
        line-height: .84 !important;
        letter-spacing: -.075em !important;
        text-transform: uppercase !important;
        text-wrap: balance !important;
      }
      .m10-modal .m10-dxs-materials-copy {
        width: 100% !important;
        max-width: none !important;
        margin: 1.25rem 0 0 !important;
        color: rgba(5,5,5,.78) !important;
        font-size: clamp(1rem,1.45vw,1.25rem) !important;
        font-weight: 600 !important;
        line-height: 1.48 !important;
        letter-spacing: -.018em !important;
        text-wrap: pretty !important;
      }

      .m10-layout-light {
        position: fixed;
        inset: 0;
        z-index: 1000800;
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(0,0,0,.96);
      }
      .m10-layout-light__stage {
        height: calc(100dvh - 2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .m10-layout-light__image {
        display: block;
        max-width: 100%;
        max-height: 92dvh;
        width: auto;
        height: auto;
        object-fit: contain;
      }
      .m10-layout-light__nav,
      .m10-layout-light__close {
        border: 1px solid rgba(255,255,255,.8);
        background: #050505;
        color: #fff;
        font: 900 1.35rem/1 Arial,Helvetica,sans-serif;
        cursor: pointer;
      }
      .m10-layout-light__nav { width: 3.25rem; height: 3.25rem; }
      .m10-layout-light__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: .75rem 1rem;
        font-size: .68rem;
        letter-spacing: .2em;
      }

      @media (max-width: 800px) {
        .m10-modal .m10-dxs-posters {
          grid-template-columns: repeat(3,minmax(0,1fr)) !important;
        }
      }
      @media (max-width: 700px) {
        .m10-modal .m10-brochure-new,
        .m10-modal .m10-poster-layout-new,
        .m10-modal .m10-ad-layout-new .m10-ad-rest,
        .m10-modal .m10-dxs-posters {
          grid-template-columns: 1fr !important;
        }
        .m10-modal .m10-brochure-new .m10-media,
        .m10-modal .m10-ad-layout-new .m10-ad-feature .m10-media {
          height: auto !important;
          min-height: 20rem !important;
        }
        .m10-modal .m10-poster-layout-new .m10-poster-third {
          grid-column: auto !important;
          width: 100% !important;
        }
        .m10-modal .m10-billboard-center-row {
          width: 100% !important;
          grid-template-columns: 1fr !important;
        }
        .m10-layout-light { grid-template-columns: 1fr; }
        .m10-layout-light__nav { display: none; }
      }
    `;
    document.head.append(style);
  }

  function openLightbox(items, start = 0) {
    document.querySelector('.m10-layout-light')?.remove();
    let index = Math.max(0, start);

    const overlay = document.createElement('div');
    const prev = document.createElement('button');
    const stage = document.createElement('div');
    const image = document.createElement('img');
    const next = document.createElement('button');
    const close = document.createElement('button');

    overlay.className = 'm10-layout-light';
    prev.className = 'm10-layout-light__nav';
    next.className = 'm10-layout-light__nav';
    stage.className = 'm10-layout-light__stage';
    image.className = 'm10-layout-light__image';
    close.className = 'm10-layout-light__close';
    prev.type = next.type = close.type = 'button';
    prev.textContent = '←';
    next.textContent = '→';
    close.textContent = COPY[language()].close;

    const render = () => { image.src = `${items[index]}?v=${VERSION}`; };
    const step = (amount) => {
      index = (index + amount + items.length) % items.length;
      render();
    };

    prev.onclick = (event) => { event.stopPropagation(); step(-1); };
    next.onclick = (event) => { event.stopPropagation(); step(1); };
    close.onclick = (event) => { event.stopPropagation(); overlay.remove(); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = () => overlay.remove();
    stage.append(image);
    overlay.append(prev, stage, next, close);
    document.body.append(overlay);
    render();
  }

  function imageCard(src, items, index, extraClass = '') {
    const button = document.createElement('button');
    const media = document.createElement('div');
    const image = document.createElement('img');
    button.type = 'button';
    button.className = `m10-card ${extraClass}`.trim();
    media.className = 'm10-media';
    image.src = `${src}?v=${VERSION}`;
    image.alt = src.split('/').pop() || 'MERCH image';
    image.loading = 'lazy';
    image.decoding = 'async';
    media.append(image);
    button.append(media);
    button.onclick = (event) => {
      event.stopPropagation();
      openLightbox(items, index);
    };
    return button;
  }

  function brochureCard(base, hover, index) {
    const button = document.createElement('button');
    const media = document.createElement('div');
    const main = document.createElement('img');
    const layer = document.createElement('img');
    const items = [base, hover];

    button.type = 'button';
    button.className = 'm10-card';
    media.className = 'm10-media';
    main.className = 'm10-merch-main';
    layer.className = 'm10-merch-hover';
    main.src = `${base}?v=${VERSION}`;
    layer.src = `${hover}?v=${VERSION}`;
    main.alt = base.split('/').pop() || 'MERCH graphic';
    layer.alt = hover.split('/').pop() || 'MERCH T-shirt';
    main.loading = index === 0 ? 'eager' : 'lazy';
    layer.loading = 'lazy';
    media.append(main, layer);
    button.append(media);
    button.onclick = (event) => {
      event.stopPropagation();
      openLightbox(items, 0);
    };
    return button;
  }

  function rebuildBrochures(modal) {
    const grid = modal.querySelector('.m10-campaign .m10-brochure');
    if (!grid || grid.dataset.layoutUpdate === VERSION) return;
    grid.classList.add('m10-brochure-new');
    grid.replaceChildren(...BROCHURES.map(([base, hover], index) => brochureCard(base, hover, index)));
    grid.dataset.layoutUpdate = VERSION;
  }

  function rebuildPosters(modal) {
    const grid = modal.querySelector('.m10-poster-layout');
    if (!grid || grid.dataset.layoutUpdate === VERSION) return;
    grid.classList.add('m10-poster-layout-new');
    const cards = POSTERS.map((src, index) => imageCard(src, POSTERS, index, index === 2 ? 'm10-poster-third' : ''));
    grid.replaceChildren(...cards);
    grid.dataset.layoutUpdate = VERSION;
  }

  function rebuildSocial(modal) {
    const layout = modal.querySelector('.m10-ad-layout');
    if (!layout || layout.dataset.layoutUpdate === VERSION) return;
    layout.classList.add('m10-ad-layout-new');
    const feature = imageCard(SOCIAL[0], SOCIAL, 0, 'm10-ad-feature');
    const rest = document.createElement('div');
    rest.className = 'm10-ad-rest';
    SOCIAL.slice(1).forEach((src, offset) => rest.append(imageCard(src, SOCIAL, offset + 1)));
    layout.replaceChildren(feature, rest);
    layout.dataset.layoutUpdate = VERSION;
  }

  function centerBillboards(modal) {
    const grid = modal.querySelector('.m10-billboard-grid');
    if (!grid) return;

    const oldRow = grid.querySelector(':scope > .m10-billboard-center-row');
    if (oldRow) {
      [...oldRow.children].forEach((card) => grid.insertBefore(card, oldRow));
      oldRow.remove();
    }

    const cards = [...grid.querySelectorAll(':scope > .m10-card')];
    const byNumber = new Map();
    cards.forEach((card) => {
      const src = card.querySelector('img')?.src || '';
      const match = src.match(/billboard-(\d+)/i);
      if (match) byNumber.set(Number(match[1]), card);
    });

    [1,2,3].forEach((number) => {
      const card = byNumber.get(number);
      if (card) grid.append(card);
    });

    const row = document.createElement('div');
    row.className = 'm10-billboard-center-row';
    [4,5].forEach((number) => {
      const card = byNumber.get(number);
      if (card) row.append(card);
    });
    if (row.children.length) grid.append(row);
    grid.dataset.layoutUpdate = VERSION;
  }

  function addDxsIntro(modal) {
    const zone = modal.querySelector('.m10-dxs-zone');
    if (!zone) return;
    const sections = [...zone.querySelectorAll(':scope > .m10-section')];
    const stickers = sections.find((section) => /^(STICKERS|СТИКЕРЫ)$/i.test(
      section.querySelector('.m10-section-title')?.textContent?.trim() || ''
    ));
    if (!stickers) return;

    let intro = zone.querySelector(':scope > .m10-dxs-materials-intro');
    if (!intro) {
      intro = document.createElement('div');
      intro.className = 'm10-dxs-materials-intro';
      const title = document.createElement('h2');
      title.className = 'm10-dxs-materials-title';
      const paragraph = document.createElement('p');
      paragraph.className = 'm10-dxs-materials-copy';
      intro.append(title, paragraph);
      stickers.before(intro);
    }

    const copy = COPY[language()];
    intro.querySelector('.m10-dxs-materials-title').textContent = copy.dxsTitle;
    intro.querySelector('.m10-dxs-materials-copy').textContent = copy.dxsText;

    const dxsAds = sections.find((section) => section.querySelector('.m10-dxs-ads'));
    if (dxsAds) {
      const heading = dxsAds.querySelector('.m10-section-title');
      if (heading) heading.textContent = copy.socialTitle;
      dxsAds.querySelector(':scope > .m10-copy-update')?.remove();
    }
  }

  function apply() {
    injectStyles();
    const modal = document.querySelector('.m10-modal');
    if (!modal) return false;
    rebuildBrochures(modal);
    rebuildPosters(modal);
    rebuildSocial(modal);
    centerBillboards(modal);
    addDxsIntro(modal);
    modal.dataset.merchLayoutUpdate = `${VERSION}-${language()}`;
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
    const card = event.target.closest('#works article,#works button');
    if (card?.querySelector('h3')?.textContent?.trim().toUpperCase() === 'MERCH') {
      setTimeout(schedule, 0);
      setTimeout(schedule, 100);
      setTimeout(schedule, 300);
    }
  }, true);

  schedule();
})();