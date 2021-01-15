import React from 'react';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import PropTypes from 'prop-types';

import './hoursBox.css';

const HoursBox = ({ events }) => {
  console.log(events);
  console.log(events.events);
  const getRows = (event) => {
    console.log(event);
    return (
      <tr>
        <td>{event.event_name}</td>
        <td>{event.start_time}</td>
        <td>{event.event_location}</td>
        <td>{event.log_start}</td>
        <td>{event.log_end}</td>
        <td>{event.total_hours}</td>
      </tr>
    );
  };
  console.log(events);
  return (
    <div id="hours-box">
      <div id="header">
        <h3>Title</h3>
        <div id="date-filters">
          <MonthPicker
            defaultValue="Select Month"
            endYearGiven
            year={2020}
            value={1}
            onChange={(newMonth) => {
              console.log('month changed to new month');
              console.log(newMonth);
            }}
            id="month"
            name="month"
          />
          <YearPicker
            defaultValue="Select Year"
            start={2020}
            end={2030}
            value={2020}
            onChange={(newYear) => {
              console.log('year has been changed');
              console.log(newYear);
            }}
            id="year"
            name="year"
          />
        </div>
      </div>
      <table>
        <tr>
          <th>Event Name</th>
          <th>Date</th>
          <th>Location</th>
          <th>Start</th>
          <th>End</th>
          <th>Total hours</th>
        </tr>
        { events.map((event) => getRows(event)) }
      </table>
    </div>
  );
};

HoursBox.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
};

export default HoursBox;
