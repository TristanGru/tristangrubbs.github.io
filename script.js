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