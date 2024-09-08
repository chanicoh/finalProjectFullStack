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


let sql = `SELECT  r.room_number,   r.room_type ,res.check_in_date, res.check_out_date, res.status  FROM rooms r 
      JOIN  reservations res ON r.room_id = res.room_id WHERE 
      res.user_id = 324245935;`

console.log(sql)
pool.execute(sql,function (err,result){
  if(err) throw err
  console.log(result);
})

  module.exports=pool.promise();
