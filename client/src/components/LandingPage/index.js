import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
} from 'mdbreact';
import './style.css';
import '../../assets/font/stylesheet.css';
import teacher from '../../assets/images/teacher.png';
import logoWhite from '../../assets/images/logo-white.png';
import correctWhite from '../../assets/images/correct-white.png';
import Features from '../Features';

class LandingPage extends React.Component {
  state = {
    collapsed: false,
  };

  handleTogglerClick = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
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
        <Router>
          <div>
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
                  <img
                    src={correctWhite}
                    alt='checkmark'
                    style={{ width: '45px', height: '45px' }}
                  />
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.handleTogglerClick} />
                <MDBCollapse isOpen={collapsed} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink
                        to='#!'
                        style={{ fontFamily: 'kollektifregular' }}
                      >
                        Home
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        to='#!'
                        style={{ fontFamily: 'kollektifregular' }}
                      >
                        About
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        to='#!'
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
                      >
                        Log In
                      </MDBBtn>
                      <MDBBtn
                        color='white'
                        style={{ fontFamily: 'kollektifregular' }}
                      >
                        Sign Up
                      </MDBBtn>
                      {/* <MDBFormInline waves>
                        <div className='md-form my-0'>
                          <input
                            className='form-control mr-sm-2'
                            type='text'
                            placeholder='Search'
                            aria-label='Search'
                          />
                        </div>
                      </MDBFormInline> */}
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {collapsed && overlay}
          </div>
        </Router>
        <MDBView>
          <MDBMask className='white-text gradient' />
          <MDBContainer
            style={{ height: '100%', width: '100%', paddingTop: '10rem' }}
            className='d-flex justify-content-center white-text align-items-center'
          >
            <MDBRow>
              <MDBCol md='6' className='text-center text-md-left mt-xl-5 mb-5'>
                <MDBAnimation type='fadeInLeft' delay='.3s'>
                  <img
                    src={logoWhite}
                    alt='logo'
                    className='img-fluid'
                    style={{ width: '400px', height: '150px' }}
                  />

                  {/* <h1 className='h1-responsive font-weight-bold mt-sm-5'>
                    Make purchases with our app
                  </h1> */}
                  <hr className='hr-light' />
                  <h4
                    className='mb-4'
                    style={{ fontFamily: 'kollektifregular' }}
                  >
                    We know how important it is to keep your student life in
                    check. Our budget tracker, lists and homework calendar keep
                    you on track to graduate.
                  </h4>
                  {/* <MDBBtn color='white'>Download</MDBBtn> */}
                  <MDBBtn
                    outline
                    color='white'
                    style={{ fontFamily: 'kollektifregular' }}
                  >
                    Learn More
                  </MDBBtn>
                </MDBAnimation>
              </MDBCol>

              <MDBCol md='6' xl='5' className='mt-xl-5'>
                <MDBAnimation type='fadeInRight' delay='.3s'>
                  <img
                    src={teacher}
                    alt='teaching icon'
                    className='img-fluid'
                    style={{ width: '380px', height: '380px' }}
                  />
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>
        <MDBContainer>
          <MDBRow className='py-5'>
            <MDBCol md='12' className='text-center'>
              <Features />
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p> */}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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

export default LandingPage;