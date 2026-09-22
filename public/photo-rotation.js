(() => {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 10000;
  const FADE = 1400;

  const galleries = [
    {
      selector: '.hero__media img',
      delay: 0,
      images: [
        'https://assets.aboutamazon.com/dims4/default/fa084b1/2147483647/strip/true/crop/2000x1334%2B0%2B0/resize/1114x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F3b%2Fe1%2F5c118a454aaeb1d7f9c12ca435f1%2F0039.JPG',
        'https://assets.aboutamazon.com/dims4/default/249ee0f/2147483647/strip/true/crop/3533x2355%2B0%2B0/resize/1115x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F1f%2F49%2Fa3850a084e678ca93a4986dac0ed%2F0040.JPG',
        'https://assets.aboutamazon.com/dims4/default/aa92e69/2147483647/strip/true/crop/2000x1332%2B0%2B0/resize/1116x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F74%2F83%2F553825b44e479fb263b2b1813c89%2Felectricvehicle-hollywood-9777-edited.JPG'
      ]
    },
    {
      selector: '.fleet img',
      delay: 3000,
      images: [
        'https://assets.aboutamazon.com/dims4/default/aa92e69/2147483647/strip/true/crop/2000x1332%2B0%2B0/resize/1116x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F74%2F83%2F553825b44e479fb263b2b1813c89%2Felectricvehicle-hollywood-9777-edited.JPG',
        'https://assets.aboutamazon.com/dims4/default/249ee0f/2147483647/strip/true/crop/3533x2355%2B0%2B0/resize/1115x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F1f%2F49%2Fa3850a084e678ca93a4986dac0ed%2F0040.JPG',
        'https://assets.aboutamazon.com/dims4/default/71cf205/2147483647/strip/true/crop/2000x1332%2B0%2B0/resize/1116x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F07%2F4a%2Fdcb5351f463e9e0b9729ff86e435%2F0012.JPG'
      ]
    },
    {
      selector: '.career-hero > img',
      delay: 6000,
      images: [
        'https://assets.aboutamazon.com/dims4/default/55a9346/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2Fdd%2Ffb%2Faee9e53c4d4eadb9906845d33b2f%2Famazon-delivery-driver-delivers-package.jpg',
        'https://assets.aboutamazon.com/dims4/default/982f01e/2147483647/strip/true/crop/7099x4732%2B0%2B0/resize/1115x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F8b%2F1e%2F296dec7c474fbaf4d2f3f4ab8b99%2F0004a.jpg',
        'https://assets.aboutamazon.com/dims4/default/71cf205/2147483647/strip/true/crop/2000x1332%2B0%2B0/resize/1116x743%21/quality/90/?url=https%3A%2F%2Fassets.aboutamazon.com%2F07%2F4a%2Fdcb5351f463e9e0b9729ff86e435%2F0012.JPG'
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
