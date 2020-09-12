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
      modal20: props.toggle,
      showModal: true,
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
        <MDBModal isOpen={this.state.modal20} toggle={this.toggle(20)} centered>
          <MDBModalHeader toggle={this.toggle(20)}>Login</MDBModalHeader>
          <MDBModalBody>
            <LoginForm />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default LoginModal;
