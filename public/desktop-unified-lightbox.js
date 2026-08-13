(() => {
  if (window.__portfolioUnifiedLightboxV3) return;
  window.__portfolioUnifiedLightboxV3 = true;

  const VERSION = 'portfolio-unified-lightbox-3';
  const STYLE_ID = 'desktop-unified-lightbox-style';
  const MODAL_SELECTOR = [
    '.zny-modal','.fable-modal','.pink-punk-fullscreen','.cr-modal','.blandetto-modal','.bf',
    '.project9006-modal','.pcg-modal','.pag-modal','.mc-modal','.m10-modal','.stk-modal','.lcg-modal',
    '.album-covers-modal','.su-modal','.anka-peresild-modal','.vtb-modal','.collages-modal'
  ].join(',');
  const CONTROL_SELECTOR = [
    '.zny-close','.fable-close','.su-close','.vtb-close','.cr-close','.mc-close','.stk-close',
    '.pcg-close','.lcg-close','.pag-close','.blandetto-close','.bf-close','.bf-x',
    '.anka-peresild-close','.album-covers-close','.project9006-toolbar__close','.project9006-close',
    '.p9006-close','.desktop-project-navigation','.project-scroll-top','.cr-final-scroll-top',
    '.desktop-unified-lightbox','a[href]','input','select','textarea'
  ].join(',');
  const CARD_SELECTOR = [
    '[data-images]','[data-hover-src]','[data-worn-src]','[data-alt-src]','[data-full]',
    '.cr-card','.zny-card','.fable-card','.bf-card','.blandetto-card','.m10-card','.mc-card',
    '.su-card','.su-concept-main','.su-concept-step','.vtb-card','.stk-card','.pcg-card','.pag-card',
    '.lcg-card','.album-covers-card','.anka-peresild-card','.project9006-logo-card',
    '.project9006-logo-sheet','.project9006-merch-media','.project9006-photoshoot-card','.project9006-poster-card',
    '.pink-punk-frame','.pink-punk-frame--hover','button[class*="card"]'
  ].join(',');

  let overlay = null;
  let sources = [];
  let index = 0;
  let previousFocus = null;
  let changeTimer = 0;

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      ${MODAL_SELECTOR} img:not(.desktop-unified-lightbox__image),
      ${MODAL_SELECTOR} ${CARD_SELECTOR}{cursor:zoom-in}
      .desktop-unified-lightbox{
        position:fixed;inset:0;z-index:3000000;display:grid;grid-template-columns:auto minmax(0,1fr) auto;
        align-items:center;gap:clamp(.65rem,2vw,1.5rem);box-sizing:border-box;width:100vw;height:100dvh;
        padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background:rgba(0,0,0,.975);color:#fff;overflow:hidden;opacity:0;transition:opacity .14s ease;
        touch-action:pinch-zoom;overscroll-behavior:none
      }
      .desktop-unified-lightbox.is-open{opacity:1}
      .desktop-unified-lightbox__stage{position:relative;display:flex;align-items:center;justify-content:center;min-width:0;height:calc(100dvh - 2rem);overflow:hidden}
      .desktop-unified-lightbox__image{display:block;width:auto;height:auto;max-width:100%;max-height:92dvh;object-fit:contain;user-select:none;-webkit-user-drag:none;backface-visibility:hidden;opacity:1;transform:translate3d(0,0,0);transition:opacity .11s ease,transform .13s cubic-bezier(.2,.8,.2,1)}
      .desktop-unified-lightbox__image.is-changing{opacity:.12;transform:translate3d(var(--du-direction,0px),0,0)}
      .desktop-unified-lightbox__nav,.desktop-unified-lightbox__close{border:1px solid rgba(255,255,255,.82);border-radius:0;background:#050505;color:#fff;cursor:pointer;font-family:Arial,Helvetica,sans-serif;font-weight:900;touch-action:manipulation}
      .desktop-unified-lightbox__nav{display:grid;place-items:center;width:3.6rem;height:3.6rem;font-size:1.6rem}
      .desktop-unified-lightbox__nav:hover,.desktop-unified-lightbox__close:hover{background:#a6ff00;color:#050505}
      .desktop-unified-lightbox__close{position:absolute;top:max(1rem,env(safe-area-inset-top));right:max(1rem,env(safe-area-inset-right));z-index:3;min-height:2.9rem;padding:.75rem 1rem;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase}
      .desktop-unified-lightbox__counter{position:absolute;left:50%;bottom:max(1rem,env(safe-area-inset-bottom));transform:translateX(-50%);margin:0;padding:.5rem .75rem;background:#fff;color:#050505;font:900 .65rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em;white-space:nowrap}
      .desktop-unified-lightbox__hint{position:absolute;left:max(1rem,env(safe-area-inset-left));bottom:max(1rem,env(safe-area-inset-bottom));margin:0;color:rgba(255,255,255,.58);font:900 .58rem/1 Arial,Helvetica,sans-serif;letter-spacing:.16em;text-transform:uppercase}
      .desktop-unified-lightbox.is-single .desktop-unified-lightbox__nav{visibility:hidden;pointer-events:none}
      @media(hover:none),(pointer:coarse),(max-width:820px){
        .desktop-unified-lightbox{grid-template-columns:1fr;padding:max(.75rem,env(safe-area-inset-top)) max(.75rem,env(safe-area-inset-right)) max(.75rem,env(safe-area-inset-bottom)) max(.75rem,env(safe-area-inset-left))}
        .desktop-unified-lightbox__stage{height:calc(100dvh - 1.5rem)}
        .desktop-unified-lightbox__nav{position:absolute;z-index:2;width:3rem;height:3rem;opacity:0;pointer-events:none}
        .desktop-unified-lightbox__hint{display:none}
        .desktop-unified-lightbox__counter{bottom:max(.75rem,env(safe-area-inset-bottom))}
      }
      @media(prefers-reduced-motion:reduce){.desktop-unified-lightbox,.desktop-unified-lightbox__image{transition:none!important}}
    `;
    document.head.append(style);
  }

  function normalizeUrl(value) {
    if (!value) return '';
    let raw = String(value).trim().replace(/^[\'\"]|[\'\"]$/g, '');
    if (!raw || raw === 'none' || raw.startsWith('data:image/svg')) return '';
    try { return new URL(raw, location.href).href; } catch { return raw; }
  }
  const unique = (list) => [...new Set(list.map(normalizeUrl).filter(Boolean))];

  function imageSource(image) {
    if (!(image instanceof HTMLImageElement)) return '';
    return normalizeUrl(
      image.dataset.portfolioOriginal ||
      image.getAttribute('data-original') ||
      image.getAttribute('data-full') ||
      image.getAttribute('data-large') ||
      image.currentSrc ||
      image.getAttribute('src')
    );
  }

  function backgroundUrls(node) {
    if (!(node instanceof Element)) return [];
    const background = getComputedStyle(node).backgroundImage || '';
    return [...background.matchAll(/url\(([\'\"]?)(.*?)\1\)/g)].map((match) => normalizeUrl(match[2]));
  }

  function sourceUrls(root) {
    if (!(root instanceof Element)) return [];
    const found = [];
    const nodes = [root, ...root.querySelectorAll('*')];
    for (const node of nodes) {
      if (!(node instanceof Element)) continue;
      if (node.closest('.desktop-unified-lightbox,.desktop-project-navigation')) continue;
      if (node instanceof HTMLImageElement) found.push(imageSource(node));
      for (const key of ['data-hover-src','data-alt-src','data-worn-src','data-active-src','data-image','data-src','data-full','data-large']) {
        found.push(normalizeUrl(node.getAttribute(key)));
      }
      const list = node.getAttribute('data-images');
      if (list) found.push(...list.split(/[|,]/).map(normalizeUrl));
      if (node.matches(CARD_SELECTOR)) found.push(...backgroundUrls(node));
    }
    return unique(found);
  }

  function visibleImage(root) {
    const images = [...root.querySelectorAll('img')].filter((image) => {
      const css = getComputedStyle(image);
      const rect = image.getBoundingClientRect();
      return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0 && rect.width > 20 && rect.height > 20;
    });
    return images.sort((a,b) => {
      const ar=a.getBoundingClientRect(), br=b.getBoundingClientRect();
      return (br.width*br.height)-(ar.width*ar.height);
    })[0] || root.querySelector('img');
  }

  function resolveTarget(target) {
    if (!(target instanceof Element)) return null;
    if (target.closest('.desktop-unified-lightbox')) return null;
    const modal = target.closest(MODAL_SELECTOR);
    if (!modal || target.closest(CONTROL_SELECTOR)) return null;
    let image = target.closest('img');
    if (!(image instanceof HTMLImageElement)) {
      const card = target.closest(CARD_SELECTOR);
      if (card && modal.contains(card)) image = visibleImage(card);
    }
    if (!(image instanceof HTMLImageElement)) return null;
    return { modal, image };
  }

  function preloadNeighbors() {
    if (sources.length < 2) return;
    for (const offset of [-1,1]) {
      const preload = new Image();
      preload.decoding = 'async';
      preload.src = sources[(index + offset + sources.length) % sources.length];
    }
  }

  function render(direction = 0, immediate = false) {
    if (!overlay || !sources.length) return;
    clearTimeout(changeTimer);
    const image = overlay.querySelector('.desktop-unified-lightbox__image');
    const counter = overlay.querySelector('.desktop-unified-lightbox__counter');
    const apply = () => {
      if (!overlay || !image?.isConnected) return;
      image.src = sources[index];
      image.style.setProperty('--du-direction','0px');
      image.classList.remove('is-changing');
      counter.textContent = `${String(index+1).padStart(2,'0')} / ${String(sources.length).padStart(2,'0')}`;
      preloadNeighbors();
    };
    if (immediate) { apply(); return; }
    image.style.setProperty('--du-direction',`${direction * 28}px`);
    image.classList.add('is-changing');
    changeTimer = setTimeout(apply, 70);
  }

  function step(amount) {
    if (sources.length < 2) return;
    index = (index + amount + sources.length) % sources.length;
    render(amount > 0 ? 1 : -1);
  }

  function close() {
    if (!overlay) return;
    clearTimeout(changeTimer);
    const current = overlay;
    overlay = null;
    sources = [];
    index = 0;
    current.classList.remove('is-open');
    setTimeout(() => current.remove(), matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 130);
    const focus = previousFocus;
    previousFocus = null;
    setTimeout(() => focus?.focus?.({preventScroll:true}), 0);
  }

  function open(items, start) {
    close();
    installStyles();
    sources = unique(items);
    if (!sources.length) return;
    const normalizedStart = normalizeUrl(start);
    index = Math.max(0, sources.indexOf(normalizedStart));
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const root = document.createElement('div');
    root.className = `desktop-unified-lightbox${sources.length < 2 ? ' is-single' : ''}`;
    root.setAttribute('role','dialog');
    root.setAttribute('aria-modal','true');
    root.setAttribute('aria-label','Image viewer');

    const prev = document.createElement('button');
    const next = document.createElement('button');
    const closeButton = document.createElement('button');
    const stage = document.createElement('div');
    const image = document.createElement('img');
    const counter = document.createElement('p');
    const hint = document.createElement('p');

    prev.type = next.type = closeButton.type = 'button';
    prev.className = 'desktop-unified-lightbox__nav desktop-unified-lightbox__prev';
    next.className = 'desktop-unified-lightbox__nav desktop-unified-lightbox__next';
    closeButton.className = 'desktop-unified-lightbox__close';
    stage.className = 'desktop-unified-lightbox__stage';
    image.className = 'desktop-unified-lightbox__image';
    counter.className = 'desktop-unified-lightbox__counter';
    hint.className = 'desktop-unified-lightbox__hint';
    prev.textContent = '←';
    next.textContent = '→';
    closeButton.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    prev.setAttribute('aria-label','Previous image');
    next.setAttribute('aria-label','Next image');
    closeButton.setAttribute('aria-label','Close image');
    hint.textContent = 'ESC · ← →';
    image.draggable = false;

    prev.addEventListener('click',(event)=>{event.preventDefault();event.stopPropagation();step(-1)});
    next.addEventListener('click',(event)=>{event.preventDefault();event.stopPropagation();step(1)});
    closeButton.addEventListener('click',(event)=>{event.preventDefault();event.stopPropagation();close()});
    stage.addEventListener('click',(event)=>event.stopPropagation());
    root.addEventListener('click',(event)=>{if(event.target===root)close()});

    stage.append(image);
    root.append(prev,stage,next,closeButton,counter,hint);
    document.body.append(root);
    overlay = root;
    render(0,true);
    requestAnimationFrame(()=>root.classList.add('is-open'));
    closeButton.focus({preventScroll:true});
  }

  window.addEventListener('click',(event)=>{
    if (overlay) return;
    const hit = resolveTarget(event.target);
    if (!hit) return;
    const items = sourceUrls(hit.modal);
    if (!items.length) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    open(items,imageSource(hit.image));
  },true);

  window.addEventListener('keydown',(event)=>{
    if (!overlay) return;
    if (event.key === 'Escape') {
      event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();close();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();step(1);
    } else if (event.key === 'Tab') {
      const buttons=[...overlay.querySelectorAll('button:not([disabled])')];
      if(!buttons.length)return;
      const current=buttons.indexOf(document.activeElement);
      if(event.shiftKey&&current<=0){event.preventDefault();buttons.at(-1).focus()}
      else if(!event.shiftKey&&(current<0||current===buttons.length-1)){event.preventDefault();buttons[0].focus()}
    }
  },true);

  installStyles();
})();