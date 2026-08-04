(() => {
  if (window.__projectSpacingSystemV1) return;
  window.__projectSpacingSystemV1 = true;

  const VERSION = 'project-spacing-system-1';
  const STYLE_ID = 'project-spacing-system-style';
  const ROOTS = [
    '.m10-modal',
    '.stk-modal',
    '.posters-modal',
    '.su-modal',
    '.vtb-modal',
    '.bf',
    '.blandetto-modal',
    '.fable-modal',
    '.zny-modal',
    '.pink-punk-fullscreen',
    '.pink-punk-modal',
    '.album-covers-modal',
    '.collages-modal',
    '.project9006-modal',
    '[class$="-modal"]',
    '[class*="-modal "]',
  ].join(',');

  const SECTION_SELECTOR = [
    '.fable-section',
    '.zny-section',
    '.bf-s',
    '.pink-punk-section',
    '.m10-section',
    '.stk-section',
    '.posters-section',
    '.su-section',
    '.vtb-section',
    '.album-covers-section',
    '.collages-section',
    '.project9006-section',
    '[class$="-section"]',
    '[class*="-section "]',
  ].join(',');

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.dataset.version = VERSION;
      style.textContent = `
        :root {
          --project-layout-gap: clamp(2.75rem, 3.5vw, 3.75rem);
          --project-title-copy-gap: clamp(1rem, 1.25vw, 1.25rem);
          --project-copy-media-gap: clamp(2rem, 2.75vw, 2.75rem);
        }

        /* Brand title -> description stays intact; description -> divider is now compact. */
        :where(${ROOTS}) :where(
          .fable-intro,
          .zny-brand,
          .bf-brand,
          .pink-punk-brand,
          .project9006-brand,
          .m10-project-intro,
          .stk-project-intro,
          .posters-project-intro,
          .su-project-intro,
          .vtb-project-intro,
          .album-covers-project-intro,
          .collages-project-intro,
          [class$="-project-intro"],
          [class*="-project-intro "],
          [class$="-brand-intro"],
          [class*="-brand-intro "]
        ) {
          padding-bottom: var(--project-layout-gap) !important;
        }

        /* Divider -> section title and section content -> next divider use one rhythm. */
        :where(${ROOTS}) :where(${SECTION_SELECTOR}) {
          padding-top: var(--project-layout-gap) !important;
          padding-bottom: var(--project-layout-gap) !important;
        }

        :where(${ROOTS}) :where(${SECTION_SELECTOR}) + :where(${SECTION_SELECTOR}) {
          margin-top: 0 !important;
        }

        /* Title -> description. */
        :where(${ROOTS}) :where(
          .fable-section-head,
          .zny-section-head,
          .bf-head,
          .pink-punk-section__head,
          .project9006-section-head,
          [class$="-section-head"],
          [class*="-section-head "]
        ) {
          margin-bottom: var(--project-title-copy-gap) !important;
        }

        :where(${ROOTS}) :where(
          .fable-section-head,
          .zny-section-head,
          .bf-head,
          .pink-punk-section__head,
          .project9006-section-head,
          [class$="-section-head"],
          [class*="-section-head "]
        ) :where(h1, h2, h3, [class*="title"], .portfolio-unified-title) {
          margin-bottom: 0 !important;
        }

        :where(${ROOTS}) :where(${SECTION_SELECTOR}) > :where(
          h1,
          h2,
          h3,
          [class$="-title"],
          [class*="-title "],
          .portfolio-unified-title
        ) {
          margin-bottom: var(--project-title-copy-gap) !important;
        }

        /* Description -> images. */
        :where(${ROOTS}) :where(
          .portfolio-copy-before-media,
          .fable-section-description,
          .zny-section-copy,
          .bf-note,
          .pink-punk-section__note,
          .project9006-section-copy,
          .m10-section-copy,
          .m10-copy-update,
          .m10-dxs-materials-copy,
          .stk-project-copy,
          .posters-section-copy,
          .su-copy,
          .vtb-print-copy,
          [class$="-section-description"],
          [class*="-section-description "]
        ) {
          margin-top: 0 !important;
          margin-bottom: var(--project-copy-media-gap) !important;
        }

        /* Intro copy uses the parent padding, not an additional oversized margin. */
        :where(${ROOTS}) :where(
          .fable-description,
          .zny-copy,
          .bf-brand-copy,
          .pink-punk-brand__copy,
          .project9006-brand-copy,
          .m10-project-copy,
          .vtb-project-intro__text,
          [class$="-brand-copy"],
          [class*="-brand-copy "],
          [class$="-intro-copy"],
          [class*="-intro-copy "]
        ) {
          margin-bottom: 0 !important;
        }

        @media (max-width: 700px) {
          :root {
            --project-layout-gap: 2.25rem;
            --project-title-copy-gap: 1rem;
            --project-copy-media-gap: 2rem;
          }
        }
      `;
      document.head.append(style);
    }

    if (document.head.lastElementChild !== style) document.head.append(style);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      installStyle();
    });
  }

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  installStyle();
})();
