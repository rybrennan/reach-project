import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';
import ReactHelpers from '../../utils/react-helpers.js';
import Alphabet from './Alphabet';
import Tiles from './Tiles';
import HangmanContainer from './Hangman';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      letters: [],
      guessedLetter: 'testing',
      mappedWord: {},
      correctLetters: [],
      missedLetters: [],
      step: '1',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckLetter = this.handleCheckLetter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reactHelpers = new ReactHelpers();
  }

  componentDidMount() {
    fetch('/all')
      .then(response => response.json())
      .then((word) => {
        this.setState({
          secretWord: ''
        })
      })
      .catch((err) => {
        console.log('We have an error, ', err)
      })
  }

  handleEasy() {
    this.handleAjax('easy');
  }

  handleMedium() {
    this.handleAjax('medium');
  }

  handleSuperSmart() {
    this.handleAjax('hard');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick(e) {
    let currentGuessedLetter = e.target.textContent;
    let choosenLetters = this.state.letters;

    choosenLetters = choosenLetters.concat(currentGuessedLetter);

    this.setState({
      letters: choosenLetters,
      guessedLetter: currentGuessedLetter
    }, () => {
      this.handleCheckLetter();
    })
  }

  handleCheckLetter() {
    let currentGuessedLetter = this.state.guessedLetter;
    let choosenLetters = this.state.letters;
    let secretWord = this.state.secretWord;
    let mappedWord = this.state.mappedWord;
    let currentStep = this.state.step;
    let correctGuesses = this.state.correctLetters;
    let self = this;
    this.reactHelpers.checkLetterAlgo(mappedWord, currentGuessedLetter, currentStep, correctGuesses, (numberOfOccurences, isWinner, newMappedWord, newStep, correctGuessesArray, isLoser) => {
      this.setState({
        letters: choosenLetters,
        mappedWord: newMappedWord,
        step: newStep,
        correctLetters: correctGuessesArray,
      }, () => {
        //GAME OVER HERE!!
        if (self.state.step === '7') {
          self.getRemaining();
        }
      })
      if (isWinner === true) {
        //refactor this to change state
          alert('You Won the Game!');
        }
      });
    }
    //GAME OVER
    getRemaining() {
      let correctLetters = this.state.correctLetters;
      let secretWord =  this.state.secretWord;

      let remaining = secretWord.split('').filter((char) => {
        return !correctLetters.includes(char);
      });

     this.setState({
       missedLetters: remaining
     })
    }
    handleAjax(setting) {
     let self = this;
     let difficultySetting;

     if (setting === 'easy') {
       difficultySetting = Math.floor(Math.random() * (4 - 1 + 1) + 1);
     } else if (setting === 'medium') {
       difficultySetting = Math.floor(Math.random() * (7 - 5 + 1) + 5);
     } else {
       difficultySetting = Math.floor(Math.random() * (10 - 8 + 1) + 8);
     }

     $.ajax({
       url: 'http://localhost:3000/difficulty',
       type: 'GET',
       dataType: 'json',
       data: JSON.stringify(difficultySetting),
       contentType: 'application/json',
       success: function (wordsArray) {

         self.setState({
           secretWord: wordsArray[0],
           mappedWord: wordsArray[1],
         })
       },
       error: function (data) {
         console.error('Error in handleEasy', data);
       }
     });
   }

   render() {
     return (
       <div className="App">
         {/* <Name>Hire-me Hangman 💀</Name> */}
         <br />
         <div>
           Pick your poison:
           <button onClick={() => this.handleEasy()}>Easy Peezy</button>
           <button onClick={() => this.handleMedium()}>Medium</button>
           <button onClick={() => this.handleSuperSmart()}>Hard</button>
         </div>
         <HangmanContainer step={this.state.step}/>
         <br />
         <br />

         <Alphabet
             choosenLetters={this.state.letters}
             onClick={this.handleClick} />

         <Tiles
             secretWord={this.state.secretWord}
             guessedLetter={this.state.guessedLetter}
             choosenLetters={this.state.letters}
             missedLetters={this.state.missedLetters}/>
       </div>
     );
   }
 }

 export default App;


// const Name = styled.h1`
//   font-size: 56px;
//   font-family: 'Mansalva', sans-serif;
//   margin: 0;
// `;



































