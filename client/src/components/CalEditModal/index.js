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

class CalEditModal extends Component {
  static contextType = UserContext;

  state = {
    id: this.props.eventInfo.id,
    date: this.props.eventInfo.date,
    title: this.props.eventInfo.title,
    notes: this.props.eventInfo.notes,
    category: this.props.eventInfo.category,
    radio: this.props.eventInfo.radio,
    allDay: this.props.eventInfo.allDay,
    starthour: 12,
    startminute: 0,
    endhour: 12,
    endminute: 0,
  };

  componentDidMount() {
    if (this.state.allDay == false) {
      let starttime = this.props.eventInfo.startStr.split("T");
      this.setState({ date: starttime[0] });

      let start = starttime[1].split(":");
      if (start[1] == "00") {
        start[1] = 0;
      }
      this.setState({ starthour: start[0], startminute: start[1] });

      let endtime = this.props.eventInfo.endStr.split("T");
      let end = endtime[1].split(":");
      if (end[1] == "00") {
        end[1] = 0;
      }
      this.setState({ endhour: end[0], endminute: end[1] });
    }
  }

  handleChange = (index, value) => {
    this.setState({ [index]: value });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  convertTime = (dateStr) => {
    const hours = dateStr.getHours();
    const minutes = dateStr.getMinutes();
    return hours + ":" + minutes;
  };

  editEvent = async () => {
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

    let { id, date, title, allDay, start, end, category, notes } = this.state;

    const updatedEvent = {
      id,
      date,
      title,
      allDay,
      start: `${date}T${start}`,
      end: `${date}T${end}`,
      category,
      notes,
      backgroundColor,
      editable: false,
    };
    // API.updateEvent(this.props.eventInfo.id, updatedEvent);
    await this.props.deleteEvent(this.props.eventInfo.id);
    await this.props.addEvent(updatedEvent);
    this.props.toggle();
  };

  deleteEvent = (e) => {
    e.preventDefault();
    this.props.deleteEvent(this.props.eventInfo.id);
    this.props.toggle();
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.isOpen} centered>
          <MDBModalHeader toggle={this.props.toggle}>
            Edit an Event
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput
              label="Title"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            />
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
            <EventCategoryButtons
              setCategory={this.handleChange}
              class={this.state.category}
              radio={this.state.radio}
            />
            <MDBInput
              type="textarea"
              label="Notes"
              name="notes"
              rows="3"
              onChange={this.onChange}
              value={this.state.notes}
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.props.toggle}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.editEvent}>
              Save Changes
            </MDBBtn>
            <MDBBtn color="danger" onClick={this.deleteEvent}>
              Delete
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default CalEditModal;
