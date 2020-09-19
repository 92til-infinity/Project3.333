import React, { Component } from 'react';
import { MDBTimePicker, MDBCol } from 'mdbreact';

class TimePicker extends Component {
  getPickerValue = (value) => {
    console.log(value);
  };

  render() {
    return (
      <MDBCol md='3' className='d-inline'>
        <MDBTimePicker
          id='timePicker'
          label='Starts'
          getValue={this.getPickerValue}
        />
        <MDBTimePicker
          id='timePicker'
          label='Ends'
          getValue={this.getPickerValue}
        />
      </MDBCol>
    );
  }
}

export default TimePicker;
