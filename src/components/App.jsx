import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';
import ReactHelpers from '../../utils/react-helpers.js';
import Alphabet from './Alphabet';
import Tiles from './Tiles';
import NewGameButton from './NewGameButton';
import HangmanContainer from './Hangman';

const Span = styled.span`
font-family: 'Mansalva', sans-serif;
font-size: 24px;
right: 60px;
`
const Score = styled.h1`
font-size: 24px;
font-family: 'Mansalva', sans-serif;
margin: 0;
position:absolute;
right: 30%;
top: 15%;
`
const Name = styled.h1`
  font-size: 56px;
  font-family: 'Mansalva', sans-serif;
  margin: 0;
  position:absolute;
  left: 30%;
`;

const Button1 = styled.button`
  font-size: 24px;
  border: none;
  background: none;
  position:absolute;
  top: 15%;
  right: 75%;
  cursor: pointer;
  transition: all 2s linear;
  font-family: 'Mansalva', sans-serif;

  `;
const Button2 = styled.button`
  font-size: 24px;
  border: none;
  background: none;
  position:absolute;
  top: 20%;
  right: 75%;
  cursor: pointer;
  transition: all 2s linear;
  font-family: 'Mansalva', sans-serif;
  `;
const Button3 = styled.button`
  font-size: 24px;
  border: none;
  background: none;
  position:absolute;
  top: 25%;
  right: 75%;
  cursor: pointer;
  transition: all 2s linear;
  font-family: 'Mansalva', sans-serif;
  `;

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
      newGame: true,
      difficulty: '',
      score: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckLetter = this.handleCheckLetter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
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
        let score = self.state.score

        if (self.state.step === '7') {
          self.getRemaining();
        }
        if (self.state.secretWord.includes(self.state.guessedLetter)) {
          score += 2;
          self.setState({
            score
          })
        } else if (!self.state.secretWord.includes(self.state.guessedLetter)) {
          score - 1 >= 0 ? score = score - 1 : score = 0;
          self.setState({
            score
          })
        }

      })
      if (isWinner === true) {
        alert('You Won the Game!');
      }
    });
  }
  //GAME OVER
  getRemaining() {
    let correctLetters = this.state.correctLetters;
    let secretWord = this.state.secretWord;

    let remaining = secretWord.split('').filter((char) => {
      return !correctLetters.includes(char);
    });

    this.setState({
      missedLetters: remaining,
      newGame: false
    })
  }

  onNewGame() {
    this.setState({
      secretWord: '',
      letters: [],
      guessedLetter: 'testing',
      mappedWord: {},
      correctLetters: [],
      missedLetters: [],
      step: '1',
      newGame: true
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
    this.setState({
      difficulty: setting
    })

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
        console.error(`Error in handle${setting}`, data);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Name>Hire-me Hangman 💀</Name>
        <Score>Score: {this.state.score}</Score>
        <br />
        <br />
        <br />
        <div>
          <Span>First, Pick your poison:</Span>
          <Button1 onClick={() => this.handleEasy()}>Easy</Button1>
          <Button2 onClick={() => this.handleMedium()}>Medium</Button2>
          <Button3 onClick={() => this.handleSuperSmart()}>Hard</Button3>
        </div>
        <HangmanContainer step={this.state.step} />
        <NewGameButton
          onClick={this.onNewGame}
          newGame={this.state.newGame}
        />
        <br />
        <br />

        <Alphabet
          choosenLetters={this.state.letters}
          onClick={this.handleClick} />

        <Tiles
          secretWord={this.state.secretWord}
          guessedLetter={this.state.guessedLetter}
          choosenLetters={this.state.letters}
          missedLetters={this.state.missedLetters} />
      </div>
    );
  }
}

export default App;



































