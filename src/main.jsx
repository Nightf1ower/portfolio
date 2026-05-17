import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const works = [
  { title: 'ZNY', type: 'Brand identity', mark: '01', tone: 'from-zinc-100 to-zinc-300' },
  { title: 'F|ABLE', type: 'Logo system', mark: '02', tone: 'from-neutral-200 to-white' },
  { title: 'Pink Punk', type: 'Poster series', mark: '03', tone: 'from-stone-100 to-zinc-400' },
  { title: 'Blandetto', type: 'Merch capsule', mark: '04', tone: 'from-zinc-300 to-neutral-100' },
  { title: 'Album Covers', type: 'Music visuals', mark: '05', tone: 'from-white to-zinc-300' },
  { title: 'Posters', type: 'Editorial print', mark: '06', tone: 'from-neutral-100 to-stone-300' },
  { title: 'Merch', type: 'Textile graphics', mark: '07', tone: 'from-zinc-200 to-zinc-50' },
  { title: 'AI Illustrations', type: 'Neural art direction', mark: '08', tone: 'from-stone-300 to-white' },
];


const pinkPunkWorks = [
  {
    title: 'Pink Punk 01',
    type: 'Flat / worn poster',
    mark: 'PP 01',
    flat: '/works/pink-punk/- pink-punk-01-flat.jpg',
    worn: '/works/pink-punk/- pink-punk-01-worn.jpg',
  },
  {
    title: 'Pink Punk 02',
    type: 'Flat / worn poster',
    mark: 'PP 02',
    flat: '/works/pink-punk/- pink-punk-02-flat.jpg',
    worn: '/works/pink-punk/- pink-punk-02-worn.jpg',
  },
  {
    title: 'Pink Punk 03',
    type: 'Flat / worn poster',
    mark: 'PP 03',
    flat: '/works/pink-punk/- pink-punk-03-flat.jpg',
    worn: '/works/pink-punk/- pink-punk-03-worn.jpg',
  },
  { title: 'PP Alphabet', type: 'Typography asset', mark: 'PP 04', src: '/works/pink-punk/PP_ALPHABET.jpg' },
  { title: 'PP Man', type: 'Character graphic', mark: 'PP 05', src: '/works/pink-punk/PP_MAN.jpg' },
  { title: 'Not Dead', type: 'Poster graphic', mark: 'PP 06', src: '/works/pink-punk/PP_NOT_DEAD.jpg' },
  { title: 'PP Mark', type: 'Logo graphic', mark: 'PP 07', src: '/works/pink-punk/PP_PP.jpg' },
  { title: 'PP Punk', type: 'Type graphic', mark: 'PP 08', src: '/works/pink-punk/PP_PUNK.jpg' },
  { title: 'PP Punk 2', type: 'Type graphic', mark: 'PP 09', src: '/works/pink-punk/PP_PUNK_2.jpg' },
];

const services = [
  'Logo design',
  'Posters',
  'Album covers',
  'Merch graphics',
  'Brand visuals',
  'AI illustrations',
];

function App() {
  return (
    <main className="min-h-screen bg-white text-ink selection:bg-acid selection:text-ink">
      <Header />
      <Hero />
      <Works />
      <About />
      <Services />
      <Contacts />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/85 px-4 py-3 backdrop-blur md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between text-xs font-semibold uppercase tracking-[0.28em]">
        <a className="group flex items-center gap-2" href="#top" aria-label="Yaroslav portfolio home">
          <span className="h-2 w-2 rounded-full bg-acid transition-transform duration-300 group-hover:scale-[2.4]" />
          Yaroslav
        </a>
        <div className="hidden gap-6 sm:flex">
          <a className="nav-link" href="#works">Works</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#services">Services</a>
          <a className="nav-link" href="#contacts">Contacts</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-14 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div className="absolute right-[-16rem] top-20 h-[34rem] w-[34rem] rounded-full bg-acid/25 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="relative z-10">
          <p className="mb-4 inline-flex border border-ink px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.42em]">
            Posters / Covers / Merch / Logos / AI Visuals
          </p>
          <h1 className="font-display text-[clamp(4.8rem,18vw,17rem)] font-black uppercase leading-[0.75] tracking-editorial">
            Ярослав
          </h1>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-3xl font-semibold uppercase leading-none tracking-[-0.05em] md:text-6xl">
              Graphic Designer
            </p>
            <a
              href="#works"
              className="group inline-flex w-fit items-center gap-3 border-2 border-ink bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.24em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-acid hover:text-ink hover:shadow-brutal"
            >
              View works
              <span className="transition-transform duration-300 group-hover:translate-x-2">↘</span>
            </a>
          </div>
        </div>
        <div className="relative z-10 min-h-[24rem] border border-ink bg-fog p-4 md:min-h-[34rem]">
          <div className="flex h-full flex-col justify-between bg-[linear-gradient(135deg,#050505_0_1px,transparent_1px_22px)] p-5">
            <span className="w-fit bg-acid px-3 py-1 text-xs font-black uppercase tracking-[0.3em]">Selected visual noise</span>
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

function Works() {
  return (
    <section id="works" className="border-t border-ink px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Works" title="Selected projects / rough luxury grid" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((work, index) => (
            <article
              key={work.title}
              className={`group min-h-[23rem] border border-ink bg-gradient-to-br ${work.tone} p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-brutal ${index % 5 === 0 ? 'sm:col-span-2' : ''}`}
            >
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
                      Placeholder visual
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-4xl font-black uppercase tracking-[-0.08em] md:text-5xl">{work.title}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink/60">{work.type}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <SectionTitle eyebrow="Pink Punk" title="Already uploaded poster system / hover wear tests" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinkPunkWorks.map((work) => (
              <PinkPunkCard key={work.title} work={work} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function PinkPunkCard({ work }) {
  const isHoverPair = Boolean(work.flat && work.worn);

  return (
    <article className="group min-h-[28rem] border border-ink bg-fog p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-brutal">
      <div className="flex h-full flex-col justify-between overflow-hidden border border-ink/20 bg-white/60 p-4 backdrop-blur-sm">
        <div className="flex items-start justify-between text-xs font-black uppercase tracking-[0.3em]">
          <span>{work.mark}</span>
          <span>{isHoverPair ? 'Hover' : 'Static'}</span>
        </div>
        <figure className={`pink-punk-frame my-6 ${isHoverPair ? 'pink-punk-frame--hover' : ''}`}>
          <img
            className="pink-punk-image pink-punk-image--base"
            src={isHoverPair ? work.flat : work.src}
            alt={`${work.title} ${isHoverPair ? 'flat artwork' : 'artwork'}`}
            loading="lazy"
          />
          {isHoverPair && (
            <img
              className="pink-punk-image pink-punk-image--worn"
              src={work.worn}
              alt={`${work.title} worn artwork`}
              loading="lazy"
            />
          )}
        </figure>
        <div>
          <h3 className="font-display text-4xl font-black uppercase tracking-[-0.08em] md:text-5xl">{work.title}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink/60">{work.type}</p>
        </div>
      </div>
    </article>
  );
}

function About() {
  return (
    <section id="about" className="bg-fog px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow="About" title="High contrast taste, music energy, fashion discipline" />
        <p className="text-2xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
          Ярослав — графический дизайнер, работающий с брендами, артистами, обложками, мерчем, постерами,
          логотипами и нейроиллюстрациями высокого уровня. Его визуальный язык соединяет минимализм,
          андеграундную типографику и точную арт-дирекцию для проектов, которым нужен сильный узнаваемый образ.
        </p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-y border-ink px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Services" title="Design objects for artists, brands and culture" />
        <div className="mt-10 grid border-t border-ink">
          {services.map((service) => (
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

function Contacts() {
  return (
    <footer id="contacts" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Contacts" title="Open for sharp visual systems" />
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {['Instagram', 'Telegram', 'Email'].map((contact) => (
            <a
              key={contact}
              href={contact === 'Email' ? 'mailto:hello@yaroslav.design' : '#'}
              className="group flex min-h-36 items-end justify-between border border-ink bg-fog p-5 text-2xl font-black uppercase tracking-[-0.05em] transition-all duration-300 hover:-translate-y-2 hover:bg-ink hover:text-white hover:shadow-brutal md:text-4xl"
            >
              {contact}
              <span className="text-acid transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2">↗</span>
            </a>
          ))}
        </div>
        <p className="mt-14 text-xs font-bold uppercase tracking-[0.35em] text-ink/45">
          © 2026 Yaroslav — Graphic Designer. No backend. Just taste.
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
