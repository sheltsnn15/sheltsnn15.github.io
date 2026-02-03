/* ============================
   PORTFOLIO DATA
============================ */
const PORTFOLIO = {
  projects: [
    {
      id: "precision-agriculture",
      title: "Precision Agriculture Platform",
      summary: "Full-stack farm management deployed across 1,400+ hectares",
      tags: ["React", "Node.js", "GeoJSON", "Docker"],
      link: "https://github.com/sheltsnn15",
    },
    {
      id: "traffic-control",
      title: "Traffic Control System",
      summary: "STM32/FreeRTOS controller with ≤5ms verified timing",
      tags: ["STM32", "FreeRTOS", "C/C++", "SystemView"],
      link: "https://github.com/sheltsnn15/traffic-sim",
    },
    {
      id: "home-lab",
      title: "Home Lab Monitoring",
      summary: "Self-hosted services with full observability stack",
      tags: ["Docker", "Prometheus", "Grafana", "Linux"],
      link: "https://github.com/sheltsnn15/home-lab",
    },
    {
      id: "air-quality",
      title: "Indoor Air Quality Management System",
      summary: "IoT-based closed-loop control system with predictive analytics",
      tags: [
        "Python",
        "Raspberry Pi",
        "InfluxDB",
        "Zigbee2MQTT",
        "StatsModels",
      ],
      link: "https://github.com/sheltsnn15/Air_Quality_Monitoring_Sys",
    },
  ],
  skills: [
    {
      title: "Embedded & IoT",
      items: ["STM32", "FreeRTOS", "Raspberry Pi", "C/C++", "Zigbee/MQTT"],
    },
    {
      title: "Full-Stack",
      items: ["React", "Node.js", "Python", "SQL", "APIs"],
    },
    {
      title: "DevOps & SRE",
      items: ["Docker", "Linux", "Monitoring", "CI/CD"],
    },
    {
      title: "Data & Analytics",
      items: ["InfluxDB", "StatsModels", "ARIMA/SARIMA", "Time Series"],
    },
  ],
};

/* ============================
   INITIALIZE
============================ */
document.addEventListener("DOMContentLoaded", () => {
  // Setup theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeKey = "portfolio_theme";

  // Load saved theme
  const savedTheme = localStorage.getItem(themeKey) || "light";
  document.body.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem(themeKey, next);
  });

  // Setup mobile navigation
  const navbar = document.getElementById("navbar");
  const navToggle = navbar?.querySelector(".navbar-toggle");

  navToggle?.addEventListener("click", () => {
    navbar.classList.toggle("opened");
  });

  // Close mobile menu on link click
  navbar?.addEventListener("click", (e) => {
    if (
      e.target.closest(".navbar-link") &&
      navbar.classList.contains("opened")
    ) {
      navbar.classList.remove("opened");
    }
  });

  // Scroll to top button
  const scrollBtn = document.getElementById("myBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn?.classList.add("visible");
    } else {
      scrollBtn?.classList.remove("visible");
    }
  });

  scrollBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Render projects
  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    projectsGrid.innerHTML = PORTFOLIO.projects
      .map(
        (project) => `
        <article class="card">
          <h3 class="card__title">${project.title}</h3>
          <p class="card__text">${project.summary}</p>
          <div class="tag-row">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="card__links">
            <a href="${project.link}" target="_blank" rel="noopener" class="project-link">
              View on GitHub →
            </a>
          </div>
        </article>
      `,
      )
      .join("");
  }

  // Render skills
  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) {
    skillsGrid.innerHTML = PORTFOLIO.skills
      .map(
        (skill) => `
        <div class="skill-category">
          <h3>${skill.title}</h3>
          <p>${skill.items.join(" • ")}</p>
        </div>
      `,
      )
      .join("");
  }
});
