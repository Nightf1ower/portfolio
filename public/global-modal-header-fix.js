(() => {
  document.getElementById('global-modal-header-fix')?.remove();

  const style = document.createElement('style');
  style.id = 'global-modal-header-fix';
  style.dataset.version = 'modal-head-3';
  style.textContent = `
    .su-head,
    .zny-head,
    .fable-head,
    .merch9-head,
    .m10-head,
    .blandetto-head,
    .bld-head,
    .project9006-head,
    .p9006-head,
    [class$="-modal"] > [class$="-inner"] > [class$="-head"] {
      position: relative !important;
      top: auto !important;
      z-index: 20 !important;
      background: transparent !important;
      border-bottom-color: rgba(5, 5, 5, .22) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .su-label, .su-close,
    .zny-close,
    .fable-label, .fable-close,
    .merch9-label, .merch9-close,
    .m10-label, .m10-close,
    .blandetto-label, .blandetto-close,
    .bld-label, .bld-close,
    .project9006-label, .project9006-close,
    .p9006-label, .p9006-close {
      position: relative !important;
      z-index: 2 !important;
    }

    .pink-punk-section__counter,
    .blandetto-lightbox__counter,
    .blandetto-section__count,
    .bf-c,
    .zny-count,
    .fable-count,
    .m10-count,
    .merch9-count,
    .su-count,
    .project9006-count,
    .p9006-count,
    .project9006-modal section > div:first-child > p.text-xs,
    div[class*="bg-[#050505]"][class*="fixed"][class*="inset-0"] section > div:first-child > p.text-xs {
      display: none !important;
    }
  `;

  document.head.append(style);
})();