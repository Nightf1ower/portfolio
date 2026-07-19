(() => {
  if (window.__nightflowerPlaygroundMountFixLoaded) return;
  window.__nightflowerPlaygroundMountFixLoaded = true;

  let observer = null;

  const movePlaygroundOutsideReact = () => {
    const root = document.getElementById('root');
    const playground = document.getElementById('nightflower-playground');
    if (!root || !playground) return false;
    if (root.nextElementSibling !== playground) root.insertAdjacentElement('afterend', playground);
    observer?.disconnect();
    observer = null;
    return true;
  };

  if (!movePlaygroundOutsideReact()) {
    observer = new MutationObserver(() => movePlaygroundOutsideReact());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener('load', movePlaygroundOutsideReact, { once: true });
})();