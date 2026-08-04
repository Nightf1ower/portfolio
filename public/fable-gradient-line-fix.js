(() => {
  if (window.__fableGradientLineFixV4) return;
  window.__fableGradientLineFixV4 = true;

  const STYLE_ID = 'fable-gradient-line-fix-style';
  const VERSION = 'fable-gradient-line-fix-4';

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
        padding-bottom: 0 !important;
      }

      .fable-modal .fable-inner {
        box-sizing: border-box !important;
        width: 100% !important;
        margin-bottom: 0 !important;
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

      .fable-modal .fable-section.is-saint:last-child {
        margin-bottom: 0 !important;
      }
    `;

    document.head.append(style);
  }

  install();
  window.addEventListener('load', install);
})();
