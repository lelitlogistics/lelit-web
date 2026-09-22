(() => {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 10000;
  const FADE = 1400;

  // Every URL below is unique across the entire page. The set favors
  // Northeast / New England visual context and intentionally avoids LA/palms.
  const galleries = [
    {
      selector: '.hero__media img',
      delay: 0,
      images: [
        'https://s1.cdn.autoevolution.com/images/news/gallery/here-s-an-amazon-delivery-driver-s-opinion-about-his-brand-new-rivian-edv_2.jpg',
        'https://hips.hearstapps.com/hmg-prod/images/img-8794-1669399662.jpg?crop=1.00xw%3A0.501xh%3B0%2C0.218xh',
        'https://assets.aboutamazon.com/dims4/default/55a9346/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2Fdd%2Ffb%2Faee9e53c4d4eadb9906845d33b2f%2Famazon-delivery-driver-delivers-package.jpg'
      ]
    },
    {
      selector: '.fleet img',
      delay: 3000,
      images: [
        'https://assets.aboutamazon.com/dims4/default/28827f7/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F92%2Fd4%2F982db0da4638b03ea9d451901c4a%2Famazon-delivery-driver-unpacks-totes.jpg',
        'https://assets.aboutamazon.com/dims4/default/24b936f/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2Fa2%2F98%2Fd2d13955446ab537ba11cf34ba63%2Fddd-inline-5.jpg',
        'https://assets.aboutamazon.com/dims4/default/fe7c177/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2Fef%2Fc3%2F58137fa14c59adc1e6db89dbb852%2Fddd-inline-6.jpg'
      ]
    },
    {
      selector: '.career-hero > img',
      delay: 6000,
      images: [
        'https://assets.aboutamazon.com/dims4/default/08ac5f8/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2Fea%2Fab%2F7099471345aebf2fca73562300bb%2Fddd-inline-7.jpg',
        'https://assets.aboutamazon.com/dims4/default/de837ef/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2Fb1%2Fea%2F36a6de934c2f8c1d83a8eb4ca03e%2Famazon-delivery-driver-rivian-van.jpg',
        'https://assets.aboutamazon.com/dims4/default/7fe5a6d/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2Ff7%2F74%2F8678870d4b13b73bbf3a36c918e5%2Fddd-inline-8.jpg'
      ]
    }
  ];

  function preload(urls) {
    urls.forEach(url => { const img = new Image(); img.decoding = 'async'; img.src = url; });
  }

  function setupGallery({ selector, images, delay }) {
    const current = document.querySelector(selector);
    if (!current || !images.length) return;
    preload(images);
    current.src = images[0];
    if (REDUCED || images.length < 2) return;

    const parent = current.parentElement;
    const next = current.cloneNode(false);
    next.removeAttribute('fetchpriority');
    next.loading = 'eager';
    next.style.opacity = '0';
    next.style.zIndex = '0';
    current.style.zIndex = '1';
    [current, next].forEach(img => {
      img.style.transition = `opacity ${FADE}ms ease, transform 1.5s var(--ease), filter .8s var(--ease)`;
    });
    parent.insertBefore(next, current.nextSibling);

    let active = current;
    let standby = next;
    let index = 0;
    let timer;

    const rotate = () => {
      if (document.hidden) return;
      index = (index + 1) % images.length;
      standby.src = images[index];
      standby.onload = () => {
        standby.style.zIndex = '2';
        standby.style.opacity = '1';
        active.style.opacity = '0';
        window.setTimeout(() => {
          active.style.zIndex = '0';
          standby.style.zIndex = '1';
          const old = active;
          active = standby;
          standby = old;
          standby.style.opacity = '0';
        }, FADE + 50);
      };
    };

    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(rotate, INTERVAL);
    };

    window.setTimeout(start, delay);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) window.clearInterval(timer); else start();
    });
  }

  const init = () => galleries.forEach(setupGallery);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
