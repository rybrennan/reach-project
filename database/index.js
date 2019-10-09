const mysql = require('mysql');
const config = require('./config.js');
// const moment = require('moment');
const con = mysql.createConnection(config);

con.connect((err) => {
  if (err) throw err
  console.log('Database Connected!!')
})

class Database {
  constructor() {

  }
}

Database.prototype.getScoreBoard = function (callback) {
  let queryString = `SELECT scores.score, players.player_name, scores.date FROM scores
                    INNER JOIN players ON scores.user_id=players.player_id
                    ORDER BY scores.score DESC`;
  con.query(queryString, (err, scoreBoard) => {

    if (err) throw err;
    console.log('OMG OUR scoreboard! ', scoreBoard[0].score);

  })
}

const test = new Database();

test.getScoreBoard()