// server.js - Enhanced Node.js Backend with Razorpay Integration and Email Notifications
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://checkout.razorpay.com",
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.razorpay.com"],
        frameSrc: ["https://api.razorpay.com"],
      },
    },
  })
);

// Rate limiting
const createOrderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: "Too many order creation attempts, try again later" },
});

const verifyPaymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { error: "Too many payment verification attempts, try again later" },
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

// Input validation middleware
const validateInput = (req, res, next) => {
  const { body } = req;

  // Remove any potentially harmful characters
  for (let key in body) {
    if (typeof body[key] === "string") {
      body[key] = body[key].replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      body[key] = body[key].trim();
    }
  }
  next();
};

app.use(validateInput);

// Environment validation
const requiredEnvVars = [
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "FROM_EMAIL",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Razorpay Configuration with validation
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Email Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

// Updated Product Configuration to match frontend project IDs and prices
const PRODUCTS = {
  "1": {
    name: "Hologram Body Movement Detection",
    price: 20000, // ₹1,200 in paise
    file_path: "./files/hologram-body-movement.zip",
    description: "Advanced Computer Vision Solution",
    version: "1.0.0",
    size: "25.3 MB",
  },
  "2": {
    name: "Gesture Keyboard & Mouse Control",
    price: 80000, // ₹800 in paise
    file_path: "./files/gesture-keyboard-mouse.zip",
    description: "Revolutionary Hand Gesture Interface",
    version: "1.0.0",
    size: "18.7 MB",
  },
  "3": {
    name: "Virtual On-Screen Keyboard",
    price: 60000, // ₹600 in paise
    file_path: "./files/virtual-keyboard.zip",
    description: "Touchless Typing Solution",
    version: "1.0.0",
    size: "12.4 MB",
  },
  "4": {
    name: "Gesture Scrolling Control",
    price: 50000, // ₹500 in paise
    file_path: "./files/gesture-scrolling.zip",
    description: "Intuitive Navigation System",
    version: "1.0.0",
    size: "8.9 MB",
  },
  "5": {
    name: "BuddyAI - Teen Support Bot",
    price: 150000, // ₹1,500 in paise
    file_path: "./files/buddyai-teen-bot.zip",
    description: "AI-Powered Teenage Companion",
    version: "1.0.0",
    size: "32.1 MB",
  },
  "6": {
    name: "Advanced Scientific Calculator",
    price: 30000, // ₹300 in paise
    file_path: "./files/scientific-calculator.zip",
    description: "Feature-Rich Calculation Tool",
    version: "1.0.0",
    size: "6.2 MB",
  },
  "7": {
    name: "Secure Authentication System",
    price: 90000, // ₹900 in paise
    file_path: "./files/secure-auth-system.zip",
    description: "Enterprise-Grade Security Solution",
    version: "1.0.0",
    size: "21.5 MB",
  },
  "8": {
    name: "Dynamic Responsive Website",
    price: 70000, // ₹700 in paise
    file_path: "./files/responsive-website.zip",
    description: "Modern Frontend Development",
    version: "1.0.0",
    size: "14.8 MB",
  },
  "9": {
    name: "AI Text Summarization",
    price: 110000, // ₹1,100 in paise
    file_path: "./files/ai-text-summarization.zip",
    description: "CNN Data Processing System",
    version: "1.0.0",
    size: "28.9 MB",
  },
  "10": {
    name: "AI Emotion Detection",
    price: 100000, // ₹1,000 in paise
    file_path: "./files/ai-emotion-detection.zip",
    description: "Real-time Facial Analysis",
    version: "1.0.0",
    size: "26.7 MB",
  },
};

// Secure storage for tracking orders and payments
const orders = new Map();
const completedPayments = new Map();
const downloadTokens = new Map();

// Enhanced security functions
const generateSecureToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const hashData = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

const generateDownloadToken = (payment_id, product_id, customer_email) => {
  const tokenData = {
    payment_id,
    product_id,
    customer_email: hashData(customer_email), // Hash email for privacy
    expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    created_at: Date.now(),
  };

  const token = generateSecureToken();
  const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(JSON.stringify(tokenData))
    .digest("hex");

  downloadTokens.set(token, { ...tokenData, signature });

  // Clean up expired tokens
  setTimeout(() => {
    downloadTokens.delete(token);
  }, 24 * 60 * 60 * 1000);

  return token;
};

const verifyDownloadToken = (token) => {
  const tokenData = downloadTokens.get(token);
  if (!tokenData) return null;

  // Check expiration
  if (Date.now() > tokenData.expires_at) {
    downloadTokens.delete(token);
    return null;
  }

  // Verify signature
  const { signature, ...data } = tokenData;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(JSON.stringify(data))
    .digest("hex");

  if (signature !== expectedSignature) {
    downloadTokens.delete(token);
    return null;
  }

  return data;
};

// Email templates
const getEmailTemplate = (type, data) => {
  const baseStyle = `
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(45deg, #6a0dad, #9932cc); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .success { color: #28a745; font-weight: bold; }
        .error { color: #dc3545; font-weight: bold; }
        .download-btn { background: #6a0dad; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    `;

  if (type === "success") {
    return `
            <html>
            <head><style>${baseStyle}</style></head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🎉 Payment Successful!</h2>
                    </div>
                    <div class="content">
                        <p>Dear ${data.customerName},</p>
                        <p class="success">Your payment has been successfully processed!</p>
                        
                        <h3>Order Details:</h3>
                        <ul>
                            <li><strong>Product:</strong> ${
                              data.productName
                            }</li>
                            <li><strong>Amount:</strong> ₹${data.amount}</li>
                            <li><strong>Payment ID:</strong> ${
                              data.paymentId
                            }</li>
                            <li><strong>Date:</strong> ${new Date().toLocaleString(
                              "en-IN"
                            )}</li>
                        </ul>
                        
                        <p>Your download link is ready:</p>
                        <a href="${
                          data.downloadUrl
                        }" class="download-btn">Download Now</a>
                        
                        <p><strong>Important:</strong> This download link will expire in 24 hours for security reasons.</p>
                        
                        <p>If you have any questions or need support, please contact us.</p>
                        
                        <p>Thank you for your purchase!</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent automatically. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
  } else if (type === "failure") {
    return `
            <html>
            <head><style>${baseStyle}</style></head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>❌ Payment Failed</h2>
                    </div>
                    <div class="content">
                        <p>Dear ${data.customerName},</p>
                        <p class="error">Unfortunately, your payment could not be processed.</p>
                        
                        <h3>Order Details:</h3>
                        <ul>
                            <li><strong>Product:</strong> ${
                              data.productName
                            }</li>
                            <li><strong>Amount:</strong> ₹${data.amount}</li>
                            <li><strong>Reason:</strong> ${data.reason}</li>
                            <li><strong>Date:</strong> ${new Date().toLocaleString(
                              "en-IN"
                            )}</li>
                        </ul>
                        
                        <p>You can try again or contact our support team for assistance.</p>
                        
                        <p>No amount has been charged to your account.</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent automatically. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
  }
};

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Digital Products Store" <${process.env.FROM_EMAIL}>`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};

// Routes

// Health check with enhanced information
app.get("/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    services: {
      razorpay: "connected",
      email: "configured",
      files: "ready",
    },
  });
});

// Get product information
app.get("/api/products", (req, res) => {
  const productsInfo = Object.keys(PRODUCTS).map((key) => ({
    id: key,
    name: PRODUCTS[key].name,
    price: PRODUCTS[key].price / 100, // Convert to rupees
    description: PRODUCTS[key].description,
    version: PRODUCTS[key].version,
    size: PRODUCTS[key].size,
  }));

  res.json(productsInfo);
});

// Create Razorpay Order with enhanced validation - FIXED RESPONSE FORMAT
app.post("/api/create-order", createOrderLimiter, async (req, res) => {
  try {
    const { amount, currency = "INR", product_id, customer_data } = req.body;

    // Enhanced validation
    if (!product_id || !PRODUCTS[product_id]) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID",
      });
    }

    if (!customer_data || !customer_data.email || !customer_data.firstName) {
      return res.status(400).json({
        success: false,
        error: "Customer information required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_data.email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
      });
    }

    // Validate amount matches product price
    if (amount !== PRODUCTS[product_id].price) {
      return res.status(400).json({
        success: false,
        error: "Invalid amount for this product",
      });
    }

    // Verify file exists
    const filePath = path.resolve(PRODUCTS[product_id].file_path);
    if (!fs.existsSync(filePath)) {
      console.error("Product file not found:", filePath);
      return res.status(500).json({
        success: false,
        error: "Product currently unavailable",
      });
    }

    // Create Razorpay order
    const orderOptions = {
      amount: amount,
      currency: currency,
      receipt: `receipt_${Date.now()}_${product_id}`,
      notes: {
        product_id: product_id,
        customer_email: customer_data.email,
        customer_name: `${customer_data.firstName} ${
          customer_data.lastName || ""
        }`,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // Store order details securely
    orders.set(order.id, {
      order_id: order.id,
      amount: amount,
      currency: currency,
      product_id: product_id,
      customer_data: {
        ...customer_data,
        email: hashData(customer_data.email), // Hash email for storage
      },
      original_email: customer_data.email, // Keep original for email sending
      status: "created",
      created_at: new Date(),
      ip_address: req.ip,
      user_agent: req.get("User-Agent"),
    });

    console.log("✅ Order created:", order.id, "for product:", product_id);

    // Return format that matches frontend expectations
    res.json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      product_id: product_id,
      key_id: process.env.RAZORPAY_KEY_ID, // Added this for frontend
    });
  } catch (error) {
    console.error("❌ Order creation failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order",
      message: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

// Verify Payment with enhanced security and email notifications - FIXED RESPONSE FORMAT
app.post("/api/verify-payment", verifyPaymentLimiter, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Input validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing payment verification parameters",
      });
    }

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (!isAuthentic) {
      console.error("❌ Payment signature verification failed");
      return res.status(400).json({
        success: false,
        error: "Payment verification failed",
      });
    }

    // Get order details
    const orderData = orders.get(razorpay_order_id);
    if (!orderData) {
      return res.status(400).json({
        success: false,
        error: "Order not found",
      });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      // Send failure email
      const product = PRODUCTS[orderData.product_id];
      const emailData = {
        customerName: `${orderData.customer_data.firstName} ${
          orderData.customer_data.lastName || ""
        }`,
        productName: product.name,
        amount: (orderData.amount / 100).toString(),
        reason: "Payment not captured by gateway",
      };

      await sendEmail(
        orderData.original_email,
        "Payment Failed - Digital Products Store",
        getEmailTemplate("failure", emailData)
      );

      return res.status(400).json({
        success: false,
        error: "Payment not captured",
      });
    }

    // Verify amount matches
    if (payment.amount !== orderData.amount) {
      console.error("❌ Payment amount mismatch");
      return res.status(400).json({
        success: false,
        error: "Payment amount mismatch",
      });
    }

    // Mark payment as completed
    const paymentRecord = {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      product_id: orderData.product_id,
      customer_email: orderData.original_email,
      amount: payment.amount,
      status: "completed",
      completed_at: new Date(),
      method: payment.method,
      bank: payment.bank || null,
      wallet: payment.wallet || null,
    };

    completedPayments.set(razorpay_payment_id, paymentRecord);

    // Update order status
    orderData.status = "completed";
    orderData.payment_id = razorpay_payment_id;
    orderData.completed_at = new Date();

    console.log("✅ Payment verified successfully:", razorpay_payment_id);

    // Generate secure download token
    const downloadToken = generateDownloadToken(
      razorpay_payment_id,
      orderData.product_id,
      orderData.original_email
    );
    const downloadUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/download/${downloadToken}`;

    // Send success email with download link
    const product = PRODUCTS[orderData.product_id];
    const emailData = {
      customerName: `${orderData.customer_data.firstName} ${
        orderData.customer_data.lastName || ""
      }`,
      productName: product.name,
      amount: (orderData.amount / 100).toString(),
      paymentId: razorpay_payment_id,
      downloadUrl: downloadUrl,
    };

    const emailSent = await sendEmail(
      orderData.original_email,
      "Payment Successful - Your Download is Ready!",
      getEmailTemplate("success", emailData)
    );

    // Return success response
    res.json({
      success: true,
      message: "Payment verified successfully",
      payment_id: razorpay_payment_id,
      download_url: downloadUrl,
      email_sent: emailSent,
    });
    
  } catch (error) {
    console.error("❌ Payment verification failed:", error);
    res.status(500).json({
      success: false,
      error: "Payment verification failed",
      message: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

// Secure File Download with enhanced security
app.get("/api/download/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Verify and decode token
    const tokenData = verifyDownloadToken(token);
    if (!tokenData) {
      return res.status(403).json({
        error: "Invalid or expired download token",
      });
    }

    const { payment_id, product_id } = tokenData;

    // Verify payment exists and is completed
    const paymentRecord = completedPayments.get(payment_id);
    if (!paymentRecord || paymentRecord.product_id !== product_id) {
      return res.status(403).json({
        error: "Payment not found or invalid",
      });
    }

    // Get product file path
    const product = PRODUCTS[product_id];
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const filePath = path.resolve(product.file_path);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error("❌ File not found:", filePath);
      return res.status(404).json({
        error: "File not found",
      });
    }

    // Get file stats for security
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    console.log(
      "✅ File download initiated:",
      product_id,
      "for payment:",
      payment_id
    );

    // Set headers for download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${product_id}-v${product.version}.zip"`
    );
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Length", fileSize);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // Stream file to response
    const fileStream = fs.createReadStream(filePath);

    fileStream.on("error", (error) => {
      console.error("❌ File stream error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "File download failed" });
      }
    });

    fileStream.on("end", () => {
      console.log("✅ File download completed:", product_id);
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error("❌ Download failed:", error);
    res.status(500).json({
      error: "Download failed",
      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// Get Order Status (for debugging - limit access in production)
app.get("/api/order/:order_id", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Access denied" });
  }

  const { order_id } = req.params;
  const orderData = orders.get(order_id);

  if (!orderData) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Remove sensitive data before sending
  const { customer_data, original_email, ...safeOrderData } = orderData;
  res.json(safeOrderData);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("❌ Server error:", error);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Create required directories and files
const initializeServer = () => {
  // Create files directory if it doesn't exist
  const filesDir = "./files";
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
    console.log("📁 Created files directory");
  }

  // Create dummy product files for testing (replace with actual products)
  Object.keys(PRODUCTS).forEach((productId) => {
    const filePath = PRODUCTS[productId].file_path;
    if (!fs.existsSync(filePath)) {
      // Create a dummy zip file with product info
      const content = `This is a placeholder for ${PRODUCTS[productId].name}\nReplace this with your actual product file.\nProduct ID: ${productId}\nVersion: ${PRODUCTS[productId].version}`;
      fs.writeFileSync(filePath, content);
      console.log(`📦 Created placeholder file: ${filePath}`);
    }
  });

  console.log("✅ Server initialization completed");
};

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Payment API ready with enhanced security`);

  initializeServer();
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🔴 Server shutting down gracefully...");
  // Close email transporter
  transporter.close();
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🔴 Server shutting down gracefully...");
  // Close email transporter
  transporter.close();
  process.exit(0);
});

module.exports = app;