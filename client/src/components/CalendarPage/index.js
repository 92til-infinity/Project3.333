// import React, { useContext, useState, useEffect } from "react";
// import API from "../../utils/API";
// import Calendar from "../Calendar";
// import Day from "../Day";
// import convertDay from "../../utils/dateConversions";
// import UserContext from "../../utils/UserContext";
// import "./style.css";

// function CalendarPage() {
//   const [date, setDate] = useState({
//     date: new Date(),
//     day: convertDay(new Date().getDay()),
//   });
//   const [daySchedule, setDaySchedule] = useState({
//     date: "",
//     schedule: [],
//   });
//   const [userClasses, setUserClasses] = useState({});

//   const todayArray = [];

//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     console.log("UseEFFECT");
//     setUserClasses(getClassInfo(user.classes));
//     isToday(date, userClasses);
//   }, []);

//   const onClickDay = (date) => {
//     const dateArray = date.toString().split(" ");
//     const dayInt = convertDay(dateArray[0]);
//     setDate({ date, day: dayInt });
//     isToday(date, userClasses);
//   };

//   // Load classes and store in hook to avoid constant API calls
//   const getClassInfo = (unitList) => {
//     const classArray = [];
//     unitList.forEach(async (unit) => {
//       const unitInfo = await API.getUnit(unit);
//       classArray.push(unitInfo.data);
//     });
//     return classArray;
//   };

//   const isToday = async (date, unitList) => {
//     const dateArray = date.toString().split(" ");
//     const today = convertDay(dateArray[0]);
//     console.log(
//       `${today} is today's number, and the number of units is ${
//         unitList.length
//       }`
//     );

//     for (let i = 0; i < unitList.length; i++) {
//       const unit = unitList[i];
//       // Make sure selected date falls between start and end dates of class
//       if (
//         Date.parse(date) >= Date.parse(unit.startdate) &&
//         Date.parse(date) <= Date.parse(unit.enddate)
//       ) {
//         // For each class, dig through days array to find a match
//         unit.days.forEach((day) => {
//           if (day === today) {
//             // If match is found, do this:
//             todayArray.push(unit);
//             console.log(`${day} is a match`);
//           }
//         });
//       }
//     }
//     // Logging array of classes that take place today
//     console.log(todayArray);
//     setDaySchedule({ schedule: todayArray });
//   };

//   return (
//     <div className="cal-display">
//       <h1>Hello {user.firstname}</h1>
//       <Day date={date.date} />
//       <Calendar date={date.date} onClickDay={onClickDay} />
//       <br />
//       <input
//         type="button"
//         className="btn Ripple-parent btn-outline-black add-item"
//         value="Add Calendar Item"
//       />
//       <br />

//       {daySchedule.schedule.map((appt) => (
//         <div key={appt._id}>
//           <h4>{appt.title}</h4>
//           <p>Taught by {appt.teacher}</p>
//           <p>
//             <span>{appt.starttime}</span> - <span>{appt.endtime}</span>
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { Component } from "react";
import MDBFullCalendar from "mdb-react-calendar";
import {
  addHours,
  addDays,
  addWeeks,
  startOfWeek,
  getDay,
  parseISO,
} from "date-fns";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";
import convertDay from "../../utils/dateConversions";

const today = new Date();

class CalendarPage extends Component {
  static contextType = UserContext;

  state = {
    classes: [],
    tasks: [],
  };

  componentWillMount() {}

  componentDidMount() {
    const user = this.context;
    this.getClassInfo(user.user.classes);
    setTimeout(() => {
      this.populate();
    }, 500);
  }

  onClickDay = (date) => {
    console.log(date);
    let user = this.context;
    // const dateArray = date.toString().split(" ");
    // const dayInt = convertDay(dateArray[0]);
    // setDate({ date, day: dayInt });
    // isToday(date, userClasses);
  };

  // Load classes and store in state to avoid constant API calls
  getClassInfo = (unitList) => {
    const classArray = [];
    unitList.forEach(async (unit) => {
      const unitInfo = await API.getUnit(unit);
      classArray.push(unitInfo.data);
    });
    this.setState({ classes: classArray });
  };

  populate = () => {
    let start, end;
    let classContainer = [];
    const classes = this.state.classes;

    // For every class...
    for (let i = 0; i < classes.length; i++) {
      let startArray = classes[i].startdate.split("T");
      let endArray = classes[i].enddate.split("T");
      start = addDays(new Date(startArray[0]), 1);
      end = addDays(new Date(endArray[0]), 1);

      // For each day of the week
      for (let x = 0; x < 7; x++) {
        const dayInt = start.getDay();

        // For each day in the class days array
        for (let j = 0; j < classes[i].days.length; j++) {
          // If matched, create a class instance for every repeating
          // day within the class start/end dates
          if (dayInt === classes[i].days[j]) {
            let repeat = start;
            while (repeat < end) {
              console.log("Whiling away...");
              const startInts = classes[i].starttime.split(":");
              const endInts = classes[i].endtime.split(":");
              const classInstance = {
                id: classes[i]._id,
                title: classes[i].title,
                startDate: new Date(repeat).setHours(
                  startInts[0],
                  startInts[1],
                  0
                ),
                endDate: new Date(repeat).setHours(endInts[0], endInts[1], 0),
                color: "primary",
                dark: true,
                link: true,
                to: "test",
              };
              classContainer.push(classInstance);
              repeat = addDays(repeat, 7);
            }
          }
        }
        // If none matched, change startdate to one day later and
        // run through array again
        start = addDays(start, 1);
      }
    }
    this.setState({ tasks: classContainer });
  };

  render() {
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
        tasks={this.state.tasks}
        btnSizes="sm"
        // onChange={this.populate}
      />
    );
  }
}

export default CalendarPage;
