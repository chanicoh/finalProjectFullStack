const pool = require('../config/db');

const getAllRooms = async () => {
  const [rows] = await pool.query('SELECT * FROM rooms');
  return rows;
};

const findRoomById = async (room_id) => {
  const [rows] = await pool.query('SELECT * FROM rooms WHERE room_id = ?', [room_id]);
  return rows[0];
};

const createRoom = async (room) => {
  const { room_number, room_type, status, price_per_night, description } = room;
  const [result] = await pool.query(
    `INSERT INTO rooms (room_number, room_type, status, price_per_night, description)
     VALUES (?, ?, ?, ?, ?)`,
    [room_number, room_type, status, price_per_night, description]
  );
  return result.insertId;
};

const updateRoom = async (room_id, updatedFields) => {
  const { room_number, room_type, status, price_per_night, description } = updatedFields;
  await pool.query(
    `UPDATE rooms SET room_number = ?, room_type = ?, status = ?, price_per_night = ?, description = ? 
     WHERE room_id = ?`,
    [room_number, room_type, status, price_per_night, description, room_id]
  );
};

const deleteRoom = async (room_id) => {
  await pool.query('DELETE FROM rooms WHERE room_id = ?', [room_id]);
};

module.exports = {
  getAllRooms,
  findRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
