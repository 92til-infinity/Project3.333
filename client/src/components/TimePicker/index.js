import React, { Component } from "react";
import { MDBTimePicker, MDBCol } from "mdbreact";

class TimePicker extends Component {
  // Get Start time value, and send to state in CalendarModal
  getStartPickerValue = (value) => {
    this.props.setTime("start", value);
  };

  // Get End time value, and send to state in CalendarModal
  getEndPickerValue = (value) => {
    this.props.setTime("end", value);
  };

  render() {
    return (
      <MDBCol md="3" className="d-inline">
        <MDBTimePicker
          name="start"
          id="timePicker"
          label="Starts"
          getValue={this.getStartPickerValue}
        />
        <MDBTimePicker
          name="end"
          id="timePicker"
          label="Ends"
          getValue={this.getEndPickerValue}
        />
      </MDBCol>
    );
  }
}

export default TimePicker;
