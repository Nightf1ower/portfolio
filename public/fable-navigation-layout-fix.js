(() => {
  if (window.__fableNavigationLayoutFixV2) return;
  window.__fableNavigationLayoutFixV2 = true;

  const STYLE_ID = 'fable-navigation-layout-fix-style';

  document.querySelectorAll('.fable-scroll-top').forEach((button) => button.remove());
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .fable-section-head {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      padding-right: 5.5rem !important;
    }

    .fable-title {
      display: block !important;
      width: 100% !important;
      max-width: none !important;
      font-size: clamp(2.65rem, 5.35vw, 5.85rem) !important;
      line-height: .88 !important;
      letter-spacing: -.06em !important;
      white-space: nowrap !important;
      overflow-wrap: normal !important;
      word-break: normal !important;
    }

    .fable-count {
      position: absolute !important;
      top: .55rem !important;
      right: 0 !important;
      margin: 0 !important;
    }

    @media (max-width: 760px) {
      .fable-section-head {
        padding-right: 0 !important;
      }

      .fable-title {
        font-size: clamp(2.45rem, 8.8vw, 4.5rem) !important;
        line-height: .9 !important;
        white-space: normal !important;
        text-wrap: balance;
      }

      .fable-count {
        position: static !important;
        margin-top: .75rem !important;
      }
    }
  `;

  document.head.append(style);
})();