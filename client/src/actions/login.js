//Just logic for LoginForm Component, copied into LoginForm

import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import setAuthToken from '../../utils/setAuthToken';

const Login = ({ isAuthenticated }) => {
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
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default (mapStateToProps, Login);
