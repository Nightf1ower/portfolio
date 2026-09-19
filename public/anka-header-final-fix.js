(() => {
  if (window.__ankaHeaderFinalFixV1) return;
  window.__ankaHeaderFinalFixV1 = true;

  const VERSION = 'anka-header-final-fix-1';
  const MODAL_SELECTOR = '.anka-peresild-modal';

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function force(node, property, value) {
    if (!(node instanceof HTMLElement)) return;
    node.style.setProperty(property, value, 'important');
  }

  function closeFallback(modal) {
    window.setTimeout(() => {
      if (!(modal instanceof HTMLElement) || !modal.isConnected) return;

      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        cancelable: true,
      }));

      window.setTimeout(() => {
        if (!modal.isConnected) return;
        modal.remove();
        document.body.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('overflow');
      }, 80);
    }, 20);
  }

  function ensureHeader(modal) {
    if (!(modal instanceof HTMLElement)) return;

    const inner = modal.querySelector('.anka-peresild-inner') || modal;
    let head = modal.querySelector('.anka-peresild-head');

    if (!(head instanceof HTMLElement)) {
      head = document.createElement('div');
      head.className = 'anka-peresild-head';
      inner.prepend(head);
    } else if (head.parentElement !== inner || inner.firstElementChild !== head) {
      inner.prepend(head);
    }

    head.classList.remove('portfolio-flow-project-head-hidden');
    head.classList.add('anka-header-final');

    force(head, 'display', 'flex');
    force(head, 'position', 'sticky');
    force(head, 'top', '0px');
    force(head, 'left', 'auto');
    force(head, 'right', 'auto');
    force(head, 'z-index', '2300000');
    force(head, 'box-sizing', 'border-box');
    force(head, 'align-items', 'center');
    force(head, 'justify-content', 'space-between');
    force(head, 'gap', '1rem');
    force(head, 'width', '100%');
    force(head, 'height', '4rem');
    force(head, 'min-height', '4rem');
    force(head, 'max-height', '4rem');
    force(head, 'margin', '0px');
    force(head, 'padding', '0 clamp(1rem, 1.8vw, 2rem)');
    force(head, 'border', '0px');
    force(head, 'border-bottom', '1px solid rgba(5,5,5,.12)');
    force(head, 'background', '#ffffff');
    force(head, 'background-color', '#ffffff');
    force(head, 'color', '#050505');
    force(head, 'opacity', '1');
    force(head, 'visibility', 'visible');
    force(head, 'transform', 'none');

    let label = head.querySelector('.anka-peresild-label');
    if (!(label instanceof HTMLElement)) {
      label = document.createElement('p');
      label.className = 'anka-peresild-label';
      head.prepend(label);
    }
    label.textContent = 'ANKA PERESILD';

    force(label, 'display', 'inline-flex');
    force(label, 'align-items', 'center');
    force(label, 'height', '2.35rem');
    force(label, 'margin', '0px');
    force(label, 'padding', '0px');
    force(label, 'border', '0px');
    force(label, 'background', '#ffffff');
    force(label, 'background-color', '#ffffff');
    force(label, 'color', '#050505');
    force(label, 'font', '900 .68rem/1 Arial, Helvetica, sans-serif');
    force(label, 'letter-spacing', '.22em');
    force(label, 'text-transform', 'uppercase');
    force(label, 'opacity', '1');
    force(label, 'visibility', 'visible');

    let close = head.querySelector('.anka-peresild-close');
    if (!(close instanceof HTMLButtonElement)) {
      close = document.createElement('button');
      close.type = 'button';
      close.className = 'anka-peresild-close';
      head.append(close);
    }
    close.textContent = language() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';

    force(close, 'display', 'inline-flex');
    force(close, 'position', 'static');
    force(close, 'align-items', 'center');
    force(close, 'justify-content', 'center');
    force(close, 'width', 'auto');
    force(close, 'min-width', '6.5rem');
    force(close, 'height', '2.35rem');
    force(close, 'min-height', '2.35rem');
    force(close, 'max-height', '2.35rem');
    force(close, 'margin', '0px');
    force(close, 'padding', '0 1rem');
    force(close, 'border', '0px');
    force(close, 'background', '#050505');
    force(close, 'background-color', '#050505');
    force(close, 'color', '#ffffff');
    force(close, 'font', '900 .68rem/1 Arial, Helvetica, sans-serif');
    force(close, 'letter-spacing', '.22em');
    force(close, 'text-transform', 'uppercase');
    force(close, 'opacity', '1');
    force(close, 'visibility', 'visible');
    force(close, 'pointer-events', 'auto');
    force(close, 'cursor', 'pointer');
    force(close, 'transform', 'none');

    if (close.dataset.ankaFinalFallback !== VERSION) {
      close.dataset.ankaFinalFallback = VERSION;
      close.addEventListener('click', () => closeFallback(modal));
    }

    modal.dataset.ankaHeaderFinal = VERSION;
  }

  function apply() {
    document.querySelectorAll(MODAL_SELECTOR).forEach(ensureHeader);
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  }

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  document.addEventListener('click', (event) => {
    const card = event.target instanceof Element ? event.target.closest('#works article,#works button') : null;
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'ANKA PERESILD') return;
    [0, 60, 180, 420, 900].forEach((delay) => window.setTimeout(schedule, delay));
  }, true);

  apply();
  [80, 220, 600, 1200].forEach((delay) => window.setTimeout(schedule, delay));
})();
