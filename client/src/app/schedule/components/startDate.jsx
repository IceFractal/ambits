import React            from 'react';
import DatePicker       from 'material-ui/DatePicker';


const StartDate = (props) => (
  <div>
    <DatePicker
      hintText="Select Ambit Start Date"
      value = {props.startDate}
      onChange= {props.onStartDateSet}
      autoOk= {true}
      locale="en-US"
      firstDayOfWeek={0}
      style={{marginLeft: '40px'}}
    />
  </div>
);


export default StartDate;
