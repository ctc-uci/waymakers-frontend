import React from 'react';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
// import PropTypes from 'prop-types';

import './hoursBox.css';

const HoursBox = () => {
  const getRows = () => {
    console.log('hi');
    return (
      <tr>
        <td>hi</td>
        <td>hi</td>
        <td>hi</td>
        <td>hi</td>
        <td>hi</td>
      </tr>
    );
  };
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
          <th>Total hours</th>
          <th>Status</th>
        </tr>
        {getRows()}
        {getRows()}
        {getRows()}
      </table>
    </div>
  );
};

export default HoursBox;
