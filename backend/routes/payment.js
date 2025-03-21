const express = require('express');
const { processPayment, sendRZApi } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/payment/process').post( isAuthenticatedUser, processPayment);
router.route('/RZapi').get( isAuthenticatedUser, sendRZApi);


module.exports = router;