(() => {
  if (window.__carnivalRecordsNativeLayoutV3) return;
  window.__carnivalRecordsNativeLayoutV3 = true;

  const style = document.createElement('style');
  style.id = 'carnival-records-native-layout-style';
  style.textContent = `
    .cr-modal .cr-card-label {
      display: none !important;
    }

    .cr-subgroup-album-covers .cr-grid,
    .cr-subgroup-merchalbum-wide .cr-grid {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: clamp(1rem, 2.5vw, 2rem) !important;
    }

    .cr-subgroup-album-covers .cr-card,
    .cr-subgroup-merchalbum-wide .cr-card,
    .cr-section-merch-clean .cr-card {
      width: 100% !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-subgroup-album-covers .cr-media,
    .cr-subgroup-merchalbum-wide .cr-media,
    .cr-section-merch-clean .cr-media {
      display: block !important;
      width: 100% !important;
      aspect-ratio: auto !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .cr-subgroup-album-covers .cr-img,
    .cr-subgroup-merchalbum-wide .cr-img,
    .cr-section-merch-clean .cr-img {
      position: static !important;
      inset: auto !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      max-width: 100% !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      object-fit: contain !important;
      background: transparent !important;
      opacity: 1 !important;
    }

    .cr-subgroup-vinyl-grid .cr-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 1rem !important;
    }

    .cr-subgroup-vinyl-grid .cr-card {
      width: 100% !important;
    }

    .cr-section-merch-clean .cr-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 1rem !important;
      align-items: start !important;
    }

    .cr-section-album-curated .cr-subgroup + .cr-subgroup {
      margin-top: clamp(4rem, 8vw, 7rem) !important;
    }

    @media (max-width: 900px) {
      .cr-subgroup-vinyl-grid .cr-grid,
      .cr-section-merch-clean .cr-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
    }

    @media (max-width: 600px) {
      .cr-subgroup-vinyl-grid .cr-grid,
      .cr-section-merch-clean .cr-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.append(style);

  function findSection(modal, title) {
    return [...modal.querySelectorAll('.cr-h')]
      .find((heading) => heading.textContent?.trim().toUpperCase() === title)
      ?.closest('.cr-section') || null;
  }

  function apply(modal = document.querySelector('.cr-modal')) {
    if (!modal || modal.dataset.carnivalCuratedV3 === 'true') return;

    const albumSection = findSection(modal, 'ALBUM');
    if (albumSection) {
      albumSection.classList.add('cr-section-album-curated');
      const subgroups = [...albumSection.querySelectorAll('.cr-subgroup')];

      subgroups[0]?.classList.add('cr-subgroup-album-covers');
      subgroups[1]?.classList.add('cr-subgroup-vinyl-grid');
      subgroups[2]?.classList.add('cr-subgroup-merchalbum-wide');

      const vinylCards = [...(subgroups[1]?.querySelectorAll('.cr-card') || [])];
      vinylCards.slice(6).forEach((card) => card.remove());
    }

    const merchSection = findSection(modal, 'MERCH');
    if (merchSection) {
      merchSection.classList.add('cr-section-merch-clean');
      const merchCards = [...merchSection.querySelectorAll('.cr-card')];
      merchCards[0]?.remove();
    }

    modal.dataset.carnivalCuratedV3 = 'true';
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