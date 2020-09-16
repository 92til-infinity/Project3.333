import axios from "axios";
import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import "./style.css";
import UserContext from "../../utils/UserContext";
import setAuthToken from "../../utils/setAuthToken";
import { Redirect, useHistory } from "react-router-dom";

const SignUpForm = ({ toggle }) => {
  const { setUser } = React.useContext(UserContext);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const { firstname, lastname, email, password } = userData;

  const onUserChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onUserSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setUserData({
        ...userData,
      });
      const body = JSON.stringify(user);
      const res = await axios.post("/api/users", body, config);
      if (res.data.user.token) {
        localStorage.setItem("token", res.data.user.token);
      }

      console.log(res.data);
      setAuthToken(localStorage.token);
      setUserData({
        ...userData,
        isAuthenticated: true,
        token: localStorage.getItem("token"),
      });
      setUser(res.data.user);
      // // Closes modal
      toggle();
    } catch (error) {
      localStorage.removeItem("token");
      setUserData({ ...userData, isAuthenticated: false, token: null });
      console.error(error);
    }
  };
  if (userData.isAuthenticated) {
    history.push("/dash");
    history.go(0);
  }

  return (
    <MDBContainer>
      <MDBRow className="text-left">
        <MDBCol md="12">
          <form onSubmit={(e) => onUserSubmit(e)}>
            <div className="grey-text">
              <MDBInput
                label="Your first name"
                icon="user"
                group
                type="text"
                name="firstname"
                validate
                error="wrong"
                success="right"
                onChange={(e) => onUserChange(e)}
              />
              <MDBInput
                label="Your last name"
                icon="user"
                group
                type="text"
                name="lastname"
                validate
                error="wrong"
                success="right"
                onChange={(e) => onUserChange(e)}
              />
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                name="email"
                validate
                error="wrong"
                success="right"
                onChange={(e) => onUserChange(e)}
              />
              <MDBInput
                label="Your password"
                icon="lock"
                group
                type="password"
                name="password"
                validate
                onChange={(e) => onUserChange(e)}
                minLength="6"
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" color="primary">
                Register
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUpForm;
