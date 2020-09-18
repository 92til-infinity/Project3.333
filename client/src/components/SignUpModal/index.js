import React, { Component } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import "./style.css";
import SignUpForm from "../SignUpForm";

class SignUpModal extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.isOpenSignUp} centered>
          <MDBModalHeader toggle={this.props.toggleSignUp}>
            Sign Up
          </MDBModalHeader>
          <MDBModalBody>
            <SignUpForm
              toggleSignUp={this.props.toggleSignUp}
              toggleLogin={this.props.toggleLogin}
              isOpenSignUp={this.props.isOpenSignUp}
              isOpenLogin={this.props.isOpenLogin}
            />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default SignUpModal;
