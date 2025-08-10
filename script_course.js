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

//===========================Contact US PopUp==============================================

// Open popup
document.getElementById("contactBtn").addEventListener("click", function() {
  document.getElementById("contactPopup").style.display = "flex";
});

// Close popup
document.getElementById("closePopup").addEventListener("click", function() {
  document.getElementById("contactPopup").style.display = "none";
});

// Optional: Close when clicking outside popup
window.addEventListener("click", function(e) {
  if (e.target.id === "contactPopup") {
    document.getElementById("contactPopup").style.display = "none";
  }
});

// Handle Form Submit
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Collect form data
  const formData = new FormData(this);

  fetch("send-email.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    document.getElementById("contactPopup").style.display = "none";
    this.reset();
  })
  .catch(err => alert("Error sending message"));
});

//===========================Contact US PopUp End==============================================

// ✅ Full-width popup mobile menu
document.getElementById('mobileMenucourse').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('mobile-active');
});

function updateLogo() {
  const isDark = document.body.classList.contains('dark-mode');
  logoImage.src = isDark ? 'Logo_dark.png' : 'Logo_light.png';
}

// Image Change

let currentSlide = 0;
const slides = document.querySelectorAll(".slide-price");
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


document.querySelectorAll('.module-header').forEach(header => {
  header.addEventListener('click', () => {
    const module = header.parentElement;
    module.classList.toggle('active');

    const expandBtn = header.querySelector('.expand-btn');
    if (module.classList.contains('active')) {
      expandBtn.textContent = '−';  // minus sign when expanded
    } else {
      expandBtn.textContent = '+';  // plus sign when collapsed
    }
  });
});

