import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import setAuthToken from '../../utils/setAuthToken';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const LoginForm = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // The e.target.name will take the name assignment from each form input (email, password, etc.)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(user);
      const res = await axios.post('/api/auth', body, config);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      setAuthToken(localStorage.token);
      setFormData({
        ...formData,
        isAuthenticated: true,
        token: localStorage.getItem('token'),
      });
    } catch (error) {
      localStorage.removeItem('token');
      setFormData({ ...formData, isAuthenticated: false, token: null });
      console.error(error.response.data);
    }
  };

  // Redirect if logged in
  if (formData.isAuthenticated) {
    return <Redirect to='/dash' />;
  }

  return (
    <MDBContainer>
      <MDBRow className='text-left'>
        <MDBCol md='12'>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='grey-text'>
              <MDBInput
                label='Type your email'
                icon='envelope'
                group
                type='email'
                validate
                error='wrong'
                success='right'
                value={email}
                onChange={(e) => onChange(e)}
              />
              <MDBInput
                label='Type your password'
                icon='lock'
                group
                type='password'
                validate
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <div className='text-center'>
              <MDBBtn type='submit' value='Login'>
                Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

LoginForm.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default (mapStateToProps, LoginForm);
