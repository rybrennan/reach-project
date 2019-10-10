const png1 = require('../src/img/1.png');
const png2 = require('../src/img/2.png');
const png3 = require('../src/img/3.png');
const png4 = require('../src/img/4.png');
const png5 = require('../src/img/5.png');
const png5 = require('../src/img/6.png');
const png7 = require('../src/img/7.png');



class ReactHelpers {
  constructor() {

  }
}

ReactHelpers.prototype.checkLetterAlgo = function (mappedWordfromState, chosenLetter, callback) {
  let newMappedWord = mappedWordfromState;
  let winner = false;
  let charOccurences = newMappedWord[chosenLetter];

  if (!!newMappedWord[chosenLetter]) {
    delete newMappedWord[chosenLetter];
    if (Object.keys(newMappedWord).length === 0) {
      winner = true;
      callback(charOccurences, winner, newMappedWord);
    } else {
      callback(charOccurences, winner, newMappedWord);
    }
  }
}

React.prototype.styles = {
  hangmanContainer: {
    backgroundImage: {
      0: null,
      1: `url(${png1})`,
      2: `url(${png2})`,
      3: `url(${png3})`,
      4: `url(${png4})`,
      5: `url(${png5})`,
      6: `url(${png6})`,
      7: `url(${png7})`,
    }
  }
}

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`
  }
};

module.exports = ReactHelpers;





