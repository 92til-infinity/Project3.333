import React from "react";
import Calendar from "../components/Calendar";
import Day from "../components/Day";

class Schedule extends React.Component {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <div>
        <Calendar date={this.state.date} onChange={this.onChange} />
        <Day date={this.state.date} />
        {/* insert schedule items here */}
        {/* insert schedule items here */}
        {/* insert schedule items here */}
        {/* insert schedule items here */}
        {/* insert schedule items here */}
      </div>
    );
  }
}

export default Schedule;
