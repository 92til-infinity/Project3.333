import axios from "axios";
import React, { useState } from "react";

function Homework(props) {
  const [hwData, setHwData] = useState({
    unitId: "",
    unitName: "",
    assignment: "",
    duedate: "",
    description: "",
  });

  const { unitId, unitName, assignment, duedate, description } = hwData;

  const onChange = (e) =>
    setHwData({ ...hwData, [e.target.name]: e.target.value });

  const onClassChange = (e) => {
    // Find the selected unit from the array of available units
    const unit = props.units.find((unit) => {
      return unit._id === e.target.value;
    });
    setHwData({
      ...hwData,
      unitId: e.target.value,
      unitName: unit.title,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const hw = {
      unitId,
      unitName,
      assignment,
      duedate,
      description,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setHwData({
        ...hwData,
      });
      const body = JSON.stringify(hw);
      await axios
        .put(`/api/units/homework/${unitId}`, body, config)
        .then(async () => {
          const userlist = await axios.get(`/api/units/${unitId}`);
          const enrolled = userlist.data.enrolled;
          enrolled.forEach((student) => {
            axios.put(`/api/users/homework/${student}`, body, config);
          });
        });
    } catch (error) {
      console.error(error);
    }
    resetData();
  };

  const isEnabled =
    unitId.length > 0 &&
    unitName.length > 0 &&
    assignment.length > 0 &&
    duedate.length > 0;

  const resetData = () => {
    setHwData({
      unitId: "",
      unitName: "",
      assignment: "",
      duedate: "",
      description: "",
    });
  };

  return (
    <>
      <p className="lead">Assign Homework</p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Class: </label>
          <select
            name="unitId"
            value={unitId}
            onChange={(e) => onClassChange(e)}
          >
            <option value="">Select a class...</option>
            {props.units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Assignment Title: </label>
          <input
            type="assignment"
            placeholder="Assignment"
            name="assignment"
            value={assignment}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <label>Due Date: </label>
          <input
            type="date"
            name="duedate"
            value={duedate}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input
            type="description"
            placeholder="Description..."
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          disabled={!isEnabled}
          value="Assign Homework"
        />
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

export default Homework;
