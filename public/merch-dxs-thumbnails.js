(() => {
  if (window.__merchDxsThumbnailsV1) return;
  window.__merchDxsThumbnailsV1 = true;

  const VERSION = 'dxs-thumbs-1';
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

  function prepareRoot(root) {
    if (!(root instanceof Element)) return;
    if (root.matches?.('.mc-dxs img')) prepareImage(root);
    root.querySelectorAll?.('.mc-dxs img').forEach(prepareImage);
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
    if (event.target.closest?.('.stk-more-projects__link[data-sticker-project-target="dxs"]')) prewarm();
  }, { passive: true, capture: true });

  document.addEventListener('focusin', (event) => {
    if (event.target.closest?.('.stk-more-projects__link[data-sticker-project-target="dxs"]')) prewarm();
  }, true);

  document.addEventListener('click', (event) => {
    if (event.target.closest?.('.stk-more-projects__link[data-sticker-project-target="dxs"]')) prewarm();
  }, true);

  prepareRoot(document.body);
})();
