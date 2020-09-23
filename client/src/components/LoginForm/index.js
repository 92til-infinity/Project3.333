import React, { useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

import setAuthToken from "../../utils/setAuthToken";
import UserContext from "../../utils/UserContext";
import AuthContext from "../../utils/AuthContext";
import { toast, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import ContactAlert from '../ContactAlert';

const LoginForm = ({ toggleLogin, isAuthenticated }) => {
  const { setUser } = React.useContext(UserContext);
  const { authData, setAuth } = React.useContext(AuthContext);
  const [loginErrorAlert, setLoginErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleLoginErrorAlert = () => {
    setLoginErrorAlert(true);
    toast.error("Oops! Looks like we couldn't find that email or password!", {
      closeButton: false,
    });

  }

  // The e.target.name will take the name assignment from each form input (email, password, etc.)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);
      if (res.data.user.token) {
        localStorage.setItem("token", res.data.user.token);
      }
      setAuthToken(localStorage.token);
      setAuth({
        ...authData,
        isAuthenticated: true,
        loading: false,
        role: res.data.user.role,
        token: localStorage.getItem("token"),
      });
      setUser(res.data.user);
      // Closes modal
      // toggleLogin();
    } catch (error) {
      localStorage.removeItem("token");
      setAuth({ ...authData, isAuthenticated: false, token: null });
      handleLoginErrorAlert();
    }
  };

  // Redirect if logged in
  // const history = useHistory();
  if (authData.isAuthenticated && authData.role === "Admin") {
    return <Redirect to="/admin" />;
    // history.push("/admin");
    // history.go(0);
  } else if (authData.isAuthenticated) {
    return <Redirect to="/dash" />;
    // history.push("/dash");
    // history.go(0);
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
              {loginErrorAlert && (
                <div>
                  <h6 style={{ color: "red", paddingTop: "5px" }}>
                    Looks like we couldn't find that email or password!
                  </h6>
                  <h6 style={{ color: "#4285f4" }}>
                    <a>
                      Reset Password
                    </a>
                  </h6>
                </div>
              )}
            </div>
          </form>
        </MDBCol>
      </MDBRow>
      {loginErrorAlert && <ContactAlert />}
    </MDBContainer>
  );
};

export default LoginForm;
