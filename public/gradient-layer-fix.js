(() => {
  if (window.__portfolioGradientLayerFixV2) return;
  window.__portfolioGradientLayerFixV2 = true;

  const style = document.createElement('style');
  style.id = 'portfolio-gradient-layer-fix';
  style.dataset.version = 'gradient-layer-2';
  style.textContent = `
    .pink-punk-fullscreen::before,
    .su-modal::before {
      content: none !important;
      display: none !important;
      background: none !important;
      background-image: none !important;
    }

    html:has(.su-modal),
    body:has(.su-modal) {
      background: #57bd93 !important;
      background-color: #57bd93 !important;
    }
  `;

  document.head.append(style);
})();
