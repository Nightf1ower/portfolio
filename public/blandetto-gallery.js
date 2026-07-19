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

  loadScript('script[src^="/global-modal-header-fix.js"]', '/global-modal-header-fix.js?v=modal-head-2');
  loadScript('script[src^="/zny-gallery-v7.js"]', '/zny-gallery-v7.js?v=zny-8');
  loadScript('script[src^="/fable-gallery.js"]', '/fable-gallery.js?v=fable-2');
  loadScript('script[src^="/project9006-layout.js"]', '/project9006-layout.js?v=9006-layout-1');
  loadScript('script[src^="/merch-ui-performance-v12.js"]', '/merch-ui-performance-v12.js?v=merch-ui-13');
  loadScript('script[src^="/merch-gallery-v10.js"]', '/merch-gallery-v10.js?v=merch-13');
  loadScript('script[src^="/nightflower-playground.js"]', '/nightflower-playground.js?v=playground-1');
  loadScript('script[src^="/nightflower-playground-mount-fix.js"]', '/nightflower-playground-mount-fix.js?v=playground-1');
  loadScript('script[src^="/font-panic-override.js"]', '/font-panic-override.js?v=font-panic-2');

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