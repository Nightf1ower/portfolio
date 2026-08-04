(() => {
  if (window.__blandettoCloseButtonStyleV1) return;
  window.__blandettoCloseButtonStyleV1 = true;

  const STYLE_ID = 'blandetto-close-button-style';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .bf .bf-x,
    .blandetto-modal .blandetto-close,
    .bld-modal .bld-close {
      background: #050505 !important;
      color: #fff !important;
      border-color: #050505 !important;
      box-shadow: none !important;
    }
  `;

  document.head.append(style);
})();
