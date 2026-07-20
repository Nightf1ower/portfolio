(() => {
  if (window.__portfolioStaticAssetsV2) return;
  window.__portfolioStaticAssetsV2 = true;

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
    concept: Array.from({ length: 4 }, (_, index) =>
      `public/works/stayugly/concept/concept-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    final: Array.from({ length: 3 }, (_, index) =>
      `public/works/stayugly/final/final-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    photo: Array.from({ length: 11 }, (_, index) =>
      `public/works/stayugly/photo/photo-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    package: ['public/works/stayugly/package/package-01.jpg'],
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

  const TREE = [...FABLE, ...MERCH].map((path) => ({
    path,
    type: 'blob',
    mode: '100644',
  }));

  const toLocalUrl = (path) => `/${path.replace(/^public\//, '')}`;
  const directoryItems = (paths) => paths.map((path) => ({
    type: 'file',
    name: path.split('/').pop(),
    path,
    download_url: toLocalUrl(path),
  }));

  const RAW_PREFIX = 'https://raw.githubusercontent.com/Nightf1ower/portfolio/main/public/';
  const localizeImageUrl = (value) => {
    if (typeof value !== 'string' || !value.startsWith(RAW_PREFIX)) return value;
    return `/${value.slice(RAW_PREFIX.length)}`;
  };

  const imageSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if (imageSrcDescriptor?.get && imageSrcDescriptor?.set) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      enumerable: imageSrcDescriptor.enumerable,
      get() {
        return imageSrcDescriptor.get.call(this);
      },
      set(value) {
        imageSrcDescriptor.set.call(this, localizeImageUrl(value));
      },
    });
  }

  const originalSetAttribute = HTMLImageElement.prototype.setAttribute;
  HTMLImageElement.prototype.setAttribute = function setAttribute(name, value) {
    return originalSetAttribute.call(
      this,
      name,
      String(name).toLowerCase() === 'src' ? localizeImageUrl(value) : value,
    );
  };

  const originalFetch = window.fetch.bind(window);

  window.fetch = (input, init) => {
    const rawUrl = typeof input === 'string' ? input : input?.url;
    if (!rawUrl) return originalFetch(input, init);

    let parsed;
    try {
      parsed = new URL(rawUrl, window.location.href);
    } catch {
      return originalFetch(input, init);
    }

    if (parsed.hostname !== 'api.github.com') return originalFetch(input, init);

    const treeMatch = parsed.pathname.match(/^\/repos\/Nightf1ower\/portfolio\/git\/trees\/main$/i);
    if (treeMatch) {
      return Promise.resolve(new Response(JSON.stringify({
        sha: 'static-portfolio-assets-v2',
        truncated: false,
        tree: TREE,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }));
    }

    const contentsMatch = parsed.pathname.match(
      /^\/repos\/Nightf1ower\/portfolio\/contents\/public\/works\/(zny|stayugly)\/([^/]+)$/i
    );

    if (contentsMatch) {
      const project = contentsMatch[1].toLowerCase();
      const folder = decodeURIComponent(contentsMatch[2]).toLowerCase();
      const source = project === 'zny' ? ZNY : STAY_UGLY;
      const paths = source[folder] || [];

      return Promise.resolve(new Response(JSON.stringify(directoryItems(paths)), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }));
    }

    return originalFetch(input, init);
  };

  window.PORTFOLIO_STATIC_ASSETS = Object.freeze({
    fable: FABLE,
    zny: ZNY,
    stayUgly: STAY_UGLY,
    merch: MERCH,
  });
})();