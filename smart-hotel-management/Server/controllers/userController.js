const userModel = require('../models/userModel');

const createUser = async (req, res, next) => {
  try {
    const userId = await userModel.createUser(req.body);
    res.status(201).json({ userId });
  } catch (err) {
    next(err);
  }
};


const getAllUser = async (req, res) => {
  try {
    const users = await userModel.getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUser };


const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    await userModel.updateUser(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, getAllUser, getUserById, updateUser, deleteUser };
