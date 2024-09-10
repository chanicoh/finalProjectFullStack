const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();

router.get('/', reservationController.getAllReservation);
router.post('/', reservationController.createReservation); // Should match this
router.get('/:id', reservationController.getReservationById);
router.put('/:id/status', reservationController.updateStatus);
router.put('/:id', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
