(() => {
  if (window.__merchStabilityRestoreV1) return;
  window.__merchStabilityRestoreV1 = true;

  const STYLE_ID = 'merch-stability-restore-style';

  function injectStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html:has(.m10-modal),
      body:has(.m10-modal),
      .m10-modal {
        background-color: #87CEEB !important;
        background-image: none !important;
      }

      .m10-dxs-zone {
        background-color: #e5312b !important;
        background-image: linear-gradient(
          180deg,
          #87CEEB 0%,
          #8bcbe6 8%,
          #94c5dc 16%,
          #a2b8cc 26%,
          #b0a7b8 38%,
          #c28b9b 52%,
          #d26976 68%,
          #df4a4f 84%,
          #e5312b 100%
        ) !important;
        background-repeat: no-repeat !important;
        background-size: 100% 100% !important;
      }
    `;

    document.head.append(style);
  }

  function restoreImages(modal) {
    if (!(modal instanceof Element)) return;

    const images = [...modal.querySelectorAll('img')];

    images.forEach((image, index) => {
      const deferredSource = image.dataset.merchLazySrc;

      if (deferredSource) {
        delete image.dataset.merchLazySrc;
        image.setAttribute('src', deferredSource);
      }

      image.loading = index < 8 ? 'eager' : 'lazy';
      image.decoding = 'async';
    });
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.m10-modal').forEach(restoreImages);
  }

  new MutationObserver(apply).observe(document.body, {
    childList: true,
    subtree: true,
  });

  apply();
})();
