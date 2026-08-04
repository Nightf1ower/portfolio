(() => {
  if (window.__merchCopyUpdateV2) return;
  window.__merchCopyUpdateV2 = true;

  const VERSION = 'merch-copy-update-2';
  const COPY = {
    ru: {
      merchTitle: 'ГРАФИКА ДЛЯ МЕРЧА',
      merchText: 'Разработка серии графических работ для мерча, посвящённого музыкальному альбому. Дизайны создавались для футболок и других предметов коллекции, объединяя клубную эстетику, характер исполнителя и визуальные отсылки к тематике релиза.',
      postersTitle: 'СЕРИЯ ПОСТЕРОВ',
      postersText: 'Серия постеров основана на эстетике и характере исполнителя, а также на главной фразе альбома — “Stuck in the Loop? Don’t Worry, It’s Just Techno.” В каждом изображении эта надпись интерпретируется по-разному: через фотографию, типографику, коллажи и графические образы, связанные с клубной культурой и электронной музыкой.',
      socialTitle: 'КОНТЕНТ ДЛЯ СОЦИАЛЬНЫХ СЕТЕЙ',
      socialText: 'Разработка различных изображений для продвижения альбома в социальных сетях. В серию вошли визуалы для постов, сторис, анонсов и других цифровых форматов. Все материалы продолжают общую стилистику релиза и адаптируют её под разные способы коммуникации с аудиторией.',
      billboardText: 'Серия рекламных визуалов для социальных сетей, вдохновлённая масштабными фестивальными билбордами Coachella. Изображения созданы с помощью ИИ и доработаны вручную, чтобы перенести эстетику наружной рекламы в digital-формат и сохранить единый визуальный язык проекта.',
      dxsText: 'Разработка серии визуальных материалов для модельного комьюнити DXS. В проект вошли изображения для постов и сторис, рекламные и имиджевые постеры, а также графика для стикеров и других носителей. Дизайн строится на сочетании минималистичной типографики, рукописной графики, коротких высказываний и контрастной красно-бело-чёрной палитры, отражающей независимый и экспериментальный характер проекта.',
    },
    en: {
      merchTitle: 'MERCH GRAPHICS',
      merchText: 'Development of a series of graphic works for merchandise dedicated to the music album. The designs were created for T-shirts and other items from the collection, combining club aesthetics, the artist’s character, and visual references to the theme of the release.',
      postersTitle: 'POSTER SERIES',
      postersText: 'The poster series is based on the artist’s aesthetic and personality, as well as the album’s key phrase — “Stuck in the Loop? Don’t Worry, It’s Just Techno.” Each visual reinterprets the phrase through photography, typography, collage, and graphic imagery inspired by club culture and electronic music.',
      socialTitle: 'SOCIAL MEDIA CONTENT',
      socialText: 'Development of various visuals for promoting the album across social media. The series includes content for posts, stories, announcements, and other digital formats. All materials continue the visual direction of the release and adapt it to different ways of communicating with the audience.',
      billboardText: 'A series of social media campaign visuals inspired by Coachella’s large-scale festival billboards. The imagery was created with AI and refined through post-production, translating the aesthetics of outdoor advertising into a digital format while maintaining the project’s consistent visual language.',
      dxsText: 'Development of a series of visual materials for the DXS model community. The project includes content for social media posts and stories, promotional and image-based posters, as well as graphics for stickers and other formats. The visual direction combines minimalist typography, handwritten graphics, concise statements, and a contrasting red, white, and black palette that reflects the project’s independent and experimental character.',
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function injectStyles() {
    const previous = document.getElementById('merch-copy-update-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'merch-copy-update-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .mc-modal .mc-section > .mc-copy-update {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 0 clamp(2.5rem, 5vw, 4.5rem) !important;
        padding-right: clamp(0rem, 7vw, 8rem) !important;
        color: rgba(5,5,5,.82) !important;
        font-size: clamp(1rem, 1.25vw, 1.35rem) !important;
        font-weight: 600 !important;
        line-height: 1.5 !important;
        letter-spacing: -.015em !important;
      }

      .mc-modal .mc-section-head:has(+ .mc-copy-update) {
        margin-bottom: clamp(1.25rem, 2.5vw, 2rem) !important;
      }

      @media (max-width: 700px) {
        .mc-modal .mc-section > .mc-copy-update {
          margin-bottom: 2.5rem !important;
          padding-right: 0 !important;
          font-size: 1rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function ensureNewSectionCopy(section, text) {
    if (!(section instanceof Element)) return;

    let block = section.querySelector(':scope > .mc-copy-update');
    if (!block) {
      block = document.createElement('p');
      block.className = 'mc-copy mc-copy-update';
      const head = section.querySelector(':scope > .mc-section-head');
      head?.insertAdjacentElement('afterend', block);
    }
    block.textContent = text;
  }

  function updateNewGallery(modal) {
    if (!(modal instanceof Element)) return false;
    const copy = COPY[language()];
    const mainSections = [...modal.querySelectorAll('.mc-shell > .mc-section')];
    const merchSection = mainSections[0];
    const postersSection = mainSections[1];
    const socialSection = mainSections[2];

    const updateSection = (section, title, text) => {
      if (!section) return;
      const heading = section.querySelector(':scope > .mc-section-head .mc-section-title');
      if (heading) heading.textContent = title;
      ensureNewSectionCopy(section, text);
    };

    updateSection(merchSection, copy.merchTitle, copy.merchText);
    updateSection(postersSection, copy.postersTitle, copy.postersText);
    updateSection(socialSection, copy.socialTitle, copy.socialText);

    const billboardCopy = modal.querySelector('.mc-billboards > .mc-copy:not(.mc-copy-update)');
    if (billboardCopy) billboardCopy.textContent = copy.billboardText;

    const dxsCopy = modal.querySelector('.mc-dxs > .mc-copy');
    if (dxsCopy) dxsCopy.textContent = copy.dxsText;

    modal.dataset.merchCopyUpdate = `${VERSION}-${language()}`;
    return Boolean(merchSection || postersSection || socialSection);
  }

  function ensureLegacySectionCopy(section, text) {
    if (!section) return;
    let block = section.querySelector(':scope > .m10-copy-update');
    if (!block) {
      block = document.createElement('div');
      block.className = 'm10-project-copy m10-section-copy m10-copy-update';
      block.append(document.createElement('p'));
      section.querySelector(':scope > .m10-section-head')?.insertAdjacentElement('afterend', block);
    }
    let paragraph = block.querySelector('p');
    if (!paragraph) {
      paragraph = document.createElement('p');
      block.append(paragraph);
    }
    paragraph.textContent = text;
  }

  function updateLegacyGallery(modal) {
    if (!(modal instanceof Element)) return false;
    const copy = COPY[language()];
    const mainSections = [...modal.querySelectorAll('.m10-inner > .m10-section')];
    const dxsZone = modal.querySelector('.m10-dxs-zone');
    const dxsSections = [...(dxsZone?.querySelectorAll(':scope > .m10-section') || [])];

    const merch = mainSections.find(section => section.querySelector('.m10-campaign'));
    const posters = mainSections.find(section => section.querySelector('.m10-poster-layout'));
    const social = mainSections.find(section => section.querySelector('.m10-ad-layout'));
    const dxsMaterials = dxsSections.find(section => section.querySelector('.m10-dxs-ads'));

    const rename = (section, title, text) => {
      if (!section) return;
      const heading = section.querySelector(':scope > .m10-section-head .m10-section-title');
      if (heading) heading.textContent = title;
      ensureLegacySectionCopy(section, text);
    };

    rename(merch, copy.merchTitle, copy.merchText);
    rename(posters, copy.postersTitle, copy.postersText);
    rename(social, copy.socialTitle, copy.socialText);
    rename(dxsMaterials, language() === 'ru' ? 'КОНТЕНТ ДЛЯ СОЦСЕТЕЙ И ПЕЧАТНЫЕ МАТЕРИАЛЫ' : 'SOCIAL MEDIA & PRINT MATERIALS', copy.dxsText);
    return Boolean(merch || posters || social || dxsMaterials);
  }

  function apply() {
    injectStyles();
    let applied = false;
    document.querySelectorAll('.mc-modal').forEach(modal => {
      applied = updateNewGallery(modal) || applied;
    });
    document.querySelectorAll('.m10-modal').forEach(modal => {
      applied = updateLegacyGallery(modal) || applied;
    });
    return applied;
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
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  document.addEventListener('click', event => {
    if (event.target.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0);
      setTimeout(schedule, 100);
    }
  }, true);
})();