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
import { v4 as uuidv4 } from "uuid";

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
      starthour: 12,
      startminute: 0,
      endhour: 12,
      endminute: 0,
    };
  }

  handleChange = (index, value) => {
    this.setState({ [index]: value });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  createEvent = () => {
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
      default:
        backgroundColor = "yellow";
        break;
    }
    let { date, title, allDay, start, end, category, notes } = this.state;

    const newEvent = {
      id: uuidv4(),
      date,
      title,
      allDay,
      start: `${date}T${start}`,
      end: `${date}T${end}`,
      category,
      notes,
      backgroundColor,
    };
    this.props.addEvent(newEvent);
    this.props.toggle();
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.isOpen} centered>
          <MDBModalHeader>Create an Event</MDBModalHeader>
          <MDBModalBody>
            <MDBInput label="Title" name="title" onChange={this.onChange} />
            <AllDayToggle
              setAllDay={this.handleChange}
              allDay={this.state.allDay}
            />
            <TimePicker
              setTime={this.handleChange}
              startHour={this.state.starthour}
              startMinute={this.state.startminute}
              endHour={this.state.endhour}
              endMinute={this.state.endminute}
            />
            <EventCategoryButtons setCategory={this.handleChange} />
            <MDBInput
              type="textarea"
              label="Notes"
              name="notes"
              rows="3"
              onChange={this.onChange}
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.props.toggle}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.createEvent}>
              Save
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default CalendarModal;
