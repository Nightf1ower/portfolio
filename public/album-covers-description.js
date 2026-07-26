(() => {
  if (window.__albumCoversDescriptionV1) return;
  window.__albumCoversDescriptionV1 = true;

  const VERSION = 'album-covers-description-1';
  const COPY = {
    ru: 'Разработка обложек для музыкальных релизов. Визуальная концепция каждой работы создавалась на основе звучания, тематики и индивидуального стиля исполнителя. В дизайне сочетаются экспериментальная типографика, коллажная графика, обработка изображений и авторские визуальные решения.',
    en: 'Cover artwork developed for music releases. Each visual concept was created around the sound, theme, and individual identity of the artist. The designs combine experimental typography, collage graphics, image manipulation, and custom visual elements.',
  };

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';

  function injectStyles() {
    document.getElementById('album-covers-description-style')?.remove();
    const style = document.createElement('style');
    style.id = 'album-covers-description-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .album-covers-description {
        max-width: 62rem;
        margin: clamp(1.4rem, 2.8vw, 2.2rem) 0 0;
        color: #050505;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(1.05rem, 1.7vw, 1.45rem);
        font-weight: 650;
        line-height: 1.22;
        letter-spacing: -.025em;
      }

      @media (max-width: 640px) {
        .album-covers-description {
          font-size: 1rem;
          line-height: 1.28;
        }
      }
    `;
    document.head.append(style);
  }

  function apply(modal = document.querySelector('.album-covers-modal')) {
    if (!modal) return false;
    const hero = modal.querySelector('.album-covers-hero');
    if (!hero) return false;

    let description = hero.querySelector('.album-covers-description');
    if (!description) {
      description = document.createElement('p');
      description.className = 'album-covers-description';
      hero.append(description);
    }
    description.textContent = COPY[language()];
    return true;
  }

  injectStyles();
  apply();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.album-covers-modal')) apply(node);
        else node.querySelectorAll?.('.album-covers-modal').forEach(apply);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  new MutationObserver(() => {
    injectStyles();
    apply();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();