import React from 'react';
import PropTypes from 'prop-types';
import ScheduleSelector from 'react-schedule-selector';

import './viewAvailability.css';

const ViewAvailability = ({ availabilities, startWeek }) => (
  <div className="viewAvailCard">
    <ScheduleSelector
      selection={availabilities}
      selectionScheme="square"
      startDate={startWeek}
      numDays={7}
      minTime={7}
      maxTime={19}
      hourlyChunks={1}
      dateFormat="ddd"
    />
  </div>
);

ViewAvailability.propTypes = {
  availabilities: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  startWeek: PropTypes.instanceOf(Date).isRequired,
};

export default ViewAvailability;
