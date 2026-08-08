(() => {
  if (window.__portfolioImagePerformanceV4) return;
  window.__portfolioImagePerformanceV4 = true;

  const VERSION = 'portfolio-image-performance-4';
  const IMAGE_PATH_RE = /(?:^|\/)(?:public\/)?works\//i;
  const RAW_WORKS_RE = /raw\.githubusercontent\.com\/Nightf1ower\/portfolio\/[^/]+\/(?:public\/)?works\//i;
  const GENERATED_RE = /\/generated\/(?:portfolio-thumbs|dxs-thumbs|posters-thumbs)\//i;

  const MODAL_SELECTOR = [
    '.m10-modal',
    '.stk-modal',
    '.pcg-modal',
    '.pag-modal',
    '.lcg-modal',
    '.anka-peresild-modal',
    '.posters-modal',
    '.su-modal',
    '.vtb-modal',
    '.cr-modal',
    '.blandetto-modal',
    '.bf',
    '.fable-modal',
    '.zny-modal',
    '.pink-punk-fullscreen',
    '.album-covers-modal',
    '.collages-modal',
    '.project9006-modal',
    '.mc-modal',
  ].join(',');

  const THUMB_MODAL_SELECTOR = [
    '.fable-modal',
    '.zny-modal',
    '.su-modal',
    '.vtb-modal',
    '.cr-modal',
    '.project9006-modal',
    '.mc-modal',
    '.blandetto-modal',
    '.bf',
    '.pink-punk-fullscreen',
    '.anka-peresild-modal',
    '.pag-modal',
    '.lcg-modal',
  ].join(',');

  const FULLRES_SELECTOR = [
    '.fable-light',
    '.zny-light',
    '.su-light',
    '.vtb-light',
    '.cr-light',
    '.mc-light',
    '.pag-light',
    '.lcg-light',
    '.anka-peresild-lightbox',
    '.blandetto-lightbox',
    '.bf-lightbox',
    '.pink-punk-lightbox',
  ].join(',');

  const modalObservers = new WeakMap();
  const thumbs = () => window.PORTFOLIO_THUMBS || null;

  const isPortfolioImage = (value) => {
    if (typeof value !== 'string' || !value) return false;
    return IMAGE_PATH_RE.test(value) || RAW_WORKS_RE.test(value);
  };

  const isFullResolutionImage = (image) => {
    if (!(image instanceof HTMLImageElement)) return false;
    if (image.closest(FULLRES_SELECTOR)) return true;
    const className = String(image.className || '').toLowerCase();
    return className.includes('lightbox') || className.includes('light-image') || className.includes('light-img');
  };

  const shouldThumb = (image, modal) => (
    modal?.matches?.(THUMB_MODAL_SELECTOR)
    && !isFullResolutionImage(image)
  );

  const bindDeferredFallback = (image) => {
    if (!(image instanceof HTMLImageElement) || image.dataset.portfolioDeferredFallback === 'true') return;
    image.dataset.portfolioDeferredFallback = 'true';
    image.addEventListener('error', () => {
      const current = image.getAttribute('src') || '';
      if (!GENERATED_RE.test(current)) return;
      const original = image.dataset.portfolioOriginal;
      if (original && original !== current) image.src = original;
    });
  };

  const thumbDeferredSource = (image, original) => {
    const helper = thumbs();
    if (!helper?.url || !original || GENERATED_RE.test(original)) return;
    const thumbnail = helper.url(original);
    if (!thumbnail || thumbnail === original) return;
    image.dataset.portfolioOriginal = original;
    bindDeferredFallback(image);
    image.dataset.src = thumbnail;
  };

  const thumbLoadedSource = (image, original) => {
    const helper = thumbs();
    if (!helper?.apply || !original || GENERATED_RE.test(original)) return;
    helper.apply(image, original);
  };

  function optimizeImage(image, modal) {
    if (!(image instanceof HTMLImageElement)) return;

    const deferred = image.dataset.src || '';
    const current = image.getAttribute('src') || image.currentSrc || image.src || '';
    const source = deferred || current;

    if (shouldThumb(image, modal) && isPortfolioImage(source)) {
      if (deferred) thumbDeferredSource(image, deferred);
      else thumbLoadedSource(image, current);
    }

    image.decoding = 'async';
    if (!isFullResolutionImage(image) && !image.dataset.portfolioCritical) {
      image.loading = 'lazy';
      try { image.fetchPriority = 'low'; } catch {}
    }
  }

  const isNearViewport = (image, modal) => {
    const imageRect = image.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();
    const viewportTop = Math.max(0, modalRect.top);
    const viewportBottom = Math.min(window.innerHeight || 900, modalRect.bottom);
    return imageRect.bottom >= viewportTop - 180 && imageRect.top <= viewportBottom + 360;
  };

  function installModalObserver(modal) {
    if (!(modal instanceof Element) || modalObservers.has(modal)) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.target instanceof HTMLImageElement) {
          optimizeImage(mutation.target, modal);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node instanceof HTMLImageElement) optimizeImage(node, modal);
          node.querySelectorAll?.('img').forEach((image) => optimizeImage(image, modal));
        });
      });
    });

    observer.observe(modal, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'data-src'],
    });
    modalObservers.set(modal, observer);
  }

  function optimizeModal(modal) {
    if (!(modal instanceof Element) || !modal.isConnected) return;
    installModalObserver(modal);

    const images = [...modal.querySelectorAll('img')];
    images.forEach((image) => optimizeImage(image, modal));

    const candidates = images.filter((image) => (
      !isFullResolutionImage(image)
      && isNearViewport(image, modal)
    )).slice(0, 3);

    candidates.forEach((image) => {
      image.dataset.portfolioCritical = VERSION;
      image.loading = 'eager';
      image.decoding = 'async';
      try { image.fetchPriority = 'high'; } catch {}
    });
  }

  function optimizeOpenModals() {
    document.querySelectorAll(MODAL_SELECTOR).forEach(optimizeModal);
  }

  let frame = 0;
  const scheduleAll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      optimizeOpenModals();
    });
  };

  const optimizeWithPasses = (modal = null) => {
    const run = () => modal && modal.isConnected ? optimizeModal(modal) : scheduleAll();
    [0, 90, 240, 520].forEach((delay) => window.setTimeout(run, delay));
  };

  new MutationObserver((mutations) => {
    const discovered = new Set();

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches?.(MODAL_SELECTOR)) discovered.add(node);
        node.querySelectorAll?.(MODAL_SELECTOR).forEach((modal) => discovered.add(modal));
      });
    });

    discovered.forEach((modal) => optimizeWithPasses(modal));
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    if (target.closest('#works article, #works button')) {
      optimizeWithPasses();
      return;
    }

    const modal = target.closest(MODAL_SELECTOR);
    if (modal && target.closest('button')) {
      window.setTimeout(() => optimizeModal(modal), 80);
    }
  }, true);

  window.addEventListener('resize', scheduleAll, { passive: true });
  window.addEventListener('load', scheduleAll, { once: true });
  scheduleAll();
})();
