const roomModel = require('../models/roomModel'); // Adjust path as needed


const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Fetch available rooms by type
const getAvailableRoomsByType = async (req, res) => {
  try {
    const { roomType, checkInDate, checkOutDate } = req.query;
    const rooms = await roomModel.getAvailableRoomsByType(roomType, checkInDate, checkOutDate);
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

const createRoom = async (req, res, next) => {
  try {
    const roomId = await roomModel.createRoom(req.body);
    res.status(201).json({ roomId });
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    await roomModel.updateRoom(req.params.id, req.body);
    res.json({ message: 'Room updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    await roomModel.deleteRoom(req.params.id);
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRooms,
  getAvailableRoomsByType,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};
