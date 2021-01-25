import React from 'react';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import PropTypes from 'prop-types';

import './hoursBox.css';

const HoursBox = ({ events }) => {
  const getRows = (event) => (
    <tr>
      <td>{event.event_name}</td>
      <td>{event.event_location}</td>
      <td>{new Date(event.log_start).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</td>
      <td>{new Date(event.log_end).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</td>
      <td>{event.total_hours}</td>
    </tr>
  );

  return (
    <div id="hours-box">
      <div id="header">
        <h3>View Logs</h3>
        <div id="date-filters">
          <MonthPicker
            defaultValue="Select Month"
            endYearGiven
            year={2020}
            value={1}
            onChange={(newMonth) => {
              // TODO: CHANGE THE ACTUAL VALUE AND FILTER
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
          {/* <th>Date</th> */}
          <th>Location</th>
          <th>Start Date and Time</th>
          <th>End Date and Time</th>
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
