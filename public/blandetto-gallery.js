(() => {
  // Disabled old dynamic GitHub API loader.
  // The Blandetto section is now handled by /blandetto-static.js to avoid mobile loading lockups.
  if (!document.querySelector('script[src^="/zny-gallery.js"]')) {
    const script = document.createElement('script');
    script.src = '/zny-gallery.js?v=zny-6';
    script.async = false;
    (document.currentScript || document.body).after(script);
  }
  if (!document.querySelector('script[src^="/fable-gallery.js"]')) {
    const script = document.createElement('script');
    script.src = '/fable-gallery.js?v=fable-2';
    script.async = false;
    (document.currentScript || document.body).after(script);
  }
})();
