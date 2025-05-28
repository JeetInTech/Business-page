// Minimal modal.js - Only unique functionality not in project.js

document.addEventListener('DOMContentLoaded', function() {
  // Add enhanced hover effects for project cards (unique animation)
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Enhanced hover effect with scale and shadow
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
  });

  // Add loading animation for modal video (unique feature)
  const modalVideo = document.getElementById('modalVideo');
  if (modalVideo) {
    modalVideo.addEventListener('loadstart', function() {
      this.style.opacity = '0.5';
    });
    
    modalVideo.addEventListener('canplay', function() {
      this.style.opacity = '1';
    });
  }

  // Add smooth scrolling parallax effect for modal content (unique feature)
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

  // Add entrance animation for modal sections (unique feature)
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

// Add CSS animation keyframes dynamically (unique styling)
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .project-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .project-card:hover {
    transform: translateY(-10px) scale(1.02) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
  }
  
  #modalVideo {
    transition: opacity 0.3s ease;
  }
  
  .modal-section {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);