(() => {
  if (window.__carnivalRecordsBootstrapV1) return;
  window.__carnivalRecordsBootstrapV1 = true;

  const projectTitle = 'CARNIVAL RECORDS';
  const scrollButton = () => document.querySelector('.project-scroll-top');
  const currentLanguage = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';

  function findCard() {
    return [...document.querySelectorAll('#works article,#works button')].find((node) =>
      node.querySelector('h3')?.textContent?.trim().toUpperCase() === projectTitle
    );
  }

  function prepareCard() {
    const card = findCard();
    if (!card) return;
    card.classList.add('cr-project-card');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', currentLanguage() === 'ru' ? 'Открыть проект CARNIVAL RECORDS' : 'Open CARNIVAL RECORDS project');

    const placeholder = [...card.querySelectorAll('div')].find((node) =>
      node.children.length === 0 && /плейсхолдер|placeholder/i.test(node.textContent?.trim() || '')
    );
    if (placeholder) placeholder.textContent = currentLanguage() === 'ru' ? 'ОТКРЫТЬ ПРОЕКТ' : 'OPEN PROJECT';
  }

  function updateScrollButton(modal = document.querySelector('.cr-modal')) {
    const button = scrollButton();
    if (!button) return;
    button.classList.toggle('is-visible', Boolean(modal && modal.scrollTop > 320));
  }

  function scheduleBind() {
    [0, 100, 300, 700].forEach((delay) => setTimeout(() => {
      const modal = document.querySelector('.cr-modal');
      if (modal) updateScrollButton(modal);
    }, delay));
  }

  [0, 150, 600, 1400].forEach((delay) => setTimeout(prepareCard, delay));
  addEventListener('load', prepareCard);

  document.addEventListener('scroll', (event) => {
    const target = event.target;
    if (target instanceof Element && target.matches('.cr-modal')) updateScrollButton(target);
  }, true);

  document.addEventListener('click', (event) => {
    const project = event.target.closest('#works article,#works button');
    if (project?.querySelector('h3')?.textContent?.trim().toUpperCase() === projectTitle) scheduleBind();

    const button = event.target.closest('.project-scroll-top');
    const modal = document.querySelector('.cr-modal');
    if (button && modal) {
      event.preventDefault();
      try { modal.scrollTo({ top: 0, behavior: 'smooth' }); }
      catch { modal.scrollTop = 0; }
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const lightboxClose = document.querySelector('.cr-light .cr-light-close');
    const modalClose = document.querySelector('.cr-modal .cr-close');
    const target = lightboxClose || modalClose;
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    target.click();
    setTimeout(() => updateScrollButton(), 0);
  }, true);

  new MutationObserver(prepareCard).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
})();