import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import "./style.css";
import SignUpForm from "../SignUpForm";

class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal14: props.isOpen,
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
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Sign Up</MDBModalHeader>
          <MDBModalBody>
            <SignUpForm
              toggleSignUp={this.props.toggleSignUp}
              toggleLogin={this.props.toggleLogin}
              showSignUpModal={this.props.showSignUpModal}
            />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default SignUpModal;
