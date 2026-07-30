(() => {
  if (window.__vtbPlaceholderDisableV1) return;
  window.__vtbPlaceholderDisableV1 = true;

  function findCard() {
    return [...document.querySelectorAll('#works article, #works button')].find((card) =>
      card.querySelector('h3')?.textContent?.trim().toUpperCase() === 'VTB DESIGN TEAM'
    ) || null;
  }

  function apply() {
    const card = findCard();
    if (!card) return;
    card.removeAttribute('data-safe-generated-project-v5');
    card.removeAttribute('data-safe-generated-project');
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

  const grid = document.querySelector('#works .mt-10.grid');
  if (grid) new MutationObserver(schedule).observe(grid, { childList: true });
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  [0, 80, 240, 700, 1400].forEach((delay) => setTimeout(schedule, delay));
})();