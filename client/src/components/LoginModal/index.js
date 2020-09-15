import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import LoginForm from "../LoginForm";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal20: props.isOpen,
    };
  }

  toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.state.modal20} centered>
          <MDBModalHeader toggle={this.toggle(20)}>Login</MDBModalHeader>
          <MDBModalBody>
            <LoginForm toggle={this.props.toggle} />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default LoginModal;
