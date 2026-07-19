(() => {
  if (window.__nightflowerPlaygroundMountFixLoaded) return;
  window.__nightflowerPlaygroundMountFixLoaded = true;

  const movePlaygroundOutsideReact = () => {
    const root = document.getElementById('root');
    const playground = document.getElementById('nightflower-playground');
    if (!root || !playground) return false;
    if (root.nextElementSibling !== playground) root.insertAdjacentElement('afterend', playground);
    return true;
  };

  const observer = new MutationObserver(movePlaygroundOutsideReact);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', movePlaygroundOutsideReact);
  movePlaygroundOutsideReact();
})();