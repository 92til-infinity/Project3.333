import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Calendar(props) {
  console.log(props.date);

  return (
    <div>
      <ReactCalendar onChange={props.onChange} value={props.date} />
    </div>
  );
}

export default Calendar;
