// Project data with YouTube demo links
const projectData = {
  1: {
    title: "Hologram-and-body-movement-detection",
    description: "Advanced computer vision system that detects human body movement to control holographic interfaces in real-time. This cutting-edge project combines OpenCV, MediaPipe, and 3D rendering technologies to create an immersive holographic experience controlled by natural body movements.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Computer Vision"
  },
  2: {
    title: "keyboard-and-Mouse-Controls-With-hands-and-finger-Gestures",
    description: "Revolutionary gesture control system that enables hand and finger gesture control to replace traditional mouse and keyboard input. Uses advanced hand tracking algorithms to provide seamless computer interaction without physical contact.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Gesture Control"
  },
  3: {
    title: "On-Screen-Virtual-Keyboard",
    description: "A touchless virtual keyboard operated by hand gestures for hygiene and accessibility. Perfect for public spaces, medical environments, or accessibility applications where traditional input methods aren't suitable.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "UI/UX"
  },
  4: {
    title: "Scrolling-Control-With-hand-Gestures",
    description: "Intuitive scrolling system that allows users to scroll webpages or applications using natural hand gestures. Provides smooth, responsive scrolling control without touching any surface.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Human-Computer Interaction"
  },
  5: {
    title: "BuddyAi - AI For teenagers",
    description: "AI-powered chatbot specifically designed to support and guide teenagers through conversations. Features age-appropriate responses, mental health support, and educational assistance tailored for teenage users.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "AI/ML"
  },
  6: {
    title: "Scientific-calculator",
    description: "A responsive and functional scientific calculator with advanced mathematical operations. Features a modern UI with support for complex calculations, trigonometric functions, logarithms, and more.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Web App"
  },
  7: {
    title: "Authentication-System",
    description: "Comprehensive secure login and registration system with password hashing, session management, and multi-factor authentication. Built with modern security practices and encrypted data storage.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Security"
  },
  8: {
    title: "Dynamic-Responsive-Frontend-Website",
    description: "Fully responsive website built with modern frontend frameworks and smooth animations. Features adaptive design, optimized performance, and cross-browser compatibility.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Frontend Development"
  },
  9: {
    title: "AI Text Summarization using CNN data",
    description: "Advanced NLP system that automatically summarizes CNN articles using deep learning techniques. Implements state-of-the-art transformer models for accurate and coherent text summarization.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "NLP"
  },
  10: {
    title: "AI emotion detection",
    description: "Real-time emotion detection system that analyzes human emotions using facial expression analysis. Utilizes computer vision and machine learning to identify emotions with high accuracy.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Computer Vision"
  }
};

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

// Project click handlers with ripple effect and modal opening
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    // Check if the clicked element is a button or link - if so, don't interfere
    if (e.target.closest('button, a, .btn, .buy-btn, .demo-btn')) {
      return; // Let the button handle its own click
    }

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

    // Get project ID and open modal (check both data-project and fallback to index)
    const projectId = this.getAttribute('data-project') || (Array.from(document.querySelectorAll('.project-card')).indexOf(this) + 1);
    if (projectId && projectData[projectId]) {
      openProjectModal(projectId);
    }
  });
});

// Function to open project modal
function openProjectModal(projectId) {
  const project = projectData[projectId];
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalVideo = document.getElementById('modalVideo');
  const fullVideoLink = document.getElementById('fullVideoLink');
  const orderProjectLink = document.getElementById('orderProjectLink');

  if (modal && project) {
    // Update modal content
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    // Update video iframe
    const embedUrl = `https://www.youtube.com/embed/${project.videoId}?autoplay=0&rel=0`;
    modalVideo.src = embedUrl;
    
    // Update video link
    const fullVideoUrl = `https://www.youtube.com/watch?v=${project.videoId}`;
    fullVideoLink.href = fullVideoUrl;
    
    // Update order link with project ID
    orderProjectLink.href = `price.html?project=${projectId}`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Function to close project modal
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalVideo = document.getElementById('modalVideo');
  
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop video playback
    if (modalVideo) {
      modalVideo.src = '';
    }
  }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  
  // Close button
  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }
  
  // Click outside modal to close
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }
  
  // ESC key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

  // Handle specific buttons for navigation
  const buyButtons = document.querySelectorAll('.buy-btn, .purchase-btn, [data-action="buy"]');
  buyButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent card click
      
      const projectId = this.getAttribute('data-project-id') || 
                       this.closest('.project-card')?.getAttribute('data-project') || 
                       (index + 1);
      
      console.log(`Buy button clicked - navigating to project ${projectId}`);
      window.location.href = `price.html?project=${projectId}`;
    });
  });

  // Handle project links that should go to price page
  const projectLinks = document.querySelectorAll('a[href*="price.html"]');
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href.includes('project=')) {
        e.preventDefault();
        e.stopPropagation(); // Prevent card click
        
        const projectId = this.getAttribute('data-project-id') || 
                         this.closest('.project-card')?.getAttribute('data-project') ||
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