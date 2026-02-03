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
      link: "https://github.com/sheltsnn15/Smart-Home",
    },
    {
      id: "air-quality",
      title: "Indoor Air Quality Management",
      summary: "IoT-based closed-loop control with predictive analytics",
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
    {
      title: "Tools & Workflow",
      items: ["Git", "Jira/Confluence", "REST APIs", "OpenAPI"],
    },
    {
      title: "Domain Expertise",
      items: ["GeoJSON", "ISOXML", "Shapefiles", "ArcGIS"],
    },
  ],
};

/* ============================
   CAROUSEL CLASS
============================ */
class Carousel {
  constructor(container, items, type = "projects") {
    this.container = container;
    this.items = items; // Array of projects or skills
    this.type = type; // "projects" or "skills"
    this.cardsPerSlide = 2; // Fixed 2 cards per slide
    this.currentSlide = 0;
    this.totalSlides = Math.ceil(items.length / this.cardsPerSlide);

    this.track = container.querySelector(".carousel__track");
    this.nav = container.querySelector(".carousel__nav");

    this.init();
  }

  init() {
    this.createSlides();
    this.createIndicators();
    this.setupEventListeners();
    this.updateCarousel();
  }

  createSlides() {
    this.track.innerHTML = "";

    // Group items into slides with 2 cards each
    for (let i = 0; i < this.items.length; i += this.cardsPerSlide) {
      const slideItems = this.items.slice(i, i + this.cardsPerSlide);
      const slide = document.createElement("div");
      slide.className = "carousel__slide";

      slideItems.forEach((item) => {
        slide.appendChild(this.createCard(item));
      });

      this.track.appendChild(slide);
    }
  }

  createCard(item) {
    const card = document.createElement("div");
    card.className = this.type === "projects" ? "project-card" : "skill-card";

    if (this.type === "projects") {
      card.innerHTML = `
        <h3 class="card__title">${item.title}</h3>
        <p class="card__text">${item.summary}</p>
        ${
          item.details
            ? `
          <div class="project-details">
            ${item.details.map((detail) => `<p>• ${detail}</p>`).join("")}
          </div>
        `
            : ""
        }
        <div class="tag-row">
          ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        ${
          item.link && item.link !== "#"
            ? `
          <div class="card__links">
            <a href="${item.link}" target="_blank" rel="noopener" class="project-link">
              View on GitHub →
            </a>
          </div>
        `
            : ""
        }
      `;
    } else {
      // Skills card layout
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.items.join(" • ")}</p>
      `;
    }

    return card;
  }

  createIndicators() {
    this.nav.innerHTML = "";

    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.className = `carousel__indicator ${i === 0 ? "current-slide" : ""}`;
      indicator.dataset.slide = i;
      indicator.setAttribute("aria-label", `Go to slide ${i + 1}`);
      this.nav.appendChild(indicator);
    }
  }

  setupEventListeners() {
    // Previous/next buttons
    const prevBtn = this.container.querySelector(".carousel__button--left");
    const nextBtn = this.container.querySelector(".carousel__button--right");

    prevBtn?.addEventListener("click", () => this.prevSlide());
    nextBtn?.addEventListener("click", () => this.nextSlide());

    // Indicator dots
    this.nav.addEventListener("click", (e) => {
      if (e.target.classList.contains("carousel__indicator")) {
        const slideIndex = parseInt(e.target.dataset.slide);
        this.goToSlide(slideIndex);
      }
    });

    // Keyboard navigation
    this.container.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Touch/swipe support
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    this.updateCarousel();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  updateCarousel() {
    // Move track to current slide
    const slideWidth = this.track.children[0].getBoundingClientRect().width;
    this.track.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;

    // Update indicator active state
    Array.from(this.nav.children).forEach((indicator, index) => {
      indicator.classList.toggle("current-slide", index === this.currentSlide);
    });

    // Update accessibility announcement
    this.updateARIALive();
  }

  updateARIALive() {
    const slideNum = this.currentSlide + 1;
    const total = this.totalSlides;

    let liveRegion = document.getElementById(
      `${this.type}-carousel-live-region`,
    );
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = `${this.type}-carousel-live-region`;
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      this.container.appendChild(liveRegion);
    }

    liveRegion.textContent = `Showing ${this.type} slide ${slideNum} of ${total}`;
  }
}

/* ============================
   INITIALIZE
============================ */
document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle setup
  const themeToggle = document.getElementById("themeToggle");
  const themeKey = "portfolio_theme";

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem(themeKey) || "light";
  document.body.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem(themeKey, next);
  });

  // Mobile navigation setup
  const navbar = document.getElementById("navbar");
  const navToggle = navbar?.querySelector(".navbar-toggle");

  navToggle?.addEventListener("click", () => {
    navbar.classList.toggle("opened");
  });

  // Close mobile menu when clicking a link
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

  // Initialize carousels
  const projectsCarousel = document.querySelector("#projects .carousel");
  const skillsCarousel = document.querySelector("#skills .carousel");

  if (projectsCarousel) {
    new Carousel(projectsCarousel, PORTFOLIO.projects, "projects");
  }

  if (skillsCarousel) {
    new Carousel(skillsCarousel, PORTFOLIO.skills, "skills");
  }
});
