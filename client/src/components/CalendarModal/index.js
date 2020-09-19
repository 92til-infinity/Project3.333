import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from 'mdbreact';
import AllDayToggle from '../AllDayToggle';
import TimePicker from '../TimePicker';
import EventCategoryButtons from '../EventCategoryButtons';
import CalendarTextArea from '../CalendarTextArea';

class CalendarModal extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.isOpen} centered>
          <MDBModalHeader toggle={this.props.toggle}>
            Create an Event
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput label='Title' />
            <AllDayToggle />
            <TimePicker />
            <EventCategoryButtons />
            <CalendarTextArea />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={this.props.toggle}>
              Close
            </MDBBtn>
            <MDBBtn color='primary' onClick={this.props.toggle}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default CalendarModal;
