(() => {
  if (window.__portfolioImagePerformanceV1) return;
  window.__portfolioImagePerformanceV1 = true;

  const VERSION = 'portfolio-image-performance-1';
  const IMAGE_PATH_RE = /(?:^|\/)(?:public\/)?works\//i;
  const RAW_WORKS_RE = /raw\.githubusercontent\.com\/Nightf1ower\/portfolio\/[^/]+\/public\/works\//i;
  const MODAL_SELECTOR = [
    '.m10-modal',
    '.stk-modal',
    '.posters-modal',
    '.su-modal',
    '.vtb-modal',
    '.blandetto-modal',
    '.fable-modal',
    '.zny-modal',
    '.pink-punk-modal',
    '.album-covers-modal',
    '.collages-modal',
    '.project9006-modal',
    '[class$="-modal"]',
    '[class*="-modal "]',
  ].join(',');

  const isPortfolioImage = (value) => {
    if (typeof value !== 'string' || !value) return false;
    return IMAGE_PATH_RE.test(value) || RAW_WORKS_RE.test(value);
  };

  const srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  const loadingDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'loading');

  const writeLoading = (image, value) => {
    if (loadingDescriptor?.set) loadingDescriptor.set.call(image, value);
    else image.setAttribute('loading', value);
  };

  const applyLowPriorityHints = (image) => {
    if (!(image instanceof HTMLImageElement)) return;
    if (!image.dataset.portfolioCritical) writeLoading(image, 'lazy');
    image.decoding = 'async';
    try { image.fetchPriority = image.dataset.portfolioCritical ? 'high' : 'low'; } catch {}
  };

  if (srcDescriptor?.get && srcDescriptor?.set) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      enumerable: srcDescriptor.enumerable,
      get() {
        return srcDescriptor.get.call(this);
      },
      set(value) {
        if (isPortfolioImage(String(value))) applyLowPriorityHints(this);
        srcDescriptor.set.call(this, value);
      },
    });
  }

  if (loadingDescriptor?.get && loadingDescriptor?.set) {
    Object.defineProperty(HTMLImageElement.prototype, 'loading', {
      configurable: true,
      enumerable: loadingDescriptor.enumerable,
      get() {
        return loadingDescriptor.get.call(this);
      },
      set(value) {
        const source = srcDescriptor?.get?.call(this) || this.getAttribute('src') || '';
        const shouldStayLazy = value === 'eager'
          && isPortfolioImage(String(source))
          && !this.dataset.portfolioCritical;
        loadingDescriptor.set.call(this, shouldStayLazy ? 'lazy' : value);
      },
    });
  }

  const previousSetAttribute = HTMLImageElement.prototype.setAttribute;
  HTMLImageElement.prototype.setAttribute = function setAttribute(name, value) {
    const attribute = String(name).toLowerCase();
    if (attribute === 'src' && isPortfolioImage(String(value))) applyLowPriorityHints(this);
    if (attribute === 'loading' && value === 'eager') {
      const source = srcDescriptor?.get?.call(this) || this.getAttribute('src') || '';
      if (isPortfolioImage(String(source)) && !this.dataset.portfolioCritical) value = 'lazy';
    }
    return previousSetAttribute.call(this, name, value);
  };

  const isNearViewport = (image) => {
    const rect = image.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 900;
    return rect.bottom >= -160 && rect.top <= viewportHeight * 1.4;
  };

  const optimizeModal = (modal) => {
    const images = [...modal.querySelectorAll('img')]
      .filter((image) => isPortfolioImage(image.currentSrc || image.getAttribute('src') || image.src || ''));

    images.forEach((image) => {
      if (!image.dataset.portfolioCritical) {
        writeLoading(image, 'lazy');
        try { image.fetchPriority = 'low'; } catch {}
      }
      image.decoding = 'async';
    });

    const critical = images.filter(isNearViewport).slice(0, 2);
    (critical.length ? critical : images.slice(0, 2)).forEach((image) => {
      image.dataset.portfolioCritical = VERSION;
      writeLoading(image, 'eager');
      image.decoding = 'async';
      try { image.fetchPriority = 'high'; } catch {}
    });
  };

  const optimizeAll = () => {
    document.querySelectorAll(MODAL_SELECTOR).forEach(optimizeModal);
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      optimizeAll();
    });
  };

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule);

  const previousFetch = window.fetch.bind(window);
  const apiCachePrefix = `${VERSION}:api:`;

  window.fetch = async (input, init = {}) => {
    const rawUrl = typeof input === 'string' ? input : input?.url;
    const method = String(init?.method || (typeof input !== 'string' ? input?.method : '') || 'GET').toUpperCase();
    const isCacheable = method === 'GET'
      && typeof rawUrl === 'string'
      && /^https:\/\/api\.github\.com\/repos\/Nightf1ower\/portfolio\/(?:contents|git\/trees)\//i.test(rawUrl);

    if (!isCacheable) return previousFetch(input, init);

    const key = `${apiCachePrefix}${rawUrl}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        return new Response(cached, {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Portfolio-Cache': 'HIT' },
        });
      }
    } catch {}

    const response = await previousFetch(input, { ...init, cache: 'force-cache' });
    if (!response.ok) return response;

    try {
      const text = await response.clone().text();
      if (text.length < 1_500_000) sessionStorage.setItem(key, text);
    } catch {}
    return response;
  };

  schedule();
})();
