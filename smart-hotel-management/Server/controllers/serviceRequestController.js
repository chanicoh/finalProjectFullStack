const serviceRequestModel = require('../models/serviceRequestModel');

const getAllServiceRequests = async (req, res, next) => {
  try {
    const serviceRequests = await serviceRequestModel.getAllRequests();
    res.status(200).json(serviceRequests);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createServiceRequest = async (req, res, next) => {
  try {
    const { user_id, room_id, request_type, request_description, status } = req.body;

    // Check if any required fields are missing
    if (!user_id || !room_id || !request_type || !status || !request_description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const requestId = await serviceRequestModel.createServiceRequest(req.body);
    res.status(201).json({ requestId });
  } catch (err) {
    console.error('Error creating service request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getServiceRequestById = async (req, res, next) => {
  try {
    const request = await serviceRequestModel.getServiceRequestById(req.params.id);
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ message: 'Service request not found' });
    }
  } catch (err) {
    console.error('Error fetching service request by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateServiceRequest = async (req, res, next) => {
  try {
    const request_id = req.params.id;
    const updatedFields = req.body;
    const { request_type, request_description, status } = updatedFields;

    // Validate input
    if (!request_type || !request_description || !status) {
      return res.status(400).json({ error: 'Missing required fields to update' });
    }

    // Update the service request
    const result = await serviceRequestModel.updateServiceRequest(request_id, updatedFields);

    // Check if update was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.json({ message: 'Service request updated successfully' });
  } catch (error) {
    console.error("Error updating service request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteServiceRequest = async (req, res, next) => {
  try {
    const result = await serviceRequestModel.deleteServiceRequest(req.params.id);

    // Check if delete was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.json({ message: 'Service request deleted successfully' });
  } catch (err) {
    console.error('Error deleting service request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const completeServiceRequest = async (req, res, next) => {
  try {
    const request_id = req.params.id;
    console.log('request_id:', request_id);

    // Ensure request ID is valid
    if (!request_id) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    // Attempt to update the service request status
    const result = await serviceRequestModel.updateServiceRequest(request_id, { status: 'completed' });

    // Check if update was successful
    if (!result.success) { // Check based on updated model's response
      return res.status(404).json({ error: 'Service request not found or update failed' });
    }

    res.status(200).json({ message: 'Service request marked as completed' });
  } catch (err) {
    console.error('Error completing service request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllServiceRequests,
  createServiceRequest,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest,
  completeServiceRequest
};
