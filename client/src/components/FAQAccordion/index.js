import React, { Component } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBCollapse,
  MDBCard,
  MDBCardBody,
  MDBCollapseHeader,
  MDBCardImage,
  MDBRow,
  MDBView,
} from 'mdbreact';
import './style.css';

class FAQAccordion extends Component {
  state = {
    collapseID: '',
  };

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : '',
    }));

  render() {
    const { collapseID } = this.state;

    return (
      <MDBContainer>
        <MDBContainer className='accordion md-accordion accordion-1'>
          <MDBCard style={{ backgroundColor: 'transparent' }}>
            <MDBCollapseHeader
              onClick={this.toggleCollapse('collapse1')}
              className='z-depth-1'
            >
              <span className='white-text font-weight-bold'>Question</span>
            </MDBCollapseHeader>
            <MDBCollapse id='collapse1' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Hi! I am the first one.
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris
                    </p>
                    <p className='mb-0 '>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid z-depth-1'
                        src='https://mdbootstrap.com/img/Photos/Others/nature.jpeg'
                        alt=''
                      />
                    </MDBView>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard style={{ backgroundColor: 'transparent' }}>
            <MDBCollapseHeader
              onClick={this.toggleCollapse('collapse2')}
              className='z-depth-1'
            >
              <span className='white-text font-weight-bold'>Question</span>
            </MDBCollapseHeader>
            <MDBCollapse id='collapse2' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Hi! I am the second one.
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris
                    </p>
                    <p className='mb-0 '>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid'
                        src='https://mdbootstrap.com/img/Photos/Others/nature.jpeg'
                        alt=''
                      />
                    </MDBView>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard style={{ backgroundColor: 'transparent' }}>
            <MDBCollapseHeader
              onClick={this.toggleCollapse('collapse3')}
              className='z-depth-1'
            >
              <span className='white-text font-weight-bold'>Question</span>
            </MDBCollapseHeader>
            <MDBCollapse id='collapse3' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Hi! I am the third one.
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris
                    </p>
                    <p className='mb-0 '>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid'
                        src='https://mdbootstrap.com/img/Photos/Others/nature.jpeg'
                        alt=''
                      />
                    </MDBView>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>
        </MDBContainer>
      </MDBContainer>
    );
  }
}

export default FAQAccordion;
