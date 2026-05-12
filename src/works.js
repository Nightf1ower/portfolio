const works = [
  {
    title: 'Brand Identity',
    category: 'Айдентика',
    description: 'Система визуальных носителей и ключевые бренд-материалы.',
    image: 'public/works/brand-identity.jpg',
  },
  {
    title: 'Editorial Campaign',
    category: 'Кампания',
    description: 'Серия обложек, digital-макетов и промо-визуалов.',
    image: 'public/works/editorial-campaign.jpg',
  },
  {
    title: 'Packaging Concept',
    category: 'Упаковка',
    description: 'Концепция упаковки с выразительной типографикой и цветом.',
    image: 'public/works/packaging-concept.jpg',
  },
  {
    title: 'Social Media Kit',
    category: 'SMM',
    description: 'Набор шаблонов для регулярных публикаций и сторис.',
    image: 'public/works/social-media-kit.jpg',
  },
  {
    title: 'Poster Series',
    category: 'Постеры',
    description: 'Плакатная серия с акцентом на контраст и ритм.',
    image: 'public/works/poster-series.jpg',
  },
  {
    title: 'Web Visuals',
    category: 'Digital',
    description: 'Графика для лендинга, hero-экранов и презентаций.',
    image: 'public/works/web-visuals.jpg',
  },
];

const grid = document.querySelector('[data-works-grid]');
const template = document.querySelector('#work-card-template');

function getAltText(work) {
  return `${work.title}: ${work.description}`;
}

function renderWork(work, index) {
  const node = template.content.cloneNode(true);
  const card = node.querySelector('.work-card');
  const link = node.querySelector('.work-card__link');
  const image = node.querySelector('.work-card__image');
  const category = node.querySelector('.work-card__category');
  const title = node.querySelector('.work-card__title');
  const description = node.querySelector('.work-card__description');

  if (index < 2) {
    card.classList.add('work-card--featured');
  }

  link.href = work.url ?? '#works';
  link.setAttribute('aria-label', `Открыть проект «${work.title}»`);
  image.src = work.image;
  image.alt = getAltText(work);
  category.textContent = work.category;
  title.textContent = work.title;
  description.textContent = work.description;

  image.addEventListener('error', () => {
    card.classList.add('work-card--missing-image');
    image.removeAttribute('src');
    image.alt = `Изображение для проекта «${work.title}» не найдено в public/works`;
  }, { once: true });

  return node;
}

if (grid) {
  const fragment = document.createDocumentFragment();
  works.forEach((work, index) => fragment.append(renderWork(work, index)));
  grid.append(fragment);
}
