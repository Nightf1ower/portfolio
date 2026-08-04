(() => {
  if (window.__fableGradientLineFixV5) return;
  window.__fableGradientLineFixV5 = true;

  const STYLE_ID = 'fable-gradient-line-fix-style';
  const VERSION = 'fable-gradient-line-fix-5';

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
        inset: 0 !important;
        width: 100vw !important;
        max-width: 100vw !important;
        margin: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
      }

      .fable-modal .fable-inner {
        box-sizing: border-box !important;
        width: 100vw !important;
        max-width: none !important;
        margin: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
      }

      .fable-modal .fable-head,
      .fable-modal .fable-intro,
      .fable-modal .fable-section:not(.is-clothes):not(.is-saint) {
        box-sizing: border-box !important;
        padding-left: max(1rem, env(safe-area-inset-left)) !important;
        padding-right: max(1rem, env(safe-area-inset-right)) !important;
      }

      .fable-modal .fable-section.is-clothes,
      .fable-modal .fable-section.is-saint {
        box-sizing: border-box !important;
        width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        border-top: 0 !important;
      }

      .fable-modal .fable-section.is-clothes::before,
      .fable-modal .fable-section.is-saint::before {
        inset: 0 !important;
        width: 100% !important;
        transform: none !important;
      }

      .fable-modal .fable-section.is-clothes > .fable-section-head,
      .fable-modal .fable-section.is-clothes > .fable-section-description,
      .fable-modal .fable-section.is-saint > .fable-section-head,
      .fable-modal .fable-section.is-saint > .fable-section-description {
        box-sizing: border-box !important;
        padding-left: max(1rem, env(safe-area-inset-left)) !important;
        padding-right: max(1rem, env(safe-area-inset-right)) !important;
      }

      .fable-modal .fable-section.is-clothes > .fable-grid,
      .fable-modal .fable-section.is-saint > .fable-grid,
      .fable-modal .fable-section.is-saint > .fable-saint-logo {
        width: calc(100% - 2rem) !important;
        max-width: none !important;
        margin-left: 1rem !important;
        margin-right: 1rem !important;
      }

      .fable-modal .fable-section.is-saint:last-child {
        margin-bottom: 0 !important;
      }
    `;

    document.head.append(style);
  }

  install();
  window.addEventListener('load', install);
})();
