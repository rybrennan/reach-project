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

    this.handleEasy = this.handleEasy.bind(this);
  }

  handleEasy() {
    console.log('in handleEasy AJAX33')
    let difficultySetting = Math.floor(Math.random() * (4 - 1)) + 1;
    const params = {
      difficultySetting: difficultySetting
    };
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://localhost:3000/difficulty',
      type: 'GET',
      data: JSON.stringify(difficultySetting),
      contentType: 'application/json',
      success: function (data) {
        console.log('Successfully Queried handleEasy', data);
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



