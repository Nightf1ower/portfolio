(() => {
  if (window.__blandettoLogoSectionFixV3) return;
  window.__blandettoLogoSectionFixV3 = true;

  const PRINT_ORDER = ['03', '06', '01', '09', '02', '10', '04', '05', '07'];
  const PRINT_ORDER_KEY = PRINT_ORDER.join('-');
  let scheduled = false;

  function applyLogoStructure(modal) {
    const minimalSection = modal.querySelector('.bf-s[data-bf-section="minimalLogo"]');
    if (!minimalSection || minimalSection.dataset.blandettoAllLogos === 'true') return;

    const identitySection = modal.querySelector('.bf-s[data-bf-section="brandIdentity"]');
    if (!identitySection) {
      minimalSection.dataset.blandettoAllLogos = 'true';
      return;
    }

    const minimalGrid = minimalSection.querySelector('.bf-g');
    const identityGrid = identitySection.querySelector('.bf-g');
    if (!minimalGrid || !identityGrid) return;

    Array.from(identityGrid.children).reverse().forEach((card) => minimalGrid.prepend(card));
    identitySection.remove();
    minimalSection.dataset.blandettoAllLogos = 'true';
  }

  function applyPrintOrder(modal) {
    const printGrid = modal.querySelector('.bf-s[data-bf-section="prints"] .bf-g');
    if (!printGrid) return;

    const hasPrint08 = Boolean(printGrid.querySelector('img[src*="/print/print-08."]'));
    if (printGrid.dataset.blandettoPrintOrder === PRINT_ORDER_KEY && !hasPrint08) return;

    const byNumber = new Map();
    Array.from(printGrid.children).forEach((card) => {
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

    const currentCards = Array.from(printGrid.children).filter((card) =>
      card.querySelector('img[src*="/works/blandetto/print/print-"]')
    );
    const alreadyCorrect = orderedCards.every((card, index) => currentCards[index] === card);

    if (!alreadyCorrect) orderedCards.forEach((card) => printGrid.append(card));
    printGrid.dataset.blandettoPrintOrder = PRINT_ORDER_KEY;
  }

  function apply() {
    scheduled = false;
    document.querySelectorAll('.bf').forEach((modal) => {
      applyLogoStructure(modal);
      applyPrintOrder(modal);
    });
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(apply);
  }

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'BLANDETTO') return;
    scheduleApply();
    window.setTimeout(scheduleApply, 80);
    window.setTimeout(scheduleApply, 220);
  }, true);

  scheduleApply();
})();