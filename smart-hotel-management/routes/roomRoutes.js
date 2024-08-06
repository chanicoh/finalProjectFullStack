const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


router.route('/:id').get(roomController.getPostByiD)
router.get('/', roomController.getAllRooms);

module.exports = router;
