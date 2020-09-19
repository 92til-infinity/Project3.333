import React, { useState } from "react";
import API from "../../utils/API";

function Enroll(props) {
  const [enroll, setEnroll] = useState({});

  const { unit, student } = enroll;

  const onChange = (e) =>
    setEnroll({ ...enroll, [e.target.name]: e.target.value });

  const onEnrollSubmit = async (e) => {
    e.preventDefault();
    const userId = enroll.student;
    const unitId = enroll.unit;
    const user = await API.getUser(userId);
    // await axios.get(`/api/users/${userId}`).then((res) => console.log(res));

    for (let i = 0; i < user.data.classes.length; i++) {
      if (user.data.classes[i] === unitId) {
        alert("User is already enrolled in this class");
        return;
      }
    }
    await API.enrollClass(unitId, userId);
    await API.enrollUser(unitId, userId);
    resetData();
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
      <form className="form" onSubmit={(e) => onEnrollSubmit(e)}>
        <div className="form-group">
          <label>Class: </label>
          <select name="unit" value={unit} onChange={(e) => onChange(e)}>
            <option value="">Select a class...</option>
            {props.units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Student: </label>
          <select name="student" value={student} onChange={(e) => onChange(e)}>
            <option value="">Enroll this student...</option>
            {props.students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.lastname}, {student.firstname}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" className="btn btn-primary" value="Enroll" />
      </form>
      <button
        className="btn btn-primary"
        onClick={() => window.location.reload(false)}
      >
        Back
      </button>
    </>
  );
}

export default Enroll;
