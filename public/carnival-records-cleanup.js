(() => {
  if (window.__carnivalRecordsCleanupV4) return;
  window.__carnivalRecordsCleanupV4 = true;

  const VERSION = 'carnival-cleanup-4';

  function injectStyles() {
    document.getElementById('carnival-records-cleanup-style')?.remove();
    const style = document.createElement('style');
    style.id = 'carnival-records-cleanup-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .cr-modal .cr-note {
        display: none !important;
      }

      .cr-modal .cr-card,
      .cr-modal .cr-media,
      .cr-modal .cr-img {
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
      }

      .cr-modal .cr-card {
        background: transparent !important;
      }

      .cr-modal .cr-media,
      .cr-modal .cr-img {
        background-color: transparent !important;
      }

      .cr-modal .cr-subtitle[data-carnival-tracklist-title] {
        display: none !important;
      }
    `;
    document.head.append(style);
  }

  function cleanup(modal = document.querySelector('.cr-modal')) {
    if (!modal) return false;

    modal.querySelectorAll('.cr-note').forEach((node) => node.remove());

    modal.querySelectorAll('.cr-subtitle').forEach((title) => {
      if (/^(ТРЕКЛИСТ|TRACKLIST)$/i.test(title.textContent?.trim() || '')) {
        title.dataset.carnivalTracklistTitle = 'true';
        title.remove();
      }
    });

    modal.querySelectorAll('.cr-card, .cr-media, .cr-img').forEach((node) => {
      node.style.setProperty('border', '0', 'important');
      node.style.setProperty('outline', '0', 'important');
      node.style.setProperty('box-shadow', 'none', 'important');
    });

    return true;
  }

  function loadSectionOrder() {
    if (document.querySelector('script[src^="/carnival-records-section-order.js"]')) return;
    const script = document.createElement('script');
    script.src = '/carnival-records-section-order.js?v=carnival-section-order-3';
    script.async = false;
    document.head.append(script);
  }

  injectStyles();
  cleanup();
  loadSectionOrder();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.cr-modal')) cleanup(node);
        else node.querySelectorAll?.('.cr-modal').forEach(cleanup);
      }
    }
    cleanup();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();