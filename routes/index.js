const path = require('path')
const express = require('express');
const router = express.Router();
const utils = require('../utils');
const bodyParser = require('body-parser');

const db = require('/Users/ryanbrennan/Desktop/repls/linkedin/hangman/database/index.js');
router.use(bodyParser.urlencoded({
  extended: true
}));
//NEED TO MAKE ERROR CATCHES IN HERE
router.get('/all', (req, res) => {
  utils.getAll((error, response) => {
    res.status(200).json(response);
  });
});

// @route  GET /difficulty
// @desc   uses getWordByDifficulty which queries the Linkedin API..
// and returns a word based on 'difficulty'
router.get('/difficulty', (req, res) => {
  let difficultySetting = parseInt(req._parsedOriginalUrl.query);

  utils.getWordByDifficulty(difficultySetting, (error, response) => {
    res.status(200).json(response);
  });
});

// @route  GET /scoreboard
// @desc   when component mounts in the client, this route gets..
// the previous high score from the mysql database
router.get('/scoreboard', (req, res) => {
  db.getScoreBoard((scoreBoard) => {
    res.status(200).json(scoreBoard);
  })
})

// @route  POST /insertscore
// @desc   Inserts a score into the database with db.insertScore
router.post('/insertscore', (req, res) => {
  const player = JSON.parse(Object.keys(req.body)[0])['player'];
  const score =  JSON.parse(Object.keys(req.body)[0])['score'];

  db.insertScore(player, score, (updatedScoreBoard) => {
    res.status(200).json(updatedScoreBoard)
  })
})


module.exports = router;




