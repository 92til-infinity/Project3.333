import axios from "axios";
import React, { useState } from "react";

const Admin = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const [classData, setClassData] = useState({
    title: "",
    teacher: "",
    startdate: "",
    enddate: "",
    days: [],
    starttime: "",
    endtime: "",
  });

  const { firstname, lastname, email, password, role } = userData;
  const {
    title,
    teacher,
    startdate,
    enddate,
    days,
    starttime,
    endtime,
  } = classData;

  const onUserChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onClassChange = (e) =>
    setClassData({ ...classData, [e.target.name]: e.target.value });

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
  };

  const onClassSubmit = async (e) => {
    e.preventDefault();
    const unit = {
      title,
      teacher,
      startdate,
      enddate,
      days,
      starttime,
      endtime,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setClassData({
        ...classData,
      });
      const body = JSON.stringify(unit);
      await axios.post("/api/units", body, config).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <>
      <h1 className="large text-primary">Admin Tasks</h1>
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
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <input type="submit" className="btn btn-primary" value="Add User" />
      </form>
      {/* <br />
      <br />
      <br />
      <br />
      <p className="lead">Create a Class</p>
      <form className="form" onSubmit={(e) => onClassSubmit(e)}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="title"
            placeholder="Class title..."
            name="title"
            value={title}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Teacher: </label>
          <input
            type="lastname"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Start Date: </label>
          <input
            type="startdate"
            placeholder="Email Address"
            name="startdate"
            value={startdate}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>End Date: </label>
          <input
            type="enddate"
            placeholder="Password"
            name="enddate"
            value={enddate}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Days (Hold CTRL for multiple selections...): </label>
          <select
            value={classData.days}
            type="days"
            placeholder="Hold down CTRL for multiple selections..."
            name="days"
            onChange={(e) => onClassChange(e)}
            multiple
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Time: </label>
          <input
            type="starttime"
            placeholder="Password"
            name="starttime"
            value={starttime}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>End Time: </label>
          <input
            type="endtime"
            placeholder="Password"
            name="endtime"
            value={endtime}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Add Class" />
      </form> */}
    </>
  );
};

export default Admin;
