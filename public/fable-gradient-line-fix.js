(() => {
  if (window.__fableGradientLineFixV3) return;
  window.__fableGradientLineFixV3 = true;

  const STYLE_ID = 'fable-gradient-line-fix-style';
  const VERSION = 'fable-gradient-line-fix-3';

  function install() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .fable-modal {
        box-sizing: border-box !important;
        width: 100vw !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      .fable-modal .fable-inner {
        box-sizing: border-box !important;
        width: 100% !important;
        padding-left: max(1rem, env(safe-area-inset-left)) !important;
        padding-right: max(1rem, env(safe-area-inset-right)) !important;
      }

      .fable-modal .fable-section.is-clothes,
      .fable-modal .fable-section.is-saint {
        border-top: 0 !important;
      }

      .fable-modal .fable-section.is-clothes::before,
      .fable-modal .fable-section.is-saint::before {
        left: 50% !important;
        width: 100vw !important;
        transform: translateX(-50%) !important;
      }

      .fable-modal .fable-section.is-clothes .fable-grid,
      .fable-modal .fable-section.is-saint .fable-saint-logo,
      .fable-modal .fable-section.is-saint .fable-grid {
        box-sizing: border-box !important;
        width: 100vw !important;
        max-width: none !important;
        margin-left: calc(50% - 50vw) !important;
        margin-right: calc(50% - 50vw) !important;
        padding: 0 !important;
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
        background: transparent !important;
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
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
      }
    `;

    document.head.append(style);
  }

  install();
  window.addEventListener('load', install);
})();
