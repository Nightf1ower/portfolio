(() => {
  if (window.__postersGalleryCleanV5) return;
  window.__postersGalleryCleanV5 = true;

  const VERSION = 'posters-gallery-clean-5';
  const manifest = window.PORTFOLIO_GALLERY_MANIFEST || {};
  const SOURCE = Array.isArray(manifest.posters) ? manifest.posters : [];
  const MAX_PARALLEL = 6;

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
      klubiqueTitle: 'KLUBIQUE PARTY',
      klubiqueText: 'Постер для KLUBIQUE PARTY был собран на основе моих предыдущих визуальных экспериментов и идей команды. Вся работа выполнена полностью вручную, без использования Photoshop: ножницы, принтер, бумага, сканер, ручная графика и физическая сборка коллажа. В ход пошли практически все доступные средства, чтобы сохранить живую, неровную и тактильную эстетику изображения.',
      yasnoTitle: 'YASNO PARTY',
      yasnoText: 'Главным визуальным референсом для серии постеров YASNO PARTY стал блок знакомств из старого российского журнала начала 2000-х. Нарочито низкое качество печати, хаотичная верстка, фотографии и характерная типографика того времени легли в основу всей айдентики события. Серия наполнена большим количеством небольших отсылок и деталей — как в основном постере, так и в персональных постерах участников.',
      bdayTitle: 'B-DAY PARTY',
      bdayText: 'Основная идея постера — показать узнаваемый символ праздника, но уйти от привычной чистой и праздничной эстетики. Знакомый образ намеренно помещен в более грязную и грубую визуальную среду: потертости, шум, несовершенная печать и текстуры создают ощущение немного испорченного, но живого праздничного артефакта.',
      finalPoster: 'FINAL POSTER',
      mainInspiration: 'MAIN INSPIRATION',
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
      klubiqueTitle: 'KLUBIQUE PARTY',
      klubiqueText: 'The KLUBIQUE PARTY poster was created using elements of my previous visual experiments combined with ideas from the team. The entire piece was made by hand without using Photoshop — scissors, a printer, paper, a scanner, hand-drawn graphics, and physical collage techniques were all part of the process. Almost every available tool was used to preserve the raw, imperfect, and tactile character of the final image.',
      yasnoTitle: 'YASNO PARTY',
      yasnoText: 'The main visual reference for the YASNO PARTY poster series was a personal ads section from an old Russian magazine from the early 2000s. Intentionally poor print quality, chaotic layouts, photography, and period-specific typography became the foundation of the event’s visual identity. The series is filled with small references and hidden details appearing throughout both the main poster and the individual participant posters.',
      bdayTitle: 'B-DAY PARTY',
      bdayText: 'The main idea behind the poster was to take a recognizable symbol of celebration and move it away from the usual clean and polished party aesthetic. The familiar image is intentionally placed in a rougher visual environment, with distressed textures, noise, imperfect printing, and imperfections creating the feeling of a slightly damaged yet alive party artifact.',
      finalPoster: 'FINAL POSTER',
      mainInspiration: 'MAIN INSPIRATION',
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

  const baseName = item => String(item?.name || item?.src || '')
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
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
  let activeLoads = 0;
  let lightboxRenderToken = 0;
  const loadQueue = [];
  const thumbBySource = new Map();

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function installStyles() {
    const id = 'posters-gallery-clean-style';
    document.getElementById(id)?.remove();

    const style = el('style');
    style.id = id;
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.pcg-modal), body:has(.pcg-modal) { overflow:hidden !important; }
      .pcg-modal { position:fixed; inset:0; z-index:950000; box-sizing:border-box; width:100vw; height:100dvh; overflow-y:auto; overflow-x:hidden; overscroll-behavior:contain; padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) 0 max(1rem,env(safe-area-inset-left)); background:#56876D; color:#050505; }
      .pcg-inner { width:100%; max-width:none; margin:0; background:#56876D; }
      .pcg-head { position:sticky; top:0; z-index:30; box-sizing:border-box; width:100vw; margin-left:calc(50% - 50vw); display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:.7rem max(1rem,env(safe-area-inset-right)) 1rem max(1rem,env(safe-area-inset-left)); background:rgba(44,61,85,.96); color:#fff; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
      .pcg-label,.pcg-close { margin:0; border:0; padding:.7rem 1rem; background:#050505; color:#fff; font:900 .68rem/1 Arial,Helvetica,sans-serif; letter-spacing:.25em; text-transform:uppercase; }
      .pcg-close { cursor:pointer; }
      .pcg-hero { box-sizing:border-box; width:100vw; margin-left:calc(50% - 50vw); padding:clamp(3.5rem,8vw,7rem) max(1rem,env(safe-area-inset-right)) clamp(3rem,6vw,5rem) max(1rem,env(safe-area-inset-left)); background:#2C3D55; color:#fff; }
      .pcg-title { margin:0; font:900 clamp(4.2rem,14vw,13rem)/.82 Arial,Helvetica,sans-serif; letter-spacing:-.075em; text-transform:uppercase; }
      .pcg-intro,.pcg-copy,.pcg-party-copy { box-sizing:border-box; width:100%; max-width:none; padding-right:clamp(0rem,8vw,9rem); font:500 clamp(1rem,1.25vw,1.3rem)/1.42 Arial,Helvetica,sans-serif; letter-spacing:-.015em; }
      .pcg-intro { margin:clamp(1.5rem,3vw,2.5rem) 0 0; }
      .pcg-copy { margin:0 0 clamp(2rem,4vw,3.5rem); }
      .pcg-party-copy { margin:0 0 clamp(2rem,4vw,3.5rem); }
      .pcg-section { position:relative; box-sizing:border-box; margin:0; padding:clamp(3.25rem,6vw,6rem) 0; border:0; }
      .pcg-section-title { margin:0 0 clamp(1rem,2vw,1.5rem); font:900 clamp(2.8rem,7vw,7.5rem)/.84 Arial,Helvetica,sans-serif; letter-spacing:-.07em; text-transform:uppercase; }
      .pcg-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1rem; align-items:start; }
      .pcg-card { display:block; width:100%; margin:0; padding:0; border:0; outline:0; background:transparent; box-shadow:none; cursor:zoom-in; }
      .pcg-card img { display:block; width:100%; height:auto; margin:0; padding:0; border:0; outline:0; background:transparent; box-shadow:none; object-fit:contain; opacity:0; transition:opacity .14s ease; }
      .pcg-card img.is-loaded { opacity:1; }

      .pcg-section--italy { width:100vw; margin-left:calc(50% - 50vw); padding-left:max(1rem,env(safe-area-inset-left)); padding-right:max(1rem,env(safe-area-inset-right)); background:#2C3D55; color:#fff; }

      .pcg-events-section { width:100vw; margin-left:calc(50% - 50vw); padding:0; background:#56876D; color:#050505; }
      .pcg-events-intro { box-sizing:border-box; width:100%; margin:0; padding:clamp(3.25rem,6vw,6rem) max(1rem,env(safe-area-inset-right)) clamp(2.5rem,5vw,4.5rem) max(1rem,env(safe-area-inset-left)); background:#2C3D55; color:#fff; }

      .pcg-event-block { box-sizing:border-box; width:100%; margin:0; }
      .pcg-event-subtitle { margin:0 0 clamp(1.5rem,3vw,2.5rem); font:900 clamp(1.65rem,3vw,3.25rem)/.92 Arial,Helvetica,sans-serif; letter-spacing:-.045em; text-transform:uppercase; }
      .pcg-event-feature { width:min(100%,78rem); margin:0 auto clamp(1rem,2vw,1.5rem); }
      .pcg-event-row { display:grid; gap:1rem; align-items:start; margin-top:1rem; }
      .pcg-event-row--4 { grid-template-columns:repeat(4,minmax(0,1fr)); }
      .pcg-event-row--3 { grid-template-columns:repeat(3,minmax(0,1fr)); }
      .pcg-event-row--2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .pcg-labelled-card { min-width:0; }
      .pcg-card-label { margin:0 0 .8rem; font:900 clamp(.72rem,1vw,.95rem)/1 Arial,Helvetica,sans-serif; letter-spacing:.18em; text-transform:uppercase; }

      .pcg-event-block--klubique { padding:clamp(3.5rem,6vw,6rem) max(1rem,env(safe-area-inset-right)) clamp(4rem,7vw,7rem) max(1rem,env(safe-area-inset-left)); background:linear-gradient(180deg,#2C3D55 0%,#2C3D55 8%,#667487 24%,#a9b1bc 36%,#dfe2e6 47%,#fff 58%,#fff 100%); color:#fff; }
      .pcg-event-block--yasno { padding:max(4rem,7vw) max(1rem,env(safe-area-inset-right)); background:linear-gradient(180deg,#fff 0%,#fff 8%,#e9efec 24%,#cad8d0 40%,#9db9aa 58%,#739986 74%,#56876D 90%,#56876D 100%); color:#050505; }
      .pcg-event-block--bday { padding:clamp(4rem,7vw) max(1rem,env(safe-area-inset-right)) clamp(5rem,8vw) max(1rem,env(safe-area-inset-left)); background:#56876D; color:#050505; }

      .pcg-flawa-section,.pcg-after-events-section { width:100vw; margin-left:calc(50% - 50vw); padding-left:max(1rem,env(safe-area-inset-left)); padding-right:max(1rem,env(safe-area-inset-right)); background:#56876D; color:#050505; }
      .pcg-after-events-section:last-child { padding-bottom:max(5rem,env(safe-area-inset-bottom)); }
      .pcg-flawa-section:last-child { padding-bottom:max(5rem,env(safe-area-inset-bottom)); }

      .pcg-light { position:fixed; inset:0; z-index:990000; display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center; gap:clamp(.5rem,2vw,1.25rem); padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left)); background:rgba(0,0,0,.97); color:#fff; touch-action:none; }
      .pcg-light-stage { position:relative; min-width:0; height:calc(100dvh - 2rem); display:flex; align-items:center; justify-content:center; overflow:hidden; }
      .pcg-light-stage::after { content:''; position:absolute; width:2.5rem; height:2.5rem; border:3px solid rgba(255,255,255,.25); border-top-color:#fff; border-radius:50%; animation:pcg-spin .8s linear infinite; }
      .pcg-light-stage.is-loaded::after { display:none; }
      @keyframes pcg-spin { to { transform:rotate(360deg); } }
      .pcg-light-image { display:block; max-width:100%; max-height:92dvh; width:auto; height:auto; object-fit:contain; opacity:0; transition:opacity .12s ease; user-select:none; -webkit-user-drag:none; }
      .pcg-light-stage.is-loaded .pcg-light-image { opacity:1; }
      .pcg-light-nav,.pcg-light-close { border:1px solid rgba(255,255,255,.72); background:#050505; color:#fff; cursor:pointer; font-family:Arial,Helvetica,sans-serif; font-weight:900; }
      .pcg-light-nav { width:3.3rem; height:3.3rem; font-size:1.5rem; }
      .pcg-light-close { position:absolute; top:max(1rem,env(safe-area-inset-top)); right:max(1rem,env(safe-area-inset-right)); z-index:2; padding:.72rem .95rem; font-size:.68rem; letter-spacing:.2em; }
      .pcg-top { position:fixed; right:max(1rem,env(safe-area-inset-right)); bottom:max(1rem,env(safe-area-inset-bottom)); z-index:960000; display:grid; place-items:center; width:3.5rem; height:3.5rem; margin:0; padding:0; border:1px solid #050505; background:#fff; color:#050505; font:900 1.55rem/1 Arial,Helvetica,sans-serif; cursor:pointer; opacity:0; visibility:hidden; transform:translateY(.7rem); transition:opacity .18s ease,transform .18s ease,visibility .18s ease; }
      .pcg-top.is-visible { opacity:1; visibility:visible; transform:translateY(0); }

      @media(max-width:920px){
        .pcg-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        .pcg-event-row--4 { grid-template-columns:repeat(2,minmax(0,1fr)); }
      }
      @media(max-width:620px),(hover:none),(pointer:coarse){
        .pcg-title { font-size:clamp(3rem,16vw,6rem); }
        .pcg-intro,.pcg-copy,.pcg-party-copy { padding-right:0; font-size:1rem; line-height:1.45; }
        .pcg-grid,.pcg-event-row--4,.pcg-event-row--3,.pcg-event-row--2 { grid-template-columns:1fr; gap:.8rem; }
        .pcg-event-feature { width:100%; }
        .pcg-light { grid-template-columns:1fr; padding:.75rem; }
        .pcg-light-nav { display:none; }
        .pcg-light-stage { height:calc(100dvh - 1.5rem); }
        .pcg-top { width:3.1rem; height:3.1rem; }
      }
    `;
    document.head.append(style);
  }

  function groups() {
    const copy = COPY[language()];
    const used = new Set();
    const take = (title, description, predicate, type = 'standard') => {
      const groupItems = POSTERS.filter(item => !used.has(item.src) && predicate(item));
      groupItems.forEach(item => used.add(item.src));
      return groupItems.length ? { title, description, items: groupItems, type } : null;
    };
    return [
      take(copy.italyTitle, copy.italyText, isItaly, 'italy'),
      take(copy.eventsTitle, copy.eventsText, isEvent, 'events'),
      take(copy.flawaTitle, copy.flawaText, isFlawa, 'flawa'),
      take(copy.otherTitle, '', () => true, 'after-events'),
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

  function finishThumb(image) {
    const done = async () => {
      try { await image.decode(); } catch {}
      image.classList.add('is-loaded');
      image.dataset.loaded = '1';
      activeLoads = Math.max(0, activeLoads - 1);
      pumpQueue();
    };
    done();
  }

  function startThumb(image) {
    const source = image?.dataset.src;
    if (!source || image.dataset.loading === '1' || image.dataset.loaded === '1') return;
    image.dataset.loading = '1';
    image.removeAttribute('data-queued');
    activeLoads += 1;
    image.fetchPriority = image.dataset.priority === 'high' ? 'high' : 'low';
    image.addEventListener('load', () => finishThumb(image), { once:true });
    image.addEventListener('error', () => finishThumb(image), { once:true });
    image.src = source;
    image.removeAttribute('data-src');
  }

  function pumpQueue() {
    while (activeLoads < MAX_PARALLEL && loadQueue.length) {
      const image = loadQueue.shift();
      if (!image?.isConnected || image.dataset.loaded === '1' || image.dataset.loading === '1') continue;
      startThumb(image);
    }
  }

  function queueThumb(image, priority = false) {
    if (!image || image.dataset.loaded === '1' || image.dataset.loading === '1') return;
    if (priority) image.dataset.priority = 'high';
    if (image.dataset.queued === '1') {
      if (priority) {
        const index = loadQueue.indexOf(image);
        if (index > 0) {
          loadQueue.splice(index, 1);
          loadQueue.unshift(image);
        }
      }
      return;
    }
    image.dataset.queued = '1';
    priority ? loadQueue.unshift(image) : loadQueue.push(image);
    pumpQueue();
  }

  function resetLoader() {
    observer?.disconnect();
    observer = null;
    loadQueue.length = 0;
    activeLoads = 0;
    thumbBySource.clear();
  }

  function setupObserver() {
    observer?.disconnect();
    if (!modal) return;
    if (!('IntersectionObserver' in window)) {
      modal.querySelectorAll('img[data-src]').forEach(image => queueThumb(image));
      return;
    }
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        queueThumb(entry.target);
      });
    }, { root:modal, rootMargin:'1200px 0px', threshold:.01 });
    modal.querySelectorAll('img[data-src]').forEach(image => observer.observe(image));
  }

  function warmAround(index) {
    [-2,-1,1,2].forEach(offset => {
      const item = items[(index + offset + items.length) % items.length];
      const thumb = thumbBySource.get(item?.src);
      if (thumb) queueThumb(thumb, true);
    });
  }

  function renderLightbox() {
    if (!lightbox || !items.length) return;
    const token = ++lightboxRenderToken;
    const item = items[activeIndex];
    const stage = lightbox.querySelector('.pcg-light-stage');
    stage.classList.remove('is-loaded');
    stage.replaceChildren();

    const image = el('img');
    image.className = 'pcg-light-image';
    image.alt = item.alt || item.name || 'Poster';
    image.draggable = false;
    image.loading = 'eager';
    image.fetchPriority = 'high';
    stage.append(image);

    const thumb = thumbBySource.get(item.src);
    const previewSrc = thumb?.complete && thumb.naturalWidth
      ? (thumb.currentSrc || thumb.src)
      : (item.thumb || item.src);

    const showPreview = () => {
      if (token !== lightboxRenderToken || !lightbox) return;
      stage.classList.add('is-loaded');
    };

    image.addEventListener('load', showPreview, { once:true });
    image.src = previewSrc;
    if (image.complete && image.naturalWidth) showPreview();

    if (previewSrc !== item.src) {
      const full = new Image();
      full.decoding = 'async';
      full.fetchPriority = 'high';
      full.onload = async () => {
        try { await full.decode(); } catch {}
        if (token !== lightboxRenderToken || !lightbox) return;
        image.src = item.src;
        stage.classList.add('is-loaded');
      };
      full.src = item.src;
    }

    warmAround(activeIndex);
  }

  function closeLightbox() {
    lightboxRenderToken += 1;
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
    const next = el('button', 'pcg-light-nav', '→');
    const close = el('button', 'pcg-light-close', COPY[language()].close);
    previous.type = next.type = close.type = 'button';
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
    }, { passive:true });
    overlay.addEventListener('touchend', event => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) stepLightbox(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) closeLightbox();
    }, { passive:true });

    overlay.append(previous, stage, next, close);
    document.body.append(overlay);
    lightbox = overlay;
    renderLightbox();
  }

  function closeModal() {
    closeLightbox();
    resetLoader();
    modal?.remove();
    modal = null;
    items = [];
    unlockPage();
  }

  function createCard(item, extraClass = '') {
    if (!item) return null;
    const index = items.findIndex(entry => entry.src === item.src);
    const card = el('button', `pcg-card${extraClass ? ` ${extraClass}` : ''}`);
    const image = el('img');
    card.type = 'button';
    card.setAttribute('aria-label', COPY[language()].open);
    image.dataset.src = item.thumb || item.src;
    image.dataset.original = item.src;
    image.alt = item.alt || item.name || 'Poster';
    image.decoding = 'async';
    image.loading = 'lazy';
    image.fetchPriority = 'low';
    image.draggable = false;
    thumbBySource.set(item.src, image);
    const prioritize = () => queueThumb(image, true);
    card.addEventListener('pointerenter', prioritize, { passive:true });
    card.addEventListener('focus', prioritize, { passive:true });
    card.onclick = event => {
      event.preventDefault();
      event.stopPropagation();
      prioritize();
      openLightbox(index);
    };
    card.append(image);
    return card;
  }

  function findByBase(groupItems, ...names) {
    const accepted = new Set(names.map(name => name.toLowerCase()));
    return groupItems.find(item => accepted.has(baseName(item))) || null;
  }

  function findFaceSeries(groupItems, prefix, count) {
    return Array.from({ length: count }, (_, index) =>
      findByBase(groupItems, `${prefix}-face-${index + 1}`)
    ).filter(Boolean);
  }

  function appendRow(parent, className, rowItems) {
    const available = rowItems.filter(Boolean);
    if (!available.length) return;
    const row = el('div', `pcg-event-row ${className}`);
    available.forEach(item => {
      const card = createCard(item);
      if (card) row.append(card);
    });
    parent.append(row);
  }

  function createLabelledCard(item, labelText) {
    if (!item) return null;
    const wrap = el('div', 'pcg-labelled-card');
    wrap.append(el('p', 'pcg-card-label', labelText));
    const card = createCard(item);
    if (card) wrap.append(card);
    return wrap;
  }

  function appendPartyCopy(block, text) {
    if (text) block.append(el('p', 'pcg-party-copy', text));
  }

  function createEventSection(group) {
    const copy = COPY[language()];
    const section = el('section', 'pcg-section pcg-events-section');
    const intro = el('div', 'pcg-events-intro');
    intro.append(el('h2', 'pcg-section-title', group.title));
    if (group.description) intro.append(el('p', 'pcg-copy', group.description));
    section.append(intro);

    const klubiqueMain = findByBase(group.items, 'party-3');
    const klubiqueFaces = findFaceSeries(group.items, 'party-3', 7);
    const yasnoFinal = findByBase(group.items, 'party-2');
    const yasnoInspiration = findByBase(group.items, 'party-2-isnpiration', 'party-2-inspiration');
    const yasnoFaces = findFaceSeries(group.items, 'party-2', 7);
    const bdayMain = findByBase(group.items, 'party-1');

    if (klubiqueMain || klubiqueFaces.length) {
      const block = el('div', 'pcg-event-block pcg-event-block--klubique');
      block.append(el('h3', 'pcg-event-subtitle', copy.klubiqueTitle));
      appendPartyCopy(block, copy.klubiqueText);
      if (klubiqueMain) {
        const feature = el('div', 'pcg-event-feature');
        const card = createCard(klubiqueMain);
        if (card) feature.append(card);
        block.append(feature);
      }
      appendRow(block, 'pcg-event-row--4', klubiqueFaces.slice(0, 4));
      appendRow(block, 'pcg-event-row--3', klubiqueFaces.slice(4, 7));
      section.append(block);
    }

    if (yasnoFinal || yasnoInspiration || yasnoFaces.length) {
      const block = el('div', 'pcg-event-block pcg-event-block--yasno');
      block.append(el('h3', 'pcg-event-subtitle', copy.yasnoTitle));
      appendPartyCopy(block, copy.yasnoText);

      const topRow = el('div', 'pcg-event-row pcg-event-row--2');
      const finalCard = createLabelledCard(yasnoFinal, copy.finalPoster);
      const inspirationCard = createLabelledCard(yasnoInspiration, copy.mainInspiration);
      if (finalCard) topRow.append(finalCard);
      if (inspirationCard) topRow.append(inspirationCard);
      if (topRow.children.length) block.append(topRow);

      appendRow(block, 'pcg-event-row--4', yasnoFaces.slice(0, 4));
      appendRow(block, 'pcg-event-row--3', yasnoFaces.slice(4, 7));
      section.append(block);
    }

    if (bdayMain) {
      const block = el('div', 'pcg-event-block pcg-event-block--bday');
      block.append(el('h3', 'pcg-event-subtitle', copy.bdayTitle));
      appendPartyCopy(block, copy.bdayText);
      const feature = el('div', 'pcg-event-feature');
      const card = createCard(bdayMain);
      if (card) feature.append(card);
      block.append(feature);
      section.append(block);
    }

    return section;
  }

  function createSection(group) {
    if (group.type === 'events') return createEventSection(group);

    const classes = ['pcg-section'];
    if (group.type === 'italy') classes.push('pcg-section--italy');
    if (group.type === 'flawa') classes.push('pcg-flawa-section');
    if (group.type === 'after-events') classes.push('pcg-after-events-section');

    const section = el('section', classes.join(' '));
    section.append(el('h2', 'pcg-section-title', group.title));
    if (group.description) section.append(el('p', 'pcg-copy', group.description));
    const grid = el('div', 'pcg-grid');

    group.items.forEach(item => {
      const card = createCard(item);
      if (card) grid.append(card);
    });

    section.append(grid);
    return section;
  }

  function openModal() {
    installStyles();
    closeModal();
    resetLoader();
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
      overlay.scrollTo({ top:0, behavior:'smooth' });
    };
    overlay.addEventListener('scroll', () => top.classList.toggle('is-visible', overlay.scrollTop > 520), { passive:true });

    head.append(label, close);
    hero.append(title, intro);
    inner.append(head, hero);
    sectionGroups.forEach(group => inner.append(createSection(group)));
    overlay.append(inner, top);
    document.body.append(overlay);
    modal = overlay;
    setupObserver();

    const firstImages = [...modal.querySelectorAll('img[data-src]')].slice(0, 9);
    firstImages.forEach((image, index) => queueThumb(image, index < 4));
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
