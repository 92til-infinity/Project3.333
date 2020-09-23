import React, { Component } from "react";
import { MDBTimePicker, MDBCol } from "mdbreact";

class TimePicker extends Component {
  formatTime = (value) => {
    let time = value.split("");
    const ampm = time[time.length - 2];
    switch (ampm) {
      case "A":
        time.pop();
        time.pop();
        return time.join("");
      case "P":
        time.pop();
        time.pop();
        time = time.join("").split(":");
        time[0] = parseInt(time[0]) + 12;
        return time.join(":");
    }
  };
  // Get Start time value, and send to state in CalendarModal
  getStartPickerValue = (value) => {
    this.props.setTime("start", this.formatTime(value));
  };

  // Get End time value, and send to state in CalendarModal
  getEndPickerValue = (value) => {
    this.props.setTime("end", this.formatTime(value));
  };

  render() {
    return (
      <MDBCol md="3" className="d-inline">
        <MDBTimePicker
          name="start"
          id="timePickerStart"
          label="Starts"
          vibrate={true}
          getValue={this.getStartPickerValue}
        />
        <MDBTimePicker
          name="end"
          id="timePickerEnd"
          label="Ends"
          vibrate={true}
          getValue={this.getEndPickerValue}
        />
      </MDBCol>
    );
  }
}

export default TimePicker;
