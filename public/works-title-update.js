(() => {
  if (window.__worksTitleUpdateV1) return;
  window.__worksTitleUpdateV1 = true;

  const COPY = {
    ru: 'ИЗБРАННЫЕ ПРОЕКТЫ',
    en: 'SELECTED PROJECTS',
  };

  function apply() {
    const heading = document.querySelector('#works h2');
    if (!heading) return false;

    const language = document.documentElement.lang === 'ru' ? 'ru' : 'en';
    const title = COPY[language];
    if (heading.textContent !== title) heading.textContent = title;
    return true;
  }

  new MutationObserver(() => {
    requestAnimationFrame(apply);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  window.addEventListener('load', apply);
  [0, 80, 240, 700].forEach((delay) => setTimeout(apply, delay));
})();
