(() => {
  if (window.__znyPrintOrderV1) return;
  window.__znyPrintOrderV1 = true;

  const ORDER = ['01', '08', '05', '02', '09', '03', '06', '04', '07'];

  function applyOrder() {
    document.querySelectorAll('.zny-print-grid').forEach((grid) => {
      const cards = Array.from(grid.children);
      if (cards.length < ORDER.length) return;

      const byNumber = new Map();
      cards.forEach((card) => {
        const image = card.querySelector('img[src*="znyprint-"]');
        const match = image?.src?.match(/znyprint-(\d{2})/i);
        if (match) byNumber.set(match[1], card);
      });

      const orderedCards = ORDER.map((number) => byNumber.get(number)).filter(Boolean);
      if (orderedCards.length !== ORDER.length) return;

      const alreadyCorrect = orderedCards.every((card, index) => grid.children[index] === card);
      if (alreadyCorrect) return;

      orderedCards.forEach((card) => grid.append(card));
      grid.dataset.znyPrintOrder = '01-08-05-02-09-03-06-04-07';
    });
  }

  const observer = new MutationObserver(applyOrder);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'ZNY') return;
    requestAnimationFrame(applyOrder);
    window.setTimeout(applyOrder, 80);
    window.setTimeout(applyOrder, 220);
  }, true);

  applyOrder();
})();