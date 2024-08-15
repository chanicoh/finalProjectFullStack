const express = require('express');
const { getBills } = require('../controllers/billingController');
const router = express.Router();

router.get('/bills', getBills);

// Additional routes...

module.exports = router;
