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

  loadScript('script[src^="/portfolio-static-assets.js"]', '/portfolio-static-assets.js?v=static-assets-2');
  loadScript('script[src^="/portfolio-image-performance.js"]', '/portfolio-image-performance.js?v=portfolio-image-performance-1');
  loadScript('script[src^="/image-asset-fallback.js"]', '/image-asset-fallback.js?v=image-asset-fallback-1');
  loadScript('script[src^="/global-modal-header-fix.js"]', '/global-modal-header-fix.js?v=modal-head-6');
  loadScript('script[src^="/project-unified-lightbox.js"]', '/project-unified-lightbox.js?v=project-unified-lightbox-1');
  loadScript('script[src^="/pink-punk-lightbox-fix.js"]', '/pink-punk-lightbox-fix.js?v=pink-punk-lightbox-fix-2');
  loadScript('script[src^="/carnival-records-click-guard.js"]', '/carnival-records-click-guard.js?v=carnival-click-guard-1');
  loadScript('script[src^="/project-swipe-gallery.js"]', '/project-swipe-gallery.js?v=swipe-gallery-3');
  loadScript('script[src^="/gallery-first-image-fix.js"]', '/gallery-first-image-fix.js?v=first-image-4');
  loadScript('script[src^="/blandetto-logo-section-fix.js"]', '/blandetto-logo-section-fix.js?v=blandetto-logo-section-fix-3');
  loadScript('script[src^="/project-modal-controls.js"]', '/project-modal-controls.js?v=modal-controls-4');
  loadScript('script[src^="/homepage-polish-v2.js"]', '/homepage-polish-v2.js?v=homepage-polish-4');
  loadScript('script[src^="/posters-gallery-fast.js"]', '/posters-gallery-fast.js?v=posters-fast-1');
  loadScript('script[src^="/album-covers-gallery.js"]', '/album-covers-gallery.js?v=album-covers-2');
  loadScript('script[src^="/album-covers-description.js"]', '/album-covers-description.js?v=album-covers-description-1');
  loadScript('script[src^="/carnival-records-bootstrap.js"]', '/carnival-records-bootstrap.js?v=carnival-bootstrap-1');
  loadScript('script[src^="/carnival-records-gallery.js"]', '/carnival-records-gallery.js?v=carnival-2');
  loadScript('script[src^="/carnival-records-native-layout.js"]', '/carnival-records-native-layout.js?v=carnival-native-3');
  loadScript('script[src^="/carnival-records-final-copy.js"]', '/carnival-records-final-copy.js?v=carnival-final-copy-1');
  loadScript('script[src^="/carnival-records-cleanup.js"]', '/carnival-records-cleanup.js?v=carnival-cleanup-6');
  loadScript('script[src^="/zny-gallery-v7.js"]', '/zny-gallery-v7.js?v=zny-9');
  loadScript('script[src^="/zny-print-order.js"]', '/zny-print-order.js?v=zny-print-order-1');
  loadScript('script[src^="/fable-gallery.js"]', '/fable-gallery.js?v=fable-9');
  loadScript('script[src^="/fable-gradient-line-fix.js"]', '/fable-gradient-line-fix.js?v=fable-gradient-line-fix-2');
  loadScript('script[src^="/fable-navigation-layout-fix.js"]', '/fable-navigation-layout-fix.js?v=fable-navigation-layout-2');
  loadScript('script[src^="/project9006-layout.js"]', '/project9006-layout.js?v=9006-layout-5');
  loadScript('script[src^="/project9006-final-fix.js"]', '/project9006-final-fix.js?v=9006-final-fix-1');
  loadScript('script[src^="/vtb-design-team-gallery.js"]', '/vtb-design-team-gallery.js?v=vtb-gallery-1');
  loadScript('script[src^="/collages-gallery.js"]', '/collages-gallery.js?v=collages-gallery-1');
  loadScript('script[src^="/project-card-layout-v5.js"]', '/project-card-layout-v5.js?v=project-card-layout-5');
  loadScript('script[src^="/project-card-previews-v1.js"]', '/project-card-previews-v1.js?v=project-card-previews-1');
  loadScript('script[src^="/vtb-placeholder-disable.js"]', '/vtb-placeholder-disable.js?v=vtb-placeholder-disable-1');
  loadScript('script[src^="/collages-english-only.js"]', '/collages-english-only.js?v=collages-english-only-1');
  loadScript('script[src^="/pink-punk-layout.js"]', '/pink-punk-layout.js?v=pink-layout-4');
  loadScript('script[src^="/gradient-layer-fix.js"]', '/gradient-layer-fix.js?v=gradient-layer-2');
  loadScript('script[src^="/portfolio-polish-v1.js"]', '/portfolio-polish-v1.js?v=portfolio-polish-1');
  loadScript('script[src^="/merch-performance-boost.js"]', '/merch-performance-boost.js?v=merch-performance-boost-1');
  loadScript('script[src^="/merch-ui-performance-v12.js"]', '/merch-ui-performance-v12.js?v=merch-ui-13');
  loadScript('script[src^="/merch-gallery-v10.js"]', '/merch-gallery-v10.js?v=merch-16');
  loadScript('script[src^="/merch-mobile-layout-fix.js"]', '/merch-mobile-layout-fix.js?v=merch-mobile-fix-4');
  loadScript('script[src^="/merch-stability-restore.js"]', '/merch-stability-restore.js?v=merch-stability-restore-3');
  loadScript('script[src^="/merch-copy-update.js"]', '/merch-copy-update.js?v=merch-copy-update-1');
  loadScript('script[src^="/merch-layout-update-v3.js"]', '/merch-layout-update-v3.js?v=merch-layout-update-3');
  loadScript('script[src^="/nightflower-playroom-placeholder.js"]', '/nightflower-playroom-placeholder.js?v=playground-placeholder-2');
  loadScript('script[src^="/font-panic-override.js"]', '/font-panic-override.js?v=font-panic-2');
  loadScript('script[src^="/mobile-touch-gallery-fix.js"]', '/mobile-touch-gallery-fix.js?v=touch-gallery-2');
  loadScript('script[src^="/portfolio-unified-style.js"]', '/portfolio-unified-style.js?v=portfolio-unified-style-2');
  loadScript('script[src^="/project-spacing-system.js"]', '/project-spacing-system.js?v=project-spacing-system-1');

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