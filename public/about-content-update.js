(() => {
  if (window.__aboutContentUpdateV2) return;
  window.__aboutContentUpdateV2 = true;

  const VERSION = 'about-content-update-2';
  const STYLE_ID = 'about-content-update-style';
  const EMAIL = 'Nightf1ower@yandex.ru';

  const COPY = {
    ru: {
      title: ['СОБИРАЮ ВИЗУАЛЬНЫЙ ЯЗЫК','ИЗ ФОРМЫ, ФАКТУРЫ И ИДЕИ —','ДЛЯ БРЕНДОВ, ПРОДУКТОВ','И АВТОРСКИХ ПРОЕКТОВ'].join('\n'),
      paragraphs: [
        'Меня зовут Ярослав, я графический дизайнер. Создаю айдентику, принты, обложки, постеры, мерч и визуальный контент для digital-среды.',
        'В работе я соединяю ручную графику и цифровые инструменты. Люблю рисовать, собирать коллажи, экспериментировать с материалами и находить нестандартные визуальные решения. Затем дорабатываю и адаптирую графику в Adobe Photoshop и Illustrator, сохраняя живую фактуру и индивидуальный характер каждой работы.',
        'Для меня важно не просто создать красивое изображение, а сформировать цельный визуальный язык, который отражает идею и характер проекта.',
      ],
      availability: 'ОТКРЫТ К ФРИЛАНСУ, КОЛЛАБОРАЦИЯМ И НОВЫМ ПРОЕКТАМ.',
      copyEmail: 'СКОПИРОВАТЬ EMAIL',
      copied: 'EMAIL СКОПИРОВАН',
    },
    en: {
      title: ['I BUILD VISUAL LANGUAGES','THROUGH FORM, TEXTURE AND IDEAS —','FOR BRANDS, PRODUCTS','AND INDEPENDENT PROJECTS'].join('\n'),
      paragraphs: [
        'My name is Yaroslav, and I’m a graphic designer. I create visual identities, prints, album covers, posters, merchandise and digital content.',
        'My work combines handmade graphics with digital tools. I enjoy drawing, creating collages, experimenting with different materials and finding unconventional visual solutions. I then refine and adapt the graphics in Adobe Photoshop and Illustrator while preserving the raw texture and individual character of each piece.',
        'My goal is not simply to create an attractive image, but to develop a cohesive visual language that reflects the idea and personality behind each project.',
      ],
      availability: 'AVAILABLE FOR FREELANCE, COLLABORATIONS & NEW PROJECTS.',
      copyEmail: 'COPY EMAIL',
      copied: 'EMAIL COPIED',
    },
  };

  function language() {
    return document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  }

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      #about > .mx-auto.grid {
        box-sizing:border-box!important;display:grid!important;grid-template-columns:minmax(0,1fr)!important;
        gap:clamp(2.25rem,4.5vw,4.5rem)!important;width:100%!important;max-width:80rem!important;
      }
      #about > .mx-auto.grid > div:first-child {
        box-sizing:border-box!important;display:grid!important;grid-template-columns:12rem minmax(0,1fr)!important;
        align-items:start!important;gap:1rem!important;width:100%!important;max-width:none!important;
      }
      #about .about-content-update-title {
        box-sizing:border-box!important;width:100%!important;max-width:none!important;margin:0!important;white-space:pre-line!important;
        overflow-wrap:normal!important;word-break:normal!important;text-wrap:balance!important;
        font-size:clamp(2.7rem,5.15vw,5.9rem)!important;line-height:.84!important;letter-spacing:-.075em!important;
      }
      #about .about-content-update-copy {
        box-sizing:border-box!important;display:grid!important;gap:clamp(1.1rem,2vw,1.6rem)!important;
        width:min(calc(100% - 13rem),64rem)!important;max-width:64rem!important;margin:0 0 0 12rem!important;padding-left:1rem!important;
        color:rgba(5,5,5,.8)!important;font-family:Arial,Helvetica,sans-serif!important;font-size:clamp(1.08rem,1.55vw,1.42rem)!important;
        font-weight:600!important;line-height:1.43!important;letter-spacing:-.024em!important;
      }
      #about .about-content-update-copy p { margin:0!important; }
      #about .about-content-update-copy p:first-child { color:#050505!important;font-size:clamp(1.25rem,1.9vw,1.7rem)!important;line-height:1.32!important; }

      #contacts .portfolio-contact-cta {
        box-sizing:border-box!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;
        align-items:end!important;gap:1rem!important;margin-top:clamp(2.25rem,4vw,3.5rem)!important;
        padding:clamp(1rem,2.2vw,1.5rem) 0!important;border-top:1px solid #050505!important;border-bottom:1px solid #050505!important;
      }
      #contacts .portfolio-contact-availability {
        margin:0!important;max-width:18ch!important;font:900 clamp(2rem,5vw,5.5rem)/.84 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.065em!important;text-transform:uppercase!important;
      }
      #contacts .portfolio-copy-email {
        min-height:3.2rem!important;padding:.8rem 1rem!important;border:1px solid #050505!important;border-radius:0!important;
        background:#a6ff00!important;color:#050505!important;cursor:pointer!important;
        font:900 .68rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important;
        transition:background .18s ease,color .18s ease!important;
      }
      #contacts .portfolio-copy-email:hover { background:#050505!important;color:#fff!important; }

      @media(max-width:767px){
        #about > .mx-auto.grid{gap:2.5rem!important}
        #about > .mx-auto.grid > div:first-child{grid-template-columns:minmax(0,1fr)!important;gap:1.25rem!important}
        #about .about-content-update-title{font-size:clamp(2.15rem,10.5vw,3.5rem)!important;line-height:.88!important;letter-spacing:-.065em!important;text-wrap:pretty!important}
        #about .about-content-update-copy{width:100%!important;max-width:none!important;margin-left:0!important;padding-left:0!important;font-size:1.04rem!important;line-height:1.48!important}
        #about .about-content-update-copy p:first-child{font-size:1.18rem!important}
        #contacts .portfolio-contact-cta{grid-template-columns:1fr!important;align-items:start!important}
        #contacts .portfolio-contact-availability{font-size:clamp(2rem,10vw,3.6rem)!important}
        #contacts .portfolio-copy-email{width:100%!important;min-height:3.4rem!important}
      }
    `;
    document.head.append(style);
  }

  function updateCopy(container, paragraphs) {
    const current = [...container.querySelectorAll(':scope > p')].map((paragraph) => paragraph.textContent || '');
    const matches = current.length === paragraphs.length && current.every((value, index) => value === paragraphs[index]);
    if (matches) return;
    container.replaceChildren(...paragraphs.map((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
  }

  function applyAbout() {
    const section = document.getElementById('about');
    const inner = section?.querySelector(':scope > .mx-auto.grid');
    const title = inner?.querySelector('h2');
    if (!section || !inner || !title) return false;

    const selected = COPY[language()];
    title.classList.add('about-content-update-title');
    if (title.textContent !== selected.title) title.textContent = selected.title;

    let copy = inner.querySelector(':scope > .about-content-update-copy');
    if (!copy) {
      const oldCopy = [...inner.children].find((node) => node instanceof HTMLElement && node !== title.parentElement && (node.tagName === 'P' || node.classList.contains('about-content-update-copy')));
      copy = document.createElement('div');
      copy.className = 'about-content-update-copy';
      copy.dataset.version = VERSION;
      if (oldCopy) oldCopy.replaceWith(copy); else inner.append(copy);
    }
    copy.lang = language();
    updateCopy(copy, selected.paragraphs);
    section.dataset.aboutContentVersion = `${VERSION}-${language()}`;
    return true;
  }

  function applyContacts() {
    const section = document.getElementById('contacts');
    const inner = section?.querySelector(':scope > .mx-auto');
    const linksGrid = inner?.querySelector('.mt-10.grid');
    if (!section || !inner || !linksGrid) return false;

    const selected = COPY[language()];
    let cta = inner.querySelector(':scope > .portfolio-contact-cta');
    if (!cta) {
      cta = document.createElement('div');
      cta.className = 'portfolio-contact-cta';
      const availability = document.createElement('p');
      availability.className = 'portfolio-contact-availability';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'portfolio-copy-email';
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(EMAIL);
          button.textContent = COPY[language()].copied;
        } catch {
          window.location.href = `mailto:${EMAIL}`;
        }
        window.setTimeout(() => { button.textContent = COPY[language()].copyEmail; }, 1800);
      });
      cta.append(availability, button);
      linksGrid.before(cta);
    }

    cta.querySelector('.portfolio-contact-availability').textContent = selected.availability;
    const button = cta.querySelector('.portfolio-copy-email');
    if (button && !button.textContent.includes('COPIED') && !button.textContent.includes('СКОПИРОВАН')) button.textContent = selected.copyEmail;
    section.dataset.contactContentVersion = `${VERSION}-${language()}`;
    return true;
  }

  function apply() {
    installStyles();
    return applyAbout() || applyContacts();
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      installStyles();
      applyAbout();
      applyContacts();
    });
  }

  const bodyObserver = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => {
      const target = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
      if (target?.closest?.('#about,#contacts')) return true;
      return [...mutation.addedNodes].some((node) => node instanceof Element && (node.id === 'about' || node.id === 'contacts' || node.querySelector?.('#about,#contacts')));
    });
    if (relevant) schedule();
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  new MutationObserver(() => { setTimeout(schedule, 0); setTimeout(schedule, 80); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0); setTimeout(schedule, 100);
    }
  }, true);

  window.addEventListener('load', schedule);
  installStyles();
  [0,80,240,700].forEach((delay) => setTimeout(schedule, delay));
})();
