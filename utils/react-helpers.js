

class ReactHelpers {
  constructor() {

  }

}

ReactHelpers.prototype.checkLetterAlgo = function(mappedWordfromState, chosenLetter, callback) {
  console.log('CHOSEN LETTER IN NODE ', chosenLetter)
  //Note: not 'new' yet- will be in callback
  let newMappedWord = mappedWordfromState;
  let winner = false;
  let charOccurences = newMappedWord[chosenLetter];

  if (!!newMappedWord [chosenLetter]) {
    delete newMappedWord[chosenLetter];
    if (Object.keys(newMappedWord).length === 0) {
      //Object is empty, we have a winner
      winner = true;
      callback(charOccurences, winner, newMappedWord);
    } else {
      callback(charOccurences, winner, newMappedWord);
    }
  }
}

module.exports = ReactHelpers;



  //if not in word
//

// class TestClassHandleCheckLetter {
//   constructor() {

//   }
//   handleCheckLetter() {
//     let currentGuessedLetter = this.state.guessedLetter;
//     let choosenLetters = this.state.letters;
//     let secretWord = this.state.secretWord;
//     //is guessedLetter in PAST choosen Letters?
//     // if is IS NOT, THEN (YES) we check
//     //if (YES)
//     if (!choosenLetters.includes(currentGuessedLetter)) {
//       //now we check if it has been choosen before
//       ReactHelpers.checkLetterAlgo(mappedWord, currentGuessedLetter, (numberOfOccurences, isWinner, newMappedWord) => {
//         this.setState({
//           mappedWord: newMappedWord
//         })
//         if (isWinner === false) {
//           alert('You Won the Game!')
//         }
//       })
//     }



    // if (YES IT IS IN THERE, ) - Alert('You have already picked this letter!)

//   }

// }



// handleCheckLetter() {

//   if (this.state.secretWord.indexOf(this.state.guessedLetter) > -1) {
//     if (this.state.letters.includes(this.state.guessedLetter)) {
//       alert('You have already picked this letter!');
//     } else {
//       //start of notes
//       //Checking function goes here

//       let copyLetters = this.state.letters.concat(this.state.guessedLetter)
//       this.setState({
//         letters: copyLetters,
//       })
//     }
//   } else {
//     //if it is not in the word
//     if (this.state.letters.includes(this.state.guessedLetter)) {
//       alert('You have already picked this letter!');
//     } else {
//       let copyLetters = this.state.letters.concat(this.state.guessedLetter)
//       this.setState({
//         letters: copyLetters,
//       })
//     }
//   }
// }
