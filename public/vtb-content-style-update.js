(() => {
  if (window.__vtbContentStyleUpdateV4) return;
  window.__vtbContentStyleUpdateV4 = true;

  const VERSION = 'vtb-content-style-4';
  const ROOT = '/works/VTB%20DESIGN%20TEAM/print';
  const PRINT_FILES = [
    ['print-1.jpg', 'print-1-variant.jpg', 'print-1-tee-1.jpg', 'print-1-tee-2.jpg', 'print-1-tee-3.jpg', 'print-1-tee-4.jpg', 'print-1-tee-5.jpg', 'print-1-tee-6.jpg'],
    ['print-2.jpg', 'print-2-tee-1.jpg', 'print-2-tee-2.jpg'],
    ['print-3.jpg', 'print-3-variant.jpg', 'print-3-tee-1.jpg', 'print-3-tee-2.jpg', 'print-3-tee-3.jpg', 'print-3-tee-4.jpg', 'print-3-tee-5.jpg'],
    ['print-4.jpg', 'print-4-tee-1.jpg', 'print-4-tee-2.jpg'],
    ['print-5.jpg', 'print-5-variant.jpg', 'print-5-tee-1.jpg', 'print-5-tee-2.jpg', 'print-5-tee-3.jpg'],
    ['print-6.jpg', 'print-6-tee-1.jpg', 'print-6-tee-2.jpg'],
    ['print-7.jpg', 'print-7-tee-1.jpg', 'print-7-tee-2.jpg', 'print-7-tee-3.jpg'],
    ['print-8-1.jpg', 'print-8-tee-1.jpg', 'print-8-tee-2.jpg'],
    ['print-9-1.jpg', 'print-9-variant-1.jpg', 'print-9-variant-2.jpg', 'print-9-tee-1.jpg', 'print-9-tee-2.jpg', 'print-9-tee-3.jpg', 'print-9-tee-4.jpg'],
  ];

  const PRINT_SERIES = PRINT_FILES.map((series, seriesIndex) => series.map((name, itemIndex) => ({
    src: `${ROOT}/${encodeURIComponent(name)}?v=vtb-gallery-1`,
    alt: `VTB DESIGN TEAM print ${seriesIndex + 1}${itemIndex ? ` variation ${itemIndex}` : ''}`,
  })));

  const COPY = {
    ru: {
      aboutTitle: 'О ПРОЕКТЕ',
      aboutText: 'Разработка мерча и визуальных материалов для команды дизайнеров ВТБ. Работая с логотипом и фирменным цветом бренда, я создавал принты, брендированные физические объекты и рекламные материалы для digital-носителей. Главной задачей было сохранить узнаваемость айдентики ВТБ, адаптировав её к более свободной и современной визуальной подаче.',
      printsTitle: 'ДИЗАЙН ПРИНТОВ',
      printsText: 'В основе принтов — смелые идеи, современные визуальные тренды и актуальные референсы. Фирменные элементы ВТБ переосмысливались через экспериментальную типографику, масштабирование и нестандартные композиционные решения, формируя более дерзкий образ команды внутри общей айдентики бренда.',
    },
    en: {
      aboutTitle: 'ABOUT THE PROJECT',
      aboutText: 'Merchandise and visual materials developed for the VTB Design Team. Working with the brand’s logo and signature color, I created prints, branded physical objects, and promotional assets for digital platforms. The main goal was to preserve the recognizable VTB identity while translating it into a more flexible and contemporary visual language.',
      printsTitle: 'PRINT DESIGN',
      printsText: 'The prints combine bold ideas, contemporary visual trends, and relevant references. VTB’s signature elements were reinterpreted through experimental typography, exaggerated scale, and unconventional compositions, creating a more expressive image for the team while remaining connected to the brand’s overall identity.',
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  function injectStyles() {
    const old = document.getElementById('vtb-content-style-update');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = 'vtb-content-style-update';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.vtb-modal),
      body:has(.vtb-modal) {
        background: #ff0101 !important;
      }

      .vtb-modal {
        background-color: #ff0101 !important;
        background-image: linear-gradient(
          180deg,
          #ff0101 0%,
          #ff0101 70%,
          #e50609 79%,
          #8d2426 90%,
          #292929 100%
        ) !important;
        background-repeat: no-repeat !important;
        background-size: 100% 100% !important;
        background-attachment: local !important;
      }

      .vtb-head {
        background: rgba(255, 1, 1, .92) !important;
        border-bottom-color: rgba(5, 5, 5, .32) !important;
      }

      .vtb-hover-badge,
      .vtb-count {
        display: none !important;
      }

      .vtb-project-intro {
        padding: 0 0 clamp(4rem, 9vw, 7rem);
      }

      .vtb-project-intro__inner,
      .vtb-print-copy {
        width: min(100%, 58rem);
      }

      .vtb-project-intro__title {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(2.7rem, 6.5vw, 6.5rem);
        font-weight: 900;
        line-height: .84;
        letter-spacing: -.075em;
        text-transform: uppercase;
      }

      .vtb-project-intro__text,
      .vtb-print-copy {
        margin: clamp(1.5rem, 3vw, 2.4rem) 0 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(1rem, 1.55vw, 1.3rem);
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: -.018em;
      }

      .vtb-print-copy {
        margin-top: 0;
        margin-bottom: clamp(2rem, 4vw, 3.5rem);
      }

      .vtb-section:last-of-type {
        color: #fff !important;
        border-top-color: rgba(255,255,255,.35) !important;
      }

      .vtb-section:last-of-type .vtb-title {
        color: #fff !important;
      }

      .vtb-crossfade-frame {
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        background: transparent;
      }

      .vtb-print-card .vtb-crossfade-image {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        object-fit: contain !important;
        opacity: 0;
        transform: scale(1.025);
        transition:
          opacity .68s cubic-bezier(.22,.61,.36,1),
          transform 1.25s cubic-bezier(.22,.61,.36,1);
        will-change: opacity, transform;
        pointer-events: none;
      }

      .vtb-print-card .vtb-crossfade-image.is-visible {
        opacity: 1;
        transform: scale(1);
      }

      .vtb-print-card:hover .vtb-crossfade-image.is-visible {
        transform: scale(1.014);
      }

      @media (prefers-reduced-motion: reduce) {
        .vtb-print-card .vtb-crossfade-image {
          transition-duration: .01ms !important;
        }
      }

      @media (max-width: 560px) {
        .vtb-project-intro {
          padding-bottom: 3.5rem;
        }

        .vtb-project-intro__text,
        .vtb-print-copy {
          font-size: 1rem;
          line-height: 1.52;
        }
      }
    `;
    document.head.append(style);
  }

  function createIntro() {
    const section = document.createElement('section');
    const inner = document.createElement('div');
    const title = document.createElement('h2');
    const text = document.createElement('p');

    section.className = 'vtb-project-intro';
    section.dataset.vtbContent = VERSION;
    inner.className = 'vtb-project-intro__inner';
    title.className = 'vtb-project-intro__title';
    text.className = 'vtb-project-intro__text';
    inner.append(title, text);
    section.append(inner);
    return section;
  }

  function applyCopy(modal) {
    if (!(modal instanceof Element)) return false;
    const inner = modal.querySelector('.vtb-inner');
    const hero = inner?.querySelector(':scope > .vtb-hero');
    const sections = [...(inner?.querySelectorAll(':scope > .vtb-section') || [])];
    const printsSection = sections[0];
    if (!inner || !hero || !printsSection) return false;

    let intro = inner.querySelector(':scope > .vtb-project-intro');
    if (!intro) {
      intro = createIntro();
      hero.after(intro);
    }

    const sectionHead = printsSection.querySelector(':scope > .vtb-section-head');
    let printCopy = printsSection.querySelector(':scope > .vtb-print-copy');
    if (!printCopy) {
      printCopy = document.createElement('p');
      printCopy.className = 'vtb-print-copy';
      sectionHead?.after(printCopy);
    }

    modal.querySelectorAll('.vtb-hover-badge, .vtb-count').forEach((node) => node.remove());

    const copy = COPY[language()];
    intro.querySelector('.vtb-project-intro__title').textContent = copy.aboutTitle;
    intro.querySelector('.vtb-project-intro__text').textContent = copy.aboutText;
    const printTitle = sectionHead?.querySelector('.vtb-title');
    if (printTitle) printTitle.textContent = copy.printsTitle;
    printCopy.textContent = copy.printsText;
    return true;
  }

  function getSeriesForCard(card) {
    const label = card.getAttribute('aria-label') || '';
    const match = label.match(/print\s+(\d+)/i);
    const number = match ? Number(match[1]) : 0;
    return PRINT_SERIES[number - 1] || null;
  }

  function restorePrintHover(modal) {
    if (!(modal instanceof Element)) return;
    const cards = [...modal.querySelectorAll('.vtb-print-card')];
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    cards.forEach((card) => {
      if (card.dataset.vtbStableHover === VERSION) return;
      const series = getSeriesForCard(card);
      if (!series?.length) return;

      const clickHandler = card.onclick;
      const cleanCard = card.cloneNode(true);
      cleanCard.onclick = clickHandler;
      cleanCard.dataset.vtbStableHover = VERSION;
      cleanCard.querySelectorAll('.vtb-hover-badge').forEach((node) => node.remove());
      card.replaceWith(cleanCard);

      const originalImage = cleanCard.querySelector('img');
      if (!originalImage) return;

      const rect = originalImage.getBoundingClientRect();
      const frame = document.createElement('span');
      frame.className = 'vtb-crossfade-frame';
      frame.style.aspectRatio = rect.width > 0 && rect.height > 0
        ? `${rect.width} / ${rect.height}`
        : '1 / 1';

      const firstLayer = originalImage.cloneNode(true);
      const secondLayer = originalImage.cloneNode(true);
      firstLayer.className = 'vtb-crossfade-image is-visible';
      secondLayer.className = 'vtb-crossfade-image';
      firstLayer.src = series[0].src;
      firstLayer.alt = series[0].alt;
      secondLayer.removeAttribute('src');
      secondLayer.alt = '';
      firstLayer.loading = 'eager';
      secondLayer.loading = 'eager';
      firstLayer.decoding = 'async';
      secondLayer.decoding = 'async';
      frame.append(firstLayer, secondLayer);
      originalImage.replaceWith(frame);

      const updateRatio = () => {
        if (firstLayer.naturalWidth > 0 && firstLayer.naturalHeight > 0) {
          frame.style.aspectRatio = `${firstLayer.naturalWidth} / ${firstLayer.naturalHeight}`;
        }
      };
      if (firstLayer.complete) updateRatio();
      else firstLayer.addEventListener('load', updateRatio, { once: true });

      if (!canHover || series.length < 2) return;

      const layers = [firstLayer, secondLayer];
      let activeLayer = 0;
      let currentIndex = 0;
      let sequenceIndex = 0;
      let intervalId = 0;
      let delayId = 0;
      let transitionId = 0;
      let hovering = false;

      const loadLayer = async (image, item) => {
        image.src = item.src;
        image.alt = item.alt;
        try {
          await image.decode();
        } catch {
          if (!image.complete) {
            await new Promise((resolve) => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            });
          }
        }
      };

      const show = async (nextIndex) => {
        if (nextIndex === currentIndex) return;
        const requestId = ++transitionId;
        const nextLayer = activeLayer === 0 ? 1 : 0;
        await loadLayer(layers[nextLayer], series[nextIndex]);
        if (requestId !== transitionId) return;

        requestAnimationFrame(() => {
          layers[nextLayer].classList.add('is-visible');
          layers[activeLayer].classList.remove('is-visible');
          activeLayer = nextLayer;
          currentIndex = nextIndex;
        });
      };

      const advance = () => {
        sequenceIndex = (sequenceIndex + 1) % series.length;
        show(sequenceIndex);
      };

      const clearTimers = () => {
        window.clearTimeout(delayId);
        window.clearInterval(intervalId);
        delayId = 0;
        intervalId = 0;
      };

      const stop = () => {
        hovering = false;
        clearTimers();
        sequenceIndex = 0;
        show(0);
      };

      cleanCard.addEventListener('mouseenter', () => {
        hovering = true;
        clearTimers();
        sequenceIndex = currentIndex;
        series.slice(1).forEach((item) => {
          const preload = new Image();
          preload.decoding = 'async';
          preload.src = item.src;
        });

        delayId = window.setTimeout(() => {
          if (!hovering) return;
          advance();
          intervalId = window.setInterval(advance, 1250);
        }, 260);
      });
      cleanCard.addEventListener('mouseleave', stop);
      cleanCard.addEventListener('blur', stop);
    });
  }

  function apply() {
    injectStyles();
    let ready = false;
    document.querySelectorAll('.vtb-modal').forEach((modal) => {
      ready = applyCopy(modal) || ready;
      restorePrintHover(modal);
    });
    return ready;
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

  const runOpeningPasses = () => {
    [0, 70, 180, 420].forEach((delay) => window.setTimeout(schedule, delay));
  };

  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const projectCard = target?.closest('#works article, #works button');
    const title = projectCard?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'VTB DESIGN TEAM') runOpeningPasses();

    if (target?.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0);
      setTimeout(schedule, 120);
    }
  }, true);

  window.addEventListener('load', schedule, { once: true });
  injectStyles();
  schedule();
})();