(() => {
  if (window.__contactEmailRuntimeV2) return;
  window.__contactEmailRuntimeV2 = true;

  const EMAIL = 'Nightflowerrrrr@gmail.com';
  const isRussian = () => document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru';
  const aliases = new Map([
    ['f-able', 'fable'],
    ['pinkpunk', 'pink-punk'],
    ['carnival', 'carnival-records'],
    ['90-06', 'ninety-z-s'],
    ['9006', 'ninety-z-s'],
    ['ninety-zs', 'ninety-z-s'],
    ['covers', 'album-covers'],
    ['stayugly', 'stay-ugly'],
    ['anka', 'anka-peresild'],
    ['vtb', 'vtb-design-team'],
    ['collages', 'collages-photo-edit'],
  ]);

  function canonicalizeProjectAlias() {
    const url = new URL(location.href);
    const raw = String(url.searchParams.get('project') || '').trim().toLowerCase();
    const normalized = raw
      .replace(/[._|]+/g, '-')
      .replace(/[^a-zа-я0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
    const canonical = aliases.get(normalized);
    if (!canonical) return;
    url.searchParams.set('project', canonical);
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

  canonicalizeProjectAlias();

  function apply() {
    const contacts = document.getElementById('contacts');
    if (!contacts) return;
    contacts.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      const href = `mailto:${EMAIL}`;
      if (link.getAttribute('href') !== href) link.setAttribute('href', href);
      if (link.textContent?.trim() !== EMAIL) link.textContent = EMAIL;
      link.setAttribute('aria-label', `Email ${EMAIL}`);
    });
  }

  async function copyEmail(button) {
    let copied = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      copied = true;
    } catch {}
    if (!copied) {
      const area = document.createElement('textarea');
      area.value = EMAIL;
      area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.append(area);
      area.select();
      try { copied = document.execCommand('copy'); } catch {}
      area.remove();
    }
    button.textContent = copied ? (isRussian() ? 'EMAIL СКОПИРОВАН' : 'EMAIL COPIED') : (isRussian() ? 'СКОПИРОВАТЬ EMAIL' : 'COPY EMAIL');
    window.setTimeout(() => {
      if (button.isConnected) button.textContent = isRussian() ? 'СКОПИРОВАТЬ EMAIL' : 'COPY EMAIL';
    }, 1600);
  }

  window.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('.portfolio-copy-email') : null;
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    copyEmail(button);
  }, true);

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; apply(); });
  };
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('load', schedule, { once: true });
  [0, 80, 240, 700].forEach((delay) => setTimeout(schedule, delay));
})();
