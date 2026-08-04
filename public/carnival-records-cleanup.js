(() => {
  if (window.__carnivalRecordsCleanupV8) return;
  window.__carnivalRecordsCleanupV8 = true;

  const style = document.createElement('style');
  style.id = 'carnival-records-cleanup-style';
  style.textContent = `
    .cr-modal .cr-note,
    .cr-modal .cr-subtitle[data-carnival-tracklist-title] {
      display: none !important;
    }

    .cr-modal .cr-card,
    .cr-modal .cr-media,
    .cr-modal .cr-img {
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
    }

    .cr-modal .cr-card,
    .cr-modal .cr-media,
    .cr-modal .cr-img {
      background-color: transparent !important;
    }
  `;
  document.getElementById(style.id)?.remove();
  document.head.append(style);

  if (!document.querySelector('script[src^="/carnival-records-spacing-fix.js"]')) {
    const script = document.createElement('script');
    script.src = '/carnival-records-spacing-fix.js?v=carnival-spacing-1';
    script.async = false;
    document.head.append(script);
  }

  const cleanup = (modal = document.querySelector('.cr-modal')) => {
    if (!modal) return;

    modal.querySelectorAll('.cr-note').forEach((node) => node.remove());

    modal.querySelectorAll('.cr-subtitle').forEach((title) => {
      const value = title.textContent?.trim().toUpperCase();
      if (value === 'TRACKLIST' || value === 'ТРЕКЛИСТ') {
        title.dataset.carnivalTracklistTitle = 'true';
        title.remove();
      }
    });

    modal.querySelectorAll('.cr-card, .cr-media, .cr-img').forEach((node) => {
      node.style.setProperty('border', '0', 'important');
      node.style.setProperty('outline', '0', 'important');
      node.style.setProperty('box-shadow', 'none', 'important');
    });
  };

  cleanup();
  new MutationObserver(cleanup).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();