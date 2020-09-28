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
import { getTime } from "date-fns";

class CalEditModal extends Component {
    static contextType = UserContext;

    state = {
        title: this.props.eventInfo.title,
        notes: this.props.eventInfo.notes,
        category: this.props.eventInfo.category,
        radio: this.props.eventInfo.radio,
        allDay: this.props.eventInfo.allDay,
        start: this.props.eventInfo.start
    };

    componentDidMount() {
        this.setState({ start: this.convertTime(this.propse.eventInfo.start) })


    }

    handleChange = (index, value) => {
        this.setState({ [index]: value });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    convertTime = (dateStr) => {
        const hours = dateStr.getHours();
        const minutes = dateStr.getMinutes();
        return (hours + ":" + minutes);
    }

    deleteEvent = (e) => {
        e.preventDefault();
        this.props.deleteEvent(this.props.eventInfo.id)
        this.props.toggle();
    }

    render() {
        console.log(this.props.eventInfo);
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.isOpen} centered>
                    <MDBModalHeader toggle={this.props.toggle}>
                        Edit an Event
          </MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput label="Title" name="title" onChange={this.onChange} value={this.state.title} />
                        <AllDayToggle setAllDay={this.handleChange} allDay={this.state.allDay} />
                        <TimePicker setTime={this.handleChange} end={this.state.end} />
                        <EventCategoryButtons setCategory={this.handleChange} class={this.state.category} radio={this.state.radio} />
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