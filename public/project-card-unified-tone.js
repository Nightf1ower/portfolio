(() => {
  if (window.__projectCardUnifiedToneV9) return;
  window.__projectCardUnifiedToneV9 = true;

  const VERSION = 'project-card-unified-tone-9';
  const STYLE_ID = 'project-card-unified-tone-style';

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const TITLE_CONFIG = {
    BLANDETTO: {
      text: 'BLANDETTO',
      max: 31,
      min: 17,
      whiteSpace: 'nowrap',
      lineHeight: '0.92',
      letterSpacing: '-0.055em',
    },
    'ANKA PERESILD': {
      text: 'ANKA\nPERESILD',
      max: 37,
      min: 22,
      whiteSpace: 'pre-line',
      lineHeight: '0.88',
      letterSpacing: '-0.06em',
    },
    STICKERS: {
      text: 'STICKERS',
      max: 34,
      min: 18,
      whiteSpace: 'nowrap',
      lineHeight: '0.92',
      letterSpacing: '-0.055em',
    },
  };

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

      #works h3[data-project-title-fit="${VERSION}"] {
        display: block !important;
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        font-style: normal !important;
        font-stretch: normal !important;
        font-variation-settings: normal !important;
        word-break: normal !important;
        overflow-wrap: normal !important;
        transform: none !important;
        overflow: visible !important;
      }
    `;
    document.head.append(style);
  }

  function fitHeading(heading, config) {
    if (!(heading instanceof HTMLElement) || !heading.isConnected) return;

    if (heading.textContent !== config.text) heading.textContent = config.text;
    heading.dataset.projectTitleFit = VERSION;

    heading.style.setProperty('width', '100%', 'important');
    heading.style.setProperty('max-width', '100%', 'important');
    heading.style.setProperty('min-width', '0', 'important');
    heading.style.setProperty('white-space', config.whiteSpace, 'important');
    heading.style.setProperty('line-height', config.lineHeight, 'important');
    heading.style.setProperty('letter-spacing', config.letterSpacing, 'important');
    heading.style.setProperty('word-break', 'normal', 'important');
    heading.style.setProperty('overflow-wrap', 'normal', 'important');
    heading.style.setProperty('transform', 'none', 'important');
    heading.style.setProperty('margin', '0', 'important');

    let size = config.max;
    heading.style.setProperty('font-size', `${size}px`, 'important');

    const available = heading.clientWidth;
    if (available <= 0) return;

    while (heading.scrollWidth > available + 1 && size > config.min) {
      size -= 1;
      heading.style.setProperty('font-size', `${size}px`, 'important');
    }
  }

  function applyTitleFits() {
    const headings = document.querySelectorAll('#works .mt-10.grid h3');
    headings.forEach((heading) => {
      const key = normalize(heading.textContent);
      const config = TITLE_CONFIG[key];
      if (config) fitHeading(heading, config);
    });
  }

  installStyles();

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(applyTitleFits);
  };

  const works = document.getElementById('works');
  if (works) {
    new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length || mutation.removedNodes.length)) {
        schedule();
      }
    }).observe(works, { childList: true, subtree: true });
  }

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule);
  window.addEventListener('load', schedule);
  document.fonts?.ready?.then(schedule).catch(() => {});
  [0, 100, 300, 800, 1600].forEach((delay) => setTimeout(schedule, delay));
  schedule();
})();
