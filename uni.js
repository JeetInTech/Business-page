// Universal JavaScript for Jeet Enterprises
class JeetEnterprisesApp {
  constructor() {
    this.sidebar = null;
    this.sidebarOverlay = null;
    this.mobileMenuBtn = null;
    this.collapseBtn = null;
    this.themeToggle = null;
    this.currentTheme = "light";

    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.createSidebar();
    this.setupEventListeners();
    this.loadTheme();
    this.setActiveNavItem();
    this.handleResponsiveDesign();

    // Add fade-in animation to content
    document.body.classList.add("fade-in");
  }

  createSidebar() {
    // Create sidebar HTML structure
    const sidebarHTML = `
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Sidebar Overlay -->
      <div class="sidebar-overlay" id="sidebarOverlay"></div>

      <!-- Sidebar -->
      <nav class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <a href="/" class="logo">
            <span class="logo-text">Jeet Enterprises</span>
          </a>
          <button class="collapse-btn" id="collapseBtn" aria-label="Collapse sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="sidebar-nav">
          <div class="nav-section">
            <h3 class="nav-section-title">Main</h3>
            <a href="/index.html" class="nav-item" data-page="home">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </div>
              <span class="nav-text">Home</span>
            </a>
            <a href="/index.html" class="nav-item" data-page="about">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <span class="nav-text">About</span>
            </a>
          </div>

          <div class="nav-section">
            <h3 class="nav-section-title">Products</h3>
            <a href="/Software.html" class="nav-item" data-page="software">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <span class="nav-text">Software</span>
            </a>
            <a href="/projects.html" class="nav-item" data-page="projects">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <span class="nav-text">Projects</span>
            </a>
          </div>

          <div class="nav-section">
            <h3 class="nav-section-title">Support</h3>
            <a href="/index.html" class="nav-item" data-page="contact">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <span class="nav-text">Contact</span>
            </a>
          </div>

          <div class="nav-section">
            <h3 class="nav-section-title">Legal</h3>
            <a href="/privacy-policy.html" class="nav-item" data-page="privacy">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span class="nav-text">Privacy Policy</span>
            </a>
            <a href="/terms-and-conditions.html" class="nav-item" data-page="terms">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg> 
              </div>
              <span class="nav-text">Terms & Conditions</span>
            </a>
            <a href="/shipping-delivery.html" class="nav-item" data-page="shipping">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16,8 20,8 23,11 23,16 16,16"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <span class="nav-text">Shipping & Delivery</span>
            </a>
            <a href="/cancellation-refund.html" class="nav-item" data-page="refund">
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </div>
              <span class="nav-text">Cancellation & Refund</span>
            </a>
          </div>
        </div>

        <button class="theme-toggle" id="themeToggle">
          <div class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="theme-icon-light">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="theme-icon-dark" style="display: none;">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
          <span class="nav-text">Toggle Theme</span>
        </button>
      </nav>
    `;

    // Insert sidebar at the beginning of body
    document.body.insertAdjacentHTML("afterbegin", sidebarHTML);

    // Get references to elements
    this.sidebar = document.getElementById("sidebar");
    this.sidebarOverlay = document.getElementById("sidebarOverlay");
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.collapseBtn = document.getElementById("collapseBtn");
    this.themeToggle = document.getElementById("themeToggle");
  }

  setupEventListeners() {
    // Mobile menu toggle
    this.mobileMenuBtn?.addEventListener("click", () =>
      this.toggleMobileMenu()
    );

    // Sidebar overlay click
    this.sidebarOverlay?.addEventListener("click", () =>
      this.closeMobileMenu()
    );

    // Sidebar collapse toggle
    this.collapseBtn?.addEventListener("click", () =>
      this.toggleSidebarCollapse()
    );

    // Theme toggle
    this.themeToggle?.addEventListener("click", () => this.toggleTheme());

    // Escape key to close mobile menu
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.sidebar?.classList.contains("mobile-open")
      ) {
        this.closeMobileMenu();
      }
    });

    // Window resize handler
    window.addEventListener("resize", () => this.handleResponsiveDesign());

    // Navigation item clicks
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        // Close mobile menu when nav item is clicked
        if (window.innerWidth <= 768) {
          this.closeMobileMenu();
        }
      });
    });
  }

  toggleMobileMenu() {
    if (this.sidebar && this.sidebarOverlay) {
      const isOpen = this.sidebar.classList.contains("mobile-open");

      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.sidebar.classList.add("mobile-open");
        this.sidebarOverlay.style.display = "block";
        setTimeout(() => this.sidebarOverlay.classList.add("active"), 10);
        document.body.style.overflow = "hidden";
      }
    }
  }

  closeMobileMenu() {
    if (this.sidebar && this.sidebarOverlay) {
      this.sidebar.classList.remove("mobile-open");
      this.sidebarOverlay.classList.remove("active");
      setTimeout(() => {
        this.sidebarOverlay.style.display = "none";
      }, 300);
      document.body.style.overflow = "";
    }
  }

  toggleSidebarCollapse() {
    if (this.sidebar && window.innerWidth > 768) {
      const isCollapsed = this.sidebar.classList.contains("collapsed");

      if (isCollapsed) {
        this.sidebar.classList.remove("collapsed");
        this.saveSidebarState("expanded");
      } else {
        this.sidebar.classList.add("collapsed");
        this.saveSidebarState("collapsed");
      }
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    this.setTheme(newTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.saveTheme(theme);
    this.updateThemeIcon(theme);
    this.currentTheme = theme;
  }

  updateThemeIcon(theme) {
    const lightIcon = document.querySelector(".theme-icon-light");
    const darkIcon = document.querySelector(".theme-icon-dark");

    if (lightIcon && darkIcon) {
      if (theme === "dark") {
        lightIcon.style.display = "none";
        darkIcon.style.display = "block";
      } else {
        lightIcon.style.display = "block";
        darkIcon.style.display = "none";
      }
    }
  }

  loadTheme() {
    const savedTheme = this.getSavedTheme();
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");

    this.setTheme(theme);

    // Load sidebar state
    const sidebarState = this.getSavedSidebarState();
    if (
      sidebarState === "collapsed" &&
      this.sidebar &&
      window.innerWidth > 768
    ) {
      this.sidebar.classList.add("collapsed");
    }
  }

  setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      item.classList.remove("active");

      const href = item.getAttribute("href");
      if (
        href === currentPath ||
        (currentPath === "/" && href === "/") ||
        (currentPath.includes(href) && href !== "/")
      ) {
        item.classList.add("active");
      }
    });
  }

  handleResponsiveDesign() {
    if (window.innerWidth <= 768) {
      // Mobile view
      if (this.sidebar) {
        this.sidebar.classList.remove("collapsed");
      }
    } else {
      // Desktop view
      this.closeMobileMenu();

      // Restore saved sidebar state
      const sidebarState = this.getSavedSidebarState();
      if (sidebarState === "collapsed" && this.sidebar) {
        this.sidebar.classList.add("collapsed");
      }
    }
  }

  // Storage methods (using memory storage instead of localStorage)
  saveTheme(theme) {
    if (typeof Storage !== "undefined") {
      try {
        localStorage.setItem("jeet-theme", theme);
      } catch (e) {
        // Fallback to memory storage
        this.memoryStorage = this.memoryStorage || {};
        this.memoryStorage.theme = theme;
      }
    }
  }

  getSavedTheme() {
    if (typeof Storage !== "undefined") {
      try {
        return localStorage.getItem("jeet-theme");
      } catch (e) {
        // Fallback to memory storage
        return this.memoryStorage?.theme || null;
      }
    }
    return null;
  }

  saveSidebarState(state) {
    if (typeof Storage !== "undefined") {
      try {
        localStorage.setItem("jeet-sidebar-state", state);
      } catch (e) {
        // Fallback to memory storage
        this.memoryStorage = this.memoryStorage || {};
        this.memoryStorage.sidebarState = state;
      }
    }
  }

  getSavedSidebarState() {
    if (typeof Storage !== "undefined") {
      try {
        return localStorage.getItem("jeet-sidebar-state");
      } catch (e) {
        // Fallback to memory storage
        return this.memoryStorage?.sidebarState || null;
      }
    }
    return null;
  }

  // Utility methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Smooth scrolling for internal links
  smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Show/hide loading state
  showLoading() {
    const loader = document.createElement("div");
    loader.className = "page-loader";
    loader.innerHTML = `
      <div class="loader-spinner">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
      </div>
    `;
    document.body.appendChild(loader);
  }

  hideLoading() {
    const loader = document.querySelector(".page-loader");
    if (loader) {
      loader.remove();
    }
  }

  // Notification system
  showNotification(message, type = "info", duration = 5000) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, duration);
    }
  }

  // Initialize tooltips
  initTooltips() {
    const elementsWithTooltips = document.querySelectorAll("[data-tooltip]");

    elementsWithTooltips.forEach((element) => {
      let tooltip = null;

      element.addEventListener("mouseenter", (e) => {
        const text = element.getAttribute("data-tooltip");
        if (!text) return;

        tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = text;
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left =
          rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";
      });

      element.addEventListener("mouseleave", () => {
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      });
    });
  }

  // Form validation helper
  validateForm(formElement) {
    const inputs = formElement.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error");
        isValid = false;
      } else {
        input.classList.remove("error");
      }
    });

    return isValid;
  }

  // Initialize form handlers
  initForms() {
    const forms = document.querySelectorAll("form[data-validate]");

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
          this.showNotification("Please fill in all required fields.", "error");
        }
      });
    });
  }

  // Destroy method for cleanup
  destroy() {
    // Remove event listeners
    this.mobileMenuBtn?.removeEventListener("click", this.toggleMobileMenu);
    this.sidebarOverlay?.removeEventListener("click", this.closeMobileMenu);
    this.collapseBtn?.removeEventListener("click", this.toggleSidebarCollapse);
    this.themeToggle?.removeEventListener("click", this.toggleTheme);

    // Remove created elements
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const mobileBtn = document.getElementById("mobileMenuBtn");

    sidebar?.remove();
    overlay?.remove();
    mobileBtn?.remove();
  }
}

// Initialize the app when DOM is loaded
const jeetApp = new JeetEnterprisesApp();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = JeetEnterprisesApp;
}
