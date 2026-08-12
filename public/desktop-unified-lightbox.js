(() => {
  if (window.__desktopUnifiedLightboxV1) return;
  window.__desktopUnifiedLightboxV1 = true;

  const VERSION = 'desktop-unified-lightbox-1';
  const STYLE_ID = 'desktop-unified-lightbox-style';
  const MODAL_SELECTOR = [
    '.zny-modal', '.fable-modal', '.pink-punk-fullscreen', '.cr-modal', '.blandetto-modal', '.bf',
    '.project9006-modal', '.pcg-modal', '.pag-modal', '.mc-modal', '.stk-modal', '.lcg-modal',
    '.album-covers-modal', '.su-modal', '.anka-peresild-modal', '.vtb-modal', '.collages-modal'
  ].join(',');

  const CONTROL_SELECTOR = [
    '.zny-close', '.fable-close', '.su-close', '.vtb-close', '.cr-close', '.mc-close', '.stk-close',
    '.pcg-close', '.lcg-close', '.pag-close', '.blandetto-close', '.bf-close', '.bf-x',
    '.anka-peresild-close', '.album-covers-close', '.project9006-toolbar__close', '.project9006-close',
    '.p9006-close', '.desktop-project-navigation', '.project-scroll-top', 'a', 'input', 'select', 'textarea'
  ].join(',');

  const GROUP_SELECTOR = [
    '[data-images]', '[data-hover-src]', '[data-worn-src]', '[data-alt-src]', '[data-full]',
    '.cr-card', '.zny-card', '.fable-card', '.bf-card', '.blandetto-card', '.m10-card', '.mc-card',
    '.su-card', '.su-concept-main', '.su-concept-step', '.vtb-card', '.stk-card', '.pcg-card', '.pag-card',
    '.lcg-card', '.album-covers-card', '.anka-peresild-card', '.project9006-logo-card',
    '.project9006-logo-sheet', '.project9006-merch-media', '.project9006-photoshoot-card', '.project9006-poster-card',
    '.pink-punk-frame', '.pink-punk-frame--hover'
  ].join(',');

  const SECTION_SELECTOR = [
    'section', '[data-section]', '.zny-section', '.fable-section', '.cr-section', '.mc-section', '.m10-section',
    '.su-section', '.vtb-section', '.stk-section', '.pcg-section', '.pag-section', '.lcg-row', '.bf-s'
  ].join(',');

  let overlay = null;
  let sources = [];
  let index = 0;
  let previousFocus = null;

  const isDesktop = () => window.innerWidth > 820 && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      @media (hover:hover) and (pointer:fine) and (min-width:821px){
        ${MODAL_SELECTOR} img:not(.desktop-unified-lightbox__image){cursor:zoom-in}
      }
      .desktop-unified-lightbox{
        position:fixed;inset:0;z-index:3000000;display:grid;grid-template-columns:auto minmax(0,1fr) auto;
        align-items:center;gap:clamp(.75rem,2vw,1.5rem);box-sizing:border-box;width:100vw;height:100dvh;
        padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
        background:rgba(0,0,0,.975);color:#fff;overflow:hidden;opacity:0;transition:opacity .18s ease;
      }
      .desktop-unified-lightbox.is-open{opacity:1}
      .desktop-unified-lightbox__stage{position:relative;display:flex;align-items:center;justify-content:center;min-width:0;height:calc(100dvh - 2rem);overflow:hidden}
      .desktop-unified-lightbox__image{display:block;width:auto;height:auto;max-width:100%;max-height:92dvh;object-fit:contain;user-select:none;-webkit-user-drag:none;opacity:1;transform:translateX(0);transition:opacity .16s ease,transform .18s cubic-bezier(.2,.8,.2,1)}
      .desktop-unified-lightbox__image.is-changing{opacity:0;transform:translateX(var(--du-direction,0px))}
      .desktop-unified-lightbox__nav,.desktop-unified-lightbox__close{
        border:1px solid rgba(255,255,255,.82);border-radius:0;background:#050505;color:#fff;cursor:pointer;
        font-family:Arial,Helvetica,sans-serif;font-weight:900;-webkit-tap-highlight-color:transparent;
        transition:background-color .16s ease,color .16s ease,transform .16s ease;
      }
      .desktop-unified-lightbox__nav{display:grid;place-items:center;width:3.6rem;height:3.6rem;font-size:1.6rem}
      .desktop-unified-lightbox__nav:hover,.desktop-unified-lightbox__close:hover{background:#a6ff00;color:#050505}
      .desktop-unified-lightbox__nav:active,.desktop-unified-lightbox__close:active{transform:scale(.97)}
      .desktop-unified-lightbox__close{position:absolute;top:max(1rem,env(safe-area-inset-top));right:max(1rem,env(safe-area-inset-right));z-index:2;min-height:2.9rem;padding:.75rem 1rem;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase}
      .desktop-unified-lightbox__counter{position:absolute;left:50%;bottom:max(1rem,env(safe-area-inset-bottom));transform:translateX(-50%);margin:0;padding:.5rem .75rem;background:#fff;color:#050505;font:900 .65rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em}
      .desktop-unified-lightbox__hint{position:absolute;left:max(1rem,env(safe-area-inset-left));bottom:max(1rem,env(safe-area-inset-bottom));margin:0;color:rgba(255,255,255,.58);font:900 .58rem/1 Arial,Helvetica,sans-serif;letter-spacing:.16em;text-transform:uppercase}
      .desktop-unified-lightbox.is-single .desktop-unified-lightbox__nav{visibility:hidden;pointer-events:none}
      @media(prefers-reduced-motion:reduce){.desktop-unified-lightbox,.desktop-unified-lightbox__image,.desktop-unified-lightbox__nav,.desktop-unified-lightbox__close{transition:none!important}}
    `;
    document.head.append(style);
  }

  function normalizeUrl(value) {
    if (!value) return '';
    const clean = String(value).trim().replace(/^[\'\"]|[\'\"]$/g, '');
    if (!clean || clean === 'none') return '';
    try { return new URL(clean, location.href).href; } catch { return clean; }
  }

  const unique = (items) => [...new Set(items.map(normalizeUrl).filter(Boolean))];

  function imageSource(image) {
    if (!(image instanceof HTMLImageElement)) return '';
    return normalizeUrl(
      image.dataset.portfolioOriginal || image.getAttribute('data-original') || image.getAttribute('data-full')
      || image.getAttribute('data-large') || image.currentSrc || image.getAttribute('src')
    );
  }

  function backgroundUrls(node) {
    if (!(node instanceof Element)) return [];
    const value = getComputedStyle(node).backgroundImage || '';
    return [...value.matchAll(/url\(([\'\"]?)(.*?)\1\)/g)].map((match) => normalizeUrl(match[2]));
  }

  function sourceUrls(root, includeHidden = true) {
    if (!(root instanceof Element)) return [];
    const urls = [];
    const scope = [root, ...root.querySelectorAll('*')];
    scope.forEach((node) => {
      if (!(node instanceof Element)) return;
      if (node instanceof HTMLImageElement) {
        if (!includeHidden) {
          const rect = node.getBoundingClientRect();
          const css = getComputedStyle(node);
          if ((rect.width < 40 || rect.height < 40) || css.display === 'none' || css.visibility === 'hidden') return;
        }
        urls.push(imageSource(node));
      }
      ['data-hover-src','data-alt-src','data-worn-src','data-active-src','data-image','data-src','data-full','data-large'].forEach((name) => {
        urls.push(normalizeUrl(node.getAttribute(name)));
      });
      const list = node.getAttribute('data-images');
      if (list) urls.push(...list.split(/[|,]/).map(normalizeUrl));
      urls.push(...backgroundUrls(node));
    });
    return unique(urls).filter((url) => !url.startsWith('data:image/svg'));
  }

  function projectModal(target) {
    return target instanceof Element ? target.closest(MODAL_SELECTOR) : null;
  }

  function resolveGallery(modal, clickedImage) {
    const group = clickedImage.closest(GROUP_SELECTOR);
    if (group && modal.contains(group)) {
      const grouped = sourceUrls(group, true);
      if (grouped.length) return grouped;
    }

    const section = clickedImage.closest(SECTION_SELECTOR);
    if (section && modal.contains(section)) {
      const sectionUrls = sourceUrls(section, false);
      if (sectionUrls.length) return sectionUrls;
    }

    return sourceUrls(modal, false);
  }

  function preloadAround() {
    if (!sources.length) return;
    [-1, 1].forEach((offset) => {
      const preload = new Image();
      preload.decoding = 'async';
      preload.src = sources[(index + offset + sources.length) % sources.length];
    });
  }

  function render(direction = 0, immediate = false) {
    if (!overlay || !sources.length) return;
    const image = overlay.querySelector('.desktop-unified-lightbox__image');
    const counter = overlay.querySelector('.desktop-unified-lightbox__counter');
    const apply = () => {
      image.src = sources[index];
      image.alt = `Portfolio image ${index + 1} of ${sources.length}`;
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(sources.length).padStart(2, '0')}`;
      image.style.setProperty('--du-direction', '0px');
      image.classList.remove('is-changing');
      preloadAround();
    };

    if (immediate) { apply(); return; }
    image.style.setProperty('--du-direction', `${direction * 34}px`);
    image.classList.add('is-changing');
    window.setTimeout(apply, 105);
  }

  function step(amount) {
    if (sources.length < 2) return;
    index = (index + amount + sources.length) % sources.length;
    render(amount > 0 ? 1 : -1);
  }

  function close() {
    if (!overlay) return;
    const root = overlay;
    overlay = null;
    root.classList.remove('is-open');
    window.setTimeout(() => root.remove(), 180);
    sources = [];
    index = 0;
    previousFocus?.focus?.({ preventScroll: true });
    previousFocus = null;
  }

  function open(items, startUrl) {
    close();
    installStyles();
    sources = unique(items);
    if (!sources.length) return;
    index = Math.max(0, sources.indexOf(normalizeUrl(startUrl)));
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const root = document.createElement('div');
    const previous = document.createElement('button');
    const stage = document.createElement('div');
    const image = document.createElement('img');
    const next = document.createElement('button');
    const closeButton = document.createElement('button');
    const counter = document.createElement('p');
    const hint = document.createElement('p');

    root.className = `desktop-unified-lightbox${sources.length < 2 ? ' is-single' : ''}`;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Image viewer');
    previous.type = next.type = closeButton.type = 'button';
    previous.className = 'desktop-unified-lightbox__nav desktop-unified-lightbox__prev';
    next.className = 'desktop-unified-lightbox__nav desktop-unified-lightbox__next';
    closeButton.className = 'desktop-unified-lightbox__close';
    stage.className = 'desktop-unified-lightbox__stage';
    image.className = 'desktop-unified-lightbox__image';
    counter.className = 'desktop-unified-lightbox__counter';
    hint.className = 'desktop-unified-lightbox__hint';
    previous.textContent = '←';
    next.textContent = '→';
    closeButton.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    hint.textContent = 'ESC · ← →';
    previous.setAttribute('aria-label', 'Previous image');
    next.setAttribute('aria-label', 'Next image');
    closeButton.setAttribute('aria-label', 'Close image');
    image.draggable = false;

    previous.addEventListener('click', (event) => { event.stopPropagation(); step(-1); });
    next.addEventListener('click', (event) => { event.stopPropagation(); step(1); });
    closeButton.addEventListener('click', (event) => { event.stopPropagation(); close(); });
    stage.addEventListener('click', (event) => event.stopPropagation());
    root.addEventListener('click', close);

    stage.append(image);
    root.append(previous, stage, next, closeButton, counter, hint);
    document.body.append(root);
    overlay = root;
    render(0, true);
    requestAnimationFrame(() => root.classList.add('is-open'));
    closeButton.focus({ preventScroll: true });
  }

  window.addEventListener('click', (event) => {
    if (!isDesktop() || overlay || !(event.target instanceof Element)) return;
    if (event.target.closest('.desktop-unified-lightbox')) return;
    const clickedImage = event.target.closest('img');
    if (!(clickedImage instanceof HTMLImageElement)) return;
    const modal = projectModal(clickedImage);
    if (!modal) return;
    if (clickedImage.closest(CONTROL_SELECTOR)) return;

    const items = resolveGallery(modal, clickedImage);
    if (!items.length) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    open(items, imageSource(clickedImage));
  }, true);

  window.addEventListener('keydown', (event) => {
    if (!overlay) return;
    if (event.key === 'Escape') {
      event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); close();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); step(1);
    }
  }, true);

  installStyles();
})();
