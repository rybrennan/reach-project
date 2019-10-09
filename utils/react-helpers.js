
class ReactHelpers {
  constructor() {

  }
}

ReactHelpers.prototype.checkLetterAlgo = function(mappedWordfromState, chosenLetter, callback) {
  let newMappedWord = mappedWordfromState;
  let winner = false;
  let charOccurences = newMappedWord[chosenLetter];

  if (!!newMappedWord [chosenLetter]) {
    delete newMappedWord[chosenLetter];
    if (Object.keys(newMappedWord).length === 0) {
      winner = true;
      callback(charOccurences, winner, newMappedWord);
    } else {
      callback(charOccurences, winner, newMappedWord);
    }
  }
}

module.exports = ReactHelpers;


