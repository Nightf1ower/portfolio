(() => {
  if (window.__stickersMnuStickerCompositionV1) return;
  window.__stickersMnuStickerCompositionV1 = true;

  const VERSION = 'stickers-mnu-sticker-composition-1';
  const SLOT_ORDER = {
    topLeft: 'sticker-mnu-01',
    topCenter: 'sticker-mnu-04',
    topRight: 'sticker-mnu-02',
    middleLeft: 'sticker-mnu-07',
    center: 'sticker-mnu-05',
    middleRight: 'sticker-mnu-08',
    bottomLeft: 'sticker-mnu-06',
    bottomRight: 'sticker-mnu-03',
  };

  function filename(card) {
    const image = card?.querySelector('img');
    const source = image?.currentSrc || image?.getAttribute('src') || image?.src || '';
    try {
      return decodeURIComponent(source)
        .split(/[?#]/)[0]
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
        .toLowerCase();
    } catch {
      return source
        .split(/[?#]/)[0]
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
        .toLowerCase();
    }
  }

  function injectStyles() {
    document.getElementById('stickers-mnu-sticker-composition-style')?.remove();
    const style = document.createElement('style');
    style.id = 'stickers-mnu-sticker-composition-style';
    style.textContent = `
      .stk-project[data-stickers-project="mnu"] .stk-grid--stickers.stk-grid--mnu-composition {
        display: block !important;
      }

      .stk-mnu-composition {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr) minmax(0, 1fr);
        grid-template-areas:
          "top-left top-center top-right"
          "middle-left center middle-right"
          "bottom-left bottom-left bottom-right";
        align-items: center;
        gap: clamp(.8rem, 1.8vw, 1.6rem);
        width: 100%;
      }

      .stk-mnu-composition__slot {
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stk-mnu-composition__slot--top-left { grid-area: top-left; }
      .stk-mnu-composition__slot--top-center { grid-area: top-center; }
      .stk-mnu-composition__slot--top-right { grid-area: top-right; }
      .stk-mnu-composition__slot--middle-left { grid-area: middle-left; }
      .stk-mnu-composition__slot--center { grid-area: center; }
      .stk-mnu-composition__slot--middle-right { grid-area: middle-right; }
      .stk-mnu-composition__slot--bottom-left { grid-area: bottom-left; }
      .stk-mnu-composition__slot--bottom-right { grid-area: bottom-right; }

      .stk-mnu-composition__slot .stk-card {
        width: 100%;
        overflow: visible !important;
      }

      .stk-mnu-composition__slot .stk-card img {
        display: block;
        width: 100%;
        height: auto !important;
        max-height: none !important;
        object-fit: contain !important;
        background: transparent !important;
      }

      .stk-mnu-composition__slot--top-center .stk-card { width: min(82%, 17rem); }
      .stk-mnu-composition__slot--middle-left .stk-card,
      .stk-mnu-composition__slot--middle-right .stk-card { width: min(72%, 15rem); }
      .stk-mnu-composition__slot--center .stk-card { width: min(100%, 29rem); }
      .stk-mnu-composition__slot--bottom-left,
      .stk-mnu-composition__slot--bottom-right { align-self: start; }
      .stk-mnu-composition__slot--bottom-left .stk-card,
      .stk-mnu-composition__slot--bottom-right .stk-card { width: min(100%, 30rem); }

      .stk-mnu-composition__extras {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }

      @media (max-width: 760px) {
        .stk-mnu-composition {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-areas:
            "top-left top-right"
            "top-center top-center"
            "middle-left middle-right"
            "center center"
            "bottom-left bottom-right";
        }

        .stk-mnu-composition__slot--top-center .stk-card,
        .stk-mnu-composition__slot--middle-left .stk-card,
        .stk-mnu-composition__slot--middle-right .stk-card {
          width: 100%;
        }
      }

      @media (max-width: 520px) {
        .stk-mnu-composition {
          grid-template-columns: 1fr;
          grid-template-areas:
            "top-left"
            "top-center"
            "top-right"
            "middle-left"
            "center"
            "middle-right"
            "bottom-left"
            "bottom-right";
        }

        .stk-mnu-composition__extras {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.append(style);
  }

  function findCard(cards, wanted) {
    return cards.find((card) => {
      const name = filename(card);
      return name === wanted || name.endsWith(wanted) || name.includes(wanted);
    }) || null;
  }

  function createSlot(className, card) {
    const slot = document.createElement('div');
    slot.className = `stk-mnu-composition__slot stk-mnu-composition__slot--${className}`;
    if (card) slot.append(card);
    return slot;
  }

  function arrange(modal) {
    const mnu = modal.querySelector('.stk-project[data-stickers-project="mnu"]');
    const grid = mnu?.querySelector('.stk-grid--stickers');
    if (!grid || grid.dataset.mnuCompositionVersion === VERSION) return;

    const existing = grid.querySelector(':scope > .stk-mnu-composition');
    const cards = existing
      ? [...existing.querySelectorAll('.stk-card')]
      : [...grid.querySelectorAll(':scope > .stk-card')];
    if (!cards.length) return;

    const selected = {};
    Object.entries(SLOT_ORDER).forEach(([slot, wanted]) => {
      selected[slot] = findCard(cards, wanted);
    });

    const used = new Set(Object.values(selected).filter(Boolean));
    const remaining = cards.filter((card) => !used.has(card));
    const fallbackSlots = Object.keys(SLOT_ORDER).filter((slot) => !selected[slot]);
    fallbackSlots.forEach((slot) => {
      selected[slot] = remaining.shift() || null;
    });

    const composition = document.createElement('div');
    composition.className = 'stk-mnu-composition';
    composition.append(
      createSlot('top-left', selected.topLeft),
      createSlot('top-center', selected.topCenter),
      createSlot('top-right', selected.topRight),
      createSlot('middle-left', selected.middleLeft),
      createSlot('center', selected.center),
      createSlot('middle-right', selected.middleRight),
      createSlot('bottom-left', selected.bottomLeft),
      createSlot('bottom-right', selected.bottomRight),
    );

    grid.replaceChildren(composition);
    if (remaining.length) {
      const extras = document.createElement('div');
      extras.className = 'stk-mnu-composition__extras';
      extras.append(...remaining);
      grid.append(extras);
    }

    grid.classList.add('stk-grid--mnu-composition');
    grid.dataset.mnuCompositionVersion = VERSION;
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.stk-modal').forEach(arrange);
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

  window.addEventListener('load', schedule);
  apply();
})();
