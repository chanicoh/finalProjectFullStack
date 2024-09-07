const pool = require('../config/db');

const createUser = async (user) => {
  const { user_name, password, role, first_name, last_name, email, address, phone } = user;
  const [result] = await pool.query(
    `INSERT INTO users (user_name, password, role, first_name, last_name, email, address, phone)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_name, password, role, first_name, last_name, email, address, phone]
  );
  return result.insertId;
};


const getAllUser = async () => {
  const [rows] = await pool.query('SELECT *FROM users;');
  return rows;
};
const getUserReservations = async (req, res) => {
  const user_id = req.params.userId;

  try {
      const [reservations] = await pool.query(`
          SELECT  r.room_number,   r.room_type FROM rooms r 
          JOIN  reservations res ON r.room_id = res.room_id WHERE 
           res.user_id = ?;`
          , [user_id]);

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

const getUserById = async (user_id) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [user_id]);
  return rows[0];
};

const getUserByUsername = async (username) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE username = ?`, [username]);
  return rows[0];
};

const updateUser = async (user_id, updatedFields) => {
  const { username, password, role, first_name, last_name, email, address, phone } = updatedFields;
  await pool.query(
    `UPDATE users SET username = ?, password = ?, role = ?, first_name = ?, last_name = ?, email = ?, address = ?, phone = ? 
     WHERE user_id = ?`,
    [username, password, role, first_name, last_name, email, address, phone, user_id]
  );
};

const deleteUser = async (user_id) => {
  await pool.query(`DELETE FROM users WHERE user_id = ?`, [user_id]);
};

module.exports = { createUser,getAllUser, getUserById,getUserReservations, getUserByUsername, updateUser, deleteUser };
