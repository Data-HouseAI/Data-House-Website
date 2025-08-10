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

// ✅ Mobile Menu Toggle
// ✅ Mobile menu toggle
// ✅ Full-width popup mobile menu
document.getElementById('mobileMenu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('mobile-active');
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

// ✅ FEEDBACK NAVIGATION USING scrollLeft
const slider = document.querySelector(".feedback-slider");
const leftBtn = document.querySelector(".feedback-nav.left");
const rightBtn = document.querySelector(".feedback-nav.right");

// How far to scroll per click
const scrollStep = 400;

leftBtn.addEventListener("click", () => {
  slider.scrollLeft -= scrollStep;
});

rightBtn.addEventListener("click", () => {
  slider.scrollLeft += scrollStep;
});



// ✅ Full-width popup mobile menu
document.getElementById('mobileMenucourse').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('mobile-active');
});

function updateLogo() {
  const isDark = document.body.classList.contains('dark-mode');
  logoImage.src = isDark ? 'Logo_dark.png' : 'Logo_light.png';
}


// ✅ Update Footer Logo Based on Theme (used on all pages)
function updateFooterLogo() {
  const isDark = document.body.classList.contains('dark-mode');
  const footerLogo = document.getElementById('footerLogo');
  if (footerLogo) {
    footerLogo.src = isDark ? 'Footer/footer_light.png' : 'Footer/footer_dark.png';
  }
}

// ✅ Call it on initial load
updateFooterLogo();

// ✅ And after theme toggle
toggle.addEventListener('change', () => {
  updateFooterLogo(); // <- call again to update logo
});

