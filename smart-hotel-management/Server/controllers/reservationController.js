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
    console.log("Request Body:", req.body); // Log request body for debugging
    const reservationData = req.body;

    if (!reservationData.user_id || !reservationData.room_id || !reservationData.check_in_date || !reservationData.check_out_date || !reservationData.total_price || !reservationData.status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reservationId = await reservationModel.createReservation(reservationData);
    res.status(201).json({ reservationId });
  } catch (err) {
    console.error("Error creating reservation:", err); // Log error details
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
 const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const reservationId = req.params.id;
    
    // Call the model to update the status
    await reservationModel.updateStatus(reservationId, status);
    
    res.json({ message: 'Reservation status updated successfully' });
  } catch (err) {
    next(err);  // Pass the error to the next middleware (error handler)
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
    updateReservation,
    updateStatus,
    deleteReservation
  };
