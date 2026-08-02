(() => {
  if (window.__merchMediaLayoutFinalV1) return;
  window.__merchMediaLayoutFinalV1 = true;

  const VERSION = 'merch-media-layout-final-1';
  const STYLE_ID = 'merch-media-layout-final-style';

  function installStyle() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      /* YABLOCHKO ZELENOE — ADS: four large images in a full-width 2x2 grid. */
      .m10-modal .m10-ad-layout,
      .m10-modal .m10-ad-layout-new {
        box-sizing: border-box !important;
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        align-items: start !important;
        gap: clamp(1rem, 2vw, 1.5rem) !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
      }

      .m10-modal .m10-ad-layout > .m10-ad-rest,
      .m10-modal .m10-ad-layout-new > .m10-ad-rest {
        display: contents !important;
      }

      .m10-modal .m10-ad-layout .m10-ad-feature,
      .m10-modal .m10-ad-layout-new .m10-ad-feature,
      .m10-modal .m10-ad-layout .m10-ad-rest > .m10-card,
      .m10-modal .m10-ad-layout-new .m10-ad-rest > .m10-card {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        margin: 0 !important;
      }

      .m10-modal .m10-ad-layout .m10-media,
      .m10-modal .m10-ad-layout-new .m10-media,
      .m10-modal .m10-ad-layout .m10-ad-feature .m10-media,
      .m10-modal .m10-ad-layout-new .m10-ad-feature .m10-media,
      .m10-modal .m10-ad-layout .m10-ad-rest .m10-media,
      .m10-modal .m10-ad-layout-new .m10-ad-rest .m10-media {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        overflow: visible !important;
      }

      .m10-modal .m10-ad-layout img,
      .m10-modal .m10-ad-layout-new img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        object-fit: contain !important;
        transform: none !important;
      }

      /* DXS — POSTERS: replace the old four-column thumbnails with a large 2x2 grid. */
      .m10-modal .m10-dxs-zone .m10-dxs-posters {
        box-sizing: border-box !important;
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        align-items: start !important;
        gap: clamp(1rem, 2vw, 1.5rem) !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
      }

      .m10-modal .m10-dxs-zone .m10-dxs-posters > .m10-card,
      .m10-modal .m10-dxs-zone .m10-dxs-posters .m10-media {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        min-width: 0 !important;
        min-height: 0 !important;
        max-width: none !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        margin: 0 !important;
        overflow: visible !important;
      }

      .m10-modal .m10-dxs-zone .m10-dxs-posters img {
        position: static !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        object-fit: contain !important;
        transform: none !important;
      }

      @media (max-width: 720px) {
        .m10-modal .m10-ad-layout,
        .m10-modal .m10-ad-layout-new,
        .m10-modal .m10-dxs-zone .m10-dxs-posters {
          grid-template-columns: 1fr !important;
        }
      }
    `;

    document.head.append(style);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      installStyle();
    });
  }

  new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => {
      if (mutation.type !== 'childList') return false;
      return [...mutation.addedNodes].some((node) => (
        node instanceof Element && (
          node.matches?.('.m10-modal, style') ||
          node.querySelector?.('.m10-modal')
        )
      ));
    });
    if (relevant) schedule();
  }).observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('load', schedule);
  installStyle();
})();
