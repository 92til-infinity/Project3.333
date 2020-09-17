import React, { Component } from "react";
import MDBFullCalendar from "mdb-react-calendar";
import { addDays } from "date-fns";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";

class CalendarPage extends Component {
  static contextType = UserContext;

  state = {
    homework: [],
    classes: [],
    tasks: [],
  };

  componentDidMount() {
    const { user } = this.context;
    // Load the state with homework, class info, and tasks
    this.setState({ tasks: user.activities });
    this.setState({ homework: user.homework });
    this.getClassInfo(user.classes);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.homework !== prevState.homework) {
      this.checkHomework();
    }

    if (this.state.classes !== prevState.classes) {
      this.checkClasses();
    }
  }

  onChange = async (e) => {
    let { user, setUser } = this.context;
    this.setState({ tasks: user.activities });
    // Setting new task list (e) to state, context, and database
    if (e.length !== this.state.tasks.length) {
      setUser({ ...user, activities: e });
      this.setState({ tasks: e });
      await API.setActivities(e);
    }
  };

  // Load classes and store in state to avoid constant API calls
  getClassInfo = (unitList) => {
    const classArray = [];
    unitList.forEach((unit) => {
      const unitInfo = API.getUnit(unit);
      classArray.push(unitInfo);
    });
    Promise.all(classArray).then((values) => {
      const classes = values.map(({ data }) => data);
      this.setState({ classes: classes });
    });
  };

  checkClasses = () => {
    for (let i = 0; i < this.state.classes.length; i++) {
      const classes = this.state.classes[i];
      if (this.state.tasks.some((task) => task.id === classes._id)) {
        // Do nothing, but if/else statement is necessary
      } else {
        this.populate(classes);
      }
    }
  };

  checkHomework = () => {
    for (let i = 0; i < this.state.homework.length; i++) {
      const homework = this.state.homework[i];
      if (this.state.tasks.some((hw) => hw.id === homework._id)) {
        // Do nothing, but if/else statement is necessary
      } else {
        this.addHomework(homework);
      }
    }
  };

  addHomework = async (homework) => {
    let homeworkContainer = this.state.tasks;

    const hwInstance = {
      id: homework._id,
      title: homework.assignment,
      startDate: new Date(homework.duedate).setHours(0, 0, 0),
      endDate: new Date(homework.duedate).setHours(23, 59, 59),
      color: "danger",
      dark: true,
    };
    homeworkContainer.push(hwInstance);
    this.setState({ tasks: homeworkContainer });
    await API.setActivities(homeworkContainer);
  };

  populate = async (unit) => {
    let start, end;
    let classContainer = this.state.tasks;
    let startArray = unit.startdate.split("T");
    let endArray = unit.enddate.split("T");

    start = addDays(new Date(startArray[0]), 1);
    end = addDays(new Date(endArray[0]), 1);

    // For each day of the week
    for (let x = 0; x < 7; x++) {
      const dayInt = start.getDay();

      // For each day in the class days array
      for (let j = 0; j < unit.days.length; j++) {
        // If matched, create a class instance for every repeating
        // day within the class start/end dates
        if (dayInt === unit.days[j]) {
          let repeat = start;
          while (repeat < end) {
            const startInts = unit.starttime.split(":");
            const endInts = unit.endtime.split(":");
            const classInstance = {
              id: unit._id,
              title: unit.title,
              startDate: new Date(repeat).setHours(
                startInts[0],
                startInts[1],
                0
              ),
              endDate: new Date(repeat).setHours(endInts[0], endInts[1], 0),
              color: "info",
              dark: true,
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
    this.setState({ tasks: classContainer });
    await API.setActivities(classContainer);
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
        onChange={this.onChange}
      />
    );
  }
}

export default CalendarPage;
