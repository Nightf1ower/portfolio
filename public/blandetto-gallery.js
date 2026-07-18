(() => {
  // Disabled old dynamic GitHub API loader.
  // The Blandetto section is now handled by /blandetto-static.js to avoid mobile loading lockups.
  const loadScript = (selector, src) => {
    if (document.querySelector(selector)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    (document.currentScript || document.body).after(script);
  };

  loadScript('script[src^="/zny-gallery-v7.js"]', '/zny-gallery-v7.js?v=zny-7');
  loadScript('script[src^="/fable-gallery.js"]', '/fable-gallery.js?v=fable-2');
  loadScript('script[src^="/project9006-layout.js"]', '/project9006-layout.js?v=9006-layout-1');
  loadScript('script[src^="/merch-gallery-v4.js"]', '/merch-gallery-v4.js?v=merch-8');

  const updateNavigation = () => {
    const language = localStorage.getItem('site-language') || 'en';
    const links = document.querySelectorAll('header nav a.nav-link');
    if (links.length < 4) return false;

    const labels = language === 'ru'
      ? ['Проекты', 'Обо мне', 'Услуги', 'Контакты']
      : ['Projects', 'About', 'Services', 'Contact'];

    links.forEach((link, index) => {
      if (labels[index] && link.textContent !== labels[index]) {
        link.textContent = labels[index];
      }
    });
    return true;
  };

  if (!updateNavigation()) {
    const observer = new MutationObserver(() => {
      if (updateNavigation()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(updateNavigation, 0);
    }
  });
})();