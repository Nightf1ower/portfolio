(() => {
  if (window.__projectCardUnifiedToneV4) return;
  window.__projectCardUnifiedToneV4 = true;

  const VERSION = 'project-card-unified-tone-4';
  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/\|/g, '')
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const style = document.createElement('style');
  style.id = 'project-card-unified-tone-style';
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

    #works .mt-10.grid h3,
    #works .mt-10.grid h3 * {
      font-family: "Arial Black", Arial, Helvetica, sans-serif !important;
      font-weight: 900 !important;
      font-style: normal !important;
      font-stretch: 100% !important;
      font-variation-settings: "wght" 900 !important;
      font-feature-settings: normal !important;
      font-synthesis: none !important;
      line-height: .88 !important;
      letter-spacing: -.065em !important;
      text-transform: uppercase !important;
      transform: none !important;
    }

    /* BLANDETTO is visually too tall: compress only its vertical proportions. */
    #works [data-project-layout-v5-key="BLANDETTO"] h3,
    #works [data-project-layout-key="BLANDETTO"] h3,
    #works [data-project-card-title="BLANDETTO"] h3,
    #works h3[data-unified-brand-heading="${VERSION}"] {
      display: block !important;
      transform: scaleY(.78) !important;
      transform-origin: left bottom !important;
      line-height: .78 !important;
      margin-top: -.08em !important;
      margin-bottom: -.12em !important;
    }
  `;
  document.getElementById('project-card-unified-tone-style')?.remove();
  document.head.append(style);

  function findCard(title) {
    const accepted = normalize(title);
    return [...document.querySelectorAll('#works .mt-10.grid > article, #works .mt-10.grid > button')]
      .find((card) => normalize(card.querySelector('h3')?.textContent) === accepted) || null;
  }

  function markBlandettoHeading() {
    const card = findCard('BLANDETTO');
    const heading = card?.querySelector('h3');
    if (!card || !heading) return false;

    card.dataset.projectCardTitle = 'BLANDETTO';
    heading.dataset.unifiedBrandHeading = VERSION;
    heading.style.setProperty('transform', 'scaleY(.78)', 'important');
    heading.style.setProperty('transform-origin', 'left bottom', 'important');
    heading.style.setProperty('line-height', '.78', 'important');
    heading.style.setProperty('margin-top', '-.08em', 'important');
    heading.style.setProperty('margin-bottom', '-.12em', 'important');
    return true;
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      markBlandettoHeading();
    });
  }

  const works = document.getElementById('works');
  if (works) {
    new MutationObserver(schedule).observe(works, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  window.addEventListener('load', schedule);
  [0, 80, 240, 700, 1400].forEach((delay) => setTimeout(schedule, delay));
})();
