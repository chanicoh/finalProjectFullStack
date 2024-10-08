const pool = require('../config/db');

const getAllRooms = async () => {
  const [rows] = await pool.query('SELECT * FROM rooms');
  return rows;
};

// Fetch rooms by type and availability
const getAvailableRoomsByType = async (roomType, checkInDate, checkOutDate) => {
  try {
    // Check if all required parameters are passed
    if (!roomType || !checkInDate || !checkOutDate) {
      console.log("Missing parameters");
      return [];
    }

    // Query to get available rooms that are not booked between checkInDate and checkOutDate
    const [rows] = await pool.query(
      `SELECT * FROM rooms 
       WHERE room_type = ? 
       AND status = 'available'
       AND room_id NOT IN (
         SELECT room_id FROM reservations
         WHERE (check_in_date < ? AND check_out_date > ?)
       )`,
      [roomType, checkOutDate, checkInDate]
    );

    // Log the room type for debugging purposes
    console.log("Room type:", roomType);

    return rows;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error; // Optional: Re-throw error to handle it outside
  }
};


const findRoomById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM rooms WHERE room_id = ?', [id]);
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
  getAvailableRoomsByType,
  findRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
