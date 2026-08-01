(() => {
  if (window.__vtbContentStyleUpdateV2) return;
  window.__vtbContentStyleUpdateV2 = true;

  const VERSION = 'vtb-content-style-2';
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
      printsText: 'В основе принтов — смелые идеи, современные визуальные тренды и актуальные референсы. Фирменные элементы ВТБ переосмыслялись через экспериментальную типографику, масштабирование и нестандартные композиционные решения, формируя более дерзкий образ команды внутри общей айдентики бренда.',
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
    if (!(modal instanceof Element)) return;
    const inner = modal.querySelector('.vtb-inner');
    const hero = inner?.querySelector(':scope > .vtb-hero');
    const sections = [...(inner?.querySelectorAll(':scope > .vtb-section') || [])];
    const printsSection = sections[0];
    if (!inner || !hero || !printsSection) return;

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
  }

  function restorePrintHover(modal) {
    if (!(modal instanceof Element)) return;
    const cards = [...modal.querySelectorAll('.vtb-print-card')];
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    cards.forEach((card, seriesIndex) => {
      if (card.dataset.vtbStableHover === VERSION) return;
      const series = PRINT_SERIES[seriesIndex];
      if (!series?.length) return;

      const clickHandler = card.onclick;
      const cleanCard = card.cloneNode(true);
      cleanCard.onclick = clickHandler;
      cleanCard.dataset.vtbStableHover = VERSION;
      cleanCard.querySelectorAll('.vtb-hover-badge').forEach((node) => node.remove());
      card.replaceWith(cleanCard);

      const image = cleanCard.querySelector('img');
      if (!image || !canHover || series.length < 2) return;

      let timer = 0;
      let index = 0;
      const render = () => {
        image.src = series[index].src;
        image.alt = series[index].alt;
      };
      const stop = () => {
        window.clearInterval(timer);
        timer = 0;
        index = 0;
        render();
      };

      cleanCard.addEventListener('mouseenter', () => {
        stop();
        series.slice(1).forEach((item) => {
          const preload = new Image();
          preload.src = item.src;
        });
        timer = window.setInterval(() => {
          index = (index + 1) % series.length;
          render();
        }, 700);
      });
      cleanCard.addEventListener('mouseleave', stop);
      cleanCard.addEventListener('blur', stop);
    });
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.vtb-modal').forEach((modal) => {
      applyCopy(modal);
      restorePrintHover(modal);
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

  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0);
      setTimeout(schedule, 120);
    }
  }, true);

  apply();
})();
