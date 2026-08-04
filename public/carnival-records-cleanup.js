(() => {
  if (window.__carnivalRecordsCleanupV7) return;
  window.__carnivalRecordsCleanupV7 = true;

  const VERSION = 'carnival-cleanup-7';

  function injectStyles() {
    document.getElementById('carnival-records-cleanup-style')?.remove();
    const style = document.createElement('style');
    style.id = 'carnival-records-cleanup-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .cr-modal .cr-note {
        display: none !important;
      }

      /* Keep the brand introduction compact before the first divider. */
      .cr-modal .cr-hero {
        margin-bottom: clamp(2.75rem, 4vw, 4rem) !important;
      }

      /* One compact rhythm: divider -> title -> copy -> images. */
      .cr-modal .cr-section {
        padding-top: clamp(2rem, 3vw, 3rem) !important;
        padding-bottom: clamp(2.5rem, 3.5vw, 3.5rem) !important;
      }

      .cr-modal .cr-h {
        margin-bottom: 0 !important;
      }

      .cr-modal .cr-description {
        margin: clamp(.9rem, 1.5vw, 1.25rem) 0 clamp(1.25rem, 2vw, 1.75rem) !important;
      }

      .cr-modal .cr-section > .cr-description + * {
        margin-top: 0 !important;
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

      @media (max-width: 700px) {
        .cr-modal .cr-hero {
          margin-bottom: 2.5rem !important;
        }

        .cr-modal .cr-section {
          padding-top: 2rem !important;
          padding-bottom: 2.5rem !important;
        }

        .cr-modal .cr-description {
          margin-top: .9rem !important;
          margin-bottom: 1.25rem !important;
        }
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

  function loadScript(selector, src) {
    if (document.querySelector(selector)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.append(script);
  }

  injectStyles();
  cleanup();
  loadScript('script[src^="/carnival-records-section-order.js"]', '/carnival-records-section-order.js?v=carnival-section-order-3');
  loadScript('script[src^="/carnival-records-copy-update.js"]', '/carnival-records-copy-update.js?v=carnival-copy-update-2');

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