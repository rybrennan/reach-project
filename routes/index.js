const path = require('path')
const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.get('/all', (req, res) => {
console.log('router.get/all')
  utils.getAll((error, response) => {
    console.log('I am the word', response)
    res.status(200).json(response);
  })
})

module.exports = router;