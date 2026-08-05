(() => {
  if (window.__postersCopyUpdateV1) return;
  window.__postersCopyUpdateV1 = true;

  const VERSION = 'posters-copy-update-1';
  const STYLE_ID = 'posters-copy-update-style';

  const COPY = {
    ru: {
      intro: 'Серия постеров, созданных для различных проектов, мероприятий и личных экспериментов. В работах я исследую разные визуальные стили, сочетая типографику, фотографию, коллаж и ручную графику.',
      italyTitle: 'SPECIAL ITALY PROJECT',
      italyText: 'Разработка серии рекламных постеров для мероприятий в Италии. В основе дизайна — выразительная типографика, динамичные композиции и яркий визуальный язык, передающий настроение и атмосферу каждого события.',
      eventsTitle: 'EVENT POSTERS',
      eventsText: 'Разработка постеров для мероприятий, клубных вечеринок и музыкальных событий. Каждый дизайн создавался с учетом формата, аудитории и общей атмосферы конкретного ивента.',
      flawaTitle: 'FLAWA POSTERS',
      flawaText: 'Серия личных постеров, созданных как способ самовыражения и презентации себя в качестве артиста. В основе работ — собственные фотографии, личные образы и эксперименты с коллажем, типографикой и обработкой.',
    },
    en: {
      intro: 'A series of posters created for various projects, events, and personal experiments. The works explore different visual styles through typography, photography, collage, and handmade graphics.',
      italyTitle: 'SPECIAL ITALY PROJECT',
      italyText: 'A series of promotional posters created for events in Italy. The designs combine expressive typography, dynamic compositions, and a bold visual language that reflects the mood and atmosphere of each event.',
      eventsTitle: 'EVENT POSTERS',
      eventsText: 'Poster designs for events, club nights, and music-related projects. Each visual was developed around the format, audience, and individual atmosphere of the event.',
      flawaTitle: 'FLAWA POSTERS',
      flawaText: 'A personal poster series created as a form of self-expression and a way to present myself as an artist. The works are based on personal photographs, individual imagery, and experiments with collage, typography, and image processing.',
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const normalize = value => String(value || '')
    .trim()
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/\s+/g, ' ');

  function installStyles() {
    const old = document.getElementById(STYLE_ID);
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .pag-modal[data-posters-copy] .pag-hero {
        padding-bottom: clamp(2.5rem, 5vw, 4.5rem) !important;
      }

      .pag-modal[data-posters-copy] .pag-hero-copy,
      .pag-modal[data-posters-copy] .pag-section-copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: clamp(1rem, 1.25vw, 1.3rem) !important;
        font-weight: 500 !important;
        line-height: 1.42 !important;
        letter-spacing: -.015em !important;
      }

      .pag-modal[data-posters-copy] .pag-hero-copy {
        margin: clamp(1.5rem, 3vw, 2.5rem) 0 0 !important;
        padding-right: clamp(0rem, 8vw, 9rem) !important;
      }

      .pag-modal[data-posters-copy] .pag-section-head {
        margin-bottom: clamp(1rem, 2vw, 1.5rem) !important;
      }

      .pag-modal[data-posters-copy] .pag-section-copy {
        margin: 0 0 clamp(2rem, 4vw, 3.5rem) !important;
        padding-right: clamp(0rem, 8vw, 9rem) !important;
      }

      @media (max-width: 620px) {
        .pag-modal[data-posters-copy] .pag-hero-copy,
        .pag-modal[data-posters-copy] .pag-section-copy {
          padding-right: 0 !important;
          font-size: 1rem !important;
          line-height: 1.45 !important;
        }
      }
    `;
    document.head.append(style);
  }

  function ensureParagraph(parent, className, text, afterNode = null) {
    let paragraph = parent.querySelector(`:scope > .${className}`);
    if (!paragraph) {
      paragraph = document.createElement('p');
      paragraph.className = className;
      if (afterNode) afterNode.insertAdjacentElement('afterend', paragraph);
      else parent.append(paragraph);
    }
    paragraph.textContent = text;
    return paragraph;
  }

  function identifySection(section) {
    const title = normalize(section.querySelector('.pag-section-title')?.textContent);
    if (title.includes('ITALO') || title.includes('SPECIAL ITALY')) return 'italy';
    if (title.includes('FLAWA')) return 'flawa';
    if (title.includes('EVENT') || title.includes('ИВЕНТ') || title.includes('ВЕЧЕРИН')) return 'events';
    return 'other';
  }

  function applyToModal(modal) {
    if (!(modal instanceof HTMLElement)) return;
    const mainTitle = normalize(modal.querySelector('.pag-title')?.textContent);
    if (mainTitle !== 'POSTERS' && mainTitle !== 'ПОСТЕРЫ') return;

    const copy = COPY[language()];
    modal.dataset.postersCopy = `${VERSION}-${language()}`;

    const hero = modal.querySelector('.pag-hero');
    if (hero) ensureParagraph(hero, 'pag-hero-copy', copy.intro);

    const sections = [...modal.querySelectorAll('.pag-inner > .pag-section')];
    const buckets = { italy: [], events: [], flawa: [], other: [] };

    sections.forEach((section) => {
      const type = identifySection(section);
      buckets[type].push(section);

      const heading = section.querySelector('.pag-section-title');
      const head = section.querySelector('.pag-section-head');
      if (!heading || !head) return;

      if (type === 'italy') {
        heading.textContent = copy.italyTitle;
        ensureParagraph(section, 'pag-section-copy', copy.italyText, head);
      } else if (type === 'events') {
        heading.textContent = copy.eventsTitle;
        ensureParagraph(section, 'pag-section-copy', copy.eventsText, head);
      } else if (type === 'flawa') {
        heading.textContent = copy.flawaTitle;
        ensureParagraph(section, 'pag-section-copy', copy.flawaText, head);
      }
    });

    const inner = modal.querySelector('.pag-inner');
    if (!inner) return;
    [...buckets.italy, ...buckets.events, ...buckets.flawa, ...buckets.other]
      .forEach(section => inner.append(section));
  }

  function apply() {
    installStyles();
    document.querySelectorAll('.pag-modal').forEach(applyToModal);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  schedule();
  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
})();
