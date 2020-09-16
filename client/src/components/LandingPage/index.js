import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBSmoothScroll,
} from "mdbreact";
import "./style.css";
import "../../assets/font/stylesheet.css";
import calendar from "../../assets/images/calendar.png";
import logoWhite from "../../assets/images/logo-white.png";
import correctWhite from "../../assets/images/correct-white.png";
import Features from "../Features";
import SignUpModal from "../SignUpModal/index";
import LoginModal from "../LoginModal/index";

class LandingPage extends React.Component {
  state = {
    collapsed: false,
    showSignUpModal: false,
    showLoginModal: false,
  };

  handleTogglerClick = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  onSignUpClick = () => {
    this.setState({ showSignUpModal: !this.state.showSignUpModal });
  };
  onLoginClick = () => {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  };

  componentDidMount() {
    document.querySelector("nav").style.height = "65px";
  }

  componentWillUnmount() {
    document.querySelector("nav").style.height = "auto";
  }

  render() {
    const { collapsed } = this.state;

    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
      <div id="apppage">
        <div>
          {this.state.showSignUpModal && (
            <SignUpModal
              toggle={this.onSignUpClick}
              isOpen={this.state.showSignUpModal}
            />
          )}
          {this.state.showLoginModal && (
            <LoginModal
              toggle={this.onLoginClick}
              isOpen={this.state.showLoginModal}
            />
          )}
          <MDBNavbar
            color="primary-color"
            dark
            expand="md"
            fixed="top"
            scrolling
            transparent
          >
            <MDBContainer>
              <MDBNavbarBrand>
                <img
                  src={correctWhite}
                  alt="checkmark"
                  style={{ width: "45px", height: "45px" }}
                />
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.handleTogglerClick} />
              <MDBCollapse isOpen={collapsed} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink
                      to="/"
                      style={{ fontFamily: "kollektifregular" }}
                    >
                      Home
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      to="/about"
                      style={{ fontFamily: "kollektifregular" }}
                    >
                      About
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      to="/support"
                      style={{ fontFamily: "kollektifregular" }}
                    >
                      Support
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBBtn
                      outline
                      color="white"
                      style={{ fontFamily: "kollektifregular" }}
                      onClick={this.onLoginClick}
                    >
                      Log In
                    </MDBBtn>

                    <MDBBtn
                      color="white"
                      style={{ fontFamily: "kollektifregular" }}
                      onClick={this.onSignUpClick}
                    >
                      Sign Up
                    </MDBBtn>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          {collapsed && overlay}
        </div>

        <MDBView>
          <MDBMask className="white-text gradient" />
          <MDBContainer
            style={{ height: "100%", width: "100%", paddingTop: "10rem" }}
            className="d-flex justify-content-center white-text align-items-center"
          >
            <MDBRow>
              <MDBCol md="6" className="text-center text-md-left mt-xl-5 mb-5">
                <MDBAnimation type="fadeInLeft" delay=".3s">
                  <img
                    src={logoWhite}
                    alt="logo"
                    className="img-fluid"
                    style={{ width: "400px", height: "150px" }}
                  />

                  <hr className="hr-light" />

                  <h4
                    className="mb-4"
                    style={{ fontFamily: "kollektifregular" }}
                  >
                    We know how important it is to keep your student life in
                    check. Our budget tracker, lists and homework calendar keep
                    you on track to graduate.
                  </h4>
                  {/* <MDBBtn color='white'>Download</MDBBtn> */}
                  <MDBSmoothScroll to="firstFeature">
                    <MDBBtn
                      outline
                      color="white"
                      style={{ fontFamily: "kollektifregular" }}
                    >
                      Learn More
                    </MDBBtn>
                  </MDBSmoothScroll>
                </MDBAnimation>
              </MDBCol>

              <MDBCol md="6" xl="5" className="mt-xl-5">
                <MDBAnimation type="fadeInRight" delay=".3s">
                  <img
                    src={calendar}
                    alt="school icon"
                    className="img-fluid"
                    style={{
                      width: "380px",
                      height: "380px",
                      marginLeft: "50px",
                    }}
                  />
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>
        <MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <Features />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div
          className="footer-copyright text-center text-white py-3"
          style={{ backgroundColor: "#4285f4", fontFamily: "kollektifregular" }}
        >
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright{" "}
            <img
              src={logoWhite}
              alt="logo"
              style={{ width: "80px", height: "30px", marginBottom: "5px" }}
            />
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default LandingPage;
