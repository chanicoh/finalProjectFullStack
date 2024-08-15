const express = require('express');
const { getReservations } = require('../controllers/reservationController');
const router = express.Router();

router.get('/reservations', getReservations);

// Additional routes...

module.exports = router;
