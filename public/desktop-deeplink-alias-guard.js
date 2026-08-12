(() => {
  if (window.__desktopDeepLinkAliasGuardV1) return;
  window.__desktopDeepLinkAliasGuardV1 = true;

  const ALIASES = new Map([
    ['f-able', 'fable'],
    ['pinkpunk', 'pink-punk'],
    ['carnival', 'carnival-records'],
    ['90-06', 'ninety-z-s'],
    ['90.06', 'ninety-z-s'],
    ['9006', 'ninety-z-s'],
    ['ninety-zs', 'ninety-z-s'],
    ['covers', 'album-covers'],
    ['stayugly', 'stay-ugly'],
    ['anka', 'anka-peresild'],
    ['vtb', 'vtb-design-team'],
    ['collages', 'collages-photo-edit'],
  ]);

  const key = (value) => String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[._|]+/g, '-')
    .replace(/[^a-zа-я0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

  const url = new URL(location.href);
  const raw = url.searchParams.get('project');
  const canonical = ALIASES.get(key(raw));
  if (!canonical || canonical === raw) return;

  url.searchParams.set('project', canonical);
  history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
})();
