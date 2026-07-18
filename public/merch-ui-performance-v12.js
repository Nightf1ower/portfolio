(() => {
  if (window.__merchUiPerformanceV13) return;
  window.__merchUiPerformanceV13 = true;

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
  style.id = 'merch-ui-performance-v13-style';
  style.textContent = `
    .m10-head {
      background: transparent !important;
      border-bottom-color: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .m10-dxs-zone {
      margin-top: 5rem !important;
      padding-top: 18rem !important;
      background: linear-gradient(
        to bottom,
        #87CEEB 0%,
        #8bcbe6 8%,
        #94c5dc 16%,
        #a2b8cc 26%,
        #b0a7b8 38%,
        #c28b9b 52%,
        #d26976 68%,
        #df4a4f 84%,
        #e5312b 100%
      ) !important;
    }

    .m10-dxs-title {
      margin: 0 0 4rem !important;
    }

    .m10-dxs-grid .m10-media,
    .m10-visuals .m10-media {
      min-height: 0 !important;
      height: auto !important;
    }

    .m10-dxs-grid img,
    .m10-visuals img {
      display: block !important;
      width: 100% !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: none !important;
      object-fit: contain !important;
    }

    .m10-dxs-posters {
      width: min(100%, 76rem) !important;
      margin-inline: auto !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 1.5rem !important;
    }

    .m10-dxs-posters .m10-card,
    .m10-dxs-posters .m10-media {
      width: 100% !important;
    }

    .m10-dxs-posters img {
      width: 100% !important;
      height: auto !important;
      max-height: 46rem !important;
      object-fit: contain !important;
    }

    @media (max-width: 800px) {
      .m10-dxs-zone {
        padding-top: 13rem !important;
      }
      .m10-dxs-posters {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 1rem !important;
      }
    }

    @media (max-width: 700px) {
      .m10-dxs-zone {
        padding-top: 10rem !important;
      }
      .m10-dxs-posters {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.append(style);
})();
