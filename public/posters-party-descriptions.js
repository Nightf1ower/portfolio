(() => {
  if (window.__postersPartyDescriptionsV4) return;
  window.__postersPartyDescriptionsV4 = true;

  const VERSION = 'posters-party-descriptions-4';
  const STYLE_ID = 'posters-party-descriptions-style';

  const COPY = {
    ru: {
      'KLUBIQUE PARTY': 'Постер для KLUBIQUE PARTY был собран на основе моих предыдущих визуальных экспериментов и идей команды. Вся работа выполнена полностью вручную, без использования Photoshop: ножницы, принтер, бумага, сканер, ручная графика и физическая сборка коллажа. В ход пошли практически все доступные средства, чтобы сохранить живую, неровную и тактильную эстетику изображения.',
      'YASNO PARTY': 'Главным визуальным референсом для серии постеров YASNO PARTY стал блок знакомств из старого российского журнала начала 2000-х. Нарочито низкое качество печати, хаотичная верстка, фотографии и характерная типографика того времени легли в основу всей айдентики события. Серия наполнена большим количеством небольших отсылок и деталей — как в основном постере, так и в персональных постерах участников.',
      'B-DAY PARTY': 'Основная идея постера — показать узнаваемый символ праздника, но уйти от привычной чистой и праздничной эстетики. Знакомый образ намеренно помещен в более грязную и грубую визуальную среду: потертости, шум, несовершенная печать и текстуры создают ощущение немного испорченного, но живого праздничного артефакта.',
    },
    en: {
      'KLUBIQUE PARTY': 'The KLUBIQUE PARTY poster was created using elements of my previous visual experiments combined with ideas from the team. The entire piece was made by hand without using Photoshop — scissors, a printer, paper, a scanner, hand-drawn graphics, and physical collage techniques were all part of the process. Almost every available tool was used to preserve the raw, imperfect, and tactile character of the final image.',
      'YASNO PARTY': 'The main visual reference for the YASNO PARTY poster series was a personal ads section from an old Russian magazine from the early 2000s. Intentionally poor print quality, chaotic layouts, photography, and period-specific typography became the foundation of the event’s visual identity. The series is filled with small references and hidden details appearing throughout both the main poster and the individual participant posters.',
      'B-DAY PARTY': 'The main idea behind the poster was to take a recognizable symbol of celebration and move it away from the usual clean and polished party aesthetic. The familiar image is intentionally placed in a rougher visual environment, with distressed textures, noise, imperfect printing, and imperfections creating the feeling of a slightly damaged yet alive party artifact.',
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  function installStyles() {
    const old = document.getElementById(STYLE_ID);
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .pcg-modal {
        background: #2C3D55 !important;
        color: #fff !important;
        padding-bottom: 0 !important;
      }

      .pcg-head {
        background: rgba(44, 61, 85, .94) !important;
      }

      .pcg-section {
        border-top: 0 !important;
      }

      .pcg-section--italy,
      .pcg-events-section {
        background: #2C3D55 !important;
        color: #fff !important;
      }

      .pcg-events-section {
        width: 100vw !important;
        box-sizing: border-box !important;
        margin: 0 0 0 calc(50% - 50vw) !important;
        padding-left: max(1rem, env(safe-area-inset-left)) !important;
        padding-right: max(1rem, env(safe-area-inset-right)) !important;
        padding-bottom: 0 !important;
      }

      .pcg-event-block--klubique {
        width: 100vw !important;
        box-sizing: border-box !important;
        margin: 0 0 0 calc(50% - 50vw) !important;
        padding: clamp(3.5rem, 6vw, 6rem) max(1rem, env(safe-area-inset-right)) clamp(4rem, 7vw, 7rem) max(1rem, env(safe-area-inset-left)) !important;
        background: linear-gradient(
          180deg,
          #2C3D55 0%,
          #2C3D55 8%,
          #667487 24%,
          #a9b1bc 36%,
          #dfe2e6 47%,
          #ffffff 58%,
          #ffffff 100%
        ) !important;
        color: #fff !important;
      }

      .pcg-event-block--klubique > .pcg-event-subtitle,
      .pcg-event-block--klubique > .pcg-party-copy {
        color: #fff !important;
      }

      .pcg-event-block--yasno {
        width: 100vw !important;
        box-sizing: border-box !important;
        margin: 0 0 0 calc(50% - 50vw) !important;
        padding: max(4rem, 7vw) max(1rem, env(safe-area-inset-right)) max(4rem, 7vw) max(1rem, env(safe-area-inset-left)) !important;
        background: linear-gradient(
          180deg,
          #ffffff 0%,
          #ffffff 8%,
          #e9efec 24%,
          #cad8d0 40%,
          #9db9aa 58%,
          #739986 74%,
          #56876D 90%,
          #56876D 100%
        ) !important;
        color: #050505 !important;
      }

      .pcg-event-block--bday,
      .pcg-flawa-section,
      .pcg-after-events-section {
        width: 100vw !important;
        box-sizing: border-box !important;
        margin: 0 0 0 calc(50% - 50vw) !important;
        background: #56876D !important;
        color: #050505 !important;
        border: 0 !important;
      }

      .pcg-event-block--bday {
        padding: clamp(4rem, 7vw) max(1rem, env(safe-area-inset-right)) clamp(5rem, 8vw) max(1rem, env(safe-area-inset-left)) !important;
        margin-bottom: 0 !important;
      }

      .pcg-flawa-section {
        position: relative !important;
        margin-top: 0 !important;
        box-shadow: 0 -6rem 0 #56876D !important;
      }

      .pcg-flawa-section,
      .pcg-after-events-section {
        padding-left: max(1rem, env(safe-area-inset-left)) !important;
        padding-right: max(1rem, env(safe-area-inset-right)) !important;
      }

      .pcg-inner > .pcg-section:last-of-type {
        margin-bottom: 0 !important;
        padding-bottom: max(5rem, env(safe-area-inset-bottom)) !important;
        background: #56876D !important;
        box-shadow: 0 6rem 0 #56876D !important;
      }

      .pcg-event-block > .pcg-party-copy {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 0 clamp(2rem, 4vw, 3.5rem) !important;
        padding-right: clamp(0rem, 8vw, 9rem) !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: clamp(1rem, 1.25vw, 1.3rem) !important;
        font-weight: 500 !important;
        line-height: 1.42 !important;
        letter-spacing: -.015em !important;
      }

      .pcg-event-block > .pcg-event-subtitle + .pcg-party-copy {
        margin-top: 0 !important;
      }

      @media (max-width: 620px) {
        .pcg-event-block > .pcg-party-copy {
          padding-right: 0 !important;
          font-size: 1rem !important;
          line-height: 1.45 !important;
          margin-bottom: 2rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function applyToBlock(block) {
    const heading = block.querySelector(':scope > .pcg-event-subtitle');
    if (!heading) return;
    const key = heading.textContent.trim().toUpperCase();
    const text = COPY[language()][key];
    if (!text) return;

    let paragraph = block.querySelector(':scope > .pcg-party-copy');
    if (!paragraph) {
      paragraph = document.createElement('p');
      paragraph.className = 'pcg-party-copy';
      heading.insertAdjacentElement('afterend', paragraph);
    }
    paragraph.textContent = text;
  }

  function apply() {
    installStyles();
    document.querySelectorAll('.pcg-event-block').forEach(applyToBlock);
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
})();
