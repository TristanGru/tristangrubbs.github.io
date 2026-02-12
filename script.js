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

/* QUICK VIEW FEATURE (COMMENTED OUT)
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
*/

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

// Code Playground - Dual Language (JavaScript + Python)
const codeEditor = document.getElementById("codeEditor");
const runCodeBtn = document.getElementById("runCode");
const clearOutputBtn = document.getElementById("clearOutput");
const codeOutput = document.getElementById("codeOutput");
const playgroundStatus = document.getElementById("playgroundStatus");
const languageTabs = document.querySelectorAll(".playground-tab");

let currentLanguage = "javascript";
let pyodideInstance = null;
let pyodideLoading = false;

const starterCode = {
  javascript: `// Welcome to the JavaScript playground!
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet("World"));
console.log("2 + 2 =", 2 + 2);

// Try arrays and loops
const nums = [1, 2, 3, 4, 5];
nums.forEach(n => console.log(n * n));`,
  python: `# Welcome to the Python playground!
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
print("2 + 2 =", 2 + 2)

# Try lists and loops
nums = [1, 2, 3, 4, 5]
for n in nums:
    print(n ** 2)`
};

// Tab switching
languageTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const lang = tab.dataset.lang;
    if (lang === currentLanguage) return;
    
    languageTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentLanguage = lang;
    
    if (codeEditor) codeEditor.value = starterCode[lang];
    if (codeOutput) codeOutput.innerHTML = '<span class="muted">Click "Run" to see output...</span>';
    
    if (lang === "python" && !pyodideInstance && !pyodideLoading) {
      initPyodide();
    }
    
    updateStatus();
  });
});

// Load Pyodide
async function initPyodide() {
  if (pyodideLoading || pyodideInstance) return;
  pyodideLoading = true;
  updateStatus();
  
  try {
    // loadPyodide is the global function from the Pyodide CDN
    if (typeof loadPyodide === "function") {
      pyodideInstance = await loadPyodide();
    } else {
      throw new Error("Pyodide not available");
    }
    pyodideLoading = false;
    updateStatus();
  } catch (err) {
    pyodideLoading = false;
    if (playgroundStatus) {
      playgroundStatus.textContent = "Failed to load Python runtime: " + err.message;
      playgroundStatus.className = "playground-full__status";
    }
  }
}

function updateStatus() {
  if (!playgroundStatus) return;
  
  if (currentLanguage === "javascript") {
    playgroundStatus.textContent = "JavaScript ready";
    playgroundStatus.className = "playground-full__status ready";
  } else if (pyodideLoading) {
    playgroundStatus.textContent = "Loading Python runtime... (first time may take a few seconds)";
    playgroundStatus.className = "playground-full__status loading";
  } else if (pyodideInstance) {
    playgroundStatus.textContent = "Python ready";
    playgroundStatus.className = "playground-full__status ready";
  } else {
    playgroundStatus.textContent = "Click Run to load Python runtime";
    playgroundStatus.className = "playground-full__status";
  }
}

// Run code
async function runCode() {
  if (!codeEditor || !codeOutput) return;
  
  const code = codeEditor.value;
  codeOutput.innerHTML = "";
  
  if (currentLanguage === "javascript") {
    runJavaScript(code);
  } else {
    await runPython(code);
  }
}

function runJavaScript(code) {
  const logs = [];
  const customConsole = {
    log: (...args) => {
      logs.push(args.map(arg => 
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(" "));
    },
    error: (...args) => {
      logs.push('<span class="output-error">Error: ' + args.join(" ") + '</span>');
    }
  };
  
  try {
    const fn = new Function("console", code);
    fn(customConsole);
    
    if (logs.length === 0) {
      codeOutput.innerHTML = '<span class="muted">Code executed (no output)</span>';
    } else {
      codeOutput.innerHTML = logs.map(log => 
        `<span class="output-line">${log}</span>`
      ).join("\n");
    }
  } catch (err) {
    codeOutput.innerHTML = `<span class="output-error">${err.name}: ${err.message}</span>`;
  }
}

async function runPython(code) {
  if (!pyodideInstance) {
    if (pyodideLoading) {
      codeOutput.innerHTML = '<span class="muted">Python is still loading, please wait...</span>';
      return;
    }
    await initPyodide();
  }
  
  if (!pyodideInstance) {
    codeOutput.innerHTML = '<span class="output-error">Failed to load Python runtime</span>';
    return;
  }
  
  try {
    // Redirect Python stdout
    pyodideInstance.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
    `);
    
    pyodideInstance.runPython(code);
    
    const output = pyodideInstance.runPython("sys.stdout.getvalue()");
    
    if (output.trim() === "") {
      codeOutput.innerHTML = '<span class="muted">Code executed (no output)</span>';
    } else {
      codeOutput.innerHTML = output.split("\n").map(line => 
        `<span class="output-line">${escapeHtml(line)}</span>`
      ).join("\n");
    }
  } catch (err) {
    codeOutput.innerHTML = `<span class="output-error">${escapeHtml(err.message)}</span>`;
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

if (runCodeBtn) runCodeBtn.addEventListener("click", runCode);

if (clearOutputBtn && codeOutput) {
  clearOutputBtn.addEventListener("click", () => {
    codeOutput.innerHTML = '<span class="muted">Click "Run" to see output...</span>';
  });
}

// Initialize status
updateStatus();

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

// Blog post expand/collapse functionality
const blogPosts = document.querySelectorAll(".blog-post");

blogPosts.forEach((post) => {
  // Click on preview to expand
  const preview = post.querySelector(".blog-post__preview");
  if (preview) {
    preview.addEventListener("click", () => {
      post.dataset.expanded = "true";
      // Scroll post into view smoothly
      post.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Click collapse button to shrink
  const collapseBtn = post.querySelector(".blog-post__collapse");
  if (collapseBtn) {
    collapseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      post.dataset.expanded = "false";
    });
  }
});