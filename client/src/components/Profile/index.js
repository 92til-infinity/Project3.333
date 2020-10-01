import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import UserContext from "../../utils/UserContext";
import "./style.css";

const Profile = ({}) => {
  const { user, setUser } = React.useContext(UserContext);
  const [formData, setFormData] = useState({
    facebook: user.social.facebook,
    linkedin: user.social.linkedin,
    github: user.social.github,
    twitter: user.social.twitter,
  });

  useEffect(() => {
    // setFormData(user.social);
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const social = {
      github: formData.github,
      facebook: formData.facebook,
      twitter: formData.twitter,
      linkedin: formData.linkedin,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(social);
      const res = await axios.put(`/api/users/${user._id}`, body, config);
      setUser({ ...user, social });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
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
                name="facebook"
                placeholder="Facebook URL"
                value={formData.facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input text-lg-left">
              <i className="fab fa-linkedin fa-3x social" />
              <MDBInput
                className="social-text"
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input text-lg-left">
              <i className="fab fa-github fa-3x social" />
              <MDBInput
                className="social-text"
                type="text"
                name="github"
                placeholder="Github URL"
                value={formData.github}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input text-lg-left">
              <i className="fab fa-twitter fa-3x social" />
              <MDBInput
                className="social-text"
                type="text"
                name="twitter"
                placeholder="Twitter URL"
                value={formData.twitter}
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
