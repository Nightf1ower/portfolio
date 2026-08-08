(() => {
  if (window.__vtbThumbnailPerformanceV1) return;
  window.__vtbThumbnailPerformanceV1 = true;

  const VERSION = 'vtb-thumbnail-performance-1';
  const ROOT = '/works/VTB%20DESIGN%20TEAM/print';
  const PRINT_FILES = [
    ['print-1.jpg', 'print-1-variant.jpg', 'print-1-tee-1.jpg', 'print-1-tee-2.jpg', 'print-1-tee-3.jpg', 'print-1-tee-4.jpg', 'print-1-tee-5.jpg', 'print-1-tee-6.jpg'],
    ['print-2.jpg', 'print-2-tee-1.jpg', 'print-2-tee-2.jpg'],
    ['print-3.jpg', 'print-3-variant.jpg', 'print-3-tee-1.jpg', 'print-3-tee-2.jpg', 'print-3-tee-3.jpg', 'print-3-tee-4.jpg', 'print-3-tee-5.jpg'],
    ['print-4.jpg', 'print-4-tee-1.jpg', 'print-4-tee-2.jpg'],
    ['print-5.jpg', 'print-5-variant.jpg', 'print-5-tee-1.jpg', 'print-5-tee-2.jpg', 'print-5-tee-3.jpg'],
    ['print-6.jpg', 'print-6-tee-1.jpg', 'print-6-tee-2.jpg'],
    ['print-7.jpg', 'print-7-tee-1.jpg', 'print-7-tee-2.jpg', 'print-7-tee-3.jpg'],
    ['print-8-1.jpg', 'print-8-tee-1.jpg', 'print-8-tee-2.jpg'],
    ['print-9-1.jpg', 'print-9-variant-1.jpg', 'print-9-variant-2.jpg', 'print-9-tee-1.jpg', 'print-9-tee-2.jpg', 'print-9-tee-3.jpg', 'print-9-tee-4.jpg'],
  ].map((series) => series.map((name) => `${ROOT}/${encodeURIComponent(name)}?v=vtb-gallery-1`));

  const helper = () => window.PORTFOLIO_THUMBS || null;

  const numberFromCard = (card) => {
    const label = card.getAttribute('aria-label') || '';
    const match = label.match(/print\s+(\d+)/i);
    return match ? Number(match[1]) : 0;
  };

  const setThumbnail = (image, original) => {
    const thumbs = helper();
    if (!image || !original) return;
    if (thumbs?.apply) thumbs.apply(image, original);
    else image.src = original;
  };

  function optimizeCard(card) {
    if (!(card instanceof HTMLElement) || card.dataset.vtbThumbHover === VERSION) return;
    const series = PRINT_FILES[numberFromCard(card) - 1];
    if (!series?.length) return;

    const clickHandler = card.onclick;
    const clean = card.cloneNode(true);
    clean.onclick = clickHandler;
    clean.dataset.vtbThumbHover = VERSION;
    card.replaceWith(clean);

    let layers = [...clean.querySelectorAll('.vtb-crossfade-image')];
    if (layers.length < 2) {
      const image = clean.querySelector('img');
      if (!image) return;
      layers = [image];
    }

    layers.forEach((image) => {
      image.loading = 'lazy';
      image.decoding = 'async';
      try { image.fetchPriority = 'low'; } catch {}
    });

    let activeLayer = 0;
    let currentIndex = 0;
    let intervalId = 0;
    let delayId = 0;
    let requestId = 0;

    const showSingle = (index) => {
      currentIndex = index;
      setThumbnail(layers[0], series[index]);
    };

    const showCrossfade = (index) => {
      if (index === currentIndex && layers[activeLayer]?.classList.contains('is-visible')) return;
      const id = ++requestId;
      const nextLayer = activeLayer === 0 ? 1 : 0;
      const next = layers[nextLayer];
      setThumbnail(next, series[index]);

      const reveal = () => {
        if (id !== requestId) return;
        requestAnimationFrame(() => {
          next.classList.add('is-visible');
          layers[activeLayer].classList.remove('is-visible');
          activeLayer = nextLayer;
          currentIndex = index;
        });
      };

      if (next.complete) reveal();
      else {
        next.addEventListener('load', reveal, { once: true });
        next.addEventListener('error', reveal, { once: true });
      }
    };

    const show = layers.length > 1 ? showCrossfade : showSingle;
    setThumbnail(layers[0], series[0]);
    if (layers.length > 1) {
      layers[0].classList.add('is-visible');
      layers.slice(1).forEach((layer) => layer.classList.remove('is-visible'));
    }

    const clearTimers = () => {
      window.clearTimeout(delayId);
      window.clearInterval(intervalId);
      delayId = 0;
      intervalId = 0;
    };

    const reset = () => {
      clearTimers();
      requestId += 1;
      show(0);
    };

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || series.length < 2) return;

    clean.addEventListener('mouseenter', () => {
      clearTimers();
      let index = currentIndex;
      delayId = window.setTimeout(() => {
        index = (index + 1) % series.length;
        show(index);
        intervalId = window.setInterval(() => {
          index = (index + 1) % series.length;
          show(index);
        }, 1250);
      }, 260);
    });
    clean.addEventListener('mouseleave', reset);
    clean.addEventListener('blur', reset);
  }

  function optimizeModal() {
    const modal = document.querySelector('.vtb-modal');
    if (!modal) return;
    modal.querySelectorAll('.vtb-print-card').forEach(optimizeCard);
  }

  const schedule = () => {
    [120, 280, 520, 800].forEach((delay) => window.setTimeout(optimizeModal, delay));
  };

  document.addEventListener('click', (event) => {
    const card = event.target.closest?.('#works article,#works button');
    const title = String(card?.querySelector('h3')?.textContent || '').trim().toUpperCase();
    if (title === 'VTB DESIGN TEAM') schedule();
  }, true);

  window.addEventListener('load', optimizeModal, { once: true });
})();
