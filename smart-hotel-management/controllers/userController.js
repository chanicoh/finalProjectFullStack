const { getAllUsers } = require('../models/userModel');

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers };
