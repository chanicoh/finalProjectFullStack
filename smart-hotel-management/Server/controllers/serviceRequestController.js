const  serviceRequestModel   = require('../models/serviceRequestModel');

const getAllServiceRequests = async (req, res, next) => {
  try {
    const serviceRequests = await serviceRequestModel.getAllRequests();
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createServiceRequest = async (req, res, next) => {
    try {
      const requestId = await serviceRequestModel.createServiceRequest(req.body);
      res.status(201).json({ requestId });
    } catch (err) {
      next(err);
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
      next(err);
    }
  };
  
  const updateServiceRequest = async (req, res, next) => {
    try {
      await serviceRequestModel.updateServiceRequest(req.params.id, req.body);
      res.json({ message: 'Service request updated successfully' });
    } catch (err) {
      next(err);
    }
  };
  
  const deleteServiceRequest = async (req, res, next) => {
    try {
      await serviceRequestModel.deleteServiceRequest(req.params.id);
      res.json({ message: 'Service request deleted successfully' });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {getAllServiceRequests, createServiceRequest, getServiceRequestById, updateServiceRequest, deleteServiceRequest };
