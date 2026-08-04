(() => {
  if (window.__projectCardUnifiedToneV6) return;
  window.__projectCardUnifiedToneV6 = true;

  const VERSION = 'project-card-unified-tone-6';
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

    #works h3.blandetto-title-final {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
      font-size: clamp(1.45rem, 2.1vw, 1.9rem) !important;
      font-weight: 800 !important;
      font-style: normal !important;
      font-stretch: normal !important;
      font-variation-settings: normal !important;
      font-feature-settings: normal !important;
      font-synthesis: none !important;
      line-height: .94 !important;
      letter-spacing: -.04em !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
      transform: none !important;
      scale: none !important;
    }

    @media (max-width: 820px) {
      #works h3.blandetto-title-final {
        font-size: clamp(1.3rem, 6.8vw, 1.7rem) !important;
      }
    }
  `;
  document.getElementById('project-card-unified-tone-style')?.remove();
  document.head.append(style);

  function applyBlandettoTitle() {
    const cards = document.querySelectorAll('#works .mt-10.grid > article, #works .mt-10.grid > button');
    const card = [...cards].find((item) => normalize(item.querySelector('h3')?.textContent) === 'BLANDETTO');
    const heading = card?.querySelector('h3');
    if (!heading) return false;

    heading.classList.add('blandetto-title-final');
    heading.removeAttribute('style');
    heading.textContent = 'BLANDETTO';

    heading.style.setProperty('font-family', 'Helvetica, "Helvetica Neue", Arial, sans-serif', 'important');
    heading.style.setProperty('font-size', 'clamp(1.45rem, 2.1vw, 1.9rem)', 'important');
    heading.style.setProperty('font-weight', '800', 'important');
    heading.style.setProperty('font-style', 'normal', 'important');
    heading.style.setProperty('font-stretch', 'normal', 'important');
    heading.style.setProperty('font-variation-settings', 'normal', 'important');
    heading.style.setProperty('line-height', '.94', 'important');
    heading.style.setProperty('letter-spacing', '-.04em', 'important');
    heading.style.setProperty('white-space', 'nowrap', 'important');
    heading.style.setProperty('transform', 'none', 'important');
    heading.style.setProperty('margin', '0', 'important');
    return true;
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyBlandettoTitle();
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
