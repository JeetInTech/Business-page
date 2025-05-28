// server.js - Node.js Backend with Razorpay Integration
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Replace with your key
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_secret_key' // Replace with your secret
});

// Product Configuration
const PRODUCTS = {
    'react-task-manager-pro': {
        name: 'React Task Manager Pro',
        price: 30000, // ₹300 in paise
        file_path: './files/react-task-manager-pro.zip'
    }
    // Add more products here
};

// Store for tracking orders (use database in production)
const orders = new Map();
const completedPayments = new Map();

// Routes

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', product_id } = req.body;

        // Validate product
        if (!PRODUCTS[product_id]) {
            return res.status(400).json({ 
                error: 'Invalid product ID' 
            });
        }

        // Validate amount
        if (amount !== PRODUCTS[product_id].price) {
            return res.status(400).json({ 
                error: 'Invalid amount' 
            });
        }

        // Create Razorpay order
        const orderOptions = {
            amount: amount,
            currency: currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                product_id: product_id
            }
        };

        const order = await razorpay.orders.create(orderOptions);
        
        // Store order details
        orders.set(order.id, {
            order_id: order.id,
            amount: amount,
            currency: currency,
            product_id: product_id,
            status: 'created',
            created_at: new Date()
        });

        console.log('Order created:', order.id);

        res.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            product_id: product_id
        });

    } catch (error) {
        console.error('Order creation failed:', error);
        res.status(500).json({ 
            error: 'Failed to create order',
            details: error.message 
        });
    }
});

// Verify Payment
app.post('/api/verify-payment', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            product_id
        } = req.body;

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_secret_key')
            .update(sign.toString())
            .digest('hex');

        const isAuthentic = expectedSign === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                error: 'Payment verification failed'
            });
        }

        // Get order details
        const orderData = orders.get(razorpay_order_id);
        if (!orderData) {
            return res.status(400).json({
                success: false,
                error: 'Order not found'
            });
        }

        // Fetch payment details from Razorpay
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        
        if (payment.status !== 'captured') {
            return res.status(400).json({
                success: false,
                error: 'Payment not captured'
            });
        }

        // Mark payment as completed
        const paymentRecord = {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            product_id: product_id,
            amount: payment.amount,
            status: 'completed',
            completed_at: new Date()
        };

        completedPayments.set(razorpay_payment_id, paymentRecord);
        
        // Update order status
        orderData.status = 'completed';
        orderData.payment_id = razorpay_payment_id;
        orderData.completed_at = new Date();

        console.log('Payment verified successfully:', razorpay_payment_id);

        // Generate secure download URL
        const downloadToken = generateDownloadToken(razorpay_payment_id, product_id);
        const downloadUrl = `/api/download/${downloadToken}`;

        res.json({
            success: true,
            payment_id: razorpay_payment_id,
            download_url: downloadUrl,
            message: 'Payment verified successfully'
        });

    } catch (error) {
        console.error('Payment verification failed:', error);
        res.status(500).json({
            success: false,
            error: 'Payment verification failed',
            details: error.message
        });
    }
});

// Secure File Download
app.get('/api/download/:token', (req, res) => {
    try {
        const { token } = req.params;
        
        // Verify and decode token
        const tokenData = verifyDownloadToken(token);
        if (!tokenData) {
            return res.status(403).json({ 
                error: 'Invalid or expired download token' 
            });
        }

        const { payment_id, product_id } = tokenData;

        // Verify payment exists and is completed
        const paymentRecord = completedPayments.get(payment_id);
        if (!paymentRecord || paymentRecord.product_id !== product_id) {
            return res.status(403).json({ 
                error: 'Payment not found or invalid' 
            });
        }

        // Get product file path
        const product = PRODUCTS[product_id];
        if (!product) {
            return res.status(404).json({ 
                error: 'Product not found' 
            });
        }

        const filePath = path.resolve(product.file_path);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return res.status(404).json({ 
                error: 'File not found' 
            });
        }

        console.log('File download initiated:', product_id, 'for payment:', payment_id);

        // Set headers for download
        res.setHeader('Content-Disposition', `attachment; filename="${product_id}.zip"`);
        res.setHeader('Content-Type', 'application/zip');

        // Stream file to response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on('error', (error) => {
            console.error('File stream error:', error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'File download failed' });
            }
        });

    } catch (error) {
        console.error('Download failed:', error);
        res.status(500).json({ 
            error: 'Download failed',
            details: error.message 
        });
    }
});

// Get Order Status (for debugging)
app.get('/api/order/:order_id', (req, res) => {
    const { order_id } = req.params;
    const orderData = orders.get(order_id);
    
    if (!orderData) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(orderData);
});

// Helper Functions

function generateDownloadToken(payment_id, product_id) {
    const payload = {
        payment_id,
        product_id,
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    const token = Buffer.from(JSON.stringify(payload)).toString('base64');
    return token;
}

function verifyDownloadToken(token) {
    try {
        const payload = JSON.parse(Buffer.from(token, 'base64').toString());
        
        // Check expiration
        if (Date.now() > payload.expires_at) {
            return null;
        }
        
        return payload;
    } catch (error) {
        return null;
    }
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Health check: http://localhost:${PORT}/health`);
    console.log(`💳 Payment API ready`);
    
    // Create files directory if it doesn't exist
    const filesDir = './files';
    if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir, { recursive: true });
        console.log('📁 Created files directory');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🔴 Server shutting down...');
    process.exit(0);
});

module.exports = app;