const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUser);
console.log("sh");
//router.get('/users/:id/reservations', userController.getUserReservations);
router.get('/users', userController.getUserReservations);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
