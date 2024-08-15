const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust path as needed

// Route to create a new user
router.post('/users', userController.createUser);

// Route to get a user by username
router.get('/users/:username', userController.getUser);

// Route to update user details
//router.put('/users/:userId', userController.updateUser);

// Route to delete a user
//router.delete('/users/:userId', userController.deleteUser);

// Route to get all users (if needed)
//router.get('/users', userController.getAllUsers);

module.exports = router;
