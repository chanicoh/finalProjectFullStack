const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUser);

router.get('/users?section=orders/:id', userController.getUserReservations);
router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
