// Project data with detailed information
const projectData = {
  1: {
    title: "Hologram-and-body-movement-detection",
    description: "An interactive system that uses computer vision to track full-body movements in real-time. These movements control holographic visuals, enabling immersive, gesture-driven interaction. Ideal for future-forward interfaces in AR/VR or exhibitions.",
    videoId: "fa8k8IQ1_X0",
    fullVideoUrl: "https://www.youtube.com/watch?v=fa8k8IQ1_X0",
    orderLink: "./price.html?project=hologram"
  },
  2: {
    title: "keyboard-and-Mouse-Cintrolls-With-hands-and-finger-Gestures",
    description: "A hands-free system that lets users operate mouse and keyboard functions using hand gestures. Using a webcam and real-time tracking, users can click, scroll, and type without physical devices. Designed for accessibility and futuristic UI control.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=gesturecontrol"
  },
  3: {
    title: "On-Screen-Virtual-Keyboard",
    description: "A virtual keyboard that appears on-screen and is operated using gesture recognition. Perfect for touchless environments or accessibility use cases. Built using computer vision libraries and intuitive UX principles.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=virtualkeyboard"
  },
  4: {
    title: "Scrolling-Control-With-hand-Gestures",
    description: "A gesture-based scrolling system that lets users scroll content with simple hand movements. This project enhances accessibility and provides a futuristic, touchless browsing experience. Ideal for kiosk setups or presentations.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=scrollingcontrol"
  },
  5: {
    title: "BuddyAi - Ai For teenagers",
    description: "A conversational AI designed for teenagers, offering support, information, and entertainment. It engages users with mental health check-ins, motivational chats, and study tips. Built using NLP and sentiment analysis tailored for young audiences.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=buddyai"
  },
  6: {
    title: "Scientific-calculator",
    description: "A powerful scientific calculator web app with support for trigonometry, logarithms, and algebraic expressions. Features a clean UI, keyboard input support, and real-time calculation display. Great for students, engineers, and developers.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=calculator"
  },
  7: {
    title: "Authentication-System",
    description: "A secure authentication system featuring login, signup, session management, and role-based access control. Includes hashed password storage, form validation, and email verification. Built with modern security best practices in mind.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=auth"
  },
  8: {
    title: "Dynamic-Responsive-Frontend-Website",
    description: "A visually appealing and fully responsive frontend website with dynamic components and animations. It adjusts seamlessly to different devices, offering a smooth UX. Built with HTML, CSS, JavaScript, and modern frameworks.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=frontend"
  },
  9: {
    title: "Ai Text Summarization using CNN data",
    description: "An AI model that summarizes long CNN news articles into short, informative summaries. Uses NLP and deep learning to extract key information and generate concise outputs. Helps users digest news faster and more efficiently.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=summarization"
  },
  10: {
    title: "Ai emotion detection",
    description: "A computer vision project that detects emotions from facial expressions using AI models. Processes real-time video input and classifies emotions such as happy, sad, angry, or surprised. Useful for feedback systems and interactive apps.",
    videoId: "dQw4w9WgXcQ",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    orderLink: "./price.html?project=emotion"
  }
};


// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalVideo = document.getElementById('modalVideo');
  const fullVideoLink = document.getElementById('fullVideoLink');
  const orderProjectLink = document.getElementById('orderProjectLink');
  const modalClose = document.getElementById('modalClose');
  const projectCards = document.querySelectorAll('.project-card');

  // Add click event to all project cards
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const project = projectData[projectId];
      
      if (project) {
        // Update modal content
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalVideo.src = `https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1`;
        fullVideoLink.href = project.fullVideoUrl;
        orderProjectLink.href = project.orderLink;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Close modal functionality
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Stop video playback
    modalVideo.src = '';
  }

  // Close modal when clicking close button
  modalClose.addEventListener('click', closeModal);

  // Close modal when clicking outside the modal container
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Prevent modal container clicks from closing modal
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Add smooth scrolling for modal content
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('scroll', function() {
      const scrollTop = this.scrollTop;
      const maxScroll = this.scrollHeight - this.clientHeight;
      const scrollPercentage = scrollTop / maxScroll;
      
      // Add subtle parallax effect to modal header
      const modalHeader = document.querySelector('.modal-header');
      if (modalHeader) {
        modalHeader.style.transform = `translateY(${scrollPercentage * 10}px)`;
      }
    });
  }

  // Add loading animation for video
  modalVideo.addEventListener('load', function() {
    this.style.opacity = '1';
  });

  // Add entrance animation delay for modal sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.6s ease forwards';
      }
    });
  });

  // Observe modal sections for animations
  document.querySelectorAll('.modal-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
  });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .project-card {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .project-card:hover {
    transform: translateY(-10px) scale(1.02) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;
document.head.appendChild(style);