import React from 'react';
import { MDBDatePickerV5 } from 'mdbreact';

class DatePicker extends React.Component {

    render() {
        return (
            <div>
                <MDBDatePickerV5 disablePast getValue={(e) => console.log(e)} />
            </div>
        );
    }
};

export default DatePicker;