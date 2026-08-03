(() => {
  if (window.__blandettoReferenceCenterV2) return;
  window.__blandettoReferenceCenterV2 = true;

  const STYLE_ID = 'blandetto-reference-center-style';
  const VERSION = 'blandetto-reference-center-2';

  function install() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
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

  // The CSS works for BLANDETTO even when its modal is created later.
  // No MutationObserver is needed here; observing added <style> elements caused an infinite loop.
  window.addEventListener('load', install, { once: true });
  install();
})();
