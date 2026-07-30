(() => {
  if (window.__collagesEnglishOnlyV1) return;
  window.__collagesEnglishOnlyV1 = true;

  const TITLE = 'COLLAGES (PHOTO EDIT)';
  const TYPE = 'COLLAGE AND PHOTO EDITING';

  function apply() {
    const card = [...document.querySelectorAll('#works > div article, #works > div button, #works article, #works button')]
      .find((node) => node.querySelector('h3')?.textContent?.trim().toUpperCase() === TITLE);
    if (!card) return false;

    const heading = card.querySelector('h3');
    if (heading && heading.textContent !== TITLE) heading.textContent = TITLE;

    const type = heading?.nextElementSibling;
    if (type?.tagName === 'P' && type.textContent !== TYPE) type.textContent = TYPE;
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

  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  [0, 80, 240, 700, 1400].forEach((delay) => setTimeout(schedule, delay));
})();