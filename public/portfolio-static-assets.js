(() => {
  if (window.__portfolioStaticAssetsV6) return;
  window.__portfolioStaticAssetsV6 = true;

  const THUMB_VERSION = 'quality-2';
  const DXS_THUMB_VERSION = 'dxs-quality-2';

  const FABLE = Array.from({ length: 40 }, (_, index) =>
    `public/works/fable/fprint-${String(index + 1).padStart(2, '0')}.jpg`
  );

  const ZNY = {
    prints: [
      'znyprint-01-tee.jpg', 'znyprint-01.jpg',
      'znyprint-02-tee.jpg', 'znyprint-02-variant-tee.jpg', 'znyprint-02-variant.jpg', 'znyprint-02.jpg',
      'znyprint-03.jpg',
      'znyprint-04-tee.jpg', 'znyprint-04-variant.jpg', 'znyprint-04.jpg',
      'znyprint-05-tee.jpg', 'znyprint-05-variant-02.jpg', 'znyprint-05-variant.jpg', 'znyprint-05.jpg',
      'znyprint-06-tee.jpg', 'znyprint-06.jpg',
      'znyprint-07-tee.jpg', 'znyprint-07-variant.jpg', 'znyprint-07.jpg',
      'znyprint-08-tee.jpg', 'znyprint-08.jpg',
      'znyprint-09-variant.jpg', 'znyprint-09.jpg',
    ].map((name) => `public/works/zny/prints/${name}`),
    afisha: Array.from({ length: 5 }, (_, index) =>
      `public/works/zny/afisha/afisha-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    example: Array.from({ length: 4 }, (_, index) =>
      `public/works/zny/example/primer-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    stickers: Array.from({ length: 5 }, (_, index) => {
      const number = String(index + 1).padStart(2, '0');
      return [
        `public/works/zny/stickers/znysticker-${number}.jpg`,
        `public/works/zny/stickers/znysticker-${number}-irl.jpg`,
      ];
    }).flat(),
  };

  const STAY_UGLY = {
    concept: [
      ...Array.from({ length: 4 }, (_, index) =>
        `public/works/stayugly/concept/concept-${String(index + 1).padStart(2, '0')}.jpg`
      ),
      ...Array.from({ length: 3 }, (_, index) =>
        `public/works/stayugly/concept/concept-n-${index + 1}.png`
      ),
    ],
    final: Array.from({ length: 3 }, (_, index) =>
      `public/works/stayugly/final/final-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    photo: Array.from({ length: 11 }, (_, index) =>
      `public/works/stayugly/photo/photo-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    package: [
      'public/works/stayugly/package/package-01.jpg',
      'public/works/stayugly/package/zips.png',
    ],
  };

  const MERCH = [
    'public/works/merch/yablochko/brochure/brochure-01-tee.jpg',
    'public/works/merch/yablochko/brochure/brochure-01.jpg',
    'public/works/merch/yablochko/brochure/brochure-02-tee.jpg',
    'public/works/merch/yablochko/brochure/brochure-02.jpg',
    'public/works/merch/yablochko/print/ya-print-01.jpg',
    'public/works/merch/yablochko/print/ya-print-02.png',
    'public/works/merch/yablochko/print/ya-print-03.jpg',
    'public/works/merch/yablochko/print/ya-print-04.jpg',
    'public/works/merch/yablochko/poster/ya-poster-01.jpg',
    'public/works/merch/yablochko/poster/ya-poster-02.png',
    'public/works/merch/yablochko/poster/ya-poster-03.jpg',
    'public/works/merch/yablochko/ad/ya-ad-01.png',
    'public/works/merch/yablochko/ad/ya-ad-02.jpg',
    'public/works/merch/yablochko/ad/ya-ad-03.jpg',
    'public/works/merch/yablochko/ad/ya-ad-04.jpg',
    'public/works/merch/yablochko/billboard/billboard-01.jpg',
    'public/works/merch/yablochko/billboard/billboard-02.jpg',
    'public/works/merch/yablochko/billboard/billboard-03.jpg',
    'public/works/merch/yablochko/billboard/billboard-04.jpg',
    'public/works/merch/yablochko/billboard/billboard-05.jpg',
    'public/works/merch/dxs/sticker/dxs-sticker-visual-01.png',
    'public/works/merch/dxs/sticker/dxs-sticker-visual-02.png',
    'public/works/merch/dxs/sticker/dxs_sticker-01.jpg',
    'public/works/merch/dxs/sticker/dxs_sticker-02.jpg',
    'public/works/merch/dxs/sticker/dxs_sticker-03.jpg',
    'public/works/merch/dxs/poster/dxs_poster-visual_01.jpg',
    'public/works/merch/dxs/poster/dxs_poster-visual_02.jpg',
    'public/works/merch/dxs/poster/dxs_poster_01.jpg',
    'public/works/merch/dxs/poster/dxs_poster_03.jpg',
    'public/works/merch/dxs/poster/dxs_poster_04.jpg',
    'public/works/merch/dxs/ad/dxs_ad_01.jpg',
    'public/works/merch/dxs/ad/dxs_ad_02.jpg',
    'public/works/merch/dxs/ad/dxs_ad_03.jpg',
  ];

  const toLocalUrl = (value) => {
    if (typeof value !== 'string' || !value) return value;
    if (value.startsWith('public/')) return `/${value.slice('public/'.length)}`;

    try {
      const url = new URL(value, window.location.href);
      const rawPublicPrefix = '/Nightf1ower/portfolio/main/public/';
      if (url.hostname === 'raw.githubusercontent.com' && url.pathname.startsWith(rawPublicPrefix)) {
        return `/${url.pathname.slice(rawPublicPrefix.length)}`;
      }
    } catch {}
    return value;
  };

  const stripQuery = (value) => String(value || '').split('#')[0].split('?')[0];

  const worksPath = (value) => {
    if (typeof value !== 'string' || !value) return '';
    const local = toLocalUrl(value);
    try {
      const url = new URL(local, window.location.href);
      const pathname = url.pathname;
      const marker = '/works/';
      const index = pathname.indexOf(marker);
      return index >= 0 ? pathname.slice(index) : '';
    } catch {
      const clean = stripQuery(local);
      const index = clean.indexOf('/works/');
      return index >= 0 ? clean.slice(index) : '';
    }
  };

  const replaceExtension = (pathname) => pathname.replace(/\.(?:avif|gif|jpe?g|png|webp)$/i, '.webp');

  const thumbUrl = (value) => {
    const pathname = worksPath(value);
    if (!pathname) return '';

    if (pathname.toLowerCase().startsWith('/works/merch/dxs/')) {
      const thumb = replaceExtension(pathname.replace(/^\/works\/merch\/dxs\//i, '/generated/dxs-thumbs/'));
      return `${thumb}?v=${DXS_THUMB_VERSION}`;
    }

    const thumb = replaceExtension(pathname.replace(/^\/works\//i, '/generated/portfolio-thumbs/'));
    return `${thumb}?v=${THUMB_VERSION}`;
  };

  const bindFallback = (image) => {
    if (!(image instanceof HTMLImageElement) || image.dataset.portfolioThumbFallback === 'true') return;
    image.dataset.portfolioThumbFallback = 'true';
    image.addEventListener('error', () => {
      const current = image.getAttribute('src') || '';
      if (!/\/generated\/(?:portfolio-thumbs|dxs-thumbs)\//.test(current)) return;
      const original = image.dataset.portfolioOriginal;
      image.dataset.portfolioThumbFailed = 'true';
      if (original && current !== original) image.src = original;
    });
  };

  const applyThumb = (image, original) => {
    if (!(image instanceof HTMLImageElement) || !original) return original;
    if (image.dataset.portfolioThumbFailed === 'true') {
      image.src = original;
      return original;
    }

    const thumb = thumbUrl(original);
    if (!thumb) {
      image.src = original;
      return original;
    }
    image.dataset.portfolioOriginal = original;
    bindFallback(image);
    image.src = thumb;
    return thumb;
  };

  window.PORTFOLIO_STATIC_ASSETS = Object.freeze({
    fable: FABLE,
    zny: ZNY,
    stayUgly: STAY_UGLY,
    merch: MERCH,
    toLocalUrl,
  });

  window.PORTFOLIO_THUMBS = Object.freeze({
    url: thumbUrl,
    apply: applyThumb,
    local: toLocalUrl,
    worksPath,
  });
})();
