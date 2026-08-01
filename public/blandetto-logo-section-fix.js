(() => {
  if (window.__blandettoLogoSectionFixV2) return;
  window.__blandettoLogoSectionFixV2 = true;

  const PRINT_ORDER = ['03', '06', '01', '09', '02', '10', '04', '05', '07'];

  function applyLogoStructure(modal) {
    const minimalSection = modal.querySelector('.bf-s[data-bf-section="minimalLogo"]');
    const identitySection = modal.querySelector('.bf-s[data-bf-section="brandIdentity"]');
    if (!minimalSection || !identitySection) return;

    const minimalGrid = minimalSection.querySelector('.bf-g');
    const identityGrid = identitySection.querySelector('.bf-g');
    if (!minimalGrid || !identityGrid) return;

    const primaryLogoCards = Array.from(identityGrid.children);
    primaryLogoCards.reverse().forEach((card) => minimalGrid.prepend(card));
    identitySection.remove();
    minimalSection.dataset.blandettoAllLogos = 'true';
  }

  function applyPrintOrder(modal) {
    const printSection = modal.querySelector('.bf-s[data-bf-section="prints"]');
    const printGrid = printSection?.querySelector('.bf-g');
    if (!printGrid) return;

    const cards = Array.from(printGrid.children);
    const byNumber = new Map();

    cards.forEach((card) => {
      const image = card.querySelector('img[src*="/works/blandetto/print/print-"]');
      const match = image?.src?.match(/\/print-(\d{2})\.(?:jpg|png|webp)/i);
      if (!match) return;

      if (match[1] === '08') {
        card.remove();
        return;
      }

      byNumber.set(match[1], card);
    });

    const orderedCards = PRINT_ORDER.map((number) => byNumber.get(number)).filter(Boolean);
    if (orderedCards.length !== PRINT_ORDER.length) return;

    orderedCards.forEach((card) => printGrid.append(card));
    printGrid.dataset.blandettoPrintOrder = PRINT_ORDER.join('-');
  }

  function apply() {
    document.querySelectorAll('.bf').forEach((modal) => {
      applyLogoStructure(modal);
      applyPrintOrder(modal);
    });
  }

  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'BLANDETTO') return;
    requestAnimationFrame(apply);
    window.setTimeout(apply, 80);
    window.setTimeout(apply, 220);
  }, true);

  apply();
})();