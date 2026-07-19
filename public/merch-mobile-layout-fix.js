(() => {
  if (window.__merchMobileLayoutFixLoaded) return;
  window.__merchMobileLayoutFixLoaded = true;

  const VERSION = 'merch-mobile-fix-4';
  const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');

  function injectStyles() {
    const previous = document.getElementById('merch-mobile-layout-fix-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

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

      .m10-yablochko-transition {
        position: relative !important;
        z-index: 0 !important;
        isolation: isolate !important;
        margin-bottom: 0 !important;
        padding-bottom: clamp(2.5rem, 6vw, 5rem) !important;
      }

      .m10-yablochko-transition::before {
        content: '';
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 38%;
        bottom: -1px;
        width: 100vw;
        transform: translateX(-50%);
        pointer-events: none;
        background: linear-gradient(
          to bottom,
          rgba(135, 206, 235, 0) 0%,
          rgba(142, 201, 229, 0.16) 10%,
          rgba(151, 193, 218, 0.32) 20%,
          rgba(165, 181, 204, 0.48) 31%,
          rgba(181, 164, 185, 0.64) 43%,
          rgba(198, 139, 157, 0.77) 56%,
          rgba(213, 111, 124, 0.88) 69%,
          rgba(225, 78, 83, 0.95) 82%,
          #e5312b 100%
        );
      }

      .m10-dxs-zone {
        margin-top: 0 !important;
        padding-top: clamp(2.25rem, 5vw, 4rem) !important;
        background: #e5312b !important;
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

        .m10-yablochko-transition {
          padding-bottom: 2.5rem !important;
        }

        .m10-yablochko-transition::before {
          top: 30%;
          background: linear-gradient(
            to bottom,
            rgba(135, 206, 235, 0) 0%,
            rgba(141, 201, 229, 0.12) 9%,
            rgba(149, 195, 221, 0.25) 18%,
            rgba(160, 186, 211, 0.39) 28%,
            rgba(174, 172, 195, 0.53) 39%,
            rgba(190, 151, 174, 0.66) 51%,
            rgba(205, 127, 147, 0.78) 63%,
            rgba(218, 99, 113, 0.88) 75%,
            rgba(227, 70, 76, 0.96) 88%,
            #e5312b 100%
          );
        }

        .m10-dxs-zone {
          margin-top: 0 !important;
          padding-top: 2.25rem !important;
          background: #e5312b !important;
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

  function applySmoothGradient() {
    const zone = document.querySelector('.m10-dxs-zone');
    const previousSection = zone?.previousElementSibling;
    if (!zone || !previousSection) return false;
    previousSection.classList.add('m10-yablochko-transition');
    return true;
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

  let scheduled = false;
  function scheduleRefresh() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applySmoothGradient();
      protectImages();
    });
  }

  scheduleRefresh();
  document.addEventListener('contextmenu', preventImageMenu, true);
  document.addEventListener('dragstart', preventImageMenu, true);
  document.addEventListener('selectstart', preventImageMenu, true);

  const observer = new MutationObserver(scheduleRefresh);
  observer.observe(document.body, { childList: true, subtree: true });

  touchQuery.addEventListener?.('change', scheduleRefresh);
  window.addEventListener('resize', scheduleRefresh, { passive: true });
})();