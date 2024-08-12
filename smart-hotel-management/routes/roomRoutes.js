const express = require('express');
const { getRooms } = require('../controllers/roomController');
const router = express.Router();

router.get('/rooms', getRooms);

module.exports = router;
