const catchAsyncError = require('../middlewares/catchAsyncError');
const Razorpay = require('razorpay');

// Initialize Razorpay with API keys from environment variables
const razorpay = new Razorpay({
    key_id: process.env.RZ_API_KEY, 
    key_secret: process.env.RZ_SECRET_KEY
});

// Process Payment - Creates an order in Razorpay
exports.processPayment = catchAsyncError(async (req, res, next) => {
    try {
        const { amount } = req.body;

        // Validate amount
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });
        }

        const options = {
            amount: amount * 100, // Convert INR to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        console.log("Order Created:", order);

        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount
        });

    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({
            success: false,
            message: "Payment processing failed",
            error: error.message
        });
    }
});

// Send Razorpay API Key to Frontend (Ensure you're not exposing secrets)
exports.sendRZApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        RZApiKey: process.env.RZ_API_KEY // This is fine since it's a public key
    });
});