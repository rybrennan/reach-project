

class ReactHelpers {
  constructor() {

  }
}

ReactHelpers.prototype.checkLetterAlgo = function (mappedWordfromState, chosenLetter, currentStep, correctGuesses, callback) {
  let newMappedWord = mappedWordfromState;
  let isWinner = false;
  let isLoser = false;
  let charOccurences = newMappedWord[chosenLetter];
  let newStep = currentStep;
  let correctGuessesArray = correctGuesses;


  if (!!newMappedWord[chosenLetter]) {
    delete newMappedWord[chosenLetter];
    correctGuessesArray.push(chosenLetter);

    if (Object.keys(newMappedWord).length === 0) {
      isWinner = true;
      callback(charOccurences, isWinner, newMappedWord, newStep, correctGuessesArray);
    } else {
      callback(charOccurences, isWinner, newMappedWord, newStep, correctGuessesArray);
    }
  } else {
    //INCORRECT ++:
    let temp = parseInt(newStep) + 1;
    newStep = temp.toString();
    if (newStep === '6') isLoser === true
    callback(charOccurences, isWinner, newMappedWord, newStep, correctGuessesArray, isLoser)
  }
}



module.exports = ReactHelpers;





