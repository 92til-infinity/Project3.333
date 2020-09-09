import React from "react";
import ChatPage from "../ChatPage";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  MDBInput,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBSideNavItem,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBContainer,
} from "mdbreact";
import logoWhite from "../../assets/images/logo-white.png";
import "./style.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false,
      breakWidth: 1300,
      windowWidth: 0,
      showChat: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () =>
    this.setState({
      windowWidth: window.innerWidth,
    });

  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA,
    });
  };

  handleChatClick = () => {
    console.log("working");
    this.setState({
      showChat: true,
    });
  };

  handleSignOutClick = () => {
    localStorage.removeItem("token");
  };

  render() {
    const navStyle = {
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "210px" : "16px",
      backgroundColor: "#4285f4",
      fontFamily: "kollektifregular",
    };

    const mainStyle = {
      margin: "0 6%",
      paddingTop: "5.5rem",
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "240px" : "0",
    };

    const specialCaseNavbarStyles = {
      WebkitBoxOrient: "horizontal",
      flexDirection: "row",
    };

    return (
      <Router>
        <div className="fixed-sn light-blue-skin">
          <MDBSideNav
            logo={logoWhite}
            triggerOpening={this.state.toggleStateA}
            breakWidth={this.state.breakWidth}
            className="gradient"
            mask="strong"
            fixed
          >
            <li>
              <ul className="social">
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="pinterest" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="google-plus-g" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="twitter" />
                  </a>
                </li>
              </ul>
            </li>
            {/* <MDBInput
              type='text'
              hint='Search'
              style={{
                color: '#fff',
                padding: '0 10px 8px 30px',
                boxSizing: 'border-box',
              }}
            /> */}
            <MDBSideNavNav>
              <Link to="/budget">
                <MDBSideNavCat
                  name="Budget"
                  id="submit-blog-cat"
                  icon="dollar-sign"
                  className="sideNavLink"
                >
                  {/* <MDBSideNavItem class='sideNavLink'>Overview</MDBSideNavItem>
                <MDBSideNavItem class='sideNavLink'>
                  Create a New Budget
                </MDBSideNavItem> */}
                </MDBSideNavCat>
              </Link>
              <Link to="/calendar">
                <MDBSideNavCat
                  iconRegular
                  name="Calendar"
                  id="instruction-cat"
                  icon="calendar"
                  className="sideNavLink"
                />
              </Link>
              <Link to="/todo">
                <MDBSideNavCat
                  name="To Do"
                  id="about-cat"
                  icon="list"
                  className="sideNavLink"
                />
              </Link>

              <MDBSideNavCat
                name="Chat"
                id="contact-me-cat"
                icon="comment"
                className="sideNavLink"
                onClick={this.handleChatClick}
              />
            </MDBSideNavNav>
          </MDBSideNav>
          <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
            <MDBNavbarNav left>
              <MDBNavItem>
                <div
                  onClick={this.handleToggleClickA}
                  key="sideNavToggleA"
                  style={{
                    lineHeight: "32px",
                    marginRight: "1em",
                    verticalAlign: "middle",
                  }}
                >
                  <MDBIcon icon="bars" color="white" size="2x" />
                </div>
              </MDBNavItem>
              <MDBNavItem
                className="d-none d-md-inline"
                style={{ paddingTop: 5 }}
              >
                Student Dashboard
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right style={specialCaseNavbarStyles}>
              {/* <MDBNavItem active>
                <MDBNavLink to='#!'>
                  <MDBIcon icon='envelope' className='d-inline-inline' />{' '}
                  <div className='d-none d-md-inline'>Contact</div>
                </MDBNavLink>
              </MDBNavItem> */}
              <MDBNavItem>
                <MDBNavLink to="#!">
                  <MDBIcon far icon="comments" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Support</div>
                </MDBNavLink>
              </MDBNavItem>
              {/* <MDBNavItem>
                <MDBNavLink to='#!'>
                  <MDBIcon icon='user' className='d-inline-inline' />{' '}
                  <div className='d-none d-md-inline'>Account</div>
                </MDBNavLink>
              </MDBNavItem> */}
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" className="d-inline-inline" />{" "}
                    <div className="d-none d-md-inline">Account</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                    <MDBDropdownItem
                      href="/login"
                      onClick={this.handleSignOutClick}
                    >
                      Sign Out
                    </MDBDropdownItem>
                    {/* <MDBDropdownItem href='#!'>
                      Something else here
                    </MDBDropdownItem> */}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBNavbar>
          <main style={mainStyle}>
            <MDBContainer
              fluid
              style={{ height: 800, width: "100%" }}
              className="m-0"
            >
              {/* {this.state.showChat && <ChatPage />} */}
            </MDBContainer>
          </main>
        </div>
      </Router>
    );
  }
}

export default Dashboard;
