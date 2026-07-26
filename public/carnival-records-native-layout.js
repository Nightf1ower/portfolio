(() => {
  if (window.__carnivalRecordsNativeLayoutV2) return;
  window.__carnivalRecordsNativeLayoutV2 = true;

  const style = document.createElement('style');
  style.id = 'carnival-records-native-layout-style';
  style.textContent = `
    .cr-modal .cr-card-label {
      display: none !important;
    }

    .cr-section-album-native .cr-grid,
    .cr-subgroup-merchalbum-wide .cr-grid {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: clamp(1rem, 2.5vw, 2rem) !important;
    }

    .cr-section-album-native .cr-card,
    .cr-subgroup-merchalbum-wide .cr-card {
      width: 100% !important;
      border: 0 !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-section-album-native .cr-media,
    .cr-subgroup-merchalbum-wide .cr-media {
      display: block !important;
      width: 100% !important;
      aspect-ratio: auto !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-section-album-native .cr-img,
    .cr-subgroup-merchalbum-wide .cr-img {
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

  function findSection(modal, title) {
    return [...modal.querySelectorAll('.cr-h')]
      .find((heading) => heading.textContent?.trim().toUpperCase() === title)
      ?.closest('.cr-section') || null;
  }

  function apply(modal = document.querySelector('.cr-modal')) {
    if (!modal || modal.dataset.carnivalCurated === 'true') return;

    const albumSection = findSection(modal, 'ALBUM');
    if (albumSection) {
      albumSection.classList.add('cr-section-album-native');
      const subgroups = [...albumSection.querySelectorAll('.cr-subgroup')];

      const vinylCards = [...(subgroups[1]?.querySelectorAll('.cr-card') || [])];
      vinylCards.slice(6).forEach((card) => card.remove());

      subgroups[2]?.classList.add('cr-subgroup-merchalbum-wide');
    }

    const merchSection = findSection(modal, 'MERCH');
    const merchCards = [...(merchSection?.querySelectorAll('.cr-card') || [])];
    merchCards[0]?.remove();

    modal.dataset.carnivalCurated = 'true';
  }

  apply();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.cr-modal')) apply(node);
        else node.querySelectorAll?.('.cr-modal').forEach(apply);
      }
    }
  });

  observer.observe(document.body, { childList: true });
})();