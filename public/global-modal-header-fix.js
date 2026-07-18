(() => {
  if (document.getElementById('global-modal-header-fix')) return;

  const style = document.createElement('style');
  style.id = 'global-modal-header-fix';
  style.textContent = `
    /* Universal project-modal toolbar fix.
       The toolbar is transparent and stays in the normal document flow,
       so project titles and images can no longer slide behind it. */
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

    /* Keep toolbar controls readable without creating a full-width strip. */
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
  `;

  document.head.append(style);
})();
