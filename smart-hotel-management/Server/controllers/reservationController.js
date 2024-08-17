const reservationModel = require('../models/reservationModel');

const getAllReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.getAllReservation();
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createReservation = async (req, res, next) => {
  try {
    const reservationId = await reservationModel.createReservation(req.body);
    res.status(201).json({ reservationId });
  } catch (err) {
    next(err);
  }
};

const getReservationById = async (req, res, next) => {
  try {
    const reservation = await reservationModel.getReservationById(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (err) {
    next(err);
  }
};
const updateReservation =async (req, res, next) => {
    try {
       await reservationModel.updateReservation(req.params.id, req.body);
    res.json({ message: 'Reservation updated successfully' });
    } catch (err) {
       next(err);
    }
 };


    
   const deleteReservation = async (req, res, next) => {
    try {
         await reservationModel.deleteReservation(req.params.id);
         res.json({ message: 'Reservation deleted successfully' });
        } catch (err) 
        {
             next(err);
        }           
 };
 
 module.exports = {
  getAllReservation,
    createReservation,
    getReservationById,
    getReservationById,
    updateReservation,
    deleteReservation
  };
