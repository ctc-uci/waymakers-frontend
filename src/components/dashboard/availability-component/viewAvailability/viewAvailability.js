/* eslint-disable react/prop-types */
import React from 'react';
import './viewAvailability.css';
import ScheduleSelector from 'react-schedule-selector';

function viewAvailability({ availabilities, startWeek }) {
  const handleChange = () => {
    console.log('');
  };

  return (
    <div className="availCard">
      <h2>Availability</h2>
      <ScheduleSelector
        selection={availabilities}
        selectionScheme="square"
        startDate={startWeek}
        numDays={7}
        minTime={7}
        maxTime={19}
        hourlyChunks={1}
        dateFormat="ddd"
        onChange={handleChange}
      />
    </div>
  );
}

export default viewAvailability;
