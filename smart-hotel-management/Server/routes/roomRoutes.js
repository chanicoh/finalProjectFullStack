const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController'); // Adjust path as needed

// Define routes with proper callback functions
router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.post('/rooms', roomController.createRoom);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);
<<<<<<< HEAD
router.put('/rooms/:id/status', roomController.updateRoomStatus);
=======
router.get('/rooms/available', roomController.getAvailableRoomsByType);
>>>>>>> acf325ecc2ee42435f7032e4d1cd1f018bc1ee81

module.exports = router;
