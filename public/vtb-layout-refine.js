(() => {
  if (window.__vtbLayoutRefineV3) return;
  window.__vtbLayoutRefineV3 = true;

  const VERSION = 'vtb-layout-refine-3';
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

      .vtb-modal .vtb-merch-layout {
        width: 100% !important;
        max-width: none !important;
      }

      .vtb-modal .vtb-merch-grid--two {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: clamp(1rem, 2vw, 1.5rem) !important;
      }

      .vtb-modal .vtb-merch-grid--three {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: clamp(1rem, 2vw, 1.5rem) !important;
        margin-top: clamp(1rem, 2vw, 1.5rem) !important;
      }

      .vtb-modal .vtb-merch-layout .vtb-card {
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: visible !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      .vtb-modal .vtb-merch-layout .vtb-card img {
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        max-height: none !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        object-fit: contain !important;
        background: transparent !important;
        box-shadow: none !important;
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

        .vtb-modal .vtb-merch-grid--two,
        .vtb-modal .vtb-merch-grid--three {
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

  function averageCornerColor(context, width, height) {
    const size = Math.max(2, Math.round(Math.min(width, height) * 0.018));
    const samples = [
      [0, 0],
      [Math.max(0, width - size), 0],
      [0, Math.max(0, height - size)],
      [Math.max(0, width - size), Math.max(0, height - size)],
    ];

    let red = 0;
    let green = 0;
    let blue = 0;
    let count = 0;

    samples.forEach(([startX, startY]) => {
      const pixels = context.getImageData(startX, startY, size, size).data;
      for (let index = 0; index < pixels.length; index += 4) {
        if (pixels[index + 3] < 20) continue;
        red += pixels[index];
        green += pixels[index + 1];
        blue += pixels[index + 2];
        count += 1;
      }
    });

    return count
      ? [red / count, green / count, blue / count]
      : [255, 255, 255];
  }

  function cropMerchWhitespace(image) {
    if (!(image instanceof HTMLImageElement)) return;
    if (image.dataset.vtbMerchCrop === 'done' || image.dataset.vtbMerchCrop === 'working') return;

    if (!image.complete || !image.naturalWidth || !image.naturalHeight) {
      image.addEventListener('load', () => cropMerchWhitespace(image), { once: true });
      return;
    }

    image.dataset.vtbMerchCrop = 'working';

    try {
      const source = document.createElement('canvas');
      source.width = image.naturalWidth;
      source.height = image.naturalHeight;
      const context = source.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, 0, 0);

      const { data, width, height } = context.getImageData(0, 0, source.width, source.height);
      const [backgroundRed, backgroundGreen, backgroundBlue] = averageCornerColor(context, width, height);
      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const offset = (y * width + x) * 4;
          if (data[offset + 3] < 20) continue;

          const red = data[offset];
          const green = data[offset + 1];
          const blue = data[offset + 2];
          const difference = Math.sqrt(
            ((red - backgroundRed) ** 2)
            + ((green - backgroundGreen) ** 2)
            + ((blue - backgroundBlue) ** 2),
          );
          const brightness = (red + green + blue) / 3;

          if (difference > 24 || brightness < 232) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX < minX || maxY < minY) {
        image.dataset.vtbMerchCrop = 'done';
        return;
      }

      const horizontalPadding = Math.max(8, Math.round((maxX - minX + 1) * 0.045));
      const verticalPadding = Math.max(8, Math.round((maxY - minY + 1) * 0.045));
      minX = Math.max(0, minX - horizontalPadding);
      minY = Math.max(0, minY - verticalPadding);
      maxX = Math.min(width - 1, maxX + horizontalPadding);
      maxY = Math.min(height - 1, maxY + verticalPadding);

      const cropWidth = maxX - minX + 1;
      const cropHeight = maxY - minY + 1;
      const cropped = document.createElement('canvas');
      cropped.width = cropWidth;
      cropped.height = cropHeight;
      cropped.getContext('2d').drawImage(
        source,
        minX,
        minY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight,
      );

      image.dataset.vtbMerchCrop = 'done';
      image.src = cropped.toDataURL('image/webp', 0.94);
    } catch (error) {
      image.dataset.vtbMerchCrop = 'done';
      console.warn('[VTB] Merch crop skipped', error);
    }
  }

  function enhanceModal(modal) {
    if (!(modal instanceof HTMLElement)) return;

    const sections = [...modal.querySelectorAll('.vtb-section')];
    sections.forEach((section) => {
      const title = normalize(section.querySelector('.vtb-title')?.textContent);
      section.classList.toggle('vtb-merch-section', title === 'MERCH' || title === 'МЕРЧ');
    });

    modal.querySelectorAll('.vtb-merch-layout .vtb-card img').forEach(cropMerchWhitespace);

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
