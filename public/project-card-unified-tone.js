(() => {
  if (window.__projectCardUnifiedToneV11) return;
  window.__projectCardUnifiedToneV11 = true;

  const VERSION = 'project-card-unified-tone-11';
  const STYLE_ID = 'project-card-unified-tone-style';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      #works .mt-10.grid > article,
      #works .mt-10.grid > button {
        background-color: #dcdcd9 !important;
        background-image: none !important;
      }

      #works .mt-10.grid > article:hover,
      #works .mt-10.grid > button:hover {
        background-color: #dcdcd9 !important;
        background-image: none !important;
      }

      #works .mt-10.grid > article > div,
      #works .mt-10.grid > button > div {
        background-color: #e9e9e6 !important;
        background-image: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }

      #works .mt-10.grid h3[data-project-title-system="${VERSION}"] {
        display: block !important;
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        min-height: 1.78em !important;
        margin: 0 !important;
        padding: 0 !important;
        font-family: "Arial Black", Arial, Helvetica, sans-serif !important;
        font-size: 25px !important;
        font-weight: 900 !important;
        font-style: normal !important;
        font-stretch: normal !important;
        font-variation-settings: normal !important;
        line-height: .89 !important;
        letter-spacing: -.045em !important;
        text-transform: uppercase !important;
        text-align: left !important;
        white-space: normal !important;
        word-break: keep-all !important;
        overflow-wrap: normal !important;
        hyphens: none !important;
        text-wrap: wrap !important;
        transform: none !important;
        overflow: visible !important;
      }

      @media (max-width: 820px) {
        #works .mt-10.grid h3[data-project-title-system="${VERSION}"] {
          font-size: 25px !important;
          line-height: .89 !important;
          letter-spacing: -.045em !important;
        }
      }
    `;

    document.head.append(style);
  }

  function applyTitleSystem() {
    document.querySelectorAll('#works .mt-10.grid h3').forEach((heading) => {
      if (!(heading instanceof HTMLElement)) return;

      const cleanText = heading.textContent
        ?.replace(/\s+/g, ' ')
        .trim();

      if (cleanText && heading.textContent !== cleanText) {
        heading.textContent = cleanText;
      }

      heading.dataset.projectTitleSystem = VERSION;
      heading.removeAttribute('data-project-title-fit');

      heading.style.setProperty('display', 'block', 'important');
      heading.style.setProperty('box-sizing', 'border-box', 'important');
      heading.style.setProperty('width', '100%', 'important');
      heading.style.setProperty('max-width', '100%', 'important');
      heading.style.setProperty('min-width', '0', 'important');
      heading.style.setProperty('min-height', '1.78em', 'important');
      heading.style.setProperty('margin', '0', 'important');
      heading.style.setProperty('padding', '0', 'important');
      heading.style.setProperty('font-family', '"Arial Black", Arial, Helvetica, sans-serif', 'important');
      heading.style.setProperty('font-size', '25px', 'important');
      heading.style.setProperty('font-weight', '900', 'important');
      heading.style.setProperty('font-style', 'normal', 'important');
      heading.style.setProperty('font-stretch', 'normal', 'important');
      heading.style.setProperty('font-variation-settings', 'normal', 'important');
      heading.style.setProperty('line-height', '.89', 'important');
      heading.style.setProperty('letter-spacing', '-.045em', 'important');
      heading.style.setProperty('text-transform', 'uppercase', 'important');
      heading.style.setProperty('text-align', 'left', 'important');
      heading.style.setProperty('white-space', 'normal', 'important');
      heading.style.setProperty('word-break', 'keep-all', 'important');
      heading.style.setProperty('overflow-wrap', 'normal', 'important');
      heading.style.setProperty('hyphens', 'none', 'important');
      heading.style.setProperty('text-wrap', 'wrap', 'important');
      heading.style.setProperty('transform', 'none', 'important');
      heading.style.setProperty('overflow', 'visible', 'important');
    });
  }

  installStyles();

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(applyTitleSystem);
  };

  const works = document.getElementById('works');
  if (works) {
    new MutationObserver((mutations) => {
      if (mutations.some((mutation) =>
        mutation.type === 'characterData'
        || mutation.addedNodes.length
        || mutation.removedNodes.length
      )) schedule();
    }).observe(works, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule);
  window.addEventListener('load', schedule);
  document.fonts?.ready?.then(schedule).catch(() => {});
  [0, 100, 300, 800, 1600].forEach((delay) => setTimeout(schedule, delay));
  schedule();
})();
