(() => {
  if (window.__merchUiPerformanceV12) return;
  window.__merchUiPerformanceV12 = true;

  const originalFetch = window.fetch.bind(window);
  const treeEndpoint = 'https://api.github.com/repos/Nightf1ower/portfolio/git/trees/main?recursive=1';
  let cachedTree = null;

  const treePromise = originalFetch(treeEndpoint, { cache: 'force-cache' })
    .then(async (response) => {
      if (!response.ok) throw new Error(`GitHub tree ${response.status}`);
      cachedTree = await response.text();
      return cachedTree;
    })
    .catch(() => null);

  window.fetch = async (input, init) => {
    const requestUrl = typeof input === 'string' ? input : input?.url || '';
    if (requestUrl.includes('api.github.com/repos/Nightf1ower/portfolio/git/trees/main') && requestUrl.includes('recursive=1')) {
      const body = cachedTree || await treePromise;
      if (body) {
        return new Response(body, {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
    }
    return originalFetch(input, init);
  };

  const style = document.createElement('style');
  style.id = 'merch-ui-performance-v12-style';
  style.textContent = `
    .m10-head {
      background: transparent !important;
      border-bottom-color: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .m10-dxs-zone {
      margin-top: 2rem !important;
      padding-top: 72rem !important;
      background: linear-gradient(
        to bottom,
        #87CEEB 0rem,
        #87CEEB 4rem,
        #8fc9e4 12rem,
        #9fc0d2 22rem,
        #b0a9bd 34rem,
        #c48999 46rem,
        #d36772 58rem,
        #df474c 68rem,
        #e5312b 78rem,
        #e5312b 100%
      ) !important;
    }

    .m10-dxs-title {
      margin-top: -8rem !important;
    }

    .m10-dxs-grid .m10-media {
      min-height: 0 !important;
      height: auto !important;
    }

    .m10-dxs-grid img,
    .m10-visuals img {
      width: 100% !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: none !important;
      object-fit: contain !important;
    }

    .m10-dxs-posters {
      width: min(100%, 72rem) !important;
      margin-inline: auto !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 1.5rem !important;
    }

    .m10-dxs-posters .m10-card {
      width: 100% !important;
    }

    .m10-dxs-posters .m10-media {
      min-height: 34rem !important;
      align-items: center !important;
    }

    .m10-dxs-posters img {
      width: 100% !important;
      height: 34rem !important;
      object-fit: contain !important;
    }

    @media (max-width: 800px) {
      .m10-dxs-zone {
        padding-top: 54rem !important;
        background: linear-gradient(
          to bottom,
          #87CEEB 0rem,
          #87CEEB 3rem,
          #9fc0d2 14rem,
          #b99aae 25rem,
          #d06c7a 37rem,
          #e04a4d 46rem,
          #e5312b 56rem,
          #e5312b 100%
        ) !important;
      }
      .m10-dxs-title { margin-top: -5rem !important; }
      .m10-dxs-posters .m10-media,
      .m10-dxs-posters img { height: 28rem !important; min-height: 28rem !important; }
    }

    @media (max-width: 700px) {
      .m10-dxs-zone { padding-top: 42rem !important; }
      .m10-dxs-posters { grid-template-columns: 1fr !important; }
      .m10-dxs-posters .m10-media,
      .m10-dxs-posters img { height: auto !important; min-height: 0 !important; }
    }
  `;
  document.head.append(style);
})();
