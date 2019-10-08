import React from "react";
import axios from "axios";
import $ from 'jquery';
import Input from './Input';
import ReactHelpers from '/Users/ryanbrennan/Desktop/repls/linkedin/final/utils/react-helpers.js'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      letters: [],
      guessedLetter: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckLetter = this.handleCheckLetter.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
//HandleChange!!
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckLetter() {
    if (this.state.secretWord.indexOf(this.state.guessedLetter) > -1) {
      if (this.state.letters.includes(this.state.guessedLetter)) {
        alert('You have already picked this letter!');
      } else {
        //start of notes
        //Checking function goes here
        let copyLetters = this.state.letters.concat(this.state.guessedLetter)
        this.setState({
          letters: copyLetters,
        })
      }
    } else {
      //if it is not in the word
      if (this.state.letters.includes(this.state.guessedLetter)) {
        alert('You have already picked this letter!');
      } else {
        let copyLetters = this.state.letters.concat(this.state.guessedLetter)
        this.setState({
          letters: copyLetters,
        })
      }
    }
  }

  handleAjax(setting) {
    let self = this;
    let difficultySetting;
    // Math.floor(Math.random() * (max - min + 1) + min);
    if (setting === 'easy') {
      difficultySetting = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    } else if (setting === 'medium') {
      difficultySetting = Math.floor(Math.random() * (7 - 5 + 1) + 5);
    } else {
      difficultySetting = Math.floor(Math.random() * (10 - 8 + 1) + 8);
    }
    console.log(difficultySetting)

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
          mappedWord: wordsArray[1]
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
        <Input onHandleCheckLetter={this.handleCheckLetter} onHandleChange={this.handleChange}/>
      </div>
    );
  }
}

export default App;



















