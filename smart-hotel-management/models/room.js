const db = require('../config/db');

class Room {
  static fetchAll() {
    let sql = 'SELECT * FROM room;';
    return db.execute(sql);
  }
}

module.exports = Room;