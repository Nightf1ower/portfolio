(() => {
  if (window.__carnivalRecordsSectionOrderV1) return;
  window.__carnivalRecordsSectionOrderV1 = true;

  const ORDER_KEY = 'vinyl-merch-carnival-calec-caps';

  function normalize(value) {
    return String(value || '').trim().toUpperCase();
  }

  function findByTitle(sections, patterns) {
    return sections.find((section) => {
      const title = normalize(section.querySelector(':scope > .cr-h')?.textContent);
      return patterns.some((pattern) => pattern.test(title));
    }) || null;
  }

  function apply(modal) {
    if (!modal || modal.dataset.carnivalSectionOrder === ORDER_KEY) return false;
    if (!modal.dataset.carnivalFinalCopy) return false;

    const inner = modal.querySelector('.cr-inner');
    if (!inner) return false;

    const sections = [...inner.querySelectorAll(':scope > .cr-section')];
    if (sections.length < 5) return false;

    const vinyl = findByTitle(sections, [/^VINYL ALBUM COVER DESIGN$/]);
    const merch = findByTitle(sections, [/^MERCH$/]);
    const carnival = findByTitle(sections, [/^CARNIVAL RECORDS COLLECTION$/]);
    const calec = findByTitle(sections, [/^ВЛАСТЕЛИН КАЛЕК COLLECTION$/]);
    const caps = findByTitle(sections, [/^CAPS$/]);

    const ordered = [vinyl, merch, carnival, calec, caps];
    if (ordered.some((section) => !section)) return false;

    ordered.forEach((section) => inner.append(section));
    modal.dataset.carnivalSectionOrder = ORDER_KEY;
    return true;
  }

  function scan(root = document) {
    if (root instanceof Element && root.matches('.cr-modal')) apply(root);
    root.querySelectorAll?.('.cr-modal').forEach(apply);
  }

  scan();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) scan(node);
      }
    }
    scan();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();