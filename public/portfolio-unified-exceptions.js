(() => {
  if (window.__portfolioUnifiedExceptionsV1) return;
  window.__portfolioUnifiedExceptionsV1 = true;

  const VERSION = 'portfolio-unified-exceptions-1';
  document.getElementById('portfolio-unified-exceptions-style')?.remove();

  const style = document.createElement('style');
  style.id = 'portfolio-unified-exceptions-style';
  style.dataset.version = VERSION;
  style.textContent = `
    /* PINK PUNK uses .pink-punk-fullscreen instead of a *-modal class. */
    .pink-punk-fullscreen,
    .pink-punk-fullscreen * {
      font-family: var(--portfolio-font, Arial, Helvetica, sans-serif) !important;
    }

    .pink-punk-fullscreen .pink-punk-gallery,
    .pink-punk-fullscreen .pink-punk-gallery--grouped {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
    }

    .pink-punk-fullscreen .pink-punk-brand {
      padding-top: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
      padding-bottom: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
    }

    .pink-punk-fullscreen .pink-punk-brand__title {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      line-height: var(--portfolio-title-line, .92) !important;
      letter-spacing: var(--portfolio-title-tracking, .025em) !important;
    }

    .pink-punk-fullscreen .pink-punk-section {
      box-sizing: border-box !important;
      padding-top: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
      padding-bottom: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
    }

    .pink-punk-fullscreen .pink-punk-section + .pink-punk-section {
      margin-top: 0 !important;
    }

    .pink-punk-fullscreen .pink-punk-section__head {
      width: 100% !important;
      max-width: none !important;
      margin-bottom: 0 !important;
    }

    .pink-punk-fullscreen .pink-punk-section__title {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 0 var(--portfolio-block-gap, clamp(2rem, 4vw, 3.5rem)) !important;
      line-height: .9 !important;
      letter-spacing: var(--portfolio-section-title-tracking, .03em) !important;
    }

    .pink-punk-fullscreen .pink-punk-brand__copy,
    .pink-punk-fullscreen .pink-punk-section__note {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      color: rgba(255,255,255,.82) !important;
      font-size: var(--portfolio-copy-size, clamp(1rem, 1.25vw, 1.2rem)) !important;
      font-weight: 500 !important;
      line-height: var(--portfolio-copy-line, 1.45) !important;
      letter-spacing: 0 !important;
      text-align: left !important;
      text-wrap: pretty !important;
    }

    .pink-punk-fullscreen .pink-punk-brand__copy {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    .pink-punk-fullscreen .pink-punk-section__note {
      margin-top: 0 !important;
      margin-bottom: var(--portfolio-block-gap, clamp(2rem, 4vw, 3.5rem)) !important;
    }

    /* DXS has a second local typography system inside MERCH. */
    .m10-modal .m10-dxs-zone,
    .m10-modal .m10-dxs-zone * {
      font-family: var(--portfolio-font, Arial, Helvetica, sans-serif) !important;
    }

    .m10-modal .m10-dxs-zone {
      width: 100% !important;
      max-width: none !important;
    }

    .m10-modal .m10-dxs-zone > .m10-section {
      box-sizing: border-box !important;
      padding-top: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
      padding-bottom: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
    }

    .m10-modal .m10-dxs-zone .m10-section-title,
    .m10-modal .m10-dxs-zone .m10-dxs-materials-title {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: var(--portfolio-block-gap, clamp(2rem, 4vw, 3.5rem)) !important;
      line-height: .9 !important;
      letter-spacing: var(--portfolio-section-title-tracking, .03em) !important;
      text-wrap: balance !important;
    }

    .m10-modal .m10-dxs-zone .m10-project-copy,
    .m10-modal .m10-dxs-zone .m10-section-copy,
    .m10-modal .m10-dxs-zone .m10-copy-update,
    .m10-modal .m10-dxs-zone .m10-dxs-materials-copy {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      font-size: var(--portfolio-copy-size, clamp(1rem, 1.25vw, 1.2rem)) !important;
      font-weight: 500 !important;
      line-height: var(--portfolio-copy-line, 1.45) !important;
      letter-spacing: 0 !important;
      text-align: left !important;
      text-wrap: pretty !important;
    }

    .m10-modal .m10-dxs-zone .m10-dxs-materials-intro {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding-top: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
      padding-bottom: var(--portfolio-section-space, clamp(4rem, 7vw, 7rem)) !important;
    }

    .m10-modal .m10-dxs-zone .m10-dxs-materials-copy {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    @media (max-width: 640px) {
      .pink-punk-fullscreen .pink-punk-brand,
      .pink-punk-fullscreen .pink-punk-section,
      .m10-modal .m10-dxs-zone > .m10-section,
      .m10-modal .m10-dxs-zone .m10-dxs-materials-intro {
        padding-top: clamp(3rem, 12vw, 5rem) !important;
        padding-bottom: clamp(3rem, 12vw, 5rem) !important;
      }
    }
  `;

  document.head.append(style);
})();
