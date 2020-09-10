import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const LoginForm = () => {
  return (
    <MDBContainer>
      <MDBRow className='text-left'>
        <MDBCol md='12'>
          <form>
            <div className='grey-text'>
              <MDBInput
                label='Type your email'
                icon='envelope'
                group
                type='email'
                validate
                error='wrong'
                success='right'
              />
              <MDBInput
                label='Type your password'
                icon='lock'
                group
                type='password'
                validate
              />
            </div>
            <div className='text-center'>
              <MDBBtn>Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginForm;
