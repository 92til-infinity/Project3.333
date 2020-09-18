import React from 'react';
import { Link } from 'react-router-dom';
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
} from 'mdbreact';
import '../../assets/font/stylesheet.css';
import logoWhite from '../../assets/images/logo-white.png';
import correctWhite from '../../assets/images/correct-white.png';
import SupportPanels from '../SupportPanels';
import SignUpModal from '../SignUpModal/index';
import LoginModal from '../LoginModal/index';

class SupportPage extends React.Component {
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
    document.querySelector('nav').style.height = '65px';
  }

  componentWillUnmount() {
    document.querySelector('nav').style.height = 'auto';
  }

  render() {
    const { collapsed } = this.state;

    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
      <div id='apppage'>
        <div>
          {this.state.showSignUpModal && (
            <SignUpModal toggle={this.state.showSignUpModal} />
          )}
          {this.state.showLoginModal && (
            <LoginModal toggle={this.state.showLoginModal} />
          )}
          <MDBNavbar
            color='primary-color'
            dark
            expand='md'
            fixed='top'
            scrolling
            transparent
          >
            <MDBContainer>
              <MDBNavbarBrand>
                <Link to='/'>
                  <img
                    src={correctWhite}
                    alt='checkmark'
                    style={{ width: '45px', height: '45px' }}
                  />
                </Link>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.handleTogglerClick} />
              <MDBCollapse isOpen={collapsed} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <MDBNavLink
                      to='/'
                      style={{ fontFamily: 'kollektifregular' }}
                    >
                      Home
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      to='/about'
                      style={{ fontFamily: 'kollektifregular' }}
                    >
                      About
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active>
                    <MDBNavLink
                      to='/support'
                      style={{ fontFamily: 'kollektifregular' }}
                    >
                      Support
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBBtn
                      outline
                      color='white'
                      style={{ fontFamily: 'kollektifregular' }}
                      onClick={this.onLoginClick}
                    >
                      Log In
                    </MDBBtn>

                    <MDBBtn
                      color='white'
                      style={{ fontFamily: 'kollektifregular' }}
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
          <MDBMask className='white-text gradient' style={{ height: '40%' }} />
          <MDBContainer
            style={{ height: '40%', width: '100%', paddingTop: '8rem' }}
            className='d-flex justify-content-center white-text align-items-center'
          >
            <MDBRow>
              <MDBCol md='12' className='text-center mb-5'>
                <h1
                  className='h1-responsive text-center font-weight-bold'
                  style={{ color: '#ffffff' }}
                >
                  What can we help you with?
                </h1>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBContainer>
            <MDBRow>
              <MDBCol md='12' className='text-center pt-4 pb-lg-n5 mt-lg-5'>
                <h3 className='h3-responsive text-center my-4 pb-5'>
                  <span className='font-weight-bold'>
                    Click on a topic below
                  </span>{' '}
                  to get the support you need.
                </h3>
                <SupportPanels />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>

        <div
          className='footer-copyright text-center text-white py-3'
          style={{ backgroundColor: '#4285f4', fontFamily: 'kollektifregular' }}
        >
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright{' '}
            <img
              src={logoWhite}
              alt='logo'
              style={{ width: '80px', height: '30px', marginBottom: '5px' }}
            />
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default SupportPage;
