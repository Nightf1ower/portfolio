(() => {
  if (window.__stickersMnuStickerCompositionV3) return;
  window.__stickersMnuStickerCompositionV3 = true;

  const VERSION = 'stickers-mnu-sticker-composition-3';

  function injectStyles() {
    document.getElementById('stickers-mnu-sticker-composition-style')?.remove();

    const style = document.createElement('style');
    style.id = 'stickers-mnu-sticker-composition-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .stk-project[data-stickers-project="mnu"] .stk-grid--stickers {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: clamp(1rem, 2vw, 1.6rem) !important;
        align-items: stretch !important;
        width: 100% !important;
      }

      .stk-project[data-stickers-project="mnu"] .stk-grid--stickers > .stk-card {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        width: 100% !important;
        height: clamp(17rem, 26vw, 25rem) !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: clamp(1rem, 2vw, 1.6rem) !important;
        overflow: visible !important;
        background: transparent !important;
      }

      .stk-project[data-stickers-project="mnu"] .stk-grid--stickers > .stk-card img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        margin: 0 auto !important;
        padding: 0 !important;
        object-fit: contain !important;
        object-position: center !important;
        background: transparent !important;
      }

      .stk-project[data-stickers-project="mnu"] .stk-mnu-composition,
      .stk-project[data-stickers-project="mnu"] .stk-mnu-composition__row,
      .stk-project[data-stickers-project="mnu"] .stk-mnu-composition__cell,
      .stk-project[data-stickers-project="mnu"] .stk-mnu-composition__extras {
        display: contents !important;
      }

      @media (max-width: 900px) {
        .stk-project[data-stickers-project="mnu"] .stk-grid--stickers {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }

        .stk-project[data-stickers-project="mnu"] .stk-grid--stickers > .stk-card {
          height: clamp(16rem, 42vw, 23rem) !important;
        }
      }

      @media (max-width: 560px), (hover: none), (pointer: coarse) {
        .stk-project[data-stickers-project="mnu"] .stk-grid--stickers {
          grid-template-columns: 1fr !important;
          gap: .8rem !important;
        }

        .stk-project[data-stickers-project="mnu"] .stk-grid--stickers > .stk-card {
          height: min(84vw, 24rem) !important;
          padding: 1rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function flattenMnuGrid(modal) {
    const grid = modal.querySelector('.stk-project[data-stickers-project="mnu"] .stk-grid--stickers');
    if (!grid || grid.dataset.mnuCompositionVersion === VERSION) return;

    const cards = [...grid.querySelectorAll('.stk-card')];
    if (!cards.length) return;

    grid.replaceChildren(...cards);
    grid.classList.remove('stk-grid--mnu-composition');
    grid.dataset.mnuCompositionVersion = VERSION;
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.stk-modal').forEach(flattenMnuGrid);
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  };

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule);
  apply();
})();
