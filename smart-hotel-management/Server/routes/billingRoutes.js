const express = require('express');
const billingController = require('../controllers/billingController');
const router = express.Router();

router.get('/billing', billingController.getAllBilling);
router.post('/billing', billingController.createBilling);
router.get('/billing/:id', billingController.getBillingById);
router.put('/billing/:id', billingController.updateBilling);
router.delete('/billing/:id', billingController.deleteBilling);

module.exports = router;
