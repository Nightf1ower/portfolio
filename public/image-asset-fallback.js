(() => {
  if (window.__imageAssetFallbackV1) return;
  window.__imageAssetFallbackV1 = true;

  const RAW_BASE = 'https://raw.githubusercontent.com/Nightf1ower/portfolio/main/public';

  function fallbackImage(image) {
    if (!(image instanceof HTMLImageElement)) return;
    if (image.dataset.assetFallbackTried === 'true') return;

    const original = image.getAttribute('src') || image.currentSrc || '';
    if (!original) return;

    let url;
    try {
      url = new URL(original, window.location.href);
    } catch {
      return;
    }

    if (!url.pathname.startsWith('/works/')) return;

    image.dataset.assetFallbackTried = 'true';
    image.removeAttribute('srcset');
    image.removeAttribute('sizes');
    image.src = `${RAW_BASE}${url.pathname}`;
  }

  function inspect(image) {
    if (!(image instanceof HTMLImageElement)) return;
    if (image.complete && image.naturalWidth === 0) fallbackImage(image);
  }

  document.addEventListener('error', (event) => {
    if (event.target instanceof HTMLImageElement) fallbackImage(event.target);
  }, true);

  function scan(root = document) {
    root.querySelectorAll?.('img').forEach(inspect);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node instanceof HTMLImageElement) inspect(node);
        scan(node);
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', () => scan());
  [0, 250, 750, 1600, 3000].forEach((delay) => setTimeout(() => scan(), delay));
})();