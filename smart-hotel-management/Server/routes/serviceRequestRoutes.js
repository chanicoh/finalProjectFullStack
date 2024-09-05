const express = require('express');
const serviceRequestController = require('../controllers/serviceRequestController');
const router = express.Router();

// Get all service requests
router.get('/servicerequests', serviceRequestController.getAllServiceRequests);

// Create a new service request
router.post('/servicerequests', serviceRequestController.createServiceRequest);

// Get a specific service request by ID
router.get('/servicerequests/:id', serviceRequestController.getServiceRequestById);

// Update an existing service request
router.put('/servicerequests/:id', serviceRequestController.updateServiceRequest);

// Delete a service request by ID
router.delete('/servicerequests/:id', serviceRequestController.deleteServiceRequest);

// Mark a service request as completed
//router.put('/servicerequests/:id/complete', serviceRequestController.completeServiceRequest);

router.patch('/servicerequests/:id/complete', serviceRequestController.completeServiceRequest);


// Additional routes...

module.exports = router;
