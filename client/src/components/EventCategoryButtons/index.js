import React, { Component } from 'react';
import { MDBContainer, MDBInput } from 'mdbreact';

class EventCategoryButtons extends Component {
  state = {
    radio: 2,
  };

  onClick = (nr) => () => {
    this.setState({
      radio: nr,
    });
  };

  render() {
    return (
      <MDBContainer>
        <MDBInput
          onClick={this.onClick(1)}
          checked={this.state.radio === 2 ? true : false}
          label='Class'
          type='radio'
          id='radio1'
        />
        <MDBInput
          onClick={this.onClick(3)}
          checked={this.state.radio === 3 ? true : false}
          label='Homework'
          type='radio'
          id='radio2'
        />
        <MDBInput
          onClick={this.onClick(4)}
          checked={this.state.radio === 4 ? true : false}
          label='Test'
          type='radio'
          id='radio3'
        />
        <MDBInput
          onClick={this.onClick(5)}
          checked={this.state.radio === 5 ? true : false}
          label='Home'
          type='radio'
          id='radio4'
        />
        <MDBInput
          onClick={this.onClick(6)}
          checked={this.state.radio === 6 ? true : false}
          label='Club'
          type='radio'
          id='radio5'
        />
        <MDBInput
          onClick={this.onClick(7)}
          checked={this.state.radio === 7 ? true : false}
          label='Misc'
          type='radio'
          id='radio6'
        />
      </MDBContainer>
    );
  }
}

export default EventCategoryButtons;
