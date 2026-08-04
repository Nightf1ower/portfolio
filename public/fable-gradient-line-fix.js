(() => {
  if (window.__fableGradientLineFixV1) return;
  window.__fableGradientLineFixV1 = true;

  const STYLE_ID = 'fable-gradient-line-fix-style';
  const VERSION = 'fable-gradient-line-fix-1';

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
    `;

    document.head.append(style);
  }

  install();
  window.addEventListener('load', install);
})();
