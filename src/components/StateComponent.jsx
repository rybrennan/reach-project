import React from "react";

var StateComponent = React.createClass({

  resetName: function (event) {
    this.setState({
      name: ''
    });
  },
  render: function () {
    return (
      <div>
        <input type="text" value={this.state.name} />
        <button onClick={this.resetName}>Reset</button>
      </div>
    )
  }
});

export default StateComponent;






