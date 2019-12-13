const mysql = require('mysql');
const config = require('./config.js');
const con = mysql.createConnection(config);

con.connect((err) => {
  if (err) throw err
  console.log('Database Connected!!')
});

const query = queryString =>
  new Promise((resolve, reject) => {
    con.query(queryString, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results);
      }
    })
  })

const GET_SCOREBOARD_QUERY = `SELECT scores.score, players.player_name, scores.date FROM scores
INNER JOIN players ON scores.user_id=players.player_id
ORDER BY scores.score DESC`;

const INSERT_SCORE_QUERY = (userId, score) => {
  return `INSERT INTO scores (user_id, score, date) VALUES (${userId}, ${score}, "10/01/2019");`;
}

const FIND_PLAYER_QUERY = playerName => {
  return `SELECT * FROM players where player_name='${playerName}'`;
}

const INSERT_NEW_PLAYER_QUERY = (playerName) => {
  return `INSERT INTO players (player_name) VALUES ('${playerName}');`;
}
const getScoreBoard = () =>
  new Promise((resolve, reject) => {
    resolve(query(GET_SCOREBOARD_QUERY)
      .then(scoreboard => scoreboard.slice(0, 5)));
  })

const insertScore = (playerName, score) =>
  new Promise((resolve, reject) => {
    query(FIND_PLAYER_QUERY(playerName))
      .then((collection) => {
        if (collection.length === 0) {
         return query(INSERT_NEW_PLAYER_QUERY(playerName))
          .then((results) => {
            { insertId:  results[0].player_id}
          })

        } else {
          return
        }
      })
  })



// const insertScore = (playerName, score, callback) => {
//   const queryCheckifPlayerExists = `SELECT * FROM players where player_name='${playerName}'`;
//   con.query(queryCheckifPlayerExists, (err, results) => {
//     if (err) throw err;
//     //if player DOES NOT exist, we need to first insert into the PLAYERS table
//     // then use user_id to insert into the SCORES table
//     if (results.length === 0) {
//       const queryInsertNewPlayer = `INSERT INTO players (player_name) VALUES ('${playerName}');`;

//       con.query(queryInsertNewPlayer, (err, results) => {
//         if (err) throw err;
//         const userId = results.insertId;
//         const queryInsertNewScore = `INSERT INTO scores (user_id, score, date) VALUES (${userId}, ${score}, "10/01/2019");`;
//         con.query(queryInsertNewScore, (err, results) => {
//           getScoreBoard((updatedBoard) => {
//             const topFive = updatedBoard.slice(0, 5);
//             callback(topFive)
//           })
//         })
//       })
//     } else {
//       console.log('Player Exists!')
//       const userId = results[0].player_id;
//       console.log('USER ID', results)
//       const queryInsertNewScore = `INSERT INTO scores (user_id, score, date) VALUES (${userId}, ${score}, "10/01/2019");`;
//       con.query(queryInsertNewScore, (err, results) => {
//         getScoreBoard((updatedBoard) => {
//           const topFive = updatedBoard.slice(0, 5);
//           callback(topFive)
//         })
//       })
//     }
//   })
// }

module.exports = {
  getScoreBoard,
  insertScore
}





