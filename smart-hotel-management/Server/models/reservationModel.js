const pool = require('../config/db');


const getAllReservation = async () => {
  const [rows] = await pool.query('SELECT *FROM reservations;');
  return rows;
};

const createReservation = async (reservation) => {
  const { user_id, room_id, check_in_date, check_out_date, total_price, status } = reservation;
  const created_at = new Date();
  const updated_at = created_at;

  const [result] = await pool.query(
    `INSERT INTO reservations (user_id, room_id, check_in_date, check_out_date, total_price, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, room_id, check_in_date, check_out_date, total_price, status, created_at, updated_at]
  );

  return result.insertId;
};



const getReservationById = async (reservation_id) => {
  const [rows] = await pool.query(`SELECT * FROM reservations WHERE reservation_id = ?`, [reservation_id]);
  return rows[0];
};

const updateStatus = async (reservation_id, status) => {
  console.log('Updating reservation status for ID:', reservation_id,status); 
  const updated_at = new Date(); // Capture current timestamp for the update
  await pool.query(
    `UPDATE reservations SET status = ?, updated_at = ? WHERE reservation_id = ?`,
    [status, updated_at, reservation_id]
  );
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

module.exports = {getAllReservation, createReservation, getReservationById, updateReservation,updateStatus, deleteReservation };
