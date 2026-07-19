(() => {
  const VERSION = '9006-proportions-1';
  const STYLE_ID = 'project9006-proportion-fix-style';

  const apply = () => {
    const previous = document.getElementById(STYLE_ID);
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .project9006-modal .project9006-logo-card {
        background: transparent !important;
      }

      .project9006-modal .project9006-logo-card img {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        object-fit: cover !important;
      }

      .project9006-modal .project9006-posters-grid {
        align-items: start !important;
      }

      .project9006-modal .project9006-poster-card {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        aspect-ratio: auto !important;
        min-height: 0 !important;
        overflow: visible !important;
        background: transparent !important;
      }

      .project9006-modal .project9006-poster-card img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: 100% !important;
        max-height: none !important;
        padding: 0 !important;
        object-fit: contain !important;
        transform: none !important;
      }
    `;
    document.head.append(style);
  };

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', apply);
  apply();
})();
