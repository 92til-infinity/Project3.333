import React, { useState } from 'react';
import {
  toast,
  ToastContainer,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
} from 'mdbreact';
import ContactAlert from '../ContactAlert';

const ContactCard = () => {
  const [emailAlert, setEmailAlert] = useState(false);

  const handleEmailAlert = () => {
    setEmailAlert(true);
    toast.success('Message Received!', {
      closeButton: false,
    });
  };

  return (
    <MDBContainer>
      <h2
        className='h1-responsive font-weight-bold text-center my-5'
        id='contactUs'
      >
        Contact us
      </h2>
      <p className='text-center w-responsive mx-auto pb-5'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
        amet numquam iure provident voluptate esse quasi, veritatis totam
        voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
      <MDBRow>
        <MDBCol md='9' className='md-0 mb-5'>
          <form id='contact-form'>
            <MDBRow>
              <MDBCol md='6'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='text'
                    id='contact-name'
                    label='Your name'
                    className='userInput'
                  />
                </div>
              </MDBCol>
              <MDBCol md='6'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='text'
                    id='contact-email'
                    label='Your email'
                    className='userInput'
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='12'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='text'
                    id='contact-subject'
                    label='Subject'
                    className='userInput'
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='12'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='textarea'
                    id='contact-message'
                    label='Your message'
                    className='userInput'
                  />
                </div>
              </MDBCol>
            </MDBRow>
          </form>
          <div className='text-center text-md-left'>
            <MDBBtn color='primary' size='md' onClick={handleEmailAlert}>
              Send
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md='3' className='text-center'>
          <ul className='list-unstyled mb-0'>
            <li>
              <MDBIcon icon='map-marker-alt' size='2x' className='blue-text' />
              <p>San Francisco, CA 94126, USA</p>
            </li>
            <li>
              <MDBIcon icon='phone' size='2x' className='blue-text mt-4' />
              <p>+ 01 234 567 89</p>
            </li>
            <li>
              <MDBIcon icon='envelope' size='2x' className='blue-text mt-4' />
              <p>contact@example.com</p>
            </li>
          </ul>
        </MDBCol>
      </MDBRow>
      {emailAlert && <ContactAlert />}
    </MDBContainer>
  );
};

export default ContactCard;
