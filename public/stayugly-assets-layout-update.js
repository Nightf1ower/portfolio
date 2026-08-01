(() => {
  if (window.__stayUglyAssetsLayoutUpdateV2) return;
  window.__stayUglyAssetsLayoutUpdateV2 = true;

  const VERSION = 'stayugly-assets-layout-2';
  const ASSETS = {
    conceptMain: '/works/stayugly/concept/concept-01.jpg',
    conceptSteps: [
      '/works/stayugly/concept/concept-n-1.png',
      '/works/stayugly/concept/concept-n-2.png',
      '/works/stayugly/concept/concept-n-3.png',
    ],
    package: '/works/stayugly/package/zips.png',
  };

  const CAPTIONS = {
    ru: [
      'ПЕРВОНАЧАЛЬНЫЙ КОНЦЕПТ',
      'ВТОРАЯ ВЕРСИЯ · РАСПОЛОЖИЛИ НАДПИСЬ',
      'ФИНАЛЬНЫЙ РЕЗУЛЬТАТ',
    ],
    en: [
      'INITIAL CONCEPT',
      'SECOND VERSION · REPOSITIONED THE TEXT',
      'FINAL RESULT',
    ],
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const versioned = (src) => `${src}${src.includes('?') ? '&' : '?'}v=${VERSION}`;
  const isRemovedPhoto = (src) => {
    try {
      return /(?:^|\/)photo-(?:10|11)(?:\.[a-z0-9]+)?(?:[?#]|$)/i.test(decodeURIComponent(src));
    } catch {
      return /(?:^|\/)photo-(?:10|11)(?:\.[a-z0-9]+)?(?:[?#]|$)/i.test(src);
    }
  };

  function injectStyles() {
    const old = document.getElementById('stayugly-assets-layout-update-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = 'stayugly-assets-layout-update-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .su-concept-update {
        display: flex;
        flex-direction: column;
        gap: clamp(2rem, 4vw, 3.5rem);
      }

      .su-concept-update__main,
      .su-concept-update__step,
      .su-package-update__media {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: zoom-in;
      }

      .su-concept-update__main img,
      .su-concept-update__step img,
      .su-package-update__media img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: contain;
      }

      .su-concept-update__flow {
        display: grid;
        width: calc(100% + 2rem);
        margin-left: -1rem;
        grid-template-columns:
          minmax(0, 1fr)
          clamp(2rem, 2.8vw, 3rem)
          minmax(0, 1fr)
          clamp(2rem, 2.8vw, 3rem)
          minmax(0, 1fr);
        align-items: center;
        gap: clamp(.15rem, .45vw, .45rem);
      }

      .su-concept-update__item {
        min-width: 0;
        align-self: start;
      }

      .su-concept-update__arrow {
        align-self: center;
        justify-self: center;
        display: block;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(1.8rem, 3vw, 3.35rem);
        font-weight: 1000;
        line-height: .8;
        letter-spacing: -.12em;
        transform: scaleX(1.08);
        color: #050505;
        -webkit-text-stroke: .45px #050505;
      }

      .su-concept-update .su-concept-caption {
        margin: .85rem 0 0;
      }

      .su-package-update {
        display: grid;
        grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr);
        align-items: center;
        gap: clamp(2.5rem, 4vw, 4.5rem);
      }

      .su-package-update__copy {
        min-width: 0;
        max-width: 100%;
        overflow: hidden;
        padding-right: clamp(.5rem, 1.5vw, 1.5rem);
      }

      .su-package-update__copy .su-section-head {
        max-width: 100%;
        margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
      }

      .su-package-update__copy .su-h {
        max-width: 100%;
        margin: 0;
        font-size: clamp(2.8rem, 4.6vw, 4.75rem);
        line-height: .84;
        letter-spacing: -.075em;
        white-space: nowrap;
      }

      .su-package-update__copy .su-text {
        width: 100%;
        max-width: 31rem;
        margin: 0;
        font-size: clamp(1rem, 1.45vw, 1.25rem);
        line-height: 1.08;
        overflow-wrap: anywhere;
      }

      .su-package-update__media {
        min-width: 0;
        position: relative;
        z-index: 2;
      }

      .su-photoshoot-update {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
      }

      .su-photoshoot-update__card {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        background: #fcfcfa;
        cursor: zoom-in;
      }

      .su-photoshoot-update__card img {
        display: block;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }

      .su-assets-lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000900;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(0,0,0,.94);
      }

      .su-assets-lightbox img {
        display: block;
        max-width: 94vw;
        max-height: 92vh;
        width: auto;
        height: auto;
        object-fit: contain;
      }

      .su-assets-lightbox button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        border: 0;
        background: #fff;
        color: #050505;
        padding: .75rem 1rem;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .2em;
        text-transform: uppercase;
        cursor: pointer;
      }

      @media (max-width: 1050px) {
        .su-package-update__copy .su-h {
          font-size: clamp(2.65rem, 6vw, 4rem);
        }
      }

      @media (max-width: 900px) {
        .su-concept-update__flow {
          width: 100%;
          margin-left: 0;
          grid-template-columns: 1fr;
        }

        .su-concept-update__arrow {
          transform: rotate(90deg) scaleX(1.08);
          margin: .1rem 0;
        }

        .su-concept-update .su-concept-caption {
          text-align: center;
        }

        .su-package-update {
          grid-template-columns: 1fr;
        }

        .su-package-update__copy {
          overflow: visible;
          padding-right: 0;
        }

        .su-package-update__copy .su-h {
          white-space: normal;
        }

        .su-package-update__copy .su-text {
          max-width: 52rem;
        }

        .su-photoshoot-update {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 560px) {
        .su-photoshoot-update {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.append(style);
  }

  function openLightbox(src, alt) {
    document.querySelector('.su-assets-lightbox')?.remove();
    const overlay = document.createElement('div');
    const image = document.createElement('img');
    const close = document.createElement('button');
    overlay.className = 'su-assets-lightbox';
    image.src = versioned(src);
    image.alt = alt || '';
    close.type = 'button';
    close.textContent = language() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    close.onclick = (event) => {
      event.stopPropagation();
      overlay.remove();
    };
    image.onclick = (event) => event.stopPropagation();
    overlay.onclick = () => overlay.remove();
    overlay.append(image, close);
    document.body.append(overlay);
  }

  function openGalleryLightbox(list, startIndex = 0) {
    if (!list.length) return;
    document.querySelector('.su-assets-lightbox')?.remove();
    let index = Math.max(0, Math.min(startIndex, list.length - 1));
    const overlay = document.createElement('div');
    const image = document.createElement('img');
    const close = document.createElement('button');
    overlay.className = 'su-assets-lightbox';
    close.type = 'button';
    close.textContent = language() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    const render = () => {
      image.src = list[index];
      image.alt = `STAY UGLY photoshoot ${index + 1}`;
    };
    close.onclick = (event) => {
      event.stopPropagation();
      overlay.remove();
    };
    image.onclick = (event) => {
      event.stopPropagation();
      index = (index + 1) % list.length;
      render();
    };
    overlay.onclick = () => overlay.remove();
    overlay.append(image, close);
    document.body.append(overlay);
    render();
  }

  function imageButton(className, src, alt) {
    const button = document.createElement('button');
    const image = document.createElement('img');
    button.type = 'button';
    button.className = className;
    image.src = versioned(src);
    image.alt = alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    button.append(image);
    button.onclick = (event) => {
      event.stopPropagation();
      openLightbox(src, alt);
    };
    return button;
  }

  function updateCaptions(section) {
    const captions = CAPTIONS[language()];
    section.querySelectorAll('.su-concept-caption').forEach((caption, index) => {
      caption.textContent = captions[index] || '';
    });
  }

  function rebuildConcept(section) {
    if (!(section instanceof Element)) return;
    let content = section.querySelector(':scope > .su-concept-update');

    if (!content) {
      const oldContent = [...section.children].find((child) =>
        child.classList.contains('su-concept') || child.classList.contains('su-grid') || child.classList.contains('su-empty')
      );
      oldContent?.remove();

      content = document.createElement('div');
      const main = imageButton('su-concept-update__main', ASSETS.conceptMain, 'STAY UGLY concept 1');
      const flow = document.createElement('div');
      content.className = 'su-concept-update';
      content.dataset.stayUglyAssets = VERSION;
      flow.className = 'su-concept-update__flow';

      ASSETS.conceptSteps.forEach((src, index) => {
        const item = document.createElement('div');
        const caption = document.createElement('p');
        item.className = 'su-concept-update__item';
        caption.className = 'su-concept-caption';
        item.append(
          imageButton('su-concept-update__step', src, `STAY UGLY concept step ${index + 1}`),
          caption,
        );
        flow.append(item);

        if (index < ASSETS.conceptSteps.length - 1) {
          const arrow = document.createElement('span');
          arrow.className = 'su-concept-update__arrow';
          arrow.setAttribute('aria-hidden', 'true');
          arrow.textContent = '➜';
          flow.append(arrow);
        }
      });

      content.append(main, flow);
      section.append(content);
    }

    updateCaptions(section);
  }

  function rebuildPackage(section) {
    if (!(section instanceof Element)) return;
    if (section.querySelector(':scope > .su-package-update')) return;

    const heading = section.querySelector(':scope > .su-section-head');
    const note = section.querySelector(':scope > .su-text');
    if (!heading) return;

    const layout = document.createElement('div');
    const copy = document.createElement('div');
    layout.className = 'su-package-update';
    layout.dataset.stayUglyAssets = VERSION;
    copy.className = 'su-package-update__copy';

    copy.append(heading);
    if (note) copy.append(note);

    [...section.children].forEach((child) => child.remove());
    layout.append(
      copy,
      imageButton('su-package-update__media', ASSETS.package, 'STAY UGLY ZIP packaging'),
    );
    section.append(layout);
  }

  function rebuildPhotoshoot(section) {
    if (!(section instanceof Element)) return;
    if (section.querySelector(':scope > .su-photoshoot-update')) return;

    const oldGrid = [...section.children].find((child) => child.classList.contains('su-grid'));
    if (!oldGrid) return;

    const sources = [...oldGrid.querySelectorAll('img')]
      .map((image) => image.currentSrc || image.getAttribute('src') || image.src || '')
      .filter(Boolean)
      .filter((src) => !isRemovedPhoto(src));

    oldGrid.remove();
    const grid = document.createElement('div');
    grid.className = 'su-photoshoot-update';
    grid.dataset.stayUglyAssets = VERSION;

    sources.forEach((src, index) => {
      const button = document.createElement('button');
      const image = document.createElement('img');
      button.type = 'button';
      button.className = 'su-photoshoot-update__card';
      image.src = src;
      image.alt = `STAY UGLY photoshoot ${index + 1}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      button.append(image);
      button.onclick = (event) => {
        event.stopPropagation();
        openGalleryLightbox(sources, index);
      };
      grid.append(button);
    });

    section.append(grid);
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.su-modal').forEach((modal) => {
      rebuildConcept(modal.querySelector('.su-section[data-su-section="concept"]'));
      rebuildPhotoshoot(modal.querySelector('.su-section[data-su-section="photoshoot"]'));
      rebuildPackage(modal.querySelector('.su-section[data-su-section="packaging"]'));
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
  });

  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  apply();
})();
