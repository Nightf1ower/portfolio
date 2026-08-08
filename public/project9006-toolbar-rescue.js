(() => {
  if (window.__project9006ToolbarRescueV3) return;
  window.__project9006ToolbarRescueV3 = true;

  const VERSION = 'toolbar-rescue-3';
  const STYLE_ID = 'project9006-toolbar-rescue-style';

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
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
        margin: 0 !important;
        border: 0 !important;
        background: #fff !important;
        color: #050505 !important;
        box-shadow: none !important;
      }

      .project9006-modal .project9006-brand {
        padding-top: clamp(7rem,10vw,9rem) !important;
        padding-bottom: clamp(2rem,3.5vw,3.25rem) !important;
      }

      .project9006-modal .project9006-identity-tight {
        margin-top: 0 !important;
        padding-top: clamp(1.5rem,3vw,2.75rem) !important;
      }

      .project9006-modal .project9006-logo-pair {
        align-items: start !important;
      }

      .project9006-modal .project9006-logo-card {
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        aspect-ratio: auto !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: visible !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      .project9006-modal .project9006-logo-card img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        object-fit: contain !important;
        transform: none !important;
      }

      .project9006-modal section {
        content-visibility: auto;
        contain-intrinsic-size: auto 900px;
      }

      @media (max-width: 650px) {
        .project9006-modal .project9006-brand {
          padding-bottom: 1.75rem !important;
        }
        .project9006-modal .project9006-identity-tight {
          padding-top: 1.25rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function cropOuterWhite(img) {
    if (!(img instanceof HTMLImageElement)) return;
    if (img.dataset.project9006Crop === 'done' || img.dataset.project9006Crop === 'working') return;

    if (!img.complete || !img.naturalWidth || !img.naturalHeight) {
      img.addEventListener('load', () => scheduleCrop(img), { once: true });
      return;
    }

    img.dataset.project9006Crop = 'working';

    try {
      const source = document.createElement('canvas');
      source.width = img.naturalWidth;
      source.height = img.naturalHeight;
      const sourceContext = source.getContext('2d', { willReadFrequently: true });
      sourceContext.drawImage(img, 0, 0);

      const { data, width, height } = sourceContext.getImageData(0, 0, source.width, source.height);
      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const offset = (y * width + x) * 4;
          if (data[offset + 3] < 20) continue;
          const brightness = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;
          if (brightness < 232) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX < minX || maxY < minY) {
        img.dataset.project9006Crop = 'done';
        return;
      }

      const padding = Math.max(3, Math.round(Math.max(width, height) * 0.006));
      minX = Math.max(0, minX - padding);
      minY = Math.max(0, minY - padding);
      maxX = Math.min(width - 1, maxX + padding);
      maxY = Math.min(height - 1, maxY + padding);

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

      img.dataset.project9006Crop = 'done';
      img.src = cropped.toDataURL('image/webp', 0.9);
    } catch (error) {
      img.dataset.project9006Crop = 'done';
      console.warn('[NINETY Z S] Logo crop skipped', error);
    }
  }

  function scheduleCrop(img) {
    const run = () => cropOuterWhite(img);
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 1200 });
    } else {
      window.setTimeout(run, 180);
    }
  }

  function rescueModal(modal, allowCrop = true) {
    if (!(modal instanceof HTMLElement)) return false;
    installStyles();

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

    const identity = [...modal.querySelectorAll('section')].find((section) => {
      const title = String(section.querySelector('h3')?.textContent || '').trim().toUpperCase();
      return title === 'VISUAL IDENTITY & LOGO DESIGN' || title === 'АЙДЕНТИКА И ЛОГОТИП';
    });
    identity?.classList.add('project9006-identity-tight');

    modal.querySelectorAll('img').forEach((img) => {
      if (!img.loading) img.loading = 'lazy';
      img.decoding = 'async';
      if (!img.closest('.project9006-brand,.project9006-toolbar')) img.fetchPriority = 'low';
    });

    if (allowCrop && modal.dataset.project9006CropQueued !== VERSION) {
      modal.dataset.project9006CropQueued = VERSION;
      [...modal.querySelectorAll('.project9006-logo-card img')].forEach((img, index) => {
        window.setTimeout(() => scheduleCrop(img), index * 120);
      });
    }

    modal.dataset.project9006Rescued = VERSION;
    return true;
  }

  function rescueExisting(allowCrop = true) {
    return rescueModal(document.querySelector('.project9006-modal'), allowCrop);
  }

  function rescueAfterOpen() {
    [0, 60, 180, 420].forEach((delay, index) => {
      window.setTimeout(() => rescueExisting(index === 3), delay);
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const card = target?.closest('#works article,#works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'NINETY Z S' || title === '90.06') rescueAfterOpen();

    if (target?.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) {
      window.setTimeout(() => rescueExisting(false), 0);
      window.setTimeout(() => rescueExisting(false), 120);
    }
  }, true);

  window.addEventListener('load', () => rescueExisting(false), { once: true });
  installStyles();
})();
