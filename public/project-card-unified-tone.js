(() => {
  if (window.__projectCardUnifiedToneV3) return;
  window.__projectCardUnifiedToneV3 = true;

  const VERSION = 'project-card-unified-tone-3';
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

    /* One explicit face for every project title — no browser fallback differences. */
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
  `;
  document.getElementById('project-card-unified-tone-style')?.remove();
  document.head.append(style);

  function findCard(title) {
    const accepted = normalize(title);
    return [...document.querySelectorAll('#works .mt-10.grid > article, #works .mt-10.grid > button')]
      .find((card) => normalize(card.querySelector('h3')?.textContent) === accepted) || null;
  }

  function rebuildBlandettoHeading() {
    const blandettoCard = findCard('BLANDETTO');
    const referenceCard = findCard('PINK PUNK') || findCard('ZNY') || findCard('FABLE');
    const current = blandettoCard?.querySelector('h3');
    const reference = referenceCard?.querySelector('h3');
    if (!current || !reference) return false;

    const referenceClass = reference.className;
    const alreadyClean = current.dataset.unifiedBrandHeading === VERSION
      && current.className === referenceClass
      && current.childNodes.length === 1
      && current.textContent === 'BLANDETTO';
    if (alreadyClean) return true;

    const heading = reference.cloneNode(false);
    heading.textContent = 'BLANDETTO';
    heading.className = referenceClass;
    heading.removeAttribute('style');
    heading.dataset.unifiedBrandHeading = VERSION;
    current.replaceWith(heading);
    return true;
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      rebuildBlandettoHeading();
    });
  }

  const works = document.getElementById('works');
  if (works) {
    new MutationObserver((mutations) => {
      const relevant = mutations.some((mutation) =>
        mutation.type === 'childList'
        || (mutation.type === 'characterData' && mutation.target.parentElement?.closest('#works'))
      );
      if (relevant) schedule();
    }).observe(works, { childList: true, subtree: true, characterData: true });
  }

  window.addEventListener('load', schedule);
  [0, 80, 240, 700, 1400].forEach((delay) => setTimeout(schedule, delay));
})();
