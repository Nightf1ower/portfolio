(() => {
  if (window.__merchLazyImagesV1) return;
  window.__merchLazyImagesV1 = true;

  const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if (!descriptor?.get || !descriptor?.set) return;

  const originalGet = descriptor.get;
  const originalSet = descriptor.set;
  const isMerchUrl = (value) => /(?:raw\.githubusercontent\.com\/Nightf1ower\/portfolio\/main\/public\/works\/merch\/|\/works\/merch\/)/i.test(String(value || ''));

  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    configurable: true,
    enumerable: descriptor.enumerable,
    get() {
      return originalGet.call(this);
    },
    set(value) {
      if (isMerchUrl(value) && !this.isConnected && !this.closest?.('.m10-light,.pul-overlay')) {
        this.dataset.merchLazySrc = String(value);
        this.loading = 'lazy';
        this.decoding = 'async';
        return;
      }
      originalSet.call(this, value);
    },
  });

  let observer = null;

  function loadImage(image) {
    const src = image.dataset.merchLazySrc;
    if (!src) return;
    delete image.dataset.merchLazySrc;
    originalSet.call(image, src);
  }

  function bindModal(modal) {
    if (!modal || modal.dataset.merchLazyBound === '1') return;
    modal.dataset.merchLazyBound = '1';

    observer?.disconnect();
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadImage(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      root: modal,
      rootMargin: '900px 0px',
      threshold: 0.01,
    });

    const images = [...modal.querySelectorAll('img[data-merch-lazy-src]')];
    images.slice(0, 8).forEach(loadImage);
    images.slice(8).forEach((image) => observer.observe(image));
  }

  function scan() {
    document.querySelectorAll('.m10-modal').forEach(bindModal);
  }

  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  scan();
})();