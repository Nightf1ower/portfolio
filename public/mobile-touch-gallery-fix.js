(() => {
  if (window.__mobileTouchGalleryFixLoaded) return;
  window.__mobileTouchGalleryFixLoaded = true;

  const VERSION = 'touch-gallery-1';
  const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');
  const imageSelector = [
    '#works img',
    '.pink-punk-gallery img',
    '.pink-punk-lightbox-frame img',
    '.zny-modal img',
    '.zny-light img',
    '.bf img',
    '.bf-light img',
    '.blandetto-modal img',
    '.blandetto-lightbox img',
    '.su-modal img',
    '.su-light img',
    '.fable-modal img',
    '.fable-lightbox img',
    '.project9006-modal img',
    '.project9006-lightbox img'
  ].join(',');

  function injectStyles() {
    if (document.getElementById('mobile-touch-gallery-fix-style')) return;
    const style = document.createElement('style');
    style.id = 'mobile-touch-gallery-fix-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .touch-gallery-ui ${imageSelector}{
        -webkit-touch-callout:none!important;
        -webkit-user-select:none!important;
        user-select:none!important;
        -webkit-user-drag:none!important;
        user-drag:none!important;
      }

      .touch-gallery-ui .pink-punk-frame,
      .touch-gallery-ui .blandetto-card,
      .touch-gallery-ui .bf-card,
      .touch-gallery-ui .zny-card,
      .touch-gallery-ui .su-card,
      .touch-gallery-ui .su-concept-main,
      .touch-gallery-ui .su-concept-step{
        touch-action:manipulation!important;
        -webkit-tap-highlight-color:transparent!important;
      }

      .touch-gallery-ui .pink-punk-frame--hover:hover .pink-punk-image--base,
      .touch-gallery-ui .pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--base{
        opacity:1!important;
      }

      .touch-gallery-ui .pink-punk-frame--hover:hover .pink-punk-image--worn,
      .touch-gallery-ui .pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--worn{
        opacity:0!important;
      }

      .touch-gallery-ui .blandetto-card:hover .blandetto-card__img--main,
      .touch-gallery-ui .bf-card:hover .bf-main,
      .touch-gallery-ui .zny-card--has-hover:hover .zny-card__img--main{
        opacity:1!important;
      }

      .touch-gallery-ui .blandetto-card:hover .blandetto-card__img--hover,
      .touch-gallery-ui .bf-card:hover .bf-hov,
      .touch-gallery-ui .zny-card--has-hover:hover .zny-card__img--hover,
      .touch-gallery-ui .zny-card__img--hover.zny-card__img--active{
        opacity:0!important;
      }

      .touch-gallery-ui .blandetto-card:hover .blandetto-card__img,
      .touch-gallery-ui .pink-punk-frame:hover,
      .touch-gallery-ui #works button:hover,
      .touch-gallery-ui #works article:hover,
      .touch-gallery-ui #works [class*="group-hover:rotate-3"],
      .touch-gallery-ui #works [class*="group-hover:scale-105"]{
        transform:none!important;
        box-shadow:none!important;
      }

      @media (hover:none), (pointer:coarse), (max-width:768px){
        .pink-punk-frame--hover:hover .pink-punk-image--base,
        .pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--base,
        .blandetto-card:hover .blandetto-card__img--main,
        .bf-card:hover .bf-main,
        .zny-card--has-hover:hover .zny-card__img--main{
          opacity:1!important;
        }

        .pink-punk-frame--hover:hover .pink-punk-image--worn,
        .pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--worn,
        .blandetto-card:hover .blandetto-card__img--hover,
        .bf-card:hover .bf-hov,
        .zny-card--has-hover:hover .zny-card__img--hover,
        .zny-card__img--hover.zny-card__img--active{
          opacity:0!important;
        }
      }
    `;
    document.head.append(style);
  }

  function isTouchUI() {
    return touchQuery.matches || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;
  }

  function markImages(root = document) {
    if (!isTouchUI()) return;
    root.querySelectorAll?.(imageSelector).forEach((image) => {
      image.draggable = false;
      image.setAttribute('draggable', 'false');
      image.dataset.touchProtected = 'true';
    });
  }

  function clearStuckHover() {
    document.querySelectorAll('.zny-card__img--hover.zny-card__img--active').forEach((image) => {
      image.classList.remove('zny-card__img--active');
    });
  }

  function updateMode() {
    const enabled = isTouchUI();
    document.documentElement.classList.toggle('touch-gallery-ui', enabled);
    if (enabled) {
      clearStuckHover();
      markImages();
    }
  }

  function protectEvent(event) {
    if (!document.documentElement.classList.contains('touch-gallery-ui')) return;
    const image = event.target.closest?.(`${imageSelector}[data-touch-protected="true"]`);
    if (!image) return;
    event.preventDefault();
  }

  injectStyles();
  updateMode();

  touchQuery.addEventListener?.('change', updateMode);
  window.addEventListener('resize', updateMode, { passive: true });
  document.addEventListener('touchstart', () => {
    if (!isTouchUI()) return;
    clearStuckHover();
    markImages();
  }, { passive: true, capture: true });
  document.addEventListener('contextmenu', protectEvent, true);
  document.addEventListener('dragstart', protectEvent, true);
  document.addEventListener('selectstart', protectEvent, true);

  const observer = new MutationObserver((records) => {
    if (!isTouchUI()) return;
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType !== 1) return;
      if (node.matches?.(imageSelector)) {
        node.draggable = false;
        node.setAttribute('draggable', 'false');
        node.dataset.touchProtected = 'true';
      }
      markImages(node);
    }));
    clearStuckHover();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
