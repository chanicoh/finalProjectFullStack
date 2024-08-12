const Room = require('../models/room');

exports.getAllRooms = async (req, res, next) => {
  try {
    const [rooms] = await Room.fetchAll();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
exports.getRoomById = async (req, res, next) => {
    res.send("Get Post ")
}

