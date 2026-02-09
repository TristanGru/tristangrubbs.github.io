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

// Theme toggle (dark/light)
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") document.documentElement.dataset.theme = "light";

function toggleTheme() {
  const isLight = document.documentElement.dataset.theme === "light";
  if (isLight) {
    delete document.documentElement.dataset.theme;
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  }
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

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