(() => {
  if (window.__blandettoReferenceCenterV1) return;
  window.__blandettoReferenceCenterV1 = true;

  const STYLE_ID = 'blandetto-reference-center-style';

  function install() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .bf .bf-ref {
        text-align: center !important;
      }

      .bf .bf-ref > div {
        box-sizing: border-box !important;
        display: flex !important;
        width: 100% !important;
        max-width: none !important;
        align-items: center !important;
        justify-content: center !important;
        margin: 0 auto !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        text-align: center !important;
      }

      .bf .bf-ref [data-bf-reference] {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 auto !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        text-align: center !important;
        text-indent: 0 !important;
        transform: none !important;
      }

      @media (max-width: 820px) {
        .bf .bf-ref > div {
          padding-top: 1rem !important;
        }

        .bf .bf-ref [data-bf-reference] {
          font-size: clamp(.58rem, 2.7vw, .72rem) !important;
          letter-spacing: .24em !important;
          line-height: 1.35 !important;
          white-space: normal !important;
        }
      }
    `;

    document.head.append(style);
  }

  new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) =>
      [...mutation.addedNodes].some((node) =>
        node instanceof Element && (node.matches?.('.bf, style') || node.querySelector?.('.bf'))
      )
    );
    if (relevant) install();
  }).observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('load', install);
  install();
})();
