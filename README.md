# Yaroslav — Graphic Designer Portfolio

Минималистичный editorial / fashion / underground сайт-портфолио для графического дизайнера. Проект собран на React, Vite и Tailwind CSS, не требует backend и адаптирован под телефон и desktop.

## Что внутри

- Главный экран с именем, направлением и CTA-кнопкой.
- Сетка работ с временными placeholder-карточками: ZNY, F|ABLE, Pink Punk, Blandetto, Album Covers, Posters, Merch, AI Illustrations.
- Блок About с коротким описанием дизайнера.
- Список услуг: логотипы, постеры, обложки, мерч, бренд-визуалы и AI-иллюстрации.
- Контакты: Instagram, Telegram, Email.
- Белый фон, черная типографика, серые блоки и кислотно-зеленый акцент.
- Легкие hover-анимации и адаптивная верстка.

## Локальный запуск

Установите зависимости:

```bash
npm install
```

Запустите dev-сервер:

```bash
npm run dev
```

Откройте адрес из терминала, обычно:

```text
http://localhost:5173
```

## Production build

Соберите статическую версию проекта:

```bash
npm run build
```

Проверьте production-сборку локально:

```bash
npm run preview
```

Готовые файлы появятся в папке `dist/`.

## Деплой

### Vercel

1. Загрузите репозиторий на GitHub.
2. В Vercel нажмите **Add New Project** и выберите репозиторий.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Нажмите **Deploy**.

### Netlify

1. Загрузите репозиторий на GitHub.
2. В Netlify выберите **Add new site → Import an existing project**.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Нажмите **Deploy site**.

### GitHub Pages

1. Установите пакет для деплоя:

```bash
npm install --save-dev gh-pages
```

2. Добавьте в `package.json` scripts:

```json
{
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Запустите деплой:

```bash
npm run deploy
```

> Если проект размещается не в корне домена, настройте `base` в `vite.config.js` под имя репозитория.
