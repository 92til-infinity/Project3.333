import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";
import AllDayToggle from "../AllDayToggle";
import TimePicker from "../TimePicker";
import EventCategoryButtons from "../EventCategoryButtons";

class CalendarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      allDay: false,
      start: "",
      end: "",
      category: "Class",
      notes: "",
    };
  }

  handleChange = (index, value) => {
    this.setState({ [index]: value });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const isEnabled = this.state.allDay;
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.isOpen} centered>
          <MDBModalHeader toggle={this.props.toggle}>
            Create an Event
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput label="Title" name="title" onChange={this.onChange} />
            <AllDayToggle setAllDay={this.handleChange} />
            <TimePicker setTime={this.handleChange} disabled={!isEnabled} />
            <EventCategoryButtons setCategory={this.handleChange} />
            <MDBInput
              type="textarea"
              label="Notes"
              name="notes"
              rows="3"
              onChange={this.onChange}
            />
            ;
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.props.toggle}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.props.toggle}>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default CalendarModal;
