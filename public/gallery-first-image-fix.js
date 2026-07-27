(() => {
  if (window.__galleryFirstImageFixV1) return;
  window.__galleryFirstImageFixV1 = true;

  const style = document.createElement('style');
  style.id = 'gallery-first-image-fix-style';
  style.textContent = `
    .cr-card img,
    .pink-punk-frame img,
    [data-images] img,
    [data-hover-src] img,
    [data-worn-src] img,
    .cr-modal button img,
    .zny-modal button img,
    .fable-modal button img,
    .bf button img,
    .blandetto-modal button img,
    .bld-modal button img,
    .su-modal button img,
    .m10-modal button img,
    .merch9-modal button img,
    .project9006-modal button img,
    .pink-punk-fullscreen button img {
      pointer-events: none !important;
    }
  `;
  document.head.append(style);
})();