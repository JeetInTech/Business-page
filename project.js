// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 150);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll(".project-card, .section-header").forEach((el) => {
  observer.observe(el);
});

// Project click handlers with ripple effect
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Navigate to project - Fixed this part
    const projectId = this.getAttribute('data-project-id') || (index + 1);
    console.log(`Navigating to project ${projectId}`);
    
    setTimeout(() => {
      window.location.href = `price.html?project=${projectId}`;
    }, 300); // Small delay for ripple effect
  });
});

// Alternative method - if you have specific project buttons
document.addEventListener('DOMContentLoaded', function() {
  // Handle project buttons or links
  const projectButtons = document.querySelectorAll('[data-project]');
  projectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      window.location.href = `price.html?project=${projectId}`;
    });
  });

  // Handle project links
  const projectLinks = document.querySelectorAll('a[href*="price.html"]');
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href.includes('project=')) {
        e.preventDefault();
        // Try to get project ID from data attribute or other methods
        const projectId = this.getAttribute('data-project-id') || 
                         this.closest('.project-card')?.getAttribute('data-project-id') ||
                         '1';
        window.location.href = `price.html?project=${projectId}`;
      }
    });
  });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        }
        
        // Close menu when clicking on links
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced scroll effects
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});

function updateScrollEffects() {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  // Parallax background effect
  const parallaxBg = document.getElementById("parallaxBg");
  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${rate}px)`;
  }

  // Floating shapes parallax
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    const speed = 0.2 + index * 0.1;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });

  ticking = false;
}

// Mouse movement parallax
document.addEventListener("mousemove", (e) => {
  const mouseX = (e.clientX / window.innerWidth) * 100;
  const mouseY = (e.clientY / window.innerHeight) * 100;

  document.documentElement.style.setProperty("--mouse-x", mouseX + "%");
  document.documentElement.style.setProperty("--mouse-y", mouseY + "%");
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navigation scroll effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  if (nav) {
    if (window.scrollY > 100) {
      nav.style.background = "rgba(10, 10, 10, 0.95)";
      nav.style.backdropFilter = "blur(20px)";
    } else {
      nav.style.background = "rgba(10, 10, 10, 0.9)";
      nav.style.backdropFilter = "blur(10px)";
    }
  }
});

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});