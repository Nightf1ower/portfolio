(() => {
  if (window.__blandettoTitleFinalReset) return;
  window.__blandettoTitleFinalReset = true;

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function findBlandettoCard() {
    return document.querySelector('#works [data-project-layout-v5-key="BLANDETTO"]')
      || [...document.querySelectorAll('#works article, #works button')]
        .find((card) => normalize(card.querySelector('h3')?.textContent) === 'BLANDETTO')
      || null;
  }

  function setImportant(element, property, value) {
    element.style.setProperty(property, value, 'important');
  }

  function apply() {
    const card = findBlandettoCard();
    const oldHeading = card?.querySelector('h3');
    if (!card || !oldHeading || !oldHeading.parentElement) return false;

    const parent = oldHeading.parentElement;
    let visibleHeading = parent.querySelector(':scope > [data-blandetto-visible-title="final"]');

    if (!visibleHeading) {
      visibleHeading = document.createElement('div');
      visibleHeading.dataset.blandettoVisibleTitle = 'final';
      visibleHeading.textContent = 'BLANDETTO';
      visibleHeading.setAttribute('role', 'heading');
      visibleHeading.setAttribute('aria-level', '3');
      parent.insertBefore(visibleHeading, oldHeading);
    }

    visibleHeading.textContent = 'BLANDETTO';
    setImportant(visibleHeading, 'display', 'block');
    setImportant(visibleHeading, 'box-sizing', 'border-box');
    setImportant(visibleHeading, 'width', '100%');
    setImportant(visibleHeading, 'max-width', '100%');
    setImportant(visibleHeading, 'min-width', '0');
    setImportant(visibleHeading, 'margin', '0');
    setImportant(visibleHeading, 'padding', '0');
    setImportant(visibleHeading, 'font-family', '"Arial Black", Arial, Helvetica, sans-serif');
    setImportant(visibleHeading, 'font-size', '25px');
    setImportant(visibleHeading, 'font-weight', '900');
    setImportant(visibleHeading, 'font-style', 'normal');
    setImportant(visibleHeading, 'font-stretch', 'normal');
    setImportant(visibleHeading, 'font-variation-settings', 'normal');
    setImportant(visibleHeading, 'line-height', '.89');
    setImportant(visibleHeading, 'letter-spacing', '-.045em');
    setImportant(visibleHeading, 'text-transform', 'uppercase');
    setImportant(visibleHeading, 'text-align', 'left');
    setImportant(visibleHeading, 'white-space', 'nowrap');
    setImportant(visibleHeading, 'word-break', 'normal');
    setImportant(visibleHeading, 'overflow-wrap', 'normal');
    setImportant(visibleHeading, 'transform', 'none');
    setImportant(visibleHeading, 'overflow', 'visible');
    setImportant(visibleHeading, 'opacity', '1');
    setImportant(visibleHeading, 'visibility', 'visible');
    setImportant(visibleHeading, 'color', 'inherit');

    oldHeading.setAttribute('aria-hidden', 'true');
    oldHeading.dataset.blandettoOriginalTitle = 'hidden';
    setImportant(oldHeading, 'position', 'absolute');
    setImportant(oldHeading, 'width', '1px');
    setImportant(oldHeading, 'height', '1px');
    setImportant(oldHeading, 'margin', '-1px');
    setImportant(oldHeading, 'padding', '0');
    setImportant(oldHeading, 'border', '0');
    setImportant(oldHeading, 'opacity', '0');
    setImportant(oldHeading, 'visibility', 'hidden');
    setImportant(oldHeading, 'pointer-events', 'none');
    setImportant(oldHeading, 'clip-path', 'inset(100%)');

    return true;
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  };

  const startObserver = () => {
    const works = document.getElementById('works');
    if (!works) return false;
    new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length || mutation.removedNodes.length)) {
        schedule();
      }
    }).observe(works, { childList: true, subtree: true });
    return true;
  };

  if (!startObserver()) {
    const bodyObserver = new MutationObserver(() => {
      if (startObserver()) {
        bodyObserver.disconnect();
        schedule();
      }
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  [0, 100, 300, 800, 1600, 3000].forEach((delay) => setTimeout(schedule, delay));
  schedule();
})();
