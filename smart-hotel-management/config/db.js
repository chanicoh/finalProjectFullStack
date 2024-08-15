require('dotenv').config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,

  });

let sql ="SELECT *FROM rooms;";

console.log(sql)
pool.execute(sql,function (err,result){
  if(err) throw err
  console.log(result);
})

  module.exports=pool.promise();
