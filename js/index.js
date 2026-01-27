/* ---------------------------
   NAV
---------------------------- */
const navbar = document.getElementById("navbar");
const navbarToggle = navbar?.querySelector(".navbar-toggle");

function openMobileNavbar() {
  navbar.classList.add("opened");
  navbarToggle?.setAttribute("aria-label", "Close navigation menu.");
}

function closeMobileNavbar() {
  navbar.classList.remove("opened");
  navbarToggle?.setAttribute("aria-label", "Open navigation menu.");
}

navbarToggle?.addEventListener("click", () => {
  if (navbar.classList.contains("opened")) closeMobileNavbar();
  else openMobileNavbar();
});

const navbarLinksContainer = navbar?.querySelector(".navbar-links");
navbarLinksContainer?.addEventListener("click", (e) => {
  // close menu after clicking a link (mobile)
  const link = e.target.closest("a.navbar-link");
  if (link && navbar.classList.contains("opened")) closeMobileNavbar();
});

/* ---------------------------
   Scroll-to-top button
---------------------------- */
const mybutton = document.getElementById("myBtn");

window.addEventListener("scroll", () => {
  if (!mybutton) return;
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});

window.topFunction = function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

/* ---------------------------
   STATE
---------------------------- */
const state = {
  theme: "light",
  projects: [
    {
      id: "traffic-lab-v2",
      title: "Traffic Lab v2 (STM32 + FreeRTOS)",
      problem:
        "Build a deterministic traffic-controller demo with observability.",
      approach:
        "FreeRTOS tasks + UART TLV protocol + trace-friendly structure.",
      evidence:
        "FAT-style checklist + logs/trace screenshots + clean repo structure.",
      tags: ["STM32", "FreeRTOS", "UART", "TLV", "Debug/Trace"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/sheltsnn15/traffic-sim.git",
        },
      ],
    },
    {
      id: "home-lab-observability",
      title: "Home Lab — Secure Self-Hosted Services & Monitoring",
      problem:
        "Needed reliable monitoring + alerting for a growing Docker home lab (uptime, host metrics, container health).",
      approach:
        "Built Prometheus + exporters (node_exporter, cAdvisor) + Grafana dashboards; added Uptime Kuma checks; secured access with Tailscale (tailnet-only).",
      evidence:
        "Running stack  + triage notes for high CPU/mem, restart loops, and unreachability.",
      tags: [
        "Docker",
        "Prometheus",
        "Grafana",
        "Uptime Kuma",
        "Tailscale",
        "Home Assistant",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/sheltsnn15/Smart-Home.git",
        },
      ],
    },
    // {
    //   id: "presence-interlock",
    //   title: "Presence-Based Interlock (mmWave + PLC)",
    //   problem: "Drop run-permit immediately when a person is detected in zone.",
    //   approach: "Sensor gateway + PLC latching + manual reset + heartbeat.",
    //   evidence: "Commissioning mindset: URS → design → FAT/SAT evidence pack.",
    //   tags: ["PLC", "Interlocks", "OT", "IoT", "Safety mindset"],
    //   links: [{ label: "GitHub", href: "https://github.com/sheltsnn15" }],
    // },
    {
      id: "arigel",
      title: "Arigel (Precision Ag / Mapping Tool)",
      problem:
        "Generate prescription files from field geometry with validation.",
      approach: "React UI + snapping grid + topology checks + export flow.",
      evidence: "Repeatable demos + documented workflows + tests/checks.",
      tags: ["React", "Node", "SQL", "GeoJSON", "Validation"],
      links: [{ label: "GitHub", href: "https://github.com/sheltsnn15" }],
    },
  ],
};

/* ---------------------------
   THEME (Day 4: localStorage)
---------------------------- */
const THEME_KEY = "portfolio_theme";
const themeToggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  state.theme = theme;
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved === "dark" ? "dark" : "light");
}

themeToggleBtn?.addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
});

initTheme();

/* ---------------------------
   PROJECT RENDER
---------------------------- */
const projectsGrid = document.getElementById("projectsGrid");

function projectCardTemplate(p) {
  const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  const links = p.links
    .map(
      (l) =>
        `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`,
    )
    .join("");

  return `
    <article class="card card--clickable" tabindex="0" data-project-id="${p.id}">
      <h3 class="card__title">${p.title}</h3>

      <p class="card__label">Problem</p>
      <p class="card__text">${p.problem}</p>

      <p class="card__label">Approach</p>
      <p class="card__text">${p.approach}</p>

      <p class="card__label">Evidence</p>
      <p class="card__text">${p.evidence}</p>

      <div class="tag-row" aria-label="Tags">${tags}</div>
      <div class="card__links" aria-label="Links">${links}</div>
    </article>
  `;
}

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = state.projects.map(projectCardTemplate).join("");
}

renderProjects();

/* ---------------------------
   MODAL
---------------------------- */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalLinks = document.getElementById("modalLinks");

function openModal(project) {
  if (!modal || !modalTitle || !modalBody || !modalLinks) return;

  modalTitle.textContent = project.title;
  modalBody.innerHTML = `
    <p><strong>Problem:</strong> ${project.problem}</p>
    <p><strong>Approach:</strong> ${project.approach}</p>
    <p><strong>Evidence:</strong> ${project.evidence}</p>
    <p><strong>Tags:</strong> ${project.tags.join(" • ")}</p>
  `;

  modalLinks.innerHTML = project.links
    .map(
      (l) =>
        `<a class="btn btn--ghost" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`,
    )
    .join("");

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

// Event delegation on grid (Day 7 style)
projectsGrid?.addEventListener("click", (e) => {
  const card = e.target.closest("[data-project-id]");
  if (!card) return;

  const id = card.getAttribute("data-project-id");
  const project = state.projects.find((p) => p.id === id);
  if (project) openModal(project);
});

// Keyboard open (Enter/Space) for accessibility
projectsGrid?.addEventListener("keydown", (e) => {
  const card = e.target.closest("[data-project-id]");
  if (!card) return;

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const id = card.getAttribute("data-project-id");
    const project = state.projects.find((p) => p.id === id);
    if (project) openModal(project);
  }
});

// Close modal by clicking backdrop/close button
modal?.addEventListener("click", (e) => {
  const shouldClose = e.target?.getAttribute?.("data-close") === "true";
  if (shouldClose) closeModal();
});

// Esc closes modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});
