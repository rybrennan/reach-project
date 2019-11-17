const mysql = require('mysql');
const config = require('./config.js');
const con = mysql.createConnection(config);

con.connect((err) => {
  if (err) throw err
  console.log('Database Connected!!')
});

const query = queryString =>
  new Promise((resolve, reject) => {
    con.query(queryString, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })


const GET_SCOREBOARD_QUERY = `SELECT scores.score, players.player_name, scores.date FROM scores
INNER JOIN players ON scores.user_id=players.player_id
ORDER BY scores.score DESC`;

const getScoreBoard = () =>
  query(GET_SCOREBOARD_QUERY)
    .then(result => result.slice(0, 5))




const findPlayerQuery = (playerName) => {
  return `SELECT * FROM players where player_name='${playerName}'`;
}

const queryInsertNewPlayer = (playerName) => {
  return `INSERT INTO players (player_name) VALUES ('${playerName}');`;
}

const queryInsertScore = (userId, score) => {
  return `INSERT INTO scores (user_id, score, date) VALUES (${userId}, ${score}, "10/01/2019");`;
}

const insertScore = (playerName, score) =>
  //this is returning a promise
  query(findPlayerQuery(playerName))
    .then((playersCollection) => {
      if (playersCollection.length == 0) {
        return query(queryInsertNewPlayer(playerName))
      } else {
        return { insertId:  playersCollection[0].player_id}
      }
    })
    .then(({ insertId }) => {
      return query(queryInsertScore(insertId, score))
    })
    .then(() => {
      return getScoreBoard();
    })
    export default { getScoreBoard, insertScore };

