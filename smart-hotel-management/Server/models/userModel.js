const pool = require('../../config/db'); // Adjust path to your database configuration

// Create a new user
const createUser = async (user) => {
  const { username, password, role, first_name, last_name, email,address, phone } = user;
  const [result] = await pool.query(
    `INSERT INTO Users (username, password, role, first_name, last_name, email,address, phone)
     VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
    [username, password, role, first_name, last_name, email,address, phone]
  );
  return result.insertId;
};

// Find a user by username
const findUserByUsername = async (username) => {
  const [rows] = await pool.query(
    `SELECT * FROM Users WHERE username = ?`,
    [username]
  );
  return rows[0]; // Returns the user object if found
};

// Find a user by email
// const findUserByEmail = async (email) => {
//   const [rows] = await pool.query(
//     `SELECT * FROM Users WHERE email = ?`,
//     [email]
//   );
//   return rows[0]; // Returns the user object if found
// };

// // Update user details
// const updateUser = async (userId, updates) => {
//   const { password, role, first_name, last_name, email, phone } = updates;
//   const [result] = await pool.query(
//     `UPDATE Users
//      SET password = COALESCE(?, password),
//          role = COALESCE(?, role),
//          first_name = COALESCE(?, first_name),
//          last_name = COALESCE(?, last_name),
//          email = COALESCE(?, email),
//          address=COALESCE(?,address),
//          phone = COALESCE(?, phone)
//      WHERE user_id = ?`,
//     [password, role, first_name, last_name, email,address, phone, userId]
//   );
//   return result.affectedRows;
// };

// // Delete a user
// const deleteUser = async (userId) => {
//   const [result] = await pool.query(
//     `DELETE FROM Users WHERE user_id = ?`,
//     [userId]
//   );
//   return result.affectedRows;
// };

// // Get all users
// const getAllUsers = async () => {
//   const [rows] = await pool.query(
//     `SELECT * FROM Users`
//   );
//   return rows;
// };

module.exports = {
  createUser,
  findUserByUsername
  // findUserByEmail,
  // updateUser,
  // deleteUser,
  // getAllUsers
};
