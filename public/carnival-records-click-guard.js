(() => {
  if (window.__carnivalRecordsClickGuardV5) return;
  window.__carnivalRecordsClickGuardV5 = true;

  const CLASS = 'cr-block-lightbox';
  let overlay = null;
  let sources = [];
  let index = 0;
  let bodyOverflow = '';
  let htmlOverflow = '';

  const normalize = (value) => {
    if (!value) return '';
    try { return new URL(String(value), location.href).href; }
    catch { return String(value); }
  };
  const unique = (values) => [...new Set(values.map(normalize).filter(Boolean))];
  const imageSource = (image) => normalize(image?.currentSrc || image?.getAttribute('src') || '');

  function visibleImage(card) {
    const active = card.querySelector('.cr-img.active');
    if (active) return active;
    const images = [...card.querySelectorAll('.cr-img, img')];
    return images.find((image) => {
      const css = getComputedStyle(image);
      return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) > 0;
    }) || images[0] || null;
  }

  function galleryFor(card, clickedImage) {
    const section = card.closest('.cr-section');
    if (!section) return { sources: [], index: 0 };
    const cards = [...section.querySelectorAll('.cr-card')];
    const items = unique(cards.map((item) => imageSource(visibleImage(item))));
    const clicked = imageSource(clickedImage || visibleImage(card));
    return { sources: items, index: Math.max(0, items.indexOf(clicked)) };
  }

  function unlock() {
    document.body.style.overflow = bodyOverflow;
    document.documentElement.style.overflow = htmlOverflow;
  }

  function close() {
    overlay?.remove();
    overlay = null;
    sources = [];
    index = 0;
    unlock();
  }

  function draw() {
    if (!overlay || !sources.length) return;
    overlay.querySelector('.cr-block-image').src = sources[index];
    overlay.querySelector('.cr-block-counter').textContent = `${index + 1} / ${sources.length}`;
  }

  function step(amount) {
    if (sources.length < 2) return;
    index = (index + amount + sources.length) % sources.length;
    draw();
  }

  function open(items, start) {
    close();
    document.querySelectorAll('.cr-light,.crfix-light,.cr-group-lightbox,.cr-native-gallery,.psg-lightbox,.pul-overlay')
      .forEach((node) => node.remove());

    sources = unique(items);
    if (!sources.length) return;
    index = Math.max(0, Math.min(start, sources.length - 1));

    const root = document.createElement('div');
    root.className = `${CLASS}${sources.length < 2 ? ' is-single' : ''}`;
    root.innerHTML = `
      <button type="button" class="cr-block-nav cr-block-prev">←</button>
      <div class="cr-block-stage"><img class="cr-block-image" alt="" draggable="false"></div>
      <button type="button" class="cr-block-nav cr-block-next">→</button>
      <button type="button" class="cr-block-close">${document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE'}</button>
      <p class="cr-block-counter"></p>
    `;

    root.querySelector('.cr-block-prev').onclick = (event) => { event.stopPropagation(); step(-1); };
    root.querySelector('.cr-block-next').onclick = (event) => { event.stopPropagation(); step(1); };
    root.querySelector('.cr-block-close').onclick = (event) => { event.stopPropagation(); close(); };

    const stage = root.querySelector('.cr-block-stage');
    stage.onclick = (event) => event.stopPropagation();
    let startX = 0;
    let startY = 0;
    let pointerId = null;

    stage.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      stage.setPointerCapture?.(pointerId);
    });
    stage.addEventListener('pointerup', (event) => {
      if (pointerId !== event.pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      pointerId = null;
      if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.1) step(dx < 0 ? 1 : -1);
    });
    stage.addEventListener('pointercancel', () => { pointerId = null; });
    root.onclick = (event) => { if (event.target === root) close(); };

    bodyOverflow = document.body.style.overflow;
    htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.append(root);
    overlay = root;
    draw();
  }

  document.getElementById('carnival-block-lightbox-style')?.remove();
  const style = document.createElement('style');
  style.id = 'carnival-block-lightbox-style';
  style.textContent = `
    .${CLASS}{position:fixed;inset:0;z-index:3200000;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:1rem;padding:1rem;background:rgba(0,0,0,.97);color:#fff;touch-action:none;overscroll-behavior:none}
    .cr-block-stage{min-width:0;height:calc(100dvh - 2rem);display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:grab;touch-action:none}
    .cr-block-image{display:block;max-width:100%;max-height:92dvh;width:auto;height:auto;object-fit:contain;user-select:none;-webkit-user-drag:none;pointer-events:none}
    .cr-block-nav,.cr-block-close{border:1px solid rgba(255,255,255,.86);border-radius:0;background:#050505;color:#fff;font-family:Arial,Helvetica,sans-serif;font-weight:900;cursor:pointer}
    .cr-block-nav{width:3.35rem;height:3.35rem;font-size:1.5rem}
    .cr-block-close{position:absolute;top:1rem;right:1rem;padding:.72rem .95rem;font-size:.68rem;letter-spacing:.2em}
    .cr-block-counter{position:absolute;left:50%;bottom:1rem;transform:translateX(-50%);margin:0;padding:.45rem .68rem;background:#fff;color:#050505;font:900 .65rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em}
    .${CLASS}.is-single .cr-block-nav{visibility:hidden;pointer-events:none}
    @media(max-width:700px),(hover:none),(pointer:coarse){.${CLASS}{grid-template-columns:1fr;padding:.75rem}.cr-block-nav{display:none!important}.cr-block-stage{height:calc(100dvh - 1.5rem)}}
  `;
  document.head.append(style);

  window.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(`.${CLASS}`)) return;

    const modal = event.target.closest('.cr-modal');
    if (!modal) return;
    if (event.target.closest('.cr-close,.cr-light-close,.cr-nav,.project-scroll-top,a,input,select,textarea')) return;

    const image = event.target.closest('.cr-card img');
    if (!image) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }

    const card = image.closest('.cr-card');
    const gallery = galleryFor(card, image);
    if (!gallery.sources.length) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    open(gallery.sources, gallery.index);
  }, true);

  window.addEventListener('keydown', (event) => {
    if (!overlay) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
  }, true);
})();