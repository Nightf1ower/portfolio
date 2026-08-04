(() => {
  if (window.__merchStabilityRestoreV4) return;
  window.__merchStabilityRestoreV4 = true;

  const STYLE_ID = 'merch-stability-restore-style';
  const resizeObservers = new WeakMap();

  function injectStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html:has(.m10-modal),
      body:has(.m10-modal),
      .m10-modal {
        background-color: #87CEEB !important;
        background-image: none !important;
      }

      .m10-modal {
        isolation: isolate !important;
      }

      .m10-modal::before {
        content: '';
        position: absolute;
        z-index: 0;
        top: var(--merch-gradient-top, 0px);
        right: 0;
        left: 0;
        width: 100%;
        height: var(--merch-gradient-height, 0px);
        pointer-events: none;
        opacity: 0;
        background: linear-gradient(
          180deg,
          #87CEEB 0%,
          #87CEEB 8%,
          #8cc9e3 18%,
          #9cbdd3 30%,
          #b0a9bc 43%,
          #c58e9d 57%,
          #d67478 70%,
          #df5559 84%,
          #e5312b 100%
        );
      }

      .m10-modal[data-merch-gradient-ready='true']::before {
        opacity: 1;
      }

      .m10-modal > .m10-inner {
        position: relative !important;
        z-index: 1 !important;
      }

      .m10-section.is-billboards {
        position: relative !important;
        z-index: auto !important;
        isolation: auto !important;
        margin-bottom: 0 !important;
        padding-bottom: clamp(7rem, 12vw, 12rem) !important;
        background: transparent !important;
      }

      .m10-section.is-billboards::before {
        display: none !important;
        content: none !important;
      }

      .m10-dxs-zone {
        margin-top: 0 !important;
        padding-top: clamp(7rem, 12vw, 11rem) !important;
        background-color: #ef2b27 !important;
        background-image: linear-gradient(
          180deg,
          #e5312b 0%,
          #e83d34 30%,
          #eb352e 62%,
          #ef2b27 100%
        ) !important;
        background-size: 100% clamp(15rem, 24vw, 23rem) !important;
        background-position: top center !important;
        background-repeat: no-repeat !important;
      }

      @media (max-width: 700px) {
        .m10-section.is-billboards {
          padding-bottom: 6rem !important;
        }

        .m10-dxs-zone {
          padding-top: 6rem !important;
          background-size: 100% 13rem !important;
        }
      }
    `;

    document.head.append(style);
  }

  function updateGradient(modal, billboardSection, dxsZone) {
    if (!(modal instanceof Element) || !(billboardSection instanceof Element) || !(dxsZone instanceof Element)) return;

    const modalRect = modal.getBoundingClientRect();
    const billboardRect = billboardSection.getBoundingClientRect();
    const dxsRect = dxsZone.getBoundingClientRect();
    const scrollTop = modal.scrollTop || 0;
    const top = Math.max(0, billboardRect.top - modalRect.top + scrollTop);
    const height = Math.max(1, dxsRect.top - billboardRect.top);

    modal.style.setProperty('--merch-gradient-top', `${top}px`);
    modal.style.setProperty('--merch-gradient-height', `${height + 2}px`);
    modal.dataset.merchGradientReady = 'true';
  }

  function observeGradient(modal, billboardSection, dxsZone) {
    resizeObservers.get(modal)?.disconnect();

    if (typeof ResizeObserver !== 'function') return;
    const observer = new ResizeObserver(() => updateGradient(modal, billboardSection, dxsZone));
    observer.observe(modal);
    observer.observe(billboardSection);
    observer.observe(dxsZone);
    resizeObservers.set(modal, observer);
  }

  function markBillboards(modal) {
    if (!(modal instanceof Element)) return;

    const sections = [...modal.querySelectorAll('.m10-section')];
    let billboardSection = sections.find((section) => {
      const title = section.querySelector('.m10-section-title')?.textContent?.trim().toUpperCase() || '';
      return title.includes('BILLBOARD');
    });

    const dxsZone = modal.querySelector('.m10-dxs-zone');

    if (!billboardSection) {
      const previous = dxsZone?.previousElementSibling;
      if (previous?.classList.contains('m10-section')) billboardSection = previous;
    }

    sections.forEach((section) => section.classList.toggle('is-billboards', section === billboardSection));

    if (billboardSection && dxsZone) {
      updateGradient(modal, billboardSection, dxsZone);
      observeGradient(modal, billboardSection, dxsZone);
    }
  }

  function restoreImages(modal) {
    if (!(modal instanceof Element)) return;

    const images = [...modal.querySelectorAll('img')];

    images.forEach((image, index) => {
      const deferredSource = image.dataset.merchLazySrc;

      if (deferredSource) {
        delete image.dataset.merchLazySrc;
        image.setAttribute('src', deferredSource);
      }

      image.loading = 'lazy';
      image.decoding = 'async';
      try { image.fetchPriority = index < 2 ? 'high' : 'low'; } catch {}
    });
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.m10-modal').forEach((modal) => {
      markBillboards(modal);
      restoreImages(modal);
    });
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
  document.addEventListener('load', schedule, true);

  apply();
})();
