(() => {
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  const GARMENT_RE = /(tee|tshirt|t-shirt|shirt|hoodie|sweatshirt|sweater|pants|trousers|crewneck|longsleeve|long-sleeve|mockup|worn|wear|product|clothes|merch)/i;
  const INV_RE = /(^|[-_\s])(inv|invert|inverted|inverse)($|[-_\s])/i;
  const REMOVE_RE = /(main|base|original|orig|flat|front|back|mockup|preview|logo|print|blandetto|dentist|market|cap|caps)/gi;

  let blandettoData = null;
  let activeModal = null;

  const aliases = {
    logos: ['logos', 'logo', 'blandetto-logos', 'blandetto logos'],
    cap: ['cap', 'caps', 'кепка'],
    prints: ['prints', 'print', 'blandetto-prints', 'blandetto prints'],
    dentist: ['dentist-market', 'dentist_market', 'dentist market', 'dentist', 'dentist-club', 'dentist club'],
  };

  const injectBlandettoStyles = () => {
    if (document.getElementById('blandetto-dynamic-style')) return;
    const style = document.createElement('style');
    style.id = 'blandetto-dynamic-style';
    style.textContent = `
      .blandetto-section__note, .blandetto-card__meta { display: none !important; }
      .blandetto-card-ready { cursor: pointer !important; }
      .blandetto-card-ready > div { transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease; }
      .blandetto-card-ready:hover > div { background: #050505 !important; color: #ffffff !important; }
      .blandetto-modal { position: fixed; inset: 0; z-index: 120; overflow-y: auto; overscroll-behavior: contain; background: #ffffff; color: #050505; padding: 1.5rem 1rem 3rem; }
      .blandetto-modal__inner { width: min(100%, 80rem); margin: 0 auto; }
      .blandetto-modal__header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; padding: 0.7rem 0 1rem; border-bottom: 1px solid #050505; background: rgba(255,255,255,0.94); backdrop-filter: blur(10px); }
      .blandetto-modal__label, .blandetto-empty { font-size: 0.68rem; font-weight: 900; letter-spacing: 0.28em; text-transform: uppercase; }
      .blandetto-modal__label { display: inline-block; background: #050505; color: #ffffff; padding: 0.35rem 0.75rem; }
      .blandetto-modal__close { border: 1px solid #050505; background: #ffffff; color: #050505; padding: 0.55rem 1rem; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.24em; text-transform: uppercase; transition: background 0.3s ease, color 0.3s ease; }
      .blandetto-modal__close:hover { background: #050505; color: #ffffff; }
      .blandetto-section { border-top: 1px solid rgba(5,5,5,0.42); padding-top: 1.25rem; }
      .blandetto-section + .blandetto-section { margin-top: 5rem; }
      .blandetto-section__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; }
      .blandetto-section__title { margin: 0; font-size: clamp(2.8rem, 6vw, 6.5rem); font-weight: 900; line-height: 0.82; letter-spacing: -0.085em; text-transform: uppercase; }
      .blandetto-section__count { color: rgba(5,5,5,0.5); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase; white-space: nowrap; }
      .blandetto-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; align-items: start; }
      .blandetto-card { position: relative; display: block; width: 100%; border: 0; background: #ffffff; color: inherit; padding: 0; text-align: left; cursor: zoom-in; overflow: hidden; }
      .blandetto-card__media { position: relative; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #ffffff; }
      .blandetto-card__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: center center; padding: 0; transition: opacity 0.3s ease, transform 0.35s ease; }
      .blandetto-card__img--hover { opacity: 0; }
      .blandetto-card--has-hover:hover .blandetto-card__img--main { opacity: 0 !important; }
      .blandetto-card--has-hover:hover .blandetto-card__img--hover { opacity: 1 !important; }
      .blandetto-card:not(.blandetto-card--has-hover):hover .blandetto-card__img--main { opacity: 1 !important; }
      .blandetto-grid--prints .blandetto-card__media { aspect-ratio: 1 / 1 !important; overflow: hidden !important; background: #ffffff !important; }
      .blandetto-grid--prints .blandetto-card__img { width: 100% !important; height: 100% !important; object-fit: contain !important; object-position: center center !important; transform: none !important; }
      .blandetto-grid--prints .blandetto-card:hover .blandetto-card__img { transform: none !important; }
      .blandetto-grid--dentist { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      .blandetto-grid--dentist > *:nth-child(1) { grid-column: 1 !important; grid-row: 1 !important; }
      .blandetto-grid--dentist > *:nth-child(3) { grid-column: 2 !important; grid-row: 1 !important; }
      .blandetto-grid--dentist > *:nth-child(2) { grid-column: 3 !important; grid-row: 1 !important; }
      .blandetto-grid--dentist > *:nth-child(5) { grid-column: 1 !important; grid-row: 2 !important; }
      .blandetto-grid--dentist > *:nth-child(4) { grid-column: 2 !important; grid-row: 2 !important; }
      .blandetto-grid--dentist > *:nth-child(6) { grid-column: 3 !important; grid-row: 2 !important; }
      .blandetto-cap-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(17rem, 0.55fr); gap: 1rem; align-items: start; }
      .blandetto-cap-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
      .blandetto-cap-card { display: block; width: 100%; border: 0; background: transparent; padding: 0; text-align: left; cursor: zoom-in; }
      .blandetto-cap-card__media { background: #fff; overflow: hidden; }
      .blandetto-cap-card__img { display: block; width: 100%; height: auto; object-fit: contain; }
      .blandetto-cap-card__caption, .blandetto-cap-reference__caption { margin: 0.55rem 0 0; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.23em; line-height: 1; text-transform: uppercase; color: rgba(5,5,5,0.55); }
      .blandetto-cap-reference { position: sticky; top: 5.5rem; }
      .blandetto-cap-reference__media { background: #fff; padding: 1rem; }
      .blandetto-cap-reference__img { display: block; width: 100%; height: auto; object-fit: contain; }
      .blandetto-cap-reference__caption { box-sizing: border-box; padding-left: 1rem; padding-right: 1rem; max-width: 100%; }
      .blandetto-lightbox { position: fixed; inset: 0; z-index: 160; display: flex; align-items: center; justify-content: center; background: rgba(5,5,5,0.92); padding: 1.25rem; }
      .blandetto-lightbox__img { max-width: 92vw; max-height: 90vh; object-fit: contain; }
      .blandetto-lightbox__close { position: absolute; right: 1rem; top: 1rem; border: 1px solid #fff; background: #fff; color: #050505; padding: 0.55rem 1rem; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.24em; text-transform: uppercase; }
      .blandetto-lightbox__nav { position: absolute; top: 50%; z-index: 3; width: 3.5rem; height: 3.5rem; transform: translateY(-50%); border: 1px solid #fff; background: #fff; color: #050505; font-size: 2rem; font-weight: 900; line-height: 1; }
      .blandetto-lightbox__nav--prev { left: 1rem; }
      .blandetto-lightbox__nav--next { right: 1rem; }
      .blandetto-lightbox__counter { position: absolute; left: 50%; bottom: 1rem; transform: translateX(-50%); margin: 0; background: #fff; color: #050505; padding: 0.45rem 0.75rem; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.22em; text-transform: uppercase; }
      body:has(.blandetto-modal), body:has(.blandetto-lightbox) { overflow: hidden !important; }
      @media (max-width: 900px) { .blandetto-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .blandetto-grid--dentist { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } .blandetto-grid--dentist > * { grid-column: auto !important; grid-row: auto !important; } .blandetto-cap-layout { grid-template-columns: 1fr; } .blandetto-cap-reference { position: static; } }
      @media (max-width: 560px) { .blandetto-grid, .blandetto-cap-grid { grid-template-columns: 1fr; } .blandetto-section__head { display: block; } .blandetto-section__count { display: block; margin-top: 0.75rem; } }
    `;
    document.head.append(style);
  };

  const normalize = (value) => decodeURIComponent(value || '').toLowerCase().replace(/[_\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const fileName = (path) => (path || '').split('/').pop() || path;
  const cleanTitle = (value) => (value || '').replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
  const apiUrl = (path) => `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;

  const fetchJson = async (url, timeout = 9000) => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      window.clearTimeout(timer);
    }
  };

  const readDirectoryRecursive = async (path) => {
    const items = await fetchJson(apiUrl(path));
    const list = Array.isArray(items) ? items : [items];
    const out = [];
    for (const item of list) {
      if (item.type === 'dir') {
        out.push(...await readDirectoryRecursive(item.path));
      } else if (item.type === 'file' && IMAGE_RE.test(item.name || item.path)) {
        out.push({ path: item.path, url: item.download_url || `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path}` });
      }
    }
    return out;
  };

  const loadAllAssets = async () => {
    const bases = ['public/works/blandetto', 'public/blandetto', 'works/blandetto', 'blandetto'];
    let lastError = null;
    for (const base of bases) {
      try {
        const files = await readDirectoryRecursive(base);
        if (files.length) return files;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('No Blandetto assets found');
  };

  const hasAliasSegment = (path, words) => {
    const set = new Set(words.map(normalize));
    return path.split('/').some((segment) => set.has(normalize(segment)));
  };

  const getSectionFiles = (files, section) => files.filter((asset) => hasAliasSegment(asset.path, aliases[section]));

  const inferGroupKey = (path, section) => {
    const parts = path.split('/');
    const set = new Set((aliases[section] || []).map(normalize));
    const sectionIndex = parts.findIndex((part) => set.has(normalize(part)));
    if (sectionIndex >= 0 && parts.length > sectionIndex + 2) return normalize(parts[sectionIndex + 1]);

    let base = fileName(path).replace(/\.[^.]+$/, '').toLowerCase();
    base = decodeURIComponent(base).replace(INV_RE, ' ').replace(GARMENT_RE, ' ').replace(REMOVE_RE, ' ');
    base = base.replace(/[_\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return base || normalize(fileName(path).replace(/\.[^.]+$/, ''));
  };

  const groupAssets = (files, section) => {
    const map = new Map();
    files.forEach((asset) => {
      const key = inferGroupKey(asset.path, section);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(asset);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([key, assets]) => {
        const sorted = assets.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
        const main = sorted.find((asset) => !INV_RE.test(fileName(asset.path)) && !GARMENT_RE.test(fileName(asset.path))) || sorted.find((asset) => !INV_RE.test(fileName(asset.path))) || sorted[0];
        const inv = sorted.find((asset) => INV_RE.test(fileName(asset.path)) && asset.path !== main.path) || null;
        const garments = sorted.filter((asset) => asset.path !== main.path && GARMENT_RE.test(fileName(asset.path)) && (!inv || asset.path !== inv.path));
        const hover = garments.length ? garments : inv ? [inv] : [];
        return { id: key, title: cleanTitle(key), main, inv, hover };
      });
  };

  const makeCapAssets = (files) => {
    const sorted = files.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
    const finalIndexByName = sorted.findIndex((asset) => /(final|product|irl|person|model|human|wear|worn)/i.test(fileName(asset.path)));
    const finalIndex = finalIndexByName >= 0 ? finalIndexByName : Math.max(sorted.length - 1, 0);
    return sorted.map((asset, index) => ({ ...asset, id: `cap-${index}`, title: cleanTitle(fileName(asset.path)), caption: index === finalIndex ? 'FINAL PRODUCT' : 'REALISTIC 3D RENDER' }));
  };

  const loadBlandettoData = async () => {
    if (blandettoData) return blandettoData;
    const all = await loadAllAssets();
    const logosFiles = getSectionFiles(all, 'logos');
    const capFiles = getSectionFiles(all, 'cap');
    const printsFiles = getSectionFiles(all, 'prints');
    const dentistFiles = getSectionFiles(all, 'dentist');

    blandettoData = {
      logos: groupAssets(logosFiles, 'logos'),
      cap: makeCapAssets(capFiles),
      prints: groupAssets(printsFiles, 'prints'),
      dentist: groupAssets(dentistFiles, 'dentist'),
    };
    return blandettoData;
  };

  const createElement = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };

  const getItemAssets = (item) => [item.main, item.inv, ...(item.hover || [])].filter(Boolean).filter((asset, index, arr) => arr.findIndex((x) => x.path === asset.path) === index);

  const openLightbox = (assets, startIndex = 0) => {
    const list = Array.isArray(assets) ? assets : [assets];
    let index = startIndex;
    const overlay = createElement('div', 'blandetto-lightbox');
    const close = createElement('button', 'blandetto-lightbox__close', 'CLOSE');
    const prev = createElement('button', 'blandetto-lightbox__nav blandetto-lightbox__nav--prev', '←');
    const next = createElement('button', 'blandetto-lightbox__nav blandetto-lightbox__nav--next', '→');
    const counter = createElement('p', 'blandetto-lightbox__counter');
    const img = createElement('img', 'blandetto-lightbox__img');

    const render = () => {
      const asset = list[index];
      img.src = asset.url;
      img.alt = cleanTitle(fileName(asset.path));
      counter.textContent = `${index + 1} / ${list.length}`;
      prev.style.display = list.length > 1 ? '' : 'none';
      next.style.display = list.length > 1 ? '' : 'none';
      counter.style.display = list.length > 1 ? '' : 'none';
    };

    close.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', () => overlay.remove());
    img.addEventListener('click', (event) => { event.stopPropagation(); if (list.length > 1) { index = (index + 1) % list.length; render(); } });
    prev.addEventListener('click', (event) => { event.stopPropagation(); index = (index - 1 + list.length) % list.length; render(); });
    next.addEventListener('click', (event) => { event.stopPropagation(); index = (index + 1) % list.length; render(); });
    overlay.append(close, prev, img, next, counter);
    document.body.append(overlay);
    render();
  };

  const makeCard = (item, modifier) => {
    const card = createElement('button', `blandetto-card blandetto-card--${modifier}`);
    card.type = 'button';
    const media = createElement('div', 'blandetto-card__media');
    const main = createElement('img', 'blandetto-card__img blandetto-card__img--main');
    main.src = item.main.url;
    main.alt = item.title;
    main.loading = 'lazy';
    media.append(main);

    if (item.hover?.length) {
      card.classList.add('blandetto-card--has-hover');
      const hover = createElement('img', 'blandetto-card__img blandetto-card__img--hover');
      hover.src = item.hover[0].url;
      hover.alt = `${item.title} preview`;
      hover.loading = 'lazy';
      media.append(hover);
    }

    card.append(media);
    card.addEventListener('click', (event) => { event.stopPropagation(); openLightbox(getItemAssets(item)); });
    return card;
  };

  const makeSection = ({ title, items, modifier }) => {
    if (!items?.length) return null;
    const section = createElement('section', `blandetto-section blandetto-section--${modifier}`);
    const head = createElement('div', 'blandetto-section__head');
    head.append(createElement('h3', 'blandetto-section__title', title));
    head.append(createElement('p', 'blandetto-section__count', `${items.length} / ${items.length}`));
    const grid = createElement('div', `blandetto-grid blandetto-grid--${modifier}`);
    items.forEach((item) => grid.append(makeCard(item, modifier)));
    section.append(head, grid);
    return section;
  };

  const makeCapSection = (items, logoReference) => {
    if (!items?.length) return null;
    const section = createElement('section', 'blandetto-section blandetto-section--cap');
    const head = createElement('div', 'blandetto-section__head');
    head.append(createElement('h3', 'blandetto-section__title', 'CAP'));
    head.append(createElement('p', 'blandetto-section__count', `${items.length} / ${items.length}`));
    const layout = createElement('div', 'blandetto-cap-layout');
    const grid = createElement('div', 'blandetto-cap-grid');

    items.forEach((item, index) => {
      const card = createElement('button', 'blandetto-cap-card');
      card.type = 'button';
      const media = createElement('div', 'blandetto-cap-card__media');
      const img = createElement('img', 'blandetto-cap-card__img');
      img.src = item.url;
      img.alt = item.title;
      img.loading = 'lazy';
      media.append(img);
      card.append(media, createElement('p', 'blandetto-cap-card__caption', item.caption));
      card.addEventListener('click', (event) => { event.stopPropagation(); openLightbox(items, index); });
      grid.append(card);
    });

    layout.append(grid);
    if (logoReference) {
      const ref = createElement('aside', 'blandetto-cap-reference');
      const media = createElement('div', 'blandetto-cap-reference__media');
      const img = createElement('img', 'blandetto-cap-reference__img');
      img.src = logoReference.main.url;
      img.alt = 'Blandetto logo reference';
      img.loading = 'lazy';
      media.append(img);
      ref.append(media, createElement('p', 'blandetto-cap-reference__caption', 'за основу взят этот логотип'));
      layout.append(ref);
    }

    section.append(head, layout);
    return section;
  };

  const openBlandettoModal = async () => {
    injectBlandettoStyles();
    if (activeModal) activeModal.remove();
    activeModal = createElement('div', 'blandetto-modal');
    const inner = createElement('div', 'blandetto-modal__inner');
    const header = createElement('div', 'blandetto-modal__header');
    header.append(createElement('p', 'blandetto-modal__label', 'BLANDETTO'));
    const close = createElement('button', 'blandetto-modal__close', 'CLOSE');
    close.type = 'button';
    close.addEventListener('click', () => { activeModal?.remove(); activeModal = null; });
    header.append(close);
    const loading = createElement('p', 'blandetto-empty', 'LOADING BLANDETTO ASSETS...');
    inner.append(header, loading);
    activeModal.append(inner);
    document.body.append(activeModal);

    try {
      const data = await loadBlandettoData();
      loading.remove();
      const sections = [
        makeSection({ title: 'LOGO VARIATIONS', items: data.logos, modifier: 'logos' }),
        makeCapSection(data.cap, data.logos?.[0] || null),
        makeSection({ title: 'PRINTS', items: data.prints, modifier: 'prints' }),
        makeSection({ title: 'DENTIST MARKET', items: data.dentist, modifier: 'dentist' }),
      ].filter(Boolean);
      if (sections.length) sections.forEach((section) => inner.append(section));
      else inner.append(createElement('p', 'blandetto-empty', 'BLANDETTO FILES NOT FOUND'));
    } catch (error) {
      loading.textContent = 'BLANDETTO FILES LOADING ERROR';
      console.error(error);
    }
  };

  const enhanceBlandettoCard = () => {
    const cards = Array.from(document.querySelectorAll('#works article, #works button'));
    const card = cards.find((element) => element.querySelector('h3')?.textContent?.trim().toUpperCase() === 'BLANDETTO');
    if (!card || card.dataset.blandettoReady === 'true') return;
    card.dataset.blandettoReady = 'true';
    card.classList.add('blandetto-card-ready');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', openBlandettoModal);
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openBlandettoModal(); } });
  };

  const observer = new MutationObserver(enhanceBlandettoCard);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', enhanceBlandettoCard);
  enhanceBlandettoCard();
})();
