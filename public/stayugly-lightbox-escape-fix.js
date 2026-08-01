(() => {
  if (window.__stayUglyLightboxEscapeFixV1) return;
  window.__stayUglyLightboxEscapeFixV1 = true;

  const findOpenLightbox = () => (
    document.querySelector('.su-assets-lightbox')
    || document.querySelector('.su-light')
  );

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    const lightbox = findOpenLightbox();
    if (!lightbox) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    lightbox.remove();
  }, true);
})();
