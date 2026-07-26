(() => {
  if (window.__carnivalRecordsGalleryV2) return;
  window.__carnivalRecordsGalleryV2 = true;

  const V = 'carnival-2';
  const ROOT = '/works/carnival-records';
  const HOVER = matchMedia('(hover:hover) and (pointer:fine)');
  const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
  const asset = (folder, file) => `${ROOT}/${folder}/${file}?v=${V}`;

  const CARNIVAL = {
    1: ['another-1', 'another-2', 'tee-1', 'tee-2'],
    2: ['tee-1', 'tee-2'],
    3: ['carnival_print-tee-1.jpg', 'carnival_print-tee-2.jpg', 'carnival_print-tee-3.jpg', 'tee-4'],
    4: ['tee-1', 'tee-2', 'tee-3', 'tee-4', 'tee-5'],
    5: ['tee-1', 'tee-2', 'tee-3'],
    6: ['tee-1', 'tee-2'],
    7: ['tee-1', 'tee-2'],
    8: ['tee-1', 'tee-2'],
    9: ['another', 'tee-1', 'tee-2', 'tee-3', 'tee-4'],
    10: ['another-1', 'another-2', 'another-3', 'tee-1', 'tee-2', 'tee-3', 'tee-5'],
    11: ['tee-1'],
    12: ['another-1', 'another-2', 'another-3', 'another-4'],
  };

  const CALEC = {
    1: ['tee-1'],
    2: ['tee-1'],
    3: ['tee-1'],
    4: ['tee-1'],
    5: ['tee-1'],
    6: ['tee-1'],
    12: ['another-1', 'another-2', 'tee-1', 'tee-2', 'tee-3'],
    13: ['another-1', 'tee-1', 'tee-2', 'tee-3', 'tee-4', 'tee-5'],
    14: ['tee-1'],
    15: ['another-1'],
    16: ['tee-1', 'tee-2'],
    17: ['another-1', 'another-2'],
  };

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ', kicker: 'МУЗЫКАЛЬНЫЙ ЛЕЙБЛ / ВИЗУАЛЬНАЯ СИСТЕМА',
      lead: 'Принты, обложки альбомов, винил и мерч для CARNIVAL RECORDS.',
      carnival: 'CARNIVAL PRINT', calec: 'CALEC PRINT', album: 'ALBUM', merch: 'MERCH',
      covers: 'ОБЛОЖКИ', vinyl: 'ВИНИЛ', albumMerch: 'МЕРЧ АЛЬБОМА',
      hover: 'Наведите на принт: сначала показываются альтернативы, затем футболки.',
      tap: 'Нажмите на принт, чтобы посмотреть все варианты.', prev: 'НАЗАД', next: 'ДАЛЬШЕ',
    },
    en: {
      close: 'CLOSE', kicker: 'MUSIC LABEL / VISUAL SYSTEM',
      lead: 'Prints, album artwork, vinyl and merchandise for CARNIVAL RECORDS.',
      carnival: 'CARNIVAL PRINT', calec: 'CALEC PRINT', album: 'ALBUM', merch: 'MERCH',
      covers: 'ALBUM ARTWORK', vinyl: 'VINYL', albumMerch: 'ALBUM MERCH',
      hover: 'Hover over a print: alternatives appear first, followed by T-shirt applications.',
      tap: 'Tap a print to view every variation.', prev: 'PREV', next: 'NEXT',
    },
  };

  let modal = null;
  let bodyOverflow = '';
  let htmlOverflow = '';
  const lang = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function printGroups(prefix, folder, total, variants) {
    return range(total).map((n) => {
      const files = [`${prefix}-${n}.jpg`, ...(variants[n] || []).map((token) =>
        token.endsWith('.jpg') ? token : `${prefix}-${n}-${token}.jpg`
      )];
      return {
        label: `${prefix.replace('_', ' ').toUpperCase()} ${String(n).padStart(2, '0')}`,
        images: files.map((file) => asset(folder, file)),
      };
    });
  }

  function styles() {
    document.getElementById('cr-style')?.remove();
    const style = el('style');
    style.id = 'cr-style';
    style.textContent = `
      html:has(.cr-modal),body:has(.cr-modal){overflow:hidden!important;background:#050505!important}
      .cr-project-card{cursor:pointer!important}.cr-project-card:focus-visible{outline:3px solid #d71920!important;outline-offset:4px!important}
      .cr-modal{position:fixed;inset:0;z-index:350;overflow:auto;overscroll-behavior:contain;background:#050505;color:#f5f1e8;padding:1.4rem 1rem 5rem;font-family:Arial,Helvetica,sans-serif}
      .cr-inner{width:min(100%,80rem);margin:auto}.cr-head{display:flex;justify-content:space-between;align-items:center;padding:.7rem 0 1rem;margin-bottom:clamp(3rem,7vw,6rem);border-bottom:1px solid rgba(255,255,255,.28)}
      .cr-label,.cr-close,.cr-kicker,.cr-note,.cr-subtitle,.cr-counter,.cr-light button{font-size:.68rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase}
      .cr-label{margin:0;background:#d71920;color:#fff;padding:.45rem .8rem}.cr-close{border:1px solid #fff;background:#fff;color:#050505;padding:.62rem 1rem;cursor:pointer}
      .cr-hero{margin-bottom:clamp(5rem,11vw,10rem)}.cr-kicker{margin:0 0 1.2rem;color:#d71920}.cr-title{max-width:10ch;margin:0;font-size:clamp(4.1rem,15vw,13rem);font-weight:900;line-height:.72;letter-spacing:-.095em;text-transform:uppercase}
      .cr-lead{max-width:55rem;margin:2rem 0 0;font-size:clamp(1.25rem,2.6vw,2.6rem);font-weight:800;line-height:.95;letter-spacing:-.05em;text-transform:uppercase}
      .cr-section{border-top:1px solid rgba(255,255,255,.28);padding-top:1.25rem}.cr-section+.cr-section{margin-top:clamp(5rem,10vw,9rem)}
      .cr-h{margin:0 0 1rem;font-size:clamp(3rem,8vw,8rem);font-weight:900;line-height:.78;letter-spacing:-.085em;text-transform:uppercase}.cr-note{margin:0 0 1.5rem;color:rgba(255,255,255,.55);line-height:1.45}.cr-note-mobile{display:none}
      .cr-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.cr-card{position:relative;width:100%;padding:0;border:1px solid rgba(255,255,255,.2);background:#111;color:#fff;overflow:hidden;cursor:zoom-in}.cr-media{position:relative;display:block;aspect-ratio:1/1;background:#111;overflow:hidden}
      .cr-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#111;opacity:0;transition:opacity .42s ease}.cr-img.active{opacity:1}.cr-card-label{position:absolute;left:.65rem;bottom:.65rem;z-index:2;padding:.42rem .55rem;background:#050505;font-size:.58rem;font-weight:900;letter-spacing:.17em;text-transform:uppercase;pointer-events:none}
      .cr-subgroup+.cr-subgroup{margin-top:3rem}.cr-subtitle{margin:0 0 1rem;color:#d71920}
      .cr-light{position:fixed;inset:0;z-index:900130;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:1rem;padding:1rem;background:rgba(0,0,0,.96)}.cr-stage{display:flex;align-items:center;justify-content:center;height:calc(100dvh - 2rem);min-width:0}.cr-light-img{max-width:100%;max-height:90dvh;object-fit:contain}
      .cr-light-close{position:absolute;top:max(1rem,env(safe-area-inset-top));right:max(1rem,env(safe-area-inset-right));z-index:3;border:1px solid #fff;background:#fff;color:#050505;padding:.7rem 1rem}.cr-nav{width:3.2rem;height:3.2rem;border:1px solid #fff;background:#050505;color:#fff}.cr-counter{position:absolute;left:50%;bottom:max(1rem,env(safe-area-inset-bottom));transform:translateX(-50%);margin:0;padding:.45rem .65rem;background:#fff;color:#050505}
      @media(max-width:900px){.cr-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:600px){.cr-modal{padding:1rem .85rem 5rem}.cr-title{font-size:clamp(3.6rem,20vw,6.4rem)}.cr-grid{grid-template-columns:1fr}.cr-note-desktop{display:none}.cr-note-mobile{display:block}.cr-light{grid-template-columns:1fr;padding:.75rem}.cr-stage{height:calc(100dvh - 1.5rem)}.cr-nav{position:absolute;bottom:max(1rem,env(safe-area-inset-bottom));z-index:3}.cr-prev{left:max(1rem,env(safe-area-inset-left))}.cr-next{right:max(1rem,env(safe-area-inset-right))}.cr-counter{bottom:1.65rem}}
      @media(hover:none),(pointer:coarse){.cr-img:not(:first-child){display:none}}
    `;
    document.head.append(style);
  }

  function lock() {
    bodyOverflow = document.body.style.overflow;
    htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  function unlock() {
    document.body.style.overflow = bodyOverflow;
    document.documentElement.style.overflow = htmlOverflow;
  }
  function closeModal() {
    document.querySelector('.cr-light')?.remove();
    modal?.remove();
    modal = null;
    unlock();
  }

  function lightbox(images, start = 0) {
    document.querySelector('.cr-light')?.remove();
    let index = start;
    const copy = COPY[lang()];
    const overlay = el('div', 'cr-light');
    const prev = el('button', 'cr-nav cr-prev', '←');
    const next = el('button', 'cr-nav cr-next', '→');
    const close = el('button', 'cr-light-close', copy.close);
    const stage = el('div', 'cr-stage');
    const image = el('img', 'cr-light-img');
    const counter = el('p', 'cr-counter');
    prev.type = next.type = close.type = 'button';
    prev.setAttribute('aria-label', copy.prev);
    next.setAttribute('aria-label', copy.next);
    const draw = () => { image.src = images[index]; counter.textContent = `${index + 1} / ${images.length}`; };
    const step = (n) => { index = (index + n + images.length) % images.length; draw(); };
    prev.onclick = (event) => { event.stopPropagation(); step(-1); };
    next.onclick = (event) => { event.stopPropagation(); step(1); };
    close.onclick = () => overlay.remove();
    image.onclick = (event) => { event.stopPropagation(); step(1); };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = () => overlay.remove();
    stage.append(image);
    overlay.append(prev, stage, next, close, counter);
    document.body.append(overlay);
    draw();
  }

  function card(item, eager = false) {
    const button = el('button', 'cr-card');
    const media = el('span', 'cr-media');
    button.type = 'button';
    const layers = item.images.map((src, index) => {
      const image = el('img', `cr-img${index === 0 ? ' active' : ''}`);
      image.src = src;
      image.alt = `${item.label} ${index + 1}`;
      image.loading = eager && index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      media.append(image);
      return image;
    });
    let active = 0;
    let timer = null;
    const show = (index) => {
      active = index;
      layers.forEach((layer, layerIndex) => layer.classList.toggle('active', layerIndex === index));
    };
    if (layers.length > 1 && HOVER.matches) {
      button.onmouseenter = () => {
        clearInterval(timer);
        show(1);
        timer = setInterval(() => show(active + 1 >= layers.length ? 1 : active + 1), 900);
      };
      button.onmouseleave = () => {
        clearInterval(timer);
        timer = null;
        show(0);
      };
    }
    button.onclick = (event) => {
      event.stopPropagation();
      lightbox(item.images);
    };
    button.append(media, el('span', 'cr-card-label', item.label));
    return button;
  }

  function grid(items) {
    const node = el('div', 'cr-grid');
    items.forEach((item, index) => node.append(card(item, index < 2)));
    return node;
  }
  function section(title, content, note = false) {
    const copy = COPY[lang()];
    const node = el('section', 'cr-section');
    node.append(el('h2', 'cr-h', title));
    if (note) node.append(
      el('p', 'cr-note cr-note-desktop', copy.hover),
      el('p', 'cr-note cr-note-mobile', copy.tap),
    );
    node.append(content);
    return node;
  }
  function subgroup(title, items) {
    const node = el('div', 'cr-subgroup');
    node.append(el('h3', 'cr-subtitle', title), grid(items));
    return node;
  }

  function openModal() {
    styles();
    closeModal();
    lock();
    const copy = COPY[lang()];
    modal = el('div', 'cr-modal');
    const inner = el('div', 'cr-inner');
    const header = el('div', 'cr-head');
    const close = el('button', 'cr-close', copy.close);
    close.type = 'button';
    close.onclick = closeModal;
    header.append(el('p', 'cr-label', 'CARNIVAL RECORDS'), close);
    const hero = el('section', 'cr-hero');
    hero.append(
      el('p', 'cr-kicker', copy.kicker),
      el('h1', 'cr-title', 'CARNIVAL RECORDS'),
      el('p', 'cr-lead', copy.lead),
    );

    const carnival = printGroups('carnival_print', 'carnival-print', 12, CARNIVAL);
    const calec = printGroups('calec-print', 'calec-print', 17, CALEC);
    const album = el('div');
    album.append(
      subgroup(copy.covers, range(8).map((n) => ({ label: `ALBUM ${String(n).padStart(2, '0')}`, images: [asset('album', `album-${n}.jpg`)] }))),
      subgroup(copy.vinyl, range(8).map((n) => ({ label: `VINYL ${String(n).padStart(2, '0')}`, images: [asset('album', `vinyl-${n}.jpg`)] }))),
      subgroup(copy.albumMerch, range(5).map((n) => ({ label: `MERCHALBUM ${String(n).padStart(2, '0')}`, images: [asset('album', `merchalbum-${n}.jpg`)] }))),
    );
    const merch = [
      { label: 'MERCH 01', images: [asset('merch', 'merch-1.jpg'), asset('merch', 'merch-1-another-1.jpg')] },
      ...range(3).map((n) => ({ label: `MERCH ${String(n + 1).padStart(2, '0')}`, images: [asset('merch', `merch-${n + 1}.jpg`)] })),
    ];

    inner.append(
      header,
      hero,
      section(copy.carnival, grid(carnival), true),
      section(copy.calec, grid(calec), true),
      section(copy.album, album),
      section(copy.merch, grid(merch), true),
    );
    modal.append(inner);
    document.body.append(modal);
  }

  function findCard() {
    return [...document.querySelectorAll('#works article,#works button')].find((node) =>
      node.querySelector('h3')?.textContent?.trim().toUpperCase() === 'CARNIVAL RECORDS'
    );
  }
  function markCard() {
    const project = findCard();
    if (!project) return;
    project.classList.add('cr-project-card');
    project.tabIndex = 0;
    project.setAttribute('role', 'button');
    project.setAttribute('aria-label', lang() === 'ru' ? 'Открыть проект CARNIVAL RECORDS' : 'Open CARNIVAL RECORDS project');
  }

  [0, 150, 600, 1400].forEach((delay) => setTimeout(markCard, delay));
  addEventListener('load', markCard);
  document.addEventListener('click', (event) => {
    const project = event.target.closest('#works article,#works button');
    if (project?.querySelector('h3')?.textContent?.trim().toUpperCase() !== 'CARNIVAL RECORDS') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openModal();
  }, true);
  document.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target?.classList?.contains('cr-project-card')) {
      event.preventDefault();
      openModal();
    }
  });
  new MutationObserver(() => {
    markCard();
    if (!modal) return;
    const top = modal.scrollTop;
    openModal();
    modal.scrollTop = top;
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
