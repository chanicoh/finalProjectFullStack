const express = require('express');
const router = express.Router();
const getRooms  = require('../controllers/roomController');


router.get('/rooms', getRooms);

// Additional routes...

module.exports = router;
