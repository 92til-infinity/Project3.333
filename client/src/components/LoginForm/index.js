import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import setAuthToken from "../../utils/setAuthToken";
import UserContext from "../../utils/UserContext";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const LoginForm = ({ toggleLogin, isAuthenticated }) => {
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
        role: res.data.user.role,
        token: localStorage.getItem("token"),
      });
      setUser(res.data.user);
      // Closes modal
      toggleLogin();
    } catch (error) {
      localStorage.removeItem("token");
      setFormData({ ...formData, isAuthenticated: false, token: null });
      console.error(error);
    }
  };

  // Redirect if logged in
  const history = useHistory();
  if (formData.isAuthenticated && formData.role === "Admin") {
    history.push("/admin");
    history.go(0);
  } else if (formData.isAuthenticated) {
    history.push("/dash");
    history.go(0);
  }

  return (
    <MDBContainer>
      <MDBRow className="text-left">
        <MDBCol md="12">
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                validate
                error="wrong"
                success="right"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" value="Login">
                Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginForm;
