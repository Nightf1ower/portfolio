(() => {
  if (window.__nightflowerPlaygroundPlaceholderV2) return;
  window.__nightflowerPlaygroundPlaceholderV2 = true;

  const VERSION = 'playground-placeholder-2';

  function injectStyles() {
    if (document.getElementById('nightflower-playground-placeholder-style')) return;
    const style = document.createElement('style');
    style.id = 'nightflower-playground-placeholder-style';
    style.textContent = `
      #nightflower-playground {
        position: relative !important;
        margin: 0 !important;
        padding: clamp(3rem, 7vw, 6rem) 1rem !important;
        border-top: 1px solid #050505 !important;
        background: #050505 !important;
        color: #fff !important;
        overflow: hidden !important;
      }
      .nfp-development {
        width: min(100%, 80rem);
        margin: 0 auto;
      }
      .nfp-development-title {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(3rem, 10vw, 9rem);
        font-weight: 900;
        line-height: .8;
        letter-spacing: -.085em;
        text-transform: uppercase;
      }
      .nfp-development-star { color: #b6ff00; }
      .nfp-development-status {
        display: inline-block;
        margin: 1.5rem 0 0;
        padding: .5rem .75rem;
        background: #b6ff00;
        color: #050505;
        font-family: Arial, Helvetica, sans-serif;
        font-size: .7rem;
        font-weight: 900;
        line-height: 1;
        letter-spacing: .28em;
        text-transform: uppercase;
      }
    `;
    document.head.append(style);
  }

  function render() {
    injectStyles();
    const footer = document.querySelector('#contacts');
    if (!footer) return false;

    let section = document.getElementById('nightflower-playground');
    if (!section) {
      section = document.createElement('section');
      section.id = 'nightflower-playground';
      footer.insertAdjacentElement('afterend', section);
    }

    if (section.dataset.placeholderVersion !== VERSION) {
      section.innerHTML = `
        <div class="nfp-development">
          <h2 class="nfp-development-title">NIGHTFLOWER PLAYGROUND <span class="nfp-development-star">*</span></h2>
          <p class="nfp-development-status">IN DEVELOPMENT</p>
        </div>
      `;
      section.dataset.placeholderVersion = VERSION;
    }
    return true;
  }

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    if (render() || attempts >= 40) window.clearInterval(retry);
  }, 120);

  window.addEventListener('load', render);
  render();
})();