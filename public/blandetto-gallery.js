(() => {
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  const GARMENT_RE = /(tee|tshirt|t-shirt|shirt|hoodie|sweatshirt|sweater|pants|trousers|crewneck|longsleeve|long-sleeve|mockup|worn|wear|product|clothes|merch)/i;
  const INV_RE = /(^|[-_\s])inv(erted)?($|[-_\s])/i;
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
        const hover = sorted.filter((path) => path !== mainPath && GARMENT_RE.test(fileName(path)) && !INV_RE.test(fileName(path))).map((path) => ({ path, url: toPublicUrl(path) }));
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

  const makeCycleAsset = (paths, title) => {
    const sorted = paths.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (!sorted.length) return [];
    return [{
      id: 'cap-cycle',
      title,
      main: { path: sorted[0], url: toPublicUrl(sorted[0]) },
      hover: [],
      inv: null,
      cycle: sorted.map((path) => ({ path, url: toPublicUrl(path) })),
    }];
  };

  const loadBlandettoData = async () => {
    if (blandettoData) return blandettoData;
    const tree = await getTree();
    const paths = tree.map((item) => item.path).filter(Boolean);
    const basePath = findBasePath(paths);
    const files = paths.filter((path) => path.toLowerCase().startsWith(`${basePath.toLowerCase()}/`) && IMAGE_RE.test(path));

    const logoFiles = getSectionFiles(files, sectionAliases.logos);
    const capFiles = getSectionFiles(files, sectionAliases.cap);
    const printFiles = getSectionFiles(files, sectionAliases.prints);
    const dentistFiles = getSectionFiles(files, sectionAliases.dentist);

    blandettoData = {
      basePath,
      logos: groupAssets(logoFiles, sectionAliases.logos),
      cap: makeCycleAsset(capFiles, 'CAP'),
      prints: groupAssets(printFiles, sectionAliases.prints),
      dentist: groupAssets(dentistFiles, sectionAliases.dentist),
    };
    return blandettoData;
  };

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const openLightbox = (asset) => {
    const overlay = createElement('div', 'blandetto-lightbox');
    const close = createElement('button', 'blandetto-lightbox__close', 'CLOSE');
    const img = createElement('img', 'blandetto-lightbox__img');
    img.src = asset.url;
    img.alt = asset.path ? cleanTitle(fileName(asset.path)) : 'Blandetto image';

    const closeLightbox = () => overlay.remove();
    close.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    img.addEventListener('click', (event) => event.stopPropagation());
    overlay.append(close, img);
    document.body.append(overlay);
  };

  const makeCard = (item, tag = '', modifier = '') => {
    const card = createElement('button', `blandetto-card blandetto-card--${modifier} ${item.inv ? 'blandetto-card--has-inv' : ''}`);
    card.type = 'button';
    const media = createElement('div', 'blandetto-card__media');
    const main = createElement('img', 'blandetto-card__img blandetto-card__img--main');
    main.src = item.main.url;
    main.alt = item.title;
    main.loading = 'lazy';
    media.append(main);

    const hoverAssets = item.hover && item.hover.length ? item.hover : [];
    let hoverImg = null;
    let hoverIndex = 0;
    let hoverTimer = null;
    if (hoverAssets.length) {
      hoverImg = createElement('img', 'blandetto-card__img blandetto-card__img--hover');
      hoverImg.src = hoverAssets[0].url;
      hoverImg.alt = `${item.title} garment preview`;
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

    const meta = createElement('div', 'blandetto-card__meta');
    meta.append(createElement('p', 'blandetto-card__title', item.title));
    meta.append(createElement('span', 'blandetto-card__tag', item.cycle?.length > 1 ? 'CLICK NEXT' : item.inv ? 'CLICK INV' : tag));
    card.append(media, meta);

    let inverted = false;
    let cycleIndex = 0;
    card.addEventListener('click', (event) => {
      event.stopPropagation();
      if (item.cycle && item.cycle.length > 1) {
        cycleIndex = (cycleIndex + 1) % item.cycle.length;
        main.src = item.cycle[cycleIndex].url;
        return;
      }
      if (item.inv) {
        inverted = !inverted;
        main.src = inverted ? item.inv.url : item.main.url;
        return;
      }
      openLightbox(item.main);
    });
    return card;
  };

  const makeSection = ({ title, note, items, modifier, tag }) => {
    if (!items || !items.length) return null;
    const section = createElement('section', `blandetto-section blandetto-section--${modifier}`);
    const head = createElement('div', 'blandetto-section__head');
    head.append(createElement('h3', 'blandetto-section__title', title));
    head.append(createElement('p', 'blandetto-section__count', `${items.length} / ${items.length}`));
    section.append(head);
    if (note) section.append(createElement('p', 'blandetto-section__note', note));
    const grid = createElement('div', `blandetto-grid blandetto-grid--${modifier}`);
    items.forEach((item) => grid.append(makeCard(item, tag, modifier)));
    section.append(grid);
    return section;
  };

  const openBlandettoModal = async () => {
    if (activeModal) activeModal.remove();
    activeModal = createElement('div', 'blandetto-modal');
    const inner = createElement('div', 'blandetto-modal__inner');
    const header = createElement('div', 'blandetto-modal__header');
    header.append(createElement('p', 'blandetto-modal__label', 'BLANDETTO'));
    const close = createElement('button', 'blandetto-modal__close', 'CLOSE');
    close.type = 'button';
    close.addEventListener('click', () => {
      activeModal.remove();
      activeModal = null;
    });
    header.append(close);
    inner.append(header);
    inner.append(createElement('p', 'blandetto-empty', 'LOADING BLANDETTO ASSETS...'));
    activeModal.append(inner);
    document.body.append(activeModal);

    try {
      const data = await loadBlandettoData();
      inner.querySelector('.blandetto-empty')?.remove();
      const sections = [
        makeSection({ title: 'BLANDETTO LOGOS', note: 'Логотипы собраны по одному дизайну: одежда появляется на hover, INV переключается кликом.', items: data.logos, modifier: 'logos', tag: 'LOGO' }),
        makeSection({ title: 'CAP', note: 'Одна карточка кепки. Клик переключает следующий вид без лишних полей.', items: data.cap, modifier: 'cap', tag: 'CAP' }),
        makeSection({ title: 'PRINTS', note: 'Принты собраны в группы: если есть вещь-пара, она появляется при наведении.', items: data.prints, modifier: 'prints', tag: 'PRINT' }),
        makeSection({ title: 'DENTIST MARKET', note: 'Подбренд Dentist Market: связанные лого и вещи собраны в одну карточку.', items: data.dentist, modifier: 'dentist', tag: 'DENTIST' }),
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
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openBlandettoModal();
      }
    });
  };

  const observer = new MutationObserver(enhanceBlandettoCard);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', enhanceBlandettoCard);
  enhanceBlandettoCard();
})();
