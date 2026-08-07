// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }

  // Booking form success message
  const form = document.getElementById('booking-form');
  const success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('hidden');
      if (success) {
        success.classList.remove('hidden');
      }
    });
  }

  // Trends carousel (homepage)
  initTrendsCarousel();
});

function initTrendsCarousel() {
  const track = document.getElementById('trends-track');
  const prevBtn = document.getElementById('trend-prev');
  const nextBtn = document.getElementById('trend-next');
  const dotsContainer = document.getElementById('trend-dots');
  if (!track) return;

  const slides = track.querySelectorAll('.trend-slide');
  let current = 0;
  let slidesPerView = getSlidesPerView();

  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function maxIndex() {
    return Math.max(0, slides.length - slidesPerView);
  }

  function update() {
    slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    track.style.transform = `translateX(-${current * slideWidth}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const total = maxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = `w-2 h-2 rounded-full transition ${i === current ? 'bg-primary' : 'bg-gray-600'}`;
      dot.addEventListener('click', () => {
        current = i;
        update();
      });
      dotsContainer.appendChild(dot);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = Math.max(0, current - 1);
      update();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = Math.min(maxIndex(), current + 1);
      update();
    });
  }

  window.addEventListener('resize', () => {
    current = Math.min(current, maxIndex());
    update();
  });

  // Auto-advance
  setInterval(() => {
    current = current >= maxIndex() ? 0 : current + 1;
    update();
  }, 5000);

  update();
}
