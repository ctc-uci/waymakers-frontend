import React from 'react';
import PropTypes from 'prop-types';
import ScheduleSelector from 'react-schedule-selector';

import './viewAvailability.css';

const ViewAvailability = ({ availabilities, startWeek }) => {
  const renderCell = (time, selected, refSetter) => (
    <div
      className="grid-cell"
      style={{ backgroundColor: `${selected ? '#799CA8' : '#F2FBFC'}` }}
      ref={refSetter}
    >
      {' '}
    </div>
  );

  return (
    <div className="viewAvailCard">
      <ScheduleSelector
        selection={availabilities}
        selectionScheme="square"
        startDate={startWeek}
        numDays={7}
        minTime={7}
        maxTime={19}
        hourlyChunks={1}
        selectedColor="rgba(121, 156, 168, 1)"
        rowGap={0}
        columnGap={0}
        dateFormat="ddd"
        renderDateCell={renderCell}
      />
    </div>
  );
};

ViewAvailability.propTypes = {
  availabilities: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  startWeek: PropTypes.instanceOf(Date).isRequired,
};

export default ViewAvailability;
