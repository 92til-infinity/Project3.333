import React, { Component } from "react";
import { MDBTimePicker, MDBCol } from "mdbreact";

class TimePicker extends Component {
  componentDidMount() {}

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
        if (time[0] < 12) {
          time[0] = parseInt(time[0]) + 12;
        }
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
          hours={parseInt(this.props.startHour)}
          minutes={parseInt(this.props.startMinute)}
        />
        <MDBTimePicker
          name="end"
          id="timePickerEnd"
          label="Ends"
          vibrate={true}
          getValue={this.getEndPickerValue}
          hours={parseInt(this.props.endHour)}
          minutes={parseInt(this.props.endMinute)}
        />
      </MDBCol>
    );
  }
}

export default TimePicker;
