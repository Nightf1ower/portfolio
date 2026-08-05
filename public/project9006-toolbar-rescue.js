(() => {
  if (window.__project9006ToolbarRescueV1) return;
  window.__project9006ToolbarRescueV1 = true;

  const STYLE_ID = 'project9006-toolbar-rescue-style';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .project9006-modal .project9006-toolbar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: auto !important;
        z-index: 1000700 !important;
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100vw !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        margin: 0 !important;
        padding: .9rem clamp(1rem,2.5vw,2.5rem) !important;
        transform: none !important;
        background: rgba(0,0,0,.96) !important;
      }

      .project9006-modal .project9006-toolbar__label,
      .project9006-modal .project9006-toolbar__close {
        position: static !important;
        inset: auto !important;
        transform: none !important;
        flex: 0 0 auto !important;
      }

      .project9006-modal .project9006-brand {
        padding-top: clamp(7rem,10vw,9rem) !important;
      }
    `;
    document.head.append(style);
  }

  function rescue() {
    installStyles();

    document.querySelectorAll('.project9006-modal').forEach((modal) => {
      modal.querySelectorAll('.project9006-native-toolbar').forEach((node) => {
        node.classList.remove('project9006-native-toolbar');
        node.style.removeProperty('display');
      });

      const toolbar = modal.querySelector('.project9006-toolbar');
      if (toolbar) {
        toolbar.style.setProperty('position', 'fixed', 'important');
        toolbar.style.setProperty('top', '0', 'important');
        toolbar.style.setProperty('left', '0', 'important');
        toolbar.style.setProperty('right', '0', 'important');
        toolbar.style.setProperty('height', 'auto', 'important');
        toolbar.style.setProperty('min-height', '0', 'important');
        toolbar.style.setProperty('transform', 'none', 'important');
      }
    });
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      rescue();
    });
  }

  schedule();
  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
})();
