import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardGroup,
  MDBContainer,
} from 'mdbreact';
import rocket from '../../assets/images/rocket.png';
import mail from '../../assets/images/mail.png';
import faq from '../../assets/images/faq.png';

const SupportPanels = () => {
  return (
    <MDBContainer>
      <MDBCardGroup deck>
        <MDBCard>
          <MDBCardBody className='align-self-center'>
            <img
              src={rocket}
              alt='rocket icon'
              style={{
                width: '100px',
                height: '100px',
                display: 'initial',
                padding: '10px',
              }}
            />

            <MDBCardTitle tag='h5' className='p-4'>
              Getting Started
            </MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardBody className='align-self-center'>
            <img
              src={faq}
              alt='faq icon'
              style={{
                width: '100px',
                height: '100px',
                display: 'initial',
                padding: '10px',
              }}
            />

            <MDBCardTitle tag='h5' className='p-4'>
              FAQs
            </MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardBody className='align-self-center'>
            <img
              src={mail}
              alt='email icon'
              style={{
                width: '100px',
                height: '100px',
                display: 'initial',
                padding: '10px',
              }}
            />

            <MDBCardTitle tag='h5' className='p-4'>
              Contact Us
            </MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
};

export default SupportPanels;
