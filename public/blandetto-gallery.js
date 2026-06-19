(() => {
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  const GARMENT_RE = /(tee|tshirt|t-shirt|shirt|hoodie|sweatshirt|pants|trousers|crewneck|longsleeve|long-sleeve|mockup|worn|wear|product)/i;
  const INV_RE = /(^|[-_\s])inv(erted)?($|[-_\s])/i;
  let treePromise = null;
  let blandettoData = null;
  let activeModal = null;

  const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');
  const fileName = (path) => path.split('/').pop() || path;
  const cleanTitle = (value) => value.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();

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
    if (paths.some((path) => path.startsWith('public/works/blandetto/'))) return 'public/works/blandetto';
    if (paths.some((path) => path.startsWith('works/blandetto/'))) return 'works/blandetto';
    return 'public/works/blandetto';
  };

  const getSectionFiles = (paths, basePath, sectionNames) => {
    const names = Array.isArray(sectionNames) ? sectionNames : [sectionNames];
    return paths.filter((path) => {
      if (!IMAGE_RE.test(path)) return false;
      const lower = path.toLowerCase();
      return names.some((name) => lower.includes(`/${name.toLowerCase()}/`) || lower.startsWith(`${basePath.toLowerCase()}/${name.toLowerCase()}/`));
    });
  };

  const inferGroupKey = (path, basePath, sectionName) => {
    const rel = path.slice(`${basePath}/${sectionName}/`.length);
    const parts = rel.split('/');
    if (parts.length > 1) return parts[0].toLowerCase();
    let base = fileName(path).replace(/\.[^.]+$/, '').toLowerCase();
    base = base.replace(INV_RE, ' ');
    base = base.replace(GARMENT_RE, ' ');
    base = base.replace(/logo/gi, 'logo');
    base = base.replace(/[_\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return base || fileName(path).replace(/\.[^.]+$/, '').toLowerCase();
  };

  const groupAssets = (paths, basePath, sectionName, mode = 'grouped') => {
    if (mode === 'flat') {
      return paths.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map((path, index) => ({
        id: `${sectionName}-${index}`,
        title: cleanTitle(fileName(path)),
        main: { path, url: toPublicUrl(path) },
        hover: [],
        inv: null,
      }));
    }

    const map = new Map();
    paths.forEach((path) => {
      const key = inferGroupKey(path, basePath, sectionName);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(path);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([key, files]) => {
        const sorted = files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        const mainPath = sorted.find((path) => !INV_RE.test(fileName(path)) && !GARMENT_RE.test(fileName(path))) || sorted[0];
        const invPath = sorted.find((path) => INV_RE.test(fileName(path)) && !GARMENT_RE.test(fileName(path))) || null;
        const hover = sorted.filter((path) => path !== mainPath && GARMENT_RE.test(fileName(path)) && !INV_RE.test(fileName(path))).map((path) => ({ path, url: toPublicUrl(path) }));
        return {
          id: key,
          title: cleanTitle(key),
          main: { path: mainPath, url: toPublicUrl(mainPath) },
          hover,
          inv: invPath ? { path: invPath, url: toPublicUrl(invPath) } : null,
        };
      });
  };

  const loadBlandettoData = async () => {
    if (blandettoData) return blandettoData;
    const tree = await getTree();
    const paths = tree.map((item) => item.path).filter(Boolean);
    const basePath = findBasePath(paths);
    const files = paths.filter((path) => path.startsWith(`${basePath}/`) && IMAGE_RE.test(path));

    const logoFiles = getSectionFiles(files, basePath, 'logos');
    const capFiles = getSectionFiles(files, basePath, ['cap', 'caps']);
    const printFiles = getSectionFiles(files, basePath, 'prints');
    const dentistFiles = getSectionFiles(files, basePath, ['dentist-market', 'dentist_market', 'dentist']);

    blandettoData = {
      basePath,
      logos: groupAssets(logoFiles, basePath, 'logos'),
      cap: groupAssets(capFiles, basePath, 'cap', 'flat'),
      prints: groupAssets(printFiles, basePath, 'prints'),
      dentist: groupAssets(dentistFiles, basePath, 'dentist-market', 'flat'),
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

  const makeCard = (item, tag = '') => {
    const card = createElement('button', `blandetto-card ${item.inv ? 'blandetto-card--has-inv' : ''}`);
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
    meta.append(createElement('span', 'blandetto-card__tag', item.inv ? 'CLICK INV' : tag));
    card.append(media, meta);

    let inverted = false;
    card.addEventListener('click', (event) => {
      event.stopPropagation();
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
    items.forEach((item) => grid.append(makeCard(item, tag)));
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
        makeSection({ title: 'BLANDETTO LOGOS', note: 'Логотипы и варианты. Если есть INV — клик по карточке меняет лого на инвертированное. Если есть tee/hoodie/pants — на hover появляется вещь.', items: data.logos, modifier: 'logos', tag: 'LOGO' }),
        makeSection({ title: 'CAP', note: 'Отдельный блок с кепкой после логотипов.', items: data.cap, modifier: 'cap', tag: 'CAP' }),
        makeSection({ title: 'PRINTS', note: 'Отдельные принты. Если у файла есть вещь-пара, она появляется при наведении.', items: data.prints, modifier: 'prints', tag: 'PRINT' }),
        makeSection({ title: 'DENTIST MARKET', note: 'Подбренд: вещи Dentist Market отдельным блоком.', items: data.dentist, modifier: 'dentist', tag: 'DENTIST' }),
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
