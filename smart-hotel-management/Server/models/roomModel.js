const pool = require('../config/db');

const getAllRooms = async () => {
    const [rows] = await pool.query('SELECT * FROM rooms');
    return rows;
};

const getRoomById = async (room_id) => {
    const [rows] = await pool.query('SELECT * FROM rooms WHERE room_id = ?', [room_id]);
    return rows[0];
};

// Additional CRUD operations...

module.exports = { getAllRooms, getRoomById };
