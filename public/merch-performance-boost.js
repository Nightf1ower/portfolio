(() => {
  if (window.__merchPerformanceBoostV1) return;
  window.__merchPerformanceBoostV1 = true;

  const VERSION = 'merch-performance-boost-1';
  const TREE_URL = 'https://api.github.com/repos/Nightf1ower/portfolio/git/trees/main?recursive=1';
  const CACHE_KEY = 'nightflower-merch-tree-v1';
  const RAW_PREFIX = 'https://raw.githubusercontent.com/Nightf1ower/portfolio/main/public/';
  const nativeFetch = window.fetch.bind(window);
  let treePromise = null;

  function localImageUrl(value) {
    const source = String(value || '');
    if (!source.startsWith(RAW_PREFIX)) return source;
    return `/${source.slice(RAW_PREFIX.length)}`;
  }

  function readTreeCache() {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (!cached?.data?.tree?.length) return null;
      return cached.data;
    } catch {
      return null;
    }
  }

  function writeTreeCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ version: VERSION, data }));
    } catch {
      // Storage may be unavailable in private browsing. Loading still works.
    }
  }

  async function loadTree() {
    const cached = readTreeCache();
    if (cached) return cached;
    if (treePromise) return treePromise;

    treePromise = nativeFetch(TREE_URL, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'force-cache',
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`GitHub tree ${response.status}`);
        const data = await response.json();
        writeTreeCache(data);
        return data;
      })
      .finally(() => {
        treePromise = null;
      });

    return treePromise;
  }

  function treeResponse(data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Merch-Tree-Cache': 'hit',
      },
    });
  }

  window.fetch = async function merchCachedFetch(input, init) {
    const url = typeof input === 'string' ? input : input?.url || '';
    if (url.startsWith(TREE_URL)) {
      try {
        return treeResponse(await loadTree());
      } catch {
        return nativeFetch(TREE_URL, { ...init, cache: 'force-cache' });
      }
    }
    return nativeFetch(input, init);
  };

  const srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if (srcDescriptor?.get && srcDescriptor?.set && srcDescriptor.configurable !== false) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      enumerable: srcDescriptor.enumerable,
      get: srcDescriptor.get,
      set(value) {
        srcDescriptor.set.call(this, localImageUrl(value));
      },
    });
  }

  const nativeSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function merchLocalAttribute(name, value) {
    if (this instanceof HTMLImageElement && String(name).toLowerCase() === 'src') {
      return nativeSetAttribute.call(this, name, localImageUrl(value));
    }
    return nativeSetAttribute.call(this, name, value);
  };

  function injectStyles() {
    if (document.getElementById('merch-performance-boost-style')) return;
    const style = document.createElement('style');
    style.id = 'merch-performance-boost-style';
    style.textContent = `
      .m10-modal .m10-section:not(:first-of-type),
      .m10-modal .m10-dxs-zone .m10-section {
        content-visibility: auto;
        contain-intrinsic-size: auto 900px;
      }

      .m10-modal img {
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      .m10-modal .m10-media {
        contain: layout paint;
      }
    `;
    document.head.append(style);
  }

  function optimizeImages(root = document) {
    const images = root.matches?.('.m10-modal img')
      ? [root]
      : [...(root.querySelectorAll?.('.m10-modal img') || [])];

    images.forEach((image, index) => {
      const localized = localImageUrl(image.getAttribute('src') || image.src);
      if (localized && localized !== image.getAttribute('src')) image.setAttribute('src', localized);
      image.decoding = 'async';
      image.draggable = false;
      if (index < 4 && image.closest('.m10-section:first-of-type,.m10-hero')) {
        image.loading = 'eager';
        image.fetchPriority = 'high';
      } else {
        image.loading = 'lazy';
        image.fetchPriority = 'low';
      }
    });
  }

  injectStyles();
  loadTree().catch(() => {});

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.m10-modal,.m10-modal img') || node.querySelector?.('.m10-modal,.m10-modal img')) {
          optimizeImages(node);
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article,#works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'MERCH') return;
    loadTree().catch(() => {});
    setTimeout(() => optimizeImages(), 0);
    setTimeout(() => optimizeImages(), 120);
    setTimeout(() => optimizeImages(), 500);
  }, true);
})();