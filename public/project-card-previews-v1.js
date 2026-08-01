(() => {
  if (window.__projectCardPreviewsV1) return;
  window.__projectCardPreviewsV1 = true;

  const VERSION = 'project-card-previews-1';
  const PREVIEWS = new Map([
    ['POSTERS', '/works/previes/POSTERS.jpg'],
    ['MERCH', '/works/previes/MERCH.jpg'],
    ['STICKERS', '/works/previes/STICKERS.jpg'],
    ['LOGOS', '/works/previes/LOGOS.jpg'],
    ['ALBUM COVERS', '/works/previes/ALBUM%20COVERS.jpg'],
    ['COLLAGES PHOTO EDIT', '/works/previes/COLLAGES.jpg'],
  ]);

  const normalize = (value) => (value || '')
    .toUpperCase()
    .replace(/\|/g, '')
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function injectStyles() {
    document.getElementById('project-card-previews-v1-style')?.remove();
    const style = document.createElement('style');
    style.id = 'project-card-previews-v1-style';
    style.textContent = `
      #works .project-card-avatar-v1 {
        background: #fff !important;
      }

      #works .project-card-avatar-v1::before,
      #works .project-card-avatar-v1::after {
        display: none !important;
        content: none !important;
      }

      #works .project-card-avatar-v1 > img {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        border: 0 !important;
        background: transparent !important;
        object-fit: cover !important;
        object-position: center !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.append(style);
  }

  function visualHost(card) {
    return card.querySelector(':scope > .my-10.flex.flex-1')
      || card.querySelector('.my-10.flex.flex-1')
      || card.querySelector(':scope > .my-10')
      || card.querySelector('.my-10')
      || null;
  }

  function applyPreview(card, key, src) {
    const host = visualHost(card);
    if (!host) return;

    let preview = host.querySelector(':scope > .project-card-avatar-v1');
    if (!preview) {
      preview = document.createElement('div');
      preview.className = 'project-card-preview-v5 project-card-placeholder-v5 project-card-avatar-v1';
      host.replaceChildren(preview);
    }

    let image = preview.querySelector(':scope > img');
    if (!image) {
      image = document.createElement('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      preview.append(image);
    }

    const versionedSrc = `${src}?v=${VERSION}`;
    if (image.getAttribute('src') !== versionedSrc) image.src = versionedSrc;
    image.alt = `${key} preview`;
    card.dataset.projectAvatarV1 = key;
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('#works article, #works button').forEach((card) => {
      const key = normalize(card.querySelector('h3')?.textContent);
      const src = PREVIEWS.get(key);
      if (src) applyPreview(card, key, src);
    });
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  };

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  window.addEventListener('load', schedule);
  apply();
})();
