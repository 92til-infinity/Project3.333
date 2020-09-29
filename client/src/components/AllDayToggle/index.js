import React, { Component } from "react";

class AllDayToggle extends Component {
  state = {
    switch1: this.props.allDay,
  };
  handleSwitchChange = (nr) => () => {
    let switchNumber = `switch${nr}`;
    this.props.setAllDay("allDay", !this.state[switchNumber]);
    this.setState({
      [switchNumber]: !this.state[switchNumber],
    });
  };

  render() {
    return (
      <div className="custom-control custom-switch d-flex">
        <input
          type="checkbox"
          className="custom-control-input text-left"
          id="customSwitches"
          checked={this.state.switch1}
          onChange={this.handleSwitchChange(1)}
          readOnly
        />
        <label className="custom-control-label" htmlFor="customSwitches">
          All-day
        </label>
      </div>
    );
  }
}

export default AllDayToggle;
