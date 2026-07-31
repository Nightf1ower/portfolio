(() => {
  if (window.__merchStabilityRestoreV2) return;
  window.__merchStabilityRestoreV2 = true;

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

      .m10-section.is-billboards {
        position: relative !important;
        z-index: 0 !important;
        isolation: isolate !important;
        margin-bottom: 0 !important;
        padding-bottom: clamp(7rem, 12vw, 12rem) !important;
      }

      .m10-section.is-billboards::before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 100vw;
        transform: translateX(-50%);
        pointer-events: none;
        background: linear-gradient(
          180deg,
          #87CEEB 0%,
          #87CEEB 8%,
          #8cc9e3 18%,
          #9cbdd3 30%,
          #b0a9bc 43%,
          #c58e9d 57%,
          #d67478 70%,
          #df5559 84%,
          #e5312b 100%
        );
      }

      .m10-dxs-zone {
        margin-top: 0 !important;
        padding-top: clamp(7rem, 12vw, 11rem) !important;
        background-color: #e5312b !important;
        background-image: none !important;
      }

      @media (max-width: 700px) {
        .m10-section.is-billboards {
          padding-bottom: 6rem !important;
        }

        .m10-dxs-zone {
          padding-top: 6rem !important;
        }
      }
    `;

    document.head.append(style);
  }

  function markBillboards(modal) {
    if (!(modal instanceof Element)) return;

    const sections = [...modal.querySelectorAll('.m10-section')];
    let billboardSection = sections.find((section) => {
      const title = section.querySelector('.m10-section-title')?.textContent?.trim().toUpperCase() || '';
      return title.includes('BILLBOARD');
    });

    if (!billboardSection) {
      const dxs = modal.querySelector('.m10-dxs-zone');
      const previous = dxs?.previousElementSibling;
      if (previous?.classList.contains('m10-section')) billboardSection = previous;
    }

    sections.forEach((section) => section.classList.toggle('is-billboards', section === billboardSection));
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
    document.querySelectorAll('.m10-modal').forEach((modal) => {
      markBillboards(modal);
      restoreImages(modal);
    });
  }

  new MutationObserver(apply).observe(document.body, {
    childList: true,
    subtree: true,
  });

  apply();
})();
