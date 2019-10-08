

class ReactHelpers {
  constructor() {

  }

}

ReactHelpers.prototype.checkLetterAlgo = function(mappedWord, chosenLetter, callback) {
  let map = mappedWord;

  if (!!map[mappedWord]) {
    let tiles = map[mappedWord];
    delete map[mappedWord];

    //Object is empty, we have a winner
    if (Object.keys(map).length === 0) {
      //will this bubble up?
      callback((() => alert('Woop woop! Way to go smarty pants! 🚀')), );
      //lets test
    } else {
      //pass along

    }
  }
}








module.exports = ReactHelpers;