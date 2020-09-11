import axios from "axios";
import React, { useState } from "react";

function CreateUser() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });

  const { firstname, lastname, email, password, role } = userData;

  const onUserChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onUserSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      email,
      password,
      role,
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
        console.log(res);
      });
    } catch (error) {
      console.error(error.response.data);
    }
    resetData();
  };

  const isEnabled =
    firstname.length > 0 &&
    lastname.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    role.length > 0;

  const resetData = () => {
    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <>
      <p className="lead">Create a User</p>
      <form className="form" onSubmit={(e) => onUserSubmit(e)}>
        <div className="form-group">
          <label>First Name: </label>
          <input
            type="firstname"
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={(e) => onUserChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Last Name: </label>
          <input
            type="lastname"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={(e) => onUserChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Email Address: </label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onUserChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onUserChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label>Role: </label>
          <select
            value={userData.role}
            type="role"
            placeholder="Role"
            name="role"
            onChange={(e) => onUserChange(e)}
          >
            <option value="">Select a role...</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          disabled={!isEnabled}
          value="Add User"
        />
      </form>
    </>
  );
}

export default CreateUser;
