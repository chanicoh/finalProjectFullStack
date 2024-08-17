const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();

router.get('/reservations', reservationController.getAllReservation);
router.post('/reservations', reservationController.createReservation);
router.get('/reservations/:id', reservationController.getReservationById);
router.put('/reservations/:id', reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;