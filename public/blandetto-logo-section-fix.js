(() => {
  if (window.__blandettoLogoSectionFixV1) return;
  window.__blandettoLogoSectionFixV1 = true;

  function apply() {
    document.querySelectorAll('.bf').forEach((modal) => {
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