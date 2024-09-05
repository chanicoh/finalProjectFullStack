const pool = require('../config/db');


const getAllReservation = async () => {
  const [rows] = await pool.query('SELECT *FROM reservations;');
  return rows;
};

const createReservation = async (reservation) => {
  const { user_id, room_id, check_in_date, check_out_date, total_price, status } = reservation;
  const created_at = new Date(); // Current timestamp for creation
  const updated_at = created_at; // Same timestamp for creation and update
  const [result] = await pool.query(
    `INSERT INTO reservations (user_id, room_id, check_in_date, check_out_date, total_price, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, room_id, check_in_date, check_out_date, total_price, status, created_at, updated_at]
  );
  return result.insertId; // Returns the auto-generated reservation_id
};

const getReservationById = async (reservation_id) => {
  const [rows] = await pool.query(`SELECT * FROM reservations WHERE reservation_id = ?`, [reservation_id]);
  return rows[0];
};

const getUserReservations = async (req, res) => {
  const userId = req.params.userId;

  try {
      const [reservations] = await pool.query(`
          SELECT  r.room_number,   r.room_type FROM rooms r 
          JOIN  reservations res ON r.room_id = res.room_id WHERE 
           res.user_id = ?;`
          , [userId]);

      if (reservations.length > 0) {
          res.json(reservations);
      } else {
          res.status(404).json({ message: 'No reservations found for this user.' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

const updateReservation = async (reservation_id, updatedFields) => {
  const { check_in_date, check_out_date, total_price, status } = updatedFields;
  await pool.query(
    `UPDATE reservations SET check_in_date = ?, check_out_date = ?, total_price = ?, status = ? 
     WHERE reservation_id = ?`,
    [check_in_date, check_out_date, total_price, status, reservation_id]
  );
};

const deleteReservation = async (reservation_id) => {
  await pool.query(`DELETE FROM reservations WHERE reservation_id = ?`, [reservation_id]);
};

module.exports = {getAllReservation, createReservation, getReservationById,getUserReservations, updateReservation, deleteReservation };
