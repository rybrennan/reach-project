import React from "react";


class Input extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <input type='text' onChange={this.props.onHandleChange} name='guessedLetter' />
        <button onClick={() => this.props.onHandleCheckLetter()}>Check</button>
      </div>
    )
  }
}
export default Input;


