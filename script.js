const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const header = document.querySelector("[data-elevate]");
const onScrollHeader = () => {
  if (header) header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
};
window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

function smoothAnchorNavigation() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });
}
smoothAnchorNavigation();

const menuToggle = document.getElementById("menuToggle") || document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

function setMobile(open) {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  mobileNav.dataset.open = open ? "true" : "false";
  mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    setMobile(!expanded);
  });
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMobile(false)));
}

const reveals = document.querySelectorAll(".reveal");
if (!prefersReducedMotion && reveals.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((node) => revealObserver.observe(node));
} else {
  reveals.forEach((node) => node.classList.add("is-visible"));
}

const navLinks = [...document.querySelectorAll(".nav-link, .nav__link")].filter((a) => a.getAttribute("href")?.startsWith("#"));
const sectionNodes = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sectionNodes.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === id));
      });
    },
    { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 }
  );
  sectionNodes.forEach((node) => activeObserver.observe(node));
}

const exploreData = {
  writing: [
    {
      tag: "STS Thesis Prospectus",
      title: "Designing Opportunity Ecosystems",
      summary: "Examines why first-generation students face structural barriers in professional organizations and how universities can redesign support systems that improve access and long-term outcomes.",
      preview: ["First-generation participation barriers", "Opportunity ecosystem framework", "UVA CIO hub application"],
      details:
        "Uses bioecological systems theory and social capital framing to analyze how universities can build stronger opportunity ecosystems.",
      bullets: ["Social capital framing", "UVA CIO hub context"],
      actions: [{ label: "Read Prospectus", href: "Prospectus.pdf", external: true }, { label: "Open Writing", href: "writing.html" }]
    },
    {
      tag: "AI Research Paper",
      title: "ESG and Public Sentiment Analysis",
      summary: "Tests whether ESG sentiment from financial news can help predict short-term stock movement using FinBERT features with Logistic Regression and XGBoost.",
      preview: ["FinBERT sentiment pipeline", "Logistic vs XGBoost models", "Short-term signal uncertainty"],
      details:
        "Compares Logistic Regression and XGBoost under uncertain short-term market signal conditions.",
      bullets: ["Final Project Report", "FinBERT sentiment pipeline", "Model comparison"],
      actions: [{ label: "Read Paper", href: "Final Project Report.pdf", external: true }, { label: "Open Writing", href: "writing.html" }]
    },
    {
      tag: "Short-form Posts",
      title: "Blog",
      summary: "Latest post (Mar 10, 2026): how Lego unlocked record growth by experimenting with adult audiences — and what that means for any business already winning.",
      preview: [
        "Business, AI, technology, and market commentary",
        "Written from a technical background",
        "Rooted in a love for business"
      ],
      details: "Short-form blog format with expandable entries and links to source material for follow-up reading.",
      bullets: [
        "Business, AI, technology, and market commentary",
        "Written from a technical background",
        "Rooted in a love for business"
      ],
      actions: [{ label: "Open Blog", href: "blog.html" }]
    }
  ],
  games: [
    {
      tag: "Text Adventure",
      title: "The Ashen Road",
      summary: "A text-based RPG set 500 years before the Destiny's Champion canon. Play as Kaeso, a Branded warrior investigating disappearances in a northern village — and follow the trail into something far darker.",
      preview: ["3 distinct endings", "Turn-based combat system", "1–2 hour playthrough"],
      details: "Built as a single HTML file with no dependencies. Features a full combat engine, status effects, Branded Heat mechanic, item crafting, NPC dialogue trees, and branching story flags that determine which of three endings you reach.",
      bullets: ["12 enemy types with unique abilities", "Branded fire mechanic", "Choices shape the outcome"],
      actions: [{ label: "Play Now", href: "games/the-ashen-road.html" }]
    },
    {
      tag: "Code Playground",
      title: "JavaScript + Python Playground",
      summary: "Run JavaScript instantly and execute Python through Pyodide in-browser, with a shared output panel for fast testing and iteration.",
      preview: ["In-browser JavaScript runner", "Pyodide-powered Python", "Shared output panel"],
      details: "Supports quick testing with language tabs and output panel without leaving the page.",
      bullets: ["JavaScript runner", "Pyodide Python runtime", "Shared output panel"],
      actions: [{ label: "Go to Playground", href: "games.html#playground" }]
    },
    {
      tag: "Games",
      title: "Browse the Games Page",
      summary: "All playable projects live in one place — browser-based games and experiments you can run without installing anything.",
      preview: ["No installs required", "Runs in any modern browser", "Growing collection"],
      details: "The games page collects everything playable: current releases, the code playground, and future projects as they ship.",
      bullets: ["The Ashen Road (text RPG)", "JS + Python playground", "More in development"],
      actions: [{ label: "See All Games", href: "games.html" }]
    }
  ]
};

const tabButtons = [...document.querySelectorAll(".segment")];
const exploreGrid = document.getElementById("exploreGrid");
const exploreViewAll = document.getElementById("exploreViewAll");
const drawer = document.getElementById("exploreDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const drawerClose = document.getElementById("drawerClose");
const drawerTitle = document.getElementById("drawerTitle");
const drawerTag = document.getElementById("drawerTag");
const drawerDescription = document.getElementById("drawerDescription");
const drawerBullets = document.getElementById("drawerBullets");
const drawerActions = document.getElementById("drawerActions");

let activeExploreTab = "writing";

function getViewAllLink(tab) {
  if (tab === "writing") return "writing.html";
  if (tab === "games") return "games.html";
  return "writing.html";
}

function openDrawer(item) {
  if (!drawer || !drawerTitle || !drawerTag || !drawerDescription || !drawerBullets || !drawerActions) return;
  drawerTag.textContent = item.tag;
  drawerTitle.textContent = item.title;
  drawerDescription.textContent = item.details;

  drawerBullets.innerHTML = "";
  item.bullets.forEach((bullet) => {
    const li = document.createElement("li");
    li.textContent = bullet;
    drawerBullets.appendChild(li);
  });

  drawerActions.innerHTML = "";
  item.actions.forEach((action) => {
    const a = document.createElement("a");
    a.className = "button button-primary";
    a.href = action.href;
    a.textContent = action.label;
    if (action.external) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    drawerActions.appendChild(a);
  });

  drawer.dataset.open = "true";
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  if (!drawer) return;
  drawer.dataset.open = "false";
  drawer.setAttribute("aria-hidden", "true");
}

function renderExplore(tab) {
  if (!exploreGrid || !exploreData[tab]) return;
  activeExploreTab = tab;

  exploreGrid.innerHTML = "";
  exploreData[tab].forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "explore-card";
    button.setAttribute("aria-label", `Open details for ${item.title}`);

    button.innerHTML = `
      <article class="card">
        <p class="card-tag">${item.tag}</p>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <ul>
          ${(item.preview || item.bullets || []).slice(0, 3).map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </article>
    `;

    button.addEventListener("click", () => openDrawer(item));
    exploreGrid.appendChild(button);
  });

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  if (exploreViewAll) exploreViewAll.setAttribute("href", getViewAllLink(tab));
}

if (tabButtons.length && exploreGrid) {
  renderExplore(activeExploreTab);
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => renderExplore(button.dataset.tab));
  });
}

if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);
if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
    if (resumeModal?.dataset.open === "true") closeResumeModal();
  }
});

const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight"
];
let konamiIndex = 0;

document.addEventListener("keydown", (event) => {
  const activeElement = document.activeElement;
  const isTypingField =
    activeElement &&
    (activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.tagName === "SELECT" ||
      activeElement.isContentEditable);
  if (isTypingField) return;

  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const expected = konamiSequence[konamiIndex];

  if (key === expected) {
    konamiIndex += 1;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      const path = window.location.pathname.toLowerCase();
      if (!path.endsWith("easter-egg.html")) {
        window.location.href = "easter-egg.html";
      }
    }
    return;
  }

  konamiIndex = key === konamiSequence[0] ? 1 : 0;
});

const portalCanvas = document.getElementById("portalCanvas");

function createConstellationMap(canvas) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let pointerX = 0;
  let pointerY = 0;
  let pointerActive = false;
  let hoveredNodeId = null;
  let activeZone = "none";
  let scrollY = 0;
  let latestLayout = [];
  let stars = [];

  const nodes = [
    { id: "hero", section: "hero", label: "ME", clickable: true, x: 0.14, y: 0.22, phase: 0.2 },
    { id: "projects", section: "projects", label: "PROJECTS", clickable: true, x: 0.34, y: 0.38, phase: 1.0 },
    { id: "work", section: "work", label: "WORK", clickable: true, x: 0.63, y: 0.28, phase: 1.9 },
    { id: "explore", section: "explore", label: "EXPLORE", clickable: true, x: 0.68, y: 0.57, phase: 2.7 },
    { id: "contact", section: "contact", label: "CONTACT", clickable: true, x: 0.4, y: 0.74, phase: 3.4 },
    { id: "blog", section: "explore", label: "BLOG", clickable: false, x: 0.85, y: 0.42, phase: 4.1 },
    { id: "writing", section: "explore", label: "WRITING", clickable: false, x: 0.54, y: 0.82, phase: 4.9 }
  ];

  const edges = [
    ["hero", "projects"],
    ["projects", "work"],
    ["projects", "explore"],
    ["projects", "contact"],
    ["work", "explore"],
    ["work", "blog"],
    ["explore", "writing"],
    ["explore", "contact"],
    ["writing", "contact"]
  ];

  const zoneGroups = {
    hero: ["hero", "projects"],
    projects: ["projects", "hero", "work"],
    work: ["work", "projects", "contact"],
    explore: ["explore", "writing", "blog"],
    contact: ["contact", "work", "explore"],
    none: []
  };

  const sectionLabels = {
    hero: "Me",
    projects: "Projects",
    work: "Work",
    explore: "Explore",
    contact: "Contact"
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    width = Math.max(240, Math.floor(rect.width));
    height = Math.max(320, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1 + 0.35,
      a: Math.random() * 0.28 + 0.06
    }));
    draw(performance.now(), true);
  };

  const nodeFocus = nodes.reduce((accumulator, node) => {
    accumulator[node.id] = 0.25;
    return accumulator;
  }, {});

  const getNearestInteractiveNode = (x, y, layout, maxDistance = 34) => {
    const candidates = layout
      .filter((node) => node.clickable)
      .map((node) => ({ node, distance: Math.hypot(node.x - x, node.y - y) }))
      .sort((a, b) => a.distance - b.distance);
    if (!candidates.length || candidates[0].distance > maxDistance) return null;
    return candidates[0].node;
  };

  const drawRoundedRect = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const computeLayout = (time) => {
    const layout = nodes.map((node) => {
      const floatX = prefersReducedMotion ? 0 : Math.sin(time * 0.00045 + node.phase) * 4.4;
      const floatY = prefersReducedMotion ? 0 : Math.cos(time * 0.00052 + node.phase) * 3.8 + scrollY * (node.y - 0.5) * 0.012;
      let x = node.x * width + floatX;
      let y = node.y * height + floatY;

      if (pointerActive) {
        const dx = pointerX - x;
        const dy = pointerY - y;
        const distance = Math.hypot(dx, dy);
        if (distance < 240) {
          const influence = Math.pow(1 - distance / 240, 2);
          x += dx * 0.06 * influence;
          y += dy * 0.06 * influence;
        }
      }

      return { ...node, x, y };
    });

    latestLayout = layout;
    return layout;
  };

  const updateFocus = () => {
    const activeIds = new Set(zoneGroups[activeZone] || zoneGroups.none);
    nodes.forEach((node) => {
      const target = activeZone === "none" ? 0.25 : activeIds.has(node.id) ? 1 : 0.14;
      if (prefersReducedMotion) {
        nodeFocus[node.id] = target;
      } else {
        nodeFocus[node.id] += (target - nodeFocus[node.id]) * 0.14;
      }
    });
  };

  const draw = (time, staticFrame = false) => {
    updateFocus();
    ctx.fillStyle = "#0f1319";
    ctx.fillRect(0, 0, width, height);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(234, 242, 255, ${star.a})`;
      ctx.fill();
    });

    const layout = computeLayout(time);
    const byId = new Map(layout.map((node) => [node.id, node]));
    const hoveredNode = pointerActive ? getNearestInteractiveNode(pointerX, pointerY, layout) : null;
    hoveredNodeId = hoveredNode ? hoveredNode.id : null;
    canvas.style.cursor = hoveredNode ? "pointer" : "default";

    edges.forEach(([fromId, toId]) => {
      const from = byId.get(fromId);
      const to = byId.get(toId);
      if (!from || !to) return;
      const emphasis = (nodeFocus[fromId] + nodeFocus[toId]) * 0.5;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.lineWidth = 1 + emphasis * 0.8;
      ctx.strokeStyle = `rgba(236, 244, 255, ${0.08 + emphasis * 0.33})`;
      ctx.stroke();
    });

    layout.forEach((node) => {
      const emphasis = nodeFocus[node.id];
      const isHovered = node.id === hoveredNodeId;
      const radius = 3 + emphasis * 2.8;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 4 + emphasis * 2 + (isHovered ? 2 : 0), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236, 244, 255, ${0.04 + emphasis * 0.13 + (isHovered ? 0.08 : 0)})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 248, 255, ${0.42 + emphasis * 0.45})`;
      ctx.fill();
    });

    ctx.font = "600 11px 'Space Grotesk', 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    layout.forEach((node) => {
      if (!node.clickable) return;
      const emphasis = nodeFocus[node.id];
      const text = node.label;
      const textWidth = ctx.measureText(text).width;
      const pillWidth = textWidth + 18;
      const pillHeight = 20;
      const pillX = node.x - pillWidth / 2;
      const pillY = node.y - 28;
      drawRoundedRect(pillX, pillY, pillWidth, pillHeight, 10);
      ctx.fillStyle = `rgba(12, 16, 24, ${0.58 + emphasis * 0.22})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(236, 244, 255, ${0.12 + emphasis * 0.28})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = `rgba(236, 244, 255, ${0.66 + emphasis * 0.28})`;
      ctx.fillText(text, node.x, pillY + pillHeight / 2);
    });

    if (hoveredNode) {
      const tooltip = `Go to ${sectionLabels[hoveredNode.section] || hoveredNode.section}`;
      ctx.font = "600 12px 'Space Grotesk', 'Segoe UI', sans-serif";
      ctx.textAlign = "left";
      const tooltipWidth = ctx.measureText(tooltip).width + 20;
      const tooltipHeight = 28;
      let tooltipX = pointerX + 14;
      let tooltipY = pointerY - 34;
      if (tooltipX + tooltipWidth > width - 8) tooltipX = width - tooltipWidth - 8;
      if (tooltipY < 8) tooltipY = pointerY + 12;
      drawRoundedRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 10);
      ctx.fillStyle = "rgba(12, 16, 24, 0.86)";
      ctx.fill();
      ctx.strokeStyle = "rgba(236, 244, 255, 0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(244, 248, 255, 0.95)";
      ctx.textBaseline = "middle";
      ctx.fillText(tooltip, tooltipX + 10, tooltipY + tooltipHeight / 2);
    }

    if (!staticFrame && !prefersReducedMotion) requestAnimationFrame(draw);
  };

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    pointerActive = true;
    if (prefersReducedMotion) draw(performance.now(), true);
  });

  canvas.addEventListener("mouseleave", () => {
    pointerActive = false;
    hoveredNodeId = null;
    canvas.style.cursor = "default";
    if (prefersReducedMotion) draw(performance.now(), true);
  });

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
    if (prefersReducedMotion) draw(performance.now(), true);
  }, { passive: true });

  window.addEventListener("resize", resize);

  canvas.addEventListener("click", (event) => {
    if (!latestLayout.length) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const nearest = getNearestInteractiveNode(clickX, clickY, latestLayout);
    if (!nearest) return;
    const target = document.getElementById(nearest.section);
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  });

  const setZone = (zoneName) => {
    activeZone = zoneGroups[zoneName] ? zoneName : "none";
    if (prefersReducedMotion) {
      draw(performance.now(), true);
    }
  };

  resize();
  activeZone = "none";

  if (prefersReducedMotion) {
    draw(performance.now(), true);
  } else {
    requestAnimationFrame(draw);
  }

  return { setZone, redraw: () => draw(performance.now(), true) };
}

const portal = portalCanvas ? createConstellationMap(portalCanvas) : null;

const zoneTriggers = document.querySelectorAll("[data-zone]");
if (portal && zoneTriggers.length) {
  zoneTriggers.forEach((node) => {
    const zone = node.getAttribute("data-zone") || "none";
    node.addEventListener("mouseenter", () => portal.setZone(zone));
    node.addEventListener("focus", () => portal.setZone(zone));
    node.addEventListener("mouseleave", () => portal.setZone("none"));
    node.addEventListener("blur", () => portal.setZone("none"));
  });
}

const resumeBtn = document.getElementById("resumeBtn");
const resumeModal = document.getElementById("resumeModal");
const modalBackdrop = document.getElementById("modalBackdrop") || document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const resumeFrame = document.getElementById("resumeFrame");

function openResumeModal() {
  if (!resumeModal || !resumeFrame) return;
  resumeFrame.src = "Tristan Grubbs Resume.pdf";
  resumeModal.dataset.open = "true";
  resumeModal.setAttribute("aria-hidden", "false");
}

function closeResumeModal() {
  if (!resumeModal || !resumeFrame) return;
  resumeModal.dataset.open = "false";
  resumeModal.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    resumeFrame.src = "";
  }, 180);
}

if (resumeBtn) resumeBtn.addEventListener("click", openResumeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeResumeModal);
if (modalClose) modalClose.addEventListener("click", closeResumeModal);

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

if (quoteText && quoteAuthor) {
  fetch("./quotes.json")
    .then((res) => {
      if (!res.ok) throw new Error("Quotes fetch failed");
      return res.json();
    })
    .then((quotes) => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      quoteText.textContent = quote?.text || "";
      quoteAuthor.textContent = quote?.author ? `- ${quote.author}` : "";
    })
    .catch(() => {
      quoteText.textContent = "Quality work compounds over time.";
      quoteAuthor.textContent = "- Tristan Grubbs";
    });
}

const blogPosts = document.querySelectorAll(".blog-post");
blogPosts.forEach((post) => {
  const preview = post.querySelector(".blog-post__preview");
  const collapse = post.querySelector(".blog-post__collapse");
  if (preview) {
    preview.addEventListener("click", () => {
      post.dataset.expanded = "true";
    });
  }
  if (collapse) {
    collapse.addEventListener("click", (event) => {
      event.stopPropagation();
      post.dataset.expanded = "false";
    });
  }
});

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
  javascript: `// Welcome to the JavaScript playground!\nconst greet = (name) => {\n  return \`Hello, \${name}!\`;\n};\n\nconsole.log(greet("World"));\nconsole.log("2 + 2 =", 2 + 2);`,
  python: `# Welcome to the Python playground!\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\nprint("2 + 2 =", 2 + 2)`
};

function updateStatus() {
  if (!playgroundStatus) return;
  if (currentLanguage === "javascript") {
    playgroundStatus.textContent = "JavaScript ready";
    return;
  }
  if (pyodideLoading) {
    playgroundStatus.textContent = "Loading Python runtime...";
    return;
  }
  playgroundStatus.textContent = pyodideInstance ? "Python ready" : "Click Run to initialize Python";
}

async function initPyodide() {
  if (pyodideInstance || pyodideLoading) return;
  pyodideLoading = true;
  updateStatus();
  try {
    if (typeof loadPyodide !== "function") throw new Error("Pyodide script missing");
    pyodideInstance = await loadPyodide();
  } catch (error) {
    if (playgroundStatus) playgroundStatus.textContent = `Python runtime failed: ${error.message}`;
  } finally {
    pyodideLoading = false;
    updateStatus();
  }
}

function runJavaScript(code) {
  if (!codeOutput) return;
  const logs = [];
  const customConsole = {
    log: (...args) => logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "))
  };

  try {
    const fn = new Function("console", code);
    fn(customConsole);
    codeOutput.innerHTML = logs.length ? logs.map((line) => `<div>${line}</div>`).join("") : "<span class=\"muted\">Code executed (no output)</span>";
  } catch (error) {
    codeOutput.innerHTML = `<span class=\"output-error\">${error.name}: ${error.message}</span>`;
  }
}

async function runPython(code) {
  if (!codeOutput) return;
  if (!pyodideInstance) await initPyodide();
  if (!pyodideInstance) return;

  try {
    pyodideInstance.runPython(`\nimport sys\nfrom io import StringIO\nsys.stdout = StringIO()\n`);
    pyodideInstance.runPython(code);
    const output = pyodideInstance.runPython("sys.stdout.getvalue()") || "";
    codeOutput.innerHTML = output.trim() ? output.split("\n").map((line) => `<div>${line}</div>`).join("") : "<span class=\"muted\">Code executed (no output)</span>";
  } catch (error) {
    codeOutput.innerHTML = `<span class=\"output-error\">${error.message}</span>`;
  }
}

async function runCode() {
  if (!codeEditor) return;
  if (currentLanguage === "javascript") runJavaScript(codeEditor.value);
  else await runPython(codeEditor.value);
}

languageTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const lang = tab.dataset.lang;
    if (!lang || lang === currentLanguage) return;
    currentLanguage = lang;
    languageTabs.forEach((t) => t.classList.toggle("active", t === tab));
    if (codeEditor) codeEditor.value = starterCode[lang];
    if (codeOutput) codeOutput.innerHTML = '<span class="muted">Click "Run" to see output...</span>';
    if (lang === "python") initPyodide();
    updateStatus();
  });
});

if (runCodeBtn) runCodeBtn.addEventListener("click", runCode);
if (clearOutputBtn && codeOutput) {
  clearOutputBtn.addEventListener("click", () => {
    codeOutput.innerHTML = '<span class="muted">Click "Run" to see output...</span>';
  });
}
updateStatus();
