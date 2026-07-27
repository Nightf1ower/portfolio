(() => {
  if (window.__projectSwipeGalleryV3) return;
  window.__projectSwipeGalleryV3 = true;

  const MODAL_SELECTORS = [
    '.cr-modal',
    '.zny-modal',
    '.fable-modal',
    '.bf',
    '.blandetto-modal',
    '.bld-modal',
    '.su-modal',
    '.m10-modal',
    '.merch9-modal',
    '.project9006-modal',
    '.pink-punk-fullscreen',
    '.z-\\[100\\].fixed.inset-0',
  ];

  const CLOSE_SELECTORS = [
    '.cr-close',
    '.zny-close',
    '.fable-close',
    '.bf-x',
    '.blandetto-close',
    '.bld-close',
    '.su-close',
    '.m10-close',
    '.merch9-close',
    '.project9006-close',
    '.p9006-close',
    '.pink-punk-fullscreen > div > .sticky button',
    '.project9006-modal > div > .sticky button',
    '.z-\\[100\\].fixed.inset-0 > div > .sticky button',
  ];

  const LIGHTBOX_SELECTORS = [
    '.psg-lightbox',
    '.cr-light',
    '.zny-light',
    '.fable-light',
    '.bf-light',
    '.blandetto-lightbox',
    '.su-light',
    '.m10-light',
    '.merch9-light',
    '.project9006-lightbox',
    '.z-\\[150\\].fixed.inset-0',
  ];

  const EXPLICIT_GROUP_SELECTOR = [
    '.cr-card',
    '.pink-punk-frame',
    '.pink-punk-frame--hover',
    '[data-images]',
    '[data-hover-src]',
    '[data-worn-src]',
  ].join(',');

  const CONTROL_SELECTOR = [
    ...CLOSE_SELECTORS,
    '.psg-close',
    '.psg-nav',
    '.project-scroll-top',
    'button',
    'a',
    'input',
    'select',
    'textarea',
  ].join(',');

  const style = document.createElement('style');
  style.id = 'project-swipe-gallery-style';
  style.textContent = `
    .psg-lightbox {
      position: fixed;
      inset: 0;
      z-index: 950000;
      display: grid;
      grid-template-columns: auto minmax(0,1fr) auto;
      align-items: center;
      gap: clamp(.5rem,2vw,1.25rem);
      padding: max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));
      background: rgba(0,0,0,.97);
      color: #fff;
      overscroll-behavior: none;
      touch-action: none;
    }
    .psg-stage {
      min-width: 0;
      height: calc(100dvh - 2rem);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .psg-image {
      display: block;
      max-width: 100%;
      max-height: 92dvh;
      width: auto;
      height: auto;
      object-fit: contain;
      user-select: none;
      -webkit-user-drag: none;
      transition: opacity .16s ease, transform .16s ease;
    }
    .psg-nav,.psg-close {
      border: 1px solid rgba(255,255,255,.8);
      border-radius: 0;
      background: #050505;
      color: #fff;
      font: 900 1.45rem/1 Arial,Helvetica,sans-serif;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .psg-nav { width: 3.25rem; height: 3.25rem; }
    .psg-close {
      position: absolute;
      top: max(1rem,env(safe-area-inset-top));
      right: max(1rem,env(safe-area-inset-right));
      z-index: 2;
      padding: .7rem .9rem;
      font-size: .68rem;
      letter-spacing: .2em;
      text-transform: uppercase;
    }
    .psg-counter {
      position: absolute;
      left: 50%;
      bottom: max(1rem,env(safe-area-inset-bottom));
      transform: translateX(-50%);
      margin: 0;
      padding: .45rem .65rem;
      background: #fff;
      color: #050505;
      font: 900 .65rem/1 Arial,Helvetica,sans-serif;
      letter-spacing: .18em;
    }
    @media (hover:none),(pointer:coarse),(max-width:700px) {
      .psg-lightbox {
        grid-template-columns: 1fr;
        padding: max(.75rem,env(safe-area-inset-top)) max(.75rem,env(safe-area-inset-right)) max(.75rem,env(safe-area-inset-bottom)) max(.75rem,env(safe-area-inset-left));
      }
      .psg-nav { display: none !important; }
      .psg-stage { height: calc(100dvh - 1.5rem); }
    }
  `;
  document.head.append(style);

  const unique = (values) => [...new Set(values.filter(Boolean))];

  function isVisible(node) {
    if (!node?.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function closestModal(target) {
    return target instanceof Element ? target.closest(MODAL_SELECTORS.join(',')) : null;
  }

  function activeLightbox() {
    return [...document.querySelectorAll(LIGHTBOX_SELECTORS.join(','))].filter(isVisible).at(-1) || null;
  }

  function normalizeUrl(value) {
    if (!value) return '';
    const clean = String(value).trim().replace(/^[\'\"]|[\'\"]$/g, '');
    if (!clean || clean === 'none') return '';
    try {
      return new URL(clean, location.href).href;
    } catch {
      return clean;
    }
  }

  function backgroundUrls(node) {
    const value = getComputedStyle(node).backgroundImage || '';
    return [...value.matchAll(/url\(([\'\"]?)(.*?)\1\)/g)].map((match) => normalizeUrl(match[2]));
  }

  function sourceUrls(node) {
    const urls = [];
    const scope = [node, ...node.querySelectorAll('*')];

    scope.forEach((item) => {
      if (!(item instanceof Element)) return;

      if (item instanceof HTMLImageElement) {
        urls.push(normalizeUrl(item.currentSrc || item.getAttribute('src')));
        const srcset = item.getAttribute('srcset');
        if (srcset) urls.push(...srcset.split(',').map((part) => normalizeUrl(part.trim().split(/\s+/)[0])));
      }

      if (item instanceof HTMLSourceElement) {
        const srcset = item.getAttribute('srcset');
        if (srcset) urls.push(...srcset.split(',').map((part) => normalizeUrl(part.trim().split(/\s+/)[0])));
      }

      [
        'data-hover-src',
        'data-alt-src',
        'data-worn-src',
        'data-active-src',
        'data-image',
        'data-src',
        'data-full',
        'data-large',
      ].forEach((name) => urls.push(normalizeUrl(item.getAttribute(name))));

      const list = item.getAttribute('data-images');
      if (list) urls.push(...list.split(/[|,]/).map(normalizeUrl));
      urls.push(...backgroundUrls(item));
    });

    return unique(urls).filter((url) => !url.startsWith('data:image/svg'));
  }

  function isLayeredGroup(node) {
    const images = [...node.querySelectorAll('img')];
    if (images.length < 2 || images.length > 20) return false;

    const hasLayerStyles = images.some((image) => {
      const css = getComputedStyle(image);
      return css.position === 'absolute' || css.display === 'none' || Number(css.opacity || 1) < .98;
    });

    if (hasLayerStyles) return true;

    const rects = images
      .map((image) => image.getBoundingClientRect())
      .filter((rect) => rect.width > 2 && rect.height > 2);

    if (rects.length < 2) return false;
    const first = rects[0];
    return rects.every((rect) =>
      Math.abs(rect.left - first.left) < 10
      && Math.abs(rect.top - first.top) < 10
      && Math.abs(rect.width - first.width) < 14
      && Math.abs(rect.height - first.height) < 14
    );
  }

  function hoverGroup(target, modal) {
    if (!(target instanceof Element)) return null;

    const explicit = target.closest(EXPLICIT_GROUP_SELECTOR);
    if (explicit && modal.contains(explicit)) {
      const urls = sourceUrls(explicit);
      if (urls.length > 1 && urls.length <= 20) return { node: explicit, urls };
    }

    let node = target.closest('img')?.parentElement || target;
    let depth = 0;

    while (node && node !== modal && depth < 5) {
      if (node.matches('button') && !node.matches(EXPLICIT_GROUP_SELECTOR)) return null;
      if (isLayeredGroup(node)) {
        const urls = sourceUrls(node);
        if (urls.length > 1 && urls.length <= 20) return { node, urls };
      }
      node = node.parentElement;
      depth += 1;
    }

    return null;
  }

  function openGallery(urls, startUrl = '') {
    document.querySelector('.psg-lightbox')?.remove();
    const images = unique(urls);
    if (images.length < 2) return;

    let index = Math.max(0, images.indexOf(normalizeUrl(startUrl)));
    const overlay = document.createElement('div');
    const previous = document.createElement('button');
    const next = document.createElement('button');
    const close = document.createElement('button');
    const stage = document.createElement('div');
    const image = document.createElement('img');
    const counter = document.createElement('p');

    overlay.className = 'psg-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    previous.type = next.type = close.type = 'button';
    previous.className = 'psg-nav psg-prev';
    next.className = 'psg-nav psg-next';
    close.className = 'psg-close';
    stage.className = 'psg-stage';
    image.className = 'psg-image';
    counter.className = 'psg-counter';
    previous.textContent = '←';
    next.textContent = '→';
    close.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    image.draggable = false;

    const draw = (direction = 0) => {
      image.style.opacity = '0';
      image.style.transform = `translateX(${direction * 18}px)`;
      window.setTimeout(() => {
        image.src = images[index];
        counter.textContent = `${index + 1} / ${images.length}`;
        requestAnimationFrame(() => {
          image.style.opacity = '1';
          image.style.transform = 'translateX(0)';
        });
      }, 70);
    };

    const step = (amount) => {
      index = (index + amount + images.length) % images.length;
      draw(amount > 0 ? 1 : -1);
    };

    const remove = () => overlay.remove();
    previous.onclick = (event) => { event.stopPropagation(); step(-1); };
    next.onclick = (event) => { event.stopPropagation(); step(1); };
    close.onclick = (event) => { event.stopPropagation(); remove(); };
    stage.onclick = (event) => event.stopPropagation();
    image.onclick = (event) => { event.stopPropagation(); step(1); };
    overlay.onclick = remove;

    let startX = 0;
    let startY = 0;
    overlay.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    overlay.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) step(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) remove();
    }, { passive: true });

    stage.append(image);
    overlay.append(previous, stage, next, close, counter);
    document.body.append(overlay);
    draw();
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.psg-lightbox')) return;

    const explicitGroup = event.target.closest(EXPLICIT_GROUP_SELECTOR);
    const genericControl = event.target.closest(CONTROL_SELECTOR);
    if (genericControl && !explicitGroup) return;

    const modal = closestModal(event.target);
    if (!modal || activeLightbox()) return;

    const group = hoverGroup(event.target, modal);
    if (!group) return;

    const clickedImage = event.target.closest('img');
    event.preventDefault();
    event.stopImmediatePropagation();
    openGallery(group.urls, clickedImage?.currentSrc || clickedImage?.src || '');
  }, true);

  document.addEventListener('keydown', (event) => {
    const overlay = document.querySelector('.psg-lightbox');
    if (!overlay) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      overlay.remove();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopImmediatePropagation();
      overlay.querySelector('.psg-prev')?.click();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopImmediatePropagation();
      overlay.querySelector('.psg-next')?.click();
    }
  }, true);

  let folderSwipe = null;

  document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1 || activeLightbox()) return;
    const modal = closestModal(event.target);
    if (!modal || modal.scrollTop > 5) return;

    const touch = event.touches[0];
    if (touch.clientY > Math.min(190, innerHeight * .22)) return;

    folderSwipe = {
      modal,
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
    };
  }, { passive: true, capture: true });

  document.addEventListener('touchend', (event) => {
    if (!folderSwipe || !event.changedTouches.length) return;
    const gesture = folderSwipe;
    folderSwipe = null;

    if (!gesture.modal.isConnected || gesture.modal.scrollTop > 8) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - gesture.x;
    const dy = touch.clientY - gesture.y;
    const elapsed = performance.now() - gesture.time;

    if (dy < 105 || Math.abs(dy) < Math.abs(dx) * 1.25 || elapsed > 1100) return;

    const close = CLOSE_SELECTORS
      .map((selector) => gesture.modal.querySelector(selector))
      .find(Boolean)
      || [...gesture.modal.querySelectorAll('button')].find((button) => /^(закрыть|close)$/i.test(button.textContent?.trim() || ''));

    if (close) {
      event.preventDefault();
      close.click();
    }
  }, { passive: false, capture: true });
})();