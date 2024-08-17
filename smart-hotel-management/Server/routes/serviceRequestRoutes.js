const express = require('express');
const serviceRequestController  = require('../controllers/serviceRequestController');
const router = express.Router();

router.get('/service-requests', serviceRequestController.getAllServiceRequests);
router.post('/service-requests', serviceRequestController.createServiceRequest);
router.get('/service-requests/:id', serviceRequestController.getServiceRequestById);
router.put('/service-requests/:id', serviceRequestController.updateServiceRequest);
router.delete('/service-requests/:id', serviceRequestController.deleteServiceRequest);

// Additional routes...

module.exports = router;
