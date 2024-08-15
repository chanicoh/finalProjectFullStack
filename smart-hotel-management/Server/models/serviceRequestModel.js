const pool = require('../config/db');

const getAllRequests = async () => {
    const [rows] = await pool.query('SELECT * FROM service_requests');
    return rows;
};

const getRequestById = async (request_id) => {
    const [rows] = await pool.query('SELECT * FROM service_requests WHERE request_id = ?', [request_id]);
    return rows[0];
};

// Additional CRUD operations...

module.exports = { getAllRequests, getRequestById };
