import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";
import { v4 as uuidv4 } from "uuid";
import { addDays, subDays } from "date-fns";
import CalendarModal from "../CalendarModal";
import CalEditModal from "../CalEditModal";
import bootstrapPlugin from "@fullcalendar/bootstrap";

class Calendar extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      showCalendarModal: false,
      showEventModal: false,
      eventInfo: {},
      homework: [],
      classes: [],
      currentEvents: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    console.log("component mounting...");
    const { user } = this.context;
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

    // if (this.state.currentEvents.length !== prevState.currentEvents.length) {
    //   console.log("Events check..." + this.state.currentEvents.length + ":" + prevState.currentEvents.length);
    //   this.setState({ currentEvents: user.activities });
    // }
    //this.setState({ currentEvents: user.activities });
    console.log("Component did update...");
  }

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
    console.log("Checking classes now...");
    for (let i = 0; i < this.state.classes.length; i++) {
      const classes = this.state.classes[i];
      if (
        this.state.currentEvents.some((event) => event.classid === classes._id)
      ) {
        // Do nothing, but if/else statement is necessary
      } else {
        this.populate(classes);
      }
    }
  };

  checkHomework = () => {
    console.log("Checking homework now...");
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
    console.log("Adding homework " + homework._id);

    // Reformatting homework data to be read by calendar component
    const hwInstance = {
      id: homework._id,
      title: homework.assignment,
      start: addDays(new Date(homework.duedate), 1),
      allDay: true,
      backgroundColor: "red",
      textColor: "white",
      category: "Homework",
      notes: homework.description,
      editable: false,
    };
    this.handleAdd(hwInstance);
  };

  populate = async (unit) => {
    console.log("Populating class " + unit._id);
    const { user, setUser } = this.context;

    let classContainer = this.state.currentEvents;
    let start = addDays(new Date(unit.startdate), 1);
    let end = addDays(new Date(unit.enddate), 1);

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
              id: uuidv4(),
              classid: unit._id,
              title: unit.title,
              start: `${ISOrepeat}T${unit.starttime}:00`,
              end: `${ISOrepeat}T${unit.endtime}:00`,
              editable: false,
              backgroundColor: "blue",
              category: "Class",
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
    setUser({ ...user, activities: [...classContainer] });
    await API.setActivities(classContainer);
  };

  handleAdd = async (event) => {
    const { user, setUser } = this.context;
    let container = this.state.currentEvents;
    container.push(event);
    this.setState({ currentEvents: [...container] });
    setUser({ ...user, activities: [...container] });
    await API.setActivities(container);
  };

  handleDelete = async (id) => {
    const { user, setUser } = this.context;
    let filteredEvents = this.state.currentEvents.filter(function(event) {
      return event.id !== id;
    });
    this.setState({ currentEvents: [...filteredEvents] });
    setUser({ ...user, activities: [...filteredEvents] });
    await API.setActivities(filteredEvents);
  };

  handleDateClick = (e) => {
    this.setState({
      date: e.dateStr,
      showCalendarModal: !this.state.showCalendarModal,
    });
    // this.setState({ showCalendarModal: !this.state.showCalendarModal });
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };

  eventClick = (info) => {
    console.log(info.event);
    const { id, title, allDay, startStr, endStr, backgroundColor } = info.event;
    const { notes, category } = info.event.extendedProps;
    const radio = this.getRadio(category);
    this.setState({
      eventInfo: {
        id,
        title,
        allDay,
        startStr,
        endStr,
        category,
        radio,
        notes,
        backgroundColor,
      },
    });
    this.setState({ showEventModal: !this.state.showEventModal });
  };

  getRadio = (category) => {
    switch (category) {
      case "Class":
        return 2;
      case "Homework":
        return 3;
      case "Test":
        return 4;
      case "Meeting":
        return 5;
      case "Appointment":
        return 6;
      case "Other":
        return 7;
    }
  };

  toggleCreate = () => {
    this.setState({ showCalendarModal: !this.state.showCalendarModal });
  };

  toggleEdit = () => {
    this.setState({ showEventModal: !this.state.showEventModal });
    this.setState({ eventInfo: {} });
  };

  render() {
    const { user } = this.context;
    return (
      <div>
        {this.state.showCalendarModal && (
          <CalendarModal
            date={this.state.date}
            toggle={this.toggleCreate}
            addEvent={this.handleAdd}
            isOpen={this.state.showCalendarModal}
          />
        )}
        {this.state.showEventModal && (
          <CalEditModal
            eventInfo={this.state.eventInfo}
            toggle={this.toggleEdit}
            eventClick={this.editEventClick}
            isOpen={this.state.showEventModal}
            addEvent={this.handleAdd}
            deleteEvent={this.handleDelete}
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
          events={user.activities}
          eventClick={this.eventClick}
          // eventsSet={this.handleEvents}
          // eventAdd={this.handleAdd}
        />
      </div>
    );
  }
}

export default Calendar;
