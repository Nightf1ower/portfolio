(() => {
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  const GARMENT_RE = /(tee|tshirt|t-shirt|shirt|hoodie|sweatshirt|sweater|pants|trousers|crewneck|longsleeve|long-sleeve|mockup|worn|wear|product|clothes|merch)/i;
  const INV_RE = /(^|[-_\s])(inv|invert|inverted|inverse)($|[-_\s])/i;
  const REMOVE_RE = /(main|base|original|orig|flat|front|back|mockup|preview|logo|print|blandetto|dentist|market|cap|caps)/gi;
  let treePromise = null;
  let blandettoData = null;
  let activeModal = null;

  const sectionAliases = {
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
      .blandetto-grid--prints .blandetto-card__media { aspect-ratio: 1 / 1 !important; }
      .blandetto-grid--prints .blandetto-card__img { object-fit: contain !important; transform: scale(1.42) !important; }
      .blandetto-grid--prints .blandetto-card:hover .blandetto-card__img { transform: scale(1.42) !important; }
      .blandetto-cap-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(17rem, 0.55fr); gap: 1rem; align-items: start; }
      .blandetto-cap-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
      .blandetto-cap-card { display: block; width: 100%; border: 0; background: transparent; padding: 0; text-align: left; cursor: zoom-in; }
      .blandetto-cap-card__media { background: #fff; overflow: hidden; }
      .blandetto-cap-card__img { display: block; width: 100%; height: auto; object-fit: contain; }
      .blandetto-cap-card__caption, .blandetto-cap-reference__caption { margin: 0.55rem 0 0; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.23em; line-height: 1; text-transform: uppercase; color: rgba(5,5,5,0.55); }
      .blandetto-cap-reference { position: sticky; top: 5.5rem; }
      .blandetto-cap-reference__media { background: #fff; padding: 1rem; }
      .blandetto-cap-reference__img { display: block; width: 100%; height: auto; object-fit: contain; }
      .blandetto-card:not(.blandetto-card--has-hover):hover .blandetto-card__img--main { opacity: 1 !important; }
      .blandetto-card--has-hover:hover .blandetto-card__img--main { opacity: 0 !important; }
      .blandetto-card--has-hover:hover .blandetto-card__img--hover { opacity: 1 !important; }
      .blandetto-lightbox__nav { position: absolute; top: 50%; z-index: 3; width: 3.5rem; height: 3.5rem; transform: translateY(-50%); border: 1px solid #fff; background: #fff; color: #050505; font-size: 2rem; font-weight: 900; line-height: 1; }
      .blandetto-lightbox__nav--prev { left: 1rem; }
      .blandetto-lightbox__nav--next { right: 1rem; }
      .blandetto-lightbox__counter { position: absolute; left: 50%; bottom: 1rem; transform: translateX(-50%); margin: 0; background: #fff; color: #050505; padding: 0.45rem 0.75rem; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.22em; text-transform: uppercase; }
      @media (max-width: 900px) { .blandetto-cap-layout { grid-template-columns: 1fr; } .blandetto-cap-reference { position: static; } }
      @media (max-width: 560px) { .blandetto-cap-grid { grid-template-columns: 1fr; } }
    `;
    document.head.append(style);
  };

  const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');
  const fileName = (path) => path.split('/').pop() || path;
  const cleanTitle = (value) => value.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
  const normalizeSegment = (value) => decodeURIComponent(value).toLowerCase().replace(/[_\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const aliasSet = (aliases) => new Set(aliases.map(normalizeSegment));

  const getTree = async () => {
    if (!treePromise) {
      treePromise = fetch(`https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`)
        .then((response) => response.ok ? response.json() : Promise.reject(new Error('GitHub tree loading failed')))
        .then((data) => data.tree || []);
    }
    return treePromise;
  };

  const toPublicUrl = (path) => {
    if (path.startsWith('public/')) return `/${encodePath(path.replace(/^public\//, ''))}`;
    return `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${encodePath(path)}`;
  };

  const findBasePath = (paths) => {
    const candidates = ['public/works/blandetto', 'works/blandetto', 'public/blandetto', 'blandetto'];
    return candidates.find((candidate) => paths.some((path) => path.toLowerCase().startsWith(`${candidate}/`))) || 'public/works/blandetto';
  };

  const getRelAfterSection = (path, aliases) => {
    const set = aliasSet(aliases);
    const parts = path.split('/');
    const index = parts.findIndex((part) => set.has(normalizeSegment(part)));
    if (index === -1) return null;
    return parts.slice(index + 1).join('/');
  };

  const getSectionFiles = (paths, aliases) => paths.filter((path) => IMAGE_RE.test(path) && getRelAfterSection(path, aliases));

  const inferGroupKey = (path, aliases) => {
    const rel = getRelAfterSection(path, aliases) || fileName(path);
    const parts = rel.split('/').filter(Boolean);
    if (parts.length > 1) return normalizeSegment(parts[0]);

    let base = fileName(path).replace(/\.[^.]+$/, '').toLowerCase();
    base = decodeURIComponent(base);
    base = base.replace(INV_RE, ' ');
    base = base.replace(GARMENT_RE, ' ');
    base = base.replace(REMOVE_RE, ' ');
    base = base.replace(/[_\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return base || normalizeSegment(fileName(path).replace(/\.[^.]+$/, ''));
  };

  const groupAssets = (paths, aliases) => {
    const map = new Map();
    paths.forEach((path) => {
      const key = inferGroupKey(path, aliases);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(path);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([key, files]) => {
        const sorted = files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        const mainPath = sorted.find((path) => !INV_RE.test(fileName(path)) && !GARMENT_RE.test(fileName(path))) || sorted.find((path) => !INV_RE.test(fileName(path))) || sorted[0];
        const invPath = sorted.find((path) => INV_RE.test(fileName(path)) && !GARMENT_RE.test(fileName(path))) || null;
        const garmentHover = sorted.filter((path) => path !== mainPath && GARMENT_RE.test(fileName(path)) && !INV_RE.test(fileName(path))).map((path) => ({ path, url: toPublicUrl(path) }));
        const hover = garmentHover.length ? garmentHover : invPath ? [{ path: invPath, url: toPublicUrl(invPath) }] : [];
        return {
          id: key,
          title: cleanTitle(key),
          main: { path: mainPath, url: toPublicUrl(mainPath) },
          hover,
          inv: invPath ? { path: invPath, url: toPublicUrl(invPath) } : null,
          cycle: [],
        };
      });
  };

  const makeCapAssets = (paths) => {
    const sorted = paths.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const finalIndexByName = sorted.findIndex((path) => /(final|product|irl|person|model|human|wear|worn)/i.test(fileName(path)));
    const finalIndex = finalIndexByName >= 0 ? finalIndexByName : sorted.length - 1;
    return sorted.map((path, index) => ({
      id: `cap-${index}`,
      title: cleanTitle(fileName(path)),
      main: { path, url: toPublicUrl(path) },
      caption: index === finalIndex ? 'FINAL PRODUCT' : 'REALISTIC 3D RENDER',
    }));
  };

  const loadBlandettoData = async () => {
    if (blandettoData) return blandettoData;
    const tree = await getTree();
    const paths = tree.map((item) => item.path).filter(Boolean);
    const basePath = findBasePath(paths);
    const files = paths.filter((path) => path.toLowerCase().startsWith(`${basePath.toLowerCase()}/`) && IMAGE_RE.test(path));

    blandettoData = {
      basePath,
      logos: groupAssets(getSectionFiles(files, sectionAliases.logos), sectionAliases.logos),
      cap: makeCapAssets(getSectionFiles(files, sectionAliases.cap)),
      prints: groupAssets(getSectionFiles(files, sectionAliases.prints), sectionAliases.prints),
      dentist: groupAssets(getSectionFiles(files, sectionAliases.dentist), sectionAliases.dentist),
    };
    return blandettoData;
  };

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const getItemAssets = (item) => {
    const assets = [item.main];
    if (item.inv) assets.push(item.inv);
    if (item.hover?.length) assets.push(...item.hover.filter((asset) => !item.inv || asset.path !== item.inv.path));
    return assets.filter(Boolean);
  };

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
      img.alt = asset.path ? cleanTitle(fileName(asset.path)) : 'Blandetto image';
      counter.textContent = `${index + 1} / ${list.length}`;
      prev.style.display = list.length > 1 ? '' : 'none';
      next.style.display = list.length > 1 ? '' : 'none';
      counter.style.display = list.length > 1 ? '' : 'none';
    };

    const closeLightbox = () => overlay.remove();
    const change = (direction) => { index = (index + direction + list.length) % list.length; render(); };

    close.addEventListener('click', closeLightbox);
    prev.addEventListener('click', (event) => { event.stopPropagation(); change(-1); });
    next.addEventListener('click', (event) => { event.stopPropagation(); change(1); });
    overlay.addEventListener('click', closeLightbox);
    img.addEventListener('click', (event) => { event.stopPropagation(); if (list.length > 1) change(1); });
    overlay.append(close, prev, img, next, counter);
    document.body.append(overlay);
    render();
  };

  const makeCard = (item, tag = '', modifier = '') => {
    const card = createElement('button', `blandetto-card blandetto-card--${modifier}`);
    card.type = 'button';
    const media = createElement('div', 'blandetto-card__media');
    const main = createElement('img', 'blandetto-card__img blandetto-card__img--main');
    const hoverAssets = item.hover && item.hover.length ? item.hover : [];

    main.src = item.main.url;
    main.alt = item.title;
    main.loading = 'lazy';
    media.append(main);

    if (modifier === 'logos' && hoverAssets.length === 0) media.style.aspectRatio = '16 / 6';

    let hoverImg = null;
    let hoverIndex = 0;
    let hoverTimer = null;
    if (hoverAssets.length) {
      card.classList.add('blandetto-card--has-hover');
      hoverImg = createElement('img', 'blandetto-card__img blandetto-card__img--hover');
      hoverImg.src = hoverAssets[0].url;
      hoverImg.alt = `${item.title} hover preview`;
      hoverImg.loading = 'lazy';
      media.append(hoverImg);
      card.addEventListener('mouseenter', () => {
        if (hoverAssets.length < 2) return;
        hoverTimer = window.setInterval(() => {
          hoverIndex = (hoverIndex + 1) % hoverAssets.length;
          hoverImg.src = hoverAssets[hoverIndex].url;
        }, 850);
      });
      card.addEventListener('mouseleave', () => {
        if (hoverTimer) window.clearInterval(hoverTimer);
        hoverTimer = null;
        hoverIndex = 0;
        hoverImg.src = hoverAssets[0].url;
      });
    }

    card.append(media);
    card.addEventListener('click', (event) => { event.stopPropagation(); openLightbox(getItemAssets(item)); });
    return card;
  };

  const makeSection = ({ title, items, modifier, tag }) => {
    if (!items || !items.length) return null;
    const section = createElement('section', `blandetto-section blandetto-section--${modifier}`);
    const head = createElement('div', 'blandetto-section__head');
    head.append(createElement('h3', 'blandetto-section__title', title));
    head.append(createElement('p', 'blandetto-section__count', `${items.length} / ${items.length}`));
    section.append(head);
    const grid = createElement('div', `blandetto-grid blandetto-grid--${modifier}`);
    items.forEach((item) => grid.append(makeCard(item, tag, modifier)));
    section.append(grid);
    return section;
  };

  const makeCapSection = (items, logoReference) => {
    if (!items || !items.length) return null;
    const section = createElement('section', 'blandetto-section blandetto-section--cap');
    const head = createElement('div', 'blandetto-section__head');
    head.append(createElement('h3', 'blandetto-section__title', 'CAP'));
    head.append(createElement('p', 'blandetto-section__count', `${items.length} / ${items.length}`));
    section.append(head);

    const layout = createElement('div', 'blandetto-cap-layout');
    const grid = createElement('div', 'blandetto-cap-grid');
    items.forEach((item, index) => {
      const card = createElement('button', 'blandetto-cap-card');
      card.type = 'button';
      const media = createElement('div', 'blandetto-cap-card__media');
      const img = createElement('img', 'blandetto-cap-card__img');
      img.src = item.main.url;
      img.alt = item.title;
      img.loading = 'lazy';
      media.append(img);
      card.append(media, createElement('p', 'blandetto-cap-card__caption', item.caption));
      card.addEventListener('click', (event) => { event.stopPropagation(); openLightbox(items.map((asset) => asset.main), index); });
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
      ref.append(media, createElement('p', 'blandetto-cap-reference__caption', 'ЗА ОСНОВУ ВЗЯТЬ ЭТОТ ЛОГОТИП'));
      layout.append(ref);
    }

    section.append(layout);
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
    close.addEventListener('click', () => { activeModal.remove(); activeModal = null; });
    header.append(close);
    inner.append(header, createElement('p', 'blandetto-empty', 'LOADING BLANDETTO ASSETS...'));
    activeModal.append(inner);
    document.body.append(activeModal);

    try {
      const data = await loadBlandettoData();
      inner.querySelector('.blandetto-empty')?.remove();
      const logoReference = data.logos?.[0] || null;
      const sections = [
        makeSection({ title: 'LOGO VARIATIONS', items: data.logos, modifier: 'logos', tag: 'LOGO' }),
        makeCapSection(data.cap, logoReference),
        makeSection({ title: 'PRINTS', items: data.prints, modifier: 'prints', tag: 'PRINT' }),
        makeSection({ title: 'DENTIST MARKET', items: data.dentist, modifier: 'dentist', tag: 'DENTIST' }),
      ].filter(Boolean);
      if (sections.length) sections.forEach((section) => inner.append(section));
      else inner.append(createElement('p', 'blandetto-empty', 'BLANDETTO FILES NOT FOUND'));
    } catch (error) {
      inner.querySelector('.blandetto-empty').textContent = 'BLANDETTO FILES LOADING ERROR';
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
