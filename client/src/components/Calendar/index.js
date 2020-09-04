import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Calendar(props) {


  return (
    <div>
      <ReactCalendar onChange={props.onChange} value={props.date} />
    </div>
  );
}

export default Calendar;
