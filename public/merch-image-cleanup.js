(() => {
  if (window.__merchImageCleanupV1) return;
  window.__merchImageCleanupV1 = true;

  const style = document.createElement('style');
  style.id = 'merch-image-cleanup-style';
  style.textContent = `
    .mc-modal .mc-count {
      display: none !important;
    }

    .mc-modal .mc-section-head {
      justify-content: flex-start !important;
    }

    .mc-modal .mc-card,
    .mc-modal .mc-media {
      min-height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      outline: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    .mc-modal .mc-media {
      display: block !important;
      overflow: visible !important;
    }

    .mc-modal .mc-card::before,
    .mc-modal .mc-card::after,
    .mc-modal .mc-media::before,
    .mc-modal .mc-media::after {
      display: none !important;
      content: none !important;
    }

    .mc-modal .mc-media > img:not(.mc-hover) {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      max-height: none !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      object-fit: contain !important;
    }
  `;
  document.head.append(style);

  const clean = root => {
    if (!(root instanceof Element || root instanceof Document)) return;
    root.querySelectorAll('.mc-modal .mc-count').forEach(counter => counter.remove());
  };

  clean(document);

  new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.mc-count')) node.remove();
        clean(node);
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
