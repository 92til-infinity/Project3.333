import axios from "axios";
import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import "./style.css";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

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
      await axios.post("/api/users", body, config).then((res) => {
        // console.log(res);
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

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
