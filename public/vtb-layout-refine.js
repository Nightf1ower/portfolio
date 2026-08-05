(() => {
  if (window.__vtbLayoutRefineV1) return;
  window.__vtbLayoutRefineV1 = true;

  const VERSION = 'vtb-layout-refine-1';
  const STYLE_ID = 'vtb-layout-refine-style';

  function installStyles() {
    const previous = document.getElementById(STYLE_ID);
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .vtb-modal {
        --vtb-edge: clamp(1rem, 2.4vw, 2.75rem);
        padding-left: var(--vtb-edge) !important;
        padding-right: var(--vtb-edge) !important;
      }

      .vtb-modal .vtb-inner {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
      }

      .vtb-modal .vtb-hero {
        padding-top: clamp(3.5rem, 7vw, 6rem) !important;
        padding-bottom: clamp(2.25rem, 4vw, 3.5rem) !important;
      }

      .vtb-modal .vtb-project-intro {
        box-sizing: border-box !important;
        width: 100% !important;
        padding: 0 0 clamp(1.75rem, 3.5vw, 3rem) !important;
      }

      .vtb-modal .vtb-project-intro__inner,
      .vtb-modal .vtb-print-copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
      }

      .vtb-modal .vtb-project-intro__title {
        margin: 0 0 .8rem !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: .72rem !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        letter-spacing: .28em !important;
        text-transform: uppercase !important;
      }

      .vtb-modal .vtb-project-intro__text,
      .vtb-modal .vtb-print-copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        margin-top: 0 !important;
        padding-right: clamp(0rem, 5vw, 6rem) !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: clamp(.96rem, 1.08vw, 1.16rem) !important;
        font-weight: 500 !important;
        line-height: 1.3 !important;
        letter-spacing: -.012em !important;
      }

      .vtb-modal .vtb-section {
        padding-top: clamp(2rem, 4vw, 3.5rem) !important;
        padding-bottom: clamp(2rem, 4vw, 3.5rem) !important;
      }

      .vtb-modal .vtb-project-intro + .vtb-section {
        padding-top: clamp(1.5rem, 3vw, 2.5rem) !important;
      }

      .vtb-modal .vtb-section-head {
        margin-bottom: clamp(.8rem, 1.5vw, 1.2rem) !important;
      }

      .vtb-modal .vtb-print-copy {
        margin-bottom: clamp(1.35rem, 2.5vw, 2.25rem) !important;
      }

      .vtb-modal .vtb-merch-section .vtb-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: clamp(1rem, 2vw, 1.5rem) !important;
      }

      .vtb-modal .vtb-merch-section .vtb-card,
      .vtb-modal .vtb-merch-section .vtb-card img {
        width: 100% !important;
        max-width: none !important;
        max-height: none !important;
        height: auto !important;
        padding: 0 !important;
        object-fit: contain !important;
        background: transparent !important;
      }

      .vtb-scroll-top {
        position: fixed !important;
        right: max(1rem, env(safe-area-inset-right)) !important;
        bottom: max(1rem, env(safe-area-inset-bottom)) !important;
        z-index: 970000 !important;
        display: grid !important;
        place-items: center !important;
        width: 3.5rem !important;
        height: 3.5rem !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 1px solid #050505 !important;
        background: #fff !important;
        color: #050505 !important;
        font: 900 1.55rem/1 Arial, Helvetica, sans-serif !important;
        cursor: pointer !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateY(.7rem) !important;
        transition: opacity .18s ease, transform .18s ease, visibility .18s ease !important;
      }

      .vtb-scroll-top.is-visible {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
      }

      @media (max-width: 700px) {
        .vtb-modal .vtb-project-intro__text,
        .vtb-modal .vtb-print-copy {
          padding-right: 0 !important;
          font-size: 1rem !important;
          line-height: 1.34 !important;
        }

        .vtb-modal .vtb-merch-section .vtb-grid {
          grid-template-columns: 1fr !important;
        }

        .vtb-scroll-top {
          width: 3.1rem !important;
          height: 3.1rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function normalize(value) {
    return String(value || '').trim().toUpperCase();
  }

  function enhanceModal(modal) {
    if (!(modal instanceof HTMLElement)) return;

    const sections = [...modal.querySelectorAll('.vtb-section')];
    sections.forEach((section) => {
      const title = normalize(section.querySelector('.vtb-title')?.textContent);
      section.classList.toggle('vtb-merch-section', title === 'MERCH');
    });

    let button = modal.querySelector(':scope > .vtb-scroll-top');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'vtb-scroll-top';
      button.textContent = '↑';
      button.setAttribute('aria-label', 'Back to top');
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        modal.scrollTo({ top: 0, behavior: 'smooth' });
      });
      modal.append(button);
    }

    if (modal.dataset.vtbScrollTopBound !== VERSION) {
      modal.dataset.vtbScrollTopBound = VERSION;
      const updateButton = () => {
        button.classList.toggle('is-visible', modal.scrollTop > 520);
      };
      modal.addEventListener('scroll', updateButton, { passive: true });
      updateButton();
    }
  }

  function apply() {
    installStyles();
    document.querySelectorAll('.vtb-modal').forEach(enhanceModal);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  schedule();
  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
