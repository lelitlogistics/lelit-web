(() => {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 10000;
  const FADE = 1400;

  const galleries = [
    {
      selector: '.hero__media img',
      delay: 0,
      images: [
        'https://assets.aboutamazon.com/dims4/default/9202813/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fdd%2Ffb%2Faee9e53c4d4eadb9906845d33b2f%2Famazon-delivery-driver-delivers-package.jpg',
        'https://assets.aboutamazon.com/4d/42/70dec02640579454676e5159b4f8/rivian-hero-2000x1126-2.jpg',
        'https://assets.aboutamazon.com/b1/ea/36a6de934c2f8c1d83a8eb4ca03e/amazon-delivery-driver-rivian-van.jpg'
      ]
    },
    {
      selector: '.fleet img',
      delay: 3000,
      images: [
        'https://cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/ZALZXCXMRVGFPLDEHJJ2RTHINM.JPG',
        'https://hips.hearstapps.com/hmg-prod/images/img-8794-1669399662.jpg?crop=1.00xw%3A0.501xh%3B0',
        'https://st-everywhere-cms-prod.s3.us-east-1.amazonaws.com/large_rivian_ev_vans_resized_f1791da22c.jpg'
      ]
    },
    {
      selector: '.career-hero > img',
      delay: 6000,
      images: [
        'https://assets.aboutamazon.com/dims4/default/08313f3/2147483647/strip/true/crop/1599x900%2B1%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fdd%2Ffb%2Faee9e53c4d4eadb9906845d33b2f%2Famazon-delivery-driver-delivers-package.jpg',
        'https://assets.aboutamazon.com/dims4/default/8ea1f6c/2147483647/strip/true/crop/1600x900%2B0%2B0/resize/1320x743%21/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fc5%2F40%2F5baa27fd457e8412202e7ec03953%2Famazon-delivery-driver-eats-lunch.jpg',
        'https://assets.aboutamazon.com/dims4/default/982f01e/2147483647/strip/true/crop/7099x4732%2B0%2B0/resize/1600x1067%21/quality/95/?url=https%3A%2F%2Fassets.aboutamazon.com%2F8b%2F1e%2F296dec7c474fbaf4d2f3f4ab8b99%2F0004a.jpg'
      ]
    }
  ];

  function preload(urls) { urls.forEach(url => { const img = new Image(); img.decoding = 'async'; img.src = url; }); }
  function setupGallery({ selector, images, delay }) {
    const current = document.querySelector(selector); if (!current || !images.length) return;
    preload(images); current.src = images[0]; if (REDUCED || images.length < 2) return;
    const parent = current.parentElement; const next = current.cloneNode(false); next.removeAttribute('fetchpriority'); next.loading='eager'; next.style.opacity='0'; next.style.zIndex='0'; current.style.zIndex='1';
    [current,next].forEach(img=>{img.style.transition=`opacity ${FADE}ms ease, transform 1.5s var(--ease), filter .8s var(--ease)`;}); parent.insertBefore(next,current.nextSibling);
    let active=current,standby=next,index=0,timer;
    const rotate=()=>{if(document.hidden)return; index=(index+1)%images.length; standby.src=images[index]; standby.onload=()=>{standby.style.zIndex='2';standby.style.opacity='1';active.style.opacity='0';window.setTimeout(()=>{active.style.zIndex='0';standby.style.zIndex='1';const old=active;active=standby;standby=old;standby.style.opacity='0';},FADE+50);};};
    const start=()=>{window.clearInterval(timer);timer=window.setInterval(rotate,INTERVAL);}; window.setTimeout(start,delay); document.addEventListener('visibilitychange',()=>{if(document.hidden)window.clearInterval(timer);else start();});
  }
  const init=()=>galleries.forEach(setupGallery); if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();