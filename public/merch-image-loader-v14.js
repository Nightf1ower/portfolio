(() => {
  if (window.__merchImageLoaderV14) return;
  window.__merchImageLoaderV14 = true;

  const isMerchSource = (value) => {
    if (typeof value !== 'string') return false;
    return /(?:^|\/)works\/merch\//i.test(value)
      || /raw\.githubusercontent\.com\/Nightf1ower\/portfolio\/main\/public\/works\/merch\//i.test(value);
  };

  const setImageHints = (image) => {
    image.loading = 'lazy';
    image.decoding = 'async';
    try { image.fetchPriority = 'low'; } catch {}
  };

  const srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if (srcDescriptor?.get && srcDescriptor?.set) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      enumerable: srcDescriptor.enumerable,
      get() {
        return srcDescriptor.get.call(this);
      },
      set(value) {
        if (isMerchSource(String(value))) setImageHints(this);
        srcDescriptor.set.call(this, value);
      },
    });
  }

  const previousSetAttribute = HTMLImageElement.prototype.setAttribute;
  HTMLImageElement.prototype.setAttribute = function setAttribute(name, value) {
    if (String(name).toLowerCase() === 'src' && isMerchSource(String(value))) {
      setImageHints(this);
    }
    return previousSetAttribute.call(this, name, value);
  };

  const optimizeModal = (modal) => {
    const images = [...modal.querySelectorAll('img')];
    images.forEach((image, index) => {
      image.loading = 'lazy';
      image.decoding = 'async';
      try { image.fetchPriority = index < 2 ? 'high' : 'low'; } catch {}
    });
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      document.querySelectorAll('.m10-modal').forEach(optimizeModal);
    });
  };

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'MERCH') return;
    setTimeout(schedule, 0);
    setTimeout(schedule, 120);
  }, true);
})();
