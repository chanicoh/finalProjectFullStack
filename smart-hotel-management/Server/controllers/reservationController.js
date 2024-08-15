const { getAllReservations, getReservationById } = require('../models/reservationModel');

const getReservations = async (req, res, next) => {
    try {
        const reservations = await getAllReservations();
        res.status(200).json(reservations);
    } catch (err) {
        next(err);
    }
};

// Additional controller methods...

module.exports = { getReservations };
