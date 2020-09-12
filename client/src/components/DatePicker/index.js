import React from 'react';
import { MDBDatePickerV5 } from 'mdbreact';

class DatePicker extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         dueDate: null
    //     }
    // }

    // onDateChange = (e, date) => {
    //     console.log(e);
    //     console.log(date);
    //     this.setState({
    //         dueDate: date
    //     })
    // }

    render() {
        return (
            <div>
                <MDBDatePickerV5 disablePast />
            </div>
        );
    }
};

export default DatePicker;