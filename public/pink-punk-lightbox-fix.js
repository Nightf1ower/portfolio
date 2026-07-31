(() => {
  if (window.__pinkPunkLightboxFixV1) return;
  window.__pinkPunkLightboxFixV1 = true;

  let overlay = null;
  let images = [];
  let index = 0;
  let startX = 0;
  let startY = 0;

  const normalize = (value) => {
    if (!value) return '';
    try { return new URL(value, location.href).href; }
    catch { return String(value); }
  };

  const unique = (items) => [...new Set(items.map(normalize).filter(Boolean))];

  function cardImages(card) {
    return unique([...card.querySelectorAll('img')].map((img) => img.currentSrc || img.getAttribute('src')));
  }

  function sectionImages(section) {
    return [...section.querySelectorAll('.pink-punk-frame')]
      .map((card) => cardImages(card)[0])
      .filter(Boolean);
  }

  function close() {
    overlay?.remove();
    overlay = null;
    images = [];
    index = 0;
  }

  function draw(direction = 0) {
    if (!overlay || !images.length) return;
    const image = overlay.querySelector('.ppf-image');
    const counter = overlay.querySelector('.ppf-counter');
    image.style.opacity = '0';
    image.style.transform = `translateX(${direction * 18}px)`;
    setTimeout(() => {
      image.src = images[index];
      counter.textContent = `${index + 1} / ${images.length}`;
      requestAnimationFrame(() => {
        image.style.opacity = '1';
        image.style.transform = 'translateX(0)';
      });
    }, 45);
  }

  function step(amount) {
    if (images.length < 2) return;
    index = (index + amount + images.length) % images.length;
    draw(amount > 0 ? 1 : -1);
  }

  function open(items, startIndex = 0) {
    close();
    images = unique(items);
    if (!images.length) return;
    index = Math.max(0, Math.min(startIndex, images.length - 1));

    const root = document.createElement('div');
    root.className = `ppf-light${images.length < 2 ? ' is-single' : ''}`;
    root.innerHTML = `
      <button type="button" class="ppf-nav ppf-prev" aria-label="Previous image">←</button>
      <div class="ppf-stage"><img class="ppf-image" alt="" draggable="false"></div>
      <button type="button" class="ppf-nav ppf-next" aria-label="Next image">→</button>
      <button type="button" class="ppf-close">${document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE'}</button>
      <p class="ppf-counter"></p>
    `;

    root.querySelector('.ppf-prev').onclick = (event) => { event.stopPropagation(); step(-1); };
    root.querySelector('.ppf-next').onclick = (event) => { event.stopPropagation(); step(1); };
    root.querySelector('.ppf-close').onclick = (event) => { event.stopPropagation(); close(); };
    root.querySelector('.ppf-stage').onclick = (event) => event.stopPropagation();
    root.onclick = close;

    root.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    root.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) step(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.2) close();
    }, { passive: true });

    document.body.append(root);
    overlay = root;
    draw();
  }

  const style = document.createElement('style');
  style.id = 'pink-punk-lightbox-fix-style';
  style.textContent = `
    .ppf-light{position:fixed;inset:0;z-index:2100000;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(.6rem,2vw,1.35rem);padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));background:rgba(0,0,0,.97);color:#fff;touch-action:none}
    .ppf-stage{min-width:0;height:calc(100dvh - 2rem);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .ppf-image{display:block;max-width:100%;max-height:92dvh;width:auto;height:auto;object-fit:contain;transition:opacity .15s ease,transform .15s ease;user-select:none;-webkit-user-drag:none}
    .ppf-nav,.ppf-close{border:1px solid rgba(255,255,255,.8);border-radius:0;background:#050505;color:#fff;font-family:Arial,Helvetica,sans-serif;font-weight:900;cursor:pointer}
    .ppf-nav{width:3.35rem;height:3.35rem;font-size:1.5rem}
    .ppf-close{position:absolute;top:max(1rem,env(safe-area-inset-top));right:max(1rem,env(safe-area-inset-right));padding:.72rem .95rem;font-size:.68rem;letter-spacing:.2em}
    .ppf-counter{position:absolute;left:50%;bottom:max(1rem,env(safe-area-inset-bottom));transform:translateX(-50%);margin:0;padding:.45rem .68rem;background:#fff;color:#050505;font:900 .65rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em}
    .ppf-light.is-single .ppf-nav{visibility:hidden;pointer-events:none}
    @media (hover:none),(pointer:coarse),(max-width:700px){.ppf-light{grid-template-columns:1fr;padding:.75rem}.ppf-nav{display:none!important}.ppf-stage{height:calc(100dvh - 1.5rem)}}
  `;
  document.head.append(style);

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.ppf-light')) return;
    const modal = event.target.closest('.pink-punk-fullscreen');
    const card = event.target.closest('.pink-punk-frame');
    if (!modal || !card) return;

    const own = cardImages(card);
    let items = own;
    let startIndex = 0;

    if (own.length <= 1) {
      const section = card.closest('.pink-punk-section__grid, .pink-punk-section');
      items = section ? sectionImages(section) : own;
      const clicked = own[0];
      startIndex = Math.max(0, items.indexOf(clicked));
    }

    if (!items.length) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    open(items, startIndex);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (!overlay) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); close(); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); event.stopImmediatePropagation(); step(-1); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); event.stopImmediatePropagation(); step(1); }
  }, true);
})();