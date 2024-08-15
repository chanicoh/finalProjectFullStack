const { getAllRequests, getRequestById } = require('../models/serviceRequestModel');

const getRequests = async (req, res, next) => {
    try {
        const requests = await getAllRequests();
        res.status(200).json(requests);
    } catch (err) {
        next(err);
    }
};

// Additional controller methods...

module.exports = { getRequests };

