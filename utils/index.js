const axios = require('axios');

let linkedinUrl = `http://app.linkedin-reach.io/words`
const http = axios.create({
  baseURL: linkedinUrl
});

const wordsUrl = `https://wordsapiv1.p.rapidapi.com`
const http2 = axios.create({
  baseURL: wordsUrl
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
// /words/incredible/definitions
const mapWord = (secretWord) => {
  let map = {};

  for (var i = 0; i < secretWord.length; i ++) {
    let char = secretWord[i];
    !map[char] ? map[char] = 1 : map[char] ++;
  }
  return map;
}


//queries the Linkedin API to return an array of 50 words according to difficulty
//sends a single word back to the server as a word & mappedWord
const getWordByDifficulty = (rating, callback) => {
  http.get(`${linkedinUrl}?difficulty=${rating}&count=50&minLength=4`)
  .then((response) => {
    let wordIdx = Math.floor(Math.random() * (50 - 1)) + 1;
    let wordsArray = response.data.split(/\r?\n/);
    let randoWord = wordsArray[wordIdx];
    let mappedWord = mapWord(randoWord);

        callback(null, [randoWord, mappedWord]);
      })
      .catch((error) => {
        console.log(error, 'In /utils/index.js');
        callback(error, null);
      })
    }

    const getWordClue = (word, callback) => {
      http2.get(`${wordsUrl}/words/${word}/definitions`, { headers: {"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "oBL36Vab07mshN89Y6zhLzcGTFl2p1Rga7AjsnEoiHYwPJl0wM"} })
      .then((res) => {
        callback(null, res)
      })
      .catch((error) => {
        console.log(error, 'In /utils/index.js');
        callback(error, null);
      })
    }
    module.exports = {
      getAll,
      getWordByDifficulty,
    };








