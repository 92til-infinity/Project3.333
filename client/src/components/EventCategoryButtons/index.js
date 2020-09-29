import React, { Component } from "react";
import { MDBContainer, MDBInput } from "mdbreact";

class EventCategoryButtons extends Component {
  state = {
    category: this.props.class,
    radio: this.props.radio,
  };

  onClick = (nr, category) => () => {
    this.setState({
      radio: nr,
      category: category,
    });
    this.props.setCategory("category", category);
  };

  render() {
    return (
      <MDBContainer>
        <MDBInput
          onClick={this.onClick(2, "Class")}
          checked={this.state.radio === 2 ? true : false}
          label="Class"
          type="radio"
          id="radio1"
        />
        <MDBInput
          onClick={this.onClick(3, "Homework")}
          checked={this.state.radio === 3 ? true : false}
          label="Homework"
          type="radio"
          id="radio2"
        />
        <MDBInput
          onClick={this.onClick(4, "Test")}
          checked={this.state.radio === 4 ? true : false}
          label="Test"
          type="radio"
          id="radio3"
        />
        <MDBInput
          onClick={this.onClick(5, "Meeting")}
          checked={this.state.radio === 5 ? true : false}
          label="Meeting"
          type="radio"
          id="radio4"
        />
        <MDBInput
          onClick={this.onClick(6, "Appointment")}
          checked={this.state.radio === 6 ? true : false}
          label="Appointment"
          type="radio"
          id="radio5"
        />
        <MDBInput
          onClick={this.onClick(7, "Other")}
          checked={this.state.radio === 7 ? true : false}
          label="Other"
          type="radio"
          id="radio6"
        />
      </MDBContainer>
    );
  }
}

export default EventCategoryButtons;
