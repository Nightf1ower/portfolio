(() => {
  if (window.__pinkPunkGradientLayerFixV1) return;
  window.__pinkPunkGradientLayerFixV1 = true;

  const style = document.createElement('style');
  style.id = 'pink-punk-gradient-layer-fix';
  style.textContent = `
    .pink-punk-fullscreen::before {
      background: #050505 !important;
      background-image: none !important;
    }
  `;
  document.head.append(style);
})();
