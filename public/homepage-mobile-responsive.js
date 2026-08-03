(() => {
  if (window.__homepageMobileResponsiveV2) return;
  window.__homepageMobileResponsiveV2 = true;

  const VERSION = 'homepage-mobile-responsive-2';
  const MAX_WIDTH = 820;
  const STYLE_ID = 'homepage-mobile-responsive-style';
  const FIT_ATTR = 'homepageMobileFit';
  const PROBE_ID = 'homepage-mobile-responsive-probe';

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      @media (max-width: ${MAX_WIDTH}px) {
        :root {
          --nf-mobile-gutter: max(1rem, env(safe-area-inset-left));
          --nf-mobile-gutter-right: max(1rem, env(safe-area-inset-right));
        }

        html,
        body,
        #root {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          overflow-x: clip !important;
        }

        #works {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          padding-left: var(--nf-mobile-gutter) !important;
          padding-right: var(--nf-mobile-gutter-right) !important;
          overflow-x: clip !important;
        }

        #works > div {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        #works > div > .grid:first-child,
        #works > div > div:first-child {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          grid-template-columns: minmax(0, 1fr) !important;
        }

        #works > div > div:first-child > p {
          max-width: 100% !important;
        }

        #works > div > div:first-child > h2 {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          font-size: clamp(2.15rem, 10.6vw, 4.15rem) !important;
          line-height: .86 !important;
          letter-spacing: -.065em !important;
          white-space: normal !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          hyphens: none !important;
          text-wrap: balance !important;
        }

        #works .mt-10.grid {
          box-sizing: border-box !important;
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin-left: auto !important;
          margin-right: auto !important;
          gap: clamp(1.1rem, 4.5vw, 1.5rem) !important;
          overflow: visible !important;
        }

        #works .mt-10.grid > article,
        #works .mt-10.grid > button,
        #works [data-project-layout-v5-size="large"],
        #works [data-project-layout-v5-size="small"] {
          box-sizing: border-box !important;
          grid-column: 1 / -1 !important;
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin-left: auto !important;
          margin-right: auto !important;
          padding: clamp(.75rem, 3.5vw, 1rem) !important;
          overflow: hidden !important;
          transform: none !important;
        }

        #works .mt-10.grid > article:hover,
        #works .mt-10.grid > button:hover {
          transform: none !important;
        }

        #works .mt-10.grid > article > div,
        #works .mt-10.grid > button > div {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          padding: clamp(.85rem, 3.8vw, 1.15rem) !important;
          overflow: hidden !important;
        }

        #works .my-10.flex.flex-1,
        #works .my-10 {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          justify-content: center !important;
        }

        #works .project-card-preview-v5,
        #works .project-card-placeholder-v5,
        #works .my-10.flex.flex-1 > div,
        #works .my-10 > div {
          box-sizing: border-box !important;
          width: min(58vw, 14.5rem) !important;
          max-width: 82% !important;
          margin-left: auto !important;
          margin-right: auto !important;
          transform: none !important;
          transform-origin: center !important;
        }

        #works .group:hover .project-card-preview-v5,
        #works .group:hover .project-card-placeholder-v5,
        #works .group:hover .my-10 > div {
          transform: none !important;
        }

        #works .mt-10.grid h3 {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin-right: 0 !important;
          padding-right: 0 !important;
          font-size: clamp(2rem, 9.2vw, 3.35rem) !important;
          line-height: .88 !important;
          letter-spacing: -.055em !important;
          white-space: normal !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          hyphens: none !important;
          text-wrap: balance !important;
        }

        #works .mt-10.grid h3 + p,
        #works .mt-10.grid h3 ~ div {
          box-sizing: border-box !important;
          max-width: 100% !important;
        }

        #works .mt-10.grid h3 ~ div {
          justify-content: flex-start !important;
        }
      }
    `;
    document.head.append(style);
  }

  function getProbe() {
    let probe = document.getElementById(PROBE_ID);
    if (probe) return probe;
    probe = document.createElement('span');
    probe.id = PROBE_ID;
    probe.setAttribute('aria-hidden', 'true');
    Object.assign(probe.style, {
      position: 'fixed',
      left: '-100000px',
      top: '0',
      visibility: 'hidden',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      contain: 'layout style paint',
    });
    document.body.append(probe);
    return probe;
  }

  function clearFit(element) {
    if (!(element instanceof HTMLElement)) return;
    if (element.dataset[FIT_ATTR] !== VERSION) return;
    element.style.removeProperty('font-size');
    element.style.removeProperty('overflow-wrap');
    element.style.removeProperty('word-break');
    delete element.dataset[FIT_ATTR];
  }

  function measureWidestWord(element) {
    const text = element.textContent?.replace(/\s+/g, ' ').trim() || '';
    if (!text) return 0;

    const computed = getComputedStyle(element);
    const probe = getProbe();
    probe.style.fontFamily = computed.fontFamily;
    probe.style.fontWeight = computed.fontWeight;
    probe.style.fontStyle = computed.fontStyle;
    probe.style.fontStretch = computed.fontStretch;
    probe.style.fontSize = computed.fontSize;
    probe.style.letterSpacing = computed.letterSpacing;
    probe.style.textTransform = computed.textTransform;

    let widest = 0;
    text.split(/\s+/).forEach((word) => {
      probe.textContent = word;
      widest = Math.max(widest, probe.getBoundingClientRect().width);
    });
    probe.textContent = '';
    return widest;
  }

  function fitHeading(element, minimumSize) {
    if (!(element instanceof HTMLElement) || !element.isConnected) return;
    clearFit(element);

    const available = element.clientWidth;
    let size = parseFloat(getComputedStyle(element).fontSize || '0');
    if (!Number.isFinite(size) || available < 120) return;

    element.dataset[FIT_ATTR] = VERSION;
    element.style.setProperty('font-size', `${size}px`, 'important');

    let guard = 0;
    while (measureWidestWord(element) > available - 2 && size > minimumSize && guard < 100) {
      size -= 1;
      element.style.setProperty('font-size', `${size}px`, 'important');
      guard += 1;
    }

    if (measureWidestWord(element) > available - 2) {
      element.style.setProperty('overflow-wrap', 'anywhere', 'important');
      element.style.setProperty('word-break', 'normal', 'important');
    }
  }

  function apply() {
    installStyles();
    const works = document.getElementById('works');
    if (!works) return;

    const mainHeading = works.querySelector(':scope > div > div:first-child h2');
    const cardHeadings = works.querySelectorAll('.mt-10.grid h3');

    if (window.innerWidth > MAX_WIDTH) {
      if (mainHeading) clearFit(mainHeading);
      cardHeadings.forEach(clearFit);
      return;
    }

    if (mainHeading) fitHeading(mainHeading, 29);
    cardHeadings.forEach((heading) => fitHeading(heading, 27));
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  function observeWorks() {
    const works = document.getElementById('works');
    if (!works || works.dataset.homepageMobileObserved === VERSION) return false;
    works.dataset.homepageMobileObserved = VERSION;

    new MutationObserver(() => schedule()).observe(works, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return true;
  }

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    const ready = observeWorks();
    schedule();
    if (ready || attempts >= 40) window.clearInterval(retry);
  }, 120);

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule);
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', () => {
    observeWorks();
    schedule();
  }, { once: true });
  document.fonts?.ready?.then(schedule).catch(() => {});

  installStyles();
  schedule();
})();
