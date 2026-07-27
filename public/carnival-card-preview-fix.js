(() => {
  if (window.__carnivalCardPreviewFixV1) return;
  window.__carnivalCardPreviewFixV1 = true;

  const VERSION = 'carnival-card-preview-fix-1';
  const SOURCE = `/works/previes/CARNIVAL%20RECORDS.jpg?v=${VERSION}`;

  function injectStyles() {
    const old = document.getElementById('carnival-card-preview-fix-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = 'carnival-card-preview-fix-style';
    style.dataset.version = VERSION;
    style.textContent = `
      #works [data-project-order="6"] .cr-project-card-cover,
      #works [data-project-size][data-project-order="6"] .project-preview-v3 {
        display: block !important;
        position: relative !important;
        width: 11rem !important;
        max-width: 100% !important;
        min-height: 0 !important;
        aspect-ratio: 1 / 1 !important;
        overflow: hidden !important;
        border: 1px solid #050505 !important;
        background: #fff !important;
      }
      #works [data-project-order="6"] .cr-project-card-cover > img,
      #works [data-project-order="6"] .project-preview-v3 > img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        padding: .65rem !important;
        opacity: 1 !important;
        visibility: visible !important;
        object-fit: contain !important;
        object-position: center !important;
        background: #fff !important;
      }
      #works [data-project-order="6"] .cr-project-card-logo {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.append(style);
  }

  function findCard() {
    return [...document.querySelectorAll('#works article, #works button')].find((card) =>
      card.querySelector('h3')?.textContent?.trim().toUpperCase() === 'CARNIVAL RECORDS'
    ) || null;
  }

  function apply() {
    injectStyles();
    const card = findCard();
    if (!card) return;

    const host = card.querySelector('.my-10.flex.flex-1') || card.querySelector('.my-10');
    if (!host) return;

    let preview = host.querySelector(':scope > .project-preview-v3, :scope > .cr-project-card-cover');
    if (!preview) {
      preview = document.createElement('div');
      preview.className = 'project-preview-v3';
      host.replaceChildren(preview);
    }

    preview.classList.add('project-preview-v3');

    let image = preview.querySelector(':scope > img');
    if (!image) {
      image = document.createElement('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      preview.prepend(image);
    }

    if (image.getAttribute('src') !== SOURCE) image.src = SOURCE;
    image.alt = 'CARNIVAL RECORDS preview';
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

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  [0, 100, 350, 900, 1600].forEach((delay) => setTimeout(schedule, delay));
})();