import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import UserContext from "../../utils/UserContext";

const Login = ({ isAuthenticated }) => {
  const { setUser } = React.useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);
      const res = await axios.post("/api/auth", body, config);
      if (res.data.user.token) {
        localStorage.setItem("token", res.data.user.token);
      }
      setAuthToken(localStorage.token);
      setFormData({
        ...formData,
        isAuthenticated: true,
        token: localStorage.getItem("token"),
      });
      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setFormData({ ...formData, isAuthenticated: false, token: null });
      console.error(error.response.data);
    }
  };

  // Redirect if logged in
  if (formData.isAuthenticated) {
    return <Redirect to="/dash" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">Sign Into Your Account</p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default (mapStateToProps, Login);
