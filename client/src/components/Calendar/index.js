import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";
import { addDays, subDays } from "date-fns";
import CalendarModal from "../CalendarModal";
import bootstrapPlugin from "@fullcalendar/bootstrap";

class Calendar extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      showCalendarModal: false,
      homework: [],
      classes: [],
      currentEvents: [],
    };
  }

  componentDidMount() {
    const { user } = this.context;
    // const startEvents = this.renderEventContent(user.activities);
    this.setState({ currentEvents: user.activities });
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
    this.setState({ currentEvents: user.activities });
    // Setting new task list (e) to state, context, and database
    if (e.length !== this.state.currentEvents.length) {
      setUser({ ...user, activities: e });
      this.setState({ currentEvents: e });
      await API.setActivities(e);
      this.checkClasses();
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
      if (this.state.currentEvents.some((event) => event.id === classes._id)) {
        // Do nothing, but if/else statement is necessary
      } else {
        this.populate(classes);
      }
    }
  };

  checkHomework = () => {
    for (let i = 0; i < this.state.homework.length; i++) {
      const homework = this.state.homework[i];
      if (this.state.currentEvents.some((hw) => hw.id === homework._id)) {
        // Do nothing, but if/else statement is necessary
      } else {
        this.addHomework(homework);
      }
    }
  };

  addHomework = async (homework) => {
    let homeworkContainer = this.state.currentEvents;

    const hwInstance = {
      id: homework._id,
      title: `Homework Due: ${homework.assignment}`,
      start: addDays(homework.duedate, 1),
      allDay: true,
      backgroundColor: "red",
      textColor: "white",
    };
    homeworkContainer.push(hwInstance);
    this.setState({ currentEvents: homeworkContainer });
    await API.setActivities(homeworkContainer);
  };

  populate = async (unit) => {
    let start, end;
    let classContainer = this.state.currentEvents;

    start = addDays(new Date(unit.startdate), 1);
    end = addDays(new Date(unit.enddate), 1);

    // For each day of the week
    for (let x = 0; x < 7; x++) {
      const dayInt = start.getDay();
      // For each day in the class days array
      for (let j = 0; j < unit.days.length; j++) {
        // If matched, create a class instance for every repeating
        // day within the class start/end dates
        if (dayInt === unit.days[j]) {
          let repeat = subDays(start, 1);

          while (repeat < end) {
            const ISOrepeat = repeat.toISOString().replace(/T.*$/, "");
            const classInstance = {
              id: unit._id,
              title: unit.title,
              start: `${ISOrepeat}T${unit.starttime}:00`,
              end: `${ISOrepeat}T${unit.endtime}:00`,
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
    this.setState({ currentEvents: classContainer });
    await API.setActivities(classContainer);
  };

  handleDateClick = (e) => {
    console.log(e.dateStr);
    this.setState({ showCalendarModal: !this.state.showCalendarModal });
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };

  toggle = () => {
    this.setState({ showCalendarModal: !this.state.showCalendarModal });
  };

  render() {
    const { user } = this.context;
    return (
      <div>
        {this.state.showCalendarModal && (
          <CalendarModal
            toggle={this.toggle}
            isOpen={this.state.showCalendarModal}
          />
        )}
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrapPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          dateClick={this.handleDateClick}
          themeSystem="bootstrap"
          eventsSet={this.handleEvents}
          events={user.activities}
        />
      </div>
    );
  }
}

export default Calendar;
