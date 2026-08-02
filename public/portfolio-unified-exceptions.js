(() => {
  if (window.__portfolioUnifiedExceptionsV2) return;
  window.__portfolioUnifiedExceptionsV2 = true;

  const VERSION = 'portfolio-unified-exceptions-2';
  const oldStyle = document.getElementById('portfolio-unified-exceptions-style');
  oldStyle?.remove();

  const style = document.createElement('style');
  style.id = 'portfolio-unified-exceptions-style';
  style.dataset.version = VERSION;
  style.textContent = `
    .pink-punk-fullscreen,
    .pink-punk-fullscreen * {
      font-family: Arial, Helvetica, sans-serif !important;
    }

    .pink-punk-fullscreen .pink-punk-gallery,
    .pink-punk-fullscreen .pink-punk-gallery--grouped {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-inline: 0 !important;
    }

    .pink-punk-fullscreen .pink-punk-brand,
    .pink-punk-fullscreen .pink-punk-section {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      padding-top: clamp(4rem, 7vw, 7rem) !important;
      padding-bottom: clamp(4rem, 7vw, 7rem) !important;
    }

    .pink-punk-fullscreen .pink-punk-section + .pink-punk-section {
      margin-top: 0 !important;
    }

    .pink-punk-fullscreen .pink-punk-brand__title,
    .pink-punk-fullscreen .pink-punk-section__title {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      line-height: .9 !important;
      letter-spacing: .03em !important;
    }

    .pink-punk-fullscreen .pink-punk-section__title {
      margin-bottom: clamp(2rem, 4vw, 3.5rem) !important;
    }

    .pink-punk-fullscreen .pink-punk-brand__copy,
    .pink-punk-fullscreen .pink-punk-section__note {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      color: rgba(255,255,255,.82) !important;
      font: 500 clamp(1rem, 1.25vw, 1.2rem)/1.45 Arial, Helvetica, sans-serif !important;
      letter-spacing: 0 !important;
      text-align: left !important;
      text-wrap: pretty !important;
    }

    .pink-punk-fullscreen .pink-punk-brand__copy {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    .pink-punk-fullscreen .pink-punk-section__note {
      margin-top: 0 !important;
      margin-bottom: clamp(2rem, 4vw, 3.5rem) !important;
    }

    .m10-modal {
      overflow-x: clip !important;
    }

    .m10-modal .m10-dxs-zone {
      position: relative !important;
      left: 50% !important;
      right: 50% !important;
      box-sizing: border-box !important;
      width: 100vw !important;
      max-width: 100vw !important;
      margin-left: -50vw !important;
      margin-right: -50vw !important;
      padding-left: max(1rem, env(safe-area-inset-left)) !important;
      padding-right: max(1rem, env(safe-area-inset-right)) !important;
      background: #ef2b27 !important;
      color: #050505 !important;
    }

    .m10-modal .m10-dxs-zone,
    .m10-modal .m10-dxs-zone * {
      font-family: Arial, Helvetica, sans-serif !important;
    }

    .m10-modal .m10-dxs-zone > .m10-section,
    .m10-modal .m10-dxs-zone .m10-dxs-materials-intro {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-top: clamp(4rem, 7vw, 7rem) !important;
      padding-bottom: clamp(4rem, 7vw, 7rem) !important;
    }

    .m10-modal .m10-dxs-zone .m10-section-title,
    .m10-modal .m10-dxs-zone .m10-dxs-materials-title {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: clamp(2rem, 4vw, 3.5rem) !important;
      font-family: Arial, Helvetica, sans-serif !important;
      line-height: .9 !important;
      letter-spacing: .03em !important;
      text-wrap: balance !important;
    }

    .m10-modal .m10-dxs-zone .m10-project-copy,
    .m10-modal .m10-dxs-zone .m10-section-copy,
    .m10-modal .m10-dxs-zone .m10-copy-update,
    .m10-modal .m10-dxs-zone .m10-dxs-materials-copy,
    .m10-modal .m10-dxs-zone .m10-project-copy p,
    .m10-modal .m10-dxs-zone .m10-section-copy p,
    .m10-modal .m10-dxs-zone .m10-copy-update p {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      font: 500 clamp(1rem, 1.25vw, 1.2rem)/1.45 Arial, Helvetica, sans-serif !important;
      letter-spacing: 0 !important;
      text-align: left !important;
      text-wrap: pretty !important;
    }

    .m10-modal .m10-dxs-zone .m10-dxs-materials-copy {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    @media (max-width: 640px) {
      .pink-punk-fullscreen .pink-punk-brand,
      .pink-punk-fullscreen .pink-punk-section,
      .m10-modal .m10-dxs-zone > .m10-section,
      .m10-modal .m10-dxs-zone .m10-dxs-materials-intro {
        padding-top: clamp(3rem, 12vw, 5rem) !important;
        padding-bottom: clamp(3rem, 12vw, 5rem) !important;
      }
    }
  `;

  function important(element, property, value) {
    if (element instanceof HTMLElement) element.style.setProperty(property, value, 'important');
  }

  function applyPinkPunk() {
    const modal = document.querySelector('.pink-punk-fullscreen');
    const gallery = modal?.querySelector('.pink-punk-gallery');
    if (!modal || !gallery) return;

    let ancestor = gallery;
    while (ancestor && ancestor !== modal) {
      important(ancestor, 'box-sizing', 'border-box');
      important(ancestor, 'width', '100%');
      important(ancestor, 'max-width', 'none');
      important(ancestor, 'margin-left', '0');
      important(ancestor, 'margin-right', '0');
      ancestor = ancestor.parentElement;
    }

    modal.querySelectorAll('.pink-punk-brand__title, .pink-punk-section__title').forEach((title) => {
      important(title, 'width', '100%');
      important(title, 'max-width', 'none');
      important(title, 'line-height', '.9');
      important(title, 'letter-spacing', '.03em');
    });

    modal.querySelectorAll('.pink-punk-brand__copy, .pink-punk-section__note').forEach((copy) => {
      important(copy, 'width', '100%');
      important(copy, 'max-width', 'none');
      important(copy, 'font-family', 'Arial, Helvetica, sans-serif');
      important(copy, 'font-size', 'clamp(1rem, 1.25vw, 1.2rem)');
      important(copy, 'font-weight', '500');
      important(copy, 'line-height', '1.45');
      important(copy, 'letter-spacing', '0');
    });
  }

  function applyDxs() {
    const modal = document.querySelector('.m10-modal');
    const zone = modal?.querySelector('.m10-dxs-zone');
    if (!modal || !zone) return;

    important(modal, 'overflow-x', 'clip');
    important(zone, 'position', 'relative');
    important(zone, 'left', '50%');
    important(zone, 'right', '50%');
    important(zone, 'box-sizing', 'border-box');
    important(zone, 'width', '100vw');
    important(zone, 'max-width', '100vw');
    important(zone, 'margin-left', '-50vw');
    important(zone, 'margin-right', '-50vw');
    important(zone, 'padding-left', 'max(1rem, env(safe-area-inset-left))');
    important(zone, 'padding-right', 'max(1rem, env(safe-area-inset-right))');
    important(zone, 'background', '#ef2b27');

    zone.querySelectorAll('.m10-section-title, .m10-dxs-materials-title').forEach((title) => {
      important(title, 'width', '100%');
      important(title, 'max-width', 'none');
      important(title, 'line-height', '.9');
      important(title, 'letter-spacing', '.03em');
    });

    zone.querySelectorAll('.m10-project-copy, .m10-section-copy, .m10-copy-update, .m10-dxs-materials-copy, .m10-project-copy p, .m10-section-copy p, .m10-copy-update p').forEach((copy) => {
      important(copy, 'width', '100%');
      important(copy, 'max-width', 'none');
      important(copy, 'font-family', 'Arial, Helvetica, sans-serif');
      important(copy, 'font-size', 'clamp(1rem, 1.25vw, 1.2rem)');
      important(copy, 'font-weight', '500');
      important(copy, 'line-height', '1.45');
      important(copy, 'letter-spacing', '0');
    });
  }

  function ensureStyleLast() {
    if (document.head.lastElementChild !== style) document.head.append(style);
  }

  function apply() {
    ensureStyleLast();
    applyPinkPunk();
    applyDxs();
  }

  document.head.append(style);

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  });

  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  apply();
})();
