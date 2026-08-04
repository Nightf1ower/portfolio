(() => {
  if (window.__merchFullWidthLayoutV1) return;
  window.__merchFullWidthLayoutV1 = true;

  const style = document.createElement('style');
  style.id = 'merch-full-width-layout-style';
  style.textContent = `
    .mc-modal {
      --mc-page-edge: clamp(1.25rem, 2.6vw, 3rem);
    }

    .mc-modal .mc-shell {
      box-sizing: border-box !important;
      width: auto !important;
      max-width: none !important;
      margin-right: var(--mc-page-edge) !important;
      margin-left: var(--mc-page-edge) !important;
    }

    .mc-modal .mc-head,
    .mc-modal .mc-hero,
    .mc-modal .mc-section {
      width: 100% !important;
      max-width: none !important;
    }

    .mc-modal .mc-title {
      width: 100% !important;
      max-width: none !important;
      font-size: clamp(4.25rem, 8.6vw, 10.5rem) !important;
      line-height: .82 !important;
      text-wrap: balance !important;
    }

    .mc-modal .mc-copy {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      padding-right: clamp(0rem, 7vw, 8rem) !important;
      font-size: clamp(1rem, 1.25vw, 1.35rem) !important;
    }

    .mc-modal .mc-grid,
    .mc-modal .mc-billboards,
    .mc-modal .mc-dxs {
      width: 100% !important;
      max-width: none !important;
    }

    .mc-modal .mc-bridge {
      box-sizing: border-box !important;
      padding-right: var(--mc-page-edge) !important;
      padding-left: var(--mc-page-edge) !important;
    }

    @media (max-width: 700px) {
      .mc-modal {
        --mc-page-edge: .75rem;
      }

      .mc-modal .mc-shell {
        margin-right: var(--mc-page-edge) !important;
        margin-left: var(--mc-page-edge) !important;
      }

      .mc-modal .mc-title {
        font-size: clamp(3.25rem, 16vw, 6rem) !important;
        text-wrap: wrap !important;
      }

      .mc-modal .mc-copy {
        padding-right: 0 !important;
        font-size: 1rem !important;
      }
    }
  `;

  document.head.append(style);
})();
