const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController'); // Adjust path as needed

// Define routes with proper callback functions
router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoomById);

module.exports = router;
