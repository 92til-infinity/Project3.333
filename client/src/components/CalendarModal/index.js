import React, { Component } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import "./style.css";

class SignUpModal extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.isOpenSignUp} centered>
          <MDBModalHeader toggle={this.props.toggleSignUp}>
            Sign Up
          </MDBModalHeader>
          <MDBModalBody>
            <MDBContainer>
              <MDBRow className="text-left">
                <MDBCol md="12">
                  <form onSubmit={(e) => onUserSubmit(e)}>
                    <div className="grey-text">
                      <MDBInput
                        label="Title"
                        icon="user"
                        group
                        type="text"
                        name="firstname"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => onUserChange(e)}
                      />
                      <MDBInput
                        label="Your last name"
                        icon="user"
                        group
                        type="text"
                        name="lastname"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => onUserChange(e)}
                      />
                      <MDBInput
                        label="Your email"
                        icon="envelope"
                        group
                        type="email"
                        name="email"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => onUserChange(e)}
                      />
                      <MDBInput
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        name="password"
                        validate
                        onChange={(e) => onUserChange(e)}
                        minLength="6"
                      />
                    </div>
                    <div className="text-center">
                      {isRegistered && (
                        <div>
                          <h6 style={{ color: "red" }}>
                            User already registered! Click
                            <a
                              onClick={onLoginClick}
                              style={{ textDecoration: "underline" }}
                            >
                              {" "}
                              Here{" "}
                            </a>{" "}
                            to login!
                          </h6>
                        </div>
                      )}
                      <MDBBtn type="submit" color="primary">
                        Register
                      </MDBBtn>
                    </div>
                  </form>
                  {isOpenLogin && (
                    <LoginModal
                      // toggleLogin={toggleLogin}
                      isOpen={isOpenLogin}
                    />
                  )}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default SignUpModal;
