import React from "react";
import ChatPage from "../ChatPage";
import TodoPage from "../TodoPage";
import CalendarPage from "../CalendarPage";
import BudgetPage from "../BudgetPage";
import UserContext from "../../utils/UserContext";
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
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false,
      breakWidth: 1300,
      windowWidth: 0,
      showChat: false,
      showTodo: false,
      showCalendar: false,
      showBudget: false,
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
    console.log("working from nav cat");
    this.setState({
      showChat: true,
      showBudget: false,
      showCalendar: false,
      showTodo: false,
    });
  };

  handleTodoClick = () => {
    console.log("working from nav cat");
    this.setState({
      showChat: false,
      showBudget: false,
      showCalendar: false,
      showTodo: true,
    });
  };

  handleCalendarClick = () => {
    console.log("working from nav cat");
    this.setState({
      showChat: false,
      showBudget: false,
      showCalendar: true,
      showTodo: false,
    });
  };

  handleBudgetClick = () => {
    console.log("working from nav cat");
    this.setState({
      showChat: false,
      showBudget: true,
      showCalendar: false,
      showTodo: false,
    });
  };

  handleSignOutClick = () => {
    localStorage.removeItem("token");
  };

  render() {
    const { user } = this.context;

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

                <a href='#!'>
                  <MDBIcon fab icon='github' />

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
            <MDBSideNavItem
              name="Budget"
              id="submit-blog-cat"
              icon="dollar-sign"
              className="sideNavLink"
            >
              <div name="Budget" onClick={this.handleBudgetClick}>
                Budget
              </div>
            </MDBSideNavItem>
            <MDBSideNavItem
              name="Calendar"
              id="instruction-cat"
              icon="calendar"
              className="sideNavLink"
            >
              <div name="Calendar" onClick={this.handleCalendarClick}>
                Calendar
              </div>
            </MDBSideNavItem>
            <MDBSideNavItem
              name="To Do"
              id="about-cat"
              icon="list"
              className="sideNavLink"
            >
              <div name="Todo" onClick={this.handleTodoClick}>
                Todo
              </div>
            </MDBSideNavItem>

            <MDBSideNavItem
              name="Chat"
              id="contact-me-cat"
              icon="comment"
              className="sideNavLink"
            >
              <div name="Chat" onClick={this.handleChatClick}>
                Chat
              </div>
            </MDBSideNavItem>
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
              {/* Student Dashboard */}
              {user.firstname} {user.lastname}'s Dashboard
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
                  <MDBDropdownItem href="/" onClick={this.handleSignOutClick}>
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
            {this.state.showChat && <ChatPage />}

            {this.state.showTodo && <TodoPage />}

            {this.state.showCalendar && <CalendarPage />}

            {this.state.showBudget && <BudgetPage />}
          </MDBContainer>
        </main>
      </div>
    );
  }
}

export default Dashboard;
