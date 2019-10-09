const mysql = require('mysql');
const config = require('./config.js');
// const moment = require('moment');
const con = mysql.createConnection(config);

con.connect((err) => {
  if (err) throw err
  console.log('Database Connected!!')
})