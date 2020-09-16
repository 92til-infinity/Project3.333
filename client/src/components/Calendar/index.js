import React from "react";
import MDBFullCalendar from "mdb-react-calendar";

function Calendar(props) {
  const arrOfObjects = [
    { color: "elegant-color", title: "Test", dark: true },
    { color: "danger-color", title: "Homework Due", dark: false },
    { color: "warning-color", title: "Meeting", dark: false },
    { color: "success-color", title: "Other", dark: false },
    { color: "secondary-color", title: "Lunch", dark: false },
    { color: "default-color", title: "Activity", dark: false },
    { color: "primary-color", title: "Appointment", dark: false },
    { color: "info-color", title: "Class", dark: true },
  ];
  return (
    <MDBFullCalendar
      colors={arrOfObjects}
      onChange={props.onChange}
      tasks={props.tasks}
      btnSizes="sm"
    />
  );
}

export default Calendar;
