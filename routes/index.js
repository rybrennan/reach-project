const path = require('path')
const express = require('express');
const router = express.Router();
const utils = require('../utils');

//NEED TO MAKE ERROR CATCHES IN HERE
router.get('/all', (req, res) => {
  utils.getAll((error, response) => {
    res.status(200).json(response);
  })
})
//We will have three different buttons that call this function
router.get('/difficulty', (req, res) => {
  let difficultySetting = parseInt(req._parsedOriginalUrl.query);

  utils.getWordByDifficulty(difficultySetting, (error, response) => {
    res.status(200).json(response);
    //sending to handleEasy
  })
});


module.exports = router;

