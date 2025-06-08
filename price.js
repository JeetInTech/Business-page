// Project configurations
const projectConfigs = {
  1: {
    title: "Hologram Body Movement Detection",
    subtitle: "Advanced Computer Vision Solution",
    price: "₹200",
    logo: "🔮",
    features: [
      "Complete Python source code with OpenCV",
      "Real-time body movement tracking algorithms",
      "Holographic interface integration",
      "3D gesture recognition system",
      "Multi-camera support",
      "Machine learning models included",
      "Comprehensive documentation",
      "Installation & setup guide",
    ],
  },
  2: {
    title: "Gesture Keyboard & Mouse Control",
    subtitle: "Revolutionary Hand Gesture Interface",
    price: "₹800",
    logo: "👋",
    features: [
      "Complete Python/OpenCV implementation",
      "Hand landmark detection system",
      "Customizable gesture commands",
      "Virtual mouse functionality",
      "Air typing capabilities",
      "Calibration tools included",
      "Multi-hand tracking support",
      "Cross-platform compatibility",
    ],
  },
  3: {
    title: "Virtual On-Screen Keyboard",
    subtitle: "Touchless Typing Solution",
    price: "₹600",
    logo: "⌨️",
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
  4: {
    title: "Gesture Scrolling Control",
    subtitle: "Intuitive Navigation System",
    price: "₹500",
    logo: "📜",
    features: [
      "Smooth scrolling algorithms",
      "Multi-directional gesture support",
      "Speed control mechanisms",
      "Browser integration",
      "Application compatibility",
      "Gesture customization panel",
      "Performance optimization",
      "User preference settings",
    ],
  },
  5: {
    title: "BuddyAI - Teen Support Bot",
    subtitle: "AI-Powered Teenage Companion",
    price: "₹1,500",
    logo: "🤖",
    features: [
      "Advanced NLP conversation engine",
      "Emotion detection & response",
      "Age-appropriate content filtering",
      "Mental health support features",
      "Educational assistance tools",
      "Privacy & safety protocols",
      "Customizable personality traits",
      "Parent dashboard included",
    ],
  },
  6: {
    title: "Advanced Scientific Calculator",
    subtitle: "Feature-Rich Calculation Tool",
    price: "₹300",
    logo: "🧮",
    features: [
      "Complete  source code",
      "Advanced mathematical functions",
      "Graphing capabilities",
      "Unit conversion tools",
      "History & memory functions",
      "Scientific notation support",
      "Responsive design",
      "Dark/Light theme toggle",
    ],
  },
  7: {
    title: "Secure Authentication System",
    subtitle: "Enterprise-Grade Security Solution",
    price: "₹900",
    logo: "🔐",
    features: [
      "Multi-factor authentication",
      "Password encryption & hashing",
      "Session management system",
      "OAuth integration support",
      "Role-based access control",
      "Security audit logging",
      "Password recovery system",
      "API documentation included",
    ],
  },
  8: {
    title: "Dynamic Responsive Website",
    subtitle: "Modern Frontend Development",
    price: "₹700",
    logo: "💻",
    features: [
      "Responsive design framework",
      "Modern CSS animations",
      "Interactive UI components",
      "Cross-browser compatibility",
      "Performance optimized code",
      "SEO-friendly structure",
      "Mobile-first approach",
      "Deployment guide included",
    ],
  },
  9: {
    title: "AI Text Summarization",
    subtitle: "CNN Data Processing System",
    price: "₹1,100",
    logo: "📰",
    features: [
      "Advanced NLP algorithms",
      "CNN article processing",
      "Extractive summarization",
      "Abstractive summarization",
      "Keyword extraction",
      "Sentiment analysis",
      "Batch processing support",
      "API integration ready",
    ],
  },
  10: {
    title: "AI Emotion Detection",
    subtitle: "Real-time Facial Analysis",
    price: "₹1,000",
    logo: "😊",
    features: [
      "Real-time emotion recognition",
      "Facial expression analysis",
      "Multiple emotion categories",
      "Confidence scoring system",
      "Video processing support",
      "Data visualization tools",
      "Export functionality",
      "Training dataset included",
    ],
  },
};

// Store the current project ID for back navigation
let currentProjectId = null;

// Get project ID from URL parameters
function getProjectId() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("project");
  console.log("Full URL:", window.location.href);
  console.log("URL params:", window.location.search);
  console.log("Project ID found:", projectId);

  // If no project ID found, try to get it from hash or other methods
  if (!projectId) {
    // Check if it's in the hash
    const hash = window.location.hash;
    if (hash.includes("project=")) {
      const hashProjectId = hash.split("project=")[1].split("&")[0];
      console.log("Project ID from hash:", hashProjectId);
      return hashProjectId;
    }

    // Check if it's in the pathname
    const pathSegments = window.location.pathname.split("/");
    const projectIndex = pathSegments.indexOf("project");
    if (projectIndex !== -1 && pathSegments[projectIndex + 1]) {
      console.log("Project ID from path:", pathSegments[projectIndex + 1]);
      return pathSegments[projectIndex + 1];
    }

    // Check if we have stored project data from previous session
    const storedData = localStorage.getItem("lastViewedProject");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Project ID from localStorage:", parsedData.projectId);
      return parsedData.projectId;
    }

    console.warn("No project ID found in URL, defaulting to project 1");
    return "1";
  }

  return projectId;
}

// Load project configuration
function loadProjectConfig() {
  const projectId = getProjectId();
  currentProjectId = projectId; // Store for back navigation

  let config = projectConfigs[projectId];

  console.log("Loading config for project:", projectId);
  console.log("Available project configs:", Object.keys(projectConfigs));
  console.log("Config found:", config);

  if (!config) {
    console.error(
      `Config not found for project ${projectId}, using default project 1`
    );
    config = projectConfigs["1"];
    currentProjectId = "1";
  }

  // Store the current project info in localStorage for back navigation
  localStorage.setItem(
    "lastViewedProject",
    JSON.stringify({
      projectId: currentProjectId,
      title: config.title,
      timestamp: Date.now(),
    })
  );

  // Update page elements immediately
  updatePageElements(config, currentProjectId);
  setupBackNavigation();
}

function updatePageElements(config, projectId) {
  console.log(`Updating page elements for project ${projectId}:`, config.title);

  // Update page title
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) {
    pageTitle.textContent = `${config.title} - Purchase`;
    console.log("Updated page title:", pageTitle.textContent);
  } else {
    console.error("Page title element not found");
  }

  // Update project title
  const projectTitle = document.getElementById("projectTitle");
  if (projectTitle) {
    projectTitle.textContent = config.title;
    console.log("Updated project title:", projectTitle.textContent);
  } else {
    console.error("Project title element not found");
  }

  // Update project subtitle
  const projectSubtitle = document.getElementById("projectSubtitle");
  if (projectSubtitle) {
    projectSubtitle.textContent = config.subtitle;
    console.log("Updated project subtitle:", projectSubtitle.textContent);
  } else {
    console.error("Project subtitle element not found");
  }

  // Update price
  const projectPrice = document.getElementById("projectPrice");
  if (projectPrice) {
    projectPrice.textContent = config.price;
    console.log("Updated project price:", projectPrice.textContent);
  } else {
    console.error("Project price element not found");
  }

  // Update logo
  const projectLogo = document.getElementById("projectLogo");
  if (projectLogo) {
    projectLogo.textContent = config.logo;
    console.log("Updated project logo:", projectLogo.textContent);
  } else {
    console.error("Project logo element not found");
  }

  // Update button price
  const btnPrice = document.getElementById("btnPrice");
  if (btnPrice) {
    btnPrice.textContent = config.price;
    console.log("Updated button price:", btnPrice.textContent);
  } else {
    console.error("Button price element not found");
  }

  // Update features list
  const featuresList = document.getElementById("featuresList");
  if (featuresList) {
    featuresList.innerHTML = "";

    config.features.forEach((feature, index) => {
      const featureItem = document.createElement("div");
      featureItem.className = "feature-item";
      featureItem.innerHTML = `
                <div class="feature-check">✓</div>
                <div class="feature-text">${feature}</div>
            `;
      featuresList.appendChild(featureItem);
    });
    console.log(
      `Updated features list with ${config.features.length} features`
    );
  } else {
    console.error("Features list element not found");
  }

  console.log("Page update completed successfully");
}

// Setup back navigation to preserve project context
function setupBackNavigation() {
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    // Update the href to include the current project ID
    backBtn.href = `projects.html#project-${currentProjectId}`;

    // Also add click handler for better UX
    backBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Store current project context before navigating back
      localStorage.setItem(
        "returnToProject",
        JSON.stringify({
          projectId: currentProjectId,
          timestamp: Date.now(),
        })
      );

      // Navigate back to projects page
      window.location.href = `projects.html#project-${currentProjectId}`;
    });
  }
}

// Initialize page with multiple event listeners to ensure loading
function initializePage() {
  console.log("Initializing page...");
  loadProjectConfig();
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  // DOM is already ready
  initializePage();
}

// Additional event listeners for safety
document.addEventListener("DOMContentLoaded", initializePage);
window.addEventListener("load", initializePage);
window.addEventListener("pageshow", initializePage);

// Also run after a short delay to ensure all elements are rendered
setTimeout(initializePage, 100);

// Form submission handler for direct payment
document.addEventListener("DOMContentLoaded", function () {
  const customerForm = document.getElementById("customerForm");
  if (customerForm) {
    customerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!firstName || !lastName || !email || !phone) {
        alert("Please fill in all required fields");
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      const projectId = currentProjectId;
      const config = projectConfigs[projectId] || projectConfigs["1"];
      
      // Disable button and show loading
      const proceedBtn = document.getElementById("proceedBtn");
      proceedBtn.disabled = true;
      proceedBtn.innerHTML = "Processing...";

      try {
        // Create order on your server
        const orderResponse = await fetch('http://localhost:3000/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: parseInt(config.price.replace('₹', '').replace(',', '')) * 100,
            product_id: projectId,
            projectTitle: config.title,
            customer_data: {
              firstName,
              lastName,
              email,
              phone,
              city: document.getElementById("city").value.trim(),
              state: document.getElementById("state").value.trim(),
            }
          }),
        });

        // Check if response is ok
        if (!orderResponse.ok) {
          throw new Error(`HTTP error! status: ${orderResponse.status}`);
        }

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          throw new Error(orderData.error || 'Failed to create order');
        }

        // Initialize Razorpay
        const options = {
          key: orderData.key_id, // Your Razorpay key from server
          amount: orderData.amount,
          currency: "INR",
          name: config.title,
          description: config.subtitle,
          image: config.logo, // You might want to use an actual image URL
          order_id: orderData.id,
          prefill: {
            name: `${firstName} ${lastName}`,
            email: email,
            contact: phone
          },
          theme: {
            color: "#3399cc"
          },
          handler: function (response) {
            // Payment successful
            handlePaymentSuccess(response, orderData);
          },
          modal: {
            ondismiss: function() {
              // Re-enable button if payment modal is closed
              proceedBtn.disabled = false;
              proceedBtn.innerHTML = `Proceed to Payment - <span id="btnPrice">${config.price}</span>`;
            }
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();

      } catch (error) {
        console.error('Payment initialization failed:', error);
        alert('Payment initialization failed. Please try again.');
        
        // Re-enable button
        proceedBtn.disabled = false;
        proceedBtn.innerHTML = `Proceed to Payment - <span id="btnPrice">${config.price}</span>`;
      }
    });
  }
});

// Handle successful payment
async function handlePaymentSuccess(response, orderData) {
  try {
    // Verify payment on server
    const verifyResponse = await fetch('http://localhost:3000/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      }),
    });

    // Check if response is ok
    if (!verifyResponse.ok) {
      throw new Error(`HTTP error! status: ${verifyResponse.status}`);
    }

    const verifyData = await verifyResponse.json();

    if (verifyData.success) {
      // Payment verified successfully
      alert('Payment successful! You will receive the project files via email shortly. Check your email for the download link.');
      
      // Optionally redirect to a success page or show success message
      // window.location.href = '/success.html';
      
      // Reset form
      document.getElementById("customerForm").reset();
      
      // Re-enable button
      const proceedBtn = document.getElementById("proceedBtn");
      proceedBtn.disabled = false;
      proceedBtn.innerHTML = `Proceed to Payment - <span id="btnPrice">${projectConfigs[currentProjectId].price}</span>`;
      
    } else {
      alert('Payment verification failed. Please contact support with your payment details.');
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    alert('Payment verification failed. Please contact support with payment ID: ' + response.razorpay_payment_id);
    
    // Re-enable button
    const proceedBtn = document.getElementById("proceedBtn");
    proceedBtn.disabled = false;
    proceedBtn.innerHTML = `Proceed to Payment - <span id="btnPrice">${projectConfigs[currentProjectId].price}</span>`;
  }
}