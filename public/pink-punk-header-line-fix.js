(() => {
  if (window.__pinkPunkHeaderLineFixV1) return;
  window.__pinkPunkHeaderLineFixV1 = true;

  const STYLE_ID = 'pink-punk-header-line-fix-style';

  function install() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .pink-punk-fullscreen > div > .sticky,
      .pink-punk-fullscreen .sticky,
      .pink-punk-modal .sticky {
        border-bottom: 0 !important;
        border-bottom-color: transparent !important;
        box-shadow: none !important;
        outline: 0 !important;
      }
    `;

    document.head.append(style);
  }

  install();
  window.addEventListener('load', install);
})();
