(() => {
  const V = 'zny-8';
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      loading: 'ЗАГРУЗКА МАТЕРИАЛОВ ZNY...',
      prints: {
        title: 'ПРИНТЫ',
        note: 'Графика для одежды, коллекций и лимитированных дропов.',
      },
      posters: {
        title: 'АФИШИ',
        note: 'Рекламные визуалы для социальных сетей, промокампаний и специальных предложений.',
      },
      examples: {
        title: 'ПРИМЕРЫ',
        note: '',
      },
      stickers: {
        title: 'СТИКЕРЫ',
        note: 'Стикеры, развивающие и дополняющие визуальный стиль коллекции.',
      },
    },
    en: {
      close: 'CLOSE',
      loading: 'LOADING ZNY ASSETS...',
      prints: {
        title: 'PRINTS',
        note: 'Graphics created for apparel, collections and limited drops.',
      },
      posters: {
        title: 'POSTERS',
        note: 'Promotional visuals created for social media, advertising campaigns and special offers.',
      },
      examples: {
        title: 'EXAMPLES',
        note: '',
      },
      stickers: {
        title: 'STICKERS',
        note: 'Stickers designed to extend and complement the visual identity of the collection.',
      },
    },
  };

  let modal = null;
  let prevBody = '';
  let prevHtml = '';

  const currentLanguage = () => {
    const htmlLanguage = document.documentElement.lang;
    if (htmlLanguage === 'ru' || htmlLanguage === 'en') return htmlLanguage;
    return localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  };

  const q = (src) => `${src}?v=${V}`;
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const base = (path) => (path || '').split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();

  function lock() {
    prevBody = document.body.style.overflow;
    prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlock() {
    document.body.style.overflow = prevBody;
    document.documentElement.style.overflow = prevHtml;
  }

  function close() {
    modal?.remove();
    modal = null;
    unlock();
  }

  function styles() {
    if (document.getElementById('zny-style-v8')) return;
    document.getElementById('zny-style-v7')?.remove();
    const style = el('style');
    style.id = 'zny-style-v8';
    style.textContent = `
      html:has(.zny-modal),body:has(.zny-modal){overflow:hidden!important}
      .zny-modal{position:fixed;inset:0;z-index:330;overflow-y:auto;overflow-x:hidden;background:#fff;color:#050505;padding:1.5rem 1rem 4rem}
      .zny-inner{width:min(100%,80rem);margin:0 auto}
      .zny-head{position:sticky;top:0;z-index:5;display:flex;justify-content:flex-end;margin-bottom:2rem;padding:.7rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.22);background:rgba(255,255,255,.95);backdrop-filter:blur(10px)}
      .zny-close{font-size:.68rem;font-weight:900;letter-spacing:.28em;text-transform:uppercase;border:1px solid #050505;background:#050505;color:#fff;padding:.55rem 1rem}
      .zny-section{border-top:1px solid rgba(5,5,5,.22);padding-top:1.25rem}
      .zny-section+.zny-section{margin-top:5rem}
      .zny-section-head{margin-bottom:1.25rem}
      .zny-h{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.085em;text-transform:uppercase}
      .zny-note{max-width:52rem;margin:-.5rem 0 1.5rem;color:rgba(5,5,5,.68);font-size:clamp(1rem,1.6vw,1.35rem);font-weight:700;line-height:1.05;letter-spacing:-.035em}
      .zny-grid,.zny-print-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
      .zny-card{border:0;background:#fff;padding:0;cursor:zoom-in;text-align:left}
      .zny-card__media{position:relative;aspect-ratio:1/1;background:#fff;overflow:hidden}
      .zny-card img{display:block;width:100%;height:100%;object-fit:contain;background:#fff}
      .zny-card__img{position:absolute;inset:0;transition:opacity .45s ease}
      .zny-card__img--hover{opacity:0}
      .zny-card__img--hover.zny-card__img--active{opacity:1}
      .zny-card--has-hover:hover .zny-card__img--main{opacity:0}
      .zny-afisha-list{display:grid;grid-template-columns:1fr;gap:2.4rem}
      .zny-afisha-card .zny-card__media{aspect-ratio:auto;overflow:visible}
      .zny-afisha-card img{position:static;width:100%;height:auto;object-fit:contain}
      .zny-grid--example{grid-template-columns:repeat(4,minmax(0,1fr));gap:.35rem;align-items:start}
      .zny-grid--example .zny-card__media{aspect-ratio:auto;overflow:visible}
      .zny-grid--example .zny-card img{position:static;width:100%;height:auto}
      .zny-sticker-list{display:grid;gap:1rem}
      .zny-sticker-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
      .zny-empty{font-size:.72rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase;color:rgba(5,5,5,.45)}
      .zny-light{position:fixed;inset:0;z-index:430;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);padding:1rem}
      .zny-light img{max-width:92vw;max-height:90vh;object-fit:contain}
      .zny-light button{position:absolute;right:1rem;top:1rem;border:0;background:#fff;padding:.7rem 1rem;font-size:.7rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase}
      @media(max-width:900px){.zny-grid,.zny-print-list{grid-template-columns:repeat(2,minmax(0,1fr))}.zny-grid--example{grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem}}
      @media(max-width:560px){.zny-grid,.zny-print-list,.zny-sticker-row,.zny-grid--example{grid-template-columns:1fr}}
    `;
    document.head.append(style);
  }

  function updateLanguage() {
    if (!modal) return;
    const copy = COPY[currentLanguage()];
    const closeButton = modal.querySelector('.zny-close');
    const loading = modal.querySelector('.zny-empty[data-zny-loading]');
    if (closeButton) closeButton.textContent = copy.close;
    if (loading) loading.textContent = copy.loading;

    modal.querySelectorAll('.zny-section[data-zny-section]').forEach((section) => {
      const sectionCopy = copy[section.dataset.znySection];
      if (!sectionCopy) return;
      const title = section.querySelector('.zny-h');
      const note = section.querySelector('.zny-note');
      if (title) title.textContent = sectionCopy.title;
      if (note) note.textContent = sectionCopy.note;
    });
  }

  async function folder(name) {
    try {
      const response = await fetch(`https://api.github.com/repos/${REPO}/contents/public/works/zny/${name}?ref=${BRANCH}`);
      if (!response.ok) return [];
      return (await response.json())
        .filter((item) => item.type === 'file' && IMAGE_RE.test(item.name || item.path))
        .map((item) => ({
          name: item.name,
          path: item.path,
          url: item.download_url || `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path}`,
        }))
        .sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { numeric: true }));
    } catch {
      return [];
    }
  }

  function lightbox(items, index = 0) {
    if (!items.length) return;
    const overlay = el('div', 'zny-light');
    const closeButton = el('button', '', currentLanguage() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE');
    const img = el('img');
    const render = () => { img.src = q(items[index].url); };
    closeButton.onclick = () => overlay.remove();
    overlay.onclick = () => overlay.remove();
    img.onclick = (event) => {
      event.stopPropagation();
      index = (index + 1) % items.length;
      render();
    };
    overlay.append(closeButton, img);
    document.body.append(overlay);
    render();
  }

  function card(item, list, index, hoverItems = []) {
    const button = el('button', hoverItems.length ? 'zny-card zny-card--has-hover' : 'zny-card');
    button.type = 'button';
    const media = el('div', 'zny-card__media');
    const image = el('img', 'zny-card__img zny-card__img--main');
    image.src = q(item.url);
    image.alt = base(item.name);
    image.loading = 'lazy';
    media.append(image);

    let timer = null;
    if (hoverItems.length) {
      const layers = hoverItems.map((hoverItem) => {
        const hoverImage = el('img', 'zny-card__img zny-card__img--hover');
        hoverImage.src = q(hoverItem.url);
        hoverImage.loading = 'lazy';
        media.append(hoverImage);
        return hoverImage;
      });
      let hoverIndex = 0;
      const show = () => {
        layers.forEach((layer, layerIndex) => layer.classList.toggle('zny-card__img--active', layerIndex === hoverIndex));
        hoverIndex = (hoverIndex + 1) % layers.length;
      };
      button.onmouseenter = () => {
        hoverIndex = 0;
        show();
        clearInterval(timer);
        timer = setInterval(show, 950);
      };
      button.onmouseleave = () => {
        clearInterval(timer);
        timer = null;
        layers.forEach((layer) => layer.classList.remove('zny-card__img--active'));
      };
    }

    button.append(media);
    button.onclick = (event) => {
      event.stopPropagation();
      lightbox(list, index);
    };
    return button;
  }

  function imageCard(item, list, index, className = '') {
    const button = el('button', `zny-card ${className}`.trim());
    button.type = 'button';
    const media = el('div', 'zny-card__media');
    const image = el('img');
    image.src = q(item.url);
    image.alt = base(item.name);
    image.loading = 'lazy';
    media.append(image);
    button.append(media);
    button.onclick = (event) => {
      event.stopPropagation();
      lightbox(list, index);
    };
    return button;
  }

  function key(item) {
    const filename = base(item.name);
    const match = filename.match(/print[-_ ]?\d+/i);
    return match
      ? match[0].replace(/[_ ]/g, '-')
      : filename.replace(/[-_ ]?(version|variant|tee|tshirt|shirt|hoodie|product|mockup|irl).*$/i, '');
  }

  function rank(item) {
    const filename = base(item.name);
    const variant = /version|variant|v\d|alt/.test(filename);
    const product = /tee|tshirt|t-shirt|shirt|hoodie|product|mockup|irl/.test(filename);
    return variant && product ? 3 : variant ? 1 : product ? 2 : 0;
  }

  function groups(items) {
    const map = new Map();
    items.forEach((item) => {
      const itemKey = key(item);
      if (!map.has(itemKey)) map.set(itemKey, []);
      map.get(itemKey).push(item);
    });
    return [...map.entries()]
      .sort(([a], [b]) => {
        if (a === 'print-03') return 1;
        if (b === 'print-03') return -1;
        return a.localeCompare(b, undefined, { numeric: true });
      })
      .map(([itemKey, list]) => ({
        key: itemKey,
        list: list.sort((a, b) => rank(a) - rank(b) || (a.name || '').localeCompare(b.name || '', undefined, { numeric: true })),
      }));
  }

  function prints(items) {
    const wrapper = el('div', 'zny-print-list');
    if (!items.length) {
      wrapper.append(el('p', 'zny-empty', 'Файлы для этого блока пока не найдены'));
      return wrapper;
    }
    groups(items).forEach((group) => {
      const main = group.list.find((item) => rank(item) === 0) || group.list[0];
      const hoverItems = group.list.filter((item) => item !== main && rank(item) > 0);
      wrapper.append(card(main, group.list, group.list.indexOf(main), hoverItems));
    });
    return wrapper;
  }

  function posters(items) {
    const wrapper = el('div', 'zny-afisha-list');
    items.forEach((item, index) => wrapper.append(imageCard(item, items, index, 'zny-afisha-card')));
    return wrapper;
  }

  function simple(items, className) {
    const wrapper = el('div', className);
    items.forEach((item, index) => wrapper.append(imageCard(item, items, index)));
    return wrapper;
  }

  function stickerKey(item) {
    const filename = base(item.name);
    const match = filename.match(/sticker[-_ ]?\d+/i);
    return match ? match[0].replace(/[_ ]/g, '-') : filename.replace(/[-_ ]?irl.*$/i, '');
  }

  function stickerRank(item) {
    return /irl|real|photo|product/.test(base(item.name)) ? 1 : 0;
  }

  function stickers(items) {
    const wrapper = el('div', 'zny-sticker-list');
    const map = new Map();
    items.forEach((item) => {
      const itemKey = stickerKey(item);
      if (!map.has(itemKey)) map.set(itemKey, []);
      map.get(itemKey).push(item);
    });
    [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .forEach(([, list]) => {
        list.sort((a, b) => stickerRank(a) - stickerRank(b));
        const row = el('div', 'zny-sticker-row');
        list.forEach((item, index) => row.append(imageCard(item, list, index)));
        wrapper.append(row);
      });
    return wrapper;
  }

  function section(sectionKey, node) {
    const language = currentLanguage();
    const sectionCopy = COPY[language][sectionKey];
    const sectionNode = el('section', 'zny-section');
    sectionNode.dataset.znySection = sectionKey;
    const head = el('div', 'zny-section-head');
    head.append(el('h3', 'zny-h', sectionCopy.title));
    sectionNode.append(head);
    if (sectionCopy.note) sectionNode.append(el('p', 'zny-note', sectionCopy.note));
    sectionNode.append(node);
    return sectionNode;
  }

  async function open() {
    styles();
    modal?.remove();
    lock();

    const copy = COPY[currentLanguage()];
    modal = el('div', 'zny-modal');
    const inner = el('div', 'zny-inner');
    const head = el('div', 'zny-head');
    const closeButton = el('button', 'zny-close', copy.close);
    closeButton.onclick = close;
    head.append(closeButton);

    const loading = el('p', 'zny-empty', copy.loading);
    loading.dataset.znyLoading = 'true';
    inner.append(head, loading);
    modal.append(inner);
    document.body.append(modal);

    const [printItems, posterItems, exampleItems, stickerItems] = await Promise.all([
      folder('prints'),
      folder('afisha'),
      folder('example'),
      folder('stickers'),
    ]);

    loading.remove();
    inner.append(
      section('prints', prints(printItems)),
      section('posters', posters(posterItems)),
      section('examples', simple(exampleItems, 'zny-grid zny-grid--example')),
      section('stickers', stickers(stickerItems)),
    );
  }

  const languageObserver = new MutationObserver(updateLanguage);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('click', (event) => {
    const cardNode = event.target.closest('#works article,#works button');
    if (!cardNode) return;
    const title = cardNode.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'ZNY') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);
})();
