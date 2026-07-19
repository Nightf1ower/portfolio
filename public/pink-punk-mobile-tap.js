(() => {
  if (window.__pinkPunkMobileTapLoaded) return;
  window.__pinkPunkMobileTapLoaded = true;

  const VERSION = 'pink-mobile-tap-1';
  const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');

  function isTouchUI() {
    return touchQuery.matches || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;
  }

  function injectStyles() {
    if (document.getElementById('pink-punk-mobile-tap-style')) return;
    const style = document.createElement('style');
    style.id = 'pink-punk-mobile-tap-style';
    style.dataset.version = VERSION;
    style.textContent = `
      @media (hover: none), (pointer: coarse), (max-width: 768px) {
        .pink-punk-frame--hover {
          touch-action: manipulation !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        .touch-gallery-ui .pink-punk-frame--hover.is-touch-worn .pink-punk-image--base,
        .pink-punk-frame--hover.is-touch-worn .pink-punk-image--base {
          opacity: 0 !important;
        }

        .touch-gallery-ui .pink-punk-frame--hover.is-touch-worn .pink-punk-image--worn,
        .pink-punk-frame--hover.is-touch-worn .pink-punk-image--worn {
          opacity: 1 !important;
        }
      }
    `;
    document.head.append(style);
  }

  function updateTouchNote() {
    if (!isTouchUI()) return;
    const note = document.querySelector('.pink-punk-section[data-section="tees"] .pink-punk-section__note');
    if (!note) return;
    note.textContent = document.documentElement.lang === 'ru'
      ? 'Сначала — превью принтов. Нажмите на карточку, чтобы увидеть тот же дизайн на футболке.'
      : 'Flat print previews first. Tap a card to see the same graphic on a T-shirt.';
  }

  function handleTap(event) {
    if (!isTouchUI()) return;
    const card = event.target.closest?.('.pink-punk-section__grid--tees .pink-punk-frame--hover');
    if (!card) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const showWorn = !card.classList.contains('is-touch-worn');
    card.classList.toggle('is-touch-worn', showWorn);
    card.setAttribute('aria-pressed', String(showWorn));
  }

  injectStyles();
  updateTouchNote();

  document.addEventListener('click', handleTap, true);
  touchQuery.addEventListener?.('change', updateTouchNote);
  window.addEventListener('resize', updateTouchNote, { passive: true });

  const observer = new MutationObserver(updateTouchNote);
  observer.observe(document.body, { childList: true, subtree: true });
  new MutationObserver(updateTouchNote).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
})();
