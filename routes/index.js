const path = require('path')
const express = require('express');
const router = express.Router();
const utils = require('../utils');
const db = require('/Users/ryanbrennan/Desktop/repls/linkedin/hangman/database/index.js');

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
  console.log('IN SCOREBOARD')
  db.getScoreBoard((scoreBoard) => {
    res.status(200).json(scoreBoard);
  })
})


module.exports = router;




