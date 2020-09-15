import React, { useContext, useState, useEffect } from "react";
import API from "../../utils/API";
import Calendar from "../Calendar";
import Day from "../Day";
import convertDay from "../../utils/dateConversions";
import UserContext from "../../utils/UserContext";
import "./style.css";

function CalendarPage() {
  const [date, setDate] = useState({
    date: new Date(),
    day: convertDay(new Date().getDay()),
  });
  const [daySchedule, setDaySchedule] = useState({
    date: "",
    schedule: [],
  });
  const [userClasses, setUserClasses] = useState({});

  const todayArray = [];

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("UseEFFECT");
    setUserClasses(getClassInfo(user.classes));
    isToday(date, userClasses);
  }, []);

  const onClickDay = (date) => {
    const dateArray = date.toString().split(" ");
    const dayInt = convertDay(dateArray[0]);
    setDate({ date, day: dayInt });
    isToday(date, userClasses);
  };

  // Load classes and store in hook to avoid constant API calls
  const getClassInfo = (unitList) => {
    const classArray = [];
    unitList.forEach(async (unit) => {
      const unitInfo = await API.getUnit(unit);
      classArray.push(unitInfo.data);
    });
    return classArray;
  };

  const isToday = async (date, unitList) => {
    const dateArray = date.toString().split(" ");
    const today = convertDay(dateArray[0]);
    console.log(
      `${today} is today's number, and the number of units is ${
        unitList.length
      }`
    );

    for (let i = 0; i < unitList.length; i++) {
      const unit = unitList[i];
      // Make sure selected date falls between start and end dates of class
      if (
        Date.parse(date) >= Date.parse(unit.startdate) &&
        Date.parse(date) <= Date.parse(unit.enddate)
      ) {
        // For each class, dig through days array to find a match
        unit.days.forEach((day) => {
          if (day === today) {
            // If match is found, do this:
            todayArray.push(unit);
            console.log(`${day} is a match`);
          }
        });
      }
    }
    // Logging array of classes that take place today
    console.log(todayArray);
    setDaySchedule({ schedule: todayArray });
  };

  return (
    <div className="cal-display">
      <h1>Hello {user.firstname}</h1>
      <Day date={date.date} />
      <Calendar date={date.date} onClickDay={onClickDay} />
      <br />
      <input
        type="button"
        className="btn Ripple-parent btn-outline-black add-item"
        value="Add Calendar Item"
      />
      <br />

      {daySchedule.schedule.map((appt) => (
        <div key={appt._id}>
          <h4>{appt.title}</h4>
          <p>Taught by {appt.teacher}</p>
          <p>
            <span>{appt.starttime}</span> - <span>{appt.endtime}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default CalendarPage;
