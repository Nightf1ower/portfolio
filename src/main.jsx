import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const works = [
  { title: 'ZNY', type: { ru: 'Айдентика бренда', en: 'Brand identity' }, mark: '01', tone: 'from-zinc-100 to-zinc-300' },
  { title: 'F | ABLE', type: { ru: 'Логотип и визуальная система', en: 'Logo and visual system' }, mark: '02', tone: 'from-neutral-200 to-white' },
  { slug: 'pink-punk', title: 'PINK PUNK', type: { ru: 'Постеры / мерч-система', en: 'Posters / merch system' }, mark: '03', tone: 'from-stone-100 to-zinc-400' },
  { title: 'CARNIVAL RECORDS', type: { ru: 'Визуалы музыкального лейбла', en: 'Music label visuals' }, mark: '04', tone: 'from-white to-zinc-300' },
  { title: 'BLANDETTO', type: { ru: 'Мерч-капсула', en: 'Merch capsule' }, mark: '05', tone: 'from-zinc-300 to-neutral-100' },
  { title: 'POSTERS', type: { ru: 'Постер-дизайн', en: 'Poster design' }, mark: '06', tone: 'from-neutral-100 to-stone-300' },
  { title: 'MERCH', type: { ru: 'Текстильная графика', en: 'Textile graphics' }, mark: '07', tone: 'from-zinc-200 to-zinc-50' },
  { title: '90.06', type: { ru: 'Визуальная система', en: 'Visual system' }, mark: '08', tone: 'from-stone-300 to-white' },
];

const pinkPunkBase = 'https://raw.githubusercontent.com/Nightf1ower/portfolio/main/works/pink-punk';

const pinkPunkImages = [
  {
    id: '01',
    flat: `${pinkPunkBase}/-%20pink-punk-01-flat.jpg`,
    worn: `${pinkPunkBase}/-%20pink-punk-01-worn.jpg`,
    alt: 'Pink Punk artwork 01',
  },
  {
    id: '02',
    flat: `${pinkPunkBase}/-%20pink-punk-02-flat.jpg`,
    worn: `${pinkPunkBase}/-%20pink-punk-02-worn.jpg`,
    alt: 'Pink Punk artwork 02',
  },
  {
    id: '03',
    flat: `${pinkPunkBase}/-%20pink-punk-03-flat.jpg`,
    worn: `${pinkPunkBase}/-%20pink-punk-03-worn.jpg`,
    alt: 'Pink Punk artwork 03',
  },
  { id: '04', src: `${pinkPunkBase}/PP_ALPHABET.jpg`, alt: 'Pink Punk alphabet artwork' },
  { id: '05', src: `${pinkPunkBase}/PP_MAN.jpg`, alt: 'Pink Punk man artwork' },
  { id: '06', src: `${pinkPunkBase}/PP_NOT_DEAD.jpg`, alt: 'Pink Punk not dead artwork' },
  { id: '07', src: `${pinkPunkBase}/PP_PP.jpg`, alt: 'Pink Punk PP artwork' },
  { id: '08', src: `${pinkPunkBase}/PP_PUNK.jpg`, alt: 'Pink Punk artwork' },
  { id: '09', src: `${pinkPunkBase}/PP_PUNK_2.jpg`, alt: 'Pink Punk artwork 2' },
];

const contacts = [
  { label: 'Instagram', href: 'https://www.instagram.com/nightflovver/' },
  { label: 'Telegram', href: 'https://t.me/nightflower' },
  { label: 'Nightf1ower@yandex.ru', href: 'mailto:Nightf1ower@yandex.ru' },
];

const russianTimeZones = new Set([
  'Europe/Moscow',
  'Europe/Kaliningrad',
  'Europe/Samara',
  'Asia/Yekaterinburg',
  'Asia/Omsk',
  'Asia/Novosibirsk',
  'Asia/Barnaul',
  'Asia/Tomsk',
  'Asia/Krasnoyarsk',
  'Asia/Irkutsk',
  'Asia/Yakutsk',
  'Asia/Chita',
  'Asia/Vladivostok',
  'Asia/Magadan',
  'Asia/Sakhalin',
  'Asia/Srednekolymsk',
  'Asia/Kamchatka',
  'Asia/Anadyr',
]);

const translations = {
  ru: {
    nav: { works: 'Работы', about: 'Обо мне', services: 'Услуги', contacts: 'Контакты' },
    heroKicker: 'Постеры / Обложки / Мерч / Логотипы / AI-визуалы',
    profession: 'Графический дизайнер',
    viewWorks: 'Смотреть работы',
    visualNoise: 'Визуальный шум',
    worksEyebrow: 'Работы',
    worksTitle: 'Избранные проекты / rough luxury сетка',
    openProject: 'Открыть проект',
    placeholder: 'Визуальный плейсхолдер',
    pinkPunk: 'PINK PUNK',
    close: 'Закрыть',
    aboutEyebrow: 'Обо мне',
    aboutTitle: 'Контрастный вкус, музыкальная энергия, fashion-дисциплина',
    aboutText:
      'Ярослав — графический дизайнер, работающий с брендами, артистами, обложками, мерчем, постерами, логотипами и нейроиллюстрациями высокого уровня. Его визуальный язык соединяет минимализм, андеграундную типографику и точную арт-дирекцию для проектов, которым нужен сильный узнаваемый образ.',
    servicesEyebrow: 'Услуги',
    servicesTitle: 'Дизайн для артистов, брендов и культуры',
    services: ['Логотипы', 'Постеры', 'Обложки', 'Графика для мерча', 'Бренд-визуалы', 'AI-иллюстрации'],
    contactsEyebrow: 'Контакты',
    contactsTitle: 'Открыт к сильным визуальным системам',
    footer: '© 2026 Ярослав — графический дизайнер. No backend. Just taste.',
    languageButton: 'EN',
    languageLabel: 'Switch site to English',
    homeLabel: 'Портфолио Ярослава',
    openPinkPunkLabel: 'Открыть галерею проекта PINK PUNK',
    openImageLabel: 'Открыть изображение крупно',
  },
  en: {
    nav: { works: 'Works', about: 'About', services: 'Services', contacts: 'Contacts' },
    heroKicker: 'Posters / Covers / Merch / Logos / AI Visuals',
    profession: 'Graphic Designer',
    viewWorks: 'View works',
    visualNoise: 'Selected visual noise',
    worksEyebrow: 'Works',
    worksTitle: 'Selected projects / rough luxury grid',
    openProject: 'Open project',
    placeholder: 'Placeholder visual',
    pinkPunk: 'PINK PUNK',
    close: 'Close',
    aboutEyebrow: 'About',
    aboutTitle: 'High contrast taste, music energy, fashion discipline',
    aboutText:
      'Yaroslav is a graphic designer working with brands, artists, covers, merch, posters, logos and high-level AI illustrations. His visual language combines minimalism, underground typography and precise art direction for projects that need a strong recognizable image.',
    servicesEyebrow: 'Services',
    servicesTitle: 'Design objects for artists, brands and culture',
    services: ['Logo design', 'Posters', 'Album covers', 'Merch graphics', 'Brand visuals', 'AI illustrations'],
    contactsEyebrow: 'Contacts',
    contactsTitle: 'Open for sharp visual systems',
    footer: '© 2026 Yaroslav — Graphic Designer. No backend. Just taste.',
    languageButton: 'RU',
    languageLabel: 'Переключить сайт на русский',
    homeLabel: 'Yaroslav portfolio home',
    openPinkPunkLabel: 'Open PINK PUNK project gallery',
    openImageLabel: 'Open image fullscreen',
  },
};

function getText(value, lang) {
  return typeof value === 'string' ? value : value[lang];
}

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const savedLanguage = window.localStorage.getItem('site-language');
  if (savedLanguage === 'ru' || savedLanguage === 'en') {
    return savedLanguage;
  }

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const hasRussianLanguage = browserLanguages.some((language) => language?.toLowerCase().startsWith('ru'));
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const hasRussianTimeZone = russianTimeZones.has(timeZone);

  return hasRussianLanguage || hasRussianTimeZone ? 'ru' : 'en';
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = translations[language];

  useEffect(() => {
    window.localStorage.setItem('site-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => setLanguage((currentLanguage) => (currentLanguage === 'ru' ? 'en' : 'ru'));

  return (
    <main className="min-h-screen bg-white text-ink selection:bg-acid selection:text-ink">
      <Header language={language} onToggleLanguage={toggleLanguage} t={t} />
      <Hero t={t} />
      <Works language={language} t={t} />
      <About t={t} />
      <Services t={t} />
      <Contacts t={t} />
    </main>
  );
}

function Header({ language, onToggleLanguage, t }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/85 px-4 py-3 backdrop-blur md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.28em]">
        <a className="group flex items-center gap-2" href="#top" aria-label={t.homeLabel}>
          <span className="h-2 w-2 rounded-full bg-acid transition-transform duration-300 group-hover:scale-[2.4]" />
          Yaroslav
        </a>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden gap-6 sm:flex">
            <a className="nav-link" href="#works">{t.nav.works}</a>
            <a className="nav-link" href="#about">{t.nav.about}</a>
            <a className="nav-link" href="#services">{t.nav.services}</a>
            <a className="nav-link" href="#contacts">{t.nav.contacts}</a>
          </div>
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={t.languageLabel}
            className="border border-ink bg-white px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.22em] transition-all duration-300 hover:bg-ink hover:text-white"
          >
            {language} / {t.languageButton}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero({ t }) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-14 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div className="absolute right-[-16rem] top-20 h-[34rem] w-[34rem] rounded-full bg-acid/25 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="relative z-10">
          <p className="mb-4 inline-flex border border-ink px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.42em]">
            {t.heroKicker}
          </p>
          <h1 className="font-display text-[clamp(4.8rem,18vw,17rem)] font-black uppercase leading-[0.75] tracking-editorial">
            Ярослав
          </h1>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-3xl font-semibold uppercase leading-none tracking-[-0.05em] md:text-6xl">
              {t.profession}
            </p>
            <a
              href="#works"
              className="group inline-flex w-fit items-center gap-3 border-2 border-ink bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.24em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-acid hover:text-ink hover:shadow-brutal"
            >
              {t.viewWorks}
              <span className="transition-transform duration-300 group-hover:translate-x-2">↘</span>
            </a>
          </div>
        </div>
        <div className="relative z-10 min-h-[24rem] border border-ink bg-fog p-4 md:min-h-[34rem]">
          <div className="flex h-full flex-col justify-between bg-[linear-gradient(135deg,#050505_0_1px,transparent_1px_22px)] p-5">
            <span className="w-fit bg-acid px-3 py-1 text-xs font-black uppercase tracking-[0.3em]">{t.visualNoise}</span>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-28 bg-ink" />
              <div className="h-28 bg-concrete" />
              <div className="h-28 bg-acid" />
              <div className="col-span-2 h-28 bg-white outline outline-1 outline-ink" />
              <div className="h-28 bg-ink/10 outline outline-1 outline-ink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Works({ language, t }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="works" className="border-t border-ink px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={t.worksEyebrow} title={t.worksTitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((work, index) => {
            const title = getText(work.title, language);
            const isPinkPunk = work.slug === 'pink-punk';
            const className = `group min-h-[23rem] border border-ink bg-gradient-to-br ${work.tone} p-4 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-brutal ${index % 5 === 0 ? 'sm:col-span-2' : ''} ${isPinkPunk ? 'cursor-pointer' : ''}`;

            if (isPinkPunk) {
              return (
                <button
                  key={title}
                  type="button"
                  className={className}
                  onClick={() => setActiveProject('pink-punk')}
                  aria-label={t.openPinkPunkLabel}
                >
                  <WorkCardContent work={work} language={language} t={t} />
                </button>
              );
            }

            return (
              <article key={title} className={className}>
                <WorkCardContent work={work} language={language} t={t} />
              </article>
            );
          })}
        </div>
      </div>
      {activeProject === 'pink-punk' && <PinkPunkModal onClose={() => setActiveProject(null)} t={t} />}
    </section>
  );
}

function WorkCardContent({ work, language, t }) {
  const title = getText(work.title, language);

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden border border-ink/20 bg-white/35 p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between text-xs font-black uppercase tracking-[0.3em]">
        <span>{work.mark}</span>
        <span className="h-3 w-3 rounded-full bg-acid opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="my-10 flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-44 max-w-full border border-ink bg-white transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
          <div className="absolute inset-4 bg-ink" />
          <div className="absolute inset-x-8 top-10 h-16 bg-acid mix-blend-difference" />
          <div className="absolute bottom-6 left-6 right-6 border-t border-white pt-2 text-center text-[0.55rem] font-black uppercase tracking-[0.24em] text-white">
            {work.slug === 'pink-punk' ? t.openProject : t.placeholder}
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-display text-4xl font-black uppercase tracking-[-0.08em] md:text-5xl">{title}</h3>
        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink/60">{getText(work.type, language)}</p>
      </div>
    </div>
  );
}

function PinkPunkModal({ onClose, t }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white/95 px-4 py-6 backdrop-blur-md md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-ink pb-4">
          <p className="bg-acid px-3 py-1 text-xs font-black uppercase tracking-[0.35em]">{t.pinkPunk}</p>
          <button
            type="button"
            onClick={onClose}
            className="border border-ink bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.25em] transition-all duration-300 hover:bg-ink hover:text-white"
          >
            {t.close}
          </button>
        </div>

        <div className="pink-punk-gallery">
          {pinkPunkImages.map((image) => (
            <PinkPunkImage key={image.id} image={image} onSelect={setSelectedImage} t={t} />
          ))}
        </div>
      </div>
      {selectedImage && <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} t={t} />}
    </div>
  );
}

function PinkPunkImage({ image, onSelect, t }) {
  const hasHover = Boolean(image.flat && image.worn);

  return (
    <button
      type="button"
      className={`pink-punk-frame ${hasHover ? 'pink-punk-frame--hover' : ''}`}
      onClick={() => onSelect(image)}
      aria-label={t.openImageLabel}
    >
      <img
        className="pink-punk-image pink-punk-image--base"
        src={hasHover ? image.flat : image.src}
        alt={image.alt}
        loading="lazy"
      />
      {hasHover && (
        <img
          className="pink-punk-image pink-punk-image--worn"
          src={image.worn}
          alt={`${image.alt} on body`}
          loading="lazy"
        />
      )}
    </button>
  );
}

function ImageLightbox({ image, onClose, t }) {
  const hasHover = Boolean(image.flat && image.worn);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/90 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 border border-white bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:bg-acid"
      >
        {t.close}
      </button>
      <div className={`pink-punk-lightbox-frame ${hasHover ? 'pink-punk-lightbox-frame--hover' : ''}`} onClick={(event) => event.stopPropagation()}>
        <img
          className="pink-punk-lightbox-image pink-punk-lightbox-image--base"
          src={hasHover ? image.flat : image.src}
          alt={image.alt}
        />
        {hasHover && (
          <img
            className="pink-punk-lightbox-image pink-punk-lightbox-image--worn"
            src={image.worn}
            alt={`${image.alt} on body`}
          />
        )}
      </div>
    </div>
  );
}

function About({ t }) {
  return (
    <section id="about" className="bg-fog px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow={t.aboutEyebrow} title={t.aboutTitle} />
        <p className="text-2xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
          {t.aboutText}
        </p>
      </div>
    </section>
  );
}

function Services({ t }) {
  return (
    <section id="services" className="border-y border-ink px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={t.servicesEyebrow} title={t.servicesTitle} />
        <div className="mt-10 grid border-t border-ink">
          {t.services.map((service) => (
            <div key={service} className="group flex items-center justify-between border-b border-ink py-5 transition-colors duration-300 hover:bg-acid">
              <span className="text-3xl font-black uppercase tracking-[-0.06em] md:text-7xl">{service}</span>
              <span className="text-3xl transition-transform duration-300 group-hover:rotate-45">+</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts({ t }) {
  return (
    <footer id="contacts" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={t.contactsEyebrow} title={t.contactsTitle} />
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-36 items-end justify-between border border-ink bg-fog p-5 text-2xl font-black uppercase tracking-[-0.05em] transition-all duration-300 hover:-translate-y-2 hover:bg-ink hover:text-white hover:shadow-brutal md:text-4xl"
            >
              {contact.label}
              <span className="text-acid transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2">↗</span>
            </a>
          ))}
        </div>
        <p className="mt-14 text-xs font-bold uppercase tracking-[0.35em] text-ink/45">
          {t.footer}
        </p>
      </div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:items-start">
      <p className="w-fit bg-acid px-3 py-1 text-xs font-black uppercase tracking-[0.35em]">{eyebrow}</p>
      <h2 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.85] tracking-editorial md:text-8xl">
        {title}
      </h2>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
