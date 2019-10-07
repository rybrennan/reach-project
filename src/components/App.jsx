import React from "react";
import axios from "axios";
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      incorrectLetters: []
    }

    this.handleEasy = this.handleEasy.bind(this);
  }


  componentDidMount() {
    fetch('/all')
      .then(response => response.json())
      .then((word) => {
        console.log(typeof word)
        this.setState({
          secretWord: word
        })
      })
      .catch((err) => {
        console.log('We have an error, ', err)
      })
  }

  handleEasy() {
    let difficultySetting = Math.floor(Math.random() * (4 - 1)) + 1;
    let self = this;

    $.ajax({
      url: 'http://localhost:3000/difficulty',
      type: 'GET',
      dataType: 'json',
      data: JSON.stringify(difficultySetting),
      contentType: 'application/json',
      success: function (easyWord) {
        self.setState({
          secretWord: easyWord
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
          </div>
          <h1> {this.state.secretWord} </h1>
        </div>
      );
    }
  }

  export default App;







