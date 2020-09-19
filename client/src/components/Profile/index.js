import React, { useState } from "react";
import axios from "axios";
import {
  MDBInput,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBSideNavItem,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdbreact";
import UserContext from "../../utils/UserContext";
import "./style.css";

const Profile = ({}) => {
  const { user, setUser } = React.useContext(UserContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    facebook: "",
    pinterest: "",
    github: "",
    twitter: "",
  });

  const {
    firstname,
    lastname,
    email,
    role,
    facebook,
    pinterest,
    github,
    twitter,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const social = {
      github: formData.github,
      facebook: formData.facebook,
      twitter: formData.twitter,
      pinterest: formData.pinterest,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(social);
      const res = await axios.put(`/api/users/${user.id}`, body, config);
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12" className="py-5">
          <form onSubmit={(e) => onSubmit(e)}>
            <h1 className="font-weight-bold mb-3 text-lg-left user">
              {user.firstname} {user.lastname}
            </h1>
            <h2 className="font-weight-bold mb-3 text-lg-left">Edit Profile</h2>

            <div className="form-group social-input text-lg-left">
              <i className="fab fa-facebook fa-3x social" />
              <MDBInput
                className="social-text"
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input text-lg-left">
              <i className="fab fa-pinterest fa-3x social" />
              <MDBInput
                className="social-text"
                type="text"
                placeholder="Pinterest URL"
                name="pinterest"
                value={pinterest}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input text-lg-left">
              <i className="fab fa-github fa-3x social" />
              <MDBInput
                className="social-text"
                type="text"
                placeholder="Github URL"
                name="github"
                value={github}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input text-lg-left">
              <i className="fab fa-twitter fa-3x social" />
              <MDBInput
                className="social-text"
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <MDBBtn type="submit" color="primary">
              Update
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Profile;
