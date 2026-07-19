(() => {
  if (window.__merchMobileLayoutFixLoaded) return;
  window.__merchMobileLayoutFixLoaded = true;

  const VERSION = 'merch-mobile-fix-1';
  const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');

  function injectStyles() {
    if (document.getElementById('merch-mobile-layout-fix-style')) return;

    const style = document.createElement('style');
    style.id = 'merch-mobile-layout-fix-style';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.m10-modal),
      body:has(.m10-modal) {
        width: 100% !important;
        min-height: 100% !important;
        overflow: hidden !important;
        overscroll-behavior: none !important;
        background: #87CEEB !important;
      }

      .m10-modal {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;
        min-height: 100svh !important;
        max-width: none !important;
        box-sizing: border-box !important;
        border: 0 !important;
        margin: 0 !important;
        overscroll-behavior: none !important;
        background-color: #87CEEB !important;
        background-clip: border-box !important;
      }

      .m10-dxs-zone {
        margin-top: 1.75rem !important;
        padding-top: 3.75rem !important;
        background: linear-gradient(
          to bottom,
          #87CEEB 0,
          #a58fa8 1.25rem,
          #c97888 2.35rem,
          #df4a4f 3.7rem,
          #e5312b 5.5rem,
          #e5312b 100%
        ) !important;
      }

      .m10-dxs-title {
        margin-top: 0 !important;
        margin-bottom: 3rem !important;
      }

      @media (hover: none), (pointer: coarse), (max-width: 768px) {
        .m10-modal {
          padding-top: max(1rem, env(safe-area-inset-top)) !important;
          padding-right: max(1rem, env(safe-area-inset-right)) !important;
          padding-bottom: max(0px, env(safe-area-inset-bottom)) !important;
          padding-left: max(1rem, env(safe-area-inset-left)) !important;
          -webkit-overflow-scrolling: touch !important;
        }

        .m10-card,
        .m10-media {
          touch-action: manipulation !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        .m10-modal img,
        .m10-light img {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          user-select: none !important;
          -webkit-user-drag: none !important;
          user-drag: none !important;
        }

        .m10-card:hover .m10-layer,
        .m10-card:active .m10-layer,
        .m10-card:focus .m10-layer,
        .m10-card:focus-visible .m10-layer {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        .m10-dxs-zone {
          margin-top: 1rem !important;
          padding-top: 3rem !important;
          background: linear-gradient(
            to bottom,
            #87CEEB 0,
            #a58fa8 .85rem,
            #cf6979 1.65rem,
            #e24349 2.65rem,
            #e5312b 4rem,
            #e5312b 100%
          ) !important;
        }

        .m10-dxs-title {
          margin-bottom: 2.25rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function isTouchUI() {
    return touchQuery.matches || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;
  }

  function protectImages(root = document) {
    if (!isTouchUI()) return;
    root.querySelectorAll?.('.m10-modal img, .m10-light img').forEach((image) => {
      image.draggable = false;
      image.setAttribute('draggable', 'false');
    });
  }

  function preventImageMenu(event) {
    if (!isTouchUI()) return;
    if (!event.target.closest?.('.m10-modal img, .m10-light img')) return;
    event.preventDefault();
  }

  injectStyles();
  protectImages();

  document.addEventListener('contextmenu', preventImageMenu, true);
  document.addEventListener('dragstart', preventImageMenu, true);
  document.addEventListener('selectstart', preventImageMenu, true);

  const observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType !== 1) return;
      if (node.matches?.('.m10-modal img, .m10-light img')) {
        node.draggable = false;
        node.setAttribute('draggable', 'false');
      }
      protectImages(node);
    }));
  });
  observer.observe(document.body, { childList: true, subtree: true });

  touchQuery.addEventListener?.('change', () => protectImages());
  window.addEventListener('resize', () => protectImages(), { passive: true });
})();