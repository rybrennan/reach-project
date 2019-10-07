import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      incorrectLetters: []
    }
  }
  render() {
    return(
      <div className="App">
        <h1> {this.state.secretWord} </h1>
      </div>
    );
  }
}


export default App;