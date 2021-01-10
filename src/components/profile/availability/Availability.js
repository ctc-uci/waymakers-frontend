/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Availability.css';

function Availability({ availabilities }) {
  return (
    <div className="availCard">
      <h2>Availability</h2>
      <div className="availTimes">
        {availabilities.map((avail) => {
          const { dayOfWeek, startTime, endTime } = avail;

          return (
            <ul key={avail}>
              <li>{dayOfWeek}</li>
              <li>{startTime}</li>
              <li>{endTime}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Availability;
