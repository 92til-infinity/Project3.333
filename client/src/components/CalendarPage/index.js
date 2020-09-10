import React, { useContext, useState } from "react";
import Calendar from "../Calendar";
import Day from "../Day";
import UserContext from "../../utils/UserContext";

function CalendarPage() {
  const [date, setDate] = useState({ date: new Date() });
  const user = useContext(UserContext);

  const onChange = (date) => setDate({ date });

  console.log(user);

  return (
    <div>
      <h1>Hello {user.firstname}</h1>
      <Calendar date={date.date} onChange={onChange} />
      <br />
      <input
        type="button"
        className="btn Ripple-parent btn-outline-black"
        value="Add Calendar Item"
      />
      <br />
      <Day date={date.date} />

      {/* insert schedule items here */}
      {/* insert schedule items here */}
      {/* insert schedule items here */}
      {/* insert schedule items here */}
      {/* insert schedule items here */}
    </div>
  );
}

export default CalendarPage;
