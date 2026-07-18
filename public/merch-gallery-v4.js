(() => {
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const ROOT = 'public/works/merch/yablochko';
  const VERSION = 'merch-4';
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

  const imageUrl = (path) => `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${path}?v=${VERSION}`;
  const fileName = (item) => (item.path || '').split('/').pop() || '';
  const numberFrom = (item) => {
    const match = fileName(item).match(/(\d+)/);
    return match ? Number(match[1]) : 999;
  };

  function addStyles() {
    if (document.getElementById('merch-v4-style')) return;
    const style = el('style');
    style.id = 'merch-v4-style';
    style.textContent = `
      html:has(.merch4-modal),body:has(.merch4-modal){overflow:hidden!important}
      .merch4-modal{position:fixed;inset:0;z-index:390;overflow-y:auto;overflow-x:hidden;background:rgba(135,206,235,0);color:#050505;padding:1.25rem 1rem 5rem;opacity:0;transition:background-color .65s ease,opacity .45s ease}
      .merch4-modal.is-open{background:#87CEEB;opacity:1}
      .merch4-inner{width:min(100%,86rem);margin:0 auto;transform:translateY(18px);opacity:0;transition:transform .65s ease,opacity .55s ease}
      .merch4-modal.is-open .merch4-inner{transform:translateY(0);opacity:1}
      .merch4-head{position:sticky;top:0;z-index:20;display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.75rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.3);background:rgba(135,206,235,.92);backdrop-filter:blur(12px)}
      .merch4-label,.merch4-close,.merch4-count,.merch4-empty{font-size:.68rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase}
      .merch4-label,.merch4-close{border:0;background:#050505;color:#fff;padding:.58rem .9rem}
      .merch4-close{cursor:pointer}
      .merch4-hero{padding:4rem 0 5rem}
      .merch4-kicker{margin:0;font-size:.72rem;font-weight:900;letter-spacing:.3em;text-transform:uppercase}
      .merch4-title{max-width:15ch;margin:.9rem 0 0;font-size:clamp(3.2rem,7.8vw,8.7rem);font-weight:900;line-height:.83;letter-spacing:-.085em;text-transform:uppercase}
      .merch4-section{border-top:1px solid rgba(5,5,5,.3);padding-top:1.35rem;margin-top:6rem}
      .merch4-section:first-of-type{margin-top:0}
      .merch4-section-head{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;margin-bottom:1.5rem}
      .merch4-section-title{margin:0;font-size:clamp(3rem,6.5vw,7rem);font-weight:900;line-height:.8;letter-spacing:-.08em;text-transform:uppercase}
      .merch4-count{margin:0;color:rgba(5,5,5,.55)}
      .merch4-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}
      .merch4-card{border:0;background:transparent;padding:0;cursor:zoom-in;overflow:visible}
      .merch4-media{position:relative;overflow:hidden;background:transparent}
      .merch4-card img{display:block;width:100%;height:auto;object-fit:contain;background:transparent}
      .merch4-layer{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:contain;opacity:0;transition:opacity .5s ease}
      .merch4-card:hover .merch4-layer{opacity:1}
      .merch4-brochure-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}
      .merch4-prints{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.25rem;align-items:start}
      .merch4-print-large{grid-column:1/-1;margin-top:.25rem}
      .merch4-feature-layout{display:grid;gap:1.25rem}
      .merch4-feature-main{width:100%}
      .merch4-feature-rest{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}
      .merch4-ads-rest{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.25rem}
      .merch4-empty{padding:2rem 0;color:rgba(5,5,5,.5)}
      .merch4-light{position:fixed;inset:0;z-index:490;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.94);padding:1rem}
      .merch4-light img{max-width:94vw;max-height:92vh;object-fit:contain}
      .merch4-light button{position:absolute;top:1rem;right:1rem;border:0;background:#fff;color:#050505;padding:.75rem 1rem;font-size:.7rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase}
      @media(max-width:800px){.merch4-prints{grid-template-columns:repeat(2,minmax(0,1fr))}.merch4-prints .merch4-card:nth-child(3){grid-column:1/-1}.merch4-ads-rest{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:560px){.merch4-brochure-grid,.merch4-grid,.merch4-feature-rest,.merch4-ads-rest,.merch4-prints{grid-template-columns:1fr}.merch4-prints .merch4-card:nth-child(3){grid-column:auto}.merch4-section-head{display:block}.merch4-count{margin-top:.8rem}.merch4-title{font-size:clamp(2.8rem,14vw,5.2rem)}}
    `;
    document.head.append(style);
  }

  async function fetchAssets() {
    const response = await fetch(`https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1&v=${Date.now()}`);
    if (!response.ok) throw new Error(`GitHub tree ${response.status}`);
    const data = await response.json();
    return (data.tree || [])
      .filter((item) => item.type === 'blob' && IMAGE_RE.test(item.path || ''))
      .filter((item) => (item.path || '').toLowerCase().startsWith(`${ROOT}/`))
      .sort((a, b) => numberFrom(a) - numberFrom(b) || fileName(a).localeCompare(fileName(b), undefined, { numeric: true }));
  }

  function category(item) {
    const path = (item.path || '').toLowerCase();
    if (path.includes('/brochure/')) return 'brochure';
    if (path.includes('/print/')) return 'print';
    if (path.includes('/poster/')) return 'poster';
    if (path.includes('/ad/')) return 'ad';
    if (path.includes('/billboard/')) return 'billboard';
    return 'other';
  }

  function lightbox(items, index = 0) {
    if (!items.length) return;
    let current = index;
    const overlay = el('div', 'merch4-light');
    const close = el('button', '', 'CLOSE');
    const image = el('img');
    const render = () => { image.src = imageUrl(items[current].path); };
    overlay.onclick = () => overlay.remove();
    close.onclick = () => overlay.remove();
    image.onclick = (event) => {
      event.stopPropagation();
      current = (current + 1) % items.length;
      render();
    };
    overlay.append(close, image);
    document.body.append(overlay);
    render();
  }

  function imageCard(item, items, index, extraClass = '') {
    const button = el('button', `merch4-card ${extraClass}`.trim());
    button.type = 'button';
    const media = el('div', 'merch4-media');
    const image = el('img');
    image.src = imageUrl(item.path);
    image.alt = fileName(item);
    image.loading = 'lazy';
    media.append(image);
    button.append(media);
    button.onclick = () => lightbox(items, index);
    return button;
  }

  function brochureLayout(items) {
    const wrap = el('div', 'merch4-brochure-grid');
    if (!items.length) {
      wrap.append(el('p', 'merch4-empty', 'FILES NOT FOUND'));
      return wrap;
    }
    const sorted = [...items].sort((a, b) => numberFrom(a) - numberFrom(b));
    const visible = sorted.slice(0, 2);
    visible.forEach((item, index) => {
      const button = el('button', 'merch4-card');
      button.type = 'button';
      const media = el('div', 'merch4-media');
      const base = el('img');
      base.src = imageUrl(item.path);
      base.alt = fileName(item);
      media.append(base);
      const hoverItem = sorted[index + 2];
      if (hoverItem) {
        const hover = el('img', 'merch4-layer');
        hover.src = imageUrl(hoverItem.path);
        hover.alt = fileName(hoverItem);
        media.append(hover);
      }
      button.append(media);
      button.onclick = () => lightbox(sorted, index);
      wrap.append(button);
    });
    return wrap;
  }

  function printsLayout(items) {
    const wrap = el('div', 'merch4-prints');
    if (!items.length) {
      wrap.append(el('p', 'merch4-empty', 'FILES NOT FOUND'));
      return wrap;
    }
    const byNumber = new Map(items.map((item) => [numberFrom(item), item]));
    const ordered = [1, 4, 2, 3].map((number) => byNumber.get(number)).filter(Boolean);
    ordered.forEach((item, index) => {
      const number = numberFrom(item);
      wrap.append(imageCard(item, ordered, index, number === 3 ? 'merch4-print-large' : ''));
    });
    return wrap;
  }

  function featureLayout(items, featuredNumber, restClass = 'merch4-feature-rest') {
    const wrap = el('div', 'merch4-feature-layout');
    if (!items.length) {
      wrap.append(el('p', 'merch4-empty', 'FILES NOT FOUND'));
      return wrap;
    }
    const sorted = [...items].sort((a, b) => numberFrom(a) - numberFrom(b));
    const featured = sorted.find((item) => numberFrom(item) === featuredNumber) || sorted[0];
    const rest = sorted.filter((item) => item !== featured);
    wrap.append(imageCard(featured, sorted, sorted.indexOf(featured), 'merch4-feature-main'));
    if (rest.length) {
      const grid = el('div', restClass);
      rest.forEach((item) => grid.append(imageCard(item, sorted, sorted.indexOf(item))));
      wrap.append(grid);
    }
    return wrap;
  }

  function regularGrid(items) {
    const grid = el('div', 'merch4-grid');
    if (!items.length) {
      grid.append(el('p', 'merch4-empty', 'FILES NOT FOUND'));
      return grid;
    }
    items.forEach((item, index) => grid.append(imageCard(item, items, index)));
    return grid;
  }

  function section(title, items, content) {
    const sectionNode = el('section', 'merch4-section');
    const head = el('div', 'merch4-section-head');
    head.append(el('h2', 'merch4-section-title', title), el('p', 'merch4-count', `${items.length} / ${items.length}`));
    sectionNode.append(head, content);
    return sectionNode;
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    setTimeout(() => {
      modal?.remove();
      modal = null;
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    }, 420);
  }

  async function openModal() {
    addStyles();
    modal?.remove();
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    modal = el('div', 'merch4-modal');
    const inner = el('div', 'merch4-inner');
    const header = el('div', 'merch4-head');
    const close = el('button', 'merch4-close', 'ЗАКРЫТЬ');
    close.onclick = closeModal;
    header.append(el('p', 'merch4-label', 'MERCH'), close);

    const language = localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
    const hero = el('section', 'merch4-hero');
    hero.append(
      el('p', 'merch4-kicker', language === 'ru' ? 'ЯБЛОЧКО ЗЕЛЕНОЕ' : 'YABLOCHKO ZELENOE'),
      el('h1', 'merch4-title', language === 'ru'
        ? 'Разработка мерча к альбому музыканта «Яблочко Зеленое»'
        : 'Merchandise Design for the Album “Yablochko Zelenoe”')
    );

    const loading = el('p', 'merch4-empty', 'LOADING ASSETS...');
    inner.append(header, hero, loading);
    modal.append(inner);
    document.body.append(modal);
    requestAnimationFrame(() => requestAnimationFrame(() => modal?.classList.add('is-open')));

    try {
      const assets = await fetchAssets();
      const groups = { brochure: [], print: [], poster: [], ad: [], billboard: [] };
      assets.forEach((item) => {
        const key = category(item);
        if (groups[key]) groups[key].push(item);
      });
      loading.remove();
      inner.append(
        section('BROCHURE', groups.brochure, brochureLayout(groups.brochure)),
        section('PRINTS', groups.print, printsLayout(groups.print)),
        section('POSTERS', groups.poster, featureLayout(groups.poster, 3)),
        section('ADS', groups.ad, featureLayout(groups.ad, 4, 'merch4-ads-rest')),
        section('BILLBOARDS', groups.billboard, regularGrid(groups.billboard))
      );
    } catch (error) {
      loading.textContent = `LOAD ERROR: ${error.message}`;
    }
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    if (!card) return;
    const title = (card.querySelector('h3')?.textContent || '').toUpperCase().replace(/[^A-ZА-Я0-9]/g, '');
    if (title !== 'MERCH') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openModal();
  }, true);
})();
