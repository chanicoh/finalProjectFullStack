require('dotenv').config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


let sql = `SELECT * FROM rooms 
       WHERE room_type = 'StandardRoom' 
       AND status = 'available'
       AND room_id NOT IN (
         SELECT room_id FROM reservations
         WHERE (check_in_date < 2024-09-10 AND check_out_date > 2024-09-17)
       )`

console.log(sql)
pool.execute(sql,function (err,result){
  if(err) throw err
  console.log(result);
})

  module.exports=pool.promise();
