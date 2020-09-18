import React, { Component } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import LoginForm from "../LoginForm";

class LoginModal extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.isOpenLogin} centered>
          <MDBModalHeader toggle={this.props.toggleLogin}>Login</MDBModalHeader>
          <MDBModalBody>
            <LoginForm
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

export default LoginModal;
