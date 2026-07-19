(() => {
  if (window.__fableGalleryLoaded) return;
  window.__fableGalleryLoaded = true;

  const V = 'fable-3';
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      loading: 'ЗАГРУЗКА МАТЕРИАЛОВ FABLE...',
      title: 'ПРИНТЫ',
      empty: 'ФАЙЛЫ ДЛЯ ЭТОГО БЛОКА ПОКА НЕ НАЙДЕНЫ',
    },
    en: {
      close: 'CLOSE',
      loading: 'LOADING FABLE ASSETS...',
      title: 'PRINTS',
      empty: 'FILES FOR THIS SECTION HAVE NOT BEEN ADDED YET',
    },
  };

  let modal = null;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const currentLanguage = () => {
    const htmlLanguage = document.documentElement.lang;
    if (htmlLanguage === 'ru' || htmlLanguage === 'en') return htmlLanguage;
    return localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  };
  const q = (src) => `${src}?v=${V}`;
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

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
    const previous = document.getElementById('fable-style');
    if (previous?.dataset.version === V) return;
    previous?.remove();

    const style = el('style');
    style.id = 'fable-style';
    style.dataset.version = V;
    style.textContent = `
      html:has(.fable-modal),body:has(.fable-modal){overflow:hidden!important}.fable-modal{position:fixed;inset:0;z-index:335;overflow-y:auto;overflow-x:hidden;background:#fff;color:#050505;padding:1.5rem 1rem 4rem}.fable-inner{width:min(100%,80rem);margin:0 auto}.fable-head{position:relative;top:auto;z-index:5;display:flex;justify-content:space-between;gap:1rem;margin-bottom:2rem;padding:.7rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.22);background:transparent}.fable-label,.fable-close,.fable-count{font-size:.68rem;font-weight:900;letter-spacing:.28em;text-transform:uppercase}.fable-label{background:#050505;color:#fff;padding:.35rem .75rem}.fable-close{border:1px solid #050505;background:#050505;color:#fff;padding:.55rem 1rem}.fable-section{border-top:1px solid rgba(5,5,5,.22);padding-top:1.25rem}.fable-section-head{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.25rem}.fable-title{margin:0;font-size:clamp(3.6rem,9vw,9rem);font-weight:900;line-height:.78;letter-spacing:-.09em;text-transform:uppercase}.fable-count{margin:0;color:rgba(5,5,5,.48)}.fable-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.fable-card{border:0;background:#fff;padding:0;cursor:zoom-in}.fable-card img{display:block;width:100%;height:100%;aspect-ratio:1/1;object-fit:contain;background:#fff}.fable-empty{font-size:.72rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase;color:rgba(5,5,5,.45)}.fable-light{position:fixed;inset:0;z-index:435;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);padding:1rem}.fable-light img{max-width:92vw;max-height:90vh;object-fit:contain}.fable-light button{position:absolute;right:1rem;top:1rem;border:0;background:#fff;color:#050505;padding:.7rem 1rem;font-size:.7rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase}@media(max-width:900px){.fable-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.fable-grid{grid-template-columns:1fr}.fable-section-head{display:block}.fable-count{display:block;margin-top:.75rem}}
    `;
    document.head.append(style);
  }

  function updateLanguage() {
    if (!modal) return;
    const copy = COPY[currentLanguage()];
    const close = modal.querySelector('.fable-close');
    const loading = modal.querySelector('[data-fable-loading]');
    const title = modal.querySelector('.fable-title');
    const empty = modal.querySelector('[data-fable-empty]');
    if (close) close.textContent = copy.close;
    if (loading) loading.textContent = copy.loading;
    if (title) title.textContent = copy.title;
    if (empty) empty.textContent = copy.empty;
  }

  async function loadImages() {
    try {
      const response = await fetch(`https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`);
      if (!response.ok) return [];
      const data = await response.json();
      return (data.tree || [])
        .filter((item) => item.type === 'blob')
        .filter((item) => /^public\/works\/fable\//i.test(item.path || '') && IMAGE_RE.test(item.path || ''))
        .sort((a, b) => (a.path || '').localeCompare(b.path || '', undefined, { numeric: true }))
        .map((item) => ({ path: item.path, url: `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path}` }));
    } catch {
      return [];
    }
  }

  function lightbox(items, index = 0) {
    if (!items.length) return;
    let current = index;
    const overlay = el('div', 'fable-light');
    const close = el('button', '', COPY[currentLanguage()].close);
    const img = el('img');
    const render = () => { img.src = q(items[current].url); };
    close.onclick = () => overlay.remove();
    overlay.onclick = () => overlay.remove();
    img.onclick = (event) => {
      event.stopPropagation();
      current = (current + 1) % items.length;
      render();
    };
    overlay.append(close, img);
    document.body.append(overlay);
    render();
  }

  function renderGrid(items) {
    const grid = el('div', 'fable-grid');
    if (!items.length) {
      const empty = el('p', 'fable-empty', COPY[currentLanguage()].empty);
      empty.dataset.fableEmpty = 'true';
      grid.append(empty);
      return grid;
    }
    items.forEach((item, index) => {
      const button = el('button', 'fable-card');
      button.type = 'button';
      const img = el('img');
      img.src = q(item.url);
      img.alt = item.path.split('/').pop().replace(/\.[^.]+$/, '');
      img.loading = 'lazy';
      button.append(img);
      button.onclick = (event) => {
        event.stopPropagation();
        lightbox(items, index);
      };
      grid.append(button);
    });
    return grid;
  }

  async function open() {
    styles();
    closeModal();
    lockPageScroll();

    const copy = COPY[currentLanguage()];
    modal = el('div', 'fable-modal');
    const inner = el('div', 'fable-inner');
    const header = el('div', 'fable-head');
    const close = el('button', 'fable-close', copy.close);
    close.onclick = closeModal;
    header.append(el('p', 'fable-label', 'FABLE'), close);

    const loading = el('p', 'fable-empty', copy.loading);
    loading.dataset.fableLoading = 'true';
    inner.append(header, loading);
    modal.append(inner);
    document.body.append(modal);

    const items = await loadImages();
    if (!modal || !document.body.contains(modal)) return;
    loading.remove();

    const section = el('section', 'fable-section');
    const head = el('div', 'fable-section-head');
    head.append(el('h2', 'fable-title', copy.title), el('p', 'fable-count', `${items.length} / ${items.length}`));
    section.append(head, renderGrid(items));
    inner.append(section);
  }

  const languageObserver = new MutationObserver(updateLanguage);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const lightbox = document.querySelector('.fable-light');
    if (lightbox) lightbox.remove();
    else if (modal) closeModal();
  });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    if (!card) return;
    const rawTitle = card.querySelector('h3')?.textContent?.trim().toUpperCase() || '';
    const title = rawTitle.replace(/[^A-ZА-Я0-9]/g, '');
    if (title !== 'FABLE') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);
})();