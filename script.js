const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}


document.querySelectorAll('[data-slideshow]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.slide')];
  const dots = [...gallery.querySelectorAll('.dot')];
  const counter = gallery.querySelector('.slide-counter');
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  gallery.querySelector('.prev')?.addEventListener('click', () => show(current - 1));
  gallery.querySelector('.next')?.addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  let startX = null;
  gallery.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
  gallery.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, {passive:true});
});


document.querySelectorAll('[data-video-slideshow]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.video-slide')];
  const counter = gallery.querySelector('.video-counter');
  let current = 0;

  const show = (index) => {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      if (!active) slide.querySelector('video')?.pause();
    });
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  gallery.querySelector('.prev')?.addEventListener('click', () => show(current - 1));
  gallery.querySelector('.next')?.addEventListener('click', () => show(current + 1));

  let startX = null;
  gallery.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
  gallery.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, {passive:true});

  show(0);
});
