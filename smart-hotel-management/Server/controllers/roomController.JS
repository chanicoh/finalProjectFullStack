const roomModel = require('../models/roomModel'); // Adjust path as needed

// Example of a controller function
const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await roomModel.findRoomById(req.params.id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRooms,
  getRoomById
};
