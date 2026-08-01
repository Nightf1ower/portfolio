(() => {
  if (window.__carnivalRecordsCopyUpdateV2) return;
  window.__carnivalRecordsCopyUpdateV2 = true;

  const VERSION = 'carnival-copy-update-2';
  const COPY = {
    ru: {
      aboutTitle: 'ABOUT CARNIVAL RECORDS',
      aboutText: 'Carnival Records — музыкальный лейбл и творческая платформа артиста SALUKI. Визуальный язык бренда объединяет карнавальную, ковбойскую и психоделическую эстетику, винтажную типографику и выразительную ручную графику. В рамках сотрудничества были разработаны принты, оформление музыкальных релизов и элементы мерча, объединённые общей визуальной системой.',
      vinylText: 'Разработка дизайна винилового издания альбома «Властелин Калек», основанного на работах Антона Реввы, созданных для данного релиза. В проект вошли оформление треклиста, внутреннего разворота обложки и самих пластинок. Вся графика и шрифтовые элементы были отрисованы вручную без использования Photoshop и объединены в цельную визуальную систему, продолжающую эстетику альбома.',
      calecText: 'Разработка серии графики для коллекции, посвящённой альбому «Властелин Калек». Каждый принт отсылает к отдельному треку либо переосмысливает визуальные мотивы, атмосферу и общую эстетику релиза. Часть изображений основана на рисунках из дневника, посвящённого выходу альбома. Они были заново вручную отрисованы и переработаны, чтобы лучше соответствовать общей графической системе коллекции.',
    },
    en: {
      aboutTitle: 'ABOUT CARNIVAL RECORDS',
      aboutText: 'Carnival Records is a music label and creative platform founded by the artist SALUKI. Its visual language combines carnival, Western and psychedelic aesthetics with vintage typography and expressive hand-drawn graphics. The collaboration included the development of prints, music release artwork and merchandise elements united by a consistent visual system.',
      vinylText: 'Design of the vinyl edition of the album Vlastelin Kalek, based on Anton Revva’s original artworks created for the release. The project included the tracklist, the inner gatefold and the vinyl records themselves. All graphics and typographic elements were drawn entirely by hand without the use of Photoshop and combined into a cohesive visual system that continues the album’s aesthetic.',
      calecText: 'Development of a graphic series for a collection dedicated to the album Vlastelin Kalek. Each print refers to a specific track or reinterprets the visual motifs, atmosphere and overall aesthetic of the release. Some of the illustrations are based on drawings from a diary created for the album’s release. They were redrawn and reworked by hand to better fit the collection’s overall graphic system.',
    },
  };

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const normalize = (value) => String(value || '').trim().toUpperCase();

  function injectStyles() {
    const previous = document.getElementById('carnival-records-copy-update-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'carnival-records-copy-update-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .cr-modal .cr-about {
        width: 100%;
        max-width: none;
        margin-top: clamp(2.3rem,5vw,4rem);
        padding-top: 0;
        border-top: 0;
      }
      .cr-modal .cr-about__title {
        display: block !important;
        width: auto !important;
        max-width: none !important;
        margin: 0 0 .85rem !important;
        padding: 0 !important;
        color: #050505 !important;
        font-family: Arial,Helvetica,sans-serif !important;
        font-size: .72rem !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        letter-spacing: .27em !important;
        text-transform: uppercase !important;
        text-wrap: initial !important;
      }
      .cr-modal .cr-about__copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        color: rgba(5,5,5,.78) !important;
        font-family: Arial,Helvetica,sans-serif !important;
        font-size: clamp(1rem,1.45vw,1.25rem) !important;
        font-weight: 600 !important;
        line-height: 1.48 !important;
        letter-spacing: -.018em !important;
        text-wrap: pretty !important;
      }
      .cr-modal .cr-section-caps {
        margin-top: clamp(2rem,4vw,3.5rem) !important;
      }
      @media (max-width: 650px) {
        .cr-modal .cr-about {
          margin-top: 2.25rem;
        }
        .cr-modal .cr-about__title {
          font-size: .66rem !important;
          letter-spacing: .23em !important;
        }
        .cr-modal .cr-section-caps {
          margin-top: 1.5rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function findSection(modal, expectedTitle) {
    return [...modal.querySelectorAll('.cr-inner > .cr-section')].find((section) =>
      normalize(section.querySelector(':scope > .cr-h')?.textContent) === expectedTitle
    ) || null;
  }

  function setDescription(section, value) {
    if (!section) return;
    let description = section.querySelector(':scope > .cr-description');
    if (!description) {
      description = document.createElement('p');
      description.className = 'cr-description';
      section.querySelector(':scope > .cr-h')?.insertAdjacentElement('afterend', description);
    }
    description.textContent = value;
  }

  function ensureAboutLabel(about) {
    let title = about.querySelector(':scope > .cr-about__title');
    if (title?.tagName === 'P') return title;

    const label = document.createElement('p');
    label.className = 'cr-about__title';
    if (title) {
      label.textContent = title.textContent;
      title.replaceWith(label);
    } else {
      about.prepend(label);
    }
    return label;
  }

  function apply(modal = document.querySelector('.cr-modal')) {
    if (!modal) return false;
    injectStyles();

    const lang = language();
    const copy = COPY[lang];
    const hero = modal.querySelector('.cr-hero');
    if (!hero) return false;

    let about = hero.querySelector(':scope > .cr-about');
    if (!about) {
      about = document.createElement('div');
      about.className = 'cr-about';
      const title = document.createElement('p');
      title.className = 'cr-about__title';
      const paragraph = document.createElement('p');
      paragraph.className = 'cr-about__copy';
      about.append(title, paragraph);
      hero.append(about);
    }

    const aboutTitle = ensureAboutLabel(about);
    let aboutCopy = about.querySelector(':scope > .cr-about__copy');
    if (!aboutCopy) {
      aboutCopy = document.createElement('p');
      aboutCopy.className = 'cr-about__copy';
      about.append(aboutCopy);
    }
    aboutTitle.textContent = copy.aboutTitle;
    aboutCopy.textContent = copy.aboutText;

    setDescription(findSection(modal, 'VINYL ALBUM COVER DESIGN'), copy.vinylText);
    setDescription(findSection(modal, 'ВЛАСТЕЛИН КАЛЕК COLLECTION'), copy.calecText);

    const caps = findSection(modal, 'CAPS');
    caps?.classList.add('cr-section-caps');

    modal.dataset.carnivalCopyUpdate = `${VERSION}-${lang}`;
    return true;
  }

  function scheduleApply() {
    requestAnimationFrame(() => apply());
    window.setTimeout(() => apply(), 80);
    window.setTimeout(() => apply(), 240);
  }

  scheduleApply();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.cr-modal') || node.querySelector?.('.cr-modal')) {
          scheduleApply();
          return;
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  new MutationObserver(scheduleApply).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
})();