import React, { useState, useEffect } from "react";
import CreateUser from "./createUser";
import CreateClass from "./createClass";
import Enroll from "./enroll";
import Homework from "./homework";
import API from "../../utils/API";

const Admin = () => {
  const [action, setAction] = useState({
    action: "",
  });
  const [teachers, setTeachers] = useState({});
  const [students, setStudents] = useState({});
  const [units, setUnits] = useState({});

  useEffect(() => {
    API.getUsers("Teacher").then((res) => setTeachers(res.data));
    API.getUsers("Student").then((res) => setStudents(res.data));
    API.getUnits().then((res) => setUnits(res.data));
  }, []);

  switch (action.action) {
    case "Create User":
      return <CreateUser />;
    case "Create Class":
      return <CreateClass teachers={teachers} />;
    case "Enroll Student":
      return <Enroll students={students} units={units} />;
    case "Assign Homework":
      return <Homework units={units} />;
    default:
      break;
  }

  const onClick = (e) => {
    e.preventDefault();
    setAction({ action: e.target.value });
  };

  return (
    <>
      <h1 className="large text-primary">Admin Tasks</h1>
      <input
        type="submit"
        onClick={(e) => onClick(e)}
        className="btn btn-primary"
        value="Create User"
      />
      <input
        type="submit"
        onClick={(e) => onClick(e)}
        className="btn btn-primary"
        value="Create Class"
      />
      <input
        type="submit"
        onClick={(e) => onClick(e)}
        className="btn btn-primary"
        value="Enroll Student"
      />
      <input
        type="submit"
        onClick={(e) => onClick(e)}
        className="btn btn-primary"
        value="Assign Homework"
      />
    </>
  );
};

export default Admin;
