(() => {
  const V = 'zny-5';
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const FOLDERS = { prints: 'prints', afisha: 'afisha', example: 'example', stickers: 'stickers' };
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  let modal = null;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const q = (src) => `${src}?v=${V}`;
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const filename = (path) => (path || '').split('/').pop() || path;
  const basename = (path) => filename(path).replace(/\.[^.]+$/, '');
  const norm = (value) => decodeURIComponent(value || '').toLowerCase();

  function lockPageScroll() {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPageScroll() {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function closeModal() {
    modal?.remove();
    modal = null;
    unlockPageScroll();
  }

  function styles() {
    if (document.getElementById('zny-style')) return;
    const style = el('style');
    style.id = 'zny-style';
    style.textContent = `
      html:has(.zny-modal),body:has(.zny-modal){overflow:hidden!important}.zny-modal{position:fixed;inset:0;z-index:330;overflow-y:auto;overflow-x:hidden;background:#fff;color:#050505;padding:1.5rem 1rem 4rem}.zny-inner{width:min(100%,80rem);margin:0 auto}.zny-head{position:sticky;top:0;z-index:5;display:flex;justify-content:flex-end;gap:1rem;margin-bottom:2rem;padding:.7rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.22);background:rgba(255,255,255,.95);backdrop-filter:blur(10px)}.zny-close,.zny-count,.zny-kicker{font-size:.68rem;font-weight:900;letter-spacing:.28em;text-transform:uppercase}.zny-close{border:1px solid #050505;background:#050505;color:#fff;padding:.55rem 1rem}.zny-section{border-top:1px solid rgba(5,5,5,.22);padding-top:1.25rem}.zny-section+.zny-section{margin-top:5rem}.zny-section-head{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.25rem}.zny-h{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.085em;text-transform:uppercase}.zny-count{margin:0;color:rgba(5,5,5,.48)}.zny-grid,.zny-print-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.zny-card{border:0;background:#fff;padding:0;cursor:zoom-in;text-align:left}.zny-card__media{position:relative;aspect-ratio:1/1;background:#fff;overflow:hidden}.zny-card img{display:block;width:100%;height:100%;object-fit:contain;background:#fff}.zny-card__img{position:absolute;inset:0;transition:opacity .28s ease}.zny-card__img--hover{opacity:0}.zny-card--has-hover:hover .zny-card__img--main{opacity:0}.zny-card--has-hover:hover .zny-card__img--hover{opacity:1}.zny-print-caption,.zny-sticker-caption{margin:.5rem 0 0;color:rgba(5,5,5,.48);font-size:.65rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase}.zny-afisha-list{display:grid;grid-template-columns:1fr;gap:2.4rem}.zny-afisha-card{width:100%}.zny-afisha-card .zny-card__media{aspect-ratio:auto;overflow:visible}.zny-afisha-card img{position:static;width:100%;height:auto;max-height:none;object-fit:contain}.zny-grid--example{grid-template-columns:repeat(4,minmax(0,1fr));gap:.35rem;align-items:start}.zny-grid--example .zny-card__media{aspect-ratio:auto;overflow:visible}.zny-grid--example .zny-card img{position:static;width:100%;height:auto;object-fit:contain}.zny-sticker-list{display:grid;gap:1rem}.zny-sticker-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;align-items:start}.zny-empty{font-size:.72rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase;color:rgba(5,5,5,.45)}.zny-light{position:fixed;inset:0;z-index:430;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);padding:1rem}.zny-light img{max-width:92vw;max-height:90vh;object-fit:contain}.zny-light button{position:absolute;right:1rem;top:1rem;border:0;background:#fff;color:#050505;padding:.7rem 1rem;font-size:.7rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase}@media(max-width:900px){.zny-grid,.zny-print-list{grid-template-columns:repeat(2,minmax(0,1fr))}.zny-grid--example{grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem}}@media(max-width:560px){.zny-grid,.zny-print-list,.zny-sticker-row,.zny-grid--example{grid-template-columns:1fr}.zny-section-head{display:block}.zny-count{display:block;margin-top:.75rem}}
    `;
    document.head.append(style);
  }

  function apiUrl(folder) { return `https://api.github.com/repos/${REPO}/contents/public/works/zny/${folder}?ref=${BRANCH}`; }

  async function fetchFolder(folder) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(apiUrl(folder), { signal: controller.signal });
      if (!response.ok) return [];
      const items = await response.json();
      return (Array.isArray(items) ? items : [])
        .filter((item) => item.type === 'file' && IMAGE_RE.test(item.name || item.path))
        .map((item) => ({ name: item.name, path: item.path, url: item.download_url || `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path}` }))
        .sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { numeric: true }));
    } catch (error) {
      return [];
    } finally {
      clearTimeout(timer);
    }
  }

  async function load() {
    const [prints, afisha, example, stickers] = await Promise.all([
      fetchFolder(FOLDERS.prints), fetchFolder(FOLDERS.afisha), fetchFolder(FOLDERS.example), fetchFolder(FOLDERS.stickers),
    ]);
    return { prints, afisha, example, stickers };
  }

  function lightbox(items, index = 0) {
    if (!items.length) return;
    let i = index;
    const overlay = el('div', 'zny-light');
    const close = el('button', '', 'CLOSE');
    const img = el('img');
    const render = () => { img.src = q(items[i].url); };
    close.onclick = () => overlay.remove();
    overlay.onclick = () => overlay.remove();
    img.onclick = (event) => { event.stopPropagation(); i = (i + 1) % items.length; render(); };
    overlay.append(close, img);
    document.body.append(overlay);
    render();
  }

  function card(item, list, index, caption, hoverItems = []) {
    const button = el('button', hoverItems.length ? 'zny-card zny-card--has-hover' : 'zny-card');
    button.type = 'button';
    const media = el('div', 'zny-card__media');
    const img = el('img', 'zny-card__img zny-card__img--main');
    img.src = q(item.url);
    img.alt = caption || basename(item.name || item.path);
    img.loading = 'lazy';
    media.append(img);
    let timer = null;
    if (hoverItems.length) {
      const hover = el('img', 'zny-card__img zny-card__img--hover');
      let hoverIndex = 0;
      const showHover = () => { hover.src = q(hoverItems[hoverIndex].url); hover.alt = `${img.alt} hover`; hoverIndex = (hoverIndex + 1) % hoverItems.length; };
      showHover();
      hover.loading = 'lazy';
      media.append(hover);
      button.addEventListener('mouseenter', () => { hoverIndex = 0; showHover(); clearInterval(timer); timer = setInterval(showHover, 700); });
      button.addEventListener('mouseleave', () => { clearInterval(timer); timer = null; hoverIndex = 0; showHover(); });
    }
    button.append(media);
    if (caption) button.append(el('p', 'zny-print-caption', caption));
    button.onclick = (event) => { event.stopPropagation(); lightbox(list, index); };
    return button;
  }

  function imageCard(item, list, index, className = '') {
    const button = el('button', `zny-card ${className}`.trim());
    button.type = 'button';
    const media = el('div', 'zny-card__media');
    const img = el('img');
    img.src = q(item.url);
    img.alt = basename(item.name || item.path);
    img.loading = 'lazy';
    media.append(img);
    button.append(media);
    button.onclick = (event) => { event.stopPropagation(); lightbox(list, index); };
    return button;
  }

  function getPrintKey(item) {
    const base = norm(basename(item.name || item.path));
    const match = base.match(/print[-_ ]?\d+/i);
    return match ? match[0].replace(/[_ ]/g, '-') : base.replace(/[-_ ]?(version|variant|tee|tshirt|shirt|hoodie|product|mockup|irl).*$/i, '');
  }

  function printRank(item) {
    const base = norm(basename(item.name || item.path));
    const isVariant = /version|variant|v\d|alt/.test(base);
    const isProduct = /tee|tshirt|t-shirt|shirt|hoodie|product|mockup|irl/.test(base);
    if (isVariant && isProduct) return 3;
    if (isVariant) return 1;
    if (isProduct) return 2;
    return 0;
  }

  function printGroups(items) {
    const map = new Map();
    items.forEach((item) => { const key = getPrintKey(item); if (!map.has(key)) map.set(key, []); map.get(key).push(item); });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([key, list]) => ({ key, list: list.sort((a, b) => printRank(a) - printRank(b) || (a.name || '').localeCompare(b.name || '', undefined, { numeric: true })) }));
  }

  function renderPrints(items) {
    const wrap = el('div', 'zny-print-list');
    if (!items.length) { wrap.append(el('p', 'zny-empty', 'Файлы для этого блока пока не найдены в /works/zny/prints')); return wrap; }
    printGroups(items).forEach((group) => {
      const main = group.list.find((item) => printRank(item) === 0) || group.list[0];
      const hoverItems = group.list.filter((item) => item !== main && printRank(item) > 0);
      const mainIndex = group.list.findIndex((item) => item === main);
      wrap.append(card(main, group.list, Math.max(mainIndex, 0), group.key.toUpperCase(), hoverItems));
    });
    return wrap;
  }

  function renderAfisha(items) {
    const wrap = el('div', 'zny-afisha-list');
    if (!items.length) { wrap.append(el('p', 'zny-empty', 'Файлы для этого блока пока не найдены в /works/zny/afisha')); return wrap; }
    items.forEach((item, index) => wrap.append(imageCard(item, items, index, 'zny-afisha-card')));
    return wrap;
  }

  function renderSimpleGrid(items, className, emptyText) {
    const grid = el('div', `${className || 'zny-grid'} zny-count-${items.length}`);
    if (!items.length) { grid.append(el('p', 'zny-empty', emptyText)); return grid; }
    items.forEach((item, index) => grid.append(imageCard(item, items, index)));
    return grid;
  }

  function getStickerKey(item) {
    const base = norm(basename(item.name || item.path));
    const match = base.match(/sticker[-_ ]?\d+/i);
    return match ? match[0].replace(/[_ ]/g, '-') : base.replace(/[-_ ]?irl.*$/i, '');
  }

  function stickerRank(item) { return /irl|real|photo|product/.test(norm(basename(item.name || item.path))) ? 1 : 0; }

  function renderStickers(items) {
    const wrap = el('div', 'zny-sticker-list');
    if (!items.length) { wrap.append(el('p', 'zny-empty', 'Файлы для этого блока пока не найдены в /works/zny/stickers')); return wrap; }
    const map = new Map();
    items.forEach((item) => { const key = getStickerKey(item); if (!map.has(key)) map.set(key, []); map.get(key).push(item); });
    Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).forEach(([, list]) => {
      const sorted = list.sort((a, b) => stickerRank(a) - stickerRank(b) || (a.name || '').localeCompare(b.name || '', undefined, { numeric: true }));
      const row = el('div', 'zny-sticker-row');
      sorted.forEach((item, index) => row.append(imageCard(item, sorted, index)));
      wrap.append(row);
    });
    return wrap;
  }

  function makeSection(title, count, node) {
    const section = el('section', 'zny-section');
    const head = el('div', 'zny-section-head');
    head.append(el('h3', 'zny-h', title), el('p', 'zny-count', `${count} / ${count}`));
    section.append(head, node);
    return section;
  }

  async function open() {
    styles();
    modal?.remove();
    lockPageScroll();
    modal = el('div', 'zny-modal');
    const inner = el('div', 'zny-inner');
    const header = el('div', 'zny-head');
    const close = el('button', 'zny-close', 'ЗАКРЫТЬ');
    close.onclick = closeModal;
    header.append(close);
    const loading = el('p', 'zny-empty', 'LOADING ZNY ASSETS...');
    inner.append(header, loading);
    modal.append(inner);
    document.body.append(modal);
    const data = await load();
    loading.remove();
    inner.append(makeSection('PRINTS', printGroups(data.prints).length, renderPrints(data.prints)));
    inner.append(makeSection('AFISHA', data.afisha.length, renderAfisha(data.afisha)));
    inner.append(makeSection('EXAMPLES', data.example.length, renderSimpleGrid(data.example, 'zny-grid zny-grid--example', 'Файлы для этого блока пока не найдены в /works/zny/example')));
    inner.append(makeSection('STICKERS', data.stickers.length, renderStickers(data.stickers)));
  }

  document.addEventListener('click', (event) => {
    const cardNode = event.target.closest('#works article, #works button');
    if (!cardNode) return;
    const title = cardNode.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'ZNY') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);
})();
