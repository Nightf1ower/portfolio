(() => {
  if (window.__carnivalRecordsSpacingFixV1) return;
  window.__carnivalRecordsSpacingFixV1 = true;

  const STYLE_ID = 'carnival-records-spacing-fix-style';

  const install = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .cr-modal .cr-head {
        margin-bottom: clamp(1.5rem, 2.4vw, 2.35rem) !important;
        border: 0 !important;
        border-bottom: 0 !important;
        border-color: transparent !important;
        box-shadow: none !important;
        outline: 0 !important;
      }

      .cr-modal .cr-head::before,
      .cr-modal .cr-head::after {
        content: none !important;
        display: none !important;
      }

      .cr-modal .cr-hero {
        margin-bottom: clamp(1.75rem, 2.8vw, 2.75rem) !important;
        padding-bottom: 0 !important;
      }

      .cr-modal .cr-section {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        padding-top: clamp(1.35rem, 1.9vw, 1.85rem) !important;
        padding-bottom: clamp(1.75rem, 2.4vw, 2.4rem) !important;
      }

      .cr-modal .cr-section + .cr-section {
        margin-top: 0 !important;
      }

      .cr-modal .cr-h {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }

      .cr-modal .cr-description {
        margin: clamp(.65rem, 1vw, .95rem) 0 clamp(.85rem, 1.35vw, 1.2rem) !important;
      }

      .cr-modal .cr-section > .cr-description + * {
        margin-top: 0 !important;
      }

      .cr-modal .cr-subgroup + .cr-subgroup,
      .cr-modal .cr-section-album-curated .cr-subgroup + .cr-subgroup {
        margin-top: clamp(1.75rem, 2.8vw, 2.75rem) !important;
      }

      @media (max-width: 700px) {
        .cr-modal .cr-head { margin-bottom: 1.35rem !important; }
        .cr-modal .cr-hero { margin-bottom: 1.75rem !important; }
        .cr-modal .cr-section {
          padding-top: 1.25rem !important;
          padding-bottom: 1.75rem !important;
        }
        .cr-modal .cr-description {
          margin-top: .65rem !important;
          margin-bottom: .9rem !important;
        }
      }
    `;
    document.head.append(style);
  };

  install();
  new MutationObserver(install).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  window.addEventListener('load', install);
})();