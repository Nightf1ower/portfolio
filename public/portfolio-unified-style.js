(() => {
  if (window.__portfolioUnifiedStyleV1) return;
  window.__portfolioUnifiedStyleV1 = true;

  const style = document.createElement('style');
  style.id = 'portfolio-unified-style-v1';
  style.textContent = `
    :root {
      --portfolio-font: Arial, Helvetica, sans-serif;
      --portfolio-title-tracking: .018em;
      --portfolio-title-line: .92;
      --portfolio-copy-line: 1.45;
      --portfolio-section-space: clamp(4rem, 7vw, 7rem);
      --portfolio-block-gap: clamp(2rem, 4vw, 3.5rem);
    }

    html,
    body,
    button,
    input,
    textarea,
    select,
    #works,
    #works * {
      font-family: var(--portfolio-font) !important;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ),
    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) * {
      font-family: var(--portfolio-font) !important;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) > :where([class$="-inner"], [class*="-inner "]),
    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal
    ) :where(.m10-inner,.stk-inner,.posters-inner,.su-inner,.vtb-inner,.blandetto-inner,.fable-inner,.zny-inner,.pink-punk-inner,.album-covers-inner,.collages-inner,.project9006-inner) {
      width: 100% !important;
      max-width: none !important;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) :where(h1,h2,h3) {
      max-width: none !important;
      width: 100% !important;
      letter-spacing: var(--portfolio-title-tracking) !important;
      line-height: var(--portfolio-title-line) !important;
      text-wrap: balance;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) :where(
      [class*="section-title"],
      [class*="project-title"],
      [class*="block-title"],
      [class*="group-title"],
      section > h2,
      section > h3
    ) {
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: var(--portfolio-block-gap) !important;
      letter-spacing: .025em !important;
      line-height: .9 !important;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) :where(
      [class*="description"],
      [class*="project-copy"],
      [class*="section-copy"],
      [class*="intro-copy"],
      [class*="about-copy"],
      [class*="copy-block"],
      .stk-project-copy,
      .su-copy,
      .vtb-copy,
      .m10-copy
    ) {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      font-size: clamp(1rem, 1.25vw, 1.2rem) !important;
      line-height: var(--portfolio-copy-line) !important;
      letter-spacing: 0 !important;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) section > p:not([class*="label"]):not([class*="count"]):not([class*="subtitle"]):not([class*="hint"]) {
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      font-size: clamp(1rem, 1.25vw, 1.2rem) !important;
      line-height: var(--portfolio-copy-line) !important;
      letter-spacing: 0 !important;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) :where([class$="-inner"],[class*="-inner "]) > :where(section,[class$="-section"],[class*="-section "],[class$="-project"],[class*="-project "]) {
      padding-top: var(--portfolio-section-space) !important;
      padding-bottom: var(--portfolio-section-space) !important;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) :where(section,[class$="-section"],[class*="-section "]) {
      content-visibility: auto;
      contain-intrinsic-size: 1px 900px;
    }

    :where(
      .m10-modal,
      .stk-modal,
      .posters-modal,
      .su-modal,
      .vtb-modal,
      .blandetto-modal,
      .fable-modal,
      .zny-modal,
      .pink-punk-modal,
      .album-covers-modal,
      .collages-modal,
      .project9006-modal,
      [class$="-modal"],
      [class*="-modal "]
    ) :where([class*="group"] + [class*="group"]) {
      margin-top: var(--portfolio-section-space) !important;
    }

    #works h3 {
      letter-spacing: .012em !important;
      line-height: .95 !important;
    }

    @media (max-width: 640px) {
      :root {
        --portfolio-title-tracking: .012em;
        --portfolio-section-space: clamp(3rem, 12vw, 5rem);
      }
    }
  `;

  document.head.append(style);
})();
