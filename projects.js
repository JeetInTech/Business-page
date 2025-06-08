// Project data
const projectData = {
  "social-automation": {
    title: "One-Click Summarization (Ad-Free)",
    description:
      "Transform your boring notes into seamlessly.",
    videoId: "dQw4w9WgXcQ",
    purchaseUrl: "price.html?project=9",
    price: "₹1,100",
    downloads: "1,247",
    features: [
      "AI-powered content generation",
      "Short and long-form content",
      "Analytics and insights",
      "Automated engagement",
    ],
  },
  "voice-assistant": {
    title: "Voice Assistant Jeet",
    description:
      "Meet Jeet, your personal AI-powered voice assistant for seamless daily interactions.",
    videoId: "dQw4w9WgXcQ",
    purchaseUrl: "software.html",
    price: "100% Free",
    downloads: "586",
    features: [
      "Natural language processing",
      "Voice command recognition",
      "Smart home integration",
      "Personalized responses",
    ],
  },
  "task-manager": {
    title: "Virtual On-Screen Keyboard",
    description:
      "Touchless Typing Solution",
    videoId: "dQw4w9WgXcQ",
    purchaseUrl: "price.html?project=3",
    price: "₹800",
    downloads: "3,429",
    features: [
      "Interactive virtual keyboard interface",
      "Hand gesture typing recognition",
      "Multiple keyboard layouts",
      "Auto-complete functionality",
      "Customizable key sizes",
      "Sound feedback system",
      "Accessibility features",
      "Easy integration guide",
    ],
  },
  "analytics-dashboard": {
    title: "Analytics Dashboard Pro",
    description:
      "Unlock powerful insights with our comprehensive analytics dashboard.",
    videoId: "dQw4w9WgXcQ",
    purchaseUrl: "price.html?project=3",
    price: "$399",
    downloads: "876",
    features: [
      "Real-time data visualization",
      "Custom report generation",
      "Advanced filtering",
      "Export capabilities",
    ],
  },
  "hologram-detection": {
    title: "Hologram Body Movement Detection",
    description:
      "Advanced Computer Vision Solution for real-time body movement tracking with holographic interface integration.",
    videoId: "dQw4w9WgXcQ",
    purchaseUrl: "price.html?project=3",
    price: "₹200",
    downloads: "New Release",
    features: [
      "Complete Python source code with OpenCV",
      "Real-time body movement tracking algorithms",
      "Holographic interface integration",
      "3D gesture recognition system",
      "Multi-camera support",
      "Machine learning models included",
    ],
  },
  "gesture-control": {
    title: "Gesture Keyboard & Mouse Control",
    description:
      "Revolutionary Hand Gesture Interface for touchless computer control and interaction.",
    videoId: "dQw4w9WgXcQ",
    purchaseUrl: "price.html?project=3",
    price: "₹800",
    downloads: "Featured",
    features: [
      "Complete Python/OpenCV implementation",
      "Hand landmark detection system",
      "Customizable gesture commands",
      "Virtual mouse functionality",
      "Air typing capabilities",
      "Cross-platform compatibility",
    ],
  },
};

// Title-based mapping to the new numbered structure for other files
const titleToNumberMapping = {
  "Hologram Body Movement Detection": "1",
  "Gesture Keyboard & Mouse Control": "2", 
  "Virtual On-Screen Keyboard": "3",
  "Gesture Scrolling Control": "4",
  "BuddyAI - Teen Support Bot": "5",
  "Advanced Scientific Calculator": "6",
  "Secure Authentication System": "7",
  "Dynamic Responsive Website": "8",
  "AI Text Summarization": "9",
  "AI Emotion Detection": "10"
};

// Function to get project number by title for other JS files
window.getProjectIdByTitle = function(title) {
  return titleToNumberMapping[title] || null;
};

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalVideo = document.getElementById("modalVideo");
  const purchaseBtn = document.getElementById("purchaseBtn");
  const closeBtn = document.querySelector(".project-modal-close");

  // Check if modal elements exist
  if (
    !modal ||
    !modalTitle ||
    !modalDescription ||
    !modalVideo ||
    !purchaseBtn
  ) {
    console.error("Modal elements not found. Check IDs in HTML.");
    return;
  }

  // Get project cards
  const projectCards = document.querySelectorAll(".project-showcase-card");
  if (projectCards.length === 0) {
    console.error(
      "No project cards found. Check .project-showcase-card class in HTML."
    );
    return;
  }

  // Make sure all cards are visible initially
  projectCards.forEach((card) => {
    card.style.opacity = "1";
    card.style.visibility = "visible";
    card.style.transform = "translateY(0)";
  });

  // Add click event to project cards
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectKey = card.getAttribute("data-project");
      console.log("Clicked project:", projectKey);
      const project = projectData[projectKey];

      if (project) {
        modalTitle.textContent = project.title;

        // Create rich description with features
        const featuresHtml = project.features
          ? `<ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                ${project.features
                                  .map(
                                    (feature) =>
                                      `<li style="margin: 0.5rem 0;">${feature}</li>`
                                  )
                                  .join("")}
                            </ul>`
          : "";

        modalDescription.innerHTML = `
                            <p style="font-size: 1.2rem; margin-bottom: 1rem;">${project.description}</p>
                            ${featuresHtml}
                            <div style="display: flex; justify-content: space-between; margin-top: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 10px;">
                                <div><strong>Price:</strong> <span style="color: #4ecdc4; font-size: 1.3rem;">${project.price}</span></div>
                                <div><strong>Downloads:</strong> <span style="color: #ff6b6b;">${project.downloads}</span></div>
                            </div>
                        `;

        modalVideo.src = `https://www.youtube.com/embed/${project.videoId}?autoplay=0&rel=0`;
        purchaseBtn.href = project.purchaseUrl;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        console.log("Modal opened for:", projectKey);
      } else {
        console.error("Project not found for key:", projectKey);
      }
    });
  });

  // Close modal function
  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
    modalVideo.src = "";
    console.log("Modal closed");
  }

  // Close modal events
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  } else {
    console.error("Close button not found. Check .project-modal-close class.");
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Show more button functionality
  const showMoreBtn = document.querySelector(".project-show-more-btn");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Show more clicked");
      window.location.href = "projects.html";
    });
  }

  // FIXED: Improved intersection observer for stable visibility
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Element is visible - ensure it stays visible
        entry.target.style.opacity = "1";
        entry.target.style.visibility = "visible";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("visible");
        
        // Add staggered animation delay only once
        if (!entry.target.hasAttribute('data-animated')) {
          entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
          entry.target.classList.add("fade-in");
          entry.target.setAttribute('data-animated', 'true');
        }
      }
      // Note: We're NOT hiding elements when they go out of view
      // This prevents the flickering issue
    });
  }, observerOptions);

  // Observe all project cards for animation
  projectCards.forEach((card, index) => {
    // Add initial animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Alternative: If you want to completely disable the intersection observer
  // and just show all cards immediately, uncomment this section:
  
  /*
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("fade-in");
    }, index * 100);
  });
  */
});