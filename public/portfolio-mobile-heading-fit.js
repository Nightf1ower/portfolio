(() => {
  if (window.__portfolioMobileHeadingFitV1) return;
  window.__portfolioMobileHeadingFitV1 = true;

  const VERSION = 'portfolio-mobile-heading-fit-1';
  const MAX_MOBILE_WIDTH = 820;
  const MIN_FONT_SIZE = 27;
  const FIT_MARK = 'portfolioMobileHeadingFit';

  const ROOT_SELECTOR = [
    '.m10-modal',
    '.stk-modal',
    '.posters-modal',
    '.su-modal',
    '.vtb-modal',
    '.bf',
    '.project9006-modal',
    '.pink-punk-fullscreen',
    '.fable-modal',
    '.zny-modal',
    '.album-covers-modal',
    '.collages-modal',
    '.project9006-modal',
    '[class$="-modal"]',
    '[class*="-modal "]',
    '.fixed.inset-0',
  ].join(',');

  const HEADING_SELECTOR = [
    'h1',
    'h2',
    'h3',
    '.portfolio-unified-title',
    '.m10-title',
    '.m10-dxs-title',
    '.m10-section-title',
    '.m10-dxs-materials-title',
    '.pink-punk-brand__title',
    '.pink-punk-section__title',
    '.bf-brand-title',
    '.bf-t',
    '.project9006-brand-title',
    '.project9006-section-title',
    '.stk-project-title',
    '.posters-title',
    '.su-h',
    '.vtb-title',
  ].join(',');

  function installStyles() {
    document.getElementById('portfolio-mobile-heading-fit-style')?.remove();
    const style = document.createElement('style');
    style.id = 'portfolio-mobile-heading-fit-style';
    style.dataset.version = VERSION;
    style.textContent = `
      @media (max-width: ${MAX_MOBILE_WIDTH}px) {
        :where(${ROOT_SELECTOR}) {
          max-width: 100vw !important;
          overflow-x: clip !important;
        }

        :where(${ROOT_SELECTOR}) :where(${HEADING_SELECTOR}) {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          white-space: normal !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          hyphens: none !important;
          text-wrap: balance;
          line-height: .9 !important;
          letter-spacing: .018em !important;
        }
      }
    `;
    document.head.append(style);
  }

  function resetHeading(heading) {
    if (!(heading instanceof HTMLElement) || !heading.dataset[FIT_MARK]) return;
    heading.style.removeProperty('font-size');
    heading.style.removeProperty('line-height');
    heading.style.removeProperty('letter-spacing');
    heading.style.removeProperty('overflow-wrap');
    heading.style.removeProperty('word-break');
    delete heading.dataset[FIT_MARK];
    delete heading.dataset.portfolioOriginalFontSize;
  }

  function getAvailableWidth(heading) {
    const parent = heading.parentElement;
    if (!parent) return Math.max(0, window.innerWidth - 32);

    const parentStyle = getComputedStyle(parent);
    const padding = parseFloat(parentStyle.paddingLeft || '0') + parseFloat(parentStyle.paddingRight || '0');
    return Math.max(0, Math.min(parent.clientWidth - padding, window.innerWidth - 24));
  }

  function isOverflowing(heading, availableWidth) {
    const rect = heading.getBoundingClientRect();
    return (
      heading.scrollWidth > Math.ceil(availableWidth + 1) ||
      rect.right > window.innerWidth - 8 ||
      rect.left < 8
    );
  }

  function fitHeading(heading) {
    if (!(heading instanceof HTMLElement)) return;
    if (!heading.isConnected || heading.closest('[class*="lightbox"], [class*="lightbox"], .m10-light, .m10-layout-light')) return;

    const text = heading.textContent?.replace(/\s+/g, ' ').trim() || '';
    if (!text) return;

    const computed = getComputedStyle(heading);
    const initialSize = parseFloat(computed.fontSize || '0');
    if (!Number.isFinite(initialSize) || initialSize < 32) return;

    const availableWidth = getAvailableWidth(heading);
    if (availableWidth < 120) return;

    heading.style.setProperty('width', '100%', 'important');
    heading.style.setProperty('max-width', '100%', 'important');
    heading.style.setProperty('min-width', '0', 'important');
    heading.style.setProperty('white-space', 'normal', 'important');
    heading.style.setProperty('word-break', 'normal', 'important');
    heading.style.setProperty('overflow-wrap', 'normal', 'important');
    heading.style.setProperty('line-height', '.9', 'important');
    heading.style.setProperty('letter-spacing', '.018em', 'important');

    const originalSize = Number(heading.dataset.portfolioOriginalFontSize) || initialSize;
    heading.dataset.portfolioOriginalFontSize = String(originalSize);
    heading.dataset[FIT_MARK] = VERSION;
    heading.style.setProperty('font-size', `${originalSize}px`, 'important');

    let currentSize = originalSize;
    let guard = 0;
    while (isOverflowing(heading, availableWidth) && currentSize > MIN_FONT_SIZE && guard < 120) {
      currentSize -= 1;
      heading.style.setProperty('font-size', `${currentSize}px`, 'important');
      guard += 1;
    }

    if (isOverflowing(heading, availableWidth)) {
      heading.style.setProperty('overflow-wrap', 'anywhere', 'important');
      heading.style.setProperty('word-break', 'normal', 'important');
    }
  }

  function collectHeadings() {
    const headings = new Set();
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (!(root instanceof Element)) return;
      if (root.matches(HEADING_SELECTOR)) headings.add(root);
      root.querySelectorAll(HEADING_SELECTOR).forEach((heading) => headings.add(heading));
    });
    return [...headings];
  }

  function apply() {
    installStyles();
    const mobile = window.innerWidth <= MAX_MOBILE_WIDTH;
    const headings = collectHeadings();

    if (!mobile) {
      headings.forEach(resetHeading);
      return;
    }

    headings.forEach((heading) => {
      if (heading.dataset[FIT_MARK]) {
        heading.style.removeProperty('font-size');
        heading.style.removeProperty('overflow-wrap');
        delete heading.dataset[FIT_MARK];
      }
      fitHeading(heading);
    });
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

  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => (
      mutation.type === 'characterData' ||
      [...mutation.addedNodes].some((node) => node instanceof Element)
    ));
    if (relevant) schedule();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.documentElement);
  }

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('load', schedule);
  document.fonts?.ready?.then(schedule).catch(() => {});

  installStyles();
  schedule();
})();
