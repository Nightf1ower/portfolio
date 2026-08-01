(() => {
  if (window.__carnivalRecordsClickGuardV1) return;
  window.__carnivalRecordsClickGuardV1 = true;

  const CONTROL_SELECTOR = [
    '.cr-close',
    '.cr-light-close',
    '.cr-nav',
    '.project-scroll-top',
    'a',
    'input',
    'select',
    'textarea',
  ].join(',');

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.cr-light')) return;

    const modal = event.target.closest('.cr-modal');
    if (!modal) return;

    if (event.target.closest(CONTROL_SELECTOR)) return;

    const card = event.target.closest('.cr-card');
    const clickedImage = event.target.closest('.cr-img, .cr-card img');

    if (card && clickedImage) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }, true);
})();