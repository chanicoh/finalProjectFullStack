const pool = require('../config/db'); // Adjust path as needed

// Example model function
const getAllRooms = async () => {
  const [rows] = await pool.query('SELECT *FROM rooms;');
  return rows;
};

const findRoomById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM rooms WHERE room_id = ?', [id]);
  return rows[0];
};

module.exports = {
  getAllRooms,
  findRoomById
};
