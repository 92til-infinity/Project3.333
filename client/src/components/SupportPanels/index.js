import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardGroup,
  MDBContainer,
  MDBSmoothScroll,
} from 'mdbreact';
import rocket from '../../assets/images/rocket.png';
import mail from '../../assets/images/mail.png';
import faq from '../../assets/images/faq.png';

const SupportPanels = () => {
  return (
    <MDBContainer>
      <MDBCardGroup deck>
        <MDBCard>
          <MDBSmoothScroll to='gettingStarted'>
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
          </MDBSmoothScroll>
        </MDBCard>

        <MDBCard>
          <MDBSmoothScroll to='faqs'>
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
          </MDBSmoothScroll>
        </MDBCard>
        <MDBCard>
          <MDBSmoothScroll to='contactUs'>
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
          </MDBSmoothScroll>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
};

export default SupportPanels;
