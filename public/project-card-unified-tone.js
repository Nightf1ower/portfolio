(() => {
  if (window.__projectCardUnifiedToneV12) return;
  window.__projectCardUnifiedToneV12 = true;

  const VERSION = 'project-card-unified-tone-12';
  const STYLE_ID = 'project-card-unified-tone-style';

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

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

      #works h3[data-blandetto-title-rebuilt="${VERSION}"] {
        white-space: nowrap !important;
      }
    `;

    document.head.append(style);
  }

  function findCard(title) {
    return [...document.querySelectorAll('#works .mt-10.grid > article, #works .mt-10.grid > button')]
      .find((card) => normalize(card.querySelector('h3')?.textContent) === title) || null;
  }

  function rebuildBlandettoHeading() {
    const blandettoCard = findCard('BLANDETTO');
    const pinkPunkCard = findCard('PINK PUNK');
    const oldHeading = blandettoCard?.querySelector('h3');
    const pinkHeading = pinkPunkCard?.querySelector('h3');

    if (!blandettoCard || !oldHeading || !pinkHeading) return false;
    if (oldHeading.dataset.blandettoTitleRebuilt === VERSION) return true;

    const newHeading = document.createElement('h3');
    newHeading.className = pinkHeading.className;
    newHeading.textContent = 'BLANDETTO';
    newHeading.dataset.blandettoTitleRebuilt = VERSION;
    newHeading.dataset.projectTitleSystem = VERSION;
    newHeading.setAttribute('aria-label', 'BLANDETTO');

    oldHeading.replaceWith(newHeading);
    return true;
  }

  function applySharedTitleStyle(heading) {
    if (!(heading instanceof HTMLElement)) return;

    const cleanText = heading.textContent?.replace(/\s+/g, ' ').trim();
    if (cleanText && heading.textContent !== cleanText) heading.textContent = cleanText;

    heading.dataset.projectTitleSystem = VERSION;
    heading.removeAttribute('data-project-title-fit');

    const properties = {
      display: 'block',
      'box-sizing': 'border-box',
      width: '100%',
      'max-width': '100%',
      'min-width': '0',
      'min-height': '1.78em',
      margin: '0',
      padding: '0',
      'font-family': '"Arial Black", Arial, Helvetica, sans-serif',
      'font-size': '25px',
      'font-weight': '900',
      'font-style': 'normal',
      'font-stretch': 'normal',
      'font-variation-settings': 'normal',
      'line-height': '.89',
      'letter-spacing': '-.045em',
      'text-transform': 'uppercase',
      'text-align': 'left',
      'white-space': normalize(cleanText) === 'BLANDETTO' ? 'nowrap' : 'normal',
      'word-break': 'keep-all',
      'overflow-wrap': 'normal',
      hyphens: 'none',
      'text-wrap': 'wrap',
      transform: 'none',
      overflow: 'visible',
    };

    Object.entries(properties).forEach(([name, value]) => {
      heading.style.setProperty(name, value, 'important');
    });
  }

  function applyTitleSystem() {
    rebuildBlandettoHeading();
    document.querySelectorAll('#works .mt-10.grid h3').forEach(applySharedTitleStyle);
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
