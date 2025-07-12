 // ✅ THEME TOGGLE: Default to dark mode, support toggle + logo swap
const toggle = document.getElementById('modeToggle');
const logoImage = document.getElementById('logoImage');

// Check saved preference or default to dark
const savedMode = localStorage.getItem('theme');
if (savedMode === 'light') {
  document.body.classList.remove('dark-mode');
  toggle.checked = true;
} else {
  document.body.classList.add('dark-mode'); // default dark
  toggle.checked = false;
}
updateLogo(); // ensure correct logo

toggle.addEventListener('change', () => {
  const isLight = toggle.checked;
  document.body.classList.toggle('dark-mode', !isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateLogo();
});

function updateLogo() {
  const isDark = document.body.classList.contains('dark-mode');
  logoImage.src = isDark ? 'Logo_dark.png' : 'Logo_light.png';
}

// ✅ SLIDER: Auto-switch background images every 5s with text animation
let currentSlide = 0;
const slides = document.querySelectorAll(".full-slider .slide");

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    const isActive = i === index;
    slide.classList.toggle("active", isActive);

    const text = slide.querySelector('.slide-text');
    if (text) {
      text.classList.remove('animate-in');
      void text.offsetWidth; // force reflow
      if (isActive) {
        text.classList.add('animate-in');
      }
    }
  });
}

setInterval(nextSlide, 5000);
showSlide(currentSlide); // initial load

// ✅ INTRO SECTION FADE-DOWN ON SCROLL
const fadeElements = document.querySelectorAll('.scroll-fade');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    } else {
      entry.target.classList.remove('animate-in');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ✅ IMPORTANCE BLOCKS: Animate top-down with delay & re-triggering
const importanceBlocks = document.querySelectorAll('.importance-block.animate-top');
const blockObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    const index = [...importanceBlocks].indexOf(el);

    if (entry.isIntersecting) {
      el.style.transitionDelay = `${index * 0.2}s`;
      el.classList.add('animate-in');
    } else {
      el.classList.remove('animate-in');
      el.style.transitionDelay = '0s';
    }
  });
}, { threshold: 0.2 });

importanceBlocks.forEach(el => blockObserver.observe(el));

// ✅ COUNTER ANIMATION
const counters = document.querySelectorAll('.count-number');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      let current = 200;
      const step = Math.ceil((current - target) / 50);

      const updateCount = () => {
        if (current > target) {
          current -= step;
          if (current < target) current = target;
          counter.textContent = current;
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();

      // Stop observing after animation
      countObserver.unobserve(counter);
    }
  });
}, {

  threshold: 0.3
});

counters.forEach(counter => countObserver.observe(counter));