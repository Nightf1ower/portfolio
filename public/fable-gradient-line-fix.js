(() => {
  if (window.__fableGradientLineFixV2) return;
  window.__fableGradientLineFixV2 = true;

  const STYLE_ID = 'fable-gradient-line-fix-style';
  const VERSION = 'fable-gradient-line-fix-2';

  function install() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .fable-modal .fable-section.is-clothes,
      .fable-modal .fable-section.is-saint {
        border-top: 0 !important;
      }

      @media (max-width: 560px), (hover: none), (pointer: coarse) {
        .fable-modal .fable-section.is-clothes .fable-grid,
        .fable-modal .fable-section.is-saint .fable-grid,
        .fable-modal .fable-section.is-saint .fable-saint-logo {
          box-sizing: border-box !important;
          width: calc(100% + 2rem) !important;
          max-width: none !important;
          margin-left: -1rem !important;
          margin-right: -1rem !important;
        }

        .fable-modal .fable-section.is-clothes .fable-grid,
        .fable-modal .fable-section.is-saint .fable-grid {
          gap: 0 !important;
          row-gap: 0 !important;
          column-gap: 0 !important;
        }

        .fable-modal .fable-section.is-saint .fable-saint-logo {
          margin-bottom: 0 !important;
        }

        .fable-modal .fable-section.is-clothes .fable-card,
        .fable-modal .fable-section.is-saint .fable-card,
        .fable-modal .fable-section.is-saint .fable-saint-logo,
        .fable-modal .fable-section.is-clothes img,
        .fable-modal .fable-section.is-saint img {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          border: 0 !important;
          outline: 0 !important;
          box-shadow: none !important;
        }
      }
    `;

    document.head.append(style);
  }

  install();
  window.addEventListener('load', install);
})();
