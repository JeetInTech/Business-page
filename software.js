// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Download file function - Now actually downloads from local files
function downloadFile(filename) {
  try {
    // Create a temporary download link
    const link = document.createElement("a");
    
    // Set the file path - assuming files are in the same directory or a 'downloads' folder
    link.href = `./${filename}`;  // Or use `./downloads/${filename}` if files are in a downloads folder
    link.download = filename;
    link.style.display = "none";
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    alert(`Starting download of ${filename}...`);
    
  } catch (error) {
    // If file not found or error occurs
    alert(`Error downloading ${filename}. Please make sure the file exists in the correct location.\n\nFile should be located at: ./${filename}`);
    console.error("Download error:", error);
  }
}

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0s";
      entry.target.style.animationFillMode = "both";
    }
  });
}, observerOptions);

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  createParticles();

  // Observe all software cards for animation
  document.querySelectorAll(".software-card").forEach((card) => {
    observer.observe(card);
  });
});

// Add smooth scrolling for better UX
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