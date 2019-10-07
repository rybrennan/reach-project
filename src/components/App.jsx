import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      incorrectLetters: []
    }

    // this.handleClearAll = this.handleClearAll.bind(this);
  }

    componentDidMount() {
    //GETS REPOS on Load
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