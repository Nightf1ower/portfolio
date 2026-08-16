(() => {
  if (window.__portfolioFixedProjectHeaderV1) return;
  window.__portfolioFixedProjectHeaderV1 = true;

  const VERSION = 'portfolio-fixed-project-header-1';
  const STYLE_ID = 'portfolio-fixed-project-header-style';
  const MODAL_SELECTOR = [
    '.zny-modal','.fable-modal','.pink-punk-fullscreen','.cr-modal','.blandetto-modal','.bf',
    '.project9006-modal','.pcg-modal','.pag-modal','.mc-modal','.m10-modal','.stk-modal','.lcg-modal',
    '.album-covers-modal','.su-modal','.anka-peresild-modal','.vtb-modal','.collages-modal'
  ].join(',');
  const CLOSE_SELECTOR = [
    '.zny-close','.fable-close','.su-close','.vtb-close','.cr-close','.mc-close','.stk-close',
    '.pcg-close','.lcg-close','.pag-close','.blandetto-close','.bf-close','.bf-x',
    '.anka-peresild-close','.album-covers-close','.project9006-toolbar__close','.project9006-close',
    '.p9006-close','button[aria-label*="close" i]','button[aria-label*="закры" i]'
  ].join(',');

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-fixed-project-head{
        position:fixed!important;
        inset:0 0 auto 0!important;
        top:0!important;
        left:0!important;
        right:0!important;
        z-index:1800000!important;
        box-sizing:border-box!important;
        width:100vw!important;
        max-width:none!important;
        margin:0!important;
        transform:none!important;
        translate:none!important;
        will-change:auto!important;
        animation:none!important;
        transition:none!important;
        backdrop-filter:none!important;
        -webkit-backdrop-filter:none!important;
      }
      .portfolio-fixed-project-head-spacer{
        display:block!important;
        box-sizing:border-box!important;
        width:100%!important;
        min-width:0!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        pointer-events:none!important;
        flex:0 0 auto!important;
      }
      .desktop-unified-lightbox{z-index:3000000!important}
    `;
    document.head.append(style);
  }

  function visible(node) {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function findHead(modal) {
    if (!(modal instanceof HTMLElement)) return null;
    const close = [...modal.querySelectorAll(CLOSE_SELECTOR)]
      .filter(button => !button.closest('.desktop-unified-lightbox'))
      .filter(visible)[0] || null;
    if (!close) return null;

    const explicit = close.closest([
      'header','[class*="head"]','[class*="toolbar"]','[class*="topbar"]','[class*="top-bar"]'
    ].join(','));
    const head = explicit && explicit !== modal ? explicit : close.parentElement;
    if (!(head instanceof HTMLElement) || head === modal) return null;
    return head;
  }

  function ensureSpacer(head) {
    let spacer = head.nextElementSibling;
    if (!(spacer instanceof HTMLElement) || !spacer.classList.contains('portfolio-fixed-project-head-spacer')) {
      spacer = document.createElement('div');
      spacer.className = 'portfolio-fixed-project-head-spacer';
      spacer.setAttribute('aria-hidden', 'true');
      head.after(spacer);
    }
    return spacer;
  }

  function pinModal(modal) {
    const head = findHead(modal);
    if (!head) return;
    head.classList.add('portfolio-fixed-project-head');
    head.dataset.portfolioFixedProjectHead = VERSION;

    const spacer = ensureSpacer(head);
    const height = Math.max(1, Math.ceil(head.getBoundingClientRect().height));
    const nextHeight = `${height}px`;
    if (spacer.style.height !== nextHeight) spacer.style.height = nextHeight;
  }

  function cleanup() {
    document.querySelectorAll('.portfolio-fixed-project-head').forEach(head => {
      const modal = head.closest(MODAL_SELECTOR);
      if (modal?.isConnected) return;
      head.classList.remove('portfolio-fixed-project-head');
      head.removeAttribute('data-portfolio-fixed-project-head');
      head.nextElementSibling?.classList?.contains('portfolio-fixed-project-head-spacer') && head.nextElementSibling.remove();
    });
  }

  function apply() {
    cleanup();
    document.querySelectorAll(MODAL_SELECTOR).forEach(modal => {
      if (visible(modal)) pinModal(modal);
    });
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  }

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class','style']
  });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  window.addEventListener('popstate', () => setTimeout(schedule, 0));
  window.addEventListener('load', schedule, { once: true });

  installStyles();
  apply();
  [50, 160, 420, 900].forEach(delay => setTimeout(schedule, delay));
})();