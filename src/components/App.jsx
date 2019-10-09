import React from "react";
import axios from "axios";
import $ from 'jquery';
import Input from './Input';
import Alphabet from './Alphabet';
import ReactHelpers from '../../utils/react-helpers.js';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      letters: [],
      guessedLetter: '',
      mappedWord: {}
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
          secretWord: word
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
    console.log('We are getting our letter', e.target.textContent)
  }

  handleCheckLetter() {
    console.log('CLICK')
    let currentGuessedLetter = this.state.guessedLetter;
    let choosenLetters = this.state.letters;
    let secretWord = this.state.secretWord;
    let mappedWord = this.state.mappedWord;

    //This WHOLE BLOCK IS THIS IS THE FIRST TIME THE LETTER HAS BEEN PICKED
    if (!choosenLetters.includes(currentGuessedLetter)) {

      this.reactHelpers.checkLetterAlgo(mappedWord, currentGuessedLetter, (numberOfOccurences, isWinner, newMappedWord) => {
        choosenLetters = choosenLetters.concat(currentGuessedLetter);

        this.setState({
          letters: choosenLetters,
          mappedWord: newMappedWord
        })
        if (isWinner === true) {
          alert('You Won the Game!');
        } else if (!isWinner){

        }
      });
      console.log(this.state.letters)
    } else {
      //if already has been chosen
    }
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
        //this is coming back from getWordByDifficulty
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
        <div>
          <button onClick={() => this.handleEasy()}>Easy Peezy</button>
          <button onClick={() => this.handleMedium()}>Medium</button>
          <button onClick={() => this.handleSuperSmart()}>Hard</button>
        </div>
        Guessed Letters:
        <h1> {this.state.letters} </h1>
        <br />
        <br />
        <br />
        <Alphabet choosenLetters={this.state.letters} onClick={this.handleClick} />
        {/* <Input onHandleCheckLetter={this.handleCheckLetter} onHandleChange={this.handleChange} /> */}
      </div>
    );
  }
}

export default App;






















