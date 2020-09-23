import React, { Component } from "react";
import UserContext from "../../utils/UserContext";
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
import API from "../../utils/API";

class CalendarModal extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
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

  createEvent = () => {
    const { user } = this.context;
    let eventContainer = user.activities;
    let backgroundColor;
    switch (this.state.category) {
      case "Class":
        backgroundColor = "blue";
        break;
      case "Homework":
        backgroundColor = "red";
        break;
      case "Test":
        backgroundColor = "black";
        break;
      case "Meeting":
        backgroundColor = "orange";
        break;
      case "Appointment":
        backgroundColor = "green";
        break;
      case "Other":
        backgroundColor = "purple";
        break;
    }
    let { date, title, allDay, start, end, category, notes } = this.state;

    const newEvent = {
      date,
      title,
      allDay,
      start: `${date}T${start}`,
      end: `${date}T${end}`,
      category,
      notes,
      backgroundColor,
    };
    eventContainer.push(newEvent);
    API.setActivities(eventContainer);
    this.props.toggle();
  };

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
            <MDBBtn color="primary" onClick={this.createEvent}>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default CalendarModal;
