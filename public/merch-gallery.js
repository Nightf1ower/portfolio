(() => {
  const V = 'merch-2';
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
  let modal = null;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const q = (src) => `${src}?v=${V}`;
  const normalize = (value) => decodeURIComponent(value || '')
    .toLowerCase()
    .replace(/[\\]+/g, '/')
    .replace(/[\s_-]+/g, ' ')
    .trim();

  function lockScroll() {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeModal() {
    modal?.remove();
    modal = null;
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function addStyles() {
    if (document.getElementById('merch-gallery-style')) return;
    const style = el('style');
    style.id = 'merch-gallery-style';
    style.textContent = `
      html:has(.merch-modal),body:has(.merch-modal){overflow:hidden!important}
      .merch-modal{position:fixed;inset:0;z-index:360;overflow-y:auto;overflow-x:hidden;background:#87CEEB;color:#050505;padding:1.25rem 1rem 5rem}
      .merch-inner{width:min(100%,82rem);margin:0 auto}
      .merch-head{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.75rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.3);background:rgba(135,206,235,.94);backdrop-filter:blur(12px)}
      .merch-label,.merch-close,.merch-count{font-size:.68rem;font-weight:900;letter-spacing:.26em;text-transform:uppercase}
      .merch-label{background:#050505;color:#fff;padding:.4rem .75rem}
      .merch-close{border:1px solid #050505;background:#050505;color:#fff;padding:.65rem 1rem;cursor:pointer}
      .merch-hero{padding:3.5rem 0 4.5rem;border-bottom:1px solid rgba(5,5,5,.3)}
      .merch-kicker{margin:0 0 1rem;font-size:.72rem;font-weight:900;letter-spacing:.3em;text-transform:uppercase}
      .merch-title{max-width:14ch;margin:0;font-size:clamp(3.4rem,8vw,8.5rem);font-weight:900;line-height:.83;letter-spacing:-.08em;text-transform:uppercase}
      .merch-section{padding-top:1.4rem;border-top:1px solid rgba(5,5,5,.3)}
      .merch-section+.merch-section{margin-top:5rem}
      .merch-section-head{display:flex;justify-content:space-between;gap:1rem;align-items:flex-end;margin-bottom:1.25rem}
      .merch-section-title{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.075em;text-transform:uppercase}
      .merch-count{margin:0;color:rgba(5,5,5,.55)}
      .merch-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
      .merch-card{border:0;background:rgba(255,255,255,.72);padding:0;cursor:zoom-in;overflow:hidden}
      .merch-card-media{position:relative;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;overflow:hidden}
      .merch-card img{display:block;width:100%;height:100%;object-fit:contain;padding:.75rem}
      .merch-brochure{width:min(100%,58rem);margin:0 auto;background:rgba(255,255,255,.75)}
      .merch-brochure .merch-card-media{aspect-ratio:4/3}
      .merch-hover-layer{position:absolute;inset:0;opacity:0;transition:opacity .55s ease}
      .merch-hover-layer.is-active{opacity:1}
      .merch-empty{margin:0;font-size:.72rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:rgba(5,5,5,.55)}
      .merch-lightbox{position:fixed;inset:0;z-index:460;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.93);padding:1rem}
      .merch-lightbox img{max-width:92vw;max-height:90vh;object-fit:contain}
      .merch-lightbox button{position:absolute;top:1rem;right:1rem;border:0;background:#fff;color:#050505;padding:.7rem 1rem;font-size:.7rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase}
      @media(max-width:900px){.merch-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:560px){.merch-grid{grid-template-columns:1fr}.merch-section-head{display:block}.merch-count{margin-top:.75rem}.merch-title{font-size:clamp(2.8rem,14vw,5rem)}}
    `;
    document.head.append(style);
  }

  async function loadAssets() {
    try {
      const response = await fetch(`https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`);
      if (!response.ok) return [];
      const data = await response.json();
      return (data.tree || [])
        .filter((item) => item.type === 'blob' && IMAGE_RE.test(item.path || ''))
        .filter((item) => {
          const path = normalize(item.path);
          const hasMerch = /(^|\/)merch(\/|$)/.test(path);
          const hasProject = path.includes('yablochko zelenoe') || path.includes('яблочко зеленое');
          return hasMerch && hasProject;
        })
        .sort((a, b) => (a.path || '').localeCompare(b.path || '', undefined, { numeric: true }))
        .map((item) => ({ path: item.path, url: `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path}` }));
    } catch {
      return [];
    }
  }

  function category(item) {
    const path = normalize(item.path);
    if (path.includes('/brochure/') || /(^|\/)brochure[^/]*$/.test(path)) return 'brochure';
    if (path.includes('/prints/') || /(^|\/)prints?[^/]*$/.test(path)) return 'prints';
    if (path.includes('/posters/') || /(^|\/)posters?[^/]*$/.test(path)) return 'posters';
    if (path.includes('/ads/') || /(^|\/)ads?[^/]*$/.test(path)) return 'ads';
    if (path.includes('/billboards/') || /(^|\/)billboards?[^/]*$/.test(path)) return 'billboards';
    return 'other';
  }

  function lightbox(items, index = 0) {
    if (!items.length) return;
    let current = index;
    const overlay = el('div', 'merch-lightbox');
    const close = el('button', '', 'CLOSE');
    const img = el('img');
    const render = () => { img.src = q(items[current].url); };
    close.onclick = () => overlay.remove();
    overlay.onclick = () => overlay.remove();
    img.onclick = (event) => { event.stopPropagation(); current = (current + 1) % items.length; render(); };
    overlay.append(close, img);
    document.body.append(overlay);
    render();
  }

  function regularGrid(items) {
    const grid = el('div', 'merch-grid');
    if (!items.length) {
      grid.append(el('p', 'merch-empty', 'FILES NOT FOUND'));
      return grid;
    }
    items.forEach((item, index) => {
      const button = el('button', 'merch-card');
      button.type = 'button';
      const media = el('div', 'merch-card-media');
      const img = el('img');
      img.src = q(item.url);
      img.alt = item.path.split('/').pop();
      img.loading = 'lazy';
      media.append(img);
      button.append(media);
      button.onclick = () => lightbox(items, index);
      grid.append(button);
    });
    return grid;
  }

  function brochureBlock(items) {
    const button = el('button', 'merch-card merch-brochure');
    button.type = 'button';
    const media = el('div', 'merch-card-media');
    if (!items.length) {
      media.append(el('p', 'merch-empty', 'FILES NOT FOUND'));
      button.append(media);
      return button;
    }
    const base = el('img');
    base.src = q(items[0].url);
    base.alt = items[0].path.split('/').pop();
    media.append(base);
    const layers = items.slice(1).map((item) => {
      const img = el('img', 'merch-hover-layer');
      img.src = q(item.url);
      img.alt = item.path.split('/').pop();
      media.append(img);
      return img;
    });
    let timer = null;
    let current = 0;
    const show = () => {
      layers.forEach((layer, index) => layer.classList.toggle('is-active', index === current));
      current = (current + 1) % Math.max(layers.length, 1);
    };
    button.onmouseenter = () => {
      if (!layers.length) return;
      current = 0;
      show();
      timer = setInterval(show, 900);
    };
    button.onmouseleave = () => {
      clearInterval(timer);
      timer = null;
      layers.forEach((layer) => layer.classList.remove('is-active'));
    };
    button.onclick = () => lightbox(items, 0);
    button.append(media);
    return button;
  }

  function section(title, items, node) {
    const wrapper = el('section', 'merch-section');
    const head = el('div', 'merch-section-head');
    head.append(el('h2', 'merch-section-title', title), el('p', 'merch-count', `${items.length} / ${items.length}`));
    wrapper.append(head, node);
    return wrapper;
  }

  async function open() {
    addStyles();
    modal?.remove();
    lockScroll();
    modal = el('div', 'merch-modal');
    const inner = el('div', 'merch-inner');
    const header = el('div', 'merch-head');
    const close = el('button', 'merch-close', 'ЗАКРЫТЬ');
    close.onclick = closeModal;
    header.append(el('p', 'merch-label', 'MERCH'), close);

    const language = localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
    const hero = el('section', 'merch-hero');
    hero.append(
      el('p', 'merch-kicker', language === 'ru' ? 'ЯБЛОЧКО ЗЕЛЕНОЕ' : 'YABLOCHKO ZELENOE'),
      el('h1', 'merch-title', language === 'ru'
        ? 'Разработка мерча к альбому музыканта «Яблочко Зеленое»'
        : 'Merchandise Design for the Album “Yablochko Zelenoe”')
    );

    const loading = el('p', 'merch-empty', 'LOADING ASSETS...');
    inner.append(header, hero, loading);
    modal.append(inner);
    document.body.append(modal);

    const assets = await loadAssets();
    loading.remove();
    const groups = { brochure: [], prints: [], posters: [], ads: [], billboards: [] };
    assets.forEach((item) => { const key = category(item); if (groups[key]) groups[key].push(item); });

    inner.append(
      section('BROCHURE', groups.brochure, brochureBlock(groups.brochure)),
      section('PRINTS', groups.prints, regularGrid(groups.prints)),
      section('POSTERS', groups.posters, regularGrid(groups.posters)),
      section('ADS', groups.ads, regularGrid(groups.ads)),
      section('BILLBOARDS', groups.billboards, regularGrid(groups.billboards))
    );
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    if (!card) return;
    const title = (card.querySelector('h3')?.textContent || '').trim().toUpperCase().replace(/[^A-ZА-Я0-9]/g, '');
    if (title !== 'MERCH') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);
})();
