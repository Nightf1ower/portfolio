(() => {
  // Disabled old dynamic GitHub API loader.
  // The Blandetto section is now handled by /blandetto-static.js to avoid mobile loading lockups.
  if (!document.querySelector('script[src^="/zny-gallery-v7.js"]')) {
    const script = document.createElement('script');
    script.src = '/zny-gallery-v7.js?v=zny-7';
    script.async = false;
    (document.currentScript || document.body).after(script);
  }
  if (!document.querySelector('script[src^="/fable-gallery.js"]')) {
    const script = document.createElement('script');
    script.src = '/fable-gallery.js?v=fable-2';
    script.async = false;
    (document.currentScript || document.body).after(script);
  }
  if (!document.querySelector('script[src^="/project9006-layout.js"]')) {
    const script = document.createElement('script');
    script.src = '/project9006-layout.js?v=9006-layout-1';
    script.async = false;
    (document.currentScript || document.body).after(script);
  }
  if (!document.querySelector('script[src^="/merch-gallery.js"]')) {
    const script = document.createElement('script');
    script.src = '/merch-gallery.js?v=merch-1';
    script.async = false;
    (document.currentScript || document.body).after(script);
  }

  const updateNavigation = () => {
    const language = localStorage.getItem('site-language') || 'en';
    const links = document.querySelectorAll('header nav a.nav-link');
    if (links.length < 4) return;
    const labels = language === 'ru'
      ? ['Проекты', 'Обо мне', 'Услуги', 'Контакты']
      : ['Projects', 'About', 'Services', 'Contact'];
    links.forEach((link, index) => {
      if (labels[index]) link.textContent = labels[index];
    });
  };

  const observer = new MutationObserver(updateNavigation);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  updateNavigation();
})();
