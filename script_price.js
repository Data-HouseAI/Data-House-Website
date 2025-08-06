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

// Image Change

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const sliderWrapper = document.getElementById("sliderWrapper");
const dotsContainer = document.getElementById("dots");
const counter = document.getElementById("counter");

// Generate dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
updateDots();

function updateSlider() {
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".dots span");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// Auto slide (optional)
// setInterval(nextSlide, 5000); // every 5 seconds
