document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('service-slider');
  const prevBtn = document.getElementById('svc-prev');
  const nextBtn = document.getElementById('svc-next');
  const dotsContainer = document.getElementById('svc-dots');
  if (!slider) return;

  const slides = slider.children;
  const total = slides.length;
  let current = 0;

  function update() {
    slider.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = `w-2.5 h-2.5 rounded-full transition ${i === current ? 'bg-primary' : 'bg-gray-600'}`;
      dot.addEventListener('click', () => {
        current = i;
        update();
      });
      dotsContainer.appendChild(dot);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + total) % total;
      update();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % total;
      update();
    });
  }

  // Auto-advance
  setInterval(() => {
    current = (current + 1) % total;
    update();
  }, 7000);

  update();
});
