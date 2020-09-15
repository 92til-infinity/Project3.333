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
import React, { Component } from 'react';
import MDBFullCalendar from 'mdb-react-calendar';
import { addHours, addDays, addWeeks, startOfWeek } from 'date-fns';

const today = new Date();

class CalendarPage extends Component {
  state = {
    tasks: [
      {
        id: 'task1',
        title: 'Today',
        startDate: new Date().setHours(0, 0, 0),
        endDate: new Date().setHours(23, 59, 59),
        color: 'danger',
        dark: true,
        link: true,
        to: 'test',
      },
      {
        id: 'task2',
        title: 'Today',
        startDate: new Date().setDate(2),
        endDate: new Date().setDate(15),
        color: 'info',
        link: true,
        to: 'test1',
      },
      {
        id: 'task3',
        title: 'Task name',
        startDate: new Date().setDate(2),
        endDate: new Date().setDate(15),
        color: 'warning',
        dark: true,
        link: true,
        to: 'test2',
      },
    ],
  };

  render() {
    const arrOfObjects = [
      { color: 'elegant-color', title: 'Test', dark: true },
      { color: 'danger-color', title: 'Test1', dark: false },
      { color: 'warning-color', title: 'Meeting', dark: false },
      { color: 'success-color', title: 'Home', dark: false },
      { color: 'info-color', title: 'Lunch', dark: false },
      { color: 'default-color', title: 'Something', dark: false },
      { color: 'primary-color', title: 'Pool', dark: false },
      { color: 'secondary-color', title: 'Footbal', dark: true },
    ];

    return (
      <MDBFullCalendar
        colors={arrOfObjects}
        tasks={this.state.tasks}
        btnSizes='sm'
      />
    );
  }
}

export default CalendarPage;
