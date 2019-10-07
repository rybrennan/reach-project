const axios = require('axios');

let linkedinUrl = `http://app.linkedin-reach.io/words`
const http = axios.create({
  baseURL: linkedinUrl
});

const getAll = (callback) => {
  http.get(`${linkedinUrl}?difficulty=2&count=1`)
  .then((response) => {

    callback(null, response.data);
  })
  .catch((error) => {
    console.log(error)
    callback(error, null);
  })
}

const getWordByDifficulty = (rating, callback) => {
  http.get(`${linkedinUrl}?difficulty=${rating}&count=50&minLength=4`)
  .then((response) => {
    let wordIdx = Math.floor(Math.random() * (50 - 1)) + 1;
    let wordsArray = response.data.split(/\r?\n/)
    let randoWord = wordsArray[wordIdx];

    console.log('OMG A RANDO WORD ', randoWord)
    callback(null, randoWord);
  })
  .catch((error) => {
    console.log(error)
    callback(error, null);
  })
}
module.exports = {
  getAll,
  getWordByDifficulty
  // http,
};




