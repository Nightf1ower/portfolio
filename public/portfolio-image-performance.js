(() => {
  if (window.__portfolioImagePerformanceV2) return;
  window.__portfolioImagePerformanceV2 = true;

  const VERSION = 'portfolio-image-performance-2';
  const IMAGE_PATH_RE = /(?:^|\/)(?:public\/)?works\//i;
  const RAW_WORKS_RE = /raw\.githubusercontent\.com\/Nightf1ower\/portfolio\/[^/]+\/public\/works\//i;
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
    '.blandetto-modal',
    '.bf',
    '.fable-modal',
    '.zny-modal',
    '.pink-punk-modal',
    '.pink-punk-fullscreen',
    '.album-covers-modal',
    '.collages-modal',
    '.project9006-modal',
    '.mc-modal',
  ].join(',');

  const isPortfolioImage = (value) => {
    if (typeof value !== 'string' || !value) return false;
    return IMAGE_PATH_RE.test(value) || RAW_WORKS_RE.test(value);
  };

  const isNearViewport = (image, modal) => {
    const imageRect = image.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();
    const viewportTop = Math.max(0, modalRect.top);
    const viewportBottom = Math.min(window.innerHeight || 900, modalRect.bottom);
    return imageRect.bottom >= viewportTop - 180 && imageRect.top <= viewportBottom + 320;
  };

  function optimizeModal(modal) {
    if (!(modal instanceof Element) || !modal.isConnected) return;

    const images = [...modal.querySelectorAll('img')].filter((image) => {
      const source = image.currentSrc || image.getAttribute('src') || image.src || '';
      return isPortfolioImage(source);
    });

    if (!images.length) return;

    images.forEach((image) => {
      if (!image.dataset.portfolioCritical) {
        image.loading = 'lazy';
        try { image.fetchPriority = 'low'; } catch {}
      }
      image.decoding = 'async';
    });

    const critical = images.filter((image) => isNearViewport(image, modal)).slice(0, 3);
    (critical.length ? critical : images.slice(0, 2)).forEach((image) => {
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
    [0, 90, 260].forEach((delay) => window.setTimeout(run, delay));
  };

  const observer = new MutationObserver((mutations) => {
    const discovered = new Set();

    mutations.forEach((mutation) => {
      [...mutation.addedNodes].forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches?.(MODAL_SELECTOR)) discovered.add(node);
        node.querySelectorAll?.(MODAL_SELECTOR).forEach((modal) => discovered.add(modal));
      });
    });

    discovered.forEach((modal) => optimizeWithPasses(modal));
  });

  observer.observe(document.body, { childList: true, subtree: true });

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