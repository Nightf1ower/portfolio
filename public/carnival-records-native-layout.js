(() => {
  if (window.__carnivalRecordsNativeLayoutV1) return;
  window.__carnivalRecordsNativeLayoutV1 = true;

  const style = document.createElement('style');
  style.id = 'carnival-records-native-layout-style';
  style.textContent = `
    .cr-modal .cr-card-label {
      display: none !important;
    }

    .cr-section-album-native .cr-grid {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: clamp(1rem, 2.5vw, 2rem) !important;
    }

    .cr-section-album-native .cr-card {
      width: 100% !important;
      border: 0 !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-section-album-native .cr-media {
      display: block !important;
      width: 100% !important;
      aspect-ratio: auto !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-section-album-native .cr-img {
      position: static !important;
      inset: auto !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      max-width: 100% !important;
      object-fit: contain !important;
      background: transparent !important;
      opacity: 1 !important;
    }

    .cr-section-album-native .cr-subgroup + .cr-subgroup {
      margin-top: clamp(4rem, 8vw, 7rem) !important;
    }
  `;
  document.head.append(style);

  function apply(modal = document.querySelector('.cr-modal')) {
    if (!modal) return;
    const albumHeading = [...modal.querySelectorAll('.cr-h')].find((heading) =>
      heading.textContent?.trim().toUpperCase() === 'ALBUM'
    );
    albumHeading?.closest('.cr-section')?.classList.add('cr-section-album-native');
  }

  apply();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.cr-modal')) apply(node);
      }
    }
  });

  observer.observe(document.body, { childList: true });
})();
