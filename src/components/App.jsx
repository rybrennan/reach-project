import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      incorrectLetters: []
    }

    this.handleClearAll = this.handleClearAll.bind(this);
  }

  handleClearAll() {
    this.setState({
      secretWord: ''
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={() => this.handleClearAll()}>Clear All</button>
        </div>
        <h1> {this.state.secretWord} </h1>
      </div>
    );
  }
}


export default App;