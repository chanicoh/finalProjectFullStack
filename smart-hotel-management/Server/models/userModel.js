const pool = require('../config/db');

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

module.exports = { getAllUsers };