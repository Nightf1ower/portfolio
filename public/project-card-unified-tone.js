(() => {
  if (window.__projectCardUnifiedToneV8) return;
  window.__projectCardUnifiedToneV8 = true;

  const style = document.createElement('style');
  style.id = 'project-card-unified-tone-style';
  style.dataset.version = 'project-card-unified-tone-8';
  style.textContent = `
    #works .mt-10.grid > article,
    #works .mt-10.grid > button {
      background-color: #dcdcd9 !important;
      background-image: none !important;
    }

    #works .mt-10.grid > article:hover,
    #works .mt-10.grid > button:hover {
      background-color: #dcdcd9 !important;
      background-image: none !important;
    }

    #works .mt-10.grid > article > div,
    #works .mt-10.grid > button > div {
      background-color: #e9e9e6 !important;
      background-image: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    #works .mt-10.grid > :nth-child(4) h3 {
      display: block !important;
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
      font-size: 24px !important;
      font-weight: 800 !important;
      font-style: normal !important;
      font-stretch: normal !important;
      font-variation-settings: normal !important;
      line-height: 1 !important;
      letter-spacing: -0.04em !important;
      white-space: nowrap !important;
      word-break: normal !important;
      overflow-wrap: normal !important;
      transform: none !important;
    }
  `;

  document.getElementById('project-card-unified-tone-style')?.remove();
  document.head.append(style);

  function forceBlandettoSize() {
    const heading = document.querySelector('#works .mt-10.grid > :nth-child(4) h3');
    if (!heading) return false;

    heading.style.setProperty('font-family', 'Helvetica, "Helvetica Neue", Arial, sans-serif', 'important');
    heading.style.setProperty('font-size', '24px', 'important');
    heading.style.setProperty('font-weight', '800', 'important');
    heading.style.setProperty('line-height', '1', 'important');
    heading.style.setProperty('letter-spacing', '-0.04em', 'important');
    heading.style.setProperty('white-space', 'nowrap', 'important');
    heading.style.setProperty('width', '100%', 'important');
    heading.style.setProperty('max-width', '100%', 'important');
    heading.style.setProperty('transform', 'none', 'important');
    heading.style.setProperty('margin', '0', 'important');
    return true;
  }

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(forceBlandettoSize);
  };

  const works = document.getElementById('works');
  if (works) {
    new MutationObserver(schedule).observe(works, {
      childList: true,
      subtree: true,
    });
  }

  window.addEventListener('load', schedule);
  [0, 100, 300, 800, 1600].forEach((delay) => setTimeout(schedule, delay));
  schedule();
})();
