(() => {
  if (window.__stickersTransparentPngFixV2) return;
  window.__stickersTransparentPngFixV2 = true;

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

  if (!window.__stickersMnuStickerCompositionV1
    && !document.querySelector('script[data-stickers-mnu-composition]')) {
    const script = document.createElement('script');
    script.src = '/stickers-mnu-sticker-composition.js?v=stickers-mnu-sticker-composition-1';
    script.async = false;
    script.dataset.stickersMnuComposition = 'true';
    document.head.append(script);
  }
})();
