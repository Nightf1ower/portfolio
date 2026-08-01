(() => {
  if (window.__stickersTransparentPngFixV1) return;
  window.__stickersTransparentPngFixV1 = true;

  const style = document.createElement('style');
  style.id = 'stickers-transparent-png-fix-style';
  style.textContent = `
    .stk-grid--stickers .stk-card,
    .stk-grid--stickers .stk-card:hover,
    .stk-grid--stickers .stk-card:focus,
    .stk-grid--stickers .stk-card:active {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      box-shadow: none !important;
    }

    .stk-grid--stickers .stk-card img {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
    }
  `;
  document.head.append(style);
})();
