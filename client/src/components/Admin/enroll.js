import React, { useState } from "react";
import API from "../../utils/API";

function Enroll(props) {
  const [enroll, setEnroll] = useState({});

  const onChange = (e) =>
    setEnroll({ ...enroll, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    const userId = enroll.student;
    const unitId = enroll.unit;
    API.enroll(unitId, userId).then((res) => console.log(res));
  };

  const resetData = () => {
    setEnroll({
      unit: "",
      student: "",
    });
  };

  return (
    <>
      <p className="lead">Enroll a Student</p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Class: </label>
          <select name="unit" onChange={(e) => onChange(e)}>
            <option value="">Select a class...</option>
            {props.units.map((unit) => (
              <option value={unit._id}>{unit.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Student: </label>
          <select name="student" onChange={(e) => onChange(e)}>
            <option value="">Enroll this student...</option>
            {props.students.map((student) => (
              <option value={student._id}>
                {student.lastname}, {student.firstname}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" className="btn btn-primary" value="Enroll" />
      </form>
    </>
  );
}

export default Enroll;
