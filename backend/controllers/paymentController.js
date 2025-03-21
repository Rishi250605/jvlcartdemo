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
        const options = {
            amount: req.body.amount * 100, // Convert to paise (INR)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        console.log("Order Created:", order); // Debugging

        res.status(200).json({
            success: true,
            order_id: order.id
        });

    } catch (error) {
        console.error("Payment Error:", error); // Log error to see details
        res.status(500).json({
            success: false,
            message: "Payment processing failed",
            error: error.message
        });
    }
});


// Send Razorpay API Key to Frontend
exports.sendRZApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        RZApiKey: process.env.RZ_API_KEY
    });
});
