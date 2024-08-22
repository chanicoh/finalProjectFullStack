const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser); // Add logout route
router.post('/register', authController.registerUser);

module.exports = router;
