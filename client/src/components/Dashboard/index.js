import React from "react";
import TodoPage from "../TodoPage";
import Calendar from "../Calendar";
import BudgetPage from "../BudgetPage";
import Profile from "../Profile";
import JobBoard from "../JobBoard/JobBoard";
import UserContext from "../../utils/UserContext";
import setAuthToken from "../../utils/setAuthToken";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBSideNavItem,
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
      showTodo: true,
      showCalendar: false,
      showBudget: false,
      showProfile: false,
      showJobBoard: false,
      lastEvent: "",
    };
  }

  componentDidMount() {
    this.handleResize();
    setAuthToken(localStorage.token);
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
      showProfile: false,
      showJobBoard: false,
    });
  };

  handleTodoClick = () => {
    console.log("working from nav cat");
    this.setState({
      showChat: false,
      showBudget: false,
      showCalendar: false,
      showTodo: true,
      showProfile: false,
      showJobBoard: false,
    });
  };

  handleCalendarClick = () => {
    console.log("working from nav cat");
    this.setState({
      showChat: false,
      showBudget: false,
      showCalendar: true,
      showTodo: false,
      showProfile: false,
      showJobBoard: false,
    });
  };

  handleBudgetClick = () => {
    console.log("working from nav cat");
    this.setState({
      showChat: false,
      showBudget: true,
      showCalendar: false,
      showTodo: false,
      showProfile: false,
      showJobBoard: false,
    });
  };

  handleProfileClick = () => {
    this.setState({
      showChat: false,
      showBudget: false,
      showCalendar: false,
      showTodo: false,
      showProfile: true,
      showJobBoard: false,
    });
  };

  handleJobBoardClick = () => {
    this.setState({
      showChat: false,
      showBudget: false,
      showCalendar: false,
      showTodo: false,
      showProfile: false,
      showJobBoard: true,
    });
  };
  handleSignOutClick = () => {
    localStorage.removeItem("token");
  };

  handleCalUpdate = (event) => {
    this.setState({ lastEvent: event });
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
                <a href={user.social.facebook}>
                  <MDBIcon fab icon="facebook-f" />
                </a>
              </li>
              <li>
                <a href={user.social.linkedin}>
                  <MDBIcon fab icon="linkedin" />
                </a>
              </li>
              <li>
                <a href={user.social.github}>
                  <MDBIcon fab icon="github" />
                </a>
              </li>
              <li>
                <a href={user.social.twitter}>
                  <MDBIcon fab icon="twitter" />
                </a>
              </li>
            </ul>
          </li>

          <MDBSideNavNav>
            <MDBSideNavItem
              name="Budget"
              id="submit-blog-cat"
              icon="dollar-sign"
              className="sideNavLink"
            >
              <div
                name="Budget"
                onClick={this.handleBudgetClick}
                style={{ fontSize: "17px" }}
              >
                Budget
              </div>
            </MDBSideNavItem>
            <MDBSideNavItem
              name="Calendar"
              id="instruction-cat"
              icon="calendar"
              className="sideNavLink"
            >
              <div
                name="Calendar"
                onClick={this.handleCalendarClick}
                style={{ fontSize: "17px" }}
              >
                Calendar
              </div>
            </MDBSideNavItem>
            <MDBSideNavItem
              name="To Do"
              id="about-cat"
              icon="list"
              className="sideNavLink"
            >
              <div
                name="Todo"
                onClick={this.handleTodoClick}
                style={{ fontSize: "17px" }}
              >
                Todo
              </div>
            </MDBSideNavItem>

            <MDBSideNavItem
              name="Job Board"
              id="jobBoard-cat"
              icon="job"
              className="sideNavLink"
            >
              <div
                name="Job Board"
                onClick={this.handleJobBoardClick}
                style={{ fontSize: "17px" }}
              >
                Job Board
              </div>
            </MDBSideNavItem>

            <MDBSideNavItem
              name="Chat"
              id="contact-me-cat"
              icon="comment"
              className="sideNavLink"
            >
              <div name="Chat" style={{ fontSize: "17px" }}>
                Chat (<em>Coming Soon!</em>)
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
              {user.firstname} {user.lastname}'s Dashboard
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right style={specialCaseNavbarStyles}>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Account</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu right>
                  <MDBDropdownItem onClick={this.handleProfileClick}>
                    Profile
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                  <MDBDropdownItem href="/" onClick={this.handleSignOutClick}>
                    Sign Out
                  </MDBDropdownItem>
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
            {this.state.showTodo && <TodoPage />}

            {this.state.showCalendar && (
              <Calendar update={this.handleCalUpdate} />
            )}

            {this.state.showBudget && <BudgetPage />}

            {this.state.showProfile && <Profile />}

            {this.state.showJobBoard && <JobBoard />}
          </MDBContainer>
        </main>
      </div>
    );
  }
}

export default Dashboard;
