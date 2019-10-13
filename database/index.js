const mysql = require('mysql');
const config = require('./config.js');
const con = mysql.createConnection(config);

con.connect((err) => {
  if (err) throw err
  console.log('Database Connected!!')
});

const getScoreBoard = ((callback) => {
  const queryString = `SELECT scores.score, players.player_name, scores.date FROM scores
  INNER JOIN players ON scores.user_id=players.player_id
  ORDER BY scores.score DESC`;

  con.query(queryString, (err, scoreBoard) => {
    if (err) throw err;
    callback(scoreBoard.slice(0,5))
  })
});

const insertScore = (playerName, score, callback) => {
  const queryCheckifPlayerExists = `SELECT * FROM players where player_name='${playerName}'`;
  con.query(queryCheckifPlayerExists, (err, results) => {
    if (err) throw err;
    //if player DOES NOT exist, we need to first insert into the PLAYERS table
    // then use user_id to insert into the SCORES table
    if (results.length === 0) {
      const queryInsertNewPlayer = `INSERT INTO players (player_name) VALUES ('${playerName}');`;

      con.query(queryInsertNewPlayer, (err, results) => {
        if (err) throw err;
        const userId = results.insertId;
        const queryInsertNewScore = `INSERT INTO scores (user_id, score, date) VALUES (${userId}, ${score}, "10/01/2019");`;
        con.query(queryInsertNewScore, (err, results) => {
          getScoreBoard((updatedBoard) => {
            const topFive = updatedBoard.slice(0,5);
            callback(topFive)
          })
        })
      })
    } else {
      console.log('Player Exists!')
      const userId = results[0].player_id;
      console.log('USER ID', results)
      const queryInsertNewScore = `INSERT INTO scores (user_id, score, date) VALUES (${userId}, ${score}, "10/01/2019");`;
      con.query(queryInsertNewScore, (err, results) => {
        getScoreBoard((updatedBoard) => {
          const topFive = updatedBoard.slice(0,5);
          callback(topFive)
        })
      })
    }
  })
};

module.exports = {
  getScoreBoard,
  insertScore
};





