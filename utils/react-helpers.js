

class ReactHelpers {
  constructor() {

  }
}

ReactHelpers.prototype.checkLetterAlgo = function (mappedWordfromState, chosenLetter, currentStep, callback) {
  let newMappedWord = mappedWordfromState;
  let winner = false;
  let charOccurences = newMappedWord[chosenLetter];
  let newStep = currentStep;

  if (!!newMappedWord[chosenLetter]) {
    delete newMappedWord[chosenLetter];
    if (Object.keys(newMappedWord).length === 0) {
      winner = true;
      callback(charOccurences, winner, newMappedWord, newStep);
    } else {
      callback(charOccurences, winner, newMappedWord, newStep);
    }
  } else {
    //INCORRECT ++:
    let temp = parseInt(newStep) + 1;
    newStep = temp.toString();
    callback(charOccurences, winner, newMappedWord, newStep)
  }
}



module.exports = ReactHelpers;





