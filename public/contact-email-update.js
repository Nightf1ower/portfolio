(() => {
  if (window.__contactEmailUpdateV1) return;
  window.__contactEmailUpdateV1 = true;

  const EMAIL = 'Nightflowerrrrr@gmail.com';
  const OLD_EMAILS = new Set(['nightf1ower@yandex.ru']);

  function apply(root = document) {
    const contacts = root instanceof Element && root.id === 'contacts'
      ? root
      : root.querySelector?.('#contacts') || document.getElementById('contacts');
    if (!contacts) return false;

    contacts.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      const hrefEmail = decodeURIComponent((link.getAttribute('href') || '').slice(7)).trim().toLowerCase();
      const textEmail = (link.textContent || '').trim().toLowerCase();
      if (OLD_EMAILS.has(hrefEmail) || OLD_EMAILS.has(textEmail) || textEmail.includes('@')) {
        link.href = `mailto:${EMAIL}`;
        link.textContent = EMAIL;
        link.setAttribute('aria-label', `Email ${EMAIL}`);
      }
    });

    contacts.querySelectorAll('[data-email]').forEach((node) => {
      node.dataset.email = EMAIL;
    });

    return true;
  }

  let scheduled = false;
  function schedule(root = document) {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply(root);
    });
  }

  const observer = new MutationObserver((records) => {
    const relevant = records.some((record) => {
      const target = record.target instanceof Element ? record.target : record.target.parentElement;
      if (target?.closest?.('#contacts')) return true;
      return [...record.addedNodes].some((node) => node instanceof Element && (node.id === 'contacts' || node.querySelector?.('#contacts')));
    });
    if (relevant) schedule();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', () => schedule(), { once: true });
  [0, 80, 240, 700].forEach((delay) => setTimeout(() => schedule(), delay));
})();
