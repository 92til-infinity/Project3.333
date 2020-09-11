import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";

function CreateClass(props) {
  const [classData, setClassData] = useState({
    title: "",
    teacher: "",
    startdate: "",
    enddate: "",
    days: [],
    starttime: "",
    endtime: "",
  });

  const {
    title,
    teacher,
    startdate,
    enddate,
    days,
    starttime,
    endtime,
  } = classData;

  const daysOfWeek = [
    { value: "Sunday", label: "Sunday", id: 7 },
    { value: "Monday", label: "Monday", id: 1 },
    { value: "Tuesday", label: "Tuesday", id: 2 },
    { value: "Wednesday", label: "Wednesday", id: 3 },
    { value: "Thursday", label: "Thursday", id: 4 },
    { value: "Friday", label: "Friday", id: 5 },
    { value: "Saturday", label: "Saturday", id: 6 },
  ];

  const onClassChange = (e) =>
    setClassData({ ...classData, [e.target.name]: e.target.value });

  const onDaysChange = async (value) => {
    setClassData({ ...classData, days: value });
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

  const isEnabled =
    title.length > 0 &&
    teacher.length > 0 &&
    startdate.length > 0 &&
    enddate.length > 0 &&
    days.length > 0;

  return (
    <>
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
          <select
            name="teacher"
            value={teacher}
            onChange={(e) => onClassChange(e)}
          >
            <option value="">Select a teacher...</option>
            {props.teachers.map((teach) => (
              <option key={teach._id} value={teach._id}>
                {teach.lastname}, {teach.firstname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Date: </label>
          <input
            type="date"
            name="startdate"
            value={classData.startdate}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>End Date: </label>
          <input
            type="date"
            name="enddate"
            value={classData.enddate}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Days: </label>
          <Select
            isMulti
            options={daysOfWeek}
            name="days"
            onChange={(e) => onDaysChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Start Time: </label>
          <input
            type="time"
            name="starttime"
            value={classData.starttime}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <div className="form-group">
          <label>End Time: </label>
          <input
            type="time"
            name="endtime"
            value={classData.endtime}
            onChange={(e) => onClassChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          disabled={!isEnabled}
          value="Add Class"
        />
      </form>
    </>
  );
}

export default CreateClass;
