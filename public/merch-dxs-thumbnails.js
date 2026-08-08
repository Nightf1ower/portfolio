(() => {
  if (window.__merchDxsThumbnailsV2) return;
  window.__merchDxsThumbnailsV2 = true;

  const VERSION = 'dxs-thumbs-2';
  const SOURCE_PREFIX = '/works/merch/dxs/';
  const THUMB_PREFIX = '/generated/dxs-thumbs/';
  const PRELOAD = [
    'sticker/dxs_sticker-01.webp',
    'sticker/dxs_sticker-02.webp',
    'sticker/dxs_sticker-03.webp',
    'sticker/dxs-sticker-visual-01.webp',
    'sticker/dxs-sticker-visual-02.webp',
    'poster/dxs_poster_01.webp',
    'poster/dxs_poster_03.webp',
    'poster/dxs_poster_04.webp',
    'poster/dxs_poster-visual_01.webp',
    'poster/dxs_poster-visual_02.webp',
    'ad/dxs_ad_01.webp',
    'ad/dxs_ad_02.webp',
    'ad/dxs_ad_03.webp',
  ];
  const ADS = new Set([
    'dxs_ad_01',
    'dxs_ad_02',
    'dxs_ad_03',
  ]);

  let prewarmed = false;

  function thumbUrl(value) {
    if (!value) return '';
    let url;
    try {
      url = new URL(value, window.location.href);
    } catch {
      return '';
    }
    if (!url.pathname.startsWith(SOURCE_PREFIX)) return '';
    const relative = decodeURIComponent(url.pathname.slice(SOURCE_PREFIX.length));
    const webp = relative.replace(/\.(?:avif|jpe?g|png|webp)$/i, '.webp');
    return `${THUMB_PREFIX}${webp}?v=${VERSION}`;
  }

  function originalPath(image) {
    return image.dataset.dxsOriginal || image.dataset.src || image.getAttribute('src') || '';
  }

  function isAdImage(image) {
    const value = originalPath(image);
    let pathname = value;
    try { pathname = new URL(value, window.location.href).pathname; } catch {}
    const base = decodeURIComponent(pathname).split('/').pop()?.replace(/\.[^.]+$/, '').toLowerCase() || '';
    return ADS.has(base);
  }

  function reveal(image) {
    image.classList.add('is-loaded');
  }

  function prepareImage(image) {
    if (!(image instanceof HTMLImageElement) || image.dataset.dxsThumbReady === 'true') return;
    const original = image.dataset.src || image.getAttribute('src') || '';
    const thumb = thumbUrl(original);
    if (!thumb) return;

    image.dataset.dxsThumbReady = 'true';
    image.dataset.dxsOriginal = original;

    image.addEventListener('error', () => {
      if (!image.src.includes('/generated/dxs-thumbs/')) return;
      image.src = original;
    }, { once: true });

    if (image.dataset.src) image.dataset.src = thumb;
    else image.src = thumb;
  }

  function forceLoadAd(image) {
    if (!(image instanceof HTMLImageElement) || !isAdImage(image)) return;
    prepareImage(image);
    const source = image.dataset.src;
    if (!source) {
      if (image.complete && image.naturalWidth) reveal(image);
      return;
    }

    image.dataset.loaded = 'true';
    image.addEventListener('load', () => reveal(image), { once: true });
    image.addEventListener('error', () => reveal(image), { once: true });
    image.src = source;
    delete image.dataset.src;
  }

  function activateAds(root = document) {
    const dxs = root.matches?.('.mc-dxs') ? root : root.querySelector?.('.mc-dxs');
    const scope = dxs || document.querySelector('.mc-dxs');
    if (!scope) return;

    const sections = [...scope.querySelectorAll('.mc-section')];
    const adsSection = sections.find((section) => {
      const heading = section.querySelector('.mc-section-title')?.textContent?.trim().toUpperCase() || '';
      return heading.includes('РЕКЛАМ') || heading.includes('ADVERTISING');
    });
    if (!adsSection) return;

    adsSection.style.setProperty('display', 'block', 'important');
    adsSection.style.setProperty('content-visibility', 'visible', 'important');
    adsSection.style.setProperty('contain', 'none', 'important');
    adsSection.querySelectorAll('img').forEach(forceLoadAd);
  }

  function prepareRoot(root) {
    if (!(root instanceof Element)) return;
    if (root.matches?.('.mc-dxs img')) prepareImage(root);
    root.querySelectorAll?.('.mc-dxs img').forEach(prepareImage);

    if (root.matches?.('.mc-dxs, .mc-modal') || root.querySelector?.('.mc-dxs')) {
      requestAnimationFrame(() => activateAds(root));
    }
  }

  function prewarm() {
    if (prewarmed) return;
    prewarmed = true;
    PRELOAD.forEach((relative) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = `${THUMB_PREFIX}${relative}?v=${VERSION}`;
    });
  }

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) prepareRoot(node);
    }));
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('pointerover', (event) => {
    if (event.target.closest?.('.stk-more-projects__link[data-sticker-project-target="dxs"], .pcg-more-link[data-poster-target="dxs"]')) prewarm();
  }, { passive: true, capture: true });

  document.addEventListener('focusin', (event) => {
    if (event.target.closest?.('.stk-more-projects__link[data-sticker-project-target="dxs"], .pcg-more-link[data-poster-target="dxs"]')) prewarm();
  }, true);

  document.addEventListener('click', (event) => {
    if (event.target.closest?.('.stk-more-projects__link[data-sticker-project-target="dxs"], .pcg-more-link[data-poster-target="dxs"]')) prewarm();
    if (event.target.closest?.('#works article, #works button')) {
      setTimeout(() => activateAds(document), 0);
      setTimeout(() => activateAds(document), 80);
    }
  }, true);

  prepareRoot(document.body);
})();
