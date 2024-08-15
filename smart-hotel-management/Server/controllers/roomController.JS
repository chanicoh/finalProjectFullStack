const { getAllRooms,getRoomyId} = require('../models/roomModel');

const getRooms = async (req, res, next) => {
    try {
        const rooms = await getAllRooms();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

// Additional controller methods...

module.exports = { getRooms };
