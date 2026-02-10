// Small, tasteful JS. No frameworks. No drama.

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal-on-scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

// Sticky header elevation
const header = document.querySelector("[data-elevate]");
const onScroll = () => {
  if (!header) return;
  header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById("burger");
const mobile = document.getElementById("mobileNav");

function setMobile(open) {
  if (!burger || !mobile) return;
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  mobile.dataset.open = open ? "true" : "false";
  mobile.setAttribute("aria-hidden", open ? "false" : "true");
}

if (burger && mobile) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    setMobile(!isOpen);
  });

  mobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMobile(false));
  });
}

// Theme switcher (Midnight, Paper, Neon)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeName = document.getElementById("themeName");

const themes = [
  { name: "Midnight", value: "", icon: "◐" },
  { name: "Paper", value: "paper", icon: "○" },
  { name: "Ember", value: "ember", icon: "◈" }
];

let currentThemeIndex = 0;

// Load stored theme
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  const index = themes.findIndex(t => t.value === storedTheme);
  if (index !== -1) {
    currentThemeIndex = index;
    if (themes[index].value) {
      document.documentElement.dataset.theme = themes[index].value;
    }
  }
}

function updateThemeUI() {
  const theme = themes[currentThemeIndex];
  if (themeIcon) themeIcon.textContent = theme.icon;
  if (themeName) themeName.textContent = theme.name;
}

function cycleTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const theme = themes[currentThemeIndex];
  
  if (theme.value) {
    document.documentElement.dataset.theme = theme.value;
  } else {
    delete document.documentElement.dataset.theme;
  }
  
  localStorage.setItem("theme", theme.value);
  updateThemeUI();
}

// Initialize UI
updateThemeUI();

if (themeToggle) themeToggle.addEventListener("click", cycleTheme);

// Quick View / One-Minute Portfolio Mode
const quickViewToggle = document.getElementById("quickViewToggle");

function toggleQuickView() {
  const isQuick = document.documentElement.dataset.quickView === "true";
  if (isQuick) {
    delete document.documentElement.dataset.quickView;
    if (quickViewToggle) {
      quickViewToggle.querySelector(".btn__text").textContent = "Quick";
    }
  } else {
    document.documentElement.dataset.quickView = "true";
    if (quickViewToggle) {
      quickViewToggle.querySelector(".btn__text").textContent = "Full";
    }
    // Scroll to top for scannable experience
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

if (quickViewToggle) quickViewToggle.addEventListener("click", toggleQuickView);

// Resume Modal
const resumeBtn = document.getElementById("resumeBtn");
const resumeModal = document.getElementById("resumeModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const resumeFrame = document.getElementById("resumeFrame");

function openResumeModal() {
  if (resumeModal && resumeFrame) {
    resumeFrame.src = "Tristan Grubbs Resume.pdf";
    resumeModal.dataset.open = "true";
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeResumeModal() {
  if (resumeModal && resumeFrame) {
    resumeModal.dataset.open = "false";
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Clear iframe after transition
    setTimeout(() => { resumeFrame.src = ""; }, 200);
  }
}

if (resumeBtn) resumeBtn.addEventListener("click", openResumeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeResumeModal);
if (modalClose) modalClose.addEventListener("click", closeResumeModal);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && resumeModal?.dataset.open === "true") {
    closeResumeModal();
  }
});

// Daily Quote
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

// Fallback quotes in case fetch fails
const fallbackQuotes = [
  { text: "fallbackQuotes", author: "not working" }
];

function displayQuote(quotes) {
  // Random quote on each page load
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  
  if (quoteText) quoteText.textContent = quote.text;
  if (quoteAuthor) quoteAuthor.textContent = quote.author;
}

if (quoteText && quoteAuthor) {
  fetch("./quotes.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then((quotes) => {
      displayQuote(quotes);
    })
    .catch(() => {
      // Use fallback quotes if fetch fails
      displayQuote(fallbackQuotes);
    });
}

// Konami Code Easter Egg (Up, Up, Down, Down, Left, Right, Left, Right)
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      window.location.href = "easter-egg.html";
    }
  } else {
    konamiIndex = 0;
  }
});

// Tilt effect for project cards and cards
const tiltElements = document.querySelectorAll(".proj, .card");

tiltElements.forEach((el) => {
  // Add shine overlay element
  const shine = document.createElement("div");
  shine.className = el.classList.contains("proj") ? "proj__shine" : "card__shine";
  el.style.position = "relative";
  el.appendChild(shine);

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 4 degrees for subtle effect)
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    
    // Update shine position
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${percentX}%`);
    el.style.setProperty("--mouse-y", `${percentY}%`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});