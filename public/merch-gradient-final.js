(() => {
  if (window.__merchGradientFinalV1) return;
  window.__merchGradientFinalV1 = true;

  const STYLE_ID = 'merch-gradient-final-style';
  const VERSION = 'merch-gradient-final-1';

  function install() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      /* MERCH: continue the coral background into DXS without a hard seam. */
      .m10-modal {
        overflow-x: hidden !important;
      }

      .m10-modal .m10-dxs-zone {
        position: relative !important;
        box-sizing: border-box !important;
        margin-top: -2px !important;
        border-top: 0 !important;
        outline: 0 !important;
        background-color: #ef2b27 !important;
        background-image: linear-gradient(
          180deg,
          #e4322c 0,
          #e5332d 8rem,
          #e7352f 18rem,
          #e9362f 30rem,
          #eb332d 42rem,
          #ed302a 54rem,
          #ef2b27 66rem,
          #ef2b27 100%
        ) !important;
        background-repeat: no-repeat !important;
        background-size: 100% 100% !important;
        box-shadow: 0 100vh 0 100vh #ef2b27 !important;
      }

      .m10-modal .m10-dxs-zone::before,
      .m10-modal .m10-dxs-zone::after {
        border-top: 0 !important;
        outline: 0 !important;
      }

      @media (max-width: 720px) {
        .m10-modal .m10-dxs-zone {
          background-image: linear-gradient(
            180deg,
            #e4322c 0,
            #e7352f 14rem,
            #eb332d 30rem,
            #ef2b27 46rem,
            #ef2b27 100%
          ) !important;
        }
      }
    `;

    document.head.append(style);
  }

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(install);
  };

  new MutationObserver((mutations) => {
    if (mutations.some((mutation) => [...mutation.addedNodes].some((node) => (
      node instanceof Element && (
        node.matches?.('.m10-modal, .m10-dxs-zone, style')
        || node.querySelector?.('.m10-modal, .m10-dxs-zone')
      )
    )))) schedule();
  }).observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('load', schedule);
  [0, 120, 400, 1000].forEach((delay) => setTimeout(schedule, delay));
  install();
})();
