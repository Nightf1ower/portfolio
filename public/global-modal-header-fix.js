(() => {
  if (window.__globalPortfolioModalFixV6) return;
  window.__globalPortfolioModalFixV6 = true;

  document.getElementById('global-modal-header-fix')?.remove();

  const style = document.createElement('style');
  style.id = 'global-modal-header-fix';
  style.dataset.version = 'modal-head-6';
  style.textContent = `
    html:has(.zny-modal), body:has(.zny-modal),
    html:has(.fable-modal), body:has(.fable-modal),
    html:has(.bf), body:has(.bf),
    html:has(.blandetto-modal), body:has(.blandetto-modal),
    html:has(.bld-modal), body:has(.bld-modal),
    html:has(.su-modal), body:has(.su-modal),
    html:has(.m10-modal), body:has(.m10-modal),
    html:has(.merch9-modal), body:has(.merch9-modal),
    html:has(.project9006-modal), body:has(.project9006-modal),
    html:has(.pink-punk-fullscreen), body:has(.pink-punk-fullscreen),
    html:has(.z-\\[100\\].fixed.inset-0), body:has(.z-\\[100\\].fixed.inset-0) {
      width: 100% !important;
      min-height: 100% !important;
      overflow: hidden !important;
      overscroll-behavior: none !important;
    }

    html:has(.zny-modal), body:has(.zny-modal),
    html:has(.fable-modal), body:has(.fable-modal),
    html:has(.bf), body:has(.bf),
    html:has(.blandetto-modal), body:has(.blandetto-modal),
    html:has(.bld-modal), body:has(.bld-modal) {
      background: #fff !important;
      background-color: #fff !important;
    }

    html:has(.project9006-modal), body:has(.project9006-modal) {
      background: #050505 !important;
      background-color: #050505 !important;
    }

    html:has(.pink-punk-fullscreen), body:has(.pink-punk-fullscreen) {
      background: #050505 !important;
      background-color: #050505 !important;
    }

    .zny-modal,
    .fable-modal,
    .bf,
    .blandetto-modal,
    .bld-modal,
    .su-modal,
    .m10-modal,
    .merch9-modal,
    .project9006-modal,
    .pink-punk-fullscreen,
    .z-\\[100\\].fixed.inset-0 {
      position: fixed !important;
      inset: 0 !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      box-sizing: border-box !important;
      width: 100vw !important;
      max-width: none !important;
      height: 100vh !important;
      height: 100dvh !important;
      min-height: 100svh !important;
      max-height: none !important;
      margin: 0 !important;
      z-index: 900000 !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      overscroll-behavior: contain !important;
      background-clip: border-box !important;
      isolation: isolate !important;
      transform: translateZ(0) !important;
      -webkit-overflow-scrolling: touch !important;
    }

    .zny-modal::before,
    .fable-modal::before,
    .bf::before,
    .blandetto-modal::before,
    .bld-modal::before,
    .su-modal::before,
    .m10-modal::before,
    .merch9-modal::before,
    .project9006-modal::before,
    .pink-punk-fullscreen::before,
    .z-\\[100\\].fixed.inset-0::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background: inherit;
    }

    .zny-inner,
    .fable-inner,
    .bf-i,
    .blandetto-inner,
    .bld-inner,
    .su-inner,
    .m10-inner,
    .merch9-inner,
    .project9006-modal > div,
    .pink-punk-fullscreen > div,
    .z-\\[100\\].fixed.inset-0 > div {
      min-height: 100% !important;
    }

    .zny-light,
    .fable-light,
    .bf-light,
    .blandetto-lightbox,
    .su-light,
    .m10-light,
    .merch9-light,
    .project9006-lightbox,
    .z-\\[150\\].fixed.inset-0 {
      z-index: 900100 !important;
    }

    .zny-head,
    .fable-head,
    .bf-h,
    .blandetto-head,
    .bld-head {
      position: relative !important;
      top: auto !important;
      z-index: 20 !important;
      justify-content: space-between !important;
      background: transparent !important;
      border-bottom: 0 !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .su-head,
    .merch9-head,
    .m10-head,
    .project9006-head,
    .p9006-head,
    [class$="-modal"] > [class$="-inner"] > [class$="-head"] {
      position: relative !important;
      top: auto !important;
      z-index: 20 !important;
      background: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .zny-label,
    .su-label, .su-close,
    .zny-close,
    .fable-label, .fable-close,
    .merch9-label, .merch9-close,
    .m10-label, .m10-close,
    .blandetto-label, .blandetto-close,
    .bld-label, .bld-close,
    .project9006-label, .project9006-close,
    .p9006-label, .p9006-close {
      position: relative !important;
      z-index: 2 !important;
    }

    .zny-label {
      margin: 0 !important;
      padding: .35rem .75rem !important;
      background: #050505 !important;
      color: #fff !important;
      font-size: .68rem !important;
      font-weight: 900 !important;
      line-height: 1 !important;
      letter-spacing: .28em !important;
      text-transform: uppercase !important;
    }

    .pink-punk-section__counter,
    .blandetto-lightbox__counter,
    .blandetto-section__count,
    .bf-c,
    .zny-count,
    .fable-count,
    .m10-count,
    .merch9-count,
    .su-count,
    .project9006-count,
    .p9006-count,
    .project9006-modal section > div:first-child > p.text-xs,
    div[class*="bg-[#050505]"][class*="fixed"][class*="inset-0"] section > div:first-child > p.text-xs {
      display: none !important;
    }

    @supports (padding: max(0px)) {
      .zny-modal,
      .fable-modal,
      .bf,
      .blandetto-modal,
      .bld-modal,
      .su-modal,
      .m10-modal,
      .merch9-modal {
        padding-top: max(1rem, env(safe-area-inset-top)) !important;
        padding-right: max(1rem, env(safe-area-inset-right)) !important;
        padding-bottom: max(1rem, env(safe-area-inset-bottom)) !important;
        padding-left: max(1rem, env(safe-area-inset-left)) !important;
      }
    }
  `;
  document.head.append(style);

  const currentLanguage = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';

  function fixZny() {
    const modal = document.querySelector('.zny-modal');
    if (!modal) return false;

    const head = modal.querySelector('.zny-head');
    if (head && !head.querySelector('.zny-label')) {
      const label = document.createElement('p');
      label.className = 'zny-label';
      label.textContent = 'ZNY';
      head.prepend(label);
    }

    const note = modal.querySelector('.zny-section[data-zny-section="prints"] .zny-note');
    if (note) {
      note.textContent = currentLanguage() === 'ru'
        ? 'Графика для одежды, коллекций и лимитированных дропов. Все принты отрисованы вручную, без использования Photoshop.'
        : 'Graphics created for apparel, collections and limited drops. Every print was drawn by hand without using Photoshop.';
    }

    return Boolean(head && note);
  }

  function retry(task, attempts = 28, delay = 160) {
    let count = 0;
    const run = () => {
      count += 1;
      if (task() || count >= attempts) return;
      window.setTimeout(run, delay);
    };
    window.setTimeout(run, 0);
  }

  const lightboxCloseSelectors = [
    '.zny-light button',
    '.fable-light button',
    '.bf-light .bf-close',
    '.su-light button',
    '.m10-light button',
    '.merch9-light button',
    '.blandetto-lightbox button',
    '.z-\\[150\\].fixed.inset-0 > button'
  ];

  const modalCloseSelectors = [
    '.zny-close',
    '.fable-close',
    '.bf-x',
    '.su-close',
    '.m10-close',
    '.merch9-close',
    '.blandetto-close',
    '.bld-close',
    '.project9006-close',
    '.p9006-close',
    '.z-\\[100\\].fixed.inset-0 > div > .sticky button'
  ];

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const lightboxClose = document.querySelector(lightboxCloseSelectors.join(','));
    if (lightboxClose) {
      lightboxClose.click();
      return;
    }
    document.querySelector(modalCloseSelectors.join(','))?.click();
  });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'ZNY') retry(fixZny);

    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      window.setTimeout(fixZny, 0);
      window.setTimeout(fixZny, 120);
    }
  }, true);

  window.addEventListener('load', fixZny);
})();