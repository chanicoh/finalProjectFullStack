const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController'); // Adjust path as needed

// Define routes with proper callback functions
router.get('/rooms', roomController.getAllRooms);

router.get('/rooms/available', roomController.getAvailableRoomsByType);
router.get('/rooms/:id', roomController.getRoomById);
router.post('/rooms', roomController.createRoom);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);


module.exports = router;
