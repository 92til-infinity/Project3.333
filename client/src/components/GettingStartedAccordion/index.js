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

class GettingStartedAccordion extends Component {
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
              <span className='white-text font-weight-bold'>
                Budgets and Expenses
              </span>
            </MDBCollapseHeader>
            <MDBCollapse id='collapse1' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Manage your money.
                    </h2>
                    <p>
                      With our Budgets and Expenses management system, you can easily keep track
                      of your expenses and fulfil your budgeting strategy.
                    </p>
                    <p className='mb-0 '>
                      Here is a short video demonstrating our unique features on Budgets and Expenses.
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
              <span className='white-text font-weight-bold'>
                Event Calendar
              </span>
            </MDBCollapseHeader>
            <MDBCollapse id='collapse2' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Stay on track.
                    </h2>
                    <p>
                      With our Calendar Events management system, you can efficently add events/tasks to your
                      calendar to keep you on track.
                    </p>
                    <p className='mb-0 '>
                      Here is a short video demonstrating our unique features on our Event Calendar.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid'
                        src=''
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
              <span className='white-text font-weight-bold'>
                Daily Todos'
              </span>
            </MDBCollapseHeader>
            <MDBCollapse id='collapse3' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Stay organized.
                    </h2>
                    <p>
                      With our Daily Todos' management system, you can easily organize your
                      day-to-day responsibilities to keep your organized.
                    </p>
                    <p className='mb-0 '>
                      Here is a short video demonstrating our unique features on Daily Todo's.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid'
                        src=''
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

export default GettingStartedAccordion;
