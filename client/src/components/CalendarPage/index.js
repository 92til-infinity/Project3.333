import React from 'react';
import Calendar from '../Calendar';
import Day from '../Day';

class CalendarPage extends React.Component {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <div>
        <Calendar date={this.state.date} onChange={this.onChange} />
        <br />
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

export default CalendarPage;
