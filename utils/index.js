const axios = require('axios');

// const png1 = require('../src/img/1.png');
// const png2 = require('../src/img/2.png');
// const png3 = require('../src/img/3.png');
// const png4 = require('../src/img/4.png');
// const png5 = require('../src/img/5.png');
// const png6 = require('../src/img/6.png');
// const png7 = require('../src/img/7.png');

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

const mapWord = (secretWord) => {
  let map = {};

  for (var i = 0; i < secretWord.length; i ++) {
    let char = secretWord[i];
    !map[char] ? map[char] = 1 : map[char] ++;
  }

  return map;
}

// const styles = {
//   hangmanContainer: {
//     backgroundImage: {
//       0: null,
//       1: `url(${png1})`,
//       2: `url(${png2})`,
//       3: `url(${png3})`,
//       4: `url(${png4})`,
//       5: `url(${png5})`,
//       6: `url(${png6})`,
//       7: `url(${png7})`,
//     }
//   }
// }

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
module.exports = {
  getAll,
  getWordByDifficulty,
  // styles
};








