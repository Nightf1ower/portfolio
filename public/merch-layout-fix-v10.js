(() => {
  if (document.getElementById('merch-layout-fix-v10')) return;
  const style = document.createElement('style');
  style.id = 'merch-layout-fix-v10';
  style.textContent = `
    /* BROCHURE: two genuinely identical outer rectangles */
    .merch9-brochure {
      align-items: stretch !important;
    }
    .merch9-brochure .merch9-card {
      display: block !important;
      width: 100% !important;
      height: 34rem !important;
      overflow: hidden !important;
    }
    .merch9-brochure .merch9-media {
      position: relative !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
      overflow: hidden !important;
    }
    .merch9-brochure .merch9-media > img {
      position: absolute !important;
      inset: 0 !important;
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      max-width: none !important;
      max-height: none !important;
      object-fit: cover !important;
      object-position: center !important;
    }

    /* POSTERS: all three have exactly the same visible height */
    .merch9-poster-layout {
      align-items: stretch !important;
    }
    .merch9-poster-card {
      height: 30rem !important;
      overflow: hidden !important;
    }
    .merch9-poster-card .merch9-media {
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
    }
    .merch9-poster-card img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
    }

    /* ADS: ad-04 centred above; bottom three visibly larger */
    .merch9-ad-layout {
      width: min(100%, 72rem) !important;
      margin-inline: auto !important;
    }
    .merch9-ad-feature {
      display: block !important;
      width: min(100%, 38rem) !important;
      margin: 0 auto 1.5rem !important;
    }
    .merch9-ad-rest {
      width: 100% !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 1rem !important;
    }
    .merch9-ad-rest .merch9-card,
    .merch9-ad-rest .merch9-media {
      height: 25rem !important;
    }
    .merch9-ad-rest img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
    }

    @media (max-width: 900px) {
      .merch9-brochure .merch9-card { height: 27rem !important; }
      .merch9-poster-card { height: 24rem !important; }
      .merch9-ad-rest .merch9-card,
      .merch9-ad-rest .merch9-media { height: 20rem !important; }
    }

    @media (max-width: 700px) {
      .merch9-brochure .merch9-card,
      .merch9-poster-card,
      .merch9-ad-rest .merch9-card,
      .merch9-ad-rest .merch9-media { height: auto !important; }
      .merch9-brochure .merch9-media > img,
      .merch9-poster-card img,
      .merch9-ad-rest img {
        position: static !important;
        height: auto !important;
        object-fit: contain !important;
      }
    }
  `;
  document.head.append(style);
})();
