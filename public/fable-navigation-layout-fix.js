(() => {
  if (window.__fableNavigationLayoutFixV1) return;
  window.__fableNavigationLayoutFixV1 = true;

  const STYLE_ID = 'fable-navigation-layout-fix-style';

  function injectStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .fable-section-head {
        position: relative !important;
        display: block !important;
        width: 100% !important;
        padding-right: 5.5rem !important;
      }

      .fable-title {
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        font-size: clamp(2.65rem, 5.35vw, 5.85rem) !important;
        line-height: .88 !important;
        letter-spacing: -.06em !important;
        white-space: nowrap !important;
        overflow-wrap: normal !important;
        word-break: normal !important;
      }

      .fable-count {
        position: absolute !important;
        top: .55rem !important;
        right: 0 !important;
        margin: 0 !important;
      }

      .fable-scroll-top {
        position: fixed;
        z-index: 940000;
        right: max(1rem, env(safe-area-inset-right));
        bottom: max(1rem, env(safe-area-inset-bottom));
        display: grid;
        place-items: center;
        width: 3.35rem;
        height: 3.35rem;
        padding: 0;
        border: 1px solid #050505;
        background: #fff;
        color: #050505;
        font: 900 1.5rem/1 Arial, Helvetica, sans-serif;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transform: translateY(.75rem);
        transition: opacity .18s ease, transform .18s ease, background .18s ease, color .18s ease;
      }

      .fable-scroll-top.is-visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      .fable-scroll-top:hover {
        background: #050505;
        color: #fff;
      }

      @media (max-width: 760px) {
        .fable-section-head {
          padding-right: 0 !important;
        }

        .fable-title {
          font-size: clamp(2.45rem, 8.8vw, 4.5rem) !important;
          line-height: .9 !important;
          white-space: normal !important;
          text-wrap: balance;
        }

        .fable-count {
          position: static !important;
          margin-top: .75rem !important;
        }

        .fable-scroll-top {
          width: 3rem;
          height: 3rem;
        }
      }
    `;
    document.head.append(style);
  }

  function mountScrollButton() {
    const modal = document.querySelector('.fable-modal');
    if (!modal || modal.querySelector('.fable-scroll-top')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'fable-scroll-top';
    button.textContent = '↑';
    button.setAttribute('aria-label', 'Scroll to top');

    const syncVisibility = () => {
      button.classList.toggle('is-visible', modal.scrollTop > 500);
    };

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      modal.scrollTo({ top: 0, behavior: 'smooth' });
    });

    modal.addEventListener('scroll', syncVisibility, { passive: true });
    modal.append(button);
    syncVisibility();
  }

  injectStyles();
  mountScrollButton();

  new MutationObserver(mountScrollButton).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
