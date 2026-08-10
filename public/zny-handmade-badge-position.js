(() => {
  if (window.__znyHandmadeBadgePositionV2) return;
  window.__znyHandmadeBadgePositionV2 = true;

  const DATE_RE = /24\s*[\/-]\s*25/i;
  let frame = 0;
  let resizeTimer = 0;

  function getDateRange(heading) {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.parentElement?.closest('.portfolio-handmade-badge')) return NodeFilter.FILTER_REJECT;
        return DATE_RE.test(node.data || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });

    const node = walker.nextNode();
    if (!node) return null;
    const match = (node.data || '').match(DATE_RE);
    if (!match || match.index == null) return null;

    const range = document.createRange();
    range.setStart(node, match.index);
    range.setEnd(node, match.index + match[0].length);
    return range;
  }

  function placeBadge() {
    frame = 0;
    const modal = document.querySelector('.zny-modal');
    if (!modal) return;

    const heading = [...modal.querySelectorAll('.zny-title,h1,h2,h3,h4')].find((node) => DATE_RE.test(node.textContent || ''));
    if (!heading) return;

    const badge = heading.querySelector(':scope > .portfolio-handmade-badge--zny')
      || heading.querySelector('.portfolio-handmade-badge--zny');
    if (!badge) return;

    const range = getDateRange(heading);
    if (!range) return;

    const headingRect = heading.getBoundingClientRect();
    const dateRect = range.getBoundingClientRect();
    const badgeWidth = badge.offsetWidth;
    const badgeHeight = badge.offsetHeight;
    if (!headingRect.width || !dateRect.width || !badgeWidth || !badgeHeight) return;

    // Keep the sticker attached to the FW 24/25 line and center it over the
    // final part of 24/25 instead of positioning it from the whole title edge.
    const targetCenterX = dateRect.right - headingRect.left - (dateRect.width * 0.18);
    const left = targetCenterX - (badgeWidth * 0.5);
    const top = dateRect.top - headingRect.top - (badgeHeight * 0.42);

    badge.style.setProperty('left', `${left}px`, 'important');
    badge.style.setProperty('right', 'auto', 'important');
    badge.style.setProperty('top', `${top}px`, 'important');
    badge.style.setProperty('z-index', '160', 'important');
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(placeBadge);
  }

  function runPasses() {
    [0, 60, 160, 320, 650, 1100].forEach((delay) => window.setTimeout(schedule, delay));
  }

  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => [...mutation.addedNodes].some((node) => (
      node instanceof Element
      && (node.matches('.zny-modal,.portfolio-handmade-badge--zny')
        || node.querySelector?.('.zny-modal,.portfolio-handmade-badge--zny'))
    )));
    if (relevant) runPasses();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const cardTitle = target.closest('#works article,#works button')?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (cardTitle === 'ZNY' || target.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) {
      runPasses();
    }
  }, true);

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(runPasses, 80);
  }, { passive: true });

  window.addEventListener('load', runPasses, { once: true });
  runPasses();
})();
