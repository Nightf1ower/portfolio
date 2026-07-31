(() => {
  if (window.__galleryFirstImageFixV3) return;
  window.__galleryFirstImageFixV3 = true;

  const style = document.createElement('style');
  style.id = 'gallery-first-image-fix-style';
  style.textContent = `
    .cr-card img,
    .pink-punk-frame img,
    [data-images] img,
    [data-hover-src] img,
    [data-worn-src] img,
    .cr-modal button img,
    .zny-modal button img,
    .fable-modal button img,
    .bf button img,
    .blandetto-modal button img,
    .bld-modal button img,
    .su-modal button img,
    .m10-modal button img,
    .merch9-modal button img,
    .project9006-modal button img,
    .pink-punk-fullscreen button img {
      pointer-events: none !important;
    }

    .bf-l {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-sizing: border-box !important;
      max-width: calc(100% - 7.5rem) !important;
      min-height: 1.65rem !important;
      margin: 0 !important;
      padding: .42rem .72rem !important;
      white-space: nowrap !important;
      overflow: visible !important;
      font-size: clamp(.48rem, 1.25vw, .68rem) !important;
      line-height: 1 !important;
      letter-spacing: clamp(.1em, .38vw, .2em) !important;
    }

    .bf-card .bf-main,
    .bf-card:hover .bf-main {
      opacity: 1 !important;
    }

    .bf-card .bf-hov {
      display: none !important;
      opacity: 0 !important;
    }

    #works .blandetto-title-fit {
      display: block !important;
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: 100% !important;
      margin-right: 0 !important;
      white-space: nowrap !important;
      overflow: visible !important;
      word-break: normal !important;
      overflow-wrap: normal !important;
      line-height: .84 !important;
      letter-spacing: -.075em !important;
      transform: none !important;
      transform-origin: left center !important;
    }

    @media (max-width: 650px) {
      .bf-l {
        max-width: calc(100% - 6.5rem) !important;
        font-size: .5rem !important;
        letter-spacing: .11em !important;
        padding: .4rem .55rem !important;
      }
    }
  `;
  document.getElementById('gallery-first-image-fix-style')?.remove();
  document.head.append(style);

  const observedTitles = new WeakSet();
  const titleResizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver(entries => {
        entries.forEach(entry => fitBlandettoTitle(entry.target));
      })
    : null;

  function fitBlandettoTitle(title) {
    if (!(title instanceof HTMLElement) || !title.isConnected) return;

    const container = title.parentElement;
    const availableWidth = Math.floor(container?.clientWidth || title.clientWidth || 0) - 2;
    if (availableWidth <= 0) return;

    title.classList.add('blandetto-title-fit');
    title.style.setProperty('font-size', '84px', 'important');

    let size = 84;
    while (title.scrollWidth > availableWidth && size > 20) {
      size -= 1;
      title.style.setProperty('font-size', `${size}px`, 'important');
    }

    if (title.scrollWidth > availableWidth) {
      const scale = Math.max(.72, availableWidth / title.scrollWidth);
      title.style.setProperty('transform', `scaleX(${scale})`, 'important');
      title.style.setProperty('width', `${100 / scale}%`, 'important');
    } else {
      title.style.setProperty('transform', 'none', 'important');
      title.style.setProperty('width', '100%', 'important');
    }
  }

  function bindBlandettoTitle(title) {
    if (observedTitles.has(title)) return;
    observedTitles.add(title);
    titleResizeObserver?.observe(title.parentElement || title);
    requestAnimationFrame(() => fitBlandettoTitle(title));
  }

  function updateBlandetto() {
    document.querySelectorAll('#works article, #works button').forEach(card => {
      const title = card.querySelector('h3');
      if (title?.textContent?.trim().toUpperCase() === 'BLANDETTO') {
        bindBlandettoTitle(title);
        fitBlandettoTitle(title);
      }
    });

    document.querySelectorAll('.bf').forEach(modal => {
      const prints = modal.querySelector('.bf-s[data-bf-section="prints"]');
      const cap = modal.querySelector('.bf-s[data-bf-section="cap"]');
      if (prints && cap && prints.nextElementSibling !== cap) prints.after(cap);

      modal.querySelectorAll('.bf-hov').forEach(image => image.remove());
      modal.querySelectorAll('.bf-card.has-hov').forEach(card => card.classList.remove('has-hov'));
    });
  }

  new MutationObserver(updateBlandetto).observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('#works .blandetto-title-fit').forEach(fitBlandettoTitle);
  }, { passive: true });

  updateBlandetto();
})();