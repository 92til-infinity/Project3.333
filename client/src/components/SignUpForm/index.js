import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './style.css';

const SignUpForm = () => {
  return (
    <MDBContainer>
      <MDBRow className='text-left'>
        <MDBCol md='12'>
          <form>
            <div className='grey-text'>
              <MDBInput
                label='Your name'
                icon='user'
                group
                type='text'
                validate
                error='wrong'
                success='right'
              />
              <MDBInput
                label='Your email'
                icon='envelope'
                group
                type='email'
                validate
                error='wrong'
                success='right'
              />
              <MDBInput
                label='Confirm your email'
                icon='exclamation-triangle'
                group
                type='text'
                validate
                error='wrong'
                success='right'
              />
              <MDBInput
                label='Your password'
                icon='lock'
                group
                type='password'
                validate
              />
            </div>
            <div className='text-center'>
              <MDBBtn color='primary'>Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUpForm;
