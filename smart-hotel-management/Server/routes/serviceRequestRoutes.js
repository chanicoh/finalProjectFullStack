const express = require('express');
const { getRequests } = require('../controllers/serviceRequestController');
const router = express.Router();

router.get('/requests', getRequests);

// Additional routes...

module.exports = router;
